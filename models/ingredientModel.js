export default class Ingredient {
    constructor(minMixSpeed, mixSpeed, color, structure) {
        this.minMixSpeed = minMixSpeed;
        this.mixSpeed = mixSpeed;
        this.color = color;
        this.structure = structure;
    }

    getMinMixSpeed() {
        return this.minMixSpeed;
    }

    getMixSpeed() {
        return this.mixSpeed;
    }

    getColor() {
        return this.color;
    }

    getStructure() {
        return this.structure;
    }

    createIngredientElement() {
        const ingredientElement = document.createElement('div');
        ingredientElement.classList.add('ingredient');
        ingredientElement.style.backgroundColor = this.color;

        return ingredientElement;
    }
}
