const crypto = require('crypto');
const connection = require('../database/connection')

module.exports = function generateUniqueId() {
	let id = null;

	do {
	id = crypto.randomBytes(4).toString('HEX');

	} while (!UniqueId(id));

	return id;
};

async function UniqueId(id) {
	const ong = await connection('ongs').where('id', id).first();

	if (!ong) {
		return true;
	} else {
		return false;
	}
};