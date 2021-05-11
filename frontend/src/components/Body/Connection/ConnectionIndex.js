import React, { Component } from 'react';
import GlobalVar from '../../GlobalVar';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import Register from './Register';
import Connection from './Connection';
import '../../../css/connect.css'

export default class ConnectionIndex extends Component {
    state = {
        registerMsg: "",
        connectionMsg: "",
    }

    /*-----------------------------------------------------------------------------------------------*/
    /*   .   .   .   .   .   .   .   .   .   .   .DB-USERS.   .   .   .   .   .   .   .   .   .   .  */
    /*-----------------------------------------------------------------------------------------------*/

    /** ConnectionIndex.js CHECK IN DATABASE IF USER EXIST
     * @param {String} pMail mail of user */
    doesUserExistDB = (pUser) => {
        GlobalVar.axios.get(`${GlobalVar.url}user/mail/${pUser.mail}`)
            .then(response => {
                response.data[0] ?
                    this.setState({ registerMsg: "Cet utilisateur existe déjà" })
                    :
                    this.saveNewUser(pUser);
            })
            .catch(error => {
                console.log("doesUserExistDB() - GET/user/mail/-ERROR", error);
            });
    }

    /** ConnectionIndex.js CREATE NEW USER IN DATA BASE
     * @param {Object} pUser  */
    saveNewUser = (pUser) => {
        GlobalVar.axios.post(`${GlobalVar.url}createUser`, pUser)
            .then((response) => {
                this.props.setCurrUser("user", response.data.insertId);
            })
            .catch(function (error) {
                console.log('saveNewUser() - POST/createUser-ERROR : ', error);
            });
        this.msgOnchange(true, "");
    }

    /** ConnectionIndex.js CHECK IN DATA BASE IF MAIL AND PASSWORD IS OK
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
                    console.log('checkConnectionDB - GET/user/mail/password ERROR validator : ', error.response.data.errorsValidator);
                }
                else {
                    console.log('checkConnectionDB - GET/user/mail/password ERROR Callback: ', error);
                    this.msgOnchange(false, "Mot de passe ou identifiant incorrect. \nSi vous n'êtes pas encore inscrit, enregistrez vous");
                }
            });
    }

    /*-----------------------------------------------------------------------------------------------*/
    /*   .   .   .   .   .   .   .   .   .   .   .STATE.   .   .   .   .   .   .   .   .   .   .   . */
    /*-----------------------------------------------------------------------------------------------*/

    /**  ConnectionIndex.js - UPDATE ERROR MESSAGE OR FORMS
     * @param {Boolean} pRegister if it's true, it's for register else it's for connection
     * @param {String} pMsg error message */
    msgOnchange = (pRegister, pMsg) => {
        if (pRegister) this.setState({ registerMsg: pMsg });
        else this.setState({ connectionMsg: pMsg });
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
