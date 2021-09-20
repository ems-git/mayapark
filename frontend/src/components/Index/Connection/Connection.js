import React, { Component } from 'react'


export default class Connection extends Component {
    state = {
            mail: "",
            password: "",
        }

    inputText = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    connection = (e) => {
        e.preventDefault();
        if (this.state.mail !== "" && this.state.password !== "") {
            this.props.checkConnectionDB(this.state.mail, this.state.password);
        }
        else  this.props.msgOnchange(false, "Merci de remplir tout les champs");
    }

    /*-----------------------------------------------------------------------------------------------*/
    /*   .   .   .   .   .   .   .   .   .   .   .RENDER.   .   .   .   .   .   .   .   .   .   .    */
    /*-----------------------------------------------------------------------------------------------*/

    render() {
        return (
            <section className="connectionSection">
                <h1>CONNEXION</h1>
                <form className="FlexCol itemC vertCenter">
                    
                    <p className="formMsg">{this.props.connectionMsg}</p>
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
                        type="password"
                        placeholder='Saisisser votre mot de passe' />

                    <a href="#middle" onClick={this.props.changeTab}>Vous n'êtes pas encore inscrit ? S'inscrire</a>

                    <button
                        className="submitBtn"
                        type="submit"
                        onClick={this.connection}>CONNEXION</button>
                </form>
            </section>
        )
    }
}
