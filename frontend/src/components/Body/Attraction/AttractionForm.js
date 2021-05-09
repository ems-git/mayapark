import React, { Component } from 'react';

/** App.js => AttractionIndex.js => AttractionFrom.js*/
class AttractionFrom extends Component {

    state =
    {
        // id: 0,
        name: "",
        description: ``,
        img_url: "",
    }

    onChange = (e) =>
    {
        const {name, value} = e.target;
        this.setState({ [name] : value});
    }

    submitAttraction = (e) =>
    {
        e.preventDefault();
        if(!this.state.name || !this.state.description )
        {
           console.log("-------FEEDBACK - Vous devez remplir tout les champs");
            return;
        }
        this.setState({id :this.props.attractions[this.props.attractions.length-1].id +1},
            ()=>{this.props.addAttraction(this.state); this.setState({name:"", description : ""})});
        
    }    
    
    /*-----------------------------------------------------------------------------------------------*/
    /*   .   .   .   .   .   .   .   .   .   .   .RENDER.   .   .   .   .   .   .   .   .   .   .    */
    /*-----------------------------------------------------------------------------------------------*/
    render() {

        return (
            <section className="atrForm FlexCol itemC bgColorGrey">
                <h3>CREER UNE NOUVELLE ATTRACTION</h3>
                <div className="atrContainer">
                    <div className="editAtrImg"></div>
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
                    </form>
                </div>
                <button
                    id="createAtr"
                    className="submitBtn"
                    onClick={this.submitAttraction}
                    type="submit">
                    CREER ATTRACTION
                </button>
            </section>
        )
    }

}

export default AttractionFrom;