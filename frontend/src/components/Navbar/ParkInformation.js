import React, { Component } from 'react';

export default class ParkInformation extends Component {
    state={
        title:" 📢 INFORMATION 📢 ",
        description : ` ❝ Nous sommes impatients de vous accueillir pour la première fois à Maya parc !
        Nous rentrons bientot de notre voyage au Mésomérique et pourrons vous communiquer notre date d'ouverture très prochainement. ❞ `,
    }

    render() {
        return (
            <section id="parkInformations">
                <p><strong>{`${this.state.title} :`}</strong><br/>{this.state.description}</p>
            </section>
        )
    }
}
