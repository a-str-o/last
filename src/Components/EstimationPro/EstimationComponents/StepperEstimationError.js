import React, { Component } from 'react';
import { connect } from "react-redux";
import errorImage from '../../../assets/img/error_img.png';
import { Link } from 'react-router-dom';


class StepperEstimationError extends Component {

    render() {
        return (
            <div className = "no-access">
            <div className = "no-access-icone"> 
                <img src = {errorImage} alt="Estimation en ligne de bien immobilier au Maroc pour acheter et vendre en toute confiance"/>
            </div>

            <div className = "no-access-title"> 
                Une erreur inconnue à eu lieu
            </div>

            <div className = "no-access-message"> 
                <p>Le calcul de votre estimation n'a pu aboutir</p>
                <p>Les équipes techniques d'agenz ont été informées de ce problème et il sera corrigé dans les plus brefs délais</p>
                <p>Nous vous invitons à reprendre l'estimation dans quelques minutes, ou à <Link to="/contact">nous contacter</Link> pour plus d'informations</p>
                <p> Code erreur : {this.props.estimationState.estimationError.error_id}</p>    
            </div>

        </div>
       
        );
    }
}
const mapStateToProps = (state) => {
    const uid = state.auth.email;
    const loader = state.loading.loading;
    const estimation = state.estimationState;
    return {
      uid: uid,
      loader: loader,
      estimationState: estimation
    };
};
export default connect(mapStateToProps)(StepperEstimationError);
