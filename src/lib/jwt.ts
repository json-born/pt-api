import * as jwt from 'jsonwebtoken';

const SECRET: string = process.env.JWT_SECRET || '';
const ALGORITHM: string = process.env.JWT_ALGORITHM || 'HS256';

if (!SECRET) {
    throw new Error('No JWT secret set');
}

export async function generate(payload: Object, expiresIn?: string) {
    const options: Object = {
        algorithm: ALGORITHM,
        expiresIn: expiresIn
    };
    
    try {
        const token = await jwt.sign(payload, SECRET, options);
        return token;
    }
    catch(error) {
        return error;
    }
}
