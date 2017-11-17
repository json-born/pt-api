import { database } from '../lib/database';

export async function create(payload: UserPayload) {
    return await database('user').insert(payload);
}

export async function getTrainer() {
    return await database
        .select()
        .from('user')
        .where('type', 'trainer')
        .first();

}

export interface UserPayload {
    id ?: number,
    trainer_id ?: number,
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    confirm_password: string
}