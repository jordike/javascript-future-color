import ColorTestModel from '../models/colorTestModel.js';
import ColorModel from '../models/colorModel.js';
import { registerDroppableElement } from '../utils/dragAndDrop.js';

export default class ColorTestController {
    constructor() {
        this.gridModel = new ColorTestModel();

        this.form = document.querySelector('#test-form');
        this.gridContainer = document.querySelector('#test-grid');

        this.form.addEventListener('submit', this.onFormSubmit.bind(this));
        document.getElementById('close-popup').addEventListener('click', this.hidePopup.bind(this));
    }

    createGrid() {
        this.gridModel.createGrid();

        const gridElement = this.gridModel.createGridElement();

        this.gridContainer.innerHTML = '';
        this.gridContainer.appendChild(gridElement);

        gridElement.querySelectorAll('.cell').forEach(cell => {
            registerDroppableElement(cell, this.onPotDrop.bind(this), this.canDropPot.bind(this));
        });
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

        this.showPopup([color, ...triadicColors]);
    }

    showPopup(colors) {
        const popup = document.getElementById('triadic-colors-popup');
        const colorsContainer = document.getElementById('triadic-colors-container');

        colorsContainer.innerHTML = '';
        colors.forEach(color => {
            const colorDiv = document.createElement('div');
            colorDiv.classList.add('color-box');
            colorDiv.style.backgroundColor = `rgb(${color.r}, ${color.g}, ${color.b})`;
            colorsContainer.appendChild(colorDiv);

            const rgbLabel = document.createElement('p');
            rgbLabel.classList.add('color-label');
            rgbLabel.textContent = `RGB: (${color.r}, ${color.g}, ${color.b})`;
            colorDiv.appendChild(rgbLabel);

            const hlsLabel = document.createElement('p');
            hlsLabel.classList.add('color-label');
            const hsl = ColorModel.rgbToHsl(color.r, color.g, color.b);
            hlsLabel.textContent = `HSL: (${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
            colorDiv.appendChild(hlsLabel);
        });

        popup.classList.remove('hidden-popup');
    }

    hidePopup() {
        const popup = document.getElementById('triadic-colors-popup');
        popup.classList.add('hidden-popup');
    }
}
