const env = require('dotenv').config();

const logger = require('../../dist/lib/logger').default;
const users = require('./user');
const media = require('./media');
const consultations = require('./consultation');

if(process.env.NODE_ENV === 'production') {
    process.exit();
}

(async () => {
    try {
        await reset();
        await run();
        
        logger.info('seeding complete');
        process.exit();
    }
    catch(e) {
        logger.error(e);
        process.exit();
    }
})();


async function run() {
    const trainerId = await users.seedTrainer();
    const clientIds = await users.seedClients(trainerId);
    
    await media.seed(trainerId, clientIds);
    await consultations.seed(trainerId, clientIds);
};

async function reset() {
    await media.reset();
    await consultations.reset();
    await users.reset();
}
