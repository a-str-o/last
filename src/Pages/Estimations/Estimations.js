import React, { Component } from 'react';
import Spinner from "react-bootstrap/Spinner";
import filledNotStar from './../../assets/img/filledNotStar.png';
import filledStar from './../../assets/img/filledStar.png';
import CountUp from 'react-countup';
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import PopoverTitle from "react-bootstrap/PopoverTitle";
import PopoverContent from "react-bootstrap/PopoverContent";
import InfoIcon from '@material-ui/icons/Info';
import dataBlue from '../../assets/icons/data_blue.png';
import houseBlue from '../../assets/icons/house_blue.png';
import successBlue from '../../assets/icons/success_blue.png';
import './style.scss';
import axios from 'axios';
import {Helmet} from 'react-helmet'
import ReactGA from "react-ga"
class PublicEstimations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            estimation : {}
        }
    }

    getPublicEstimation () {
        const token = new URLSearchParams(this.props.location.search).get('token');
        // const retrieveData = firebase.functions().httpsCallable('accessData');
        axios.post('https://us-central1-agenz-website-prod.cloudfunctions.net/api/accessData',{ accessToken: token }).then(result => {
        // retrieveData({ accessToken: token })
        // .then((result) => {
            this.setState({estimation: result.data.result.estimation})
        })
        .then(() => {
            this.setState({loading : false})
        })
        .catch(err => {
            
            console.log(err)
        })
    }
    componentDidMount() {
        ReactGA.pageview(this.props.location.pathname+ this.props.location.search);
        this.getPublicEstimation()
    }
    render() {
        const token = new URLSearchParams(this.props.location.search).get('token');
        let surfaceeffective = 1;
        if(this.state.estimation.bien==="appartement"){
        if(this.state.estimation.parking) {
            surfaceeffective= this.state.estimation.surfacehabitable + (this.state.estimation.surfacecave+this.state.estimation.surfacebalcon+this.state.estimation.placesparking*12)/2
        }
        else {
            surfaceeffective= this.state.estimation.surfacehabitable + (this.state.estimation.surfacecave+this.state.estimation.surfacebalcon)/2 
        }
    }
    else {
        surfaceeffective = this.state.estimation.surfaceterrain
    }
       
        let type_de_bien; 
        if(this.state.estimation.bien === 'appartement'){type_de_bien = 'un appartement'}else  { type_de_bien = 'une villa'}
        let adresse = this.state.estimation.adresse
        const meta = {
            title: `agenz a estimé ${type_de_bien} proche de ${adresse}`,
            meta: {
              property: {
                'og:title': `agenz a estimé ${type_de_bien} proche de ${adresse}`,
                'og:url': `https://www.agenz.ma/estimations?token=${token}`,
                'og:description': 'Estimez votre bien et partagez le résultat autour de vous en deux minutes grâce à agenz.ma',
                'og:image' :  'https://firebasestorage.googleapis.com/v0/b/website-estimation-immobiliere.appspot.com/o/Image%20EDM.png?alt=media'
              }
            }
          };
        const popover = (
            <Popover id="popover-contained">
                <PopoverTitle as="h3">Évaluation de votre estimation</PopoverTitle>
                <PopoverContent>
                    Représente le niveau de confiance attribué à l'estimation réalisée. Celui-ci varie en fonction du nombres de données que nous possédons sur une zone determinée.
                </PopoverContent>
            </Popover>
        );
        return (
            <>
                    <Helmet>
    <title>agenz a estimé ce bien</title>
    <meta
      name="description"
      content="agenz - Estimation en ligne gratuite de biens immobiliers (Appartements, villas et terrains) à Casablanca pour vendre ou acheter en toute confiance - AgenZ est la référence de l'estimation immobilière en ligne à Casablanca. Grâce à notre technologie inédite et à nos partenariats, nous vous fournissons une première estimation pour votre bien ainsi que des informations sur la dynamique immobilière de votre quartier. L’équipe d’AgenZ vous propose ensuite son expertise et son réseau de qualité pour vous accompagner dans la réussite de vos projets immobiliers, tout en assurant un suivi proactif en tant que tiers de confiance"
    />
    <meta property="og:url"                content='https://www.agenz.ma/estimation'/>
    <meta property="og:type"               content="article" />
    <meta property="og:title"       content='Ce bien a été estimé sur agenz.ma'/>
    <meta property="og:description" content='Estimation gratuite et en ligne de biens immobilier au Maroc'/>
    </Helmet>
            {this.state.loading ?
            (
                <div className="loader">
                <Spinner animation="border" variant="primary" size="lg"/>
                    <div className="estimation-top-side">
                        <h1 className="loader-h1">Chargement...</h1>
                    </div>
                </div>
            ) : ('')
            }
            {!this.state.loading ? (
                <div className="container main-container">
                    <div className="row justify-content">
                        <div className="col-md-12 col-sm-12">
                            <div className = 'publicEstimation'>

                                <div className = "container">
                                    <div>
                                        <div className = "row">
                                            

                                            <div>
                                        <div className="show-results">
                                            <div>
                                                <div className="results-top-side">
                                                    <div className ="results-top"> 
                                                    <div className={this.state.estimation.bien !== 'terrain' && this.state.estimation.bien !== undefined ? "results-icon" : "results-icon2"} >  
                                                    {this.state.estimation.bien === 'appartement' ? 
                                                    (<svg width="100px" height="100px" viewBox="0 0 56 56" version="1.1" xmlns="http://www.w3.org/2000/svg" class="radio-rect__icon path__stroke polyline__stroke"><g id="assets" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" opacity="1" stroke-linejoin="round"><g id="Appartment" stroke="#393939" stroke-width="2"><g id="Page-1" transform="translate(10.000000, 7.000000)"><path d="M4,41 L4,1 C4,0.448 4.448,0 5,0 L31,0 C31.553,0 32,0.448 32,1 L32,41 L21,41 L21,33 C21,32.447 20.553,32 20,32 L16,32 C15.448,32 15,32.447 15,33 L15,41 L4,41 Z" id="Stroke-1" stroke-linecap="round"></path><path d="M11,12 L11,9" id="Stroke-3" stroke-linecap="square"></path><path d="M18,12 L18,9" id="Stroke-5" stroke-linecap="square"></path><path d="M25,12 L25,9" id="Stroke-7" stroke-linecap="square"></path><path d="M11,23 L11,20" id="Stroke-9" stroke-linecap="square"></path><path d="M18,23 L18,20" id="Stroke-11" stroke-linecap="square"></path><path d="M25,23 L25,20" id="Stroke-13" stroke-linecap="square"></path><path d="M0,41 L36,41" id="Stroke-15" stroke-linecap="round"></path></g></g></g></svg>)
                                                    : 
                                                    this.state.estimation.bien === 'appartement' ?
                                                    ( <svg width="70px" height="70px" viewBox="0 0 56 56" version="1.1" xmlns="http://www.w3.org/2000/svg" class="radio-rect__icon path__stroke polyline__stroke"><g id="assets" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" opacity="1" stroke-linejoin="round"><g id="House" stroke-width="2" stroke="#393939"><g id="Page-1" transform="translate(8.000000, 13.000000)"><polyline id="Stroke-1" points="-7.27196081e-14 13 20 0 40 13"></polyline><path d="M6,9 L6,31 L16,31 L16,22 C16,21.447 16.448,21 17,21 L23,21 C23.553,21 24,21.447 24,22 L24,31 L34,31 L34,9" id="Stroke-3"></path></g></g></g></svg>)
                                                    :
                                                    ( <svg width="70px" height="70px" viewBox="0 0 56 56" version="1.1" xmlns="http://www.w3.org/2000/svg" class="radio-rect__icon path__fill__checked"><g id="assets" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" opacity="1"><g id="Loft" fill="#393939"><g id="Page-1" transform="translate(3.000000, 10.000000)"><path d="M12,27.0009 L24,27.0009 L24,21.0009 L12,21.0009 L12,27.0009 Z M25,19.0009 L11,19.0009 C10.448,19.0009 10,19.4489 10,20.0009 L10,28.0009 C10,28.5539 10.448,29.0009 11,29.0009 L25,29.0009 C25.552,29.0009 26,28.5539 26,28.0009 L26,20.0009 C26,19.4489 25.552,19.0009 25,19.0009 L25,19.0009 Z" id="Fill-1"></path><path d="M40,33.0009 L40,20.0009 C40,19.4489 39.553,19.0009 39,19.0009 L31,19.0009 C30.447,19.0009 30,19.4489 30,20.0009 L30,33.0009 L6,33.0009 L6,15.7819 L44,6.2819 L44,33.0009 L40,33.0009 Z M32,33.0009 L38,33.0009 L38,21.0009 L32,21.0009 L32,33.0009 Z M49,33.0009 L46,33.0009 L46,5.0009 C46,4.6929 45.858,4.4019 45.615,4.2129 C45.372,4.0229 45.056,3.9559 44.758,4.0309 L4.757,14.0309 C4.312,14.1419 4,14.5419 4,15.0009 L4,33.0009 L1,33.0009 C0.448,33.0009 0,33.4479 0,34.0009 C0,34.5539 0.448,35.0009 1,35.0009 L5,35.0009 L31,35.0009 L39,35.0009 L45,35.0009 L49,35.0009 C49.553,35.0009 50,34.5539 50,34.0009 C50,33.4479 49.553,33.0009 49,33.0009 L49,33.0009 Z" id="Fill-3"></path><path d="M4.999,12.0009 C5.08,12.0009 5.161,11.9919 5.243,11.9709 L45.242,1.9709 C45.778,1.8369 46.104,1.2939 45.97,0.7579 C45.836,0.2229 45.293,-0.1051 44.758,0.0309 L4.757,10.0309 C4.222,10.1649 3.896,10.7079 4.03,11.2439 C4.144,11.6979 4.551,12.0009 4.999,12.0009" id="Fill-4"></path></g></g></g></svg>)
                                                    } 
                                                        
                                                        </div>
                                                        <div className ="results-infos">
                                                            <div>
                                                                <p>{this.state.estimation.bien === 'appartement' ? 'Appartement' : 'Villa'} proche de</p>
                                                                <h3>{this.state.estimation.adresse}</h3>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className = "results-middle results-middle-share">
                                                        <div className="results-caracterictics starsPrecision">
                                                        
                                                        {this.state.estimation.precision === 0 ? (
                                                            <div className="starsShow">
                                                                    <OverlayTrigger trigger="hover" placement="right" overlay={popover}>
                                                                    <span className="info-icon-display"><InfoIcon/></span>
                                                                </OverlayTrigger>
                                                                <img src={filledNotStar} alt='star'></img>
                                                                <img src={filledNotStar} alt='star'></img>
                                                                <img src={filledNotStar} alt='star'></img>
                                                                <img src={filledNotStar} alt='star'></img>
                                                                <img src={filledNotStar} alt='star'></img>
                                                            </div>
                                                        ) : this.state.estimation.precision === 1 ? (
                                                            <div className="starsShow">
                                                                    <OverlayTrigger trigger="hover" placement="right" overlay={popover}>
                                                                    <span className="info-icon-display"><InfoIcon/></span>
                                                                </OverlayTrigger>
                                                                <img src={filledStar} alt='star'></img>
                                                                <img src={filledNotStar} alt='star'></img>
                                                                <img src={filledNotStar} alt='star'></img>
                                                                <img src={filledNotStar} alt='star'></img>
                                                                <img src={filledNotStar} alt='star'></img>
                                                            </div>
                                                        ) : this.state.estimation.precision === 2 ? (
                                                            <div className="starsShow">
                                                                    <OverlayTrigger trigger="hover" placement="right" overlay={popover}>
                                                                    <span className="info-icon-display"><InfoIcon/></span>
                                                                </OverlayTrigger>
                                                                <img src={filledStar} alt='star'></img>
                                                                <img src={filledStar} alt='star'></img>
                                                                <img src={filledNotStar} alt='star'></img>
                                                                <img src={filledNotStar} alt='star'></img>
                                                                <img src={filledNotStar} alt='star'></img>
                                                            </div>
                                                        ): this.state.estimation.precision === 3 ? (
                                                            <div className="starsShow">
                                                                    <OverlayTrigger trigger="hover" placement="right" overlay={popover}>
                                                                    <span className="info-icon-display"><InfoIcon/></span>
                                                                </OverlayTrigger>
                                                                <img src={filledStar} alt='star'></img>
                                                                <img src={filledStar} alt='star'></img>
                                                                <img src={filledStar} alt='star'></img>
                                                                <img src={filledNotStar} alt='star'></img>
                                                                <img src={filledNotStar} alt='star'></img>
                                                            </div>
                                                        ): this.state.estimation.precision === 4 ? (
                                                            <div className="starsShow">
                                                                    <OverlayTrigger trigger="hover" placement="right" overlay={popover}>
                                                                    <span className="info-icon-display"><InfoIcon/></span>
                                                                </OverlayTrigger>
                                                                <img src={filledStar} alt='star'></img>
                                                                <img src={filledStar} alt='star'></img>
                                                                <img src={filledStar} alt='star'></img>
                                                                <img src={filledStar} alt='star'></img>
                                                                <img src={filledNotStar} alt='star'></img>
                                                            </div>
                                                        ): (
                                                            <div className="starsShow">
                                                                    <OverlayTrigger trigger="hover" placement="right" overlay={popover}>
                                                                    <span className="info-icon-display"><InfoIcon/></span>
                                                                </OverlayTrigger>
                                                                <img src={filledStar} alt='star'></img>
                                                                <img src={filledStar} alt='star'></img>
                                                                <img src={filledStar} alt='star'></img>
                                                                <img src={filledStar} alt='star'></img>
                                                                <img src={filledStar} alt='star'></img>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="results-estimate-price">
                                                        <p className="estimatedPrice">Prix estimé</p>
                                                        <h3>
                                                                {
                                                                !this.state.estimation.estimationByUser ?
                                                                (
                                                                
                                                                    <CountUp duration={1}
                                                                    separator=" "
                                                                    decimal=","
                                                                    end={Math.round(this.state.estimation.estimation.toFixed() / 1000) * 1000} /> 
                                                                
                                                                )
                                                                :
                                                                (
                                                                    <CountUp duration={1}
                                                                    separator=" "
                                                                    decimal=","
                                                                    end={Math.round(this.state.estimation.estimationByUser.toFixed())} /> 
                                                                )
                                                                
                                                                } MAD
                                                            </h3> 
                                                        <p className="estimatedPriceM2">
                                                            <CountUp duration={1}
                                                                separator=" "
                                                                decimal="," end={
                                                                    Math.round(
                                                                        this.state.estimation.estimation.toFixed() /
                                                                        surfaceeffective
                                                                    )
                                                                }/>
                                                            MAD / m2
                                                        </p>
                                                    </div>
                                                    </div>
                                                    <div className="priceBarContainer">
                                                        <div className="priceBarPrices">
                                                            <div className="priceBarPricesLow">
                                                                <div className="priceBarPricesLowTitle">
                                                                    Prix bas
                                                                </div>
                                                                <div className="priceBarPricesLowPrice">
                                                                <CountUp duration={1}
                                                                        separator=" "
                                                                        decimal="," end={
                                                                Math.round(
                                                                        (this.state.estimation.estimation.toFixed() * 
                                                                        (1 - (this.state.estimation.variateur / 100))) /
                                                                        1000
                                                                    ) * 1000
                                                                } /> MAD
                                                                </div>
                                                            </div>
                                                            <div className="priceBarPricesHigh">
                                                                <div className="priceBarPricesHighTitle">
                                                                    Prix haut
                                                                </div>
                                                                <div className="priceBarPricesHighPrice">
                                                                <CountUp duration={1}
                                                                        separator=" "
                                                                        decimal="," end={
                                                                        Math.round(
                                                                            (this.state.estimation.estimation.toFixed() *
                                                                            (1 + (this.state.estimation.variateur / 100))) /
                                                                            1000
                                                                        ) * 1000
                                                                    } /> MAD
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="priceBarBar"></div>
                                                    </div>

                                                    <div className = "transactionCaracteristics">
                                        <h5>Caractéristiques</h5>
                                        {this.state.estimation.bien && this.state.estimation.bien === 'appartement' ?  
                                        (
                                            <div className = "row">
                                                <div className = "col-md-6">
                                                    {this.state.estimation.address ? 
                                                    (<p className="details-bien"> <span className ="details-bien-title">Adresse :</span> {this.state.estimation.address}</p>)
                                                    : '' }

                                                    {this.state.estimation.agencement ? 
                                                    (<p className="details-bien"> <span className ="details-bien-title">Agencement : </span> 
                                                    {this.state.estimation.agencement === 1 ?
                                                    (
                                                        <div className="">
                                                            <img src={filledStar} alt='star'></img>
                                                            <img src={filledNotStar} alt='star'></img>
                                                            <img src={filledNotStar} alt='star'></img>
                                                            <img src={filledNotStar} alt='star'></img>
                                                        </div>
                                                    ): 
                                                    this.state.estimation.agencement === 2 ?
                                                        (
                                                            <div className="">
                                                                <img src={filledStar} alt='star'></img>
                                                                <img src={filledStar} alt='star'></img>
                                                                <img src={filledNotStar} alt='star'></img>
                                                                <img src={filledNotStar} alt='star'></img>
                                                            </div>
                                                        ):
                                                        this.state.estimation.agencement === 3 ?
                                                        (
                                                            <div className="">
                                                                <img src={filledStar} alt='star'></img>
                                                                <img src={filledStar} alt='star'></img>
                                                                <img src={filledStar} alt='star'></img>
                                                                <img src={filledNotStar} alt='star'></img>
                                                            </div>
                                                        ):
                                                        this.state.estimation.agencement === 4 ?
                                                        (
                                                            <div className="">
                                                                <img src={filledStar} alt='star'></img>
                                                                <img src={filledStar} alt='star'></img>
                                                                <img src={filledStar} alt='star'></img>
                                                                <img src={filledStar} alt='star'></img>
                                                            </div>
                                                        ): ''}
                                                    </p>)
                                                    : '' }
                                                    {this.state.estimation.ascenseur !== undefined? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Ascenceur : </span> {this.state.estimation.ascenseur === 1 ? 'Oui' : 'Non'}</p>)
                                                    : '' }
                                                    {this.state.estimation.balcon !== undefined ? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Balcon : </span> {this.state.estimation.balcon === 1 ? 'Oui' : 'Non'}</p>)
                                                    : '' }
                                                    {this.state.estimation.calme !== undefined? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Calme : </span> {this.state.estimation.calme === 1 ? 'Oui' : 'Non'}</p>)
                                                    : '' }
                                                    {this.state.estimation.cave !== undefined? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Cave : </span> {this.state.estimation.cave === 1 ? 'Oui' : 'Non'}</p>)
                                                    : '' }

                                                    {this.state.estimation.chambreservice !== undefined? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Chambre de service : </span> {this.state.estimation.chambreservice === 1 ? 'Oui' : 'Non'}</p>)
                                                    : '' }
                                                    {this.state.estimation.cheminee !== undefined? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Cheminée : </span> {this.state.estimation.cheminee === 1 ? 'Oui' : 'Non'}</p>)
                                                    : '' }
                                                    {this.state.estimation.concierge !== undefined? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Concierge : </span> {this.state.estimation.concierge === 1 ? 'Oui' : 'Non'}</p>)
                                                    : '' }
                                                    {this.state.estimation.construction ? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Construction : </span> {
                                                        this.state.estimation.construction === -1 ?
                                                        ('Je ne sais pas') :
                                                        this.state.estimation.construction === 0 ?
                                                        ('Moins de 5 ans'):
                                                        this.state.estimation.construction === 1 ?
                                                        ('Entre 10 et 20 ans'):
                                                        this.state.estimation.construction === 2 ?
                                                        ('Plus de 20 ans'):
                                                        this.state.estimation.construction === 3 ?
                                                        ('Moins de 10 ans'):
                                                        ('Construction neuve')
                                                        }</p>)
                                                    : '' }
                                                    {this.state.estimation.dateTransactions ? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Date de la transaction : </span> {this.state.estimation.dateTransactions}</p>)
                                                    : '' }
                                                    {this.state.estimation.duplex !== undefined? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Duplex : </span> {this.state.estimation.duplex === 1 ? 'Oui' : 'Non'}</p>)
                                                    : '' }
                                                    {this.state.estimation.etage !== undefined? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Etage : </span>{ this.state.estimation.etage}</p>)
                                                    : '' }
                                                    {/* {this.state.estimation.etagesimmeuble !== undefined? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Etage immeuble : </span> {this.state.estimation.etagesimmeuble === 1 ? 'Oui' : 'Non'}</p>)
                                                    : '' } */}
                                                    {this.state.estimation.finition ? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Finition : </span> 
                                                    {this.state.estimation.finition === 'correct' ? ('Correcte') :
                                                    this.state.estimation.finition === 'travauxaprevoir' ? ('Travaux à prévoir') :
                                                    this.state.estimation.finition === 'refaitaneuf' ? ('Refait à neuf') : ''
                                                    }</p>)
                                                    : '' }
                                                </div>

                                                <div className = "col-md-6">
                                                    
                                                    {this.state.estimation.luminosite ? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Luminosité : </span> 
                                                    {this.state.estimation.luminosite === 1 ?
                                                    (
                                                        <div className="">
                                                            <img src={filledStar} alt='star'></img>
                                                            <img src={filledNotStar} alt='star'></img>
                                                            <img src={filledNotStar} alt='star'></img>
                                                            <img src={filledNotStar} alt='star'></img>
                                                        </div>
                                                    ): 
                                                    this.state.estimation.luminosite === 2 ?
                                                        (
                                                            <div className="">
                                                                <img src={filledStar} alt='star'></img>
                                                                <img src={filledStar} alt='star'></img>
                                                                <img src={filledNotStar} alt='star'></img>
                                                                <img src={filledNotStar} alt='star'></img>
                                                            </div>
                                                        ):
                                                        this.state.estimation.luminosite === 3 ?
                                                        (
                                                            <div className="">
                                                                <img src={filledStar} alt='star'></img>
                                                                <img src={filledStar} alt='star'></img>
                                                                <img src={filledStar} alt='star'></img>
                                                                <img src={filledNotStar} alt='star'></img>
                                                            </div>
                                                        ):
                                                        this.state.estimation.luminosite === 4 ?
                                                        (
                                                            <div className="">
                                                                <img src={filledStar} alt='star'></img>
                                                                <img src={filledStar} alt='star'></img>
                                                                <img src={filledStar} alt='star'></img>
                                                                <img src={filledStar} alt='star'></img>
                                                            </div>
                                                        ): ''
                                                    }</p>)
                                                    : '' }
                                                    {this.state.estimation.orientation ? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Orientation : </span> {this.state.estimation.orientation}</p>)
                                                    : '' }
                                                    {this.state.estimation.parking !== undefined? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Parking : </span> {this.state.estimation.parking === 1 ? 'Oui' : 'Non'}</p>)
                                                    : '' }
                                                    {this.state.estimation.placesparking !== undefined ? (
                                                        this.state.estimation.parking === 1 ? (
                                                            <p className="details-bien"><span className ="details-bien-title"> Place de parking : </span> {this.state.estimation.placesparking}</p>
                                                        ) : '' 
                                                    ) : '' }
                                                    {this.state.estimation.prix ? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Prix : </span> 
                                                    { new Intl.NumberFormat(
                                                        'ma',
                                                        {
                                                            style: 'currency',
                                                            currency: 'MAD',
                                                            minimumFractionDigits: 0,
                                                            maximumFractionDigits: 0
                                                        })
                                                        .format(this.state.estimation.prix)
                                                        .replaceAll(',', ' ') } </p>)
                                                    : '' }
                                                    {this.state.estimation.redejardin !== undefined? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Rez de jardin : </span> {this.state.estimation.redejardin === 'non' ? 'Non' : 'Oui collectif'}</p>)
                                                    : '' }
                                                    {this.state.estimation.renovee !== undefined? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Rénovée : </span> {this.state.estimation.renovee === 1 ? 'Oui' : 'Non'}</p>)
                                                    : '' }
                                                    {this.state.estimation.residencefermee !== undefined? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Residence fermée : </span> {this.state.estimation.residencefermee === 1 ? 'Oui' : 'Non'}</p>)
                                                    : '' }
                                                    {this.state.estimation.bien === 'appartement' ? (
                                                    this.state.estimation.sdb !== undefined? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Salles de bain : </span> {this.state.estimation.sdb}</p>)
                                                    : ('' )
                                                    ) : ('')}
                                                    {this.state.estimation.surfacebalcon !== undefined? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Surface du balcon : </span> {this.state.estimation.surfacebalcon}</p>)
                                                    : '' }
                                                    {this.state.estimation.surfacecave !== undefined? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Surface de la cave : </span> {this.state.estimation.surfacecave} m²</p>)
                                                    : '' }
                                                    {this.state.estimation.surfacehabitable !== undefined? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Surface habitable : </span> {this.state.estimation.surfacehabitable} m²</p>)
                                                    : '' }
                                                    {this.state.estimation.surfaceparking ? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Surface du parking : </span> {this.state.estimation.surfaceparking} m²</p>)
                                                    : '' }
                                                    {this.state.estimation.typologie ? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Nombre de chambres : </span> {this.state.estimation.typologie}</p>)
                                                    : '' }
                                                    {this.state.estimation.vueexceptionnelle !== undefined? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Vue exceptionnelle : </span> {this.state.estimation.vueexceptionnelle === 1 ? 'Oui' : 'Non'}</p>)
                                                    : '' }
                                                </div>
                                            </div>
                                        ) 
                                        : this.state.estimation.bien && this.state.estimation.bien === 'villa' ? 
                                        (
                                            <div className = "row">
                                            <div className = "col-md-6">
                                                {this.state.estimation.address ? 
                                                (<p className="details-bien"><span className ="details-bien-title"> Adresse : </span> {this.state.estimation.address}</p>)
                                                : '' }
                                                {this.state.estimation.construction ? 
                                                (<p className="details-bien"><span className ="details-bien-title"> Année de construction : </span> 
                                                {this.state.estimation.construction === -1 ?
                                                        ('Je ne sais pas') :
                                                        this.state.estimation.construction === 0 ?
                                                        ('Moins de 5 ans'):
                                                        this.state.estimation.construction === 1 ?
                                                        ('Entre 10 et 20 ans'):
                                                        this.state.estimation.construction === 2 ?
                                                        ('Plus de 20 ans'):
                                                        this.state.estimation.construction === 3 ?
                                                        ('Moins de 10 ans'):
                                                        ('Construction neuve')
                                                }</p>)
                                                : '' }
                                                {this.state.estimation.calme !== undefined? 
                                                (<p className="details-bien"><span className ="details-bien-title"> Calme : </span> {this.state.estimation.calme === 1 ? 'Oui' : 'Non'}</p>)
                                                : '' }
                                                {this.state.estimation.chaufeausolaire !== undefined? 
                                                (<p className="details-bien"><span className ="details-bien-title"> Chauffe eau solaire : </span> {this.state.estimation.chaufeausolaire === 1 ? 'Oui' : 'Non'}</p>)
                                                : '' }
                                                {this.state.estimation.cheminee !== undefined? 
                                                (<p className="details-bien"><span className ="details-bien-title"> Cheminée : </span> {this.state.estimation.cheminee === 1 ? 'Oui' : 'Non'}</p>)
                                                : '' }
                                                {this.state.estimation.dateTransactions ? 
                                                (<p className="details-bien"><span className ="details-bien-title"> Date de la transaction : </span> {this.state.estimation.dateTransactions}</p>)
                                                : '' }
                                                {this.state.estimation.etatgeneral ? 
                                                (<p className="details-bien"><span className ="details-bien-title"> Etat géneral : </span> 
                                                {this.state.estimation.etatgeneral === 'travauxaprevoir' ?
                                                ('Travaux à prévoir') : 
                                                this.state.estimation.etatgeneral === 'correct' ?
                                                ('Correct') :
                                                ('Etat neuf') 
                                                }</p>)
                                                : '' }
                                                {this.state.estimation.garage !== undefined? 
                                                (<p className="details-bien"><span className ="details-bien-title"> Garage : </span> {this.state.estimation.garage === 1 ? 'Oui' : 'Non'}</p>)
                                                : '' }
                                                {this.state.estimation.murmitoyen !== undefined? 
                                                (<p className="details-bien"><span className ="details-bien-title"> Murs mitoyens : </span> {this.state.estimation.murmitoyen === 1 ? 'Oui' : 'Non'}</p>)
                                                : '' }
                                            </div>

                                            <div className = "col-md-6">
                                                
                                            
                                                {this.state.estimation.piscine !== undefined? 
                                                (<p className="details-bien"><span className ="details-bien-title"> Piscine : </span> {this.state.estimation.piscine === 1 ? 'Oui' : 'Non'}</p>)
                                                : '' }
                                                {this.state.estimation.prix ? 
                                                (<p className="details-bien"><span className ="details-bien-title"> Prix : </span>
                                                { new Intl.NumberFormat(
                                                        'ma',
                                                        {
                                                            style: 'currency',
                                                            currency: 'MAD',
                                                            minimumFractionDigits: 0,
                                                            maximumFractionDigits: 0
                                                        })
                                                        .format(this.state.estimation.prix)
                                                        .replaceAll(',', ' ') } 
                                                </p>)
                                                : '' }
                                                
                                                {this.state.estimation.bien === 'appartement' ? (
                                                    this.state.estimation.sdb !== undefined? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Salles de bain : </span> {this.state.estimation.sdb}</p>)
                                                    : ('' )
                                                    ) : ('')}
                                                {this.state.estimation.surfaceconstruite !== undefined? 
                                                (<p className="details-bien"><span className ="details-bien-title"> Surface construite : </span> {this.state.estimation.surfaceconstruite} m²</p>)
                                                : '' }
                                                {this.state.estimation.surfaceterrain !== undefined? 
                                                (<p className="details-bien"><span className ="details-bien-title"> Surface du terrain : </span> {this.state.estimation.surfaceterrain} m²</p>)
                                                : '' }
                                                {this.state.estimation.typechauffage ? 
                                                (<p className="details-bien"><span className ="details-bien-title"> Type de chauffage : </span> 
                                                {this.state.estimation.typechauffage === -1 ?
                                                ('Je ne sais pas') :
                                                this.state.estimation.typechauffage === 0 ?
                                                ('Electrique') :
                                                this.state.estimation.typechauffage === 1 ?
                                                ('Chaudière centrale au fuel') :
                                                this.state.estimation.typechauffage ===   2 ?
                                                ('Chaudière centrale au gaz') : ('Pompe à chaleur')

                                                }</p>)
                                                : '' }
                                                {this.state.estimation.murmitoyen ? (
                                                this.state.estimation.typevilla ? 
                                                (<p className="details-bien"><span className ="details-bien-title"> Type de villa : </span> 
                                                {this.state.estimation.typevilla === 'villajumelee' ?
                                                ('Villa jumelée') : ('Villa en bande')
                                                }</p>)
                                                : '' )
                                                : ("")}
                                                {this.state.estimation.typologie ? 
                                                (<p className="details-bien"><span className ="details-bien-title"> Nombre de chambres : </span> {this.state.estimation.typologie}</p>)
                                                : '' }
                                                {this.state.estimation.vueexceptionnelle ? 
                                                (<p className="details-bien"><span className ="details-bien-title"> Sans vis-à-vis : </span> {this.state.estimation.vueexceptionnelle === 1 ? 'Oui' : 'Non'}</p>)
                                                : '' }
                                            </div>
                                        </div>
                                        ) 
                                        : (
                                            <div className = "row">

                                                <div className = "col-md-6">
                                                {this.state.estimation.address ? 
                                                (<p className="details-bien"><span className ="details-bien-title"> Adresse : </span> {this.state.estimation.address}</p>)
                                                : '' }
                                                {this.state.estimation.construction ? 
                                                (<p className="details-bien"><span className ="details-bien-title"> Année de construction : </span> {this.state.estimation.construction}</p>)
                                                : '' }
                                                {this.state.estimation.dateTransactions ? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Date de la transaction : </span> {this.state.estimation.dateTransactions}</p>)
                                                : '' }
                                                {this.state.estimation.etage !== undefined? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Etage : </span> {this.state.estimation.etage}</p>)
                                                : '' }
                                                
                                                </div>

                                                <div className = "col-md-6">
                                                {this.state.estimation.prix !== undefined? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Prix : </span> 
                                                    { new Intl.NumberFormat(
                                                        'ma',
                                                        {
                                                            style: 'currency',
                                                            currency: 'MAD',
                                                            minimumFractionDigits: 0,
                                                            maximumFractionDigits: 0
                                                        })
                                                        .format(this.state.estimation.prix)
                                                        .replaceAll(',', ' ') }
                                                    </p>
                                                    )
                                                : '' }
                                                {this.state.estimation.surface !== undefined? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Suface : </span> {this.state.estimation.surface} m²</p>)
                                                : '' }

                                                {this.state.estimation.surfaceParking !== undefined? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Suface de parking : </span> {this.state.estimation.surfaceParking} m²</p>)
                                                : '' }

                                                {this.state.estimation.surfaceTerrasse !== undefined? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Suface de de la terrasse : </span> {this.state.estimation.surfaceTerrasse} m²</p>)
                                                : '' }
                                                </div>
                                            </div>
                                        )
                                        }
                    
                
                                    </div>
                                                </div>
                                            </div>
                                            
                                        </div>
                                        <div className="information-results">
                                            <div>
                                                <h5>Comment est calculée votre estimation ?</h5>
                                            </div>
                                            <div className="explanations-display">
                                                <div className="explanations-display--icon">
                                                    <img src={dataBlue} alt="Estimation de bien immobilier en ligne" className="desktop"></img>
                                                    <img src={dataBlue} alt="Estimation de bien immobilier en ligne" className="ipad"></img>
                                                    <img src={dataBlue} alt="Estimation de bien immobilier en ligne"  className="mobile"></img>
                                                </div>
                                                <div className="explanations-display--title">
                                                    Quelques milliers de données analysées
                                                </div>
                                                <div className="explanations-display--text">
                                                    Nos bases de données sont mises à jour régulièrement, et sont constituées de milliers de transactions fournies par nos partenaires, mais également d'information socio-démographiques de secteur influençant le marché local. L'équipe d'Agenz s'efforce quotidiennement d'enrichir ses bases de données et de développer de nouveaux outils pour apporter toujours plus de transparence sur le marché
                                                </div>
                                            </div>
                                            <div className="explanations-display">
                                                <div className="explanations-display--icon">
                                                    <img src={houseBlue} alt={"maison bleu"} className="desktop"></img>
                                                    <img src={houseBlue} alt={"maison bleu"} className="ipad"></img>
                                                    <img src={houseBlue} alt={"maison bleu"} className="mobile"></img>
                                                </div>
                                                <div className="explanations-display--title">
                                                    Notre algorithme estime votre bien
                                                </div>
                                                <div className="explanations-display--text">
                                                    Grâce à des algorithmes de Machine Learning, AgenZ calcule un prix au m2 correspondant à la localisation et à la consistance du bien immobilier qui vous intéresse. Ce prix au m2 est affiné suivant les caractéristiques du bien renseigné dans le formulaire. Cette première estimation servira à vous donner une vision précise des prix pratiqués dans votre secteur, pour vous aider à établir un budget cohérent et réussir votre projet immobilier dans un délai raisonnable
                                                </div>
                                            </div>
                                            <div className="explanations-display">
                                                <div className="explanations-display--icon">
                                                    <img src={successBlue} alt="Estimation de bien immobilier en ligne"  className="desktop"></img>
                                                    <img src={successBlue} alt="Estimation de bien immobilier en ligne"  className="ipad"></img>
                                                    <img src={successBlue} alt="Estimation de bien immobilier en ligne"  className="mobile"></img>
                                                </div>
                                                <div className="explanations-display--title">
                                                    Réussir votre estimation
                                                </div>
                                                <div className="explanations-display--text">
                                                Notre estimation en ligne ne peut se substituer à la visite d'un expert de l'immobilier, qui tiendra compte de critères ne pouvant être intégrés dans nos modèles (potentiel de développement de la zone, diagnostiques techniques du bien,...). Nous avons pour cela noué des partenariats avec les professionnels les plus performants et les plus fiables du marché pour faire de votre projet une réussite
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                        </div>
                                    </div>
                                </div>
                        </div>
                        </div>
                    </div>
                </div>) : ('')
            }
            </>
        );
    }
}

export default PublicEstimations;
