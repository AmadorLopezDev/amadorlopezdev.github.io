---
title: "Parámetros de Método: El peligro de los tipos primitivos y booleanos"
description: "Descubre cómo transformar firmas de métodos crípticas en código auto-documentado usando enums semánticos y parámetros nombrados en C# 14 y .NET 10."
date: "2025-01-11"
layout: ../../layouts/BlogPost.astro
tags: ["C#", "Clean Code", "Self-Documenting", "Parameters", ".NET", "Best Practices"]
image: "/img/blog/2025-01-11-parametros-de-metodo.webp"
imageAlt: "Código C# mostrando la transformación de parámetros primitivos confusos (Execute(2, true, false, 3, 'data.json')) a código auto-documentado con enums y Value Objects"
---

Imagina que estás revisando código y te encuentras con esta línea:

```csharp
await taskService.Execute(42, true, false, 3, "data.json");
```

¿Qué hace este método? ¿Qué significa ese `true`? ¿Y el `false`? ¿El número `3` es un timeout, un retry count o algo más?

Como diría Shikamaru: *"Qué problemático..."*. Este código te obliga a abrir la definición del método, leer la documentación (si existe) y mantener en tu memoria a corto plazo qué significa cada parámetro.

En este artículo vamos a aprender a escribir **firmas de métodos auto-documentadas** que eliminan la ambigüedad y hacen que el código se explique por sí mismo.

## El Problema: Primitive Obsession

Este anti-patrón tiene un nombre técnico: **Primitive Obsession** (Obsesión por los tipos primitivos). Ocurre cuando usamos tipos primitivos (`int`, `bool`, `string`) para representar conceptos del dominio que tienen significado específico.

### Caso de estudio: Sistema de tareas

```csharp
namespace LegacyTaskSystem;

public class TaskService
{
    private readonly ITaskRepository _repository;
    private readonly ILogger _logger;

    public TaskService(ITaskRepository repository, ILogger logger)
    {
        _repository = repository;
        _logger = logger;
    }

    public async Task<bool> Execute(
        int taskId,
        bool async,
        bool withLogging,
        int retryCount,
        string configFile)
    {
        if (withLogging)
            _logger.Log($"Ejecutando tarea {taskId}");

        var task = await _repository.GetById(taskId);

        if (task == null)
        {
            if (withLogging)
                _logger.Log($"Tarea {taskId} no encontrada");
            return false;
        }

        var attempts = 0;
        while (attempts < retryCount)
        {
            try
            {
                if (async)
                    await task.ExecuteAsync();
                else
                    task.Execute();

                if (withLogging)
                    _logger.Log($"Tarea {taskId} completada");

                return true;
            }
            catch (Exception ex)
            {
                attempts++;
                if (withLogging)
                    _logger.Log($"Intento {attempts} falló: {ex.Message}");
            }
        }

        return false;
    }
}
```

### Uso del método legacy

```csharp
// ¿Qué significan estos valores?
await taskService.Execute(42, true, false, 3, "task-config.json");

// Para entenderlo, necesitas leer la firma del método:
// - 42: taskId
// - true: async
// - false: withLogging
// - 3: retryCount
// - "task-config.json": configFile

// Y aún así, ¿qué pasa si te equivocas en el orden?
await taskService.Execute(42, false, true, 3, "task-config.json"); // Invertí async y withLogging
```

### Problemas identificados

1. **Carga cognitiva alta**: Debes recordar el orden y significado de cada parámetro.
2. **Errores de inversión**: Es fácil intercambiar parámetros del mismo tipo.
3. **Difícil de extender**: Agregar un parámetro requiere actualizar TODAS las llamadas.
4. **No testeable semánticamente**: `Execute(42, true, false, 3, "config")` no comunica la intención del test.
5. **Booleanos como banderas**: `bool async` y `bool withLogging` son especialmente confusos.

## La Solución: Self-Documenting Parameters

Vamos a refactorizar este código aplicando varios patrones de diseño:

### 1. Enums Semánticos para Booleanos

```csharp
namespace ModernTaskSystem;

public enum ExecutionMode
{
    Synchronous,
    Asynchronous
}

public enum LoggingStrategy
{
    Disabled,
    Enabled
}
```

**Justificación técnica:**
- **Explícito**: `ExecutionMode.Asynchronous` vs `true` - ¿cuál es más claro?
- **Extensible**: Puedes agregar `ExecutionMode.Parallel` sin romper código existente.
- **Type-safe**: El compilador evita que pases `LoggingStrategy` donde se espera `ExecutionMode`.

### 2. Value Objects para Primitivos

```csharp
public readonly record struct TaskId(int Value)
{
    public static implicit operator int(TaskId id) => id.Value;
    public static implicit operator TaskId(int value) => new(value);
}

public readonly record struct RetryPolicy(int MaxAttempts)
{
    public static RetryPolicy NoRetry => new(0);
    public static RetryPolicy Standard => new(3);
    public static RetryPolicy Aggressive => new(10);

    public bool ShouldRetry(int currentAttempt) => currentAttempt < MaxAttempts;
}

public readonly record struct ConfigurationFile(string Path)
{
    public static ConfigurationFile Default => new("default-config.json");

    public bool Exists() => File.Exists(Path);

    public static implicit operator string(ConfigurationFile file) => file.Path;
    public static implicit operator ConfigurationFile(string path) => new(path);
}
```

**Justificación técnica:**
- **Domain-Driven Design**: `TaskId` no es solo un `int`, es un identificador con significado.
- **Encapsulación de reglas**: `RetryPolicy.ShouldRetry()` centraliza la lógica de reintentos.
- **Factory methods**: `RetryPolicy.Standard` comunica intención sin magic numbers.

### 3. Options Object Pattern

```csharp
public sealed record TaskExecutionOptions
{
    public ExecutionMode Mode { get; init; } = ExecutionMode.Synchronous;
    public LoggingStrategy Logging { get; init; } = LoggingStrategy.Disabled;
    public RetryPolicy RetryPolicy { get; init; } = RetryPolicy.NoRetry;
    public ConfigurationFile ConfigFile { get; init; } = ConfigurationFile.Default;

    public static TaskExecutionOptions Default => new();

    public static TaskExecutionOptions WithLogging() =>
        Default with { Logging = LoggingStrategy.Enabled };

    public static TaskExecutionOptions AsyncWithRetry() => new()
    {
        Mode = ExecutionMode.Asynchronous,
        Logging = LoggingStrategy.Enabled,
        RetryPolicy = RetryPolicy.Standard
    };
}
```

**Justificación técnica:**
- **Named parameters implícitos**: `options.Mode` es auto-documentado.
- **Inmutabilidad**: `record` + `init` = thread-safe.
- **Fluent API**: `TaskExecutionOptions.Default with { Logging = LoggingStrategy.Enabled }`.

### 4. Método Refactorizado

```csharp
public sealed class TaskService(
    ITaskRepository repository,
    ILogger logger)
{
    public async Task<Result<TaskExecution>> Execute(
        TaskId taskId,
        TaskExecutionOptions options)
    {
        LogExecutionStart(taskId, options);

        var taskResult = await LoadTask(taskId);
        if (taskResult.IsFailure)
            return Result<TaskExecution>.Failure(taskResult.Error);

        var task = taskResult.Value;

        return await ExecuteWithRetry(task, options);
    }

    private void LogExecutionStart(TaskId taskId, TaskExecutionOptions options)
    {
        if (options.Logging == LoggingStrategy.Enabled)
            logger.LogInformation("Ejecutando tarea {TaskId} en modo {Mode}",
                taskId.Value, options.Mode);
    }

    private async Task<Result<ITask>> LoadTask(TaskId taskId)
    {
        var task = await repository.GetById(taskId);

        return task is not null
            ? Result<ITask>.Success(task)
            : Result<ITask>.Failure($"Tarea {taskId.Value} no encontrada");
    }

    private async Task<Result<TaskExecution>> ExecuteWithRetry(
        ITask task,
        TaskExecutionOptions options)
    {
        var attempt = 0;

        while (true)
        {
            try
            {
                var result = options.Mode == ExecutionMode.Asynchronous
                    ? await task.ExecuteAsync()
                    : task.Execute();

                LogSuccess(task.Id, options);

                return Result<TaskExecution>.Success(
                    new TaskExecution(task.Id, attempt + 1, result));
            }
            catch (Exception ex)
            {
                attempt++;

                if (!options.RetryPolicy.ShouldRetry(attempt))
                {
                    LogFailure(task.Id, attempt, ex, options);
                    return Result<TaskExecution>.Failure(ex.Message);
                }

                LogRetry(task.Id, attempt, ex, options);
            }
        }
    }

    private void LogSuccess(TaskId taskId, TaskExecutionOptions options)
    {
        if (options.Logging == LoggingStrategy.Enabled)
            logger.LogInformation("Tarea {TaskId} completada exitosamente", taskId.Value);
    }

    private void LogFailure(TaskId taskId, int attempts, Exception ex, TaskExecutionOptions options)
    {
        if (options.Logging == LoggingStrategy.Enabled)
            logger.LogError(ex, "Tarea {TaskId} falló después de {Attempts} intentos",
                taskId.Value, attempts);
    }

    private void LogRetry(TaskId taskId, int attempt, Exception ex, TaskExecutionOptions options)
    {
        if (options.Logging == LoggingStrategy.Enabled)
            logger.LogWarning("Intento {Attempt} para tarea {TaskId} falló: {Error}",
                attempt, taskId.Value, ex.Message);
    }
}
```

## El antes y después

### ❌ Legacy (Críptico)

```csharp
// ¿Qué hace esto? Imposible saberlo sin contexto
await taskService.Execute(42, true, false, 3, "config.json");
```

### ✅ Moderno (Auto-documentado)

```csharp
// Opción 1: Usando factory method
await taskService.Execute(
    taskId: 42,
    options: TaskExecutionOptions.AsyncWithRetry()
);

// Opción 2: Con with-expression
await taskService.Execute(
    taskId: 42,
    options: TaskExecutionOptions.Default with
    {
        Mode = ExecutionMode.Asynchronous,
        Logging = LoggingStrategy.Enabled,
        RetryPolicy = RetryPolicy.Standard
    }
);

// Opción 3: Fluent style
var options = TaskExecutionOptions.Default
    .WithMode(ExecutionMode.Asynchronous)
    .WithLogging()
    .WithRetryPolicy(RetryPolicy.Standard);

await taskService.Execute(taskId: 42, options);
```

## Beneficios Técnicos

### 1. **Eliminación de Boolean Traps**

```csharp
// ❌ Boolean Trap
public void SendEmail(string to, string subject, string body, bool isHtml, bool urgent)
{
    // ¿Es isHtml o urgent el primero?
}

SendEmail("user@example.com", "Hi", "Message", false, true); // Confuso

// ✅ Enums Semánticos
public void SendEmail(string to, string subject, string body,
    EmailFormat format, Priority priority)
{
    // Claridad total
}

SendEmail("user@example.com", "Hi", "Message",
    EmailFormat.PlainText, Priority.Urgent); // Auto-documentado
```

### 2. **Extensibilidad sin Breaking Changes**

```csharp
// Agregar nueva opción de ejecución
public enum ExecutionMode
{
    Synchronous,
    Asynchronous,
    Parallel,        // Nueva opción
    Distributed      // Otra nueva opción
}

// El código existente sigue funcionando:
var options = TaskExecutionOptions.Default; // Usa Synchronous por defecto
```

### 3. **Type Safety**

```csharp
// ❌ Con primitivos, esto compila pero está MAL
await Execute(42, 3, false, true, "config.json"); // Invertí parámetros

// ✅ Con enums, el compilador te protege
await Execute(taskId: 42, options: new TaskExecutionOptions
{
    Mode = LoggingStrategy.Enabled, // ERROR DE COMPILACIÓN
    Logging = ExecutionMode.Asynchronous // ERROR DE COMPILACIÓN
});
```

### 4. **Tests Expresivos**

```csharp
[Fact]
public async Task Execute_WithAsyncMode_ExecutesAsynchronously()
{
    // Arrange
    var options = new TaskExecutionOptions
    {
        Mode = ExecutionMode.Asynchronous,
        Logging = LoggingStrategy.Disabled,
        RetryPolicy = RetryPolicy.NoRetry
    };

    // El test comunica claramente la intención
    var result = await service.Execute(taskId: 1, options);

    // Assert
    Assert.True(result.IsSuccess);
}

// Compare con la versión legacy:
[Fact]
public async Task Execute_WithTrue_DoesAsync() // ¿"True" de qué?
{
    var result = await service.Execute(1, true, false, 0, "config");
    // ¿Qué está probando esto realmente?
}
```

## Patrones Avanzados

### 1. **Builder Pattern para Options Complejas**

```csharp
public sealed class TaskExecutionOptionsBuilder
{
    private ExecutionMode _mode = ExecutionMode.Synchronous;
    private LoggingStrategy _logging = LoggingStrategy.Disabled;
    private RetryPolicy _retryPolicy = RetryPolicy.NoRetry;
    private ConfigurationFile _configFile = ConfigurationFile.Default;

    public TaskExecutionOptionsBuilder WithAsyncMode()
    {
        _mode = ExecutionMode.Asynchronous;
        return this;
    }

    public TaskExecutionOptionsBuilder WithLogging()
    {
        _logging = LoggingStrategy.Enabled;
        return this;
    }

    public TaskExecutionOptionsBuilder WithRetry(int maxAttempts)
    {
        _retryPolicy = new RetryPolicy(maxAttempts);
        return this;
    }

    public TaskExecutionOptionsBuilder WithConfigFile(string path)
    {
        _configFile = new ConfigurationFile(path);
        return this;
    }

    public TaskExecutionOptions Build() => new()
    {
        Mode = _mode,
        Logging = _logging,
        RetryPolicy = _retryPolicy,
        ConfigFile = _configFile
    };
}

// Uso fluido
var options = new TaskExecutionOptionsBuilder()
    .WithAsyncMode()
    .WithLogging()
    .WithRetry(maxAttempts: 5)
    .Build();
```

### 2. **Named Arguments con C# 14**

```csharp
// Aprovecha named arguments para máxima claridad
await service.Execute(
    taskId: new TaskId(42),
    options: new TaskExecutionOptions
    {
        Mode = ExecutionMode.Asynchronous,
        Logging = LoggingStrategy.Enabled,
        RetryPolicy = new RetryPolicy(MaxAttempts: 3),
        ConfigFile = new ConfigurationFile("production-config.json")
    }
);
```

### 3. **Implicit Operators para DX (Developer Experience)**

```csharp
public readonly record struct TaskId(int Value)
{
    // Permite usar int donde se espera TaskId
    public static implicit operator TaskId(int value) => new(value);

    // Permite usar TaskId donde se espera int
    public static implicit operator int(TaskId id) => id.Value;
}

// Ahora puedes escribir:
await service.Execute(taskId: 42, options); // 42 se convierte implícitamente a TaskId
```

## Casos de Uso Reales

### Sistema de Notificaciones

```csharp
// ❌ Antes
public void Notify(string userId, string message, int priority, bool email, bool sms, bool push)
{
    // ...
}

Notify("user123", "Hello", 1, true, false, true); // ¿Qué está habilitado?

// ✅ Después
public enum NotificationChannel
{
    Email = 1 << 0,
    Sms = 1 << 1,
    Push = 1 << 2
}

public enum NotificationPriority
{
    Low,
    Normal,
    High,
    Critical
}

public void Notify(UserId userId, string message,
    NotificationPriority priority,
    NotificationChannel channels)
{
    // ...
}

Notify(
    userId: "user123",
    message: "Hello",
    priority: NotificationPriority.High,
    channels: NotificationChannel.Email | NotificationChannel.Push
); // Claridad total
```

### Sistema de Caché

```csharp
// ❌ Antes
public T Get<T>(string key, int ttl, bool sliding, bool distributed)
{
    // ...
}

var data = cache.Get<User>("user:123", 3600, true, false); // ¿Sliding o Distributed?

// ✅ Después
public enum CacheMode
{
    Absolute,  // TTL fijo
    Sliding    // TTL renovable
}

public enum CacheLocation
{
    Memory,
    Distributed
}

public readonly record struct CacheKey(string Value);
public readonly record struct CacheDuration(TimeSpan Value)
{
    public static CacheDuration Minutes(int minutes) =>
        new(TimeSpan.FromMinutes(minutes));
    public static CacheDuration Hours(int hours) =>
        new(TimeSpan.FromHours(hours));
}

public T Get<T>(CacheKey key, CacheDuration duration,
    CacheMode mode, CacheLocation location)
{
    // ...
}

var data = cache.Get<User>(
    key: "user:123",
    duration: CacheDuration.Hours(1),
    mode: CacheMode.Sliding,
    location: CacheLocation.Distributed
); // Auto-documentado
```

## Migración Gradual

No necesitas refactorizar todo de golpe. Estrategia de migración:

### Paso 1: Crear tipos semánticos

```csharp
public enum ExecutionMode { Synchronous, Asynchronous }
public enum LoggingStrategy { Disabled, Enabled }
```

### Paso 2: Agregar sobrecarga moderna

```csharp
// Mantén el método legacy
[Obsolete("Usa la sobrecarga con TaskExecutionOptions")]
public async Task<bool> Execute(int taskId, bool async, bool logging, int retry, string config)
{
    // Delega a la versión moderna
    var options = new TaskExecutionOptions
    {
        Mode = async ? ExecutionMode.Asynchronous : ExecutionMode.Synchronous,
        Logging = logging ? LoggingStrategy.Enabled : LoggingStrategy.Disabled,
        RetryPolicy = new RetryPolicy(retry),
        ConfigFile = new ConfigurationFile(config)
    };

    var result = await Execute(new TaskId(taskId), options);
    return result.IsSuccess;
}

// Nueva versión moderna
public async Task<Result<TaskExecution>> Execute(TaskId taskId, TaskExecutionOptions options)
{
    // Implementación moderna
}
```

### Paso 3: Migra progresivamente

```csharp
// Los nuevos tests usan la API moderna
// El código legacy sigue funcionando pero con warning de obsolescencia
```

## Conclusión: El ninja del self-documenting code

Como en las artes ninja, la claridad en la comunicación es fundamental. Un parámetro bien nombrado es como una señal de humo clara: todos entienden el mensaje al instante.

Recuerda:
- **Evita Boolean Traps**: `bool async` → `ExecutionMode mode`.
- **Usa Enums Semánticos**: Comunican intención y son extensibles.
- **Value Objects para primitivos**: `int taskId` → `TaskId taskId`.
- **Options Object para >3 parámetros**: Agrupa parámetros relacionados.
- **Named Arguments siempre**: Incluso con buenos nombres, úsalos para máxima claridad.

### El camino del ninja dev

¿Estás listo para eliminar la ambigüedad? Empieza hoy mismo:

1. Busca un método con 3+ parámetros booleanos.
2. Crea enums semánticos para cada booleano.
3. Refactoriza la firma del método.
4. Ejecuta los tests y observa cómo mejora la legibilidad.

Como diría Might Guy: *"El esfuerzo constante supera al talento natural"*. Cada parámetro que refactorizas es un paso más hacia el código profesional.

---

## Ver también

Si te ha gustado este artículo sobre parámetros auto-documentados, completa la serie:

- **[El arte de nombrar: Semántica sobre Redundancia](/blog/el-arte-de-nombrar-semantica-sobre-redundancia)** - Domina el naming semántico eliminando redundancia en clases y propiedades.
- **[Métodos Narrativos: La Regla SRP](/blog/metodos-narrativos-la-regla-srp)** - Escribe métodos que se lean como un índice de contenidos con Single Responsibility Principle.

¡Nos vemos en la próxima misión, ninja dev! 🥷
