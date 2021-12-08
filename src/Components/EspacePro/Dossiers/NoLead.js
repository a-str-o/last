import React from 'react';
import './style.scss';

class NoLead extends React.Component {
    render() {
        return (
            <div className="noestimation--container">
                <div className="noestimation--modal">
                    <div className="noestimation--modal-title">
                        Aucun projet ne vous a été affecté 
                    </div>
                    <div className="noestimation--modal-content">
                        Vérifiez votre vitrine et assurez-vous d'avoir renseigné des biens vendus
                    </div>
                    <div className="noestimation--action">
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default NoLead;