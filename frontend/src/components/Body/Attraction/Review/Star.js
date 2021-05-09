import React, { Component } from 'react'

/** App.js => AttractionIndex.js => AttractionList.js => Attraction.js =>Review.js => Star.js*/
export default class Star extends Component {

    state =
    {
        id : this.props.starIndex,
        isChecked : false,
    }

    onClick=()=>
    {
        if(this.props.currentUser.type === "user")
        this.setState({ isChecked : !this.state.isChecked}, ()=>
        {
            this.props.updateUserRating(this.state.id);
        });
    }

    /*-----------------------------------------------------------------------------------------------*/
    /*   .   .   .   .   .   .   .   .   .   .   .RENDER.   .   .   .   .   .   .   .   .   .   .    */
    /*-----------------------------------------------------------------------------------------------*/
    render() {
        return (
            <div>
                {
                    this.props.isActive ?
                    <div>
                        <input
                            ref={this.inputStar}
                            id={`star${this.props.starIndex}`}
                            type="checkbox"
                            className="dNone starIsChecked"/>
                        <label
                            onClick={this.onClick}
                            htmlFor={`star${this.props.starIndex}`}
                            className={
                                this.props.currentUser.type === "user" ?
                                'ratingStar bgImgFit starActive starCheck'
                                :
                                'ratingStar bgImgFit starActive'}>
                        </label>
                    </div>
                    :
                    <div>
                        <input
                            id={`star${this.props.starIndex}`}
                            type="checkbox"
                            className="dNone"/>
                        <label 
                            onClick={this.onClick}
                            htmlFor={`star${this.props.starIndex}`}
                            className={
                                this.props.currentUser.type === "user" ?
                                'ratingStar bgImgFit starInactive starCheck'
                                :
                                'ratingStar bgImgFit starInactive'}>
                        </label>
                    </div>
                }
            </div>
        )
    }
}
