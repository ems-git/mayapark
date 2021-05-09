import React, { Component } from 'react'
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';

/** App.js => AccountIndex.js */
export default class AccountIndex extends Component {
    render() {
        let bodyContent = "ACCOUNT PAGE IN COMING";
        return (
            <div>
                <Header
                    currentUser={this.props.currentUser}
                    indexPath={"compteManagement"}
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
