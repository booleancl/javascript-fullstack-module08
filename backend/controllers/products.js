const Models = require("../models");
const Product = Models.Product;

module.exports = {
  async index(request, response) {
    const products = await Product.findAll();
    return response.status(200).json(products);  },
};
