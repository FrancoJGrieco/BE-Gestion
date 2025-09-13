'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('detalle_ventas', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      producto: {
        type: Sequelize.STRING,
        allowNull: false
      },
      cantidad: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      precio: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      venta_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'ventas',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('detalle_ventas')
  }
};
