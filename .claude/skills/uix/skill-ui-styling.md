# Skill: apply-ui-system
**Rol:** UI Designer

## 🎯 Objetivo
Inyectar el sistema de diseño visual (Look & Feel) de forma consistente en toda la solución usando Tailwind CSS.

## 🛠 Lógica de Ejecución
1. **Configuración de Core:** Actualizar `tailwind.config.mjs` con:
   - **Colores:** `primary: #0F172A`, `accent: #38BDF8`, `surface: #F8FAFC`.
   - **Fuentes:** `sans: Inter`, `mono: JetBrains Mono`.
2. **Normalización de Componentes:** Buscar clases de colores "hardcoded" en `src/components/` y sustituirlas por las variables del tema.
3. **Escalado de Espacios:** Aplicar una escala de espaciado consistente (Padding/Margin) basada en múltiplos de 4 (sistema de 8px).
4. **Refactorización de Clases:** Agrupar clases repetitivas en componentes base de Astro para evitar la duplicación de estilos de Tailwind.

## 📤 Output Esperado
- Archivo `tailwind.config.mjs` actualizado.
- Componentes de UI (`Button.astro`, `Card.astro`) con el nuevo estilo visual.
- Layout principal con fondo y tipografía base configurados.