import React, { Component } from 'react';
import GlobalVar from '../../GlobalVar';
import AttractionNoEdit from './AttractionNoEdit';
import AttractionEdit from './AttractionEdit';

class Attraction extends Component {

    state = {
        isEditable : false, /*true = edit, false = noEdit */
        userRating:null,
    }

    /*-----------------------------------------------------------------------------------------------*/
    /*   .   .   .   .   .   .   .   .   .   .   .DATABASE.   .   .   .   .   .   .   .   .   .   .  */
    /*-----------------------------------------------------------------------------------------------*/

    componentDidMount() {
        if(this.props.currentUser.type==="user") this.getUserRatingDB();
    }

    getUserRatingDB=()=>
    {
        GlobalVar.axios.get(`${GlobalVar.url}userRating/user/${this.props.currentUser.id}/attraction/${this.props.attraction.id_atr}`)
        .then(response => {
            //console.log('--    REPONSE   -- Get user rating : ', JSON.stringify(response.data));
            if(response.data.length)
            {
                let userRating = response.data[0].rating;
                this.setUserRating(userRating);
            }
            else
            {
                this.setUserRating(null);
            }
        })
        .catch(error => {
            console.log('--!!  E.R.R.O.R  !!-- Get user rating :\n', error);
        });
    }
    /*-----------------------------------------------------------------------------------------------*/
    /*   .   .   .   .   .   .   .   .   .   .   .STATE.   .   .   .   .   .   .   .   .   .   .    .*/
    /*-----------------------------------------------------------------------------------------------*/

    /** Attraction.js START USER RATING (database Information)
     * @param {Number} pDataResponse value of new user rating */
    setUserRating = (pDataResponse) => {
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
    editAttraction=(pNewName, pNewDesc)=>
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
                editAttraction={this.editAttraction}
                delAttraction={this.props.delAttraction}/>
            :
            <AttractionEdit
                attraction={this.props.attraction}
                currentUser={this.props.currentUser}
                indexAtr={this.props.indexAtr}
                editAttraction={this.editAttraction}
                updateUserRating={this.updateUserRating}
                delAttraction={this.props.delAttraction}/>
        )
    }
}

export default Attraction;
