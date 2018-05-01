const faker = require('faker');
const moment = require('moment');

const server = require('../bin/www');
const request = require('supertest');
const database = require('../dist/lib/database').database;

let trainerJwt = '', clientJwt = '';

afterEach(async () => {
    return await server.close();
});

beforeAll(async () => {
    const clientPayload = {
        'email': 'testuser@test.com',
        'password': 'password'
    }

    const trainerPayload = {
        'email': 'info@reptcoaching.co.uk',
        'password': 'password'
    }
    
    const trainerLoginResponse = await request(server)
        .post('/login')
        .set('content-type', 'application/json')
        .send({
            email: trainerPayload.email,
            password: trainerPayload.password
        });

    const clientLoginResponse = await request(server)
        .post('/login')
        .set('content-type', 'application/json')
        .send({
            email: clientPayload.email,
            password: clientPayload.password
        });

    clientJwt = clientLoginResponse.body.token;
    trainerJwt = trainerLoginResponse.body.token;
});

describe('routes: trainer/consultations (GET)', () => {

    test('Return 200 if successful', async() => {
        const response = await request(server)
            .get(`/trainer/consultations`)
            .set('content-type', 'application/json')
            .set('Authorization', `Bearer ${trainerJwt}`)
            .query({
                from_date: moment().format('YYYY-MM-DD'),
                to_date: moment().add(1, 'month').format('YYYY-MM-DD')
            });
            
        expect(response.status).toEqual(200);
        expect(response.type).toEqual('application/json');
        expect(response.body).toBeDefined();
    });

    test('Return a valid payload if successful', async() => {
        //TODO
    });

    test('Return 400 if no date parameters specified', async () => {
        const response = await request(server)
            .get(`/trainer/consultations`)
            .set('content-type', 'application/json')
            .set('Authorization', `Bearer ${trainerJwt}`);
            
        expect(response.status).toEqual(400);
        expect(response.type).toEqual('application/json');
        expect(response.body.from_date).toEqual("ERROR_INVALID_FROM_DATE");
        expect(response.body.to_date).toEqual("ERROR_INVALID_TO_DATE");
    });

    test('Return 401 if user is not a trainer', async () => {
        const response = await request(server)
            .get(`/trainer/consultations`)
            .set('content-type', 'application/json')
            .set('Authorization', `Bearer ${clientJwt}`)
            
        expect(response.status).toEqual(401);
    });

    test('Return 401 if not authenticated', async () => {
        const response = await request(server)
            .get(`/trainer/consultations`)
            .set('content-type', 'application/json')
            
        expect(response.status).toEqual(401);
    });
});
