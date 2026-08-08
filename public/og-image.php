<?php
/**
 * Generates a personalized 1200×630 OG image card for a survey result.
 */

$id = $_GET['id'] ?? '';
if (empty($id) || !preg_match('/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i', $id)) {
    http_response_code(400);
    exit('Invalid ID');
}

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

// --- Colours (match Vue frontend) ---
$PROFESSION_COLORS = [
    'software'  => [120, 222, 231],  // #78dee7 cyan
    'designer'  => [254, 120, 176],  // #fe78b0 pink
    'marketing' => [165, 156, 230],  // #a59ce6 violet
];
$color_rgb = $PROFESSION_COLORS[$profession_id] ?? [178, 157, 228];

// --- Font detection ---
function find_font(array $paths): ?string {
    foreach ($paths as $p) {
        if (file_exists($p)) return $p;
    }
    return null;
}

$font_paths = [
    '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',
    '/usr/share/fonts/dejavu/DejaVuSans-Bold.ttf',
    '/usr/share/fonts/TTF/DejaVuSans-Bold.ttf',
    '/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf',
    '/usr/share/fonts/liberation-sans/LiberationSans-Bold.ttf',
    '/usr/share/fonts/truetype/ubuntu/Ubuntu-Bold.ttf',
    '/usr/share/fonts/google-noto/NotoSans-Bold.ttf',
    '/usr/share/fonts/TTF/DejaVuSans.ttf',
    '/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf',
    '/usr/share/fonts/liberation-sans/LiberationSans-Regular.ttf',
];

$font = find_font($font_paths);

// --- Image setup ---
$W = 1200;
$H = 630;
$img = imagecreatetruecolor($W, $H);

// --- Background ---
$bg = imagecolorallocate($img, 13, 17, 23);
imagefilledrectangle($img, 0, 0, $W, $H, $bg);

// --- Draw spectrum bar (centered, horizontal) ---
$bar_y = $H - 120;
$bar_h = 12;
$bar_pad = 100;
$bar_w = $W - ($bar_pad * 2);

$spectrum = [
    [122, 213, 228],  // cyan
    [178, 157, 228],  // violet
    [246, 140, 174],  // pink
];

for ($x = $bar_pad; $x < $bar_pad + $bar_w; $x++) {
    $t = ($x - $bar_pad) / $bar_w;
    if ($t < 0.33) {
        $t2 = $t / 0.33;
        $r = (int)($spectrum[0][0] + ($spectrum[1][0] - $spectrum[0][0]) * $t2);
        $g = (int)($spectrum[0][1] + ($spectrum[1][1] - $spectrum[0][1]) * $t2);
        $b = (int)($spectrum[0][2] + ($spectrum[1][2] - $spectrum[0][2]) * $t2);
    } elseif ($t < 0.67) {
        $t2 = ($t - 0.33) / 0.34;
        $r = (int)($spectrum[1][0] + ($spectrum[2][0] - $spectrum[1][0]) * $t2);
        $g = (int)($spectrum[1][1] + ($spectrum[2][1] - $spectrum[1][1]) * $t2);
        $b = (int)($spectrum[1][2] + ($spectrum[2][2] - $spectrum[1][2]) * $t2);
    } else {
        $t2 = ($t - 0.67) / 0.33;
        $r = (int)$spectrum[2][0];
        $g = (int)$spectrum[2][1];
        $b = (int)$spectrum[2][2];
    }
    $c = imagecolorallocate($img, $r, $g, $b);
    imageline($img, $x, $bar_y, $x, $bar_y + $bar_h, $c);
}

// --- Marker position ---
$marker_positions = [
    'software'  => 0.10,
    'marketing' => 0.50,
    'designer'  => 0.90,
];
$marker_t = $marker_positions[$profession_id] ?? 0.5;
$marker_x = (int)($bar_pad + $bar_w * $marker_t);
$marker_c = imagecolorallocate($img, 255, 255, 255);
$marker_r = 10;

// Draw marker circle with glow
for ($i = 0; $i < 3; $i++) {
    $glow_c = imagecolorallocatealpha($img, 255, 255, 255, 40 + $i * 20);
    imagefilledellipse($img, $marker_x, $bar_y + $bar_h / 2, ($marker_r + $i * 3) * 2, ($marker_r + $i * 3) * 2, $glow_c);
}
imagefilledellipse($img, $marker_x, $bar_y + $bar_h / 2, $marker_r * 2, $marker_r * 2, $marker_c);

// --- Helper: draw centered text ---
function draw_centered($img, $text, $y, $font, $size, $color_rgb) {
    if (!$font) {
        $bbox = imageftbbox($size, 0, null, $text);
        $tw = $bbox[2] - $bbox[0];
        $x = (int)(($W - $tw) / 2);
        $color = imagecolorallocate($img, $color_rgb[0], $color_rgb[1], $color_rgb[2]);
        imagestring($img, 5, $x, $y, $text, $color);
        return;
    }
    $color = imagecolorallocate($img, $color_rgb[0], $color_rgb[1], $color_rgb[2]);
    $bbox = imagettfbbox($size, 0, $font, $text);
    $tw = $bbox[2] - $bbox[0];
    $x = (int)(($W - $tw) / 2);
    imagettftext($img, $size, 0, $x, $y, $color, $font, $text);
}

// --- Branding ---
draw_centered($img, 'AXONODE', 65, $font, 32, [255, 255, 255]);
draw_centered($img, 'Personality Survey Result', 110, $font, 18, [139, 148, 158]);

// --- Main profession name ---
draw_centered($img, $profession_name, 280, $font, 84, $color_rgb);

// --- Subtitle ---
draw_centered($img, 'Your path leads to:', 330, $font, 20, [139, 148, 158]);

// --- Profession scores (3 columns) ---
if (!empty($absolute) && count($absolute) >= 3) {
    $score_y = $bar_y - 80;
    $col_w = 240;
    $start_x = (int)(($W - $col_w * 3) / 2);

    $PROF_LABELS = [
        'software'  => 'Software',
        'designer'  => 'Designer',
        'marketing' => 'Marketing',
    ];

    for ($i = 0; $i < 3; $i++) {
        $p = $absolute[$i];
        $pid = $p['id'] ?? '';
        $pct = $p['percent'] ?? 0;
        $label = $PROF_LABELS[$pid] ?? ($p['name'] ?? $pid);
        $pc = $PROFESSION_COLORS[$pid] ?? [178, 157, 228];
        $is_top = ($pid === $profession_id);

        $col_x = $start_x + $i * $col_w;

        // Draw bar background
        $bar_bg = imagecolorallocate($img, 30, 35, 45);
        imagefilledroundedrectangle($img, $col_x + 20, $score_y, $col_x + $col_w - 20, $score_y + 24, 6, $bar_bg);

        // Draw progress bar
        if ($is_top) {
            $bar_fill = imagecolorallocate($img, $pc[0], $pc[1], $pc[2]);
            imagefilledroundedrectangle($img, $col_x + 22, $score_y + 2, $col_x + 22 + ($col_w - 44) * $pct / 100, $score_y + 22, 4, $bar_fill);
        }

        // Draw text
        draw_centered($img, $label, $score_y - 25, $font, 16, $is_top ? $pc : [139, 148, 158]);
        draw_centered($img, $pct . '%', $score_y + 18, $font, 20, $is_top ? [255, 255, 255] : [226, 232, 240]);
    }
}

// --- Footer ---
draw_centered($img, 'Take the survey at axonode.org', $H - 30, $font, 14, [80, 90, 100]);

// --- Output PNG ---
header('Content-Type: image/png');
header('Cache-Control: public, max-age=86400');
header('Expires: ' . gmdate('D, d M Y H:i:s', time() + 86400) . ' GMT');

imagepng($img);
imagedestroy($img);

// --- Helper for rounded rectangle (GD doesn't have native function) ---
function imagefilledroundedrectangle($img, $x1, $y1, $x2, $y2, $radius, $color) {
    imagefilledrectangle($img, $x1 + $radius, $y1, $x2 - $radius, $y2, $color);
    imagefilledrectangle($img, $x1, $y1 + $radius, $x2, $y2 - $radius, $color);
    imagefilledellipse($img, $x1 + $radius, $y1 + $radius, $radius * 2, $radius * 2, $color);
    imagefilledellipse($img, $x2 - $radius, $y1 + $radius, $radius * 2, $radius * 2, $color);
    imagefilledellipse($img, $x1 + $radius, $y2 - $radius, $radius * 2, $radius * 2, $color);
    imagefilledellipse($img, $x2 - $radius, $y2 - $radius, $radius * 2, $radius * 2, $color);
}