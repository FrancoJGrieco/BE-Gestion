const {DataTypes} = require('sequelize')

module.exports = (sequelize) => {
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
    }

  }, {
    tableName:  'cuentas',
    schema: 'public',
    timestamps: false
  })

  return Cuenta
}