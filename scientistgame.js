const draggables = document.querySelectorAll('.draggable');
const dropzones = document.querySelectorAll('.dropzone');

draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging');
    });

    draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging');
    });
});

dropzones.forEach(dropzone => {
    dropzone.addEventListener('dragover', e => {
        e.preventDefault();
        dropzone.classList.add('hovered');
    });

    dropzone.addEventListener('dragleave', () => {
        dropzone.classList.remove('hovered');
    });

    dropzone.addEventListener('drop', e => {
        e.preventDefault();
        const draggable = document.querySelector('.dragging');
        if (draggable && dropzone.getAttribute('data-answer') === draggable.id) {
            dropzone.appendChild(draggable);
            dropzone.classList.remove('hovered');
            dropzone.style.border = '2px solid green';
            dropzone.style.backgroundColor = 'lightgreen';
            draggable.setAttribute('draggable', 'false');
        } else {
            dropzone.style.border = '2px solid red';
            dropzone.style.backgroundColor = 'lightcoral';
        }
    });
});
