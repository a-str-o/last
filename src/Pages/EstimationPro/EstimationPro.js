import React, { Component } from 'react';
import EstimationStepper from '../../Components/EstimationPro/EstimationStepper';
import {Helmet} from 'react-helmet'
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import ReactGA from 'react-ga'
class EstimationPro extends Component {
    componentDidMount(){
        ReactGA.pageview(this.props.location.pathname+ this.props.location.search);
    
        }
        
    render() {
        if(!this.props.authenticatedPro ) {
            return <Redirect to="/estimation"/>
        }else {
        return (
            <div className="container main-container">
                        <Helmet>
    <title>Estimation en ligne gratuite de biens immobiliers</title>
    <meta
      name="description"
      content="Estimation en ligne gratuite de biens immobiliers à Casablanca pour vendre ou acheter en toute confiance. Tous les outils dont vous avez besoin pour calculer le bon prix au m2"
    />
    <meta property="og:url"                content='https://www.agenz.ma/estimationPro'/>
    <meta property="og:type"               content="article" />
    <meta property="og:title"       content='agenz.ma - Estimation pour les professionels'/>
    <meta property="og:description" content="Estimation en ligne gratuite de biens immobiliers à Casablanca pour vendre ou acheter en toute confiance. Tous les outils dont vous avez besoin pour calculer le bon prix au m2"/>
    </Helmet>
                <div className="row justify-content">
                    <div className="col-md-12 col-sm-12">
                        <EstimationStepper lat={this.props.match.params.latitude} long={this.props.match.params.longitude} />
                    </div>
                </div>
            </div>
        );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        authenticated : state.auth.authenticated,
        authenticatedPro : state.auth.authenticatedPro
    };
};
export default connect(mapStateToProps)(EstimationPro);