import React, { Component } from 'react';
import Reservation from './Reservation';
import GlobalVar from '../../GlobalVar';

export default class ReservationList extends Component {

    state = {
        ids_res: [],
        tickets:[],
    }

    addToSelection = (pId_res,pTickets) => {
        this.setState({
                ids_res: [...this.state.ids_res, pId_res],
                tickets: [...this.state.tickets, pTickets] });
    }

    removeFromSelection = (pId_res,pTickets) => {
        console.log(pId_res,pTickets)
        let newId_res = this.state.ids_res.filter(id => id !== pId_res);
        let newTickets = this.state.tickets.filter(ticket => ticket !== pTickets);

        this.setState({
            ids_res: newId_res ,
            tickets: newTickets });
    }

    clearState=()=>{
        this.setState({
            ids_res: [],
            tickets:[],
        })
    }
    render() {
        return (
            <div className="profilRside">
                <table className="profilTable">
                    <thead>
                        <tr>
                            <th><h6>Arrivée</h6><p> . </p></th>
                            <th><h6>Durée</h6><p><i>en jour</i></p></th>
                            <th><h6>Tickets</h6><p><i>par jour</i></p></th>
                            <th><h6>Totale</h6><p><i>en euros</i></p></th>
                            <th><h6>Cocher</h6><p> . </p></th>
                        </tr>
                    </thead>
                    {this.props.reservations.map((reservation, index) => (
                        <Reservation
                            key={`atr${reservation.id_res}`}
                            currentUser={this.props.currentUser}
                            reservation={reservation}
                            deleteReservation={this.props.deleteReservation}
                            addToSelection={this.addToSelection}
                            removeFromSelection={this.removeFromSelection}
                        />))}
                    <tfoot>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            {GlobalVar.widthDevice>480 ? <td></td> : null}
                            <td colSpan={GlobalVar.widthDevice>480 ? "0" :"2"}>
                                <button
                                    className="submitBtn profilBtn"
                                    onClick={() =>this.props.deleteReservation(this.state.ids_res, this.state.tickets)}
                                > SUPPRIMER </button>
                            </td>
                        </tr>
                    </tfoot>
                </table>

            </div>
        )
    }
}
