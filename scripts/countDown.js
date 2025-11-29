import { getUserTime, getUserTimeZone, getUserCityCountry, } from './userTime.js';


const targetDate = new Date('2025-12-31T23:59:59')// Новый год

function countDown() {
    const now = new Date();

    const timeDifference = targetDate - now;

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