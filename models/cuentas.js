const {DataTypes} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  const Cuenta = sequelize.define('Cuenta', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_e: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    password_e:{
      type: DataTypes.TEXT,
      allowNull: false
    },
    rol:{
      type: DataTypes.TEXT,
      allowNull: false
    }

  }, {
    tableName:  'cuentas',
    schema: 'public',
    timestamps: false,
    modelName: 'Cuenta',
  })

   Cuenta.associate = (models) => {
    Cuenta.belongsTo(models.Empleado, {
      foreignKey: 'empleado_id',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION',
    })
  }

  return Cuenta
}