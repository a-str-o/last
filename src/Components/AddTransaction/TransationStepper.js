import { CSSTransition } from 'react-transition-group';
import React, { Component } from 'react';
import './Transaction.scss';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { connect } from "react-redux";
import StepperTransactionMap from './TransactionComponents/StepperTransactionMap';
import StepperTransactionType from './TransactionComponents/StepperTransactionType';
import TransactionStepperHeader from './TransactionComponents/TransactionStepperHeader';
import StepperTransactionForm from './TransactionComponents/StepperTransactionForm';
import StepperTransactionChar from './TransactionComponents/StepperTransactionChar';
import StepperTransactionYou from './TransactionComponents/StepperTransactionYou';
import errorImage from '../../assets/img/error_img.png';
import Spinner from "react-bootstrap/Spinner";

 
// https://gitlab.com/catamphetamine/react-phone-number-input
// import '../EstimationPro/EstimationComponents/node_modules/react-phone-number-input/style.css'

class TransactionStepper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            name : "",
            email : "",
            number : "",
            activite : "-",
            show: true,
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


    closeModal = () => {
        this.setState({open: !this.state.open})
    }

    // getUser() {
    //     // const dbStore = firebase.firestore();
    //     // var userRef = dbStore.collection("users")
    //     // var query = userRef.doc(this.props.uid);

    //     // query
    //     // .get()
    //     // .then(async (querySnapshot) => {
    //         Axios.get('https://us-central1-agenz-website-prod.cloudfunctions.net/api/getUser').then(result => {
    //         let Datas = [];
    //         const estimations = result.data
    //         console.log(result.data)
    //         estimations.docs.forEach(est => {
    //             if(!est.data().isDeleted) {
    //                 Datas.push(est)
    //             }
    //         })

            
    //         if(!querySnapshot.data().isPro && Datas.length >= 2){
    //             this.setState({show: false});
    //         }
    //         this.setState({loader: false});
    //     })
    //     .catch((error) => {
    //     });
    // }

    componentDidMount = () => {
        // if(this.props.uid) {
        //     this.getUser();
        // }else {
            this.setState({loader: false})
        // }
        
    }
       
    render() {
        const { classes } = this.props;

        return (
            <>

            {
                this.state.loader ? (
                    <div className="loader">
                        <Spinner animation="border" variant="primary" size="lg"/>
                        <div className="estimation-top-side">
                            <h1 className="loader-h1">Chargement...</h1>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* <Dialog
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
            */}
            {this.state.show ? (

                <div className={'root'}>
                <CSSTransition appear={true} unmountOnExit in={this.props.espacePro.activeStep < 5} timeout={300} classNames="StepperTransactionMap">
                    < TransactionStepperHeader activeStep={this.props.espacePro.activeStep} steps={this.props.espacePro.steps} classes={classes} />
                </CSSTransition>
                <div>
                    <div>
                        <div className="stepper-container">

                                {/* Map */}
                                <CSSTransition appear={true} unmountOnExit in={this.props.espacePro.activeStep === 0} timeout={0} classNames="StepperTransaction">
                                    <StepperTransactionMap />
                                </CSSTransition>

                                {/* Type de bien */}
                                <CSSTransition appear={true} unmountOnExit in={this.props.espacePro.activeStep === 1} timeout={0} classNames="StepperTransaction">
                                    <StepperTransactionType />
                                </CSSTransition>

                                {/* Formulaire de details */}
                                <CSSTransition appear={true} unmountOnExit in={this.props.espacePro.activeStep === 2} timeout={0} classNames="StepperTransaction">
                                    <StepperTransactionForm />
                                </CSSTransition>

                                {/* Characteristiques */}
                                <CSSTransition appear={true} unmountOnExit in={this.props.espacePro.activeStep === 3} timeout={0} classNames="StepperTransaction">
                                    <StepperTransactionChar />
                                </CSSTransition>

                                {/* Le bien est vous */}
                                <CSSTransition appear={true} unmountOnExit in={this.props.espacePro.activeStep === 4} timeout={0} classNames="StepperTransaction">
                                    <StepperTransactionYou />
                                </CSSTransition>

                        </div>   
                    </div>
                </div>
            </div>
            ) : (
                <div className = "no-access">
                    <div className = "no-access-icone"> 
                       <img src = {errorImage} alt={"Impossible d'accéder à l'estimation"} />
                     </div>

                     <div className = "no-access-title"> 
                        Limite d'estimation atteinte
                     </div>

                     <div className = "no-access-message"> 
                     <p>Vous avez effectué vos dix estimations gratuites. </p>
                     <p> Pour obtenir plus d'estimation, veuillez vous inscrire à Agenz Pro</p>
                      
                     </div>

                     <div className = "no-access-button">
                         <button className = "button button-primary" onClick={() =>{ this.setState({open: true})}}>Passez à Agenz Pro</button>
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
    const UserTransaction = state.userTransaction;
    return {
      uid: uid,
      loader: loader,
      espacePro: state.espacePro,
      estimation:UserTransaction,
    };
};
export default connect(mapStateToProps)(TransactionStepper);