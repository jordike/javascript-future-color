const API_KEY = '649f1122ae'; // 300 requests per day (key moved here to allow Url to read it)

export default {
    CACHE_DURATION: 10 * 60 * 1000, // 10min -> limits to max 144 requests per day unless location is changed, then addition requests are made to get the new location
    WEATHER_API_URL: `https://weerlive.nl/api/weerlive_api_v2.php?key=${API_KEY}&locatie=`, //API URL
    DEFAULT_CITY: 's-Hertogenbosch', //default city
    LOCAL_STORAGE_KEY: 'selectedCity' //key for local storage to store the selected city
};
