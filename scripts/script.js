function checkOrientation() {
    const warning = document.querySelector('.rotate-warning');
    if (window.innerHeight > window.innerWidth) {
        warning.style.display = 'flex'; 
        console.log('Показываем предупреждение')
    } else {
        warning.style.display = 'none'; 
        console.log('Скрываем предупреждение')
    }
}

window.addEventListener('resize', checkOrientation);
window.addEventListener('load', checkOrientation);


function requestFullscreen(){
    const element =document.documentElement;

    if(element.requestFullscreen){
        element.requestFullscreen();

    }else if (element.webkitRequestFullscreen){
        element.webkitRequestFullscreen()// Safari
    }else if (elem.mozRequestFullScreen) { 
        elem.mozRequestFullScreen();// Firefox
    } else if (elem.msRequestFullscreen) { 
        elem.msRequestFullscreen();// IE/Edge
    }
}


// Автоматический запрос 
document.addEventListener('click', function enableFullscreen() {
    requestFullscreen();
    document.removeEventListener('click', enableFullscreen);
}, { once: true });

// Скрыть адресную строку на мобильных 
window.addEventListener('load', () => {
    setTimeout(() => {
        window.scrollTo(0, 1);
    }, 0);
});
