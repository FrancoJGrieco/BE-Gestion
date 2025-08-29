const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  const Producto = sequelize.define('Producto', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    cant: {
      type: DataTypes.INTEGER,
      allowNull: false
    }

  }, {
    tableName: 'productos',
    timestamps: false
  })

  return Producto
}