// ── Redirect jika sudah login ──────────────────
if (localStorage.getItem('isLoggedIn') === 'true') {
  window.location.replace('/');
}

const $ = id => document.getElementById(id);

// ── Toggle show/hide password ─────────────────
$('togglePassword').addEventListener('click', () => {
  const inp = $('inputPassword');
  const isHidden = inp.type === 'password';
  inp.type = isHidden ? 'text' : 'password';
  // Ganti ikon
  $('iconEye').innerHTML = isHidden
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
});

// ── Helper tampilkan error ────────────────────
function showError(msg) {
  const box = $('alertError');
  $('alertMsg').textContent = msg;
  box.classList.remove('hidden', 'shake');
  // Trigger animasi shake
  void box.offsetWidth;
  box.classList.add('shake');
}

function hideError() {
  $('alertError').classList.add('hidden');
}

// ── Submit Form Login ─────────────────────────
$('formLogin').addEventListener('submit', async (e) => {
  e.preventDefault();
  hideError();

  const username = $('inputUsername').value.trim();
  const password = $('inputPassword').value;

  if (!username || !password) {
    showError('Username dan password wajib diisi.');
    return;
  }

  // Loading state
  const btn     = $('btnLogin');
  const btnText = $('btnText');
  const spinner = $('btnSpinner');
  btn.disabled    = true;
  btnText.textContent = 'Memproses...';
  spinner.classList.remove('hidden');

  try {
    const res  = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const json = await res.json();

    if (json.success) {
      // Simpan sesi ke localStorage
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', json.data.username);
      // Arahkan ke dashboard
      window.location.replace('/');
    } else {
      showError(json.message || 'Login gagal. Coba lagi.');
    }
  } catch {
    showError('Gagal terhubung ke server. Pastikan server berjalan.');
  } finally {
    btn.disabled    = false;
    btnText.textContent = 'Masuk';
    spinner.classList.add('hidden');
  }
});

// ── Sembunyikan error saat mengetik ──────────
$('inputUsername').addEventListener('input', hideError);
$('inputPassword').addEventListener('input', hideError);
