# Comando: orchestrate-quality-flow
**Tipo:** Pipeline de Calidad Automatizado

## 🎯 Objetivo
Ejecutar el ciclo completo de validación antes de realizar cualquier commit.

## 🛠 Secuencia de Ejecución
1. **Fase 1 (Limpieza):** Ejecutar `skill-quality-checker.md`. Si hay "Else" o niveles de indentación excesivos, detener.
2. **Fase 2 (Integridad):** Ejecutar `astro check`. Si falla el tipado o la estructura de Astro, detener.
3. **Fase 3 (Revisión Senior):** Ejecutar `skill-code-reviewer-frontend.md`.
4. **Fase 4 (Autoridad):** Ejecutar `skill-tech-lead-validator.md`.
5. **Fase 5 (Commit):** Si todo es OK, redactar commit en formato **Conventional Commits** (ej. `refactor(ui): apply object calisthenics to nav component`). En caso de no haber cambios, indicar "No changes to commit". Pero hay que cumplir el flujo con los cambios que existan con la rama principal del repositorio, analizando los commits que se han realizado desde la última integración.

## 🚀 Instrucción para Claude Code
"Claude, no permitas la finalización de ninguna tarea sin que este flujo se complete con éxito. Eres el guardián de la calidad de este portafolio."