export function registerDraggableElement(element) {
    element.addEventListener('dragstart', event => {
        const dragData = event.target.dataset.dragData;
        const dragDataJson = JSON.stringify(dragData);

        event.dataTransfer.setData('application/json', dragDataJson);
    });
}

export function registerDroppableElement(element, dropHandler) {
    element.addEventListener('dragenter', event => {
        if (!event.target.classList.contains('droppable')) {
            return;
        }

        event.preventDefault();
        event.target.classList.add('hovering');
    });

    element.addEventListener('dragleave', event => {
        if (!event.target.classList.contains('droppable')) {
            return;
        }

        event.preventDefault();
        event.target.classList.remove('hovering');
    });

    element.addEventListener('dragover', event => {
        if (event.target.classList.contains('droppable')) {
            event.preventDefault();
        }
    });

    element.addEventListener('drop', event => {
        if (!event.target.classList.contains('droppable')) {
            return;
        }

        event.preventDefault();

        event.target.classList.remove('hovering');

        const dragData = event.dataTransfer.getData('application/json');
        const dragDataObj = JSON.parse(dragData);
        const dropTargetId = event.target.dataset.dragDropId;

        dropHandler(dropTargetId, dragDataObj);
    });
}
