# 🎯 Hero Section - Diseño Completo

**Objetivo:** Comunicar valor profesional en <3 segundos. Conversión CTOs/Recruiters.

---

## 📐 Layout Structure

```
┌─────────────────────────────────────────────────────────────┐
│                      HEADER (Fixed)                         │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│                                                               │
│                        HERO SECTION                           │
│                    (Full viewport height)                     │
│                                                               │
│   ┌─────────────────────────────────────────────────┐       │
│   │                                                   │       │
│   │  [Badge: Disponible]                             │       │
│   │                                                   │       │
│   │  Hola, soy Amador López                          │       │
│   │  SENIOR SOFTWARE ENGINEER                        │       │
│   │                                                   │       │
│   │  Especializado en .NET | C# | Clean Architecture │       │
│   │  Domain-Driven Design | Azure Cloud              │       │
│   │                                                   │       │
│   │  Más de 25 años construyendo software...         │       │
│   │                                                   │       │
│   │  [Botón: Ver CV] [Botón: Ver Proyectos]         │       │
│   │                                                   │       │
│   │  [Iconos: .NET] [C#] [Azure] [DDD] [SOLID]      │       │
│   │                                                   │       │
│   └─────────────────────────────────────────────────┘       │
│                                                               │
│                     [Scroll indicator ↓]                      │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎨 Código HTML + Tailwind

```html
<section class="
  relative
  min-h-screen
  flex items-center justify-center
  bg-gradient-to-b from-bg-primary via-bg-primary to-bg-secondary
  px-6 md:px-12 lg:px-24
  py-20
">
  <!-- Efecto de fondo (opcional - grid pattern) -->
  <div class="absolute inset-0 bg-[url('/img/grid-pattern.svg')] opacity-5"></div>

  <!-- Contenedor principal -->
  <div class="relative z-10 max-w-5xl mx-auto text-center">

    <!-- Badge de estado -->
    <div class="flex justify-center mb-8 animate-fade-in">
      <span class="
        inline-flex items-center gap-2
        px-4 py-2
        bg-success/10
        text-success
        text-sm font-medium
        rounded-full
        border border-success/20
        backdrop-blur-sm
      ">
        <span class="w-2 h-2 bg-success rounded-full animate-pulse"></span>
        Disponible para proyectos
      </span>
    </div>

    <!-- Saludo + Nombre -->
    <p class="
      text-lg md:text-xl
      text-text-tertiary
      font-medium
      mb-4
      animate-fade-in-up
      animation-delay-100
    ">
      Hola, soy Amador López
    </p>

    <!-- Headline Principal -->
    <h1 class="
      text-4xl sm:text-5xl md:text-6xl lg:text-7xl
      font-extrabold
      tracking-tight
      leading-none
      text-text-primary
      mb-6
      animate-fade-in-up
      animation-delay-200
    ">
      Senior Software
      <span class="
        block
        bg-gradient-to-r from-primary-400 via-primary-500 to-accent-500
        bg-clip-text text-transparent
      ">
        Engineer
      </span>
    </h1>

    <!-- Subheadline - Stack -->
    <p class="
      text-xl md:text-2xl
      text-text-secondary
      font-medium
      leading-relaxed
      mb-6
      animate-fade-in-up
      animation-delay-300
    ">
      Especializado en
      <span class="text-tech-dotnet font-semibold">.NET</span> |
      <span class="text-tech-dotnet font-semibold">C#</span> |
      <span class="text-primary font-semibold">Clean Architecture</span>
      <br class="hidden md:block">
      <span class="text-primary font-semibold">Domain-Driven Design</span> |
      <span class="text-tech-azure font-semibold">Azure Cloud</span>
    </p>

    <!-- Descripción corta -->
    <p class="
      max-w-2xl mx-auto
      text-base md:text-lg
      text-text-tertiary
      leading-relaxed
      mb-10
      animate-fade-in-up
      animation-delay-400
    ">
      Más de 25 años construyendo software de calidad, liderando equipos
      y aplicando principios de Craftsmanship para resolver problemas complejos
      con soluciones elegantes y mantenibles.
    </p>

    <!-- CTAs -->
    <div class="
      flex flex-col sm:flex-row
      items-center justify-center
      gap-4
      mb-12
      animate-fade-in-up
      animation-delay-500
    ">
      <!-- Primary CTA -->
      <a href="/cv/amador-lopez-cv.pdf" download class="
        inline-flex items-center gap-2
        px-8 py-4
        bg-primary-500 hover:bg-primary-400 active:bg-primary-600
        text-text-primary font-semibold text-base
        rounded-lg
        transition-all duration-200 ease-in-out
        shadow-lg shadow-primary-500/20 hover:shadow-xl hover:shadow-primary-400/30
        focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-bg-primary
        transform hover:scale-105 active:scale-100
      ">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 3a1 1 0 00-1 1v8.586l-2.293-2.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l4-4a1 1 0 00-1.414-1.414L11 12.586V4a1 1 0 00-1-1z"/>
          <path d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"/>
        </svg>
        Descargar CV
      </a>

      <!-- Secondary CTA -->
      <a href="/proyectos" class="
        inline-flex items-center gap-2
        px-8 py-4
        bg-bg-tertiary hover:bg-bg-overlay
        text-text-primary font-semibold text-base
        rounded-lg
        border border-border hover:border-border-emphasis
        transition-all duration-200 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-bg-primary
      ">
        Ver Proyectos
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"/>
        </svg>
      </a>
    </div>

    <!-- Stack Visual - Iconos/Badges -->
    <div class="
      flex flex-wrap
      items-center justify-center
      gap-3
      animate-fade-in-up
      animation-delay-600
    ">
      <span class="px-4 py-2 bg-tech-dotnet/10 text-tech-dotnet text-sm font-medium rounded-lg border border-tech-dotnet/20">
        .NET 10
      </span>
      <span class="px-4 py-2 bg-tech-dotnet/10 text-tech-dotnet text-sm font-medium rounded-lg border border-tech-dotnet/20">
        C# 14
      </span>
      <span class="px-4 py-2 bg-tech-azure/10 text-tech-azure text-sm font-medium rounded-lg border border-tech-azure/20">
        Azure
      </span>
      <span class="px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-lg border border-primary/20">
        DDD
      </span>
      <span class="px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-lg border border-primary/20">
        SOLID
      </span>
      <span class="px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-lg border border-primary/20">
        TDD
      </span>
      <span class="px-4 py-2 bg-tech-typescript/10 text-tech-typescript text-sm font-medium rounded-lg border border-tech-typescript/20">
        TypeScript
      </span>
    </div>

  </div>

  <!-- Scroll indicator -->
  <div class="
    absolute bottom-8 left-1/2 transform -translate-x-1/2
    animate-bounce
  ">
    <a href="#about" class="
      flex flex-col items-center
      text-text-tertiary hover:text-primary
      transition-colors duration-200
    ">
      <span class="text-sm font-medium mb-2">Descubre más</span>
      <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M10 3a1 1 0 01.707.293l7 7a1 1 0 01-1.414 1.414L10 5.414 3.707 11.707a1 1 0 01-1.414-1.414l7-7A1 1 0 0110 3z" clip-rule="evenodd"/>
      </svg>
    </a>
  </div>

</section>
```

---

## ✨ Animaciones (CSS Custom)

```css
/* src/styles/animations.css */

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

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

.animate-fade-in {
  animation: fade-in 0.8s ease-out forwards;
}

.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out forwards;
  opacity: 0; /* Start invisible */
}

/* Animation delays */
.animation-delay-100 {
  animation-delay: 0.1s;
}

.animation-delay-200 {
  animation-delay: 0.2s;
}

.animation-delay-300 {
  animation-delay: 0.3s;
}

.animation-delay-400 {
  animation-delay: 0.4s;
}

.animation-delay-500 {
  animation-delay: 0.5s;
}

.animation-delay-600 {
  animation-delay: 0.6s;
}
```

---

## 📱 Responsive Behavior

### Mobile (<640px)
- Títulos reducidos: `text-4xl`
- Stack en 2 líneas
- Botones apilados verticalmente
- Padding lateral: `px-6`

### Tablet (640px - 1024px)
- Títulos medianos: `text-5xl`
- Botones en fila
- Padding: `px-12`

### Desktop (>1024px)
- Títulos grandes: `text-7xl`
- Layout espaciado
- Padding: `px-24`

---

## 🎨 Variantes de Diseño (Alternativas)

### Opción A: Con Avatar/Foto
```html
<!-- Añadir antes del saludo -->
<div class="mb-8 animate-fade-in">
  <img
    src="/img/amador-avatar.jpg"
    alt="Amador López"
    class="w-32 h-32 rounded-full mx-auto border-4 border-primary-500/20 shadow-xl"
  />
</div>
```

---

### Opción B: Con Stats (Métricas)
```html
<!-- Añadir después de los CTAs -->
<div class="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-12">
  <div class="text-center">
    <div class="text-4xl font-bold text-primary mb-2">25+</div>
    <div class="text-sm text-text-tertiary">Años de experiencia</div>
  </div>
  <div class="text-center">
    <div class="text-4xl font-bold text-accent mb-2">100+</div>
    <div class="text-sm text-text-tertiary">Proyectos completados</div>
  </div>
  <div class="text-center">
    <div class="text-4xl font-bold text-emphasis mb-2">15+</div>
    <div class="text-sm text-text-tertiary">Equipos liderados</div>
  </div>
</div>
```

---

### Opción C: Con Fondo Ilustrado
```html
<!-- Background ilustración (abstracta, geométrica) -->
<div class="absolute inset-0 overflow-hidden opacity-10">
  <svg viewBox="0 0 1000 1000" class="w-full h-full">
    <!-- SVG pattern abstracto -->
  </svg>
</div>
```

---

## 🎯 Jerarquía Visual (Reading Order)

1. **Badge "Disponible"** → Captura atención, estado actual
2. **Nombre** → Identificación personal
3. **"Senior Software Engineer"** → Rol principal (gradient destaca)
4. **Stack tecnológico** → Especialización inmediata
5. **Descripción** → Contexto y valor
6. **CTAs** → Conversión (Descargar CV = acción principal)
7. **Badges de tecnologías** → Credibilidad técnica
8. **Scroll indicator** → Invitación a explorar

---

## ✅ Checklist de Implementación

- [ ] Crear `src/styles/animations.css`
- [ ] Importar animations en Layout.astro
- [ ] Reemplazar contenido de `src/pages/index.astro`
- [ ] Añadir archivo CV en `public/cv/amador-lopez-cv.pdf`
- [ ] Crear página `/proyectos` (o ajustar link)
- [ ] Testear responsive en mobile/tablet/desktop
- [ ] Validar contraste de colores
- [ ] Verificar animaciones en diferentes navegadores

---

## 🔥 Puntos Clave de Conversión

1. **3 segundos para entender quién eres:** ✅ Headline clara
2. **Stack visible inmediatamente:** ✅ Badges tecnológicos
3. **CTA principal destacado:** ✅ "Descargar CV" con contraste
4. **Seniority comunicada:** ✅ "Senior" + "25 años"
5. **Profesionalismo:** ✅ Diseño limpio, moderno, sin distracciones

---

**Siguiente paso:** Diseñar Header con navegación mejorada.
