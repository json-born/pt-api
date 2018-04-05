const faker = require('faker');
const database = require('../../dist/lib/database').database;
const bcrypt = require('bcrypt');

module.exports = {
    async reset() {
        await database('user').where('type', 'client').del();
        await database('user').del();
    },
    async seedTrainer() {
        const result = await database('user').insert({
            type: 'trainer',
            first_name: 'Ryan',
            last_name: 'Evans',
            email: 'info@reptcoaching.co.uk',
            password: bcrypt.hashSync('password', 10)
        });

        return result.shift();
    },
    async seedClients(trainerId, count = 5) {
        let result = [];
        
        // Seed test client
        result = result.concat(await database('user').insert({
            type: 'client',
            trainer_id: trainerId,
            first_name: 'test',
            last_name: 'user',
            email: 'testuser@test.com',
            password: bcrypt.hashSync('password', 10),
            consultations_available: 9999
        }));

        // Seed dummy clients
        for (let i = 0; i < count - 1; i++) {
            result = result.concat(await database('user').insert({
                type: 'client',
                trainer_id: trainerId,
                first_name: faker.name.firstName(),
                last_name: faker.name.lastName(),
                email: faker.internet.email(),
                password: bcrypt.hashSync(faker.internet.password(), 10),
                consultations_available: faker.random.number({min: 0, max: 10})
            }));
        }

        return result;
    }
}
