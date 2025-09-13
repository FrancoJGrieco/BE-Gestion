const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  const Venta = sequelize.define('Venta', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    numero_ticket: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    empresa: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    total: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    dia: {
      type: DataTypes.DATE,
      allowNull: false
    }

  }, {
    tableName: 'ventas',
    timestamps: false
  })

  Venta.associate = (models) => {
    Venta.hasMany(models.DetalleVenta, { foreignKey: 'venta_id'})
  }

  return Venta
}