import * as Knex from 'knex';

<<<<<<< HEAD
import { logger } from './logger';

=======
>>>>>>> f720355405c13b426a913242b93f72461c28c592
export const database = Knex({
    client: 'mysql',
    acquireConnectionTimeout: 10000,
    connection: {
        host : process.env.DB_HOST,
        user : process.env.DB_USER,
        password : process.env.DB_PASS,
        database : 'pt_api'
    }
});

<<<<<<< HEAD
database.raw('select 1+1 as result').catch(error => {
    logger.error(error);
=======
database.raw('select 1+1 as result').catch(err => {
    console.log(err);
>>>>>>> f720355405c13b426a913242b93f72461c28c592
    process.exit(1);
});