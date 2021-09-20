import React, { Component } from 'react';
import Navbar from '../../Navbar/Navbar';
import ParkInformation from '../../Navbar/ParkInformation';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import '../../../css/account.css';

export default class AccountIndex extends Component {
    render() { 
        let bodyContent = <h1>PAGE EN COURS DE CONSTRUCTION</h1>;
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

                <main id="mainAccount" className="currentBody">
                    {bodyContent}
                </main>

                <Footer />
            </div>
        )
    }
}
