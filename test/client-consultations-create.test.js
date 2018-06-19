const faker = require('faker');
const moment = require('moment');

const server = require('../bin/www');
const request = require('supertest');
const database = require('../dist/lib/database').database;

let jwt = '';
let trainer = {};
const startDate = moment().add(6, "months").hour(14).minute(0);

const userPayload = {
    email: 'testuser@test.com',
    password: 'password'
};

const testPayload = {
    start_date: startDate.format("YYYY-MM-DD HH:mm:ss"),
    end_date: startDate.add(1, "hour"),
};

afterEach(async () => {
    return await server.close();
});

beforeAll(async () => {
    trainer = await database
        .select()
        .from('user')
        .where('type', 'trainer')
        .first();
    
    const response = await request(server)
        .post('/login')
        .set('content-type', 'application/json')
        .send(userPayload);

    jwt = response.body.token;
});

describe('routes: /consultations/:trainerId (POST)', () => {

    test('Return 200 if successful', async() => {
        const response = request(server)
            .post(`/consultations/${trainer.id}`)
            .set('content-type', 'application/json')
            .set('Authorization', `Bearer ${jwt}`)
            .send(testPayload);

        expect(response.status).toEqual(200);
        expect(response.type).toEqual('application/json');
    });

    test('Return 400 if no date parameters specified', async () => {
        const response = await request(server)
            .post(`/consultations/${trainer.id}`)
            .set('content-type', 'application/json')
            .set('Authorization', `Bearer ${jwt}`);
            
        expect(response.status).toEqual(400);
        expect(response.type).toEqual('application/json');
        expect(response.body.from_date).toEqual("ERROR_INVALID_FROM_DATE");
        expect(response.body.to_date).toEqual("ERROR_INVALID_TO_DATE");
    });

    test('Return 204 if trainer id given is invalid', async () => {
        const client = await database
            .select()
            .from('user')
            .where('type', 'client')
            .first();

        const response = await request(server)
            .post(`/consultations/${client.id}`)
            .set('content-type', 'application/json')
            .set('Authorization', `Bearer ${jwt}`)
            .send(testPayload);
            
        expect(response.status).toEqual(204);
        expect(response.type).toEqual("");
        expect(response.body).toEqual({});
    });

    test('Return 400 if from_date or to_date is invalid', async () => {
        const response = await request(server)
            .post(`/consultations/${client.id}`)
            .set('content-type', 'application/json')
            .set('Authorization', `Bearer ${jwt}`)
            .send({
                from_date: "hello",
                to_date: "world"
            });
            
        expect(response.status).toEqual(400);
        expect(response.type).toEqual('application/json');
        expect(response.body.from_date).toEqual("ERROR_INVALID_FROM_DATE");
        expect(response.body.to_date).toEqual("ERROR_INVALID_TO_DATE");
    });

    test('Return 401 if user is not authenticated', async () => {
        const response = await request(server)
            .post(`/consultations/${client.id}`)
            .set('content-type', 'application/json')
            .query({
                from_date: moment().format('YYYY-MM-DD'),
                to_date: moment().startOf('isoWeek').add(1, 'month')
            });
            
        expect(response.status).toEqual(401);
    });

    test('Available consultations should decrement by one if booking is successful', async () => {

    });
    
    test('Return 400 if slot is unavailable', async () => {

    });

    test('Return 400 if slot length is not equal to 1 hour', async () => {

    });

    test('Return 403 if user has no consultations_available', async () => {

    });

    test('Return a valid payload if successful', async() => {
        //TODO
    });
});
