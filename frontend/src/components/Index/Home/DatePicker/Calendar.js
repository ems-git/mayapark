import React, { Component } from 'react';
import moment from 'moment';
import Month from './Month';

import GlobalVar from '../../../GlobalVar';

export default class Calendar extends Component {

    state={
        leftMonth : moment().format("YYYY-MM"), /* why this format ? because of moment.js */
        rightMonth : moment().add(1, 'months').format("YYYY-MM"),
    }

    /** Calendar.js - SWITCH MONTHS ON CALENDAR WHEN USER CLICK ON NEXY OR PREV BTN
     * @param {Boolean} */
    btnPressed=(pIsNext)=>
    {
        let leftNext =  moment(this.state.leftMonth).add(1, 'months').format("YYYY-MM");
        let rightNext =  moment(this.state.rightMonth).add(1, 'months').format("YYYY-MM");

        let leftPrev =  moment(this.state.leftMonth).subtract(1, 'months').format("YYYY-MM");
        let rightPrev =  moment(this.state.rightMonth).subtract(1, 'months').format("YYYY-MM");

        pIsNext ?
            this.setState({ leftMonth : leftNext, rightMonth :rightNext})
            :
            this.setState({ leftMonth : leftPrev, rightMonth :rightPrev});
    }

    /*-----------------------------------------------------------------------------------------------*/
    /*   .   .   .   .   .   .   .   .   .   .   .RENDER.   .   .   .   .   .   .   .   .   .   .    */
    /*-----------------------------------------------------------------------------------------------*/

    render() {

        let isLeft = true;

        return (
            GlobalVar.widthDevice > GlobalVar.phoneWidth ?
                <div className="monthsContainer">
                    <Month
                        showCalendar={this.props.showCalendar}
                        currentMonth={this.state.leftMonth}
                        isLeft={isLeft}
                        btnPressed={this.btnPressed}
                        dayIsClicked={this.props.dayIsClicked}
                        dates={this.props.dates} />
                    <Month
                        showCalendar={this.props.showCalendar}
                        currentMonth={this.state.rightMonth}
                        isLeft={!isLeft}
                        btnPressed={this.btnPressed}
                        dayIsClicked={this.props.dayIsClicked}
                        dates={this.props.dates} />
                </div>
                :
                <div className="monthsContainer">
                    <Month
                        showCalendar={this.props.showCalendar}
                        currentMonth={this.state.leftMonth}
                        isLeft={!isLeft}
                        btnPressed={this.btnPressed}
                        dayIsClicked={this.props.dayIsClicked}
                        dates={this.props.dates} />
                </div>
        )
    }
}
