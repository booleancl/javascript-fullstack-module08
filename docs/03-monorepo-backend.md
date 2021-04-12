# Reorganización del proyecto como un repositorio monolítico y agregar Backend

En función de la metodología que estamos utilizando lo que haremos será centralizar en este mismo repositorio todo lo necesario para que nuestras pruebas de software pasen sin problema. En este caso nuestra pruebas e2e requieren que el frontend realice una petición exitosa hacia un backend que aún no existe. Este debe ser capaz de responder a una petición de tipo GET a una URL que exponga el endpoint `/api/products`.
En función de esta necesidad lo que haremos será reorganizar el repositorio siquiendo algunos lineamientos:

  - Dividiremos el repositorio en 2 dominios: Frontend y Backend donde cada dominio
  - Vamos a crear un directorio en la raíz para centralizar todos los Fixtures que contendrán los datos de prueba que le serán útiles tanto al dominio de Backend como Frontend
  - Cuando ambos dominios de negocio estén listos para salir a producción estableceremos procedimientos de calidad en el repositorio que validen la sintáxis de Frontend y Backend así como las pruebas de software que validen el comportamiento del proyecto antes que se hagan subidas al repositorio remoto de forma automatizada

Implementaremos estos lineamientos dejando el repositorio como indica el siguiente esquema: 

```
<tu-proyecto>
└─── fixtures
└─── frontend <-- acá movemos todo el código generado hasta el momento
      .browserslistrc
      .env.production
      .eslintrc.js
      README.md
      babel.config.js
      cypress.json
      jest.config.js
      node_modules
      package-lock.json
      package.json
      public
      src
      tests
      vue.config.js
└─── backend
```
La implementación de las validaciones la dejaremos más adelante para cuando ya tengamos listos los proyectos de Frontend y Backend.






Se crea la carpeta front, backend/src y fixtures
Crear el servidor express `server.js`, cors, nodemón y la ruta de productos
Configurar cypress para que lea los fixtures generales
Queda el test pasando (200)