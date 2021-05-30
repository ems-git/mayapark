import React, { Component } from 'react';
import { Link } from "react-router-dom";

import GlobalVar from '../../GlobalVar';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import Booking from './Booking';
import Navbar from '../../Navbar/Navbar';
import ParkInformation from '../../Navbar/ParkInformation';
import '../../../css/home.css';

export default class HomeIndex extends Component {

    state = {
        attraction: {
            id_atr: null,
            name: null,
            descritpion: null,
            img_url: null,
            rating: null,
            ratingNbr: null,
            light: null,
        },
        mayaSection: {
            title: "Vivez l'expérience Mayapark",
            content: `Venez explorer notre parc à thème issus d'un univers passé; d'une civilisation du Mésomérique*: la civilisation Maya.
            Découvrez ce que cette culture amèrindienne a de plus précieuse, à travers des attractions inédites ainsi que des décors fabuleux.
            
            Immergez vous et laissez vous amener dans cette incroyable aventure pleine de dangés, de frissons et de senssations fortes.`,
            note: `Mésomérique * : La Mésoamérique (ou Méso-Amérique) est une super-aire culturelle de l'Amérique précolombienne, c'est-à-dire un
            ensemble de zones géographiques occupées par des ethnies qui partageaient de nombreux traits culturels communs avant la colonisation
            espagnole de l'Amérique.`

        }
    }

    /*-----------------------------------------------------------------------------------------------*/
    /*   .   .   .   .   .   .   .   .   .   .   .DATABASE.   .   .   .   .   .   .   .   .   .   .  */
    /*-----------------------------------------------------------------------------------------------*/

    componentDidMount() {

        this.getAttractionLightDB();
    }

    getAttractionLightDB = () => {
        GlobalVar.axios.get(`${GlobalVar.url}attractionLight`)
            .then(response => {
                console.log('--    REPONSE   --  Get attraction in high-light : ', response.data[0].name);
                let attraction = response.data[0];
                this.setAttractionsState(attraction);
            })
            .catch(error => {
                console.log('--!!  E.R.R.O.R  !!-- Get attraction in high-light :\n', error);
            });
    }

    setAttractionsState = (pDataResponse) => {
        this.setState({ attraction: pDataResponse });
    }

    /*-----------------------------------------------------------------------------------------------*/
    /*   .   .   .   .   .   .   .   .   .   .METHODES.   .   .   .   .   .   .   .   .   .   .   .  */
    /*-----------------------------------------------------------------------------------------------*/

    addToProfil = () => {
        console.log("-------FEEDBACK - Reservation dans votre panier");
    }

    /*-----------------------------------------------------------------------------------------------*/
    /*   .   .   .   .   .   .   .   .   .   .   .RENDER.   .   .   .   .   .   .   .   .   .   .    */
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
                    indexPath={"home"}
                    setCurrUser={this.props.setCurrUser} />

                <h1 id="mayaparkTitle">BIENVENUE A MAYAPARK</h1>

                <main>
                    <Booking
                        currentUser={this.props.currentUser}
                        addToProfil={this.addToProfil} />

                    <section id="homeBody">
                        <div id="mayaparkContainer">
                            <div className="mayaBox bodyContent">
                                {/* <img className="mayaImg"
                                    src="/assets/img/header/maya05.jpg"
                                    alt={this.state.attraction.name} /> */}
                                <div className="mayaDesc">
                                    <h2>{this.state.mayaSection.title}</h2>
                                    <p>{this.state.mayaSection.content}</p>
                                    <p>{this.state.mayaSection.note}</p>
                                </div>
                            </div>
                        </div>

                        {GlobalVar.widthDevice > GlobalVar.phoneWidth ?
                            <div className=" bgColorWhite">
                                <div className="bodyContent">
                                    <h1>ATTRACTION A LA UNE</h1>
                                    <div className="atrContainer bgColorWhite">
                                        <img className="atrImg"
                                            src={this.state.attraction.img_url}
                                            alt={this.state.attraction.name} />
                                        <div className="artBox artBoxL">
                                            <article className="atrContent">
                                                <div className="artTxt">
                                                    <h4>{this.state.attraction.name}</h4>
                                                    <p className="txtC">{this.state.attraction.description}</p>
                                                </div>
                                                <Link
                                                    to="/attraction"
                                                    className="inactive">
                                                    <button
                                                        type="button"
                                                        className="submitBtn">
                                                        Découvrir </button>
                                                </Link>
                                            </article>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            :
                            <div className=" bgColorWhite">
                                <div className="bodyContent">
                                    <h1>ATTRACTION A LA UNE</h1>
                                    <div className="atrContainer bgColorWhite">
                                        <div className="atrImgContainer">
                                            <img className="atrImg"
                                                src={this.state.attraction.img_url}
                                                alt={this.state.attraction.name} />
                                            <h4 className="atrTitle">{this.state.attraction.name}</h4>
                                        </div>
                                            <div className="artBox artBoxL">
                                                <article className="atrContent">
                                                    <div className="artTxt">
                                                        <p className="txtC">{this.state.attraction.description}</p>
                                                    </div>
                                                    <Link
                                                        to="/attraction"
                                                        className="inactive">
                                                        <button
                                                            type="button"
                                                            className="submitBtn">
                                                            Découvrir </button>
                                                    </Link>
                                                </article>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                    }
                        
                    </section>
                </main>
                    <Footer />
            </div>
        )
    }
}
