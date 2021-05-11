import React, { Component } from 'react';
import moment from 'moment';

export default class Day extends Component {

    /** Day.js - CHECK IF IT'S BEFOR OR AFTER TOMORROW
     * @param {String} pDay date of the day */
    pastDaysCheck = (pDay) => {
        let currentDay = moment().add(1, 'days').format('MM-DD-YYYY').valueOf();
        return moment(currentDay).isAfter(pDay);
    }

    /** Day.js - CALL WHEN USER CLICK ON CLICKABLE DAY
     * @param {String} pDay date of the day */
    dayIsClicked = (pDay) =>
    {
        this.props.dayIsClicked(pDay); 
    }

    /** Day.js - CHECK IF THIS DAY IS END OR START DAY OF SELECTION
     * @param {String} pDay date of the day */
    dayIsSelected=(pDay)=>
    {
        return (pDay===this.props.dates[0] || pDay===this.props.dates[1]);
    }

    /** Day.js - CHECK IF THIS DAY IS ON RANGE OF SELECTION 
     * @param {String} pDay date of the day */
    dayIsInRange=(pDay)=>
    {
        return (moment(pDay).isAfter(this.props.dates[0]) && moment(pDay).isBefore(this.props.dates[1]));
    }

    /*-----------------------------------------------------------------------------------------------*/
    /*   .   .   .   .   .   .   .   .   .   .   .RENDER.   .   .   .   .   .   .   .   .   .   .    */
    /*-----------------------------------------------------------------------------------------------*/

    render() {

        let thisDay = moment((`${this.props.dayMonth}-${this.props.dayValue}`), "YYYY-MM-DD").format("MM-DD-YYYY").valueOf();
        let contentCell;

        let classDay = "";
        if(this.pastDaysCheck(thisDay)) /* days past (before today, include) */
        {
            contentCell = 
            (<td
                className={`${this.props.dayClass} pastDays`}>
                {this.props.dayValue}
            </td>)
        }
        else  /* days futur (after today) */
        {
            if(this.props.isCurrent) /* day of current month */
            {
                if (this.dayIsSelected(thisDay)) /*start/end day */
                {
                    classDay=`${this.props.dayClass} isClickable isSelected`;
                }
                else /* day in range ?*/
                {
                    classDay = this.dayIsInRange(thisDay) ? `${this.props.dayClass} isClickable inRange` : `${this.props.dayClass} isClickable`;
                }
            }
            else  /* day of prev/next month // in range ?*/
            {
                classDay= this.dayIsInRange(thisDay) ? `${this.props.dayClass} inRangeBlock` : `${this.props.dayClass} isntClickable`;
            }

            contentCell =
                (<td
                    className={classDay}
                    onClick={this.props.isCurrent ? ()=>this.dayIsClicked(thisDay) : null} >
                    {this.props.dayValue}
                </td>);
        }

        return contentCell;
    }
}


