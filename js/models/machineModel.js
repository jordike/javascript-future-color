export default class MachineModel {
    constructor(mixSpeed, machineMixTime) {
        this.pot = null;
        this.mixSpeed = mixSpeed;
        this.machineMixTime = machineMixTime; //Minimale mixtijd van de machine
        this.mixTime = 0; //Uiteindelijke mixtijd
        this.status = 'idle'; //idle , mixing, finished
        this.id = `machine-${Date.now()}`; //Unique ID for the machine
    }

    getMixSpeed() {
        return Number(this.mixSpeed);
    }

    addPot(pot) {
        if (this.pot) {
            return false;
        }
        this.pot = pot;
        return true;
    }

    //returns the removed pot to be used elsewhere.
    removePot(pot) {
        const removedPot = this.pot;
        this.pot = null;
        this.status = 'idle'; //Reset status when pot is removed

        return removedPot;
    }

    startMix(colorCallback, weatherData, doneCallback) {
        if (!this.pot) {
            return 'No pot added to the machine.';
        }

        //gets longest mixtime of ingredient/machine
        let longestMixTime = this.machineMixTime;
        for (let ingredient of this.pot.ingredients) {
            longestMixTime = Math.max(longestMixTime, ingredient.getMinMixSpeed());
        }

        //Weather compensation mixtime
        let mixTimeAdjustment = 0;
        if (weatherData.temp < 10) {
            mixTimeAdjustment += 0.15;
        }
        if (weatherData.condition === 'regen' || weatherData.condition === 'sneeuw') {
            mixTimeAdjustment += 0.1;
        }
        this.mixTime = longestMixTime + longestMixTime * mixTimeAdjustment;

        //get colors and mix
        const ingredientColors = this.pot.ingredients.map(ingredient => ingredient.getColor());
        const combinedColor = colorCallback(ingredientColors);

        // Simulate mixing time
        this.status = 'mixing';
        setTimeout(() => {
            this.status = 'finished';
            this.pot.setCombinedColor(combinedColor);
            if (doneCallback) doneCallback();
        }, this.mixTime * 1000);

        return `Mixing started`;
    }

    getMachineElement() {
        const machineElement = document.createElement('div');
        machineElement.classList.add('machine', 'droppable');
        machineElement.dataset.dragDropId = this.id;
        machineElement.innerHTML = `
            <div class="machine-header pe-none">
                Machine ID: ${this.id} (Status: ${this.status})
            </div>
            <div class="machine-body pe-none">
                ${this.pot ? 'Pot added' : 'Empty - drag pot here'}
            </div>
        `;
        return machineElement;
    }
}
