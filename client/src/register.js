const $ = id => document.getElementById(id);

// ── Helper alert ──────────────────────────────
function showError(msg) {
  $('alertSuccess').classList.add('hidden');
  $('alertMsg').textContent = msg;
  const box = $('alertError');
  box.classList.remove('hidden', 'shake');
  void box.offsetWidth;
  box.classList.add('shake');
}

function showSuccess(msg) {
  $('alertError').classList.add('hidden');
  $('successMsg').textContent = msg;
  $('alertSuccess').classList.remove('hidden');
}

function hideAlerts() {
  $('alertError').classList.add('hidden');
  $('alertSuccess').classList.add('hidden');
}

// ── Submit Form Register ──────────────────────
$('formRegister').addEventListener('submit', async (e) => {
  e.preventDefault();
  hideAlerts();

  const name            = $('inputName').value.trim();
  const username        = $('inputUsername').value.trim();
  const password        = $('inputPassword').value;
  const confirmPassword = $('inputConfirm').value;

  // Validasi sisi klien
  if (!name || !username || !password || !confirmPassword) {
    showError('Semua field wajib diisi.');
    return;
  }
  if (password.length < 6) {
    showError('Password minimal 6 karakter.');
    return;
  }
  if (password !== confirmPassword) {
    showError('Konfirmasi password tidak cocok.');
    return;
  }

  // Loading state
  const btn     = $('btnDaftar');
  const btnText = $('btnText');
  const spinner = $('btnSpinner');
  btn.disabled        = true;
  btnText.textContent = 'Mendaftar...';
  spinner.classList.remove('hidden');

  try {
    const res  = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, username, password, confirmPassword }),
    });
    const json = await res.json();

    if (json.success) {
      showSuccess(json.message + ' Anda akan diarahkan ke halaman login...');
      $('formRegister').reset();
      // Redirect ke login setelah 2 detik
      setTimeout(() => window.location.replace('/login.html'), 2000);
    } else {
      showError(json.message || 'Pendaftaran gagal. Coba lagi.');
    }
  } catch {
    showError('Gagal terhubung ke server. Pastikan server berjalan.');
  } finally {
    btn.disabled        = false;
    btnText.textContent = 'Daftar Sekarang';
    spinner.classList.add('hidden');
  }
});

// ── Sembunyikan alert saat mengetik ──────────
['inputName', 'inputUsername', 'inputPassword', 'inputConfirm']
  .forEach(id => $(id).addEventListener('input', hideAlerts));
