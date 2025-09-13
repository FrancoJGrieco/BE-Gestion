'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cuentas', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_e: {
        type: Sequelize.STRING,
        allowNull: false
      },
      password_e: {
        type: Sequelize.STRING,
        allowNull: false
      },
      rol: {
        type: Sequelize.STRING,
        allowNull: false
      },
      empleado_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'empleados',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('cuentas');
  }
};
