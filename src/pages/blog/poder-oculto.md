---
title: "El poder oculto sale a la luz"
description: "La IA viene, pero todos tenemos un poder oculto"
date: "2025-02-21"
layout: ../../layouts/BlogPost.astro
tags: ["Programación", "IA", "Desarrollo"]
image: "/img/blog/2025-02-21-poder-oculto.png"
---

Naruto aprendió el Jutsu de los clones de sombra leyendo las palabras de un pergamino prohibido, eran como palabras mágicas, pues consiguieron que el futuro Hokage de la Villa Oculta de la Hoja pudiera dominar una técnica que parecía que jamás iba a poder hacer.

<img src="/img/blog/2025-02-22-ninja-leyendo-pergamino-prohibido.png" alt="Ninja leyendo pergamino prohibido" class="responsive-img">

Y como si fuera magia, también parece que la IA (Inteligencia Artificial) vaya a hacer todos los trabajos que realizamos los humanos y cuando digo todos, no excluyo a aquellos trabajos que conllevan una carga física, pues ya están apareciendo los primeros robots trabajando en almacenes, así que pensemos en todos los trabajos existentes y no sólo a los desarrolladores de software. En los años que llevo trabajando, no sé cuantas veces iban a acabar con nosotros.


## No caer en el camino rápido

Cada uno elige su camino ninja, hay personas que eligen el camino fácil, aprenden a usar como verdaderos magos ancestrales las diferentes IAs que existen y que nos ayudan a generar código, ya sea Copilot integrado, ChatGPT de pago o no, Cursor o cualquier otro nombre que puedas recordar.

Sin embargo, este tipo de ninjas no es capaz de entender el código que están copiando y pegando, pero lo más importante no son capaces de detectar porqué el código que están usando puede contener errores y como solventarlos.

Por eso, agilizar lo máximo posible con este tipo de herramientas es una buena opción, pero no saber lo que estamos haciendo es querer llegar demasiado rápido al lugar, lo mismo nos tropezamos al ir tan rápido.

## No ofrezcas reticencia al cambio

Una cosa es no caer en el camino fácil y otra cosa es no querer usar y aprovechar las herramientas que nos puedan ayudar a mejorar nuestro rendimiento y eficiencia.

De siempre, los desarrolladores de software o las personas que trabajan en departamentos de IT que actualizan sistemas, cambian programas y de alguna manera están obligando a los usuarios a tener cambios, han sufrido la "reticencia al cambio". No podemos unirnos a esa larga lista de "reticentes".

Debemos aprender a mejorar nuestro rendimiento con el uso de la IA que podamos aprovechar, porque no es lo mismo un proyecto personal, un proyecto de una Startup propia al código de un proyecto de una organización para la que trabajamos o peor, para la que se ha contratado a una consultora externa.

## No dejes de mirar

Como diría Tsunade a Sakura, ¡Mantén los ojos abiertos!, ¿Qué significa lo que estoy diciendo? pues que un ninja médico siempre tiene que estar atento a los ataques enemigos porque son los más vulnerables al tener que curar a los compañeros. Por ese motivo, son los que tienen que estar más atentos.

Pues igual nosotros, cuando estemos usando una IA para solicitarle código, no debemos dejar de estar revisando el código que genera, las explicaciones que nos da para aplicar determinado código.

Yo con este proyecto de tener una página creada en Astro Framework para poder poner mis cosillas, he podido ver cómo la IA tiene esas lagunas que la hacen también tan simpática. Lo que me gustó de Astro es que puedo crear un artículo en MarkDown y con simplemente hacer push al repositorio, se actualiza el blog en una página de GitHub pages. Es algo trivial para los tiempos que corren, pero me deja mucho margen para poder estar despreocupándome de muchos pasos.

Por lo tanto, en este proyecto tengo archivos de extensión ".md" y archivos de extensión ".astro", cada uno de estos el propio framework los gestiona de forma diferente y aunque ambos puedan usar un Layout, digamos que las propiedades no se cargan de la misma forma.

Pues la IA me había generado código para tener una página que listara los diferentes artículos ".md" y así mostrar los artículos del blog. Pues el código que me había generado no estaba funcionando correctamente, porque las propiedades que se definen en un archivo ".md" y en uno ".astro" no se leen igual por el framework. Por lo que a veces están en ***Astro.props.fronmatter*** y en otras están en ***Astro.props***.

## Despertando nuestro poder oculto

Y aquí es cuando el ser humano entra en acción, aquí es cuando sacamos el poder oculto y con nuestra capacidad, experiencia y aplicando los conocimientos adquiridos, podemos interpretar el error que está ocurriendo y arreglar un problema generado por el código que había aportado la IA y que en ningún momento solucionaba por muchas explicaciones que le dijera.

Le intente avisar de muchas formas de que Astro Framework estaba dando un error al intentar leer una propiedad desde los archivos ".md" que con los archivos ".astro" no daba. Luego le intente decir qué en "Astro.props" no estaban los datos cuando venían de un archivo o de otro. Una y otra vez la IA me generaba el mismo código y me decía que revisara que estaba correctamente copiado.

Lo más asombroso es que use dos servicios distintos, les indicaba a los dos lo mismo y no conseguían ver el error. Así que tuve que corregirlo yo, no pasa nada, para eso estamos 😉.

## Enseñanzas

Por supuesto, que las IAs nos pueden ayudar a mejorar nuestra velocidad, eficiencia y nuestros conocimientos, pero a día de hoy siguen siendo una herramienta al servicio de un ser humano, hay que tener los conocimientos necesarios para validar lo que nos están diciendo o simplemente estaremos cometiendo errores tras errores y lo peor, no sabremos hacer nuestro trabajo.

Seguramente, cuando leas esto ya la IA nos habrá superado y estaremos cobrando una paga mínima de supervivencia para humanos, pero hasta ese momento, afianza tus conocimientos, se muy exceptico con lo que nos aporta la IA y valida lo que te aporta antes de aplicarlo en tu proyecto.