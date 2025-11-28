// получение времмени пользователя устройстсва
function getUserTime(){
    let now= new Date();
    const time =now.toLocaleTimeString([],{
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: "2-digit" 
    });
    return time;

}
// получение часового пояса пользователя с устройства

function getUserTimeZone(){
    return Intl.DateTimeFormat().resolvedOptions().timeZone;


}

// местоположение пользователяб если получим разрешение

async function getUserCityCountry() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject('Геолокация не поддерживается');
    } else {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;

        // Используем Nominatim
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
        const data = await response.json();

        resolve({
          city: data.address.city || data.address.town || data.address.village,
          country: data.address.country
        });
      }, (error) => reject(error.message));
    }
  });
}

getUserCityCountry()
  .then(loc => console.log(loc)) // {city: "Vilnius", country: "Lithuania"}
  .catch(err => console.log('Ошибка:', err));
// setInterval(()=>{
//     console.log(getUserTime())
// })// время в консоли проверка
console.log(getUserTimeZone())

