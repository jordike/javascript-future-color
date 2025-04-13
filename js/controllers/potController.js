import PotModel from '../models/PotModel.js';
import { registerDraggableElement, registerDroppableElement } from '../dragAndDrop.js';

export default class PotController {
    constructor() {
        this.pots = [];
        this.mixedPots = [];
        this.potIdCounter = 0;

        this.form = document.querySelector('#pots-form');
        this.potsContainer = document.querySelector('#pots');

        this.form.addEventListener('submit', this.onFormSubmit.bind(this));
    }

    addPot(pot) {
        if (!(pot instanceof PotModel)) {
            throw new Error('Pot must be an instance of Pot');
        }

        this.pots.push(pot);

        const potElement = pot.createPotElement();
        this.potsContainer.appendChild(potElement);

        registerDroppableElement(potElement, this.onIngredientDrop.bind(this), this.canDropIngredient.bind(this));
        registerDraggableElement(potElement);
    }

    removePot(pot) {
        this.pots = this.pots.filter(p => p.id !== pot.id);

        // Remove DOM
        const potElement = document.querySelector(`[data-drag-drop-id="${pot.id}"]`); // Keep this as is
        if (potElement) {
            potElement.remove();
        }
    }

    onFormSubmit(event) {
        event.preventDefault();

        const pot = new PotModel(++this.potIdCounter);

        this.addPot(pot);
    }

    onIngredientDrop(potId, ingredient) {
        const pot = this.pots.find(pot => pot.id == potId);

        if (pot) {
            pot.addIngredient(ingredient);
        }
    }

    canDropIngredient(event, dragData) {
        if (dragData.type !== 'ingredient') {
            return {
                canDrop: false,
                message: null
            };
        }

        const pot = this.pots.find(pot => pot.id == event.target.dataset.dragDropId);

        if (pot) {
            return {
                canDrop: pot.canAddIngredient(dragData),
                message: 'Alleen ingrediënten met dezelfde mengsnelheid kunnen worden toegevoegd aan een pot'
            };
        }
    }

    renderMixedPots() {
        const mixedPotsContainer = document.querySelector('#mixed-pots');
        mixedPotsContainer.innerHTML = '';

        this.mixedPots.forEach(pot => {
            const potElement = pot.createPotElement();
            mixedPotsContainer.appendChild(potElement);
            registerDraggableElement(potElement);
        });
    }
}
