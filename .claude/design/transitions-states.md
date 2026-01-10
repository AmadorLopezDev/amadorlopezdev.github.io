# ⚡ Sistema de Transiciones y Estados

**Filosofía:** Micro-interacciones sutiles que comunican feedback sin distraer. Timing rápido (200-300ms) para sensación de responsive.

---

## ⏱️ Timing Foundations

### Duración por Tipo de Interacción

```css
/* Fast - Respuesta inmediata (hover, focus) */
--duration-fast:     150ms
--duration-normal:   200ms
--duration-medium:   300ms

/* Slow - Transiciones de entrada/salida */
--duration-slow:     500ms
--duration-slower:   800ms
```

### Easing Functions

```css
/* Tailwind built-in */
ease-linear     → linear
ease-in         → cubic-bezier(0.4, 0, 1, 1)
ease-out        → cubic-bezier(0, 0, 0.2, 1)       [Preferido para salida]
ease-in-out     → cubic-bezier(0.4, 0, 0.2, 1)     [Preferido para hover]

/* Custom (opcional para casos especiales) */
--ease-spring:  cubic-bezier(0.34, 1.56, 0.64, 1)  [Bounce sutil]
--ease-smooth:  cubic-bezier(0.45, 0, 0.15, 1)     [Aceleración suave]
```

---

## 🔘 Button States

### Primary Button

```html
<button class="
  /* Base */
  px-6 py-3
  bg-primary-500
  text-text-primary
  font-semibold
  rounded-lg

  /* Transitions */
  transition-all duration-200 ease-in-out

  /* Hover */
  hover:bg-primary-400
  hover:shadow-xl hover:shadow-primary-400/30
  hover:scale-105

  /* Active (click) */
  active:scale-100
  active:bg-primary-600

  /* Focus (keyboard) */
  focus:outline-none
  focus:ring-2 focus:ring-primary-500
  focus:ring-offset-2 focus:ring-offset-bg-primary

  /* Disabled */
  disabled:opacity-50
  disabled:cursor-not-allowed
  disabled:hover:scale-100
  disabled:hover:shadow-lg
">
  Descargar CV
</button>
```

**Secuencia de transición:**
1. **Default → Hover:** 200ms
   - Background: `primary-500` → `primary-400`
   - Shadow: subtle → pronounced
   - Scale: 1 → 1.05

2. **Hover → Active:** Instantáneo (<100ms)
   - Scale: 1.05 → 1.00
   - Background: `primary-400` → `primary-600`

3. **Active → Hover:** 150ms bounce back
   - Scale: 1.00 → 1.05

---

### Secondary Button

```html
<button class="
  px-6 py-3
  bg-bg-tertiary
  text-text-primary
  border border-border
  rounded-lg

  transition-all duration-200 ease-in-out

  hover:bg-bg-overlay
  hover:border-border-emphasis
  hover:text-text-primary

  active:bg-bg-tertiary

  focus:outline-none
  focus:ring-2 focus:ring-primary-500
">
  Ver Proyectos
</button>
```

**Diferencia:** Sin scale, solo cambio de color/borde para jerarquía visual clara.

---

### Ghost Button

```html
<button class="
  px-4 py-2
  bg-transparent
  text-text-secondary
  rounded-lg

  transition-all duration-200 ease-in-out

  hover:bg-bg-tertiary
  hover:text-text-primary

  focus:outline-none
  focus:ring-2 focus:ring-primary-500
">
  Cancelar
</button>
```

---

## 🃏 Card States

### Blog Card (Hover Effect)

```html
<article class="
  group
  bg-bg-secondary
  border border-border
  rounded-xl
  overflow-hidden

  /* Transición base */
  transition-all duration-300 ease-in-out

  /* Hover del contenedor */
  hover:border-border-emphasis
  hover:shadow-xl hover:shadow-primary-500/5
  hover:scale-[1.02]

  /* Estados anidados */
  [&_img]:transition-transform [&_img]:duration-300
  [&_img]:group-hover:scale-110

  [&_h2]:transition-colors [&_h2]:duration-200
  [&_h2]:group-hover:text-primary
">
  <!-- Imagen con zoom -->
  <div class="relative overflow-hidden">
    <img src="..." alt="..." class="w-full h-48 object-cover">
  </div>

  <!-- Contenido -->
  <div class="p-6">
    <h2 class="text-2xl font-bold text-text-primary">
      Título
    </h2>
  </div>
</article>
```

**Efecto coordinado:**
1. Card hace scale 102% (sube ligeramente)
2. Imagen hace zoom 110% (parallax sutil)
3. Título cambia a color primary
4. Todo en 300ms simultáneamente

---

### Project Card (Subtle Lift)

```html
<article class="
  bg-bg-secondary
  border border-border
  rounded-xl
  p-6

  transition-all duration-300 ease-out

  hover:border-primary-500/50
  hover:shadow-lg hover:shadow-primary-500/10
  hover:translate-y-[-4px]

  cursor-pointer
">
  <!-- Contenido -->
</article>
```

**Efecto:** Levitación sutil (4px hacia arriba) + glow.

---

## 🔗 Link States

### Inline Links (En texto)

```html
<a href="..." class="
  text-primary-500
  underline underline-offset-4
  decoration-primary-500/30

  transition-colors duration-200 ease-in-out

  hover:text-primary-400
  hover:decoration-primary-400

  focus:outline-none
  focus:ring-2 focus:ring-primary-500
  focus:rounded
">
  Clean Architecture
</a>
```

---

### Navigation Links (Header)

```html
<a href="..." class="
  text-text-secondary
  font-medium
  relative

  transition-colors duration-200

  hover:text-text-primary

  /* Underline que crece */
  after:absolute
  after:bottom-0
  after:left-0
  after:w-0
  after:h-0.5
  after:bg-primary-500
  after:transition-all
  after:duration-300
  after:ease-out

  hover:after:w-full

  /* Active state (página actual) */
  aria-current:text-primary
  aria-current:after:w-full
">
  Blog
</a>
```

**Efecto:** Underline animado que crece de izquierda a derecha.

---

### Social Icons (Header/Footer)

```html
<a href="..." class="
  w-10 h-10
  flex items-center justify-center
  text-text-tertiary
  bg-bg-tertiary
  rounded-lg

  transition-all duration-200 ease-in-out

  hover:text-primary
  hover:bg-primary/10
  hover:scale-110
  hover:rotate-3

  focus:outline-none
  focus:ring-2 focus:ring-primary-500
">
  <svg><!-- icon --></svg>
</a>
```

**Efecto:** Scale + rotación sutil (3°) para dinamismo.

---

## 🏷️ Badge States

### Category Badge (Filtro interactivo)

```html
<button class="
  px-4 py-2
  bg-bg-tertiary
  text-text-secondary
  border border-border
  rounded-lg

  transition-all duration-200 ease-in-out

  /* Hover */
  hover:bg-primary-500
  hover:text-text-primary
  hover:border-primary-500
  hover:shadow-md hover:shadow-primary-500/20

  /* Active (seleccionado) */
  aria-pressed:bg-primary-500
  aria-pressed:text-text-primary
  aria-pressed:border-primary-500
  aria-pressed:shadow-md

  /* Focus */
  focus:outline-none
  focus:ring-2 focus:ring-primary-500
">
  Backend
</button>
```

**Estados:**
- Default: Gris neutro
- Hover: Preview del estado activo
- Active: Primary color con shadow

---

### Technology Badge (Estático con hover)

```html
<span class="
  inline-flex items-center
  px-3 py-1
  bg-tech-dotnet/10
  text-tech-dotnet
  border border-tech-dotnet/20
  rounded-full

  transition-all duration-200 ease-in-out

  hover:bg-tech-dotnet/20
  hover:border-tech-dotnet/40
  hover:scale-105
">
  .NET
</span>
```

**Efecto sutil:** Intensidad del color aumenta + scale leve.

---

## 📥 Input States

### Text Input

```html
<input type="text" class="
  w-full
  px-4 py-3
  bg-bg-tertiary
  border border-border
  text-text-primary
  placeholder:text-text-muted
  rounded-lg

  transition-all duration-200 ease-in-out

  /* Focus */
  focus:outline-none
  focus:border-primary-500
  focus:ring-2 focus:ring-primary-500
  focus:ring-offset-2 focus:ring-offset-bg-primary
  focus:bg-bg-overlay

  /* Hover (solo si no tiene focus) */
  hover:border-border-emphasis

  /* Error state */
  aria-invalid:border-error
  aria-invalid:focus:ring-error
" placeholder="Tu email">
```

---

## 🎭 Header Scroll State

### Header que reacciona al scroll

```html
<header id="main-header" class="
  sticky top-0 z-50

  /* Estado inicial (top) */
  bg-bg-primary/80
  backdrop-blur-md
  border-b border-border

  transition-all duration-300 ease-in-out

  /* Estado scrolled (añadir vía JS) */
  data-[scrolled=true]:bg-bg-primary/95
  data-[scrolled=true]:shadow-lg
  data-[scrolled=true]:py-3

  /* Default py */
  py-4
">
  <!-- Contenido -->
</header>

<script>
  window.addEventListener('scroll', () => {
    const header = document.getElementById('main-header');
    if (window.scrollY > 50) {
      header?.setAttribute('data-scrolled', 'true');
    } else {
      header?.removeAttribute('data-scrolled');
    }
  });
</script>
```

**Efecto:** Header se compacta y oscurece al hacer scroll.

---

## 🎨 Smooth Page Transitions (View Transitions API)

### Configuración global

```html
<!-- En <head> del Layout -->
<meta name="view-transition" content="same-origin">

<style>
  /* Fade simple entre páginas */
  @view-transition {
    navigation: auto;
  }

  ::view-transition-old(root),
  ::view-transition-new(root) {
    animation-duration: 0.3s;
  }

  ::view-transition-old(root) {
    animation-name: fade-out;
  }

  ::view-transition-new(root) {
    animation-name: fade-in;
  }

  @keyframes fade-out {
    to { opacity: 0; }
  }

  @keyframes fade-in {
    from { opacity: 0; }
  }
</style>
```

**Soporte:** Chrome 111+, Safari 18+ (con fallback graceful).

---

## ✅ Checklist de Consistencia

### Al añadir interacciones nuevas:
- [ ] Usa durations de 150-300ms para respuesta inmediata
- [ ] Aplica `ease-in-out` para hover/active
- [ ] Aplica `ease-out` para salidas/desapariciones
- [ ] Incluye estados de focus para accesibilidad
- [ ] Coordina múltiples transiciones (usar `transition-all`)
- [ ] Testea en navegadores (Safari puede ser más lento)

---

## 🎯 Prioridades de Implementación

### Crítico (Fase 1)
- Button states (Primary, Secondary)
- Link hover effects
- Card hover (Blog, Project)
- Focus states para navegación por teclado

### Importante (Fase 2)
- Header scroll effect
- Badge interactive states
- Input focus states

### Nice-to-have (Fase 3)
- Page transitions (View Transitions API)
- Micro-animations adicionales

---

**Siguiente paso:** Definir efectos de scroll (Reading Progress, Scroll Reveal).
