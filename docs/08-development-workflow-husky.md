# Flujo de desarrollo del proyecto

En el capítulo 3 creamos el monorepo con las partes Frontend y Backend que van a conformar nuestra plataforma pero no configuramos herramientas para el manejo global del proyecto.

Implementaremos una forma de revisión de la plataforma para que podamos estandarizar tareas como pre-commits que nos ayuden a mantener prácticas estandarizadas y nos ayuden con la calidad de la plataforma en su totalidad. De esta forma asegurarnos que cada vez que se quiera agregar código al repositorio central, este mantenga su calidad.

Nuestro proyecto en la raíz debería verse como en el siguiente esquema:

```bash
.
├── backend
├── fixtures
└── frontend
.gitignore

```

En la raíz del proyecto vamos a ejecutar el siguiente comando:
```bash
npm init -f
```
Esto nos creará un archivo como el que se muestra a continuación. 

```javascript
{
  "name": "<nombre-de-tu-proyecto>",
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
Notar que no usaremos la propiedad `main`, por lo que la eliminamos del archivo.

Instalaremos los paquetes necesarios con el siguiente comando `npm install husky npm-run-all`.

Como necesitamos estandarizar las tareas de calidad de código necesitamos configurar el linter en Backend con el mismo estándar configurado por Vue para el Frontend.

#### Configurar linter en el backend

Nos aseguramos de navegar hacia la carpeta `backend` y en su interior ejecutamos el siguiente comando:

```bash
npm install --save-dev eslint
```
Ahora modificaremos la sección `scripts` del archivo `backend/package.json` y vamos a exponer el comando `eslint` como se muestra en el siguiente trozo de código:

```javascript
"scripts": {
  "start": "nodemon src/server.js",
  "test": "jest --runInBand --coverage",
  "eslint": "eslint",
  "jest": "jest",
  "sequelize": "sequelize"
},
```

Ahora vamos a inicializar Eslint corriendo el siguiente comando:

```bash
npm run eslint -- --init
```

Se nos harán una serie de pregunta. Nos aseguraremos de contestarlas con las respuestas que muestra la siguiente imagen:

![Imagen que muestra respuesta a eslint --init](images/08-dev-workflow-05.png)


El archivo generado por Eslint debería haber quedado de la siguiente forma:

**backend/.eslintrc**

```javascript
module.exports = {
  "env": {
      "commonjs": true,
      "es2021": true,
      "node": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
      "ecmaVersion": 12
  },
  "rules": {
  }
};

```

Ahora agregaremos un nuevo script que será el encargado de ejecutar el linter para este proyecto. Volvemos a la sección `script` del archivo `backend/package.json` y debería verse de la siguiente forma:

```javascript
"scripts": {
  "start": "nodemon src/server.js",
  "test": "jest --runInBand --coverage",
  "lint": "eslint .",
  "eslint": "eslint",
  "jest": "jest",
  "sequelize": "sequelize"
},
```

Ahora podremos ejecutar el siguiente comando desde la raíz del directorio backend:

```bash
npm run lint
```

Al ejecutar el comando podremos ver todos los errores asociados al estándar que estamos siguiendo con Eslint, pero también veremos otros errores que están relacionados al Framework para pruebas que estamos usando: Jest.
Estos errores se ven como se muestra en la siguiente imagen:

![Imagen que muestra errores de jest en linter](images/08-dev-workflow-06.png)

Esto sucede porque el estándar por defecto que instalamos con Eslint no viene preparado para ver los archivos de Jest. Para esto instalaremos un plugin de Eslint con el siguiente comando ejecutado en la raíz del directorio `backend`:

```bash
npm i --save-dev eslint-plugin-jest
```

y reemplazamos el contenido del archivo `backend/.eslintsrc` con el siguiente contenido:

```javascript
module.exports = {
  "env": {
    "commonjs": true,
    "es2021": true,
    "node": true,
    "jest/globals": true
  },
  "extends": "eslint:recommended",
  "plugins": [
    "jest"
  ],
  "parserOptions": {
    "ecmaVersion": 12
  },
  "rules": {
  }
};

```

Con esta configuración ya somos capaces de corregir los errores que nos indique Eslint sin problemas corriendo el comando `npm run lint`.

#### Scripts de pre-commit para el proyecto


- extraer el comando husky y hacer husky install
- npx husky add .husky/pre-commit "npm test"
- crear los hooks para el proyecto