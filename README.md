# Sitio Web "Pasate a Linux"

Articulo FACEBOOK a AGREGAR
{
    "id": 5,
    "titulo": "Migraciones exitosas",
    "imagen": "assets/img/novedades/fb-migraciones.jpg",
    "resumen": "¡Ya migramos más de 100 notebooks a Linux Mint! Mira las fotos y testimonios en nuestra página de Facebook.",
    "fecha": "2024-01-05",
    "tipo": "facebook",
    "fuente": "Facebook",
    "contenido": "<p>Compartimos imágenes y testimonios de usuarios felices que migraron a Linux Mint. ¿Quieres ser el próximo? ¡Contáctanos!</p>"
},


## Descripción
Sitio web profesional y moderno para el servicio de migración de Windows a Linux Mint. Diseñado con tecnologías web estándar (HTML5, CSS3, JavaScript) para ofrecer una experiencia de usuario excepcional.

## Características Principales

### 🎨 Diseño
- **Moderno y minimalista** con paleta de colores tecnológica
- **Totalmente responsive** - se adapta a móviles, tablets y escritorio
- **Navegación intuitiva** con efectos visuales suaves
- **Tipografía optimizada** usando Google Fonts (Inter)

### 🚀 Funcionalidades
- **Landing page atractiva** con secciones de beneficios, comparación y testimonios
- **Página FAQ completa** con buscador avanzado y navegación por categorías
- **Sistema de acordeón** para preguntas frecuentes
- **Formularios con validación** y notificaciones de usuario
- **Animaciones sutiles** que mejoran la experiencia

### 📱 Responsive Design
- **Menú hamburguesa** para dispositivos móviles
- **Grid layouts adaptativos** que se reorganizan según el tamaño de pantalla
- **Imágenes optimizadas** para diferentes resoluciones
- **Navegación táctil** optimizada para dispositivos móviles

### ♿ Accesibilidad
- **Navegación por teclado** completamente funcional
- **Contraste adecuado** para usuarios con problemas visuales
- **Textos alternativos** en todas las imágenes
- **Soporte para lectores de pantalla**

## Estructura del Proyecto

```
Frontend2/
├── index.html              # Página principal (landing page)
├── faq.html               # Página de preguntas frecuentes
├── README.md              # Documentación del proyecto
├── tareas.md              # Lista de tareas del desarrollo
├── css/
│   └── estilos.css        # Estilos CSS principales
├── js/
│   ├── main.js            # JavaScript principal
│   └── faq.js             # JavaScript específico para FAQ
├── assets/
│   └── img/
│       ├── pasatealinux-logo.jpg
│       ├── windows-vs-linux.jpg
│       └── avatar-placeholder.jpg
├── Pasate a Linux SFC.txt  # Contenido fuente para landing page
└── Pasate a Linux - FAQs.txt # Contenido fuente para FAQ
```

## Tecnologías Utilizadas

- **HTML5** - Estructura semántica y accesible
- **CSS3** - Estilos modernos con variables CSS, Grid y Flexbox
- **JavaScript ES6+** - Interactividad y funcionalidades avanzadas
- **Google Fonts** - Tipografía Inter para mejor legibilidad

## Características Técnicas

### CSS
- **Variables CSS** para colores y estilos consistentes
- **Grid y Flexbox** para layouts responsivos
- **Animaciones CSS** suaves y optimizadas
- **Media queries** para diferentes dispositivos
- **Soporte para impresión** con estilos específicos

### JavaScript
- **Vanilla JavaScript** sin dependencias externas
- **Navegación responsive** con menú hamburguesa
- **Sistema de búsqueda** con resaltado de términos
- **Validación de formularios** en tiempo real
- **Scroll suave** para navegación interna
- **Optimización de rendimiento** con throttling

## Páginas del Sitio

### 1. Landing Page (`index.html`)
- **Sección Hero** con mensaje principal y beneficios rápidos
- **Sección Beneficios** con tarjetas informativas
- **Tabla de Comparación** Windows vs Linux Mint
- **Testimonios** de usuarios reales
- **Llamada a la Acción** para contacto
- **Footer** con enlaces útiles

### 2. Página FAQ (`faq.html`)
- **Buscador avanzado** con filtrado en tiempo real
- **Índice de categorías** para navegación rápida
- **Sistema de acordeón** para preguntas y respuestas
- **Filtros por categoría** (Básicas, Técnicas, Seguridad, Software)
- **Funcionalidad de compartir** preguntas específicas

## Instalación y Uso

### Requisitos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Servidor web local (opcional, para desarrollo)

### Instalación
1. Clona o descarga el proyecto
2. Abre `index.html` en tu navegador
3. Para desarrollo, usa un servidor local como Live Server

### Desarrollo Local
```bash
# Si usas Python
python -m http.server 8000

# Si usas Node.js
npx http-server

# Si usas PHP
php -S localhost:8000
```

## Optimizaciones Implementadas

### Rendimiento
- **CSS y JS minificados** para producción
- **Imágenes optimizadas** en formatos web
- **Lazy loading** para elementos no críticos
- **Preload de recursos** importantes

### SEO
- **Meta tags** optimizados para buscadores
- **Estructura semántica** HTML5
- **URLs amigables** y navegación clara
- **Contenido estructurado** con headings apropiados

### UX/UI
- **Tiempo de carga rápido** < 3 segundos
- **Interacciones intuitivas** con feedback visual
- **Navegación consistente** entre páginas
- **Mensajes de error claros** y útiles

## Compatibilidad de Navegadores

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Opera 76+

## Mantenimiento

### Actualizaciones de Contenido
- Editar archivos `.txt` fuente para actualizar contenido
- Modificar variables CSS para cambios de diseño
- Agregar nuevas preguntas en `faq.html`

### Mejoras Futuras
- [ ] Implementar Service Worker para funcionamiento offline
- [ ] Agregar sistema de comentarios/testimonios
- [ ] Integrar formulario de contacto con backend
- [ ] Implementar analytics y seguimiento de conversiones

## Contacto y Soporte

Para consultas sobre el desarrollo o mantenimiento del sitio:
- Revisar la documentación en `tareas.md`
- Verificar el código en los archivos fuente
- Consultar los comentarios en CSS y JavaScript

## Licencia

Este proyecto está desarrollado para el servicio "Pasate a Linux". 
Linux es una marca registrada de Linus Torvalds.

---

**Desarrollado con ❤️ para la comunidad Linux**
