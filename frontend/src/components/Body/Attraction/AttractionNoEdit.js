import React, { Component } from 'react';
import Review from './Review/Review';

class AttractionNoEdit extends Component {

    onclick=()=>
    {
        this.props.editAtrIsClicked();
    }
    
    /*-----------------------------------------------------------------------------------------------*/
    /*   .   .   .   .   .   .   .   .   .   .   .RENDER.   .   .   .   .   .   .   .   .   .   .    */
    /*-----------------------------------------------------------------------------------------------*/
    
    render() {
        return (
            this.props.indexAtr % 2 === 0 ?
                <div className="atrContainer bgColorWhite">
                    <img className="atrImg"
                        src={this.props.attraction.img_url}
                        alt={this.props.attraction.name} />
                    <div className="descArt flexStart">
                        <div className="descArtTxtBox">
                            <article className="descArtTxt">
                                {
                                    /* Button edit */
                                    this.props.currentUser.type==="admin"?
                                    <button
                                        className="adminBtn editInactive bgImgFit editR"
                                        onClick={this.onclick}
                                        ></button>
                                    :
                                    ""
                                }
                                <h4>{this.props.attraction.name}</h4>
                                <p className="txtC">{this.props.attraction.description}</p>
                            </article>
                        </div>
                        <Review
                            rating={this.props.attraction.rating}
                            ratingNbr={this.props.attraction.ratingNbr}
                            currentUser={this.props.currentUser}
                            updateUserRating={this.props.updateUserRating}/>
                    </div>
                    
                </div>
            :
            <div className="atrContainer bgColorGrey">
                <div className="descArt flexEnd">
                    <div className="descArtTxtBox">
                        <article className="descArtTxt">
                            {
                                /* Button edit */
                                this.props.currentUser.type === "admin" ?
                                    <button
                                        className="adminBtn editInactive bgImgFit editL"
                                        onClick={this.onclick}
                                    ></button>
                                    :
                                    ""
                            }
                            <h4>{this.props.attraction.name}</h4>
                            <p className="txtC">{this.props.attraction.description}</p>
                        </article>
                    </div>
                    <Review
                        rating={this.props.attraction.rating}
                        ratingNbr={this.props.attraction.ratingNbr}
                        currentUser={this.props.currentUser}
                        updateUserRating={this.props.updateUserRating}/>
                </div>
                <img className="atrImg"
                    src={this.props.attraction.img_url}
                    alt={this.props.attraction.name}/>
            </div>
        );
    }
}

export default AttractionNoEdit;