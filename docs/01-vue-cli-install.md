# Creando un proyecto usando CLI y framework UI

Comenzaremos creando un proyecto a través de la línea de comandos de Vue. Para ello la instalaremos con el siguiente comando

```bash
npm install -g @vue/cli
```

Una vez instalado navegamos a través de la terminal hacia el directorio donde queremos crear el proyecto y ejecutamos el siguiente comando:

```bash
vue create <nombre-de-tu-proyecto>
```

Deberemos contestar una serie de preguntas. Veamos en detalle que responderemos a cada una de ellas.

1) Seleccionaremos la opción que nos permita seleccionar manualmente las tecnologías que usaremos
![Imagen de paso 1 de instalación](images/01-vue-cli-install-01.png?raw=true)

2) Utilizando la tecla `espacio` agregaremos las opciones que puedes ver en la siguiente imagen
![Imagen de paso 2 de instalación](images/01-vue-cli-install-02.png?raw=true)

3) Elegiremos la versión 2 de Vue
![Imagen de paso 3 de instalación](images/01-vue-cli-install-03.png?raw=true)

4) Seleccionar `Y` para configurar History mode y posteriormente haremos la configuración requerida para el servidor en Express. Más detalles en [este link](https://router.vuejs.org/guide/essentials/history-mode.html#html5-history-mode)
![Imagen de paso 4 de instalación](images/01-vue-cli-install-04.png?raw=true)

5) Utilizaremos la configuración de Javascript estándar para la herramienta [ESLint](https://eslint.org/). Si quieres conocer más detalles sobre este estándar puedes visitar [este link](https://standardjs.com/)  
![Imagen de paso 5 de instalación](images/01-vue-cli-install-05.png?raw=true)

6) Seleciona lint on save ![Lint on save](images/01-vue-cli-install-05-b.png?raw=true)

7) Utilizaremos [Jest](https://jestjs.io/) para crear pruebas de integración en el proyecto.
![Imagen de paso 6 de instalación](images/01-vue-cli-install-06.png?raw=true)

8) Utilizaremos [Cypress](https://www.cypress.io/) para crear pruebas e2e.
![Imagen de paso 7 de instalación](images/01-vue-cli-install-07.png?raw=true)

9) Seleccionaremos la opción que nos permite que las configuraciones de las herramientas de desarrollo como `ESLint` tenga su propio archivo de configuración
![Imagen de paso 8 de instalación](images/01-vue-cli-install-08.png?raw=true)

10) Finalmente damos enter para utilizar la opción por defecto (por convención es la opción en mayúsculas)
![Imagen de paso 9 de instalación](images/01-vue-cli-install-09.png?raw=true)

Esto creará una carpeta con la estructura inicial y todo lo necesario para construir nuestra aplicación Frontend.

Una vez terminada la instalación ingresamos al repositorio recién creado y agregaremos [Vuetify](https://vuetifyjs.com/) (durante el proceso de instalación  vue-cli ejecutó `git init`) utilizando el siguiente comando:

```bash
vue add vuetify
```

Vuetify es una de las tantas (Buefy, Element, Bootstrap Vue) librerías de componentes UI de alta productividad para Vue.

Nos preguntará si queremos seleccionar algún tipo de configuración. Seleccionaremos la opción predeterminada como muestra la siguiente imagen:

![Imagen de paso 10 de instalación](images/01-vue-cli-install-10.png?raw=true)

Ya hemos instalado todo lo necesario para comenzar nuestro proyecto Frontend.
Al correr el comando `npm run serve` y luego yendo al navegador en la dirección `http://localhost:8080/` veremos lo siguiente:


![Imagen resultado final de instalaciones](images/01-vue-cli-install-11.png?raw=true)

Para finalizar agregaremos los cambios  sumados por Vuetify a Git. Para esto comenzeremos a utilizar el formato de [Conventional Commits](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional) para escribir los mensajes de commit. Escribamos el siguiente comando:

```bash
git add .
git commit -m "chore(vuetify): Create Vue project with Vuetify"
```
Listo! ya estamos preparados para ir al siguiente paso de la construcción del proyecto .


<table>
  <tr>
    <th colspan="2">
      <a href="docs/01-vue-cli-install.md">
        <span>⬅️ </span> Volver al Índice del curso
      </a>
    </th>
    <th colspan="2">
      <a href="docs/01-vue-cli-install.md"> Escribiendo Pruebas E2E siguiendo la metodología BDD
        <span>➡️ </span>
      </a>
    </th>
  </tr>
</table>
