import React, { Component } from 'react';
import GlobalVar from '../../GlobalVar';
import Navbar from '../../Navbar/Navbar';
import ParkInformation from '../../Navbar/ParkInformation';
// import AttractionForm from './AttractionForm';
import AttractionList from './AttractionList';

import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import '../../../css/attraction.css';

class AttractionIndex extends Component {

    state = {
        attractions: [{
            description: 'desc',
            id_atr: 0,
            img_url: "/assets/img/attractionPage/atr11.jpg",
            light: 0,
            name: 'nom',
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
        GlobalVar.axios.get(`${GlobalVar.url}attractionList`)
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

    /*-----------------------------------------------------------------------------------------------*/
    /*   .   .   .   .   .   .   .   .    .METHODES ATTRACTIONS.    .    .   .   .   .   .   .   .   */
    /*-----------------------------------------------------------------------------------------------*/

    /** AttractionIndex.js - ADD ATTRACTION FROM FORM
     * @param {Object} pNewAtr new atraction Object */
    addAttraction = (pNewAtr) => {
        this.setState({
            attractions:
                [...this.state.attractions, pNewAtr]
        });
    }

    /** AttractionIndex.js UPDATE ATTRACTIONS AFTER AN EDITION OF ONE OF THEM
     * @param {Number} pAtrId id of the attraction
     * @param {String} pNewName new name of the attraction
     * @param {String} pNewDesc new description of the attraction */
    updateAtr = (pAtrId, pNewName, pNewDesc) => {
        let newAttractions = this.state.attractions.map((attraction) => {
            if (attraction.id_atr === pAtrId) {
                attraction.name = pNewName;
                attraction.description = pNewDesc;
            }
            return attraction;
        })
        this.setState({ attractions: newAttractions });
        //mettre a jour coté database
    }

    delAttractionState=(pId)=>
    {
        let newAttractions = this.state.attractions.filter((attraction, id) => id !== pId);
        this.setState({ attractions: newAttractions });
    }

    /** AttractionIndex.js  - DELETE AN ATTRACTION*/
    delAttraction = async (pId) => {
        try{
            const idAtr = this.state.attractions[pId].id_atr;
            const delRating = await this.delRatingDB(idAtr);
            const delEtr = await this.delAttractionDB(idAtr);
            const delAtrState = await this.delAttractionState(idAtr);
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
                <h1>ATTRACTIONS</h1>
                {/* {
                    this.props.currentUser.type==="admin" ? 
                    <AttractionForm
                     attractions={this.state.attractions}
                     addAttraction={this.addAttraction}
                     />
                    :
                    ""
                } */}
                <AttractionList
                    attractions={this.state.attractions}
                    currentUser={this.props.currentUser}
                    updateRating={this.updateRating}
                    updateAtr={this.updateAtr}
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

                <main id="currentBody" >
                    {bodyContent}
                </main>
                <Footer />
            </div>
        )
    }
}

export default AttractionIndex;