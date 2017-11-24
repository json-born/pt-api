const env = require('dotenv').config();

const logger = require('../../dist/lib/logger').default;
const users = require('./user');
const media = require('./media');
const consultations = require('./consultation');

const run = async () => {
    await media.reset();
    await consultations.reset();
    await users.reset();
    
    await users.seed();
    await media.seed();
    await consultations.seed();
};

if(process.env.NODE_ENV === 'production') {
    process.exit();
}

run().then(() => {
    logger.info('seeding complete');
    process.exit();
}).catch((error) => {
    logger.error(error);
    process.exit();
});

