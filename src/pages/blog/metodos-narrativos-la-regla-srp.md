---
title: "Métodos Narrativos: La Regla de la Única Responsabilidad (SRP)"
description: "Aprende a escribir métodos que se lean como un índice de contenidos aplicando el Single Responsibility Principle con C# 14 y .NET 10."
date: "2025-01-11"
layout: ../../layouts/BlogPost.astro
tags: ["C#", "SOLID", "SRP", "Clean Code", ".NET", "Refactoring"]
image: "/img/blog/2025-01-11-metodos-narrativos-srp.webp"
imageAlt: "Método C# refactorizado mostrando niveles de abstracción claros con nombres narrativos que se leen como un índice de contenidos"
---

Hay un momento en la vida de todo desarrollador en el que abres un método y te preguntas: *"¿Qué hace esto realmente?"*. Después de 200 líneas de código, múltiples niveles de anidación y validaciones mezcladas con lógica de negocio, te das cuenta de que estás frente a un **Método God** (Método Dios).

Como diría Kakashi sensei: *"El que quiere abarcar todo, no domina nada"*. Un método que hace demasiado es como un ninja que intenta usar todos los jutsus a la vez: termina agotado y sin control.

En este artículo vamos a aprender a escribir **métodos narrativos** que se lean como una historia bien estructurada, aplicando el **Single Responsibility Principle (SRP)** del SOLID.

## El Problema: El Método God

Imagina que heredas un sistema de gestión de usuarios y te encuentras con esto:

```csharp
namespace LegacyUserManagement;

public class UserService
{
    private readonly DbContext _db;
    private readonly IEmailService _emailService;

    public UserService(DbContext db, IEmailService emailService)
    {
        _db = db;
        _emailService = emailService;
    }

    public async Task<bool> RegisterUser(string email, string password, string name)
    {
        // Validación
        if (string.IsNullOrEmpty(email) || !email.Contains("@"))
        {
            Console.WriteLine("Email inválido");
            return false;
        }

        if (string.IsNullOrEmpty(password) || password.Length < 8)
        {
            Console.WriteLine("Password debe tener al menos 8 caracteres");
            return false;
        }

        if (string.IsNullOrEmpty(name))
        {
            Console.WriteLine("Nombre no puede estar vacío");
            return false;
        }

        // Verificar duplicados
        var existingUser = await _db.Users
            .FirstOrDefaultAsync(u => u.Email == email);

        if (existingUser != null)
        {
            Console.WriteLine("El usuario ya existe");
            return false;
        }

        // Hash del password
        string hashedPassword;
        using (var sha256 = SHA256.Create())
        {
            var hashBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
            hashedPassword = Convert.ToBase64String(hashBytes);
        }

        // Crear usuario
        var user = new User
        {
            Email = email,
            PasswordHash = hashedPassword,
            Name = name,
            CreatedAt = DateTime.UtcNow,
            IsActive = true
        };

        // Guardar en BD
        _db.Users.Add(user);
        await _db.SaveChangesAsync();

        // Enviar email
        try
        {
            var emailBody = $"Bienvenido {name}, tu cuenta ha sido creada exitosamente.";
            await _emailService.SendAsync(email, "Bienvenido", emailBody);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error enviando email: {ex.Message}");
            // ¿Revertimos la creación del usuario? ¿O continuamos?
        }

        return true;
    }
}
```

### ¿Qué está mal aquí?

Este método viola múltiples principios:

1. **Carga cognitiva extrema**: Para entender qué hace, debes leer TODO el método.
2. **Múltiples responsabilidades**: Valida, verifica duplicados, hashea contraseñas, persiste datos y envía emails.
3. **Difícil de testear**: ¿Cómo pruebas solo la validación sin tocar la base de datos?
4. **Imposible de reutilizar**: Si necesitas validar un email en otro lugar, ¿copias el código?
5. **Nivel de abstracción inconsistente**: Mezcla detalles técnicos (SHA256) con lógica de negocio (registro de usuario).

Como Naruto aprendiendo el Rasengan, necesitas dividir el jutsu en pasos más pequeños antes de dominarlo por completo.

## La Solución: Métodos Narrativos con SRP

El **Single Responsibility Principle** dice que un método debe tener **una única razón para cambiar**. En la práctica, esto significa que un método debe hacer **una sola cosa y hacerla bien**.

### Refactorización: Separación por Niveles de Abstracción

Vamos a transformar ese método god en una narrativa clara:

```csharp
namespace ModernUserManagement;

public sealed class UserRegistrationService(
    IUserRepository userRepository,
    IPasswordHasher passwordHasher,
    IEmailNotifier emailNotifier)
{
    public async Task<Result<User>> RegisterUser(RegisterUserCommand command)
    {
        var validationResult = ValidateInput(command);
        if (validationResult.IsFailure)
            return Result<User>.Failure(validationResult.Error);

        var duplicateCheck = await CheckForDuplicates(command.Email);
        if (duplicateCheck.IsFailure)
            return Result<User>.Failure(duplicateCheck.Error);

        var user = CreateUser(command);

        await PersistUser(user);

        await SendWelcomeEmail(user);

        return Result<User>.Success(user);
    }

    private Result ValidateInput(RegisterUserCommand command)
    {
        if (!IsValidEmail(command.Email))
            return Result.Failure("Email inválido");

        if (!IsValidPassword(command.Password))
            return Result.Failure("Password debe tener al menos 8 caracteres");

        if (string.IsNullOrWhiteSpace(command.Name))
            return Result.Failure("Nombre no puede estar vacío");

        return Result.Success();
    }

    private async Task<Result> CheckForDuplicates(string email)
    {
        var exists = await userRepository.ExistsByEmail(email);

        return exists
            ? Result.Failure("El usuario ya existe")
            : Result.Success();
    }

    private User CreateUser(RegisterUserCommand command)
    {
        var passwordHash = passwordHasher.Hash(command.Password);

        return new User(
            email: command.Email,
            passwordHash: passwordHash,
            name: command.Name,
            createdAt: DateTime.UtcNow
        );
    }

    private async Task PersistUser(User user)
    {
        await userRepository.Add(user);
        await userRepository.SaveChanges();
    }

    private async Task SendWelcomeEmail(User user)
    {
        try
        {
            await emailNotifier.SendWelcomeEmail(user.Email, user.Name);
        }
        catch (EmailDeliveryException ex)
        {
            // Log del error, pero no fallamos el registro
            // El usuario ya está creado, el email es un efecto secundario
            Log.Warning(ex, "Error enviando email de bienvenida a {Email}", user.Email);
        }
    }

    private static bool IsValidEmail(string email) =>
        !string.IsNullOrWhiteSpace(email) && email.Contains('@');

    private static bool IsValidPassword(string password) =>
        !string.IsNullOrWhiteSpace(password) && password.Length >= 8;
}
```

## ¿Qué cambió y por qué?

### 1. **Método público como índice de contenidos**

```csharp
public async Task<Result<User>> RegisterUser(RegisterUserCommand command)
{
    var validationResult = ValidateInput(command);
    var duplicateCheck = await CheckForDuplicates(command.Email);
    var user = CreateUser(command);
    await PersistUser(user);
    await SendWelcomeEmail(user);

    return Result<User>.Success(user);
}
```

**Justificación técnica:**
- **Lectura en 5 segundos**: Puedes entender el flujo completo sin leer implementaciones.
- **Abstracción uniforme**: Cada línea está al mismo nivel de detalle (High-level steps).
- **Autodocumentado**: No necesitas comentarios como `// Validar input`.

### 2. **Métodos privados como detalles de implementación**

```csharp
private Result ValidateInput(RegisterUserCommand command)
{
    if (!IsValidEmail(command.Email))
        return Result.Failure("Email inválido");
    // ...
}
```

**Justificación técnica:**
- **Testeable de forma aislada**: Puedes probar `ValidateInput` sin tocar la base de datos.
- **Reutilizable**: Si necesitas validar input en otro método, ya tienes la función.
- **Cambios localizados**: Si las reglas de validación cambian, solo modificas este método.

### 3. **Uso de Command Pattern**

```csharp
public record RegisterUserCommand(
    string Email,
    string Password,
    string Name
);
```

**Justificación técnica:**
- **Intención explícita**: `RegisterUserCommand` comunica que es una acción.
- **Inmutabilidad**: `record` con parámetros posicionales es inmutable por defecto.
- **Validación centralizada**: Puedes aplicar FluentValidation o DataAnnotations en el Command.

### 4. **Result Pattern para manejo de errores**

```csharp
public async Task<Result<User>> RegisterUser(RegisterUserCommand command)
{
    var validationResult = ValidateInput(command);
    if (validationResult.IsFailure)
        return Result<User>.Failure(validationResult.Error);
    // ...
}
```

**Justificación técnica:**
- **No más excepciones para flujo de negocio**: `Result<T>` hace explícito que un método puede fallar.
- **Railway-Oriented Programming**: Cadena de operaciones que puede fallar en cualquier paso.
- **Testeable**: Puedes verificar `result.IsFailure` sin try-catch.

### Implementación del Result Pattern

```csharp
public readonly record struct Result
{
    public bool IsSuccess { get; init; }
    public bool IsFailure => !IsSuccess;
    public string Error { get; init; }

    public static Result Success() => new() { IsSuccess = true };
    public static Result Failure(string error) => new() { IsSuccess = false, Error = error };
}

public readonly record struct Result<T>
{
    public bool IsSuccess { get; init; }
    public bool IsFailure => !IsSuccess;
    public T Value { get; init; }
    public string Error { get; init; }

    public static Result<T> Success(T value) => new() { IsSuccess = true, Value = value };
    public static Result<T> Failure(string error) => new() { IsSuccess = false, Error = error };
}
```

## Niveles de Abstracción: La Regla del Periodista

Un buen método sigue la estructura de un artículo periodístico:

1. **Título (Nombre del método)**: Dice QUÉ hace.
2. **Subtítulos (Métodos privados)**: Dividen el CÓMO en pasos.
3. **Párrafos (Implementaciones)**: Detalles técnicos específicos.

### ❌ Niveles mezclados (Difícil de leer)

```csharp
public async Task ProcessOrder(int orderId)
{
    var order = await _db.Orders.FindAsync(orderId); // Nivel bajo

    if (order.Items.All(i => i.IsAvailable)) // Nivel medio
    {
        using var transaction = _db.Database.BeginTransaction(); // Nivel bajo
        try
        {
            order.Status = OrderStatus.Processing; // Nivel alto
            await _db.SaveChangesAsync(); // Nivel bajo
            await _emailService.SendAsync(...); // Nivel medio
            transaction.Commit(); // Nivel bajo
        }
        catch { transaction.Rollback(); }
    }
}
```

### ✅ Niveles consistentes (Fácil de leer)

```csharp
public async Task ProcessOrder(int orderId)
{
    var order = await LoadOrder(orderId);

    if (!AreAllItemsAvailable(order))
        return;

    await ExecuteOrderProcessing(order);
    await NotifyCustomer(order);
}
```

## Testabilidad: El verdadero test del SRP

Cuando un método cumple SRP, testearlo es trivial:

### Tests del método refactorizado

```csharp
public class UserRegistrationServiceTests
{
    [Fact]
    public async Task RegisterUser_WithInvalidEmail_ReturnsFailure()
    {
        // Arrange
        var command = new RegisterUserCommand("invalid-email", "password123", "Test User");
        var service = CreateService();

        // Act
        var result = await service.RegisterUser(command);

        // Assert
        Assert.True(result.IsFailure);
        Assert.Contains("Email inválido", result.Error);
    }

    [Fact]
    public async Task RegisterUser_WithValidData_CreatesUser()
    {
        // Arrange
        var command = new RegisterUserCommand("test@example.com", "password123", "Test User");
        var userRepo = new InMemoryUserRepository();
        var service = CreateService(userRepository: userRepo);

        // Act
        var result = await service.RegisterUser(command);

        // Assert
        Assert.True(result.IsSuccess);
        Assert.Single(await userRepo.GetAll());
    }

    [Fact]
    public async Task RegisterUser_WhenEmailFails_UserStillCreated()
    {
        // Arrange
        var command = new RegisterUserCommand("test@example.com", "password123", "Test User");
        var failingEmailNotifier = new FailingEmailNotifier();
        var userRepo = new InMemoryUserRepository();
        var service = CreateService(
            userRepository: userRepo,
            emailNotifier: failingEmailNotifier
        );

        // Act
        var result = await service.RegisterUser(command);

        // Assert
        Assert.True(result.IsSuccess);
        Assert.Single(await userRepo.GetAll());
    }
}
```

**Observa cómo:**
- Cada test verifica **una sola responsabilidad**.
- No necesitamos una base de datos real (usamos `InMemoryUserRepository`).
- Podemos simular fallos en servicios externos (`FailingEmailNotifier`).

## Beneficios del SRP en métodos

### 1. **Lectura exponencialmente más rápida**
- Método God: Leer 100 líneas = 5 minutos
- Método SRP: Leer 5 líneas de alto nivel + drill-down donde sea necesario = 30 segundos

### 2. **Cambios localizados**
```csharp
// Si cambia la regla de validación de passwords
private static bool IsValidPassword(string password) =>
    !string.IsNullOrWhiteSpace(password)
    && password.Length >= 12 // Cambio de 8 a 12
    && password.Any(char.IsDigit) // Nueva regla
    && password.Any(char.IsUpper);
```
Solo modificas **un método**, no 100 líneas de código.

### 3. **Reutilización sin duplicación**
```csharp
public async Task<Result> UpdateUserEmail(int userId, string newEmail)
{
    // Reutilizamos la validación
    if (!IsValidEmail(newEmail))
        return Result.Failure("Email inválido");

    // ... resto de la lógica
}
```

### 4. **Debugging más eficiente**
Cuando falla algo, el stack trace te dice **exactamente dónde**:
```
at UserRegistrationService.CheckForDuplicates(String email) // Aquí falló
at UserRegistrationService.RegisterUser(RegisterUserCommand command)
```

## Patrones relacionados

### 1. **Extract Method (Refactoring)**
Toma un bloque de código y conviértelo en un método con nombre descriptivo.

```csharp
// Antes
var total = items.Sum(i => i.Price * i.Quantity * (1 - i.Discount));

// Después
var total = CalculateTotal(items);

private decimal CalculateTotal(IEnumerable<OrderItem> items) =>
    items.Sum(i => i.Price * i.Quantity * (1 - i.Discount));
```

### 2. **Compose Method (Kent Beck)**
Un método debe hacer una cosa y delegar el resto.

```csharp
// ✅ Composed Method
public async Task ProcessPayment(Order order)
{
    ValidateOrder(order);
    var paymentMethod = SelectPaymentMethod(order);
    await ChargePayment(order, paymentMethod);
    UpdateOrderStatus(order);
}
```

### 3. **Command/Query Separation (CQS)**
- **Command**: Cambia estado, no retorna valor.
- **Query**: Retorna valor, no cambia estado.

```csharp
// ❌ Viola CQS
public User GetAndActivateUser(int userId)
{
    var user = _db.Users.Find(userId);
    user.IsActive = true; // ¡Modifica estado!
    _db.SaveChanges();
    return user;
}

// ✅ Cumple CQS
public User GetUser(int userId) => _db.Users.Find(userId); // Query
public void ActivateUser(int userId) { /* ... */ } // Command
```

## Cuándo NO aplicar SRP extremo

No todo método de una línea es mejor. Evita:

### 1. **Over-engineering trivial**
```csharp
// ❌ Innecesario
private int GetUserId(User user) => user.Id;

// ✅ Usa directamente
var userId = user.Id;
```

### 2. **Métodos que se usan una sola vez**
```csharp
// Si `FormatWelcomeMessage` solo se usa en `SendWelcomeEmail`, déjalo inline
private async Task SendWelcomeEmail(User user)
{
    var message = $"Bienvenido {user.Name}, tu cuenta ha sido creada.";
    await emailNotifier.SendWelcomeEmail(user.Email, message);
}
```

### 3. **Abstracciones prematuras**
No extraigas métodos "por si acaso". Sigue la **Rule of Three**:
- Primera vez: escribe inline.
- Segunda vez: tolera la duplicación.
- Tercera vez: refactoriza.

## Conclusión: El ninja de los métodos narrativos

Un método bien escrito es como un jutsu bien ejecutado: parece simple desde fuera, pero cada movimiento tiene un propósito claro.

Recuerda:
- **Método público = Índice de contenidos**: Alto nivel, fácil de escanear.
- **Métodos privados = Detalles de implementación**: Un nivel más bajo, enfocados en una sola responsabilidad.
- **SRP no es solo para clases**: Aplícalo también a métodos.
- **Testeable = Bien diseñado**: Si es difícil de testear, probablemente viola SRP.

### El camino del ninja dev

¿Estás listo para refactorizar? Empieza hoy mismo:

1. Busca un método de más de 30 líneas en tu proyecto.
2. Identifica al menos 3 responsabilidades diferentes.
3. Extrae cada responsabilidad en un método privado con nombre descriptivo.
4. Ejecuta los tests y observa cómo mejora la legibilidad.

Como diría Rock Lee: *"El trabajo duro nunca traiciona"*. Cada método que refactorizas es un paso más hacia el código limpio.

---

## Ver también

Si te ha interesado la aplicación de SRP en métodos, también te pueden interesar:

- **[El arte de nombrar: Semántica sobre Redundancia](/blog/el-arte-de-nombrar-semantica-sobre-redundancia)** - Elimina la redundancia en nombres de clases y propiedades para reducir la carga cognitiva.
- **[Parámetros de Método: Self-Documenting Code](/blog/parametros-de-metodo-self-documenting-code)** - Transforma firmas de métodos crípticas en código auto-documentado con enums semánticos.

¡Nos vemos en la próxima misión, ninja dev! 🥷
