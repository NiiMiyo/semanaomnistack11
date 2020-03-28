const connection = require('../database/connection.js');
const crypto = require('crypto');

module.exports = {
	async create(request, response) {

		async function idAlreadyInUse(id) {
			const ong = await connection('ongs').where('id', id).first();

			console.log('na condição');


			if (!ong) {
				console.log("n tem esse id n");

				return false;
			} else {
				console.log('ja tem o id', id);

				return true;
			}
		}

		const { name, email, whatsapp, city, uf } = request.body;

		let id = null;
		console.log("id nula :", id);

		do {
			console.log("id ta gerando:", id);
			id = crypto.randomBytes(4).toString('HEX');
		} while (!idAlreadyInUse(id))

		console.log("id gerou:", id);

		await connection('ongs').insert({
			id,
			name,
			email,
			whatsapp,
			city,
			uf,
		});


		return response.json({ id });
	},

	async index(request, response) {
		const ongs = await connection('ongs').select('*');

		return response.json(ongs);
	}
}