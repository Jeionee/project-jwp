<?php
// ============================================
// REST API: Data Pegawai
// Endpoint: /api/pegawai.php
// ============================================

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/config.php';

$method = $_SERVER['REQUEST_METHOD'];
$id     = isset($_GET['id']) ? (int)$_GET['id'] : null;

// ─── GET ────────────────────────────────────
if ($method === 'GET') {
    if ($id) {
        // Ambil satu pegawai
        $stmt = $pdo->prepare('SELECT * FROM pegawai WHERE id = ?');
        $stmt->execute([$id]);
        $row = $stmt->fetch();
        if ($row) {
            respond(true, $row);
        } else {
            respond(false, null, 'Pegawai tidak ditemukan', 404);
        }
    } else {
        // Ambil semua pegawai
        $search = $_GET['search'] ?? '';
        if ($search) {
            $like = "%$search%";
            $stmt = $pdo->prepare(
                'SELECT * FROM pegawai
                 WHERE nama LIKE ? OR jabatan LIKE ? OR departemen LIKE ? OR email LIKE ?
                 ORDER BY created_at DESC'
            );
            $stmt->execute([$like, $like, $like, $like]);
        } else {
            $stmt = $pdo->query('SELECT * FROM pegawai ORDER BY created_at DESC');
        }
        respond(true, $stmt->fetchAll());
    }
}

// ─── POST (Tambah) ───────────────────────────
elseif ($method === 'POST') {
    $body = json_decode(file_get_contents('php://input'), true);

    $required = ['nama', 'jabatan', 'departemen', 'email', 'telepon', 'tanggal_masuk'];
    foreach ($required as $field) {
        if (empty($body[$field])) {
            respond(false, null, "Field '$field' wajib diisi.", 422);
        }
    }

    // Cek email duplikat
    $check = $pdo->prepare('SELECT id FROM pegawai WHERE email = ?');
    $check->execute([$body['email']]);
    if ($check->fetch()) {
        respond(false, null, 'Email sudah digunakan pegawai lain.', 409);
    }

    $stmt = $pdo->prepare(
        'INSERT INTO pegawai (nama, jabatan, departemen, email, telepon, tanggal_masuk, status)
         VALUES (?, ?, ?, ?, ?, ?, ?)'
    );
    $stmt->execute([
        $body['nama'],
        $body['jabatan'],
        $body['departemen'],
        $body['email'],
        $body['telepon'],
        $body['tanggal_masuk'],
        $body['status'] ?? 'Aktif',
    ]);

    respond(true, ['id' => (int)$pdo->lastInsertId()], 'Pegawai berhasil ditambahkan.', 201);
}

// ─── PUT (Update) ────────────────────────────
elseif ($method === 'PUT') {
    if (!$id) respond(false, null, 'ID pegawai diperlukan.', 400);

    $body = json_decode(file_get_contents('php://input'), true);

    $required = ['nama', 'jabatan', 'departemen', 'email', 'telepon', 'tanggal_masuk'];
    foreach ($required as $field) {
        if (empty($body[$field])) {
            respond(false, null, "Field '$field' wajib diisi.", 422);
        }
    }

    // Cek email duplikat (kecuali milik diri sendiri)
    $check = $pdo->prepare('SELECT id FROM pegawai WHERE email = ? AND id != ?');
    $check->execute([$body['email'], $id]);
    if ($check->fetch()) {
        respond(false, null, 'Email sudah digunakan pegawai lain.', 409);
    }

    $stmt = $pdo->prepare(
        'UPDATE pegawai
         SET nama=?, jabatan=?, departemen=?, email=?, telepon=?, tanggal_masuk=?, status=?
         WHERE id=?'
    );
    $stmt->execute([
        $body['nama'],
        $body['jabatan'],
        $body['departemen'],
        $body['email'],
        $body['telepon'],
        $body['tanggal_masuk'],
        $body['status'] ?? 'Aktif',
        $id,
    ]);

    if ($stmt->rowCount() === 0) {
        respond(false, null, 'Pegawai tidak ditemukan.', 404);
    }

    respond(true, null, 'Data pegawai berhasil diperbarui.');
}

// ─── DELETE ──────────────────────────────────
elseif ($method === 'DELETE') {
    if (!$id) respond(false, null, 'ID pegawai diperlukan.', 400);

    $stmt = $pdo->prepare('DELETE FROM pegawai WHERE id = ?');
    $stmt->execute([$id]);

    if ($stmt->rowCount() === 0) {
        respond(false, null, 'Pegawai tidak ditemukan.', 404);
    }

    respond(true, null, 'Pegawai berhasil dihapus.');
}

// ─── Method lain ─────────────────────────────
else {
    respond(false, null, 'Method tidak diizinkan.', 405);
}
