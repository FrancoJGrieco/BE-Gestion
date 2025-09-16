function errReturn(res, err, msg) {
	console.error(msg, err);

	if (!res.headersSent)
		res.status(500).json({ success: false, error: "Error interno del servidor" });
}

module.exports = {
	errReturn,
};
