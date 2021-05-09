import React, { Component } from 'react'
import Star from './Star'

/** App.js => AttractionIndex.js => AttractionList.js => Attraction.js =>Review*/
class Review extends Component {

    state ={
        nbrStar : 5,
    }

    /** Review.js GENERATION OF STAR BOARD OF A REVIEW
     * @param {Number} pLimitStar number of star in a review
     * @returns {Array} array of star*/
    starBoard=(pLimitStar)=>
    {
        let starBoard = [];
        for(let i = 0; i<this.state.nbrStar; i++)
        {
            let isActive;
            isActive = i < pLimitStar;
            
            starBoard.push(<Star
                starIndex={i}
                currentUser={this.props.currentUser}
                isActive={isActive}
                updateUserRating={this.props.updateUserRating}
                key={`review${i}` }/>
            )
        }
        return  starBoard;
    }

    /** Review.js CALL STARBOARD FUNNTION WITH PARAMETER ACORDGIN TO THE RATING
     * @returns {Array} array of star*/
    updateStarLimit=()=>
    {
        let currentRating=Math.round((this.props.rating)*5);
        return this.starBoard(currentRating);
    }
    
    /*-----------------------------------------------------------------------------------------------*/
    /*   .   .   .   .   .   .   .   .   .   .   .RENDER.   .   .   .   .   .   .   .   .   .   .    */
    /*-----------------------------------------------------------------------------------------------*/
    render() {
        return (
            <div className="ratingContainer">
                {this.updateStarLimit()}
                <div className="reviewTxt">
                    <h5>{Math.round((this.props.rating)*5)}/5</h5>
                    <p>{`${this.props.ratingNbr} votes`}</p>
                </div>
            </div>
        )
    }
}
export default Review;