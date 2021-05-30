import React, { Component } from 'react';
import EditBtns from './EditBtns';
import GlobalVar from '../../GlobalVar';

class AttractionEdit extends Component {
    state = {
        titleValue: this.props.attraction.name,
        descValue: this.props.attraction.description,
    }

    inputOnChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    editAttraction = () => {
        console.log("test");
        this.props.editAttraction(this.state.titleValue, this.state.descValue);
    }
    delAttraction = () => {
        this.props.delAttraction(this.props.indexAtr);
    }

    /*-----------------------------------------------------------------------------------------------*/
    /*   .   .   .   .   .   .   .   .   .   .   .RENDER.   .   .   .   .   .   .   .   .   .   .    */
    /*-----------------------------------------------------------------------------------------------*/

    render() {
        let editActive = true;
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
                                    <input
                                        name="titleValue"
                                        className="atrTitleInput"
                                        value={this.state.titleValue}
                                        onChange={this.inputOnChange} />
                                    <textarea
                                        name="descValue"
                                        className="atrDescInput"
                                        value={this.state.descValue}
                                        onChange={this.inputOnChange} />
                                </div>
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
                                    <input
                                        name="titleValue"
                                        className="atrTitleInput"
                                        value={this.state.titleValue}
                                        onChange={this.inputOnChange} />
                                    <textarea
                                        name="descValue"
                                        className="atrDescInput"
                                        value={this.state.descValue}
                                        onChange={this.inputOnChange} />
                                </div>
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
                    </div>
                    <div className="artBox artBoxL">
                       
                        <article className="atrContent">
                            <div className="artTxt">
                                <input
                                    name="titleValue"
                                    className="atrTitleInput"
                                    value={this.state.titleValue}
                                    onChange={this.inputOnChange} />
                                <textarea
                                    name="descValue"
                                    className="atrDescInput"
                                    value={this.state.descValue}
                                    onChange={this.inputOnChange} />
                            </div>
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
export default AttractionEdit;
