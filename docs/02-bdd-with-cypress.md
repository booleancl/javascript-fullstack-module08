# Escribiendo Pruebas E2E siguiendo la metodología BDD

Comenzaremos a desarrollar el proyecto a través por la metodología Behaviour Driven Design (de acá en adelante abreviada como BDD). Si quieres conocer más en detalle acerca de ella te recomendamos ver [este video](https://www.youtube.com/watch?v=_bGtaCvaHLE&t=2959s).
Lo primero que vamos a hacer es escribir una prueba de software y para ellos iremos a la 

```
<tu-proyecto>
...
└─── public
└─── src
└─── tests
    └─── e2e
         └─── plugins
         └─── specs
                  test.js <-- vamos a renombrar este archivo
         └─── support
    └─── unit

...
```
Vamos a crear renombrar el archivo test.js indicado en la figura anterior y lo llamaremos `login.test.js`.
Luego cambiaremos su contenido a lo indicado en el siguiente código:

```javascript
describe("login test suite", () => {
  it("does not work with wrong credentials", () => {
    cy.visit("/");
    
    cy.get("[data-cy=username]").type("info");
    cy.get("[data-cy=password]").type("visitor");
    cy.get("[data-cy=login-btn]").click();

    cy.location("pathname").should("equal", "/");
  });
});
```

#### ¿Que significa este código?

Según la metodología BDD nos dice que antes de escribir el código deseado primero debemos escribir una prueba de software que represente un comportamiento de negocio en forma de pasos secuenciales que serían los mismos que haría un usuario real de nuestra aplicación. Por supuesto que como aún no hemos escrito código, esta prueba de software comenzará fallando y será nuestro deber escribir el mínimo código necesario para pasar la prueba. Una vez la prueba de software esté pasando, debemos refactorizar el código (si aplica) y mantener la prueba pasando. A este ciclo lo llamamos `Ciclo Red - Green - Refactor`.

Para ver nuestra prueba fallando ejecutaremos el siguiente comando:

```shell
npm run test:e2e
```

Veremos aparecer la siguiente ventana:

![Imagen que muestra el menú principal de cypress](images/02-bdd-with-cypress-01.png)

Al hacer click sobre `login.test.js` aparecerá finalmente la prueba de software fallando como muestra la siguiente imagen:

![Imagen que muestra el navegador que corre cypress](images/02-bdd-with-cypress-02.png)

Veremos una ventana del navegador en la cual al lado izquierdo están los pasos sucesivos que hemos escrito en la prueba de software y al lado derecho está nuestra aplicación.
Si nos fijamos en el panel izquierdo hay 2 instrucciones:

  ```
    1 VISIT /
    2 GET   [data-cy=username]
  ```
La primera instrucción hizo que nuestra aplicación navegará a la ruta raíz sin problemas, pero luego la segunda instrucción intento encontrar en el HTML un elemento con el atributo `data-cy=username`. Esto lo vemos traducido en el siguiente mensaje de error:

```
CypressError: Timed out retrying: Expected to find element: '[data-cy=username]', but never found it.
```

Si vamos a revisar el contenido del código podremos encontrar las 2 líneas de código que desencadenaron las acciones del panel izquierdo:

```javascript
  cy.visit("/");
  cy.get("[data-cy=username]").type("info");
```
podemos ver como es que el comando `cy.get` es el que se usa para encontrar elementos HTML para interactuar con ellos.

#### ¿Cómo hacemos para arreglar esto?

Como mencionamos anteriormente la metodología nos dice que para que la prueba de software quede pasando debemos escribir el código mínimo que haga que pase. En este caso basta con que agreguemos cualquier elemento en el HTML que tenga el atributo `[data-cy=username]`. 

Para esto nos vamos a dirigir al archivo `src/App.vue`. Agregaremos lo siguiente en la sección de HTML de la vista en la parte donde esta definido el elemento `<v-main>`

```html

  ...
  <v-main>
    <HelloWorld/>
    <!-- Este será el elemento que hará que la prueba deje de arrojar el error actual --->
    <input data-cy="username">
  </v-main>
  ...
```

Una vez agregado esto, guardamos el archivo y veremos que la terminal dirá `COMPILING`. Esperaremos que esto salga OK y luego vamos nuevamente a Cypress y presionamos el botón para recargar las pruebas indicado en al siguiente imagen

![Imagen que muestra el menú principal de cypress](images/02-bdd-with-cypress-03.png)

Veremos como al lado derecho aparece el input que agregamos y que contendrá el valor `info`. Esto fue echo gracias al comando `.type` que ejecutamos sobre el elemento una vez Cypress lo detecta en el HTML.

Ahora veremos un nuevo mensaje de error:


```
CypressError: Timed out retrying: Expected to find element: '[data-cy=password]', but never found it.
```

Si hacemos un análisis de lo que está escrito en la prueba de software podemos deducir que necesitaremos otro input esta vez con el atributo `[data-cy=password]` y luego un botón con el atributo `data-cy=login-btn`.

Al agregar esto en el archivo `views/App.vue` quedará así:


```html

  ...
  <v-main>
    <HelloWorld/>

    <input data-cy="username">
    <input data-cy="password">
    <button data-cy="login-btn">Ingresar</button>
  </v-main>
  ...
```

Finalmente al recargar las pruebas veremos como es que ahora se puso de color verde lo que indica que la prueba está pasando.

![Imagen que muestra el navegador que corre cypress con las pruebas pasando](images/02-bdd-with-cypress-04.png)


#### Refactorización

Si bien nuestras pruebas están pasando, podemos ver que la interfaz de usuario no cumple el objetivo ya que los elementos están definidos sin estilos y además aún tenemos todo el código que agregó Vuetify en su instalación.
Lo que haremos será cambiar todo el código de la página inicial para que ahora sea una página de Login utilizando Vuetify. Mantendremos corriendo el comando `npm run test:e2e` de manera que una vez hagamos todos los cambios, recarguemos las pruebas y nos aseguremos que las pruebas siguen pasando.


Lo primero será modificar el archivo `src/App.vue` y reemplazaremos todo su contenido por lo siguiente:

```html

<template>
  <v-app>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App'
}
</script>

```

Luego iremos al directorio `views`. Acá eliminaremos el archivo `About.vue` y vamos a cambiar el nombre del archivo `Home.vue` por `Login.vue`. Una vez guardemos esto provocará un error en la terminal pero lo solucionaremos de inmediato.
Ahora vamos al archivo `Login.vue` y reemplazaremos todo su contenido con lo siguiente:

```html
<template>
  <v-main class="home">
    <v-card width="400px" class="mx-auto my-auto">
      <v-card-title class="pb-0">
        <h1 class="mx-auto mb-5">Ingreso</h1>
      </v-card-title>
      <v-alert v-if="isFormRejected" type="error">
        <p>Usuario o contraseña inválidos. Ingresa los datos correctos.</p>
      </v-alert>
      <v-form ref="form">
        <v-text-field
          v-model="email"
          label="Correo"
          prepend-icon="mdi-account-circle"
          :rules="emailRules"
          validate-on-blur
          data-cy="username"
        />
        <v-text-field
          v-model="password"
          label="Contraseña"
          :type="showPassword ? 'text' : 'password'"
          :rules="passwordRules"
          validate-on-blur
          prepend-icon="mdi-lock"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
          data-cy="password"
        />
      </v-form>
      <v-divider />
      <v-card-actions>
        <v-btn to="/registro" color="success"> Registro </v-btn>
        <v-spacer />
        <v-btn color="info" data-cy="login-btn" @click="login"> Ingresar </v-btn>
      </v-card-actions>
    </v-card>
  </v-main>
</template>

<script>

export default {
  data () {
    return {
      isFormValid: false,
      isFormRejected: false,
      formStatusMessage: '',
      email: '',
      emailRules: [
        (v) => !!v || 'El correo es requerido',
        (v) => /.+@.+\..+/.test(v) || 'El correo debe ser válido must be valid'
      ],
      password: '',
      passwordRules: [(v) => !!v || 'La contraseña es requerida'],
      showPassword: false
    }
  },
  methods: {
    login () {}
  }
}
</script>

```

y finalmente cambiamos el archivo `src/router/index.js` con lo siguiente:

```html
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

export default router
```

Ahora podemos recargar nuestras pruebas y deberiamos ver nuestras pruebas pasando y la interfaz más acorde al objetivo de negocio que estamos desarrollando y escribiendo pruebas. El resultado en la siguiente imagen:

![Imagen que muestra el navegador que corre cypress con las pruebas pasando](images/02-bdd-with-cypress-05.png)



https://docs.cypress.io/guides/references/best-practices#Selecting-Elements

La raíz es logín
SDK de firebase
Crear el usuario de pruebas
Login plus ver la página de producto 
Agregar axios, base_url y Vuex con la petición (404)
La prueba de la página de productos fallando 
