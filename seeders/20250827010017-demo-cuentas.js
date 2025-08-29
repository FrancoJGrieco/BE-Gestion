'use strict';
const bcrypt = require('bcrypt')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   const hashAdm = await bcrypt.hash('admin123', 10)
   const hashCaj = await bcrypt.hash('cajero123', 10)
   await queryInterface.bulkInsert('cuentas', [
    {
      user_e: 'admin',
      password_e: hashAdm
    },
    {
      user_e: 'cajero',
      password_e: hashCaj
    }
   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('cuentas', null, {})
  }
};
