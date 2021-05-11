import React, { Component } from 'react';
import Attraction from './Attraction';

class AttractionList extends Component {

    render() {
        return(
            <section className="FlexCol itemC">
                {this.props.currentUser.type==="admin" ? <h3>LISTE DES ATTRACTIONS</h3> : ""}
                {this.props.attractions.map((attraction, index) =>
                    (
                        <Attraction
                            key={`atr${attraction.id_atr}`}
                            indexAtr={index}
                            attraction={attraction}
                            currentUser={this.props.currentUser}
                            updateRating={this.props.updateRating}
                            updateAtr={this.props.updateAtr}
                        />
                    ))}
            </section>
            
        )
    }

}

export default AttractionList;