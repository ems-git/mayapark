import { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

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

    state = {
            resrvations: [],
            currentUser: {
                id: null,
                type: null,
            },
            markId: 0,
        }
        
    componentDidMount()
    {
        this.setCurrentUser();
    }

    /** App.js - SET CURRENT USER TYPA AND ID */
    setCurrentUser=()=>
    {
        let currentUserLS = this.localStorageManagement("get", "currentUser");
        if (currentUserLS) this.setState({ currentUser: { id: currentUserLS.id, type: currentUserLS.type }});
    }
    
    /*-----------------------------------------------------------------------------------------------*/
    /*   .   .   .   .   .   .   .   .   .   .   .DB-USERS.   .   .   .   .   .   .   .   .   .   .  */
    /*-----------------------------------------------------------------------------------------------*/

    /** App.js CHANGE VALUE OF LOG IN DATA BASE WHEN USER IS LOG OR NOT
     * @param {Number} pId id of current user
     * @param {Boolean} pLogin true if user is log, false if he si not login */
    logUser = (pId, pLogin) => {
        let isLog;
        isLog=pLogin ? 1 : 0 ; //In data base, boolean is 0 or 1

        GlobalVar.axios.put(`${GlobalVar.url}user/id/${pId}/isLog/${isLog}`)
            .then(response => {

                console.log('--    REPONSE   -- Put user login/out : ', response.data[0]);
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
            this.setState({ currentUser: { id: pId, type: pType }},
                ()=>{
                    this.logUser(pId, true);
                    this.localStorageManagement("save", 'currentUser');
                });
            
        }
        else {
            this.logUser(this.state.currentUser.id, false);
            this.setState({ currentUser: { id: pId, type: pType }},
                ()=>this.localStorageManagement("clear", 'currentUser'));
        }

    }

    /*-----------------------------------------------------------------------------------------------*/
    /*   .   .   .   .   .   .   .   .   .   .LOCAL STORAGE.   .   .   .   .   .   .   .   .   .   . */
    /*-----------------------------------------------------------------------------------------------*/

    localStorageManagement=(pState, pData)=>
    {
        if (pState==="save") localStorage.setItem(pData, JSON.stringify(this.state.currentUser));
        else if(pState==="get") return JSON.parse(localStorage.getItem(pData));
        else if (pState==="clear") localStorage.removeItem(pData);
        else if(pState==="clearAll") localStorage.clear();
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

                        <Route exact path="/profil">
                            {this.state.currentUser.type === "user" ?
                                <ProfilIndex
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
                                    currentUser={this.state.currentUser}
                                    setCurrUser={this.setCurrUser}
                                />
                                :
                                <Redirect to="/" />
                            }
                        </Route>

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