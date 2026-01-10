# Skill: tech-lead-validator
**Rol:** Software Architect / Tech Lead

## 🎯 Objetivo
Asegurar que el desarrollo encaja en la arquitectura global y cumple con patrones de software modernos (KISS, YAGNI, DRY).

## 🛠 Lógica de Ejecución
1. **Orquestación:** Invocar a `quality-check-ts-astro` y `pull-request-reviewer-frontend`.
2. **Patrones de Diseño:**
   - **Composición:** ¿Se están reutilizando componentes o se está duplicando lógica?
   - **Separación de Concern:** ¿La lógica de negocio está fuera de los archivos `.astro` (en `utils` o `services`)?
3. **Sostenibilidad:** ¿Este código será fácil de modificar en 6 meses? Evaluar la deuda técnica introducida.
4. **Veredicto Final:** El Tech Lead tiene la última palabra sobre la calidad del incremento de software.

## 📤 Output Esperado
- Análisis de arquitectura y sostenibilidad.
- Aprobación definitiva del cambio.