import { app } from '../src';
import request from 'supertest';

describe('GET /api/users/:id', () => {
	it('should return a user', async () => {
		const response = await request(app).get('/api/users/60c1e1a0a7d5c2f5e8c6c4c0');
		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty('status', 'OK');
		expect(response.body).toHaveProperty('data');
		expect(response.body.data).toHaveProperty('name', 'Teo');
		expect(response.body.data).toHaveProperty('email', 'mateo@gmail.com');
		expect(response.body.data).toHaveProperty('password', '123456');
	})
});