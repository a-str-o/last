import { CSSTransition } from 'react-transition-group';
import React, { Component } from 'react';
import './Estimation.scss';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { connect } from "react-redux";
import StepperEstimationMap from './EstimationComponents/StepperEstimationMap';
import StepperEstimationType from './EstimationComponents/StepperEstimationType';
import StepperHeader from './EstimationComponents/StepperHeader';
import StepperEstimationForm from './EstimationComponents/StepperEstimationForm';
import StepperEstimationChar from './EstimationComponents/StepperEstimationChar';
import StepperEstimationYou from './EstimationComponents/StepperEstimationYou';
import StepperEstimationLoader from './EstimationComponents/StepperEstimationLoader';
import StepperEstimationDisplay from './EstimationComponents/StepperEstimationDisplay';
import StepperEstimationError from './EstimationComponents/StepperEstimationError';
import firebase from '../../Config/FirebaseConfig';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import errorImage from '../../assets/img/error_img.png';
import SelectBox from './../../Elements/select-box/index';
import utm from 'url-utm-params'

// https://gitlab.com/catamphetamine/react-phone-number-input
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import StepperEstimationMapDesktop from './EstimationComponents/StepperEstimationMapDesktop';
import StepperEstimationFormDesktop from './EstimationComponents/StepperEstimationFormDesktop';
import StepperEstimationCharDesktop from './EstimationComponents/StepperEstimationCharDesktop';

import StepperEstimationAdditional from './EstimationComponents/StepperEstimationAdditional';
import StepperEstimationAdditionalDesktop from './EstimationComponents/StepperEstimationAdditionalDesktop';
import { Link } from 'react-router-dom';



import { css } from "@emotion/core";
import BeatLoader from "react-spinners/BeatLoader";
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class EstimationStepper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            name : "",
            email : "",
            number : "",
            activite : "-",
            show: true,
            stepper : true,
            loader: true
        }
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        });
    };

    validateDetails () {
        var errorFound = false;

        if (
            this.state.name === "" ||
            this.state.email === "" ||
            this.state.activite === "" ||
            this.state.number === ""
        ) {
            this.props.dispatch({type: 'CONTACT_FIELDS_REQUIRED_ERROR'});

            errorFound = true;
        }

        return errorFound;
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        const error = this.validateDetails();
        if (error) {
            
            return;
        }

        const db = firebase.firestore();
        //Add estimation to firestore
        db.collection("agenzpro")
        .add({
            email: this.state.email,
            job : this.state.activite,
            name : this.state.name,
            phone : this.state.number,
            date : new Date().toISOString()
        })
        .then((res)=>{
            this.props.dispatch({type: 'PRO_REGISTERING_SUCCESS'});
           this.closeModal();

           const dbStore = firebase.firestore();
            var userRef = dbStore.collection("users")
            var query = userRef.doc(this.props.uid);

            query
            .get()
            .then((querySnapshot) =>{

                query.update({
                    isPro: true
                })

                this.setState({
                    show: true
                })

            }).then(res => {
                this.checkUser();
            })
        }).catch((err) =>{
            this.props.dispatch({type: 'PRO_REGISTERING_ERROR'});
        })
    };

    checkUser() {
        const dbStore = firebase.firestore();
        var userRef = dbStore.collection("users")
        var query = userRef.doc(this.props.uid);

        query
        .get()
        .then((querySnapshot) => {

            if(querySnapshot.data().isPro){
                this.setState({show: true});
            }
        })
        .catch((error) => {
        });
    }

    closeModal = () => {
        this.setState({open: !this.state.open})
    }

    getUser() {
        const dbStore = firebase.firestore();
        var userRef = dbStore.collection("users")
        var query = userRef.doc(this.props.uid);

        query
        .get()
        .then(async (querySnapshot) => {
            let Datas = [];
            const estimations = await dbStore.collection('estimations')
            .where('user_id', '==', this.props.uid).get();

            estimations.docs.forEach(est => {
                if(!est.data().isDeleted) {
                    Datas.push(est)
                }
            })

            
            if(!querySnapshot.data().isPro && Datas.length >= 10){
                this.setState({show: false});
            }
            this.setState({loader: false});
        })
        .catch((error) => {
        });
    }
    componentWillMount = () => {
        this.setState({loader: false})
    }
    componentDidMount = () => {
            this.setState({loader: false})
    }
    componentDidUpdate = () => { }
       
    render() {
        const { classes } = this.props;

        return (
            <>

            {
                this.state.loader ? (
                    <div className="loader">
                                                <div className="estimation-top-side">
                            <h1 className="loader-h1">Chargement</h1>
                        </div>
                    <BeatLoader color='#2ea7f9' loading={true} css={override} size={15} />

                    </div>
                ) : (
                    <>
                        <Dialog
                            open={this.state.open}
                            onClose= {this.closeModal}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description">
                            <DialogContent>
                                <DialogContentText id="alert-dialog-localisation-error">
                                    <div  className="text-center">
                                        <div className = "login-title">
                                            <h3> Agenz pro</h3>
                                        </div>
                                        
                                        <p>Entrez vos information pour découvrir nos solutions pro d'estimation.</p>
                                        <form onSubmit={this.handleSubmit}>
                                        <input type="hidden" name="utm_source" value={utm.utm(window.location.href).utm_source}></input>
   	<input type="hidden" name="utm_medium" value={utm.utm(window.location.href).utm_medium}></input>
   	<input type="hidden" name="utm_campaign" value={utm.utm(window.location.href).utm_campaign}></input>
   	<input type="hidden" name="utm_content" value={utm.utm(window.location.href).utm_content}></input>
	<input type="hidden" name="utm_term" value={utm.utm(window.location.href).utm_term}></input>
                                            <div className="form-group row">
                                                <div className="col">
                                                    <input 
                                                    className="form-control" 
                                                    type="text"  
                                                    placeholder="Nom complet"
                                                    id="name"
                                                    onChange={this.handleChange}
                                                    />
                                                </div>
                                            </div>

                                            <div className="form-group row">
                                                <div className="col">
                                                    <input 
                                                    className="form-control" 
                                                    type="email"  
                                                    placeholder="Adresse e-mail"
                                                    id="email"
                                                    onChange={this.handleChange}
                                                    />
                                                </div>
                                            </div>


                                            <div className="form-group row">
                                                <div className="col">
                                                    {/* <input 
                                                    className="form-control" 
                                                    type="phone"  
                                                    placeholder="Téléphone"
                                                    id="number"
                                                    onChange={this.handleChange}/> */}
                                                    <PhoneInput
                                                        defaultCountry="MA"
                                                        placeholder="Numéro de téléphone"
                                                        value={this.state.number}
                                                        onChange={(e) => {
                                                            this.setState({
                                                                number: e,
                                                            });
                                                        }}/>
                                                </div>
                                            </div>

                                            <div className="form-group row">
                                                <div className="col">
                                                    <SelectBox
                                                            id="activite"
                                                            defaultValue={this.state.activite}
                                                            items={[
                                                                { value: '-', id: 'Votre activité' },
                                                                { value: 'Agent Immobilier', id: 'Agent Immobilier' },
                                                                { value: 'Notaire', id: 'Notaire' },
                                                                { value: 'Promoteur / Constructeur', id: 'Promoteur / Constructeur' },
                                                                { value: 'Gestionnaire de patrimoine', id: 'Gestionnaire de patrimoine' },
                                                                { value: 'Syndic', id: 'Syndic' },
                                                                { value: 'Expert', id: 'Expert Immobilier' },
                                                                { value: 'Autre', id: 'Autre' },
                                                            ]}
                                                            zIndex="3"
                                                            onSelectChange={ (item, id) => {
                                                                this.setState({
                                                                    [id]: item.value,
                                                                })
                                                            }}
                                                        />
                                                </div>
                                            </div>

                                            <div className="form-group text-center">
                                                <button type="submit" className="button button-primary">
                                                    Confirmer
                                                </button>
                                            </div>

                                        </form>
                                        
                                    </div>
                                </DialogContentText>
                            </DialogContent>
                        </Dialog>
            {this.state.show ? (

                <div className={'root'}>
 
 
                <CSSTransition appear={true} unmountOnExit in={(!this.props.uid && this.props.estimationState.activeStep < 8)  || (this.props.uid && this.props.estimationState.activeStep < 7)} classNames="StepperEstimationMap">
                    < StepperHeader activeStep={this.props.estimationState.activeStep} steps={this.props.estimationState.steps} classes={classes} />
                </CSSTransition>
 
                <div>
                    <div>
                        <div className="stepper-container">
                            <form onSubmit={this.handleSubmit}>
                            <input type="hidden" name="utm_source" value={utm.utm(window.location.href).utm_source}></input>
   	<input type="hidden" name="utm_medium" value={utm.utm(window.location.href).utm_medium}></input>
   	<input type="hidden" name="utm_campaign" value={utm.utm(window.location.href).utm_campaign}></input>
   	<input type="hidden" name="utm_content" value={utm.utm(window.location.href).utm_content}></input>
	<input type="hidden" name="utm_term" value={utm.utm(window.location.href).uutm_term}></input>

                                <span className="mobile-tablet">
                                    {/* Map */}
                                    <CSSTransition appear={true} unmountOnExit in={this.props.estimationState.activeStep === 0} timeout={{enter : 300, exit : 0}} classNames="StepperEstimation">
                                        <StepperEstimationMap />
                                    </CSSTransition>
                                </span>

                                <span className="desktop">
                                    {/* Map Desktop */}
                                    <CSSTransition appear={true} unmountOnExit in={this.props.estimationState.activeStep === 0} timeout={{enter : 300, exit : 0}} classNames="StepperEstimationDesktop">
                                        <StepperEstimationMapDesktop />
                                    </CSSTransition>
                                </span>

                                {/* Type de bien */}
                                <CSSTransition appear={true} unmountOnExit in={this.props.estimationState.activeStep === 1} timeout={{enter : 300, exit : 0}} classNames="StepperEstimationDesktop">
                                    <StepperEstimationType />
                                </CSSTransition>

                                <span className="mobile-tablet">
                                    {/* Formulaire de details */}
                                    <CSSTransition appear={true} unmountOnExit in={this.props.estimationState.activeStep === 2} timeout={{enter : 300, exit : 0}} classNames="StepperEstimationDesktop">
                                        <StepperEstimationForm />
                                    </CSSTransition>
                                </span>

                                <span className="desktop">
                                    {/* Formulaire de details */}
                                    <CSSTransition appear={true} unmountOnExit in={this.props.estimationState.activeStep === 2} timeout={{enter : 600, exit : 0}} classNames="StepperEstimation">
                                        <StepperEstimationFormDesktop />
                                    </CSSTransition>
                                </span>
                                <span className="mobile-tablet">
                                {/* Characteristiques */}
                                <CSSTransition appear={true} unmountOnExit in={this.props.estimationState.activeStep === 3} timeout={{enter : 600, exit : 0}} classNames="StepperEstimation">
                                    <StepperEstimationChar />
                                </CSSTransition>
                                </span>

                                <span className="desktop">
                                <CSSTransition appear={true} unmountOnExit in={this.props.estimationState.activeStep === 3} timeout={{enter : 600, exit : 0}} classNames="StepperEstimation">
                                    <StepperEstimationCharDesktop />
                                </CSSTransition>

                                </span>
                                <span className="mobile-tablet">
                                    {/* Additional */}
                                    <CSSTransition appear={true} unmountOnExit in={this.props.estimationState.activeStep === 4} timeout={{enter : 600, exit : 0}} classNames="StepperEstimation">
                                        <StepperEstimationAdditional />
                                    </CSSTransition>
                                </span>

                                <span className="desktop">
                                    {/* Additional */}
                                    <CSSTransition appear={true} unmountOnExit in={this.props.estimationState.activeStep === 4} timeout={{enter : 600, exit : 0}} classNames="StepperEstimation">
                                        <StepperEstimationAdditionalDesktop />
                                    </CSSTransition>
                                </span>

                                
                                {/* Le bien est vous */}
                                <CSSTransition appear={true} unmountOnExit in={this.props.estimationState.activeStep === 5} timeout={{enter : 600, exit : 0}} classNames="StepperEstimation">
                                    <StepperEstimationYou />
                                </CSSTransition>

                                {/* Loader */}
                                <CSSTransition appear={true} unmountOnExit in={this.props.estimationState.activeStep === 6} timeout={{enter : 600, exit : 0}} classNames="StepperEstimation">
                                    <StepperEstimationLoader />
                                </CSSTransition>

                                {/* Result display */}
                                <CSSTransition appear={true} unmountOnExit in={this.props.estimationState.activeStep === 7} timeout={{enter : 600, exit : 0}} classNames="StepperEstimation">
                                    <StepperEstimationDisplay />
                                </CSSTransition>

                                {/* Result error */}
                                <CSSTransition appear={true} unmountOnExit in={this.props.estimationState.activeStep === 8} timeout={{enter : 600, exit : 0}} classNames="StepperEstimation">
                                    <StepperEstimationError />
                                </CSSTransition>

                            </form>
                        </div>   
                    </div>
                </div>
            </div>
            ) : (
                <div className = "no-access">
                    <div className = "no-access-icone"> 
                       <img src = {errorImage} alt="Estimation de bien immobilier pour acheter ou vendre au" />
                     </div>

                     <div className = "no-access-title"> 
                        Limite d'estimation atteinte
                     </div>

                     <div className = "no-access-message"> 
                     <p>Vous avez effectué vos dix estimations gratuites. </p>
                     <p> Pour obtenir plus d'estimation et accéder à tous les outils d'analyse du marché développés par agenz, découvrez les offres agenz Pro</p>
                      
                     </div>

                     <div className = "no-access-button">
                         <Link to="/Offres-pro">
                         <button className = "button button-primary">Découvrir agenz Pro</button>
                         </Link>
                    </div>
                </div>
            )

            }
                    </>
                )
            }
            
            
            
            </>
        );
    }
}
const mapStateToProps = (state) => {
    const uid = state.auth.uid;
    const loader = state.loading.loading;
    const estimation = state.estimationState;
    const UserEstimation = state.userEstimation;
    return {
      uid: uid,
      loader: loader,
      estimationState: estimation,
      estimation:UserEstimation,
    };
};
export default connect(mapStateToProps)(EstimationStepper);