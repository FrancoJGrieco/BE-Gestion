const { DataTypes } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  const RolSeccion = sequelize.define('RolSeccion', {
    rol_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    seccion_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    }
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