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
        return result.shift();
    }
}
