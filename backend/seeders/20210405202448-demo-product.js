const products = require('../../fixtures/products.json')
const tableName = 'Products';

module.exports = {
  up: async (queryInterface) => {
    /**
     * Add seed commands here.
     *
     * Example:
    */
      await queryInterface.bulkDelete(tableName, null, { truncate: true })
      await queryInterface.bulkInsert(tableName, products, {});
  },

  down: async (queryInterface) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete(tableName, null, { truncate: true });
  }
};
