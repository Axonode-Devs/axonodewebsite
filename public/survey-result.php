<?php
/**
 * Bot-aware route handler for /survey-result/:id
 *
 * Bots (Discord, WhatsApp, Twitter, etc.) get server-rendered HTML with
 * personalized OG meta tags so link previews show the profession name.
 *
 * Real browsers get the SPA's index.html so Vue Router takes over.
 */

$KNOWN_BOTS = [
    'discordbot',
    'twitterbot',
    'facebookexternalhit',
    'slackbot',
    'telegrambot',
    'linkedinbot',
    'pinterest',
    'whatsapp',
    'googlebot',
    'bingbot',
    'applebot',
    'embedly',
    'quora link preview',
    'zoominfobot',
    'facebookcatalog',
    '_bytespider',
];

function is_bot(string $user_agent): bool
{
    global $KNOWN_BOTS;
    $ua = strtolower($user_agent);
    foreach ($KNOWN_BOTS as $bot) {
        if (strpos($ua, $bot) !== false) {
            return true;
        }
    }
    return false;
}

function esc(string $s): string
{
    return htmlspecialchars($s, ENT_QUOTES, 'UTF-8');
}

// --- Validate ID format (UUID v4 — 36 chars with hyphens) ---
$id = $_GET['id'] ?? '';
if (empty($id) || !preg_match('/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i', $id)) {
    // Invalid ID — let the SPA handle the error display
    header('Content-Type: text/html; charset=utf-8');
    readfile(__DIR__ . '/index.html');
    exit;
}

// --- Real browser? Serve the SPA ---
$user_agent = $_SERVER['HTTP_USER_AGENT'] ?? '';
if (!is_bot($user_agent)) {
    header('Content-Type: text/html; charset=utf-8');
    readfile(__DIR__ . '/index.html');
    exit;
}

// --- Bot detected — fetch result from the API and render OG tags ---

// Internal API call (same server, no CORS needed)
$api_url = 'https://axonode.org/api/v1/survey/results/' . rawurlencode($id);
$ctx = stream_context_create([
    'http' => [
        'timeout' => 5,
        'method'  => 'GET',
        'header'  => "Accept: application/json\r\n",
    ],
]);
$response = @file_get_contents($api_url, false, $ctx);

if ($response === false) {
    // API unreachable — fall back to SPA (bot won't render JS anyway,
    // but we avoid serving a broken page)
    header('Content-Type: text/html; charset=utf-8');
    readfile(__DIR__ . '/index.html');
    exit;
}

$data = json_decode($response, true);
$result = $data['data'] ?? $data;

if (!$result || !isset($result['topProfession'])) {
    header('Content-Type: text/html; charset=utf-8');
    readfile(__DIR__ . '/index.html');
    exit;
}

$profession_name = $result['topProfession']['name'] ?? 'Survey';
$profession_id   = $result['topProfession']['id']   ?? '';

// Map profession IDs to the site's color palette
$PROFESSION_COLORS = [
    'software'  => '#78dee7',
    'designer'  => '#fe78b0',
    'marketing' => '#a59ce6',
];
$color = $PROFESSION_COLORS[$profession_id] ?? '#b29de4';

$site_url    = 'https://www.axonode.org';
$page_url    = $site_url . '/survey-result/' . $id;
$image_url   = $site_url . '/og-image.php?id=' . rawurlencode($id);
$description = 'I took the Axonode personality survey and my path leads to: '
    . $profession_name . '! Take the survey to discover yours.';

header('Content-Type: text/html; charset=utf-8');
header('Cache-Control: public, max-age=300'); // 5 min — bots re-crawl periodically
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title><?= esc($profession_name) ?> | Axonode Survey Result</title>

    <!-- Open Graph -->
    <meta property="og:type" content="website">
    <meta property="og:title" content="<?= esc($profession_name) ?> | Axonode Survey Result">
    <meta property="og:description" content="<?= esc($description) ?>">
    <meta property="og:image" content="<?= esc($image_url) ?>">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:url" content="<?= esc($page_url) ?>">

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="<?= esc($profession_name) ?> | Axonode Survey Result">
    <meta name="twitter:description" content="<?= esc($description) ?>">
    <meta name="twitter:image" content="<?= esc($image_url) ?>">
</head>
<body>
    <!-- Fallback link for anything that doesn't render meta tags -->
    <p>Redirecting to <a href="<?= esc($page_url) ?>">your survey result</a>...</p>
    <script>window.location.replace(<?= json_encode($page_url) ?>);</script>
</body>
</html>
