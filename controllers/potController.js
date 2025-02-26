import Pot from '../models/potModel.js';

export default class PotController {
    constructor() {
        this.pots = [];

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
    }

    onFormSubmit(event) {
        event.preventDefault();

        const pot = new Pot();

        this.addPot(pot);
    }
}
