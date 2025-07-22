'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ratings', {
      id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4 },
      product_id: { type: Sequelize.UUID, references: { model: 'products', key: 'id' } },
      user_id: { type: Sequelize.STRING },
      value: { type: Sequelize.INTEGER }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('ratings');
  }
}; 