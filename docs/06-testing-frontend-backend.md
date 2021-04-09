# Test the back y front
  Aumento de calidad para mantener la agilidad y la entrega contínua de valor.
  
  ## Test de backend

  - Instalar `jest`, `jest-cli` y `supertest`.
  - Ejecutar jest dejándolo como comando del proyecto con npm-scripts.
  - Crear configuración con jest-init (clear-mocks=true, test-env=node env=V8). 
  - Configurar la bases de datos para el entorno de test en Sequelize. 
  - Crear la carpeta `/tests`. 
  - Mover la lógica de la aplicación a un archivo aparte `app.js` usando el patrón módulo e invocarlo desde el `server.js`.
  - Modificar el comanda de test del package.json con `--runInBand --coverage` 
  - El primer tests será el de authenticación, con tres casuisticas y el de products con los fixtures.
  -  Con los test pasando, volvemos a refactorizar para dividir los controladores, middelware y routes siguendo principios SOLID. Claramente los test deben seguir pasando.

## Test de frontend