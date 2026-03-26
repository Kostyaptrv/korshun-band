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

// === WEB AUDIO: АТМОСФЕРНЫЙ ЗВУК (без файлов) ===
function initWebAudio() {
  const toggleBtn = document.getElementById('audio-toggle');
  if (!toggleBtn) return;

  let audioCtx = null;
  let noiseNode = null;
  let isPlaying = false;

  // Создаём звук
  function createSound() {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    // Генерируем шум (металлический фон)
    const bufferSize = 2 * audioCtx.sampleRate;
    const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    noiseNode = audioCtx.createBufferSource();
    noiseNode.buffer = noiseBuffer;
    noiseNode.loop = true;

    // Фильтр — низкие частоты (как гул машины)
    const filter = audioCtx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 800;

    // Громкость
    const gainNode = audioCtx.createGain();
    gainNode.gain.value = 0.08; // Тихо, но ощутимо

    // Подключаем
    noiseNode.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    // Запускаем
    noiseNode.start();
  }

  // Кнопка
  toggleBtn.addEventListener('click', () => {
    if (isPlaying) {
      // Остановить
      if (noiseNode) {
        noiseNode.stop();
        noiseNode = null;
      }
      if (audioCtx) {
        audioCtx.close();
        audioCtx = null;
      }
      toggleBtn.textContent = '🔇';
      toggleBtn.classList.remove('active');
    } else {
      // Запустить — только после клика!
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      createSound();

      toggleBtn.textContent = '🔊';
      toggleBtn.classList.add('active');
    }
    isPlaying = !isPlaying;
  });
}

// === ЭФФЕКТ ПРОБУЖДЕНИЯ ===
function initIntro() {
  const overlay = document.getElementById('intro-overlay');
  const text = document.getElementById('intro-text');

  if (!overlay) return;

  // Создаём сердцебиение (низкий удар)
  function playHeartbeat() {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.value = 80; // Глубокий тон

    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 1);
  }

  // Показываем текст
  overlay.style.display = 'flex';
  setTimeout(() => {
    overlay.classList.add('active');
    playHeartbeat(); // Удар 1
  }, 500);

  // Через 2 секунды — ещё удар и исчезновение
  setTimeout(() => {
    playHeartbeat(); // Удар 2
  }, 2500);

  // Через 3.5 сек — убираем затемнение
  setTimeout(() => {
    overlay.classList.add('fade-out');
    setTimeout(() => {
      overlay.style.display = 'none';
    }, 1500);
  }, 3500);
}

// === ГЛАВНАЯ ФУНКЦИЯ ===
document.addEventListener("DOMContentLoaded", () => {
  initIntro(); // ← Сначала пробуждение
  setTimeout(() => {
    animateLetters();
    initAOS();
    initThemeToggle();
    updateCountdowns();
    setInterval(updateCountdowns, 600000);
    animateEqualizer();
    initWebAudio();
  }, 3600); // Запуск анимаций после эффекта
});
