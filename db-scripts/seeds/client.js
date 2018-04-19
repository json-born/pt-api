const faker = require('faker');
const database = require('../../dist/lib/database').database;
const bcrypt = require('bcrypt');

module.exports = {
    
    async reset() {
        await database('user').where('type', 'client').del();
    },
    
    async seed(trainerId, count) {
        let results = [];
        
        results.push(await database('user').insert({
            type: 'client',
            trainer_id: trainerId,
            first_name: 'test',
            last_name: 'user',
            email: 'testuser@test.com',
            password: bcrypt.hashSync('password', 10),
            consultations_available: 9999
        }));

        for (let i = 0; i < count - 1; i++) {
            results.push(await database('user').insert({
                type: 'client',
                trainer_id: trainerId,
                first_name: faker.name.firstName(),
                last_name: faker.name.lastName(),
                email: faker.internet.email(),
                password: bcrypt.hashSync(faker.internet.password(), 10),
                consultations_available: faker.random.number({min: 0, max: 10})
            }));
        }

        return results;
    }
}
