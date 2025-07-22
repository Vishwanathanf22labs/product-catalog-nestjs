'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('product_sizes', {
      product_id: { type: Sequelize.UUID, references: { model: 'products', key: 'id' } },
      size_id: { type: Sequelize.UUID, references: { model: 'sizes', key: 'id' } }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('product_sizes');
  }
}; 