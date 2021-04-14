# Refactorización guiada por pruebas de software Backend y Frontend
  En este punto la funcionalidad ya está completa, pero la organización del código se puede mejorar para aumentar su flexibilidad a los cambios que inevitablemente llegarán.

  Para esto necesitamos una forma de asegurar que no romperemos nada de lo que hemos logrado. La funcionalidad se debe mantener, pero la calidad del código debe aumentar. Para esto agregaremos pruebas de software para el código tanto en el Backend como en el Frontend.

## Pruebas de Backend

En este momento el servidor tiene las siguientes características:

- Valida que las solicitudes a `/api` estén autenticadas con 4 casos posibles.
- Las solicitudes ya autenticadas que consultan `/api/products` pueden tener 2 casos posibles.

Estas son las funcionalidades que debemos mantener y que deben resistir el proceso de refactorización.

Utilizaremos tres herramientas populares de Javascript para escribir y ejecutar pruebas: `jest`, `jest-cli` y `supertest`. Primero navegamos a la carpeta `/backend` y luego ejecutamos el siguiente comando: 

```bash
npm i jest jest-cli supertest --save-dev
```
Al igual que como lo hicimos con Sequelize-cli, vamos a exponer el comando de Jest para no tener que instalarlo globalmente. Eso es en el archivo `backend/package.json`. También vamos a cambiar el comando de test que viene por defecto. El archivo quedaría de la siguiente forma:

```javascript
 ...
  "scripts": {
    "start": "nodemon src/server.js",
    "test": "jest --runInBand --coverage",
    "jest": "jest",
    "sequelize": "sequelize"
  },
...
```
Jest tiene el comando --init para configurar el entorno de pruebas. El comando a ejecutar es el siguiente:
 `npm run jest -- --init`
Esto nos hará una pequeña serie de preguntas que debemos responder con lo siguiente:

![jest --init](images/06-testing-frontend-backend-01.png)

Ahora continuaremos configurando una base de datos exclusivamente para la ejecución de pruebas. Para esto modificamos el archivo `backend/src/config/config.json`
en la sección "test".

```javascript
"test": {
    "username": "root",
    ...
    "host": "test.database.sqlite3",
    "dialect": "sqlite",
    "logging": false
  },
```
Durante la ejecución de las pruebas se creará una nueva bases de datos que no necesitamos incluir en el repositorio, por lo que agregaremos el nombre  de la base de datos de prueba `test.database.sqlite3` al `.gitignore`.

Para probar el backend vamos a crear la carpeta `/tests` dentro de `backend` y crearemos una prueba simple para revisar que esté todo bien conectado. A este archivo lo llamaremos `auth.test.js` ya que es la primera funcionalidad de describimos de nuestro servidor. Su contenido es el siguiente:

```javascript
const server = require('../src/server')

describe('Auth middleware',() => {
  it('works', () => {
    expect(true).toEqual(true)
  })
})

```

Esto lo ejecutamos con el comando que configuramos `npm test`. La salida en la terminal de esta ejecución es la siguiente:

![error-async](images/06-testing-frontend-backend-02.png)

Tenemos resultados confusos, ya que en concreto la prueba si pasa, pero vemos una indicación en rojo de que estamos haciendo un `console.log` una vez terminada la prueba. En este caso es Express en la llamada `app.listen` que hace correr un proceso en forma indefinida y jest queda ejecutándose. Entonces debemos separar lo que vamos a probar (la lógica) de lo que ejecuta el servidor (`listen`).

Logramos esto separando el archivo `server.js` para que quede de la siguiente forma: 

```javascript
const app = require('./app')
const port = process.env.PORT
const environment = process.env.NODE_ENV

app.listen(port, () => {
  console.log(`App server listening in mode ${environment} on port ${port}`);
})

```
El resto del contenido lo agregaremos aun archivo llamado `app.js` también en la raíz de Backend con lo siguiente:


```javascript
const express = require('express')
const admin = require('firebase-admin')
const Models = require('./models')

const app = express()


admin.initializeApp({credential: admin.credential.applicationDefault()})

app.use('/api', async (request, response, next) => {
  console.log('dentro');

  const headerToken = request.headers.authorization;
  if (!headerToken) {
    return response.status(401).json({ message: "No token provided" })
  }

  const [authorizationType, tokenValue] = headerToken.split(" ")

  if (headerToken && authorizationType.toLowerCase() !== "bearer") {
    return response.status(401).json({ message: "Invalid token" })
  }

  try {
    await admin.auth().verifyIdToken(tokenValue)
    next()

  } catch (error) {
    console.error(error.message)

    response
      .status(403)
      .json({ message: "Could not authorize" })
  }
})

app.use('/api/products', async (request, response) => {
  let statusCode = 200
  const Product = Models.Product;
  
  try {
    const products = await Product.findAll()

    console.log(`GET with status code ${statusCode} in /api/products endpoint`)

    return response
      .status(statusCode)
      .json(products)

  } catch (error) {
    const { message } = error
    statusCode = 500

    console.error(`GET with status code ${statusCode} in /api/products endpoint. Error: ${message}`)
    
    return response
      .status(statusCode)
      .json({ message })
  }
})

module.exports = app

```
Y modificamos la prueba para requerir el archivo `app.js`:

```javascript
const app = require('../src/app')

describe('Auth middleware',() => {
  it('works', () => {
    expect(true).toEqual(true)
  })
})

```
Con estos ajustes la salida de los tests queda de la siguiente forma:
![jest simple test passing](images/06-testing-frontend-backend-03.png)

Dijimos que son 4 casos posibles durante la validación  de autenticación. Partiremos con el caso más simple e iremos avanzando uno por uno. 

#### Retorna 401 cuando no viene la cabecera de autorización

```javascript
const supertest = require('supertest')
const app = require('../src/app')

describe('Auth middleware',() => {
  it("returns 401 when there is no authorization header", async () => {
    const response = await supertest(app)
      .get('/api/fake')
      .expect(401)
    expect(response.body).toMatchObject({ message: "No token provided" });
  })
})
```

En adelante vamos a complementar este script con los bloques `it` por cada uno de los otros 3 casos

#### Retorna 401 cuando el token no es bearer

```javascript
it('returns 401 when the token is not a bearer token', async ()=>{
    const response = await supertest(app)
      .get("/api/fake")
      .set('Authorization','Token faketoken')
      .expect(401);
    expect(response.body).toMatchObject({ message: "Invalid token" });
  })

```
#### Retorna 403 cuando el token es bearer, pero no válido

En este caso debemos crear un mock de la librería `firebase-admin`. Por lo que hay que agregar esto al inicio de la prueba.

```javascript
const supertest = require('supertest')
const app = require('../src/app')
const admin = require('firebase-admin');

jest.mock('firebase-admin', () => ({
  auth: jest.fn().mockReturnValue({ verifyIdToken: jest.fn() }),
  credential: {
  applicationDefault: jest.fn(),
  },
  initializeApp: jest.fn()
}))
...

```
Ahora sí podemos agregar el último `it` en el que forzaremos un rechazo de la promesa en la función `verifyIdToken`, para simular que se entregó un token inválido.

```javascript

it('returns 403 when an invalid token is passed',async () => {
    admin.auth().verifyIdToken.mockRejectedValue(new Error());
    const response = await supertest(app)
      .get("/api/fake")
      .set("Authorization", "Bearer faketoken")
      .expect(403);
    expect(response.body).toMatchObject({ message: "Could not authorize" })

  })
```

El cuarto caso, cuando se invoca a la función `next`, será cubierto cuando la solicitud llega finalmente al endpoint de GET `/api/products` que será lo próximo a probar. 

En la ultima prueba jest incluso nos muestra el `console.error` que se debe ejecutar en el código de la aplicación cuando llega un token inválido. Lo puedes ver en el siguiente screenshot:

![jest auth test](images/06-testing-frontend-backend-04.png)

Con todo lo anterior el código completo del `auth.test.js` queda de la siguiente forma:

#### 
```javascript
const supertest = require('supertest')
const app = require('../src/app')
const admin = require('firebase-admin');

jest.mock('firebase-admin', () => ({
  auth: jest.fn().mockReturnValue({ verifyIdToken: jest.fn() }),
  credential: {
  applicationDefault: jest.fn(),
  },
  initializeApp: jest.fn()
}))

describe('Auth middleware',() => {
  it("returns 401 when there is no authorization header", async () => {
    const response = await supertest(app)
      .get('/api/fake')
      .expect(401)
    expect(response.body).toMatchObject({ message: "No token provided" });
  })
  it('returns 401 when the token is not a bearer token', async ()=>{
    const response = await supertest(app)
      .get("/api/fake")
      .set('Authorization','Token faketoken')
      .expect(401);
    expect(response.body).toMatchObject({ message: "Invalid token" });
  })

  it('returns 403 when an invalid token is passed',async () => {
    admin.auth().verifyIdToken.mockRejectedValue(new Error());
    const response = await supertest(app)
      .get("/api/fake")
      .set("Authorization", "Bearer faketoken")
      .expect(403);
    expect(response.body).toMatchObject({ message: "Could not authorize" })
  })
})

```

Seguimos adelante con las pruebas cuando la solicitud pasa el middleware de autorización y solicita el listado de productos.
Como es otra funcionalidad lo haremos en un archivo aparte llamado `products.test.js`. Este es un caso más complejo, porque debemos simular (usando dobles de prueba) que la solicitud cumple con los requisitos de autorización, de otra forma nuestro código no se ejecutará. Además necesitamos probar que la aplicación entrega el arreglo de productos definido en los Fixtures, por lo que hay agregar estos datos a la BDD antes de enviar la solicitud. Esto lo hacemos con ayuda de los Hooks `beforeAll` y `afterAll`. La prueba queda de la siguiente forma:

```javascript
const supertest = require('supertest');
const admin = require('firebase-admin');
const app = require('../src/app');
const Models = require('../src/models');
const products = require('../../fixtures/products.json')

jest.mock('firebase-admin', () => ({
  auth: jest.fn().mockReturnValue({ verifyIdToken: jest.fn() }),
  credential: {
    applicationDefault: jest.fn(),
  },
  initializeApp: jest.fn()
}))

describe('/api/products',() =>{

  beforeAll(async () => {
    await Models.sequelize.sync({force: true})
    await Models.Product.bulkCreate(products)
  })

  it('returns an array of products', async () => {
    admin.auth().verifyIdToken.mockResolvedValue(true);
    const response = await supertest(app)
      .get('/api/products')
      .set('Authorization', 'Bearer faketoken')
      .expect(200);
    expect(response.body).toMatchObject(products);    
  })

  afterAll(async () => {
    await Models.sequelize.close();
  })
})

```

-  Con los test pasando, volvemos a refactorizar para dividir los controladores, middelware y routes siguendo principios SOLID. Claramente los test deben seguir pasando.

## Test de frontend