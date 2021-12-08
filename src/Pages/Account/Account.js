import React, { Component } from 'react';
import AccountComponent from '../../Components/AccountComponent/AccountComponent';
import {Helmet} from 'react-helmet'
import ReactGA from "react-ga";
import { withRouter } from 'react-router-dom';
class Account extends Component {
    componentDidMount(){
        ReactGA.pageview(this.props.location.pathname+ this.props.location.search);
        }

    render() {
        return (
            <>
    <Helmet>
    <title>agenz - Mon compte</title>
    <meta
      name="description"
      content="Espace personnel agenz - Retrouvez toutes vos estimations sur votre espace personnel - Estimation en ligne gratuite de biens immobiliers (Appartements, villas et terrains) à Casablanca pour vendre ou acheter en toute confiance - agenz est la référence de l'estimation immobilière en ligne à Casablanca. Grâce à notre technologie inédite et à nos partenariats, nous vous fournissons une première estimation pour votre bien ainsi que des informations sur la dynamique immobilière de votre quartier. L’équipe d’AgenZ vous propose ensuite son expertise et son réseau de qualité pour vous accompagner dans la réussite de vos projets immobiliers, tout en assurant un suivi proactif en tant que tiers de confiance"
    />
    <meta property="og:url"                content='https://www.agenz.ma/account'/>
    <meta property="og:type"               content="article" />
    <meta property="og:title"       content='agenz.ma - CGU'/>
    <meta property="og:description" content='Estimation gratuite et en ligne de biens immobilier au Maroc'/>
    </Helmet>
                <AccountComponent />
            </>
        );
    }
}

export default withRouter(Account);
