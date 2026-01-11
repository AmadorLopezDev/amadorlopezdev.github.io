---
title: "El arte de nombrar: Semántica sobre Redundancia"
description: "Descubre cómo eliminar la redundancia en nombres de clases y propiedades usando C# 14 y .NET 10, aplicando principios de Clean Code para reducir la carga cognitiva."
date: "2025-01-11"
layout: ../../layouts/BlogPost.astro
tags: ["C#", "Clean Code", "Naming", "Best Practices", ".NET"]
image: "/img/blog/2025-01-11-el-arte-de-nombrar.webp"
imageAlt: "Código C# mostrando la diferencia entre nombres redundantes (ProductName, ProductPrice) y nombres limpios (Name, Price) con IntelliSense"
---

En el mundo del desarrollo de software, hay un jutsu fundamental que todo ninja dev debe dominar: **el arte de nombrar**. No se trata solo de poner nombres técnicamente correctos, sino de crear código que se lea como una historia bien escrita, donde cada nombre comunica su propósito sin necesidad de explicaciones adicionales.

Como diría Kakashi sensei: *"Un buen ninja no necesita gritar para ser escuchado"*. Del mismo modo, un buen nombre no necesita redundancia para ser entendido.

## El Problema: Cuando los nombres gritan demasiado

Imagina que estás revisando código heredado (Legacy Code) y te encuentras con algo así:

```csharp
namespace LegacyEcommerce;

public class Product
{
    public int ProductId { get; set; }
    public string ProductName { get; set; }
    public string ProductDescription { get; set; }
    public decimal ProductPrice { get; set; }
    public string ProductCategory { get; set; }
    public bool ProductIsActive { get; set; }

    public void UpdateProductPrice(decimal newProductPrice)
    {
        ProductPrice = newProductPrice;
    }
}
```

¿Qué está mal aquí? **Todo**. Cada propiedad grita "¡SOY DE PRODUCTO!" cuando ya sabemos que estamos dentro de la clase `Product`. Es como si Naruto dijera en cada frase: "Yo, Naruto Uzumaki, ninja de la aldea oculta de la hoja, voy a comer ramen de Naruto Uzumaki en el puesto de ramen favorito de Naruto Uzumaki".

### El costo cognitivo de la redundancia

Cuando escribes código así, obligas al lector a procesar información innecesaria:

1. **Ruido visual**: `product.ProductName` vs `product.Name` - ¿cuál prefieres leer 50 veces al día?
2. **IntelliSense saturado**: Al escribir `product.` te aparecen todas las propiedades comenzando con "Product...", perdiendo la ventaja del autocompletado semántico.
3. **Refactorización dolorosa**: Si cambias `Product` a `Item`, ¿vas a renombrar `ProductName` a `ItemName`? ¿O peor, dejarás `ProductName` en la clase `Item`?

## La Solución: Screaming Names y Contexto Semántico

El concepto de **Screaming Names** (Nombres que Gritan) nos dice que el contexto importa. Si ya estás dentro de una clase `Product`, no necesitas repetir "Product" en cada miembro.

### Refactorización con C# 14 y .NET 10

Veamos cómo transformar ese código legacy en algo digno de un Senior:

```csharp
namespace ModernEcommerce;

public sealed class Product(
    int id,
    string name,
    string description,
    Money price,
    Category category)
{
    public int Id { get; init; } = id;
    public string Name { get; init; } = name;
    public string Description { get; init; } = description;
    public Money Price { get; private set; } = price;
    public Category Category { get; init; } = category;
    public bool IsActive { get; private set; } = true;

    public void UpdatePrice(Money newPrice)
    {
        if (newPrice.Amount <= 0)
            throw new ArgumentException("El precio debe ser mayor que cero", nameof(newPrice));

        Price = newPrice;
    }

    public void Deactivate() => IsActive = false;
}
```

### ¿Qué cambió y por qué?

### 1. **Primary Constructors** (C# 12+)
```csharp
public sealed class Product(int id, string name, ...)
```
- Declaración concisa de dependencias en la firma de la clase.
- Reduce boilerplate sin sacrificar claridad.
- Los parámetros se usan directamente en las inicializaciones.

### 2. **Nombres limpios sin prefijos**
```csharp
// ❌ Antes
public int ProductId { get; set; }
public string ProductName { get; set; }

// ✅ Ahora
public int Id { get; init; }
public string Name { get; init; }
```

**Justificación técnica:**
- El contexto `Product` ya está dado por la clase.
- IntelliSense ahora muestra `product.Name` directamente.
- La lectura del código se vuelve fluida: `var name = product.Name;`

### 3. **Encapsulación mediante `init` y `private set`**
```csharp
public Money Price { get; private set; } = price;
public bool IsActive { get; private set; } = true;
```

**Justificación técnica:**
- `init` permite establecer valores solo en la construcción (immutability by default).
- `private set` protege el estado interno, exponiendo solo métodos de comportamiento (`UpdatePrice`, `Deactivate`).
- Aplicamos **Tell, Don't Ask**: le decimos al objeto qué hacer, no le preguntamos por su estado para modificarlo externamente.

### 4. **Value Objects para primitivos**
```csharp
public Money Price { get; private set; }
public Category Category { get; init; }
```

**Justificación técnica:**
- `Money` encapsula lógica de negocio (validaciones, formateo, operaciones).
- `Category` evita el uso de strings mágicos como `"Electronics"`.
- Preparado para Domain-Driven Design (DDD) sin sobreingeniería.

## El antes y después en uso real

### Código Legacy (Carga cognitiva alta)

```csharp
var product = new Product
{
    ProductId = 1,
    ProductName = "Kunai de Entrenamiento",
    ProductDescription = "Arma ninja básica",
    ProductPrice = 25.50m,
    ProductCategory = "Armas",
    ProductIsActive = true
};

// Actualizar precio
product.UpdateProductPrice(30.00m);

// Leer nombre
Console.WriteLine($"Producto: {product.ProductName}");
```

### Código Moderno (Carga cognitiva reducida)

```csharp
var product = new Product(
    id: 1,
    name: "Kunai de Entrenamiento",
    description: "Arma ninja básica",
    price: new Money(25.50m, Currency.USD),
    category: Category.Weapons
);

// Actualizar precio (con validación interna)
product.UpdatePrice(new Money(30.00m, Currency.USD));

// Leer nombre (fluido y natural)
Console.WriteLine($"Producto: {product.Name}");
```

## El poder del IntelliSense bien diseñado

Cuando escribes `product.` en Visual Studio o Rider, ¿qué prefieres ver?

**❌ Opción A (Legacy):**
```
ProductCategory
ProductDescription
ProductId
ProductIsActive
ProductName
ProductPrice
UpdateProductPrice()
```

**✅ Opción B (Moderno):**
```
Category
Deactivate()
Description
Id
IsActive
Name
Price
UpdatePrice()
```

La segunda opción es **escáneable visualmente en menos de un segundo**. No necesitas filtrar mentalmente el prefijo "Product" en cada elemento.

## Principios aplicados

### 1. **Contexto sobre Redundancia**
El nombre de una propiedad debe leerse en el contexto de su contenedor. Si estás en `User`, usa `Name`, no `UserName`.

### 2. **Screaming Names**
Los nombres deben comunicar su propósito inmediatamente, sin necesidad de documentación adicional.

### 3. **Self-Documenting Code**
El código debe ser su propia documentación. Compara:

```csharp
// ❌ Necesita comentario
public string ProductName { get; set; } // Nombre del producto

// ✅ Auto-documentado
public string Name { get; init; }
```

## Casos especiales: Cuándo SÍ usar prefijos

No todo es blanco o negro. Hay casos donde un prefijo puede ser útil:

### Caso 1: Evitar colisiones con palabras reservadas
```csharp
public class EventLog
{
    public string EventType { get; init; } // "Event" es palabra reservada en C#
    public DateTime Timestamp { get; init; }
}
```

### Caso 2: Diferenciar conceptos similares
```csharp
public class Order
{
    public DateTime CreatedAt { get; init; }
    public DateTime CompletedAt { get; init; }
    public DateTime CanceledAt { get; init; }

    // Aquí los sufijos *At ayudan a diferenciar timestamps
}
```

### Caso 3: DTOs y serialización
```csharp
public record ProductDto // DTO = Data Transfer Object
{
    public int ProductId { get; init; } // Puede ser útil al mapear desde diferentes fuentes
    public string ProductName { get; init; }
}
```

**Regla de oro**: Usa prefijos solo cuando añadan valor semántico, no por costumbre.

## Refactorización paso a paso

Si heredaste un proyecto con código legacy, no refactorices todo de golpe. Aplica el **Boy Scout Rule**: *"Deja el código mejor de como lo encontraste"*.

### Paso 1: Identifica las clases más usadas
```bash
# Busca las clases con más referencias
dotnet grep "public class Product" --count
```

### Paso 2: Crea un alias temporal
```csharp
// Durante la transición
public class Product
{
    public string Name { get; init; }

    [Obsolete("Usa Name en su lugar")]
    public string ProductName => Name;
}
```

### Paso 3: Refactoriza gradualmente
- Usa herramientas como Rider o ReSharper para renombrar símbolos.
- Ejecuta tests después de cada cambio.
- Haz commits pequeños y descriptivos.

## Conclusión: El ninja del naming

Como en las artes ninja, dominar el naming requiere práctica y disciplina. No se trata de eliminar palabras por eliminar, sino de **optimizar la transmisión de información**.

Recuerda:
- **Contexto sobre Redundancia**: Si estás en `Product`, no repitas "Product" en cada miembro.
- **Screaming Names**: Los nombres deben comunicar su propósito inmediatamente.
- **IntelliSense es tu aliado**: Diseña nombres pensando en cómo se verán en el autocompletado.
- **Refactoriza con cabeza**: No todo legacy code necesita ser reescrito hoy.

### El camino del ninja dev

¿Estás listo para aplicar estos principios? Empieza hoy mismo:

1. Abre tu proyecto más antiguo.
2. Busca una clase con propiedades redundantes.
3. Refactoriza UNA SOLA clase aplicando estos principios.
4. Ejecuta los tests y observa la diferencia.

El camino del Clean Code es largo, pero cada paso cuenta. Como diría Jiraiya: *"Un verdadero ninja nunca abandona su camino"*.

---

## Ver también

Si te ha gustado este artículo sobre nombres limpios, te recomiendo leer:

- **[Métodos Narrativos: La Regla SRP](/blog/metodos-narrativos-la-regla-srp)** - Aprende a escribir métodos que se lean como un índice de contenidos aplicando Single Responsibility Principle.
- **[Parámetros de Método: Self-Documenting Code](/blog/parametros-de-metodo-self-documenting-code)** - Descubre cómo transformar firmas de métodos crípticas en código auto-documentado usando enums semánticos.

¡Nos vemos en la próxima misión, ninja dev! 🥷
