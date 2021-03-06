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
        paramTab: true,
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
     * @param {Int} pIds_res ids of the reservations
     * @param {*} pTickets nbr of tickets of reservation*/
    deleteUserReservationDB = (pIds_res, pTickets) => {

        if (pIds_res.length) {
            let informations = {
                ids_res: pIds_res,
                tickets: pTickets,
            }
            GlobalVar.axios.post(`${GlobalVar.url}reservations/user/${this.props.currentUser.id}`, informations)
                .then(response => {
                    console.log('--    REPONSE   -- Post reservations suppression : ', response.data);
                    this.updateReservations(pIds_res);
                    console.log("-------FEEDBACK - r??servation annul??, pour refaire une reservation, rendez vous sur la page d'accueil");
                })
                .catch(error => {
                    console.log('--!!  E.R.R.O.R  !!-- Post reservations suppression :\n', error);
                    console.log("-------FEEDBACK - Erreur survenu lors de la suppression, r??essayer dans 5'");
                });
        }
    }

    /*-----------------------------------------------------------------------------------------------*/
    /*   .   .   .   .   .   .   .   .   .   .METHODE PARAMETERS.   .   .   .   .   .   .   .   .   .*/
    /*-----------------------------------------------------------------------------------------------*/

    updateTab =()=>
    {
        this.setState({ paramTab: !this.state.paramTab });
    }

    /*-----------------------------------------------------------------------------------------------*/
    /*   .   .   .   .   .   .   .   .   .   .METHODE RESERVATION.   .   .   .   .   .   .   .   .   */
    /*-----------------------------------------------------------------------------------------------*/

    /** USER CLICK ON DELETE BUTTON
     * @param {Array} pIds_res
     * @param {Array} pTickets  */
    deleteReservation = (pIds_res, pTickets) => {
        this.deleteUserReservationDB(pIds_res, pTickets);
    }

    /** UPDATE RESERVATIONS STATES /LIST AFTER USER DELETE RESERVATION
     * @param {Array} pIds_res  */
    updateReservations = (pIds_res) => {
        let currentReservations = this.state.reservations.filter(({ id_res }) => !pIds_res.includes(id_res));
        this.setState({ reservations: currentReservations });
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

                <main id="profilPage" className="currentBody">
                    <h1>PROFIL</h1>
                    {this.state.paramTab ?

                        <section className="profilBox">
                            <div className="profilLside profilTabShadowB">
                                <h4 className="profilActiveTab">
                                    <button className="profilTabBtn" onClick={this.updateTab} >
                                        PARAMETRES
                                    </button>
                                </h4>
                                <h4
                                    className="">
                                    <button className="profilTabBtn" onClick={this.updateTab} >
                                        RESERVATIONS
                                    </button>
                                </h4>
                            </div>
                            <ProfilManager
                                currentUser={this.props.currentUser}
                                currentTab={this.state.currentTab}
                            />

                        </section>

                        :

                        <section className="profilBox">
                            <div className="profilLside profilTabShadowT">
                                <h4 className="">
                                    <button className="profilTabBtn" onClick={this.updateTab} >
                                        PARAMETRES
                                    </button>
                                </h4>
                                <h4
                                    className="profilActiveTab">
                                    <button className="profilTabBtn" onClick={this.updateTab} >
                                        RESERVATIONS
                                    </button>
                                </h4>
                            </div>
                            <ReservationList
                                currentUser={this.props.currentUser}
                                reservations={this.state.reservations}
                                deleteReservation={this.deleteReservation}
                                currentTab={this.state.currentTab}
                            />
                        </section>}
                </main>

                <Footer />
            </div>
        )
    }
}
