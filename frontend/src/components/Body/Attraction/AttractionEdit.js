import React, { Component } from 'react'

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
    
    onclick=()=>
    {
        this.props.editAtrIsClicked(this.state.titleValue,this.state.descValue);
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
                                <button
                                    className="adminBtn editActive bgImgFit editR"
                                    onClick={this.onclick}>
                                </button>
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
                            <button
                                className="adminBtn editActive bgImgFit editL"
                                onClick={this.onclick}>
                            </button>
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
    }
}
export default AttractionEdit;