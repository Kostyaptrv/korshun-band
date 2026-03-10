// main.js — Логика сайта "Дыхание Волка"

// Обновление времени (имитация активности)
function updateTimestamp() {
    const now = new Date().toISOString().split('.')[0].replace('T', ' ');
    const el = document.getElementById('last-update');
    if (el) el.textContent = now;
}
setInterval(updateTimestamp, 1000);
updateTimestamp(); // Первый вызов

// Голосование
function vote(theme) {
    alert(`Твой выбор "${theme}" отправлен в ядро.\nРешение будет принято в ближайшие 6 часов.`);
}

// Ночной режим
function toggleNight() {
    document.body.classList.toggle('night');
}

// Плавное появление элементов
document.addEventListener("DOMContentLoaded", () => {
    const fadeElements = document.querySelectorAll('.card, h1, h2, h3, p, .btn');

    const fadeInOnScroll = () => {
        fadeElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementTop < windowHeight - 100 && !el.classList.contains('visible')) {
                el.classList.add('visible');
            }
        });
    };

    fadeElements.forEach(el => {
        el.classList.add('fade-in');
    });

    fadeInOnScroll();
    window.addEventListener('scroll', fadeInOnScroll);
});