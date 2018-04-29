const faker = require('faker');
const database = require('../../dist/lib/database').database;
const moment = require('moment');

module.exports = {
    async reset() {
        await database('consultation').del();
    },
    
    // TODO: This is flawed and shitty, fix it up.
    async seed(trainerId, clientIds, weeks) {
        
        let startDate = moment().startOf('isoWeek').add(1, 'week');
    
        for (let week = 1; week <= weeks; week++) {
            for (let day = 1; day <= 5; day++) {
                let day = startDate.hours('8');
                for (clientId of clientIds) {
                    await database('consultation').insert({
                        client_id: clientId,
                        trainer_id: trainerId,
                        start_date: day.format("YYYY-MM-DD HH:mm:ss"),
                        end_date: day.add(1, 'hour').format("YYYY-MM-DD HH:mm:ss")
                    });
                }
                day = day.add(1, 'day');
            }
            startDate = startDate.add(1, 'week');
        }  
    }
}
