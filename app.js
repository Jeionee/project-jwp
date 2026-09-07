// =====================
// DATA DUMMY TRANSAKSI
// =====================
const transactions = [
  { id: '#TRX001', customer: 'Budi Santoso', product: 'Laptop ASUS', amount: 'Rp 8.500.000', status: 'Selesai' },
  { id: '#TRX002', customer: 'Siti Rahayu', product: 'Baju Batik', amount: 'Rp 250.000', status: 'Selesai' },
  { id: '#TRX003', customer: 'Andi Wijaya', product: 'Samsung Galaxy', amount: 'Rp 6.200.000', status: 'Proses' },
  { id: '#TRX004', customer: 'Dewi Lestari', product: 'Kue Ulang Tahun', amount: 'Rp 450.000', status: 'Selesai' },
  { id: '#TRX005', customer: 'Rudi Hartono', product: 'Headphone Sony', amount: 'Rp 1.100.000', status: 'Dibatalkan' },
  { id: '#TRX006', customer: 'Maya Putri', product: 'Sepatu Nike', amount: 'Rp 850.000', status: 'Proses' },
  { id: '#TRX007', customer: 'Hendra Gunawan', product: 'Macbook Air', amount: 'Rp 17.000.000', status: 'Selesai' },
  { id: '#TRX008', customer: 'Indah Permata', product: 'Tas Ransel', amount: 'Rp 320.000', status: 'Selesai' },
  { id: '#TRX009', customer: 'Fajar Nugroho', product: 'Monitor LG', amount: 'Rp 3.200.000', status: 'Proses' },
  { id: '#TRX010', customer: 'Rizky Pratama', product: 'Keyboard Mechanical', amount: 'Rp 780.000', status: 'Dibatalkan' },
];

// =====================
// RENDER TABEL
// =====================
function getStatusClass(status) {
  switch (status) {
    case 'Selesai': return 'bg-emerald-50 text-emerald-600';
    case 'Proses': return 'bg-sky-50 text-sky-600';
    case 'Dibatalkan': return 'bg-red-50 text-red-500';
    default: return 'bg-slate-50 text-slate-500';
  }
}

function renderTable(data) {
  const tbody = document.getElementById('transaction-table');
  tbody.innerHTML = data.map(t => `
    <tr class="hover:bg-slate-50 transition-colors">
      <td class="px-6 py-4 text-sm font-mono text-slate-400">${t.id}</td>
      <td class="px-6 py-4 text-sm font-medium text-slate-700">${t.customer}</td>
      <td class="px-6 py-4 text-sm text-slate-500">${t.product}</td>
      <td class="px-6 py-4 text-sm font-semibold text-slate-800">${t.amount}</td>
      <td class="px-6 py-4">
        <span class="text-xs font-medium px-2.5 py-1 rounded-full ${getStatusClass(t.status)}">${t.status}</span>
      </td>
    </tr>
  `).join('');
}

renderTable(transactions);

// =====================
// CHART: PENDAPATAN (LINE)
// =====================
const revenueCtx = document.getElementById('revenueChart').getContext('2d');
const revenueChart = new Chart(revenueCtx, {
  type: 'line',
  data: {
    labels: ['Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul'],
    datasets: [{
      label: 'Pendapatan',
      data: [32000000, 28000000, 41000000, 38000000, 45000000, 48500000],
      borderColor: '#6366f1',
      backgroundColor: 'rgba(99, 102, 241, 0.08)',
      borderWidth: 2.5,
      pointBackgroundColor: '#6366f1',
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      pointRadius: 5,
      tension: 0.4,
      fill: true,
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: ctx => 'Rp ' + ctx.raw.toLocaleString('id-ID')
        }
      }
    },
    scales: {
      y: {
        grid: { color: '#f1f5f9' },
        ticks: {
          color: '#94a3b8',
          callback: val => 'Rp ' + (val / 1000000).toFixed(0) + 'Jt'
        },
        border: { dash: [4, 4] }
      },
      x: {
        grid: { display: false },
        ticks: { color: '#94a3b8' }
      }
    }
  }
});

// =====================
// CHART: KATEGORI (DOUGHNUT)
// =====================
const categoryCtx = document.getElementById('categoryChart').getContext('2d');
new Chart(categoryCtx, {
  type: 'doughnut',
  data: {
    labels: ['Elektronik', 'Fashion', 'Makanan', 'Lainnya'],
    datasets: [{
      data: [42, 28, 18, 12],
      backgroundColor: ['#6366f1', '#38bdf8', '#34d399', '#fbbf24'],
      borderWidth: 0,
      hoverOffset: 6
    }]
  },
  options: {
    responsive: true,
    cutout: '72%',
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: ctx => ctx.label + ': ' + ctx.raw + '%'
        }
      }
    }
  }
});

// =====================
// NAVIGASI SIDEBAR AKTIF
// =====================
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelectorAll('.nav-link').forEach(l => {
      l.classList.remove('bg-indigo-50', 'text-indigo-600');
      l.classList.add('text-slate-500');
    });
    link.classList.add('bg-indigo-50', 'text-indigo-600');
    link.classList.remove('text-slate-500');
  });
});