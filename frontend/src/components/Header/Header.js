import React from 'react';
import '../../css/header.css';

function Header({ indexPath}) {

    let headerBg;

    if (indexPath === "home") headerBg = "homeHeader";
    else if (indexPath === "attraction") headerBg = "atrHeader";
    else if (indexPath === "connection") headerBg = "connexionHeader";
    else if (indexPath === "profil") headerBg = "profilHeader";
    else if (indexPath === "compteManagement") headerBg = "adminHeader";
    else headerBg = "notFoundHeader";

    return (
        <header className={`bgImg ${headerBg}`}></header>
    );
}

export default Header;