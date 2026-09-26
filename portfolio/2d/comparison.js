const comparison = document.querySelector('.art-comparison');
const slider = comparison.querySelector('input');

function updateComparison() {
    comparison.style.setProperty('--split', `${slider.value}%`);
}

function moveDivider(event) {
    const bounds = comparison.getBoundingClientRect();
    slider.value = Math.max(0, Math.min(100, (event.clientX - bounds.left) / bounds.width * 100));
    updateComparison();
}

slider.addEventListener('input', updateComparison);
slider.addEventListener('pointerdown', (event) => {
    if (event.button !== 0) return;
    event.preventDefault();
    slider.focus({ preventScroll: true });
    slider.setPointerCapture(event.pointerId);
    moveDivider(event);
});
slider.addEventListener('pointermove', (event) => {
    if (slider.hasPointerCapture(event.pointerId)) moveDivider(event);
});
slider.addEventListener('pointerup', (event) => {
    if (slider.hasPointerCapture(event.pointerId)) slider.releasePointerCapture(event.pointerId);
});
updateComparison();
