export default class ColorTestModel {
    constructor() {
        this.gridCells = [];
        this.gridSize = 6;
    }

    createGrid() {
        for (let x = 0; x < this.gridSize; x++) {
            this.gridCells[x] = [];

            for (let y = 0; y < this.gridSize; y++) {
                this.gridCells[x][y] = {
                    color: null,
                    element: null
                };
            }
        }
    }

    setColor(x, y, color) {
        if (x < 0 || x >= this.gridSize || y < 0 || y >= this.gridSize) {
            throw new Error('Coordinates out of bounds');
        }

        const cell = this.gridCells[x][y];
        cell.color = color;
        cell.element.classList.remove('empty-cell');
        cell.element.style.backgroundColor = color;
    }

    getColor(x, y) {
        if (x < 0 || x >= this.gridSize || y < 0 || y >= this.gridSize) {
            throw new Error('Coordinates out of bounds');
        }

        return this.gridCells[x][y].color;
    }

    createGridElement() {
        const gridElement = document.createElement('div');
        gridElement.classList.add('grid');

        for (let x = 0; x < this.gridSize; x++) {
            for (let y = 0; y < this.gridSize; y++) {
                const cellElement = document.createElement('div');
                cellElement.classList.add('cell', 'empty-cell');
                cellElement.dataset.x = x;
                cellElement.dataset.y = y;

                this.gridCells[x][y].element = cellElement;

                cellElement.addEventListener('click', () => {
                    const color = this.getColor(x, y);
                    console.log(`Cell (${x}, ${y}) color: ${color}`);
                });

                gridElement.appendChild(cellElement);
            }
        }

        return gridElement;
    }
}
