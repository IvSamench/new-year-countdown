const mobileControl = document.querySelector('.mobile-control')
const fullScreenBtn = document.querySelector('.fullscreen-btn')
const warning = document.querySelector('.rotate-warning');

const audio = new Audio ("https://stream.thechristmasstation.org/main/64.aac?refresh=1764426639303")
audio.volume = 1; // громкость 100%

// Состояние звука
let soundEnabled = false; // По умолчанию 

// кнопки звука
const soundToggle = document.getElementById('soundToggle');
const soundOnIcon = document.getElementById('soundOn');
const soundOffIcon = document.getElementById('soundOff');

// переключения звука
function toggleSound() {
    soundEnabled = !soundEnabled;
    
    if (soundEnabled) {
        audio.play().catch(e => console.log('Ошибка воспроизведения:', e));
        soundOnIcon.classList.add('active');
        soundOffIcon.classList.remove('active');
    } else {
        audio.pause();
        soundOnIcon.classList.remove('active');
        soundOffIcon.classList.add('active');
    }
    
    // настройку в localStorage
    localStorage.setItem('soundEnabled', soundEnabled);
}

// Восстанавливаем настройку звука из localStorage
window.addEventListener('load', () => {
    const savedSound = localStorage.getItem('soundEnabled');
    if (savedSound !== null) {
        soundEnabled = savedSound === 'true';
    }
    
    if (soundEnabled) {
        audio.play().catch(e => console.log('Ошибка автовоспроизведения:', e));
        soundOnIcon.classList.add('active');
        soundOffIcon.classList.remove('active');
    } else {
        soundOnIcon.classList.remove('active');
        soundOffIcon.classList.add('active'); // Показываем иконку выключенного звука
    }
});

// Обработчик клика на кнопку
soundToggle.addEventListener('click', toggleSound);




//проверка оринтации и устройств
function checkOrientation() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (window.innerHeight > window.innerWidth) {
        warning.style.display = 'flex';
        mobileControl.style.display = 'flex'
        console.log('Показываем предупреждение')
    } else {
        warning.style.display = 'none';
        mobileControl.style.display = 'flex' // Кнопка звука всегда видна
        if (isMobile) {
            console.log('Устройство:Мобильное')
        } else {
            console.log('Устройство:ПК')
        }
        console.log('Скрываем предупреждение')
    }
}

window.addEventListener('resize', checkOrientation);
window.addEventListener('load', checkOrientation);

// // полноэкранный режим 
// function requestFullscreen() {
//     const element = document.documentElement;

//     if (element.requestFullscreen) {
//         element.requestFullscreen();
//     } else if (element.webkitRequestFullscreen) {
//         element.webkitRequestFullscreen(); // Safari
//     } else if (element.mozRequestFullScreen) {
//         element.mozRequestFullScreen(); // Firefox
//     } else if (element.msRequestFullscreen) {
//         element.msRequestFullscreen(); // IE/Edge
//     }
// }

// // выход из полноэкранного
// function exitFullscreen() {
//     if (document.exitFullscreen) {
//         document.exitFullscreen();
//     } else if (document.webkitExitFullscreen) {
//         document.webkitExitFullscreen(); // Safari
//     } else if (document.mozCancelFullScreen) {
//         document.mozCancelFullScreen(); // Firefox
//     } else if (document.msExitFullscreen) {
//         document.msExitFullscreen(); // IE/Edge
//     }
// }
// //Проверка какой экран
// function isFullscreen() {

//     return !!(
//         document.fullscreenElement ||
//         document.webkitFullscreenElement ||
//         document.mozFullScreenElement ||
//         document.msFullscreenElement);

// }


// // Переключение полноэкранного режима
// function toggleFullscreen() {
//     if (isFullscreen()) {
//         exitFullscreen();
//         mobileControl.classList.add('mobile-control-animation')
//     } else {
//         requestFullscreen();
//         mobileControl.classList.add('mobile-control-animation')

//     }
// }

// document.addEventListener('touchstart', function (event) {
//     console.log('Касание экрана');
//     mobileControl.classList.remove('mobile-control-animation')
//     mobileControl.classList.add('mobile-control-animation-reverse')
//     setTimeout(() => {
//         mobileControl.classList.remove('mobile-control-animation-reverse')
//         mobileControl.classList.add('mobile-control-animation')
//     }, 1500)
// });



// //событие переключателя
// fullScreenBtn.addEventListener('click', function () {
//     toggleFullscreen();

// });

// // Скрыть адресную строку на мобильных 
// window.addEventListener('load', () => {
//     setTimeout(() => {
//         window.scrollTo(0, 1);
//         console.log("Сработало")
//     }, 0);
// });
