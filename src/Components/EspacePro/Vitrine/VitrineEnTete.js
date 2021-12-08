import React, { Component } from 'react'
import './VitrineEnTete.scss'

export class VitrineEnTete extends Component {
    render() {
        return (
            <div className="entete--container">
            <div className="header--container">
                <p className="header-text">Votre vitrine</p>
            </div>
            <div className="component-text">
            <p className="corpus-text">Votre vitrine présente votre savoir-faire auprès de l'ensemble des visiteurs du site Agenz, acheteurs et vendeurs. Complétez un maximum d'informations et mettez vos biens vendus en avant pour mettre en valeur votre expertise.</p>
            </div>
            </div>
        )
    }
}

export default VitrineEnTete
