const express = require("express");
const { cors, auth } = require("./middleware");
const router = require("./routes");

const app = {
  enableCors(app) {
    app.use(cors);
  },

  enablePublicFolder(app){
    app.use(express.static(`${__dirname}/public`));
  },

  setRoutes(app) {
    app.use("/api", auth);
    app.use("/api", router);
  },

  initialize() {
    const expressApp = express();
    this.enableCors(expressApp);
    this.setRoutes(expressApp);
    this.enablePublicFolder(expressApp)
    return expressApp;
  },
};

module.exports = app;
