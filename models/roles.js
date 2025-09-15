const { DataTypes } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  const Rol = sequelize.define('Rol', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: 'roles',
    timestamps: false
  })

  Rol.associate = (models) => {
    Rol.belongsToMany(models.Seccion, {
      through: 'rol_seccion',
      foreignKey: 'rol_id',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION',
    })
    Rol.belongsTo(models.Cuenta, {
      foreignKey: 'rol_id',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION',
    })
  }

  return Rol
}