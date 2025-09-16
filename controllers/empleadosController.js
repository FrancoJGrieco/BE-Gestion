const { Op } = require("sequelize");
const { errReturn, noSuccess, numVerification } = require("../functions");
const { Empleado } = require('../models')

const fetchEmpleados = async (req, res) => {
	try {
		const empleados = await Empleado.findAll()

		return res.status(200).json({ success: true, empleados });
	} catch (err) {
		errReturn(res, err, "(fetchEmpleados) Error al obtener empleados:");
	}
};

const fetchEmpleadosPag = async (req, res) => {
	try {
		const { cantidad, pagina, busqueda = '' } = req.params

		const empleados = await Empleado.findAll({
			limit: cantidad,
			offset: cantidad * (pagina - 1),
			where: {
				fname: { [Op.iLike]: '%' + busqueda + '%' }
			}
		})

		const count = await Empleado.count({
			where: {
				fname: { [Op.iLike]: '%' + busqueda + '%' }
			}
		})
		
		return res.status(200).json({ success: true, empleados, count });
	} catch (err) {
		console.log(err)
	}
}

const fetchEmpleado = async (req, res) => {
	try {
		const { id } = req.params;

		if (!numVerification(res, id, "id")) return;

		const empleado = await Empleado.findByPk(id)
		if (empleado === null) {
			throw noSuccess(
				res,
				"No se ha encontrado el empleado. Verifique el id.",
			)
		}

		return res.status(200).json({ success: true, empleado });
	} catch (err) {
		errReturn(res, err, "(fetchEmpleado) Error al obtener empleado:");
	}
};

const createEmpleado = async (req, res) => {
	try {
		const { fname, lname, cuit, dni, mail, nacimiento } = req.body;

		if (
			typeof fname !== "string" ||
			typeof lname !== "string" ||
			typeof cuit !== "string" ||
			typeof Number(dni) !== "number" ||
			typeof mail !== "string"
		) {
			return noSuccess(res, "Formato de los valores incorrecto.");
		}

		const empleado = await Empleado.create({
			fname,
			lname,
			cuit,
			dni: Number(dni),
			mail,
			nacimiento,
		})

		return res.status(200).json({ success: true, empleado });
	} catch (err) {
		errReturn(res, err, "(createEmpleado) Error al crear empleado:");
	}
};

const updateEmpleado = async (req, res) => {
	try {
		const { id } = req.params;
		const { fname, lname, cuit, dni, mail, nacimiento } = req.body;


		if (!numVerification(res, id, "id")) return;

		if (
			typeof fname !== "string" ||
			typeof lname !== "string" ||
			typeof cuit !== "string" ||
			typeof Number(dni) !== "number" ||
			typeof mail !== "string"
		) {
			throw noSuccess(res, "Formato de los valores incorrecto.");
		}

		const empleado = Empleado.update(
			{
				fname,
				lname,
				cuit,
				dni: Number(dni),
				mail,
				nacimiento,
			},
			{
				where: {
					id
				}
			})

		return res.status(200).json({ success: true, empleado });
	} catch (err) {
		errReturn(res, err, "(updateEmpleado) Error al modificar el producto:");
	}
};

const deleteEmpleado = async (req, res) => {
	try {
		const { id } = req.params;

		if (!numVerification(res, id, "id")) return;

		const empleado = await Empleado.destroy({
			where: {
				id
			}
		})

		return res.json({ success: true, empleado });
	} catch (err) {
		errReturn(res, err, "(deleteEmpleado) Error al eliminar el empleado:");
	}
};

module.exports = {
	fetchEmpleados,
	fetchEmpleadosPag,
	fetchEmpleado,
	createEmpleado,
	updateEmpleado,
	deleteEmpleado,
};
