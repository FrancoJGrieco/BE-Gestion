const { noSuccess } = require("./noSuccess");

function numVerification(res, num, tipo) {
	const formatedNum = Number(num);

	if (!Number.isInteger(formatedNum)) {
		noSuccess(res, `El ${tipo} tiene que ser un number.`);
		return false;
	}
	return true;
}
module.exports = {
	numVerification,
};
