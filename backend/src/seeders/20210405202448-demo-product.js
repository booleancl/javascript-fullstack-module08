const path = require('path')
const fixturesFolder = path.join(path.resolve('.'), '../fixtures')
const products = require(`${fixturesFolder}/products.json`)

const tableName = 'Products';

module.exports = {
  up: async (queryInterface) => {
        await queryInterface.bulkDelete(tableName, null, { truncate: true })
        await queryInterface.bulkInsert(tableName, products, {});
  },

  down: async (queryInterface) => {
      await queryInterface.bulkDelete(tableName, null, { truncate: true });
  }
};
