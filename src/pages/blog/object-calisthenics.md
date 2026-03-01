---
title: "El camino del ninja dev: object calisthenics"
description: "Las 9 reglas de Object Calisthenics con ejemplos en C# y TypeScript. Aprende a escribir código más limpio, modular y mantenible siguiendo estos jutsus del ninja dev."
date: "2026-03-01T16:20:00Z"
layout: ../../layouts/BlogPost.astro
tags: ["Object Calisthenics", "Clean Code", "C#", "TypeScript", "POO"]
image: "/img/blog/2026-03-01-object-calisthenics.webp"
---

En nuestro camino del "Ninja DEV 🥷" vamos a encontrar ciertos jutsus que nos van a venir genial para dejar nuestro código más "limpio" y "mantenible". Ya hablaremos un día sobre la importancia de volver a ver código escrito por ti y no sentir vergüenza ajena.

Hay muchas villas en el mundo del desarrollo de software, una es la villa de la programación orientada a objetos (o conocida como POO). Son una villa poderosa para la creación de software modular. Sin embargo, incluso el código de POO puede volverse complicado y difícil de mantener si no se siguen buenas prácticas. Por eso en la villa se crearon las reglas (o jutsus) de calistenia de objetos (Object Calisthenics).

Nosotros vamos a ver a lo largo de este escrito algunos ejemplos de cómo está el código antes y después de aplicar el jutsu. Los ejemplos usan C# y TypeScript. Puede que a lo largo del artículo encuentres enlaces a artículos, en la medida en que en este blog se vayan contemplando estos temas se irán sustituyendo por enlaces al propio sitio, pero mientras tanto son un recurso más para poder comprender mejor los conceptos que vemos.

## ¿Qué son "Object Calisthenics"?

Si nos aproximamos a las Object Calisthenics desde el mundo real, son un conjunto de reglas propuestas por Jeff Bay en el libro "The ThoughtWorks Anthology". Estas reglas están diseñadas para fomentar la escritura de código más limpio, modular y fácil de mantener.

Pero a mí me gusta la aproximación a base de jutsus y vamos a enumerarlas con unos nombres creados por Copilot. Junto a cada jutsu, vamos a ver algún pequeño ejemplo en C# y TypeScript que muestra el antes y el después de aplicar cada jutsu.

## ¿Cuántas hay?

Muchos reconocen como unas 9 reglas las "oficiales", pero con el tiempo han aparecido más "jutsus" que podrían también valer para ayudarnos en nuestro camino ninja en la villa POO. Vamos a ver unos cuantos:

### Chakra Control Jutsu: Indentación Perfecta

Una clase debe tener no más de un nivel de indentación. Hay que evitar usar múltiples niveles de identación. Aplicar esta regla nos dará simplicidad y claridad de código. Nuestro jutsu hace referencia a no ir creando métodos tipo acordeón 😊.

Antes de aplicar el jutsu

**C#:**
```csharp
public void ProcessOrder(Order order)
{
    if (order.IsValid())
    {
        var customer = order.GetCustomer();
        if (customer.HasDiscount())
        {
            var discount = customer.GetDiscount();
            if (discount > 0)
            {
                order.ApplyDiscount(discount);
            }
        }
    }
}
```

**TypeScript:**
```ts
function processOrder(order: Order): void {
    if (order.isValid()) {
        const customer = order.getCustomer();
        if (customer.hasDiscount()) {
            const discount = customer.getDiscount();
            if (discount > 0) {
                order.applyDiscount(discount);
            }
        }
    }
}
```

Después de aplicar el jutsu

**C#:**
```csharp
public void ProcessOrder(Order order)
{
    if (!order.IsValid()) return;

    var customer = order.GetCustomer();
    if (!customer.HasDiscount()) return;

    var discount = customer.GetDiscount();
    if (discount > 0)
    {
        order.ApplyDiscount(discount);
    }
}
```

**TypeScript:**
```ts
function processOrder(order: Order): void {
    if (!order.isValid()) return;

    const customer = order.getCustomer();
    if (!customer.hasDiscount()) return;

    const discount = customer.getDiscount();
    if (discount > 0) order.applyDiscount(discount);
}
```

Como podemos ver, se han eliminado indentaciones y se usa un retorno anticipado aplicando [early return pattern](https://mteheran.dev/early-return-pattern-en-c/) para salir lo antes posible del método cuando las condiciones no se cumplen, manteniendo así el método más sencillo de entender.

### Jutsu de Decisión Absoluta

Tenemos que evitar usar la palabra clave ***else***, siempre que podamos usar ***if*** con retornos anticipados, vamos a reducir complejidad en el código. El uso de "else" puede crear una jerarquía de anidación que dificulta la lectura del código.

Antes de aplicar el jutsu

**C#:**
```csharp
public void ProcessOrder(Order order)
{
    if (order.IsValid())
    {
        // Procesamos la orden
    }
    else
    {
        // Si no es válida, mostramos un mensaje de error
        Console.WriteLine("Orden no válida");
    }
}
```

**TypeScript:**
```ts
function processOrder(order: Order): void {
    if (order.isValid()) {
        // Procesamos la orden
    } else {
        console.log("Orden no válida");
    }
}
```

Después de aplicar el jutsu

**C#:**
```csharp
public void ProcessOrder(Order order)
{
    if (!order.IsValid())
    {
        // Si no es válida, mostramos un mensaje de error
        Console.WriteLine("Orden no válida");
        return;
    }

    // Procesamos la orden
}
```

**TypeScript:**
```ts
function processOrder(order: Order): void {
    if (!order.isValid()) {
        console.log("Orden no válida");
        return;
    }

    // Procesamos la orden
}
```

Como podemos ver, este jutsu puede ayudarnos a ejecutar el jutsu anterior de "Indentación perfecta".

### Jutsu de Envolvimiento Elemental

Nuestro objetivo es envolver todos los objetos primitivos y las cadenas de texto, de forma que no las usemos directamente, sino a través de unas clases que nos ayuden a trabajar con sus valores.

Antes de aplicar el jutsu

**C#:**
```csharp
public class User
{
    public string Name { get; set; }
    public int Age { get; set; }
}
```

**TypeScript:**
```ts
interface User {
    name: string;
    age: number;
}
```

Después de aplicar el jutsu

**C#:**
```csharp
public class UserName
{
    private readonly string _value;
    public UserName(string value) => _value = value;

    public override string ToString() => _value;
}

public class UserAge
{
    private readonly int _value;
    public UserAge(int value) => _value = value;

    public override string ToString() => _value.ToString();
}

public class User
{
    public UserName Name { get; set; }
    public UserAge Age { get; set; }
}
```

**TypeScript:**
```ts
type UserName = string & { readonly __brand: unique symbol };
type UserAge = number & { readonly __brand: unique symbol };

interface User {
    name: UserName;
    age: UserAge;
}
```

Este jutsu puede hacer el código un poco más grande, pero nos acerca a los [***Value Object***](https://learn.microsoft.com/es-es/dotnet/architecture/microservices/microservice-ddd-cqrs-patterns/implement-value-objects). Esto nos puede ayudar a desbloquear el uso de otro tipo de chakra diferente al de nuestra naturaleza, llamado [***DDD***](https://learn.microsoft.com/es-es/dotnet/architecture/microservices/microservice-ddd-cqrs-patterns/ddd-oriented-microservice).

### Jutsu de Maestría en Colecciones

Igual que con los tipos primitivos o con los string, con las colecciones debemos aplicar el mismo principio, envolverlos en una clase de colecciones.

Las colecciones como List, Set, Map, etc son muy abstractas y pueden llevar a una [baja cohesión](https://www.disrupciontecnologica.com/acoplamiento-y-cohesion/) si no se usan con cuidado.

Antes de aplicar el jutsu

**C#:**
```csharp
public class Team
{
    public List<User> Members { get; set; }
}
```

**TypeScript:**
```ts
interface Team {
    members: User[];
}
```

Después de aplicar el jutsu

**C#:**
```csharp
public class UserCollection
{
    private readonly List<User> _users = new List<User>();

    public void Add(User user) => _users.Add(user);
    public void Remove(User user) => _users.Remove(user);
    public IReadOnlyList<User> Users => _users.AsReadOnly();
}

public class Team
{
    public UserCollection Members { get; set; } = new UserCollection();
}
```

**TypeScript:**
```ts
interface UserCollection {
    readonly members: ReadonlyArray<User>;
}

interface Team {
    readonly members: UserCollection;
}
```

### Jutsu del Punto Único

No encadenes llamadas de métodos en una sola línea (más de un punto por línea) para reducir el acoplamiento y seguir la [Ley de Demeter](https://lmmartinb.dev/ley-de-demeter/). Esto obliga a usar variables o métodos intermedios y mejora la legibilidad.

Antes de aplicar el jutsu

**C#:**
```csharp
public class Address
{
    public string City { get; }
    public string Street { get; }

    public Address(string city, string street)
    {
        City = city;
        Street = street;
    }
}

public class Customer
{
    public string Name { get; }
    public Address Address { get; }

    public Customer(string name, Address address)
    {
        Name = name;
        Address = address;
    }
}

public class Invoice
{
    public Customer Customer { get; }

    public Invoice(Customer customer)
    {
        Customer = customer;
    }

    public void PrintInvoice()
    {
        // Encadenamiento de llamadas: se usan varios puntos en una sola línea.
        Console.WriteLine("Invoice for " + Customer.Name + " living in " + Customer.Address.City);
    }
}
```

**TypeScript:**
```ts
class Invoice {
    constructor(private readonly customer: Customer) {}

    printInvoice(): void {
        // Encadenamiento: varios puntos en una línea
        console.log(`Invoice for ${this.customer.address.city}`);
    }
}
```

Después de aplicar el jutsu

**C#:**
```csharp
public class Invoice
{
    public Customer Customer { get; }

    public Invoice(Customer customer)
    {
        Customer = customer;
    }

    public void PrintInvoice()
    {
        // Separando cada llamada en una línea, respetando "un punto por línea".
        var customer = this.Customer;         // Acceso a la propiedad Customer (1 punto)
        var address = customer.Address;       // Acceso a la propiedad Address (1 punto)
        var city = address.City;              // Acceso a la propiedad City (1 punto)

        Console.WriteLine("Invoice for " + customer.Name + " living in " + city);
    }
}
```

**TypeScript:**
```ts
class Invoice {
    constructor(private readonly customer: Customer) {}

    printInvoice(): void {
        const address = this.customer.getAddress();
        const city = address.getCity();
        console.log(`Invoice for ${city}`);
    }
}
```

En este ejemplo, se ha usado variables intermedias, en otro momento también nos puede interesar agregar un "método público" en Customer para obtener la ciudad. Son diferentes puntos de vista que nos acercan al uso de un sólo punto por línea.

### Jutsu de la Claridad Total

Usa nombres completos y descriptivos para clases, métodos y variables. Evitar abreviaturas reduce la ambigüedad y facilita la comprensión del código. También podemos evitar el uso de guiones bajos "_" o caracteres raros. Cuando más claro mejor.

Antes de aplicar el jutsu

**C#:**
```csharp
public void CalcAmt(int qty, int prc)
{
    int amt = qty * prc;
    Console.WriteLine(amt);
}
```

**TypeScript:**
```ts
function calcAmt(qty: number, prc: number): void {
    const amt = qty * prc;
    console.log(amt);
}
```

Después de aplicar el jutsu

**C#:**
```csharp
public void CalculateAmount(int quantity, int price)
{
    int amount = quantity * price;
    Console.WriteLine(amount);
}
```

**TypeScript:**
```ts
function calculateAmount(quantity: number, price: number): void {
    const amount = quantity * price;
    console.log(amount);
}
```

### Jutsu de la compactación

Cada clase debe tener una única responsabilidad y mantenerse lo más pequeña posible. Si una clase realiza múltiples tareas, divídela en clases especializadas para mejorar la cohesión y la mantenibilidad.

Antes de aplicar el jutsu

**C#:**
```csharp
public class Order
{
    public void Process()
    {
        Validate();
        CalculateTotal();
        NotifyCustomer();
    }

    private void Validate() { /* ... */ }
    private void CalculateTotal() { /* ... */ }
    private void NotifyCustomer() { /* ... */ }
}
```

**TypeScript:**
```ts
class Order {
    process(): void {
        this.validate();
        this.calculateTotal();
        this.notifyCustomer();
    }

    private validate(): void { /* ... */ }
    private calculateTotal(): void { /* ... */ }
    private notifyCustomer(): void { /* ... */ }
}
```

Después de aplicar el jutsu

**C#:**
```csharp
public class Order
{
    public Customer Customer { get; set; }
    public List<Product> Products { get; set; }
    // Solo se encarga de almacenar datos
}

public class OrderValidator
{
    public void Validate(Order order) { /* ... */ }
}

public class OrderCalculator
{
    public decimal CalculateTotal(Order order) { /* ... */ }
}

public class OrderNotifier
{
    public void NotifyCustomer(Order order) { /* ... */ }
}
```

**TypeScript:**
```ts
interface Order {
    customer: Customer;
    products: ReadonlyArray<Product>;
}

class OrderValidator {
    validate(order: Order): void { /* ... */ }
}

class OrderCalculator {
    calculateTotal(order: Order): number { /* ... */ }
}

class OrderNotifier {
    notifyCustomer(order: Order): void { /* ... */ }
}
```

### Jutsu de Simplicidad Argumental

Este jutsu o regla la podemos aplicar tanto a las clases como a los argumentos de entrada en los métodos. Aquí para gustos colores, algunos dicen que hay que limitar a 2, otros a 3 lo más drásticos a 1, sea cual sea tu situación o preferencia, la idea es no tener argumentos ilimitados, aquí no hay jutsu de reanimación 😂.

Antes de aplicar el jutsu

**C#:**
```csharp
public class Customer
{
    private string firstName;
    private string lastName;
    private DateTime birthDate;
}
```

**TypeScript:**
```ts
interface Customer {
    firstName: string;
    lastName: string;
    birthDate: Date;
}
```

Después de aplicar el jutsu

**C#:**
```csharp
public class Customer
{
    private FullName name;
    private DateTime birthDate;
}

public class FullName
{
    public string FirstName { get; }
    public string LastName { get; }

    public FullName(string firstName, string lastName)
    {
        FirstName = firstName;
        LastName = lastName;
    }
}
```

**TypeScript:**
```ts
interface FullName {
    readonly firstName: string;
    readonly lastName: string;
}

interface Customer {
    name: FullName;
    birthDate: Date;
}
```

En esta ocasión hemos aplicado el jutsu a una clase, pero podría haber sido a un método también.

### Jutsu de Ocultación total

Aquí la idea es no mostrar nada de inicio, sólo cuando sea necesario hay que mostrar al mundo algún dato (método o propiedad). Hay una frase muy conocida para este jutsu: "Tell, don't ask", es decir, no preguntes a un objeto por información, en vez de eso dile qué quieres que haga.

Antes de aplicar el jutsu

**C#:**
```csharp
public class Account
{
    public decimal Balance { get; set; }
}
```

**TypeScript:**
```ts
class Account {
    public balance: number = 0;
}
```

Después de aplicar el jutsu

**C#:**
```csharp
public class Account
{
    private decimal _balance;

    public Account(decimal initialBalance)
    {
        _balance = initialBalance;
    }

    public void Deposit(decimal amount)
    {
        _balance += amount;
    }

    public void Withdraw(decimal amount)
    {
        if (amount > _balance)
            throw new InvalidOperationException("Insufficient funds");
        _balance -= amount;
    }

    public decimal GetBalance()
    {
        return _balance;
    }
}
```

**TypeScript:**
```ts
class Account {
    private balance: number;

    constructor(initialBalance: number) {
        this.balance = initialBalance;
    }

    deposit(amount: number): void {
        this.balance += amount;
    }

    withdraw(amount: number): void {
        if (amount > this.balance) throw new Error("Insufficient funds");
        this.balance -= amount;
    }

    getBalance(): number {
        return this.balance;
    }
}
```

La idea es evitar los "getter y setter" públicos por defecto en las clases que creamos.


## Conclusión

Los jutsus, intentan ayudarnos en nuestro camino, al final aplicarlos o no depende de nosotros, de la situación de la batalla y de los requerimientos que se tengan, es decir, depende de la "misión" que tenemos entre manos. Sin embargo, tenerlos presentes nos puede ayudar a acabar con éxito y obtener código más limpio, claro y sostenible en el tiempo.
