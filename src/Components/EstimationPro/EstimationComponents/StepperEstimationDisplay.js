
import React, { Component } from 'react';
import { connect } from "react-redux";
import {withRouter} from 'react-router-dom';



import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import firebase from '../../../Config/FirebaseConfig';
import Axios from 'axios';
import Spinner from "react-bootstrap/Spinner";
import { toast } from "react-toastify";
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import ApartmentIcon from '@material-ui/icons/Apartment';
import SquareFootIcon from '@material-ui/icons/SquareFoot';
import EditLocationIcon from '@material-ui/icons/EditLocation';

import AddBoxIcon from '@material-ui/icons/AddBox';
import StarPicker from 'react-star-picker';
import AirlineSeatIndividualSuiteIcon from '@material-ui/icons/AirlineSeatIndividualSuite';
import PlacesRating from "../../../Pages/RapportEstimation/PlaceRating"

import './StepperEstimationDisplay.scss';

import { theme } from '../../../assets/theme'
import {  ThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LinearProgress from '@material-ui/core/LinearProgress';
import CheckIcon from '@material-ui/icons/Check';
import moment from 'moment'
import 'moment/locale/fr';
import {GMAPS_API_KEY} from '../../../Config/GMapsConfig'
import NumberFormat from 'react-number-format';
import EmojiTransportationIcon from '@material-ui/icons/EmojiTransportation';
import BuildIcon from '@material-ui/icons/Build';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import LineChart from './LineChart'
import HomeIcon from '@material-ui/icons/Home';
import ImageUpload from './ImageUpload'
import mapboxgl from 'mapbox-gl';
import CarouselTransaction from "./CarouselTransaction"
import Pagination from '../../../Pages/RapportEstimation/Pagination'
import ServiceMap from "../../../Pages/RapportEstimation/ServiceMap"
moment.locale("fr")
function NumberFormatCustom(props) {
const { inputRef, onChange, ...other } = props;

return (
<NumberFormat
{...other}
getInputRef={inputRef}
onValueChange={(values) => {
onChange({
target: {
    name: props.name,
    value: values.value,
},
});
}}
thousandSeparator={" "}
isNumericString
suffix=" MAD"
/>
);
}


class StepperEstimationDisplay extends Component {
constructor(props) {
super(props);
this.state = {
open: false,
login: false,
formattedAddress: '',
avis: 'Correcte',
telephone: '',
estimationId: undefined,
show: true,
showError: true,
loader: false,
openPriceModal: false,
EstimationPrice: 0,
EstimationPriceText: '',
estimationByUser: null,
estimationError: false,
shareLink: null,
copied: false,
estimation_agenz: true,
prix_ancfcc: true,
annonces: true,
places: true,
prix_force: null,
raison_prix: '',
prix_force_error: false,
raison_prix_error: false,
loadingPdf: false,
displayPdf: false,
annonces_found : [],
transactions_found : [],
places_found : [],
prix_ancfcc_found : null,
annonces_selected : [],
transactions_selected : [],
reference : '',
savingReport : false,
luminosite : 2,
agencement : 2,
add_rent : true,
rent : 0,
rent_force : 0,
raison_rent : "",
addresseForcee : "",
currentTransactions : [],
currentTransactionsPage : null,
totalTransactionsPages : null,
currentAnnoncesPage : null,
totalAnnoncesPages : null, 
currentAnnonces : [],
places_selected : true
}
}
onPageTransactionChanged = data => {
   
    const allTransactions = this.props.estimationStatePro.transactions_found;
    const {totalTransactionsPages, pageLimit } = data;
    const currentTransactionsPage = data.currentPage
    const offset = (currentTransactionsPage - 1) * pageLimit;
    const currentTransactions = allTransactions.slice(offset, offset + pageLimit);
    this.setState({ currentTransactionsPage, currentTransactions, totalTransactionsPages });
  }
onPageAnnonceChanged = data => {
    const allAnnonces = this.props.estimationStatePro.annonces_found;
    // console.log(allAnnonces)
    const {totalAnnoncesPages, pageLimit } = data;
    const currentAnnoncesPage = data.currentPage

    const offset = (currentAnnoncesPage - 1) * pageLimit;
    const currentAnnonces = allAnnonces.slice(offset, offset + pageLimit);

    this.setState({ currentAnnoncesPage, currentAnnonces, totalAnnoncesPages });
}






changeAgencement = (value) =>  {
this.setState({
...this.state,
agencement: value
});
}
changeLuminosity = (value) =>  {
this.setState({
...this.state,
luminosite: value
});
}

getEstimations() {
const db = firebase.firestore();
const estimationDatas = [];
const estimationDispatchDatas = [];
let estimationRef = db.collection("estimations");
let query = estimationRef.where("user_id", "in", [this.props.email, this.props.uid]);
query
.get()
.then((querySnapshot) => {
    querySnapshot.forEach((doc) => estimationDatas.push({ ...doc.data() }));
    estimationDatas.forEach((est) => {
        if (!est.isDeleted) {
            if (!est.adresse) {
                if (est.localisation) {
                    // const replace = est.localisation.replace('lat : ', '').replace('lng : ', '');
                    // const loc = replace.split(' ');

                    //     const lat = loc[0];
                    //     const lng = loc[1];
                    //     const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GMAPS_API_KEY}`;

                    // Axios.get(url).then(res => {
                    //     if (res.data.results.length > 0) {
                    //         let results = res.data.results[0].formatted_address
                    //         estimationDispatchDatas.push({...est, adresse: results})
                    //     }
                    // });
                    estimationDispatchDatas.push({ ...est, adresse: est.localisation })

                }
            } else {
                estimationDispatchDatas.push(est)
            }
        }
    })
    this.props.dispatch({ type: 'PRO_SET_USER_ESTIMATION', data: estimationDispatchDatas });
})
.catch((error) => {
    this.setState({ estimationError: true })
    // ////console.log("Error getting documents: ", error);
});
}

async getEstimations2(id) {
const db = firebase.firestore();
const estimationDatasFetch = [];
const estimationDatas = [];

var estimationRef = db.collection("estimations");
var query = estimationRef.where("user_id", "==", id);
const querySnapshot = await query.get();
querySnapshot.forEach((doc) => estimationDatasFetch.push({ ...doc.data() }));
estimationDatasFetch.forEach(est => {
if (!est.isDeleted) {
    estimationDatas.push(est)
}
})
this.props.dispatch({ type: 'PRO_SET_USER_ESTIMATION', data: estimationDatas });
return Promise.resolve(true);
}

async getUser(id) {
const dbStore = firebase.firestore();
var userRef = dbStore.collection("users")
var query = userRef.doc(id);
const querySnapshot = await query.get();
if (
!querySnapshot.data().isPro &&
this.props.estimation.userEstimations.length >= 2
) {
this.setState({ show: false })
}
this.setState({ loader: false })
return Promise.resolve(true);
}

handleChange = (e) => {
this.setState({
[e.target.id]: e.target.value,
});
};
validateReport = () => {
this.setState({savingReport : true})

let rapport_pdf = {
addresseForcee : this.state.addresseForcee,
estimationId : this.props.estimationStatePro.estimationId,
estimation : this.props.estimationStatePro.estimation.estimation,
date : this.props.estimationStatePro.estimation.date,
uid : this.props.uid,
email : this.props.user.email,
prix_force : this.state.prix_force,
raison_prix : this.state.raison_prix,
reference : this.state.reference,
formattedAddress : this.state.formattedAddress,
places_found : this.props.estimationStatePro.places_found,
nombre_restaurants : this.props.estimationStatePro.nombre_restaurants,
note_restaurants : this.props.estimationStatePro.note_restaurants,
nombre_pharmacies : this.props.estimationStatePro.nombre_pharmacies,
note_pharmacies : this.props.estimationStatePro.note_pharmacies,
nombre_ecoles : this.props.estimationStatePro.nombre_ecoles,
note_ecoles : this.props.estimationStatePro.note_ecoles,
nombre_supermarches : this.props.estimationStatePro.nombre_supermarches,
note_supermarches : this.props.estimationStatePro.note_supermarches,
list_supermarches : this.props.estimationStatePro.list_supermarches,
list_ecoles : this.props.estimationStatePro.list_ecoles,
list_pharmacies : this.props.estimationStatePro.list_pharmacies,
list_restaurants : this.props.estimationStatePro.list_restaurants,
zone_ancfcc : this.props.estimationStatePro.estimation.zone,
add_prix_ancfcc : this.state.prix_ancfcc,
add_rent : this.state.add_rent,
rent : this.props.estimationStatePro.loyer*this.props.estimationStatePro.estimation.estimation,
rent_force : this.state.rent_force,
raison_rent : this.state.raison_rent,
prix_ancfcc : this.props.estimationStatePro.prix_ancfcc_found,
localisation : this.props.estimationStatePro.estimation.localisation,
annonces_selected : [],
transactions_selected : [],
images : this.props.estimationStatePro.images,
places_selected : this.state.places_selected,
createdAt : moment().format("DD-MM-YYYY hh:mm:ss")
}
this.state.annonces_selected.map(item => {
rapport_pdf.annonces_selected.push(this.props.estimationStatePro.annonces_found.filter(listing => listing.source===item)[0])
return ''
})
this.state.transactions_selected.map(item => {
// rapport_pdf.transactions_selected.push(this.props.estimationStatePro.transactions_found[item])
rapport_pdf.transactions_selected.push(this.props.estimationStatePro.transactions_found.filter(listing => listing.transactionId===item)[0])
return ''
})
Axios.post('https://us-central1-agenz-website-prod.cloudfunctions.net/api/createReport', rapport_pdf).then( (res) => {
this.setState({savingReport : false})
this.props.history.push(`/rapport-estimation/${res.data.rapport}`);
}).catch(err => {
if(err.code==="auth/id-token-expired"){
toast.error("Votre session a expiré pour des raisons de sécurité. Veuillez vous reconnecter et réessayer")
// this.props.dispatch({type : "SIGN_OUT"})
}
else{
    toast.error("Un problème est survenu. Veuillez vous reconnecter et réessayer ou nous contacter si le problème persiste")
    // this.props.dispatch({type : "SIGN_OUT"})
    }
////console.log(err)
})



}


handleChangeCheckAgenz = (e) => {
this.setState({ estimation_agenz: !this.state.estimation_agenz })
};
handleChangeCheckAncfcc = (e) => {
this.setState({ prix_ancfcc: !this.state.prix_ancfcc })
};
handleChangeCheckAnnonces = (e) => {
this.setState({ annonces: !this.state.annonces })
};
handleChangeCheckPlaces = (e) => {
this.setState({ places: !this.state.places })
};
handleClickPdf = () => {
this.setState({ loadingPdf: true })
this.generateReport()
////console.log("Generating pdf")
};
handleChangePrice = (e) => {
this.setState({ prix_force: e.target.value })
};
handleChangeAdresse=  (e) => {
this.setState({ addresseForcee: e.target.value })
};
handleChangeRent = (e) => {
this.setState({ rent_force: e.target.value })
};
handleChangeRaisonPrix = (e) => {
this.setState({ raison_prix: e.target.value })
};
handleChangeRaison = (e) => {
this.setState({ raison_rent: e.target.value })
};
handleChangeReference = (e) => {
this.setState({ reference: e.target.value })

};

generateReport() {
////console.log("generatingReport")
let data_report = JSON.stringify({
rapport: true,
lat: this.props.estimationStatePro.marker.latitude,
lng: this.props.estimationStatePro.marker.longitude,
places: true,
prix_ancfcc: true,
annonces: true,
chambres: this.props.estimationStatePro.estimation.typologie,
transactions: true,
zone: this.props.estimationStatePro.estimation.zone,
radius: 500
})
////console.log(data_report)
delete Axios.defaults.headers.common["Authorization"]
delete Axios.defaults.headers.common["authorization"]
Axios.post('https://cli482fnl7.execute-api.eu-west-3.amazonaws.com/default/lambdassh', data_report).then((res) => {
////console.log(res.data)
this.setState({ annonces_found: res.data.annonces })
this.setState({ transactions_found: res.data.transactions })
this.setState({ places_found: res.data.places })
this.setState({ prix_ancfcc_found: res.data.prix_ancfcc })
this.setState({ loadingPdf: false })
this.setState({ displayPdf: true })
toast.success("Rapport généré avec succès")
})
.catch(err => {
    toast.error("Erreur");
    ////console.log(err)
})
Axios.defaults.headers.common["Authorization"] = localStorage.getItem("FBIdToken")

}



addAvis = () => {
const error = this.validateAvisFields();
if (error) {
this.props.dispatch({ type: 'PRO_ADD_FILL_AVIS_ERROR' });
return;
}

const db = firebase.firestore();
db.collection("avis")
.add({
    avis: this.state.avis,
    user_id: this.props.uid,
    estimationId: this.props.estimationStatePro.estimationId,
    estimationByUser: this.state.EstimationPrice,
    estimationTextByUser: this.state.EstimationPrice,
    estimation: this.props.estimationStatePro.estimation.estimation,
    date: new Date().toISOString(),
})
.then(() => {
    this.props.dispatch({ type: 'PRO_ADD_AVIS_SUCCESS' });
    // this.props.dispatch({ type: 'PRO_ADD_AVIS_MODAL', data: false});
}).catch((err) => {
    this.props.dispatch({ type: 'PRO_ADD_AVIS_ERROR' });
})
}

updateTelephone = () => {
this.props.dispatch({ type: 'PRO_SET_TELEPHONE', data: this.state.telephone });
const db = firebase.firestore();
var estimationRef = db.collection("estimations");
var query = estimationRef.where("estimationId", "==", this.props.estimationStatePro.estimationId);
query
.get()
.then((querySnapshot) => {
    this.props.dispatch({ type: 'PRO_ADD_TEL_SUCCESS' });
    this.props.dispatch({ type: 'PRO_UPDATE_PHONE_MODAL', data: false });
    querySnapshot.forEach((doc) => {
        doc.ref.update({
            telephone: this.state.telephone
        });
    });
})
.catch((error) => {
    this.props.dispatch({ type: 'PRO_ADD_TEL_ERROR' });
    this.props.dispatch({ type: 'PRO_UPDATE_PHONE_MODAL', data: false });
    // ////console.log("Error getting documents: ", error);
});


}

updateEstimation = () => {
const db = firebase.firestore();
var estimationRef = db.collection("estimations");
var query = estimationRef.where("estimationId", "==", this.props.estimationStatePro.estimationId);
query
.get()
.then((querySnapshot) => {
    this.props.dispatch({ type: 'PRO_ADD_MY_ESTIMATION_SUCCESS' });
    querySnapshot.docs[0].ref.update({
        estimation: this.props.estimationStatePro.estimation.estimation
    });
})
.catch(() => {
    this.props.dispatch({ type: 'PRO_ADD_MY_ESTIMATION_ERROR' });
});
}

add_tel_succes = () => {
this.props.dispatch({ type: 'PRO_ADD_TEL_SUCCESS' });
}
meRappeler = () => {
// if(this.props.estimationStatePro.estimation.telephone){
//     this.props.dispatch({type: 'PRO_ADD_TEL_SUCCESS'});
// }else{
this.props.dispatch({ type: 'PRO_UPDATE_PHONE_MODAL', data: true });
// }
}
formatEtageAnnonce(etage) {
if (etage === 0) {
return "Rez-de-chaussée"
}
if (etage === 1) {
return "Premier étage"
}
else {
return `${etage}ème étage`
}
}
openAvisMobile = () => {
// ////console.log("ok")
// let error = false;
// if (this.state.avis !== "Correcte") {
// if (this.state.EstimationPrice === undefined) {
//     error = true;
// } else {
//     if (
//         !this.state.EstimationPriceText
//     ) {
//         error = true;
//     }
// }
// }
// if (error) {
//     this.props.dispatch({type: 'PRO_ADD_AVIS_ERROR'});
//     return;
// }
this.props.dispatch({ type: 'PRO_ADD_AVIS_MODAL', data: true });
}

handleClickOpenLoginModal = () => {
this.setState({ login: !this.state.login });
};



handleClose = (evetn, reason) => {
if (reason === 'clickaway') {
return;
}
this.setState({ open: false })
}



closePriceModal = () => {
this.setState({ openPriceModal: !this.state.openPriceModal })
};


closeModal = () => {
this.setState({ open: !this.state.open })
}

validatePrice = () => {
////console.log("validating price")
let flag = false
if (!this.state.prix_force) {
this.setState({ prix_force_error: true })
flag = true
////console.log("pas de prix")
}
if (this.state.raison_prix === '') {
this.setState({ raison_prix_error: true })
flag = true
////console.log("pas de raison")

}
if (flag) {
return;
}
else {
toast.success("Le prix indiqué a bien été enregistré")
}
}
createEstimation(uid) {
return {
...this.props.estimationStatePro.estimation,
user_id: uid,
supprimeLe: null,
user: this.props.user
};

}
generateID() {
let length = 3,
charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
retVal = "";
for (let i = 0, n = charset.length; i < length; ++i) {
retVal += charset.charAt(Math.floor(Math.random() * n));
}
return retVal + new Date().getTime();
}

getAddress() {
const loc = this.props.estimationStatePro.estimation.localisation;
const lat = loc.substr(5, loc.indexOf(' lng') - 4).trim();
const lng = loc.substr(lat.length + 13);
const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GMAPS_API_KEY}`;
if (this.props.estimationStatePro.estimation.adresse) {
this.setState({
    formattedAddress: this.props.estimationStatePro.estimation.adresse
});
}
else {
delete Axios.defaults.headers.common["Authorization"]
Axios.get(url).then(res => {
    Axios.defaults.headers.common["Authorization"] = localStorage.getItem("FBIdToken")
    if (res.data.results.length > 0) {
        this.setState({
            formattedAddress: res.data.results[0].formatted_address
        });
    }
})
    .catch(err => {
        this.props.dispatch({ type: 'CUSTOM_ERROR_MESSAGE', data: err.message });
    });
}


}
mapInit() {

mapboxgl.accessToken = this.props.config.mapboxglKey;
let map = new mapboxgl.Map({
container: document.getElementById('mapbox--container'),
style: 'mapbox://styles/badrbelkeziz/ckk6r9vo20yzr17qbv2mf76b4',
// style:'mapbox://styles/mapbox/navigation-preview-day-v4',
center: [parseFloat(`${this.props.estimationStatePro.estimation.localisation.split("lng : ")[1]}`),parseFloat(`${this.props.estimationStatePro.estimation.localisation.split("lat : ")[1].split(" ")[0]}`)],
pitch: 0,
zoom: 15,
interactive: false})
new mapboxgl.Marker()
.setLngLat([parseFloat(`${this.props.estimationStatePro.estimation.localisation.split("lng : ")[1]}`),parseFloat(`${this.props.estimationStatePro.estimation.localisation.split("lat : ")[1].split(" ")[0]}`)])
.addTo(map);
}

componentDidMount() {
this.setState({luminosite : this.props.estimationStatePro.estimation.luminosite, agencement : this.props.estimationStatePro.estimation.agencement})
if (this.props.estimationStatePro.estimation.telephone) {
this.setState({ telephone: this.props.estimationStatePro.estimation.telephone })
}
this.setState({ registration: { ...this.state.registration, phone: this.state.telephone } })
this.getAddress();
const user = firebase.auth().currentUser;

if (user) {
this.props.dispatch({
    type: 'PRO_UPDATE_FIREBASE_USER', data: {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
    }
});
}

this.setState({ estimationId: this.generateID() })
this.setState({luminosite : this.props.estimationStatePro.estimation.luminosite})

if (this.props.uid) {
// const estimation = this.createEstimation(this.props.uid);
// if (this.props.estimationStatePro.estimation.bien !== 'villa') {
    this.props.dispatch({ type: 'PRO_ADD_ESTIMATION_FIREBASE', data: this.createEstimation(this.props.uid) });
// }
}
this.mapInit();
// ////console.log(this.props)

}
shareEstimation(id) {
const db = firebase.firestore();
//Update estimation to firestore
var estimationRef = db.collection("estimations");

var query = estimationRef.where("estimationId", "==", id);
this.setState({ loading: true, action: 'share' })
query
.limit(1).get()
.then((querySnapshot) => {

    querySnapshot.forEach((doc) => {

        // ////console.log(doc.id, id)
        Axios.post('https://us-central1-agenz-website-prod.cloudfunctions.net/api/createJWTAccessToken', { estimationId: doc.id }).then(result => {
            // const createAccessToken = firebase.functions().httpsCallable('createJWTAccessToken');
            // createAccessToken({ estimationId: doc.id })
            // .then((result) => {

            doc.ref.update({
                shareLink: result.data.result
            })

            const link = window.location.origin + "/estimations?token=" + result.data.result;
            const linkEncode = encodeURI(link);
            this.setState({ shareLink: linkEncode })
        }).then(() => {
            this.setState({ loading: false, action: null })
        })
            .catch(err => {
                this.setState({ loading: false, action: null })
                // ////console.log(err)
                toast.error("Quelque chose s'est mal passé, veuillez réessayer")


            })

    });


})
.catch((error) => {
    // ////console.log(error)
    toast.error("Erreur");
});


}
getTypeChauffage(){
if(this.props.estimationStatePro.estimation.typechauffage===0){
return "Chaffage électrique"
}
if(this.props.estimationStatePro.estimation.typechauffage===1){
return "Chaudière centrale au fuel"
}
if(this.props.estimationStatePro.estimation.typechauffage===2){
return "Chaudière centrale au gaz"
}
if(this.props.estimationStatePro.estimation.typechauffage===3){
return "Pompe à chaleur"
}


}

getTypeVilla(type){
if (type==="villajumelee"){
return "Villa jumelée"
}
else {
return "Villa en bande"
}
}

componentWillUnmount() {
// reinit the estimation object and all variables related to it
this.props.dispatch({ type: 'PRO_REINIT_ESTIMATION_FLOW' });
if (this.props.uid) {
this.getEstimations()
}

}



formatAdresse(adresse) {
return adresse;
}
getSurface() {
if(this.props.estimationStatePro.estimation.bien==="appartement"){
let surfaceHabitable = this.props.estimationStatePro.estimation.surfacehabitable
let parking = this.props.estimationStatePro.estimation.parking
let placesparking = this.props.estimationStatePro.estimation.placesparking
let cave = this.props.estimationStatePro.estimation.surfacecave
let balcon = this.props.estimationStatePro.estimation.surfacebalcon
let surfaceUtile
if (parking === 1) {
surfaceUtile = surfaceHabitable + (cave + balcon) / 2 + placesparking * 6
}
else {
surfaceUtile = surfaceHabitable + (cave + balcon) / 2
}
return surfaceUtile;
}
else {
return this.props.estimationStatePro.estimation.surfaceterrain
}
}
getConstruction(){
if(this.props.estimationStatePro.estimation.construction ===-1){
return "Date de construction inconnue"
}
if(this.props.estimationStatePro.estimation.construction ===4){
return "Construction neuve"
}
if(this.props.estimationStatePro.estimation.construction ===0){
    return "Bien construit il y a moins de cinq ans"
    }
    if(this.props.estimationStatePro.estimation.construction ===3){
        return "Bien construit il y a moins de dix ans"
        }
        if(this.props.estimationStatePro.estimation.construction ===1){
            return "Construction datant d'entre 10 et 20 ans "
            }
            if(this.props.estimationStatePro.estimation.construction ===2){
                return "Construit il y a plus de 20 ans"
                }


}
formatEtat(){
if(this.props.estimationStatePro.estimation.finition ==="correct"){
return "État correct"
}
if(this.props.estimationStatePro.estimation.finition ==="travauxaprevoir"){
return "Travaux à prévoir"
}
if(this.props.estimationStatePro.estimation.finition ==="refaitaneuf"){
    return "Refait à neuf"
    }
return("État correct")
}

formatTypologie(typologie) {
if (typologie === 1) {
return "'une chambre"
}
else {
return `e ${typologie} chambres`
}
}
formatTypologieItem(typologie) {
if (typologie === 1) {
return "1 Chambre"
}
else {
return `${typologie} Chambres`
}
}
formatEtage(etage) {
if (etage === 0) {
return "rez-de-chaussée"
}
if (etage === 1) {
return "premier étage"
}
else {
return `${etage}ème étage`
}
}

selectPlaces = (num) => {
    this.setState({places_selected : true})
}
unSelectPlaces = (num) => {
    this.setState({places_selected : false})
}
selectAnnonce = (num) => {
this.setState({annonces_selected : [...this.state.annonces_selected, num]})
}
unSelectAnnonce = (num) => {
this.setState({annonces_selected : this.state.annonces_selected.filter(number => number !== num)})
}
selectTransaction = (num) => {
this.setState({transactions_selected : [...this.state.transactions_selected, num]})
}
unSelectTransaction = (num) => {
this.setState({transactions_selected : this.state.transactions_selected.filter(number => number !== num)})
}
unSelectAncfcc = () => {
this.setState({prix_ancfcc : false })
}
selectAncfcc = () => {
this.setState({prix_ancfcc : true })
}
unSelectRent = () => {
this.setState({add_rent : false })
}
selectRent = () => {
this.setState({add_rent : true })
}
formatConstruction(construction){
    if (parseInt(construction) <= 5){
        if (parseInt(construction)===-1){
            return ""
        }
        else if (parseInt(construction)===0){
            return "Entre 1 et 5 ans"
        }

        else if (parseInt(construction)===0){
            return "Entre 1 et 5 ans"
        }

        else if (parseInt(construction)===1){
            return "Entre 11 et 20 ans"
        }

        else if (parseInt(construction)===2){
            return "Il y a plus de 20 ans"
        }

        else if (parseInt(construction)===3){
            return "Entre 5 et 10 ans"
        }

        else if (parseInt(construction)===4){
            return "Neuve"
        }
    }
    else{
        return construction;
    }

}
render() {

let surfaceeffective = 1;
if (this.props.estimationStatePro.estimation.bien === "appartement"){
if (this.props.estimationStatePro.estimation.parking) {
surfaceeffective = this.props.estimationStatePro.estimation.surfacehabitable + (this.props.estimationStatePro.estimation.surfacecave + this.props.estimationStatePro.estimation.surfacebalcon + this.props.estimationStatePro.estimation.placesparking * 12) / 2
}
else {
surfaceeffective = this.props.estimationStatePro.estimation.surfacehabitable + (this.props.estimationStatePro.estimation.surfacecave + this.props.estimationStatePro.estimation.surfacebalcon) / 2
}
}
else {
surfaceeffective = this.props.estimationStatePro.estimation.surfaceterrain
}


// const restau = this.props.estimationStatePro.places_found.filter(item => item.type === 'Restaurant');
// const restauCount = restau.length;
// const pharma = this.props.estimationStatePro.places_found.filter(item => item.type === 'Pharmacie');
// const pharmaCount = pharma.length;
// const hot = this.props.estimationStatePro.places_found.filter(item => item.type === 'Hôtel');
// const hotCount = hot.length;
// const banq = this.props.estimationStatePro.places_found.filter(item => item.type === 'Banque');
// const banqCount = banq.length;
// const superM = this.props.estimationStatePro.places_found.filter(item => item.type === 'Supermarché');
// const superMCount = superM.length;
// const autre = this.props.estimationStatePro.places_found.filter(item => item.type === '');
// const autreCount = autre.length;
// const dataPolar = {
// labels: ['Restaurants', 'Pharamacies', 'Supermarchés'],
// datasets: [
//     {
    
//     data: [restauCount, pharmaCount, superMCount],
//     backgroundColor: [
//         'rgba(243, 243, 243, 0.52)',
//         'rgba(243, 243, 243, 0.52)',
//         'rgba(243, 243, 243, 0.52)',
//         'rgba(243, 243, 243, 0.52)'
//         ],
//     borderWidth: 1,
//     },
// ],
// }
// const options = {
// legend: {
    
//     display: false
//     },
// scale: {
//     ticks: { beginAtZero: true },
// },
// }
const allTransactions = this.props.estimationStatePro.transactions_found
const allAnnonces = this.props.estimationStatePro.annonces_found
const totalTransactions = allTransactions.length;
const totalAnnonces = allAnnonces.length;
return (
<>
            <div className="root-container">
        <div>
    <ThemeProvider theme={theme}>
    
        <Dialog
            maxWidth={"md"}
            open={this.state.savingReport}
            disableBackdropClick={true}
            aria-labelledby="max-width-dialog-title"
        >
            <DialogTitle id="max-width-dialog-title">Rapport d'estimation final en cours d'édition</DialogTitle>
            <DialogContent>
                <div className="dialog--content">
                <DialogContentText>
                    Vous pourrez retrouver le rapport dans votre espace professionnel
</DialogContentText>
                <LinearProgress color="primary" />
<div className="dialog--padding"></div>
</div>
            </DialogContent>

        </Dialog>
        {
            this.state.loader ? (
                <div className="loader">
                    <Spinner animation="border" variant="primary" size="lg" />
                    <div className="estimation-top-side">
                        <h1 className="loader-h1">Chargement...</h1>
                    </div>
                </div>
            ) : (
                    <div>

                        <>
                            <div>
                                <div className="show-results show-results-pro">
                                    <div>



                                        <div className="results-top-side">
                                                    <>
                                                    <div id="root-container">
                                                        <ThemeProvider theme={theme}>
                                                            <div className="head">
                                                                <div className="head--img">
                                                            <img src={this.props.estimationStatePro.agence.user_image} alt="Rapport d'estimation généré automatiquement par agenz - Expert de l'immobilier et éditeur de rapport d'évaluation de biens immobiliers au maroc" />
                                                            </div>
                                                            <div className="head--agence">
                                                                <h3 className="head--agence-name">{this.props.estimationStatePro.agence.nameEntreprise}</h3>
                                                                <p className="head--agence-detail">{this.props.estimationStatePro.agence.addressEntreprise}</p>
                                                                <p className="head--agence-detail">{this.props.estimationStatePro.agence.emailEntreprise}</p>

                                                            </div>
                                                            </div>
                                                            <div className="report--header">
                                                                <h1 className="report--title">Rapport d'évaluation</h1>
                                                                <p className="folder--ref"> <p className="ref--title">Référence du dossier : </p>                                                                                       <TextField  variant="outlined"        

defaultValue={this.state.reference}  id="standard-search" value={this.state.referece} type="search" onChange={this.handleChangeReference} size="small" /></p>                                                                            <h3 className="report--subtitle"> Synthèse du Rapport </h3>
                                                                
                                                                {this.props.estimationStatePro.estimation.bien==="appartement" ? (
<>
                                                                <p className="report-synthesis">Votre appartement situé au {this.formatEtage(this.props.estimationStatePro.estimation.etage)}, {this.formatAdresse(this.props.estimationStatePro.estimation.adresse)} composé d{this.formatTypologie(this.props.estimationStatePro.estimation.typologie)} d'une surface vendable de {this.getSurface()} m<sup>2</sup> </p>
</>
            ) : (
                <p className="report-synthesis">Votre villa située {this.formatAdresse(this.props.estimationStatePro.estimation.adresse)} d'une surface construite de {parseInt(this.props.estimationStatePro.estimation.surfaceconstruite)} m<sup>2</sup> sur un terrain de {this.getSurface()} m<sup>2</sup> </p>
            )}
                                                                <div className="synthese--format">
                                                                    {this.props.estimationStatePro.estimation.bien==="appartement" ? 
                                                                    (
                                                                        <>
                                                                        <div className="synthese--item-container"> 
                                                                    <ApartmentIcon /> <p className="synthese--item">Appartement</p>
                                                                    </div>
                                                                <div className="synthese--item-container"> 
                                                                <SquareFootIcon /> <p className="synthese--item">{surfaceeffective} m<sup>2</sup></p>
                                                                </div>
                                                                <div className="synthese--item-container"> 
                                                                <AirlineSeatIndividualSuiteIcon /> <p className="synthese--item">{this.formatTypologieItem(this.props.estimationStatePro.estimation.typologie)}</p>
                                                                </div>
                                                                
                                                                <div className="synthese--item-container synthese--item-container-adresse"> 
                                                                <EditLocationIcon /> 
                                                                <TextField
id="standard-helperText"
label="Modifier l'adresse"
defaultValue={this.formatAdresse(this.props.estimationStatePro.estimation.adresse)}
helperText="Elle apparaîtra dans le rapport final"
onChange={this.handleChangeAdresse}

/>
                                                                </div>                                                                            </>
                                                                    ) 
                                                                : (<>
                                                                    <div className="synthese--item-container"> 
                                                                    <HomeIcon /> <p className="synthese--item">Villa</p>
                                                                    </div>
                                                                <div className="synthese--item-container"> 
                                                                <SquareFootIcon /> <p className="synthese--item">{this.props.estimationStatePro.estimation.surfaceterrain} m<sup>2</sup></p>
                                                                </div>
                                                                <div className="synthese--item-container"> 
                                                                <AirlineSeatIndividualSuiteIcon /> <p className="synthese--item">{this.formatTypologieItem(this.props.estimationStatePro.estimation.typologie)}</p>
                                                                </div>
                                                                
                                                                <div className="synthese--item-container synthese--item-container-adresse"> 
                                                                <EditLocationIcon />
                                                                <TextField
id="standard-helperText"
label="Modifier l'adresse"
defaultValue={this.formatAdresse(this.props.estimationStatePro.estimation.adresse)}
helperText="Elle apparaîtra dans le rapport final"
onChange={this.handleChangeAdresse}

/>
                                                                </div> 
                                                                </>
                                                                )}
                                                                </div>
                                                            
                                                            </div>
                                                            <Grid container spacing={2}>
                                                                <div className="report--first-container">
                                                                    <Grid container spacing={2}>
                                                                        <Grid item md={12} xs={12}>
                                                                            <h4>Estimation du prix net vendeur réalisée le {moment(this.props.estimationStatePro.estimation.date).format('LL')} </h4>
                                                                            <p className="price--report">{this.state.prix_force ? <NumberFormat displayType={'text'} value={Math.round(this.state.prix_force)} thousandSeparator={" "}/> : <NumberFormat displayType={'text'} value={Math.round(this.props.estimationStatePro.estimation.estimation)} thousandSeparator={" "}/>  } MAD</p>
                                                                            <span className="intermediate--price">soit</span>
                                                                            <p className="square--price--report">{this.state.prix_force ? <NumberFormat displayType={'text'} value={Math.round(this.state.prix_force/this.getSurface())} thousandSeparator={" "}/> :<NumberFormat displayType={'text'} value={Math.round(this.props.estimationStatePro.estimation.estimation/this.getSurface())} thousandSeparator={" "}/> } MAD/m<sup>2</sup></p>
                                                                        </Grid>
                                                                    </Grid>
                                                                    <Grid container spacing={2}>
                                                                        <Grid item md={12} xs={12}>
                                                                            <div className="pdf--container-title">
                                                                                <h3 className="report--title"> Ajoutez votre estimation</h3>
                                                                                <p className="report--subtitle">Entrez le prix à afficher dans le rapport d'estimation</p>
                                                                                <TextField InputProps={{
inputComponent: NumberFormatCustom,
}}  error={this.state.prix_force_error} id="outlined-basic" label="Prix" variant="outlined" onChange={this.handleChangePrice} />

                                                                            </div>

                                                                        </Grid>
                                                                        <Grid item md={12} xs={12}>
                                                                            <h3 className="report--title"> Justifiez le prix</h3>
                                                                            <p className="report--subtitle">Ajoutez une note explicative pour accompagner votre estimation dans le rapport final</p>
                                                                            <div className="comment-textfield">

                                                                            <TextField  variant="outlined"        
multiline

error={this.state.raison_prix_error} id="standard-search" label="Commentaire" type="search" onChange={this.handleChangeRaisonPrix} />
</div>
                                                                        </Grid>
                                                                        {/* <Grid item xs={12}>
                                                                        <div className="pdf--container-field">
                                                                                <button onClick={this.validatePrice} className="button button-primary">Valider</button>
                                                                            </div>
                                                                        </Grid> */}
                                                                    </Grid>
                                                                
                                                                    
                                                                </div>
                                                                <div className="report--first-container report--rent-container">
                                                                    <Grid container spacing={2}>
                                                                        <Grid item md={12} xs={12}>
                                                                            <h4>Estimation du prix de location réalisée le {moment(this.props.estimationStatePro.estimation.date).format('LL')} </h4>
                                                                            <p className="price--report">{this.state.rent_force ? <NumberFormat displayType={'text'} value={Math.round(this.state.rent_force)} thousandSeparator={" "}/> : <NumberFormat displayType={'text'} value={Math.round(this.props.estimationStatePro.estimation.estimation*this.props.estimationStatePro.loyer)} thousandSeparator={" "}/>  } MAD / Mois</p>
                                                                        </Grid>
                                                                        {this.state.add_rent ? (
<span className="fav-select select" onClick={ () => this.unSelectRent()}>Retirer du rapport </span>
) : (
<span className="fav-select unselect" onClick={ () => this.selectRent()}> Ajouter au rapport </span>
)}
                                                                    </Grid>
                                                                    <Grid container spacing={2}>
                                                                        <Grid item md={12} xs={12}>
                                                                            <div className="pdf--container-title">
                                                                                <h3 className="report--title"> Ajoutez votre estimation</h3>
                                                                                <p className="report--subtitle">Entrez le prix de location à afficher dans le rapport d'estimation</p>
                                                                                <TextField InputProps={{
inputComponent: NumberFormatCustom,
}}   id="outlined-basic" label="Location" variant="outlined" onChange={this.handleChangeRent} />

                                                                            </div>

                                                                        </Grid>
                                                                        <Grid item md={12} xs={12}>
                                                                            <h3 className="report--title"> Justifiez le prix</h3>
                                                                            <p className="report--subtitle">Entrez une note explicative pour expliquer la différence</p>
                                                                            <div className="comment-textfield">

                                                                            <TextField  variant="outlined"        
multiline

id="standard-search" label="Commentaire" type="search" onChange={this.handleChangeRaisonRent} />
</div>
                                                                        </Grid>
                                                                        {/* <Grid item xs={12}>
                                                                        <div className="pdf--container-field">
                                                                                <button onClick={this.validatePrice} className="button button-primary">Valider</button>
                                                                            </div>
                                                                        </Grid> */}
                                                                    </Grid>
                                                                
                                                                    
                                                                </div>
                                                            
                                                                <div className="detailed--cards">
                                                                    <Grid container spacing={2}>
                                                                        <Grid item md={6} xs={12}>
                                                                        <h4 className="detailed--card-title">Informations détaillées</h4>

<div className="detailed--card-info">

<List component="nav" aria-label="main mailbox folders">
{this.props.estimationStatePro.estimation.bien==="appartement" ? (    
<>    
<ListItem >
<ListItemIcon>
    <SquareFootIcon />
</ListItemIcon>
<ListItemText>Surface habitable : {this.props.estimationStatePro.estimation.surfacehabitable} m<sup>2</sup></ListItemText>
</ListItem>
</>
) 
: (
<>
<ListItem >
<ListItemIcon>
<SquareFootIcon />
</ListItemIcon>
<ListItemText>Surface du terrain : {this.props.estimationStatePro.estimation.surfaceterrain} m<sup>2</sup></ListItemText>
</ListItem>
<ListItem >
<ListItemIcon>
<SquareFootIcon />
</ListItemIcon>
<ListItemText>Surface construite : {this.props.estimationStatePro.estimation.surfaceconstruite} m<sup>2</sup></ListItemText>
</ListItem>
</>
)
}


{this.props.estimationStatePro.estimation.parking===1 ?(
<ListItem >
<ListItemIcon>
<EmojiTransportationIcon />
</ListItemIcon>
<ListItemText>{this.props.estimationStatePro.estimation.placesparking===1 ? "Une place de parking titrée" : (`${this.props.estimationStatePro.estimation.placesparking} places de parking titrées`)}</ListItemText>
</ListItem>

) :('')}

{this.props.estimationStatePro.estimation.cave===1 ?(

<ListItem >
<ListItemIcon>
<AddBoxIcon />
</ListItemIcon>
<ListItemText>Box ou cave en sous-sol de {this.props.estimationStatePro.estimation.surfacecave} m<sup>2</sup></ListItemText>
</ListItem>
) : ('')
}
{this.props.estimationStatePro.estimation.balcon===1 ?(

<ListItem >
<ListItemIcon>
<AddBoxIcon />
</ListItemIcon>
<ListItemText>Balcons et terrasses {this.props.estimationStatePro.estimation.surfacebalcon} m<sup>2</sup></ListItemText>
</ListItem>
) : ('')
}
<ListItem >
<ListItemIcon>
<BuildIcon />
</ListItemIcon>
<ListItemText>{this.getConstruction()}</ListItemText>
</ListItem>
{this.props.estimationStatePro.estimation.construction === 4 ? ('') : (
<ListItem >
<ListItemIcon>
<StarHalfIcon />
</ListItemIcon>
<ListItemText>{this.formatEtat()}</ListItemText>
</ListItem>
)}

</List>
</div>
</Grid>
<Grid item md={6} xs={12}>
<h4 className="detailed--card-title">Caractéristiques du bien</h4>

<div className="detailed--card-carac">
<List component="nav" aria-label="main mailbox folders">

{this.props.estimationStatePro.estimation.duplex===1 ?(

<ListItem >
<ListItemIcon>
<CheckIcon />
</ListItemIcon>
<ListItemText>Duplex</ListItemText>
</ListItem>
) : ('')
}
{this.props.estimationStatePro.estimation.calme===1 ?(
<ListItem >
<ListItemIcon>
<CheckIcon />
</ListItemIcon>
<ListItemText>Calme</ListItemText>
</ListItem>

) :('')}

{this.props.estimationStatePro.estimation.vueexceptionnelle===1 ?(

<ListItem >
<ListItemIcon>
<CheckIcon />
</ListItemIcon>
<ListItemText>Sans vis-à-vis</ListItemText>
</ListItem>
) : ('')
}
{this.props.estimationStatePro.estimation.cheminee===1 ?(

<ListItem >
<ListItemIcon>
<CheckIcon />
</ListItemIcon>
<ListItemText>Cheminée</ListItemText>
</ListItem>
) : ('')
}
{this.props.estimationStatePro.estimation.ascenseur===1 ?(

<ListItem >
<ListItemIcon>
<CheckIcon />
</ListItemIcon>
<ListItemText>Ascenseur</ListItemText>
</ListItem>
) : ('')
}
{this.props.estimationStatePro.estimation.climatisation===1 ?(

<ListItem >
<ListItemIcon>
<CheckIcon />
</ListItemIcon>
<ListItemText>Climatisation</ListItemText>
</ListItem>
) : ('')
}
{this.props.estimationStatePro.estimation.chambreservice===1 ?(

<ListItem >
<ListItemIcon>
<CheckIcon />
</ListItemIcon>
<ListItemText>Chambre de service</ListItemText>
</ListItem>
) : ('')
}
{this.props.estimationStatePro.estimation.concierge===1 ?(

<ListItem >
<ListItemIcon>
<CheckIcon />
</ListItemIcon>
<ListItemText>Résidence fermée et sécurisée</ListItemText>
</ListItem>
) : ('')
}
{this.props.estimationStatePro.estimation.garage===1 ?(

<ListItem >
<ListItemIcon>
<CheckIcon />
</ListItemIcon>
<ListItemText>Garage</ListItemText>
</ListItem>
) : ('')
}

{this.props.estimationStatePro.estimation.piscine===1 ?(

<ListItem >
<ListItemIcon>
<CheckIcon />
</ListItemIcon>
<ListItemText>Piscine</ListItemText>
</ListItem>
) : ('')
}
{this.props.estimationStatePro.estimation.murmitoyen===1 ?(

<ListItem >
<ListItemIcon>
<CheckIcon />
</ListItemIcon>
<ListItemText>Murs mitoyens : {this.getTypeVilla(this.props.estimationStatePro.estimation.typeVilla)}</ListItemText>
</ListItem>
) : ('')
}
{this.props.estimationStatePro.estimation.chaufeausolaire===1 ?(

<ListItem >
<ListItemIcon>
<CheckIcon />
</ListItemIcon>
<ListItemText>Chauffe eau solaire</ListItemText>
</ListItem>
) : ('')
}
{this.props.estimationStatePro.estimation.typechauffage!==-1 ?(

<ListItem >
<ListItemIcon>
<CheckIcon />
</ListItemIcon>
<ListItemText> {this.getTypeChauffage()}</ListItemText>
</ListItem>
) : ('')
}
{this.props.estimationStatePro.estimation.bien==="appartement" ?  (
<>
<ListItem >
<ListItemIcon>
</ListItemIcon>
<div className="item--luminosite">
                                    <StarPicker disabled={true} onChange={this.changeLuminosity} value={this.state.luminosite} numberStars={4} size={25}/>
                                    {
                                        this.state.luminosite === 1 ? (
                                            <div className="star-rating">Faiblement ensoleillé</div>
                                        ) : this.state.luminosite === 2 ? (
                                            <div className="star-rating">Ensoleillé</div>
                                        ) : this.state.luminosite === 3 ? (
                                            <div className="star-rating">Très ensoleillé</div>
                                        ) : (
                                            <div className="star-rating">Très ensoleillé toute la journée</div>
                                        )
                                    }
</div>
{/* <ListItemText>La luminosité est notée {this.props.estimationStatePro.estimation.luminosite}/4</ListItemText> */}
</ListItem>
<ListItem >
<ListItemIcon>
</ListItemIcon>

<div className="item--agencement">
                                    <StarPicker disabled={true} onChange={this.changeAgencement} value={this.state.agencement} numberStars={4} size={25}/>
                                    {
                                        this.state.agencement === 1 ? (
                                            <div className="star-rating">Simple, entrée de gamme</div>
                                        ) : this.state.agencement === 2 ? (
                                            <div className="star-rating">Normal, milieu de gamme</div>
                                        ) : this.state.agencement === 3 ? (
                                            <div className="star-rating">Qualitatif, matériaux haut de gamme</div>
                                        ) : (
                                            <div className="star-rating">Luxe, matériaux d’exception</div>
                                        )
                                    }
                                </div>
                        </ListItem>
</>
) : ('')
                                }
</List>

                    </div>
                </Grid>

            </Grid>
            <div className="second--container">
            <Grid container spacing={2}>
        <div className="third--container-title">
        <h3 className="report--subtitle"> Référentiel fiscal </h3>
                        </div>
        <Grid item xs={12}>
        <Card variant="outlined">
<CardContent>
            <p className="zone--listing">Votre bien se situe dans la zone <span className="zone">{this.props.estimationStatePro.estimation.zone}</span> du référentiel de l'ANCFCC</p>
            <p className="prix__zone">Le prix moyen indiqué par l'ANCFCC pour {this.props.estimationStatePro.estimation.bien==="appartement" ? ('un appartement') : ('une villa')} dans cette zone est de <span className="span--prix"><NumberFormat displayType={'text'} value={Math.round(this.props.estimationStatePro.prix_ancfcc_found)} thousandSeparator={" "}/></span> MAD </p>
            <p className="attention__ancfcc">Attention : cette donnée n'a pas été actualisé pour le grand public depuis <span className="date--actualisation">2019</span></p>
        </CardContent>
        <CardActions disableSpacing>
{this.state.prix_ancfcc ? (
<span className="fav-select select" onClick={ () => this.unSelectAncfcc()}> Retirer au rapport </span>
) : (
<span className="fav-select unselect" onClick={ () => this.selectAncfcc()}> Ajouter du rapport </span>
)}
</CardActions>
        </Card>
        </Grid>
        </Grid>
        </div> 
            <div className="third--container">
            <Grid container spacing={2}>

        <Grid item xs={12}>
        <div className="third--container-title">
        <h3 className="report--subtitle"> Localisation du bien </h3>
                        </div>
            <div className="map2" id="mapbox--container">

</div>

        </Grid>
        {this.props.estimationStatePro.places ? (
        <Grid item xs={12} >
            <h3 className="report--subtitle">Commerces et services </h3>
            
<ServiceMap viewport={{latitude : parseFloat(`${this.props.estimationStatePro.estimation.localisation.split("lat : ")[1].split(" ")[0]}`),
longitude : parseFloat(`${this.props.estimationStatePro.estimation.localisation.split("lng : ")[1]}`), zoom : 14}}
localisation={this.props.estimationStatePro.estimation.localisation}
list_restaurants={this.props.estimationStatePro.list_restaurants}
list_ecoles={this.props.estimationStatePro.list_ecoles}
list_pharmacies={this.props.estimationStatePro.list_pharmacies}
list_supermarches={this.props.estimationStatePro.list_supermarches}/>
        <Card variant="outlined">
<CardContent>
{/* <div className="places--content">
<p className="place--display"><span className="count">{restauCount}</span> Restaurants à proximité de votre appartement </p>
<p className="place--display"><span className="count">{pharmaCount}</span> Pharmacies à proximité de votre appartement </p>
<p className="place--display"><span className="count">{superMCount}</span> Supermarchés à proximité de votre appartement </p>
<p className="place--display"><span className="count">{autreCount}</span> Autres commerces de proximités proches de votre appartement </p> 
</div>
<div className="places__chart">
<Radar data={dataPolar} options={options} /> 

</div>*/}
<PlacesRating nombre_restaurants={this.props.estimationStatePro.nombre_restaurants} note_restaurants={this.props.estimationStatePro.note_restaurants}
nombre_pharmacies={this.props.estimationStatePro.nombre_pharmacies} note_pharmacies={this.props.estimationStatePro.note_pharmacies}
nombre_supermarches={this.props.estimationStatePro.nombre_supermarches} note_supermarches={this.props.estimationStatePro.note_supermarches} 
nombre_ecoles={this.props.estimationStatePro.nombre_ecoles} note_ecoles={this.props.estimationStatePro.note_ecoles}
list_ecoles={this.props.estimationStatePro.list_ecoles}
list_pharmacies={this.props.estimationStatePro.list_pharmacies}
list_restaurants={this.props.estimationStatePro.list_restaurants}
list_supermarches={this.props.estimationStatePro.list_supermarches}
/>

</CardContent>

<CardActions disableSpacing>
{/* <IconButton aria-label="add to favorites">
{this.state.places_selected ? (
<FavoriteIcon onClick={ () => this.unSelectPlaces()}/>
) : (
<FavoriteBorderIcon onClick={ () => this.selectPlaces()} />
)}
</IconButton> */}
</CardActions>
</Card>
</Grid> ) : ('') }
        </Grid>
        </div>
        <div className="price-evolution--container">
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <h3 className="price--evolution-title report--subtitle">Évolution du prix de votre bien</h3>
                <LineChart estimation={this.state.prix_force ? 
                (this.state.prix_force==="" ? this.props.estimationStatePro.estimation.estimation : (this.state.prix_force)) : this.props.estimationStatePro.estimation.estimation } />
            </Grid>
        </Grid>
        </div>

        <div className="fourth--container">
        {this.props.estimationStatePro.transactions_found.length > 0 || this.props.estimationStatePro.annonces_found.length>0 ? (
            <Grid container spacing={2}>
        <div className="third--container-title">
        <h3 className="report--subtitle"> Biens comparables </h3>
        <p className="radius-subtitle">Les biens comparables dans un rayon de 500 mètres autour de votre appartement</p>
        <p class="radius-subtitle">Sélectionnez les biens comprables à insérer dans le rapport d'estimation</p>
                        </div>
                        {this.state.currentTransactions.map((row, index) => (
        <Grid item xs={12}>
                        <div className="transac-content">

                <Card variant="outlined">
<CardContent>
<div className="annonce-content">
<p className="desc--annonce">Vente d'un {row.consistance} d'une surface de {row.surface} m<sup>2</sup></p>
<p className="prix--annonce">Prix : <NumberFormat displayType={'text'} value={Math.round(row.prix)} thousandSeparator={" "}/> MAD </p>
<p className="prix--annonce prix-m2"> <NumberFormat displayType={'text'} value={Math.round(row.prix/row.surface)} thousandSeparator={" "}/>  MAD/m² </p>
{this.formatConstruction(row.construction) !=="" ? (
<p className="date--annonce">Construction : {this.formatConstruction(row.construction)}  </p> )
 : (<></>)}
<p className="date--annonce">Date de la transaction : {row.dateTransactions} </p>    
{ row.images && row.images.length > 0 ? (
                                <CarouselTransaction images={
                                    row.images
                                } />
                            ) : (
                                ""
                            )}
<p className="source--annonce">Source : <a href={`https://www.agenz.ma/prix-immobilier/vente-recente/${row.address==="" ? ("Casablanca") :( `${row.address.replace(/ /g, '-').replace(/'/g, '-').replace(/é/g, 'e').replace(/ô/g, 'o').replace(/,/g, '')}`)}/${row.transactionId}`} target="_blank" rel="noreferrer">{`https://www.agenz.ma/prix-immobilier/vente-recente/${row.address==="" ? ("Casablanca") :( `${row.address.replace(/ /g, '-').replace(/'/g, '-').replace(/é/g, 'e').replace(/ô/g, 'o').replace(/,/g, '')}`)}/${row.transactionId}`}</a></p>                      
</div>
</CardContent>
<CardActions disableSpacing>
{this.state.transactions_selected.filter(listing => listing===row.transactionId).length>0 ? (
<span className="fav-select select" onClick={ () => this.unSelectTransaction(row.transactionId)}> Retirer du rapport </span>
) : (
<span className="fav-select unselect" onClick={ () => this.selectTransaction(row.transactionId)}> Ajouter au rapport </span>
)}
</CardActions>
</Card>
</div>

        </Grid>
                        ))
}
<div className="d-flex flex-row py-4 align-items-center pagination--container">
              <Pagination totalRecords={totalTransactions}  pageNeighbours={1} onPageChanged={this.onPageTransactionChanged} pageLimit={3} />
</div>
                        {this.state.currentAnnonces.map((row, index) => (
        <Grid item xs={12}>
                <Card variant="outlined">
<CardContent>
<div className="annonce-content">
<p className="desc--annonce">Annonce pour {this.props.estimationStatePro.estimation.bien==="appartement" ? 'un appartement' : 'une villa'} de {row.chambres} chambre pour une surface de {row.surface} m<sup>2</sup></p>
<p className="prix--annonce"> <NumberFormat displayType={'text'} value={Math.round(row.prix)} thousandSeparator={" "}/>  MAD </p>
<p className="prix--annonce prix-m2"> <NumberFormat displayType={'text'} value={Math.round(row.prix/row.surface)} thousandSeparator={" "}/>  MAD/m² </p>
{row.etage ? (row.etage ==="" ? ('') : (<p className="date--annonce"><span className="etage--display">{this.formatEtageAnnonce(row.etage)}</span></p>)) : ('')}
<p className="date--annonce">Quartier <span className="quartier--display">{row.quartier}</span></p>       
<p className="date--annonce">Mise en ligne {moment(row.date_annonce,"YYYY-MM-DD").fromNow()}</p>       
<p className="source--annonce">Source : <a href={row.source} target="_blank" rel="noreferrer">{row.source}</a></p>                      
</div>
</CardContent>
<CardActions disableSpacing>
{this.state.annonces_selected.filter(listing => listing===row.source).length>0 ? (
<span className="fav-select select" onClick={ () => this.unSelectAnnonce(row.source)}> Retirer du rapport </span>
) : (
<span className="fav-select select" onClick={ () => this.selectAnnonce(row.source)}> Ajouter au rapport</span>
)}
</CardActions>
</Card>

        </Grid>
                        ))
}
<div className="d-flex flex-row py-4 align-items-center pagination--container">
              <Pagination totalRecords={totalAnnonces} pageNeighbours={1} onPageChanged={this.onPageAnnonceChanged} pageLimit={5} />
</div>
        </Grid>
        ): ('')
}
        </div>


        </div>
    </Grid>
</ThemeProvider>
<ImageUpload folder={"images_rapport"} />
<div className="button--validate">
{this.props.estimationStatePro.images_added ? (
this.props.estimationStatePro.images_ready ? (<button onClick={this.validateReport} className="button button-primary" >Valider l'édition du rapport</button>
) : (
<button onClick={this.validateReport} className="button button-primary" disabled>En attente de validation des photos</button>
) ) : (
<button onClick={this.validateReport} className="button button-primary">Valider l'édition du rapport</button>
)
}

    </div>
</div>
</>

</div>
</div>
</div>
                    </div>
                            <div>

                            </div>
                        </>



                    </div>
                )
        }
    </ThemeProvider>
    </div>
    </div>
</>
);
}
}

const mapStateToProps = (state) => {
const uid = state.auth.uid;
const email = state.auth.email;
const loader = state.loading.loading;
const estimation = state.estimationStatePro;
const UserEstimation = state.userEstimation;
const user = state.auth.user
return {
config: state.config,
email: email,
uid: uid,
loader: loader,
estimationStatePro: estimation,
estimation: UserEstimation,
user: user
};
};

export default connect(mapStateToProps)(withRouter(StepperEstimationDisplay));