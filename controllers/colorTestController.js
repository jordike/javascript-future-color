import ColorTestModel from '../models/colorTestModel.js';

export default class ColorTestController {
    constructor() {
        this.gridModel = new ColorTestModel();

        this.form = document.querySelector('#test-form');
        this.gridContainer = document.querySelector('#test-grid');

        this.form.addEventListener('submit', this.onFormSubmit.bind(this));
    }

    createGrid() {
        this.gridModel.createGrid();

        const gridElement = this.gridModel.createGridElement();

        this.gridContainer.innerHTML = '';
        this.gridContainer.appendChild(gridElement);
    }

    onFormSubmit(event) {
        event.preventDefault();

        this.createGrid();
    }
}
