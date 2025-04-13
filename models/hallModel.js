export default class HallModel {
    constructor(id) {
        this.id = id;
        this.machines = [];
    }

    addMachine(machine) {
        this.machines.push(machine);
    }

    getMachines() {
        return this.machines;
    }

    hasMachineRunning() {
        return this.machines.some(machine => machine.status === 'mixing');
    }
}