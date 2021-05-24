 ---
layout: default
title: "Inicio"
nav_order: 0
---

<div class="embed-responsive embed-responsive-16by9">
  <iframe class="embed-responsive-item" src="https://youtu.be/CuT4bgTvtfY" allowfullscreen></iframe>
</div>

# Proyecto de desarrollo ágil: Aplicación Fullstack Javascript 

Hola! Bienvenidos al proyecto Aplicación Web del curso [Fullstack Javascript ](https://boolean.cl/courses/javascript-full-stack-basic). Crearemos un producto digital utilizando Javascript en todo el stack. Lo haremos aplicando los conocimientos del curso junto con la metodología de [Desarrollo Ágil](https://docs.microsoft.com/en-us/devops/plan/what-is-agile-development). Haremos énfasís en técnicas de testeo y refactorización para mantener el proyecto flexible y escalable.

**Con esta guía el estudiante podrá:**

  1. Poner en producción el resultado de una iteración que será la base para su futura personalización y proyecto final del curso. 
  2. Practicar técnicas que nos permitirán trabajar con aplicaciones *legacy* mediante pruebas. 
   
  

En concreto vamos a construir la base de una aplicación escalable y flexible utilizando Javascript y siguiendo la metodología **BDD** para implementar 2 **Historias de usuario**. 

La primera relacionada a un sistema de autenticación y la segunda con una vista index de algún recurso particular.       

El resultado final será similar a lo que vemos a continuación:

<figure>
  <img src="docs/images/00-demoScreen-1.png" alt="Lo que haremos 1">
  <figcaption style="text-align:right">Vista login de la aplicación</figcaption>
</figure>

<hr>

<figure>
  <img src="docs/images/00-demoScreen-2.png" alt="Lo que haremos 2">
  <figcaption style="text-align:right">Vista página de productos</figcaption>
</figure>


Nuestro proyecto fullstack estará compuesto por diferentes frameworks y herramientas: 

 ## Frontend

Usaremos **VueJS** para gestionar la sincronización y reactividad de la interfáz. Este framework implementa el patron *M-V-VM*, para y gestionar eficientemente nuestras vistas gracias a su motor de renderización y manejo interno de un *Virtual DOM*. Mejoraremos la productividad con **VueCLI** y así no tener que configurar manualmente **Webpack**, **Babel**, **Webpack Dev Server** y los loaders para trabajar con **SFC**. Seguiremos las directrices de Material Design a través de **Vuetify**, una de las tantas librerías de componentes UI para VueJS. Trabajaremos con **Vuex** para manejo de estado y **Vue-Router** para construir una Single Page Application (SPA) con *rutas* y *chunks*.

Además, integraremos nuestro Frontend con los servicios web de **Firebase**. Específicamente usaremos el servicio de autenticación.

## Backend

Construiremos un servidor **NodeJS** con la librería **Express**. Aquí expondremos servicios de negocio a través de Endpoints y Middlewares. Estos servicios conectarán con un servidor de bases de datos **Postres** que modificaremos mediante **Seeds** y **Migraciones**. Mapearemos los registros de la Base de Datos en objetos utilizando el **ORM** **Sequelize**. Al igual que en el frontend, conectaremos nuestro Backend con los servicios web de    **Firebase**. 

## Deployment

La aplicación será desplegada utilizando **Github actions** y publicada en la plataforma **Heroku**. En ambas etapas tendremos que trabajar con procesos de construcción (builds) e inyección segura de variables de entorno y otras credenciales para la aplicación.

Con esta arquitectura los proyectos podrán consumir a futuro servicios tanto de **Firebase** como de **Heroku**.

## Calidad y mantenimiento

Utilizaremos **Cypress** para las pruebas de extremo a extremo (e2e) integrando Backend y Frontend. **Jest** para pruebas unitarias y herramientas como **eslint** y **husky** para resguardar la calidad del código. 

<hr/>
<blockquote style="background-color:PaleGoldenRod;padding:20px">
  <h3>Advertencia</h3>
  <p>La elección de los frameworks y plataformas se hizo considerando alta productividad con baja curva de aprendizaje para enfocarnos en el uso del lenguaje Javascript en un proceso de desarrollo iterativo. En Boolean creemos que la metodología de desarrollo es tanto o más importante que las tecnologías o frameworks. En otras palabras, la metodología usada en esta guía aplica a cualquier combinación de frameworks o librerías Javascript (React, Angular, Oak , Deno, etc).</p>
</blockquote>
<hr/>


Tenemos bastante por cubrir, pero lo haremos paso a paso a lo largo de 9 capítulos. Esta guía debería poder ser implementada en entre tres a cinco horas de trabajo.

Manos a la obra!
