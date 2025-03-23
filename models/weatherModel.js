import config from "../assets/data/config";

export default class WeatherModel {
    static async fetchWeather(city) {
        const lastFetched = localStorage.getItem('lastFetched');
        const weatherData = JSON.parse(localStorage.getItem('weatherData'));
        const currentTime = new Date().getTime();

        //Check if valid cache exists, otherwise fetches data (to prevent too many requests)
        if (!weatherData || currentTime - lastFetched > config.CACHE_DURATION|| weatherData.city !== city) {
            const response = await fetch(config.WEATHER_API_URL + city);
            const data = await response.json();

            
            const { temp, image } = data.liveweer[0]; //Extracting only necessary data
            const extractedData = { city, temp, condition: image }; //Changed image to condition to make it more readable
            localStorage.setItem('weatherData', JSON.stringify(extractedData));
            localStorage.setItem('lastFetched', currentTime);

            //return extractedData instead of weatherData to make sure no outdated values are send as the method is async
            return extractedData;
        }

        //Uses already stored data if valid cache exists
        return weatherData;
    }
}