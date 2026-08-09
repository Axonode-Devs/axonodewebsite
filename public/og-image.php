<?php
/**
 * Returns the predefined OG image for the survey result.
 *
 * Available images:
 *   public/software-og.png
 *   public/designer-og.png
 *   public/marketing-og.png
 */

$id = $_GET['id'] ?? '';

if (
    empty($id) ||
    !preg_match(
        '/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i',
        $id
    )
) {
    http_response_code(400);
    exit('Invalid ID');
}

/**
 * Get survey result from API.
 */
$api_url = 'https://axonode.org/api/v1/survey/results/' . rawurlencode($id);

$ctx = stream_context_create([
    'http' => [
        'timeout' => 5,
        'method' => 'GET',
    ],
]);

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

/**
 * Get profession ID.
 */
$profession_id = $result['topProfession']['id'] ?? '';

/**
 * Map profession to predefined OG image.
 */
$images = [
    'software'  => __DIR__ . '/software-og.png',
    'designer'  => __DIR__ . '/designer-og.png',
    'marketing' => __DIR__ . '/marketing-og.png',
];

if (!isset($images[$profession_id])) {
    http_response_code(404);
    exit('OG image not found');
}

$image_path = $images[$profession_id];

if (!file_exists($image_path)) {
    http_response_code(404);
    exit('OG image file not found');
}

/**
 * Output image.
 */
header('Content-Type: image/png');
header('Content-Length: ' . filesize($image_path));
header('Cache-Control: public, max-age=86400');
header(
    'Expires: ' .
    gmdate('D, d M Y H:i:s', time() + 86400) .
    ' GMT'
);

readfile($image_path);
exit;
