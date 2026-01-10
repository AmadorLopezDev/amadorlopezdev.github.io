# Skill: quality-check-ts-astro
**Rol:** Craftsmanship Auditor (TypeScript Specialist)

## 🎯 Objetivo
Garantizar que el código TypeScript y los componentes Astro cumplen con estándares de limpieza, sostenibilidad y legibilidad sin comentarios.

## 🛠 Lógica de Ejecución (Estándares de Calidad)
1. **Object Calisthenics (TS Edition):**
   - **Identación:** Máximo un nivel de profundidad por función/componente.
   - **No 'Else':** Uso obligatorio de cláusulas de guarda y retornos tempranos.
   - **Value Objects:** Evitar "Primitive Obsession". Uso de tipos nominales o tipos opacos para IDs y tipos de dominio (ej. `PostId`, `Email`).
2. **TypeScript Estricto:**
   - Prohibido el uso de `any`.
   - Uso de `interface` para contratos de objetos y `type` para uniones/alias.
   - Inmutabilidad: Preferir `readonly` para props y arrays.
3. **Componentes Astro Limpios:**
   - **SRP:** Si un componente tiene más de 100 líneas o hace demasiadas cosas, proponer división.
   - **Props Semánticas:** Nombres que expliquen la intención, no el tipo de dato.
4. **Legibilidad:** El código debe ser "self-explanatory". Si el agente detecta lógica compleja sin nombre semántico, debe exigir la extracción de una función con nombre descriptivo.

## 📤 Output Esperado
- Informe de violaciones de "Código Limpio".
- Sugerencias de refactorización hacia patrones funcionales o de composición.