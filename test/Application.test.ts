import { app } from '../src';
import request from 'supertest';

describe('GET /api/users/:id', () => {
	it('should return a user', async () => {
		const response = await request(app).get('/api/users/65a6dd119cc45b7df92664b1');
		console.log(response.body);
		expect(response.status).toBe(200);
		expect(response.body.user).toBeDefined();
		expect(response.body.code).toBe(200);
	})

	it('should return 404 if user not found', async () => {
		const response = await request(app).get('/api/users/65a6dd119cc45b7df92664b2');
		console.log(response.body);
		expect(response.status).toBe(200);
		expect(response.body.code).toBe(404);
	})
});

describe('POST /api/users', () => {
	it('should create a user', async () => {
		const response = await request(app).post('/api/users').send({
			name: 'Test',
			email: 'test@gmail.com',
			password: '123456',
			confirmPassword: '123456',
			birth_year: 2000
		});
		expect(response.status).toBe(201);
		expect(response.body).toBeDefined();
	})
});