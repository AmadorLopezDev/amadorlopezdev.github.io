# ⏳ Estados de Carga y Animaciones

**Filosofía:** Feedback visual inmediato para operaciones asíncronas. Skeletons para contenido, spinners para acciones.

---

## 🔄 Loading Spinners

### Spinner Primary (Para botones/acciones)

```html
<div class="inline-flex items-center gap-2">
  <svg
    class="animate-spin h-5 w-5 text-primary-500"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      class="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      stroke-width="4"
    ></circle>
    <path
      class="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
  <span>Cargando...</span>
</div>
```

**Tailwind animation:**
```css
@keyframes spin {
  to { transform: rotate(360deg); }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
```

---

### Dots Loader (Sutil, para texto inline)

```html
<span class="inline-flex items-center gap-1">
  Cargando
  <span class="flex space-x-1">
    <span class="w-1.5 h-1.5 bg-primary-500 rounded-full animate-bounce" style="animation-delay: 0ms"></span>
    <span class="w-1.5 h-1.5 bg-primary-500 rounded-full animate-bounce" style="animation-delay: 150ms"></span>
    <span class="w-1.5 h-1.5 bg-primary-500 rounded-full animate-bounce" style="animation-delay: 300ms"></span>
  </span>
</span>
```

---

### Pulse Loader (Para contenido completo)

```html
<div class="flex items-center justify-center min-h-screen">
  <div class="w-16 h-16 bg-primary-500 rounded-full animate-pulse"></div>
</div>
```

---

## 💀 Skeleton Loaders

### Blog Card Skeleton

```html
<article class="
  bg-bg-secondary
  border border-border
  rounded-xl
  overflow-hidden
  animate-pulse
">
  <!-- Imagen placeholder -->
  <div class="w-full h-48 bg-bg-tertiary"></div>

  <!-- Contenido placeholder -->
  <div class="p-6 space-y-4">
    <!-- Título -->
    <div class="h-7 bg-bg-tertiary rounded w-3/4"></div>

    <!-- Descripción (3 líneas) -->
    <div class="space-y-2">
      <div class="h-4 bg-bg-tertiary rounded w-full"></div>
      <div class="h-4 bg-bg-tertiary rounded w-5/6"></div>
      <div class="h-4 bg-bg-tertiary rounded w-4/6"></div>
    </div>

    <!-- Meta -->
    <div class="flex items-center gap-4">
      <div class="h-3 bg-bg-tertiary rounded w-20"></div>
      <div class="h-3 bg-bg-tertiary rounded w-16"></div>
    </div>

    <!-- Tags -->
    <div class="flex gap-2">
      <div class="h-6 bg-bg-tertiary rounded-full w-16"></div>
      <div class="h-6 bg-bg-tertiary rounded-full w-20"></div>
    </div>
  </div>
</article>
```

**CSS Animation:**
```css
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
```

---

### Text Skeleton (Inline)

```html
<div class="space-y-3">
  <div class="h-4 bg-bg-tertiary rounded animate-pulse w-full"></div>
  <div class="h-4 bg-bg-tertiary rounded animate-pulse w-11/12"></div>
  <div class="h-4 bg-bg-tertiary rounded animate-pulse w-10/12"></div>
</div>
```

---

### List Skeleton

```html
<ul class="space-y-4">
  {[...Array(5)].map((_, i) => (
    <li key={i} class="flex items-center gap-4 animate-pulse">
      <!-- Avatar/Icon -->
      <div class="w-12 h-12 bg-bg-tertiary rounded-full"></div>

      <!-- Content -->
      <div class="flex-1 space-y-2">
        <div class="h-4 bg-bg-tertiary rounded w-1/2"></div>
        <div class="h-3 bg-bg-tertiary rounded w-1/3"></div>
      </div>
    </li>
  ))}
</ul>
```

---

## 🎬 Page Load Animation (Hero)

### Fade In Staggered (Ya especificado en Hero)

```html
<!-- Elementos del Hero con delays -->
<div class="animate-fade-in-up animation-delay-100">...</div>
<div class="animate-fade-in-up animation-delay-200">...</div>
<div class="animate-fade-in-up animation-delay-300">...</div>
```

**Asegurar que solo se ejecuta una vez:**
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
  opacity: 0; /* Start invisible */
}

/* Delays */
.animation-delay-100 { animation-delay: 0.1s; }
.animation-delay-200 { animation-delay: 0.2s; }
.animation-delay-300 { animation-delay: 0.3s; }
```

---

## 🔘 Button Loading States

### Primary Button con Spinner

```html
<!-- Estado normal -->
<button class="px-6 py-3 bg-primary-500 ...">
  Enviar
</button>

<!-- Estado loading -->
<button
  disabled
  class="
    px-6 py-3
    bg-primary-500
    text-text-primary
    rounded-lg
    opacity-75 cursor-not-allowed
    flex items-center gap-2
  "
>
  <svg class="animate-spin h-5 w-5" viewBox="0 0 24 24">
    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle>
    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
  Enviando...
</button>
```

**Componente Astro reutilizable:**

```astro
---
// src/components/Button.astro
export interface Props {
  variant?: 'primary' | 'secondary' | 'ghost';
  loading?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit';
}

const { variant = 'primary', loading = false, disabled = false, type = 'button' } = Astro.props;

const variants = {
  primary: 'bg-primary-500 hover:bg-primary-400 text-text-primary',
  secondary: 'bg-bg-tertiary hover:bg-bg-overlay border border-border text-text-primary',
  ghost: 'bg-transparent hover:bg-bg-tertiary text-text-secondary hover:text-text-primary'
};

const baseClasses = 'px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2';
const disabledClasses = loading || disabled ? 'opacity-75 cursor-not-allowed' : '';
---

<button
  type={type}
  disabled={loading || disabled}
  class={`${baseClasses} ${variants[variant]} ${disabledClasses}`}
>
  {loading && (
    <svg class="animate-spin h-5 w-5" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  )}
  <slot />
</button>
```

**Uso:**
```astro
<Button variant="primary" loading={isSubmitting}>
  Enviar
</Button>
```

---

## 📭 Empty States

### Blog sin artículos

```html
<div class="
  max-w-md mx-auto
  text-center
  py-16
">
  <!-- Icono decorativo -->
  <div class="w-24 h-24 mx-auto mb-6 bg-bg-tertiary rounded-full flex items-center justify-center">
    <svg class="w-12 h-12 text-text-tertiary" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm3 1h6v4H7V5zm6 6H7v2h6v-2z" clip-rule="evenodd"/>
    </svg>
  </div>

  <!-- Mensaje -->
  <h3 class="text-xl font-bold text-text-primary mb-2">
    No hay artículos aún
  </h3>
  <p class="text-text-secondary mb-6">
    Parece que todavía no he publicado nada en esta categoría.
  </p>

  <!-- CTA -->
  <a href="/content/blog" class="inline-flex items-center gap-2 text-primary hover:text-primary-400 font-medium">
    Ver todos los artículos
    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"/>
    </svg>
  </a>
</div>
```

---

### Búsqueda sin resultados

```html
<div class="text-center py-12">
  <!-- Icono -->
  <div class="w-16 h-16 mx-auto mb-4 text-text-tertiary">
    <svg fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"/>
    </svg>
  </div>

  <!-- Mensaje -->
  <h3 class="text-lg font-semibold text-text-primary mb-2">
    No encontramos resultados
  </h3>
  <p class="text-text-secondary mb-4">
    Intenta con otros términos de búsqueda
  </p>

  <!-- Botón limpiar -->
  <button class="text-primary hover:text-primary-400 font-medium">
    Limpiar búsqueda
  </button>
</div>
```

---

## 🎯 Toast Notifications (Futuro)

### Diseño de Toast

```html
<div
  role="alert"
  class="
    fixed bottom-4 right-4 z-50
    max-w-sm
    bg-bg-secondary
    border border-border
    rounded-lg
    shadow-xl
    p-4
    flex items-start gap-3

    /* Animación de entrada */
    animate-slide-in-right

    /* Opcional: auto-dismiss animation */
    data-[closing=true]:animate-fade-out
  "
>
  <!-- Icono según tipo -->
  <div class="flex-shrink-0">
    <!-- Success -->
    <svg class="w-6 h-6 text-success" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
    </svg>
  </div>

  <!-- Contenido -->
  <div class="flex-1">
    <h4 class="text-sm font-semibold text-text-primary mb-1">
      ¡Operación exitosa!
    </h4>
    <p class="text-sm text-text-secondary">
      Los cambios se han guardado correctamente.
    </p>
  </div>

  <!-- Botón cerrar -->
  <button class="flex-shrink-0 text-text-tertiary hover:text-text-primary">
    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
    </svg>
  </button>
</div>

<style>
  @keyframes slide-in-right {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  .animate-slide-in-right {
    animation: slide-in-right 0.3s ease-out;
  }

  @keyframes fade-out {
    to {
      opacity: 0;
      transform: translateX(20px);
    }
  }

  .animate-fade-out {
    animation: fade-out 0.2s ease-in forwards;
  }
</style>
```

---

## ✅ Checklist de Implementación

### Spinners & Loaders
- [ ] Crear componente `Spinner.astro`
- [ ] Añadir animaciones en `global.css` o `animations.css`
- [ ] Implementar en Button component

### Skeletons
- [ ] Crear `BlogCardSkeleton.astro`
- [ ] Añadir animación pulse en Tailwind config
- [ ] Usar durante fetch de datos

### Empty States
- [ ] Diseñar variantes (no posts, no results, error)
- [ ] Crear componente `EmptyState.astro`
- [ ] Implementar en páginas correspondientes

### Loading States
- [ ] Añadir prop `loading` en Button
- [ ] Testear disabled states
- [ ] Validar accesibilidad (aria-busy)

---

## 🎯 Decisiones de Diseño

### ¿Cuándo usar Skeleton vs Spinner?
- **Skeleton:** Carga de contenido con estructura conocida (cards, lists)
- **Spinner:** Acciones async (submit form, fetch API)
- **Pulse:** Carga de página completa (raro en Astro SSG)

### ¿Auto-dismiss en Toasts?
**Recomendación:**
- Success: Auto-dismiss en 3-5s
- Error: Requiere dismiss manual
- Info: Auto-dismiss en 5s

---

**Siguiente paso:** Crear mapa de interacciones completo (resumen visual).
