// Slider de textos para la sección de ahorro
// Muestra un solo texto a la vez, cambiando cada 6 segundos con fade y permite control manual

document.addEventListener('DOMContentLoaded', function () {
    const contenedor = document.getElementById('sliderAhorroTextos');
    if (!contenedor) return;
    const textos = contenedor.querySelectorAll('.slider-ahorro-mensaje p.descripcion-hero');
    let indiceActual = 0;
    const duracion = 8000; // 8 segundos
    let intervalo = null;

    // Inicializa: muestra solo el primero
    textos.forEach((p, i) => {
        p.style.opacity = i === 0 ? '1' : '0';
        p.style.position = 'absolute';
        p.style.transition = 'opacity 0.7s';
        p.style.width = '100%';
        p.style.left = '0';
        p.style.top = '0';
        p.style.zIndex = i === 0 ? '1' : '0';
    });
    const mensajeContenedor = contenedor.querySelector('.slider-ahorro-mensaje');
    if (mensajeContenedor && textos[0]) {
        mensajeContenedor.style.position = 'relative';
        mensajeContenedor.style.minHeight = textos[0].offsetHeight + 'px';
    }

    function mostrarTexto(nuevoIndice) {
        if (nuevoIndice === indiceActual) return;
        const actual = textos[indiceActual];
        const siguiente = textos[nuevoIndice];
        actual.style.opacity = '0';
        actual.style.zIndex = '0';
        setTimeout(() => {
            siguiente.style.zIndex = '1';
            siguiente.style.opacity = '1';
            if (mensajeContenedor) {
                mensajeContenedor.style.minHeight = siguiente.offsetHeight + 'px';
            }
            indiceActual = nuevoIndice;
        }, 700); // Espera el fade-out
    }

    function mostrarSiguienteTexto() {
        const nuevoIndice = (indiceActual + 1) % textos.length;
        mostrarTexto(nuevoIndice);
    }

    function mostrarAnteriorTexto() {
        const nuevoIndice = (indiceActual - 1 + textos.length) % textos.length;
        mostrarTexto(nuevoIndice);
    }

    function reiniciarIntervalo() {
        if (intervalo) clearInterval(intervalo);
        intervalo = setInterval(mostrarSiguienteTexto, duracion);
    }

    // Botones de control
    const btnAnterior = contenedor.querySelector('.boton-slider-ahorro.anterior');
    const btnSiguiente = contenedor.querySelector('.boton-slider-ahorro.siguiente');
    if (btnAnterior && btnSiguiente) {
        btnAnterior.addEventListener('click', function () {
            mostrarAnteriorTexto();
            reiniciarIntervalo();
        });
        btnSiguiente.addEventListener('click', function () {
            mostrarSiguienteTexto();
            reiniciarIntervalo();
        });
    }

    // Iniciar slider automático
    reiniciarIntervalo();
}); 