import Pot from '../models/potModel.js';
import { registerDroppableElement } from '../utils/dragAndDrop.js';

export default class PotController {
    constructor() {
        this.pots = [];
        this.potIdCounter = 0;

        this.form = document.querySelector('#pots-form');
        this.potsContainer = document.querySelector('#pots');

        this.form.addEventListener('submit', this.onFormSubmit.bind(this));
    }

    addPot(pot) {
        if (!(pot instanceof Pot)) {
            throw new Error('Pot must be an instance of Pot');
        }

        this.pots.push(pot);

        const potElement = pot.createPotElement();
        this.potsContainer.appendChild(potElement);

        registerDroppableElement(potElement, this.onIngredientDrop.bind(this), this.canDropIngredient.bind(this));
    }

    onFormSubmit(event) {
        event.preventDefault();

        const pot = new Pot(++this.potIdCounter);

        this.addPot(pot);
    }

    onIngredientDrop(potId, ingredient) {
        const pot = this.pots.find(pot => pot.id == potId);

        if (!pot) {
            throw new Error(`Pot with id ${potId} not found`);
        }

        pot.addIngredient(ingredient);
    }

    canDropIngredient(event, ingredient) {
        const pot = this.pots.find(pot => pot.id == event.target.dataset.dragDropId);

        if (!pot) {
            throw new Error(`Pot with id ${event.target.dataset.dragDropId} not found`);
        }

        return {
            canDrop: pot.canAddIngredient(ingredient),
            message: 'Alleen ingrediënten met dezelfde mengsnelheid kunnen worden toegevoegd aan een pot'
        };
    }
}
