import React, { Component } from 'react'
import './DetailsVisibilite.scss'
import FlipComponent from "./FlipComponent"
import DetailsInteractionsMail from "./DetailsInteractionsMail"
import DetailsInteractionsPhone from "./DetailsInteractionsPhone"
export class DetailsVisibilite extends Component {

    render() {
        return (
            <div className="details--container">
                <div className="details--header-container">
                    <p className="header-text">Détails des consultations</p>
                </div>
              <FlipComponent title={"Affichage du téléphone"} backText={"Vos biens vendus sont affichés sur nore carte des prix. Ils guident les particuliers vers votre vitrine, augmentent votre visibilité et valorisent votre expertise."} count={this.props.countPhone} dropDownComponent={<DetailsInteractionsPhone />} />
              <FlipComponent title={"Affichage de l'email"} backText={"Les vendeurs se rendent sur la carte des prix pour se renseigner sur les prix de leur secteur et identifier les professionnels locaux susceptibles d'évaluer leur bien. Vos informations (biens vendus, avis clients, annonces) sont déterminantes pour mettre en avant votre vitrine sur cette carte."} count={this.props.countMail} dropDownComponent={<DetailsInteractionsMail />} />
              {/* <FlipComponent title={"Consultation de la vitrine"} backText={"Les vendeurs se rendent sur la carte des prix pour se renseigner sur les prix de leur secteur et identifier les professionnels locaux susceptibles d'évaluer leur bien. Vos informations (biens vendus, avis clients, annonces) sont déterminantes pour mettre en avant votre vitrine sur cette carte."} count={0} dropDownComponent={<DetailsInteractionsMail />}/>  */}
            </div>
        )
    }
}

export default DetailsVisibilite
