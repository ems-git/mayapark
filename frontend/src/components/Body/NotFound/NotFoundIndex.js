import React from 'react'
import '../../../css/404.css';
import Header from '../../Header/Header';

 function NotFoundIndex({ currentUser, setCurrUser})
 {
        return (
            <div id='notfound'>
                <Header
                    currentUser={currentUser}
                    indexPath={"notFound"}
                    setCurrUser={setCurrUser} />

                <main>
                    <h5>Oops...</h5><br />
                    <h6><strong>404</strong></h6><br /><br />
                    <p><i> La page que vous cherchez n'existe pas ou est en cours de création, merci de revenir à page d'accueil</i></p>
                </main>
            </div>
        )
}
export default NotFoundIndex;