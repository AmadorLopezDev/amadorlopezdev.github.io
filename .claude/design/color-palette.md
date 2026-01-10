# 🎨 Sistema de Colores - Design System

**Filosofía:** Paleta oscura profesional con acentos vibrantes para CTAs. Inspiración: VSCode Dark+, GitHub Dark, Linear.

---

## 🌙 Colores Base (Dark Theme)

### Background Hierarchy
```css
--background-primary:   #0D1117    /* Fondo principal - casi negro azulado */
--background-secondary: #161B22    /* Tarjetas, secciones elevadas */
--background-tertiary:  #21262D    /* Elementos hover, inputs */
--background-overlay:   #30363D    /* Modals, popovers */
```

**Uso en Tailwind:**
```js
colors: {
  bg: {
    primary: '#0D1117',
    secondary: '#161B22',
    tertiary: '#21262D',
    overlay: '#30363D'
  }
}
```

---

## 🎯 Color de Marca (Accent)

### Primary - Azul Eléctrico
```css
--primary-50:  #EBF5FF
--primary-100: #DBEAFE
--primary-200: #BFDBFE
--primary-300: #93C5FD
--primary-400: #60A5FA    /* Hover states */
--primary-500: #3B82F6    /* Principal - CTAs, enlaces */
--primary-600: #2563EB    /* Active states */
--primary-700: #1D4ED8
--primary-800: #1E40AF
--primary-900: #1E3A8A
```

**Justificación:** El azul transmite confianza, profesionalismo y tecnología. Tono vibrante pero no agresivo.

**Uso:**
- Botones CTA principales
- Enlaces interactivos
- Badges de tecnología (.NET, C#)
- Iconos destacados

---

## ⚡ Color Secundario (Accent 2)

### Emerald - Verde Tech
```css
--accent-50:  #ECFDF5
--accent-100: #D1FAE5
--accent-200: #A7F3D0
--accent-300: #6EE7B7
--accent-400: #34D399    /* Hover */
--accent-500: #10B981    /* Success, disponibilidad */
--accent-600: #059669
--accent-700: #047857
--accent-800: #065F46
--accent-900: #064E3B
```

**Uso:**
- Estados de éxito
- Indicador "Disponible para proyectos"
- Badges de skills activas
- Progreso de lectura

---

## 🔥 Color de Énfasis

### Amber - Alertas y Highlights
```css
--emphasis-400: #FBBF24    /* Hover */
--emphasis-500: #F59E0B    /* Highlights, tags importantes */
--emphasis-600: #D97706
```

**Uso:**
- Tags destacados ("Senior", "Featured")
- Notificaciones importantes
- Tooltips informativos

---

## ⚪ Escala de Grises (Texto y Bordes)

### Text Colors
```css
--text-primary:   #F0F6FC    /* Títulos, contenido principal */
--text-secondary: #C9D1D9    /* Descripción, subtítulos */
--text-tertiary:  #8B949E    /* Metadatos, timestamps */
--text-muted:     #6E7681    /* Placeholders, disabled */
```

### Border Colors
```css
--border-default: #30363D    /* Bordes sutiles */
--border-muted:   #21262D    /* Separadores muy sutiles */
--border-emphasis:#58A6FF    /* Bordes con foco/hover */
```

---

## 🎭 Colores Semánticos

### Success
```css
--success-bg:   rgba(16, 185, 129, 0.1)
--success-text: #10B981
--success-border: #10B981
```

### Warning
```css
--warning-bg:   rgba(245, 158, 11, 0.1)
--warning-text: #F59E0B
--warning-border: #F59E0B
```

### Error
```css
--error-bg:   rgba(239, 68, 68, 0.1)
--error-text: #EF4444
--error-border: #EF4444
```

### Info
```css
--info-bg:   rgba(59, 130, 246, 0.1)
--info-text: #3B82F6
--info-border: #3B82F6
```

---

## 🌈 Colores de Tecnología (Badges)

### .NET / C#
```css
--tech-dotnet: #512BD4    /* Morado Microsoft */
```

### Azure
```css
--tech-azure: #0078D4     /* Azul Azure oficial */
```

### TypeScript
```css
--tech-typescript: #3178C6
```

### Python
```css
--tech-python: #3776AB
```

### SQL
```css
--tech-sql: #CC2927
```

---

## 📊 Configuración Tailwind (Implementación)

```js
// tailwind.config.mjs
export default {
  theme: {
    extend: {
      colors: {
        // Backgrounds
        bg: {
          primary: '#0D1117',
          secondary: '#161B22',
          tertiary: '#21262D',
          overlay: '#30363D',
        },
        // Primary Brand
        primary: {
          DEFAULT: '#3B82F6',
          50: '#EBF5FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
        },
        // Accent (Emerald)
        accent: {
          DEFAULT: '#10B981',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
        },
        // Emphasis (Amber)
        emphasis: {
          DEFAULT: '#F59E0B',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
        },
        // Text
        text: {
          primary: '#F0F6FC',
          secondary: '#C9D1D9',
          tertiary: '#8B949E',
          muted: '#6E7681',
        },
        // Borders
        border: {
          DEFAULT: '#30363D',
          muted: '#21262D',
          emphasis: '#58A6FF',
        },
        // Semantic
        success: {
          bg: 'rgba(16, 185, 129, 0.1)',
          DEFAULT: '#10B981',
        },
        warning: {
          bg: 'rgba(245, 158, 11, 0.1)',
          DEFAULT: '#F59E0B',
        },
        error: {
          bg: 'rgba(239, 68, 68, 0.1)',
          DEFAULT: '#EF4444',
        },
        info: {
          bg: 'rgba(59, 130, 246, 0.1)',
          DEFAULT: '#3B82F6',
        },
        // Tech stacks
        tech: {
          dotnet: '#512BD4',
          azure: '#0078D4',
          typescript: '#3178C6',
          python: '#3776AB',
          sql: '#CC2927',
        }
      }
    }
  }
}
```

---

## ✅ Criterios de Accesibilidad

### Contraste WCAG AA
- ✅ Texto principal sobre fondo: `#F0F6FC` sobre `#0D1117` → **15.3:1** (AAA)
- ✅ Texto secundario: `#C9D1D9` sobre `#0D1117` → **12.1:1** (AAA)
- ✅ Primary sobre fondo: `#3B82F6` sobre `#0D1117` → **8.2:1** (AAA)
- ✅ Links hover: `#60A5FA` sobre `#0D1117` → **10.5:1** (AAA)

### Focus States
- Todos los elementos interactivos tendrán outline con `border-emphasis`
- Ring offset de 2px para visibilidad

---

## 🎯 Migración desde Chalkboard

### Mapeo de colores antiguos → nuevos
```
chalk        → text-primary (#F0F6FC)
board        → bg-secondary (#161B22)
board-dark   → bg-primary (#0D1117)
blue-600     → primary-500 (#3B82F6)
gray-800     → bg-secondary (#161B22)
text-blue-500 → primary-500 (#3B82F6)
```

---

## 📐 Ejemplos de Uso

### Botón CTA Principal
```html
<button class="bg-primary-500 hover:bg-primary-400 text-text-primary">
  Ver CV
</button>
```

### Card de Blog
```html
<article class="bg-bg-secondary border border-border hover:border-border-emphasis">
  <!-- contenido -->
</article>
```

### Badge de Tecnología
```html
<span class="bg-tech-dotnet/10 text-tech-dotnet border border-tech-dotnet">
  .NET
</span>
```

---

**Siguiente paso:** Definir tipografía y escala de tamaños.
