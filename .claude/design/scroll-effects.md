# 📜 Efectos de Scroll - Reading Progress & Reveal

**Filosofía:** Indicadores visuales sutiles que mejoran la experiencia de lectura sin distraer del contenido.

---

## 📊 Reading Progress Bar

### Diseño Visual

**Ubicación:** Sticky en la parte superior del viewport (debajo del header o integrado en él)

**Apariencia:**
- Alto: 3px (sutil pero visible)
- Color: Gradient de `primary-500` a `accent-500`
- Background: Transparente
- Shadow: Sutil glow en primary

---

### Implementación HTML + CSS

```html
<!-- En Layout.astro, después del Header -->
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
  style="
    width: 0%;
    transform: scaleX(0);
  "
></div>

<script>
  // Reading progress calculator
  function updateReadingProgress() {
    const progressBar = document.getElementById('reading-progress');
    if (!progressBar) return;

    // Calcular scroll total disponible
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollableDistance = documentHeight - windowHeight;

    // Posición actual
    const scrolled = window.scrollY;

    // Porcentaje (0-100)
    const progress = (scrolled / scrollableDistance) * 100;

    // Actualizar barra
    progressBar.style.transform = `scaleX(${progress / 100})`;
    progressBar.style.width = '100%';
  }

  // Listeners
  window.addEventListener('scroll', updateReadingProgress, { passive: true });
  window.addEventListener('resize', updateReadingProgress, { passive: true });

  // Init on load
  document.addEventListener('DOMContentLoaded', updateReadingProgress);
</script>
```

---

### Variante: Progress integrado en Header

```html
<header class="sticky top-0 z-50 bg-bg-primary/95 backdrop-blur-md">
  <!-- Navegación -->
  <nav>...</nav>

  <!-- Progress bar integrado -->
  <div class="absolute bottom-0 left-0 w-full h-1 bg-border">
    <div
      id="reading-progress-inline"
      class="h-full bg-gradient-to-r from-primary-500 to-accent-500 transition-all duration-100"
      style="width: 0%"
    ></div>
  </div>
</header>

<script>
  function updateInlineProgress() {
    const bar = document.getElementById('reading-progress-inline');
    if (!bar) return;

    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollableDistance = documentHeight - windowHeight;
    const progress = (window.scrollY / scrollableDistance) * 100;

    bar.style.width = `${Math.min(progress, 100)}%`;
  }

  window.addEventListener('scroll', updateInlineProgress, { passive: true });
  window.addEventListener('resize', updateInlineProgress, { passive: true });
  document.addEventListener('DOMContentLoaded', updateInlineProgress);
</script>
```

---

### Optimización: Throttling para Performance

```typescript
// src/utils/scrollUtils.ts
export function throttle<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      func(...args);
    }
  };
}

// Uso
const throttledProgress = throttle(updateReadingProgress, 16); // ~60fps
window.addEventListener('scroll', throttledProgress, { passive: true });
```

---

## 🎭 Scroll Reveal (Intersection Observer)

### Concept

Elementos aparecen gradualmente cuando entran en el viewport. Usado en:
- Cards del blog
- Secciones de la home
- Párrafos de artículos (opcional, puede ser too much)

---

### Implementación con Intersection Observer

```html
<!-- Añadir clase 'reveal' a elementos que queremos animar -->
<article class="reveal opacity-0 translate-y-8 transition-all duration-700 ease-out">
  <!-- Contenido de card -->
</article>

<style>
  /* Estado inicial (antes de revelarse) */
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

  /* Delay escalonado para múltiples elementos */
  .reveal:nth-child(1) { transition-delay: 0ms; }
  .reveal:nth-child(2) { transition-delay: 100ms; }
  .reveal:nth-child(3) { transition-delay: 200ms; }
  .reveal:nth-child(4) { transition-delay: 300ms; }
  .reveal:nth-child(5) { transition-delay: 400ms; }
</style>

<script>
  // Configurar Intersection Observer
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          // Opcional: dejar de observar después de revelar
          // revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,      // Trigger cuando 10% es visible
      rootMargin: '0px 0px -50px 0px'  // Trigger 50px antes del bottom
    }
  );

  // Observar todos los elementos con clase 'reveal'
  document.querySelectorAll('.reveal').forEach((el) => {
    revealObserver.observe(el);
  });
</script>
```

---

### Variantes de Reveal

#### Fade In (Simple)
```css
.reveal-fade {
  opacity: 0;
  transition: opacity 0.6s ease-out;
}
.reveal-fade.revealed {
  opacity: 1;
}
```

#### Slide In from Left
```css
.reveal-slide-left {
  opacity: 0;
  transform: translateX(-40px);
  transition: opacity 0.7s ease-out, transform 0.7s ease-out;
}
.reveal-slide-left.revealed {
  opacity: 1;
  transform: translateX(0);
}
```

#### Scale In
```css
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

---

### Aplicación Recomendada

#### Homepage
```html
<!-- Hero: Sin reveal (ya visible) -->
<section id="hero">...</section>

<!-- Secciones que siguen al hero -->
<section class="reveal">
  <h2>Últimos artículos</h2>
  <div class="grid">
    <article class="reveal">Card 1</article>
    <article class="reveal">Card 2</article>
    <article class="reveal">Card 3</article>
  </div>
</section>
```

#### Blog Listing
```html
<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
  <!-- Cada card con reveal -->
  <article class="reveal">BlogCard</article>
  <article class="reveal">BlogCard</article>
  <article class="reveal">BlogCard</article>
</div>
```

#### Blog Post (Artículo)
```html
<!-- NO usar reveal en párrafos (demasiado) -->
<!-- Solo en elementos destacados -->
<article>
  <header>
    <h1>Título</h1>
  </header>

  <div class="prose">
    <!-- Contenido sin reveal -->
  </div>

  <!-- Related posts con reveal -->
  <section class="mt-16">
    <h2>Artículos relacionados</h2>
    <div class="grid">
      <article class="reveal">Card</article>
      <article class="reveal">Card</article>
    </div>
  </section>
</article>
```

---

## 🔝 Back to Top Button

### Diseño

**Ubicación:** Fixed en bottom-right
**Apariencia:** Circular, icon arrow-up, aparece al hacer scroll

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

    /* Estado inicial (oculto) */
    opacity-0 scale-0 pointer-events-none

    /* Estado visible (con data attribute) */
    data-[visible=true]:opacity-100
    data-[visible=true]:scale-100
    data-[visible=true]:pointer-events-auto

    /* Hover */
    hover:scale-110
    hover:shadow-xl

    /* Focus */
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

  // Mostrar/ocultar según scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopButton?.setAttribute('data-visible', 'true');
    } else {
      backToTopButton?.removeAttribute('data-visible');
    }
  }, { passive: true });

  // Click para scroll to top
  backToTopButton?.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
</script>
```

---

## 📱 Parallax Sutil (Opcional)

### Hero Background con Parallax

```html
<section class="relative min-h-screen overflow-hidden">
  <!-- Background con parallax -->
  <div
    id="parallax-bg"
    class="absolute inset-0 bg-gradient-to-b from-bg-primary to-bg-secondary -z-10"
    style="transform: translateY(0)"
  >
    <!-- Pattern o imagen -->
  </div>

  <!-- Contenido Hero -->
  <div class="relative z-10">
    <!-- ... -->
  </div>
</section>

<script>
  const parallaxBg = document.getElementById('parallax-bg');

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    // Mover background a 50% de la velocidad del scroll
    if (parallaxBg) {
      parallaxBg.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
  }, { passive: true });
</script>
```

**Nota:** Usar con moderación, puede afectar performance en mobile.

---

## ⚡ Performance Considerations

### Will-Change para elementos animados

```css
/* Aplicar solo a elementos que se animan constantemente */
#reading-progress {
  will-change: transform;
}

.reveal {
  will-change: opacity, transform;
}

/* Remover después de la animación */
.reveal.revealed {
  will-change: auto;
}
```

---

### Passive Event Listeners

```javascript
// Siempre usar { passive: true } para scroll/touch
window.addEventListener('scroll', handler, { passive: true });
window.addEventListener('touchmove', handler, { passive: true });
```

---

### RequestAnimationFrame para scroll smooth

```javascript
let ticking = false;

function updateOnScroll() {
  // Actualizar elementos
  updateReadingProgress();
  // ...

  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(updateOnScroll);
    ticking = true;
  }
}, { passive: true });
```

---

## ✅ Checklist de Implementación

### Reading Progress
- [ ] Crear componente `ReadingProgress.astro`
- [ ] Añadir script en Layout principal
- [ ] Testear en artículos largos
- [ ] Validar performance en mobile

### Scroll Reveal
- [ ] Añadir clases CSS `.reveal` en global.css
- [ ] Crear script de Intersection Observer
- [ ] Aplicar a BlogCards
- [ ] Aplicar a secciones de home
- [ ] Testear delays escalonados

### Back to Top
- [ ] Crear botón flotante
- [ ] Script de show/hide según scroll
- [ ] Smooth scroll to top
- [ ] Testear accesibilidad (keyboard focus)

---

## 🎯 Decisiones de Diseño

### ¿Dónde usar Scroll Reveal?
✅ **Sí:**
- Cards de blog listing
- Secciones principales de home
- Elementos destacados

❌ **No:**
- Contenido de artículos (párrafos)
- Navegación (header/footer)
- Elementos críticos (CTAs en hero)

### ¿Reading Progress siempre visible?
**Recomendación:** Solo en páginas de artículos (blog posts).
- Home: NO (no hay "lectura" secuencial)
- Blog listing: NO
- Blog post: SÍ

---

**Siguiente paso:** Especificar animaciones de carga y estados vacíos.
