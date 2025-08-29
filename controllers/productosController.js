const { errReturn, noSuccess, numVerification } = require("../functions");
const { Producto } = require('../models')

const fetchProductos = async (req, res) => {
	try {
		const productos = await Producto.findAll()

		return res.status(200).json({ success: true, productos });
	} catch (err) {
		errReturn(res, err, "(fetchProductos) Error al obtener productos:");
	}
};

const fetchProductosName = async (req, res) => {
	try {
		const productos = await Producto.findAll({
			attributes: ["id", "name"]
		})

		return res.status(200).json({ success: true, productos });
	} catch (err) {
		errReturn(res, err, "(fetchProductosName) Error al obtener productos:");
	}
};

const fetchProducto = async (req, res) => {
	try {
		const { id } = req.params;

		if (!numVerification(res, id, "id")) return;

		const producto = await Producto.findByPk(id)
		if (producto === null) {
			throw noSuccess(
				res,
				"No se ha encontrado el producto. Verifique el id.",
			)
		}

		return res.status(200).json({ success: true, producto });
	} catch (err) {
		errReturn(res, err, "(fetchProducto) Error al obtener producto:");
	}
};

const createProducto = async (req, res) => {
	try {
		const { name, price, cant } = req.body;

		if (
			typeof name !== "string" ||
			typeof Number(price) !== "number" ||
			typeof Number(cant) !== "number"
		) {
			return noSuccess(res, "Formato de los valores incorrecto.");
		}

		const producto = await Producto.create({
			name,
			price: Number(price),
			cant: Number(cant)
		})

		return res.status(200).json({ success: true, producto });
	} catch (err) {
		errReturn(res, err, "(createProducto) Error al crear producto:");
	}
};

const updateProducto = async (req, res) => {
	try {
		const { id } = req.params;
		const { name, price, cant } = req.body;

		if (!numVerification(res, id, "id")) return;

		if (
			typeof name !== "string" ||
			typeof Number(price) !== "number" ||
			typeof Number(cant) !== "number"
		) {
			throw noSuccess(res, "Formato de los valores incorrecto.");
		}

		const producto = Producto.update(
			{
				name,
				price: Number(price),
				cant: Number(cant)
			},
			{
				where: {
					id
				}
			})

		return res.status(200).json({ success: true, producto });
	} catch (err) {
		errReturn(res, err, "(updateProducto) Error al modificar el producto:");
	}
};

const deleteProducto = async (req, res) => {
	try {
		const { id } = req.params;

		if (!numVerification(res, id, "id")) return;

		const producto = await Producto.destroy({
			where: {
				id
			}
		})

		return res.json({ success: true, producto: rows[0] });
	} catch (err) {
		errReturn(res, err, "(deleteProducto) Error al eliminar el producto:");
	}
};

module.exports = {
	fetchProductos,
	fetchProductosName,
	fetchProducto,
	createProducto,
	updateProducto,
	deleteProducto,
};
