// === АНИМАЦИЯ БУКВ "КОРШУН" ===
function animateLetters() {
  const letters = gsap.utils.toArray(".letter");
  gsap.set("#korshun-title", { visibility: "visible" });

  letters.forEach((letter, i) => {
    gsap.to(letter, {
      opacity: 1,
      y: 0,
      rotationX: 0,
      duration: 0.8,
      ease: "back.out(1.2)",
      delay: parseFloat(letter.style.getPropertyValue("--delay")) || 0
    });
  });
}

// === ОБРАТНЫЙ ОТСЧЁТ ДО РЕЛИЗОВ ===
function updateCountdowns() {
  document.querySelectorAll('.countdown').forEach(el => {
    const dateStr = el.getAttribute('data-countdown');
    const releaseDate = new Date(dateStr + 'T00:00:00');
    const now = new Date();
    const diff = releaseDate - now;

    if (diff <= 0) {
      el.innerHTML = '<span style="color:#0f0">🟢 ВЫШЕЛ</span>';
      const card = el.closest('.release-card');
      if (!card.querySelector('.listen-link')) {
        const link = document.createElement('a');
        link.href = 'music.html';
        link.textContent = '→ Слушать';
        link.className = 'listen-link';
        card.appendChild(link);
      }
    } else {
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      el.querySelector('span').textContent = `${days} дн. ${hours} ч.`;
    }
  });
}

// === ПЕРЕКЛЮЧЕНИЕ ТЕМЫ ===
function initThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  let isDark = true;

  themeToggle.addEventListener('click', () => {
    if (isDark) {
      document.body.classList.add('light');
      document.body.style.background = '#f0f0f0';
      document.body.style.color = '#111';
      document.querySelector('.waves path').setAttribute('fill', '#f0f0f0');
      themeToggle.textContent = '🌙';
    } else {
      document.body.classList.remove('light');
      document.body.style.background = '#0a0a0a';
      document.body.style.color = '#f1faee';
      document.querySelector('.waves path').setAttribute('fill', '#0a0a0a');
      themeToggle.textContent = '👁️';
    }
    isDark = !isDark;
  });
}

// === ИНИЦИАЛИЗАЦИЯ AOS ===
function initAOS() {
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true
  });
}

// === АНИМАЦИЯ ЭКВАЛАЙЗЕРА ===
function animateEqualizer() {
  const bars = document.querySelectorAll('.bar');
  bars.forEach((bar, i) => {
    bar.style.animationDelay = `${i * 0.1}s`;
  });
}

// === ГЛАВНАЯ ФУНКЦИЯ ===
document.addEventListener("DOMContentLoaded", () => {
  animateLetters();
  initAOS();
  initThemeToggle();
  updateCountdowns();
  setInterval(updateCountdowns, 600000); // Каждые 10 минут
  animateEqualizer(); // Запуск анимации эквалайзера
});
