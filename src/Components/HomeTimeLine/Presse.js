import React, { Component } from 'react'
import './Presse.scss'
import economiste from '../../assets/img/economiste-maroc.png'
import conjoncture from '../../assets/img/conjoncture-magazine-maroc.jpeg'
import lve from '../../assets/img/la-vie-eco-journal-maroc.jpeg'
export class Presse extends Component {
    render() {
        return (
            <div className="presse-section">
                <div className="presse-section-title">
                    <h1>Agenz dans la presse</h1>
                </div>
                <div className="row">
 
                                        <div className="col-md-4" key={1}>
                                            <div className="presse">
                                                
                                                <div className="presse-image" style={{backgroundImage: `url("${economiste}")`}}></div>
                                                <div className="presse-content">
                                                    <div className="presse-title">
                                                    Les data sciences pour apprécier le marché immobilier
                                                    </div>
                                                    <div className="presse-date">
                                                        23 Février 2021
                                                    </div>
                                                    <div className="presse-text">
                                                        "Une plateforme au service de la transparence du marché immobilier"
                                                    </div>
                                                    {/* <div className="presse-button">
                                                        <span>En savoir plus</span>
                                                    </div> */}
                                                </div>
                                                
                                            </div>
                                        </div>
                                       
                                        <div className="col-md-4" key={3}>
                                            <div className="presse">
                                                
                                                <div className="presse-image" style={{backgroundImage: `url("${lve}")`}}></div>
                                                <div className="presse-content">
                                                    <div className="presse-title">
                                                    La data-science au service du marché de l'immobilier
                                                    </div>
                                                    <div className="presse-date">
                                                        17 Mars 2021
                                                    </div>
                                                    <div className="presse-text">
                                                        "Afin que chaque personne puisse disposer d'un niveau d'information suffisant pour entamer son projet immobilier sereinement"
                                                    </div>
                                                    {/* <div className="presse-button">
                                                        <span>En savoir plus</span>
                                                    </div> */}
                                                </div>
                                                
                                            </div>
                                        </div>
                                        <div className="col-md-4" key={2}>
                                            <div className="presse">
                                                
                                                <div className="presse-image" style={{backgroundImage: `url("${conjoncture}")`}}></div>
                                                <div className="presse-content">
                                                    <div className="presse-title">
                                                        Agenz lance sa plateforme d'estimation immobilière
                                                    </div>
                                                    <div className="presse-date">
                                                        15 Mars 2021
                                                    </div>
                                                    <div className="presse-text">
                                                        "Toute l'information nécessaire pour la réussite des projets immobiliers"
                                                    </div>
                                                    {/* <div className="presse-button">
                                                        <span>En savoir plus</span>
                                                    </div> */}
                                                </div>
                                                
                                            </div>
                                        </div>
                                       
                            
                </div>
            </div>
        )
    }
}

export default Presse
