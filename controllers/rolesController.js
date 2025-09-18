const { Op } = require("sequelize");
const { errReturn, noSuccess, numVerification } = require("../functions");
const { Rol } = require('../models')
const { Seccion } = require('../models')

const fetchRolesPag = async (req, res) => {
	try {
		const { cantidad, pagina, busqueda = '' } = req.params

		const roles = await Rol.findAll({

			limit: cantidad,
			offset: cantidad * (pagina - 1),
			where: {
				nombre: { [Op.iLike]: '%' + busqueda + '%' }
			}
		})

		const count = await Rol.count({
			where: {
				nombre: { [Op.iLike]: '%' + busqueda + '%' }
			}
		})

		return res.status(200).json({ success: true, roles, count });
	} catch (err) {
		console.log(err)
	}
}

const fetchRol = async (req, res) => {
	try {
		const { id } = req.params;

		if (!numVerification(res, id, "id")) return;

		const rol = await Rol.findByPk(id, {
			attributes: ['id', 'nombre'],
			include: [{
				model: Seccion,
				attributes: ['id', 'nombre'],
				through: {
					attributes: []
				}
			}]
		})
		if (rol === null) {
			throw noSuccess(
				res,
				"No se ha encontrado el rol. Verifique el id.",
			)
		}

		return res.status(200).json({ success: true, rol });
	} catch (err) {
		errReturn(res, err, "(fetchRol) Error al obtener rol:");
	}
};

const createRol = async (req, res) => {
	try {
		const { nombre, secciones } = req.body;

		if (typeof nombre !== "string") {
			return noSuccess(res, "Formato de los valores incorrecto.");
		}

		const rol = await Rol.create({
			nombre
		})

		console.log(rol)
		await rol.addSeccion([1, 2]);

		return res.status(200).json({ success: true, rol });
	} catch (err) {
		errReturn(res, err, "(createRol) Error al crear rol:");
	}
};

const updateRol = async (req, res) => {
	try {
		const { id } = req.params;
		const { nombre, secciones } = req.body;


		if (!numVerification(res, id, "id")) return;

		if (typeof nombre !== "string") {
			throw noSuccess(res, "Formato de los valores incorrecto.");
		}

		await Rol.update(
			{
				nombre
			},
			{
				where: {
					id
				}
			})

		const rol = await Rol.findByPk(id);

		if (rol) {
			await rol.setSeccions([1, 3]);
		}

		return res.status(200).json({ success: true, rol });
	} catch (err) {
		errReturn(res, err, "(updateRol) Error al modificar el producto:");
	}
};

const deleteRol = async (req, res) => {
	try {
		const { id } = req.params;

		if (!numVerification(res, id, "id")) return;

		const rol = await Rol.findByPk(id);

		if (rol) {
			await rol.setSeccions([]);
		}

		await Rol.destroy({
			where: {
				id
			}
		})

		return res.json({ success: true, rol });
	} catch (err) {
		errReturn(res, err, "(deleteRol) Error al eliminar el rol:");
	}
};

module.exports = {
	fetchRolesPag,
	fetchRol,
	createRol,
	updateRol,
	deleteRol,
};
