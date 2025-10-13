/**
 * Formulario de Contacto - Pasate a Linux
 * Maneja la validación, interacción y envío del formulario a n8n
 */

(function() {
    'use strict';

    // Configuración
    const CONFIG = {
        // URL del webhook de n8n (deberás reemplazar con tu URL real)
        webhookURL: 'https://n8napi.nexserver.ar/webhook/59d1259d-43ae-41df-bf67-afda885b6fe0',
        destinatarios: ['pasatealinux.ar@gmail.com'], // Email(s) de destino
        origen: 'Pasate a Linux - Website'
    };

    // Costos para cálculo de ahorro
    const COSTOS = {
        personal: {
            windows: 204,
            office: 42,
            antivirus: 40
        },
        empresa: {
            windows: 295,
            office: 150,
            antivirus: 50
        }
    };

    // Elementos del DOM
    const elementos = {
        formulario: null,
        selectTipoUsuario: null,
        mensajeInfoPersonal: null,
        mensajeInfoEmpresa: null,
        camposEmpresa: null,
        camposPreferencias: null,
        resumenAhorro: null,
        cantidadEquipos: null,
        valorAhorro: null,
        botonEnviar: null,
        mensajeEstado: null
    };

    // Estado del formulario
    let estadoFormulario = {
        tipoUsuario: 'personal',
        enviando: false
    };

    /**
     * Inicializa el formulario
     */
    function inicializar() {
        // Obtener elementos del DOM
        elementos.formulario = document.getElementById('formularioContacto');
        elementos.selectTipoUsuario = document.getElementById('tipoUsuario');
        elementos.mensajeInfoPersonal = document.getElementById('mensajeInfoPersonal');
        elementos.mensajeInfoEmpresa = document.getElementById('mensajeInfoEmpresa');
        elementos.camposEmpresa = document.getElementById('camposEmpresa');
        elementos.camposPreferencias = document.getElementById('camposPreferencias');
        elementos.resumenAhorro = document.getElementById('resumenAhorro');
        elementos.cantidadEquipos = document.getElementById('cantidadEquipos');
        elementos.valorAhorro = document.getElementById('valorAhorroEstimado');
        elementos.botonEnviar = document.getElementById('botonEnviar');
        elementos.mensajeEstado = document.getElementById('mensajeEstado');

        if (!elementos.formulario) {
            console.warn('Formulario de contacto no encontrado en esta página');
            return;
        }

        // Verificar elementos críticos
        if (!elementos.botonEnviar) {
            console.error('Botón de envío no encontrado - ID: botonEnviar');
            return;
        }

        if (!elementos.mensajeEstado) {
            console.error('Elemento de mensaje de estado no encontrado - ID: mensajeEstado');
            return;
        }

        // Configurar event listeners
        configurarEventListeners();

        // Detectar si viene desde un botón CTA con data-tipo
        detectarTipoUsuarioDesdeURL();

        // Calcular ahorro inicial
        calcularAhorro();
    }

    /**
     * Configura todos los event listeners
     */
    function configurarEventListeners() {
        // Selector de tipo de usuario
        if (elementos.selectTipoUsuario) {
            elementos.selectTipoUsuario.addEventListener('change', manejarCambioTipoUsuario);
        }

        // Cambio en cantidad de equipos
        if (elementos.cantidadEquipos) {
            elementos.cantidadEquipos.addEventListener('input', calcularAhorro);
        }

        // Validación en tiempo real
        const camposValidar = elementos.formulario.querySelectorAll('input[required], textarea[required], select[required]');
        camposValidar.forEach(campo => {
            campo.addEventListener('blur', () => validarCampo(campo));
            campo.addEventListener('input', () => limpiarError(campo));
            if (campo.tagName === 'SELECT') {
                campo.addEventListener('change', () => limpiarError(campo));
            }
        });

        // Envío del formulario
        elementos.formulario.addEventListener('submit', manejarEnvioFormulario);
    }

    /**
     * Detecta el tipo de usuario desde los botones CTA
     */
    function detectarTipoUsuarioDesdeURL() {
        // Escuchar clics en los botones CTA de la página
        const botonesCTA = document.querySelectorAll('[data-tipo]');
        botonesCTA.forEach(boton => {
            boton.addEventListener('click', (e) => {
                const tipo = boton.getAttribute('data-tipo');
                if (tipo === 'personal' || tipo === 'empresa') {
                    setTimeout(() => {
                        seleccionarTipoUsuario(tipo);
                    }, 300);
                }
            });
        });
    }

    /**
     * Maneja el cambio de tipo de usuario
     */
    function manejarCambioTipoUsuario(e) {
        const select = e.currentTarget;
        const tipo = select.value;
        seleccionarTipoUsuario(tipo);
    }

    /**
     * Selecciona el tipo de usuario
     */
    function seleccionarTipoUsuario(tipo) {
        estadoFormulario.tipoUsuario = tipo;
        elementos.selectTipoUsuario.value = tipo;

        // Mostrar/ocultar mensajes informativos según tipo de usuario
        if (elementos.mensajeInfoPersonal && elementos.mensajeInfoEmpresa) {
            if (tipo === 'personal') {
                // Mostrar mensaje personal, ocultar mensaje empresa
                elementos.mensajeInfoPersonal.classList.remove('oculto');
                elementos.mensajeInfoPersonal.style.display = 'flex';
                elementos.mensajeInfoEmpresa.classList.add('oculto');
                elementos.mensajeInfoEmpresa.style.display = 'none';
            } else if (tipo === 'empresa') {
                // Mostrar mensaje empresa, ocultar mensaje personal
                elementos.mensajeInfoEmpresa.classList.remove('oculto');
                elementos.mensajeInfoEmpresa.style.display = 'flex';
                elementos.mensajeInfoPersonal.classList.add('oculto');
                elementos.mensajeInfoPersonal.style.display = 'none';
            }
        }

        // Mostrar/ocultar campos según tipo de usuario
        if (tipo === 'empresa') {
            // Mostrar solo el campo nombre de empresa (los demás campos específicos de empresa permanecen ocultos)
            elementos.camposEmpresa.style.display = 'block';
            elementos.camposEmpresa.classList.add('mostrar');
            
            // MANTENER OCULTOS: preferencias de contacto y ahorro estimado para empresas
            if (elementos.camposPreferencias) {
                elementos.camposPreferencias.style.display = 'none';
            }
            if (elementos.resumenAhorro) {
                elementos.resumenAhorro.style.display = 'none';
            }
            
            // Configurar cantidad de equipos para empresa (campo oculto pero con valor por defecto)
            elementos.cantidadEquipos.max = 100;
            elementos.cantidadEquipos.value = Math.max(2, elementos.cantidadEquipos.value);
        } else {
            // Ocultar campos de empresa
            elementos.camposEmpresa.style.display = 'none';
            elementos.camposEmpresa.classList.remove('mostrar');
            
            // Ocultar preferencias de contacto y ahorro estimado para uso personal
            if (elementos.camposPreferencias) {
                elementos.camposPreferencias.style.display = 'none';
            }
            if (elementos.resumenAhorro) {
                elementos.resumenAhorro.style.display = 'none';
            }
            
            // Configurar cantidad de equipos para uso personal (campo oculto pero con valor por defecto)
            elementos.cantidadEquipos.max = 3;
            elementos.cantidadEquipos.value = 1; // Comenzar en 1 para uso personal
        }

        // Recalcular ahorro
        calcularAhorro();
    }

    /**
     * Calcula el ahorro estimado
     */
    function calcularAhorro() {
        const tipo = estadoFormulario.tipoUsuario;
        const cantidad = parseInt(elementos.cantidadEquipos.value) || 1;
        
        const costos = COSTOS[tipo];
        const totalPorEquipo = costos.windows + costos.office + costos.antivirus;
        const total = totalPorEquipo * cantidad;

        elementos.valorAhorro.textContent = `$${total.toLocaleString('es-AR')} USD`;
    }

    /**
     * Valida un campo individual
     */
    function validarCampo(campo) {
        const valor = campo.value.trim();
        const tipo = campo.type;
        const grupoCampo = campo.closest('.grupo-campo');
        const mensajeError = grupoCampo ? grupoCampo.querySelector('.mensaje-error') : null;

        let esValido = true;
        let mensajeTexto = '';

        // Validación de campos requeridos
        if (campo.hasAttribute('required') && !valor) {
            esValido = false;
            mensajeTexto = 'Este campo es obligatorio';
        }
        // Validación de email
        else if (tipo === 'email' && valor) {
            const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!regexEmail.test(valor)) {
                esValido = false;
                mensajeTexto = 'Ingresá un email válido';
            }
        }
        // Validación de teléfono
        else if (tipo === 'tel' && valor) {
            const regexTelefono = /^[0-9\s\-\+\(\)]{8,20}$/;
            if (!regexTelefono.test(valor)) {
                esValido = false;
                mensajeTexto = 'Ingresá un teléfono válido';
            }
        }
        // Validación de longitud mínima
        else if (campo.hasAttribute('minlength') && valor) {
            const minLength = parseInt(campo.getAttribute('minlength'));
            if (valor.length < minLength) {
                esValido = false;
                mensajeTexto = `Mínimo ${minLength} caracteres`;
            }
        }

        // Aplicar estilos y mensajes
        if (esValido) {
            campo.classList.remove('error');
            campo.classList.add('valido');
            if (mensajeError) {
                mensajeError.textContent = '';
                mensajeError.classList.remove('visible');
            }
        } else {
            campo.classList.remove('valido');
            campo.classList.add('error');
            if (mensajeError) {
                mensajeError.textContent = mensajeTexto;
                mensajeError.classList.add('visible');
            }
        }

        return esValido;
    }

    /**
     * Limpia el error de un campo
     */
    function limpiarError(campo) {
        campo.classList.remove('error');
        const grupoCampo = campo.closest('.grupo-campo');
        const mensajeError = grupoCampo ? grupoCampo.querySelector('.mensaje-error') : null;
        if (mensajeError) {
            mensajeError.classList.remove('visible');
        }
    }

    /**
     * Valida todo el formulario
     */
    function validarFormulario() {
        let esValido = true;
        const camposRequeridos = elementos.formulario.querySelectorAll('[required]');

        camposRequeridos.forEach(campo => {
            // Solo validar campos visibles
            if (campo.offsetParent !== null) {
                if (!validarCampo(campo)) {
                    esValido = false;
                }
            }
        });

        return esValido;
    }

    /**
     * Maneja el envío del formulario
     */
    async function manejarEnvioFormulario(e) {
        e.preventDefault();

        // Verificar honeypot (anti-spam)
        const honeypot = elementos.formulario.querySelector('[name="website"]');
        if (honeypot && honeypot.value) {
            console.warn('Posible spam detectado');
            return;
        }

        // Validar formulario
        if (!validarFormulario()) {
            mostrarMensaje('Por favor, completá todos los campos obligatorios correctamente', 'error');
            return;
        }

        // Evitar envíos múltiples
        if (estadoFormulario.enviando) {
            return;
        }

        // Preparar datos
        const datosFormulario = recopilarDatosFormulario();

        // Enviar a n8n
        await enviarAn8n(datosFormulario);
    }

    /**
     * Recopila los datos del formulario
     */
    function recopilarDatosFormulario() {
        const formData = new FormData(elementos.formulario);
        const tipo = estadoFormulario.tipoUsuario;
        
        // Construir objeto de datos
        const datos = {
            nombre: formData.get('nombre'),
            email: formData.get('email'),
            telefono: formData.get('telefono'),
            tipoUsuario: tipo,
            cantidadEquipos: formData.get('cantidadEquipos') || '1', // Siempre enviar valor por defecto
            mensaje: formData.get('mensaje') || '',
            // Campos que ahora siempre van vacíos (ocultos para ambos tipos)
            preferenciaContacto: '',
            horarioPreferido: '',
            ahorroEstimado: ''
        };

        // Agregar campos específicos de empresa si aplica
        if (tipo === 'empresa') {
            datos.nombreEmpresa = formData.get('nombreEmpresa') || '';
            datos.rubro = formData.get('rubro') || '';
            datos.softwareCritico = formData.get('softwareCritico') || '';
        }

        // Construir asunto y servicio
        const servicio = tipo === 'empresa' ? 'Migración Empresarial' : 'Migración Personal';
        const asunto = `PAL Consulta - ${servicio} - ${datos.nombre}`;

        // Construir mensaje completo en formato HTML
        let mensajeCompleto = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Consulta - Pasate a Linux</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .section { border-left: 4px solid #00d4aa; padding: 0 0 0 20px; margin: 25px 0; }
        .section h2 { color: #0a1628; margin: 0 0 15px 0; font-size: 18px; font-weight: bold; }
        .section-content { margin-left: 20px; }
        .data-item { margin: 10px 0; }
        .data-label { font-weight: bold; color: #0a1628; }
        .data-value { color: #333; margin-left: 8px; }
        .highlight { font-weight: bold; color: #00b894; }
        .message-box { background: #f8f9fa; border: 1px solid #ddd; padding: 15px; border-radius: 8px; margin: 15px 0; }
        .footer { text-align: center; color: #666; font-size: 12px; margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; }
        .empresa-badge { background: #ff6b35; color: white; padding: 4px 8px; border-radius: 12px; font-size: 12px; font-weight: bold; }
        .personal-badge { background: #00d4aa; color: white; padding: 4px 8px; border-radius: 12px; font-size: 12px; font-weight: bold; }
    </style>
</head>
<body>

    <div class="section">
        <h2>Datos del Contacto</h2>
        <div class="section-content">
            <div class="data-item">
                <span class="data-label">Nombre:</span>
                <span class="data-value"><strong>${datos.nombre}</strong></span>
            </div>
            <div class="data-item">
                <span class="data-label">Email:</span>
                <span class="data-value"><a href="mailto:${datos.email}" style="color: #00d4aa; text-decoration: none;">${datos.email}</a></span>
            </div>
            <div class="data-item">
                <span class="data-label">WhatsApp/Teléfono:</span>
                <span class="data-value"><a href="https://wa.me/${datos.telefono.replace(/[^0-9]/g, '')}" style="color: #25d366; text-decoration: none;">${datos.telefono}</a></span>
            </div>
            <div class="data-item">
                <span class="data-label">Tipo de Usuario:</span>
                <span class="data-value">
                    ${tipo === 'empresa' ? 
                        '<span class="empresa-badge">EMPRESA</span>' : 
                        '<span class="personal-badge">USO PERSONAL</span>'
                    }
                </span>
            </div>
            <!-- Cantidad de equipos y ahorro estimado ahora ocultos en el email -->
        </div>
    </div>`;

        if (tipo === 'empresa') {
            mensajeCompleto += `
    <div class="section">
        <h2>Datos de la Empresa</h2>
        <div class="section-content">
            <div class="data-item">
                <span class="data-label">Nombre de la Empresa:</span>
                <span class="data-value"><strong>${datos.nombreEmpresa || 'No especificado'}</strong></span>
            </div>
            <!-- Rubro y Software Crítico ahora ocultos en el email -->
        </div>
    </div>`;
        }

        // Preferencias de contacto ahora siempre ocultas
        // if (datos.preferenciaContacto || datos.horarioPreferido) { ... }

        if (datos.mensaje) {
            mensajeCompleto += `
    <div class="section">
        <h2>Mensaje/Consulta</h2>
        <div class="section-content">
            <div class="message-box">
                ${datos.mensaje.replace(/\n/g, '<br>')}
            </div>
        </div>
    </div>`;
        }

        mensajeCompleto += `
    <div class="footer">
        <p><strong>Enviado desde:</strong> ${CONFIG.origen}</p>
        <p><strong>Fecha:</strong> ${new Date().toLocaleString('es-AR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })}</p>
        <p style="margin-top: 15px;">
            <a href="https://pasatealinux.ar" style="color: #00d4aa; text-decoration: none;">Pasate a Linux</a> | 
            <a href="mailto:pasatealinux.ar@gmail.com" style="color: #00d4aa; text-decoration: none;">Contacto</a>
        </p>
    </div>
</body>
</html>
        `;

        return {
            nombre: datos.nombre,
            email: datos.email,
            telefono: datos.telefono,
            servicio: servicio,
            asunto: asunto,
            mensaje: mensajeCompleto,
            destinatarios: CONFIG.destinatarios,
            origen: CONFIG.origen
        };
    }

    /**
     * Envía los datos a n8n
     */
    async function enviarAn8n(datos) {
        estadoFormulario.enviando = true;
        actualizarEstadoBotonEnvio(true);

        try {
            const respuesta = await fetch(CONFIG.webhookURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datos)
            });

            // Verificar si la respuesta es exitosa
            if (!respuesta.ok) {
                throw new Error(`Error HTTP: ${respuesta.status} - ${respuesta.statusText}`);
            }

            const resultado = await respuesta.json();
            console.log('Respuesta de n8n:', resultado);

            // n8n devuelve un array, tomar el primer elemento
            const respuestaN8n = Array.isArray(resultado) ? resultado[0] : resultado;

            // Verificar respuesta de n8n
            if (respuestaN8n.estado === true || respuestaN8n.json?.estado === true) {
                mostrarMensaje('¡Mensaje enviado con éxito! Te contactaremos pronto.', 'exito');
                elementos.formulario.reset();
                seleccionarTipoUsuario('personal');
                calcularAhorro();
                
                // Scroll suave al mensaje de éxito
                setTimeout(() => {
                    elementos.mensajeEstado.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 100);
            } else {
                throw new Error(respuestaN8n.mensaje || 'Error desconocido al enviar');
            }

        } catch (error) {
            console.error('Error al enviar formulario:', error);
            
            // Determinar el tipo de error y mostrar mensaje específico
            let mensajeError = '';
            
            if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
                // Error de red o CORS
                mensajeError = 'Error de conexión. Verificá tu conexión a internet o contactanos directamente por email a pasatealinux.ar@gmail.com';
            } else if (error.message.includes('CORS')) {
                // Error específico de CORS
                mensajeError = 'Error de configuración del servidor. Por favor, contactanos directamente por email a pasatealinux.ar@gmail.com';
            } else if (error.message.includes('HTTP:')) {
                // Error HTTP específico
                mensajeError = `Error del servidor (${error.message}). Por favor, intentá nuevamente o contactanos por email a pasatealinux.ar@gmail.com`;
            } else {
                // Error genérico
                mensajeError = 'Hubo un problema al enviar tu mensaje. Por favor, intentá nuevamente o contactanos por email a pasatealinux.ar@gmail.com';
            }
            
            mostrarMensaje(mensajeError, 'error');
        } finally {
            estadoFormulario.enviando = false;
            actualizarEstadoBotonEnvio(false);
        }
    }

    /**
     * Actualiza el estado del botón de envío
     */
    function actualizarEstadoBotonEnvio(enviando) {
        // Verificar que el botón existe
        if (!elementos.botonEnviar) {
            console.warn('Botón de envío no encontrado');
            return;
        }

        const icono = elementos.botonEnviar.querySelector('i');
        const texto = elementos.botonEnviar.querySelector('span');

        // Verificar que los elementos internos existen
        if (!icono || !texto) {
            console.warn('Elementos internos del botón no encontrados');
            return;
        }

        if (enviando) {
            elementos.botonEnviar.classList.add('enviando');
            elementos.botonEnviar.disabled = true;
            icono.className = 'fas fa-spinner';
            texto.textContent = 'Enviando...';
        } else {
            elementos.botonEnviar.classList.remove('enviando');
            elementos.botonEnviar.disabled = false;
            icono.className = 'fas fa-paper-plane';
            texto.textContent = 'Enviar Consulta';
        }
    }

    /**
     * Muestra un mensaje de estado
     */
    function mostrarMensaje(mensaje, tipo) {
        elementos.mensajeEstado.textContent = '';
        elementos.mensajeEstado.className = 'mensaje-estado ' + tipo;
        
        const icono = document.createElement('i');
        icono.className = tipo === 'exito' ? 'fas fa-check-circle' : 'fas fa-exclamation-triangle';
        
        elementos.mensajeEstado.appendChild(icono);
        elementos.mensajeEstado.appendChild(document.createTextNode(' ' + mensaje));
        elementos.mensajeEstado.style.display = 'block';

        // Auto-ocultar mensaje de éxito después de 10 segundos
        if (tipo === 'exito') {
            setTimeout(() => {
                elementos.mensajeEstado.style.display = 'none';
            }, 10000);
        }
    }

    // Inicializar cuando el DOM esté listo
    function inicializarConRetraso() {
        // Pequeño retraso para asegurar que todos los elementos estén disponibles
        setTimeout(inicializar, 100);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', inicializarConRetraso);
    } else if (document.readyState === 'interactive') {
        inicializarConRetraso();
    } else {
        inicializar();
    }

})();
