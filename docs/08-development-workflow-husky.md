# Development Workflow Monorepo
En el capítulo 3, cuando creamos el monorepo con ambas partes del stack, no configuramos herramientas para el manejo global del proyecto. Por ejemplo, para levantar el servidor o ejecutar los tests debemos ingresar a las respectivas carpetas antes. Esto puede ser incómodo cuando queremos probar todo antes de salir a producción, o si necesitamos hacer pruebas integradas antes, pero puede ser muy bueno si queremos aislar uno de sus stacks para desarrollo.

Entonces implementaremos una forma de revisión del sistema integrado para que al final podamos estandarizar tareas como pre-commits que nos ayuden a mantener prácticas estandarizadas y nos ayuden con la calidad de la plataforma en su totalidad.

De momento tenemos esto en la raíz del proyecto. Solo tenemos el archivo .gitignore como herramienta global. Tendremos que iniciar npm para integrar paquetes y comandos globales. 



```bash
.
├── backend
├── fixtures
└── frontend
.gitignore

```

En la raíz ejecutar el comando `npm init -f`. Nos creará un archivo como este. No usaremos la propiedad `main`, por lo que la eliminamos del archivo.

```javascript
{
  "name": "tú-proyecto-name",
  "version": "1.0.0",
  "description": "",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

Instalaremos los paquetes necesarios con el siguiente comando `npm install husky npm-run-all`.

Como necesitamos estandarizar las tareas de calidad de código necesitamos configurar el linter en el backend al igual como lo tenemos en el frontend. Esto es una deuda técnica que no hemos abordado y enfrentaremos ahora.

# Configurar linter en el backend

cd backend
npm install -D eslint

```javascript
{
  "name": "backend",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "nodemon src/server.js",
    "test": "jest --runInBand --coverage",
    "eslint": "eslint",
    "jest": "jest",
    "sequelize": "sequelize"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.17.1",
    "firebase-admin": "^9.6.0",
    "sequelize": "^6.6.2"
  },
  "devDependencies": {
    "eslint": "^7.24.0",
    "nodemon": "^2.0.7",
    "sequelize-cli": "^6.2.0",
    "sqlite3": "^5.0.2"
  }
}

```

`npm run eslint -- --init`

y responder de la siguiente forma 

PONER LA FOTO

Continuamos moodificando el c

Ahora 

- instalar husky y npm run-all
- linter en el backend
- configurar los linters para tests
- probar el linter en el front
- crear scripts de npm y probar en front y back
- extraer el comando husky y hacer husky install
- npx husky add .husky/pre-commit "npm test"
- crear los hooks para el proyecto