<?php
/**
 * Generates a personalized 1200×630 OG image card for a survey result.
 *
 * Flow: fetch result from API → draw card with PHP GD → output PNG.
 * Cached via HTTP headers (bots won't re-fetch often).
 */

// --- Validate ID ---
$id = $_GET['id'] ?? '';
if (empty($id) || !preg_match('/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i', $id)) {
    http_response_code(400);
    exit('Invalid ID');
}

// --- Fetch result from API ---
$api_url = 'https://axonode.org/api/v1/survey/results/' . rawurlencode($id);
$ctx = stream_context_create(['http' => ['timeout' => 5, 'method' => 'GET']]);
$response = @file_get_contents($api_url, false, $ctx);

if ($response === false) {
    http_response_code(404);
    exit('Result not found');
}

$data = json_decode($response, true);
$result = $data['data'] ?? $data;

if (!$result || !isset($result['topProfession'])) {
    http_response_code(404);
    exit('Result not found');
}

$profession_name = $result['topProfession']['name'] ?? 'Survey';
$profession_id   = $result['topProfession']['id']   ?? '';
$absolute        = $result['professionScores']['absolute'] ?? [];

// --- Colour palette (matches the Vue frontend) ---
$PROFESSION_COLORS = [
    'software'  => [120, 222, 231],  // #78dee7
    'designer'  => [254, 120, 176],  // #fe78b0
    'marketing' => [165, 156, 230],  // #a59ce6
];
$color_rgb = $PROFESSION_COLORS[$profession_id] ?? [178, 157, 228]; // default violet

// --- Find a TTF font (common cPanel / Linux paths) ---
$FONT_PATHS = [
    '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',
    '/usr/share/fonts/dejavu/DejaVuSans-Bold.ttf',
    '/usr/share/fonts/TTF/DejaVuSans-Bold.ttf',
    '/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf',
    '/usr/share/fonts/liberation-sans/LiberationSans-Bold.ttf',
    '/usr/share/fonts/truetype/ubuntu/Ubuntu-Bold.ttf',
    '/usr/share/fonts/google-noto/NotoSans-Bold.ttf',
];

$font_regular_paths = [
    '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',
    '/usr/share/fonts/dejavu/DejaVuSans.ttf',
    '/usr/share/fonts/TTF/DejaVuSans.ttf',
    '/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf',
    '/usr/share/fonts/liberation-sans/LiberationSans-Regular.ttf',
];

function find_font(array $candidates): ?string
{
    foreach ($candidates as $path) {
        if (file_exists($path)) return $path;
    }
    return null;
}

$font_bold   = find_font($FONT_PATHS);
$font_regular = find_font($font_regular_paths);
if (!$font_regular) $font_regular = $font_bold; // fall back to bold for everything

// --- Image dimensions (OG standard) ---
$W = 1200;
$H = 630;

$img = imagecreatetruecolor($W, $H);

// --- Background gradient (dark, top-to-bottom) ---
$bg_top    = imagecolorallocate($img, 13, 17, 23);   // #0d1117
$bg_bottom = imagecolorallocate($img, 22, 27, 34);   // #161b22

for ($y = 0; $y < $H; $y++) {
    $ratio = $y / $H;
    $r = (int)(13 + (22 - 13) * $ratio);
    $g = (int)(17 + (27 - 17) * $ratio);
    $b = (int)((23 + (34 - 23)) * $ratio);
    $line_color = imagecolorallocate($img, $r, $g, $b);
    imageline($img, 0, $y, $W, $y, $line_color);
}

// --- Spectrum bar (cyan → violet → pink) at the bottom ---
$bar_y    = $H - 60;
$bar_h    = 8;
$bar_pad  = 120;
$bar_w    = $W - ($bar_pad * 2);

$spectrum_colors = [
    [122, 213, 228],  // #7ad5e4
    [178, 157, 228],  // #b29de4
    [246, 140, 174],  // #f68cae
];

for ($x = $bar_pad; $x < $bar_pad + $bar_w; $x++) {
    $t = ($x - $bar_pad) / $bar_w;
    if ($t < 0.5) {
        $t2 = $t / 0.5;
        $r = (int)($spectrum_colors[0][0] + ($spectrum_colors[1][0] - $spectrum_colors[0][0]) * $t2);
        $g = (int)($spectrum_colors[0][1] + ($spectrum_colors[1][1] - $spectrum_colors[0][1]) * $t2);
        $b = (int)($spectrum_colors[0][2] + ($spectrum_colors[1][2] - $spectrum_colors[0][2]) * $t2);
    } else {
        $t2 = ($t - 0.5) / 0.5;
        $r = (int)($spectrum_colors[1][0] + ($spectrum_colors[2][0] - $spectrum_colors[1][0]) * $t2);
        $g = (int)($spectrum_colors[1][1] + ($spectrum_colors[2][1] - $spectrum_colors[1][1]) * $t2);
        $b = (int)($spectrum_colors[1][2] + ($spectrum_colors[2][2] - $spectrum_colors[1][2]) * $t2);
    }
    $c = imagecolorallocate($img, $r, $g, $b);
    imageline($img, $x, $bar_y, $x, $bar_y + $bar_h, $c);
}

// --- Marker on the spectrum bar (where the top profession sits) ---
$marker_positions = [
    'software'  => 0.10,
    'marketing' => 0.50,
    'designer'  => 0.90,
];
$marker_t   = $marker_positions[$profession_id] ?? 0.5;
$marker_x   = (int)($bar_pad + $bar_w * $marker_t);
$marker_c   = imagecolorallocate($img, 226, 232, 240); // #e2e8f0
$marker_r   = 12;
imagefilledcircle($img, $marker_x, $bar_y + (int)($bar_h / 2), $marker_r, $marker_c);

// --- Helper: draw centred text ---
function draw_text_centered($img, $text, $y, $font_path, $size, $color_rgb, $alpha = 0)
{
    if (!$font_path) return;
    $color = imagecolorallocatealpha($img, $color_rgb[0], $color_rgb[1], $color_rgb[2], $alpha);
    $bbox = imagettfbbox($size, 0, $font_path, $text);
    $tw = $bbox[2] - $bbox[0];
    $x = (int)((imagesx($img) - $tw) / 2);
    imagettftext($img, $size, 0, $x, $y, $color, $font_path, $text);
}

// --- "AXONODE" branding (top) ---
$white = [226, 232, 240];
$dim   = [139, 148, 158];

draw_text_centered($img, 'AXONODE', 72, $font_bold, 28, $dim);
draw_text_centered($img, 'SURVEY RESULT', 112, $font_regular, 16, [80, 90, 100]);

// --- Profession name (centred, large, coloured) ---
$prof_color = $color_rgb;
draw_text_centered($img, $profession_name, 310, $font_bold, 72, $prof_color);

// --- "Your path leads to" subtitle ---
draw_text_centered($img, 'Your path leads to:', 350, $font_regular, 18, $dim);

// --- Profession scores (bottom area, above spectrum bar) ---
if (!empty($absolute) && count($absolute) >= 3) {
    $score_y = $bar_y - 55;
    $col_w   = 200;
    $start_x = (int)(($W - $col_w * 3) / 2);

    $PROF_LABELS = [
        'software'  => 'Developer',
        'designer'  => 'Designer',
        'marketing' => 'Marketing',
    ];

    for ($i = 0; $i < 3; $i++) {
        $p   = $absolute[$i];
        $px  = $start_x + ($i * $col_w) + ($col_w / 2);
        $pid = $p['id'] ?? '';
        $pct = $p['percent'] ?? 0;
        $label = $PROF_LABELS[$pid] ?? ($p['name'] ?? $pid);
        $pc = $PROFESSION_COLORS[$pid] ?? [178, 157, 228];

        $alpha = ($pid === $profession_id) ? 0 : 80;
        draw_text_centered($img, $label . ' ' . $pct . '%', $score_y, $font_regular, 15, $pc, $alpha);
    }
}

// --- Output PNG ---
header('Content-Type: image/png');
header('Cache-Control: public, max-age=86400'); // 24 hours
header('Expires: ' . gmdate('D, d M Y H:i:s', time() + 86400) . ' GMT');

imagepng($img);
imagedestroy($img);
