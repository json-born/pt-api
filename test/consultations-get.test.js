const faker = require('faker');
const server = require('../bin/www');
const request = require('supertest');
const database = require('../dist/lib/database').database;

const jwt = '';

afterEach(async () => {
    return await server.close();
});

beforeAll(async () => {
    const payload = {
        'email': 'testuser@test.com',
        'password': 'password'
    }

    const response = await request(server)
        .post('/login')
        .set('content-type', 'application/json')
        .send(payload);

    jwt = response.body.token;
});

describe('routes: /consultations/available/:id (GET)', () => {

    test('Return 200/204 if successful', async() => {
        const response = await request(server)
            .get('/consultations/available/:id')
            .set('content-type', 'application/json')
            .set('Authorization', `Bearer ${jwt}`);
        
        expect(response.status == 200 || response.status == 204).toBeTruthy();
        expect(response.type).toEqual('application/json');
        expect(response.body.available_consultations).toBeDefined();
    });

    test('By default, return a range of dates exactly one month from now', async() => {
        const trainer = await database
            .select()
            .from('user')
            .where('type', 'trainer')
            .first();
        
        const response = await request(server)
            .get('/consultations')
            .set('content-type', 'application/json')
            .set('Authorization', `Bearer ${jwt}`);
            
        expect(response.status).toEqual(200);
        expect(response.type).toEqual('application/json');
    });
});
