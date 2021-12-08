import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MuiPhoneNumber from "material-ui-phone-number";
import { ThemeProvider } from '@material-ui/core/styles';
import {theme} from '../../assets/theme'
import { CSSTransition } from 'react-transition-group';
import "./agenceContact.scss"
import Axios from 'axios'
import { connect } from "react-redux";

class AgenceContact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            email: null,
            phone: null,
            nameError: null,
            emailError: null,
            phoneError: null,
            selectedId: null,
            polygonesShow: true,
            transactionShow: true,
            placesShow: true,
            zoom : 9,
            message :"Bonjour, j'ai un projet de vente et je souhaite prendre rendez-vous pour faire estimer mon bien. Merci.",
            typeMessage : "Contact Page Agence",
            agenceContactedId : 0
        }
    }

    closeModal = () => {
        this.setState({
            ...this.state,
            moreInfo: false,
            selectedId: null,
            selectedTransaction: null,
            agenceTransaction: null
        })
    }
    isEmail(email) {
        console.log(email)
        let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    registerContact() {
        
        // validate fields are filled
        var error = [false, false, false];
        if (this.state.name === null || this.state.name === "" ) {
            error[0] = true;
        }
        if (this.state.email === null || !this.isEmail(this.state.email) || this.state.email==="") {
            error[1] = true;
        }
        if (this.state.phone === null || this.state.phone === "") {
            error[2] = true;
        }
        if (error.includes(true)) {
            this.setState({ 
                ...this.state,
                nameError: error[0] === true ? 'Nom obligatoire' : null,
                emailError: this.state.email === null ? 'Email obligatoire' : this.isEmail(this.state.email) === false ? 'Format invalide' : null,
                phoneError: error[2] === true ? 'Téléphone obligatoire' : null
            });
            return;
        } else {
            this.setState({...this.state, nameError: null, emailError: null, phoneError: null});
        }

        // // build object
        // let user_id = ""
        // if (this.props.authenticated && this.props.user.email){
        //     user_id =this.props.user.email

        // }
        const data = {
            name: this.state.name,
            phone: this.state.phone,
            email: this.state.email,
            message: `${this.state.message}`,
            date: new Date().toISOString(),
            job: null,
            user_id: this.props.user.uid,
            type : "Vitrine",
            transaction : null,
            contributeur : this.props.contributeur,
            contributeurId : this.state.agenceContactedId,
            display : true

        }
        
        // write to firebase
        Axios.post('https://us-central1-agenz-website-prod.cloudfunctions.net/api/addContact',{ data: data }).then(result => {
            this.props.dispatch({type: 'DETAILS_SEND_SUCCESS'});
        }).catch((e) => {
        // //console.log(e)
            this.props.dispatch({type: 'DETAILS_SEND_FAILURE'});
        });
    }


    componentDidMount() {
        this.setState({agenceContactedId : this.props.id})

    }
    render() {
       
        return (<>
                        <Grid container spacing={1}> 
                    <Grid item md={12} s={12}>
                    <p className="agence-contact-overtitle">contactez</p>
            <p className="agence-contact-title">{this.props.nameEntreprise}</p>
            <p className="disclaimer--contact">Gratuit et sans engagement</p>
 <Grid container spacing={1}>
 <ThemeProvider theme={theme}>
                         

                             <Grid item md={12} xs={12}>
                             <div className="message--field">
                         <TextField variant="outlined" size="small" id="name" label="Nom et Prénom" type="search" 
                                                                 value={this.state.name}
                                                                 onChange={(e) => {this.setState({...this.state, name: e.target.value})}}
                                                                 />
                             {/* <input 
                             className="input-form form-control full-width-forms input-form-details-bien"
                             type="text"
                             id="name"
                             placeholder="Nom *"
                             value={this.state.name}
                             onChange={(e) => {this.setState({...this.state, name: e.target.value})}}
                             /> */}
                             <CSSTransition in={this.state.nameError !== null} timeout={300} classNames="errorPriceMap">
                                 <span class="errorPriceMap">{this.state.nameError}</span>
                             </CSSTransition>
                         </div>
                         <div className="message--field">
                         <TextField variant="outlined" size="small" id="name" label="Email" type="mail" 
                                                                 value={this.state.email}
                                                                 onChange={(e) => {this.setState({...this.state, email: e.target.value.trim()})}}
                                                                 />
                             {/* <input 
                             className="input-form form-control full-width-forms input-form-details-bien"
                             type="email"
                             id="email"
                             placeholder="Email *"
                             value={this.state.email}
                             onChange={(e) => {this.setState({...this.state, email: e.target.value})}}
                             /> */}
                             <CSSTransition in={this.state.emailError} timeout={300} classNames="errorPriceMap">
                                     <span class="errorPriceMap">{this.state.emailError}</span>
                             </CSSTransition>
                         </div>
                         <div className="message--field">
                         <MuiPhoneNumber
         name="phoneNumber"
         label="Numéro de téléphone"
         id="telephone"
         data-cy="user-phone"
         defaultCountry={"ma"}
         value={this.state.phone}
         onChange={(e) => {this.setState({...this.state, phone: e})}}
         variant="outlined"
        />
                             {/* <input 
                             className="input-form form-control full-width-forms input-form-details-bien"
                             type="tel"
                             id="telephone"
                             placeholder="Numéro de téléphone *"
                             value={this.state.telephone}
                             onChange={(e) => {this.setState({...this.state, phone: e.target.value})}}
                             /> */}
                             <CSSTransition in={this.state.phoneError} timeout={300} classNames="errorPriceMap">
                                     <span class="errorPriceMap">{this.state.phoneError}</span>
                             </CSSTransition>
                         </div>
                         </Grid>
                         <Grid item md={12} xs={12}>
                             <div className="message--field">
                         <TextField variant="outlined" multiline size="small" id="message" label="Message" type="search"  value={this.state.message}
           onChange={(e) => {this.setState({...this.state, message: e.target.value})}}

                             />
                             </div>
                         </Grid>
                         <div className="btn-message-container">
                     <button className="button button-primary btn--message"  onClick={() => {
                         this.registerContact();
                     }}>
                         
                         Envoyer
                     </button>
                     </div>
                 </ThemeProvider>
</Grid>
</Grid>

</Grid>
        </>)
                    }
                }

const mapStateToProps = (state) => {
    return {
        user : state.auth,
        authenticated : state.auth.authenticated
    };
};
export default connect(mapStateToProps)(AgenceContact);