const { Op } = require("sequelize");
const { errReturn, noSuccess, numVerification } = require("../functions");
const { Producto } = require('../models')

const fetchProductos = async (req, res) => {
	try {
		const productos = await Producto.findAll({
			order: [['name', 'ASC']]
		})

		return res.status(200).json({ success: true, productos });
	} catch (err) {
		errReturn(res, err, "(fetchProductos) Error al obtener productos:");
	}
};

const fetchProductosPag = async (req, res) => {
	try {
		const { cantidad, pagina, busqueda = '' } = req.params

		const productos = await Producto.findAll({
			limit: cantidad,
			offset: cantidad * (pagina - 1),
			attributes: ['id', 'name', 'codigo', 'cant'],
			where: {
				name: { [Op.iLike]: '%' + busqueda + '%' }
			},

		})

		const count = await Producto.count({
			where: {
				name: { [Op.iLike]: '%' + busqueda + '%' }
			}
		})
		return res.status(200).json({ success: true, productos, count });
	} catch (err) {
		console.log(err)
	}
}
// const fetchProductosPag = async (req, res) => {
// 	try {
// 		const { cantidad, pagina, busqueda = '' } = req.params

// 		const productos = await Producto.findAll({
// 			limit: cantidad,
// 			offset: cantidad * (pagina - 1),
// 			where: {
// 				name: { [Op.iLike]: '%' + busqueda + '%' }
// 			}
// 		})

// 		const count = await Producto.count({
// 			where: {
// 				name: { [Op.iLike]: '%' + busqueda + '%' }
// 			}
// 		})
// 		return res.status(200).json({ success: true, productos, count });
// 	} catch (err) {
// 		console.log(err)
// 	}
// }

const fetchProducto = async (req, res) => {
	try {
		const { id } = req.params;

		if (!numVerification(res, id, "id")) return;

		const producto = await Producto.findByPk(id)
		if (producto === null) {
			noSuccess(
				res,
				"No se ha encontrado el producto. Verifique el id.",
			)
			throw new Error('No se ha encontrado el producto.')
		}

		return res.status(200).json({ success: true, producto });
	} catch (err) {
		errReturn(res, err, "(fetchProducto)");
	}
};

const createProducto = async (req, res) => {
	try {
		const { name, codigo, price, cant } = req.body;

		if (
			typeof name !== "string" ||
			typeof codigo !== "string" ||
			typeof Number(price) !== "number" ||
			typeof Number(cant) !== "number"
		) {
			return noSuccess(res, "Formato de los valores incorrecto.");
		}

		const producto = await Producto.create({
			name,
			codigo,
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
		const { name, codigo, price, cant } = req.body;

		if (!numVerification(res, id, "id")) return;

		if (
			typeof name !== "string" ||
			typeof codigo !== "string" ||
			typeof Number(price) !== "number" ||
			typeof Number(cant) !== "number"
		) {
			throw noSuccess(res, "Formato de los valores incorrecto.");
		}

		const producto = Producto.update(
			{
				name,
				codigo,
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

		return res.json({ success: true, producto });
	} catch (err) {
		errReturn(res, err, "(deleteProducto) Error al eliminar el producto:");
	}
};

module.exports = {
	fetchProductos,
	fetchProductosPag,
	fetchProducto,
	createProducto,
	updateProducto,
	deleteProducto,
};
