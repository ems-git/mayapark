import React from 'react';
import Navbar from '../Navbar/Navbar';

function Header({ indexPath, currentUser,setCurrUser }) {

    let headerBg;

    if (indexPath === "home") headerBg = "homeHeader";
    else if (indexPath === "attraction") headerBg = "atrHeader";
    else if (indexPath === "connection") headerBg = "connexionHeader";
    else if (indexPath === "profil") headerBg = "profilHeader";
    else if (indexPath === "compteManagement") headerBg = "adminHeader";
    else headerBg = "notFoundHeader";

    return (
        <header className={`bgImg ${headerBg}`}>
            <Navbar
                currentUser={currentUser}
                setCurrUser={setCurrUser}/>
        </header>
    );
}

export default Header;