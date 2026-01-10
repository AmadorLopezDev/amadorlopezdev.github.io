# TypeScript & Astro Style Guide: Senior Standards

Este manual define las reglas de codificación obligatorias para este proyecto. Claude Code debe usarlo como base para todas las refactorizaciones y revisiones.

---

## 1. Tipado Estricto y Semántico
- **No Any:** El uso de `any` está estrictamente prohibido. Si un tipo es desconocido, usar `unknown` y realizar un type guard.
- **Interfaces vs Types:** - Usar `interface` para definir la estructura de objetos y componentes (props).
  - Usar `type` para uniones, intersecciones y alias de tipos primitivos.
- **Tipos Nominales (Branding):** Para IDs críticos, usar marcas de tipo para evitar confusiones entre diferentes identificadores (ej. `type PostId = string & { __brand: 'PostId' }`).

## 2. Principios de Programación Limpia (TS)
- **Inmutabilidad:** - Preferir `const` sobre `let`.
  - Usar `Readonly<T>` o `readonly` en arrays para evitar mutaciones accidentales.
- **Funciones Puras:** Extraer la lógica de cálculo a funciones puras que no dependan del estado global o de variables externas.
- **Naming:** - Booleans: Deben empezar con un prefijo (`is`, `has`, `should`).
  - Funciones: Deben empezar con un verbo de acción.
  - Componentes: PascalCase.

## 3. Estándares para Componentes Astro
- **Props Validation:** Todas las entradas de un componente deben estar tipadas en la interfaz `Props`.
- **Logic Separation:** La lógica compleja de obtención de datos o filtrado debe residir en el "frontmatter" (la zona entre los `---`) o en archivos `.ts` externos, dejando el HTML (`template`) lo más limpio posible.
- **Fragmentos:** Evitar el "Div Soup". Usar fragmentos `<>` o etiquetas semánticas de HTML5.

## 4. Patrones de Software Aplicados
- **Early Return:** No anidar lógica dentro de `if`. Validar y salir lo antes posible.
- **Composition over Inheritance:** En la UI, usar slots y props para extender componentes en lugar de crear jerarquías complejas.
- **Single Responsibility (SRP):** Un componente Astro solo debe encargarse de una pieza de la interfaz o de una lógica de presentación específica.

## 5. Tailwind CSS & Estilos
- **Design System:** Usar exclusivamente las variables definidas en `tailwind.config.mjs`.
- **Class Ordering:** Seguir un orden lógico (Layout -> Box Model -> Typography -> Visuals -> Interaction).
- **No Class Strings Dinámicas:** Preferir el uso de la librería `clsx` o `tailwind-merge` para gestionar clases condicionales de forma limpia.