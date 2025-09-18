const { DataTypes } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  const Seccion = sequelize.define('Seccion', {
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
    tableName: 'secciones',
    timestamps: false
  })

  Seccion.associate = (models) => {
    Seccion.belongsToMany(models.Rol, {
      through: { model: models.RolSeccion, timestamps: false },
      foreignKey: 'seccion_id',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION',
    })
  }


  return Seccion
}