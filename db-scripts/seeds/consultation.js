const faker = require('faker');
const database = require('../../dist/lib/database').database;

module.exports = {
    seed: seed,
    reset: reset
}

async function reset() {
    await database('consultation').del();
}

async function seed(trainerId, clientIds, weeks = 10) {
    /**
     * Generate start date (next monday)
     * For each week:
     *  For each day, monday-friday:
     *   For each client:
     *    - Generate a one hour slot between 9AM-8PM
    **/
    /* for (let i = 0; i < weeks; i++) {

        const 

    } */

    for (let clientId of clientIds) {
        for(let i = 0; i < weeks; i++) {
            await database('consultation')
                .insert({
                    client_id: clientId,
                    trainer_id: trainerId,
                    start_date: faker.date.future(),
                    end_date: faker.date.future()
                })
        }
    }
}
