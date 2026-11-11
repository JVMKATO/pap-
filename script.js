const intro = document.getElementById('intro');
const celebration = document.getElementById('celebration');
const openButton = document.getElementById('openButton');
const replayButton = document.getElementById('replayButton');
const confettiField = document.getElementById('confettiField');

let confettiTimer = null;
const symbols = ['✦', '✧', '◇', '•', '✺'];

function createConfetti(initial = false) {
  if (document.hidden || !celebration.classList.contains('show')) return;
  const piece = document.createElement('span');
  piece.className = 'confetti';
  piece.textContent = symbols[Math.floor(Math.random() * symbols.length)];
  const duration = 7 + Math.random() * 7;
  piece.style.left = `${Math.random() * 100}%`;
  piece.style.fontSize = `${10 + Math.random() * 19}px`;
  piece.style.setProperty('--fall-time', `${duration}s`);
  piece.style.setProperty('--drift', `${Math.round(Math.random() * 150 - 75)}px`);
  if (initial) piece.style.animationDelay = `${Math.random() * 5}s`;
  confettiField.appendChild(piece);
  window.setTimeout(() => piece.remove(), (duration + 6) * 1000);
}

function startConfetti() {
  stopConfetti();
  confettiField.innerHTML = '';
  for (let i = 0; i < 24; i++) createConfetti(true);
  confettiTimer = window.setInterval(() => createConfetti(), 550);
}

function stopConfetti() {
  if (confettiTimer) {
    window.clearInterval(confettiTimer);
    confettiTimer = null;
  }
}

function openGreeting() {
  intro.classList.add('hide');
  celebration.classList.add('show');
  celebration.setAttribute('aria-hidden', 'false');
  startConfetti();
  window.setTimeout(() => document.getElementById('mensaje').focus?.(), 500);
}

function replayGreeting() {
  stopConfetti();
  confettiField.innerHTML = '';
  celebration.classList.remove('show');
  celebration.setAttribute('aria-hidden', 'true');
  intro.classList.remove('hide');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

openButton.addEventListener('click', openGreeting);
replayButton.addEventListener('click', replayGreeting);

document.addEventListener('visibilitychange', () => {
  if (document.hidden) stopConfetti();
  else if (celebration.classList.contains('show')) startConfetti();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && celebration.classList.contains('show')) replayGreeting();
});
