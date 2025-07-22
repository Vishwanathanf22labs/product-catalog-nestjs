'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('product_colors', {
      product_id: { type: Sequelize.UUID, references: { model: 'products', key: 'id' } },
      color_id: { type: Sequelize.UUID, references: { model: 'colors', key: 'id' } }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('product_colors');
  }
}; 