import React, { Component } from 'react';
import '../AccountComponent.scss';
import moment from 'moment'
import { connect } from "react-redux";
import filledNotStar from './../../../assets/img/filledNotStar.png';
import filledStar from './../../../assets/img/filledStar.png';
import majIcon from './../../../assets/icons/majIcon.png';
import deleteIcon from './../../../assets/icons/deleteIcon.png';
import { Link } from 'react-router-dom';

class EstimationTerrainNus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            estimations: []
        }
    }

    componentDidMount() {
        this.setState({
            estimations: this.props.estimation.userEstimations.filter(est => est.type === 'terrains')
        })
    }

    render () {
        return (
            <div className="menuHolders">
                {this.state.estimations.map((estimation, index) => {
                    return(
                        <div key={index} className="estimation-items">
                            <div className="row">
                                <div className="col-md-9">
                                    <h5>{estimation.adresse}</h5>
                                    <div className="justify-content">
                                        <div className="realisation-date">
                                            Réalisé le {moment(estimation.date).format('L')}
                                        </div>
                                        <div className="results-caracterictics">
                                            <span><i className="fas fa-bed"></i> {estimation.typologie}</span>
                                            <span><i className="fas fa-caret-left"></i> {estimation.surfacehabitable} m²</span>
                                            <span><i className="fas fa-bath"></i> {estimation.sdb}</span>
                                        </div>
                                    </div>
                                    <div className="justify-content">
                                        <div className="realisation-date">
                                            Indice de confiance
                                        </div>
                                        <div className="results-caracterictics starsPrecision">
                                            {estimation.precision === 0 ? (
                                                <div className="starsShow">
                                                    <img src={filledNotStar} alt=''></img>
                                                    <img src={filledNotStar} alt=''></img>
                                                    <img src={filledNotStar} alt=''></img>
                                                    <img src={filledNotStar} alt=''></img>
                                                    <img src={filledNotStar} alt=''></img>
                                                </div>
                                            ) : estimation.precision === 1 ? (
                                                <div className="starsShow">
                                                    <img src={filledStar} alt=''></img>
                                                    <img src={filledNotStar} alt=''></img>
                                                    <img src={filledNotStar} alt=''></img>
                                                    <img src={filledNotStar} alt=''></img>
                                                    <img src={filledNotStar} alt=''></img>
                                                </div>
                                            ) : estimation.precision === 2 ? (
                                                <div className="starsShow">
                                                    <img src={filledStar} alt=''></img>
                                                    <img src={filledStar} alt=''></img>
                                                    <img src={filledNotStar} alt=''></img>
                                                    <img src={filledNotStar} alt=''></img>
                                                    <img src={filledNotStar} alt=''></img>
                                                </div>
                                            ): estimation.precision === 3 ? (
                                                <div className="starsShow">
                                                    <img src={filledStar} alt=''></img>
                                                    <img src={filledStar} alt=''></img>
                                                    <img src={filledStar} alt=''></img>
                                                    <img src={filledNotStar} alt=''></img>
                                                    <img src={filledNotStar} alt=''></img>
                                                </div>
                                            ): estimation.precision === 4 ? (
                                                <div className="starsShow">
                                                    <img src={filledStar} alt=''></img>
                                                    <img src={filledStar} alt=''></img>
                                                    <img src={filledStar} alt=''></img>
                                                    <img src={filledStar} alt=''></img>
                                                    <img src={filledNotStar} alt=''></img>
                                                </div>
                                            ): (
                                                <div className="starsShow">
                                                    <img src={filledStar} alt=''></img>
                                                    <img src={filledStar} alt=''></img>
                                                    <img src={filledStar} alt=''></img>
                                                    <img src={filledStar} alt=''></img>
                                                    <img src={filledStar} alt=''></img>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="justify-content priceBarPricesHighPrice">
                                        <div className="priceBarPricesHighTitle">
                                            Prix haut
                                        </div>
                                        <div className="priceBarPricesHighPrice">
                                            {new Intl.NumberFormat().format(Math.round (estimation.estimation.toFixed() * (1 + (estimation.variateur / 100)))).replace(',', ' ')} MAD
                                        </div>
                                    </div>
                                    <div className="justify-content priceBarPricesLowPrice">
                                        <div className="priceBarPricesLowTitle">
                                            Prix bas
                                        </div>
                                        <div className="priceBarPricesLowPrice">
                                            {new Intl.NumberFormat().format(Math.round (estimation.estimation.toFixed() * (1 - (estimation.variateur / 100)))).replace(',', ' ')} MAD
                                        </div>
                                    </div>

                                    

                                    <div className="justify-content estimatedPrice">

                                        <h3 >Prix estimé</h3>
                                        <h3>{new Intl.NumberFormat().format(Math.round (estimation.estimation.toFixed())).replace(',', ' ')} MAD</h3>
                                    </div>

                                    <div className="justify-content-mt">
                                        <p>Prix / m2</p>
                                        <p className="estimatedPriceM2">{new Intl.NumberFormat().format(Math.round (estimation.estimation.toFixed() /  estimation.surfacehabitable)).replace(',', ' ')} MAD / m2</p>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <button type="button" className="button button-primaire">
                                    <span> <img src={majIcon} alt="" /> </span>  <span>Mettre a jour</span>
                                    </button>

                                    <button type="button" className="button button-danger">
                                    <span> <img src={deleteIcon} alt="" /> </span> <span>Supprimer le bien</span>
                                    </button>
                                </div>
                            </div>
                                
                        </div>
                    );
                })}
                {this.state.estimations.length === 0 ? (
                    <div className="noestimationholder">
                        <h4>Vous n'avez estimé aucun terrain</h4>
                        <p>Commencez une nouvelle estimation sur notre <Link to="/estimation">page d'estimation gratuite</Link></p>
                    </div>
                ) : ''}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const uid = state.auth.uid;
    const email = state.auth.email;
    const estimation = state.userEstimation;

    // console.log(estimation)
    return {
      uid: uid,
      email: email,
      estimation:estimation
    };
};

export default connect(mapStateToProps)(EstimationTerrainNus);