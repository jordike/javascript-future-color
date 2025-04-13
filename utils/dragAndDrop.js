let dragData = null;

export function registerDraggableElement(element) {
    element.addEventListener('dragstart', event => {
        dragData = JSON.parse(event.target.dataset.dragData);
    });
}

export function registerDroppableElement(element, dropHandler, canDropCallback) {
    element.addEventListener('dragenter', event => {
        if (!event.target.classList?.contains('droppable')) {
            return;
        }

        const { canDrop } = canDropCallback(event, dragData) || { canDrop: false };

        if (!canDrop) {
            return;
        }

        event.preventDefault();
        event.target.classList.add('hovering');
    });

    element.addEventListener('dragleave', event => {
        if (!event.target.classList?.contains('droppable')) {
            return;
        }

        event.preventDefault();
        event.target.classList.remove('hovering');
    });

    element.addEventListener('dragover', event => {
        if (!event.target.classList?.contains('droppable')) {
            return;
        }

        const { canDrop } = canDropCallback(event, dragData) || { canDrop: false };

        if (!canDrop) {
            return;
        }

        if (event.target.classList.contains('droppable')) {
            event.preventDefault();
        }
    });

    element.addEventListener('drop', event => {
        if (!event.target.classList?.contains('droppable')) {
            return;
        }

        const { canDrop, message } = canDropCallback(event, dragData) || { canDrop: false, message: '' };

        if (!canDrop) {
            if (message) alert(message);

            return;
        }

        event.preventDefault();
        event.target.classList.remove('hovering');

        const dropTargetId = event.target.dataset.dragDropId;

        dropHandler(dropTargetId, dragData, event.target);
    });
}
