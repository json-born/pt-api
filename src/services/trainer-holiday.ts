import * as moment from 'moment';
import { arrayToObject } from '../lib/utils';
import { database } from '../lib/database';

export async function read(id: number, fromDate: string, toDate: string) {
    let startDate: moment.Moment = moment(fromDate);
    let endDate: moment.Moment = moment(toDate);

    const holidays = await database
        .select()
        .from('trainer_holiday')
        .where('trainer_id', id)
        .andWhereBetween('start_date', [
            startDate.format("YYYY-MM-DD HH:mm:ss"), 
            endDate.format("YYYY-MM-DD HH:mm:ss")
        ])

    return arrayToObject('start_date', holidays);
}
