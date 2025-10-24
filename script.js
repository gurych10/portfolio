// Typewriter effect с чередованием текстов
const texts = [
    "Привет, как дела?",
    "Давай делать музыку вместе?"
];
let currentTextIndex = 0;

function typewriter() {
    const element = document.querySelector('.typewriter');
    const text = texts[currentTextIndex];
    element.innerHTML = ''; // Стираем предыдущий текст
    let i = 0;

    function type() {
        if (i < text.length) {
            // Печатаем с курсором
            element.innerHTML = text.substring(0, i + 1) + '<span class="cursor">|</span>';
            i++;
            setTimeout(type, 100); // Скорость печати (ms)
        } else {
            // Финал без курсора
            element.innerHTML = text;
            // Пауза 3 секунды перед следующим текстом
            setTimeout(() => {
                currentTextIndex = (currentTextIndex + 1) % texts.length; // Переключаем текст
                typewriter(); // Рекурсивный вызов для цикла
            }, 3000);
        }
    }

    type();
}

// Запуск typewriter при загрузке
window.addEventListener('load', typewriter);

// Реальная плей/пауза по клику на карточку
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', function() {
        const btn = this.querySelector('.play-btn');
        const audioId = btn.getAttribute('data-audio-id');
        const audio = document.getElementById(audioId);
        
        if (audio.paused) {
            // Пауза всех других аудио
            document.querySelectorAll('audio').forEach(a => {
                if (a !== audio) {
                    a.pause();
                    a.currentTime = 0;
                    const otherBtn = document.querySelector(`[data-audio-id="${a.id}"]`);
                    if (otherBtn) otherBtn.textContent = '▶';
                }
            });
            
            audio.play();
            btn.textContent = '⏸';
        } else {
            audio.pause();
            btn.textContent = '▶';
        }
    });
});
