const faker = require('faker');
const database = require('../../dist/lib/database').database;
const bcrypt = require('bcrypt');

async function seed() {
    await seedTrainer();
    await seedTestClient();
    await seedClients(10);
}

async function reset() {
    await database('user')
        .where('type', 'client')
        .del();

    await database('user').del();
}

async function seedTestClient() {
    const trainer = await database
        .select()
        .from('user')
        .where('type', 'trainer')
        .first();

    return await database('user').insert({
        type: 'client',
        trainer_id: trainer.id,
        first_name: 'test',
        last_name: 'user',
        email: 'testuser@test.com',
        password: bcrypt.hashSync('password', 10),
        consultations_available: 9999
    });
}

async function seedTrainer() {
    await database('user').insert({
        type: 'trainer',
        first_name: 'Ryan',
        last_name: 'Evans',
        email: 'info@reptcoaching.co.uk',
        password: bcrypt.hashSync('password', 10)
    });
}

async function seedClients(count = 10) {
    const trainer = await database
        .select()
        .from('user')
        .where('type', 'trainer')
        .first();

    for (let i = 0; i < count; i++) {
        await database('user').insert({
            type: 'client',
            trainer_id: trainer.id,
            first_name: faker.name.firstName(),
            last_name: faker.name.lastName(),
            email: faker.internet.email(),
            password: bcrypt.hashSync(faker.internet.password(), 10),
            consultations_available: faker.random.number({min: 0, max: 10})
        });
    }
}

module.exports = {
    reset: reset,
    seed: seed
}
