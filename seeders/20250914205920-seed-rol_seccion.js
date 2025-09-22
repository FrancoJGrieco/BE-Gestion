'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('rol_seccion', [
      //Administrador
      {
        rol_id: 1,
        seccion_id: 1
      },
      {
        rol_id: 1,
        seccion_id: 2
      },
      {
        rol_id: 1,
        seccion_id: 3
      },
      {
        rol_id: 1,
        seccion_id: 4
      },
      {
        rol_id: 1,
        seccion_id: 5
      },
      {
        rol_id: 1,
        seccion_id: 6
      },
      {
        rol_id: 1,
        seccion_id: 7
      },
      //Cajero
      {
        rol_id: 2,
        seccion_id: 1
      },
      {
        rol_id: 2,
        seccion_id: 2
      },

    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('rol_seccion', null, {});
  }
};
