// Получение текущего времени пользователя
export function getUserTime() {
    const now = new Date();
    return now.toLocaleTimeString([], {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
}

// Получение часового пояса пользователя
export function getUserTimeZone() {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

// Получение местоположения пользователя
export async function getUserCityCountry() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject('Геолокация не поддерживается');
        } else {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;

                try {
                    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
                    const data = await response.json();

                    resolve({
                        city: data.address.city || data.address.town || data.address.village,
                        country: data.address.country
                    });
                } catch (error) {
                    reject('Ошибка при получении данных о местоположении');
                }
            }, (error) => reject(error.message));
        }
    });
}

