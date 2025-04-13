import ColorModel from '../models/ColorModel.js';
import IngredientModel from '../models/IngredientModel.js';
import { registerDraggableElement } from '../dragAndDrop.js';

export default class IngredientController {
    constructor() {
        this.ingredients = [];

        this.form = document.querySelector('#ingredients-form');
        this.ingredientsContainer = document.querySelector('#ingredients');

        this.form.addEventListener('submit', this.onFormSubmit.bind(this));
    }

    addIngredient(ingredient) {
        if (!(ingredient instanceof IngredientModel)) {
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
        const ingredient = new IngredientModel(
            formData.get('minMixSpeed'),
            formData.get('mixSpeed'),
            ColorModel.hexToRgb(formData.get('color')),
            formData.get('structure')
        );

        this.addIngredient(ingredient);
    }
}
