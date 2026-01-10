# Skill: content-sync-engine
**Rol:** Frontend Engineer

## 🎯 Objetivo
Automatizar el pipeline de contenido entre los archivos Markdown y la visualización en Astro.

## 🛠 Lógica de Ejecución
1. **Validación de Esquema:** Ejecutar `astro check` o validar manualmente el Frontmatter de los archivos en `src/content/blog/` contra `src/content/config.ts`.
2. **Gestión de Slugs:** Renombrar archivos si es necesario para asegurar URLs limpias y SEO-friendly.
3. **Inyección de Metadatos:** Asegurar que cada página de artículo tenga los meta-tags de OpenGraph (título, descripción, imagen) para redes sociales.
4. **Optimización de Imágenes:** Procesar imágenes locales usando el componente `<Image />` de Astro para garantizar formatos WebP/AVIF.

## 📤 Output Esperado
- Lista de validación de artículos (Drafts vs Published).
- Generación automática de rutas en el mapa del sitio.
- Optimización de performance en las páginas de lectura.