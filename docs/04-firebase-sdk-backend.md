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