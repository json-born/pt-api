const env = require('dotenv').config();

const logger = require('../../dist/lib/logger').default;
const trainer = require('./trainer');
const client = require('./client');
const media = require('./media');
const consultations = require('./consultation');

if(process.env.NODE_ENV === 'production') {
    logger.error('This command cannot be run on production.');
    process.exit();
}

(async () => {
    try {
        await reset();
        await run();
        
        logger.info('Seeding completed successfully.');
        process.exit();
    }
    catch(e) {
        logger.error(e);
        process.exit();
    }
})();


async function run() {
    const trainerId = await trainer.seed();
    const clientIds = await client.seed(trainerId, 5);
    
    await media.seed(trainerId, clientIds);
    await consultations.seed(trainerId, clientIds, 10);
};

async function reset() {
    await media.reset();
    await consultations.reset();
    await client.reset();
    await trainer.reset();
}
