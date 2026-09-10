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

// ── Toggle Password Visibility ────────────────
function setupPasswordToggle(toggleId, inputId, iconId) {
  const toggleBtn = $(toggleId);
  if (!toggleBtn) return;
  toggleBtn.addEventListener('click', () => {
    const inp = $(inputId);
    const isHidden = inp.type === 'password';
    inp.type = isHidden ? 'text' : 'password';
    const icon = $(iconId);
    if (icon) {
      icon.innerHTML = isHidden
        ? `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
             d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7
                a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878
                l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59
                m7.532 7.532L21 21"/>`
        : `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
             d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
             d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7
                -1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>`;
    }
  });
}
setupPasswordToggle('togglePassword', 'inputPassword', 'iconEye');
setupPasswordToggle('toggleConfirm', 'inputConfirm', 'iconEyeConfirm');

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
  const btn     = $('btnRegister') || $('btnDaftar');
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
