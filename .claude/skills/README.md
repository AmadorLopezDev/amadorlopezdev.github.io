# 🎯 Skills Directory - Organización por Categorías

Este directorio contiene los **skills** especializados de Claude Code, organizados por categorías funcionales para facilitar su localización y mantenimiento.

---

## 📂 Estructura de Carpetas

```
.claude/skills/
├── development/              # Código, arquitectura, calidad técnica
├── seo-marketing/            # SEO, metadatos, optimización web
├── uix/                      # UX/UI, diseño, interacciones
└── workflows/                # Pipelines, orquestación de tareas
```

---

## 🛠️ development/

**Propósito:** Skills relacionados con desarrollo de software, calidad de código y arquitectura técnica.

| Skill | Rol | Descripción |
|-------|-----|-------------|
| `skill-quality-checker.md` | Craftsmanship Auditor | Valida Object Calisthenics y estándares de TypeScript |
| `skill-code-reviewer.md` | Senior Frontend Developer | Revisión de código y arquitectura frontend |
| `skill-tech-lead.md` | Tech Lead | Validación final de estándares empresariales |
| `skill-frontend-engine.md` | Frontend Engineer | Automatización de pipelines de contenido en Astro |

**Cuándo usar:**
- Validación de código antes de commits
- Revisiones de arquitectura
- Auditorías de calidad técnica
- Automatización de tareas de desarrollo

---

## 🎯 seo-marketing/

**Propósito:** Skills para optimización SEO, visibilidad orgánica y marketing de contenido.

| Skill | Rol | Descripción |
|-------|-----|-------------|
| `skill-seo-specialist.md` | SEO Engineer | Optimización on-page, JSON-LD, meta tags, Core Web Vitals |

**Cuándo usar:**
- Optimización de artículos de blog
- Implementación de metadatos
- Auditoría de SEO técnico
- Generación de sitemaps y datos estructurados

---

## 🎨 uix/

**Propósito:** Skills relacionados con diseño de experiencia de usuario e interfaces.

| Skill | Rol | Descripción |
|-------|-----|-------------|
| `skill-ux-audit.md` | UX Designer / Information Architect | Análisis de navegación y arquitectura de información |
| `skill-ui-styling.md` | UI Designer | Sistema de diseño visual con Tailwind CSS |
| `skill-interaction-polish.md` | Interaction Designer | Micro-interacciones, transiciones y estados |

**Cuándo usar:**
- Auditoría de usabilidad
- Definición de sistema de diseño
- Implementación de interacciones y animaciones
- Mejoras de percepción de calidad

---

## 🔄 workflows/

**Propósito:** Pipelines y orquestación de múltiples skills para flujos de trabajo complejos.

| Workflow | Descripción |
|----------|-------------|
| `workflow-pre-commit.md` | Pipeline de calidad completo (Quality Check → TypeScript → SEO → Code Review → Tech Lead → Commit) |

**Cuándo usar:**
- Antes de crear commits importantes
- Validación completa de Definition of Done
- Flujos de trabajo que requieren múltiples validaciones

---

## 🚀 Cómo Usar los Skills

### Desde la línea de comandos:
```bash
# Ejecutar workflow completo
claude "ejecuta el orchestrate-quality-flow"

# Usar skill específico (ejemplo conceptual)
claude "usa el skill de SEO para optimizar este post"
```

### Desde archivos de configuración:
Los workflows pueden referenciar skills usando rutas relativas:

```markdown
# En workflow-pre-commit.md
1. Ejecutar `../development/skill-quality-checker.md`
2. Ejecutar `../seo-marketing/skill-seo-specialist.md`
```

---

## 📋 Convenciones de Nomenclatura

- **Skills individuales:** `skill-{nombre}.md`
- **Workflows:** `workflow-{nombre}.md`
- **Categorías:** Nombres descriptivos en minúsculas con guiones

---

## 🔗 Referencias

- **Roadmap de diseño:** `.claude/roadmap/redesign-roadmap.md`
- **Reglas de TypeScript:** `.claude/rules/typescript-style-guide.md`
- **Sistema de diseño:** `.claude/design/`

---

## 📝 Notas de Mantenimiento

- **Última reorganización:** 2026-01-10
- **Total de skills:** 9 (4 development, 1 seo-marketing, 3 uix, 1 workflow)
- **Estado:** Todas las referencias actualizadas y funcionales

---

**Mantén este README actualizado cuando agregues o modifiques skills.**
