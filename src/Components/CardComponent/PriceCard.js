import React, { Component, Suspense, lazy} from 'react'
import ReactMapboxGl, {Popup, GeoJSONLayer, ZoomControl} from 'react-mapbox-gl';
import { connect } from "react-redux";
import 'mapbox-gl/dist/mapbox-gl.css';
import { withStyles, createStyles } from '@material-ui/styles';
import CDPVilla from "./carte_des_prix_2021-02-02_villa.json"
import CDP from "./carte_des_prix_2021-02-02.json"
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng
} from "react-places-autocomplete";
import './CardComponent.scss'; 
import communesJson from './communes.json'
import {withRouter} from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import ObtenirLePrix from "./ObtenirLePrix"
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
  
const PopupContainer =lazy(() => retry(()=> import ('./PopupContainer')));
const PopupAgenceContainer =lazy(() => retry(()=> import ('./PopupAgenceContainer')));
const PriceBarComponent =lazy(() => retry(()=> import ('../PriceBarComponent/PriceBarComponent')));
const TransactionPage =lazy(() => retry(()=> import ("./TransactionPage")));








const Map = ReactMapboxGl({
    accessToken:
        'pk.eyJ1IjoiYmFkcmJlbGtleml6IiwiYSI6ImNraDduNjN2bDA2MGszMG5zZHRqNm5zMzIifQ.oITjlONmSiUQsFKrZfFd3w',
        minZoom : 10,
        renderWorldCopies : false
    
    });  


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

const flyToOptions = {
    speed : 0.8
}
 
class PriceCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading : true,
            center: [this.props.lng, this.props.lat],
            zoom: [this.props.zoom],
            source : {"points" : {
                "type" : "geojson",
                "data" : []
            }
           
        },
        polygonesVisibility : "none",
        communesVisibility : 'visible',
        communesBorderVisibility : 'visiible',
        polygonesBorderVisibility : 'none',
        agencesVisibility : 'visible',
        transactionsVisibility : 'visible',
        popup : false,
        placesShow : true,
        transactionShow : true,
        selectedPosition : [-7.625404750687384, 33.610213688357646],
        hoveredStateId : "0ca6cd1310cc87ece7156823fab7d08d",
        hoverId : 28,
        coordinates: {
            lat: null,
            lng: null
        }
            }
            
        }
        onPointEnteredAgence(e){
        
    
        }
        onPointLeaveAgence(e){
            // this.setState({popup : false, selectedPosition : []})
    
    
        }
        onPointClickedAgence(e){

    
            
            this.setState({popupAgence : true, selectedPositionAgence : [e.lngLat.lng, e.lngLat.lat],
            selectedNameEntreprise : e.features[0].properties.nameEntreprise,
            selectedUserImage : e.features[0].properties.user_image,
            selectedContributeurId : e.features[0].properties.contributeurId,
            selectedCountTransactions : e.features[0].properties.countTransactions
        })
            
        }
        onToggleHoverAgence(e){
            
            
        
          }

        onPointEntered(e){
        
        if(this.map.getZoom>14){
    
        }
        

    }
    onPointLeave(e){
        // this.setState({popup : false, selectedPosition : []})


    }
    onPointClicked(e){
        
        this.setState({popup : true, selectedPosition : [e.lngLat.lng, e.lngLat.lat],
            
        selectedAgence : e.features[0].properties.agence,
        selectedConsistance : e.features[0].properties.consistance,
        selectedDateTransactions : e.features[0].properties.dateTransactions,
        selectedImages : e.features[0].properties.images,
        selectedTransactionId : e.features[0].properties.transactionId,
        selectedAgenceTransaction : this.props.agences.filter(agence => agence.responsable === e.features[0].properties.contributeurId)
    })
        
    }
    onToggleHover(e){
        

            this.setState({popup : true, selectedPosition : [e.lngLat.lng, e.lngLat.lat],
                selectedAgence : e.features[0].properties.agence,
                selectedConsistance : e.features[0].properties.consistance,
                selectedDateTransactions : e.features[0].properties.dateTransactions,
                selectedImages : e.features[0].properties.images,
                selectedTransactionId : e.features[0].properties.transactionId,
                selectedAgenceTransaction : this.props.agences.filter(agence => agence.responsable === e.features[0].properties.contributeurId)
            })
            
              }

      buildAgencesLayer(){
        let agences = this.props.agences
        
            const markersDataAgence = [];

            return new Promise((resolve) => {
                agences.forEach( async element => {      

                    var long = null
                    var lat = null
                    if (element.localisation){
                    var remplaceSomeCharsInmarkersDataAgence = element.localisation.replace('lat : ', '').replace('lng : ', '').replace('}', '');     
                    var splitransC = remplaceSomeCharsInmarkersDataAgence.split(' ');
                    long = splitransC[0]
                    lat = splitransC[1]
                    }
                    else{ long = 0; lat = 0}

                    
                    markersDataAgence.push(
                        {
                            'type': 'Feature',
                            'geometry': {
                            'type': 'Point',
                            'coordinates': [lat, long]
                            },
                            'properties': {
                                'user_image': element.user_image,
                                'nameEntreprise' : element.nameEntreprise,
                                'countTransactions' : element.countTransactions,
                                'contributeurId' : element.responsable 
                            
                            }
                        }
                    );
                    if (agences.length === markersDataAgence.length) {
                        resolve(markersDataAgence);
                    }
                });
            });
        
        
        
      


  
    }

    onDrag = () => {
        this.setState({popup : false, popupAgence : false})
    }
        

    buildTransactionsLayer(){
    let transactions = this.props.transactions
    const markersData = [];

            return new Promise((resolve) => {
                transactions.forEach( async element => {      

                    var remplaceSomeCharsInmarkersData = element.coordinates.replace('lat : ', '').replace('lng : ', '').replace('}', '');     
                    var splitransC = remplaceSomeCharsInmarkersData.split(' ');
                    var long = splitransC[0]
                    var lat = splitransC[1]

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
                                'images' : element.images,
                                'consistance' : element.consistance,
                                'agence' : nameEntreprise,
                                'dateTransactions' : element.dateTransactions,
                                'transactionId' : element.transactionId,
                                'address' : element.address,
                                'construction' : element.anneeconstruction,
                                'etage' : element.etage,
                                'contributeur' : element.contributeur,
                                'contributeurId' : element.contributeurId,
                                'bien' : element.bien
                            }
                        }
                    );
                    if (transactions.length === markersData.length) {
                        resolve(markersData);
                    }
                });
            });      

  
    }

onClickPolygone(e){
    document.querySelector(".pricing-right-side").scrollTo({top : 0, left : 0,behavior: 'smooth'})

    this.setState({center : [e.lngLat.lng,e.lngLat.lat],zoom : [14.1]})


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
}
onMovePolygone(e){

}
onClickCommune(e){
    document.querySelector(".pricing-right-side").scrollTo({top : 0, left : 0,behavior: 'smooth'})
    
    this.props.history.push(`/prix-immobilier/Casablanca/${e.features[0].properties.areaLabel.replace(" ","-")}`)
    this.props.dispatch({type : "SET_ACTIVE_COMMUNE", data : {commune : e.features[0].properties.areaLabel, prix : e.features[0].properties.prix,prixVilla : 0}})
    var visibility = this.state.communesVisibility
    if(visibility === 'visible'){
    this.setState({
        communesVisibility : 'none',
        communesBorderVisibility : 'none',
        polygonesVisibility : 'visible',
        polygonesBorderVisibility : 'visible',
        pointsVisibility : 'visible',
        center : [e.lngLat.lng, e.lngLat.lat],
        zoom : [12.5]
    })
    }

}
onMoveCommune(e){

}
closeModal = () => {
    this.props.history.push('/prix-immobilier')
    this.setState({
        ...this.state,
        moreInfo: false,
        selectedId: null,
        selectedTransaction: null,
        agenceTransaction: null
    })
}

handleChangeTransactions(status) {
    // transactions
    if (status === true) {
        this.setState({transactionShow: this.state.transactionShow === true ? false : true})
        window.map.setLayoutProperty(
            'transactions-cdp',
            'visibility',
            'visible')
        } else {
        this.setState({transactionsVisibility : 'none',transactionShow: this.state.transactionShow === true ? false : true})
        window.map.setLayoutProperty(
            'transactions-cdp',
            'visibility',
            'none')    }
}
handleChangeAgences(status) {
    // transactions
    if (status === true) {
        this.setState({agencesVisibility : 'visible',placesShow: this.state.placesShow === true ? false : true})
        window.map.setLayoutProperty(
            'agences',
            'visibility',
            'visible')    } else {
        
        this.setState({agencesVisibility : 'none',placesShow: this.state.placesShow === true ? false : true})
        window.map.setLayoutProperty(
            'agences',
            'visibility',
            'none')    }
    
}

handleMap(map){
    
    window.map = map
    
    
    window.map.on('zoom', () => {
        this.setState({zoom : [window.map.getZoom()]})

    })

    window.map.on('click', e => {
        
        return new Promise((resolve, reject) => {
        var features = window.map.queryRenderedFeatures(e.point, {
          layers: ['transactions-cdp','agences'] // replace this with the name of the layer
        });
        
      
        if (!features.length) {
            reject()
        }
        else{
            resolve({coord : e.lngLat, features : features})
        }
    })
    .then( (res) => {
        
        let coord = res.coord
        let features = res.features
        if(features[0].sourceLayer === "Agences"){
            
        this.setState({popupAgence : true, popup : false, selectedPositionAgence : [coord.lng, coord.lat],
            selectedNameEntreprise : features[0].properties.nameEntreprise,
            selectedUserImage : features[0].properties.user_image,
            selectedContributeurId : features[0].properties.responsable,
            selectedCountTransactions : features[0].properties.countTransactions
        })
    }
    if(features[0].sourceLayer === "transactions-cdp"){
        this.setState({popup : true, popupAgence : false, selectedPosition : [coord.lng, coord.lat],
            selectedAddress : e.features[0].properties.address,
            selectedAgence : "",
            selectedConsistance : features[0].properties.consistance,
            selectedDateTransactions : features[0].properties.dateTransactions,
            selectedImages : features[0].properties.images,
            selectedTransactionId : features[0].properties.transactionId,
            selectedAgenceTransaction : this.props.agences.filter(agence => agence.responsable === features[0].properties.contributeurId)

    })
    }
})
.catch(err => {})
})
window.map.on('mouseenter', 'transactions-cdp', (e) => {
        window.map.getCanvas().style.cursor = 'pointer';
        return new Promise((resolve, reject) => {
            var features = window.map.queryRenderedFeatures(e.point, {
              layers: ['transactions-cdp','agences'] // replace this with the name of the layer
            });
          
            if (!features.length) {
                reject()
            }
            else{
                resolve({coord : e.lngLat, features : features})
            }
        })
        .then( (res) => {
            
            let coord = res.coord
            let features = res.features
            if(features[0].sourceLayer === "Agences"){
                
            this.setState({popupAgence : true, popup : false, selectedPositionAgence : [coord.lng, coord.lat],
                selectedNameEntreprise : features[0].properties.nameEntreprise,
                selectedUserImage : features[0].properties.user_image,
                selectedContributeurId : features[0].properties.responsable,
                selectedCountTransactions : features[0].properties.countTransactions
            })
        }
        if(features[0].sourceLayer === "transactions-cdp"){
            this.setState({popup : true, popupAgence : false, selectedPosition : [coord.lng, coord.lat],
                selectedAddress : e.features[0].properties.address,
                selectedAgence : "",
                selectedConsistance : features[0].properties.consistance,
                selectedDateTransactions : features[0].properties.dateTransactions,
                selectedImages : features[0].properties.images,
                selectedTransactionId : features[0].properties.transactionId,
                selectedAgenceTransaction : this.props.agences.filter(agence => agence.responsable === features[0].properties.contributeurId)
    
        })
        }
    })
    .catch(err => {})
    
    });
window.map.on('mouseenter','cdp-fvrier-20', (e) => {
    this.setState({popup : false, popupAgence : false})   
         
})
window.map.on('mouseenter', 'agences', (e) => {

            window.map.getCanvas().style.cursor = 'pointer';
            return new Promise((resolve, reject) => {
                var features = window.map.queryRenderedFeatures(e.point, {
                  layers: ['transactions-cdp','agences'] // replace this with the name of the layer
                });
              
                if (!features.length) {
                    reject()
                }
                else{
                    resolve({coord : e.lngLat, features : features})
                }
            })
            .then( (res) => {
                
                let coord = res.coord
                let features = res.features
                if(features[0].sourceLayer === "Agences"){
                    
                this.setState({popupAgence : true, popup : false,selectedPositionAgence : [coord.lng, coord.lat],
                    selectedNameEntreprise : features[0].properties.nameEntreprise,
                    selectedUserImage : features[0].properties.user_image,
                    selectedContributeurId : features[0].properties.responsable,
                    selectedCountTransactions : features[0].properties.countTransactions
                })
            }
            if(features[0].sourceLayer === "transactions-cdp"){
                this.setState({popup : true, popupAgence : false, selectedPosition : [coord.lng, coord.lat],
                    selectedAddress : e.features[0].properties.address,
                    selectedAgence : "",
                    selectedConsistance : features[0].properties.consistance,
                    selectedDateTransactions : features[0].properties.dateTransactions,
                    selectedImages : features[0].properties.images,
                    selectedTransactionId : features[0].properties.transactionId,
                    selectedAgenceTransaction : this.props.agences.filter(agence => agence.responsable === features[0].properties.contributeurId)
        
            })
            }
        })
        .catch(err => {})
        
        });
window.map.on('mouseleave', 'transactions-cdp', (e) => {
    if(e.originalEvent.toElement.tagName==="CANVAS"){
        this.setState({popup : false})
    }
})
window.map.on('mouseleave', 'agences', (e) => {
    if(e.originalEvent.toElement.tagName==="CANVAS"){
        this.setState({popupAgence : false})
    }
})

this.buildPolygoneOverlay(window.map);
this.buildCommunesPolygoneOverlay(window.map);

}


buildPolygoneOverlay(map) {



    var hoveredStatePolyId = null;

    map.addSource('poly', {
    'type': 'geojson',
    'data': CDP
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
    'line-color': '#2ea7f9',
    
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
    map.on('zoom', () => {
        if (map.getZoom() > 11) {
            map.setLayoutProperty('poly-fills', 'visibility', 'visible')
            map.setLayoutProperty('poly-borders', 'visibility', 'visible');
            // this.setState({communesVisibility : 'none'})
            
            
            
        }
         else {
            map.setLayoutProperty('poly-fills', 'visibility', 'none')
            map.setLayoutProperty('poly-borders', 'visibility', 'none');
            this.setState({communesVisibility : 'visible'})
        
            // map.setLayoutProperty('points', 'visibility', 'none')
            // map.setLayoutProperty('points', 'visibility', 'none');
        }
    })
    
     
    // When the user moves their mouse over the state-fill layer, we'll update the
    // feature state for the feature under the mouse.
    map.on('mousemove', 'poly-fills', (e) => {
    
    if(map.getZoom()>11){
    if (e.features.length > 0) {
    if (hoveredStatePolyId) {
    map.setFeatureState(
    { source: 'poly', id: hoveredStatePolyId },
    { hover: false }
    );
    }
    
    hoveredStatePolyId = e.features[0].id;
    map.setFeatureState(
    { source: 'poly', id: hoveredStatePolyId },
    { hover: true }
    );
    }
}
else {
    if (hoveredStatePolyId) {
        map.setFeatureState(
        { source: 'poly', id: hoveredStatePolyId },
        { hover: false }
        );
        }
}
    });
    map.on('mouseleave', 'poly-fills', function (e) {
       
        map.setFeatureState(
        { source: 'states', id: hoveredStatePolyId },
        { hover: false }
        );
        });
     

}

buildCommunesPolygoneOverlay(map) {


var hoveredStateId = null;


map.addSource('states', {
'type': 'geojson',
'data': communesJson
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
'line-color': '#2ea7f9',
'line-width': [
'case',
['boolean', ['feature-state', 'hover'], false],
3,
0
]
}
});
map.on('zoom', () => {
    if (map.getZoom() > 11) {
        
        map.setLayoutProperty('state-fills', 'visibility', 'none')
        map.setLayoutProperty('state-borders', 'visibility', 'none');
        
        
    }
     else {
        map.setLayoutProperty('state-fills', 'visibility', 'visible')
        map.setLayoutProperty('state-borders', 'visibility', 'visible');
        // map.setLayoutProperty('points', 'visibility', 'none')
        // map.setLayoutProperty('points', 'visibility', 'none');
    }
})
map.setLayoutProperty('state-fills', 'visibility', 'visible')
map.setLayoutProperty('state-borders', 'visibility', 'visible');

// When the user moves their mouse over the state-fill layer, we'll update the
// feature state for the feature under the mouse.
map.on('mousemove', 'state-fills', function (e) {
if(map.getZoom()<=11){
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
}
else{
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
        { hover: false }
        );
        }

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




// map.on('click', 'state-fills', function (e) {
// var visibility = map.getLayoutProperty('state-fills', 'visibility');
// if(visibility === 'visible'){
// map.setLayoutProperty('state-fills', 'visibility', 'none')
// map.setLayoutProperty('state-borders', 'visibility', 'none');
// map.setLayoutProperty('poly-fills', 'visibility', 'visible')
// map.setLayoutProperty('poly-borders', 'visibility', 'visible');
// map.setLayoutProperty('points', 'visibility', 'visible')
// map.setLayoutProperty('points', 'visibility', 'visible');
// map.flyTo({               center: e.lngLat,
//     zoom : 12.5
//     });
// }
// });

}
handleSelect = async value => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    this.setState({address: value, coordinates:latLng})
    this.setState({center : [latLng.lng,latLng.lat],zoom : [14.1]})

};
    componentDidMount(){

    this.setState({loading : false})
    if(this.props.match.params.city ==="vente-recente"){
        this.props.dispatch({type : "OPEN_TRANSACTION_MODAL"})
    }

    }
componentDidUpdate(prevProps){
    if(this.props.lat !== prevProps.lat || this.props.lng !== prevProps.lng ){
        this.setState({center : [this.props.lng, this.props.lat]})
    }
    if(this.props.zoom !== prevProps.zoom){
        this.setState({zoom : [this.props.zoom]})
    }
}
    render() {


        const { classes } = this.props;

        return (
            <div>
                {this.state.loading ? (
                                    <div className="mapContainer" id="mapBoxContainer" data-tap-disabled="true"></div>
                ) : (
                    <>
                <div className="pricing-top-side-input-search">
                            <PlacesAutocomplete
                                value={this.state.address}
                                onChange={(e) => {this.setState({address: e})}}
                                onSelect={this.handleSelect}
                                searchOptions={{
                                    componentRestrictions : {
                                        country : ["MA"]
                                    }
                                }}
                            >
                                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                    <div className = "pricing-search">
                                        <input className="input-form input-form-search" type="text" {...getInputProps({placeholder:"Entrez une adresse"})} />
                                        {this.state.coordinates.lng !==null && this.state.coordinates.lat !==null ? (
                                            <button className="button button-primary btn-searchbar" type = "button"  onClick={() => {
                                                this.props.dispatch({ type: 'SET_URL_VIEWPORT', data: {latitude :this.state.coordinates.lat , longitude: this.state.coordinates.lng}});   
                                            }}>
                                                <i class="fas fa-search"></i>
                                            </button>
                                        ):(
                                            <button className="button button-primary btn-searchbar" type = "button">
                                                <i class="fas fa-search"></i>
                                            </button>
                                        )}
                                        <div>
                                            <div className="search-results">
                                                {loading ? <div className="search-results-items">...Chargement</div> : null}
                                                {suggestions.map(suggestion => {
                                                    const style = {
                                                        backgroundColor: suggestion.active ? "#ddd" : "transparent"
                                                    };
                                                    return (
                                                        <div className="search-results-items"> 
                                                            <div  {...getSuggestionItemProps(suggestion, { style })}>
                                                                {suggestion.description}
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </PlacesAutocomplete>
                            <button className="button button-primary button--secondary map-switch" onClick={() => {
                                this.props.dispatch({type : "DISPLAY_PHONE" , data : false})
                            }}>
                            Voir la liste
                        </button>
                        </div>
                     
                {/* price descriptions */}
                <div className="pricing-top-side-price-bar">
                <Suspense fallback={<></>}>
                    <PriceBarComponent zoom={this.state.zoom[0]} />
                    </Suspense>
                </div>
                <div className="map-outside--container" data-tap-disabled="true">                
                <Map
            // eslint-disable-next-line
  style="mapbox://styles/badrbelkeziz/cknpum8me2zhd17p7g47z0204"
  containerStyle={{
    height: 'calc(100vh - 180px)',
    width: '100%'
  }}
  center = {this.state.center}
  zoom = {this.state.zoom}
  renderChildrenInPortal={false}
  onDrag ={this.onDrag}
  flyToOptions = {flyToOptions}
  onStyleLoad={ el => this.handleMap(el) }
>
<ZoomControl/>
 
<GeoJSONLayer  data={CDP} id='cdp' fillPaint= {{
        'fill-color': '#2da7f9',
        'fill-opacity': 0
        }}
        fillLayout={{
            'visibility' : this.state.polygonesVisibility
    }}
    fillOnClick={e => this.onClickPolygone(e)}
    fillOnMouseMove={e => this.onMovePolygone(e)}
>
 </GeoJSONLayer>

<GeoJSONLayer  data={communesJson} id='communes' fillPaint= {{
        'fill-color': '#2da7f9',
        'fill-opacity': 0
        }}
        fillLayout={{
            'visibility' : this.state.communesVisibility
    }}
    
    fillOnClick={e => this.onClickCommune(e)}
    fillOnMouseMove={e => this.onMoveCommune(e)}
>
    </GeoJSONLayer>
{this.props.moreInfo ? (
    <Suspense fallback={<></>}>
    <TransactionPage moreInfo={this.props.moreInfo} />
    </Suspense>
) : ('')
}


 {this.state.popup && (
 <Popup key={1} coordinates={this.state.selectedPosition} anchor="bottom" className="popup--container">
     <Suspense fallback={<></>}>
     <PopupContainer moreInfo={this.props.moreInfo} selectedAddress={this.state.selectedAddress} agenceTransaction={this.state.selectedAgenceTransaction[0]} images={this.state.selectedImages}  agence={this.state.selectedAgence} consistance={this.state.selectedConsistance} dateTransactions={this.state.selectedDateTransactions} transactionId={this.state.selectedTransactionId} />
    </Suspense>
     <button class="mapboxgl-popup-close-button" type="button" aria-label="Close popup" onClick = {() => {this.setState({popup : false})}}>×</button>          
</Popup>
 )}
  {this.state.popupAgence && (
 <Popup key={2} coordinates={this.state.selectedPositionAgence} anchor="bottom" className="popup--container">
     <Suspense fallback={<></>}>
     <PopupAgenceContainer nameEntreprise={this.state.selectedNameEntreprise} countTransactions={this.state.selectedCountTransactions} contributeurId = {this.state.selectedContributeurId} user_image = {this.state.selectedUserImage} />
     </Suspense>
     <button class="mapboxgl-popup-close-button" type="button" aria-label="Close popup" onClick = {() => {this.setState({popupAgence : false})}}>×</button>          
</Popup>
 )}
</Map>
               <div className="layer-filter-container">
               <div className="layer-filter-filters">
               
                   <div className="layer-filter-filters-holder">
                       <div className="layer-filter-filters-input">
                           <input
                           type="checkbox"
                           checked={this.state.transactionShow}
                           onChange={(e) => {this.handleChangeTransactions(e.target.checked);}}
                           ></input>
                           <span class="checkmark"></span>
                       </div><div className="legend--subtitle-container">
                       <div className="marker-transac"></div>
                       <div className="layer-filter-filters-title">Biens vendus</div>
                       </div>
                   </div>
                   {/* Places */}
                   <div className="layer-filter-filters-holder">
                       <div className="layer-filter-filters-input">
                           <input
                           type="checkbox"
                           checked={this.state.placesShow}
                           onChange={(e) => {this.handleChangeAgences(e.target.checked);}}
                           ></input>
                           <span class="checkmark"></span>
                       </div><div className="legend--subtitle-container">
                       <div className="marker-transac-agence"></div>
                       <div className="layer-filter-filters-title">Agences</div>
                       </div>
                   </div>
              
               </div>
           </div>
           </div>
            </>
              )}

                

<Dialog
                open={this.state.moreInfo}
                disableBackdropClick={false}
                onClose={this.closeModal}
                classes={{paperWidthSm: classes.paperWidthSm }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                    <DialogContent>
                        <ObtenirLePrix 
                        images={this.props.images} consistance={this.props.consistance}
                        selectedAddress={this.props.selectedAddress}
                        dateTransactions={this.props.dateTransactions}      
                        construction={this.props.construction}
                        agenceTransaction={this.props.agenceTransaction}
                        transactionId={this.props.transactionId}/>
  
                    </DialogContent>
                </Dialog>
     








            </div>


        )
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
        displayPhone : state.card.displayPhone,
        moreInfo : state.card.moreInfo
    };
};
export default connect(mapStateToProps)(withStyles(styles)(withRouter(PriceCard)));
