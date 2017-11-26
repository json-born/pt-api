const faker = require('faker');
const database = require('../../dist/lib/database').database;

async function reset() {
    await database('consultation').del();
}

async function seed(count = 10) {

    const trainer = await database
        .select()
        .from('user')
        .where('type', 'trainer')
        .first();
    
    const clients = await database
        .select()
        .from('user')
        .where('type', 'client');

    for (let client of clients) {
        for(let i = 0; i < count; i++) {
            await database('consultation')
                .insert({
                    client_id: client.id,
                    trainer_id: trainer.id,
                    start_date: faker.date.future(),
                    end_date: faker.date.future()
                })
        }
    }
}

module.exports = {
    seed: seed,
    reset: reset
}
