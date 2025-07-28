// Funcionalidad específica para la página FAQ

document.addEventListener('DOMContentLoaded', function() {
    inicializarAccordeonFAQ();
    inicializarNavegacionCategorias();
    mostrarIndicadoresVisuales();
    // Activar estado activo en los filtros de categorías del FAQ
    document.querySelectorAll('.grid-categorias .filtro-novedad').forEach(enlace => {
        enlace.addEventListener('click', function() {
            document.querySelectorAll('.grid-categorias .filtro-novedad').forEach(e => e.classList.remove('activo'));
            this.classList.add('activo');
        });
    });
});

// Función principal para alternar respuestas FAQ
function toggleRespuesta(boton) {
    const pregunta = boton.parentElement;
    const respuesta = pregunta.querySelector('.respuesta-faq');
    const icono = boton.querySelector('.icono-toggle i');
    
    // Alternar clase activa
    const estaActiva = respuesta.classList.contains('activa');
    
    if (estaActiva) {
        // Cerrar
        respuesta.classList.remove('activa');
        pregunta.classList.remove('pregunta-abierta');
        if (icono) {
            icono.className = 'fa-solid fa-plus';
        }
    } else {
        // Abrir
        respuesta.classList.add('activa');
        pregunta.classList.add('pregunta-abierta');
        if (icono) {
            icono.className = 'fa-solid fa-minus';
        }
        
        // Scroll suave hacia la pregunta si se está abriendo
        setTimeout(() => {
            pregunta.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'nearest' 
            });
        }, 100);
    }
}

// Funcionalidad del acordeón para preguntas y respuestas
function inicializarAccordeonFAQ() {
    const botonesPregunta = document.querySelectorAll('.boton-pregunta');
    
    botonesPregunta.forEach(boton => {
        boton.addEventListener('click', function(e) {
            e.preventDefault();
            toggleRespuesta(this);
        });
    });
}

// Navegación mejorada por categorías
function inicializarNavegacionCategorias() {
    const enlacesCategorias = document.querySelectorAll('.categoria-link');
    
    enlacesCategorias.forEach(enlace => {
        enlace.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remover clase activa de otros enlaces
            enlacesCategorias.forEach(link => link.classList.remove('categoria-activa'));
            
            // Agregar clase activa al enlace actual
            this.classList.add('categoria-activa');
            
            // Obtener el ID de la sección
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Obtener la posición del elemento
                const navHeight = document.querySelector('.navegacion').offsetHeight;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navHeight - 20; // 20px de espacio extra

                // Scroll suave a la posición calculada
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Indicadores visuales mejorados
function mostrarIndicadoresVisuales() {
    // Agregar indicadores de "nuevo" o "importante" a ciertas preguntas
    const preguntasImportantes = [
        'Windows 10 dejará de recibir soporte',
        '¿Qué pasa con mis archivos'
    ];
    
    const todasLasPreguntas = document.querySelectorAll('.pregunta-faq');
    todasLasPreguntas.forEach(pregunta => {
        const textoPregunta = pregunta.querySelector('.boton-pregunta span').textContent;
        
        preguntasImportantes.forEach(importante => {
            if (textoPregunta.includes(importante)) {
                const badge = document.createElement('span');
                badge.className = 'badge-importante';
                badge.textContent = '¡Importante!';
                pregunta.querySelector('.boton-pregunta').appendChild(badge);
            }
        });
    });
}
