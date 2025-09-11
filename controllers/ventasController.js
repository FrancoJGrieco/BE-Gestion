const { errReturn, noSuccess, numVerification } = require("../functions");
const { Venta } = require('../models')
const { DetalleVenta } = require('../models')
const { Producto } = require('../models')

const fetchVentas = async (req, res) => {
	try {
		const ventas = await Venta.findAll()

		return res.status(200).json({ success: true, ventas });
	} catch (err) {
		errReturn(res, err, "(fetchVentas) Error al obtener ventas:");
	}
};

const fetchDetalleVenta = async (req, res) => {
	try {
		const { id } = req.params

		detalleVenta = await DetalleVenta.findAll({ where: venta_id === id })

		return res.status(200).json({ success: true, detalleVenta })
	} catch (err) {
		errReturn(res, err, "(fetchDetalleVenta) Error al obtener detalles de la venta:");
	}
};

const fetchVenta = async (req, res) => {
	try {
		const { id } = req.params;

		if (!numVerification(res, id, "id")) return;

		const venta = await Venta.findByPk(id)
		if (venta === null) {
			throw noSuccess(
				res,
				"No se ha encontrado la venta. Verifique el id.",
			)
		}

		return res.status(200).json({ success: true, venta });
	} catch (err) {
		errReturn(res, err, "(fetchVenta) Error al obtener venta:");
	}
};

const createVenta = async (req, res) => {
	try {
		const productosVenta = req.body

		const venta = await Venta.create({
			numero_ticket: '0',
			empresa: 'Tu Empresa',
			total: 1000.0,
			dia: Date.now()
		})

		productosVenta.map(async (producto) => {
			await DetalleVenta.create({
				producto: producto.producto.name,
				cantidad: producto.cantidad,
				precio: producto.producto.price,
				venta_id: venta.id
			})
			console.log(producto.producto.cant - producto.cantidad)

			await Producto.update({
				cant: (producto.producto.cant - producto.cantidad)
			},{
				where: {
					id: producto.producto.id
				}
			})
		})

		return res.status(200).json({ success: true });
	} catch (err) {
		errReturn(res, err, "(createVenta) Error al crear venta:");
	}
};

const deleteVenta = async (req, res) => {
	try {
		const { id } = req.params;

		if (!numVerification(res, id, "id")) return;

		const venta = await Venta.destroy({
			where: {
				id
			}
		})

		return res.json({ success: true, venta });
	} catch (err) {
		errReturn(res, err, "(deleteVenta) Error al eliminar el venta:");
	}
};

module.exports = {
	fetchVentas,
	fetchDetalleVenta,
	fetchVenta,
	createVenta,
	deleteVenta,
};
