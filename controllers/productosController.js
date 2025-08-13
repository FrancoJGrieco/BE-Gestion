const { client } = require("../config/connectToDb.js");
const { errReturn, noSuccess, numVerification } = require("../functions");

const fetchProductos = async (req, res) => {
	try {
		const { rows, rowCount } = await client.query("SELECT * FROM productos");

		if (rowCount === 0) {
			return noSuccess(res, "No se han encontrado los productos.");
		}

		return res.status(200).json({ success: true, productos: rows, rowCount });
	} catch (err) {
		errReturn(res, err, "(fetchProductos) Error al obtener productos:");
	}
};

const fetchProductosName = async (req, res) => {
	try {
		const { rows, rowCount } = await client.query("SELECT id, name FROM productos ORDER BY id");

		if (rowCount === 0) {
			return noSuccess(res, "No se han encontrado los productos.");
		}

		return res.status(200).json({ success: true, productos: rows, rowCount });
	} catch (err) {
		errReturn(res, err, "(fetchProductosName) Error al obtener productos:");
	}
};

const fetchProducto = async (req, res) => {
	try {
		const { id } = req.params;

		if (!numVerification(res, id, "id")) return;

		const { rows, rowCount } = await client.query(
			"SELECT * FROM productos WHERE id = $1",
			[id],
		);

		if (rowCount === 0) {
			return noSuccess(
				res,
				"No se ha encontrado el producto. Verifique el id.",
			);
		}

		return res.status(200).json({ success: true, producto: rows[0] });
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

		const { rows, rowCount } = await client.query(
			`INSERT INTO productos (name, price, cant) VALUES ($1, $2, $3) RETURNING *`,
			[name, Number(price), Number(cant)],
		);

		if (rowCount === 0) {
			return noSuccess(res, "No se pudo crear el producto. Verifique los valores.");
		}

		return res.status(200).json({ success: true, producto: rows[0] });
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
			return noSuccess(res, "Formato de los valores incorrecto.");
		}

		const { rows, rowCount } = await client.query(
			`UPDATE productos 
        SET 
          name = $1,
          price = $2,
          cant = $3
        WHERE id = $4 RETURNING *`,
			[name, Number(price), Number(cant), id],
		);

		if (rowCount === 0) {
			return noSuccess(
				res,
				"No se pudo modificar el producto. Verifique los valores.",
			);
		}

		return res.status(200).json({ success: true, producto: rows[0] });
	} catch (err) {
		errReturn(res, err, "(updateProducto) Error al modificar el producto:");
	}
};

const deleteProducto = async (req, res) => {
	try {
		const { id } = req.params;

		if (!numVerification(res, id, "id")) return;

		const { rows, rowCount } = await client.query(
			`DELETE FROM productos WHERE id = $1 RETURNING *`,
			[id],
		);

		if (rowCount === 0) {
			return noSuccess(
				res,
				"No se pudo eliminar el producto. Verifique el id.",
			);
		}

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
