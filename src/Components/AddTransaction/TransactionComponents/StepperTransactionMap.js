import React from 'react';
import './StepperTransactionMap.scss';
import ReactMapGL, {Marker, FlyToInterpolator} from 'react-map-gl'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { connect } from "react-redux";
import Axios from 'axios';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng
} from "react-places-autocomplete";
import utm from 'url-utm-params'

import {GMAPS_API_KEY} from '../../../Config/GMapsConfig'
const MAPBOX_TOKEN ="pk.eyJ1IjoiYmFkcmJlbGtleml6IiwiYSI6ImNraDduNjN2bDA2MGszMG5zZHRqNm5zMzIifQ.oITjlONmSiUQsFKrZfFd3w";

class StepperTransactionMap extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            viewport: null,
            address : '',
            coordinates: {
                lat: null,
                lng: null
            },
            transitionDuration: 1000,
            transitionOptions: {
                zoom: 10,
                speed: 1,
                screenSpeed: 1,
                curve: 2,
            }
        }
    }

    myMap = React.createRef();

    // getPolygones() {
    //     const db = firebase.firestore();
    //     const polygonesData = [];
    //     db.collection('polygones').onSnapshot((snapshot) => {
    //         snapshot.forEach((doc) => polygonesData.push({ ...doc.data()}));
    //         if (polygonesData.length === snapshot.docs.length) {
    //             this.props.dispatch({ type: 'SET_TRANS_POLYGONES', data: polygonesData});
    //         }
    //     });
    // }

    onHandleNextChange = () => {
        if(this.props.espacePro.pointExist === false){
            this.handleClickOpenLocationErrorModal()
        }else{
            this.handleClickOpenConfirmationModal();
        }
    }

    //Location modal
    handleClickOpenLocationErrorModal = () => {
        this.props.dispatch({ type: 'UPDATE_TRANS_LOCATION_ERROR_MODAL', data: true});
    };

    //Confirmation modal
    handleClickOpenConfirmationModal = () => {
        this.props.dispatch({ type: 'UPDATE_TRANS_CONFIRMATION_MODAL', data: true});
    };

    placeMarker = (event) => {
        if (event.target.classList[0] === 'mapboxgl-ctrl-geocoder--input') {
            return;
        }
        const newviewPort = {
            latitude: parseFloat(event.lngLat[1]),
            longitude: parseFloat(event.lngLat[0]),
            transitionDuration: this.state.transitionDuration,
            transitionInterpolator:  new FlyToInterpolator(this.state.transitionOptions),
            zoom: 18
        }
        this.props.dispatch({ type: 'SET_TRANS_MARKER_LOCATION', data: { latitude: newviewPort.latitude, longitude: newviewPort.longitude }})
        this.handleViewportChange(newviewPort);

        // const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${newviewPort.latitude},${newviewPort.longitude}&key=${GMAPS_API_KEY}`;
        // delete Axios.defaults.headers.common["Authorization"];
        // delete Axios.defaults.headers.common["authorization"];

        // Axios.get(url).then(res => {
        //     if (res.data.results.length > 0) {
        //         const data = {
        //             address : res.data.results[0].formatted_address,
        //             ville: res.data.results[0].address_components[2].long_name
        //         }
        //         this.props.dispatch({ type: 'SET_TRANS_CURRENT_ADDRESS', data: data});
        //         this.setState({
        //             address: res.data.results[0].formatted_address
        //         });
        //     }
        // });
        // Axios.defaults.headers.common["Authorization"]=localStorage.getItem("FBIdToken")

    }

    searchMarker = (event, item)=> {
        const newviewPort = event;
        if (newviewPort.zoom < 11) {
            newviewPort.zoom = 13;
        }
        newviewPort.transitionDuration = this.transitionDuration;
        newviewPort.transitionInterpolator = new FlyToInterpolator(this.state.transitionOptions);

        this.props.dispatch({ type: 'SET_TRANS_MARKER_LOCATION', data: { latitude: newviewPort.latitude, longitude: newviewPort.longitude }})
        this.handleViewportChange(newviewPort);
    }

    handleSelect = async value => {
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);

        this.setState({address: value, coordinates:latLng})

        const newviewPort = {
            pitch: 30,
            zoom: 18,
            latitude: latLng.lat,
            longitude: latLng.lng
        };

        newviewPort.transitionDuration = this.state.transitionDuration;
        newviewPort.transitionInterpolator = new FlyToInterpolator(this.state.transitionOptions);

        this.props.dispatch({ type: 'SET_TRANS_MARKER_LOCATION', data: { latitude: newviewPort.latitude, longitude: newviewPort.longitude }})
        this.handleViewportChange(newviewPort);
        delete Axios.defaults.headers.common["Authorization"];
        delete Axios.defaults.headers.common["authorization"];
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${newviewPort.latitude},${newviewPort.longitude}&key=${GMAPS_API_KEY}`;

        Axios.get(url).then(res => {
            if (res.data.results.length > 0) {
                const data = {
                    address : res.data.results[0].formatted_address,
                    ville: res.data.results[0].address_components[2].long_name
                }
                this.props.dispatch({ type: 'SET_TRANS_CURRENT_ADDRESS', data: data});
                this.setState({
                    address: res.data.results[0].formatted_address
                });
                
            }
        });
        Axios.defaults.headers.common["Authorization"]=localStorage.getItem("FBIdToken")

    };

    handleViewportChange =  (viewport) => {
        
        this.setState({
            viewport: viewport
        });
        this.props.dispatch({ type: 'UPDATE_TRANS_POINTEXIST', data: false});
        this.props.dispatch({ type: 'UPDATE_TRANS_POSITIONSELECTED', data: false});
        const lat = parseFloat(this.props.espacePro.marker.latitude);
        const lng = parseFloat(this.props.espacePro.marker.longitude);
        this.props.dispatch({ type: 'UPDATE_TRANS_LOCALIZATION', data: {pointExist: true, localisation: "lat : "+lat+" lng : "+lng}});    


        // const datas = [];
        // if (this.props.espacePro.polygones.length > 0) {
            
        //     this.props.espacePro.polygones.forEach(element => {
        //         var coords = [];
        //         var remplaceSomeChars = element.polygone.replace('POLYGON ((','').replace('))','');
        //         var splitData = remplaceSomeChars.split(",");
        //         splitData.forEach(function(obj){
        //             var trim = obj.trim();
        //             var splitData2 = trim.split(" ");
        //             var coord2 = [];
        //             splitData2.forEach(function(obj2){
        //                 coord2.push(parseFloat(obj2))
        //             })
        //             coords.push(coord2)
        //         });
        //         datas.push({coords, text: element.text})
        //     });   
        //     const polygones = [];

            
        //     for (let data of datas) {
        //         polygones.push({coords:data.coords, text: data.text})
        //     }
            
        //     for (let poly of polygones) {
        //         const lat = parseFloat(this.props.espacePro.marker.latitude);
        //         const lng = parseFloat(this.props.espacePro.marker.longitude);
        //         const point = [lng, lat];
        //         // ////console.logpoint)
        //         if(this.checkPointExist(point, poly)){
        //             // ////console.logpoly)
        //             this.props.dispatch({ type: 'UPDATE_TRANS_LOCALIZATION', data: {pointExist: true, localisation: "lat : "+lat+" lng : "+lng}});    
        //             break;
        //         }
        //     }
        // }
    }

    checkPointExist = (point, vs) => {
        var x = point[0], y = point[1];

        var inside = false;
        for (var i = 0, j = vs.coords.length - 1; i < vs.coords.length; j = i++) {
            var xi = vs.coords[i][0], yi = vs.coords[i][1];
            var xj = vs.coords[j][0], yj = vs.coords[j][1];
            
            var intersect = ((yi > y) !== (yj > y))
                && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            if (intersect) { inside = !inside};
        }

        if (inside) {
            this.props.dispatch({ type: 'UPDATE_TRANS_ZONE', data: vs.text});
        }
        
        return inside;
    };

    handleCloseConfirmationModal = () => {
        this.props.dispatch({ type: 'UPDATE_TRANS_CONFIRMATION_MODAL', data: false});
    };

    handleCloseLocationErrorModal = () => {
        this.props.dispatch({ type: 'UPDATE_TRANS_LOCATION_ERROR_MODAL', data: false});
    };

    componentDidMount = () => {

        let initialViewport = {}

        if (
            this.props.espacePro.urlViewport.latitude !== null &&
            this.props.espacePro.urlViewport.longitude !== null
        )
        {
            this.setState({
                viewport : {
                    latitude: this.props.espacePro.urlViewport.latitude,
                    longitude: this.props.espacePro.urlViewport.longitude,
                    center: [-7.6502371, 33.4661958],
                    pitch: 30,
                    zoom: 10,
                    minZoom: 10
                }
            })

            const newviewPort = {
                latitude: this.props.espacePro.urlViewport.latitude,
                longitude: this.props.espacePro.urlViewport.longitude,
                pitch: 30,
                zoom: 10,
                minZoom: 10
            };
            
            // ref at this link
            // https://visgl.github.io/react-map-gl/docs/api-reference/fly-to-interpolator
            newviewPort.transitionDuration = this.transitionDuration;
            newviewPort.transitionInterpolator = new FlyToInterpolator(this.state.transitionOptions);
    
            this.props.dispatch({ type: 'SET_TRANS_MARKER_LOCATION', data: { latitude: newviewPort.latitude, longitude: newviewPort.longitude }})
            this.handleViewportChange(newviewPort);

            const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${newviewPort.latitude},${newviewPort.longitude}&key=${GMAPS_API_KEY}`;

            Axios.get(url).then(res => {
                if (res.data.results.length > 0) {
                    const data = {
                        address : res.data.results[0].formatted_address,
                        ville: res.data.results[0].address_components[2].long_name
                    }
                    this.props.dispatch({ type: 'SET_TRANS_CURRENT_ADDRESS', data: data});
                    this.setState({
                        address: res.data.results[0].formatted_address
                    });
                    
                }
            });
        }else{

            initialViewport = {
                latitude:33.5661958,
                longitude:-7.6502371,
                pitch: 30,
                zoom: 10,
                minZoom: 10
            }
            this.setState({
                viewport: initialViewport
            })
        }

        
        // this.getPolygones();

    }
    handleAddressChange = (e) => {
        this.setState({address: e})
        this.props.espacePro.transaction.address = e;
        }
    

    

    render() {
        return (
            <div className="row justify-content">
                <Dialog
                open={this.props.espacePro.openConfirmationModal}
                onClose={this.handleCloseConfirmationModal}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                    <DialogContent>
                        <DialogContentText id="alert-dialog-localisation-error">
                            <div  className="text-center">
                                <h5>Avez-vous localisé votre bien avec précision?</h5>
                                <p>Le marqueur placé sur la carte servira de référence pour cette transaction </p>
                                <button className="button button-default"  onClick={this.handleCloseConfirmationModal}>
                                    Non, je vérifie
                                </button>
                                <button className="button button-primary"  onClick={() => {
                                    if (
                                        // this.props.espacePro.transaction.zone &&
                                        this.props.espacePro.marker.latitude &&
                                        this.props.espacePro.marker.longitude
                                    ) {
                                        this.props.dispatch({ type: 'CONFIRM_TRANS_ADDRESS_SELECTION'});   
                                    }
                                }}>
                                    Oui, je continue
                                </button>
                                
                            </div>
                        </DialogContentText>
                    </DialogContent>
                </Dialog>

                <Dialog
                open={this.props.espacePro.openLocationErrorModal}
                onClose={this.handleCloseLocationErrorModal}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                    <DialogContent>
                        <DialogContentText id="alert-dialog-localisation-error">
                            <div  className="text-center">
                                {
                                    this.state.viewport && this.state.viewport.longitude === -7.6502371 && this.state.viewport.latitude === 33.5661958 ? (

                                        <div>
                                            <h5>Vous n'avez pas localisé votre bien !</h5>
                                            <p>Entrez l'adresse du bien à estimer ou cliquez sur la zone souhaité pour commencer votre estimation.</p>
                                            <button className="button button-primary"  onClick={this.handleCloseLocationErrorModal}>
                                                Ok
                                            </button>
                                        </div>
                                    ): (
                                        <div>
                                            <h5>Vous n'avez pas placé le bien</h5>
                                            <p>Veuillez taper une adresse ou cliquer sur la carte pour placer le bien</p>
                                            <button className="button button-primary"  onClick={this.handleCloseLocationErrorModal}>
                                                Continuer
                                            </button>
                                        </div>
                                    )
                                }
                                
                            </div>
                        </DialogContentText>
                    </DialogContent> 
                </Dialog>

                <div className="col-md-12 col-lg-8">
                <div className="step first-step">
   
                    <div className="left-side-transaction-map">
                    <div className="sectionTitle desktop">
                        <h5>Placez le marqueur sur la carte</h5>
                    </div>
                    <div className="input-search input-search--mobile">
                                    <form className="map--form-mobile">
                                    <input type="hidden" name="utm_medium" value={utm.utm(window.location.href).utm_medium}></input>
   	<input type="hidden" name="utm_campaign" value={utm.utm(window.location.href).utm_campaign}></input>
   	<input type="hidden" name="utm_content" value={utm.utm(window.location.href).utm_content}></input>
	<input type="hidden" name="utm_term" value={utm.utm(window.location.href).utm_term}></input>
                                        <PlacesAutocomplete
                                                value={this.state.address}
                                                onChange={this.handleAddressChange}
                                                onSelect={this.handleSelect}
                                                // searchOptions={{
                                                //     location: new google.maps.LatLng(33.589886, -7.603869),
                                                //     radius: 2000,
                                                // }}
                                                searchOptions={{
                                                    componentRestrictions : {
                                                        country : ["MA"]
                                                    }}
                                                }
                                            >
                                            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                                <div className="search--container">
                                        <input className="input-form" type="text"   {...getInputProps({placeholder: "Entrez une adresse ou un lieu à proximité"})}  />
                                            
                               
                                            <div>
                                            <div>

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
// <div>
                                            // <input className="input-form" type="text"  {...getInputProps({placeholder:"Rentrer l’adresse du bien"})}  />
                                            
                                            // <div>
                                            // <div className="search-results">

                                            // {loading ? <div className="search-results-items">...Chargement</div> : null}

                                            // {suggestions.map(suggestion => {
                                            //     const style = {
                                            //     backgroundColor: suggestion.active ? "#ddd" : "transparent"
                                            //     };

                                            //     return (
                                            //     <div className="search-results-items"> 
                                            //         <div  {...getSuggestionItemProps(suggestion, { style })}>
                                            //             {suggestion.description}
                                            //         </div>
                                            //     </div>
                                                
                                            //     );
                                            // })}
                                            // </div>
                                            // </div>
                                            // </div>
                                            )}
                                              {/* <div className="search--container">
                                            <input className="input-form" type="text"  {...getInputProps({placeholder:"Entrez l’adresse du bien"})}  />
                                            
                               
                                            <div>
                                            <div>

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
                                            */}
                                        </PlacesAutocomplete>
                                    
                                    </form>
                            </div>
                            <div className = "first-button first-button-transaction">
                    <button className="button button-primary primaryyCustom" type="button" onClick={this.onHandleNextChange}>Valider</button>
                </div> 
                    </div>
                    <div className="right-side-map right-side-transaction-map">
                    
                        <div className="map" >
                         
                            <ReactMapGL
                            ref={this.myMap}
                            {...this.state.viewport}
                            width="width: 100vw"
                            height="500px"
                            className="react-map-gl-custom"
                            mapStyle="mapbox://styles/badrbelkeziz/ckk6r9vo20yzr17qbv2mf76b4"
                            mapboxApiAccessToken={MAPBOX_TOKEN}
                            onClick={this.placeMarker}
                            onViewportChange={(viewport) => {
                                this.setState({
                                    viewport: viewport
                                })
                              }}
                            >
                                {this.props.espacePro.marker.longitude ? (
                                    <Marker 
                                    longitude={this.props.espacePro.marker.longitude}
                                    latitude={this.props.espacePro.marker.latitude}>
                                        <div className="markerpoint"></div>
                                    </Marker>
                                ) : ('')}
                            </ReactMapGL>
                        </div> 
                   </div>
                    </div>
                </div>
           
                
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    const transaction = state.espacePro;
    // ////console.logtransaction)
    return {
      espacePro: transaction
        };
};

export default connect(mapStateToProps)(StepperTransactionMap);
