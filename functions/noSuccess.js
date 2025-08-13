function noSuccess(res, text) {
	return res.status(404).json({ success: false, message: text });
}

module.exports = {
	noSuccess,
};
