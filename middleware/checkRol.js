const jwt = require('jsonwebtoken')
const { Cuenta } = require('../models')
const { Rol } = require('../models')
const { Seccion } = require('../models')

function checkRol(seccion) {
  return async (req, res, next) => {
    const token = req.cookies.Authorization

    const decoded = jwt.verify(token, process.env.SECRET)
    if (Date.now() > decoded.exp) return res.sendStatus(401)

    const user = await Cuenta.findByPk(decoded.sub)
    if (!user) return res.sendStatus(401)

    const rol = await Rol.findByPk(user.rol_id, {
      attributes: ['id', 'nombre'],
      include: [{
        model: Seccion,
        attributes: ['id', 'nombre'],
        through: {
          attributes: []
        }
      }]
    })

    if (!rol || !rol.toJSON().Seccions.find((seccionI) => seccionI.nombre === seccion)) {
      return res.status(403).json({ message: "No tienes permisos" });
    }
    next();
  };
}

module.exports = checkRol;