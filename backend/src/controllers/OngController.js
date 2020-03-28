const connection = require('../database/connection.js');
const crypto = require('crypto');

module.exports = {
	async create(request, response) {
		const { name, email, whatsapp, city, uf } = request.body;

		const id = null;
		do {
			id = crypto.randomBytes(4).toString('HEX');
		} while ( await connection('ongs').where('id', id).length == 0 );


		await connection('ongs').insert({
			id,
			name,
			email,
			whatsapp,
			city,
			uf,
		});

		console.log("id :", id);

		return response.json({ id });
	},

	async index(request, response) {
		const ongs = await connection('ongs').select('*');

		return response.json(ongs);
	}
}