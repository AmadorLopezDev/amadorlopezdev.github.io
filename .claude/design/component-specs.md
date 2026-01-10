# 🧩 Especificaciones de Componentes - Design System

**Filosofía:** Componentes modulares, reutilizables y accesibles. Variantes claramente diferenciadas.

---

## 🔘 Button Component

### Variantes

#### 1. Primary (CTA Principal)
**Uso:** Acciones principales (Ver CV, Contactar, Descargar)

```html
<button class="
  px-6 py-3
  bg-primary-500 hover:bg-primary-400 active:bg-primary-600
  text-text-primary font-semibold text-base
  rounded-lg
  transition-all duration-200 ease-in-out
  shadow-lg shadow-primary-500/20 hover:shadow-xl hover:shadow-primary-400/30
  focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-bg-primary
  disabled:opacity-50 disabled:cursor-not-allowed
  transform hover:scale-105 active:scale-100
">
  Ver CV
</button>
```

**Estados:**
- Default: `bg-primary-500` + shadow sutil
- Hover: `bg-primary-400` + shadow más pronunciada + scale 105%
- Active: `bg-primary-600` + scale 100%
- Focus: Ring azul de 2px
- Disabled: 50% opacidad

---

#### 2. Secondary (Acción Secundaria)
**Uso:** Acciones alternativas (Ver Proyectos, Leer más)

```html
<button class="
  px-6 py-3
  bg-bg-tertiary hover:bg-bg-overlay
  text-text-primary font-semibold text-base
  rounded-lg
  border border-border hover:border-border-emphasis
  transition-all duration-200 ease-in-out
  focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-bg-primary
  disabled:opacity-50 disabled:cursor-not-allowed
">
  Ver Proyectos
</button>
```

**Estados:**
- Default: Fondo terciario + borde sutil
- Hover: Fondo overlay + borde emphasis
- Focus: Ring como primary

---

#### 3. Ghost (Texto + Hover)
**Uso:** Navegación, acciones terciarias

```html
<button class="
  px-4 py-2
  bg-transparent hover:bg-bg-tertiary
  text-text-secondary hover:text-text-primary font-medium text-base
  rounded-lg
  transition-all duration-200 ease-in-out
  focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-bg-primary
">
  Cancelar
</button>
```

---

#### 4. Icon Button
**Uso:** Iconos sociales, acciones sin texto

```html
<button class="
  w-10 h-10
  flex items-center justify-center
  bg-bg-tertiary hover:bg-bg-overlay
  text-text-secondary hover:text-primary
  rounded-lg
  transition-all duration-200 ease-in-out
  focus:outline-none focus:ring-2 focus:ring-primary-500
">
  <svg class="w-5 h-5"><!-- icon --></svg>
</button>
```

---

### Tamaños

```html
<!-- Small -->
<button class="px-4 py-2 text-sm">Small</button>

<!-- Medium (Default) -->
<button class="px-6 py-3 text-base">Medium</button>

<!-- Large -->
<button class="px-8 py-4 text-lg">Large</button>
```

---

## 🃏 Card Component

### Blog Card (Principal)
**Uso:** Listado de artículos

```html
<article class="
  group
  bg-bg-secondary
  border border-border hover:border-border-emphasis
  rounded-xl
  overflow-hidden
  transition-all duration-300 ease-in-out
  hover:shadow-xl hover:shadow-primary-500/5
  hover:transform hover:scale-[1.02]
">
  <!-- Imagen -->
  <div class="relative overflow-hidden">
    <img
      src="..."
      alt="..."
      class="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
    />
    <!-- Badge flotante (opcional) -->
    <span class="absolute top-4 right-4 px-3 py-1 bg-emphasis-500 text-bg-primary text-xs font-semibold rounded-full">
      Featured
    </span>
  </div>

  <!-- Contenido -->
  <div class="p-6">
    <!-- Título -->
    <h2 class="text-2xl font-bold text-text-primary mb-2 group-hover:text-primary transition-colors">
      <a href="...">Object Calisthenics</a>
    </h2>

    <!-- Descripción -->
    <p class="text-base text-text-secondary leading-relaxed mb-4">
      Ejercicios de programación orientada a objetos...
    </p>

    <!-- Metadatos -->
    <div class="flex items-center justify-between text-sm text-text-tertiary mb-4">
      <time datetime="2025-01-10">10 de Enero, 2025</time>
      <span>8 min lectura</span>
    </div>

    <!-- Tags -->
    <div class="flex flex-wrap gap-2">
      <span class="px-3 py-1 bg-tech-dotnet/10 text-tech-dotnet text-xs font-medium rounded-full border border-tech-dotnet/20">
        .NET
      </span>
      <span class="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full border border-primary/20">
        Clean Code
      </span>
    </div>
  </div>
</article>
```

**Efectos:**
- Hover: Borde emphasis, shadow sutil, scale 102%, imagen zoom
- Transición suave de 300ms

---

### Project Card
**Uso:** Portfolio de proyectos

```html
<article class="
  bg-bg-secondary
  border border-border hover:border-primary-500/50
  rounded-xl
  p-6
  transition-all duration-300
  hover:shadow-lg hover:shadow-primary-500/10
">
  <!-- Header con icono -->
  <div class="flex items-start justify-between mb-4">
    <div class="w-12 h-12 bg-primary-500/10 rounded-lg flex items-center justify-center">
      <svg class="w-6 h-6 text-primary"><!-- icon --></svg>
    </div>
    <a href="..." class="text-text-tertiary hover:text-primary">
      <svg><!-- external link icon --></svg>
    </a>
  </div>

  <!-- Título -->
  <h3 class="text-xl font-bold text-text-primary mb-2">
    Sistema de Gestión ERP
  </h3>

  <!-- Descripción -->
  <p class="text-sm text-text-secondary leading-relaxed mb-4">
    Aplicación enterprise desarrollada con .NET 8...
  </p>

  <!-- Stack -->
  <div class="flex flex-wrap gap-2">
    <span class="px-2 py-1 bg-tech-dotnet/10 text-tech-dotnet text-xs font-medium rounded">
      .NET 8
    </span>
    <span class="px-2 py-1 bg-tech-azure/10 text-tech-azure text-xs font-medium rounded">
      Azure
    </span>
  </div>
</article>
```

---

### Feature Card (Para Hero/Servicios)
**Uso:** Destacar skills/servicios principales

```html
<div class="
  bg-bg-secondary/50
  border border-border
  rounded-lg
  p-6
  backdrop-blur-sm
  hover:bg-bg-secondary
  transition-all duration-300
">
  <!-- Icono -->
  <div class="w-10 h-10 bg-accent-500/10 rounded-lg flex items-center justify-center mb-4">
    <svg class="w-6 h-6 text-accent-500"><!-- icon --></svg>
  </div>

  <!-- Título -->
  <h3 class="text-lg font-semibold text-text-primary mb-2">
    Clean Architecture
  </h3>

  <!-- Descripción -->
  <p class="text-sm text-text-secondary leading-relaxed">
    Diseño de arquitecturas escalables siguiendo principios SOLID
  </p>
</div>
```

---

## 🏷️ Badge Component

### Technology Badge
**Uso:** Indicar tecnologías en artículos/proyectos

```html
<!-- .NET -->
<span class="
  inline-flex items-center
  px-3 py-1
  bg-tech-dotnet/10
  text-tech-dotnet
  text-xs font-medium
  rounded-full
  border border-tech-dotnet/20
">
  .NET
</span>

<!-- C# -->
<span class="
  inline-flex items-center
  px-3 py-1
  bg-tech-dotnet/10
  text-tech-dotnet
  text-xs font-medium
  rounded-full
  border border-tech-dotnet/20
">
  C#
</span>

<!-- Azure -->
<span class="
  inline-flex items-center
  px-3 py-1
  bg-tech-azure/10
  text-tech-azure
  text-xs font-medium
  rounded-full
  border border-tech-azure/20
">
  Azure
</span>
```

---

### Status Badge
**Uso:** Estados, disponibilidad

```html
<!-- Disponible -->
<span class="
  inline-flex items-center gap-2
  px-3 py-1
  bg-success/10
  text-success
  text-sm font-medium
  rounded-full
  border border-success/20
">
  <span class="w-2 h-2 bg-success rounded-full animate-pulse"></span>
  Disponible para proyectos
</span>

<!-- Featured -->
<span class="
  inline-flex items-center
  px-3 py-1
  bg-emphasis-500
  text-bg-primary
  text-xs font-bold uppercase tracking-wider
  rounded-full
  shadow-lg shadow-emphasis-500/30
">
  Featured
</span>
```

---

### Category Badge (Interactivo)
**Uso:** Filtrado de blog

```html
<button class="
  px-4 py-2
  bg-bg-tertiary hover:bg-primary-500
  text-text-secondary hover:text-text-primary
  text-sm font-medium
  rounded-lg
  border border-border hover:border-primary-500
  transition-all duration-200
  focus:outline-none focus:ring-2 focus:ring-primary-500

  /* Active state (cuando está seleccionado) */
  aria-pressed:bg-primary-500 aria-pressed:text-text-primary aria-pressed:border-primary-500
">
  Backend
</button>
```

---

## 🔗 Link Component

### Inline Link (En texto)
```html
<a href="..." class="
  text-primary-500
  hover:text-primary-400
  underline underline-offset-4 decoration-primary-500/30 hover:decoration-primary-400
  transition-colors duration-200
  focus:outline-none focus:ring-2 focus:ring-primary-500 focus:rounded
">
  Clean Architecture
</a>
```

---

### Navigation Link
```html
<a href="..." class="
  text-base font-medium
  text-text-secondary hover:text-text-primary
  transition-colors duration-200
  relative
  after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary-500
  hover:after:w-full after:transition-all after:duration-300
">
  Blog
</a>
```

**Efecto:** Underline que crece desde la izquierda en hover.

---

### Social Link (Icono)
```html
<a href="..." class="
  inline-flex items-center justify-center
  w-10 h-10
  text-text-tertiary hover:text-primary-500
  bg-bg-tertiary hover:bg-primary-500/10
  rounded-lg
  transition-all duration-200
  hover:transform hover:scale-110
  focus:outline-none focus:ring-2 focus:ring-primary-500
">
  <svg class="w-5 h-5"><!-- LinkedIn icon --></svg>
</a>
```

---

## 📥 Input Component (Futuro - Contacto)

### Text Input
```html
<input type="text" class="
  w-full
  px-4 py-3
  bg-bg-tertiary
  border border-border focus:border-primary-500
  text-text-primary placeholder:text-text-muted
  rounded-lg
  text-base
  transition-all duration-200
  focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-bg-primary
" placeholder="Tu email">
```

---

## 🎯 Spacing System (Componentes)

### Padding Interno
```
Button:     px-6 py-3    (24px horizontal, 12px vertical)
Card:       p-6          (24px en todos los lados)
Badge:      px-3 py-1    (12px horizontal, 4px vertical)
Input:      px-4 py-3    (16px horizontal, 12px vertical)
```

### Gap entre Elementos
```
Stack vertical:   space-y-4 (16px)
Tags/Badges:      gap-2     (8px)
Buttons group:    gap-4     (16px)
Cards grid:       gap-6     (24px)
```

---

## ✅ Checklist de Componentes

### Fase 1 (Crítico)
- [ ] Button.astro (Primary, Secondary, Ghost)
- [ ] Badge.astro (Tech, Status, Category)
- [ ] SocialIcon.astro (LinkedIn, GitHub, RSS)

### Fase 2 (Importante)
- [ ] BlogCard.astro (refactor)
- [ ] ProjectCard.astro (nuevo)
- [ ] FeatureCard.astro (para Hero)

### Fase 3 (Futuro)
- [ ] Input.astro
- [ ] Textarea.astro
- [ ] Form.astro

---

**Siguiente paso:** Diseñar Hero Section completo.
