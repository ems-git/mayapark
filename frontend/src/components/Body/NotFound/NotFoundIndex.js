import React, { Component } from 'react'
import '../../../css/404.css';
import Header from '../../Header/Header';

/** App.js => NotFoundIndex.js */
export default class NotFoundIndex extends Component {
    render() {
        return (
            <div id='notfound'>
                <Header
                    currentUser={this.props.currentUser}
                    indexPath={"notFound"}
                    clearMarkSearch={this.props.clearMarkSearch}
                    navMark={this.props.navMark}
                    clearMarkId={this.props.clearMarkId}
                    setCurrUser={this.props.setCurrUser} />

                <main>
                    <h5>Oops...</h5><br />
                    <h6><strong>404</strong></h6><br /><br />
                    <p><i> La page que vous cherchez n'existe pas ou est en cours de création, merci de revenir à page d'accueil</i></p>
                </main>
            </div>
        )
    }
}
