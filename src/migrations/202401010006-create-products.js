'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('products', {
      id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4 },
      title: { type: Sequelize.STRING },
      description: { type: Sequelize.TEXT },
      price: { type: Sequelize.INTEGER },
      image_url: { type: Sequelize.STRING },
      stock_quantity: { type: Sequelize.INTEGER },
      created_at: { type: Sequelize.DATE },
      category_id: { type: Sequelize.UUID, references: { model: 'categories', key: 'id' } },
      brand_id: { type: Sequelize.UUID, references: { model: 'brands', key: 'id' } }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('products');
  }
}; 