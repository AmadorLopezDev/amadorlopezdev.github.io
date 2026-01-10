# Skill: ux-audit-structure
**Rol:** UX Designer / Information Architect

## 🎯 Objetivo
Analizar y reestructurar la navegación y jerarquía de la web para maximizar la conversión de perfiles técnicos (CTOs/Seniors).

## 🛠 Lógica de Ejecución
1. **Mapeo de Rutas:** Escanear `src/pages/` para entender la arquitectura actual.
2. **Auditoría de Jerarquía:** Verificar que el "Hero Section" comunica claramente el stack (.NET/C#) y la propuesta de valor (Senior/Craftsmanship).
3. **Validación de Conversión:** Comprobar la existencia y visibilidad de:
   - Enlace directo al CV (PDF y Web).
   - Acceso a artículos del blog por módulos.
   - Enlaces sociales (GitHub/LinkedIn).
4. **Análisis de Contenido:** Verificar si los artículos en `src/content/blog/` están correctamente categorizados.

## 📤 Output Esperado
- Informe de puntos ciegos en la navegación.
- Propuesta de cambio en el componente `Header.astro` o `Navigation.astro`.
- Propuesta de reordenación de secciones en la `index.astro`.