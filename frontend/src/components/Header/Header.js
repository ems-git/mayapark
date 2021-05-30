import React from 'react';
import '../../css/header.css';
// import GlobalVar from '../GlobalVar';

function Header({ indexPath}) {

    let headerBg;

    if (indexPath === "home") headerBg = "homeHeader homeHeader";
    // else if (GlobalVar.widthDevice < GlobalVar.phoneWidth) headerBg = "none";
    else if (indexPath === "attraction") headerBg = "atrHeader atrHeader";
    else if (indexPath === "connection") headerBg = "connexionHeader connectHeader";
    else if (indexPath === "profil") headerBg = "profilHeader profilHeader";
    else if (indexPath === "compteManagement") headerBg = "adminHeader accountHeader";
    else headerBg = "notFoundHeader errorHeader";

    return (
        <header className={`bgImg ${headerBg}`}></header>
    );
}

export default Header;