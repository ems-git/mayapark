//REACT import
import { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import moment from 'moment';

import '../../css/cssVar.css';
import '../../css/font.css';
import '../../css/anim.css';
import '../../css/app.css';
import '../../css/navbar.css';

import GlobalVar from "../GlobalVar";
import AttractionIndex from '../Body/Attraction/AttractionIndex';
import HomeIndex from '../Body/Home/HomeIndex';
import ConnectionIndex from '../Body/Connection/ConnectionIndex';
import ProfilIndex from '../Body/Profil/ProfilIndex';
import AccountIndex from '../Body/Account/AccountIndex';
import NotFoundIndex from '../Body/NotFound/NotFoundIndex';


class App extends Component {

    state =
        {
            // users: [],
            resrvations: [],
            currentUser: {
                id: null,
                type: null,
            },
            markId: 0,
        }

    /*componentDidMount()
    {
        console.log('App.js - componentDidMount() "recuperation user"');

        GlobalVar.axios.get(`${GlobalVar.url}userList`)
            .then(response => {

                let userData = response.data.map(element => {
                    if (element.birthday != null) {
                        let elemDate = element.birthday.slice(0, 10);
                        element.birthday = elemDate;
                    }
                    return element;
                });
                this.updateUsersFromData(userData);
            })
            .catch(error => {
                console.log('App.js - componentDidMount() GET-user ERROR : ', error);
            });
    }
    updateUsersFromData = (pDataResponse) => {
        console.log('App.js - updateUsersFromData()');

        this.setState({ users: pDataResponse });
    }*/

    /*-----------------------------------------------------------------------------------------------*/
    /*   .   .   .   .   .   .   .   .   .   .   .DB-USERS.   .   .   .   .   .   .   .   .   .   .  */
    /*-----------------------------------------------------------------------------------------------*/

    /** App.js CHECK IN DATABASE IF USER EXIST
     * @param {String} pMail mail of user */
    doesUserExistDB = (pMail) => {
        console.log('App.js - doesUserExist()');
    }

    /** App.js CREATE NEW USER IN DATA BASE
     * @param {Object} pUser  */
    createUserDB = (pUser) => {
        console.log('App.js - addUserDB()');
    }

    /** App.js CHECK IN DATA BASE IF MAIL AND PASSWORD IS OK
     *  @param {String} pMail email of user
     * @param {String} pPassword password of user */
    checkConnectionDB = (pMail, pPassword) => {
        GlobalVar.axios.get(`${GlobalVar.url}user/mail/${pMail}/password/${pPassword}`)
            .then(response => {

                let userType = response.data[0].type;
                let userId = response.data[0].id_user;
                this.setCurrUser(userType, userId);
            })
            .catch(error => {
                if (error.response && error.response.data && error.response.data.errorsValidator) {
                    console.log('App.js - checkConnectionDB GET-user ERROR validator : ', error.response.data.errorsValidator);
                    this.showErrorMsg(error.response.data.errorsValidator);
                }
                else {
                    console.log('App.js - checkConnectionDB GET-user ERROR Callback: ', error);
                    this.showErrorMsg("Mot de passe ou identifiant incorrect. \nSi vous n'êtes pas encore inscrit, enregistrez vouss :)");
                }
            });
    }

    /** App.js CHANGE VALUE OF LOG IN DATA BASE WHEN USER IS LOG OR NOT
     * @param {Number} pId id of current user
     * @param {Boolean} pLogin true if user is log, false if he si not login */
    logUser = (pId, pLogin) => {
        let isLog;
        //In data base, boolean is 0 or 1
        isLog=pLogin ? 1 : 0 ;

        GlobalVar.axios.put(`${GlobalVar.url}user/id/${pId}/isLog/${isLog}`)
            .then(response => {

                console.log('App.js - logUser(): user is log ', response);
            })
            .catch(error => {
                console.log('App.js - logUser() ERROR : Callback: ', error);
            });
    }

    /*-----------------------------------------------------------------------------------------------*/
    /*   .   .   .   .   .   .   .   .   .   .   .STATE.   .   .   .   .   .   .   .   .   .   .    .*/
    /*-----------------------------------------------------------------------------------------------*/

    /** App.js SET CURRENT USER TYPE AFTER CONNECTION/DECONNECTION
     * @param {String} pType user type : admin, user or null*/
    setCurrUser = (pType, pId) => {
        if (pId) {
            this.setState({ currentUser: { id: pId, type: pType } }, this.logUser(pId, true));
        }
        else {
            this.logUser(this.state.currentUser.id, false);
            this.setState({ currentUser: { id: pId, type: pType } });
        }

    }

    /*-----------------------------------------------------------------------------------------------*/
    /*   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   */
    /*-----------------------------------------------------------------------------------------------*/

    showErrorMsg = (pErrors) => {
        if (Array.isArray(pErrors)) {
            let msgError = "";
            pErrors.forEach(element => {
                msgError += `- ${element}\n`;
            });

           console.log("-------FEEDBACK -" , msgError);
        }
        else console.log("-------FEEDBACK -" , pErrors);
    }

    /*-----------------------------------------------------------------------------------------------*/
    /*   .   .   .   .   .   .   .   .   .   .   .RENDER.   .   .   .   .   .   .   .   .   .   .   .*/
    /*-----------------------------------------------------------------------------------------------*/
    render() {

        return (
            <div className="App">
                <Router>

                    <Switch>

                        <Route exact path="/attraction">
                            <AttractionIndex
                                clearMarkSearch={this.clearMarkSearch}
                                navMark={this.navMark}
                                clearMarkId={this.clearMarkId}
                                currentUser={this.state.currentUser}
                                setCurrUser={this.setCurrUser}
                            />
                        </Route>

                        <Route exact path="/connection">
                            {this.state.currentUser.type === null ?
                                <ConnectionIndex
                                    clearMarkSearch={this.clearMarkSearch}
                                    navMark={this.navMark}
                                    clearMarkId={this.clearMarkId}
                                    currentUser={this.state.currentUser}
                                    setCurrUser={this.setCurrUser}

                                    doesUserExistDB={this.doesUserExistDB}
                                    createUserDB={this.createUserDB}
                                    checkConnectionDB={this.checkConnectionDB}
                                />
                                :
                                <Redirect to="/" />
                            }
                        </Route>

                        <Route exact path="/profil">
                            {this.state.currentUser.type === "user" ?
                                <ProfilIndex
                                    clearMarkSearch={this.clearMarkSearch}
                                    navMark={this.navMark}
                                    clearMarkId={this.clearMarkId}
                                    currentUser={this.state.currentUser}
                                    setCurrUser={this.setCurrUser}
                                />
                                :
                                <Redirect to="/" />
                            }

                        </Route>


                        <Route exact path="/compteManagement">
                            {this.state.currentUser.type === "admin" ?
                                <AccountIndex
                                    clearMarkSearch={this.clearMarkSearch}
                                    navMark={this.navMark}
                                    clearMarkId={this.clearMarkId}
                                    currentUser={this.state.currentUser}
                                    setCurrUser={this.setCurrUser}
                                />
                                :
                                <Redirect to="/" />
                            }
                        </Route>

                        <Route exact path="/">
                            <HomeIndex
                                clearMarkSearch={this.clearMarkSearch}
                                navMark={this.navMark}
                                clearMarkId={this.clearMarkId}
                                currentUser={this.state.currentUser}
                                setCurrUser={this.setCurrUser}
                            />
                        </Route>

                        <NotFoundIndex
                            clearMarkSearch={this.clearMarkSearch}
                            navMark={this.navMark}
                            clearMarkId={this.clearMarkId}
                            currentUser={this.state.currentUser}
                            setCurrUser={this.setCurrUser}
                        />
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;