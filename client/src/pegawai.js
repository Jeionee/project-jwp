const API = '/api/pegawai';
let allData = [];
let deleteTargetId = null;

// ── Role-based access ─────────────────────────
const isAdmin = localStorage.getItem('role') === 'admin';

// ── Helpers DOM ───────────────────────────────
const $ = id => document.getElementById(id);
const on = (id, ev, fn) => $(id).addEventListener(ev, fn);

// ── Toast ─────────────────────────────────────
function toast(msg, type = 'success') {
  const el = $('toast');
  el.className = `fixed bottom-6 right-6 z-50 px-5 py-3.5 rounded-xl shadow-lg text-sm font-medium text-white ${type === 'success' ? 'bg-emerald-500' : 'bg-red-500'}`;
  el.textContent = msg;
  el.classList.remove('hidden');
  setTimeout(() => el.classList.add('hidden'), 3500);
}

// ── Fetch Data ────────────────────────────────
async function load() {
  try {
    const res = await fetch(API);
    const json = await res.json();
    allData = json.success ? json.data : [];
  } catch {
    toast('Gagal terhubung ke server. Pastikan server Express berjalan.', 'error');
    allData = [];
  }
  renderKPIs();
  renderTable(allData);
}

// ── KPI ───────────────────────────────────────
function renderKPIs() {
  const total = allData.length;
  const pria = allData.filter(e => e.gender === 'Laki-laki').length;
  const wanita = allData.filter(e => e.gender === 'Perempuan').length;
  $('kpiCards').innerHTML = `
    <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
      <p class="text-sm font-medium text-slate-500">Total Pegawai</p>
      <p class="text-3xl font-bold text-slate-900 mt-1">${total}</p>
    </div>
    <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
      <p class="text-sm font-medium text-slate-500">Laki-laki</p>
      <p class="text-3xl font-bold text-blue-600 mt-1">${pria}</p>
    </div>
    <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
      <p class="text-sm font-medium text-slate-500">Perempuan</p>
      <p class="text-3xl font-bold text-rose-500 mt-1">${wanita}</p>
    </div>`;
}

// ── Tabel ─────────────────────────────────────
function renderTable(data) {
  const tbody = $('employeeTable');
  if (!data.length) {
    tbody.innerHTML = '<tr><td colspan="6" class="px-6 py-10 text-center text-slate-400 text-sm">Tidak ada data pegawai.</td></tr>';
    return;
  }
  tbody.innerHTML = data.map((emp) => `
    <tr class="hover:bg-slate-50 transition-colors">
      <td class="px-6 py-4 text-slate-400">#${emp.id}</td>
      <td class="px-6 py-4 font-medium text-slate-800">${emp.name}</td>
      <td class="px-6 py-4">
        <span class="px-2.5 py-1 rounded-full text-xs font-medium ${emp.gender === 'Laki-laki' ? 'bg-blue-50 text-blue-700' : 'bg-rose-50 text-rose-700'}">
          ${emp.gender}
        </span>
      </td>
      <td class="px-6 py-4 text-slate-600">${emp.education}</td>
      <td class="px-6 py-4 text-slate-600">${emp.age} Thn</td>
      <td class="px-6 py-4 text-right flex justify-end gap-3">
        ${isAdmin
          ? `<button data-edit="${emp.id}" class="text-sm font-medium text-slate-400 hover:text-blue-600 transition-colors">Edit</button>
             <button data-del="${emp.id}"  class="text-sm font-medium text-slate-400 hover:text-red-600 transition-colors">Hapus</button>`
          : `<span class="text-slate-300">—</span>`
        }
      </td>
    </tr>`).join('');

  // Event delegation — hanya pasang jika admin
  if (isAdmin) {
    tbody.querySelectorAll('[data-edit]').forEach(btn => btn.addEventListener('click', () => openEdit(+btn.dataset.edit)));
    tbody.querySelectorAll('[data-del]').forEach(btn  => btn.addEventListener('click', () => openHapus(+btn.dataset.del)));
  }
}

// ── Filter ────────────────────────────────────
function applyFilter() {
  const q = $('searchInput').value.toLowerCase();
  const g = $('filterGender').value;
  renderTable(allData.filter(e =>
    (!q || e.name.toLowerCase().includes(q)) && (!g || e.gender === g)
  ));
}
on('searchInput', 'input', applyFilter);
on('filterGender', 'change', applyFilter);

// ── Modal Form (Tambah untuk semua, Edit hanya admin) ────────────
function openModal(title = 'Tambah Pegawai') {
  $('modalTitle').textContent = title;
  $('formError').classList.add('hidden');
  $('modalForm').classList.remove('hidden');
}
function closeModal() { $('modalForm').classList.add('hidden'); }

// Tombol Tambah aktif untuk semua user (admin & pegawai)
on('btnTambah',     'click', () => { $('formPegawai').reset(); $('empId').value = ''; openModal(); });
on('btnCloseModal', 'click', closeModal);
on('btnBatal',      'click', closeModal);

async function openEdit(id) {
  const res = await fetch(`${API}/${id}`);
  const json = await res.json();
  if (!json.success) return toast('Data tidak ditemukan.', 'error');
  const emp = json.data;
  $('empId').value = emp.id;
  $('empName').value = emp.name;
  $('empGender').value = emp.gender;
  $('empAge').value = emp.age;
  $('empEdu').value = emp.education;
  openModal('Edit Data Pegawai');
}

// ── Submit Form ───────────────────────────────
on('formPegawai', 'submit', async (e) => {
  e.preventDefault();
  const id = $('empId').value;
  const namaP = $('empName').value.trim();
  const body = {
    name: namaP,
    gender: $('empGender').value,
    age: parseInt($('empAge').value),
    education: $('empEdu').value,
  };

  const btn = $('btnSimpan');
  btn.textContent = 'Menyimpan...';
  btn.disabled = true;

  const url = id ? `${API}/${id}` : API;
  const method = id ? 'PUT' : 'POST';
  const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  const json = await res.json();

  btn.textContent = 'Simpan';
  btn.disabled = false;

  if (json.success) {
    closeModal();
    if (id) {
      // Mode Edit → tampilkan modal popup sukses
      openSuksesEdit(namaP);
    } else {
      // Mode Tambah → cukup toast
      toast(json.message);
    }
    load();
  } else {
    $('formError').textContent = json.message;
    $('formError').classList.remove('hidden');
  }
});

// ── Modal Sukses Edit ─────────────────────────
function openSuksesEdit(namaP) {
  $('suksesEditNama').textContent = `Data "${namaP}" telah berhasil diperbarui.`;
  $('modalSuksesEdit').classList.remove('hidden');
}
on('btnTutupSuksesEdit', 'click', () => $('modalSuksesEdit').classList.add('hidden'));

// ── Hapus ─────────────────────────────────────
function openHapus(id) {
  deleteTargetId = id;
  $('modalHapus').classList.remove('hidden');
}
on('btnBatalHapus', 'click', () => $('modalHapus').classList.add('hidden'));
on('btnKonfirmHapus', 'click', async () => {
  const res = await fetch(`${API}/${deleteTargetId}`, { method: 'DELETE' });
  const json = await res.json();
  $('modalHapus').classList.add('hidden');
  toast(json.message, json.success ? 'success' : 'error');
  if (json.success) load();
});

// ── Init ──────────────────────────────────────
load();
