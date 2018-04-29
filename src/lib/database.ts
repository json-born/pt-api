import * as Knex from 'knex';

import logger from './logger';

export const database = Knex({
    client: 'mysql',
    acquireConnectionTimeout: 10000,
    connection: {
        host : process.env.DB_HOST,
        user : process.env.DB_USER,
        password : process.env.DB_PASS,
        database : 'pt_api',
        dateStrings: true
    }
});
