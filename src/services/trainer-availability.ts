import * as moment from 'moment';
import { arrayToObject } from '../lib/utils';
import { database } from '../lib/database';

import * as trainerConsultationService from './trainer-consultation';
import * as trainerHolidayService from './trainer-holiday';
import { start } from 'repl';

export async function read(id: number) {
    const availability = await database
        .select()
        .from('trainer_availability')
        .where('trainer_id', id);

    return arrayToObject('day_of_week', availability);
}

export async function generateAvailableConsultations(id: number, fromDate: string, toDate: string) {    
    const availability = await read(id);
    const existingConsultations =  await trainerConsultationService.read(id, fromDate, toDate);
    const holidays = await trainerHolidayService.read(id, fromDate, toDate);
 
    let startDate: moment.Moment = moment(fromDate);
    let endDate: moment.Moment = moment(toDate);
    let availableConsultations = {};
    
    while (endDate.diff(startDate, 'days') >= 0) {

        let dayOfWeek = startDate.isoWeekday();

        if (availability[dayOfWeek]) {
            availableConsultations[startDate.format('YYYY-MM-DD')] = [];
            
            let startTime = startDate.clone().set({
                hour: availability[dayOfWeek].start_time.split(':')[0],
                minute: availability[dayOfWeek].start_time.split(':')[1],
                second: availability[dayOfWeek].start_time.split(':')[2],
            });

            let endTime = startDate.clone().set({
                hour: availability[dayOfWeek].end_time.split(':')[0],
                minute: availability[dayOfWeek].end_time.split(':')[1],
                second: availability[dayOfWeek].end_time.split(':')[2],
            });

            while (endTime.diff(startTime, 'hours') !== 0) {
                let slot = startTime.format("YYYY-MM-DD HH:mm:ss");
                let consultation = existingConsultations[slot];
                let holiday = holidays[slot];
                
                if (!consultation && !holiday) {
                    availableConsultations[startDate.format('YYYY-MM-DD')].push({
                        start_time: startTime.format("HH:mm:ss"),
                        end_time: startTime.clone().add(1, "hour").format("HH:mm:ss"),
                    });
                };
                startTime.add(1, 'hour');
            }
        }
        startDate.add(1, 'day');
    }

    return availableConsultations;
}
