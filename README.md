# Vue default plus Vuetify
  Vue-cli  with the standar

# BDD with Cypress
  La raíz es logín
  SDK de firebase
  Crear el usuario de pruebas
  Login plus ver la página de producto 
  Agregar axios, base_url y Vuex con la petición (404)
  La prueba de la página de productos fallando 

# Reorganización del proyecto como monorepo
  Se crea la carpeta front, backend/src y fixtures
  Crear el servidor express `server.js`, cors, nodemón y la ruta de productos
  Configurar cypress para que lea los fixtures generales
  Queda el test pasando (200)

# Fullstack auth with firebase
  Instalar SDK de firebase
  Descargar el `firebase-service-account.json` en la carpeta /backend con el nombre específico, agregarlo al gitignore
  Configurar nodemon agregando dos variables de ambiente `NODE_ENV` y `GOOGLE_APPLICATION_CREDENTIALS`

  ```json
    {
      "env": {
        "NODE_ENV": "development",
        "GOOGLE_APPLICATION_CREDENTIALS": "ruta-absoluta-de-tu-proyecto/backend/src/firebase-service-account.json"
      }
    }
  ```

  Configurar las rutas con el middleware
  Test vuelve a fallar (403)
  Agregar los interceptores de axios para las cabeceras (200)

# Base de datos
  Sequelize y Sequelize-cli
  Configurar el archivo .sequelizerc
  con la siguiente config: 

```javascript
const path = require('path');

module.exports = {
 "config": path.resolve('./src/config', 'config.json'),
 "models-path": path.resolve('./src/models'),
 "seeders-path": path.resolve('./src/seeders'),
 "migrations-path": path.resolve('./src/migrations')
};

```

SQlite3 en development
Configurar los valores por defecto para `created_at` y `updated_at`

  ```javascript
  Sequelize.literal("CURRENT_TIMESTAMP")
  ```

  Agregar Sequelize como comando con npm-scripts
  
  Crear Modelo, migraciones y seeds con la cli. Modificar los seed para que se alimente de los fixtures. Los seed nunca correrán en prod, solo para desarrollar. En producción alimentaremos "manualmente" un csv con SQL
  
  ```javascript
    await queryInterface.bulkDelete(tableName, null, { truncate: true })
  ```

  Agregar el destroy all al seed para no tener problemas al ejecutar varias veces

  Modificar la ruta de la aplicación para que responda el resultado de una query al modelo
  Agregar los interceptores de axios para las cabeceras (200)
  Desarollo de la funcionalidad completa

# Test the back y front
  Aumento de calidad para mantener la agilidad y la entrega contínua de valor.
  Test de backend
  Jest-cli y super-tests. Ejecutar jest dejándolo como comando del proyecto con npm-scripts.
  Crear configuración con jest-init (clear-mocks=true, test-env=node env=V8). Crear la carpeta `/tests` 

# Deploy
