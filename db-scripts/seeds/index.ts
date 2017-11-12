import 'dotenv/config';

import { logger } from '../../src/lib/logger';
import * as users from './users';
import * as media from './media';
import * as consultations from './consultations';

const run = async () => {
    await media.reset();
    await consultations.reset();
    await users.reset();
    
    await users.seed();
    //await media.seed();
    await consultations.seed();
};

run().then(() => {
    logger.info('seeding complete');
    process.exit();
}).catch((error) => {
    logger.error(error);
    process.exit();
});

