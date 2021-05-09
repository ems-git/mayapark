import React, { Component} from 'react';

import GlobalVar from "../../GlobalVar";
import DatePicker from './DatePicker';
import Ticket from './Ticket';

import moment from 'moment';


export default class Booking extends Component {

    state = {
        showCalendar: false,
        dates: ["Début", "Fin"],
        inputTicketValue : 1,
        duration:0,
        ticketPrice : 29,
        ticketMax :200,
        priceSum:0,
    }

    /*-----------------------------------------------------------------------------------------------*/
    /*   .   .   .   .   .   .   .   .   .   .   CALENDAR.   .   .   .   .   .   .   .   .   .   .   */
    /*-----------------------------------------------------------------------------------------------*/

    /** SHOW CALENDAR WHEN USER CLICK ON DATE BUTTONS || HIDE WHEN HE CLICK ON OTHER BTN*/
    setShowCalendar = (pBool) => {
        this.setState({ showCalendar: pBool });
    }

    /** USER CLICKED ON A DATE */
    dayIsClicked = (pDate) => {
        if (this.state.dates[0] === "Début") {
            let newDates = [pDate, this.state.dates[1]];
            this.setDates(newDates, false);
        }
        else if (this.state.dates[1] === "Fin") {
            let newDates = [this.state.dates[0], pDate];
            this.setDates(newDates, true);
        }
        else this.choseDates(pDate);
    }

    /** UPDATE DATES */
    setDates = (pDates, pSort) => {
        pSort ?
            this.setState({ dates: pDates }, () =>{ this.sortDates(); this.calcPrice();})
            :
            this.setState({ dates: pDates },() => this.calcPrice());
    }

    /** SORT DATES ASCENDING ORDER */
    sortDates = () => {
        let dateOne = moment(this.state.dates[0], "MM-DD-YYYY").format("MM-DD-YYYY").valueOf();
        let dateTwo = moment(this.state.dates[1], "MM-DD-YYYY").format("MM-DD-YYYY").valueOf();

        let sortDate = [];

        moment(dateOne).isAfter(dateTwo) ?
            sortDate =
            [dateTwo, dateOne]
            :
            sortDate =
            [dateOne, dateTwo];

        this.setState({ dates: sortDate });
    }

    /** CHOCE OF DATE ACCORDING WITH USER ACTIONS (rbnb model custom) */
    choseDates = (pDate) => {
        let newDates = [];
        if (pDate === this.state.dates[0] && pDate === this.state.dates[1]) newDates = ["Début", "Fin"];
        else if (moment(pDate).isBefore(this.state.dates[0])) newDates = [pDate, "Fin"];
        else if (pDate === this.state.dates[1]) newDates = [pDate, this.state.dates[1]];
        else newDates = [this.state.dates[0], pDate];

        this.setDates(newDates, false);

    }

    cleanDates = () => {
        this.setState({ dates: ["Début", "Fin"]}, ()=>this.calcPrice());
    }

    /*-----------------------------------------------------------------------------------------------*/
    /*   .   .   .   .   .   .   .   .   .   .   .TICKETS.   .   .   .   .   .   .   .   .   .   .   */
    /*-----------------------------------------------------------------------------------------------*/

    /** SET TICKET VALUE WHEN USER SELECT A VALUE ON SELECT DROPDOWN  */
    ticketsOnchange = (pValue) =>
    {
        this.setState({ inputTicketValue: pValue.value });
    }

    /*-----------------------------------------------------------------------------------------------*/
    /*   .   .   .   .   .   .   .   .   .   .   .BOOKING.   .   .   .   .   .   .   .   .   .   .   */
    /*-----------------------------------------------------------------------------------------------*/

    resIsClicked = (e) => {
        e.preventDefault();
        this.setShowCalendar(false);

        if(this.props.currentUser.type ===null)
        {
            console.log("-------FEEDBACK - GO TINSCRIRE");
        }
        else if (this.props.currentUser.type ==="user")
        {
            if (this.state.dates[0] !== "Début" && this.state.dates[1] !== "Fin") this.saveBooking();
            else
            {
                console.log("-------FEEDBACK - tu n'as pas précisé les dates");
            }

        }
        else
        {
            console.log("-------FEEDBACK - tu ne peux pas reserver en tan qu'administrateur");
        }
    }

    calcPrice=()=>
    {
        let startDay = moment(this.state.dates[0]);
        let endDay = moment(this.state.dates[1]);
        let duration = Math.abs(moment.duration(startDay.diff(endDay)).asDays()) +1;
        let sum = (duration * this.state.ticketPrice * this.state.inputTicketValue);

        (this.state.dates[0]!=="Début" && this.state.dates[1]!=="Fin") ?
            this.setState({priceSum : sum, duration})
            :
            this.setState({priceSum : 0, duration : 0});
    }

    /*-----------------------------------------------------------------------------------------------*/
    /*   .   .   .   .   .   .   .   .   .   .   .DB-BOOKING.   .   .   .   .   .   .   .   .   .   .*/
    /*-----------------------------------------------------------------------------------------------*/

    saveBooking=()=>
    {
        let days = [moment(this.state.dates[0], "MM-DD-YYYY").format("YYYY-MM-DD").valueOf()]; /* format sql date */

        for (let i = 0; i < (this.state.duration - 1); i++) {
            let newDay = moment(days[days.length - 1]).add(1, 'days').format("YYYY-MM-DD").valueOf();
            days.push(newDay);
        }
        this.getTicketAreAvaiable(days);
    }

    /** GET NUMBER OF TICKETS AVAILABLE IN DATA BASE
    * @param {Array} pDays array of dates (every day in range, "YYYY-MM-DD" format) */
    getTicketAreAvaiable=(pDays)=>
    {
        let days = [];
        pDays.forEach((date,index,array) => {

            GlobalVar.axios.get(`${GlobalVar.url}day/date/${date}`)
            .then(response => {
                if(response.data[0]) days.push(response.data[0].ticketsAvailable);
                else days.push(this.state.ticketMax);

                if (index===array.length-1 ) this.CheckTicketAreAvaiable(days);
            })
            .catch(error => {
                console.log('Booking.js getTicketAreAvaiable() GET-ERROR : ', error);
            });
        });
    }

    /** CHECK IF ALL DAYS OF A RESERATION ARE AVAILABLE
    * @param {Array} pTickets array of number of tickets avalable by day in range */
    CheckTicketAreAvaiable =(pTickets)=>
    {
        const daysAreAvalaible = (ticket) => (ticket-this.state.inputTicketValue) >= 0;
        if (pTickets.every(daysAreAvalaible))
        {
            console.log("-------FEEDBACK -Reservation dans votre panier");
            // maj db nbr ticketsAvailable in day
            // maj db reservation add
            // maj res-day
            // clean inputs (dates, nbr personne)
        }
        else
        {
            console.log("-------FEEDBACK -plus de place ");
        }
    }

    /*-----------------------------------------------------------------------------------------------*/
    /*   .   .   .   .   .   .   .   .   .   .   .RENDER.   .   .   .   .   .   .   .   .   .   .   .*/
    /*-----------------------------------------------------------------------------------------------*/
    render() {
        return (
            <section id="currentBody" className="borderBottom">
                <h2>Réservez votre séjour</h2>
                <table id="bookingContainer">
                    <tbody>
                        <tr className="trBooking">
                            <td className="tdBooking">
                                <h4>Saisissez dates</h4>
                            </td>
                            <td className="tdBooking">
                                <h4>Nombre de personne</h4>
                            </td>
                            <td className="tdBooking">
                                <h4>Prix</h4>
                            </td>
                        </tr>
                        <tr className="trBooking">
                            <td className="tdBooking">
                                <DatePicker
                                    dates={this.state.dates}
                                    showCalendar={this.state.showCalendar}
                                    setShowCalendar={this.setShowCalendar}
                                    cleanDates={this.cleanDates}
                                    dayIsClicked={this.dayIsClicked}
                                    />
                            </td>
                            <td className="tdBooking">
                                <Ticket
                                    ticketsOnchange={this.ticketsOnchange}
                                    setShowCalendar={this.setShowCalendar}
                                    calcPrice={this.calcPrice}/>
                            </td>
                            <td className="tdBooking">
                                {this.state.priceSum}
                            </td>
                            <td className="tdBooking">
                                <button
                                    id="reservBtn"
                                    className="submitBtn"
                                    type="submit"
                                    onClick={this.resIsClicked}
                                >Réserver</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>
        )
    }
}
