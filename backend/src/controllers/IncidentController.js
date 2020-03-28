const connection = require('../database/connection.js');

module.exports = {
	async index(request, response) {
		const { page = 1, itens_per_page = 5 } = request.query;

		const [count] = await connection('incidents').count();

		const incidents = await connection('incidents')
			.join('ongs', 'ongs.id', '=', 'incidents.ong_id')
			.limit(itens_per_page)
			.offset((page - 1) * itens_per_page)
			.select([
				'incidents.*',
				'ongs.name',
				'ongs.email',
				'ongs.email',
				'ongs.whatsapp',
				'ongs.city',
				'ongs.uf'
			]);

		response.header('X-Total-Count', count['count(*)']);

		return response.json(incidents);
	},

	async create(request, response) {
		const { title, description, value } = request.body;
		const ong_id = request.headers.authorization;

		const [id] = await connection('incidents').insert({
			title,
			description,
			value,
			ong_id,
		});

		return response.json({ id });
	},

	async delete(request, response) {
		const { id } = request.params;
		const ong_id = request.headers.authorization;

		const incident = await connection('incidents').where('id', id).select('ong_id');

		if (incident.length == 0) {
			return response.status(404).json({ error: "ID not found." });
		}

		if (incident[0].ong_id != ong_id) {
			return response.status(401).json({ error: "Operation not permitted." });
		}

		await connection('incidents').where('id', id).delete();

		return response.status(204).send();
	}
};