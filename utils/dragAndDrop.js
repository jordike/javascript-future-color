let dragData = null;

export function registerDraggableElement(element) {
    element.addEventListener('dragstart', event => {
        dragData = JSON.parse(event.currentTarget.dataset.dragData);
    });
}

export function registerDroppableElement(element, dropHandler, canDropCallback) {
    element.addEventListener('dragenter', event => {
        if (!event.currentTarget.classList?.contains('droppable')) {
            return;
        }

        const { canDrop } = canDropCallback(event, dragData) || { canDrop: false };

        if (!canDrop) {
            return;
        }

        event.preventDefault();
        event.currentTarget.classList.add('hovering');
    });

    element.addEventListener('dragleave', event => {
        if (!event.currentTarget.classList?.contains('droppable')) {
            return;
        }

        event.preventDefault();
        event.currentTarget.classList.remove('hovering');
    });

    element.addEventListener('dragover', event => {
        if (!event.currentTarget.classList?.contains('droppable')) {
            return;
        }

        const { canDrop, message } = canDropCallback(event, dragData) || { canDrop: false };

        if (!canDrop) {
            return;
        }

        event.preventDefault();
    });

    element.addEventListener('drop', event => {
        if (!event.currentTarget.classList?.contains('droppable')) {
            return;
        }

        const { canDrop, message } = canDropCallback(event, dragData) || { canDrop: false, message: null };

        if (!canDrop) {
            if (message) alert(message);

            return;
        }

        event.preventDefault();
        event.currentTarget.classList.remove('hovering');

        const dropTargetId = event.currentTarget.dataset.dragDropId;

        dropHandler(dropTargetId, dragData, event.currentTarget);
    });
}
