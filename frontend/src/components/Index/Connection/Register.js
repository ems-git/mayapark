import React, { Component } from 'react';
import GlobalVar from '../../GlobalVar';
import InputRegister from './InputRegister';

export default class Register extends Component {
    state =
        {
            name: "",
            firstName: "",
            birthday: "",
            mail: "",
            password: "",
            confPassword: "",
        }

    /*-----------------------------------------------------------------------------------------------*/
    /*   .   .   .   .   .   .   .   .   .   .   .STATE.   .   .   .   .   .   .   .   .   .   .    .*/
    /*-----------------------------------------------------------------------------------------------*/

    inputText = (pName, pValue) => {
        this.setState({ [pName]: pValue }, () => this.props.msgOnchange(true, ""));
    }

    /** Register.js - CLEAN STATE WHEN USER IS CREATE AND LOG */
    cleanState = () => {
        this.setState({ mail: "", password: "", birthday: "", firstName: "", name: "", confPassword: "", });
    }

    /*-----------------------------------------------------------------------------------------------*/
    /*   .   .   .   .   .   .   .   .   .   .   .METHODE.   .   .   .   .   .   .   .   .   .   .   */
    /*-----------------------------------------------------------------------------------------------*/

    /** Register.js - CHECK IF PASSWORD AND CONFIRM PASSWOR ARE SAME */
    passwordComparison = () => {
        return (this.state.password === this.state.confPassword) ? "" : "Différent du mot de passe";
    }

    /** Register.js - CREATE USER */
    createUser = (e) => {
        e.preventDefault();
        const pField = (input) => input.innerHTML === "";

        let inputsMsg = document.querySelector("#register").querySelectorAll(".inputErroMsg"); // ! ! ! ! ! ! !Search alternative
        let errors = Array.from(inputsMsg);

        const inputAreField = (input) => input !== "";
        if (Object.values(this.state).every(inputAreField) && errors.every(pField)) {
            this.props.doesUserExistDB(this.state);
            /* this.setState({ name : "", firstName : "", birthday:"", mail: "", password: "", confPassword: "", })*/
        }
        else this.props.msgOnchange(true, "Tout les champs ne sont pas remplis correctement remplis");
    }

    /** Register.js - RENDER REGISTER FORM
     * @returns  {Array} array of div with input and label in*/
    renderForm = () => {
        let informations = ["name", "firstName", "birthday", "mail", "password", "confPassword"];
        let labels = ["Prenom", "Nom", "Date de naissance", "Adress e-mail", "Mot de pass", "Confirmation mot de passe"];
        let placeholders = ["prénom", "nom de famille", "date de naissance", "e-mail", "mot de passe", "mot de passe de nouveau"];
        let errorMsgs = ["Le prénom doit être composé uniquement de lettre", "Le nom de famille doit être composé uniquement de lettre", "Date non conforme", "Format de l'email non conforme", "Doit contenir entre 4 & 8 caractères \n (lettres, chiffres)", ""];
        let regexs = [GlobalVar.regName, GlobalVar.regName, GlobalVar.regDate, GlobalVar.regEmail, GlobalVar.regMdp, GlobalVar.regMdp];

        let formInputs = [];

        for (let i = 0; i < informations.length; i++) {
            let inputType;

            informations[i] === "birthday" ? inputType = "date" : inputType = "text";
            formInputs.push(
                <InputRegister
                    key={i}
                    id={i}
                    label={labels[i]}
                    information={informations[i]}
                    inputValue={Object.values(this.state)[i]}
                    inputType={inputType}
                    placeholder={placeholders[i]}
                    errorMsg={errorMsgs[i]}
                    inputText={this.inputText}
                    regex={regexs[i]}
                    passwordComparison={this.passwordComparison}
                />);
        }
        return formInputs;
    }

    /*-----------------------------------------------------------------------------------------------*/
    /*   .   .   .   .   .   .   .   .   .   .   .RENDER.   .   .   .   .   .   .   .   .   .   .    */
    /*-----------------------------------------------------------------------------------------------*/

    render() {
        return (
            <section className="connectionSection" id="register">
                <h1>INSCRIPTION</h1>
                <form className="FlexCol itemC">
                    {this.renderForm()}
                    <p className="formMsg">{this.props.registerMsg}</p>

                    <a href="#middle" onClick={this.props.changeTab}>Déja inscrit ? Se connecter</a>
                    <button
                        className="submitBtn"
                        type="submit"
                        onClick={this.createUser}>CREER COMTPE</button>
                </form>
            </section>
        )
    }
}
