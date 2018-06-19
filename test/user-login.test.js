const faker = require('faker');
const server = require('../bin/www');
const request = require('supertest');

afterEach(async () => {
    return await server.close();
});

describe('routes: /login (POST)', () => {

    test('Return 200 if successful.', async () => {
        const payload = {
            'email': 'testuser@test.com',
            'password': 'password'
        }

        const response = await request(server)
            .post('/login')
            .set('content-type', 'application/json')
            .send(payload);

        expect(response.status).toEqual(200);
        expect(response.type).toEqual('application/json');

        expect(response.body.user_id).toBeDefined();
        expect(response.body.token).toBeDefined();
    });

    test('Return 400 if any fields are missing', async () => {
        const payload = {}

        const response = await request(server)
            .post('/login')
            .set('content-type', 'application/json')
            .send(payload);

        expect(response.status).toEqual(400);
        expect(response.type).toEqual('application/json');

        expect(response.body.email).toEqual('ERROR_INVALID_EMAIL');
        expect(response.body.password).toEqual('ERROR_MISSING_PASSWORD');
    });

    test('Return 401 if authentication fails', async () => {
        const payload = {
            'email': 'test@test.com',
            'password': 'somepassword'
        }

        const response = await request(server)
            .post('/login')
            .set('content-type', 'application/json')
            .send(payload);

        expect(response.status).toEqual(401);
        expect(response.type).toEqual('application/json');

        expect(response.body.email).toEqual('ERROR_INVALID_EMAIL');
        expect(response.body.password).toEqual('ERROR_INVALID_PASSWORD');
    });
});
