import React from 'react';
import moment from 'moment';
import 'moment/locale/fr';

export default function WeekDays ()
{
    let daysRow = moment.weekdaysShort(true).map(day => {
        return (<td
                    key={`weeksDay${day}`}
                    className="weekDayCol">
                    {day}
                </td>)
    });
    return daysRow;
}
