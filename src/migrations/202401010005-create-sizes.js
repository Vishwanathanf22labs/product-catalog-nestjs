'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sizes', {
      id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4 },
      value: { type: Sequelize.STRING, unique: true }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('sizes');
  }
}; 