'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const passwordHash = await bcrypt.hash('asd123', 10);
    await queryInterface.bulkInsert('cuentas', [
      {
        user_e: 'franco',
        password_e: passwordHash,
        rol: 'admin',
        empleado_id: 1,

      },
      {
        user_e: 'admin2@empresa.com',
        password_e: passwordHash,
        rol: 'admin',
        empleado_id: 2,

      },

    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('cuentas', null, {});
  }
};
