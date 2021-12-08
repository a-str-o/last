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
import StepperEstimationLoader from './EstimationComponents/StepperEstimationLoader';
import StepperEstimationDisplay from './EstimationComponents/StepperEstimationDisplay';
import StepperEstimationError from './EstimationComponents/StepperEstimationError';
import firebase from '../../Config/FirebaseConfig';

import errorImage from '../../assets/img/error_img.png';
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

            
            if(!querySnapshot.data().isPro && Datas.length >= 2){
                this.setState({show: false});
            }
            this.setState({loader: false});
        })
        .catch((error) => {
        });
    }
    // componentWillMount = () => {
    //     this.setState({loader: false})
    // }
    componentDidMount = () => {

            this.setState({loader: false})
        
    }
       
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
                     {this.state.show ? (

                <div className={'root'}>
                <CSSTransition appear={true} unmountOnExit in={(!this.props.uid && this.props.estimationStatePro.activeStep < 7)  || (this.props.uid && this.props.estimationStatePro.activeStep < 6)} classNames="StepperEstimationMap">
                    < StepperHeader activeStep={this.props.estimationStatePro.activeStep} steps={this.props.estimationStatePro.steps} classes={classes} />
                </CSSTransition>
                <div>
                    <div>
                        <div className="stepper-container">

                                <span className="mobile-tablet">
                                    {/* Map */}
                                    <CSSTransition appear={true} unmountOnExit in={this.props.estimationStatePro.activeStep === 0} timeout={300} classNames="StepperEstimation">
                                        <StepperEstimationMap />
                                    </CSSTransition>
                                </span>

                                <span className="desktop">
                                    {/* Map Desktop */}
                                    <CSSTransition appear={true} unmountOnExit in={this.props.estimationStatePro.activeStep === 0} timeout={300} classNames="StepperEstimation">
                                        <StepperEstimationMapDesktop />
                                    </CSSTransition>
                                </span>

                                {/* Type de bien */}
                                <CSSTransition appear={true} unmountOnExit in={this.props.estimationStatePro.activeStep === 1} timeout={300} classNames="StepperEstimation">
                                    <StepperEstimationType />
                                </CSSTransition>

                                <span className="mobile-tablet">
                                    {/* Formulaire de details */}
                                    <CSSTransition appear={true} unmountOnExit in={this.props.estimationStatePro.activeStep === 2} timeout={300} classNames="StepperEstimation">
                                        <StepperEstimationForm />
                                    </CSSTransition>
                                </span>

                                <span className="desktop">
                                    {/* Formulaire de details */}
                                    <CSSTransition appear={true} unmountOnExit in={this.props.estimationStatePro.activeStep === 2} timeout={300} classNames="StepperEstimation">
                                        <StepperEstimationFormDesktop />
                                    </CSSTransition>
                                </span>
                                <span className="mobile-tablet">
                                {/* Characteristiques */}
                                <CSSTransition appear={true} unmountOnExit in={this.props.estimationStatePro.activeStep === 3} timeout={300} classNames="StepperEstimation">
                                    <StepperEstimationChar />
                                </CSSTransition>
                                </span>

                                <span className="desktop">
                                <CSSTransition appear={true} unmountOnExit in={this.props.estimationStatePro.activeStep === 3} timeout={300} classNames="StepperEstimation">
                                    <StepperEstimationCharDesktop />
                                </CSSTransition>

                                </span>
                                <span className="mobile-tablet">
                                    {/* Additional */}
                                    <CSSTransition appear={true} unmountOnExit in={this.props.estimationStatePro.activeStep === 4} timeout={300} classNames="StepperEstimation">
                                        <StepperEstimationAdditional />
                                    </CSSTransition>
                                </span>

                                <span className="desktop">
                                    {/* Additional */}
                                    <CSSTransition appear={true} unmountOnExit in={this.props.estimationStatePro.activeStep === 4} timeout={300} classNames="StepperEstimation">
                                        <StepperEstimationAdditionalDesktop />
                                    </CSSTransition>
                                </span>

                                
                                {/* Le bien est vous */}
                                {/* <CSSTransition appear={true} unmountOnExit in={this.props.estimationStatePro.activeStep === 5} timeout={300} classNames="StepperEstimation">
                                    <StepperEstimationYou />
                                </CSSTransition> */}

                                {/* Loader */}
                                <CSSTransition appear={true} unmountOnExit in={this.props.estimationStatePro.activeStep === 5} timeout={300} classNames="StepperEstimation">
                                    <StepperEstimationLoader />
                                </CSSTransition>

                                {/* Result display */}
                                <CSSTransition appear={true} unmountOnExit in={this.props.estimationStatePro.activeStep === 6} timeout={300} classNames="StepperEstimation">
                                    <StepperEstimationDisplay />
                                </CSSTransition>

                                {/* Result error */}
                                <CSSTransition appear={true} unmountOnExit in={this.props.estimationStatePro.activeStep === 7} timeout={300} classNames="StepperEstimation">
                                    <StepperEstimationError />
                                </CSSTransition>

                        </div>   
                    </div>
                </div>
            </div>
            ) : (
                <div className = "no-access">
                    <div className = "no-access-icone"> 
                       <img src = {errorImage} alt="Estimation de biens immobiliers en ligne" />
                     </div>

                     <div className = "no-access-title"> 
                        Limite d'estimation atteinte
                     </div>

                     <div className = "no-access-message"> 
                     <p>Vous avez effectué vos deux estimations gratuites. </p>
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
    const estimation = state.estimationStatePro;
    const UserEstimation = state.userEstimation;
    return {
      uid: uid,
      loader: loader,
      estimationStatePro: estimation,
      estimation:UserEstimation,
    };
};
export default connect(mapStateToProps)(EstimationStepper);