# AGENTS.md

> Estándar abierto multi-agente. Reconocido por GitHub Copilot, Claude Code, Gemini CLI y otros agentes de IA.

Este repositorio contiene la configuración de un sistema de desarrollo para un sitio personal de Senior Software Engineer. Incluye dos equipos de desarrollo, un sistema de diseño completo y un flujo de trabajo basado en specs.

---

## Proyecto Objetivo

**Tipo**: Sitio personal de Senior Software Engineer
**Frontend**: Astro + TypeScript + Tailwind CSS
**Backend**: .NET 10 (LTS) / C# 14

---

## Flujo de Trabajo Principal

El sistema usa un ciclo de cuatro comandos para gestionar cualquier desarrollo:

```
specify → plan → implement → close
```

1. **specify** — Crea una spec estructurada en `.claude/specs/<name>/spec.md`
2. **plan** — Lee la spec y genera `plan.md` + archivos de fase (`fase-NN-nombre.md`)
3. **implement** — Ejecuta cada fase: implementa → revisa → confirma → avanza
4. **close** — Valida completitud, marca la spec como `completed` y genera el commit de cierre

Cada fase es un baby commit independiente. No se avanza sin revisión aprobada y confirmación del usuario.
El cierre es el paso final obligatorio: documenta que la spec está completada en el historial de git.

---

## Equipos

### Frontend Team

Especializado en Astro, TypeScript, Tailwind CSS y contenido web.

| Skill | Responsabilidad |
|-------|----------------|
| ux-audit | Análisis de navegación y arquitectura de información |
| ui-styling | Sistema de diseño visual con Tailwind CSS |
| interaction-polish | Micro-interacciones, transiciones, estados |
| frontend-engine | Pipeline de contenido Astro (Content Collections) |
| quality-checker | Object Calisthenics, SOLID, estándares TS/Astro |
| code-reviewer | Revisión frontend (tipado, estilos, assets) |
| tech-lead | Validación arquitectónica frontend |
| seo-specialist | Meta tags, JSON-LD, Open Graph, Core Web Vitals |
| technical-writer | Redacción técnica senior |
| creative-producer | Contenido creativo y narrativo |
| content-corrector | Corrección editorial |
| social-media | Contenido para LinkedIn y redes |
| image-generator | Prompts para imágenes de artículos |

### Backend Team

Especializado en .NET 10, C# 14, Clean Architecture y DDD.

| Skill | Responsabilidad |
|-------|----------------|
| software-architect | Clean Architecture, DDD, Vertical Slices |
| dotnet-developer | Estándares C# 14 / .NET 10, async/await, tests AAA |
| quality-checker | Object Calisthenics, SOLID, anti-patrones async |
| code-reviewer | Revisión backend (DI, contratos API, rendimiento) |
| tech-lead | Validación arquitectónica backend |

---

## Principios de Calidad Obligatorios

**Object Calisthenics** (9 reglas — toda violación es un bloqueador):
1. Un nivel de indentación por método
2. No usar `else`
3. Envolver primitivos con significado (Value Objects)
4. Colecciones de primera clase
5. Un punto por línea (Law of Demeter)
6. No abreviar nombres
7. Mantener clases pequeñas (< 50 líneas)
8. Máximo 2 variables de instancia por clase
9. No usar getters/setters (Tell, Don't Ask)

**SOLID**: Los 5 principios aplicados en ambos equipos.

**Magic numbers/strings**: Prohibidos. Todo valor literal con significado → constante o enum nombrado.

**Comentarios**: Prohibidos si re-explican el código. Solo para decisiones de negocio no inferibles.

---

## Comandos Disponibles

### Claude Code (`.claude/commands/`)
- `/project.specify <name>` — Crear spec interactivamente
- `/project.plan <name>` — Generar plan de fases
- `/project.implement <name>` — Implementar fase a fase
- `/project.close <name>` — Cerrar spec: validar completitud, actualizar estado y generar commit
- `/project.constitution` — Ver contexto del proyecto
- `/project.help` — Referencia rápida
- `/generate-content <file>` — Generar artículo técnico C#/.NET
- `/audit` — Actualizar dependencias Astro
- `/dev-pickup <folder>` — Enrutar specs a skills automáticamente

### GitHub Copilot (`.github/prompts/`)
- `/project-specify <name>` — Crear spec interactivamente
- `/project-plan <name>` — Generar plan de fases
- `/project-implement <name>` — Implementar fase a fase
- `/project-close <name>` — Cerrar spec: validar completitud, actualizar estado y generar commit
- `/project-constitution` — Ver contexto del proyecto
- `/project-help` — Referencia rápida
- `/generate-content <file>` — Generar artículo técnico C#/.NET
- `/audit` — Actualizar dependencias Astro

---

## Configuración por Herramienta

| Herramienta | Archivo principal | Instrucciones por tipo | Comandos/Prompts |
|-------------|-------------------|----------------------|----------|
| Claude Code | `CLAUDE.md` (auto-cargado) | `.claude/rules/` | `.claude/commands/` |
| GitHub Copilot | `.github/copilot-instructions.md` | `.github/instructions/` | `.github/prompts/` |

### Instructions auto-activas (GitHub Copilot)

| Archivo | Aplica a | Contenido |
|---------|----------|-----------|
| `typescript.instructions.md` | `*.ts, *.tsx, *.astro` | Tipado estricto, componentes Astro, Tailwind |
| `csharp.instructions.md` | `*.cs` | C# 14, async/await, nullable, tests AAA |
| `quality-checker-frontend.instructions.md` | `*.ts, *.tsx, *.astro` | Object Calisthenics TS, SOLID frontend |
| `quality-checker-backend.instructions.md` | `*.cs` | Object Calisthenics C#, anti-patrones async |
| `design-system.instructions.md` | `*.astro, *.css, tailwind.config.*` | Paleta, tipografía, componentes base |

---

## Sistema de Diseño

Dark theme moderno para el sitio personal. Documentación en `.claude/design/`.

- **Background**: `#0D1117` / `#161B22`
- **Primary**: `#3B82F6`
- **Accent**: `#10B981`
- **Text**: `#F0F6FC` / `#C9D1D9`
- **Tipografía**: Inter + JetBrains Mono (escala Major Third 1.25)
