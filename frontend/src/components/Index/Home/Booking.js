import React, { Component } from 'react';
import GlobalVar from "../../GlobalVar";
import DatePicker from './DatePicker/DatePicker';
import Ticket from './Ticket';
import moment from 'moment';

export default class Booking extends Component {

    state = {
        showCalendar: false,
        dates: ["Début", "Fin"],
        fullDates: [],
        inputTicketValue: 1,
        duration: 0,
        ticketPrice: 29,
        ticketMax: 200,
        priceSum: 0,
    }

    /*-----------------------------------------------------------------------------------------------*/
    /*   .   .   .   .   .   .   .   .   .   .   .DATA-BASE.   .   .   .   .   .   .   .   .   .   . */
    /*-----------------------------------------------------------------------------------------------*/

    /** GET NUMBER OF TICKETS AVAILABLE IN DATA BASE */
    checkValidTicketDB = () => {
        console.log('checkValidTicketDB()');

        let startDay = moment(this.state.dates[0], "MM-DD-YYYY").format("YYYY-MM-DD");
        let endDay = moment(this.state.dates[1], "MM-DD-YYYY").format("YYYY-MM-DD");

        GlobalVar.axios.get(`${GlobalVar.url}day/startDate/${startDay}/endDate/${endDay}/ticket/${this.state.inputTicketValue}`)
            .then(response => {
                console.log('--    REPONSE   -- Get unavailableDay : ', response.data);
                response.data[0].unavailableDay ?
                    console.log("-------FEEDBACK - plus de place ")
                    :
                    this.getIdExistingDaysDB(startDay, endDay);
            })
            .catch(error => {
                console.log('--!!  E.R.R.O.R  !!--  Get unavailableDay :\n', error);
            });
    }

    /** GET DATES OF EXISTING DAY IN DATA BASE
     * @param {String} pStartDay start day of reservation(format "YYYY-MM-DD")
     * @param {String} pEndDay end day of reservation (format "YYYY-MM-DD")*/
    getIdExistingDaysDB = (pStartDay, pEndDay) => {
        console.log('getIdExistingDaysDB()');

        GlobalVar.axios.get(`${GlobalVar.url}day/startDay/${pStartDay}/endDays/${pEndDay}`)
            .then(response => {
                console.log('--    REPONSE   -- Get existing days dates : ', response.data);
                this.createRequestArray(response.data);
            })
            .catch(error => {
                console.log('--!!  E.R.R.O.R  !!--  Get existing days dates :\n', error);
            });

    }

    /** SET DAYS OR UPDATE TICKETS AVAILABLE ON EXISTING DAYS, SET RESERVATION AND SET RESERVE IN DATA BASE*/
    saveBooking = (pInsertDates, pExistingDays) => {
        console.log('saveBooking()');

        if (!pExistingDays.length && !pInsertDates.length) pInsertDates=this.state.fullDates;

        let startDay = moment(this.state.dates[0], "MM-DD-YYYY").format("YYYY-MM-DD");
        let endDay = moment(this.state.dates[1], "MM-DD-YYYY").format("YYYY-MM-DD");

        let informations = {
            id_user: this.props.currentUser.id,
            startDay,
            endDay,
            periode: this.state.duration,
            dates: this.state.fullDates,
            tickets: this.state.inputTicketValue,
            price: this.state.priceSum,
            insertDates: pInsertDates,
            updateDates: pExistingDays,
        }

        GlobalVar.axios.post(`${GlobalVar.url}booking`, informations)
            .then(response => {
                console.log('--    REPONSE   -- Post days,reservation,reserve : ', response,"\n-------FEEDBACK - Reservation pris en compte, check tes résa dans ton profil" );
                this.cleanBooking();
            })
            .catch(error => {
                console.log('--!!  E.R.R.O.R  !!--  Post days,reservation,reserve :\n', error, "\n-------FEEDBACK - Un problème est survenu lors de votre reservation, veuillez ré-essayer plus tard");
            });
    }

    /*-----------------------------------------------------------------------------------------------*/
    /*   .   .   .   .   .   .   .   .   .METHODES CALENDAR.   .   .   .   .   .   .   .   .   .   . */
    /*-----------------------------------------------------------------------------------------------*/

    /** SHOW CALENDAR WHEN USER CLICK ON DATE BUTTONS || HIDE WHEN HE CLICK ON OTHER BTN
     * @param {Boolean} pBool */
    setShowCalendar = (pBool) => {
        this.setState({ showCalendar: pBool });
    }

    /** USER CLICKED ON A CALANDAR DAY
     * @param {String} pDate day clicked (format 'MM-DD-YYYY')*/
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

    /** UPDATE DATES
     * @param {Array} pDates first and last date of a reservation
     * @param {Boolean} pSort true if it's necessary to sort dates*/
    setDates = (pDates, pSort) => {
        pSort ?
            this.setState({ dates: pDates }, () => { this.sortDates(); this.calcPrice(); })
            :
            this.setState({ dates: pDates }, () => this.calcPrice());
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

    /** CHOCE OF DATE ACCORDING WITH USER ACTIONS (Based on resarvation model by RBNB) 
     * @param {String} pSelectedDay day clicked (format 'MM-DD-YYYY')*/
    choseDates = (pSelectedDay) => {
        let newDates = [];
        let startDay = this.state.dates[0];
        let endDay = this.state.dates[1];

        if (pSelectedDay === startDay && pSelectedDay === endDay) newDates = ["Début", "Fin"];
        else if (moment(pSelectedDay).isBefore(startDay)) newDates = [pSelectedDay, "Fin"];
        else if (pSelectedDay === endDay) newDates = [pSelectedDay, endDay];
        else newDates = [startDay, pSelectedDay];

        this.setDates(newDates, false);
    }

    /** CLEAN DATES ARRAY*/
    cleanDates = () => {
        this.setState({ dates: ["Début", "Fin"] }, () => this.calcPrice());
    }

    /** CLEAN DATES ARRAY*/
    cleanBooking = () => {
        this.setState({
            showCalendar: false,
            dates: ["Début", "Fin"],
            fullDates: [],
            inputTicketValue: 1,
            duration: 0,
            priceSum: 0, });
    }

    /*-----------------------------------------------------------------------------------------------*/
    /*   .   .   .   .   .   .   .   .   .METHODES TICKETS.   .   .   .   .   .   .   .   .   .   .  */
    /*-----------------------------------------------------------------------------------------------*/

    /** SET TICKET VALUE WHEN USER SELECT A VALUE ON SELECT DROPDOWN 
     * @param {Number} pValue number of ticket/day for a booking */
    ticketsOnchange = (pValue) => {
        this.setState({ inputTicketValue: pValue.value }, ()=> this.calcPrice());
    }

    /*-----------------------------------------------------------------------------------------------*/
    /*   .   .   .   .   .   .   .   .   .METHODES BOOKING.   .   .   .   .   .   .   .   .   .   .  */
    /*-----------------------------------------------------------------------------------------------*/


    /** CALCULATING PRICE OF A BOOKING */
    calcPrice = () => {
        let startDay = moment(this.state.dates[0]);
        let endDay = moment(this.state.dates[1]);

        let duration = Math.round(Math.abs(moment.duration(startDay.diff(endDay)).asDays())) + 1;
        let priceSum = (duration * this.state.ticketPrice * this.state.inputTicketValue);

        (this.state.dates[0] !== "Début" && this.state.dates[1] !== "Fin") ?
            this.setState({ priceSum, duration }, () => this.updateFullDates())
            :
            this.setState({ priceSum: 0, duration: 0 }, () => this.updateFullDates());
    }

    /** USER CLICKED ON RESERVATION BUTTON */
    reserveIsClicked = (e) => {
        console.log('reserveIsClicked()');

        e.preventDefault();
        this.setShowCalendar(false);

        if (this.props.currentUser.type === null) {
            console.log("-------FEEDBACK - GO TINSCRIRE");
        }
        else if (this.props.currentUser.type === "user") {
            if (this.state.dates[0] !== "Début" && this.state.dates[1] !== "Fin") this.checkValidTicketDB();
            else console.log("-------FEEDBACK - tu n'as pas précisé les dates");
        }
        else {
            console.log("-------FEEDBACK - tu ne peux pas reserver en tan qu'administrateur");
        }
    }

    /** SAVING A BOOKING*/
    updateFullDates = () => {
        let days;
        if (this.state.duration > 0) {
            days = [moment(this.state.dates[0], "MM-DD-YYYY").format("YYYY-MM-DD").valueOf()]; /* format sql date */

            for (let i = 0; i < (this.state.duration - 1); i++) {
                let newDay = moment(days[days.length - 1]).add(1, 'days').format("YYYY-MM-DD").valueOf();
                days.push(newDay);
            }
        }
        else {
            days = [];
        }

        this.setState({ fullDates: days });
    }

    /**Booking-js -  SAVE DAYS, UPDATE TICKETS AVAILABLE, RESERVATION AND RESERVE IN DATA BASE
    * @param {Array} pExistingDates array of date in database (format YYYY-MM-DD) */
     createRequestArray=(pExistingDates)=> {
        console.log('createRequestArray()');
         let updateDates = [];
         let insertDates = [];
 
         pExistingDates.forEach((element,index,array) => {
             updateDates.push(element.date);
             if(index===array.length-1)insertDates = this.state.fullDates.filter( dates => !updateDates.includes( dates ));
         });
 
         this.saveBooking(insertDates, updateDates);
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
                                    inputTicketValue={this.state.inputTicketValue}
                                    ticketsOnchange={this.ticketsOnchange}
                                    setShowCalendar={this.setShowCalendar} />
                            </td>
                            <td className="tdBooking">
                                {this.state.priceSum}
                            </td>
                            <td className="tdBooking">
                                <button
                                    id="reservBtn"
                                    className="submitBtn"
                                    type="submit"
                                    onClick={this.reserveIsClicked}
                                >Réserver</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>
        )
    }
}
