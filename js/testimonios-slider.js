document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.grid-testimonios');
    const testimonios = document.querySelectorAll('.testimonio');
    const btnAnterior = document.querySelector('.boton-slider.anterior');
    const btnSiguiente = document.querySelector('.boton-slider.siguiente');
    
    let posicionActual = 0;
    const totalTestimonios = testimonios.length;
    let touchStartX = 0;
    let touchEndX = 0;
    
    function actualizarSlider() {
        const anchoTestimonio = testimonios[0].offsetWidth + 32; // 32px es el gap
        const desplazamiento = posicionActual * anchoTestimonio;
        slider.style.transform = `translateX(-${desplazamiento}px)`;
        
        // Actualizar estado de los botones
        btnAnterior.disabled = posicionActual === 0;
        btnSiguiente.disabled = posicionActual >= totalTestimonios - 1;
    }
    
    function siguiente() {
        if (posicionActual < totalTestimonios - 1) {
            posicionActual++;
            actualizarSlider();
        }
    }
    
    function anterior() {
        if (posicionActual > 0) {
            posicionActual--;
            actualizarSlider();
        }
    }
    
    // Event listeners para los botones
    btnSiguiente.addEventListener('click', siguiente);
    btnAnterior.addEventListener('click', anterior);
    
    // Event listeners para deslizamiento táctil
    slider.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    slider.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        manejarDeslizamiento();
    }, { passive: true });
    
    function manejarDeslizamiento() {
        const diferencia = touchStartX - touchEndX;
        const umbralMinimo = 50; // Mínimo de píxeles para considerar un deslizamiento
        
        if (Math.abs(diferencia) > umbralMinimo) {
            if (diferencia > 0) {
                // Deslizamiento hacia la izquierda
                siguiente();
            } else {
                // Deslizamiento hacia la derecha
                anterior();
            }
        }
    }
    
    // Manejar redimensionamiento de ventana
    let timeout;
    window.addEventListener('resize', function() {
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            actualizarSlider();
        }, 250);
    });
    
    // Inicializar slider
    actualizarSlider();
}); 