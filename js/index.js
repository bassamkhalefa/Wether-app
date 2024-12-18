
let country = 'sohag', lang = 'en';

const location_field = document.querySelector('.location-field');
const findBtn = document.getElementById('findBtn');
const lang_btns = document.querySelectorAll('.lang-btns');

findBtn.addEventListener('click', (eventInfo) => {
    eventInfo.preventDefault();
    country = location_field.value.trim().toLowerCase();
    if (country === '')
        country = 'sohag'
    startAPi(country, lang);
});



location_field.addEventListener("keyup", function () {
    debugger;
    country = location_field.value.trim().toLowerCase();
    if (country === '')
        country = 'sohag'
    startAPi(country, lang);
})

for (let i = 0; i < lang_btns.length; i++) {
    lang_btns[i].addEventListener('click', (eventInfo) => {
        lang = eventInfo.target.getAttribute('data-lang');

        startAPi(country, lang);
    });
}

let allItems = [];
startAPi(country, lang);
async function startAPi(country, lang) {
    let responseAPI = await fetch(` https://api.weatherapi.com/v1/forecast.json?key=186cb37da6ab4f94848130640231808&q=${country}&days=3&lang=${lang}`);
    allItems = await responseAPI.json();

    getData();
}
function getData() {
    displayWeatherCard1(allItems);
    displayWeatherCard2and3(allItems, index = 1);
    displayWeatherCard2and3(allItems, index = 2);
    document.querySelector('.site-description').innerHTML = ` of ( ${allItems.location.name} )`;

}
function displayWeatherCard1(currentWeather) {
    let cartona = ``;
    cartona = `
    <div class="weather-card h-100 ">
            <div class="weather-date-info d-flex justify-content-between p-2">
                <span class="weather-day">${formatDate(getCurrentDate()).day}</span>
                <span class="weather-date">${formatDate(getCurrentDate()).formattedDate}</span>
            </div>
            <div class="weather-card-body p-3">
                <div class="location">Location: ${currentWeather.location.name}</div>
                <div class="country">Country: ${currentWeather.location.country}</div>
                <div class="region">Region: ${currentWeather.location.region}</div>
                <div class="weather-main d-flex align-items-center gap-4">
                    <div class="weather-main-degree">${Math.floor(currentWeather.forecast.forecastday[0].day.maxtemp_c)}<sup>o</sup>C</div>
                    <div class="weather-main-icon">
                        <img src="${currentWeather.forecast.forecastday[0].day.condition.icon}" alt='weather-icon'/>
                    </div>
                </div>
                <div class="weather-desc mb-3">${currentWeather.forecast.forecastday[0].day.condition.text}</div>
                <div class="weather-summary d-flex gap-3">
                    <div>
                        <span class="fa-solid fa-umbrella"></span>
                        <span>${currentWeather.forecast.forecastday[0].day.daily_chance_of_rain}%</span>
                    </div>
                    <div>
                        <span class="fa-solid fa-wind"></span>
                        <span>${currentWeather.current.wind_kph}km/h</span>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.querySelector('.weather-card-1').innerHTML = cartona;
}

function displayWeatherCard2and3(currentWeather, index) {
    let cardNum = index + 1;
    let cartona = ``;
    cartona += `
    <div class="weather-card h-100 text-center">
            <div class="weather-date-info p-2">
                <span class="weather-day">${formatDate(currentWeather.forecast.forecastday[index].date).day}</span>
            </div>
            <div class="weather-card-body p-3">
                <div class="weather-main-icon mb-4">
                <img src="${currentWeather.forecast.forecastday[index].day.condition.icon}" alt='weather-icon'/>
                </div>
                <div class="weather-main-degree">${Math.floor(currentWeather.forecast.forecastday[index].day.avgtemp_c)}<sup>o</sup>C</div>
                <div class="weather-degree mb-4">${Math.floor(currentWeather.forecast.forecastday[index].day.maxtemp_c)}<sup>o</sup>C</div>
                <div class="weather-desc">${currentWeather.forecast.forecastday[index].day.condition.text}</div>
            </div>
        </div> 
        </div>
    `;

    document.querySelector(`.weather-card-${cardNum}`).innerHTML = cartona;
}
function formatDate(dateString) {
    const dateObj = new Date(dateString);
    const formattedDay = dateObj.toLocaleString('en-US', { weekday: 'long' });
    const formattedDate = dateObj.toLocaleDateString('en-US', { day: 'numeric', month: 'long' });

    return {
        day: formattedDay,
        formattedDate: `${formattedDate}`
    };
}

function getCurrentDate() {
    const currentDate = new Date();
    return currentDate;
}




