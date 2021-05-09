import React, { Component } from 'react';
import GlobalVar from '../../GlobalVar';

/** App.js => ConnectionIndex.js => Register.js */
export default class Register extends Component {
    state =
    {
        mail: "",
        password: "",
        birthday:"",
        firstName : "",
        name : "",
        
        confPassword: "",
    }

    inputText = (e) => 
    {
        const {name, value} = e.target; 
        this.setState({[name]: value}); 
    }
    
    createUser = (e) => 
    {
        e.preventDefault();
        const inputAreField = (input) => input!=="";
        if(Object.values(this.state).every(inputAreField)) 
        {
            if(this.state.password===this.state.confPassword)
            {
                //check age
                //check s'il n'y en a pas un de deja existant
                this.saveNewUser();
            }
            else
            {
                console.log("-------FEEDBACK - Mot de passe différent ");
            }
        }
        else
        {
            console.log("-------FEEDBACK - Tu dois remplir tout les champs");
        }
    }

    saveNewUser=()=>
    {
        GlobalVar.axios.post(`${GlobalVar.url}createUser` , this.state)
            .then(function (response) {
                console.log("Register.js saveNewUser() POST-RESPONSE ", response);
                this.cleanState();
            })
            .catch(function (error)
            {
                console.log('Register.js saveNewUser() POST-ERROR : ', error);
            });
    }

    cleanState=()=>
    {
        this.setState({ mail: "", password: "", birthday:"", firstName : "", name : "", confPassword: "",});
    }
    /** Register.js - RENDER REGISTER FORM
     * @returns  {Array} array of div with input and label in*/
    renderForm =()=>
    {
        let informations = ["name", "firstName","birthday","mail","password","confPassword"];
        let labels = ["Prenom", "Nom","Date de naissance","Adress e-mail","Mot de pass","Confirmation mot de passe"];
        let placeholders = ["prénom", "nom de famille","dadte de naissance","e-mail","mot de passe","de nouveau votre mot de pass"];

        let formContent =[];
        for(let i=0;  i<informations.length; i++)
        {
            let inputType;
            informations[i] === "birthday" ? inputType = "date" : inputType = "text";
            formContent.push(
                <div key={i} className="FlexCol itemC">
                    <label htmlFor="mail">{labels[i]}</label>
                    <input
                        name={informations[i]}
                        onChange={this.inputText}
                        value={this.state[informations[i]]}
                        type={inputType}
                        placeholder={`Saisisser votre adresse mail ${placeholders[i]}`}/>
                </div>
            )
        }

        return formContent;
    }
    
    /*-----------------------------------------------------------------------------------------------*/
    /*   .   .   .   .   .   .   .   .   .   .   .RENDER.   .   .   .   .   .   .   .   .   .   .    */
    /*-----------------------------------------------------------------------------------------------*/
    render()
    {
        return (
            <section className="connectionSection">
                <h1>INSCRIPTION</h1>
                <form className="FlexCol itemC">
                    {this.renderForm()}
                    <button
                        className="submitBtn"
                        type="submit"
                        onClick={this.createUser}>CREER COMTPE</button>
                </form>
            </section>
        )
    }
}
