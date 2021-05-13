import React, { Component } from 'react';
import { Link  } from "react-router-dom";
import GlobalVar from '../../GlobalVar';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import Booking from './Booking';
import '../../../css/home.css';

/** App.js => HomeIndex.js */
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
        }
    }

    /*-----------------------------------------------------------------------------------------------*/
    /*   .   .   .   .   .   .   .   .   .   .   .DATABASE.   .   .   .   .   .   .   .   .   .   .  */
    /*-----------------------------------------------------------------------------------------------*/

    componentDidMount() {

        GlobalVar.axios.get(`${GlobalVar.url}attractionLight`)
            .then(response => {
                console.log('--    REPONSE   --  Get attraction in high-light : ' , response.data[0].name);
                let attraction = response.data[0];
                this.updateAtrFromData(attraction);
            })
            .catch(error => {
                console.log('--!!  E.R.R.O.R  !!-- Get attraction in high-light :\n', error);
            });
    }

    updateAtrFromData = (pDataResponse) => {
        this.setState({ attraction: pDataResponse });
    }

    /*-----------------------------------------------------------------------------------------------*/
    /*   .   .   .   .   .   .   .   .   .   .   .RENDER.   .   .   .   .   .   .   .   .   .   .    */
    /*-----------------------------------------------------------------------------------------------*/
    render() {

        let bodyContent = (
            <div>
                <section id="mayaparkContainer">
                    <div className="mayaBox">
                        <img className="mayaImg"
                            src="/assets/img/header/maya05.jpg"
                            alt={this.state.attraction.name} />
                        <div className="mayaDesc">
                            <h2>Vivez l'expérience Mayapark</h2>
                            <p>
                                Venez explorer notre parc à thème issus d'un univers passé; d'une civilisation du Mésomérique*: la civilisation Maya.<br />
                                Découvrez ce que cette culture amèrindienne a de plus précieuse, à travers des attractions inédites ainsi que des décors fabuleux.<br />
                                Immergez vous et laissez vous amener dans cette incroyable aventure pleine de dangés, de frissons et de senssations fortes.<br />
                            </p>
                            <p>
                                Mésomérique * : La Mésoamérique (ou Méso-Amérique) est une super-aire culturelle de l'Amérique précolombienne, c'est-à-dire un
                                ensemble de zones géographiques occupées par des ethnies qui partageaient de nombreux traits culturels communs avant la colonisation
                                espagnole de l'Amérique.
                            </p>
                        </div>
                    </div>

                </section>

                <section className=" bgColorWhite">
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
                                        voir plus
                                    </button>
                                </Link>
                            </article>
                        </div>
                    </div>
                </section>

            </div>
        );

        return (
            <div>
                <Header
                    currentUser={this.props.currentUser}
                    indexPath={"home"}
                    setCurrUser={this.props.setCurrUser} />
                    
                    <h1 id="mayaparkTitle">BIENVENUE A MAYAPARK</h1>

                <main>
                    <Booking
                        saveBooking={this.props.saveBooking}
                        currentUser={this.props.currentUser}/>
                    <section id="homeBody">
                        {bodyContent}
                    </section>
                </main>
                <Footer />
            </div>
        )
    }
}
