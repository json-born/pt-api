import * as Knex from 'knex';

export const database = Knex({
    client: 'mysql',
    connection: {
        host : process.env.DB_HOST,
        user : process.env.DB_USER,
        password : process.env.DB_PASS,
        database : 'pt_api'
      }
});