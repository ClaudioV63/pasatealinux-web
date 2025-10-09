// Tabs galería visual Linux
document.addEventListener('DOMContentLoaded', function() {
    var tabs = document.querySelectorAll('.tab-galeria');
    var tabCl = document.querySelector('.galeria-visual-claro');
    var tabOsc = document.querySelector('.galeria-visual-oscuro');
    if (tabs.length && tabCl && tabOsc) {
        tabs.forEach(function(tab) {
            tab.addEventListener('click', function() {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                if (tab.dataset.tab === 'claro') {
                    tabCl.style.display = 'block';
                    tabOsc.style.display = 'none';
                } else {
                    tabCl.style.display = 'none';
                    tabOsc.style.display = 'block';
                }
            });
        });
    }
});
// --- Modo claro/oscuro ---
document.addEventListener('DOMContentLoaded', function() {
    const btnSwitch = document.getElementById('switch-tema');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const TEMA_CLARO = 'claro';
    const TEMA_OSCURO = 'oscuro';

    function aplicarTema(tema) {
        document.documentElement.setAttribute('data-tema', tema);
        localStorage.setItem('tema', tema);
        const icono = btnSwitch.querySelector('i');
        if (icono) {
            icono.classList.remove('fa-moon', 'fa-sun');
            icono.classList.add(tema === TEMA_OSCURO ? 'fa-sun' : 'fa-moon');
        }
    }

    function alternarTema() {
        const temaActual = document.documentElement.getAttribute('data-tema') || (prefersDark ? TEMA_OSCURO : TEMA_CLARO);
        const nuevoTema = temaActual === TEMA_OSCURO ? TEMA_CLARO : TEMA_OSCURO;
        aplicarTema(nuevoTema);
    }

    // Inicializar icono y tema
    let temaGuardado = localStorage.getItem('tema');
    if (!temaGuardado) {
        temaGuardado = prefersDark ? TEMA_OSCURO : TEMA_CLARO;
    }
    aplicarTema(temaGuardado);

    if (btnSwitch) {
        btnSwitch.addEventListener('click', alternarTema);
    }
});
// Modal galería visual Linux
document.addEventListener('DOMContentLoaded', function() {
    var imagenesGaleria = document.querySelectorAll('.img-galeria-visual');
    var modalGaleria = document.getElementById('modalGaleriaVisual');
    var imgModalGaleria = document.getElementById('imgModalGaleria');
    var cerrarModalGaleria = document.getElementById('cerrarModalGaleria');
    if (imagenesGaleria && modalGaleria && imgModalGaleria && cerrarModalGaleria) {
        imagenesGaleria.forEach(function(img) {
            img.addEventListener('click', function() {
                imgModalGaleria.src = img.src;
                modalGaleria.style.display = 'flex';
            });
        });
        cerrarModalGaleria.addEventListener('click', function() {
            modalGaleria.style.display = 'none';
            imgModalGaleria.src = '';
        });
        modalGaleria.addEventListener('click', function(e) {
            if (e.target === modalGaleria) {
                modalGaleria.style.display = 'none';
                imgModalGaleria.src = '';
            }
        });
        document.addEventListener('keydown', function(e) {
            if (modalGaleria.style.display !== 'none' && (e.key === 'Escape' || e.key === 'Esc')) {
                modalGaleria.style.display = 'none';
                imgModalGaleria.src = '';
            }
        });
    }
});
// Funcionalidad principal del sitio web "Pasate a Linux"

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todas las funcionalidades
    inicializarNavegacion();
    inicializarAnimaciones();
    inicializarFormularios();
    inicializarScrollSuave();
    actualizarContadorDias();
    agregarEfectosVisuales();
    mejorarAccesibilidad();
    
    // Actualizar contador cada hora
    setInterval(actualizarContadorDias, 3600000);
    
    // Botón volver arriba
    if (!document.querySelector('.boton-volver-arriba')) {
        const btn = document.createElement('button');
        btn.className = 'boton-volver-arriba';
        btn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
        document.body.appendChild(btn);
        btn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        window.addEventListener('scroll', function() {
            if (window.scrollY > 200) {
                btn.classList.add('visible');
            } else {
                btn.classList.remove('visible');
            }
        });
    }
});

// Navegación responsive y efectos
function inicializarNavegacion() {
    const navegacion = document.querySelector('.navegacion');
    const menuHamburguesa = document.querySelector('.menu-hamburguesa');
    const menuNav = document.querySelector('.menu-nav');
    
    // Efecto de navegación al hacer scroll - mantener fondo oscuro
    window.addEventListener('scroll', function() {
        // Eliminar cualquier modificación inline del background y boxShadow
        // El color y sombra de la navegación se controlan solo por CSS y tema
    });
    
    // Menú hamburguesa para móviles
    if (menuHamburguesa && menuNav) {
        menuHamburguesa.addEventListener('click', function() {
            menuNav.classList.toggle('menu-activo');
            menuHamburguesa.classList.toggle('activo');
            
            // Animar las líneas del menú hamburguesa
            const lineas = menuHamburguesa.querySelectorAll('span');
            lineas.forEach((linea, index) => {
                if (menuHamburguesa.classList.contains('activo')) {
                    if (index === 0) linea.style.transform = 'rotate(45deg) translate(4px, 4px)';
                    if (index === 1) linea.style.opacity = '0';
                    if (index === 2) linea.style.transform = 'rotate(-45deg) translate(3px, -3px)';
                } else {
                    linea.style.transform = 'none';
                    linea.style.opacity = '1';
                }
            });
        });
        
        // Cerrar menú al hacer clic en un enlace
        const enlacesMenu = menuNav.querySelectorAll('a');
        enlacesMenu.forEach(enlace => {
            enlace.addEventListener('click', function() {
                menuNav.classList.remove('menu-activo');
                menuHamburguesa.classList.remove('activo');
                
                const lineas = menuHamburguesa.querySelectorAll('span');
                lineas.forEach(linea => {
                    linea.style.transform = 'none';
                    linea.style.opacity = '1';
                });
            });
        });
    }
    
    // Resaltar enlace activo según la página actual
    const paginaActual = window.location.pathname.split('/').pop() || 'index.html';
    const enlacesNav = document.querySelectorAll('.menu-nav a');
    
    enlacesNav.forEach(enlace => {
        const href = enlace.getAttribute('href');
        if (href === paginaActual || (paginaActual === '' && href === 'index.html')) {
            enlace.classList.add('enlace-activo');
        }
    });
}

// Animaciones de scroll y efectos visuales
function inicializarAnimaciones() {
    // Observador de intersección para animaciones
    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add('animado');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Elementos a animar
    const elementosAnimados = document.querySelectorAll(
        '.tarjeta-beneficio, .testimonio, .pregunta-faq, .categoria-link'
    );
    
    elementosAnimados.forEach(elemento => {
        elemento.style.opacity = '0';
        elemento.style.transform = 'translateY(30px)';
        elemento.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observador.observe(elemento);
    });
    
    // Agregar estilos para elementos animados
    const estiloAnimacion = document.createElement('style');
    estiloAnimacion.textContent = `
        .animado {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(estiloAnimacion);
    
    // Contador animado para estadísticas (si existen)
    const contadores = document.querySelectorAll('[data-contador]');
    contadores.forEach(contador => {
        const valorFinal = parseInt(contador.getAttribute('data-contador'));
        let valorActual = 0;
        const incremento = valorFinal / 100;
        
        const observadorContador = new IntersectionObserver((entradas) => {
            entradas.forEach(entrada => {
                if (entrada.isIntersecting) {
                    const intervalo = setInterval(() => {
                        valorActual += incremento;
                        if (valorActual >= valorFinal) {
                            valorActual = valorFinal;
                            clearInterval(intervalo);
                        }
                        contador.textContent = Math.floor(valorActual);
                    }, 20);
                    observadorContador.unobserve(contador);
                }
            });
        });
        
        observadorContador.observe(contador);
    });
}

// Manejo de formularios y validación
function inicializarFormularios() {
    const formularios = document.querySelectorAll('form');
    
    formularios.forEach(formulario => {
        // Excluir el formulario de contacto que tiene su propio manejo específico
        if (formulario.id === 'formularioContacto') {
            return;
        }
        
        formulario.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validación básica
            const camposRequeridos = formulario.querySelectorAll('[required]');
            let formularioValido = true;
            
            camposRequeridos.forEach(campo => {
                if (!campo.value.trim()) {
                    mostrarError(campo, 'Este campo es obligatorio');
                    formularioValido = false;
                } else {
                    limpiarError(campo);
                }
                
                // Validación de email
                if (campo.type === 'email' && campo.value.trim()) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(campo.value)) {
                        mostrarError(campo, 'Por favor ingresa un email válido');
                        formularioValido = false;
                    }
                }
                
                // Validación de teléfono
                if (campo.type === 'tel' && campo.value.trim()) {
                    const telefonoRegex = /^[\d\s\-\+\(\)]+$/;
                    if (!telefonoRegex.test(campo.value)) {
                        mostrarError(campo, 'Por favor ingresa un teléfono válido');
                        formularioValido = false;
                    }
                }
            });
            
            if (formularioValido) {
                // Simular envío del formulario
                const botonEnvio = formulario.querySelector('button[type="submit"]');
                const textoOriginal = botonEnvio.textContent;
                
                botonEnvio.textContent = 'Enviando...';
                botonEnvio.disabled = true;
                
                setTimeout(() => {
                    mostrarNotificacion('¡Mensaje enviado correctamente! Te contactaremos pronto.', 'exito');
                    formulario.reset();
                    botonEnvio.textContent = textoOriginal;
                    botonEnvio.disabled = false;
                }, 2000);
            }
        });
    });
}

// Funciones auxiliares para formularios
function mostrarError(campo, mensaje) {
    limpiarError(campo);
    
    const error = document.createElement('div');
    error.className = 'mensaje-error';
    error.textContent = mensaje;
    error.style.color = '#ef4444';
    error.style.fontSize = '0.875rem';
    error.style.marginTop = '0.25rem';
    
    campo.style.borderColor = '#ef4444';
    campo.parentNode.appendChild(error);
}

function limpiarError(campo) {
    const errorExistente = campo.parentNode.querySelector('.mensaje-error');
    if (errorExistente) {
        errorExistente.remove();
    }
    campo.style.borderColor = '';
}

function mostrarNotificacion(mensaje, tipo = 'info') {
    const notificacion = document.createElement('div');
    notificacion.className = `notificacion notificacion-${tipo}`;
    notificacion.textContent = mensaje;
    
    // Estilos de la notificación
    Object.assign(notificacion.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 1.5rem',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '500',
        zIndex: '9999',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        maxWidth: '400px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    });
    
    // Colores según el tipo
    const colores = {
        exito: '#10b981',
        error: '#ef4444',
        advertencia: '#f59e0b',
        info: '#3b82f6'
    };
    
    notificacion.style.backgroundColor = colores[tipo] || colores.info;
    
    document.body.appendChild(notificacion);
    
    // Animar entrada
    setTimeout(() => {
        notificacion.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover después de 5 segundos
    setTimeout(() => {
        notificacion.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notificacion.parentNode) {
                notificacion.parentNode.removeChild(notificacion);
            }
        }, 300);
    }, 5000);
}

// Scroll suave para enlaces internos
function inicializarScrollSuave() {
    const enlacesInternos = document.querySelectorAll('a[href^="#"]');
    
    enlacesInternos.forEach(enlace => {
        enlace.addEventListener('click', function(e) {
            e.preventDefault();
            
            const destino = document.querySelector(this.getAttribute('href'));
            if (destino) {
                const offsetTop = destino.offsetTop - 80; // Ajuste para navegación fija
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Utilidades adicionales
const utilidades = {
    // Detectar dispositivo móvil
    esMobile: function() {
        return window.innerWidth <= 768;
    },
    
    // Throttle para eventos de scroll
    throttle: function(func, delay) {
        let timeoutId;
        let lastExecTime = 0;
        return function() {
            const currentTime = Date.now();
            
            if (currentTime - lastExecTime > delay) {
                func.apply(this, arguments);
                lastExecTime = currentTime;
            } else {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    func.apply(this, arguments);
                    lastExecTime = Date.now();
                }, delay - (currentTime - lastExecTime));
            }
        };
    },
    
    // Formatear números
    formatearNumero: function(numero) {
        return numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    
    // Copiar texto al portapapeles
    copiarTexto: function(texto) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(texto).then(() => {
                mostrarNotificacion('Texto copiado al portapapeles', 'exito');
            });
        } else {
            // Fallback para navegadores más antiguos
            const textarea = document.createElement('textarea');
            textarea.value = texto;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            mostrarNotificacion('Texto copiado al portapapeles', 'exito');
        }
    }
};

// Hacer utilidades disponibles globalmente
window.utilidades = utilidades;

// Funciones globales requeridas por los archivos HTML

function toggleRespuesta(boton) {
    const preguntaFAQ = boton.parentElement;
    const respuesta = preguntaFAQ.querySelector('.respuesta-faq');
    const icono = boton.querySelector('.icono-toggle');
    
    if (!respuesta || !icono) return;
    
    const estaActiva = respuesta.classList.contains('activa');
    
    if (estaActiva) {
        respuesta.classList.remove('activa');
        icono.textContent = '+';
    } else {
        respuesta.classList.add('activa');
        icono.textContent = '−';
        
        // Scroll suave hacia la pregunta
        setTimeout(() => {
            preguntaFAQ.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }, 300);
    }
}

function buscarFaq() {
    const inputBuscar = document.getElementById('buscar-faq');
    if (inputBuscar && window.faqUtils) {
        window.faqUtils.buscarPregunta(inputBuscar.value);
    }
}

// Hacer funciones disponibles globalmente
window.toggleRespuesta = toggleRespuesta;
window.buscarFaq = buscarFaq;

// Manejo de errores globales
window.addEventListener('error', function(e) {
    console.error('Error en el sitio:', e.error);
    // En producción, aquí podrías enviar el error a un servicio de monitoreo
});

// Optimización de rendimiento
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Aquí se podría registrar un service worker para cache offline
        console.log('Service Worker disponible');
    });
}

// Precargar imágenes importantes
function precargarImagenes() {
    const imagenesImportantes = [
        'assets/img/pasatealinux-logo.jpg',
        'assets/img/tux.png',
        'assets/img/Linux_Mint_logo.png'
    ];
    
    imagenesImportantes.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Inicializar precarga cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', precargarImagenes);

// Función para calcular días SIN soporte desde octubre 2025
function calcularDiasSinSoporte() {
    const fechaFinSoporte = new Date('2025-10-14'); // Fecha de fin de soporte Windows 10
    const fechaActual = new Date();
    const diferencia = fechaActual - fechaFinSoporte;
    
    // Si aún no llegó la fecha, mostrar 0
    if (diferencia < 0) {
        return '0';
    }
    
    const dias = Math.ceil(diferencia / (1000 * 60 * 60 * 24));
    
    // Formatear con separador de miles
    return dias.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Actualizar contador de días sin soporte
function actualizarContadorDias() {
    const elementoDias = document.getElementById('diasSinSoporte');
    if (elementoDias) {
        elementoDias.textContent = calcularDiasSinSoporte();
    }
}

// Función para agregar efectos visuales elegantes
function agregarEfectosVisuales() {
    // Animación de entrada para elementos
    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add('fade-in');
                observador.unobserve(entrada.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observar elementos para animación
    document.querySelectorAll('.tarjeta-beneficio, .testimonio, .pregunta-faq').forEach(el => {
        observador.observe(el);
    });
    
    // Efecto de typing en el título principal
    const tituloPrincipal = document.querySelector('.titulo-principal');
    if (tituloPrincipal && !tituloPrincipal.classList.contains('typing-complete')) {
        // Desactivar el efecto de typing para evitar problemas con HTML
        tituloPrincipal.classList.add('typing-complete');
        
        // En su lugar, agregar una animación de entrada suave
        tituloPrincipal.style.opacity = '0';
        tituloPrincipal.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            tituloPrincipal.style.transition = 'all 0.8s ease-out';
            tituloPrincipal.style.opacity = '1';
            tituloPrincipal.style.transform = 'translateY(0)';
        }, 300);
    }
}

// Función para mejorar la accesibilidad
function mejorarAccesibilidad() {
    // Navegación por teclado mejorada
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('navegando-teclado');
        }
    });
    
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('navegando-teclado');
    });
    
    // Soporte para prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.style.setProperty('--transicion-rapida', '0.01ms');
        document.documentElement.style.setProperty('--transicion-normal', '0.01ms');
        document.documentElement.style.setProperty('--transicion-lenta', '0.01ms');
    }
    
    // Mejorar contraste en modo alto contraste
    if (window.matchMedia('(prefers-contrast: high)').matches) {
        document.documentElement.classList.add('alto-contraste');
    }
}

// Slider visual de Linux
const imagenesVisual = [
    'assets/img/escritorio-1.jpeg',
    'assets/img/escritorio-2.jpeg',
    'assets/img/escritorio-3.jpeg',
    'assets/img/escritorio-4.jpeg',
    'assets/img/escritorio-5.jpeg',
    'assets/img/escritorio-6.jpeg'
];
let indiceVisual = 0;
const imgSliderVisual = document.getElementById('imgSliderVisual');
const btnAntVisual = document.querySelector('.boton-slider-visual.anterior');
const btnSigVisual = document.querySelector('.boton-slider-visual.siguiente');
const modalSliderVisual = document.getElementById('modalSliderVisual');
const imgModalVisual = document.getElementById('imgModalVisual');
const cerrarModalVisual = document.getElementById('cerrarModalVisual');

function mostrarImagenVisual(idx) {
    if (!imgSliderVisual) return;
    indiceVisual = (idx + imagenesVisual.length) % imagenesVisual.length;
    imgSliderVisual.src = imagenesVisual[indiceVisual];
}
if (btnAntVisual && btnSigVisual) {
    btnAntVisual.addEventListener('click', function() {
        mostrarImagenVisual(indiceVisual - 1);
    });
    btnSigVisual.addEventListener('click', function() {
        mostrarImagenVisual(indiceVisual + 1);
    });
}
if (imgSliderVisual) {
    imgSliderVisual.addEventListener('click', function() {
        imgModalVisual.src = imagenesVisual[indiceVisual];
        modalSliderVisual.style.display = 'flex';
    });
}
if (cerrarModalVisual) {
    cerrarModalVisual.addEventListener('click', function() {
        modalSliderVisual.style.display = 'none';
        imgModalVisual.src = '';

    });
}
// --- Fin de funcionalidad slider visual y tema ---

// ========================================
// FUNCIONALIDAD PÁGINA TUTORIALES
// ========================================

/**
 * Inicializar funcionalidad de categorías de tutoriales
 * Maneja el scroll suave a las secciones correspondientes
 */
function inicializarCategoriasTutoriales() {
    const botonesCategorias = document.querySelectorAll('.categoria-tutorial');
    
    if (!botonesCategorias.length) return;
    
    botonesCategorias.forEach(boton => {
        boton.addEventListener('click', function() {
            // Remover clase activa de todos los botones
            botonesCategorias.forEach(b => b.classList.remove('activa'));
            
            // Agregar clase activa al botón clickeado
            this.classList.add('activa');
            
            // Obtener el ID de la sección
            const idSeccion = this.getAttribute('data-seccion');
            const seccion = document.getElementById(idSeccion);
            
            if (seccion) {
                // Calcular offset de la navegación
                const navegacion = document.querySelector('.navegacion');
                const offset = navegacion ? navegacion.offsetHeight + 10 : 100;
                const posicionTop = seccion.getBoundingClientRect().top + window.scrollY - offset;
                
                // Scroll suave a la sección
                window.scrollTo({ 
                    top: posicionTop, 
                    behavior: 'smooth' 
                });
            }
        });
    });
}

/**
 * Pausar otros videos cuando se reproduce uno
 * Optimización para evitar múltiples reproducciones simultáneas
 */
function inicializarControlVideos() {
    const videos = document.querySelectorAll('.seccion-videos video');
    
    if (!videos.length) return;
    
    videos.forEach(video => {
        video.addEventListener('play', function() {
            // Pausar todos los demás videos
            videos.forEach(otroVideo => {
                if (otroVideo !== video) {
                    otroVideo.pause();
                }
            });
        });
    });
}

/**
 * Sistema de paginación para videos
 * Configuración: 6 videos por página
 */
function inicializarPaginacionVideos() {
    const VIDEOS_POR_PAGINA = 6;
    let paginaActual = 1;
    
    const contenedorVideos = document.getElementById('contenedorVideos');
    const paginacionVideos = document.getElementById('paginacionVideos');
    const btnAnterior = document.getElementById('btnAnterior');
    const btnSiguiente = document.getElementById('btnSiguiente');
    const numerosPagina = document.getElementById('numerosPagina');
    
    if (!contenedorVideos || !paginacionVideos) return;
    
    // Obtener todos los videos
    const todosLosVideos = Array.from(contenedorVideos.querySelectorAll('.video-tutorial'));
    
    // Si hay 6 o menos videos, no mostrar paginación
    if (todosLosVideos.length <= VIDEOS_POR_PAGINA) {
        paginacionVideos.style.display = 'none';
        return;
    }
    
    // Calcular total de páginas
    const totalPaginas = Math.ceil(todosLosVideos.length / VIDEOS_POR_PAGINA);
    
    /**
     * Mostrar videos de la página actual
     */
    function mostrarPagina(numeroPagina) {
        // Pausar todos los videos antes de cambiar de página
        todosLosVideos.forEach(videoArticle => {
            const video = videoArticle.querySelector('video');
            if (video) video.pause();
        });
        
        // Ocultar todos los videos
        todosLosVideos.forEach(video => video.classList.add('oculto'));
        
        // Calcular rango de videos a mostrar
        const inicio = (numeroPagina - 1) * VIDEOS_POR_PAGINA;
        const fin = inicio + VIDEOS_POR_PAGINA;
        
        // Mostrar videos de la página actual
        todosLosVideos.slice(inicio, fin).forEach(video => {
            video.classList.remove('oculto');
        });
        
        // Actualizar página actual
        paginaActual = numeroPagina;
        
        // Actualizar botones
        actualizarBotones();
        
        // Actualizar números de página
        generarNumerosPagina();
        
        // Scroll suave a la sección de videos
        const seccionVideos = document.getElementById('videos');
        if (seccionVideos) {
            const navegacion = document.querySelector('.navegacion');
            const offset = navegacion ? navegacion.offsetHeight + 20 : 120;
            const posicionTop = seccionVideos.getBoundingClientRect().top + window.scrollY - offset;
            
            window.scrollTo({ 
                top: posicionTop, 
                behavior: 'smooth' 
            });
        }
    }
    
    /**
     * Actualizar estado de botones anterior/siguiente
     */
    function actualizarBotones() {
        if (btnAnterior) {
            btnAnterior.disabled = paginaActual === 1;
        }
        
        if (btnSiguiente) {
            btnSiguiente.disabled = paginaActual === totalPaginas;
        }
    }
    
    /**
     * Generar números de página dinámicamente
     */
    function generarNumerosPagina() {
        if (!numerosPagina) return;
        
        numerosPagina.innerHTML = '';
        
        // Lógica para mostrar números de página con puntos suspensivos
        const maxNumerosMostrar = 5;
        let numerosAMostrar = [];
        
        if (totalPaginas <= maxNumerosMostrar) {
            // Mostrar todas las páginas
            numerosAMostrar = Array.from({ length: totalPaginas }, (_, i) => i + 1);
        } else {
            // Mostrar con puntos suspensivos
            if (paginaActual <= 3) {
                numerosAMostrar = [1, 2, 3, 4, '...', totalPaginas];
            } else if (paginaActual >= totalPaginas - 2) {
                numerosAMostrar = [1, '...', totalPaginas - 3, totalPaginas - 2, totalPaginas - 1, totalPaginas];
            } else {
                numerosAMostrar = [1, '...', paginaActual - 1, paginaActual, paginaActual + 1, '...', totalPaginas];
            }
        }
        
        // Crear botones de número de página
        numerosAMostrar.forEach(numero => {
            if (numero === '...') {
                const puntos = document.createElement('span');
                puntos.className = 'puntos-suspensivos';
                puntos.textContent = '...';
                numerosPagina.appendChild(puntos);
            } else {
                const boton = document.createElement('button');
                boton.className = 'numero-pagina';
                boton.textContent = numero;
                boton.setAttribute('aria-label', `Ir a página ${numero}`);
                
                if (numero === paginaActual) {
                    boton.classList.add('activo');
                    boton.setAttribute('aria-current', 'page');
                }
                
                boton.addEventListener('click', () => mostrarPagina(numero));
                numerosPagina.appendChild(boton);
            }
        });
    }
    
    // Event listeners para botones anterior/siguiente
    if (btnAnterior) {
        btnAnterior.addEventListener('click', () => {
            if (paginaActual > 1) {
                mostrarPagina(paginaActual - 1);
            }
        });
    }
    
    if (btnSiguiente) {
        btnSiguiente.addEventListener('click', () => {
            if (paginaActual < totalPaginas) {
                mostrarPagina(paginaActual + 1);
            }
        });
    }
    
    // Inicializar mostrando la primera página
    mostrarPagina(1);
}

// Inicializar funcionalidad de tutoriales cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    inicializarCategoriasTutoriales();
    inicializarControlVideos();
    inicializarPaginacionVideos();
});

// --- Fin de funcionalidad slider visual y tema ---

// ========================================
// FUNCIONALIDAD ESTRATEGIA DUAL (EMPRESAS + PERSONAL)
// ========================================

/**
 * Gestión de CTAs diferenciados (Personal vs Empresa)
 * Guarda la preferencia del usuario para personalizar la experiencia
 */
function inicializarCTAsDiferenciados() {
    const botones = document.querySelectorAll('[data-tipo]');
    
    botones.forEach(boton => {
        boton.addEventListener('click', function(e) {
            const tipo = this.getAttribute('data-tipo');
            
            // Guardar preferencia en sessionStorage
            if (tipo) {
                sessionStorage.setItem('tipoConsulta', tipo);
                
                // Opcional: Scroll suave al formulario de contacto
                const contacto = document.getElementById('contacto');
                if (contacto && this.getAttribute('href') === '#contacto') {
                    e.preventDefault();
                    contacto.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });
}

/**
 * Personalizar formulario de contacto según tipo de consulta
 * (Esta función se activará cuando el formulario esté implementado)
 */
function personalizarFormularioContacto() {
    const tipoConsulta = sessionStorage.getItem('tipoConsulta');
    
    if (!tipoConsulta) return;
    
    // Aquí se puede agregar lógica para mostrar campos adicionales
    // según si es consulta personal o empresarial
    console.log('Tipo de consulta seleccionado:', tipoConsulta);
    
    // Ejemplo: Agregar campos empresariales si el tipo es 'empresa'
    // Esta funcionalidad se puede expandir cuando el formulario esté activo
}

/**
 * Calculadora de Ahorro Interactiva
 * Calcula ahorro en tiempo real según cantidad de equipos
 */
function inicializarCalculadoraAhorro() {
    const botonesToggle = document.querySelectorAll('.boton-toggle');
    const calculadoraPersonal = document.querySelector('.calculadora-personal');
    const calculadoraEmpresa = document.querySelector('.calculadora-empresa');
    const inputPersonal = document.getElementById('equiposPersonal');
    const inputEmpresa = document.getElementById('equiposEmpresa');
    
    if (!botonesToggle.length) return;
    
    // Precios base (USD) - Actualizados según precios Argentina 2025
    const PRECIOS = {
        personal: {
            windows: 204,  // Windows 11 Home
            office: 42,    // Microsoft 365 Personal (anual)
            antivirus: 40
        },
        empresa: {
            windows: 295,  // Windows 11 Pro
            office: 150,   // Microsoft 365 Empresa Estándar (USD 12.50/mes x 12)
            antivirus: 50
        }
    };
    
    // Toggle entre Personal y Empresa
    botonesToggle.forEach(boton => {
        boton.addEventListener('click', function() {
            const modo = this.getAttribute('data-modo');
            
            // Actualizar botones
            botonesToggle.forEach(b => b.classList.remove('activo'));
            this.classList.add('activo');
            
            // Mostrar calculadora correspondiente
            if (modo === 'personal') {
                calculadoraPersonal.classList.add('activa');
                calculadoraEmpresa.classList.remove('activa');
            } else {
                calculadoraPersonal.classList.remove('activa');
                calculadoraEmpresa.classList.add('activa');
            }
        });
    });
    
    // Calcular ahorro personal
    function calcularAhorroPersonal() {
        const equipos = parseInt(inputPersonal.value) || 1;
        
        const costoWindows = PRECIOS.personal.windows * equipos;
        const costoOffice = PRECIOS.personal.office * equipos;
        const costoAntivirus = PRECIOS.personal.antivirus * equipos;
        const total = costoWindows + costoOffice + costoAntivirus;
        
        document.getElementById('costoWindowsPersonal').textContent = `$${costoWindows}`;
        document.getElementById('costoOfficePersonal').textContent = `$${costoOffice}`;
        document.getElementById('costoAntivirusPersonal').textContent = `$${costoAntivirus}`;
        document.getElementById('totalPersonal').textContent = `$${total} USD`;
    }
    
    // Calcular ahorro empresarial
    function calcularAhorroEmpresa() {
        const equipos = parseInt(inputEmpresa.value) || 10;
        
        const costoWindows = PRECIOS.empresa.windows * equipos;
        const costoOffice = PRECIOS.empresa.office * equipos;
        const costoAntivirus = PRECIOS.empresa.antivirus * equipos;
        const totalAnual = costoWindows + costoOffice + costoAntivirus;
        const totalTresAnios = totalAnual * 3;
        
        document.getElementById('costoWindowsEmpresa').textContent = `$${costoWindows.toLocaleString()}`;
        document.getElementById('costoOfficeEmpresa').textContent = `$${costoOffice.toLocaleString()}`;
        document.getElementById('costoAntivirusEmpresa').textContent = `$${costoAntivirus.toLocaleString()}`;
        document.getElementById('totalEmpresa').textContent = `$${totalAnual.toLocaleString()} USD`;
        document.getElementById('roiEmpresa').textContent = `$${totalTresAnios.toLocaleString()} USD`;
    }
    
    // Event listeners para inputs
    if (inputPersonal) {
        inputPersonal.addEventListener('input', calcularAhorroPersonal);
        calcularAhorroPersonal(); // Calcular inicial
    }
    
    if (inputEmpresa) {
        inputEmpresa.addEventListener('input', calcularAhorroEmpresa);
        calcularAhorroEmpresa(); // Calcular inicial
    }
}

/**
 * Tracking de eventos para Analytics
 * Registra interacciones clave del usuario
 */
function inicializarAnalytics() {
    // Verificar si Google Analytics está disponible
    if (typeof gtag === 'undefined') return;
    
    // Track: Click en CTAs diferenciados
    document.querySelectorAll('[data-tipo]').forEach(boton => {
        boton.addEventListener('click', function() {
            const tipo = this.getAttribute('data-tipo');
            gtag('event', 'cta_click', {
                'event_category': 'Conversión',
                'event_label': tipo === 'personal' ? 'CTA Personal' : 'CTA Empresa',
                'value': tipo
            });
        });
    });
    
    // Track: Uso de calculadora
    const inputCalculadora = document.querySelectorAll('.input-equipos');
    inputCalculadora.forEach(input => {
        input.addEventListener('change', function() {
            const modo = this.id.includes('Personal') ? 'personal' : 'empresa';
            const equipos = this.value;
            gtag('event', 'calculadora_uso', {
                'event_category': 'Engagement',
                'event_label': `Calculadora ${modo}`,
                'value': equipos
            });
        });
    });
    
    // Track: Toggle calculadora
    document.querySelectorAll('.boton-toggle').forEach(boton => {
        boton.addEventListener('click', function() {
            const modo = this.getAttribute('data-modo');
            gtag('event', 'toggle_calculadora', {
                'event_category': 'Engagement',
                'event_label': `Modo ${modo}`,
                'value': modo
            });
        });
    });
}

// Inicializar funcionalidades al cargar el DOM
document.addEventListener('DOMContentLoaded', function() {
    inicializarCTAsDiferenciados();
    personalizarFormularioContacto();
    inicializarCalculadoraAhorro();
    inicializarAnalytics();
});
