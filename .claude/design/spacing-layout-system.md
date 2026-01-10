# 📐 Sistema de Espaciado y Layout

**Filosofía:** Grid system consistente + espaciado basado en múltiplos de 4px (8px base).

---

## 📏 Spacing Scale (Tailwind Default Extended)

### Base: 4px unit

```
0:   0px
1:   4px    (0.25rem)
2:   8px    (0.5rem)
3:   12px   (0.75rem)
4:   16px   (1rem)     ← Base spacing
5:   20px   (1.25rem)
6:   24px   (1.5rem)
8:   32px   (2rem)
10:  40px   (2.5rem)
12:  48px   (3rem)
16:  64px   (4rem)
20:  80px   (5rem)
24:  96px   (6rem)
32:  128px  (8rem)
```

---

## 🎯 Aplicación por Contexto

### Spacing Interno (Padding)

#### Componentes pequeños
```css
/* Botones, badges, tags */
Button:       px-6 py-3    (24px h, 12px v)
Badge:        px-3 py-1    (12px h, 4px v)
Input:        px-4 py-3    (16px h, 12px v)
```

#### Componentes medianos
```css
/* Cards, boxes */
Card:         p-6          (24px todos los lados)
Modal:        p-8          (32px)
```

#### Secciones grandes
```css
/* Sections, containers */
Section:      py-12 md:py-16    (48px → 64px)
Hero:         py-20             (80px)
```

---

### Spacing Externo (Margin/Gap)

#### Stack vertical (elementos uno debajo del otro)
```css
/* Spacing entre elementos en columna */
Texto apretado:     space-y-2  (8px)
Texto normal:       space-y-4  (16px)
Secciones:          space-y-8  (32px)
Bloques grandes:    space-y-12 (48px)
```

#### Grid horizontal (elementos en fila)
```css
/* Spacing entre elementos en grid */
Tags/Badges:        gap-2      (8px)
Cards:              gap-6      (24px)
Columns:            gap-8      (32px)
```

---

## 🌐 Container System

### Max Width por Breakpoint

```css
/* Tailwind defaults mejorados */
max-w-7xl     → 1280px  (Contenedor principal)
max-w-6xl     → 1152px  (Contenido blog)
max-w-5xl     → 1024px  (Hero text)
max-w-4xl     → 896px   (Artículos)
max-w-3xl     → 768px   (Texto largo)
max-w-2xl     → 672px   (Forms)
```

### Padding Lateral (Responsive)

```html
<!-- Mobile → Tablet → Desktop -->
<div class="px-6 md:px-12 lg:px-24">
  <!-- 24px → 48px → 96px -->
</div>
```

**Aplicación:**
- Header/Footer: `px-6 md:px-12 lg:px-24`
- Secciones: `px-6 md:px-12`
- Hero: `px-6 md:px-12 lg:px-24`

---

## 📱 Breakpoints (Tailwind Defaults)

```css
sm:   640px   → Teléfonos grandes / Tablets pequeñas
md:   768px   → Tablets
lg:   1024px  → Laptops
xl:   1280px  → Desktops
2xl:  1536px  → Pantallas grandes
```

---

## 🎨 Layout Patterns

### 1. Hero Full Width

```html
<section class="
  min-h-screen
  flex items-center justify-center
  px-6 md:px-12 lg:px-24
  py-20
">
  <div class="max-w-5xl mx-auto">
    <!-- Contenido centrado, ancho limitado -->
  </div>
</section>
```

---

### 2. Content Section (Texto + Margen)

```html
<section class="
  max-w-7xl mx-auto
  px-6 md:px-12 lg:px-24
  py-12 md:py-16
">
  <h2 class="text-3xl font-bold mb-8">Título</h2>

  <div class="space-y-6">
    <!-- Contenido con spacing vertical -->
  </div>
</section>
```

---

### 3. Grid de Cards (2/3 columnas)

```html
<section class="
  max-w-7xl mx-auto
  px-6 md:px-12 lg:px-24
  py-12
">
  <div class="
    grid
    grid-cols-1 md:grid-cols-2 lg:grid-cols-3
    gap-6
  ">
    <!-- Cards -->
  </div>
</section>
```

---

### 4. Sidebar Layout (Blog + Sidebar)

```html
<div class="
  max-w-7xl mx-auto
  px-6 md:px-12
  py-12
">
  <div class="
    grid
    grid-cols-1 lg:grid-cols-3
    gap-8
  ">
    <!-- Main content (2/3) -->
    <main class="lg:col-span-2">
      <article class="prose prose-lg max-w-none">
        <!-- Contenido del artículo -->
      </article>
    </main>

    <!-- Sidebar (1/3) -->
    <aside class="space-y-6">
      <!-- Widgets -->
    </aside>
  </div>
</div>
```

---

### 5. Split Screen (Imagen + Texto)

```html
<section class="
  max-w-7xl mx-auto
  px-6 md:px-12
  py-12
">
  <div class="
    grid
    grid-cols-1 md:grid-cols-2
    gap-8
    items-center
  ">
    <!-- Imagen -->
    <div>
      <img src="..." alt="..." class="rounded-xl">
    </div>

    <!-- Texto -->
    <div class="space-y-4">
      <h2 class="text-3xl font-bold">Título</h2>
      <p class="text-lg text-text-secondary">Descripción...</p>
    </div>
  </div>
</section>
```

---

## 📊 Vertical Rhythm (Spacing entre secciones)

```html
<!-- Layout general de página -->
<Layout>
  <!-- Hero: sin margen superior -->
  <section id="hero" class="...">
    <!-- Hero content -->
  </section>

  <!-- Separación de 16 (64px) entre secciones principales -->
  <section id="about" class="py-16">
    <!-- About content -->
  </section>

  <section id="projects" class="py-16">
    <!-- Projects content -->
  </section>

  <section id="blog" class="py-16">
    <!-- Blog preview -->
  </section>
</Layout>
```

---

## 🎯 Spacing Decision Tree

### ¿Cuánto espacio usar?

```
Elementos muy relacionados (tags, badges):     gap-2  (8px)
Párrafos/textos:                               space-y-4  (16px)
Componentes de UI (buttons, inputs):           gap-4  (16px)
Cards en grid:                                 gap-6  (24px)
Secciones dentro de container:                 space-y-8  (32px)
Secciones de página completa:                  py-12 md:py-16  (48-64px)
Hero / Landing sections:                       py-20  (80px)
```

---

## 🧩 Component Internal Spacing

### Button
```html
<button class="px-6 py-3">
  <!-- 24px horizontal, 12px vertical -->
</button>
```

### Card
```html
<article class="p-6 space-y-4">
  <!-- 24px padding, 16px entre elementos internos -->
  <h3>Título</h3>
  <p>Descripción</p>
  <div>Tags</div>
</article>
```

### Form
```html
<form class="space-y-6">
  <!-- 24px entre campos -->
  <div class="space-y-2">
    <!-- 8px entre label e input -->
    <label>Nombre</label>
    <input class="px-4 py-3">
  </div>

  <button class="px-6 py-3">
    Enviar
  </button>
</form>
```

---

## 📐 Tailwind Config (Customización)

```js
// tailwind.config.mjs
export default {
  theme: {
    extend: {
      spacing: {
        // Ya cubierto por Tailwind defaults
        // Si necesitas valores custom:
        '128': '32rem',  // 512px
        '144': '36rem',  // 576px
      },
      maxWidth: {
        '8xl': '88rem',   // 1408px (si necesitas contenedores más anchos)
        '9xl': '96rem',   // 1536px
      }
    }
  }
}
```

---

## ✅ Checklist de Consistencia

### Al diseñar un componente nuevo:
- [ ] Usa padding interno múltiplo de 4 (prefer 16, 24, 32)
- [ ] Usa gap entre elementos múltiplo de 4 (prefer 8, 16, 24)
- [ ] Define max-width apropiado al contexto
- [ ] Aplica responsive padding (mobile → desktop)
- [ ] Mantén vertical rhythm consistente (py-12/16)

### Al crear una página nueva:
- [ ] Contenedor principal: `max-w-7xl mx-auto`
- [ ] Padding lateral: `px-6 md:px-12 lg:px-24`
- [ ] Separación entre secciones: `py-12 md:py-16`
- [ ] Grids: `gap-6` para cards, `gap-8` para columnas

---

## 🎨 Ejemplo Completo: Blog Post Layout

```html
<Layout>
  <!-- Header sticky: ya definido -->

  <!-- Article Header -->
  <header class="
    max-w-4xl mx-auto
    px-6 md:px-12
    pt-24 pb-12
  ">
    <div class="space-y-4">
      <!-- Tags -->
      <div class="flex flex-wrap gap-2">
        <span class="px-3 py-1 bg-tech-dotnet/10 text-tech-dotnet text-xs rounded-full">
          .NET
        </span>
      </div>

      <!-- Título -->
      <h1 class="text-4xl md:text-5xl font-bold">
        Object Calisthenics
      </h1>

      <!-- Meta -->
      <div class="flex items-center gap-4 text-sm text-text-tertiary">
        <time>10 de Enero, 2025</time>
        <span>·</span>
        <span>8 min lectura</span>
      </div>
    </div>
  </header>

  <!-- Article Content -->
  <article class="
    max-w-3xl mx-auto
    px-6 md:px-12
    pb-16
  ">
    <div class="prose prose-lg prose-invert max-w-none">
      <!-- Markdown content con spacing automático -->
    </div>
  </article>

  <!-- Related Posts -->
  <section class="
    max-w-7xl mx-auto
    px-6 md:px-12
    py-16
    bg-bg-secondary
  ">
    <h2 class="text-2xl font-bold mb-8">Artículos relacionados</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Cards -->
    </div>
  </section>

  <!-- Footer: ya definido -->
</Layout>
```

---

**Siguiente paso:** Documentar sistema de diseño completo (resumen ejecutivo).
