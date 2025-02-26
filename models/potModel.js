export default class Pot {
    constructor() {
        this.ingredients = [];
    }

    addIngredient(ingredient) {
        this.ingredients.push(ingredient);
    }

    getIngredients() {
        return this.ingredients;
    }

    createPotElement() {
        const potElement = document.createElement('div');
        potElement.className = 'pot';

        return potElement;
    }
}
