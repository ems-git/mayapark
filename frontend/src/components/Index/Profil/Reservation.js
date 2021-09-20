import React, { Component } from 'react';
import moment from 'moment';
import 'moment/locale/fr';

export default class Reservation extends Component {
    state={
        id_res: this.props.reservation.id_res,
        tickets: parseInt(this.props.reservation.tickets),
        isChecked:false,
    }
    
    userChecked=()=>
    {
        this.setState({
            isChecked : !this.state.isChecked
        }, ()=>{ this.state.isChecked ? 
            this.props.addToSelection(this.state.id_res,this.state.tickets)
            :
            this.props.removeFromSelection(this.state.id_res, this.state.tickets)
        })
        
    }

    render() {
        return (
            <tbody>
                <tr>
                    <td>{moment(this.props.reservation.startDay, "YYYY-MM-DD").format("DD/MM/YY")}</td>
                    <td>{this.props.reservation.periode}</td>
                    <td>{this.props.reservation.tickets}</td>
                    <td>{this.props.reservation.price}</td>
                    <td>
                        <input
                            className="reservationCheckbox"
                            type="checkbox" 
                            onClick={this.userChecked}/>
                    </td>
                </tr>
            </tbody>
        )
    }
}
