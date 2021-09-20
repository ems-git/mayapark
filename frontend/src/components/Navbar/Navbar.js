import React, { Component } from 'react';
import { Link  } from "react-router-dom";

class Navbar extends Component {
    
    render()
    {
        return (
        <nav className="navbarContainer">
            <input type="checkbox" id="nav-burg" />
            <Link
                to="/"
                className="nav-home inactive" >MAYAPARK
            </Link>
            <div className="nav-bouton">
                <label htmlFor="nav-burg">
                    <span></span>
                    <span></span>
                    <span></span>
                </label>
            </div>
            <ul className="nav-links">
                {this.props.currentUser.type ==="admin" ? 
                    <li>
                        <Link
                            to="/compteManagement"
                            className="inactive">GESTION
                        </Link>
                    </li>
                :
                null}
                
                <li>
                    <Link
                        to="/attraction"
                        className="inactive">ATTRACTIONS
                    </Link>
                </li>
                
                {this.props.currentUser.type === "user" ? 
                    <li>
                    <Link
                        to="/profil"
                        className="inactive">PROFIL
                    </Link>
                    </li>
                :
                null}
                {this.props.currentUser.type === null ? 
                    <li>
                        <Link
                            to="/connection"
                            className="inactive">CONNEXION
                        </Link>
                    </li>
                    :
                    <li>
                        <Link
                            to="/"
                            onClick={()=>this.props.setCurrUser(null,null)}
                            className="inactive">DECONNEXION
                        </Link>
                    </li>
                }
            </ul>
        </nav>
        );
    }
}
  
  export default Navbar;