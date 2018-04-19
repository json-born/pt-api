const faker = require('faker');
const moment = require('moment');

const server = require('../bin/www');
const request = require('supertest');
const database = require('../dist/lib/database').database;

let jwt = '', trainer = {};

afterEach(async () => {
    return await server.close();
});

beforeAll(async () => {
    trainer = await database
        .select()
        .from('user')
        .where('type', 'trainer')
        .first();
    
    const userPayload = {
        'email': 'testuser@test.com',
        'password': 'password'
    }

    const response = await request(server)
        .post('/login')
        .set('content-type', 'application/json')
        .send(userPayload);

    jwt = response.body.token;
});

describe('routes: /consultations/available/:trainerId (GET)', () => {

    test('Return 200/204 if successful', async() => {
        const response = await request(server)
            .get(`/consultations/available/${trainer.id}`)
            .set('content-type', 'application/json')
            .set('Authorization', `Bearer ${jwt}`)
            .query({
                from_date: moment().format('YYYY-MM-DD'),
                to_date: moment().startOf('isoWeek').add('1', month)
            });
            
        expect([200,204].includes(response.status)).toBeTruthy();
        expect(response.type).toEqual('application/json');
        expect(response.body).toBeDefined();
    });

    test('Return 204 if no date parameters specified', async () => {
        const response = await request(server)
            .get(`/consultations/available/${trainer.id}`)
            .set('content-type', 'application/json')
            .set('Authorization', `Bearer ${jwt}`);
            
        expect(response.status).toEqual(204);
        expect(response.type).toEqual('application/json');
        expect(response.body).toEqual({});
    });

    test('Return 400 if no trainer id specified', async () => {
        const response = await request(server)
            .get(`/consultations/available/`)
            .set('content-type', 'application/json')
            .set('Authorization', `Bearer ${jwt}`)
            
        expect(response.status).toEqual(400);
        expect(response.type).toEqual('application/json');
        expect(response.body.trainer_id).toEqual("ERROR_MISSING_TRAINER_ID");
    });

    test('Return 400 if trainer id given is invalid', async () => {
        const client = await database
            .select()
            .from('user')
            .where('type', 'client')
            .first();

        const response = await request(server)
            .get(`/consultations/available/${client.id}`)
            .set('content-type', 'application/json')
            .set('Authorization', `Bearer ${jwt}`);
            
        expect(response.status).toEqual(400);
        expect(response.type).toEqual('application/json');
        expect(response.body.trainer_id).toEqual("ERROR_INVALID_TRAINER_ID");
    });
});
