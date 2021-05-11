import React, { Component } from 'react';
import GlobalVar from '../../GlobalVar';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import Register from './Register';
import Connection from './Connection';
import '../../../css/connect.css'

/** App.js => ConnectionIndex.js */
export default class ConnectionIndex extends Component
{
    state={
        registerMsg :"",
        connectionMsg :"",
    }

    /*-----------------------------------------------------------------------------------------------*/
    /*   .   .   .   .   .   .   .   .   .   .   .DB-USERS.   .   .   .   .   .   .   .   .   .   .  */
    /*-----------------------------------------------------------------------------------------------*/

    /** App.js CHECK IN DATABASE IF USER EXIST
     * @param {String} pMail mail of user */
     doesUserExistDB = (pUser) => {
        GlobalVar.axios.get(`${GlobalVar.url}user/mail/${pUser.mail}`)
        .then(response => {
            if(response.data[0]) this.setState({registerMsg : "Cet utilisateur existe déjà"});
            else this.saveNewUser(pUser);
        })
        .catch(error => {
            console.log("error", error);
        });
    }

    /** App.js CREATE NEW USER IN DATA BASE
     * @param {Object} pUser  */
     saveNewUser=(pUser)=>
     {
         GlobalVar.axios.post(`${GlobalVar.url}createUser` , pUser)
             .then((response) =>{
                
                let userType = "user";
                let userId = response.data.insertId;
                this.props.setCurrUser(userType, userId);
             })
             .catch(function (error)
             {
                 console.log('Register.js saveNewUser() POST-ERROR : ', error);
             });
        this.msgOnchange(true, "");
     }

     test=()=>
     {
        console.log("test ici");
     }
    /** App.js CHECK IN DATA BASE IF MAIL AND PASSWORD IS OK
     *  @param {String} pMail email of user
     * @param {String} pPassword password of user */
    checkConnectionDB = (pMail, pPassword) => {
        GlobalVar.axios.get(`${GlobalVar.url}user/mail/${pMail}/password/${pPassword}`)
            .then(response => {

                let userType = response.data[0].type;
                let userId = response.data[0].id_user;
                this.props.setCurrUser(userType, userId);
            })
            .catch(error => {
                if (error.response && error.response.data && error.response.data.errorsValidator) {
                    console.log('ConnectionIndex.js - checkConnectionDB GET-user ERROR validator : ', error.response.data.errorsValidator);
                }
                else {
                    console.log('ConnectionIndex.js - checkConnectionDB GET-user ERROR Callback: ', error);
                    this.msgOnchange(false,"Mot de passe ou identifiant incorrect. \nSi vous n'êtes pas encore inscrit, enregistrez vous");
                }
            });
    }

    /*-----------------------------------------------------------------------------------------------*/
    /*   .   .   .   .   .   .   .   .   .   .   .STATE.   .   .   .   .   .   .   .   .   .   .   . */
    /*-----------------------------------------------------------------------------------------------*/

    msgOnchange=(pRegister, pMsg)=>
    {
        if(pRegister) this.setState({registerMsg :pMsg});
        else this.setState({connectionMsg :pMsg});
    }

    /*-----------------------------------------------------------------------------------------------*/
    /*   .   .   .   .   .   .   .   .   .   .   .RENDER.   .   .   .   .   .   .   .   .   .   .   .*/
    /*-----------------------------------------------------------------------------------------------*/

    render() {
        return (
            <div>
                <Header
                    currentUser={this.props.currentUser}
                    indexPath={"connection"}
                    clearMarkSearch={this.props.clearMarkSearch}
                    navMark={this.props.navMark}
                    clearMarkId={this.props.clearMarkId}
                    setCurrUser={this.props.setCurrUser} />

                <main id="currentBody" className="connectContainer">
                    <Register
                        doesUserExistDB={this.doesUserExistDB}
                        msgOnchange={this.msgOnchange}
                        registerMsg={this.state.registerMsg}
                        />
                    <Connection
                        checkConnectionDB={this.checkConnectionDB}
                        msgOnchange={this.msgOnchange}
                        connectionMsg={this.state.connectionMsg}
                        />
                </main>
                <Footer />
            </div>
        )
    }
}
