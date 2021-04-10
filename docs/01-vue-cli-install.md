# Creando un proyecto Vue y agregar Vuetify
  Comenzaremos creando un proyecto a través de la línea de comandas de Vue. Para ello la instalaremos de  utilizando el siguiente comando

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

4) Seleccionar `NO` para no configurar History mode debido a que publicaremos esta aplicación de otra manera y no necesitamos la configuración para el servidor. Más detalles en [este link](https://router.vuejs.org/guide/essentials/history-mode.html#html5-history-mode)
![Imagen de paso 4 de instalación](images/01-vue-cli-install-04.png?raw=true)

5) Utilizaremos la configuración de Javascript estándar para la herramienta [ESLint](https://eslint.org/). Si quieres conocer más detalles sobre este estándar puedes visitar [este link](https://standardjs.com/)
![Imagen de paso 5 de instalación](images/01-vue-cli-install-05.png?raw=true)

6) Utilizaremos [Jest](https://jestjs.io/) para crear pruebas de integración en el proyecto.
![Imagen de paso 6 de instalación](images/01-vue-cli-install-06.png?raw=true)

7) Utilizaremos [Cypress](https://www.cypress.io/) para crear pruebas e2e.
![Imagen de paso 7 de instalación](images/01-vue-cli-install-07.png?raw=true)

8) Seleccionaremos la opción que nos permite que las configuraciones de las herramientas de desarrollo como `ESLint` tenga su propio archivo de configuración
![Imagen de paso 8 de instalación](images/01-vue-cli-install-08.png?raw=true)

9) Finalmente seleccionaremos la opción `NO` porque de momento no necesitaremos compartir toda esta configuración que acabamos de crear.
![Imagen de paso 9 de instalación](images/01-vue-cli-install-09.png?raw=true)

Con esto comenzará la instalación y se generará todo el código inicial para que podamos comenzar con todo lo necesario para construir nuestra aplicación Frontend.

Una vez terminada la instalación en primer lugar navegaremos al repositorio recién creado y agregaremos [Vuetify](https://vuetifyjs.com/) utilizando el siguiente comando:

```bash
vue add vuetify
```
Nos preguntará si queremos seleccionar algun tipo de configuración. Seleccionaremos la opción predeterminada como muestra la siguiente imagen:

![Imagen de paso 10 de instalación](images/01-vue-cli-install-10.png?raw=true)

Ya hemos instalado todo lo necesario para comenzar nuestro proyecto Frontend.
Al correr el comando `npm run serve` y luego yendo al navegador en la dirección `http://localhost:8080/` veremos lo siguiente:


![Imagen resultado final de instalaciones](images/01-vue-cli-install-11.png?raw=true)

Para finalizar agregaremos los cambios  sumados por Vuetify a Git. Para esto comenzeremos a utilizar el formato de [Conventional Commits](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional) para escribir los mensajes de commit. Escribamos el siguiente comando:

```bash
git add .
git commit -m "chore(vuetify): se agrega Vuetify al proyecto Frontend"
```
Listo! ya estamos preparados para ir al siguiente paso de la construcción del proyecto .

<div style="display: flex; justify-content: space-between">
    <a href="../README.md">⬅ Ir al intro</a>
    <a href="./02-bdd-with-cypress.md"> Escribiendo Pruebas E2E siguiendo la metodología BDD ➡</a>
</div>
