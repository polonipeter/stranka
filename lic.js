document.addEventListener('DOMContentLoaded', function() {
    const overlay = document.getElementById('fullscreenOverlay');
    const fullscreenImage = document.getElementById('fullscreenImage');
    
    document.querySelectorAll('.zoom-image').forEach(image => {
        image.addEventListener('click', function() {
            // Nastaviť zdroj obrázka v overlay na ten, ktorý bol kliknutý
            fullscreenImage.src = this.src;
            overlay.classList.add('show');
        });
    });

    overlay.addEventListener('click', function() {
        overlay.classList.remove('show');
    });
    
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            overlay.classList.remove('show');
        }
    });
});