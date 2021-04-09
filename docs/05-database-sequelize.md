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
