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
});