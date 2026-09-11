const menu = document.querySelector('.menu-toggle');
const header = document.querySelector('.site-header');
menu.addEventListener('click', () => {
  const open = header.classList.toggle('nav-open');
  menu.setAttribute('aria-expanded', open);
  menu.textContent = open ? '×' : '☰';
});

const unitField = document.querySelector('#unit');
const dateField = document.querySelector('#date');
const rentalDaysField = document.querySelector('#rental-days');
const endDateField = document.querySelector('#end-date');
const endDateWrapper = document.querySelector('#end-date-field');

function formatDate(value) {
  return new Intl.DateTimeFormat('id-ID', { dateStyle: 'long' }).format(new Date(`${value}T00:00:00`));
}

function updateEndDate() {
  const days = Number(rentalDaysField.value);
  const showEndDate = days > 1;
  endDateWrapper.hidden = !showEndDate;
  endDateField.required = showEndDate;
  if (!showEndDate || !dateField.value) return;

  const calculatedEnd = new Date(`${dateField.value}T00:00:00`);
  calculatedEnd.setDate(calculatedEnd.getDate() + days - 1);
  endDateField.value = calculatedEnd.toISOString().slice(0, 10);
  endDateField.min = dateField.value;
}

rentalDaysField.addEventListener('change', updateEndDate);
dateField.addEventListener('change', updateEndDate);
document.querySelectorAll('.select-unit').forEach((button) => {
  button.addEventListener('click', () => {
    unitField.value = button.closest('.fleet-card').dataset.unit;
    document.querySelector('#booking').scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => unitField.focus(), 500);
  });
});

document.querySelector('#booking-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const unit = unitField.value;
  const date = dateField.value;
  const rentalDays = rentalDaysField.value;
  const endDate = endDateField.value;
  const passengers = document.querySelector('#passengers').value;
  const destination = document.querySelector('#destination').value;
  const rentalDate = rentalDays === '1'
    ? `Tanggal berangkat: ${formatDate(date)}`
    : `Tanggal berangkat: ${formatDate(date)}\nTanggal selesai: ${formatDate(endDate)}`;
  const message = `Halo Bagus Transport, saya ingin cek ketersediaan unit.\n\nArmada: ${unit}\nLama sewa: ${rentalDays} hari\n${rentalDate}\nJumlah penumpang: ${passengers} orang\nTujuan: ${destination}\n\nMohon info ketersediaan dan estimasi harganya, ya.`;
  window.open(`https://wa.me/6287771660715?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
});
