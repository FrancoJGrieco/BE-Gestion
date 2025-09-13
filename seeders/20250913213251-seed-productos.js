'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('productos', [
      {
        name: 'Café',
        codigo: 'PROD-001',
        price: 500.00,
        cant: 100
      },
      {
        name: 'Leche',
        codigo: 'PROD-002',
        price: 300.00,
        cant: 50
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('productos', null, {});
  }
};
