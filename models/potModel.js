import Ingredient from './ingredientModel.js';

export default class Pot {
    constructor(id) {
        this.id = id;
        this.ingredients = [];
    }

    addIngredient(ingredient) {
        const ingredientElement = this.createIngredientElement(ingredient);
        const potElement = document.querySelector(`.pot[data-drag-drop-id="${this.id}"]`);

        this.ingredients.push(new Ingredient(ingredient.minMixSpeed, ingredient.mixSpeed, ingredient.color, ingredient.structure));
        potElement.appendChild(ingredientElement);
    }

    getIngredients() {
        return this.ingredients;
    }

    createPotElement() {
        const potElement = document.createElement('div');
        potElement.className = 'pot droppable';
        potElement.dataset.dragDropId = this.id;

        return potElement;
    }

    createIngredientElement(ingredient) {
        const ingredientElement = document.createElement('div');
        ingredientElement.classList.add('ingredient');
        ingredientElement.style.backgroundColor = ingredient.color;
        ingredientElement.style.width = '50px';
        ingredientElement.style.height = '50px';

        switch (ingredient.structure) {
            case 'korrel':
                ingredientElement.style.borderRadius = '50%';
                break;

            case 'groveKorrel':
                ingredientElement.style.borderRadius = '30%';
                break;

            case 'glad':
                ingredientElement.style.borderRadius = '0%';
                break;

            case 'slijmerig':
                ingredientElement.style.borderRadius = '10%';
                ingredientElement.style.opacity = '0.8';
                break;

            default:
                ingredientElement.style.borderRadius = '0%';
        }

        return ingredientElement;
    }

    canAddIngredient(ingredient) {
        const ingredientsWithDifferentMixSpeed = this.ingredients.filter(otherIngredient => {
            return otherIngredient.getMixSpeed() != ingredient.mixSpeed;
        });

        return ingredientsWithDifferentMixSpeed.length === 0;
    }
}
