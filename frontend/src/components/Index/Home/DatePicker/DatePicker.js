import React, { Component } from 'react';
import Calendar from './Calendar';
import OpenBtn from '../OpenBtn';
import 'moment/locale/fr';

export default class DatePicker extends Component {
    render() {
        return (
            <div className="datePicker">
                <div className="btnCalContainer">
                    <OpenBtn
                        btnClass={"calLeftBtn"}
                        btnValue={this.props.dates[0]}
                        setShowCalendar={this.props.setShowCalendar} />
                    <OpenBtn
                        btnClass={"calRightBtn"}
                        btnValue={this.props.dates[1]}
                        setShowCalendar={this.props.setShowCalendar}
                        cleanDates={this.props.cleanDates}/>
                </div>
                <Calendar
                    showCalendar={this.props.showCalendar}
                    dayIsClicked={this.props.dayIsClicked}
                    dates={this.props.dates} />
            </div>
        )
    }
}
