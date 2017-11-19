import { database } from '../lib/database';

export async function create(payload: User) {
    return await database('user').insert(payload);
}

export async function getTrainer(): Promise<User> {
    return await database
        .select()
        .from('user')
        .where('type', 'trainer')
        .first();
}

export async function getByCredentials(payload: LoginPayload) {
    return await database
        .select()
        .from('user')
        .where('email', payload.email)
        .andWhere('password', payload.password)
        .first();
}

export interface User {
    id ?: number,
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
