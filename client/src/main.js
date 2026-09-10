import Chart from 'chart.js/auto';

const API = '/api/pegawai';

let genderChart, eduChart, ageChart;

// ── Fetch semua data ──────────────────────────
async function fetchData() {
  const res  = await fetch(API);
  const json = await res.json();
  return json.success ? json.data : [];
}

// ── Render KPI Cards ──────────────────────────
function renderKPIs(data) {
  const total  = data.length;
  const pria   = data.filter(e => e.gender === 'Laki-laki').length;
  const wanita = data.filter(e => e.gender === 'Perempuan').length;
  const avgAge = total > 0
    ? Math.round(data.reduce((acc, e) => acc + Number(e.age), 0) / total)
    : 0;

  document.getElementById('kpiCards').innerHTML = `
    <div class="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all">
      <span class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Pegawai</span>
      <p class="text-3xl font-extrabold text-slate-800 mt-2">${total}</p>
      <div class="flex items-center gap-1 text-[11px] text-slate-400 mt-1">
        <span class="text-emerald-600 font-semibold">100%</span>
        <span>terdaftar di sistem</span>
      </div>
    </div>

    <div class="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all">
      <span class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Laki-laki</span>
      <p class="text-3xl font-extrabold text-slate-800 mt-2">${pria}</p>
      <div class="flex items-center gap-1 text-[11px] text-slate-400 mt-1">
        <span class="text-blue-600 font-semibold">${total ? Math.round((pria / total) * 100) : 0}%</span>
        <span>dari total pegawai</span>
      </div>
    </div>

    <div class="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all">
      <span class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Perempuan</span>
      <p class="text-3xl font-extrabold text-slate-800 mt-2">${wanita}</p>
      <div class="flex items-center gap-1 text-[11px] text-slate-400 mt-1">
        <span class="text-rose-500 font-semibold">${total ? Math.round((wanita / total) * 100) : 0}%</span>
        <span>dari total pegawai</span>
      </div>
    </div>

    <div class="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all">
      <span class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Rata-rata Usia</span>
      <p class="text-3xl font-extrabold text-slate-800 mt-2">${avgAge} <span class="text-sm font-normal text-slate-400">Tahun</span></p>
      <div class="flex items-center gap-1 text-[11px] text-slate-400 mt-1">
        <span class="text-amber-600 font-semibold">Usia Rata-rata</span>
        <span>keseluruhan pegawai</span>
      </div>
    </div>`;
}

// ── Render Preview Table ──────────────────────
function renderPreview(data) {
  const tbody = document.getElementById('previewTable');
  const top5  = data.slice(0, 5);
  if (!top5.length) {
    tbody.innerHTML = '<tr><td colspan="5" class="px-6 py-8 text-center text-slate-400 text-xs">Belum ada data pegawai.</td></tr>';
    return;
  }
  tbody.innerHTML = top5.map(emp => `
    <tr class="hover:bg-slate-50/80 cursor-pointer transition-colors" onclick="window.location.href='/pegawai.html'">
      <td class="px-6 py-3.5 text-slate-400 font-mono text-xs font-medium">#${emp.id}</td>
      <td class="px-6 py-3.5">
        <span class="font-semibold text-slate-800 text-sm">${emp.name}</span>
      </td>
      <td class="px-6 py-3.5">
        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${emp.gender === 'Laki-laki' ? 'bg-blue-50 text-blue-700 border border-blue-200/60' : 'bg-rose-50 text-rose-700 border border-rose-200/60'}">
          ${emp.gender}
        </span>
      </td>
      <td class="px-6 py-3.5 text-slate-600 text-xs font-medium">
        <span class="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md border border-slate-200/60">
          ${emp.education}
        </span>
      </td>
      <td class="px-6 py-3.5 text-slate-600">
        <div class="flex items-center gap-2">
          <div class="w-20 h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200/40">
            <div class="h-full bg-emerald-500 rounded-full" style="width: ${Math.min((emp.age / 60) * 100, 100)}%"></div>
          </div>
          <span class="text-xs font-medium text-slate-600">${emp.age} Thn</span>
        </div>
      </td>
    </tr>`).join('');
}

// ── Render Charts ─────────────────────────────
function renderCharts(data) {
  const genderCount = { 'Laki-laki': 0, 'Perempuan': 0 };
  const eduCount    = { 'SMA/SMK': 0, 'D3': 0, 'S1': 0, 'S2': 0 };
  const ageCount    = { '<25': 0, '25-30': 0, '31-40': 0, '>40': 0 };

  data.forEach(emp => {
    if (genderCount[emp.gender] !== undefined) genderCount[emp.gender]++;
    if (eduCount[emp.education] !== undefined) eduCount[emp.education]++;
    const age = Number(emp.age);
    if (age < 25)       ageCount['<25']++;
    else if (age <= 30) ageCount['25-30']++;
    else if (age <= 40) ageCount['31-40']++;
    else                ageCount['>40']++;
  });

  if (genderChart) genderChart.destroy();
  if (eduChart)    eduChart.destroy();
  if (ageChart)    ageChart.destroy();

  const opts = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { backgroundColor: '#065f46', padding: 10, cornerRadius: 8, displayColors: false },
    },
    scales: {
      y: { beginAtZero: true, ticks: { stepSize: 1, color: '#64748b' }, grid: { color: '#f1f5f9' }, border: { display: false } },
      x: { grid: { display: false }, ticks: { color: '#64748b' }, border: { display: false } },
    },
  };

  function bar(id, labels, values, colors) {
    return new Chart(document.getElementById(id), {
      type: 'bar',
      data: {
        labels,
        datasets: [{ data: values, backgroundColor: colors, borderRadius: 6, barPercentage: 0.55 }],
      },
      options: opts,
    });
  }

  genderChart = bar('genderChart', Object.keys(genderCount), Object.values(genderCount), ['#10b981', '#fb7185']);
  eduChart    = bar('eduChart',    Object.keys(eduCount),    Object.values(eduCount),    ['#34d399', '#059669', '#10b981', '#6ee7b7']);
  ageChart    = bar('ageChart',    Object.keys(ageCount),    Object.values(ageCount),    '#10b981');
}

// ── Init ──────────────────────────────────────
async function init() {
  const data = await fetchData();
  renderKPIs(data);
  renderPreview(data);
  renderCharts(data);
}

init();
