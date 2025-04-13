import HallModel from '../models/hallModel.js';
import MachineController from './machineController.js';
import { registerDroppableElement } from '../utils/dragAndDrop.js';

export default class HallController {
    constructor(potController) {
        this.halls = {
            'hall-1': new HallModel('hall-1'),
            'hall-2': new HallModel('hall-2')
        };
        this.currentHall = this.halls['hall-1'];
        this.machineController = new MachineController();
        this.potController = potController;
        this.setupUI();
        this.renderHall();
    }

    switchHall(name) {
        this.currentHall = this.halls[name];
        this.renderHall();
    }

    hasMachineRunning() {
        return this.currentHall.hasMachineRunning();
    }

    addMachineToCurrentHall(machineMixSpeed, machineMixTime) {
        const machine = this.machineController.createMachine(machineMixSpeed, machineMixTime);
        this.currentHall.addMachine(machine);
        this.renderHall();
    }

    renderHall() {
        const hallContainer = document.querySelector('#hallContainer');
        hallContainer.innerHTML = '';

        this.currentHall.getMachines().forEach(machine => {
            const machineElement = machine.getMachineElement();
            hallContainer.appendChild(machineElement);

            // Register as droppable
            registerDroppableElement(
                machineElement,
                (machineId, potData) => this.onPotDropOnMachine(machineId, potData),
                (event, potData) => this.canDropPotOnMachine(event, potData)
            );
        });
    }

    async onPotDropOnMachine(machineId, potData) {
        if (potData.type !== 'pot') return;

        const machine = this.currentHall.getMachines().find(m => m.id === machineId);
        const pot = this.potController.pots.find(p => p.id == potData.id);

        if (!pot || !machine) {
            return;
        }

        //weatherCheck to allow machine to start
        const weatherData = await WeatherController.getWeatherData();
        if (weatherData.temp >= 35) {
            const isMachineRunning = this.currentHall.hasMachineRunning();
            if (isMachineRunning) {
                return;  
            }
        
            //Will check if pot is added, if pot cannot be added it won't start the machine or remove pot from potController
            const result = this.machineController.addPot(machine, pot);
            if (result) {
                this.potController.removePot(pot);
                this.machineController.startMachine(machine, () => {
                    this.onMachineFinished(machine);
                });
            }

            this.renderHall();
        }
    }

    canDropPotOnMachine(event, potData) {
        if (potData.type !== 'pot') {
            return { canDrop: false, message: 'Only pots can be added to machines' };
        }

        const pot = this.potController.pots.find(p => p.id == potData.id);
        if (!pot) {
            return { canDrop: false, message: 'Pot not found' };
        }

        //Need to use event as machineID is undefined at this stage
        const machineElement = event.target.closest('.machine');
        const machineHoverId = machineElement.dataset.dragDropId;
        const machine = this.currentHall.getMachines().find(m => m.id === machineHoverId);
        if (!machine) {
            return { canDrop: false, message: 'Machine not found' };
        }

        const ingredientMixSpeed = Number(pot.getIngredients()[0]?.getMixSpeed());
        const machineMixSpeed = machine.getMixSpeed();

        if (ingredientMixSpeed !== machineMixSpeed) {
            return {
                canDrop: false,
                message: `The machine's mix speed (${machineMixSpeed}) does not match the ingredient's mix speed (${ingredientMixSpeed})`
            };
        }

        return { canDrop: true, message: null };
    }

    setupUI() {
        // Hall switcher
        const switcher = document.getElementById('hallSwitcher');
        if (switcher) {
            switcher.addEventListener('change', e => {
                this.switchHall(e.target.value);
            });
        }

        // Add machine button
        const addMachineBtn = document.getElementById('addMachineButton');
        if (addMachineBtn) {
            addMachineBtn.addEventListener('click', () => {
                const speed = parseInt(document.getElementById('machineMixSpeed').value);
                const time = parseInt(document.getElementById('machineMixTime').value);
                this.addMachineToCurrentHall(speed, time);
            });
        }
    }

    onMachineFinished(machine) {
        const removedPot = this.machineController.removePot(machine);

        if (removedPot) {
            this.potController.mixedPots.push(removedPot);
            this.potController.renderMixedPots();
        }

        this.renderHall();
    }
}
