import Axios from 'axios';
import React, { Component } from 'react';
import { connect } from "react-redux";


import Grid from '@material-ui/core/Grid';
import { theme } from '../../../assets/theme'

import CircularProgress from '@material-ui/core/CircularProgress';
import CheckIcon from '@material-ui/icons/Check';

import { ThemeProvider } from '@material-ui/core/styles';


class StepperEstimationLoader extends Component {
    

    constructor(props) {
        super(props);
        this.state={
            donnees_zone : true,
            calcul_estimation : true
        }
    }
   
    

    async getEstimation() {



        

        if(this.props.estimationState.estimation.bien === 'appartement') {
            
            const dataForEstimaion = {
                a_contacter: this.props.estimationState.estimation.a_contacter,
                raison_estimation: this.props.estimationState.estimation.raison_estimation,
                activite: this.props.estimationState.estimation.activite,
                adresse: this.props.estimationState.estimation.adresse,
                agencement: this.props.estimationState.estimation.agencement,
                ascenseur: this.props.estimationState.estimation.ascenseur,
                balcon: this.props.estimationState.estimation.balcon, 
                calme: this.props.estimationState.estimation.calme,
                categorie: this.props.estimationState.estimation.categorie,
                cave: this.props.estimationState.estimation.cave,
                chambreservice: this.props.estimationState.estimation.chambreservice,
                cheminee: this.props.estimationState.estimation.cheminee,
                climatisation: this.props.estimationState.estimation.climatisation,
                concierge: this.props.estimationState.estimation.concierge,
                construction: this.props.estimationState.estimation.construction,
                cuisinefermee: this.props.estimationState.estimation.cuisinefermee,
                duplex: this.props.estimationState.estimation.duplex,
                etage: this.props.estimationState.estimation.etage,
                etagesimmeuble: this.props.estimationState.estimation.etagesimmeuble,
                finition: this.props.estimationState.estimation.finition,
                localisation: this.props.estimationState.estimation.localisation,
                luminosite: this.props.estimationState.estimation.luminosite,
                moyens: this.props.estimationState.estimation.moyens,
                orientation: this.props.estimationState.estimation.orientation,
                parking: this.props.estimationState.estimation.parking,
                placesparking: this.props.estimationState.estimation.placesparking,
                projet_vente: this.props.estimationState.estimation.projet_vente,
                proprietaire: this.props.estimationState.estimation.proprietaire,
                redejardin: this.props.estimationState.estimation.redejardin,
                renovee: this.props.estimationState.estimation.renovee,
                residencefermee: this.props.estimationState.estimation.residencefermee,
                sdb: this.props.estimationState.estimation.sdb,
                surfacebalcon: this.props.estimationState.estimation.surfacebalcon,
                surfacecave: this.props.estimationState.estimation.surfacecave,    
                surfacehabitable: this.props.estimationState.estimation.surfacehabitable,
                surfaceparking: this.props.estimationState.estimation.surfaceparking,
                telephone: this.props.estimationState.estimation.telephone,
                typologie: this.props.estimationState.estimation.typologie,
                vueexceptionnelle: this.props.estimationState.estimation.vueexceptionnelle,
                zone: this.props.estimationState.estimation.zone,
            };

            delete Axios.defaults.headers.common["Authorization"]
            delete Axios.defaults.headers.common["authorization"]

            Axios.post(
                'https://cli482fnl7.execute-api.eu-west-3.amazonaws.com/default/lambdassh',
                JSON.stringify(dataForEstimaion)
            ).then(res => {
                this.setState({donnees_zone : false})
                Axios.defaults.headers.common["Authorization"]=localStorage.getItem("FBIdToken")
                this.props.dispatch({type: 'ADD_PRE_ESTIMATION_FIREBASE', data: {...this.props.estimationState.estimation, date: new Date().toISOString()}});
        
                setTimeout(
                    () => {
                        this.setState({calcul_estimation : false})
                        setTimeout( () => {
                this.props.dispatch({ type: 'ESTIMATION_RECUE', data: res.data });
                this.props.dispatch({ type: 'SET_ACTIVE_STEP', data: 7 });
            }, 500);
                

        },

        2000
      );

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
                this.props.dispatch({ type: 'ESTIMATION_ERROR', data: {res : res, error_id : result.data.error_id}});
                this.props.dispatch({ type: 'SET_ACTIVE_STEP', data: 8 });
                 })
                .catch(err => {
                    console.log(err)
                    this.props.dispatch({ type: 'ESTIMATION_ERROR', data: {res : res, error_id : result_.data.error_id}});
                    this.props.dispatch({ type: 'SET_ACTIVE_STEP', data: 8 });
                })
            });
        } else if (this.props.estimationState.estimation.bien === 'villa') {
            // TODO Regarder avec Badr l'objet exacte des villas et l'api a appeler
            const dataForEstimaion = {
                a_contacter: this.props.estimationState.estimation.a_contacter,
                raison_estimation: this.props.estimationState.estimation.raison_estimation,
                activite: this.props.estimationState.estimation.activite,
                adresse: this.props.estimationState.estimation.adresse,
                anneeconstruction: this.props.estimationState.estimation.construction,
                calme: this.props.estimationState.estimation.calme,
                categorie: this.props.estimationState.estimation.categorie,
                chaufeausolaire: this.props.estimationState.estimation.chaufeausolaire,
                cheminee: this.props.estimationState.estimation.cheminee,
                etatgeneral: this.props.estimationState.estimation.etatgeneral,
                garage: this.props.estimationState.estimation.garage,
                localisation: this.props.estimationState.estimation.localisation,
                murmitoyen: this.props.estimationState.estimation.murmitoyen,
                piscine: this.props.estimationState.estimation.piscine,
                projet_vente: this.props.estimationState.estimation.projet_vente,
                proprietaire: this.props.estimationState.estimation.proprietaire,
                sdb: this.props.estimationState.estimation.sdb,
                climatisation: this.props.estimationState.estimation.climatisation,
                surfaceconstruite: this.props.estimationState.estimation.surfaceconstruite,
                surfaceterrain: this.props.estimationState.estimation.surfaceterrain,
                telephone: this.props.estimationState.estimation.telephone,
                typechauffage: this.props.estimationState.estimation.typechauffage,
                typevilla: this.props.estimationState.estimation.typevilla,
                typologie: this.props.estimationState.estimation.typologie,
                vueexceptionnelle: this.props.estimationState.estimation.vueexceptionnelle,
                zone: this.props.estimationState.estimation.zone,
                finition : this.props.estimationState.estimation.finition
            };
            delete Axios.defaults.headers.common["Authorization"]
            delete Axios.defaults.headers.common["authorization"]
            Axios.post('https://cli482fnl7.execute-api.eu-west-3.amazonaws.com/default/lambdassh_villa', JSON.stringify(dataForEstimaion))
            .then(res => {
            this.setState({donnees_zone : false})
            Axios.defaults.headers.common["Authorization"]=localStorage.getItem("FBIdToken")
            const data = res.data
            // console.log(res)
            this.props.dispatch({type: 'ADD_PRE_ESTIMATION_FIREBASE', data:  {...this.props.estimationState.estimation, date: new Date().toISOString()}});
        

            setTimeout(
                () => {
                    this.setState({calcul_estimation : false})
                    setTimeout( () => {
                        this.props.dispatch({type: 'ESTIMATION_RECUE', data: data});
                        this.props.dispatch({type: 'SET_ACTIVE_STEP', data: 7});
                        
                    }, 500);
                

                },

                2000
              );
            
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
                this.props.dispatch({ type: 'ESTIMATION_ERROR', data: {res : res, error_id : result.data.error_id}});
                this.props.dispatch({ type: 'SET_ACTIVE_STEP', data: 8 });
                    
                 })
                .catch(err => {
                    console.log(err)
                    this.props.dispatch({ type: 'ESTIMATION_ERROR', data: {res : res, error_id : result_.data.error_id}});
                    this.props.dispatch({ type: 'SET_ACTIVE_STEP', data: 8 });
                })
            });
        }
        
    }

    getAdresse(){
        return new Promise((resolve,reject)=>{
                const loc = this.props.estimationState.estimation.localisation;
                const lat = loc.substr(5, loc.indexOf(' lng') - 4).trim();
                const lng = loc.substr(lat.length + 13);
                const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyB2buNZK5FTqWGtiu_OKz74KTI_Iu2aD74`;
                if(this.props.estimationState.estimation.adresse && this.props.estimationState.estimation.adresse!=="" ){
                    resolve()
                }
                else {
                delete Axios.defaults.headers.common["Authorization"] 
                delete Axios.defaults.headers.common["authorization"];
        
                Axios.get(url).then(res => {
                Axios.defaults.headers.common["Authorization"]=localStorage.getItem("FBIdToken")
                    let data;
                    if (res.data.results.length > 0) {
            
                    res.data.results[0].address_components.forEach(component => {
                        if (component.types.includes('locality')) {
                         data = {
                             address : res.data.results[0].formatted_address,
                             ville: component.long_name
                        }
                        this.props.estimationState.currentAdress = data.address;
                            
                            this.props.dispatch({ type: 'SET_CURRENT_ADDRESS', data: data});
                            resolve() 
                        }
                    });
        
                    }
            
                    if (res.data.results.length > 0) {
                        resolve()
                    }
                })
                .catch(err => {
                    this.props.dispatch({type: 'CUSTOM_ERROR_MESSAGE', data: err.message});
                    reject()
                });
                }
        })
    }
    componentDidMount() {
        this.getAdresse().then(()=>{
            this.getEstimation();
        })
        .catch(err=>{
            console.log(err)
        })
    }

    render() {
        return (
            <>
            <div className="loader">
           <ThemeProvider theme={theme}>
<div className="estimation-top-side estimation-top-side-pro">
<div className="loading--indications">
<Grid container spacing={2}>


<Grid item xs={12}>
<div className="loading--unit-indications">

{this.state.donnees_zone ? ( <CircularProgress size={40} />) : (<CheckIcon size={40} color="primary" />)}
<h3 className="loading--indication-text">Récupération des données dans votre zone</h3>
</div>
</Grid>

<Grid item xs={12}>     
<div className="loading--unit-indications">
{this.state.calcul_estimation ? ( <CircularProgress size={40} />) : (<CheckIcon size={40} color="primary"/>)}
<h3 className="loading--indication-text">Estimation de votre bien</h3>

</div>
</Grid>   
</Grid>  
</div>


</div>
</ThemeProvider>
</div>
</>
       );
    }
}
const mapStateToProps = (state) => {
    const uid = state.auth.email;
    const loader = state.loading.loading;
    const estimation = state.estimationState;
    const user = state.auth.user

    return {
      uid: uid,
      loader: loader,
      estimationState: estimation,
      user : user
    };
};
export default connect(mapStateToProps)(StepperEstimationLoader);
