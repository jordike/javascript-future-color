import ColorTestModel from '../models/colorTestModel.js';
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
}
