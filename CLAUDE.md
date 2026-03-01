# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Propósito del Repositorio

Este es un **repositorio de configuración de Claude Code**, NO un proyecto de código. Contiene dos equipos de desarrollo:
- **Frontend Team** — Diseño web y desarrollo frontend (Astro, TypeScript, Tailwind CSS)
- **Backend Team** — Arquitectura de software y desarrollo backend (.NET 10, C# 14)
- **Sistema de diseño completo** (colores, tipografía, componentes, interacciones)
- **Workflows y comandos personalizados** para automatización

**Proyecto objetivo:** Sitio personal de Senior Software Engineer. Frontend con Astro + TypeScript. Backend con .NET 10 / C# 14.

---

## Estructura de Directorios

```
.claude/
├── agents/              # Agentes autónomos (coordinadores + validadores)
├── commands/            # Comandos Spec-Kit + utilidades
├── design/              # Sistema de diseño UI/UX completo
├── rules/               # TypeScript Style Guide
├── specs/               # Specs en carpetas: spec.md + plan.md + fase-NN.md
└── skills/
    ├── frontend-team/   # Equipo Frontend Web (13 skills)
    ├── backend-team/    # Equipo Backend & Arquitectura (5 skills)
    └── workflows/       # content-creation (pipeline de artículos)
```

---

## Comandos Personalizados

### Flujo Spec-Kit (principal)
- `/project.constitution` — Carga contexto resumido del proyecto
- `/project.specify <name> [brief]` — Crea `specs/<name>/spec.md`. El segundo argumento es opcional: ruta a un archivo de contexto o texto libre. Si se aporta, infiere los campos del brief y omite las preguntas interactivas.
- `/project.plan <name>` — Crea `specs/<name>/plan.md` + archivos de fase (sin implementar)
- `/project.implement <name>` — Implementa fase a fase: revisión + confirmación + marcado
- `/project.close <name>` — Cierra la spec: valida completitud, actualiza estado y genera commit

Cada fase = baby commit independiente. No avanza sin revisión aprobada y confirmación del usuario.
El cierre es el paso final obligatorio: marca la spec como `completed` y genera el commit de documentación.

### Comandos Adicionales
- `/project.help` — Referencia rápida de comandos, agentes y flujos
- `/dev-pickup <folder>` — Escanea specs y enruta a skills (flujo alternativo)
- `/generate-content <file>` — Genera artículos técnicos C#/.NET desde brief
- `/audit` — Actualiza dependencias Astro (taze → install → audit → check → build)

---

## Sistema de Skills

### Estructura de Skills (Anthropic Standard)

Todos los skills siguen la estructura oficial de Anthropic:
- Cada skill está en su propia carpeta
- El archivo principal se llama `SKILL.md` (mayúsculas)
- Carpetas opcionales: `scripts/` (código ejecutable), `resources/` (templates, datos)


### Equipo Frontend (`frontend-team/`) — 13 skills

- **ux-audit/**: Análisis de navegación y arquitectura de información
- **ui-styling/**: Sistema de diseño visual con Tailwind CSS
- **interaction-polish/**: Micro-interacciones, transiciones, estados
- **frontend-engine/**: Pipeline de contenido en Astro (Content Collections, imágenes, slugs)
- **quality-checker/**: Object Calisthenics (9 reglas), SOLID, DRY, KISS, YAGNI, magic numbers/strings, política de comentarios, estándares TypeScript/Astro
- **code-reviewer/**: Revisión de código frontend (tipado, estilos, assets)
- **tech-lead/**: Validación arquitectónica frontend (composición, Design System, deuda técnica)
- **seo-specialist/**: Optimización on-page, JSON-LD, meta tags, Core Web Vitals
- **technical-writer/**: Redacción técnica senior
- **creative-producer/**: Contenido creativo y narrativo
- **content-corrector/**: Corrección editorial y estilo
- **social-media/**: Contenido para LinkedIn y redes sociales
- **image-generator/**: Generación de prompts e imágenes para artículos

*Usar cuando:* desarrollo frontend, diseño de componentes, contenido del blog, SEO, auditorías de usabilidad.

### Equipo Backend (`backend-team/`) — 5 skills

- **software-architect/**: Clean Architecture, DDD (Bounded Contexts, Aggregates, Value Objects), Vertical Slices, SOLID
- **dotnet-developer/**: Estándares de código C# 14 y .NET 10 (async/await, nullable strict, primary constructors, tests AAA)
- **quality-checker/**: Object Calisthenics (9 reglas), SOLID, DRY, KISS, YAGNI, magic numbers/strings, política de comentarios, anti-patrones async, inmutabilidad
- **code-reviewer/**: Revisión backend (DI, tests AAA, contratos API, rendimiento, N+1)
- **tech-lead/**: Validación arquitectónica backend (capas, Bounded Contexts, deuda técnica)

*Usar cuando:* desarrollo backend, diseño de dominio, revisión de código .NET, validación arquitectónica.

### Workflows (`workflows/`) — 1 pipeline

- **content-creation/**: Redacción → Pulido → SEO → Imagen → Social → astro check

*Usar cuando:* generación de artículos del blog con `/generate-content`.

Los pipelines de calidad pre-commit ahora son **agentes coordinadores** en `.claude/agents/`:
- `coordinator-frontend-precommit` — Quality → Astro Check → SEO → Code Review → Tech Lead
- `coordinator-backend-precommit` — Quality → Build → Test → Format → Code Review → Tech Lead

---

## Sistema de Diseño

### Ubicación
Todos los specs de diseño están en `.claude/design/`:
- **ui-design-system-complete.md**: Documento maestro
- **color-palette.md**: Paleta completa con contraste WCAG AAA
- **typography-scale.md**: Escala tipográfica Major Third (1.25)
- **component-specs.md**: Especificaciones de Button, Card, Badge
- **interaction-design-complete.md**: Transiciones, scroll effects, loading states
- **hero-section-design.md**: Diseño del Hero con CTAs
- **header-footer-design.md**: Especificaciones de navegación

### Principios de diseño
1. **Dark theme moderno** (inspirado en GitHub Dark, Linear, Vercel)
2. **Conversión priorizada** (CTAs visibles, CV accesible)
3. **Accesibilidad WCAG AA** (contraste validado, navegación por teclado)
4. **Performance-first** (will-change, passive listeners, reduced-motion)

### Paleta de colores (referencia rápida)
- Background: `#0D1117` (primary), `#161B22` (secondary)
- Primary: `#3B82F6` (CTAs, enlaces)
- Accent: `#10B981` (Success, badges)
- Text: `#F0F6FC` (primary), `#C9D1D9` (secondary)

---

## Estándares de Código

### TypeScript (ver `.claude/rules/typescript-style-guide.md`)
- **Tipado estricto**: `any` prohibido, usar `unknown` con type guards
- **Interfaces vs Types**: `interface` para objetos, `type` para uniones/alias
- **Inmutabilidad**: Preferir `const`, usar `Readonly<T>` en arrays
- **Naming**: Booleans con `is/has/should`, funciones con verbo de acción

### Astro
- **Props validation**: Todas las props tipadas en interfaz `Props`
- **Logic separation**: Lógica compleja en frontmatter o archivos `.ts` externos
- **Fragmentos**: Evitar "Div Soup", usar `<>` o etiquetas semánticas HTML5

### Tailwind CSS
- **Design System**: Usar solo variables de `tailwind.config.mjs`
- **Class ordering**: Layout → Box Model → Typography → Visuals → Interaction
- **Clases condicionales**: Usar `clsx` o `tailwind-merge`

### Reglas transversales (ambos equipos)
- **Magic numbers/strings**: Todo valor literal con significado debe estar en una constante o enum nombrado. Excepciones: `0`, `1`, `true`, `false`, string vacío.
- **Comentarios**: Prohibidos si re-explican el código. Solo se permiten cuando documentan una decisión de negocio no inferible del código.
- **Object Calisthenics**: Las 9 reglas son obligatorias en ambos equipos. Cada violación es un bloqueador en el quality-checker.
- **Principios de software**: DRY, SOLID (los 5), KISS, YAGNI, Law of Demeter, Fail Fast, Separation of Concerns, Composición sobre herencia, Single Level of Abstraction.

### C# 14 / .NET 10
- **Async/Await nativo**: `.Result` prohibido, usar `CancellationToken`
- **Nullable strict**: `<Nullable>enable</Nullable>` obligatorio
- **Sintaxis moderna**: primary constructors, required members, pattern matching, file-scoped namespaces
- **Tests**: xUnit con patrón AAA, nombres `MetodoEnTiempo_Cuando_Entonces`
- **Arquitectura**: Clean Architecture, DDD, Vertical Slices, DI con ciclo de vida apropiado

---

## Roadmap de Rediseño

**Estado actual:** Fase 3 completada (Interaction Design)
**Siguiente fase:** Frontend Engineering (implementación)

### Fases completadas
1. ✅ **UX Audit** - Análisis de estructura y propuesta de valor
2. ✅ **UI Design** - Sistema de diseño completo (7 documentos)
3. ✅ **Interaction Design** - Transiciones, scroll effects, loading states (4 documentos)

### Siguiente: Implementación
Ver `.claude/roadmap/redesign-roadmap.md` para tareas detalladas por sprint:
- Sprint 1: Hero Section + elementos de conversión
- Sprint 2: Navegación y categorías
- Sprint 3: Optimización y validación

---

## Validación de Calidad

### Definition of Done — Frontend
Un cambio frontend no está completo hasta que pase:
1. **Quality Check** (Object Calisthenics, TypeScript)
2. **Astro Check** (`npx astro check` sin errores)
3. **SEO Optimization** (metadatos, estructura de encabezados)
4. **Code Review** (arquitectura frontend, estilos, assets)
5. **Tech Lead Approval** (composición, Design System)

### Definition of Done — Backend
Un cambio backend no está completo hasta que pase:
1. **Quality Check** (Object Calisthenics C#, SOLID, async)
2. **Build** (`dotnet build` sin errores)
3. **Tests** (`dotnet test` todos pasando)
4. **Formato** (`dotnet format` sin diffs)
5. **Code Review** (DI, contratos API, rendimiento)
6. **Arquitectura** (Clean Architecture, DDD, Vertical Slices)
7. **Tech Lead Approval** (integridad arquitectónica)

### Comandos de validación
```bash
# Frontend
npx astro check          # Validar TypeScript y sintaxis Astro
npm run build            # Build completo
npx taze -u              # Actualizar dependencias

# Backend
dotnet build             # Build del proyecto
dotnet test              # Ejecutar tests unitarios
dotnet format            # Verificar formato de código
```

---

## Estructura de Skills - Estándar Anthropic

Este repositorio sigue la [estructura oficial de Anthropic](https://github.com/anthropics/claude-cookbooks/tree/main/skills) para skills:

```
skill-name/
├── SKILL.md              # OBLIGATORIO: Instrucciones para Claude
├── scripts/              # OPCIONAL: Código ejecutable (Python, JS, Shell)
└── resources/            # OPCIONAL: Templates, datos, archivos de referencia
```

### Convenciones de Nomenclatura
- **Carpetas**: kebab-case sin prefijo `skill-` (ej: `quality-checker/`)
- **Archivo principal**: Siempre `SKILL.md` en MAYÚSCULAS
- **Frontmatter YAML**: Obligatorio en cada SKILL.md con estos campos:

```yaml
---
skill_id: unique-identifier
name: Nombre Descriptivo
version: 1.0.0                          # semver: MAJOR.MINOR.PATCH
category: frontend-team|backend-team|workflows
team: frontend-team|backend-team        # equipo al que pertenece
role: Rol Profesional
last_updated: 2026-02-03
author: human|claude
status: active|deprecated|experimental
---
```

**Documentación completa:** `.claude/SKILL_CONVENTIONS.md`

### Mantenimiento de Skills

**Añadir un nuevo skill:**
1. Crear carpeta: `.claude/skills/<frontend-team|backend-team>/<skill-name>/`
2. Crear `SKILL.md` con frontmatter YAML completo (incluido campo `team`)
3. Incluir secciones obligatorias: Propósito, Contexto de Activación, Instrucciones, Criterios de Éxito, Output Esperado
4. Actualizar este CLAUDE.md con el nuevo skill en el equipo correspondiente

**Actualizar un skill existente:**
1. Editar `SKILL.md`
2. Incrementar `version` en frontmatter (semver)
3. Actualizar `last_updated`

**Deprecar un skill:**
1. Cambiar `status: deprecated` en frontmatter
2. Mantener 6 meses antes de eliminar
3. Actualizar este CLAUDE.md

### Checklist antes de considerar un skill completo
- [ ] Carpeta con nombre en kebab-case
- [ ] Archivo `SKILL.md` presente en mayúsculas
- [ ] Frontmatter YAML completo con todos los campos
- [ ] Secciones obligatorias presentes
- [ ] Al menos 1 ejemplo con input/output
- [ ] Referencias a skills relacionados

---

## Convenciones Importantes

1. **No crear código nuevo aquí**: Este repo es solo configuración
2. **Seguir estructura Anthropic**: Cada skill en carpeta con `SKILL.md`
3. **Workflows secuenciales**: Los workflows ejecutan skills en orden específico
4. **Sistema de diseño es fuente de verdad**: Cualquier decisión visual debe consultarse primero
5. **SEO es parte del DoD**: No dar por finalizado contenido sin metadatos optimizados
6. **Versionado semántico**: Incrementar versión en frontmatter según cambios

---

## Referencias Externas

- **Proyecto objetivo**: Sitio personal construido con Astro (ubicación no especificada en este repo)
- **Stack Frontend**: Astro, TypeScript, Tailwind CSS
- **Stack Backend**: .NET 10 (LTS), C# 14, Clean Architecture, DDD
