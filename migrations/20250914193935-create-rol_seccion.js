'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('rol_seccion', {
      seccion_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'secciones',
          key: 'id',
        },
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION',
      },
      rol_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'roles',
          key: 'id',
        },
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION',
      },
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('rol_seccion')
  }
};
