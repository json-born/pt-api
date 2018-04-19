import { database } from '../lib/database';

export async function readAvailability(trainerId, fromDate: string, toDate: string) {
    return await database
        .select()
        .from('consultation')
        .whereBetween('start_date', [fromDate, toDate])
}
