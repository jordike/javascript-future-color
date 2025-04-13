import LocationModel from '../models/locationModel.js';

export default class LocationController {

    static updateCity(selectedCity) {
        LocationModel.setCity(selectedCity);
    }

    static getCity() {
        return LocationModel.getCity();
    }

    //Loading cities from csv that current API supports for the dropdown menu
    static loadCityOptions() {
        fetch('../assets/data/cities.csv')
        .then(response => {
            if (!response.ok) throw new Error('Failed to load city list.');
            return response.text();
        })
        .then(csvText => {
            const cities = LocationController.parseCSV(csvText);
            const dropdown = document.getElementById('cityDropdown');

            cities.forEach(city => {
                const option = document.createElement('option');
                option.value = city;
                option.textContent = city;
                dropdown.appendChild(option);
            });

            dropdown.value = LocationController.getCity();

            const applyButton = document.getElementById('applyCityButton');
            applyButton.addEventListener('click', () => {
                const selectedCity = dropdown.value;
                LocationController.updateCity(selectedCity);
            });
        })
        .catch(error => {
            console.error('Error loading cities:', error);
            alert('Could not load city list.');
        });
    }

    //Splits csv text into an array of cities
    static parseCSV(csvText) {
        const rows = csvText.trim().split('\n');
        return rows.map(row => row.trim().replace(/^'|'$/g, '')); 
    }
}