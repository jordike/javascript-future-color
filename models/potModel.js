class Pot {
    constructor() {
        this.ingredients = [];
    }

    addIngredient(ingredient) {
        this.ingredients.push(ingredient);
    }

    getIngredients() {
        return this.ingredients;
    }
}
