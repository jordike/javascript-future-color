export default class WeatherModel {
    static API_KEY = '649f1122ae'; //300 requests per day 
    static CACHE_DURATION = 10 * 60 * 1000; //10m = max 144 request p/day unless city is switched. 
    static WEATHER_API_URL = `https://weerlive.nl/api/weerlive_api_v2.php?key=${WeatherModel.API_KEY}&locatie=`;

    static async fetchWeather(city) {
        const lastFetched = localStorage.getItem('lastFetched');
        const weatherData = JSON.parse(localStorage.getItem('weatherData'));
        const currentTime = new Date().getTime();

        //Check if valid cache exists, otherwise fetches data (to prevent too many requests)
        if (!weatherData || currentTime - lastFetched > WeatherModel.CACHE_DURATION || weatherData.city !== city) {
            const response = await fetch(WeatherModel.WEATHER_API_URL + city);
            const data = await response.json();

            localStorage.setItem('weatherData', JSON.stringify({ city, data }));
            localStorage.setItem('lastFetched', currentTime);

            return data;
        }

        //Uses already stored data if valid cache exists
        return weatherData.data;
    }
}