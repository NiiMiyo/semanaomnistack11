const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection')


describe('ONG', () => {
	beforeEach(async () => {
		await connection.migrate.rollback();
		await connection.migrate.latest();
	});

	afterAll(async () => {
		await connection.destroy();
	});


	it('should be able to create a new ONG', async () => {
		const response = await request(app)
			.post('/ongs')
			.send({
				name: "ong jest test",
				email: "jest@test.com.br",
				whatsapp: "83991210477",
				city: "Rio do Sul",
				uf: "SC"
			});
		expect(response.body).toHaveProperty('id');
		expect(response.body.id).toHaveLength(8);
	});

	// TODO: post('ongs')
	// TODO: post('sessions')
	// TODO: get('profile')
	// TODO: post('incidents')
	// TODO: get('incidents')
	// TODO: delete ('incidents')
});