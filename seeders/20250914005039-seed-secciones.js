'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
        await queryInterface.bulkInsert('secciones', [
      {
        //id 1
        nombre: 'ventas',
      },
      {
        //id 2
        nombre: 'productos',
      },
      {
        //id 3
        nombre: 'empleados',
      },
      {
        //id 4
        nombre: 'roles',
      },
      {
        //id 5
        nombre: 'cuentas',
      },
      {
        //id 6
        nombre: 'turnos',
      },
      {
        //id 7
        nombre: 'configuracion',
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('secciones', null, {});
  }
};
