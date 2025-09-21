'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('empleados', [
      {
        
        fname: "Franco",
        lname: "Grieco",
        cuit: "20-40015526-9",
        dni: 40015526,
        mail: "francogriecoo@gmail.com",
        nacimiento: "1996-12-21",
      },
      {        
        fname: "Roque",
        lname: "Grieco",
        cuit: "20-21653625-9",
        dni: 21653625,
        mail: "roquegriecoo@gmail.com",
        nacimiento: "1944-11-01",
      },
      {
        fname: "Cajero",
        lname: "Uno",
        cuit: "20-24343435-9",
        dni: 24343435,
        mail: "cajerouno@gmail.com",
        nacimiento: "1943-11-01",
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('empleados', null, {});
  }
};
