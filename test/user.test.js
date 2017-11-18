const faker = require('faker');
const server = require('../bin/www');
const request = require('supertest');
const database = require('../dist/lib/database')

afterEach(async () => {
    await server.close();
});

describe('routes: user (POST)', () => {

    test('Return 200 if successful.', async () => {
        const password = faker.internet.password();
        const payload = {
            'first_name': faker.name.firstName(),
            'last_name': faker.name.lastName(),
            'email': faker.internet.email(),
            'password': password,
            'confirm_password': password
        }

        const response = await request(server)
            .post('/user')
            .set('content-type', 'application/json')
            .send(payload);

        expect(response.status).toEqual(200);
        expect(response.type).toEqual('application/json');

        expect(response.body.id).toBeDefined();
        expect(response.body.trainer_id).toBeDefined();
        expect(response.body.first_name).toEqual(payload.first_name);
        expect(response.body.last_name).toEqual(payload.last_name);
        expect(response.body.email).toEqual(payload.email);
        expect(response.body.password).toBeUndefined();
        expect(response.body.confirm_password).toBeUndefined();
    });

    test('Return 400 if passwords and password_confirmation dont match.', async () => {
        const payload = {
            'first_name': faker.name.firstName(),
            'last_name': faker.name.lastName(),
            'email': faker.internet.email(),
            'password': faker.internet.password(),
            'confirm_password': faker.internet.password()
        }

        const response = await request(server)
            .post('/user')
            .set('content-type', 'application/json')
            .send(payload);

        expect(response.status).toEqual(400);
        expect(response.type).toEqual('application/json');
        expect(response.body.confirm_password).toEqual('ERROR_PASSWORD_MISMATCH');
    });

    test('Return 400 if email is invalid.', async () => {
        const payload = {
            'first_name': 'Domenico',
            'last_name': 'Salvia',
            'email': 'some_invalid_email',
            'password': 'password123',
            'confirm_password': 'password123'
        }

        const response = await request(server)
            .post('/user')
            .set('content-type', 'application/json')
            .send(payload);

        expect(response.status).toEqual(400);
        expect(response.type).toEqual('application/json');
        expect(response.body.email).toEqual('ERROR_INVALID_EMAIL');
    });

    test('Return 400 if any fields are missing.', async () => {
        const payload = {};

        const response = await request(server)
            .post('/user')
            .set('content-type', 'application/json')
            .send(payload);

        expect(response.status).toEqual(400);
        expect(response.type).toEqual('application/json');

        expect(response.body.first_name).toEqual('ERROR_MISSING_FIRST_NAME');
        expect(response.body.last_name).toEqual('ERROR_MISSING_LAST_NAME');
        expect(response.body.email).toEqual('ERROR_INVALID_EMAIL');
        expect(response.body.password).toEqual('ERROR_MISSING_PASSWORD');
        expect(response.body.confirm_password).toEqual('ERROR_PASSWORD_MISMATCH');
    });

    test('Return 409 if user already exists', async () => {
        const password = faker.internet.password();
        const payload = {
            'first_name': faker.name.firstName(),
            'last_name': faker.name.lastName(),
            'email': faker.internet.email(),
            'password': password,
            'confirm_password': password
        }

        const response = await request(server)
            .post('/user')
            .set('content-type', 'application/json')
            .send(payload);

        const secondResponse = await request(server)
            .post('/user')
            .set('content-type', 'application/json')
            .send(payload);

        expect(secondResponse.status).toEqual(409);
        expect(secondResponse.type).toEqual('application/json');
        expect(secondResponse.body.email).toEqual('ERROR_EXISTING_EMAIL');
    });
});