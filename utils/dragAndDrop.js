export function registerDraggableElement(element) {
    element.addEventListener('dragstart', event => {
        const dragData = event.target.dataset.dragData;
        const dragDataJson = JSON.stringify(dragData);

        event.dataTransfer.setData('application/json', dragDataJson);
    });
}

export function registerDroppableElement(element, dropHandler) {
    element.addEventListener('dragenter', event => {
        event.preventDefault();

        event.target.classList.add('hovering');
    });

    element.addEventListener('dragleave', event => {
        event.preventDefault();

        event.target.classList.remove('hovering');
    });

    element.addEventListener('dragover', event => {
        event.preventDefault();
    });

    element.addEventListener('drop', event => {
        event.preventDefault();

        event.target.classList.remove('hovering');

        const dragData = event.dataTransfer.getData('application/json');
        const dragDataObj = JSON.parse(dragData);

        dropHandler(dragDataObj);
    });
}
