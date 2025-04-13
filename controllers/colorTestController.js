import ColorTestModel from '../models/colorTestModel.js';
import ColorModel from '../models/colorModel.js';
import { registerDroppableElement } from '../utils/dragAndDrop.js';

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

        registerDroppableElement(gridElement, this.onPotDrop.bind(this), this.canDropPot.bind(this));
        this.gridContainer.addEventListener('click', this.onCellClicked.bind(this));
    }

    onFormSubmit(event) {
        event.preventDefault();

        this.createGrid();
    }

    onPotDrop(potId, dragData, eventTarget) {
        this.gridModel.setColor(eventTarget.dataset.x, eventTarget.dataset.y, dragData.combinedColor);
    }

    canDropPot(event, dragData) {
        if (dragData.type !== 'pot') {
            return {
                canDrop: false,
                message: null
            };
        }

        return {
            canDrop: true,
            message: null
        };
    }

    onCellClicked(event) {
        const cell = event.target.closest('.cell');

        if (!cell) {
            return;
        }

        const x = cell.dataset.x;
        const y = cell.dataset.y;

        const color = this.gridModel.getColor(x, y);

        if (!color) {
            return;
        }

        const triadicColors = ColorModel.getTriadicColors(color);

        console.log('color', color, 'triadicColors', triadicColors);
    }
}
