import React, { Component } from 'react'
import './DetailsDemandes.scss'
import FlipComponent from "../Statistiques/FlipComponent"
import ContactInCardTransactions from "./ContactInCardTransactions"
import ContactInCardVitrine from "./ContactInCardVitrine"
export class DetailsDemandes extends Component {

    render() {
        return (
            <div className="details--container">
                <div className="details--header-container">
                    <p className="header-text">Détails des formulaire de contact</p>
                </div>
              <FlipComponent title={"Formulaire de contact depuis une vente récente"} backText={"Vos biens vendus sont affichés sur notre carte des prix. Ils guident les particuliers vers votre vitrine, augmentent votre visibilité et valorisent votre expertise."} count={this.props.countFormsTransaction} dropDownComponent={<ContactInCardTransactions />} />
              <FlipComponent title={"Formulaire de contact depuis la vitrine"} backText={"Les vendeurs se rendent sur la carte des prix pour se renseigner sur les prix de leur secteur et identifier les professionnels locaux susceptibles d'évaluer leur bien. Vos informations (biens vendus, avis clients, annonces) sont déterminantes pour mettre en avant votre vitrine sur cette carte."} count={this.props.countFormsVitrine} dropDownComponent={<ContactInCardVitrine />}/>
              
            </div>
        )
    }
}

export default DetailsDemandes

