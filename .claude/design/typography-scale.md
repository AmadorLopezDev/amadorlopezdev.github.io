# 📝 Sistema Tipográfico - Design System

**Filosofía:** Fuentes profesionales con excelente legibilidad en pantalla. Jerarquía clara para contenido técnico.

---

## 🔤 Familias de Fuentes

### Sans-serif Principal (UI & Content)
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

**Justificación:**
- ✅ Diseñada específicamente para interfaces digitales
- ✅ Excelente legibilidad en tamaños pequeños
- ✅ Variable font con muchos weights disponibles
- ✅ Usada por GitHub, Vercel, Linear (profesional y moderna)
- ✅ Gratuita y open-source

**CDN:**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
```

---

### Monospace (Código)
```css
font-family: 'JetBrains Mono', 'Fira Code', Consolas, Monaco, monospace;
```

**Justificación:**
- ✅ Ligaduras para operadores (=>, !=, ===)
- ✅ Usada por JetBrains IDEs
- ✅ Excelente para snippets de código
- ✅ Transmite profesionalismo técnico

**CDN:**
```html
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
```

---

## 📐 Escala Tipográfica (Type Scale)

**Base:** 16px (1rem)
**Ratio:** 1.250 (Major Third) → Crecimiento armónico y legible

### Desktop Scale
```css
--text-xs:   0.75rem    /* 12px - Metadatos, timestamps */
--text-sm:   0.875rem   /* 14px - Descripciones, captions */
--text-base: 1rem       /* 16px - Body text, párrafos */
--text-lg:   1.125rem   /* 18px - Leads, intros */
--text-xl:   1.25rem    /* 20px - Subtítulos H3 */
--text-2xl:  1.5rem     /* 24px - Subtítulos H2 */
--text-3xl:  1.875rem   /* 30px - Títulos de sección */
--text-4xl:  2.25rem    /* 36px - Títulos de página H1 */
--text-5xl:  3rem       /* 48px - Hero headline */
--text-6xl:  3.75rem    /* 60px - Hero display (opcional) */
```

### Mobile Scale (Responsive)
```css
/* En <640px, reducir tamaños grandes */
--text-4xl-mobile: 1.875rem  /* 30px */
--text-5xl-mobile: 2.25rem   /* 36px */
--text-6xl-mobile: 2.5rem    /* 40px */
```

---

## ⚖️ Pesos de Fuente (Weights)

```css
--font-light:      300   /* Uso muy selectivo, textos grandes */
--font-normal:     400   /* Body text, contenido general */
--font-medium:     500   /* Navegación, botones secundarios */
--font-semibold:   600   /* Títulos, CTAs, énfasis medio */
--font-bold:       700   /* Títulos principales, Hero */
--font-extrabold:  800   /* Display headings, Hero (opcional) */
```

### Mapeo por Elemento
```
Body text      → 400 (normal)
Navegación     → 500 (medium)
Botones CTA    → 600 (semibold)
H3, H4         → 600 (semibold)
H2             → 700 (bold)
H1             → 700 (bold)
Hero Display   → 800 (extrabold)
Código         → 400-500 (normal-medium)
```

---

## 📏 Line Heights (Interlineado)

### Content (Artículos, párrafos largos)
```css
--leading-relaxed: 1.75    /* 28px en 16px base - Lectura confortable */
```

### UI Elements (Botones, navegación)
```css
--leading-none:   1        /* Para iconos alineados */
--leading-tight:  1.25     /* Títulos compactos */
--leading-snug:   1.375    /* Subtítulos */
--leading-normal: 1.5      /* UI text general */
```

### Headings
```css
H1: line-height: 1.1    /* Títulos grandes, compactos */
H2: line-height: 1.2
H3: line-height: 1.3
Body: line-height: 1.75  /* Contenido, máxima legibilidad */
```

---

## 📊 Letter Spacing (Tracking)

```css
--tracking-tight:   -0.025em   /* Títulos grandes (H1, Hero) */
--tracking-normal:   0em       /* Body text, default */
--tracking-wide:     0.025em   /* Navegación, botones UPPERCASE */
--tracking-wider:    0.05em    /* Labels, tags pequeños */
```

### Aplicación
```
Hero Display (text-5xl+)     → tracking-tight
Títulos (text-2xl - 4xl)     → tracking-tight
Body text                    → tracking-normal
Botones UPPERCASE            → tracking-wide
Tags/Badges UPPERCASE        → tracking-wider
```

---

## 🎯 Jerarquía Visual (Aplicación Práctica)

### Hero Section
```html
<!-- Headline -->
<h1 class="text-5xl md:text-6xl font-extrabold tracking-tight leading-none text-text-primary">
  Senior Software Engineer
</h1>

<!-- Subheadline -->
<p class="text-xl md:text-2xl font-medium leading-snug text-text-secondary">
  .NET | C# | Clean Architecture | DDD
</p>

<!-- Body/Description -->
<p class="text-lg leading-relaxed text-text-tertiary">
  +25 años construyendo software de calidad...
</p>
```

---

### Títulos de Página
```html
<h1 class="text-4xl font-bold tracking-tight text-text-primary">
  Blog
</h1>
```

---

### Artículos de Blog
```html
<!-- Título del artículo -->
<h2 class="text-2xl md:text-3xl font-bold tracking-tight text-text-primary hover:text-primary">
  Object Calisthenics
</h2>

<!-- Descripción/Excerpt -->
<p class="text-base leading-relaxed text-text-secondary">
  Ejercicios de programación para mejorar...
</p>

<!-- Metadatos -->
<span class="text-sm text-text-tertiary">
  Enero 10, 2025
</span>
```

---

### Navegación (Header)
```html
<a class="text-base font-medium tracking-normal text-text-secondary hover:text-text-primary">
  Acerca de
</a>
```

---

### Botones
```html
<!-- Primary CTA -->
<button class="text-base font-semibold tracking-normal">
  Ver CV
</button>

<!-- Secondary -->
<button class="text-sm font-medium tracking-wide uppercase">
  Contactar
</button>
```

---

### Código en Artículos
```css
code, pre {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.875rem;      /* 14px */
  line-height: 1.7;
  font-weight: 400;
  letter-spacing: -0.01em;  /* Ligeramente más compacto */
}

/* Inline code */
code {
  font-size: 0.9em;         /* 90% del texto circundante */
  padding: 0.2em 0.4em;
  background: var(--bg-tertiary);
  border-radius: 0.25rem;
}
```

---

## 📱 Responsive Typography

### Mobile First Approach
```css
/* Base (Mobile) */
body {
  font-size: 16px;
}

/* Tablet (768px+) */
@media (min-width: 768px) {
  body {
    font-size: 16px; /* Mantener */
  }

  h1 {
    font-size: 2.25rem; /* Crecer títulos */
  }
}

/* Desktop (1024px+) */
@media (min-width: 1024px) {
  body {
    font-size: 18px; /* Crecer ligeramente para lectura */
  }
}
```

### Clases Tailwind Responsivas
```html
<!-- Hero que se adapta -->
<h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
  Senior Software Engineer
</h1>

<!-- Body text que crece en desktop -->
<p class="text-base md:text-lg leading-relaxed">
  Contenido...
</p>
```

---

## 🎨 Configuración Tailwind

```js
// tailwind.config.mjs
export default {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1.5' }],
        sm: ['0.875rem', { lineHeight: '1.5' }],
        base: ['1rem', { lineHeight: '1.75' }],
        lg: ['1.125rem', { lineHeight: '1.75' }],
        xl: ['1.25rem', { lineHeight: '1.5' }],
        '2xl': ['1.5rem', { lineHeight: '1.3' }],
        '3xl': ['1.875rem', { lineHeight: '1.2' }],
        '4xl': ['2.25rem', { lineHeight: '1.1' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      fontWeight: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
      },
      letterSpacing: {
        tighter: '-0.05em',
        tight: '-0.025em',
        normal: '0em',
        wide: '0.025em',
        wider: '0.05em',
      }
    }
  }
}
```

---

## ✅ Checklist de Implementación

- [ ] Añadir CDN de Inter en `<head>`
- [ ] Añadir CDN de JetBrains Mono en `<head>`
- [ ] Actualizar `tailwind.config.mjs` con fontFamily
- [ ] Migrar clases de "Schoolbell" a "Inter"
- [ ] Aplicar escala tipográfica a componentes
- [ ] Testear legibilidad en mobile/desktop
- [ ] Validar contraste WCAG AA en todos los tamaños

---

**Siguiente paso:** Especificar componentes base (Button, Card, Badge).
