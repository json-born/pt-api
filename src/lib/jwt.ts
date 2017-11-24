import { Context, Request } from 'koa';
import * as jwt from 'jsonwebtoken';

const SECRET: string = process.env.JWT_SECRET || '';
const ALGORITHM: string = process.env.JWT_ALGORITHM || 'HS256';

if (!SECRET) {
    throw new Error('No JWT secret set');
}

export async function generate(payload: Object, options?: Object) {
    options = {
        ...options,
        algorithm: ALGORITHM,
    };

    try {
        const token = await jwt.sign(payload, SECRET, options);
        return token;
    }
    catch(error) {
        throw error;
    }
}

export async function decode(token: string): Promise<Object> {
    const split: string[] = token.split(' ');
    const options = {
        algorithm: ALGORITHM,
    };
    
    if (split[0] === 'Bearer' && split[1]) {
        token = split[1];
    }

    try {
        return await jwt.verify(token, SECRET, options);
    }
    catch (error) {
        throw error;
    }
}
