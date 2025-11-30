


const targetDate = new Date('2025-12-31T23:59:59');
const videoTriggerTime = new Date('2025-12-31T23:59:40');

let videoPlayed = false;

const USE_FAKE_TIME = true;

const fakeTime = {
    year: 2025,
    month: 11,
    day: 31,
    hour: 23,
    minute: 59,
    second: 25
};

function updateFakeTime() {
    fakeTime.second++;
}

function getCurrentTime() {
    if (USE_FAKE_TIME) {
        return new Date(fakeTime.year, fakeTime.month, fakeTime.day, fakeTime.hour, fakeTime.minute, fakeTime.second);
    }
    return new Date();
}

// function testVideoTrigger() {
//     console.log('Тестирование запуска видео через 5 секунд...');
//     setTimeout(() => {
//         playFinalVideo();
//     }, 5000);
// }

function playFinalVideo() {
    const video = document.querySelector('.final');
    const content = document.querySelector('.content');
  
    
    content.style.visibility = 'hidden';
    
    
    video.style.visibility = 'visible';
    video.style.display = 'block';
    video.style.position = 'fixed';
    video.style.top = '0';
    video.style.left = '0';
    video.style.width = '100vw';
    video.style.height = '100vh';
    video.style.objectFit = 'cover';
    video.style.zIndex = '10000';

    
    setTimeout(()=>{
        video.style.visibility = 'hidden'
        content.style.visibility = 'visible'
    },25000)
    video.play().catch(err => console.log('Ошибка воспроизведения видео:', err));
    
    videoPlayed = true;
    console.log('Видео запущено!');
}

function countDown() {
    if (USE_FAKE_TIME) {
        updateFakeTime();
    }
    
    const now = getCurrentTime();
    
    const timeDifference = targetDate - now;

    if (!videoPlayed && now >= videoTriggerTime) {
        playFinalVideo();
        return;
    }

    if (timeDifference > 0) {
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24)
        const minutes = Math.floor((timeDifference / (1000 * 60)) % 60)
        const seconds = Math.floor((timeDifference / 1000) % 60)

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');

    } else {
        document.querySelector('.countdown').textContent = 'С Новым Годом!'
    }
}

countDown();

setInterval(countDown, 1000)