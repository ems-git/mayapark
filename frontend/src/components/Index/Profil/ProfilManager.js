import React, { Component } from 'react';
import GlobalVar from '../../GlobalVar';
import InputsProfil from './InputsProfil';

export default class ProfilManager extends Component {

    state =
        {
            feedbackMsg: "",
            informations: {},
            /*
            name : "",
            firstName : "",
            mail : "",
            password : "",
            newPassword: "",
            confPassword: "",
            */
        }

    componentDidMount() {
        this.getuserInformationDB();
    }

    /*-----------------------------------------------------------------------------------------------*/
    /*   .   .   .   .   .   .   .   .   .   .   .DATA-BASE.   .   .   .   .   .   .   .   .   .   . */
    /*-----------------------------------------------------------------------------------------------*/

    /** GET RESERVATIONS ON DATA BASE*/
    getuserInformationDB = () => {
        GlobalVar.axios.get(`${GlobalVar.url}informations/user/${this.props.currentUser.id}`)
            .then(response => {
                console.log('--    REPONSE   -- Get information user : ', response.data[0]);
                let informations = response.data[0];
                this.setState({
                    feedbackMsg: "",
                    informations: {
                        name: informations.name,
                        firstName: informations.firstName,
                        mail: informations.mail,
                        password: informations.password,
                        newPassword: "", confPassword: ""
                    }
                });
            })
            .catch(error => {
                console.log('--!!  E.R.R.O.R  !!-- Get information user :\n', error);
            });
    }

    /** Attraction.js UPDATE USER INFORMATION in DATA BASE  */
    updateUserInfoDB = () => {
        GlobalVar.axios.put(`${GlobalVar.url}user/${this.props.currentUser.id}`, { name: this.state.informations.name, firstName: this.state.informations.firstName, password: this.state.informations.password, mail: this.state.informations.mail })
            .then((response) => {
                console.log('--    REPONSE   -- Updtate user information  :\n', response.data);
                this.clearState("");
            })
            .catch(function (error) {
                console.log('--!!  E.R.R.O.R  !!-- Updtate user information:\n', error);
            });
    }

    /*-----------------------------------------------------------------------------------------------*/
    /*   .   .   .   .   .   .   .   .   .   .   .METHODE.   .   .   .   .   .   .   .   .   .   .   */
    /*-----------------------------------------------------------------------------------------------*/

    /** AttractionIndex.js UPDATE USER INFORMATION STATE
     * @param pInput state of the input with name and value of input
     */
    changeInputValue = (pName, pValue) => {
        this.setState({ informations: { ...this.state.informations, [pName]: pValue } });
    }

    /** ProfilManager.js CREATION OF INPUTS
    * @param {Srting} pProperties name html of the input 
    * @param {String} pValues value html of the input
    * @param {String} pLabels label html of the input
    * @returns */
    inputsBoard = (pProperties, pValues, pLabels) => {
        let inputs = [];
        let inputType;
        pProperties.forEach((property, index, array) => {
            (property === "password" || property === "newPassword" || property === "confPassword") ? inputType = "password" : inputType = "text";
            inputs.push(
                <InputsProfil
                    key={`profilInput${index}`}
                    name={property}
                    labelName={pLabels[index]}
                    type={inputType}
                    value={pValues[index]}
                    changeInputValue={this.changeInputValue}
                />)
        });
        return inputs;
    }

    /** ProfilManager.js CREATION OF INPUTS
     * @returns array board */
    inputsValues = () => {
        let labels = ["Prénom:", "Nom:", 'Adresse e-mail:', 'Nouveau mot de passe:', 'Confirmation mot de passe:'];
        let properties = [];
        let values = [];

        for (const [key, value] of Object.entries(this.state.informations)) {
            if (key !== "password") {
                properties.push(key);
                values.push(value);
            }
        }
        return this.inputsBoard(properties, values, labels);
    }

    /**  ProfilManager.js CHECK IF THERE IS A NEW PASSWORD AND SAVED IN DATABASE & STATE
     * @param {*} e event */
    registerProfil = (e) => {
        e.preventDefault();
        if (this.state.informations.newPassword !== "" || this.state.informations.confPassword !== "") {
            if (this.state.informations.newPassword === this.state.informations.confPassword) {
                this.setState({ informations: { ...this.state.informations, password: this.state.informations.newPassword } }, () => this.updateUserInfoDB());
            }
            else if (this.state.informations.newPassword !== this.state.informations.confPassword) {
                this.clearState("Mot de passe différent");
            }
        }
        else {
            this.updateUserInfoDB();
        }
    }

    /** ProfilManager.js CLEAR STATE WITH CUSTOME MESSAGE
     * @param {*} pMessage feedback message */
    clearState = (pMessage) => {
        this.setState({
            feedbackMsg: pMessage,
            informations: {
                ...this.state.informations,
                newPassword: "",
                confPassword: "",
            }
        });
    }

    render() {
        return (
            <div className="profilRside">
                <form id="profilForm">
                    {this.inputsValues()}
                    <p className="formMsg">{this.state.feedbackMsg}</p>
                    <button
                        className="submitBtn"
                        onClick={(e) => this.registerProfil(e)}
                    > ENREGISTRER </button>
                </form>
            </div>
        )
    }
}
