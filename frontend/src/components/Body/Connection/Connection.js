import React, { Component } from 'react'

/** App.js => ConnectionIndex.js => Connection.js */
export default class Connection extends Component {
    state =
    {
        mail: "",
        password: "",
    }

    inputText = (e) => 
    {
        const {name, value} = e.target; 
        this.setState({[name]: value}); 
    }
    
    connection = (e) => 
    {
        e.preventDefault();
        if(this.state.mail!=="" && this.state.password!=="")
        {
            this.props.checkConnectionDB(this.state.mail, this.state.password);
            //this.setState({ mail: "", password: ""});
        }
        else
        {
            this.props.msgOnchange(false, "Merci de remplir tout les champs");
        }
    }
    
    /*-----------------------------------------------------------------------------------------------*/
    /*   .   .   .   .   .   .   .   .   .   .   .RENDER.   .   .   .   .   .   .   .   .   .   .    */
    /*-----------------------------------------------------------------------------------------------*/
    render() {
        return (
            <section className="connectionSection">
                 <h1>CONNECTION</h1>
                 <form className="FlexCol itemC vertCenter">
                    <label htmlFor="mail">Adresse e-mail</label>
                    <input
                        name="mail"
                        onChange={this.inputText}
                        value={this.state.mail}
                        type="text"
                        placeholder='Saisisser votre adresse mail' />
                    <label htmlFor="password">Mot de passe</label>
                    <input
                        name="password"
                        onChange={this.inputText}
                        value={this.state.password}
                        type="text"
                        placeholder='Saisisser votre adresse mail' />
                    <p className="formMsg">{this.props.connectionMsg}</p>
                        <button
                            className="submitBtn"
                            type="submit"
                            onClick={this.connection}>CONNECTION</button>
                 </form>
            </section>
        )
    }
}
