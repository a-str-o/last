import React, { Component } from 'react'

import { connect } from "react-redux";

import AdressePrice from "../AdressePrice/AdressePrice"
import {withRouter} from 'react-router-dom';
import './AveragePriceArea.scss'
import MC from "../../assets/meanCartier-casablanca_18-02-2021.json"
import CDPVilla from "../CardComponent/carte_des_prix_2021-02-02_villa.json"
import Axios from "axios"
import Spinner from "react-bootstrap/Spinner";
import {Helmet} from 'react-helmet'


import {
    BrowserRouter as Router,
    Route,
    Switch,
    
  } from "react-router-dom";


export class AveragePriceArea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address : '',
            adresseDetailsError : false,
            coordinates: {
                lat: null,
                lng: null
            },
            adressPrice : null,
            adressePriceVilla : null,
            waitForAdress : true
            
        }
    }
    getDate= () => {
        let date = this.props.estimationState.lastTransaction
        if(!date){
            date='9/03/2021'
        }
        date = Date.parse(date.split('/')[1]+'/'+date.split('/')[0]+'/2021')
        let nDate = new Date(date)
        return nDate.toLocaleDateString('fr-FR', {year: 'numeric', month: 'long', day: 'numeric'})
        
        
    }
    formatTitle = () => {
        if(this.props.match.params.address && this.props.match.params.city !== "vente-recente"){
            return (`${this.state.address}, ${this.props.match.params.quartier.replace("-"," ")}, ${this.props.match.params.city}`)
        }
        else if (this.props.match.params.quartier && this.props.match.params.city !== "vente-recente"){
            return (`Prix de l'immobilier à ${this.props.match.params.quartier.replace("-"," ")}, ${this.props.match.params.city}`)
        }
        else if(this.props.match.params.city && this.props.match.params.city !== "vente-recente"){
            return (`Prix de l'immobilier à ${this.props.match.params.city}`)
        }
        else {
            return ("Prix de l'immobilier à Casablanca")

        }
    }

    getAdresseInfo = () => {
        Axios.post("https://us-central1-agenz-website-prod.cloudfunctions.net/api/addressDetails",{url : this.props.match.params.address}).then (res => {
        this.setState({address : res.data.title})
        this.setState({lng : res.data.lng,lat : res.data.lat,batiment : res.data.batiment,adresseEtage : res.data.etages})
        this.setState({adressPrice : parseInt(MC[0][res.data.zone])})
        this.setState({adressePriceVilla : parseInt(CDPVilla[0][res.data.zone])})
        this.props.dispatch({type : "SET_ACTIVE_ZONE", data : {id : res.data.zone, prix : parseInt(MC[0][res.data.zone])}})
        if(CDPVilla[0][res.data.zone]){
        this.props.dispatch({type : "SET_ACTIVE_ZONE_VILLA", data : {id : res.data.zone, prix : parseInt(CDPVilla[0][res.data.zone])}})
        }
        this.props.dispatch({type : "SET_VIEWPORT_ON_ACTIVE_ZONE", data : {lat : res.data.lat, lng : res.data.lng, zoom : 17}})

    })
    .catch(err => {
        this.setState({adresseDetailsError : true})
        this.props.history.push('/prix-immobilier')
    })
    }
    formatEtages(etage){
        if(etage===0){
            return ""
        }
        else if (etage===1){
            return ", 1 étage"
        }
        else {
            return `, ${etage} étages`
        }
    }
    componentDidMount(){
        if(this.props.match.params.address && this.props.match.params.city !== "vente-recente"){
            this.getAdresseInfo()
    }
    else{
        this.setState({batiment : null, adresseEtage : null, waitForAdress : false})
    }
}
componentDidUpdate(prevProps){
    if(prevProps.match.params!==this.props.match.params){
        this.componentDidMount()
    }
}
formatCanonical = () => {
    if(this.props.match.params.address && this.props.match.params.city !== "vente-recente"){
        return (`https://www.agenz.ma/prix-immobilier/${this.props.match.params.city}/${this.props.match.params.quartier}/${this.state.address}`)
    }
    else if (this.props.match.params.quartier){
        return (`https://www.agenz.ma/prix-immobilier/${this.props.match.params.city}/${this.props.match.params.quartier.replace(" ","-")}`)
    }
    else if(this.props.match.params.city){
        return (`https://www.agenz.ma/prix-immobilier/${this.props.match.params.city}`)
    }
    else {
        return (`https://www.agenz.ma/prix-immobilier/Casablanca`)

    }
}

    render() {
        return (
            <>
              <Helmet>
                <link rel="canonical" href={this.formatCanonical()} />
            </Helmet>
          

            <div className="nested-areas--container">
            {this.props.match.params.city && this.props.match.params.city !== "vente-recente" ? (
                <p className="url-li city" onClick={() => {this.props.history.push(`/prix-immobilier/${this.props.match.params.city}`)}}>
                {this.props.match.params.city}
                </p>
            ):("")}
             {this.props.match.params.quartier && this.props.match.params.city !== "vente-recente" ? (
                 <>
            <i class="fas fa-chevron-right chevron-url"></i>
            <p className="url-li city" onClick={() => {this.props.history.push(`/prix-immobilier/${this.props.match.params.city}/${this.props.match.params.quartier}`)}}>
            {this.props.match.params.quartier}
            </p>
            </>
            ):("")}
                         {this.props.match.params.address && this.props.match.params.city !== "vente-recente" ? (
                 <>
            <i class="fas fa-chevron-right chevron-url"></i>
            <p className="url-li city">
            {(this.state.address!=="" || !this.state.waitForAdress) ? (this.state.address):( <Spinner animation="border" variant="primary" size="sm"/>)}
            </p>
            </>
            ):("")}
            </div>
            <div className="average--area-container">
                <h1 className="average--area-title">
                {(this.state.address!=="" || !this.state.waitForAdress) ? (this.formatTitle()):( <Spinner animation="border" variant="primary" size="sm"/>)}
                </h1>
                <div className = "source">Sources : Données publiques de l'ANCFCC, des notaires et agences partenaires et des particuliers</div>

                <div className="col-md-12 no-mobile">
                        <div className = "last-update">
                          <span className = "check"> <i className = "fas fa-check-circle "></i> </span>   Dernière mise à jour le : {this.getDate()}
                        </div>
                    </div>
                {this.state.batiment ? (
                    <div className="building--info-container">
                        <p className="building--info">{this.state.batiment}{this.formatEtages(this.state.adresseEtage)}</p>
                    </div>
                ) :
                ("")}
                {this.props.cardButton ? (
                                             <button className="button button-primary button--secondary map-switch" onClick={() => {
                                                this.props.dispatch({type : "DISPLAY_PHONE" , data : true})
                                            }}>
                                            Voir la carte
                                        </button>
                ) : ("")}
                    <Router>
                                <Switch>
                                <Route  exact path='/prix-immobilier'>
                                <AdressePrice />
                                </Route>
                                <Route path='/prix-immobilier/:city/:quartier/:address'>
                                <AdressePrice />
                                </Route>
                                <Route  path='/prix-immobilier/:city/:quartier'>
                                <AdressePrice />
                                </Route>
                                <Route  path='/prix-immobilier/:city'>
                                <AdressePrice />
                                </Route>                              
                                </Switch>
                                </Router>  
                    {/* <PricingAreaHouse />

                    <PricingAreaButtons /> */}
                    {/* <PriceTable /> */}
                
                {/* <ListingAgencies /> */}

                
            </div>
            </>
        )
    }
}

const mapStateToProps = (state) => {

    return {
      priceDetails: state.priceDetails,
      estimationState : state.estimationState

    };
};

export default connect(mapStateToProps)(withRouter(AveragePriceArea));
