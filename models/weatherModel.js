import config from "../assets/data/config.js";

export default class WeatherModel {
    static async fetchWeather(city) {
        try {
            const lastFetched = localStorage.getItem('lastFetched');
            const weatherData = JSON.parse(localStorage.getItem('weatherData'));
            const currentTime = new Date().getTime();
    
            if (!weatherData || currentTime - lastFetched > config.CACHE_DURATION || weatherData.city !== city) {
                const response = await fetch(config.WEATHER_API_URL + city);
    
                if (!response.ok) {
                    throw new Error(`Weather API error: ${response.status}`);
                }
    
                const data = await response.json();
    
                if (!data.liveweer || !data.liveweer[0]) {
                    throw new Error('Invalid weather data format.');
                }
    
                const { temp, image } = data.liveweer[0];
                const extractedData = { city, temp, condition: image };
                localStorage.setItem('weatherData', JSON.stringify(extractedData));
                localStorage.setItem('lastFetched', currentTime);
    
                return extractedData;
            }
    
            return weatherData;
        } catch (error) {
            console.error('Failed to fetch weather:', error);
            return { city, temp: 20 , condition: 'unknown' }; 
        }
    }
}