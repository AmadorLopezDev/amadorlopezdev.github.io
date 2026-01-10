# ✨ Sistema de Interacciones - Documento Maestro

**Fecha:** 2025-01-10
**Fase:** 3 - Interaction Design (Completada)
**Designer:** Interaction Designer Agent

---

## 📋 RESUMEN EJECUTIVO

Sistema completo de micro-interacciones, transiciones y efectos de scroll que transforman el diseño UI estático en una experiencia fluida, profesional y responsive.

**Principios:**
1. **Feedback inmediato** - Respuesta visual en <200ms
2. **Sutileza** - Efectos que mejoran sin distraer
3. **Performance** - 60fps en todas las interacciones
4. **Accesibilidad** - Focus states, keyboard navigation, reduced motion
5. **Consistencia** - Timing y easing unificados

---

## 🗺️ MAPA DE INTERACCIONES

### Por Componente

```
┌─────────────────────────────────────────────────────────────┐
│ COMPONENTE        │ HOVER          │ ACTIVE      │ FOCUS    │
├───────────────────┼────────────────┼─────────────┼──────────┤
│ Button Primary    │ Scale 105%     │ Scale 100%  │ Ring     │
│                   │ Brighten bg    │ Darken bg   │          │
│                   │ Shadow++       │             │          │
├───────────────────┼────────────────┼─────────────┼──────────┤
│ Button Secondary  │ Bg tertiary    │ Return      │ Ring     │
│                   │ Border emph    │             │          │
├───────────────────┼────────────────┼─────────────┼──────────┤
│ Blog Card         │ Scale 102%     │ -           │ Ring     │
│                   │ Border emph    │             │          │
│                   │ Image zoom     │             │          │
│                   │ Title→primary  │             │          │
├───────────────────┼────────────────┼─────────────┼──────────┤
│ Project Card      │ Lift 4px       │ -           │ Ring     │
│                   │ Border glow    │             │          │
│                   │ Shadow         │             │          │
├───────────────────┼────────────────┼─────────────┼──────────┤
│ Nav Link          │ Underline grow │ -           │ Ring     │
│                   │ Text brighten  │             │          │
├───────────────────┼────────────────┼─────────────┼──────────┤
│ Social Icon       │ Scale 110%     │ -           │ Ring     │
│                   │ Rotate 3°      │             │          │
│                   │ Color primary  │             │          │
├───────────────────┼────────────────┼─────────────┼──────────┤
│ Badge Tech        │ Scale 105%     │ -           │ -        │
│                   │ Brighten       │             │          │
├───────────────────┼────────────────┼─────────────┼──────────┤
│ Badge Category    │ Bg primary     │ -           │ Ring     │
│   (Interactive)   │ Shadow         │             │          │
├───────────────────┼────────────────┼─────────────┼──────────┤
│ Input             │ Border emph    │ -           │ Ring     │
│                   │               │             │ Bg brigh │
└─────────────────────────────────────────────────────────────┘
```

---

### Por Página

#### Homepage
```
HERO SECTION:
├─ Load: Staggered fade-in (delays 100-600ms)
├─ Badge "Disponible": Pulse animation (infinite)
├─ Headline "Engineer": Gradient text
├─ CTAs: Hover scale + shadow
└─ Stack badges: Hover scale subtle

SECTIONS:
├─ Cards: Scroll reveal (fade + translateY)
└─ Links: Underline grow effect
```

#### Blog Listing
```
CARDS GRID:
├─ Load: Skeleton placeholders (si async)
├─ Reveal: Intersection Observer + staggered delays
├─ Hover: Scale + image zoom + title color
└─ Filter badges: Interactive toggle states
```

#### Blog Post
```
HEADER:
├─ Load: Reading progress bar (0%)
└─ Scroll: Progress bar fill (0-100%)

CONTENT:
├─ Scroll: Reading progress updates
├─ Scroll >300px: Back-to-top button appears
└─ Code blocks: Copy button hover

RELATED POSTS:
└─ Reveal: Scroll reveal al entrar en viewport
```

---

## ⏱️ TIMING STANDARDS

### Duración por Tipo

```css
/* Interacciones rápidas (hover, focus) */
--duration-instant:  100ms   /* Cambio color simple */
--duration-fast:     150ms   /* Hover button secondary */
--duration-normal:   200ms   /* Hover button primary (default) */
--duration-medium:   300ms   /* Card effects, transitions */

/* Transiciones lentas (entrada/salida) */
--duration-slow:     500ms   /* Modal open/close */
--duration-slower:   700ms   /* Scroll reveal */
--duration-slowest:  800ms   /* Page transitions */
```

### Easing Functions

```css
/* Tailwind built-in */
ease-out:     cubic-bezier(0, 0, 0.2, 1)       /* Salidas, hover out */
ease-in-out:  cubic-bezier(0.4, 0, 0.2, 1)     /* Hover in/out */
ease-in:      cubic-bezier(0.4, 0, 1, 1)       /* Entradas (raro) */

/* Preferencias */
- Hover effects: ease-in-out
- Salidas (dismiss): ease-out
- Scroll animations: ease-out
```

---

## 📐 ANIMACIONES CLAVE

### 1. Hero Entrance (Page Load)

**Secuencia temporal:**
```
0ms:    Badge "Disponible" → opacity 0→1 (pulse start)
100ms:  Saludo "Hola, soy..." → fade-in-up
200ms:  Headline "Senior..." → fade-in-up
300ms:  Stack tech → fade-in-up
400ms:  Descripción → fade-in-up
500ms:  CTAs → fade-in-up
600ms:  Badges tech → fade-in-up
```

**CSS:**
```css
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out forwards;
  opacity: 0;
}

.animation-delay-100 { animation-delay: 0.1s; }
.animation-delay-200 { animation-delay: 0.2s; }
/* ... */
```

---

### 2. Scroll Reveal (Cards, Sections)

**Intersection Observer:**
- Threshold: 0.1 (10% visible)
- Root margin: `-50px` (trigger antes del viewport bottom)
- Animation: fade-in + translateY
- Duration: 700ms
- Staggered: nth-child delays (100ms cada uno)

**CSS:**
```css
.reveal {
  opacity: 0;
  transform: translateY(32px);
  transition: opacity 0.7s ease-out, transform 0.7s ease-out;
}

.reveal.revealed {
  opacity: 1;
  transform: translateY(0);
}

.reveal:nth-child(2) { transition-delay: 100ms; }
.reveal:nth-child(3) { transition-delay: 200ms; }
.reveal:nth-child(4) { transition-delay: 300ms; }
```

---

### 3. Reading Progress Bar

**Behavior:**
- Position: Fixed top-0 (o integrado en header)
- Width: 100% container
- Fill: Scale X de 0 a 1 según scroll
- Color: Gradient primary→accent
- Height: 3px (1px en mobile opcional)
- Transition: 100ms linear (suave pero responsive)

**JavaScript:**
```javascript
function updateReadingProgress() {
  const scrolled = window.scrollY;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrolled / height) * 100;

  progressBar.style.transform = `scaleX(${progress / 100})`;
}

window.addEventListener('scroll', updateReadingProgress, { passive: true });
```

---

### 4. Card Hover Effect (Blog)

**Coordinación de múltiples propiedades:**
```
Contenedor:
├─ Scale: 1 → 1.02 (2% más grande)
├─ Border: border → border-emphasis
├─ Shadow: none → xl + primary glow
└─ Duration: 300ms ease-in-out

Imagen (child):
└─ Scale: 1 → 1.10 (zoom 10%)
    Duration: 300ms (sincronizado)

Título (child):
└─ Color: text-primary → primary
    Duration: 200ms (más rápido, sutil)
```

**Tailwind:**
```html
<article class="
  group
  transition-all duration-300 ease-in-out
  hover:scale-[1.02]
  hover:border-border-emphasis
  hover:shadow-xl

  [&_img]:transition-transform [&_img]:duration-300
  [&_img]:group-hover:scale-110

  [&_h2]:transition-colors [&_h2]:duration-200
  [&_h2]:group-hover:text-primary
">
```

---

### 5. Navigation Link Underline

**Animación de línea que crece:**
```css
a {
  position: relative;
  transition: color 200ms ease-in-out;
}

a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--primary-500);
  transition: width 300ms ease-out;
}

a:hover::after {
  width: 100%;
}

/* Página activa */
a[aria-current]::after {
  width: 100%;
}
```

---

## 🎯 CASOS DE USO ESPECÍFICOS

### Homepage Hero CTA

**Interacciones:**
1. **Hover "Descargar CV":**
   - Bg: `primary-500` → `primary-400`
   - Shadow: `lg/20` → `xl/30`
   - Scale: 1 → 1.05
   - Duration: 200ms ease-in-out

2. **Click (Active):**
   - Scale: 1.05 → 1.00 (instantáneo <100ms)
   - Bg: `primary-400` → `primary-600` (momentáneo)

3. **Focus (keyboard):**
   - Ring: 2px `primary-500`
   - Ring offset: 2px `bg-primary`

4. **After click (download initiated):**
   - Opcional: Toast notification "CV descargado"

---

### Blog Card Click Flow

**Secuencia:**
1. **Default:** Card en reposo
2. **Hover:** Scale + border + image zoom (smooth)
3. **Focus (keyboard tab):** Ring visible
4. **Click:** Navigate to post (page transition)
5. **New page:** Reading progress bar inicia en 0%

---

### Filter Badge Toggle

**Estados:**
1. **Default (not selected):**
   - Bg: `bg-tertiary`
   - Text: `text-secondary`
   - Border: `border-default`

2. **Hover:**
   - Bg: `primary-500` (preview)
   - Text: `text-primary`
   - Shadow: md + glow
   - Transition: 200ms

3. **Active (selected):**
   - Bg: `primary-500` (permanente)
   - Text: `text-primary`
   - Shadow: md
   - aria-pressed: true

4. **Click otro badge:**
   - Previous: Return to default (200ms)
   - New: Activate (200ms)

---

## 🔥 PERFORMANCE OPTIMIZATIONS

### Will-Change

```css
/* Aplicar solo a elementos que se animan constantemente */
#reading-progress {
  will-change: transform;
}

.card:hover {
  will-change: transform, box-shadow;
}

/* Remover después de animación */
.reveal.revealed {
  will-change: auto;
}
```

---

### Passive Event Listeners

```javascript
// Scroll/touch: siempre passive
window.addEventListener('scroll', handler, { passive: true });
window.addEventListener('touchmove', handler, { passive: true });
```

---

### RequestAnimationFrame

```javascript
let ticking = false;

function updateOnScroll() {
  // Batch updates
  updateReadingProgress();
  updateScrollIndicators();

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

### CSS Containment

```css
/* Cards en grid */
.blog-card {
  contain: layout style paint;
}

/* Mejora repaint performance */
```

---

## ♿ ACCESIBILIDAD

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }

  /* Mantener funcionalidad, remover motion */
  .reveal {
    opacity: 1;
    transform: none;
  }

  #reading-progress {
    transition-duration: 0ms;
  }
}
```

---

### Focus Visible (Keyboard Navigation)

```css
/* Mostrar focus solo para keyboard, no mouse */
:focus-visible {
  outline: 2px solid var(--primary-500);
  outline-offset: 2px;
}

/* Ocultar outline en mouse click */
:focus:not(:focus-visible) {
  outline: none;
}
```

---

### ARIA States

```html
<!-- Button loading -->
<button aria-busy="true" disabled>
  <span class="sr-only">Cargando...</span>
  <!-- Spinner visible -->
</button>

<!-- Navigation link active -->
<a href="/blog" aria-current="page">
  Blog
</a>

<!-- Filter badge selected -->
<button aria-pressed="true">
  Backend
</button>
```

---

## 📁 ESTRUCTURA DE ARTEFACTOS

```
.claude/design/
├── interaction-design-complete.md    ✅ Este documento (Maestro)
├── transitions-states.md             ✅ Estados de componentes
├── scroll-effects.md                 ✅ Progress bar + Scroll reveal
└── loading-states.md                 ✅ Spinners, skeletons, empty states
```

---

## ✅ CHECKLIST DE IMPLEMENTACIÓN

### Fase 1: Base (Crítico)
- [ ] Crear `src/styles/animations.css` con keyframes
- [ ] Importar animations en Layout principal
- [ ] Añadir clases transition a componentes base
- [ ] Implementar focus states (ring) en todos los interactivos

### Fase 2: Hero & Navigation
- [ ] Staggered entrance en Hero (delays)
- [ ] Navigation link underline animation
- [ ] Header scroll state (compact on scroll)
- [ ] Social icons hover effects

### Fase 3: Cards & Content
- [ ] Blog card hover (scale + image zoom)
- [ ] Project card lift effect
- [ ] Scroll reveal con Intersection Observer
- [ ] Staggered delays en grids

### Fase 4: Scroll Effects
- [ ] Reading progress bar en blog posts
- [ ] Back-to-top button (appear >300px scroll)
- [ ] Scroll reveal en homepage sections

### Fase 5: Loading States
- [ ] Button component con loading prop
- [ ] Skeleton loaders para async content
- [ ] Empty states para no results

### Fase 6: Polish
- [ ] Reduced motion media query
- [ ] Focus-visible para keyboard nav
- [ ] Performance audit (will-change, passive listeners)
- [ ] Testear en mobile (touch interactions)

---

## 🎯 CRITERIOS DE ACEPTACIÓN

### Visual
- ✅ Todas las interacciones responden en <200ms
- ✅ Animaciones smooth a 60fps
- ✅ Hover states visualmente consistentes
- ✅ Focus states visibles en keyboard navigation

### UX
- ✅ Feedback inmediato en todas las acciones
- ✅ Reading progress funcional en artículos
- ✅ Scroll reveal no bloquea contenido crítico
- ✅ Loading states claros (spinners/skeletons)

### Performance
- ✅ No jank en scroll
- ✅ Passive event listeners en scroll/touch
- ✅ Will-change usado correctamente
- ✅ RequestAnimationFrame para batch updates

### Accesibilidad
- ✅ Prefers-reduced-motion respetado
- ✅ Focus-visible funcional
- ✅ ARIA states correctos
- ✅ Keyboard navigation completa

---

## 🚀 PRÓXIMOS PASOS

**Fase completada:** ✅ Interaction Design (4 documentos generados)

**Siguiente fase:** Frontend Engineering (Implementación)
- Implementar componentes base (Button, Card, Badge)
- Aplicar estilos y colores del sistema
- Añadir scripts de interacción
- Integrar animaciones
- Testear performance y accesibilidad

**Archivo de continuación:** `.claude/roadmap/redesign-roadmap.md` (actualizar)

---

## 📝 NOTAS FINALES

### Decisiones de Diseño Clave

1. **200ms como timing default** - Balance entre responsive y smooth
2. **Scroll reveal solo en cards/sections** - No en párrafos (too much)
3. **Reading progress solo en artículos** - No en home/listings
4. **Focus ring consistente** - 2px primary-500 en todos los interactivos
5. **Reduced motion desde el inicio** - Accesibilidad no es afterthought

### Flexibilidad del Sistema

- **Fácil añadir nuevas animaciones** - Keyframes centralizados
- **Timing modificable** - CSS custom properties
- **Efectos desactivables** - Media query prefers-reduced-motion
- **Performance monitoreab** - Will-change explícito

### Mantenibilidad

- **Scripts modulares** - Intersection Observer reutilizable
- **CSS limpio** - Transitions en componentes, no inline
- **Documentación exhaustiva** - Cada efecto explicado
- **Sistema escalable** - Funciona con 1 o 100 páginas

---

**Estado:** ✅ FASE 3 COMPLETADA - Listo para implementación
