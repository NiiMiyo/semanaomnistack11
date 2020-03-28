const connection = require('../database/connection.js');

module.exports = {
	async create(request, response) {
		const { id } = request.body;

		const ong = await connection('ongs').select('name').where('id', id).first();

		if (!ong) {
			return response.status(400).json({ error: 'No ONG with this ID' });
		}

		return response.json(ong);
	}
};