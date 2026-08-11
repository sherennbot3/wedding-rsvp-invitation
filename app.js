// Edit this object to personalize the event before publishing.
const eventConfig = {
  title: 'Pesta 15 Tahun Ximena',
  // Local event start: Sabtu, 14 Maret 2026, 18.00 (Misa Syukur). Adjust the Z time to your timezone offset.
  start: '20260314T180000',
  end: '20260315T020000',
  target: '2026-03-14T18:00:00', // countdown target (local time)
  location: 'Gereja Sagrado Corazón',
  description: 'Misa Syukur dan Resepsi Pesta 15 Tahun Ximena.'
};

const opening = document.querySelector('#opening');
const openButton = document.querySelector('#open-button');
const bgMusic = document.querySelector('#bg-music');
const musicToggle = document.querySelector('#music-toggle');
const introVideo = document.querySelector('#intro-video');

// Intro video: if the local file is missing/unplayable, hide the <video> so the
// elegant CSS placeholder shows through. Guarded; no console errors when absent.
if (introVideo) {
  const markVideoMissing = () => introVideo.classList.add('is-missing');
  introVideo.addEventListener('error', markVideoMissing, true);
  const src = introVideo.querySelector('source');
  if (src) src.addEventListener('error', markVideoMissing);
  // If metadata never loads shortly after paint, assume the file is absent.
  window.addEventListener('load', () => {
    if (introVideo.readyState === 0) markVideoMissing();
  });
}

// Background music controls. Guard against a missing <audio> element so the
// page works with zero console errors even when audio/lagu.mp3 is absent.
function updateMusicToggle() {
  if (!musicToggle || !bgMusic) return;
  const playing = !bgMusic.paused;
  musicToggle.setAttribute('aria-pressed', playing ? 'true' : 'false');
}
if (bgMusic && musicToggle) {
  musicToggle.hidden = false;
  musicToggle.addEventListener('click', () => {
    if (bgMusic.paused) {
      bgMusic.play().then(updateMusicToggle).catch(() => {});
    } else {
      bgMusic.pause();
      updateMusicToggle();
    }
  });
  bgMusic.addEventListener('play', updateMusicToggle);
  bgMusic.addEventListener('pause', updateMusicToggle);
}

// Opening state: tap to open. The tap is a valid user gesture, so we start the
// background song here (wrapped in .catch to silently ignore autoplay policy
// rejections or a missing audio file).
openButton.addEventListener('click', () => {
  opening.classList.add('is-opened');
  opening.setAttribute('aria-hidden', 'true');
  if (bgMusic) {
    bgMusic.play().then(updateMusicToggle).catch(() => {});
  }
  setTimeout(() => {
    opening.hidden = true;
    document.querySelector('#invitation').focus();
  }, 550);
});

// Live countdown.
const cd = {
  days: document.querySelector('#cd-days'),
  hours: document.querySelector('#cd-hours'),
  minutes: document.querySelector('#cd-minutes'),
  seconds: document.querySelector('#cd-seconds')
};
const targetDate = new Date(eventConfig.target);
function pad(n) { return String(n).padStart(2, '0'); }
function updateCountdown() {
  const diff = targetDate.getTime() - Date.now();
  if (diff <= 0) {
    cd.days.textContent = '00';
    cd.hours.textContent = '00';
    cd.minutes.textContent = '00';
    cd.seconds.textContent = '00';
    return;
  }
  const totalSeconds = Math.floor(diff / 1000);
  cd.days.textContent = pad(Math.floor(totalSeconds / 86400));
  cd.hours.textContent = pad(Math.floor((totalSeconds % 86400) / 3600));
  cd.minutes.textContent = pad(Math.floor((totalSeconds % 3600) / 60));
  cd.seconds.textContent = pad(totalSeconds % 60);
}
updateCountdown();
const countdownTimer = setInterval(updateCountdown, 1000);

// ICS calendar download (informational).
function escapeICS(value) {
  return value.replace(/\\/g, '\\\\').replace(/,/g, '\\,').replace(/;/g, '\\;').replace(/\n/g, '\\n');
}
function createCalendarFile() {
  const stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  return [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Ximena XV Anos//ES', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH',
    'BEGIN:VEVENT', 'UID:ximena-xv-20260314@invitacion.local', `DTSTAMP:${stamp}`,
    `DTSTART:${eventConfig.start}`, `DTEND:${eventConfig.end}`,
    `SUMMARY:${escapeICS(eventConfig.title)}`, `LOCATION:${escapeICS(eventConfig.location)}`,
    `DESCRIPTION:${escapeICS(eventConfig.description)}`, 'END:VEVENT', 'END:VCALENDAR'
  ].join('\r\n');
}
function downloadCalendar() {
  const blob = new Blob([createCalendarFile()], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'xv-anos-ximena.ics';
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
document.querySelector('#calendar-button').addEventListener('click', downloadCalendar);

window.createCalendarFile = createCalendarFile;
