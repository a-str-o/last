import React, { Component, Suspense, lazy } from 'react';
import { connect } from "react-redux";
import mapboxgl from 'mapbox-gl';
import marker from '../../assets/img/markerNew.png';
import redmarker from '../../assets/img/redMarker.png';
import logo_agenz_white from '../../assets/img/logo_agenz_white.jpeg'
import './CardComponent.scss'; 
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { CSSTransition } from 'react-transition-group';


import Axios from 'axios'
import { withStyles, createStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import RoomIcon from '@material-ui/icons/Room';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import BuildIcon from '@material-ui/icons/Build';
import AddToQueueIcon from '@material-ui/icons/AddToQueue';
import CDPVilla from "./carte_des_prix_2021-02-02_villa.json"
import TextField from '@material-ui/core/TextField';
import MuiPhoneNumber from "material-ui-phone-number";
import { ThemeProvider } from '@material-ui/core/styles';
import {theme} from '../../assets/theme'
import{
    geocodeByAddress,
    getLatLng
} from "react-places-autocomplete";
import Loading from "../../Loading"

function retry(fn, retriesLeft = 10, interval = 1000) {
    return new Promise((resolve, reject) => {
      fn()
        .then(resolve)
        .catch((error) => {
          setTimeout(() => {
            if (retriesLeft === 1) {
              // reject('maximum retries exceeded');
              reject(error);
              return;
            }
  
            // Passing on "reject" is the important part
            retry(fn, retriesLeft - 1, interval).then(resolve, reject);
          }, interval);
        });
    });
  }
  
const PriceCard =lazy(() => retry(()=> import ('./PriceCard')));
const PriceInfoComponent =lazy(() => retry(()=> import ('../PricingRightSide/PriceInfoComponent')));
const AgenceComponentInCard =lazy(() => retry(()=> import ('../AgenceComponent/AgenceComponentInCard')));
const CardComponentCarouselInCard =lazy(() => retry(()=> import ('./components/CardComponentCarouselInCard')));



const styles = theme => createStyles({ // change to this
    paperWidthSm:     {
        maxWidth : '90vw',
        width: '90vw',
    height: '90vh',
    backgroundColor: '#f2f3f4'
},
root : {
    marginTop : '0px !important',
    marginBottom : '0px !important'
}
});
var map;

class CardComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            polygones: [],
            meanCartier: [],
            transactions: [],
            moreInfo: false,
            name: null,
            email: null,
            phone: null,
            nameError: null,
            emailError: null,
            phoneError: null,
            selectedId: null,
            polygonesShow: true,
            transactionShow: true,
            placesShow: true,
            zoom : this.props.zoom,
            phoneDisplay : false,
            message :"Bonjour, j'ai un projet de vente et je souhaite prendre rendez-vous pour faire estimer mon bien. Merci.",
            coordinates: {
                lat: null,
                lng: null
            },
            loadingMap : true,
        }
    }
    
    

    handleChangeTransactions(status) {
        let mapLayer = null
        if (status === true) {
            mapLayer = map.getLayer('points');
            if(typeof mapLayer === 'undefined') {
                map.addLayer({
                    'id': 'points',
                    'type': 'symbol',
                    'source': 'points',
                    'cluster': false,
                    'layout': {
                        'icon-image': 'custom-marker',
                        'text-offset': [0, 0.5],
                        'text-anchor': 'top',
                        "icon-allow-overlap": true
                    }
                });
            }
        } else {
            mapLayer = map.getLayer('points');
            if(typeof mapLayer !== 'undefined') {
                map.removeLayer('points');
            }
        }
        this.setState({
            ...this.state,
            transactionShow: this.state.transactionShow === true ? false : true
        })
    }
    handleChangeAgences(status) {
        let mapLayer = null
        if (status === true) {
            mapLayer = map.getLayer('pointsAgences');
            if(typeof mapLayer === 'undefined') {
                map.addLayer({
                    'id': 'pointsAgences',
                    'type': 'symbol',
                    'source': 'pointsAgences',
                    'cluster': false,
                    'layout': {
                        'icon-image': 'custom-marker-agence',
                        'text-offset': [0, 0.5],
                        'text-anchor': 'top',
                        "icon-allow-overlap": true
                    }
                });
            }
        } else {
            mapLayer = map.getLayer('pointsAgences');
            if(typeof mapLayer !== 'undefined') {
                map.removeLayer('pointsAgences');
            }
        }
        this.setState({
            ...this.state,
            placesShow: this.state.placesShow === true ? false : true
        })
    }

    handleChangeInterest(status) {
        // transactions
        if (status === true) {
            map.setLayoutProperty('poi-label', 'visibility', 'visible');
        } else {
            map.setLayoutProperty('poi-label', 'visibility', 'none');
        }
        this.setState({
            ...this.state,
            placesShow: this.state.placesShow === true ? false : true
        })
    }

    handleChangePolygones(status) {
        let mapLayer = null
        if (status === true) {
            mapLayer = map.getLayer('card-fill');
            if(typeof mapLayer === 'undefined') {
                map.addLayer({
                    'id': 'card-fill',
                    'type': 'fill',
                    'source': 'card-map',
                    'layout': {},
                    'paint': {
                        'fill-color': ['get', 'color'],
                        'fill-opacity': 0.8
                    }
                }, 'road-street');
                map.addLayer({
                    'id': 'card-fill-overlay',
                    'type': 'fill',
                    'source': 'card-overlay',
                    'layout': {},
                    'paint': {
                        'fill-color': ['get', 'color'],
                        'fill-opacity': 0
                    }
                });
            }
        } else {
            mapLayer = map.getLayer('card-fill');
            if(typeof mapLayer !== 'undefined') {
                map.removeLayer('card-fill');
                map.removeLayer('card-fill-overlay');
            }
        }
        this.setState({
            ...this.state,
            polygonesShow: this.state.polygonesShow === true ? false : true
        })
    }

    closeModal = () => {
        this.setState({
            ...this.state,
            moreInfo: false,
            selectedId: null,
            selectedTransaction: null,
            agenceTransaction: null
        })
    }

    openModal(id){
        if (document.fullscreenElement) {
            document.exitFullscreen();
        }
        this.setState({
            ...this.state,
            moreInfo: true,
            selectedId: id,
            selectedTransaction: this.props.transactions.filter(el => el.transactionId === id)[0],
            agenceTransaction: this.props.agences.filter(agence => agence.responsable === this.props.transactions.filter(el => el.transactionId === id)[0].contributeurId)[0]
        })
    }

    async getCompanyInfo(email) {
        // let user = null;
        Axios.post('https://us-central1-agenz-website-prod.cloudfunctions.net/api/getCompanyInfo',{ email: email }).then(result => {
        return result.data
    })
}
    //     const userDocs = await db.collection('users').where('email', '==', email).get();
    //     let user = null;
    //     if (userDocs.docs[0]) {
    //         user = userDocs.docs[0].data();   
    //     }
    //     return user;
    // }

    mapInit() {
        mapboxgl.accessToken = this.props.config.mapboxglKey;
        map = new mapboxgl.Map({
            container: document.getElementById('mapBoxContainer'),
            // style: 'mapbox://styles/badrbelkeziz/ckkd3atwt2anx17psnnxum19f',
            style: 'mapbox://styles/badrbelkeziz/cklp41snu5xna17qn57uky0kg',
            // style:'mapbox://styles/mapbox/navigation-preview-day-v4',
            center: [-7.642453899128722,33.57371858431616],
            pitch: 0,
            zoom: this.props.zoom,
            minZoom: 10
        })

        map.addControl(new mapboxgl.FullscreenControl());
        // this.buildpolygonesLayer();
        this.buildPolygoneOverlay();
        this.buildCommunesPolygoneOverlay();

        this.buildAgencesLayer();
        this.buildTransactionsLayer();

        

         map.on('zoom', () =>  {
            // this.setState({zoom : map.getZoom()})
            this.props.dispatch({type :"SET_ZOOM" ,data : map.getZoom()})
                if (map.getZoom() > 11) {
                    map.setLayoutProperty('poly-fills', 'visibility', 'visible')
                    map.setLayoutProperty('poly-borders', 'visibility', 'visible');
                    map.setLayoutProperty('state-fills', 'visibility', 'none')
                    map.setLayoutProperty('state-borders', 'visibility', 'none');
                    map.setLayoutProperty('points', 'visibility', 'visible')
                    map.setLayoutProperty('points', 'visibility', 'visible');
                    
                }
                 else {
                    map.setLayoutProperty('poly-fills', 'visibility', 'none')
                    map.setLayoutProperty('poly-borders', 'visibility', 'none');
                    map.setLayoutProperty('state-fills', 'visibility', 'visible')
                    map.setLayoutProperty('state-borders', 'visibility', 'visible');
                    // map.setLayoutProperty('points', 'visibility', 'none')
                    // map.setLayoutProperty('points', 'visibility', 'none');
                }
                if (map.getZoom() > 14) {
                    // map.setLayoutProperty('poly-fills', 'visibility', 'none');
                    // map.setLayoutProperty('state-fills', 'visibility', 'none');
                    map.setLayoutProperty('points', 'visibility', 'visible');
                    map.setLayoutProperty('points', 'visibility', 'visible');

                }

        }); 
        map.on('click', 'poly-fills', (e) =>  {
            map.flyTo({
                center: e.lngLat,
                zoom : 14.1
                });
            this.setState({price : e.features[0].properties.prix})
            let zone = e.features[0].properties.zone
            this.setState({price_villa : parseFloat(CDPVilla[0][zone])})
            this.props.dispatch({type : "SET_ACTIVE_ZONE", data : {id : e.features[0].id, prix : e.features[0].properties.prix}})
            if(CDPVilla[0][zone]){
            this.props.dispatch({type : "SET_ACTIVE_ZONE_VILLA", data : {id : e.features[0].id, prix : CDPVilla[0][zone]}})
            }
            else {
                            this.props.dispatch({type : "SET_ACTIVE_ZONE_VILLA", data : {id : e.features[0].id, prix : 0}})

            }

        })
        map.on('click', 'state-fills', (e) =>  {
            this.props.dispatch({type : "SET_ACTIVE_COMMUNE", data : {commune : e.features[0].properties.areaLabel, prix : e.features[0].properties.prix,prixVilla : 0}})
        })
    }

    buildTransactionsLayer(){
        let transactions = this.props.transactions
        map.on('load', async () => {
            const markersData = [];

            await new Promise((resolve) => {
                transactions.forEach( async element => {      
                    // //console.log(element);
                    // const companyInfo = await this.getCompanyInfo(element.contributeur);
                    //Replace undesirable characters
                    var remplaceSomeCharsInmarkersData = element.coordinates.replace('lat : ', '').replace('lng : ', '').replace('}', '');     
                    var splitransC = remplaceSomeCharsInmarkersData.split(' ');
                    var long = splitransC[0]
                    var lat = splitransC[1]
                    // var lat = element.coordinates[0];
                    // var long = element.coordinates[1];
                    let contributeurId = element.contributeurId
                    
                    let nameEntreprise = this.props.agences.filter(agence => {
                        return agence.responsable===contributeurId
                    })[0].nameEntreprise
                    markersData.push(
                        {
                            'type': 'Feature',
                            'geometry': {
                            'type': 'Point',
                            'coordinates': [lat, long]
                            },
                            'properties': {
                                'description': `
                                <div style="
                                    width: 40%;
                                    height:128px;
                                    background-image: url('${(element.images && element.images.length > 0) ? element.images[0] : logo_agenz_white}');
                                    background-size: cover;
                                    background-position: center center
                                ">
                                </div>
                                <div class="polygone-infos" id="popup-transactions" style="
                                    text-align: left;
                                    display: flex;
                                    flex-direction: column;
                                    justify-content: center;
                                    align-items: flex-start;
                                ">
                                    <div className="popup-title" style="color: #1c1c1c;text-align: left;">
                                    <p class="consistance"> ${element.consistance} </p>
                                    </div>
                                    <div className="polygone-price" style="font-weight: 400;margin-top: 0px;text-align:left;padding-top: 10px;font-size: 13px;">
                                        </div>
                                        <div  style="font-weight: 400; font-size: 13px;">
                                        <a class="agence--added" href="https://agenz.ma/agence-immobiliere/casablanca/${nameEntreprise.replace(/ /g, '-').replace(/é/g, 'e').replace(/ô/g, 'o')}/a/${element.contributeurId}" target="_blank" rel="noreferrer" > Ajouté par ${nameEntreprise} </a>
                                        </div>
                                        <div  style="font-weight: 400; font-size: 13px;">
                                        <p class="date--vente">Vendu en ${element.dateTransactions} </p>
                                        </div>
                                        <div style="font-size: 13px;margin-top: 10px;color: #1e326e;font-weight: 600;cursor: pointer;" id="pro-button-activate">
                                        <span class="get--price">Obtenir le prix </span><span id="transaction-id" style="opacity: 0; position: absolute; height: 0px;">${element.transactionId}</span>
                                        </div>
                                    </div>
                                </div>`
                            }
                        }
                    );
                    if (transactions.length === markersData.length) {
                        resolve();
                    }
                });
            });
    
            map.loadImage(
            marker,
            (error, image) => {
                if (error) throw error;
                map.addImage('custom-marker', image);
                map.addSource('points', {
                    'type': 'geojson',
                    'cluster': false,
                    'data': {
                    'type': 'FeatureCollection',
                    'features': markersData
                    }
                });
                map.addLayer(
                    {
                        'id': 'points',
                        'type': 'symbol',
                        'source': 'points',
                        'cluster': false,
                        'layout': {
                            'icon-image': 'custom-marker',
                            'text-offset': [0, 0.5],
                            'text-anchor': 'top',
                            "icon-allow-overlap": true
                        }
                    }
                );
                // map.setLayoutProperty('points', 'visibility', 'none')
                // map.setLayoutProperty('points', 'visibility', 'none');
                
                var popup = new mapboxgl.Popup({
                    id: 'display-info',
                    closeButton: true,
                    closeOnMove: false,
                });

                map.on('click', 'points', (e) => {
                if (map.getZoom()>13){
                    map.getCanvas().style.cursor = 'pointer';
                    var coordinates = e.features[0].geometry.coordinates.slice();
                    var description = e.features[0].properties.description;
                    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                    }

                    popup
                    .setLngLat(coordinates)
                    .setHTML(description)
                    .addTo(map);


                    // trigger the pro signup dialog
                    // console.log(document.getElementById('pro-button-activate'))
                    document.getElementById('pro-button-activate').addEventListener('click', (e) => { 
                        const id = document.getElementById('transaction-id').innerText;
                        console.log(id)
                        // //console.log(id);
                        this.openModal(id);
                        popup.remove();

                    })

                    // closes popup
                    document.getElementsByClassName('mapboxgl-popup')[0].addEventListener('mouseleave', () => {
                        popup.remove();
                    })
                }
                });

                map.on('mouseenter', 'points', (e) => {
                if (map.getZoom()>13){
                    map.getCanvas().style.cursor = 'pointer';
                    var coordinates = e.features[0].geometry.coordinates.slice();
                    var description = e.features[0].properties.description;
                    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                    }
                    popup
                    .setLngLat(coordinates)
                    .setHTML(description)
                    .addTo(map);
                    // console.log(document.getElementById('pro-button-activate'))



                    // trigger the pro signup dialog
                    document.getElementById('pro-button-activate').addEventListener('click', (e) => { 
                        const id = document.getElementById('transaction-id').innerText;
                        // //console.log(id);
                        this.openModal(id);
                        popup.remove();

                    })

                    // closes popup
                    document.getElementsByClassName('mapboxgl-popup')[0].addEventListener('mouseleave', () => {
                        popup.remove();
                    })
                }
                });

                // checks that the user exits by another way than on the popup
                // map.on('mouseleave', 'points', function (e) {
                //     var onPopUp = false;
                //     if (e.originalEvent.relatedTarget) {
                //         if (e.originalEvent.relatedTarget.className === 'mapboxgl-popup-content') {
                //             onPopUp = true;
                //         }
                //     }
                //     // if (!onPopUp) {
                //     //     popup.remove();   
                //     // }
                // });

            });
        })
      

  
    }



    buildAgencesLayer(){
        let agences = this.props.agences
        map.on('load', async () => {
            const markersDataAgence = [];

            await new Promise((resolve) => {
                agences.forEach( async element => {      
                    // //console.log(element);
                    // const companyInfo = await this.getCompanyInfo(element.contributeur);
                    //Replace undesirable characters
                    let long = null
                    let lat = null
                    if (element.localisation){
                    var remplaceSomeCharsInmarkersDataAgence = element.localisation.replace('lat : ', '').replace('lng : ', '').replace('}', '');     
                    var splitransC = remplaceSomeCharsInmarkersDataAgence.split(' ');
                     long = splitransC[0]
                     lat = splitransC[1]
                    }
                    else{ long = 0; lat = 0}
                    // var lat = element.coordinates[0];
                    // var long = element.coordinates[1];
                    
                    let nameEntreprise = element.nameEntreprise
                    markersDataAgence.push(
                        {
                            'type': 'Feature',
                            'geometry': {
                            'type': 'Point',
                            'coordinates': [lat, long]
                            },
                            'properties': {
                                'description': `
                                <div style="
                                    width: 40%;
                                    height:128px;
                                    background-image: url('${element.user_image  ? element.user_image : logo_agenz_white}');
                                    background-size: cover;
                                    background-position: center center
                                ">
                                </div>
                                <div class="polygone-infos" id="popup-transactions" style="
                                    text-align: left;
                                    display: flex;
                                    flex-direction: column;
                                    justify-content: center;
                                    align-items: flex-start;
                                ">
                                    <div className="popup-title" style="color: #1c1c1c;text-align: left;">
                                    <p class="consistance"> ${element.nameEntreprise} </p>
                                    </div>
                                    <div className="polygone-price" style="font-weight: 400;margin-top: 0px;text-align:left;padding-top: 10px;font-size: 13px;">
                                        </div>
                                        <div  style="font-weight: 400; font-size: 13px;">
                                        <a class="agence--added" href="https://agenz.ma/agence-immobiliere/casablanca/${nameEntreprise.replace(/ /g, '-').replace(/é/g, 'e').replace(/ô/g, 'o')}/a/${element.contributeurId}" target="_blank" rel="noreferrer" > Voir la vitrine </a>
                                        </div>
                                        <div  style="font-weight: 400; font-size: 13px;">
                                        <p class="date--vente">${element.countTransactions} ventes ajoutées</p>
                                        </div>
                                    </div>
                                </div>`
                            }
                        }
                    );
                    if (agences.length === markersDataAgence.length) {
                        resolve();
                    }
                });
            });
        
            map.loadImage(
            redmarker,
            (error, image) => {
                if (error) throw error;
                map.addImage('custom-marker-agence', image);
                map.addSource('pointsAgences', {
                    'type': 'geojson',
                    'cluster': false,
                    'data': {
                    'type': 'FeatureCollection',
                    'features': markersDataAgence
                    }
                });
                map.addLayer(
                    {
                        'id': 'pointsAgences',
                        'type': 'symbol',
                        'source': 'pointsAgences',
                        'cluster': false,
                        'layout': {
                            'icon-image': 'custom-marker-agence',
                            'text-offset': [0, 0.5],
                            'text-anchor': 'top',
                            "icon-allow-overlap": true
                        }
                    }
                );
                // map.setLayoutProperty('points', 'visibility', 'none')
                // map.setLayoutProperty('points', 'visibility', 'none');
                
                var popup = new mapboxgl.Popup({
                    id: 'display-infoAgences',
                    closeButton: true,
                    closeOnMove: false,
                });

                map.on('click', 'pointsAgences', (e) => {
                if (map.getZoom()>13){
                    map.getCanvas().style.cursor = 'pointer';
                    var coordinates = e.features[0].geometry.coordinates.slice();
                    var description = e.features[0].properties.description; 
                    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                    }

                    popup
                    .setLngLat(coordinates)
                    .setHTML(description)
                    .addTo(map);


                   
                    // closes popup
                    document.getElementsByClassName('mapboxgl-popup')[0].addEventListener('mouseleave', () => {
                        popup.remove();
                    })
                }
                });

                map.on('mouseenter', 'pointsAgences', (e) => {
                if (map.getZoom()>13){
                    map.getCanvas().style.cursor = 'pointer';
                    var coordinates = e.features[0].geometry.coordinates.slice();
                    var description = e.features[0].properties.description;
                    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                    }
                    popup
                    .setLngLat(coordinates)
                    .setHTML(description)
                    .addTo(map);


                  
                    // closes popup
                    document.getElementsByClassName('mapboxgl-popup')[0].addEventListener('mouseleave', () => {
                        popup.remove();
                    })
                }
                });

                // checks that the user exits by another way than on the popup
                // map.on('mouseleave', 'pointsAgences', function (e) {
                //     var onPopUp = false;
                //     if (e.originalEvent.relatedTarget) {
                //         if (e.originalEvent.relatedTarget.className === 'mapboxgl-popup-content') {
                //             onPopUp = true;
                //         }
                //     }
                    // if (!onPopUp) {
                    //     popup.remove();   
                    // }
                // });

            });
        })
      

        //     .catch(err => {
        //         toast.error("Les transactions n'ont pas pu être affichées, veuillez réessayer");
        //         //////console.log(err)
        //     })
        // Axios.defaults.headers.common["Authorization"] = localStorage.getItem("FBIdToken")
  
    }


    buildPolygoneOverlay() {


                var hoveredStateId = null;
 
                map.on('load', function () {
                map.addSource('poly', {
                'type': 'geojson',
                'data': "./carte_des_prix_2021-02-02.json"
                });
                 
                // The feature-state dependent fill-opacity expression will render the hover effect
                // when a feature's hover state is set to true.
                map.addLayer({
                'id': 'poly-fills',
                'type': 'fill',
                'source': 'poly',
                'layout': {},
                'paint': {
                'fill-color': '#2da7f9',
                'fill-opacity': 0
                }
                });
                 
                map.addLayer({
                'id': 'poly-borders',
                'type': 'line',
                'source': 'poly',
                'layout': {},
                'paint': {
                'line-color': '#ffffff',
                'line-width': [
                    'case',
                    ['boolean', ['feature-state', 'hover'], false],
                    3,
                    0
                    ]
                }
                });
                map.setLayoutProperty('poly-fills', 'visibility', 'none')
                map.setLayoutProperty('poly-borders', 'visibility', 'none');
                 
                // When the user moves their mouse over the state-fill layer, we'll update the
                // feature state for the feature under the mouse.
                map.on('mousemove', 'poly-fills', function (e) {
                if (e.features.length > 0) {
                if (hoveredStateId) {
                map.setFeatureState(
                { source: 'poly', id: hoveredStateId },
                { hover: false }
                );
                }
                hoveredStateId = e.features[0].id;
                map.setFeatureState(
                { source: 'poly', id: hoveredStateId },
                { hover: true }
                );
                }
                });
                 
            
        });
    }

    buildCommunesPolygoneOverlay() {


        var hoveredStateId = null;

        map.on('load', function () {
        map.addSource('states', {
        'type': 'geojson',
        'data': "./communes.json"
        });
         
        // The feature-state dependent fill-opacity expression will render the hover effect
        // when a feature's hover state is set to true.
        map.addLayer({
        'id': 'state-fills',
        'type': 'fill',
        'source': 'states',
        'layout': {},
        'paint': {
        'fill-color': '#2da7f9',
        'fill-opacity': 0
        }
        });
         
        map.addLayer({
        'id': 'state-borders',
        'type': 'line',
        'source': 'states',
        'layout': {},
        'paint': {
        'line-color': '#ffffff',
        'line-width': [
            'case',
            ['boolean', ['feature-state', 'hover'], false],
            3,
            0
            ]
        }
        });
        map.setLayoutProperty('state-fills', 'visibility', 'visible')
        map.setLayoutProperty('state-borders', 'visibility', 'visible');
         
        // When the user moves their mouse over the state-fill layer, we'll update the
        // feature state for the feature under the mouse.
        map.on('mousemove', 'state-fills', function (e) {
        if (e.features.length > 0) {
        if (hoveredStateId) {        
            map.setFeatureState(
        { source: 'states', id: hoveredStateId },
        { hover: false }
        );
        }
        hoveredStateId = e.features[0].id;
        map.setFeatureState(
        { source: 'states', id: hoveredStateId },
        { hover: true }
        );
        }
        });
         
        // When the mouse leaves the state-fill layer, update the feature state of the
        // previously hovered feature.
        map.on('mouseleave', 'state-fills', function () {
        if (hoveredStateId) {
        map.setFeatureState(
        { source: 'states', id: hoveredStateId },
        { hover: false }
        );
        }
        hoveredStateId = null;
        });



      
        map.on('click', 'state-fills', function (e) {
            var visibility = map.getLayoutProperty('state-fills', 'visibility');
            if(visibility === 'visible'){
            map.setLayoutProperty('state-fills', 'visibility', 'none')
            map.setLayoutProperty('state-borders', 'visibility', 'none');
            map.setLayoutProperty('poly-fills', 'visibility', 'visible')
            map.setLayoutProperty('poly-borders', 'visibility', 'visible');
            map.setLayoutProperty('points', 'visibility', 'visible')
            map.setLayoutProperty('points', 'visibility', 'visible');
            map.flyTo({               center: e.lngLat,
                zoom : 12.5
                });
            }
        });
    
});
}
    isZoom(){
        if(this.state.mapLoaded){
            return map.getZoom()
        } 
        else {
            return 0
        }
    }

    focusOnLatLng(lng, lat) {
        let mapLayer = null
        if (map) {

            // test if marker is already set
            mapLayer = map.getLayer('markers');
            var mapImage = map.hasImage('custom-marker-set');
            if(typeof mapLayer !== 'undefined') {
                map.removeLayer('markers');
            }

            map.flyTo({
                center: [lat, lng],
                zoom: 15,
                speed: 1,
                curve: 1,
                easing: function (t) {
                    return t;
                },
                essential: true
            })

            if (mapImage) {
                map.getSource('custom-marker-source').setData({
                    type: 'FeatureCollection',
                    features: [{
                        type: 'Feature',
                        properties: {},
                        'cluster': false,
                        geometry: {
                            type: "Point",
                            coordinates: [lat, lng]
                        }
                    }]
                });
                map.addLayer({
                    id: "markers",
                    type: "symbol",
                    source: 'custom-marker-source',
                    'cluster': false,
                    layout: {
                        "icon-image": "custom-marker-set",
                        "icon-allow-overlap": true,
                    }
                });
            } else {
                map.loadImage("https://i.imgur.com/MK4NUzI.png", function(error, image) {
                    if (error) throw error;
                        map.addImage("custom-marker-set", image);
                        map.addSource('custom-marker-source', {
                            type: "geojson",
                            'cluster': false,
                            data: {
                                type: 'FeatureCollection',
                                features: [{
                                    type: 'Feature',
                                    properties: {},
                                    geometry: {
                                        type: "Point",
                                        coordinates: [lat, lng]
                                    }
                                }]
                            }
                        })
                        map.addLayer({
                            id: "markers",
                            type: "symbol",
                            source: 'custom-marker-source',
                            layout: {
                                "icon-image": "custom-marker-set",
                                "icon-allow-overlap": true,

                            }
                        });
                });   
            }

            
        }
    }
    focusOnZone(lng, lat) {
        if (map) {
            this.props.dispatch({type: 'SET_CALLED_FOR_ZOOM_FALSE'});
            map.flyTo({
                center: [lat, lng],
                zoom: 12,
                speed: 1,
                curve: 1,
                easing: function (t) {
                    return t;
                },
                essential: true
            })

            
        }
    }

    isEmail(email) {
        let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    registerContact() {
        
        // validate fields are filled
        var error = [false, false, false];
        if (this.state.name === null) {
            error[0] = true;
        }
        if (this.state.email === null || !this.isEmail(this.state.email)) {
            error[1] = true;
        }
        if (this.state.phone === null) {
            error[2] = true;
        }
        if (error.includes(true)) {
            this.setState({ 
                ...this.state,
                nameError: error[0] === true ? 'Nom obligatoire' : null,
                emailError: this.state.email === null ? 'Email obligatoire' : this.isEmail(this.state.email) === false ? 'Format invalide' : null,
                phoneError: error[2] === true ? 'Téléphone obligatoire' : null
            });
            return;
        } else {
            this.setState({...this.state, nameError: null, emailError: null, phoneError: null});
        }

        // build object
        const data = {
            name: this.state.name,
            phone: this.state.phone,
            email: this.state.email,
            message: `${this.state.message}`,
            date: new Date().toISOString(),
            job: null,
            user_id: null,
            type : "Transaction",
            transaction : this.state.selectedId,
            contributeur : this.state.selectedTransaction.contributeur,
            contributeurId : this.state.selectedTransaction.contributeurId
        }
        
        // write to firebase
        Axios.post('https://us-central1-agenz-website-prod.cloudfunctions.net/api/addContact',{ data: data }).then(result => {
            this.props.dispatch({type: 'DETAILS_SEND_SUCCESS'});
            this.closeModal();
        }).catch((e) => {
        // //console.log(e)
            this.props.dispatch({type: 'DETAILS_SEND_FAILURE'});
            this.closeModal();
        });
    }
    
  
    componentDidMount() {
            this.setState({loadingMap : false})

   
    }



    componentDidUpdate(prevProps) {
        if (this.props.searchedAddress.latitude != null && this.props.searchedAddress.calledForZoom) {
            this.focusOnLatLng(this.props.searchedAddress.latitude, this.props.searchedAddress.longitude);
            this.props.dispatch({type: 'RESET_SEARCH_BAR_MAP'});
        }
        else if(this.props.calledForZoom){
            this.focusOnZone(this.props.lat, this.props.lng);
            
        }
        if(!prevProps.displayPhone && this.props.displayPhone){
            const transactions = this.props.transactions;
            this.setState({
        ...this.state,
        transactions: transactions
    });
    this.mapInit();
        }
    }
    handleSelect = async value => {
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);
        this.setState({address: value, coordinates:latLng})
    };

    render() {

        const { classes } = this.props;
        return (

            this.state.loadingMap ? (<Loading />) : (
    
            <div className={"pricing--dialogs"}>
                <Dialog
                open={this.state.moreInfo}
                disableBackdropClick={false}
                onClose={this.closeModal}
                classes={{paperWidthSm: classes.paperWidthSm }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                    <DialogContent>
                    <div className="details-bien-container-image">
                                        { this.state.selectedTransaction && this.state.selectedTransaction.images && this.state.selectedTransaction.images.length > 0 ? (
                                           <Suspense fallback={<></>}>
                                           <CardComponentCarouselInCard images={
                                                this.state.selectedTransaction.images
                                            } />
                                            </Suspense>
                                        ) : (
                                            <>
                                            <Suspense fallback={<></>}>
                                            <CardComponentCarouselInCard images={
                                                [logo_agenz_white,logo_agenz_white,logo_agenz_white]
                                            } />
                                            </Suspense>
                                            </>
                                        )}
                                    </div>
        
                            <div  className="text-center text-center--pricing">
                                {/* <div style={{
                                    marginBottom: '15px'
                                }}>
                                    <h5>Faites estimer votre bien</h5>
                                    <p>Et obtenez des informations sur prix de vente de biens similaires</p>
                                </div> */}
                                     <Grid container spacing={1}>
        <Grid item xs={12}>
        <div className="details-bien-container">
        {/* <Grid container spacing={1}> */}
        {/* <Grid item xs={12}> 
                                    <div className="details-bien-container-image">
                                        { this.state.selectedTransaction && this.state.selectedTransaction.images && this.state.selectedTransaction.images.length > 0 ? (
                                            <CardComponentCarouselInCard images={
                                                this.state.selectedTransaction.images
                                            } />
                                        ) : (
                                            <CardComponentCarouselInCard images={
                                                [placeholder_image,placeholder_image,placeholder_image]
                                            } />
                                        )}
                                    </div>
        
        </Grid> */}
        <Grid container spacing={1}>
                              <Grid classes={{root: classes.root }}item md={6} lg={4} s={12}>
                                    <div className="pricing--card--details">
                                        {this.state && this.state.selectedTransaction ? (
                                            <span>
                                                <p className="details-bien details-bien-title">
                                                {this.state.selectedTransaction.consistance} 
                                                </p>
                                                {/* <p className="details-bien details--surface">
                                                <SquareFootIcon/>{this.state.selectedTransaction.surface} m<sup>2</sup>
                                                    </p> */}
                                                <p className="details-bien details--address">
                                                {!this.state.selectedTransaction.address || this.state.selectedTransaction.address==="" || this.state.selectedTransaction.address===-1 ? ("") : (
<>
                                                <RoomIcon/>{this.state.selectedTransaction.address}
                                                </>)}
                                                    </p>
                                                <p className="details-bien"><MonetizationOnIcon/>Vendu en {this.state.selectedTransaction.dateTransactions}</p>

                                                <p className="details-bien">
                                                {
                                                        !this.state.selectedTransaction.construction || this.state.selectedTransaction.construction==="" || this.state.selectedTransaction.construction===-1 ? ("") : (
                                                            <>
                                                   <BuildIcon/> Date de construction :&nbsp;
                                                    {
                                                        this.state.selectedTransaction.construction === 0 ? 'Moins de 5 ans' : 
                                                        this.state.selectedTransaction.construction === 1 ? 'Entre 10 et 20 ans' :
                                                        this.state.selectedTransaction.construction === 3 ? 'Moins de 10 ans' :
                                                        this.state.selectedTransaction.construction === 2 ? 'Plus de 20 ans' :
                                                        this.state.selectedTransaction.construction === 4 ? 'Construction neuve' :
                                                        this.state.selectedTransaction.construction === -1 ? 'Non renseignée' :
                                                        this.state.selectedTransaction.construction === "" ? 'Non renseignée' :
                                                        this.state.selectedTransaction.construction
                                                    }
                                                    </>
                                                        )
                                                }
                                                </p>
                                                <p className="details-bien">
                                                    { this.state.agenceTransaction ? (
                                                        <span>
                                                          <AddToQueueIcon/> <a class="agence--added" href={`https://agenz.ma/agence-immobiliere/casablanca/${this.state.agenceTransaction.nameEntreprise.replace(/ /g, '-').replace(/é/g, 'e').replace(/ô/g, 'o')}/a/${this.state.agenceTransaction.responsable}`} target="_blank" rel="noreferrer" > Ajouté par{" "}{ this.state.agenceTransaction.nameEntreprise } </a>

                                                            {/* { 
                                                                 <Link to={'/agences/' + this.state.agenceTransaction.responsable}>
                                                                    { this.state.agenceTransaction.nameEntreprise }
                                                                // </Link>
                                                             } */}
                                                        </span>
                                                    ) : ''}
                                                </p>
                                            </span>
                                        ) : ('')}
                                    </div>
                                    </Grid>
                                    { this.state.agenceTransaction ? (
        <Grid item md={6} lg={4} s={12}>
            {/* <div className="card--agence-details" onClick={()=>{window.open( */}
  {/* `https://www.agenz.ma/agence-immobiliere/casablanca/${this.state.agenceTransaction.nameEntreprise.replace(/ /g, '-').replace(/é/g, 'e').replace(/ô/g, 'o')}/a/${this.state.agenceTransaction.responsable}`, */}
  {/* '_blank' // <- This is what makes it open in a new window. */}
{/* );}}> */}
                <div className="card--agence-details">
                <Suspense fallback={<Loading />}>
            <AgenceComponentInCard agence={this.state.agenceTransaction} transaction={this.state.selectedTransaction.transactionId} />
            </Suspense>
            </div>
            </Grid>) : ''}
            <Grid item md={12} lg={4} s={12}>
                <div className="rdv--container">
        <p className="details-bien details-bien-title" >Faites estimer votre bien</p>
        { this.state.agenceTransaction ? (
<p className="details-bien-sbutitle">En complément, obtenez les prix des biens similaires au vôtre, récemment vendus par <a href={`https://www.agenz.ma/agence-immobiliere/casablanca/${this.state.agenceTransaction.nameEntreprise.replace(/ /g, '-').replace(/é/g, 'e').replace(/ô/g, 'o')}/a/${this.state.agenceTransaction.responsable}`} target="_blank" rel="noreferrer" >{this.state.agenceTransaction.nameEntreprise}</a> </p> ) : ("")}
        <Grid container spacing={3}>
            <ThemeProvider theme={theme}>
                                    

                                        <Grid item md={12} xs={12}>
                                        <div className="message--field">
                                    <TextField size="small" id="name" label="Nom et Prénom" type="search" variant="outlined"
                                                                            value={this.state.name}
                                                                            onChange={(e) => {this.setState({...this.state, name: e.target.value})}}
                                                                            />
                                        {/* <input 
                                        className="input-form form-control full-width-forms input-form-details-bien"
                                        type="text"
                                        id="name"
                                        placeholder="Nom *"
                                        value={this.state.name}
                                        onChange={(e) => {this.setState({...this.state, name: e.target.value})}}
                                        /> */}
                                        <CSSTransition in={this.state.nameError !== null} timeout={300} classNames="errorPriceMap">
                                            <span class="errorPriceMap">{this.state.nameError}</span>
                                        </CSSTransition>
                                    </div>
                                    <div className="message--field">
                                    <TextField size="small" id="name" label="Email" type="mail" variant="outlined"
                                                                            value={this.state.email}
                                                                            onChange={(e) => {this.setState({...this.state, email: e.target.value.trim()})}}
                                                                            />
                                        {/* <input 
                                        className="input-form form-control full-width-forms input-form-details-bien"
                                        type="email"
                                        id="email"
                                        placeholder="Email *"
                                        value={this.state.email}
                                        onChange={(e) => {this.setState({...this.state, email: e.target.value})}}
                                        /> */}
                                        <CSSTransition in={this.state.emailError} timeout={300} classNames="errorPriceMap">
                                                <span class="errorPriceMap">{this.state.emailError}</span>
                                        </CSSTransition>
                                    </div>
                                    <div className="message--field">
                                    <MuiPhoneNumber
                    name="phoneNumber"
                    label="Numéro de téléphone"
                    id="telephone"
                    data-cy="user-phone"
                    defaultCountry={"ma"}
                    value={this.state.phone}
                    variant="outlined"
                    onChange={(e) => {this.setState({...this.state, phone: e})}}
                   />
                                        {/* <input 
                                        className="input-form form-control full-width-forms input-form-details-bien"
                                        type="tel"
                                        id="telephone"
                                        placeholder="Numéro de téléphone *"
                                        value={this.state.telephone}
                                        onChange={(e) => {this.setState({...this.state, phone: e.target.value})}}
                                        /> */}
                                        <CSSTransition in={this.state.phoneError} timeout={300} classNames="errorPriceMap">
                                                <span class="errorPriceMap">{this.state.phoneError}</span>
                                        </CSSTransition>
                                    </div>
                                    </Grid>
                                    <Grid item md={12} xs={12}>
                                        <div className="message--field">
                                    <TextField multiline size="small" id="message" label="Message" type="search"  value={this.state.message} variant="outlined"
                      onChange={(e) => {this.setState({...this.state, message: e.target.value})}}

                                        />
                                        </div>
                                    </Grid>
                                <button className="button button-primary btn--message"  onClick={() => {
                                    this.registerContact();
                                }}>
                                    Envoyer
                                </button>
                                
                            </ThemeProvider>
        </Grid>
        </div>
       </Grid>
            </Grid>
                                    {/* </Grid> */}
                                </div>
                                
        </Grid>
        </Grid>

        </div>
                  
                    </DialogContent>
                </Dialog>
                <Suspense fallback={<Loading />}>
                    <PriceCard moreInfo={this.props.moreInfo} />
                </Suspense>
                
                <div className="bottom--container"></div>
               
               
                <div className="price-info-container">
                <Suspense fallback={<Loading />}>
                    <PriceInfoComponent />
                </Suspense>
                </div>
            </div>
           )
        );
    }
}

const mapStateToProps = (state) => {
    return {
        config: state.config,
        priceDetails: state.priceDetails,
        searchedAddress: state.estimationState.urlViewport,
        transactions: state.transactions.transactions,
        agences: state.agences.agences,
        zoom : state.card.zoom,
        calledForZoom : state.card.calledForZoom,
        lat : state.card.lat,
        lng : state.card.lng,
        displayPhone : state.card.displayPhone
    };
};
export default connect(mapStateToProps)(withStyles(styles)(CardComponent));