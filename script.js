// Typewriter effect с чередованием текстов (без изменений)
const texts = [
    "Привет, как дела?",
    "Давай делать музыку вместе?"
];
let currentTextIndex = 0;

function typewriter() {
    const element = document.querySelector('.typewriter');
    const text = texts[currentTextIndex];
    element.innerHTML = '';
    let i = 0;

    function type() {
        if (i < text.length) {
            element.innerHTML = text.substring(0, i + 1) + '<span class="cursor">|</span>';
            i++;
            setTimeout(type, 100);
        } else {
            element.innerHTML = text;
            setTimeout(() => {
                currentTextIndex = (currentTextIndex + 1) % texts.length;
                typewriter();
            }, 3000);
        }
    }

    type();
}

window.addEventListener('load', typewriter);

// Плей/пауза для всех карточек (расширен на динамические)
function addAudioListener(card, audioId) {
    card.addEventListener('click', function(e) {
        if (e.target.classList.contains('play-btn')) return;  // Чтобы не дублировать
        const btn = this.querySelector('.play-btn');
        const audio = document.getElementById(audioId);
        
        if (audio.paused) {
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
}

// Инициализация для существующих карточек
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.card').forEach(card => {
        const audioId = card.querySelector('.play-btn').getAttribute('data-audio-id');
        addAudioListener(card, audioId);
    });
});

// НОВОЕ: Refresh Cards (замена на 8 новых)
const allTracks = [  // Пул из 32 треков (старые + новые; можно расширить)
    { id: 'audio1', title: 'Вместе шагаем', desc: 'Заводской ивент', img: 'assets/images/vmeste.png', audio: 'assets/music/track1.mp3'},
    { id: 'audio2', title: '30 лет', desc: 'Юбилей компании S.C.Johnson', img: 'assets/images/30years.png', audio: 'assets/music/track2.mp3'},
    { id: 'audio3', title: 'Proglade.ru', desc: 'Реклама', img: 'assets/images/proglade.png', audio: 'assets/music/track3.mp3'},
    { id: 'audio4', title: 'Байкал 4х4', desc: 'Гордость, честь. Лучший вездеход', img: 'assets/images/baikal.jpg', audio: 'assets/music/track4.mp3'},
    { id: 'audio5', title: 'Папа, мама, я', desc: 'Семейный фестиваль', img: 'assets/images/papamama.png"', audio: 'assets/music/track5.mp3'},
    { id: 'audio6', title: 'Феникс любви', desc: 'Любовь', img: 'assets/images/feniks.jpg', audio: 'assets/music/track6.mp3'},
    { id: 'audio7', title: 'Я с тобой до конца', desc: 'Обожаю тебя <3', img: 'assets/images/Ygasla.png', audio: 'assets/music/track7.mp3'},
    { id: 'audio8', title: 'Хотят ли русские войны?', desc: 'Евгений Александрович Евтушенко', img: 'assets/images/soldat.png', audio: 'assets/music/track8.mp3'},
    // Новые 24 (как в предыдущем, но сгенерированные для пула)
    { id: 'audio9', title: 'Воробей', desc: 'Заплатите чеканной монетой(18+)', img: 'assets/images/vorobei.jpg', audio: 'assets/music/track9.mp3'},
    { id: 'audio10', title: 'Заводские ритмы', desc: 'Про 101', img: 'assets/images/zavodskie.png', audio: 'assets/music/track10.mp3'},
    { id: 'audio11', title: 'Линия Глэйд', desc: 'Осторожно, присутствует МАТ 18+', img: 'assets/images/glade.png', audio: 'assets/music/track11.mp3'},
    { id: 'audio12', title: 'Кэдбери', desc: 'Навсегда в сердце', img: 'assets/images/cadbury.jpg', audio: 'assets/music/track12.mp3'},
    { id: 'audio13', title: 'Поезд в одиночество', desc: 'Чудовский поэт Батанов', img: 'assets/images/poezd.jpg', audio: 'assets/music/track13.mp3'},
    { id: 'audio14', title: 'Кэнкрашер', desc: 'Бегом давить банки', img: 'assets/images/crash.png', audio: 'assets/music/track14.mp3'},
    { id: 'audio15', title: 'Линия без сна', desc: 'Тяжёлые ночи ручного труда', img: 'assets/images/102.png', audio: 'assets/music/track15.mp3'},
    { id: 'audio16', title: 'Линия леди', desc: 'Про 104', img: 'assets/images/104.png', audio: 'assets/music/track16.mp3'},
    { id: 'audio17', title: 'Людей неинтересных в мире нет', desc: 'Евгений Александрович Евтушенко', img: 'assets/images/lydei.jpg', audio: 'assets/music/track17.mp3'},
    { id: 'audio18', title: 'Марафонец', desc: 'Брат-марафонец', img: 'assets/images/marafon.jpg', audio: 'assets/music/track18.mp3'},
    { id: 'audio19', title: 'Муравей', desc: 'Народный вездеход', img: 'assets/images/myravei.png', audio: 'assets/music/track19.mp3'},
    { id: 'audio20', title: 'Помню где-то и когда-то', desc: 'Евгений Александрович Евтушенко', img: 'assets/images/ruchei.jpg', audio: 'assets/music/track20.mp3'},
    { id: 'audio21', title: 'Рома+Света', desc: 'Любовная история', img: 'assets/images/roma.png', audio: 'assets/music/track21.mp3'},
    { id: 'audio22', title: 'Русский солдат', desc: 'О русском солдате', img: 'assets/images/soldat3.png', audio: 'assets/music/track22.mp3'},
    { id: 'audio23', title: 'Русский солдат 2', desc: 'О русском солдате', img: 'assets/images/soldat2.png', audio: 'assets/music/track23.mp3'},
    { id: 'audio24', title: 'Ты в кадре', desc: 'Рекламный трек', img: 'assets/images/vkadre.jpg', audio: 'assets/music/track24.mp3'},
    { id: 'audio25', title: 'Угасла', desc: 'Больше нет любви', img: 'assets/images/ygasla2.png', audio: 'assets/music/track25.mp3'},
    { id: 'audio26', title: 'ЭНЕРГОМАШ', desc: 'На стихи В.В. Козлова', img: 'assets/images/energo.jpg', audio: 'assets/music/track26.mp3'},
    { id: 'audio27', title: 'Логос', desc: 'Гимн родной школы', img: 'assets/images/logos.jpg', audio: 'assets/music/track27.mp3'},
    { id: 'audio28', title: '35 RWS', desc: 'Юбилей фанерной фабрики', img: 'assets/images/rws.png', audio: 'assets/music/track28.mp3'},
    { id: 'audio29', title: '60 ЧЖБШ', desc: 'Юбилей ЖБШ', img: 'assets/images/60.png', audio: 'assets/music/track29.mp3'},
    { id: 'audio30', title: 'Гена', desc: 'Гена из интеграла', img: 'assets/images/integral.png', audio: 'assets/music/track30.mp3'},
    { id: 'audio31', title: 'В пять утра', desc: 'На работу с утра', img: 'assets/images/rabota5.jpg', audio: 'assets/music/track31.mp3'},
    { id: 'audio32', title: 'Папа', desc: 'Лучший папа ', img: 'assets/images/papa.png', audio: 'assets/music/track32.mp3'}
];
    
function refreshCards() {
    const grid = document.getElementById('showcase-grid');
    const btn = document.getElementById('refresh-btn');
    
    // Шаг 1: Fade-out старых карточек
    grid.querySelectorAll('.card').forEach(card => {
        card.classList.add('fade-out');
    });
    
    btn.textContent = 'Меняю треки';
    btn.classList.add('refreshing');
    
    // Шаг 2: Очистка после анимации
    setTimeout(() => {
        grid.innerHTML = '';  // Удаляем старые
        
        // Шаг 3: Выбираем 8 уникальных рандомно
        const shuffled = allTracks.sort(() => 0.5 - Math.random());
        const newTracks = shuffled.slice(0, 8);
        
        // Шаг 4: Добавляем новые с fade-in
        newTracks.forEach((track, index) => {
            const card = document.createElement('div');
            card.className = 'card fade-in';
            card.innerHTML = `
                <img src="${track.img}" alt="${track.title}" loading="lazy" width="300" height="150">
                <h3>${track.title}</h3>
                <p>${track.desc}</p>
                <div class="card-footer">
                <button class="play-btn" data-audio-id="${track.id}">▶</button>
                <audio id="${track.id}" preload="none" src="${track.audio}"></audio>
            `;
            grid.appendChild(card);
            
            // Задержка для staggered анимации (по 100ms)
            setTimeout(() => {
                card.classList.remove('fade-in');
            }, index * 100);
            
            // Добавляем listener для новой карточки
            addAudioListener(card, track.id);
        });
        
         // Шаг 5: Сброс кнопки + скролл на мобильке к началу grid
        setTimeout(() => {
            btn.textContent = 'Покажи ещё треки';
            btn.classList.remove('обновляю');
            btn.style.opacity = '1';
            btn.style.background = 'linear-gradient(45deg, #A100FF, #FF0080)';  // НОВОЕ: Прямой сброс градиента
            btn.style.cursor = 'pointer';  
            
            // НОВОЕ: Автоскролл только на мобильке после анимации
            if (window.innerWidth <= 768) {
                setTimeout(() => {
                    grid.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start' 
                    });
                }, 200);  // Лёгкая задержка для завершения fade-in
            }
        }, 800);
    }, 300);  // Пауза для fade-out
}

document.addEventListener('DOMContentLoaded', () => {
    // Если нужно fallback для клавиатуры/Enter: 
    const btn = document.getElementById('refresh-btn');
    btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            refreshCards();
        }
    });
    // Убрали click-listener, т.к. onclick в HTML
});

