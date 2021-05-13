import React, { Component } from 'react';
import GlobalVar from "../../GlobalVar";
import DatePicker from './DatePicker';
import Ticket from './Ticket';
import moment from 'moment';


export default class Booking extends Component {

    state = {
        showCalendar: false,
        dates: ["Début", "Fin"],
        inputTicketValue: 1,
        duration: 0,
        ticketPrice: 29,
        ticketMax: 200,
        priceSum: 0,
    }

    /*-----------------------------------------------------------------------------------------------*/
    /*   .   .   .   .   .   .   .   .   .   .   .DATA-BASE.   .   .   .   .   .   .   .   .   .   . */
    /*-----------------------------------------------------------------------------------------------*/

    /** Booking-js -  GET NUMBER OF TICKETS AVAILABLE IN DATA BASE
    * @param {Array} pDays array of dates (every day in range, "YYYY-MM-DD" format) */
    getTicketAreAvaiable = (pDays) => {
        let nbrValidTickets = [];

        pDays.forEach((date, id, array) => {
            GlobalVar.axios.get(`${GlobalVar.url}day/date/${date}`)
                .then(response => {
                    // console.log('--    REPONSE   -- Get number of tickets available by day : ', response.data);
                    response.data[0] ?
                        nbrValidTickets.push(response.data[0].ticketsAvailable)
                        :
                        nbrValidTickets.push(this.state.ticketMax);
                    if (id===array.length-1) setTimeout(()=>this.CheckTicketAreAvaiable(nbrValidTickets, pDays), 100); // ! ! ! ! ! Find a way to use async and awit
                })
                .catch(error => {
                    console.log('--!!  E.R.R.O.R  !!-- Get number of tickets available by day :\n', error);
                });
        });
    }

    /** Booking-js -  UPDATE NUMBER OF AVAILABLE TICKETS IN DAYS RANGE
    * @param {Array} pDates dates of days range (format YYYY-MM-DD)
    * @param {Array} pNbrValidTickets number of tickets available by days range
    * @param {} pNbrTickets number of tickets user need by day*/
    updateDayTicketAvailable = (pNbrValidTickets, pDates, pNbrTickets) => {
        for(let i =0; i<pDates.length; i++)
        {
            let validTicket = pNbrValidTickets[i]-pNbrTickets;

            pNbrValidTickets[i]===200 ? 
                this.addNewDay(pDates[i],validTicket)
                :
                this.updateDay(pDates[i],validTicket);
            
        }
        this.setReservation(pDates);
    }

    /** Booking.ks - ADD NEW DAY IN DATA-BASE
     * @param {*} pDay date of the day (format YYYY-MM-DD)
     * @param {*} pNbrTickets nbr of tickets available */
    addNewDay=(pDay, pNbrTickets)=>
    {
        GlobalVar.axios.post(`${GlobalVar.url}day/date/${pDay}/tickets/${pNbrTickets}`)
            .then(response => {
                console.log('--    REPONSE   -- Post new day : ', response.data);
            })
            .catch(error => {
                console.log('--!!  E.R.R.O.R  !!-- Post new day :\n', error);
            });
    }

     /** Booking.ks - UDPATE A DAY IN DATA-BASE
     * @param {*} pDay date of the day (format YYYY-MM-DD)
     * @param {*} pNbrTickets nbr of tickets available */
    updateDay=(pDay, pNbrTickets)=>
    {
        GlobalVar.axios.put(`${GlobalVar.url}day/date/${pDay}/tickets/${pNbrTickets}`)
            .then(response => {
                console.log('--    REPONSE   -- Put update tickets available : ', response.data);
            })
            .catch(error => {
                console.log('--!!  E.R.R.O.R  !!-- Put update tickets available :\n', error);
            });
    }

    /** Booking-js - ADD RESERVATION */
    setReservation = (pDates) => {

        console.log("setReservation()");
        let newReservation = {
            id_user: this.props.currentUser.id,
            startDay: pDates[0],
            periode: pDates.length,
            state:"inComing",
            price: this.state.priceSum };

        GlobalVar.axios.post(`${GlobalVar.url}createReservation`, newReservation)
            .then(response => {
                console.log('--    REPONSE   -- Put update tickets available : ', response.data);
            })
            .catch(error => {
                console.log('--!!  E.R.R.O.R  !!-- Put update tickets available :\n', error);
            });

        setTimeout(()=>this.setReserve(pDates), 1000); // ! ! ! ! ! Find a way to use async and await
    }

    /** Booking-js - ADD RESERVE ASSOCIATIONS */
    setReserve = () => {
        console.log("-------FEEDBACK - Reservation dans votre panier");
    }

    /*-----------------------------------------------------------------------------------------------*/
    /*   .   .   .   .   .   .   .   .   .METHODES CALENDAR.   .   .   .   .   .   .   .   .   .   . */
    /*-----------------------------------------------------------------------------------------------*/

    /** Booking.js - SHOW CALENDAR WHEN USER CLICK ON DATE BUTTONS || HIDE WHEN HE CLICK ON OTHER BTN
     * @param {Boolean} pBool */
    setShowCalendar = (pBool) => {
        this.setState({ showCalendar: pBool });
    }

    /** Booking.js - USER CLICKED ON A DATE */
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

    /** Booking.js - UPDATE DATES
     * @param {Array} pDates first and last date of booking
     * @param {Boolean} pSort true if it's necessary to sort */
    setDates = (pDates, pSort) => {
        pSort ?
            this.setState({ dates: pDates }, () => { this.sortDates(); this.calcPrice(); })
            :
            this.setState({ dates: pDates }, () => this.calcPrice());
    }

    /** Booking.js - SORT DATES ASCENDING ORDER */
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

    /** Booking.js - CHOCE OF DATE ACCORDING WITH USER ACTIONS (rbnb model custom) 
     * @param {String} pDate user date selection*/
    choseDates = (pDate) => {
        let newDates = [];
        if (pDate === this.state.dates[0] && pDate === this.state.dates[1]) newDates = ["Début", "Fin"];
        else if (moment(pDate).isBefore(this.state.dates[0])) newDates = [pDate, "Fin"];
        else if (pDate === this.state.dates[1]) newDates = [pDate, this.state.dates[1]];
        else newDates = [this.state.dates[0], pDate];

        this.setDates(newDates, false);

    }

    /** Booking.js - CLEAN DATES ARRAY*/
    cleanDates = () => {
        this.setState({ dates: ["Début", "Fin"] }, () => this.calcPrice());
    }

    /*-----------------------------------------------------------------------------------------------*/
    /*   .   .   .   .   .   .   .   .   .METHODES TICKETS.   .   .   .   .   .   .   .   .   .   .  */
    /*-----------------------------------------------------------------------------------------------*/

    /** Booking.js - SET TICKET VALUE WHEN USER SELECT A VALUE ON SELECT DROPDOWN 
     * @param {Number} pValue number of ticket/day for a booking */
    ticketsOnchange = (pValue) => {
        this.setState({ inputTicketValue: pValue.value });
    }

    /*-----------------------------------------------------------------------------------------------*/
    /*   .   .   .   .   .   .   .   .   .METHODES BOOKING.   .   .   .   .   .   .   .   .   .   .  */
    /*-----------------------------------------------------------------------------------------------*/

    /** Booking.js - USER CLICKE ON RESERVATION BUTTON*/
    resIsClicked = (e) => {
        e.preventDefault();
        this.setShowCalendar(false);

        if (this.props.currentUser.type === null) {
            console.log("-------FEEDBACK - GO TINSCRIRE");
        }
        else if (this.props.currentUser.type === "user") {
            if (this.state.dates[0] !== "Début" && this.state.dates[1] !== "Fin") this.saveBooking();
            else {
                console.log("-------FEEDBACK - tu n'as pas précisé les dates");
            }

        }
        else {
            console.log("-------FEEDBACK - tu ne peux pas reserver en tan qu'administrateur");
        }
    }

    /** Booking.js - CALCULATING PRICE OF A BOOKING */
    calcPrice = () => {
        let startDay = moment(this.state.dates[0]);
        let endDay = moment(this.state.dates[1]);
        let duration = Math.abs(moment.duration(startDay.diff(endDay)).asDays()) + 1;
        let sum = (duration * this.state.ticketPrice * this.state.inputTicketValue);

        (this.state.dates[0] !== "Début" && this.state.dates[1] !== "Fin") ?
            this.setState({ priceSum: sum, duration })
            :
            this.setState({ priceSum: 0, duration: 0 });
    }

    /** Booking.js - SAVING A BOOKING*/
    saveBooking = () => {
        let days = [moment(this.state.dates[0], "MM-DD-YYYY").format("YYYY-MM-DD").valueOf()]; /* format sql date */

        for (let i = 0; i < (this.state.duration - 1); i++) {
            let newDay = moment(days[days.length - 1]).add(1, 'days').format("YYYY-MM-DD").valueOf();
            days.push(newDay);
        }
        this.getTicketAreAvaiable(days);
    }

    /** CHECK IF ALL DAYS OF A RESERATION ARE AVAILABLE
    * @param {Array} pTickets array of number of tickets avalable by day in range
    * @param {Array} pDates array of days in range*/
    CheckTicketAreAvaiable = (pTickets, pDates) => {
        const daysAreAvalaible = (ticket) => (ticket - this.state.inputTicketValue) >= 0;

        (pTickets.every(daysAreAvalaible)) ?
            this.updateDayTicketAvailable(pTickets, pDates, this.state.inputTicketValue)
            :
            console.log("-------FEEDBACK -plus de place ");
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
                                    calcPrice={this.calcPrice} />
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
