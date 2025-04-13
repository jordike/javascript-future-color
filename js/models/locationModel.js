import config from '../config.js';

export default class LocationModel {
    static getCity() {
        const city = localStorage.getItem(config.LOCAL_STORAGE_KEY);
        return city ? city : config.DEFAULT_CITY;
    }

    static setCity(city) {
        localStorage.setItem(config.LOCAL_STORAGE_KEY, city);
    }
}
