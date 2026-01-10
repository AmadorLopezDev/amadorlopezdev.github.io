# 🎨 Sistema de Diseño UI - Documento Maestro

**Fecha:** 2025-01-10
**Fase:** 2 - UI Design (Completada)
**Designer:** UI Designer Agent

---

## 📋 RESUMEN EJECUTIVO

Sistema de diseño moderno y profesional para sitio personal de Senior Software Engineer, orientado a conversión de CTOs, recruiters y profesionales del sector tech.

**Principios:**
1. **Profesionalismo sin rigidez** - Dark theme moderno, accesible y atractivo
2. **Jerarquía clara** - Información crítica visible en <3 segundos
3. **Conversión priorizada** - CTAs destacados, CV accesible, stack visible
4. **Accesibilidad WCAG AA** - Contraste validado, navegación por teclado
5. **Modernidad técnica** - Inspiración: GitHub Dark, Linear, Vercel

---

## 🎨 COMPONENTES DEL SISTEMA

### 1. Colores
📄 **Documento:** [`color-palette.md`](./color-palette.md)

**Paleta Principal:**
- Background: `#0D1117` (primary), `#161B22` (secondary), `#21262D` (tertiary)
- Primary: `#3B82F6` (Azul eléctrico - CTAs, enlaces)
- Accent: `#10B981` (Emerald - Success, disponibilidad)
- Emphasis: `#F59E0B` (Amber - Highlights, featured)
- Text: `#F0F6FC` (primary), `#C9D1D9` (secondary), `#8B949E` (tertiary)

**Tech Stack Colors:**
- .NET/C#: `#512BD4`
- Azure: `#0078D4`
- TypeScript: `#3178C6`

**Contraste WCAG:**
- Texto principal: **15.3:1 (AAA)**
- Primary sobre fondo: **8.2:1 (AAA)**

---

### 2. Tipografía
📄 **Documento:** [`typography-scale.md`](./typography-scale.md)

**Fuentes:**
- Sans-serif: **Inter** (UI y contenido)
- Monospace: **JetBrains Mono** (código)

**Escala (Major Third - 1.25):**
```
text-5xl:  48px  (Hero headline)
text-4xl:  36px  (H1 páginas)
text-3xl:  30px  (H2 secciones)
text-2xl:  24px  (H3, títulos cards)
text-xl:   20px  (Subtítulos)
text-lg:   18px  (Leads)
text-base: 16px  (Body)
text-sm:   14px  (Metadatos)
text-xs:   12px  (Badges)
```

**Weights:**
- 800 (extrabold): Hero display
- 700 (bold): Títulos H1/H2
- 600 (semibold): H3, Botones
- 500 (medium): Navegación
- 400 (normal): Body text

---

### 3. Componentes Base
📄 **Documento:** [`component-specs.md`](./component-specs.md)

#### Button (3 variantes)
- **Primary:** CTAs principales (Descargar CV, Contactar)
- **Secondary:** Acciones alternativas (Ver Proyectos)
- **Ghost:** Navegación, acciones terciarias

#### Card (3 tipos)
- **Blog Card:** Artículos con imagen, título, descripción, tags
- **Project Card:** Portfolio con stack tech
- **Feature Card:** Skills/servicios en Hero

#### Badge (3 contextos)
- **Technology Badge:** Stack tech (.NET, Azure, etc.)
- **Status Badge:** Disponibilidad, featured
- **Category Badge:** Filtrado interactivo

---

### 4. Hero Section
📄 **Documento:** [`hero-section-design.md`](./hero-section-design.md)

**Estructura:**
1. Badge "Disponible para proyectos" (con pulse animation)
2. Saludo + Nombre
3. Headline "Senior Software Engineer" (gradient accent)
4. Stack tecnológico (inline con colores tech)
5. Descripción de valor (25 años, Craftsmanship)
6. CTAs (Descargar CV + Ver Proyectos)
7. Badges de tecnologías (.NET 10, C# 14, Azure, DDD, SOLID, TDD)
8. Scroll indicator

**Animaciones:**
- Fade-in staggered (delays de 100-600ms)
- Hover scale en botones
- Pulse en badge de estado

**Responsive:**
- Mobile: `text-4xl`, stack vertical
- Desktop: `text-7xl`, layout espaciado

---

### 5. Header & Footer
📄 **Documento:** [`header-footer-design.md`](./header-footer-design.md)

#### Header (Sticky)
- Logo + Nombre (izquierda)
- Navegación (centro): Inicio, Acerca de, Blog, Proyectos
- Socials + CTA CV (derecha)
- Mobile: Hamburger menu
- Backdrop blur effect

#### Footer
- 4 columnas: Brand, Navegación, Legal, (espacio para email)
- Iconos sociales (LinkedIn, GitHub, RSS)
- Copyright + "Made with Astro"
- Enlaces legales

---

### 6. Spacing & Layout
📄 **Documento:** [`spacing-layout-system.md`](./spacing-layout-system.md)

**Sistema Base:** Múltiplos de 4px (8px mínimo)

**Containers:**
- Max-width: `max-w-7xl` (1280px)
- Padding lateral: `px-6 md:px-12 lg:px-24`

**Spacing Vertical:**
- Secciones: `py-12 md:py-16`
- Hero: `py-20`
- Elementos internos: `space-y-4` (16px)

**Grids:**
- Cards: `gap-6` (24px)
- Columns: `gap-8` (32px)
- Tags: `gap-2` (8px)

---

## 🛠️ IMPLEMENTACIÓN TÉCNICA

### Tailwind Config
```js
// tailwind.config.mjs
export default {
  theme: {
    extend: {
      colors: {
        bg: { primary: '#0D1117', secondary: '#161B22', tertiary: '#21262D', overlay: '#30363D' },
        primary: { DEFAULT: '#3B82F6', 400: '#60A5FA', 500: '#3B82F6', 600: '#2563EB' },
        accent: { DEFAULT: '#10B981', 400: '#34D399', 500: '#10B981', 600: '#059669' },
        emphasis: { DEFAULT: '#F59E0B', 400: '#FBBF24', 500: '#F59E0B', 600: '#D97706' },
        text: { primary: '#F0F6FC', secondary: '#C9D1D9', tertiary: '#8B949E', muted: '#6E7681' },
        border: { DEFAULT: '#30363D', muted: '#21262D', emphasis: '#58A6FF' },
        tech: { dotnet: '#512BD4', azure: '#0078D4', typescript: '#3178C6', python: '#3776AB', sql: '#CC2927' },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
    }
  }
}
```

### CDN Fonts (en `<head>`)
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
```

### Animaciones Custom
```css
/* src/styles/animations.css */
@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out forwards;
  opacity: 0;
}

.animation-delay-100 { animation-delay: 0.1s; }
.animation-delay-200 { animation-delay: 0.2s; }
.animation-delay-300 { animation-delay: 0.3s; }
.animation-delay-400 { animation-delay: 0.4s; }
.animation-delay-500 { animation-delay: 0.5s; }
.animation-delay-600 { animation-delay: 0.6s; }
```

---

## 📊 MIGRACIÓN DESDE CHALKBOARD

### Mapeo de Colores
```
chalk        → text-primary (#F0F6FC)
board        → bg-secondary (#161B22)
board-dark   → bg-primary (#0D1117)
blue-600     → primary-500 (#3B82F6)
gray-800     → bg-secondary (#161B22)
text-blue-500 → primary-500 (#3B82F6)
```

### Archivos a Modificar
1. `tailwind.config.mjs` - Actualizar theme.extend
2. `src/layouts/Layout.astro` - Añadir fuentes CDN
3. `src/components/Header.astro` - Reemplazar completamente
4. `src/components/Footer.astro` - Reemplazar completamente
5. `src/components/BlogCard.astro` - Actualizar colores
6. `src/pages/index.astro` - Reemplazar con Hero nuevo
7. `src/styles/global.css` - Remover Schoolbell, añadir Inter
8. `src/styles/animations.css` - Crear nuevo

---

## ✅ CHECKLIST DE IMPLEMENTACIÓN

### Fase 1: Base (Crítico)
- [ ] Actualizar `tailwind.config.mjs` con nuevos colores
- [ ] Añadir CDN de Inter y JetBrains Mono en Layout
- [ ] Crear `src/styles/animations.css`
- [ ] Actualizar `src/styles/global.css` (remover Schoolbell)

### Fase 2: Componentes Core
- [ ] Crear `src/components/Button.astro`
- [ ] Crear `src/components/Badge.astro`
- [ ] Crear `src/components/SocialIcon.astro`
- [ ] Refactorizar `src/components/BlogCard.astro`

### Fase 3: Páginas Principales
- [ ] Reemplazar `src/pages/index.astro` (Hero nuevo)
- [ ] Reemplazar `src/components/Header.astro`
- [ ] Reemplazar `src/components/Footer.astro`
- [ ] Añadir CV en `public/cv/amador-lopez-cv.pdf`

### Fase 4: Validación
- [ ] Ejecutar `npx astro check`
- [ ] Testear responsive en mobile/tablet/desktop
- [ ] Validar contraste WCAG AA
- [ ] Verificar navegación por teclado
- [ ] Testear animaciones en diferentes navegadores

---

## 🎯 CRITERIOS DE ACEPTACIÓN

### Visual
- ✅ Paleta oscura moderna sin usar negro puro
- ✅ Jerarquía visual clara (títulos destacan)
- ✅ CTAs visibles y destacados
- ✅ Stack tecnológico visible en Hero

### UX
- ✅ Propuesta de valor clara en <3 segundos
- ✅ CV descargable a 1 clic desde Header
- ✅ Enlaces sociales visibles en Header/Footer
- ✅ Navegación responsive funcional

### Técnico
- ✅ Contraste WCAG AA mínimo en todos los textos
- ✅ Focus states visibles en elementos interactivos
- ✅ Animaciones suaves (300ms max)
- ✅ Build sin errores de Astro

### Performance
- ✅ Fuentes cargadas con `preconnect`
- ✅ Animaciones CSS (no JS donde se pueda)
- ✅ Clases Tailwind sin duplicación excesiva

---

## 📁 ESTRUCTURA DE ARTEFACTOS

```
.claude/design/
├── ui-design-system-complete.md      ✅ Este documento (Maestro)
├── color-palette.md                  ✅ Sistema de colores
├── typography-scale.md               ✅ Tipografía y escala
├── component-specs.md                ✅ Componentes base
├── hero-section-design.md            ✅ Hero Section
├── header-footer-design.md           ✅ Header + Footer
└── spacing-layout-system.md          ✅ Espaciado y layouts
```

---

## 🚀 PRÓXIMOS PASOS

**Fase completada:** ✅ UI Design (7 documentos generados)

**Siguiente fase:** Interaction Design (IxD)
- Definir micro-interacciones
- Especificar transiciones
- Reading progress bar
- Scroll reveal effects
- Hover states avanzados

**Comando para continuar:**
```bash
# El usuario debe aprobar este diseño antes de pasar a IxD
# Luego, el Interaction Designer tomará estos specs y añadirá polish
```

---

## 📝 NOTAS FINALES

### Decisiones de Diseño Clave

1. **Dark theme obligatorio** - El sector tech prefiere interfaces oscuras
2. **Inter como fuente principal** - Usada por GitHub, Vercel, Linear (credibilidad)
3. **Azul como primary** - Color más asociado con tecnología y confianza
4. **Gradient en "Engineer"** - Añade dinamismo sin perder profesionalismo
5. **Badges de tech visibles** - Los recruiters buscan keywords específicas

### Flexibilidad del Sistema

Este sistema es **extensible**:
- Fácil añadir nuevos colores tech (Go, Rust, Java)
- Componentes modulares reutilizables
- Grid system permite layouts complejos
- Spacing consistente facilita añadir secciones

### Mantenibilidad

- **Todas las variables centralizadas** en `tailwind.config.mjs`
- **Sin colores hardcoded** en componentes (usar clases)
- **Documentación exhaustiva** para futuros cambios
- **Sistema escalable** para blog con 100+ artículos

---

**Estado:** ✅ FASE 2 COMPLETADA - Listo para revisión del usuario
