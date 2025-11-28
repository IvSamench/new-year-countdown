const mobileControl = document.querySelector('.mobile-control')
const fullScreenBtn = document.querySelector('.fullscreen-btn')
const warning = document.querySelector('.rotate-warning');



//проверка оринтации и устройств
function checkOrientation() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (window.innerHeight > window.innerWidth) {
        warning.style.display = 'flex';
        mobileControl.style.display = 'none'
        console.log('Показываем предупреждение')
    } else {
        warning.style.display = 'none';
        if (isMobile) {
            mobileControl.style.display = 'block'
            console.log('Устройство:Мобильное')
        } else {
            mobileControl.style.display = 'none'
            console.log('Устройство:ПК')
        }
        console.log('Скрываем предупреждение')
    }
}

window.addEventListener('resize', checkOrientation);
window.addEventListener('load', checkOrientation);

// полноэкранный режим 
function requestFullscreen() {
    const element = document.documentElement;

    if (element.requestFullscreen) {
        element.requestFullscreen();

    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen()// Safari
    } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();// Firefox
    } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();// IE/Edge
    }
}

// выход из полноэкранного
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen(); // Safari
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen(); // Firefox
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen(); // IE/Edge
    }
}
//Проверка какой экран
function isFullscreen() {

    return !!(
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement);

}


// Переключение полноэкранного режима
function toggleFullscreen() {
    if (isFullscreen()) {
        exitFullscreen();
        mobileControl.classList.add('mobile-control-animation')
    } else {
        requestFullscreen();
        mobileControl.classList.add('mobile-control-animation')

    }
}

document.addEventListener('touchstart', function (event) {
    console.log('Касание экрана');
    mobileControl.classList.remove('mobile-control-animation')
    mobileControl.classList.add('mobile-control-animation-reverse')
    setTimeout(() => {
        mobileControl.classList.remove('mobile-control-animation-reverse')
        mobileControl.classList.add('mobile-control-animation')
    }, 1500)
});



//событие переключателя
fullScreenBtn.addEventListener('click', function () {
    toggleFullscreen();

});

// Скрыть адресную строку на мобильных 
window.addEventListener('load', () => {
    setTimeout(() => {
        window.scrollTo(0, 1);
    }, 0);
});
