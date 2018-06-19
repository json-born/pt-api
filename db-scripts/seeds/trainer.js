const faker = require('faker');
const database = require('../../dist/lib/database').database;
const bcrypt = require('bcrypt');

module.exports = {    
    async reset() {
        await database('user').where('type', 'trainer').del();
    },
    
    async seed() {
        const result = await database('user').insert({
            type: 'trainer',
            first_name: 'Ryan',
            last_name: 'Evans',
            email: 'info@reptcoaching.co.uk',
            password: bcrypt.hashSync('password', 10)
        });

        const trainerId = result.shift();
        await seedTrainerAvailability(trainerId);
        return trainerId;
    }
}

async function seedTrainerAvailability(trainerId) {
    let dayOfWeek = 1;
    while(dayOfWeek < 6) {
        await database('trainer_availability').insert({
            trainer_id: trainerId,
            day_of_week: dayOfWeek,
            start_time: "9:00:00",
            end_time: "17:00:00"
        });
        dayOfWeek++;
    }
    return;
}
