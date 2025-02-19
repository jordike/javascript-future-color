import Ingredient from '../models/ingredientModel.js';

class IngredientController {
    constructor() {
        this.ingredients = [];
    }

    addIngredient(ingredient) {
        if (!(ingredient instanceof Ingredient)) {
            throw new Error('Ingredient must be an instance of Ingredient');
        }

        this.ingredients.push(ingredient);
    }
}
