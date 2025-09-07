const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  const DetalleVenta = sequelize.define('DetalleVenta', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    producto: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    precio: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
  }, {
    tableName: 'detalle_ventas',
    timestamps: false
  })

  DetalleVenta.associate = (models) => {
    DetalleVenta.belongsTo(models.Venta, {
      foreignKey: 'venta_id',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION',
    })
  }

  return DetalleVenta
}