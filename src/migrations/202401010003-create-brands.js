'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('brands', {
      id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4 },
      name: { type: Sequelize.STRING, unique: true }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('brands');
  }
}; 