import * as Knex from 'knex';

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

database.raw('select 1+1 as result').catch(err => {
    console.log(err);
    process.exit(1);
});