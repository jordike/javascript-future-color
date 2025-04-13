export function registerDraggableElement(element) {
    element.addEventListener('dragstart', event => {
        const dragData = event.target.dataset.dragData;

        event.dataTransfer.setData('application/json', dragData);
    });
}

export function registerDroppableElement(element, dropHandler, canDropCallback) {
    element.addEventListener('dragenter', event => {
        if (!event.target.classList.contains('droppable')) {
            return;
        }

        const dragData = event.dataTransfer.getData('application/json');
        const parsedDragData = JSON.parse(dragData);
        const { canDrop } = canDropCallback(event, parsedDragData) || { canDrop: false };

        if (!canDrop) {
            return;
        }

        event.preventDefault();
        event.target.classList.add('hovering');
    });

    element.addEventListener('dragleave', event => {
        event.preventDefault();
        event.target.classList.remove('hovering');
    });

    element.addEventListener('dragover', event => {
        const dragData = event.dataTransfer.getData('application/json');
        const parsedDragData = JSON.parse(dragData);
        const { canDrop } = canDropCallback(event, parsedDragData) || { canDrop: false };

        if (!canDrop) {
            return;
        }

        if (event.target.classList.contains('droppable')) {
            event.preventDefault();
        }
    });

    element.addEventListener('drop', event => {
        if (!event.target.classList.contains('droppable')) {
            return;
        }

        const dragData = event.dataTransfer.getData('application/json');
        const parsedDragData = JSON.parse(dragData);

        const { canDrop, message } = canDropCallback(event, parsedDragData) || { canDrop: false, message: '' };

        if (!canDrop) {
            if (message) alert(message);

            return;
        }

        event.preventDefault();
        event.target.classList.remove('hovering');

        const dropTargetId = event.target.dataset.dragDropId;

        dropHandler(dropTargetId, parsedDragData, event.target);
    });
}
