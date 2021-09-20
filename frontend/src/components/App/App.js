import { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import '../../css/font.css';
import '../../css/anim.css';
import '../../css/app.css';
import '../../css/navbar.css';

import GlobalVar from "../GlobalVar";
import AttractionIndex from '../Index/Attraction/AttractionIndex';
import HomeIndex from '../Index/Home/HomeIndex';
import ConnectionIndex from '../Index/Connection/ConnectionIndex';
import ProfilIndex from '../Index/Profil/ProfilIndex';
import AccountIndex from '../Index/Account/AccountIndex';
import NotFoundIndex from '../Index/NotFound/NotFoundIndex';

class App extends Component {

    state = {
        resrvations: [],
        currentUser: {
            id: null,
            type: null,
        },
    }

    componentDidMount() {
        this.setCurrentUser();
    }

    /** App.js - SET CURRENT USER TYPA AND ID */
    setCurrentUser = () => {
        let currentUserLS = this.localStorageManagement("get", "currentUser");
        if (currentUserLS) this.setState({ currentUser: { id: currentUserLS.id, type: currentUserLS.type } });
    }

    /*-----------------------------------------------------------------------------------------------*/
    /*   .   .   .   .   .   .   .   .   .   .   .DB-USERS.   .   .   .   .   .   .   .   .   .   .  */
    /*-----------------------------------------------------------------------------------------------*/

    /** App.js CHANGE VALUE OF LOG IN DATA BASE WHEN USER IS LOG OR NOT
     * @param {Number} pId id of current user
     * @param {Boolean} pLogin true if user is log, false if he si not login */
    logUserDB = (pId, pLogin) => {
        let isLog;
        isLog = pLogin ? 1 : 0; //In data base, boolean is 0 or 1

        GlobalVar.axios.put(`${GlobalVar.url}user/id/${pId}/isLog/${isLog}`)
            .then(response => {
                console.log('--    REPONSE   -- Put user login/out : ', response);
            })
            .catch(error => {
                console.log('--!!  E.R.R.O.R  !!-- Put user login/out :\n', error);
            });
    }

    /*-----------------------------------------------------------------------------------------------*/
    /*   .   .   .   .   .   .   .   .   .   .   .STATE.   .   .   .   .   .   .   .   .   .   .    .*/
    /*-----------------------------------------------------------------------------------------------*/

    /** App.js SET CURRENT USER TYPE AFTER CONNECTION/DECONNECTION
     * @param {String} pType user type : admin, user or null*/
    setCurrUser = (pType, pId) => {
        if (pId) {
            this.setState({ currentUser: { id: pId, type: pType } },
                () => {
                    this.logUserDB(pId, true);
                    this.localStorageManagement("save", 'currentUser');
                });
        }
        else {
            this.logUserDB(this.state.currentUser.id, false);
            this.setState({ currentUser: { id: pId, type: pType } },
                () => this.localStorageManagement("clear", 'currentUser'));
        }
    }

    /*-----------------------------------------------------------------------------------------------*/
    /*   .   .   .   .   .   .   .   .   .   .LOCAL STORAGE.   .   .   .   .   .   .   .   .   .   . */
    /*-----------------------------------------------------------------------------------------------*/

    /** App.js UPDATE LOCAL STORAGE
     * @param {String} pState type of update
     * @param {String} pData type of data ex: current user
     * @returns  */
    localStorageManagement = (pState, pData) => {
        if (pState === "save") localStorage.setItem(pData, JSON.stringify(this.state.currentUser));
        else if (pState === "get") return JSON.parse(localStorage.getItem(pData));
        else if (pState === "clear") localStorage.removeItem(pData);
        else if (pState === "clearAll") localStorage.clear();
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
                                currentUser={this.state.currentUser}
                                setCurrUser={this.setCurrUser}
                            />
                        </Route>

                        <Route exact path="/connection">
                            {this.state.currentUser.type === null ?
                                <ConnectionIndex
                                    currentUser={this.state.currentUser}
                                    setCurrUser={this.setCurrUser}
                                />
                                :
                                <Redirect to="/" />
                            }
                        </Route>

                        {this.state.currentUser.type === "user" ?
                            <Route exact path="/profil">
                                <ProfilIndex
                                    currentUser={this.state.currentUser}
                                    setCurrUser={this.setCurrUser}
                                />
                            </Route>
                            :
                            null
                        }

                        {this.state.currentUser.type === "admin" ?
                            <Route exact path="/compteManagement">
                                <AccountIndex
                                    currentUser={this.state.currentUser}
                                    setCurrUser={this.setCurrUser}
                                />
                            </Route>
                            :
                            null
                        }

                        <Route exact path="/">
                            <HomeIndex
                                currentUser={this.state.currentUser}
                                setCurrUser={this.setCurrUser}
                            />
                        </Route>

                        <NotFoundIndex
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
