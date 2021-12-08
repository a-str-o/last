import React from 'react';
import './ContactSide.scss';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import SelectBox from './../../Elements/select-box/index';
import MuiPhoneNumber from "material-ui-phone-number";
import TextField from '@material-ui/core/TextField';
import {theme} from '../../assets/theme'
import { ThemeProvider } from '@material-ui/core/styles';
import Axios from 'axios'
// https://gitlab.com/catamphetamine/react-phone-number-input
import 'react-phone-number-input/style.css'
import utm from 'url-utm-params'


class ContactSide extends React.Component {
    state = {
        name: "",
        email: "",
        activite: "-",
        number: "",
        message: "",
        redirect: null
    };

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
            this.state.number === "" ||
            this.state.message === ""
        ) {
            this.props.dispatch({type: 'CONTACT_FIELDS_REQUIRED_ERROR'});

            errorFound = true;
        }

        return errorFound;
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        // //console.log(this.state);
        
        const error = this.validateDetails();
        if (error) {
            
            return;
        }


        // const db = firebase.firestore();
        // //Add estimation to firestore
        // db.collection("contacts")
        // .add({
        //     user_id: this.props.uid ? this.props.uid : '',
        //     email: this.state.email ? this.state.email : '',
        //     job : this.state.activite,
        //     message : this.state.message,
        //     name : this.state.name,
        //     phone : this.state.number,
        //     date : new Date().toISOString(),
        // })
        Axios.post('https://us-central1-agenz-website-prod.cloudfunctions.net/api/addContactMessage',{ data: {
            user_id: this.props.uid ? this.props.uid : '',
            email: this.state.email ? this.state.email : '',
            job : this.state.activite,
            message : this.state.message,
            name : this.state.name,
            phone : this.state.number,
            date : new Date().toISOString(),
        } })
        .then((res)=>{
            this.props.dispatch({type: 'CONTACT_SEND_SUCCESS'});
            this.setState({redirect:true});
        }).catch((err) =>{
            // //console.log(err)
            this.props.dispatch({type: 'CONTACT_SEND_ERROR'});
        })
    };

    componentDidMount = () => {window.scrollTo(0, 0)}
    render(){
    if(this.state.redirect) return <Redirect to="/"/>
    return (
        <ThemeProvider theme={theme}>
        <div className="contact-top-side">
            <div className="row">
                <div className="col-md-6">
                    <div className="contact-top-side-form">
                        <h3>Envoyez-nous un message</h3>
                        <form onSubmit={this.handleSubmit}>
                        <input type="hidden" name="utm_source" value={utm.utm(window.location.href).utm_source}></input>
   	<input type="hidden" name="utm_medium" value={utm.utm(window.location.href).utm_medium}></input>
   	<input type="hidden" name="utm_campaign" value={utm.utm(window.location.href).utm_campaign}></input>
   	<input type="hidden" name="utm_content" value={utm.utm(window.location.href).utm_content}></input>
	<input type="hidden" name="utm_term" value={utm.utm(window.location.href).uutm_term}></input>
                            <div className="form-group row">
                                <div className="col-12">
                                    {/* <input 
                                        className="input-form form-control contact-form" 
                                        type="text"  
                                        placeholder="Nom et prénom"
                                        id="name"
                                        onChange={this.handleChange}
                                    /> */}
                                       <TextField size="small" id="name" label="Nom et prénom" type="search" onChange={this.handleChange}/>

                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-12">
                                    <SelectBox
                                        id="activite"
                                        defaultValue={this.state.activite}
                                        items={[
                                            { value: '-', id: 'Votre activité' },
                                            { value: 'Agent Immobilier', id: 'Agent Immobilier' },
                                            { value: 'Banques et assurances', id: 'Banques et assurances' },
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
                            <div className="form-group row">
                                <div className="col-12">
                                    {/* <input 
                                    className="input-form form-control contact-form" 
                                    placeholder="E-mail"
                                    type="email"  
                                    id="email"
                                    onChange={this.handleChange}
                                    /> */}
                                       <TextField size="small" id="email" label="Adresse e-mail" type="search" onChange={this.handleChange}/>

                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-12">
                                    {/* <PhoneInput
                                        defaultCountry="MA"
                                        id="telephone"
                                        placeholder="Numéro de téléphone"
                                        value={this.state.number}
                                        onChange={(e) => {this.setState({number: e})}}/> */}
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
                                <div className="col-12">
                                    {/* <textarea 
                                    className="input-form form-control contact-form" 
                                    placeholder="Message"  
                                    rows="5"
                                    id="message"
                                    onChange={this.handleChange}
                                    ></textarea> */}

<TextField size="small" id="message" label="Message" multiline type="search" onChange={this.handleChange}/>

                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-12">
                                    <div className="contact-side-button">
                                        <button type="submit" className="button button-primary">
                                            Envoyer
                                        </button>
                                    </div>
                                </div>
                                
                            </div>
                            
                        </form>
                    </div>
                    
                </div>
                <div className="col-md-6">
                    <div className="contact-top-side-informations">
                        <h3>Ou contactez-nous</h3>

                        <div className="phone">
                            <span><i className="fas fa-phone-alt"></i></span>
                            <span>+212 5 20 69 00 69</span>
                        </div>
                        <div className="email">
                            <span><i className="fas fa-at"></i></span>
                            <span>contact@agenz.ma</span>
                        </div>
                        <div className="address">
                            <span><i className="far fa-building"></i></span>
                            <span>
                                Technopark, Casablanca, Maroc
                            </span>
                        </div>

                        <div className="contact-socials-medias">
                        <div className="facebook"><a aria-label="Facebook" target = "_blank" rel="noreferrer" href="https://www.facebook.com/Agenztechnologies"><i className="fab fa-facebook-square"></i></a></div>
                            <div className="twitter"><a aria-label="Twitter" target = "_blank" rel="noreferrer" href="https://twitter.com/agenz_maroc?s=20"><i className="fab fa-twitter-square"></i></a></div>
                            {/* <div className="instagram"><a aria-label="Instagram" target = "_blank" rel="noreferrer" href="https://instagram.com/agenztechnologies?igshid=phojs1c327cd"><i class="fab fa-instagram-square"></i></a></div> */}
                            <div className="linked"><a aria-label="Linkedin" target = "_blank" rel="noreferrer" href="https://www.linkedin.com/company/agenztechnologies/"><i className="fab fa-linkedin"></i></a></div>
                            <div className="whatsapp"><a aria-label="Whatsapp" target = "_blank" rel="noreferrer" href="whatsapp://send?text=%20https%3A%2F%2Fwww.agenz.ma"><i className="fab fa-whatsapp-square"></i></a></div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        </ThemeProvider>
    );
    }
}

const mapStateToProps = (state) => {
    const uid = state.auth.uid;
    return {
      uid: uid
    };
};

export default connect(mapStateToProps)(ContactSide);