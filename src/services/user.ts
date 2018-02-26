import { database } from '../lib/database';

export async function create(user: User) {
    return await database('user').insert(user);
}

export async function readOne(email: string) {
    return await database
        .select()
        .from('user')
        .where('email', email)
        .first();
}

export interface User {
    id ?: number,
    type ?: 'trainer' | 'client',
    trainer_id ?: number,
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    confirm_password: string
}

export interface LoginPayload {
    email: string,
    password: string
}
