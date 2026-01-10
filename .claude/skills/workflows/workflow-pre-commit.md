# Comando: orchestrate-quality-flow
**Tipo:** Pipeline de Calidad Total (Engineering + SEO)

## 🛠 Secuencia de Ejecución
1. **Fase 1 (Calidad de Código):** Ejecutar `../development/skill-quality-checker.md`.
2. **Fase 2 (Validación Técnica):** Ejecutar `astro check`.
3. **Fase 3 (Optimización SEO):** Ejecutar `../seo-marketing/skill-seo-specialist.md`.
   - *Claude generará los metadatos y revisará la jerarquía de encabezados del artículo.*
4. **Fase 4 (Revisión Senior):** Ejecutar `../development/skill-code-reviewer.md`.
5. **Fase 5 (Aprobación Tech Lead):** Ejecutar `../development/skill-tech-lead.md`.
6. **Fase 6 (Commit):** Redactar commit en formato Conventional Commits.

## 🚀 Instrucción para Claude Code
"Claude, el SEO es parte de nuestra definición de 'Hecho' (Definition of Done). No des por finalizado un artículo si no tiene metadatos optimizados y una estructura de encabezados correcta."