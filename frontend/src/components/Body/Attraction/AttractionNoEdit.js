import React, { Component } from 'react';
import EditBtns from './EditBtns';
import Review from './Review/Review';

class AttractionNoEdit extends Component {

    editAttraction=()=>
    {
        this.props.editAttraction(null,null);
    }

    delAttraction=()=>
    {
        this.props.delAttraction(this.props.indexAtr);
    }
    
    /*-----------------------------------------------------------------------------------------------*/
    /*   .   .   .   .   .   .   .   .   .   .   .RENDER.   .   .   .   .   .   .   .   .   .   .    */
    /*-----------------------------------------------------------------------------------------------*/
    
    render() {
        
        let editActive = false ;
        let onRight=true;
        return (
            this.props.indexAtr % 2 === 0 ?
                <div className="atrContainer bgColorWhite">
                    <img className="atrImg"
                        src={this.props.attraction.img_url}
                        alt={this.props.attraction.name} />
                    <div className="artBox artBoxL">
                        { /* Button edit & del  */
                            this.props.currentUser.type === "admin" ?
                                <EditBtns
                                    editAttraction={this.editAttraction}
                                    delAttraction={this.delAttraction}
                                    editActive={editActive}
                                    onRight={onRight} />
                                :
                                "" }
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
                        
                    </div>
                </div>
            :
            <div className="atrContainer bgColorGrey">
                 <div className="artBox artBoxR">
                        { /* Button edit & del  */
                            this.props.currentUser.type === "admin" ?
                                <EditBtns
                                    editAttraction={this.editAttraction}
                                    delAttraction={this.delAttraction}
                                    editActive={editActive}
                                    onRight={onRight=false} />
                                :
                                "" }
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
                        
                    </div>
                <img className="atrImg"
                    src={this.props.attraction.img_url}
                    alt={this.props.attraction.name}/>
            </div>
        );
    }
}

export default AttractionNoEdit;
/*{
        
    let editActive = false ;
    let onRight=true;
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
                                /* Button edit & del  *
                                this.props.currentUser.type==="admin"?
                                <EditBtns
                                    editAttraction={this.editAttraction}
                                    delAttraction={this.delAttraction}
                                    editActive={editActive}
                                    onRight = {onRight}/>
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
                            /* Button edit *
                            this.props.currentUser.type === "admin" ?
                            <EditBtns
                                editAttraction={this.editAttraction}
                                delAttraction={this.delAttraction}
                                editActive={editActive}
                                onRight = {false}/>
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
}*/