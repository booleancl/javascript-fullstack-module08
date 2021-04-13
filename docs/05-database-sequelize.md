# Base de datos

En esta sección configuraremos una opción muy común para persistir los datos que gestionará la aplicación. Nos referimos a las bases de datos relacionales, las que vienen en un montón de dialectos diferentes (psql, mysql, sqlite, oracle, etc), pero para no tener que decidir ahora cual usar, vamos a emplear una librería que nos entregará una capa de abstracción superior y que podemos configurar según las necesidades de cada entorno (desarrollo, producción, staging, etc). En el caso de Nodejs la librería más popular es `Sequelize`. Además de ser un traductor para los diferentes motores específicos de bases de datos, Sequelize es un ORM que entrega muchas facilidades para mantener sincronizada nuestra aplicación con el modelo de datos.

Para usar Sequelize agregaremos las siguientes dependencias en la carpeta backend

```bash
cd backend <- asegúrate de estar en esta carpeta
npm i sequelize
npm i sequelize-cli sqlite3 --save-dev
```

Con estos comandos hemos agregado `Sequelize` como dependencia general y `Sequelize-cli` y `Sqlite3` como dependencias de desarrollo. Estás últimas nos permitirán modelar de forma más ágil y ligera nuestras bases de datos de desarrollo. Más adelante, cuando estemos próximos al despliegue seleccionaremos y configuraremos la base de datos para el ambiente productivo.

Para no tener que instalar el cli de Sequelize en forma global, podemos exponer el comando desde el mismo node_modules del proyecto. Para eso hay que modificar el package.json del proyecto Backend de la siguiente forma:

```javascript
 ...
  "scripts": {
    "start": "nodemon src/server.js",
    "sequelize": "sequelize", <- esto!
    "test": "echo \"Error: no test specified\" && exit 1"
  },
...
```
Sequelize-cli por defecto creará los modelos y las migraciones en la carpeta raíz, es decir, no sabe que trabajamos con un monorepo con Backend y Frontend, por lo que debemos configurar eso mediante un archivo denominado .sequelizerc con el siguiente contenido:

```javascript
const path = require('path');

module.exports = {
 "config": path.resolve('./src/config', 'config.json'),
 "models-path": path.resolve('./src/models'),
 "seeders-path": path.resolve('./src/seeders'),
 "migrations-path": path.resolve('./src/migrations')
};

```
Ahora podemos ejecutar en la terminal de Backend el comando `npm run sequelize init`. Esto creará las carpetas /config, /models, /config y /seeders dentro de /src. La representación gráfica del proyecto Backend quedaría como en el siguiente esquema:

```bash
backend/src
├── config
├── migrations
├── models
├── seeders
└── server.js

```

Continuaremos modificando el archivo `/src/config/config.json` para modificar el dialecto en el entorno de desarrollo. Por defecto es `mysql` pero usaremos algo más ligero como `sqlite`:

```javascript
"development": {
    "username": "root",
    "password": null,
    "database": "database_development",
    "host": "127.0.0.1",
    "dialect": "sqlite" <- está línea
  },
```
Con eso en su lugar crearemos el primer modelo. En este caso crearemos el modelo producto con los atributos acordados en los Fixtures. En la terminal del backend ejecutaremos el siguiente comando.

```javascript
npm run sequelize model:generate -- --name Product --attributes name:string,description:string,code:string,image:string
```

Como profundizamos en el curso, la estructura de la base de datos debe ser modificada utilizando scripts de migración. El comando anterior creó un script que agrega una tabla con el nombre del modelo más los atributos como columnas. Sequelize agrega por defecto el atributo id de típo numérico  autoincremental y considera el caso de los atributos `created_at` y `updated_at`. Desafortunadamente el valor por defecto de estos dos atributos debemos establecerlo nosotros. Lo haremos en el mismo archivo de migración reemplazado el valor de ambos campos con lo que sigue.

  ```javascript
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"), <- Aquí
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"), <- Aquí
      },
  ```
 Para que esta migración modifique la estructura, debemos ejecutar el archivo de migración con el siguiente comando:

`npm run sequelize db:migrate`

Para cargar los datos iniciales en el ambiente de desarrollo creamos un archivo `seed` con el siguiente comando: 

`npm run sequelize seed:generate -- --name load-products`

Esto tan solo crea un archivo dentro de la carpeta /`/seeders` que con simple javascript permite ingresar datos a nuestras tablas. El contenido del únco archivo seed será e siguiente:

```script
const path = require('path')
const fixturesFolder = path.join(path.resolve('.'), '../fixtures')
const products = require(`${fixturesFolder}/products.json`)

const tableName = 'Products';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkDelete(tableName, null, { truncate: true })
    await queryInterface.bulkInsert(tableName, products, {})
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete(tableName, null, { truncate: true })
  }
}

```

Como último paso en esta etapa es ejecutar este seed con el siguiente comando:

`npm run sequelize db:seed:all`

Es importante notar que, a pesar de que es posible ingresar datos a la base de muchas formas. Es mejor seguir esta forma ya que los fixtures representan una parte importante del modelo de datos y por consiguiente de del *negocio* y es el acuerdo común entre Backend, Frontend y Negocio.

Si contamos con un visor de bases de datos sqlite, podemos ver gráficamente el resultado como en la siguiente imágen:

![visor de bdd](images/05-database-sequelize-01.png)
  

Agregar el destroy all al seed para no tener problemas al ejecutar varias veces

Modificar la ruta de la aplicación para que responda el resultado de una query al modelo
Agregar los interceptores de axios para las cabeceras (200)
Desarollo de la funcionalidad completa
