import React from 'react';
import './Heros.scss';
import firebase from '../../Config/FirebaseConfig';


import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
// https://gitlab.com/catamphetamine/react-phone-number-input
import 'react-phone-number-input/style.css'

import SelectBox from './../../Elements/select-box/index';
import logo_pro from '../../assets/img/Logo_hd_PRO.png';
import MuiPhoneNumber from "material-ui-phone-number";
import TextField from '@material-ui/core/TextField';
import {theme} from '../../assets/theme'
import {ThemeProvider} from '@material-ui/core/styles';
import utm from 'url-utm-params'


class OffresProHero extends React.Component {
    constructor (props){
        super(props);

        this.state = {
            open: false,
            name : "",
            email : "",
            number : "",
            activite : "",
        };
    }


    closeModal = () => {
        this.setState({open: !this.state.open})
    }
    handleChange = (e) => {

        this.setState({
            [e.target.id]: e.target.value,
        });
    };
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
        .then(()=>{
            this.props.dispatch({type: 'PRO_REGISTERING_SUCCESS'});
           this.closeModal();
        }).catch((err) =>{
            // console.log(err)
            this.props.dispatch({type: 'PRO_REGISTERING_ERROR'});
        })
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

    render () {
        if(this.state.redirect) return <Redirect to="/estimation"/>
        return (
            <div className="Home-hero-section">
                               <Dialog
                    open={this.state.open}
                    onClose= {this.closeModal}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogContent>
                        <ThemeProvider theme={theme}>
                        <DialogContentText id="alert-dialog-localisation-error">
                            <div  className="text-center">
                                <div className = "login-title">
                              <img src={logo_pro} className="logo-image_pro" alt="Agenz logo" />
                                </div>
                                
                                <p>Entrez vos informations pour découvrir nos solutions pro d'estimation.</p>
                                <form className="form--pro"onSubmit={this.handleSubmit}>
                                <input type="hidden" name="utm_source" value={utm.utm(window.location.href).utm_source}></input>
   	<input type="hidden" name="utm_medium" value={utm.utm(window.location.href).utm_medium}></input>
   	<input type="hidden" name="utm_campaign" value={utm.utm(window.location.href).utm_campaign}></input>
   	<input type="hidden" name="utm_content" value={utm.utm(window.location.href).utm_content}></input>
	<input type="hidden" name="utm_term" value={utm.utm(window.location.href).uutm_term}></input>
                                    <div className="form-group row">
                                        <div className="col">
                                            {/* <input 
                                            className="form-control" 
                                            type="text"  
                                            placeholder="Nom complet"
                                            id="name"
                                            onChange={this.handleChange}
                                            /> */}
   <TextField size="small" id="name" label="Nom complet" type="search" onChange={this.handleChange}/>

                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <div className="col">
                                            {/* <input 
                                            className="form-control" 
                                            type="email"  
                                            placeholder="Adresse e-mail"
                                            id="email"
                                            onChange={this.handleChange}
                                            /> */}
   <TextField size="small" id="email" label="Adresse e-mail" type="search" onChange={this.handleChange}/>

                                        </div>
                                    </div>


                                    <div className="form-group row">
                                        <div className="col">
                                            {/* <PhoneInput
                                                defaultCountry="MA"
                                                placeholder="Numéro de téléphone"
                                                value={this.state.number}
                                                onChange={this.handleChangeNumber}/> */}
                                                                   <MuiPhoneNumber
                    name="phoneNumber"
                    label="Numéro de téléphone"
                    id="telephone"
                    data-cy="user-phone"
                    defaultCountry={"ma"}
                    value={this.state.number}
                    onChange={(e) => {this.setState({number : e})}}/>
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
                        </ThemeProvider>
                    </DialogContent>
                </Dialog>
                <section id="pro-hero" classNam="pro-hero">

                    <div className="Home-hero-input-demo">
                    <div className="hero hero-pro">
                        <h1>Éclairez vos décisions immobilières</h1>
                        {/* <p>Nous estimons le prix d'un bien immobilier à partir de sa localisation et de ses caractéristiques, en moins de 2 minutes.</p> */}
                        <button className="button button-primary btn-searchbar btn--demo-pro" onClick={() => {this.setState({open : true})}}>
                                        Demander une démo
                                    </button> 
                    </div>

                </div>
                </section>
    

            </div>
        );
    }
    
}
const mapStateToProps = (state) => {
    const open = state.open;
    return {
      open: open
    };
};

export default connect(mapStateToProps)(OffresProHero);
