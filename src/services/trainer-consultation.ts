import * as moment from 'moment';
import { arrayToObject } from '../lib/utils';
import { database } from '../lib/database';

export async function read(trainerId: number, fromDate: string, toDate: string) {

    let startDate: moment.Moment = moment(fromDate);
    let endDate: moment.Moment = moment(toDate);

    const trainerConsultations = await database
        .select()
        .from('consultation')
        .where('trainer_id', trainerId)
        .andWhereBetween(
            'start_date', [
                startDate.format("YYYY-MM-DD HH:mm:ss"),
                endDate.format("YYYY-MM-DD HH:mm:ss")
            ]
        );
    
    return arrayToObject('start_date', trainerConsultations);
}
