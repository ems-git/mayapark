import React, { Component } from 'react';
import EditBtns from './EditBtns';
import Review from './Review/Review';
import GlobalVar from '../../GlobalVar';

class AttractionNoEdit extends Component {

    editAttraction = () => {
        this.props.editAttraction(null, null);
    }

    delAttraction = () => {
        this.props.delAttraction(this.props.indexAtr);
    }

    /*-----------------------------------------------------------------------------------------------*/
    /*   .   .   .   .   .   .   .   .   .   .   .RENDER.   .   .   .   .   .   .   .   .   .   .    */
    /*-----------------------------------------------------------------------------------------------*/

    render() {

        let editActive = false;
        let onRight = true;
        return (
            GlobalVar.widthDevice > GlobalVar.phoneWidth ?
                this.props.indexAtr % 2 === 0 ?
                    <div className="atrContainer bgColorWhite">
                        <div className="atrImgContainer">
                            <img className="atrImg"
                                src={this.props.attraction.img_url}
                                alt={this.props.attraction.name} />
                        </div>
                        <div className="artBox artBoxL">
                           
                            <article className="atrContent">
                                <div className="artTxt">
                                    <h4>{this.props.attraction.name}</h4>
                                    <p className="txtC">{this.props.attraction.description}</p>
                                </div>
                                <Review
                                    rating={this.props.attraction.rating}
                                    ratingNbr={this.props.attraction.ratingNbr}
                                    currentUser={this.props.currentUser}
                                    updateUserRating={this.props.updateUserRating} />
                            </article>
                            { /* Button edit & del  */
                                this.props.currentUser.type === "admin" ?
                                    <EditBtns
                                        editAttraction={this.editAttraction}
                                        delAttraction={this.delAttraction}
                                        editActive={editActive}
                                        onRight={onRight} />
                                    :
                                    ""}

                        </div>
                    </div>
                    :
                    <div className="atrContainer bgColorGrey">
                        <div className="artBox artBoxR">
                           
                            <article className="atrContent">
                                <div className="artTxt">
                                    <h4>{this.props.attraction.name}</h4>
                                    <p className="txtC">{this.props.attraction.description}</p>
                                </div>
                                <Review
                                    rating={this.props.attraction.rating}
                                    ratingNbr={this.props.attraction.ratingNbr}
                                    currentUser={this.props.currentUser}
                                    updateUserRating={this.props.updateUserRating} />
                            </article>
                            { /* Button edit & del  */
                                this.props.currentUser.type === "admin" ?
                                    <EditBtns
                                        editAttraction={this.editAttraction}
                                        delAttraction={this.delAttraction}
                                        editActive={editActive}
                                        onRight={onRight = false} />
                                    :
                                    ""}
                        </div>
                        <div className="atrImgContainer">
                            <img className="atrImg"
                                src={this.props.attraction.img_url}
                                alt={this.props.attraction.name} />
                        </div>
                    </div>
                :
                
                // PHONE DEVICE 
                <div className="atrContainer bgColorWhite">
                    <div className="atrImgContainer">
                        <img className="atrImg"
                            src={this.props.attraction.img_url}
                            alt={this.props.attraction.name} />
                        <h4 className="atrTitle">{this.props.attraction.name}</h4>
                    </div>

                    <div className="artBox artBoxL">
                        
                        <article className="atrContent">
                            <div className="artTxt">
                                <p className="txtC">{this.props.attraction.description}</p>
                            </div>
                            <Review
                                rating={this.props.attraction.rating}
                                ratingNbr={this.props.attraction.ratingNbr}
                                currentUser={this.props.currentUser}
                                updateUserRating={this.props.updateUserRating} />
                        </article>
                        { /* Button edit & del  */
                            this.props.currentUser.type === "admin" ?
                                <EditBtns
                                    editAttraction={this.editAttraction}
                                    delAttraction={this.delAttraction}
                                    editActive={editActive}
                                    onRight={onRight} />
                                :
                                ""}
                    </div>
                </div>
        );
    }
}

export default AttractionNoEdit;