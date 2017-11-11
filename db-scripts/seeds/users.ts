import * as faker from 'faker';
import { database } from '../../src/lib/database';

export const reset = async () => {

    await database('users')
        .where('type', 'client')
        .del();

    await database('users').del();

    return;
}

export const seedTrainer = async () => {

    await database('users').insert({
        type: 'trainer',
        first_name: 'Ryan',
        last_name: 'Evans',
        email: 'info@reptcoaching.co.uk',
        password: 'password'
    });

    return;
}

export const seedClients = async (count: number) => {

    const trainer = await database
        .select()
        .from('users')
        .where('type', 'trainer')
        .first()

    for (let i = 0; i < count; i++) {
        await database('users').insert({
            type: 'client',
            trainer_id: trainer.id,
            first_name: faker.name.firstName(),
            last_name: faker.name.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            consultations_available: faker.random.number({min: 0, max: 10})
        });
    }

    return;
}