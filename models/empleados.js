const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  const Empleado = sequelize.define('Empleado', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    fname: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    lname: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    cuit: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    dni: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    mail: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    nacimiento: {
      type: DataTypes.DATE,
      allowNull: false
    }

  }, {
    tableName: 'empleados',
    timestamps: false
  })

  return Empleado
}