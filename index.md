---
layout: default
title: "Inicio"
nav_order: 0
---

![Logo de Boolean Academia](https://res.cloudinary.com/boolean-spa/image/upload/v1591158800/logo_vayedu.svg)

# Proyecto de Integración Curso Javascript Full Stack: Plataforma de trueque

> PENDING:  
Tener un prólogo que explique el contexto del proyecto con el material del curso y cómo está enfocado en aplicar los conocimientos del curso más la metodología de desarrollo ágil en un proyecto digital utilizando javascript en todo el stack.
Mencionar que haremos todo el scaffolding para trabajar de forma profesionarl y que será el alumno quien debe luego de completar esto, construir su propia aplicación resolviendo Historias de Usuario de alto nivel y ellos deben darle la especificidad.



Vamos a construir la base de una plataforma de trueques utilizando Javascript. Seguiremos la metodología BDD para implementar una historia de usuario. Utilizaremos el framework *VueJS* para construir una vista de ingreso (*login*) que nos permitirá acceder a un catálogo de instrumentos musicales disponibles para trueques.

La autenticación será soportada por la plataforma Firebase y la aplicación será publicada utilizando la plataforma Heroku, en la cual montaremos un servidor que construiremos utilizando NodeJS y la librería Express.

Manos a la obra!

Índice:
  - [Creando un proyecto usando CLI y framework UI](docs/01-vue-cli-install.md)
  - [Implementando historias de usuario con BDD](docs/02-bdd-with-cypress.md)
  - [Reorganización del proyecto como fullstack Javascript](docs/03-monorepo-backend.md)
  - [Autenticar en el Frontend y validar en el Backend](docs/04-firebase-sdk-backend.md)
  - [Agregando base de datos en entorno de desarrollo](docs/05-database-sequelize.md)
  - [Refactorización utilizando pruebas de software en Backend](docs/06-testing-backend.md)
  - [Refactorización utilizando pruebas de software en Frontend](docs/07-testing-frontend.md)
  - [Automatización de tareas para el desarrollo](docs/08-development-workflow-husky.md)
  - [Salida a producción utilizando Github Actions y Heroku](docs/09-deployment-postgres.md)
  