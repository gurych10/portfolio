// Плавная прокрутка
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Глобальная переменная для текущего трека
let currentAudio = null;

// Функция сброса всех классов треков (динамически)
function resetTrackClasses() {
    const body = document.body;
    const trackClasses = Array.from(body.classList).filter(cls => cls.match(/^track\d+-bg$/));
    body.classList.remove(...trackClasses);
    console.log('Сброшены классы треков:', trackClasses); // Лог для отладки
    // Принудительная перерисовка
    setTimeout(() => {
        body.offsetHeight; // Reflow
    }, 20);
}

// Функция паузы всех треков кроме текущего (асинхронная)
async function pauseAll(excludeAudio) {
    console.log('Пауза всех треков...');
    for (let player of players) {
        const audio = player.querySelector('audio');
        const btn = player.querySelector('.play-btn');
        const progress = player.querySelector('.progress');
        if (audio !== excludeAudio && !audio.paused) {
            audio.pause();
            audio.currentTime = 0;
            btn.textContent = '▶';
            btn.classList.remove('playing');
            progress.style.width = '0%';
            console.log(`Пауза трека ${Array.from(players).indexOf(player) + 1}`);
        }
    }
    // Сброс всех фонов треков
    resetTrackClasses();
}

// Кастомный плеер
const players = document.querySelectorAll('.custom-player');
players.forEach((player, index) => {
    const btn = player.querySelector('.play-btn');
    const audio = player.querySelector('audio');
    const progress = player.querySelector('.progress');
    const timeEl = player.querySelector('.time');
    const volumeSlider = player.querySelector('input[type="range"]');
    const volumeIcon = player.querySelector('.volume-icon');
    const coverImg = player.querySelector('.track-cover'); // Если добавил обложки
    let isPlaying = false;
    let currentTime = 0;

    // По умолчанию громкость 80%
    const defaultVolume = 0.8;
    volumeSlider.value = defaultVolume;
    audio.volume = defaultVolume;
    
    function updateVolumeIcon() {
        if (audio.volume === 0) {
            volumeIcon.textContent = '🔇';
        } else {
            volumeIcon.textContent = '🔊';
        }
    }
    updateVolumeIcon();

    // Клик по кнопке play/pause
    btn.addEventListener('click', async () => {
        if (isPlaying) {
            console.log(`Пауза текущего трека ${index + 1}`);
            audio.pause();
            btn.textContent = '▶';
            btn.classList.remove('playing');
            if (currentAudio === audio) {
                currentAudio = null;
            }
            resetTrackClasses(); // Динамический сброс
            if (coverImg) {
                coverImg.classList.remove('show');
                setTimeout(() => coverImg.style.display = 'none', 500);
            }
            isPlaying = false;
        } else {
            await pauseAll(audio);
            await new Promise(resolve => setTimeout(resolve, 100));
            try {
                console.log(`Play трека ${index + 1}`);
                await audio.play();
                btn.textContent = '⏸';
                btn.classList.add('playing');
                setTimeout(() => {
                    resetTrackClasses(); // Ещё раз сброс перед добавлением
                    document.body.classList.add(`track${index + 1}-bg`);
                }, 50);
                currentAudio = audio;
                if (coverImg) {
                    coverImg.style.display = 'block';
                    setTimeout(() => coverImg.classList.add('show'), 10);
                }
                isPlaying = true;
            } catch (error) {
                console.error('Ошибка воспроизведения:', error);
                alert('Не удалось запустить аудио. Проверь файл или браузер.');
            }
        }
    });

    // Прогресс и время
    audio.addEventListener('loadedmetadata', () => {
        timeEl.textContent = '0:00 / ' + formatTime(audio.duration);
    });
    audio.addEventListener('timeupdate', () => {
        if (audio.duration) {
            const percent = (audio.currentTime / audio.duration) * 100;
            progress.style.width = percent + '%';
            currentTime = audio.currentTime;
            timeEl.textContent = formatTime(currentTime) + ' / ' + formatTime(audio.duration);
        }
    });

    // Клик по прогрессу
    player.querySelector('.progress-bar').addEventListener('click', (e) => {
        if (audio.duration) {
            const rect = e.currentTarget.getBoundingClientRect();
            const pos = (e.clientX - rect.left) / rect.width;
            audio.currentTime = pos * audio.duration;
        }
    });

    // Громкость
    volumeSlider.addEventListener('input', () => {
        audio.volume = parseFloat(volumeSlider.value);
        updateVolumeIcon();
    });

    // Завершение трека
    audio.addEventListener('ended', () => {
        console.log(`Трек ${index + 1} завершён`);
        btn.textContent = '▶';
        btn.classList.remove('playing');
        isPlaying = false;
        progress.style.width = '0%';
        if (currentAudio === audio) {
            currentAudio = null;
        }
        resetTrackClasses(); // Динамический сброс
        if (coverImg) {
            coverImg.classList.remove('show');
            setTimeout(() => coverImg.style.display = 'none', 500);
        }
    });

    // Ошибка загрузки аудио
    audio.addEventListener('error', (e) => {
        console.error('Ошибка загрузки аудио:', e);
        btn.textContent = '❌';
        timeEl.textContent = 'Ошибка файла';
    });
});

// Формат времени
function formatTime(seconds) {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return mins + ':' + (secs < 10 ? '0' : '') + secs;
}
// Темный режим
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    // Переключаем иконки кнопки
    const sun = document.querySelector('.sun');
    const moon = document.querySelector('.moon');
    if (isDark) {
        sun.style.display = 'none';
        moon.style.display = 'block';
    } else {
        sun.style.display = 'block';
        moon.style.display = 'none';
    }
}

// Загрузка сохранённой темы при старте
window.addEventListener('load', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        // Иконки
        document.querySelector('.sun').style.display = 'none';
        document.querySelector('.moon').style.display = 'block';
    }
});
// Инициализация анимаций (fade-in по скроллу)
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationDelay = '0.2s';
            entry.target.classList.add('animate-fade');
        }
    });
});
document.querySelectorAll('.animate-fade').forEach(el => observer.observe(el));

