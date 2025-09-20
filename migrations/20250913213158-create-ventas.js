'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ventas', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      numero_ticket: {
        type: Sequelize.STRING,
        allowNull: false
      },
      empresa: {
        type: Sequelize.STRING,
        allowNull: false
      },
      numero_caja: {
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
        onDelete: 'CASCADE'
      },
      total: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      dia: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      }
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ventas')
  }
};
