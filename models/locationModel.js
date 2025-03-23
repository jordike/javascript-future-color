export default class LocationModel {
    static DEFAULT_CITY = "s-Hertogenbosch";  
    static LOCAL_STORAGE_KEY = 'selectedCity';

    static getCity() {
        const city = localStorage.getItem(LocationModel.LOCAL_STORAGE_KEY);
        return city ? city : LocationModel.DEFAULT_CITY;
    }

    static setCity(city) {
        localStorage.setItem(LocationModel.LOCAL_STORAGE_KEY, city);
    }
}