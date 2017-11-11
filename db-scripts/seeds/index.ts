import 'dotenv/config';

import { logger } from '../../src/lib/logger';
import * as users from './users';

const run = async () => {

    await users.reset();
    await users.seedTrainer();
    await users.seedClients(10);

    return;
};

run().then(() => {
    logger.info('seeding complete');
    process.exit();
}).catch((error) => {
    logger.error(error);
    process.exit();
});

