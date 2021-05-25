import React, { Component } from 'react';
import Navbar from '../../Navbar/Navbar';
import ParkInformation from '../../Navbar/ParkInformation';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';

export default class AccountIndex extends Component {
    render() {
        let bodyContent = "ACCOUNT PAGE IN COMING";
        return (
            <div>
                <ParkInformation />
                <Navbar
                    currentUser={this.props.currentUser}
                    setCurrUser={this.props.setCurrUser} />
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
