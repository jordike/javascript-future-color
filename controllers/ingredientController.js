import Ingredient from '../models/ingredientModel.js';
import { registerDraggableElement } from '../utils/dragAndDrop.js';

export default class IngredientController {
    constructor() {
        this.ingredients = [];

        this.form = document.querySelector('#ingredients-form');
        this.ingredientsContainer = document.querySelector('#ingredients');

        this.form.addEventListener('submit', this.onFormSubmit.bind(this));
    }

    addIngredient(ingredient) {
        if (!(ingredient instanceof Ingredient)) {
            throw new Error('Ingredient must be an instance of Ingredient');
        }

        this.ingredients.push(ingredient);

        const ingredientElement = ingredient.createIngredientElement();
        this.ingredientsContainer.appendChild(ingredientElement);

        registerDraggableElement(ingredientElement);
    }

    onFormSubmit(event) {
        event.preventDefault();

        const formData = new FormData(this.form);
        const ingredient = new Ingredient(formData.get('minMixSpeed'), formData.get('mixSpeed'), formData.get('color'), formData.get('structure'));

        this.addIngredient(ingredient);
    }
}
