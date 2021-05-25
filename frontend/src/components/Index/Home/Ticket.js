import React, { Component } from 'react'

export default class Ticket extends Component {
    ticketValue = React.createRef();
    
    render() {
        return (
            <div>
                <select
                    name="ticket"
                    id="ticketInput"
                    ref={this.ticketValue}
                    value={this.props.inputTicketValue}
                    onChange={()=>this.props.ticketsOnchange(this.ticketValue.current)}
                    onClick={()=>this.props.setShowCalendar(false)}
                >
                    <option value="1">1 personne</option>
                    <option value="2">2 personnes</option>
                    <option value="3">3 personnes</option>
                    <option value="4">4 personnes</option>
                    <option value="5">5 personnes</option>
                    <option value="15">{"Groupe (max 15)"}</option>
                </select>
            </div>
        )
    }
}
