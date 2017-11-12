import * as faker from 'faker';

import { database } from '../../src/lib/database';

export async function reset() {
    await database('consultations').del();
}

export async function seed(count: number = 10) {

    const trainer = await database
        .select()
        .from('users')
        .where('type', 'trainer')
        .first();
    
    const clients = await database
        .select()
        .from('users')
        .where('type', 'client');

    for (let client of clients) {
        for(let i = 0; i < count; i++) {
            await database('consultations')
                .insert({
                    client_id: client.id,
                    trainer_id: trainer.id,
                    date: faker.date.future()
                })
        }
    }
}