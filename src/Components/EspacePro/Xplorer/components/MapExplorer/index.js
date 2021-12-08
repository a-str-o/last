import React from 'react';
import { connect } from 'react-redux';
import mapboxgl from 'mapbox-gl';
import firebase from './../../../../../Config/FirebaseConfig';
import marker from './../../../../../assets/img/markerNew.png';
import placeholder_image from './../../../../../assets/img/placeholder_image.png'
import './style.scss';
import { CSSTransition } from 'react-transition-group';
import TransactionDetails from '../TransactionDetails';
import PriceBarComponent from './../../../../PriceBarComponent/PriceBarComponent';
import Polygone_Raw from '../../../../../assets/polygonezone-text-casablanca.json'
import MeanQuartier from '../../../../../assets/meanCartier-casablanca.json'
import axios from 'axios'
var map;
var hoveredStateId = null;
// const db = firebase.firestore();

class MapExplorer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ...props,
            moreInfo: false,
            selectedId: null,
            name: null,
            email: null,
            phone: null,
            nameError: null,
            emailError: null,
            phoneError: null,
            zoom : 9
        }
        this.mapBoxContainer = React.createRef();
    }
    transactionsPro() {
        if(this.props.transactionsPro){
          if(this.props.transactionsPro.length>0){
          this.setState({loading : false})
          }
          else {
            let transactions = [];
            //transactionsPro pour avoir les prix
            axios.get('https://us-central1-agenz-website-prod.cloudfunctions.net/api/transactions').then(result => {
            result.data.forEach(trans => {
              transactions.push(trans)
            })
            console.log(transactions)
            this.props.dispatch({ type: 'SET_TRANSACTIONS_PRO', data: transactions });
            this.setState({loading : false})
          })
          .catch(err => {
            console.log(err)
          })
  
          }
        }
        else {
          let transactions = [];
          axios.get('https://us-central1-agenz-website-prod.cloudfunctions.net/api/transactions').then(result => {
          result.data.forEach(trans => {
            transactions.push(trans)
          })
          this.props.dispatch({ type: 'SET_TRANSACTIONS_PRO', data: transactions });
          this.setState({loading : false})
        })
        .catch(err => {
          console.log(err)
        })
        }
        }

    initMap() {
        mapboxgl.accessToken = this.props.config.mapboxglKey;
        map = new mapboxgl.Map({
            container: this.mapBoxContainer.current,
            style: 'mapbox://styles/badrbelkeziz/ckkd3atwt2anx17psnnxum19f',
            center: [-7.6502371, 33.4661958],
            pitch: 30,
            zoom: 9,
            minZoom: 9
        });
        this.buildpolygonesLayer();
        this.buildPolygoneOverlay();
        this.buildTransactionsLayer(this.state.transactions);
        map.on('zoom', () =>  {
            this.setState({zoom : map.getZoom()})
        }); 
    }

    buildTransactionsLayer(transactions) {
        map.on('load', () => {
            const markersData = [];
            transactions.forEach(element => {         
                //Replace undesirable characters
                var remplaceSomeCharsInmarkersData = element.coordinates.replace('lat : ', '').replace('lng : ', '').replace('}', '');     
                var splitransC = remplaceSomeCharsInmarkersData.split(' ');
                var lat = splitransC[1];
                var long = splitransC[0];
                markersData.push(
                    {
                        'type': 'Feature',
                        'geometry': {
                        'type': 'Point',
                        'coordinates': [lat, long]
                        },
                        'properties': {
                            'description': `
                            <div style="width: 40%;">
                                <img src="${placeholder_image}" style="width : 100%">
                            </div>
                            <div class="polygone-infosbbb" id="popup-transactionshh" style="text-align: left;padding-left : 10px;">
                                <div className="popup-title" style="/* position: absolute; *//* top: -5px; *//* right: 0; *//* left: 0; *//* padding: 5px; *//* background-color: #2f5597; *//* border-top-left-radius: 5px; *//* border-top-right-radius: 5px; */color: #1c1c1c;text-align: left;">
                                    ${element.consistance}
                                </div>
                                <div className="polygone-price" style="font-weight: 400;margin-top: 0px;text-align:left;padding-top: 10px;">
                                    Surface de ${element.surface} m2
                                    </div>
                                    <div style="font-weight: 400">
                                    Vendu en ${element.dateTransactions}
                                    </div>
                                    <div style="font-size: 13px;margin-top: 10px;color: blue;font-weight: 600;cursor: pointer;" id="pro-button-activate">
                                    Plus d'informations
                                    <span id="transaction-id" style="opacity: 0">${element.transactionId}</span>
                                    </div>
                                </div>
                            </div>`
                        }
                    }
                );
            });

            map.loadImage(
            marker,
            (error, image) => {
                if (error) throw error;
                map.addImage('custom-marker', image);
                map.addSource('points', {
                    'type': 'geojson',
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
                        'layout': {
                            'icon-image': 'custom-marker',
                            'text-offset': [0, 0.5],
                            'text-anchor': 'top'
                        }
                    }
                );
                
                var popup = new mapboxgl.Popup({
                    id: 'display-info',
                    closeButton: true,
                    closeOnMove: false,
                });

                map.on('mouseenter', 'points', (e) => {
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
                    document.getElementById('pro-button-activate').addEventListener('click', (e) => {
                        const id = document.getElementById('transaction-id').innerText;
                        this.openModal(id);
                        popup.remove();
                    })

                    // closes popup
                    document.getElementsByClassName('mapboxgl-popup')[0].addEventListener('mouseleave', () => {
                        popup.remove();
                    })
                });

                // checks that the user exits by another way than on the popup
                // map.on('mouseleave', 'points', function (e) {
                //     var onPopUp = false;
                //     if (e.originalEvent.relatedTarget) {
                //         if (e.originalEvent.relatedTarget.className === 'mapboxgl-popup-content') {
                //             onPopUp = true;
                //         }
                //     }
                //     if (!onPopUp) {
                //         popup.remove();   
                //     }
                // });

            });
        })
    }

    buildpolygonesLayer() {
        // const polygones = this.state.polygones;
        // this.getPolygonePrices(polygones);
        // const polygoneFeatures = this.assignPolygones(polygones);
        // map.on('load', function () {
        //     map.addSource('card-map', {
        //         'type': 'geojson',
        //         'data': {
        //             'type': 'FeatureCollection',
        //             'features': polygoneFeatures
                
        //         }
        //     });
        //     map.addLayer({
        //         'id': 'card-fill',
        //         'type': 'fill',
        //         'source': 'card-map',
        //         'layout': {},
        //         'paint': {
        //             'fill-color': ['get', 'color'],
        //             'fill-opacity': 0
        //         }
        //     }, 'road-street');
            
        //     map.on('mousemove', 'card-fill', function (e) {
        //         if (e.features.length > 0) {
        //             if (hoveredStateId) {
        //                 map.setFeatureState(
        //                     { source: 'card-map', id: hoveredStateId },
        //                     { hover: false }
        //                 );
        //             } else {
        //                 hoveredStateId = e.features[0].id;
        //                 map.setFeatureState(
        //                     { source: 'card-map', id: hoveredStateId },
        //                     { hover: true }
        //                 );
        //             }
        //         }
        //     });
                                                         
        //     map.on('mouseleave', 'card-fill', function () {
        //         if (hoveredStateId) {
        //             map.setFeatureState(
        //                 { source: 'card-map', id: hoveredStateId },
        //                 { hover: false }
        //             );
        //         }
        //         hoveredStateId = null;
        //     });
        // });
    }

    buildPolygoneOverlay() {
        const polygones = this.state.polygones;
        this.getPolygonePrices(polygones);
        const polygoneFeatures = this.assignPolygonesOverlay(polygones);
        map.on('load', () => {
            map.addSource('card-overlay', {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': polygoneFeatures
                
                }
            });
                                
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
            
            map.on('mousemove', 'card-fill-overlay', function (e) {
                if (e.features.length > 0) {
                    if (hoveredStateId) {
                        map.setFeatureState(
                            { source: 'card-overlay', id: hoveredStateId },
                            { hover: false }
                        );
                    } else {
                        hoveredStateId = e.features[0].id;
                        map.setFeatureState(
                            { source: 'card-overlay', id: hoveredStateId },
                            { hover: true }
                        );
                    }
                }
            });
                                                         
            map.on('mouseleave', 'card-fill-overlay', function () {
                if (hoveredStateId) {
                    map.setFeatureState(
                        { source: 'card-overlay', id: hoveredStateId },
                        { hover: false }
                    );
                }
                hoveredStateId = null;
            });

            var popup = new mapboxgl.Popup({
                closeButton: false,
                closeOnMove: true
            });

            map.on('click', 'card-fill-overlay', function (e) {
                map.getCanvas().style.cursor = 'pointer';
                var description = e.features[0].properties.infomation;
                popup
                .setLngLat(e.lngLat)
                .setHTML(description)
                .addTo(map);
            });
        });
    }

    async getPolygones() {
        const polygones = [];
        const polygonesRaw = Polygone_Raw;
        // const snapshots = await db.collection('polygones').get();
        // snapshots.forEach((doc) => polygonesRaw.push(doc.data()));
        polygonesRaw.forEach(element => {
            var coords = [];
            var remplaceSomeChars = element.polygone.replace('POLYGON ((','').replace('))','');
            var splitData = remplaceSomeChars.split(",");
            splitData.forEach(function(obj){
                var trim = obj.trim();
                var splitData2 = trim.split(" ");
                var coord2 = [];
                splitData2.forEach(function(obj2){
                    coord2.push(obj2)
                })
                coords.push(coord2)
            });
            polygones.push({polygone: coords, text: element.text}); 
        });
        return polygones;
    }

    async getTransactions() {
        const transactions = this.props.transactionsPro
            .filter(trans => trans.isDeleted != true || !trans.isDeleted);
        // const snapshpots = await db.collection('transactions').get();
        // snapshpots.forEach((doc) => transactions.push(doc.data()));
        return transactions;
    }

    async getMeanCartier() {
        const meanCartier = MeanQuartier;
        // const snapshpots = await db.collection('meanCartier').get();
        // snapshpots.forEach((doc) => meanCartier.push(doc.data()));
        return meanCartier;
    }

    assignPolygones(polygones) {
        var counter = 1;
        const polygoneFeature = [];
        for (let v of polygones) {
            polygoneFeature.push({
                'id': counter,
                'type': 'Feature',
                'properties': {
                    'color': this.getColor(v.price),
                },
                'geometry': {
                'type': 'Polygon',
                'coordinates':[v.polygone]
                }
            });
            counter ++;  
        }
        return polygoneFeature;
    }

    assignPolygonesOverlay(polygones) {
        var counter = 1;
        const polygoneFeature = [];
        for (let v of polygones) {
            polygoneFeature.push({
                'id': counter,
                'type': 'Feature',
                'properties': {
                    'infomation': `
                    <div style="width: 30%;">
                        <img style="width : 100%" src="${placeholder_image}">
                    </div>
                    <div style="padding: 3px;text-align: center;width: 70%;">
                    ${v.price ? (`<div>
                        Prix moyen des appartements
                    </div>`) : (``)}
                    <div style="font-weight: 400">
                    ${v.price ? (`${v.price.toLocaleString(undefined, {maximumFractionDigits: 0})} MAD/m²`):("Manque de données pour les appartements dans cette zone")} 
                    </div>
                </div>`
                },
                'geometry': {
                'type': 'Polygon',
                'coordinates':[v.polygone]
                }
            });
            counter ++;  
        }
        return polygoneFeature;
    }

    getPolygonePrices(polygones) {
        const meanCartier = this.state.meanCartier;
        polygones.forEach(element => {
            const match = meanCartier.filter(el => el.zone === element.text)[0];
            if (!match) {
                element.price = 0;
            } else {
                element.price = parseInt(meanCartier.filter(el => el.zone === element.text)[0].moyenne_quartier);
            }
        });
    }

    getColor(price) {
        const least = this.props.priceDetails.lowest;
        const ecart = this.props.priceDetails.distance;
        let color = '#cccccc';
        for (let i = 0; i < 10; i++) {
            if ( price >= (least + (i * ecart)) && price < (least + ((i + 1) * ecart)) ) {
                color = this.props.config.priceColors[i];
                break;
            }
        }
        return color;
    }

    buildPrices() {
        const prices = [];
        const meanCartier = this.state.meanCartier;

        for(let meancat of meanCartier){
            prices.push(parseFloat(meancat.moyenne_quartier));
        }
        
        prices.sort(function(a, b) {
            return a - b;
        });
    
        let least = prices[0];
        let greatest = prices[prices.length-1];
        let ecart = (greatest - least) / 10;

        this.props.dispatch({type: 'WRITE_DETAILS', data: { lowest: least, highest: greatest, distance: ecart}});
    } 

    async componentDidMount() {
        // const db = firebase.firestore();
        // const auth = firebase.auth();
        this.transactionsPro()
        const transactions = await this.getTransactions();
        const polygones = await this.getPolygones();
        const meanCartier = await this.getMeanCartier();
        this.setState({
            ...this.state,
            polygones: polygones,
            transactions: transactions,
            meanCartier: meanCartier
        });
        this.buildPrices();
        this.initMap();
    }


    openModal = (id) => {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        }

        this.props.dispatch({type : 'TRANSACTION_DETAILS', data: true})

        this.setState({
            ...this.state,
            moreInfo: true,
            selectedId: id
        })

        const details = {
            consistance : this.state.transactions.filter(el => el.transactionId === id)[0].consistance,
            address : this.state.transactions.filter(el => el.transactionId === id)[0].address,
            agencement : this.state.transactions.filter(el => el.transactionId === id)[0].agencement,
            anneeconstruction : this.state.transactions.filter(el => el.transactionId === id)[0].anneeconstruction,
            ascenseur : this.state.transactions.filter(el => el.transactionId === id)[0].ascenseur,
            balcon : this.state.transactions.filter(el => el.transactionId === id)[0].balcon,
            bien : this.state.transactions.filter(el => el.transactionId === id)[0].bien,
            calme : this.state.transactions.filter(el => el.transactionId === id)[0].calme,
            cave : this.state.transactions.filter(el => el.transactionId === id)[0].cave,
            chambreservice : this.state.transactions.filter(el => el.transactionId === id)[0].chambreservice,
            chaufeausolaire : this.state.transactions.filter(el => el.transactionId === id)[0].chaufeausolaire,
            cheminee : this.state.transactions.filter(el => el.transactionId === id)[0].cheminee,
            concierge : this.state.transactions.filter(el => el.transactionId === id)[0].concierge,
            consistance : this.state.transactions.filter(el => el.transactionId === id)[0].consistance,
            construction : this.state.transactions.filter(el => el.transactionId === id)[0].construction,
            contributeur : this.state.transactions.filter(el => el.transactionId === id)[0].contributeur,
            contributeurId : this.state.transactions.filter(el => el.transactionId === id)[0].contributeurId,
            coordinates : this.state.transactions.filter(el => el.transactionId === id)[0].coordinates,
            dateTransactionAdded : this.state.transactions.filter(el => el.transactionId === id)[0].dateTransactionAdded,
            dateTransactions : this.state.transactions.filter(el => el.transactionId === id)[0].dateTransactions,
            duplex : this.state.transactions.filter(el => el.transactionId === id)[0].duplex,
            etage : this.state.transactions.filter(el => el.transactionId === id)[0].etage,
            etagesimmeuble : this.state.transactions.filter(el => el.transactionId === id)[0].etagesimmeuble,
            etatgeneral : this.state.transactions.filter(el => el.transactionId === id)[0].etatgeneral,
            finition : this.state.transactions.filter(el => el.transactionId === id)[0].finition,
            garage : this.state.transactions.filter(el => el.transactionId === id)[0].garage,
            images : this.state.transactions.filter(el => el.transactionId === id)[0].images,
            localisation : this.state.transactions.filter(el => el.transactionId === id)[0].localisation,
            luminosite : this.state.transactions.filter(el => el.transactionId === id)[0].luminosite,
            murmitoyen : this.state.transactions.filter(el => el.transactionId === id)[0].murmitoyen,
            orientation : this.state.transactions.filter(el => el.transactionId === id)[0].orientation,
            parking : this.state.transactions.filter(el => el.transactionId === id)[0].parking,
            piscine : this.state.transactions.filter(el => el.transactionId === id)[0].piscine,
            placesparking : this.state.transactions.filter(el => el.transactionId === id)[0].placesparking,
            prix : this.state.transactions.filter(el => el.transactionId === id)[0].prix,
            redejardin : this.state.transactions.filter(el => el.transactionId === id)[0].redejardin,
            renovee : this.state.transactions.filter(el => el.transactionId === id)[0].renovee,
            residencefermee : this.state.transactions.filter(el => el.transactionId === id)[0].residencefermee,
            sdb : this.state.transactions.filter(el => el.transactionId === id)[0].sdb,
            surfacebalcon : this.state.transactions.filter(el => el.transactionId === id)[0].surfacebalcon,
            surfacecave : this.state.transactions.filter(el => el.transactionId === id)[0].surfacecave,
            surfaceconstruite : this.state.transactions.filter(el => el.transactionId === id)[0].surfaceconstruite,
            surfacehabitable : this.state.transactions.filter(el => el.transactionId === id)[0].surfacehabitable,
            surfaceparking : this.state.transactions.filter(el => el.transactionId === id)[0].surfaceparking,
            surfaceterrain : this.state.transactions.filter(el => el.transactionId === id)[0].surfaceterrain,
            typechauffage : this.state.transactions.filter(el => el.transactionId === id)[0].typechauffage,
            typevilla : this.state.transactions.filter(el => el.transactionId === id)[0].typevilla,
            typologie : this.state.transactions.filter(el => el.transactionId === id)[0].typologie,
            vueexceptionnelle : this.state.transactions.filter(el => el.transactionId === id)[0].vueexceptionnelle,
            zone : this.state.transactions.filter(el => el.transactionId === id)[0].zone

        }
        this.props.dispatch({type : 'SET_TRANSACTION_DETAILS', data: details})
    }


    focusOnLatLng(lng, lat) {
        if (map) {
            map.flyTo({
                center: [lat, lng],
                zoom: 19,
                speed: 2,
                curve: 1,
                easing: function (t) {
                    return t;
                },
                essential: true
            })
            this.props.dispatch({ type: 'SET_URL_VIEWPORT', data: {latitude: null , longitude: null}});
        }
    }

    componentDidUpdate(prevProps) {
        this.updateBooleanFilters(prevProps.filters);
        this.updateTransactionFilters(prevProps.filters);
        if (this.props.searchedAddress.latitude != null && this.props.searchedAddress.calledForZoom) {
            this.focusOnLatLng(this.props.searchedAddress.latitude, this.props.searchedAddress.longitude);
        }
    }

    updateTransactionFilters(prevFilters) {
        
    }

    updateBooleanFilters(prevFilters) {
        if ( prevFilters.priceZones !== this.props.filters.priceZones ) {
            this.handleChangePolygones(this.props.filters.priceZones);
        }
        if ( prevFilters.transactions !== this.props.filters.transactions ) {
            this.handleChangeTransactions(this.props.filters.transactions);
        }
        if ( prevFilters.interestPoints !== this.props.filters.interestPoints ) {
            this.handleChangeInterest(this.props.filters.interestPoints);
        }
    }

    handleChangeTransactions(status) {
        // transactions
        if (status === true) {
            var mapLayer = map.getLayer('points');
            if(typeof mapLayer === 'undefined') {
                map.addLayer({
                    'id': 'points',
                    'type': 'symbol',
                    'source': 'points',
                    'layout': {
                        'icon-image': 'custom-marker',
                        'text-offset': [0, 0.5],
                        'text-anchor': 'top'
                    }
                });
            }
        } else {
            var mapLayer = map.getLayer('points');
            if(typeof mapLayer !== 'undefined') {
                map.removeLayer('points');
            }
        }
    }

    handleChangeInterest(status) {
        // transactions
        if (status === true) {
            map.setLayoutProperty('poi-label', 'visibility', 'visible');
        } else {
            map.setLayoutProperty('poi-label', 'visibility', 'none');
        }
    }

    handleChangePolygones(status) {
        if (status === true) {
            var mapLayer = map.getLayer('card-fill');
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
            var mapLayer = map.getLayer('card-fill');
            if(typeof mapLayer !== 'undefined') {
                map.removeLayer('card-fill');
                map.removeLayer('card-fill-overlay');
            }
        }
    }

    render() {
        return (
            <>
            <CSSTransition appear={true} unmountOnExit in={this.props.espacePro.showTransactionDetails} timeout={300} classNames="PopUpTransactionAnimation">
                <TransactionDetails 
                    moreInfo = {this.state.moreInfo}
                    details = 
                    {this.state && this.state.selectedId ?[
                        {
                            consistance: this.state.transactions.filter(el => el.transactionId === this.state.selectedId)[0].consistance,
                            surface: this.state.transactions.filter(el => el.transactionId === this.state.selectedId)[0].surface
    
                        }
                    ] : ('')

                    }
                />
            </CSSTransition>
            

            <div className="map-explorer">
                <div className="map-container--pro" ref={this.mapBoxContainer}>
                <div className="pricing-top-side-price-bar-xplorer">
                    <PriceBarComponent zoom={this.state.zoom} />
            </div>
                </div>
            </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    const transaction = state.espacePro;
    return {
        config: state.config,
        priceDetails: state.priceDetails,
        espacePro: transaction,
        searchedAddress: state.estimationState.urlViewport,
        filters: state.espacePro.xplorerFilters,

    }
};  
export default connect(mapStateToProps)(MapExplorer);