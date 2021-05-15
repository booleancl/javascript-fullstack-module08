---
layout: default
title: "Inicio"
nav_order: 0
---
# Proyecto de desarrollo ágil: Aplicación Fullstack Javascript 

Hola! Bienvenidos al proyecto final del curso [Fullstack Javascript para programadores](https://boolean.cl/courses/javascript-full-stack-basic). Crearemos un producto digital aplicando los conocimientos del curso más la metodología de desarrollo ágil utilizando Javascript en todo el stack. Usaremos técnicas de refactorización que permiten solucionar bugs y refactorizar el proyecto de forma sostenible para entregar valor en iteraciones cortas. 

**Con esta guía el estudiante podrá:**

  1. Poner en producción el resultado de una iteración que será la base para su futura personalización y proyecto final del curso. 
  2. Practicar técnicas para trabajar con aplicaciones *legacy* mediante pruebas. 
   
  

En concreto vamos a construir la base de una aplicación escalable y flexible utilizando Javascript, siguiendo la metodología **BDD** para implementar 2 **Historias de usuario**. 

## Frontend

Usaremos la dupla **VueJS**/**Vuetify** más los *plugins* **Vue-Router** y **Vuex** para construir una Single Page Application (SPA). 

## Backend

Construiremos un servidor **NodeJS** con la librería **Express**. La autenticación en todo el stack será implementada usando el servicio de **Firebase**. 

## Deployment

La aplicación será publicada en la plataforma **Heroku** con un proceso de despliegue en **Github actions**. Con esta arquitectura las **soluciones** podrán consumir a futuro servicios de **Firebase** y/o **Heroku**.

## Calidad y mantenimiento

Utilizaremos **Cypress** para las pruebas de extremo a extremo (e2e) integrando Backend y Frontend. **Jest** para pruebas unitarias y herramientas como **eslint** y **husky** para resguardar la calidad del código. 

<hr/>
<blockquote style="background-color:PaleGoldenRod;padding:20px">
  <h6>Advertencia</h6>
  <p>La elección de los frameworks y plataformas se hizo considerando alta productividad con baja curva de aprendizaje para enfocarnos en el uso del lenguaje Javascript en un proceso de desarrollo Ágil. En Boolean creemos que la metodología de desarrollo es tanto o más importante que las tecnologías o frameworks. En otras palabras, la metodología usada en esta guía aplica a cualquier combinación de frameworks o librerías Javascript (React, Angular, Koa, etc).</p>
</blockquote>
<hr/>

El resultado final será similar a las siguientes imágenes:

<figure>
  <img src="docs/images/00-demoScreen-1.png" alt="Lo que haremos 1">
  <figcaption style="text-align:right">Vista login de la aplicación</figcaption>
</figure>

<hr>

<figure>
  <img src="docs/images/00-demoScreen-2.png" alt="Lo que haremos 2">
  <figcaption style="text-align:right">Vista página de productos</figcaption>
</figure>

Manos a la obra!
