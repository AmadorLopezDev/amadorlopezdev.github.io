---
title: "No falles en tu misión de ninja de software"
description: "Clean Code, SOLID, TDD, DDD ¿Cómo no fallar en nuestra misión?"
date: "2025-03-04"
layout: ../../layouts/BlogPost.astro
tags: ["Programación", "Clean Code", "Desarrollo", "SOLID", "TDD", "DDD"]
image: "/img/blog/2025-03-04-clean-code-ninja.png"
---

Las villas de ninjas se mantienen a base de cumplir correctamente las misiones, eso hace que cada vez les encarguen más misiones y puedan cobrar por esos servicios. A más cantidad y más dificultad, mejores ingresos se tendrán.

Por lo tanto es importante cuando nos encomiendan una misión, no cometer errores que eviten llevar a buen puerto una misión. En nuestro caso, como ninjas de desarrollo de software, nuestras armas son DDD, TDD, Clean Code, Principios SOLID, buenas prácticas de desarrollo y diseño de software y por supuesto crear código mantenible. Por lo tanto vamos a intentar hacer un repaso rápido por los errores que deberíamos evitar para conseguir cumplir la misión.

## Falta de disciplina y resistencia al "refactoring"

¿Cuantas veces has hablado con alguien del trabajo sobre un código? A veces, incluso el código juzgado era el tuyo y no siempre estamos orgullosos de nuestro trabajo. Está claro que la primera regla debería ser algo así como "Leemos, pero no juzgamos" 😉, porque cada persona tenía unas circunstancias que igual no conocemos y es mejor no juzgar el camino de otra persona sin ponerse sus zapatos.

Sin embargo, esta sensación muchas veces la podríamos evitar realizando un trabajo continuado de refactorización, estos hábitos nos ayudan a tener cada vez el código más entendible y mantenible y lo más importante, mejoran nuestros sentimientos sobre nuestro propio trabajo.

Por lo que debes aplicar la disciplina del shinobi, dedica tiempo de forma periódica a limpiar el código y si tienes oportunidad haz revisiones de código en pareja o en equipo para ver diferentes formas de afrontar el código y el proceso de mejora.

## Incumplir la primera regla de un ninja de software

Nunca abandones a un compañero en el terreno de batalla, todos sabemos que eso es lo peor que puede hacer un ninja que se precie, incluso peor que abandonar una misión. Pues lo mismo ocurre con las técnicas que en teoría nos ayudan a crear código mantenible. Por ejemplo, los principios SOLID.

### S - Principio de responsabilidad única

Si vemos un trozo de código, ya sea método, clase, etc y no sabemos cuantas cosas hace, entonces estamos fallando, un equipo ninja se compone de tres personas, porque no todos somos el Relámpago amarillo de Konoha.

Asegurarse de que cada módulo o clase tenga una única función ayuda a su mantenimiento y a crear las pruebas correspondientes.

### O - Principio de abierto para ampliación, pero cerrado para modificación

Cuando Yiraya enseñó a Naruto el rasengan lo hizo siguiendo una serie de pasos y siguiendo esos pasos se ha ido transmitiendo hasta llegar a Boruto. No hay modificaciones en los pasos, puede que se amplíen para agregar determinada naturaleza de chakra, pero cada paso no cambia.

Lo mismo debe pasar con nuestras clases y artefactos, es mejor usar un diseño que nos permita agregar funcionalidad con herencia o composición en vez de estar modificando cada vez que se da una nueva necesidad. De lo contrario, estaremos complicando las pruebas y la mantenibilidad del código.

### L - Principio de sustitución de Liskov

Un clon de sombra sabe lo que tiene que hacer, sería una sorpresa desagradable crear un clon para ayudarte en una batalla y que te ataque a ti en vez de atacar al enemigo.

Pues en un sistema de jerarquías de clases, ocurre lo mismo, si las clases hijas no tienen el comportamiento definido en la clase base, al sustituirlas vamos a generar problemas en el código. Una buena idea es tener una buena batería de tests que te aseguren el comportamiento de cada clase.

### I - Principio de segregación de interfaces

Imagina que intentas enseñar a Rock Lee alguna técnica ilusoria, sería completamente absurdo y al intentar ponerla en práctica en un combate podría hacer que perdiera, Rock es un especialista en Taijutsu y el resto sería entorpecerle.

Pues igual pasa con las interfaces, antes de generar una interfaz te tienes que asegurar que ya tienes claro el diseño del código, generar dependencias en clases con interfaces inútiles es como intentar que Rock haga un clon de sombras, no va a salir bien.

### D - Principio de inversión de dependencias

En un equipo lo importante es que cada miembro conozca al resto y que puedan colaborar, pero hay que intentar que unos dependan de otros para hacer un ataque, pueden ayudarse para atacar, pero si una jutsu necesita de dos ninjas del equipo es que algo está mal.

Usar abstracciones para inyectar funcionalidad disminuye el acoplamiento y aumenta la cohesión, conceptos muy complicados, pero para que lo entendamos es como cuando Sasuke y Naruto atacaron de forma conjunta a Zabuza con dos shurikens, estaban cohesionados, pero no acoplados, de esa forma Sasuke pudo enviar a Naruto a la espalda de Zabuza.

## Ir a un combate sin entrenar

Es fácil decir que usamos TDD, pero hacerlo es más complejo, es decir, escribir el test antes de empezar a codificar y no al revés es como ir a un combate sin haber entrenado y esperar ganar.

Seguir el flujo del TDD nos ayudará a tener código más fiable, seguir el Red-Green-Refactor nos va a facilitar no hacer más código del necesario, tener funcionalidades más fiables y mantenibles en el tiempo.

## ¿Y si perdemos el ojo blanco del clan Hyūga?

Igual que Konoha no se podía permitir el lujo de que el enemigo descubriera los secretos del ojo blanco del clan Hyūga. Nosotros no podemos permitirnos afrontar el desarrollo del software sin conocer el dominio.

El conocimiento del "dominio" o "negocio" nos ayuda a tener soluciones más adecuadas a las necesidades y no podemos olvidar, que como ninjas del desarrollo de software, nosotros estamos para ayudar a solucionar problemas o a mejorar procesos, no a teclear sin sentido.

Hablar con los especialistas en el negocio o dominio, establecer diccionarios de conceptos que permitan un lenguaje más ubicuo y refinar el diseño (contextos, entidades, agregados, etc) nos ayudarán a abordar mejor nuestro sistema.

## Las bombas ninja no son siempre la mejor opción

Llenar un código con comentarios es como sacar una bomba de distracción cada vez que hay una pelea, a veces hay que luchar, hacer un intercambio de cuerpos o usar jutsus.

Por eso, es mejor usar nombres para métodos, variables y clases que nos ayuden a entender lo que está ocurriendo o el dominio en el que estamos trabajando. Además, refactorizar con frecuencia también nos ayudará a encontrar esos nombres más adecuados, ya que el código será cada vez más legible e intuitivo.

## Conclusión

Al final, por mucho que yo te diga, esto es cuestión de contextos, necesidades, oportunidades y decisiones. Y lamentablemente, no siempre depende de nosotros, así que todo lo que puedas aportar tú sin necesidad de que nadie te lo indique, hazlo y verás como poco a poco todo va mejorando. 

Igual que el camino de Naruto para llegar a ser Hokage, no será un camino fácil, pero si lo fuera lo mismo no estarías siendo un ninja del desarrollo de software.