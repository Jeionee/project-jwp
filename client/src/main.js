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
    <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
      <p class="text-sm font-medium text-slate-500">Total Pegawai</p>
      <p class="text-3xl font-bold text-slate-900 mt-1">${total}</p>
    </div>
    <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
      <p class="text-sm font-medium text-slate-500">Laki-laki</p>
      <p class="text-3xl font-bold text-blue-600 mt-1">${pria}</p>
    </div>
    <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
      <p class="text-sm font-medium text-slate-500">Perempuan</p>
      <p class="text-3xl font-bold text-rose-500 mt-1">${wanita}</p>
    </div>
    <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
      <p class="text-sm font-medium text-slate-500">Rata-rata Usia</p>
      <p class="text-3xl font-bold text-emerald-600 mt-1">${avgAge} <span class="text-base font-normal text-slate-400">Thn</span></p>
    </div>`;
}

// ── Render Preview Table ──────────────────────
function renderPreview(data) {
  const tbody = document.getElementById('previewTable');
  const top5  = data.slice(0, 5);
  if (!top5.length) {
    tbody.innerHTML = '<tr><td colspan="5" class="px-6 py-8 text-center text-slate-400">Belum ada data.</td></tr>';
    return;
  }
  tbody.innerHTML = top5.map(emp => `
    <tr class="hover:bg-indigo-50 hover:shadow-sm cursor-pointer transition-all duration-200" onclick="window.location.href='/pegawai.html'">
      <td class="px-6 py-4 text-slate-400 font-mono text-xs">#${emp.id}</td>
      <td class="px-6 py-4 font-medium text-slate-800">${emp.name}</td>
      <td class="px-6 py-4">
        <span class="px-2.5 py-1 rounded-full text-xs font-medium ${emp.gender === 'Laki-laki' ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-rose-50 text-rose-700 border border-rose-200'}">
          ${emp.gender}
        </span>
      </td>
      <td class="px-6 py-4 text-slate-600">${emp.education}</td>
      <td class="px-6 py-4 text-slate-600">
        <div class="flex items-center gap-2">
          <div class="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
            <div class="h-full bg-emerald-400 rounded-full" style="width: ${(emp.age / 65) * 100}%"></div>
          </div>
          <span class="text-xs">${emp.age} Thn</span>
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
      tooltip: { backgroundColor: '#1e293b', padding: 12, cornerRadius: 8, displayColors: false },
    },
    scales: {
      y: { beginAtZero: true, ticks: { stepSize: 1 }, border: { display: false } },
      x: { grid: { display: false }, border: { display: false } },
    },
  };

  function bar(id, labels, values, colors) {
    return new Chart(document.getElementById(id), {
      type: 'bar',
      data: {
        labels,
        datasets: [{ data: values, backgroundColor: colors, borderRadius: 6, barPercentage: 0.6 }],
      },
      options: opts,
    });
  }

  genderChart = bar('genderChart', Object.keys(genderCount), Object.values(genderCount), ['#3b82f6', '#f43f5e']);
  eduChart    = bar('eduChart',    Object.keys(eduCount),    Object.values(eduCount),    '#10b981');
  ageChart    = bar('ageChart',    Object.keys(ageCount),    Object.values(ageCount),    '#6366f1');
}

// ── Init ──────────────────────────────────────
async function init() {
  const data = await fetchData();
  renderKPIs(data);
  renderPreview(data);
  renderCharts(data);
}

init();
