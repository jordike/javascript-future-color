export default class Ingredient {
    constructor(minMixSpeed, mixSpeed, color, structure) {
        this.minMixSpeed = minMixSpeed; //mixTime
        this.mixSpeed = mixSpeed;
        this.color = color;
        this.structure = structure;
    }

    getMinMixSpeed() {
        return this.minMixSpeed;
    }

    getMixSpeed() {
        return Number(this.mixSpeed);
    }

    getColor() {
        return this.color;
    }

    getStructure() {
        return this.structure;
    }

    createIngredientElement() {
        const ingredientElement = document.createElement('div');
        ingredientElement.classList.add('ingredient', 'draggable');
        ingredientElement.draggable = true;
        ingredientElement.style.backgroundColor = `rgb(${this.color.r}, ${this.color.g}, ${this.color.b})`;
        ingredientElement.dataset.dragData = JSON.stringify({
            minMixSpeed: this.minMixSpeed,
            mixSpeed: this.mixSpeed,
            color: this.color,
            structure: this.structure,
            type: 'ingredient'
        });

        switch (this.structure) {
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
}
