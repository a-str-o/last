import React, { Component } from "react";
import './RegisterComponent.scss';
import logo from '../../assets/img/agenz-logo-white.png';
import { Link } from 'react-router-dom';


import { signUp } from "../../Actions/AuthActions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import MuiPhoneNumber from "material-ui-phone-number";
import TextField from '@material-ui/core/TextField';
import {theme} from '../../assets/theme'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import utm from 'url-utm-params'

class   RegisterComponent extends Component{
    constructor(props) {
        super(props);    
    this.state = {
            email: null,
            password: null,
            firstname: null,
            lastname: null,
            phone: null,
            phoneError : true
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
        handlePhone = (e) => {
            // // console.log(e.length)
            if(e.length > 8){
            this.setState({phone : e, phoneError : false})
            }
            else {
            this.setState({
                phoneError : true
            })        
            }
        }

        
        handleSubmit = (e) => {
            e.preventDefault();
            const error = this.validateRegistartionFields();
            if (error) {
                this.props.dispatch({type: 'FILL_FORM_ERROR'});
                return;
            }
            this.props.signUp(this.state);
        };
        validateRegistartionFields() {
            let error = false;
                if (
                    !this.state.email ||
                    !this.state.password ||
                    !this.state.firstname ||
                    !this.state.lastname ||
                    !this.state.phone||
                    this.state.phoneError
                ) {
                    error = true;
                    // // console.log(this.state.email)
                        // // console.log(this.state.password)
                        // // console.log(this.state.firstname)
                        // // console.log(this.state.lastname)
                        // // console.log(this.state.phone)
                    
                }
            
            return error;
        }
        render() {
        // const { uid } = this.props;
        // if(uid) return <Redirect to="/login"/>
        return (
            <div className="register-area">
               <Link to = "/"> <img src={logo} alt="" /></Link>
                <div className="register-form">
                    <div  className="text-center">

                        <div className = "register-title">
                            {/* <Link to = "/login"> <span title = "Retour"> <i className ="fa fa-caret-left "></i> </span></Link> */}
                            <h3>Inscrivez-vous</h3>
                        </div>                
                        
                        <p>Créez votre espace client et gérez vos estimations</p>

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
                                    type="text"  
                                    placeholder="Nom *"
                                    id="lastname"
                                    onChange={this.handleChange}
                                    />
                                </div>
                            </div>
                            
                            <div className="form-group row">
                                <div className="col">
                                    <input 
                                    className="form-control" 
                                    type="text"  
                                    placeholder="Prénom *"
                                    id="firstname"
                                    onChange={this.handleChange}
                                    />
                                </div>
                            </div>

                            <div className="form-group row">
                                <div className="col col--phone">
                                    {/* <input 
                                    className="form-control" 
                                    type="tel"  
                                    placeholder="Téléphone *"
                                    id="phone"
                                    onChange={this.handleChange}
                                    /> */}
                                    <ThemeProvider theme={theme}>
                                                                   <MuiPhoneNumber
                    name="phoneNumber"
                    label="Numéro de téléphone"
                    id="telephone"
                    data-cy="user-phone"
                    defaultCountry={"ma"}
                    value={this.state.phone}
                    error={this.state.phoneError}
                    onError={this.props.dispatch({type : 'PHONE_NUMBER_ERROR'})}
                    onChange={this.handlePhone}/>
                    </ThemeProvider>
                                </div>
                            </div>

                            <div className="form-group row">
                                <div className="col">
                                    <input 
                                    className="form-control" 
                                    placeholder="Email *"
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
                                    placeholder="Mot de passe *"
                                    id="password"
                                    onChange={this.handleChange}
                                    />
                                </div>
                            </div>

                            <div className="form-group text-center">
                                <button type="submit" className="button button-primary submitForgotPassword">
                                    Confirmer
                                </button>

                                <div className="justify-content">
                                    <div className="have-not-account" >
                                        J'ai déjà compte?  <Link to='/login'>Se connecter</Link>
                                    </div>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>

            </div>
        );
    }
}

const mapStateToProps = (state) => {

    const uid = state.firebase.auth.uid;
    return {
      uid: uid,
    };
};
const mapDispatchToProps = (dispatch) => {
return {
    signUp: (creds) => dispatch(signUp(creds)),
    dispatch,
};
};
export default connect(mapStateToProps, mapDispatchToProps) (RegisterComponent);