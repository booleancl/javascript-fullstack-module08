const App = require('./app');
const app = App.initialize();

const environment = process.env.NODE_ENV;
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App server listening in mode ${environment} on port ${port}`);
});
