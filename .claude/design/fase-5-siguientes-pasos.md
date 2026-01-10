# 🚀 Fase 5: Siguientes Pasos del Rediseño

**Fecha:** 2026-01-10
**Estado:** Planificación
**Dependencias:** Fase 4 completada (Header, Footer, Hero, Design System)

---

## 📋 Resumen Ejecutivo

Tras completar el rediseño de la homepage (Header, Hero, Footer), necesitamos extender el nuevo design system al resto de la aplicación para mantener consistencia visual y experiencia de usuario coherente.

---

## 🎯 Objetivos de la Fase 5

1. **Actualizar componentes existentes** con el nuevo design system
2. **Rediseñar páginas de contenido** (Blog listing, Acerca de, Post individual)
3. **Implementar efectos de scroll** (Reading Progress, Scroll Reveal)
4. **Añadir recursos faltantes** (CV PDF, imágenes optimizadas)
5. **Optimizar performance** (lazy loading, animations)

---

## 📦 Tareas Prioritarias

### 1️⃣ Componente BlogCard.astro
**Prioridad:** ALTA
**Tiempo estimado:** -
**Archivos:** `src/components/BlogCard.astro`

**Cambios necesarios:**
- Reemplazar colores antiguos (bg-gray-800) por sistema nuevo (bg-bg-secondary)
- Aplicar border-border en lugar de border-gray-700
- Añadir hover effects: scale-[1.02], shadow-xl, border-border-emphasis
- Implementar zoom en imagen (group-hover:scale-110)
- Cambiar tipografía a Inter
- Añadir clase `reveal` para scroll animations
- Actualizar badges de categorías con colores del design system

**Especificaciones de diseño:**
```html
<article class="
  group
  bg-bg-secondary
  border border-border
  rounded-xl
  overflow-hidden
  transition-all duration-300 ease-in-out
  hover:border-border-emphasis
  hover:shadow-xl hover:shadow-primary-500/5
  hover:scale-[1.02]
  reveal
">
  <!-- Imagen con zoom -->
  <div class="relative overflow-hidden">
    <img
      class="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
      src="..."
      alt="..."
    >
  </div>

  <!-- Contenido -->
  <div class="p-6 space-y-4">
    <!-- Metadata -->
    <div class="flex items-center gap-3 text-sm text-text-tertiary">
      <time>...</time>
      <span>•</span>
      <span>...</span>
    </div>

    <!-- Título -->
    <h2 class="
      text-2xl font-bold text-text-primary
      transition-colors duration-200
      group-hover:text-primary
    ">
      ...
    </h2>

    <!-- Descripción -->
    <p class="text-text-secondary leading-relaxed">
      ...
    </p>

    <!-- Tags -->
    <div class="flex flex-wrap gap-2">
      <!-- Usar componente Badge.astro -->
    </div>
  </div>
</article>
```

---

### 2️⃣ Página Blog Listing (/content/blog)
**Prioridad:** ALTA
**Archivos:** `src/pages/content/blog.astro`, `src/pages/blog/page/[page].astro`

**Cambios necesarios:**
- Actualizar Layout de la página (eliminar referencias a theme antiguo)
- Implementar grid responsive: `grid grid-cols-1 md:grid-cols-2 gap-6`
- Añadir título de sección con tipografía nueva
- Implementar filtros de categorías (opcional)
- Añadir scroll reveal a las cards
- Actualizar paginación con nuevo estilo de botones

**Estructura propuesta:**
```html
<section class="
  max-w-7xl mx-auto
  px-6 md:px-12 lg:px-24
  py-16
">
  <!-- Header -->
  <div class="mb-12 space-y-4">
    <h1 class="text-4xl md:text-5xl font-bold text-text-primary">
      Blog
    </h1>
    <p class="text-xl text-text-secondary">
      Artículos sobre .NET, Clean Architecture, DDD y mejores prácticas
    </p>
  </div>

  <!-- Grid de BlogCards -->
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    {posts.map(post => <BlogCard post={post} />)}
  </div>

  <!-- Paginación -->
  <div class="mt-12 flex justify-center gap-4">
    <!-- Usar componente Button.astro variant="secondary" -->
  </div>
</section>
```

---

### 3️⃣ Página Acerca de (/content/acerca)
**Prioridad:** MEDIA
**Archivos:** `src/pages/content/acerca.astro`

**Cambios necesarios:**
- Actualizar tipografía a Inter
- Aplicar sistema de colores (bg-bg-secondary para cards)
- Añadir sección de Skills con badges
- Añadir sección de Experiencia (timeline opcional)
- Implementar imagen de perfil con border gradient
- Añadir CTA de contacto al final
- Scroll reveal en secciones

**Secciones propuestas:**
1. **Hero secundario** con foto y bio corta
2. **Sobre mí extendido** con historia profesional
3. **Skills técnicos** con badges organizados por categorías
4. **Experiencia destacada** (opcional: timeline)
5. **Metodologías y principios** (DDD, SOLID, TDD)
6. **CTA** (Contactar / Descargar CV)

---

### 4️⃣ Template de Post Individual
**Prioridad:** ALTA
**Archivos:** Todos los `.md` en `src/pages/blog/*.md`

**Cambios necesarios:**
- Verificar que usen el Layout.astro actualizado
- Añadir **Reading Progress Bar** (solo en posts)
- Actualizar estilos de prosa (headings, párrafos, code blocks)
- Implementar tabla de contenidos (TOC) con scroll spy
- Añadir sección de "Posts relacionados" al final
- Mejorar metadata visual (fecha, tiempo de lectura, tags)

**Reading Progress Bar:**
```html
<!-- En Layout.astro, solo para posts -->
<div
  id="reading-progress"
  class="
    fixed top-0 left-0 z-50
    h-1
    bg-gradient-to-r from-primary-500 to-accent-500
    shadow-lg shadow-primary-500/50
    transition-all duration-100 ease-out
    origin-left
  "
  style="width: 0%; transform: scaleX(0);"
></div>

<script>
  function updateReadingProgress() {
    const progressBar = document.getElementById('reading-progress');
    if (!progressBar) return;

    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollableDistance = documentHeight - windowHeight;
    const scrolled = window.scrollY;
    const progress = (scrolled / scrollableDistance) * 100;

    progressBar.style.transform = `scaleX(${progress / 100})`;
    progressBar.style.width = '100%';
  }

  window.addEventListener('scroll', updateReadingProgress, { passive: true });
  window.addEventListener('resize', updateReadingProgress, { passive: true });
  document.addEventListener('DOMContentLoaded', updateReadingProgress);
</script>
```

---

### 5️⃣ Implementar Scroll Reveal Animations
**Prioridad:** MEDIA
**Archivos:** `src/styles/animations.css`, `src/layouts/Layout.astro`

**Implementación:**

**1. Añadir estilos CSS en animations.css:**
```css
/* Scroll Reveal - Estado inicial */
.reveal {
  opacity: 0;
  transform: translateY(32px);
  transition: opacity 0.7s ease-out, transform 0.7s ease-out;
}

/* Estado revelado */
.reveal.revealed {
  opacity: 1;
  transform: translateY(0);
}

/* Delays escalonados para múltiples elementos */
.reveal:nth-child(1) { transition-delay: 0ms; }
.reveal:nth-child(2) { transition-delay: 100ms; }
.reveal:nth-child(3) { transition-delay: 200ms; }
.reveal:nth-child(4) { transition-delay: 300ms; }
.reveal:nth-child(5) { transition-delay: 400ms; }
.reveal:nth-child(6) { transition-delay: 500ms; }

/* Variantes */
.reveal-fade {
  opacity: 0;
  transition: opacity 0.6s ease-out;
}
.reveal-fade.revealed {
  opacity: 1;
}

.reveal-scale {
  opacity: 0;
  transform: scale(0.95);
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
}
.reveal-scale.revealed {
  opacity: 1;
  transform: scale(1);
}
```

**2. Añadir Intersection Observer en Layout.astro:**
```html
<script>
  // Configurar Intersection Observer para scroll reveal
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          // Opcional: dejar de observar después de revelar
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }
  );

  // Observar todos los elementos con clase 'reveal'
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.reveal').forEach((el) => {
      revealObserver.observe(el);
    });
  });
</script>
```

**3. Aplicar clase `.reveal` a elementos:**
- BlogCards en listing
- Secciones de la homepage
- Cards de proyectos
- Posts relacionados

---

### 6️⃣ Back to Top Button
**Prioridad:** BAJA
**Archivos:** `src/layouts/Layout.astro`

**Implementación:**
```html
<button
  id="back-to-top"
  class="
    fixed bottom-8 right-8 z-40
    w-12 h-12
    flex items-center justify-center
    bg-primary-500 hover:bg-primary-400
    text-white
    rounded-full
    shadow-lg shadow-primary-500/30
    transition-all duration-300 ease-in-out
    opacity-0 scale-0 pointer-events-none
    data-[visible=true]:opacity-100
    data-[visible=true]:scale-100
    data-[visible=true]:pointer-events-auto
    hover:scale-110
    focus:outline-none
    focus:ring-2 focus:ring-primary-500
    focus:ring-offset-2
  "
  aria-label="Volver arriba"
>
  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
    <path fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clip-rule="evenodd"/>
  </svg>
</button>

<script>
  const backToTopButton = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopButton?.setAttribute('data-visible', 'true');
    } else {
      backToTopButton?.removeAttribute('data-visible');
    }
  }, { passive: true });

  backToTopButton?.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
</script>
```

---

### 7️⃣ Recursos Faltantes
**Prioridad:** MEDIA
**Archivos:** `public/cv/`, `public/img/`

**Tareas:**
1. **CV PDF:**
   - Crear o añadir CV en formato PDF
   - Ubicación: `public/cv/amador-lopez-cv.pdf`
   - Actualizar link en Hero CTA: `href="/cv/amador-lopez-cv.pdf"`

2. **Imagen de perfil:**
   - Añadir foto profesional
   - Formato: WebP optimizado
   - Ubicación: `public/img/profile.webp`
   - Dimensiones: 400x400px mínimo

3. **Favicon actualizado:**
   - Crear favicon con logo "AL"
   - Formato: PNG, SVG, ICO
   - Ubicación: `public/favicon.png`

---

### 8️⃣ Optimizaciones y Mejoras
**Prioridad:** BAJA
**Archivos:** Varios

**Tareas:**
1. **Performance:**
   - Lazy loading en imágenes: `loading="lazy"`
   - Optimizar fonts: `font-display: swap`
   - Minificar animations.css

2. **Accesibilidad:**
   - Verificar contraste de colores (WCAG AA)
   - Añadir `aria-label` a iconos sin texto
   - Testear navegación por teclado

3. **SEO:**
   - Añadir meta descriptions en páginas principales
   - Actualizar Open Graph images
   - Verificar estructura de headings (h1, h2, h3)

4. **Errores JavaScript:**
   - Revisar `public/utils/menu.js` (errores en console)
   - Verificar que los event listeners tengan elementos válidos
   - Añadir guards: `element?.addEventListener(...)`

---

## 🎯 Orden de Ejecución Recomendado

### Sprint 1: Componentes Core
1. ✅ Actualizar BlogCard.astro
2. ✅ Actualizar Blog Listing
3. ✅ Implementar Scroll Reveal

### Sprint 2: Contenido
4. ✅ Actualizar página Acerca de
5. ✅ Implementar Reading Progress en posts
6. ✅ Añadir recursos (CV, imágenes)

### Sprint 3: Polish
7. ✅ Back to Top button
8. ✅ Optimizaciones finales
9. ✅ Testing cross-browser

---

## 📊 Criterios de Éxito

- [ ] Todas las páginas usan el nuevo design system consistentemente
- [ ] No hay referencias al tema "chalkboard" antiguo
- [ ] Scroll reveal funciona en BlogCards y secciones
- [ ] Reading progress visible en posts individuales
- [ ] CV descargable funciona
- [ ] Performance: Lighthouse score > 90
- [ ] Accesibilidad: Sin errores críticos en axe DevTools
- [ ] No hay errores JavaScript en console

---

## 🔗 Referencias

- **Design System:** `.claude/design/ui-design-system-complete.md`
- **Interacciones:** `.claude/design/interaction-design-complete.md`
- **Scroll Effects:** `.claude/design/scroll-effects.md`
- **Transitions:** `.claude/design/transitions-states.md`

---

**Notas:**
- Mantener servidor dev ejecutándose durante implementación
- Tomar screenshots antes/después de cada cambio mayor
- Testear en mobile tras cada actualización de componente
- Verificar que animaciones no afecten performance en dispositivos lentos
