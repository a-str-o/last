import React from 'react';
// import { Link } from 'react-router-dom';
import './NoAccess.scss';



class NoAccess extends React.Component {
    render() {
        return (
            <div className="noestimation--container">
                <div className="noestimation--modal">
                    <div className="noestimation--modal-title">
                        Accès impossible
                    </div>
                    <div className="noestimation--modal-content">
                       Votre abonnement ne donne pas accès à cet espace
                    </div>
                    <div className="noestimation--action">
                        {/* <Link to="/estimationPro">
                            <button>Créer un dossier</button>
                        </Link> */}
                    </div>
                </div>
            </div>
        )
    }
}

export default NoAccess;