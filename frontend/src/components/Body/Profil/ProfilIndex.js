import React, { Component } from 'react'

import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';

/** App.js => ProfilIndex.js */
export default class ProfilIndex extends Component {
    render() {
        let bodyContent = "PROFIL INDEX";
        return (
            <div>
                <Header
                    currentUser={this.props.currentUser}
                    indexPath={"profil"}
                    clearMarkSearch={this.props.clearMarkSearch}
                    navMark={this.props.navMark}
                    clearMarkId={this.props.clearMarkId}
                    setCurrUser={this.props.setCurrUser} />

                <main id="currentBody">
                    {bodyContent}
                </main>

                <Footer />
            </div>
        )
    }
}
