import React, { Component } from "react";
import './LoginComponent.scss';
import logo from '../../assets/img/agenz-logo-white.png';
import logoSoge from '../../assets/img/SG.jpeg';
import { Link } from 'react-router-dom';
import Spinner from "react-bootstrap/Spinner";

import { signIn, passForgot } from "../../Actions/AuthActions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import utm from 'url-utm-params'

class LoginComponent extends Component{

    constructor(props) {
        super(props);
        this.state = {
            passForgot: false,
            email: "",
            password: "",
        };
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        });
    };
    
    handleChangeMail = (e) => {
        this.setState({
            [e.target.id]: e.target.value.trim(),
        });
    };
    
    handleSubmit = (e) => {
        //console.log("submit")
        e.preventDefault();
        this.props.signIn(this.state);
    };


    handleSubmitForgotPass = (e) =>{
        e.preventDefault();
        this.props.passForgot(this.state);
    }

    setPassForgot = () => {
        this.setState({passForgot: !this.state.passForgot});
    }

    componentDidMount = () => { window.scrollTo(0, 0); }
    
    render() {
        if( this.props.authenticated && this.props.authenticatedPro ) {
            return <Redirect to="/pro-space"/>
        } else if ( this.props.authenticated && !this.props.authenticatedPro ) {
            return <Redirect to="/account"/>
        } else {
            return (
                <div className="login-area">
                    
                    <Link to="/">
                    <img src={logo} alt="" />
                    </Link>
                                        <div className="login-form">
                        <div  className="text-center">
                                {
                                    !this.state.passForgot ? (
                                        <>
                                            <div className = "login-title">
                                                {/* <Link to = "/"> <span title = "Retour"> <i className ="fa fa-caret-left "></i> </span></Link> */}
                                                <h3> Connectez-vous</h3>
                                            </div>
                                            
                                            <p>Entrez dans votre espace client et gérez vos dossiers</p>
    
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
                                                        placeholder="Email"
                                                        id="email"
                                                        onChange={this.handleChangeMail}
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
                                                {/* <a onClick={this.setPassForgot}> <span title = "Retour"> <i className ="fa fa-caret-left "></i> </span></a> */}
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
                        { !this.state.passForgot ? (
                                                                                <div className="justify-content login--bottom-links">
                                                                                <div className="have-not-account" >
                                                                                    Pas encore de compte?  <Link to='/register'>Créer</Link>
                                                                                </div>
                                                                                <div className="pass-forgot" >
                                                                                    <a  onClick={this.setPassForgot}>Mot de passe oublie?</a>
                                                                                </div>
                                                                            </div>
                        ) :
                        (
                            <div> </div>
                        )

                        }
                    </div>

                </div>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
      user: state.auth.user,
      authenticated : state.auth.authenticated,
      authenticatedPro : state.auth.authenticatedPro,
      loading: state.loading.loading
    };
};
const mapDispatchToProps = (dispatch) => {
return {
    signIn: (creds) => dispatch(signIn(creds)),
    passForgot: (creds) => dispatch(passForgot(creds)),
};
};
export default connect(mapStateToProps, mapDispatchToProps) (LoginComponent);