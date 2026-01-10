# Skill: pull-request-reviewer-frontend
**Rol:** Senior Frontend Reviewer

## 🎯 Objetivo
Validar la integridad de los cambios, la coherencia visual y la red de seguridad técnica en el entorno Astro.

## 🛠 Lógica de Ejecución
1. **Verificación de Tipado:** Ejecutar `tsc --noEmit` o `astro check` para asegurar que no hay errores de TypeScript.
2. **Coherencia de Estilos:** Verificar que se usa **Tailwind CSS** de forma consistente. Prohibido el uso de estilos inline o valores arbitrarios no configurados (`text-[13px]`).
3. **Optimización de Assets:** Revisar que las imágenes usen el componente `<Image />` de Astro y que los metadatos SEO estén presentes.
4. **Validación de Contenido:** Si se han modificado archivos `.md`, verificar que cumplen el esquema de **Content Collections** de Zod.

## 📤 Output Esperado
- Resumen técnico del impacto del cambio.
- Veredicto: [LISTO PARA MERGE] o [REFACTORIZACIÓN REQUERIDA].