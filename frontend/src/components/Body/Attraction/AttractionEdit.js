import React, { Component } from 'react';
import EditBtns from './EditBtns';

class AttractionEdit extends Component {
    state = {
        titleValue : this.props.attraction.name,
        descValue : this.props.attraction.description,
    }

    inputOnChange=(e)=>
    {
        const {name, value} = e.target;
        this.setState({[name] : value});
    }
    
    editAttraction=()=>
    {
        this.props.editAttraction(this.state.titleValue,this.state.descValue);
    }
    delAttraction=()=>
    {
        this.props.delAttraction(this.props.indexAtr);
    }

    /*-----------------------------------------------------------------------------------------------*/
    /*   .   .   .   .   .   .   .   .   .   .   .RENDER.   .   .   .   .   .   .   .   .   .   .    */
    /*-----------------------------------------------------------------------------------------------*/
    
    render() {
        let editActive = true;
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
                                ""}
                        <article className="atrContent">
                            <div className="artTxt">
                            <input
                                    name ="titleValue"
                                    className="atrTitleInput"
                                    value={this.state.titleValue}
                                    onChange={this.inputOnChange}/>
                                <textarea
                                    name ="descValue"
                                    className="atrDescInput"
                                    value={this.state.descValue}
                                    onChange={this.inputOnChange}/>
                            </div>
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
                            <input
                                name ="titleValue"
                                className="atrTitleInput"
                                value={this.state.titleValue}
                                onChange={this.inputOnChange}/>
                            <textarea
                                name ="descValue"
                                className="atrDescInput"
                                value={this.state.descValue}
                                onChange={this.inputOnChange}/>
                            </div>
                        </article>
                        
                    </div>
                <img className="atrImg"
                    src={this.props.attraction.img_url}
                    alt={this.props.attraction.name}/>
            </div>
        )
    }
}
export default AttractionEdit;

/*return (
        this.props.indexAtr % 2 === 0 ?
                <div className="atrContainer bgColorWhite">
                    <img className="atrImg"
                        src={this.props.attraction.img_url}
                        alt={this.props.attraction.name} />
                    <div className="descArt flexStart">
                        <div className="descArtTxtBox">
                            <article className="descArtTxt">

                                <EditBtns
                                        editAttraction={this.editAttraction}
                                        delAttraction={this.delAttraction}
                                        editActive={editActive}
                                        onRight = {onRight}/>

                                <input
                                    name ="titleValue"
                                    className="atrTitleInput inputRight"
                                    value={this.state.titleValue}
                                    onChange={this.inputOnChange}/>
                                <textarea
                                    name ="descValue"
                                    className="atrDescInput inputRight"
                                    value={this.state.descValue}
                                    onChange={this.inputOnChange}/>
                            </article>
                        </div>
                    </div>
                    
                </div>

       :
            <div className="atrContainer bgColorGrey">
                <div className="descArt flexEnd">
                    <div className="descArtTxtBox">
                        <article className="descArtTxt">

                            <EditBtns
                                editAttraction={this.editAttraction}
                                delAttraction={this.delAttraction}
                                editActive={editActive}
                                onRight = {false}/>

                            <input
                                name ="titleValue"
                                className="atrTitleInput inputLeft"
                                value={this.state.titleValue}
                                onChange={this.inputOnChange}/>
                            <textarea
                                name ="descValue"
                                className="atrDescInput inputLeft"
                                value={this.state.descValue}
                                onChange={this.inputOnChange}/>
                        </article>
                    </div>
                </div>
                <img className="atrImg"
                    src={this.props.attraction.img_url}
                    alt={this.props.attraction.name}/>
            </div>
        )
    }*/