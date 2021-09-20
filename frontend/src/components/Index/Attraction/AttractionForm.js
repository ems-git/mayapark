import React, { Component } from 'react';

class AttractionFrom extends Component {

    state =
        {
            imgValue : 1,
            name: "",
            description: "",
            img_url: `/assets/img/attractionPage/atr1.jpg`,
        }

    onChange = (e) => {
        const { name, value } = e.target;
        this.setState({[name] : value });
    }

    submitAttraction = (e) => {
        e.preventDefault();
        
        if (!this.state.name || !this.state.description) {
            console.log("-------FEEDBACK - Vous devez remplir tout les champs");
            return;
        }
        this.props.addAttraction(this.state);
        this.setState( {name: "", description: "" });
    }

    /** AttractionForm.js CHOISE IMAGE FOR NEW ATTRACTION
     * @param {String} pType next or previous images */
    changeImage = (pType) => {
        let imageValue = this.state.imgValue;
        let newImg ;
        if(pType === "prev")
        {
            imageValue =  imageValue - 1;
            if (imageValue < 1) imageValue = 16;
        }
        else {
            imageValue =  imageValue + 1;
            if (imageValue > 16) imageValue = 1;
        }
        
        newImg = `/assets/img/attractionPage/atr${imageValue}.jpg`;
        this.setState({...this.state , imgValue : imageValue, img_url : newImg});
    }
    /*-----------------------------------------------------------------------------------------------*/
    /*   .   .   .   .   .   .   .   .   .   .   .RENDER.   .   .   .   .   .   .   .   .   .   .    */
    /*-----------------------------------------------------------------------------------------------*/
    render() {

        return (
            <section className="atrForm FlexCol itemC bgColorGrey">
                <h3>CREER UNE NOUVELLE ATTRACTION</h3>
                <div className="atrContainer">
                    <div className="editAtrImg atrImgContainer">
                        <img
                            className="atrImg"
                            src={this.state.img_url}
                            alt="illustration pour une nouvelle attraction">
                        </img>
                        <div className="carousselBtnContainer">
                            <button
                                className="carousselBtn"
                                onClick={()=>this.changeImage("prev")}>
                                {"<"}
                            </button>
                            <button
                                className="carousselBtn"
                                onClick={()=>this.changeImage("next")}>
                                {">"}
                            </button>
                        </div>
                    </div>


                    <form className="descArt FlexCol">
                        <input
                            name="name"
                            onChange={this.onChange}
                            value={this.state.name}
                            type="text"
                            placeholder="Titre de l'attraction"
                            autoFocus={true} />
                        <textarea
                            className="editArea"
                            name="description"
                            onChange={this.onChange}
                            value={this.state.description}
                            placeholder="Description de l'attraction"></textarea>
                        <button
                            id="createAtr"
                            className="submitBtn"
                            onClick={this.submitAttraction}
                            type="submit">
                            CREER ATTRACTION
                        </button>
                    </form>
                </div>
            </section>
        )
    }

}

export default AttractionFrom;