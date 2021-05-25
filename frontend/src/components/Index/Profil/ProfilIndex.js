import React, { Component } from 'react';
import GlobalVar from '../../GlobalVar';
import Navbar from '../../Navbar/Navbar';
import ParkInformation from '../../Navbar/ParkInformation';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';


import ProfilManager from './ProfilManager';
import ReservationList from './ReservationList';

import '../../../css/profil.css'

export default class ProfilIndex extends Component {

    state = {
        reservations: [],
        currentTab: "reservation",
    }

    componentDidMount() {
        this.getReservationsDB();
    }

    
    /*-----------------------------------------------------------------------------------------------*/
    /*   .   .   .   .   .   .   .   .   .   .   .DATA-BASE.   .   .   .   .   .   .   .   .   .   . */
    /*-----------------------------------------------------------------------------------------------*/

    /** GET RESERVATIONS ON DATA BASE*/
    getReservationsDB = () => {
        GlobalVar.axios.get(`${GlobalVar.url}reservations/user/${this.props.currentUser.id}`)
            .then(response => {
                console.log('--    REPONSE   -- Get reservations list : ', response.data);
                let reservations = response.data;
                this.setState({ reservations: [...this.state.reservations, ...reservations] });
            })
            .catch(error => {
                console.log('--!!  E.R.R.O.R  !!-- Get reservations list :\n', error);
            });
    }

    /** UPDATE RESERVATIONS IN DATA BASE AFTER A USER SUPPRESSION
     * @param {Array} pIds_res  */
    updateReservationDB = (pIds_res,pTickets) => {
        console.log("updateReservationDB()");

        if(pIds_res.length)
        {
            GlobalVar.axios.post(`${GlobalVar.url}reservations/user/${this.props.currentUser.id}`, {ids_res : pIds_res })
            .then(response => {
                console.log('--    REPONSE   -- Post reservations suppression : ', response.data);
                let reservations = response.data;
                this.setState({ reservations: [...this.state.reservations, ...reservations] });
            })
            .catch(error => {
                console.log('--!!  E.R.R.O.R  !!-- Post reservations suppression :\n', error);
            });
        }
    }

    /*-----------------------------------------------------------------------------------------------*/
    /*   .   .   .   .   .   .   .   .   .   .METHODE PARAMETERS.   .   .   .   .   .   .   .   .   .*/
    /*-----------------------------------------------------------------------------------------------*/

    /*-----------------------------------------------------------------------------------------------*/
    /*   .   .   .   .   .   .   .   .   .   .METHODE RESERVATION.   .   .   .   .   .   .   .   .   */
    /*-----------------------------------------------------------------------------------------------*/

    /** USER CLICK ON DELETE BUTTON
     * @param {Array} pIds_res
     * @param {Array} pTickets  */
    deleteReservation = (pIds_res,pTickets) => {
        this.updateReservations(pIds_res);
        this.updateReservationDB(pIds_res, pTickets);
    }

    /** UPDATE RESERVATIONS STATES /LIST AFTER USER DELETE RESERVATION
     * @param {Array} pIds_res  */
    updateReservations=(pIds_res)=>
    {
        let currentReservations = this.state.reservations.filter(({id_res}) => !pIds_res.includes(id_res));
        
        this.setState({reservations : currentReservations});
        
    }
    
    /*-----------------------------------------------------------------------------------------------*/
    /*   .   .   .   .   .   .   .   .   .   .   .RENDER.   .   .   .   .   .   .   .   .   .   .   .*/
    /*-----------------------------------------------------------------------------------------------*/

    render() {
        return (
            <div>
                <ParkInformation />
                <Navbar
                    currentUser={this.props.currentUser}
                    setCurrUser={this.props.setCurrUser} />
                <Header
                    currentUser={this.props.currentUser}
                    indexPath={"profil"}
                    clearMarkSearch={this.props.clearMarkSearch}
                    navMark={this.props.navMark}
                    clearMarkId={this.props.clearMarkId}
                    setCurrUser={this.props.setCurrUser} />

                <main id="currentBody" className="proflContainer">
                    {this.state.currentTab === "reservation" ?

                        <section className="profilBox">
                            <div className="profilLside">
                                <h4>PARAMETRE</h4>
                                <h4 className="profilActivrTab">RESERVATIONS</h4>
                            </div>

                                <ReservationList
                                    currentUser={this.props.currentUser}
                                    reservations={this.state.reservations}
                                    deleteReservation={this.deleteReservation}
                                    currentTab={this.state.currentTab}
                                />
                        </section>

                        :

                        <section className="profilBox">
                            <div className="profilLside">
                                <h4 className="profilActivrTab">PARAMETRE</h4>
                                <h4>RESERVATIONS</h4>
                            </div>
                                <ProfilManager
                                    currentUser={this.props.currentUser}
                                    currentTab={this.state.currentTab}
                                />
                        </section>}
                </main>

                <Footer />
            </div>
        )
    }
}