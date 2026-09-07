<?php
// ============================================
// Load file .env dari root project
// ============================================
$envFile = dirname(__DIR__) . '/.env';   // path ke project-jwp/.env

if (file_exists($envFile)) {
    $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        // Abaikan baris komentar (#)
        if (str_starts_with(trim($line), '#')) continue;

        // Pisahkan KEY=VALUE
        if (str_contains($line, '=')) {
            [$key, $value] = explode('=', $line, 2);
            $key   = trim($key);
            $value = trim($value);
            // Simpan ke environment PHP
            putenv("$key=$value");
            $_ENV[$key] = $value;
        }
    }
}

// ============================================
// Koneksi Database via PDO
// ============================================

// Baca kredensial dari .env yang sudah di-load
$host   = getenv('DB_HOST')     ?: 'localhost';
$dbname = getenv('DB_NAME')     ?: 'db_dashboard';
$user   = getenv('DB_USER')     ?: 'root';
$pass   = getenv('DB_PASS')     ?: '';      // Laragon default: kosong
$port   = getenv('DB_PORT')     ?: '3306';

try {
    $pdo = new PDO(
        "mysql:host=$host;port=$port;dbname=$dbname;charset=utf8mb4",
        $user,
        $pass,
        [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ]
    );
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Koneksi database gagal: ' . $e->getMessage()
    ]);
    exit;
}

// Helper: kirim response JSON
function respond(bool $success, $data = null, string $message = '', int $code = 200): void {
    http_response_code($code);
    header('Content-Type: application/json');
    echo json_encode([
        'success' => $success,
        'message' => $message,
        'data'    => $data,
    ]);
    exit;
}
