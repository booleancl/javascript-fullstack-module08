const express = require("express");
const { cors, auth } = require("./middleware");
const router = require("./routes");

const app = {
  enableCors(app) {
    app.use(cors);
  },

  setRoutes(app) {
    app.use("/api", auth);
    app.use("/api", router);
  },

  initialize() {
    const expressApp = express();
    this.enableCors(expressApp);
    this.setRoutes(expressApp);
    return expressApp;
  },
};

module.exports = app;
