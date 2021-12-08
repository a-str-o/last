import Axios from 'axios';
import React, { Component } from 'react';
import { connect } from "react-redux";


import { toast } from "react-toastify";
import Grid from '@material-ui/core/Grid';
import { theme } from '../../../assets/theme'

import CircularProgress from '@material-ui/core/CircularProgress';
import CheckIcon from '@material-ui/icons/Check';
import {withStyles} from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import './StepperEstimationLoader.scss'

// const override = css`
//   display: block;
//   margin: 0 auto;
//   border-color: red;
// `;

const styles = (theme) => ({
    root: {
      display: 'flex',
      alignItems: 'center',
    },
    wrapper: {
      margin: theme.spacing(1),
      position: 'relative',
    },
    buttonSuccess: {
      backgroundColor: "green",
      '&:hover': {
        backgroundColor: "green",
      },
    },
    fabProgress: {
      color: "green",
      position: 'absolute',
      top: -6,
      left: -6,
      zIndex: 1,
    },
    buttonProgress: {
      color: "green",
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12,
    },
  });


class StepperEstimationLoader extends Component {
    

    constructor(props) {
        super(props);
        this.state = {
            loadingPdf : true,
            displayPdf : false,
            calculEstimation : true,

        }
    }
    
    loadTransactions(){
        let data_vicinity_transactions =

        {lat : this.props.estimationStatePro.marker.latitude, 
        lng : this.props.estimationStatePro.marker.longitude,
        bien : this.props.estimationStatePro.estimation.bien,
        typologie : this.props.estimationStatePro.estimation.typologie,
        radius : 500
        }

        // Axios.post('https://api.agenz.ma/api/vicinity/PermisConstruire', data_vicinity).then((res) => {
        Axios.defaults.headers.common["Authorization"] = localStorage.getItem("FBIdToken")
        Axios.post('https://api.agenz.ma/api/vicinity/transactions', data_vicinity_transactions).then((res) => {
        // Axios.post('http://127.0.0.1:5000/api/vicinity/transactions', data_vicinity_transactions).then((res) => {            
        console.log(res.data)
        this.props.dispatch({type : 'PRO_SET_TRANSACTIONS_FOUND', data : { transactions_found: res.data.data }})
        })
        .catch(err => {
            console.log(err.response)
        })

        // Axios.post('https://api.agenz.ma/api/vicinity/PermisHabiter', {arrondissement : this.props.estimationStatePro.arrondissement}).then((res) => {
        // // Axios.post('http://127.0.0.1:5000/api/vicinity/PermisHabiter', {arrondissement : this.props.estimationStatePro.arrondissement}).then((res) => {
        //     Axios.defaults.headers.common["Authorization"] = localStorage.getItem("FBIdToken")
        //     console.log(res.data)
        //     })
        //     .catch(err => {
        //         console.log(err)
        //     })
    }
    async getEstimation() {
        
this.loadTransactions()
        if(this.props.estimationStatePro.estimation.bien === 'appartement') {
            
            const dataForEstimaion = {
                a_contacter: this.props.estimationStatePro.estimation.a_contacter,
                raison_estimation: this.props.estimationStatePro.estimation.raison_estimation,
                activite: this.props.estimationStatePro.estimation.activite,
                adresse: this.props.estimationStatePro.estimation.adresse,
                agencement: this.props.estimationStatePro.estimation.agencement,
                ascenseur: this.props.estimationStatePro.estimation.ascenseur,
                balcon: this.props.estimationStatePro.estimation.balcon, 
                calme: this.props.estimationStatePro.estimation.calme,
                categorie: this.props.estimationStatePro.estimation.categorie,
                cave: this.props.estimationStatePro.estimation.cave,
                chambreservice: this.props.estimationStatePro.estimation.chambreservice,
                cheminee: this.props.estimationStatePro.estimation.cheminee,
                climatisation: this.props.estimationStatePro.estimation.climatisation,
                concierge: this.props.estimationStatePro.estimation.concierge,
                construction: this.props.estimationStatePro.estimation.construction,
                cuisinefermee: this.props.estimationStatePro.estimation.cuisinefermee,
                duplex: this.props.estimationStatePro.estimation.duplex,
                etage: this.props.estimationStatePro.estimation.etage,
                etagesimmeuble: this.props.estimationStatePro.estimation.etagesimmeuble,
                finition: this.props.estimationStatePro.estimation.finition,
                localisation: this.props.estimationStatePro.estimation.localisation,
                luminosite: this.props.estimationStatePro.estimation.luminosite,
                moyens: this.props.estimationStatePro.estimation.moyens,
                orientation: this.props.estimationStatePro.estimation.orientation,
                parking: this.props.estimationStatePro.estimation.parking,
                placesparking: this.props.estimationStatePro.estimation.placesparking,
                projet_vente: this.props.estimationStatePro.estimation.projet_vente,
                proprietaire: this.props.estimationStatePro.estimation.proprietaire,
                redejardin: this.props.estimationStatePro.estimation.redejardin,
                renovee: this.props.estimationStatePro.estimation.renovee,
                residencefermee: this.props.estimationStatePro.estimation.residencefermee,
                sdb: this.props.estimationStatePro.estimation.sdb,
                surfacebalcon: this.props.estimationStatePro.estimation.surfacebalcon,
                surfacecave: this.props.estimationStatePro.estimation.surfacecave,    
                surfacehabitable: this.props.estimationStatePro.estimation.surfacehabitable,
                surfaceparking: this.props.estimationStatePro.estimation.surfaceparking,
                telephone: this.props.estimationStatePro.estimation.telephone,
                typologie: this.props.estimationStatePro.estimation.typologie,
                vueexceptionnelle: this.props.estimationStatePro.estimation.vueexceptionnelle,
                zone: this.props.estimationStatePro.estimation.zone,
            };

            delete Axios.defaults.headers.common["Authorization"]
            delete Axios.defaults.headers.common["authorization"]

            Axios.post(
                'https://cli482fnl7.execute-api.eu-west-3.amazonaws.com/default/lambdassh',
                JSON.stringify(dataForEstimaion)
            ).then(res => {
                this.setState({calculEstimation : false})
                //console.log(res)
                Axios.defaults.headers.common["Authorization"]=localStorage.getItem("FBIdToken")
                this.props.dispatch({ type: 'PRO_ESTIMATION_RECUE', data: res.data });
                this.generateReport();
            }).catch (res => {
                let result_ = {data : {error_id : ""}}
                let data_error = {
                    estimationState: this.props.estimationState,
                    date : new Date(),
                    user : this.props.user,
                    type : "Erreur Lambda SSH",
                    other : res
                }
                Axios.post('https://us-central1-agenz-website-prod.cloudfunctions.net/api/addError',data_error
                 ).then(result => {
                result_ = result
                console.log(result)
                this.props.dispatch({ type: 'PRO_ESTIMATION_ERROR', data: {res : res, error_id : result.data.error_id}});
                this.props.dispatch({ type: 'PRO_SET_ACTIVE_STEP', data: 8 });
                 })
                .catch(err => {
                    console.log(err)
                    this.props.dispatch({ type: 'PRO_ESTIMATION_ERROR', data: {res : res, error_id : result_.data.error_id}});
                    this.props.dispatch({ type: 'PRO_SET_ACTIVE_STEP', data: 8 });
                })
            });
        } else if (this.props.estimationStatePro.estimation.bien === 'villa') {
            // TODO Regarder avec Badr l'objet exacte des villas et l'api a appeler
            const dataForEstimaion = {
                a_contacter: this.props.estimationStatePro.estimation.a_contacter,
                raison_estimation: this.props.estimationStatePro.estimation.raison_estimation,
                activite: this.props.estimationStatePro.estimation.activite,
                adresse: this.props.estimationStatePro.estimation.adresse,
                anneeconstruction: this.props.estimationStatePro.estimation.construction,
                calme: this.props.estimationStatePro.estimation.calme,
                categorie: this.props.estimationStatePro.estimation.categorie,
                chaufeausolaire: this.props.estimationStatePro.estimation.chaufeausolaire,
                cheminee: this.props.estimationStatePro.estimation.cheminee,
                etatgeneral: this.props.estimationStatePro.estimation.etatgeneral,
                garage: this.props.estimationStatePro.estimation.garage,
                localisation: this.props.estimationStatePro.estimation.localisation,
                murmitoyen: this.props.estimationStatePro.estimation.murmitoyen,
                piscine: this.props.estimationStatePro.estimation.piscine,
                projet_vente: this.props.estimationStatePro.estimation.projet_vente,
                proprietaire: this.props.estimationStatePro.estimation.proprietaire,
                climatisation: this.props.estimationStatePro.estimation.climatisation,
                sdb: this.props.estimationStatePro.estimation.sdb,
                surfaceconstruite: this.props.estimationStatePro.estimation.surfaceconstruite,
                surfaceterrain: this.props.estimationStatePro.estimation.surfaceterrain,
                telephone: this.props.estimationStatePro.estimation.telephone,
                typechauffage: this.props.estimationStatePro.estimation.typechauffage,
                typevilla: this.props.estimationStatePro.estimation.typevilla,
                typologie: this.props.estimationStatePro.estimation.typologie,
                vueexceptionnelle: this.props.estimationStatePro.estimation.vueexceptionnelle,
                zone: this.props.estimationStatePro.estimation.zone,
                finition: this.props.estimationStatePro.estimation.finition,

            };
            delete Axios.defaults.headers.common["Authorization"]
            delete Axios.defaults.headers.common["authorization"]
            Axios.post('https://cli482fnl7.execute-api.eu-west-3.amazonaws.com/default/lambdassh_villa', JSON.stringify(dataForEstimaion))
            .then(res => {
                this.setState({calculEstimation : false})

                //console.log(res)
            Axios.defaults.headers.common["Authorization"]=localStorage.getItem("FBIdToken")
            const data = res.data
            this.props.dispatch({type: 'PRO_ESTIMATION_RECUE', data: data});
            this.generateReport();
            }).catch (res => {
                let result_ = {data : {error_id : ""}}
                let data_error = {
                    estimationState: this.props.estimationState,
                    date : new Date(),
                    user : this.props.user,
                    type : "Erreur Lambda SSH Villa",
                    other : res
                }
                Axios.post('https://us-central1-agenz-website-prod.cloudfunctions.net/api/addError',data_error
                 ).then(result => {
                result_ = result
                console.log(result)
                this.props.dispatch({ type: 'PRO_ESTIMATION_ERROR', data: {res : res, error_id : result.data.error_id}});
                this.props.dispatch({ type: 'SET_ACTIVE_STEP', data: 8 });
                 })
                .catch(err => {
                    console.log(err)
                    this.props.dispatch({ type: 'PRO_ESTIMATION_ERROR', data: {res : res, error_id : result_.data.error_id}});
                    this.props.dispatch({ type: 'PRO_SET_ACTIVE_STEP', data: 8 });
                })
            });
        }
    }
    generateReport() {
        //console.log("generatingReport")
        let data_report = JSON.stringify({
            rapport: true,
            bien : this.props.estimationStatePro.estimation.bien,
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
        //console.log(data_report)
        delete Axios.defaults.headers.common["Authorization"]
        delete Axios.defaults.headers.common["authorization"]
        Axios.post('https://cli482fnl7.execute-api.eu-west-3.amazonaws.com/default/lambdassh', data_report).then((res) => {
            //console.log(res.data)
            this.props.dispatch({type : 'PRO_SET_ANNONCES_FOUND', data : { annonces_found: res.data.annonces }})
            this.props.dispatch({type : 'PRO_SET_PLACES_FOUND', data : { places_found: res.data.places }})
            this.props.dispatch({type : 'PRO_SET_PLACES_RATING', data : { 
                note_restaurants: res.data.note_restaurants, nombre_restaurants : res.data.nombre_restaurants, 
                note_pharmacies: res.data.note_pharmacies, nombre_pharmacies : res.data.nombre_pharmacies, 
                note_supermarches: res.data.note_supermarches, nombre_supermarches : res.data.nombre_supermarches,
                note_ecoles: res.data.note_ecoles, nombre_ecoles : res.data.nombre_ecoles,
                list_ecoles : res.data.list_ecoles,
                list_restaurants : res.data.list_restaurants,
                list_pharmacies : res.data.list_pharmacies,
                list_supermarches : res.data.list_supermarches,
            }})
            this.props.dispatch({type : 'PRO_SET_PRIX_ANCFCC_FOUND', data : { prix_ancfcc_found: res.data.prix_ancfcc }})
            this.props.dispatch({type : 'PRO_SET_LOYER', data : { loyer : res.data.loyer }})
            this.setState({loadingPdf: false })
            this.setState({displayPdf: true })
            Axios.defaults.headers.common["Authorization"] = localStorage.getItem("FBIdToken")

            Axios.post('https://us-central1-agenz-website-prod.cloudfunctions.net/api/getAgence', {user_id : this.props.user_id}).then( (res) => {
                this.props.dispatch({type : "SET_PRO_AGENCE",data : res.data })
                toast.success("Rapport généré avec succès")
                this.setState({loadingPdf : false})
    
    
                setTimeout(
                    () =>  this.props.dispatch({ type: 'PRO_SET_ACTIVE_STEP', data: 6 }),
    
                    2000
                  );
            }).catch(err => {
                this.props.dispatch({type : "SET_PRO_AGENCE",data : res.data })
                toast.success("Rapport généré avec succès")
                this.setState({loadingPdf : false})
    
    
                setTimeout(
                    () =>  this.props.dispatch({ type: 'PRO_SET_ACTIVE_STEP', data: 6 }),
    
                    2000
                  );
                
            toast.error("Impossible de récupérer les informations de l'agence. Contactez-nous si le problème persiste")
                // console.log(err)
            })
    

        })
            .catch(err => {
                //console.log(err)
                Axios.defaults.headers.common["Authorization"] = localStorage.getItem("FBIdToken")
                this.props.dispatch({type: 'PRO_PRO_SET_ACTIVE_STEP', data: 7});

            })

    }

    componentDidMount() {
        this.getEstimation();
    }

    render() {


        return (
            <div className="loader">
                                <ThemeProvider theme={theme}>
                <div className="estimation-top-side estimation-top-side-pro">
                    <div className="loading--indications">
                    <Grid container spacing={2}>


                <Grid item xs={12}>
                <div className="loading--unit-indications">

                {this.state.calculEstimation ? ( <CircularProgress size={40} />) : (<CheckIcon size={40} color="primary" />)}
        <h3 className="loading--indication-text">Estimation de votre bien</h3>
</div>
           </Grid>

<Grid item xs={12}>     
<div className="loading--unit-indications">
        {this.state.loadingPdf ? ( <CircularProgress size={40} />) : (<CheckIcon size={40} color="primary"/>)}
    <h3 className="loading--indication-text">Édition du rapport intermédiaire</h3>

</div>
</Grid>   
</Grid>  
</div>

        
                </div>
                </ThemeProvider>
            </div>
        
        );
    }
}
const mapStateToProps = (state) => {
    const uid = state.auth.email;
    const user_id = state.auth.uid
    const loader = state.loading.loading;
    const estimation = state.estimationStatePro;
    const user = state.auth.user

    return {
      uid: uid,
      loader: loader,
      estimationStatePro: estimation,
      user : user,
      user_id : user_id
    };
};
export default connect(mapStateToProps)(withStyles(styles)(StepperEstimationLoader));
