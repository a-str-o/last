import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

class NoEstimations extends React.Component {
    render() {
        return (
            <div className="noestimation--container">
                <div className="noestimation--modal">
                    <div className="noestimation--modal-title">
                        Aucun dossier 
                    </div>
                    <div className="noestimation--modal-content">
                        Vous n'avez encore créé aucun dossier sur Agenz
                    </div>
                    <div className="noestimation--action">
                        <Link to="/estimationPro">
                            <button>Créer un dossier</button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default NoEstimations;