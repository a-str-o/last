import React from 'react';
import './StepperEstimationMap.scss';
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
import {theme} from '../../../assets/theme'
import TextField from '@material-ui/core/TextField';
import "./EstimationTitre.scss"
import { toast } from "react-toastify";
import utm from 'url-utm-params'





//Material ui
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {ThemeProvider} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {Box, InputLabel} from '@material-ui/core';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import {GMAPS_API_KEY} from '../../../Config/GMapsConfig';
import { Link } from 'react-router-dom';
import { css } from "@emotion/core";
import BeatLoader from "react-spinners/BeatLoader";
import { CSSTransition } from 'react-transition-group';
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
const MAPBOX_TOKEN ="pk.eyJ1IjoiYmFkcmJlbGtleml6IiwiYSI6ImNraDduNjN2bDA2MGszMG5zZHRqNm5zMzIifQ.oITjlONmSiUQsFKrZfFd3w";


class StepperEstimationMap extends React.Component {
    
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
            },
            // ville : "Casablanca",
            cityCoverage : true,
            lookingForZone : false, 
            openLocationErrorModal : false,
            openConfirmationModal : false,
            openLocationMissing : false,
            pointExist : false,
            titre_1 : "",
            titre_2 : "",
            looking : false,
            titre_error : false,
            reference_titre : "T"
        }
    }

    myMap = React.createRef();
    cityCoverageList = ["Casablanca", "Tanger", "Rabat", "Fès", "Marrakech"]

    onHandleNextChange = () => {
        if( this.props.estimationStatePro.pointExist){
        if(this.props.estimationStatePro.marker.latitude && this.props.estimationStatePro.marker.longitude){
        this.setState({openConfirmationModal : true})
        }
        else {
            ////console.log("no marker")
            this.setState({openLocationMissing : true})

        }
    }
    else {
        this.setState({openLocationMissing : true})
    }
    }

    //Location modal
    handleClickOpenLocationErrorModal = () => {
        this.props.dispatch({ type: 'PRO_UPDATE_LOCATION_ERROR_MODAL', data: true});
    };

    //Confirmation modal
    handleClickOpenConfirmationModal = () => {
        this.props.dispatch({ type: 'PRO_UPDATE_CONFIRMATION_MODAL', data: true});
    };

    placeMarker = (event) => {
        if (event.target.classList[0] === 'mapboxgl-ctrl-geocoder--input') {
            return;
        }
        this.props.dispatch({ type: 'PRO_UPDATE_POINTEXIST', data: true});
        // this.setState({pointExist : true})
        // // ////console.log("marker")
        const newviewPort = {
            latitude: parseFloat(event.lngLat[1]),
            longitude: parseFloat(event.lngLat[0]),
            transitionDuration: this.state.transitionDuration,
            transitionInterpolator:  new FlyToInterpolator(this.state.transitionOptions),
            zoom: 18
        }
        this.props.dispatch({ type: 'PRO_SET_MARKER_LOCATION', data: { latitude: newviewPort.latitude, longitude: newviewPort.longitude }})
        this.handleViewportChange(newviewPort);

        // const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${newviewPort.latitude},${newviewPort.longitude}&key=${GMAPS_API_KEY}`;

        // delete Axios.defaults.headers.common["Authorization"];
        // delete Axios.defaults.headers.common["authorization"];

        // Axios.get(url).then(res => {
        //     Axios.defaults.headers.common["Authorization"]=localStorage.getItem("FBIdToken")
        //     // ////console.log(res)
        //     let data;
        //     if (res.data.results.length > 0) {
        //     //     if(res.data.results[0].address_components[1].types[0]=="locality"){
            //     data = {
            //         address : res.data.results[0].formatted_address,
            //         ville: res.data.resultgclouds[0].address_components[1].long_name
            //     }
            //     // ////console.log("1")
            // }
            // else if(res.data.results[0].address_components[2].types[0]=="locality"){

            //     data = {
            //         address : res.data.results[0].formatted_address,
            //         ville: res.data.results[0].address_components[2].long_name
            //     }
            //     // ////console.log("2")
            // }
            // else if(res.data.results[0].address_components[3].types[0]=="locality"){
            //     data = {
            //         address : res.data.results[0].formatted_address,
            //         ville: res.data.results[0].address_components[3].long_name
            //     }
            //     // ////console.log("3")
            // }
            // else{
            //     data = {
            //         address : res.data.results[0].formatted_address,
            //         ville: res.data.results[0].address_components[4].long_name
            //     }
            //     // ////console.log("4")
            // }
        //     res.data.results[0].address_components.forEach(component => {
        //         if (component.types.includes('locality')) {
        //          data = {
        //              address : res.data.results[0].formatted_address,
        //              ville: component.long_name
        //         }
        //         this.props.estimationStatePro.currentAdress = data.address;
        //         // ////console.log(this.props.estimationState)
        //             this.setState({ville : data.ville})
        //             this.props.dispatch({ type: 'PRO_SET_CURRENT_ADDRESS', data: data});
        //             this.setState({
        //                 address: res.data.results[0].formatted_address
        //             });
        //         }
        //     });

        //     }
        // })
        // .catch(err => {
        //     // ////console.log(err)
        // });
    }


    searchMarker = (event, item)=> {
        const newviewPort = event;
        if (newviewPort.zoom < 11) {
            newviewPort.zoom = 13;
        }
        newviewPort.transitionDuration = this.transitionDuration;
        newviewPort.transitionInterpolator = new FlyToInterpolator(this.state.transitionOptions);

        this.props.dispatch({ type: 'PRO_SET_MARKER_LOCATION', data: { latitude: newviewPort.latitude, longitude: newviewPort.longitude }})
        this.handleViewportChange(newviewPort);
    }

    handleSelect = async value => {
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);
        // ////console.log(results)
        // ////console.log(latLng)
        this.setState({address: value, coordinates:latLng})

        const newviewPort = {
            pitch: 0,
            zoom: 16,
            latitude: latLng.lat,
            longitude: latLng.lng
        };

        newviewPort.transitionDuration = this.state.transitionDuration;
        newviewPort.transitionInterpolator = new FlyToInterpolator(this.state.transitionOptions);

        this.props.dispatch({ type: 'PRO_SET_MARKER_LOCATION', data: { latitude: newviewPort.latitude, longitude: newviewPort.longitude }})
        this.handleViewportChange(newviewPort);

        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${newviewPort.latitude},${newviewPort.longitude}&key=${GMAPS_API_KEY}`;
        // ////console.log("here")
        delete Axios.defaults.headers.common["Authorization"];
        delete Axios.defaults.headers.common["authorization"];
        Axios.get(url).then(res => {
            Axios.defaults.headers.common["Authorization"]=localStorage.getItem("FBIdToken")
            const firstMatch = res.data.results[0];
            const address = firstMatch.formatted_address;
            let city = null;
            // ////console.log(address)
            // ////console.log(firstMatch)

            firstMatch.address_components.forEach(component => {
                if (component.types.includes('locality')) {
                    city = component.long_name;
                    this.setState({ville : city})
                }
            });
            const data = {
                address : address,
                ville: city
            }
            this.props.dispatch({ type: 'PRO_SET_CURRENT_ADDRESS', data: data});
            this.setState({
                address: data.address
            });

        })
        .catch(err => {
            // ////console.log(err)
        });
    };

    handleViewportChange =  (viewport) => {

        this.setState({
            viewport: viewport
        });
        // ////console.log(viewport)
        // this.props.dispatch({ type: 'PRO_UPDATE_POINTEXIST', data: false});
        this.props.dispatch({ type: 'PRO_UPDATE_POSITIONSELECTED', data: false});
        this.props.dispatch({ type: 'PRO_ERASE_POINT_COVERED', data: {pointCovered : false, pointExist: true}});    
        // const datas = [];
        // if (this.props.polygonesRaw.length > 0) {
        //     this.props.polygonesRaw.forEach(element => {
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
        //         const lat = parseFloat(viewport.latitude);
        //         const lng = parseFloat(viewport.longitude);
        //         const point = [lng, lat];
        //         if(this.checkPointExist(point, poly)){
        //             this.props.dispatch({ type: 'PRO_UPDATE_LOCALIZATION', data: {pointCovered : true, pointExist: true, localisation: "lat : "+lat+" lng : "+lng}});    
        //             break;
        //         }
        //     }
        // }
    }

    checkPointInZone(){
        const lat = parseFloat(this.props.estimationStatePro.marker.latitude);
        const lng = parseFloat(this.props.estimationStatePro.marker.longitude);
        const dataForPoint = {
            find_zone : true,
            lat : lat,
            lng : lng
        }                        
        delete Axios.defaults.headers.common["Authorization"];
        delete Axios.defaults.headers.common["authorization"];
        Axios.post(
            'https://cli482fnl7.execute-api.eu-west-3.amazonaws.com/default/lambdassh',JSON.stringify(dataForPoint)
        ).then(res => {
            Axios.defaults.headers.common["Authorization"]=localStorage.getItem("FBIdToken")
            if(res.data===""){
                this.setState({openLocationErrorModal : true})
                this.setState({lookingForZone : false})
            }
            else 
            {
                this.props.dispatch({ type: 'PRO_UPDATE_ZONE', data: res.data});
                this.props.dispatch({ type: 'PRO_UPDATE_LOCALIZATION', data: {pointCovered : true, pointExist: true, localisation: "lat : "+lat+" lng : "+lng}});
                this.props.dispatch({ type: 'PRO_CONFIRM_ADDRESS_SELECTION'});   

                }
        })
        .catch(err => {
            this.setState({lookingForZone : false})
            this.setState({openLocationErrorModal : true})
            Axios.defaults.headers.common["Authorization"]=localStorage.getItem("FBIdToken")
            //console.log(err)
        })
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
            this.props.dispatch({ type: 'PRO_UPDATE_ZONE', data: vs.text});
        }
        
        return inside;
    };

    handleCloseConfirmationModal = () => {
        this.setState({openConfirmationModal : false})
        this.setState({lookingForZone : false})
        // this.props.dispatch({ type: 'PRO_UPDATE_CONFIRMATION_MODAL', data: false});
    };

    handleCloseLocationErrorModal = () => {
        this.props.dispatch({ type: 'PRO_UPDATE_LOCATION_ERROR_MODAL', data: false});
        this.setState({openLocationMissing : false})
        this.setState({openLocationErrorModal : false})
    };

    componentDidMount = () => {
        let initialViewport = {}
        // ////console.log(this.props.estimationStatePro.estimation.ville)
        if (
            this.props.estimationStatePro.estimation.ville ){
                this.setState({ville :this.props.estimationStatePro.estimation.ville  })
            }
        if (
            this.props.estimationStatePro.marker.latitude !== null &&
            this.props.estimationStatePro.marker.longitude !== null
        ) {
            // ////console.log(this.props);
            this.setState({
                ...this.state,
                viewport : {
                    latitude: this.props.estimationStatePro.marker.latitude,
                    longitude: this.props.estimationStatePro.marker.longitude,
                    center: [this.props.estimationStatePro.marker.latitude, this.props.estimationStatePro.marker.longitude],
                    pitch: 0,
                    zoom: 14,
                    minZoom: 10
                },
                address: this.props.estimationStatePro.estimation.adresse
            });

            const newviewPort = {
                latitude: this.props.estimationStatePro.marker.latitude,
                longitude: this.props.estimationStatePro.marker.longitude,
                pitch: 0,
                zoom: 17,
                minZoom: 10
            };
            // ////console.log(newviewPort)
            
            // ref at this link
            // https://visgl.github.io/react-map-gl/docs/api-reference/fly-to-interpolator
            newviewPort.transitionDuration = this.transitionDuration;
            newviewPort.transitionInterpolator = new FlyToInterpolator(this.state.transitionOptions);

            this.props.dispatch({ type: 'PRO_SET_MARKER_LOCATION', data: { latitude: newviewPort.latitude, longitude: newviewPort.longitude }});
            // ////console.log(newviewPort)
            this.handleViewportChange(newviewPort);
        } else {
            initialViewport = {
                latitude: 33.5661958,
                longitude: -7.6502371,
                pitch: 0,
                zoom: 10,
                minZoom: 10
            }
            this.setState({ viewport: initialViewport });
        }
    }
  //select Ville
    renderSwitch = (ville) => {
        switch(ville){
            case "Rabat" :
                return ({ lat : 34.02498776316099, 
                lng : -6.828419769399038})
            case "Casablanca" :
                    return({lat : 33.5755573,
                    lng : -7.6711091})
                case "Tanger" :
                   return({lat : 35.771578198460446,
                    lng : -5.8142020418489295})
        case "Fès" :
         return({lat : 34.035592892306205,
          lng : -5.00722546689532})
          case "Marrakech" :
            return({lat :31.629609634215452,
             lng :  -8.00064699025196})
            default :
                return({lat : 33.9693414,
                lng : -6.9273032})
        }

    }
    handleChange = (event) => {
    this.setState({ville : (event.target.value)});
    let lat;
    let lng;
    lat = this.renderSwitch(event.target.value).lat
    lng = this.renderSwitch(event.target.value).lng
            const newviewPort = {
                pitch: 0,
                zoom: 10,
                latitude: lat,
                longitude: lng
            };
        
            newviewPort.transitionDuration = this.state.transitionDuration;
            newviewPort.transitionInterpolator = new FlyToInterpolator(this.state.transitionOptions);
        
            this.props.dispatch({ type: 'PRO_SET_MARKER_LOCATION', data: { latitude: newviewPort.latitude, longitude: newviewPort.longitude }})
            this.setState({
                viewport: newviewPort
            });
            this.props.dispatch({ type: 'PRO_UPDATE_POINTEXIST', data: false});
            // this.setState({pointExist : false})
            this.props.dispatch({ type: 'PRO_UPDATE_POSITIONSELECTED', data: false});  
            const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${newviewPort.latitude},${newviewPort.longitude}&key=${GMAPS_API_KEY}`;
        
            delete Axios.defaults.headers.common["Authorization"];
            delete Axios.defaults.headers.common["authorization"];
            Axios.get(url).then(res => {
                Axios.defaults.headers.common["Authorization"]=localStorage.getItem("FBIdToken")
                // const firstMatch = res.data.results[0];
                // const address = firstMatch.formatted_address;
                // let city = null;
                // firstMatch.address_components.forEach(component => {
                //     if (component.types.includes('locality')) {
                //         city = component.long_name;
                //     }
                // });
                // const data = {
                //     address : address,
                //     ville: city
                // }
                this.props.dispatch({ type: 'PRO_SET_CURRENT_ADDRESS', data: {address : "", ville : ""}});
                this.setState({
                    address: ""
                });
            });        
    
  };
  handleOuiJeContinue= () => {
    this.setState({openConfirmationModal : false})
    this.setState({lookingForZone : true})
    this.checkPointInZone()
  }
  handleAddressChange = (e) => {
    this.setState({address: e})
    this.props.estimationStatePro.currentAdress = e;
    }
    handleChangeReference = (event) => { 
        this.setState({reference_titre : (event.target.value)});
    }
    placeTitre = (res) => {
        this.props.dispatch({ type: 'PRO_UPDATE_POINTEXIST', data: true});
        
        
        const newviewPort = {
            latitude: parseFloat(res.data[1]),
            longitude: parseFloat(res.data[0]),
            transitionDuration: this.state.transitionDuration,
            transitionInterpolator:  new FlyToInterpolator(this.state.transitionOptions),
            zoom: 18
        }
        this.props.dispatch({ type: 'PRO_SET_MARKER_LOCATION', data: { latitude: newviewPort.latitude, longitude: newviewPort.longitude }})
        this.handleViewportChange(newviewPort);
    }
       

    look_for_titre(){
        let titre_1 = this.state.titre_1;
        let titre_2 = this.state.titre_2;
        this.setState({looking : true, titre_error : false})
        if(titre_1 ==="" || titre_2 ===""){
            toast.error("Veuillez remplir tous les champs pour la recherche par titre")
            this.setState({looking : false})
        }
        else {
            delete Axios.defaults.headers.common["Authorization"];
        delete Axios.defaults.headers.common["authorization"];
        Axios.post("https://cli482fnl7.execute-api.eu-west-3.amazonaws.com/default/lambdassh", {"find_titre" : true, reference : this.state.reference_titre, titre_1 : titre_1, titre_2 : titre_2}).then((res) => {
        Axios.defaults.headers.common["Authorization"]=localStorage.getItem("FBIdToken")    
            if(res.data==="Creating payload ..."){
                this.setState({looking : false, titre_error : true})
            }
            else{
            this.placeTitre(res)
            this.setState({looking : false})
            }
            
        })
        .catch(err => {
            this.setState({looking : false, titre_error : true})
            Axios.defaults.headers.common["Authorization"]=localStorage.getItem("FBIdToken")
        })
    }
    }

  render() {
    return (
        <div className="row justify-content">
            <Dialog
            open={this.state.openConfirmationModal}
            onClose={this.handleOuiJeContinue}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
                <DialogContent>
                    <DialogContentText id="alert-dialog-localisation-error">
                        <div  className="text-center">
                            <h5>Avez-vous localisé votre bien avec précision?</h5>
                            <p>Le marqueur placé sur la carte servira de base à votre estimation. </p>
                            <button className="button button-default"  onClick={this.handleCloseConfirmationModal}>
                                Non, je vérifie
                            </button>
                            <button className="button button-primary"  onClick={this.handleOuiJeContinue}>
                                {/* alert("okk")
                                this.setState({openConfirmationModal : false})
                                this.setState({lookingForZone : true})
                                this.checkPointInZone()
                                // if (
                                //     this.props.estimationStatePro.estimation.zone &&
                                //     this.props.estimationStatePro.marker.latitude &&
                                //     this.props.estimationStatePro.marker.longitude
                                // ) {
                                //     this.props.dispatch({ type: 'PRO_CONFIRM_ADDRESS_SELECTION'});   
                                // }
                            }}> */}
                                Oui, je continue
                            </button>
                            
                        </div>
                    </DialogContentText>
                </DialogContent>
            </Dialog>

            <Dialog
            open={this.state.openLocationErrorModal}
            onClose={this.handleCloseLocationErrorModal}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
                <DialogContent>
                    <DialogContentText id="alert-dialog-localisation-error">
                        <div  className="text-center">
                                    <div>
                                    <h5>Zone non couverte</h5>
                                    <p>Les estimations proches de ce bien seront bientôt disponibles sur agenz.ma <br/> Vous pouvez aussi <Link to="/contact"> nous contacter</Link> pour une estimation personnaliser de votre bien.</p>
                                    <button className="button button-primary"  onClick={this.handleCloseLocationErrorModal}>
                                        Changer d'adresse
                                    </button>
                                </div>        
                        </div>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
            <Dialog
            open={this.state.openLocationMissing}
            onClose={this.handleCloseLocationErrorModal}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
                <DialogContent>
                    <DialogContentText id="alert-dialog-localisation-error">
                        <div  className="text-center">


                                                                        <div>
                                                                        <h5>Vous n'avez pas localisé votre bien !</h5>
                                                                        <p>Entrez l'adresse du bien à estimer ou cliquez sur la zone souhaité pour commencer votre estimation.</p>
                                                                        <button className="button button-primary"  onClick={this.handleCloseLocationErrorModal}>
                                                                            Ok
                                                                        </button>
                                                                    </div>
                            
                        </div>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
            {this.state.lookingForZone ? (
                <div className="left-side-map loading--zone">
                    <BeatLoader color='#2ea7f9' loading={true} css={override} size={15} />
                </div>

                          ) : (
            <div className="left-side-map">
                <div className="sectionTitle desktop">
                    <h5>{`${this.props.estimationStatePro.currentAdress ? "Vérifiez l'adresse du bien à estimer" : "Renseignez l’adresse du bien à estimer"}`}</h5>
                </div>
                <ThemeProvider theme={theme}>
                <FormControl className="citySelect" variant="outlined">
                <InputLabel  id="demo-simple-select-placeholder-label-label">
                    Ville
                </InputLabel>
            <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={this.cityCoverageList.indexOf(this.state.ville)>=0 ? this.state.ville : "Casablanca"}
            onChange={this.handleChange}
            label = {this.state.ville}
            >

          <MenuItem value={"Casablanca"}>Casablanca</MenuItem>
          <MenuItem value={"Rabat"}>Rabat</MenuItem>
          <MenuItem value={"Tanger"}>Tanger</MenuItem>
          <MenuItem value={"Marrakech"}>Marrakech</MenuItem>
          <MenuItem value={"Fès"}>Fès</MenuItem>
          <MenuItem value={"Autre"}>Autre</MenuItem>

        </Select>
        <FormHelperText></FormHelperText>
      </FormControl>
      </ThemeProvider>
                <div className="step first-step">
                    <div className="map" >
                        <div className="input-search">
                            <div className="input-search-container">
                                <form>
                                <input type="hidden" name="utm_source" value={utm.utm(window.location.href).utm_source}></input>
   	<input type="hidden" name="utm_medium" value={utm.utm(window.location.href).utm_medium}></input>
   	<input type="hidden" name="utm_campaign" value={utm.utm(window.location.href).utm_campaign}></input>
   	<input type="hidden" name="utm_content" value={utm.utm(window.location.href).utm_content}></input>
	<input type="hidden" name="utm_term" value={utm.utm(window.location.href).uutm_term}></input>
                                    <PlacesAutocomplete
                                            value={this.props.estimationStatePro.currentAdress}
                                            onChange={this.handleAddressChange}
                                            onSelect={this.handleSelect}
                                            searchOptions={{
                                                componentRestrictions : {
                                                    country : ["MA"]
                                                }
                                            }}
                                        >
                                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                        <div>
                                        <input className="input-form" type="text"   {...getInputProps({placeholder: "Entrez une adresse ou un lieu à proximité"})}  />
                                        
                                        <div style={{position:'relative'}}>
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
                                </form>
                            </div>
                        </div>
                    </div> 
                </div>
                <ThemeProvider theme={theme}>
                    
                    <Box className="helper--text">
                    <InputLabel focused={true} className="helper--text_icon"><HelpOutlineIcon/></InputLabel>
                    <Typography variant="body2" >
                    Si l'adresse n'est pas reconnue, vous pouvez également cliquer sur l'emplacement exact du bien sur la carte pour déplacer le marqueur 
                    </Typography>
                    </Box>
                </ThemeProvider>
                {this.props.uid ==="JzYHZWrhIxX1Edr4LJenGbrNwmC3" ? (
                  <ThemeProvider theme={theme}>
            <h3 className="titres--title">Ou rechercher par titre foncier</h3>
                <div className="titres--container">
                    <div className="ref--container">
                    <FormControl className="titleSelect" >

                    <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={this.state.reference_titre}
          onChange={this.handleChangeReference}
          label="Reference"
        >
          <MenuItem value={"T"}>T</MenuItem>
          <MenuItem value={"R"}>R</MenuItem>
          
        </Select>     
        </FormControl>               </div> 
                    <div className="titres-input--container">

                         

                         <div className="message--field">
                     <TextField variant="outlined" size="small" id="titre_1" label="" type="search" 
                                                             value={this.state.titre_1}
                                                             onChange={(e) => {this.setState({...this.state, titre_1: e.target.value})}}
                                                             />
                    <span className="titre-backslash">\</span>

                    <TextField variant="outlined" size="small" id="titre_2" label="" type="search" 
                                                             value={this.state.titre_2}
                                                             onChange={(e) => {this.setState({...this.state, titre_2: e.target.value})}}
                                                             />

                    </div>
                </div>
               
                </div>
                <CSSTransition appear={true} unmountOnExit in={this.state.titre_error} timeout={300} classNames="errorField">
                                                <div className="titre-error--container">
                                                    <p className="titre-error">Titre introuvable</p>
                                                </div>
                                            </CSSTransition>
                <button type="button" className="btn btn--primary" onClick={() => {this.look_for_titre()}}>{this.state.looking ?(<BeatLoader color='#fff' loading={true} css={override} size={10} />
) :("Rechercher")}</button>
                                           


            </ThemeProvider>
                ) : ('')
  }
                <div>

                </div>
            </div>
                          )
                                    }
            <div className="right-side-map">
                <ReactMapGL
                ref={this.myMap}
                {...this.state.viewport}
                width="width: 100vw"
                height="100%"
                className="react-map-gl-custom"
                mapStyle="mapbox://styles/badrbelkeziz/ckk6r9vo20yzr17qbv2mf76b4"
                // mapStyle="mapbox://styles/mapbox/satellite-streets-v11"
                mapboxApiAccessToken={MAPBOX_TOKEN}
                onClick={this.placeMarker}
                onViewportChange={(viewport) => {
                    this.setState({
                        viewport: viewport
                    })
                  }}
                >
                    {this.props.estimationStatePro.marker.longitude ? (
                        <Marker 
                        longitude={this.props.estimationStatePro.marker.longitude}
                        latitude={this.props.estimationStatePro.marker.latitude}>
<div className="markerpoint-desktop"></div>                           
                            {/* <div className="markerpoint"></div> */}

                        </Marker>
                    ) : ('')}
                </ReactMapGL>
            </div>
            
            <div className = "first-button">
                <button className="button button-primary primaryyCustom" type="button" onClick={this.onHandleNextChange}>Valider</button>
            </div>
            
        </div>
    )
}

}

const mapStateToProps = (state) => {
const estimation = state.estimationStatePro;
const user = state.auth.user

return {
  estimationStatePro: estimation,
  user : user,
  uid: state.auth.uid
};
};

export default connect(mapStateToProps)(StepperEstimationMap);
