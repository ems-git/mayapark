import React, { Component } from 'react';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import Register from './Register';
import Connection from './Connection';
import '../../../css/connect.css'

/** App.js => ConnectionIndex.js */
export default class ConnectionIndex extends Component {
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
                        doesUserExistDB={this.props.doesUserExistDB}
                        createUserDB={this.props.createUserDB}/>
                    <Connection
                        checkConnectionDB={this.props.checkConnectionDB}/>
                </main>
                <Footer />
            </div>
        )
    }
}
