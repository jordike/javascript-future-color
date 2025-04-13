import LocationModel from '../models/LocationModel.js';

export default class LocationController {
    static updateCity(selectedCity) {
        LocationModel.setCity(selectedCity);
    }

    static getCity() {
        return LocationModel.getCity();
    }

    //Loading cities from csv that current API supports for the dropdown menu
    static loadCityOptions() {
        fetch('../data/cities.csv')
            .then(response => response.text())
            .then(csvText => {
                const cities = LocationController.parseCSV(csvText);
                const dropdown = document.getElementById('cityDropdown');

                cities.forEach(city => {
                    const option = document.createElement('option');
                    option.value = city;
                    option.textContent = city;
                    dropdown.appendChild(option);
                });

                //Selects default or last selected city.
                dropdown.value = LocationController.getCity();

                const applyButton = document.getElementById('applyCityButton');
                applyButton.addEventListener('click', () => {
                    const selectedCity = dropdown.value;
                    LocationController.updateCity(selectedCity);
                });
            });
    }

    //Splits csv text into an array of cities
    static parseCSV(csvText) {
        const rows = csvText.trim().split('\n');
        return rows.map(row => row.trim().replace(/^'|'$/g, ''));
    }
}
