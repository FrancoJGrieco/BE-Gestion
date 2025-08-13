function errReturn(res, err, msg) {
	console.error(msg, err);

	if (!res.headersSent)
		res.status(500).json({ error: "Error interno del servidor" });
}

module.exports = {
	errReturn,
};
