const { DataTypes } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  const RolSeccion = sequelize.define('RolSeccion', {
  }, {
    tableName: 'rol_seccion',
    timestamps: false
  })

  RolSeccion.associate = (models) => {
    RolSeccion.belongsTo(models.Rol, { foreignKey: 'rol_id' });
    RolSeccion.belongsTo(models.Seccion, { foreignKey: 'seccion_id' });
  };

  return RolSeccion
}