import React, { Component } from 'react';
import GlobalVar from '../../GlobalVar';
import AttractionNoEdit from './AttractionNoEdit';
import AttractionEdit from './AttractionEdit';

/** App.js => AttractionIndex.js => AttractionList.js => Attraction.js*/
class Attraction extends Component {

    state = {
        isEditable : false, /*true = edit, false = noEdit */
        userRating:null,
    }

    /*-----------------------------------------------------------------------------------------------*/
    /*   .   .   .   .   .   .   .   .   .   .   .DATABASE.   .   .   .   .   .   .   .   .   .   .  */
    /*-----------------------------------------------------------------------------------------------*/

    componentDidMount() {

        if(this.props.currentUser.type==="user")
        {
            GlobalVar.axios.get(`${GlobalVar.url}userRating/user/${this.props.currentUser.id}/attraction/${this.props.attraction.id_atr}`)
            .then(response => {
                if(response.data.length)
                {
                    this.updateUserRatingFromData(null);
                }
                else
                {
                    let userRating = response.data[0].rating;
                    this.updateUserRatingFromData(userRating);
                }
            })
            .catch(error => {
                console.log('Attraction.js - componentDidMount() GET-attraction ERROR : ', error);
            });
        }
    }

    /*-----------------------------------------------------------------------------------------------*/
    /*   .   .   .   .   .   .   .   .   .   .   .STATE.   .   .   .   .   .   .   .   .   .   .    .*/
    /*-----------------------------------------------------------------------------------------------*/

    /** Attraction.js START USER RATING (database Information)
     * @param {Number} pDataResponse value of new user rating */
    updateUserRatingFromData = (pDataResponse) => {
        this.setState({ userRating : pDataResponse });
    }

    /** Attraction.js SET USERRATING OF AN ATTRACTION AND GO TO CALCULATE THE RATING OF ATTRACTION
     * @param {Number} pUserRating value of new user rating */
    updateUserRating =(pUserRating)=>
    {
        let newUserRating = (pUserRating+1)/5;
        if(!this.state.userRating)
        {
            this.setState({userRating : newUserRating },this.props.updateRating(this.props.attraction.id_atr,newUserRating,false,null));
        }
        else
        {
            let lastRating = this.state.userRating;
            this.setState({userRating : newUserRating },this.props.updateRating(this.props.attraction.id_atr,newUserRating,true,lastRating));
        }
        //mettre a jour coté database
    }

    /**  Attraction.js SET ISEDITABLE WHEN ADMIN CLICKE OR NOT ON BUTTON,AND GO TO UPDATE ATR
     * @param {String} pNewName name of the attraction (depend of the input value) 
     * @param {String} pNewDesc description of the attraction (depend of the input value) */
    editAtrIsClicked=(pNewName, pNewDesc)=>
    {
        this.setState({isEditable : !this.state.isEditable},
            ()=>{  if(!this.state.isEditable) this.props.updateAtr(this.props.attraction.id_atr, pNewName, pNewDesc); });
    }

    /*-----------------------------------------------------------------------------------------------*/
    /*   .   .   .   .   .   .   .   .   .   .   .RENDER.   .   .   .   .   .   .   .   .   .   .    */
    /*-----------------------------------------------------------------------------------------------*/
    render() {
        return (
            !this.state.isEditable ?
            <AttractionNoEdit
                attraction={this.props.attraction}
                currentUser={this.props.currentUser}
                updateUserRating={this.updateUserRating}
                indexAtr={this.props.indexAtr}
                editAtrIsClicked={this.editAtrIsClicked}/>
            :
            <AttractionEdit
                attraction={this.props.attraction}
                currentUser={this.props.currentUser}
                indexAtr={this.props.indexAtr}
                editAtrIsClicked={this.editAtrIsClicked}
                updateUserRating={this.updateUserRating}/>
        )
    }

}

export default Attraction;
