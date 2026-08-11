// Edit this object to personalize the event before publishing.
const eventConfig = {
  title: 'Pernikahan Dira & Arka',
  start: '20261018T090000Z', // 16.00 WIB (UTC+7)
  end: '20261018T130000Z',
  location: 'Rumah Kaca Amerta, Jl. Puspa 18, Bandung',
  description: 'Akad dan resepsi pernikahan Dira & Arka.'
};

const opening = document.querySelector('#opening');
const clasp = document.querySelector('#brass-clasp');
const form = document.querySelector('#rsvp-form');
const thankYou = document.querySelector('#thank-you');
const rsvpSection = document.querySelector('#rsvp-section');
const formStatus = document.querySelector('#form-status');
const fields = [
  { input: document.querySelector('#guest-name'), error: document.querySelector('#name-error'), message: 'Mohon isi nama Anda.' },
  { input: document.querySelector('#attendance'), error: document.querySelector('#attendance-error'), message: 'Silakan pilih jawaban kehadiran.' },
  { input: document.querySelector('#guest-count'), error: document.querySelector('#count-error'), message: 'Silakan pilih jumlah tamu.' }
];

function escapeICS(value) { return value.replace(/\\/g, '\\\\').replace(/,/g, '\\,').replace(/;/g, '\\;').replace(/\n/g, '\\n'); }
function createCalendarFile() {
  const stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  return ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Dira Arka RSVP//ID', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH', 'BEGIN:VEVENT', `UID:dira-arka-20261018@rsvp.local`, `DTSTAMP:${stamp}`, `DTSTART:${eventConfig.start}`, `DTEND:${eventConfig.end}`, `SUMMARY:${escapeICS(eventConfig.title)}`, `LOCATION:${escapeICS(eventConfig.location)}`, `DESCRIPTION:${escapeICS(eventConfig.description)}`, 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
}
function downloadCalendar() {
  const blob = new Blob([createCalendarFile()], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob); const link = document.createElement('a');
  link.href = url; link.download = 'dira-arka-wedding.ics'; document.body.appendChild(link); link.click(); link.remove(); URL.revokeObjectURL(url);
}
function setFieldError(field, message = '') { field.error.textContent = message; field.input.classList.toggle('has-error', Boolean(message)); field.input.setAttribute('aria-invalid', String(Boolean(message))); }
function validateForm() { let isValid = true; fields.forEach((field) => { const message = field.input.value.trim() ? '' : field.message; setFieldError(field, message); if (message) isValid = false; }); return isValid; }

clasp.addEventListener('click', () => { opening.classList.add('is-opened'); opening.setAttribute('aria-hidden', 'true'); setTimeout(() => { opening.hidden = true; document.querySelector('#invitation').focus(); }, 550); });
fields.forEach((field) => field.input.addEventListener('input', () => setFieldError(field)));
document.querySelectorAll('#calendar-button, #calendar-button-success').forEach((button) => button.addEventListener('click', downloadCalendar));
form.addEventListener('submit', (event) => {
  event.preventDefault(); formStatus.textContent = '';
  if (!validateForm()) { formStatus.textContent = 'Periksa kembali kolom yang ditandai.'; fields.find((field) => !field.input.value.trim())?.input.focus(); return; }
  const name = document.querySelector('#guest-name').value.trim(); const attendance = document.querySelector('#attendance').value;
  document.querySelector('#guest-name-display').textContent = name;
  document.querySelector('#thank-you-message').textContent = attendance === 'hadir' ? 'Terima kasih telah mengonfirmasi. Kehadiran Anda akan membuat malam kami semakin terang.' : 'Terima kasih sudah memberi kabar. Doa baik Anda tetap kami simpan dekat di hati.';
  form.hidden = true; thankYou.hidden = false; rsvpSection.querySelector('.rsvp-card__heading').hidden = true; thankYou.focus();
});
window.createCalendarFile = createCalendarFile;
