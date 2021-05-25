import React, { Component } from 'react';
import moment from 'moment';
import 'moment/locale/fr';

import Day from './Day';
import WeekDays from './WeekDays';

export default class Month extends Component {

    /** Month.js - COMPOSITION OF A MONTH WITH PREVIOUS AND NEXT DAYS */
    monthComposition = () => {
        let isCurrent = true;

        let firstDay = parseInt(moment(this.props.currentMonth).startOf("month").format("d"));
        let nbrDays = moment(this.props.currentMonth).daysInMonth();

        /*day before current month */
        let daysPrevMonth = [];
        let prevMonthNbrDays = parseInt(moment(this.props.currentMonth).subtract(1, 'months').daysInMonth());

        let start = prevMonthNbrDays - firstDay +1; /* +1 because i start on monday else +2 */

        for (let i = start; i <= prevMonthNbrDays; i++) {
            daysPrevMonth.push(
                <Day
                    key={`prevD${i}`}
                    dayValue={i}
                    dayClass={"otherDays"}
                    dayMonth={moment(this.props.currentMonth).subtract(1, 'months').format("YYYY-MM")}
                    isCurrent = {!isCurrent}
                    dayIsClicked={this.props.dayIsClicked}
                    dates={this.props.dates}/>
                );
        }

        /*day in current month */
        let daysInMonth = [];
        for (let i = 1; i <= nbrDays; i++) {
            daysInMonth.push(
                <Day
                key={`nxtD${i}`}
                    dayValue={i}
                    dayClass={"currentDays"}
                    dayMonth={this.props.currentMonth}
                    isCurrent = {isCurrent}
                    dayIsClicked={this.props.dayIsClicked}
                    dates={this.props.dates}/>
                );
        }

        /*day after current month */
        let daysNextMonth = [];
        for (let i = 1; i <= 7; i++) {
            daysNextMonth.push(
                <Day
                    key={`curD${i}`}
                    dayValue={i}
                    dayClass={"otherDays"}
                    dayMonth={moment(this.props.currentMonth).add(1, 'months').format("YYYY-MM")}
                    isCurrent = {!isCurrent}
                    dayIsClicked={this.props.dayIsClicked}
                    dates={this.props.dates}/>);
        }
        return this.calendarBoard(daysPrevMonth, daysInMonth, daysNextMonth);
    }

    /** CALENDAR BOARD GENERATOR
     * @param {Array} pPrevDays array of previous month days of first week
     * @param {Array} pCurDay array of current month days
     * @param {Array} pNextDays array of next month days of last week
     * @returns {Array} Board of month*/
    calendarBoard = (pPrevDays, pCurDay, pNextDays) => {
        let allCells = [...pPrevDays, ...pCurDay, ...pNextDays];
        let tableRow = [];
        let currentTable = [];

        allCells.forEach((cell, index) => {
            if (index % 7 === 0) {
                currentTable.push(<tr key={index}>{tableRow}</tr>);
                tableRow = [];
                tableRow.push(cell);
            }
            else {
                tableRow.push(cell);
            }
        });
        return currentTable;
    }

    /*-----------------------------------------------------------------------------------------------*/
    /*   .   .   .   .   .   .   .   .   .   .   .RENDER.   .   .   .   .   .   .   .   .   .   .   .*/
    /*-----------------------------------------------------------------------------------------------*/
    
    render() {
        return (
            <div className={this.props.showCalendar ? `oneMonth calendarShow` : `oneMonth calendarHide` }>
                <table id={this.props.currentMonth} className="monthContainer">
                    <thead className="calenderHead">

                        {this.props.isLeft ?
                            <tr>
                                <th colSpan="2"><button onClick={()=>this.props.btnPressed(false)}>{"<"}</button></th>
                                <th colSpan="5">{moment(this.props.currentMonth).format('MMMM YYYY')}</th>
                            </tr>
                            :
                            <tr>
                                <th colSpan="5">{moment(this.props.currentMonth).format('MMMM YYYY')}</th>
                                <th colSpan="2"><button onClick={()=>this.props.btnPressed(true)}>{">"}</button></th>
                            </tr>
                        }
                        <tr className="weekDayRow">
                            <WeekDays/>
                        </tr>
                    </thead>
                    <tbody className="calenderBody">
                        {this.monthComposition()}
                    </tbody>
                </table>
            </div>
        )
    }
}

