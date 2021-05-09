import React, { Component } from 'react';
import GlobalVar from '../../GlobalVar'
// import Wysiwyg from '../../Wysiwyg.js';
// import AttractionForm from './AttractionForm';
import AttractionList from './AttractionList';

import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';

import '../../../css/attraction.css';


/** App.js =>  AttractionIndex.js*/
class AttractionIndex extends Component {

    state={
        attractions :  [{
            id_atr : 0,
            name : "atrTest",
            description : `decriptionTest`,
            img_url : "/assets/img/attractionPage/atr07.jpg",
            rating : 3/5,
            ratingNbr : 5,
            light : false,
        },],
    }

    /*-----------------------------------------------------------------------------------------------*/
    /*   .   .   .   .   .   .   .   .   .   .   .DATABASE.   .   .   .   .   .   .   .   .   .   .  */
    /*-----------------------------------------------------------------------------------------------*/
    componentDidMount() {

        GlobalVar.axios.get(`${GlobalVar.url}attractionList`)
            .then(response => {
                let attractions = response.data;
                this.updateAtrFromData(attractions);
            })
            .catch(error => {
                console.log('AttractionIndex.js - componentDidMount() GET-attraction ERROR : ', error);
            });
    }

    updateAtrFromData = (pDataResponse) => {

        this.setState({ attractions: [...this.state.attractions, ...pDataResponse] });
    }

    /*-----------------------------------------------------------------------------------------------*/
    /*   .   .   .   .   .   .   .   .   .   .   .  .   .   .   .   .   .   .   .   .   .   .   .   .*/
    /*-----------------------------------------------------------------------------------------------*/

    /** AttractionIndex.js - ADD ATTRACTION FROM FORM
     * @param {Object} pNewAtr new atraction Object */
    addAttraction =(pNewAtr)=>
    {
        this.setState({attractions:
            [...this.state.attractions, pNewAtr]});
    }
    /*-----------------------------------------------------------------------------------------------*/
    /*   .   .   .   .   .   .   .   .   .   .   .RATING.   .   .   .   .   .   .   .   .   .   .   .*/
    /*-----------------------------------------------------------------------------------------------*/

    /** AttractionIndex.js -UPDATE USERRATING ON ATTRACTION WHEN USER CLICK ON A STAR
     * @param {Number} pIdAtr id of attraction
     * @param {Number} pUserRating id of user rating star */
     updateRating=(pIdAtr, pUserRating, pHadVoted, pLastUserRating)=>
    {
        console.log("test upsdetae raitng",pIdAtr, pUserRating, pHadVoted, pLastUserRating);
        let newAttractions = this.state.attractions.map((attraction)=>
        {
            if (attraction.id_atr === pIdAtr)
            {
                if(!pHadVoted) //user votes for the first time on this attraction
                {
                    let sumRating = (attraction.rating * attraction.ratingNbr) + pUserRating;
                    let newNbrRating = attraction.ratingNbr + 1;
                    let newRating = sumRating / newNbrRating;

                    attraction.rating = newRating;
                    attraction.ratingNbr = newNbrRating;
                }
                else //the user had already voted
                {
                    let newRating = ((attraction.rating * attraction.ratingNbr) - pLastUserRating + pUserRating) /attraction.ratingNbr ;
                    attraction.rating = newRating;
                }
            }
            return attraction;
        })

        this.setState({attractions : newAttractions});
        //mettre a jour coté database
    }

    /*-----------------------------------------------------------------------------------------------*/
    /*   .   .   .   .   .   .   .   .   .   .   .UPDATE ATR.    .   .   .   .   .   .   .   .   .   */
    /*-----------------------------------------------------------------------------------------------*/

    /** AttractionIndex.js UPDATE ATTRACTIONS AFTER AN EDITION OF ONE OF THEM
     * @param {Number} pAtrId id of the attraction
     * @param {String} pNewName new name of the attraction
     * @param {String} pNewDesc new description of the attraction */
    updateAtr =(pAtrId, pNewName, pNewDesc)=>
    {
        let newAttractions = this.state.attractions.map((attraction)=>{
            if(attraction.id_atr === pAtrId)
            {
                attraction.name = pNewName;
                attraction.description = pNewDesc;
            }
            return attraction;
        })
        this.setState({attractions : newAttractions});
        //mettre a jour coté database
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
                 />
            </div> )

       return(
           <div>
               <Header
                   currentUser={this.props.currentUser}
                   indexPath={"attraction"}
                   clearMarkSearch={this.props.clearMarkSearch}
                   navMark={this.props.navMark}
                   clearMarkId={this.props.clearMarkId}
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