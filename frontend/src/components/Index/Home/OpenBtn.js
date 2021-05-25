import React, { Component } from 'react';
import moment from 'moment';
import 'moment/locale/fr';

export default class OpenBtn extends Component {

    /** VALUE OF BUTTON DEPENDING WITH USER SELECTION */
    isDate=()=>
    {
        return (this.props.btnValue !== "Début" && this.props.btnValue !== "Fin") ?
            moment(this.props.btnValue, "MM-DD-YYYY").format("DD-MMM-YYYY").valueOf()
            :
            this.props.btnValue;
    }

    render() {
        return (
            <div className="btnCalbox">

                <button
                    type="button"
                    id={this.props.btnClass}
                    className="openBtn"
                    value={this.isDate()}
                    onClick={() => this.props.setShowCalendar(true)}>
                    {this.isDate()}
                </button>

                {this.props.btnClass === "calRightBtn" ?
                    <button
                        type="button"
                        id="cleanCalendar"
                        onClick={this.props.cleanDates}
                    >X</button>
                :
                null }

            </div>
            
        )
    }
}
