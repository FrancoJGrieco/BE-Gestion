'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('empleados', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      fname: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lname: {
        type: Sequelize.STRING,
        allowNull: false
      },
      cuit: {
        type: Sequelize.STRING,
        allowNull: false
      },
      dni: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      mail: {
        type: Sequelize.STRING,
        allowNull: false
      },
      nacimiento: {
        type: Sequelize.DATE,
        allowNull: false
      }
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('empleados');
  }
};
