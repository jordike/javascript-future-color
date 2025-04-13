import config from "../assets/data/config.js";

export default class LocationModel {
    
    static getCity() {
        try {
            const city = localStorage.getItem(config.LOCAL_STORAGE_KEY);
            return city ? city : config.DEFAULT_CITY;
        } catch (e) {
            console.warn('Could not access localStorage, Default city will be used instead:', e);
            return config.DEFAULT_CITY;
        }
    }

    static setCity(city) {
        try {
            localStorage.setItem(config.LOCAL_STORAGE_KEY, city);
        } catch (e) {
            console.warn('Unable to set selected city in localStorage:', e);
        }    }
}