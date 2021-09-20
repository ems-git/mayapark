import React, { Component } from 'react';
import GlobalVar from '../../GlobalVar';
import Navbar from '../../Navbar/Navbar';
import ParkInformation from '../../Navbar/ParkInformation';
import AttractionForm from './AttractionForm';
import AttractionList from './AttractionList';

import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import '../../../css/attraction.css';

class AttractionIndex extends Component {

    state = {
        attractions: [{
            description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
            id_atr: 0,
            img_url: "/assets/img/attractionPage/atr11.jpg",
            light: 0,
            name: 'Lorem ipsum',
            rating: 0,
            ratingNbr: 0,
        },],
    }

    /*-----------------------------------------------------------------------------------------------*/
    /*   .   .   .   .   .   .   .   .   .   .   .DATABASE.   .   .   .   .   .   .   .   .   .   .  */
    /*-----------------------------------------------------------------------------------------------*/

    componentDidMount() {
        this.getAttractionsDB();
    }

    /** AttractionIndex.js - GET ATTRACTIONS LIST IN DATABASE*/
    getAttractionsDB = () => {
        GlobalVar.axios.get(`${GlobalVar.url}attractions`)
            .then(response => {
                // console.log('--    REPONSE   -- Get attraction list : ', response.data);
                let attractions = response.data;
                this.setAttractionsState(attractions);
            })
            .catch(error => {
                console.log('--!!  E.R.R.O.R  !!-- Get attraction list :\n', error);
            });
    }

    /** AttractionIndex.js - UPDATE ATTRACTIONS
     * @param {Object} pDataResponse */
    setAttractionsState = (pDataResponse) => {
        this.setState({ attractions: [...this.state.attractions, ...pDataResponse] });
    }

    /** AttractionIndex.js - SET USER RATING 
     * @param {Number} pIdAtr id of the attraction
     * @param {Number} pUserRating user rating
     * @param {Number} pRatingAtr new rating of the attraction
     * @param {Number} pRatingNbrAtr new nbr of rating of the attraction */
    setUserRatingDB=(pIdAtr,pUserRating,pRatingAtr,pRatingNbrAtr)=>
    {
        GlobalVar.axios.post(`${GlobalVar.url}setUserRating/user/${this.props.currentUser.id}/attraction/${pIdAtr}/rating/${pUserRating}`)
            .then((response) => {
                console.log('--    REPONSE   -- Post new user rating :\n', response.data);
                this.updateAttractionRatingDB(pIdAtr,pRatingAtr,pRatingNbrAtr);
            })
            .catch(function (error) {
                console.log('--!!  E.R.R.O.R  !!-- Post new user rating:\n', error);
            });
    }

    /** AttractionIndex.js - UPDATE USER RATIONG
     * @param {Number} pIdAtr id of the attraction
     * @param {Number} pUserRating user rating
     * @param {Number} pRatingAtr new rating of the attraction
     * @param {Number} pRatingNbrAtr new nbr of rating of the attraction */
    updateUserRatingDB=(pIdAtr,pUserRating,pRatingAtr,pRatingNbrAtr)=>
    {
        GlobalVar.axios.put(`${GlobalVar.url}setUserRating/user/${this.props.currentUser.id}/attraction/${pIdAtr}/rating/${pUserRating}`)
            .then((response) => {
                console.log('--    REPONSE   -- Put update user rating :\n', response.data);
                this.updateAttractionRatingDB(pIdAtr,pRatingAtr,pRatingNbrAtr);
            })
            .catch(function (error) {
                console.log('--!!  E.R.R.O.R  !!-- Put update user rating:\n', error);
            });
    }

    /** AttractionIndex.js - UPDATE RATING AND NUMBER RATING OF ATTRACTION
     * @param {Number} pIdAtr id of the attraction
     * @param {Number} pRating new rating of the attraction
     * @param {Number} pNbrpRating number of rating of the attraction*/
     updateAttractionRatingDB=(pIdAtr,pRating, pNbrpRating)=>
     {
        GlobalVar.axios.put(`${GlobalVar.url}updtateRating/attraction/${pIdAtr}/rating/${pRating}/nbrRating/${pNbrpRating}`)
        .then((response) => {
            console.log('--    REPONSE   -- Put new rating :\n', response.data);
        })
        .catch(function (error) {
            console.log('--!!  E.R.R.O.R  !!-- Put new rating:\n', error);
        });
     }

     /** AttractionIndex.js - DELETE AN ATTRACTION IN DATA BASE
      * @param {*} pId id of the attraction
      * @returns  */
    delAttractionDB = (pId) => {
        return new Promise((resolve, reject) => {
            GlobalVar.axios.delete(`${GlobalVar.url}attraction/${pId}`)
                .then((response) => {
                    //console.log('--    REPONSE   -- Delete attraction :\n', response.data);
                    resolve();
                })
                .catch(function (error) {
                    console.log('--!!  E.R.R.O.R  !!-- Delete attraction:\n', error);
                });
        });
    }

     /** AttractionIndex.js DEELETE RATING IN DATA BASE
     * @param {*} pId id of the attraction
     * @returns  */
    delRatingDB = (pId) => {
        return new Promise((resolve,reject)=>{
            GlobalVar.axios.delete(`${GlobalVar.url}rating/attraction/${pId}`)
                .then((response) => {
                    //console.log('--    REPONSE   -- Delete rating :\n', response.data);
                    resolve();
                })
                .catch(function (error) {
                    console.log('--!!  E.R.R.O.R  !!-- Delete rating:\n', error);
                });
        });
    }

    /** AttractionIndex.js CREATE AN ATTRACTION IN DATA BASE
     * @param {*} pNewAtr attraction information */
    createAttractioDB=(pNewAtr)=>
    {
       GlobalVar.axios.post(`${GlobalVar.url}attraction` , pNewAtr )
       .then((response) => {
           console.log('--    REPONSE   -- Post a new attraction:\n', response.data);
           this.setState({ attractions: [...this.state.attractions, {
               description : pNewAtr.description,
               id_atr : response.data.insertId,
               img_url: pNewAtr.img_url,
               name: pNewAtr.name,
               rating: 0,
               ratingNbr: 0,
            }
            ]});
       })
       .catch(function (error) {
           console.log('--!!  E.R.R.O.R  !!--  Post a new attraction:\n', error);
       });
    }

    /*-----------------------------------------------------------------------------------------------*/
    /*   .   .   .   .   .   .   .   .    .METHODES ATTRACTIONS.    .    .   .   .   .   .   .   .   */
    /*-----------------------------------------------------------------------------------------------*/

    /** AttractionIndex.js - ADD ATTRACTION FROM FORM
     * @param {Object} pNewAtr new atraction Object */
    addAttraction = (pNewAtr) => {
        let newAtr = {
            description: pNewAtr.description,
            img_url: pNewAtr.img_url,
            name: pNewAtr.name,
        };
        console.log(newAtr);
        this.createAttractioDB(newAtr);
    }

    /** Attraction.js UPDATE ATTRACTION IN SATABASE AFTER AN EDITION
     * @param {Number} pAtrId id of the attraction
     * @param {String} pNewName new name of the attraction
     * @param {String} pNewDesc new description of the attraction */
    updateAttractionDB = (pAtrId, pNewName, pNewDesc) => {
        return new Promise((resolve, reject) => {
            GlobalVar.axios.put(`${GlobalVar.url}attraction/${pAtrId}`, { name: pNewName, description: pNewDesc })
                .then((response) => {
                    console.log('--    REPONSE   -- Updtate attraction :\n', response.data);
                    resolve();
                })
                .catch(function (error) {
                    console.log('--!!  E.R.R.O.R  !!-- Updtate attraction:\n', error);
                });
        });
    }

    /** AttractionIndex.js UPDATE ATTRACTIONS AFTER AN EDITION OF ONE OF THEM
     * @param {Number} pAtrId id of the attraction
     * @param {String} pNewName new name of the attraction
     * @param {String} pNewDesc new description of the attraction */
     updateAttractionState = (pAtrId, pNewName, pNewDesc) => {
        let newAttractions = this.state.attractions.map((attraction) => {
            if (attraction.id_atr === pAtrId) {
                attraction.name = pNewName;
                attraction.description = pNewDesc;
            }
            return attraction;
        })
        this.setState({ attractions: newAttractions });
    }

    /** AttractionIndex.js  - UPDATE AN ATTRACTION
     * @param {Numbre} pId id of the attraction
     * @param {String} pNewName new title of the attraction
     * @param {String} pNewDesc new desc of the attraction*/
     updateAttraction = async (pId , pNewName, pNewDesc) => {
        try{
            await this.updateAttractionDB(pId, pNewName, pNewDesc);
            await this.updateAttractionState(pId, pNewName, pNewDesc); 
        }
        catch{
            console.log('--!!  E.R.R.O.R  !!-- Update atraction failed:\n')
        }
    }

    delAttractionState=(pId)=>
    {
        let newAttractions = this.state.attractions.filter((attraction, id) => attraction.id_atr !== pId);
        this.setState({ attractions : newAttractions });
    }

    /** AttractionIndex.js  - DELETE AN ATTRACTION*/
    delAttraction = async (pId) => {
        try{
            const idAtr = this.state.attractions[pId].id_atr;
            await this.delRatingDB(idAtr);
            await this.delAttractionDB(idAtr);
            await this.delAttractionState(idAtr);
        }
        catch{
            console.log('--!!  E.R.R.O.R  !!-- Delete rating and atraction failed:\n')
        }
    }

    /*-----------------------------------------------------------------------------------------------*/
    /*   .   .   .   .   .   .   .   .   .   .METHODES RATING.   .   .   .   .   .   .   .   .   .   .*/
    /*-----------------------------------------------------------------------------------------------*/

    /** AttractionIndex.js -UPDATE USERRATING ON ATTRACTION WHEN USER CLICK ON A STAR
     * @param {Number} pIdAtr id of the attraction
     * @param {Number} pUserRating id of star the user clicked (his current rating, between 1 and 5)
     * @param {Boolean} pHadVoted true the user has already voted, else it's false
     * @param {Number} pLastUserRating null or value of last rating of the user on an attraction */
    updateRating = (pIdAtr, pUserRating, pHadVoted, pLastUserRating) => {
        let newAttractions = this.state.attractions.map((attraction) => {
            if (attraction.id_atr === pIdAtr) {
                if (!pHadVoted) //first time user voted for this attraction
                {
                    let sumRating = (attraction.rating * attraction.ratingNbr) + pUserRating;
                    let newNbrRating = attraction.ratingNbr + 1;
                    // let newRating = parseFloat((sumRating / newNbrRating).toFixed(2));
                    let newRating = (Math.round((sumRating / newNbrRating) * 10)/10);

                    attraction.rating = newRating;
                    attraction.ratingNbr = newNbrRating;

                    this.setUserRatingDB(pIdAtr,pUserRating,newRating,newNbrRating);
                }
                else //the user had already voted
                {
                    let newRating = Math.round((((attraction.rating * attraction.ratingNbr) - pLastUserRating + pUserRating) / attraction.ratingNbr)*10)/10;
                    // attraction.rating =  parseFloat((newRating).toFixed(2));
                    attraction.rating = newRating;

                    this.updateUserRatingDB(pIdAtr,pUserRating,newRating,attraction.ratingNbr);
                }
            }
            return attraction;
        })

        this.setState({ attractions: newAttractions });
    }

    /*-----------------------------------------------------------------------------------------------*/
    /*   .   .   .   .   .   .   .   .   .   .   .RENDER.   .   .   .   .   .   .   .   .   .   .   .*/
    /*-----------------------------------------------------------------------------------------------*/
    render() {
        let bodyContent = (
            <div>
                {
                    this.props.currentUser.type==="admin" ? 
                    <AttractionForm
                     attractions={this.state.attractions}
                     addAttraction={this.addAttraction}
                     />
                    :
                    ""
                }
                <AttractionList
                    attractions={this.state.attractions}
                    currentUser={this.props.currentUser}
                    updateRating={this.updateRating}
                    updateAttraction={this.updateAttraction}
                    delAttraction={this.delAttraction}
                />
            </div>)

        return (
            <div>
                <ParkInformation/>
                <Navbar
                    currentUser={this.props.currentUser}
                    setCurrUser={this.props.setCurrUser}/>
                <Header
                    currentUser={this.props.currentUser}
                    indexPath={"attraction"}
                    setCurrUser={this.props.setCurrUser} />

                <main id="mainAttraction" className="currentBody">
                <h1>ATTRACTIONS</h1>
                <div className="pageDesc">
                    <p>Des attractions faites pour tous ! <br></br> Attractions frissonnantes, rapide, aquatique ...Il y en a pour tout le monde! Faite votre choix et laissez vous envouter par cet univers et culture dévordante de magie!</p>
                </div>
                    {bodyContent}
                </main>
                <Footer />
            </div>
        )
    }
}

export default AttractionIndex;