import React, { Component } from "react";
import './LoginEpaceproComponent.scss';
import logo from '../../assets/img/agenz-logo-white.png';
import logoSoge from '../../assets/img/SG.jpeg';
import { Link } from 'react-router-dom';
import Spinner from "react-bootstrap/Spinner";

import { signIn, passForgot } from "../../Actions/AuthActions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import SelectBox from './../../Elements/select-box/index';
import firebase from '../../Config/FirebaseConfig';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { toast } from "react-toastify";
import utm from 'url-utm-params'

class LoginEpaceproComponent extends Component{

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            passForgot: false,
            email: "",
            password: "",
            name : "",
            number : "",
            activite : "-",
        };
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

    handleSubmitPro = (e) => {
        e.preventDefault();
        console.log(this.state);
        
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
            
            toast.success("Nous avons bien reçu votre demande d'enregistrement à Agenz PRO. Un agent vous recontactera dans les plus brefs délais.");
            this.closeModal();
        }).catch((err) =>{
            console.log(err)
            toast.error("L'enregistrement a rencontré une erreur !");
        })
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signIn(this.state);
    };


    handleChangeNumber = (e) => {
        this.setState({
            number: e,
        });
    }

    handleSubmitForgotPass = (e) =>{
        e.preventDefault();
        this.props.passForgot(this.state);
    }

    setPassForgot = () => {
        this.setState({passForgot: !this.state.passForgot});
    }

    closeModal = () => {
        this.setState({open: !this.state.open})
    }

    componentDidMount = () => { window.scrollTo(0, 0); }
    
    render() {
        if( this.props.user && this.props.user.isPro ) {
            return <Redirect to="/pro-space"/>
        } else if ( this.props.user && !this.props.user.isPro ) {
            return <Redirect to="/account"/>
        } else {
            return (
                <div className="login-area">
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
                                <form onSubmit={this.handleSubmitPro} autoComplete= "off" className = "espaceProRegister">
                                <input type="hidden" name="utm_source" value={utm.utm(window.location.href).utm_source}></input>
   	<input type="hidden" name="utm_medium" value={utm.utm(window.location.href).utm_medium}></input>
   	<input type="hidden" name="utm_campaign" value={utm.utm(window.location.href).utm_campaign}></input>
   	<input type="hidden" name="utm_content" value={utm.utm(window.location.href).utm_content}></input>
	<input type="hidden" name="utm_term" value={utm.utm(window.location.href).uutm_term}></input>
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
                                                onChange={this.handleChangeNumber}/>
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
                    <img src={logoSoge} alt="" />
                    <div className="login-form">
                        <div  className="text-center">
                                {
                                    !this.state.passForgot ? (
                                        <>
                                            <div className = "login-title">
                                                <Link to = "/"> <span title = "Retour"> <i className ="fa fa-caret-left "></i> </span></Link>
                                                <h3> Connectez-vous</h3>
                                            </div>
                                            
                                            <p>Entrer dans votre espace professionnel et gérer vos transactions et estimations</p>
    
                                            <form onSubmit={this.handleSubmit}>
                                            <input type="hidden" name="utm_source" value={utm.utm(window.location.href).utm_source}></input>
   	<input type="hidden" name="utm_medium" value={utm.utm(window.location.href).utm_medium}></input>
   	<input type="hidden" name="utm_campaign" value={utm.utm(window.location.href).utm_campaign}></input>
   	<input type="hidden" name="utm_content" value={utm.utm(window.location.href).utm_content}></input>
	<input type="hidden" name="utm_term" value={utm.utm(window.location.href).uutm_term}></input>
                                                <div className="form-group row">
                                                    <div className="col">
                                                        <input 
                                                        className="form-control" 
                                                        type="email"  
                                                        placeholder="Email"
                                                        id="email"
                                                        onChange={this.handleChange}
                                                        />
                                                    </div>
                                                </div>
    
                                                <div className="form-group row">
                                                    <div className="col">
                                                        <input 
                                                        className="form-control" 
                                                        type="password"  
                                                        placeholder="Mot de passe"
                                                        id="password"
                                                        onChange={this.handleChange}
                                                        />
                                                    </div>
                                                </div>
    
                                                <div className="form-group text-center">
                                                    <button type="submit" className="button button-primary submitLoggin">
                                                        Confirmer
                                                        {this.props.loading && (
                                                            <div className="logginButtonSpinner">
                                                                <Spinner animation="border" variant="primary" size="sm"/>
                                                            </div>
                                                        )}
                                                    </button>
 
                                                </div>
    
                                            </form>
                                        </>
                                    ) : (
                                        <>
                                            <div className = "login-title">
                                                <p class="link-login-style" onClick={this.setPassForgot}> <span title = "Retour"> <i className ="fa fa-caret-left "></i> </span></p>
                                                <h3> Mot de passe oublié</h3>
                                            </div>
                                            
                                            <p>Entrez votre email et recevez un email de reinitialisation de votre mot de passe.</p>
    
                                            <form onSubmit={this.handleSubmitForgotPass}>
                                            <input type="hidden" name="utm_source" value={utm.utm(window.location.href).utm_source}></input>
   	<input type="hidden" name="utm_medium" value={utm.utm(window.location.href).utm_medium}></input>
   	<input type="hidden" name="utm_campaign" value={utm.utm(window.location.href).utm_campaign}></input>
   	<input type="hidden" name="utm_content" value={utm.utm(window.location.href).utm_content}></input>
	<input type="hidden" name="utm_term" value={utm.utm(window.location.href).uutm_term}></input>
                                                <div className="form-group row">
                                                    <div className="col">
                                                        <input 
                                                        className="form-control" 
                                                        type="email"  
                                                        placeholder="Email"
                                                        id="email"
                                                        onChange={this.handleChange}
                                                        />
                                                    </div>
                                                </div>
    
    
                                                <div className="form-group text-center">
                                                    <button type="submit" className="button button-primary submitForgotPassword" onClick = {this.resetPassword}>
                                                        Réinitialiser
                                                    </button>
    
                                                    <div className="justify-content">
    
                                                        {/* <div className="pass-forgot" >
                                                            <a onClick={this.setPassForgot}>Je me rappelle de mon mot de passe</a>
                                                        </div> */}
                                                    </div>
                                                </div>
                                            </form>
                                        </>
                                    )
                                }
                        </div>
                        {!this.state.passForgot ? (
                                                                               <div className="justify-content login--bottom-links">
                                                                               {/* <div className="have-not-account" onClick={() =>{ this.setState({open: true})}}>
                                                                                   Pas encore de compte? <span className = "create">Créer</span> 
                                                                               </div> */}
                                                                               <div className="pass-forgot" >
                                                                               <p class="link-login-style"  onClick={this.setPassForgot}>Mot de passe oublie?</p>
                                                                               </div>
                                                                           </div>
                        ) : (
                            <></>
                        )}
                    </div>
                    <img src={logo} alt="" />

                </div>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
      user: state.auth.user,
      loading: state.loading.loading
    };
};
const mapDispatchToProps = (dispatch) => {
return {
    signIn: (creds) => dispatch(signIn(creds)),
    passForgot: (creds) => dispatch(passForgot(creds)),
};
};
export default connect(mapStateToProps, mapDispatchToProps) (LoginEpaceproComponent);