export default class MachineModel {
    constructor(mixSpeed, machineMixTime) {
      this.pot = null;
      this.mixSpeed = mixSpeed;
      this.machineMixTime = machineMixTime; //Minimale mixtijd van de machine
      this.mixTime = 0; //Uiteindelijke mixtijd
      this.status = "idle"; //idle , mixing, finished 
    }
  
    addPot(pot) {
        if (this.pot) {
            return "Machine is full, finish mixing before adding a new one.";
        }
        this.pot = pot;
        return "Pot added successfully.";
    }

    //returns the removed pot to be used elsewhere.
    removePot(pot) {
        const removedPot = this.pot;
        this.pot = null;
        this.status = "idle"; //Reset status when pot is removed
    }
    
    startMix(colorCallback, weatherData) {
        if (!this.pot) {
            return "No pot added to the machine.";
        }
        
        /*
        Added check to compare longest mix time between machine setting and ingredient.
        because appearently the machine itself has a mixtime aswell according to the assignment: 
        "Je kan meerdere mengmachines aanmaken met verschillende instellingen (mengsnelheid/mengtijd)"
        */
        let longestMixTime = this.machineMixTime;
        for (let ingredient of this.pot.ingredients) {
            longestMixTime = Math.max(longestMixTime, ingredient.getMinMixSpeed());
        }

        //Weather compensation mixtime
        let mixTimeAdjustment = 0;
        if (weatherData.temp < 10) {
            mixTimeAdjustment += 0.15;
        }
        if (weatherData.condition === "regen" || weatherData.condition === "sneeuw") {
            mixTimeAdjustment += 0.10; 
        }
        this.mixTime = longestMixTime + (longestMixTime * mixTimeAdjustment);

        //get colors and mix
        const ingredientColors = this.pot.ingredients.map(ingredient => ingredient.getColor());
        const combinedColor = colorCallback(ingredientColors);

        // Simulate mixing time
        this.status = "mixing";
        setTimeout(() => {
            this.status = "finished";
            this.pot.color = combinedColor;
        }, this.mixTime * 1000);

        return `Mixing started`;
    }
  }