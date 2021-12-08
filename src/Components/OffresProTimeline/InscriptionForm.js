import React, { Component } from 'react'
import './InscriptionForm.scss';
import {theme} from '../../assets/theme'
import {ThemeProvider} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from "react-toastify";
import CircularProgress from '@material-ui/core/CircularProgress';




export class InscriptionForm extends Component {
    constructor (props){
        super(props);

        this.state = {
            agencyName : this.props.agencyName,
            firstName : "",
            lastName : "",
            email : "",
            phone : "",
            city : "",
            agencyNameError :  false,
            firstNameError :  false,
            lastNameError :  false,
            emailError :  false,
            phoneError :  false,
            cityError :  false,
            loadingInscription : false,

        };
    }
    validateFields(){
        this.setState({loadingInscription : true})
        let error = false
        if(this.state.agencyName ===""){
            this.setState({agencyNameError : true})
            error = true
        }
        if(this.state.firstName ===""){
            this.setState({firstNameError : true})
            error = true
        }
        if(this.state.lastName ===""){
            this.setState({lastNameError : true})
            error = true
        }
        if(this.state.email ===""){
            this.setState({emailError : true})
            error = true
        }
        if(this.state.phone ===""){
            this.setState({phoneError : true})
            error = true
        }
        if(this.state.city ===""){
            this.setState({cityError : true})
            error = true
        }
        if(!error){
            this.registerContactPro()
        }
        else{
            this.setState({loadingInscription : false})
        }

    }
    registerContactPro(){
        axios.post('https://us-central1-agenz-website-prod.cloudfunctions.net/api/demandePro', this.state).then(result => {
            toast.success("Votre demande à bien été prise en compte")
            this.setState({loadingInscription : false})

    })
    .catch(err => {
        toast.error("Un problème est survenu, veuillez réessayer plus tard")
        console.log(err)
        this.setState({loadingInscription : false})

    })
    }

    render() {
        return (
            <div className="inscription--form-container-dialog">
                <div className="inscription--form-inner-dialog">
                    <div className="inscription-title--container">
                        <div className="inscription-title--inner">
                            <h1 className="inscription-title">Inscrivez gratuitement votre agence dans l'annuaire Agenz</h1>
                        </div>
                    </div>
                    <div className="form--container">
                        <div className="form--inner">
                        <ThemeProvider theme={theme}>   
                        <div className="field--container">
                        <TextField  variant="outlined" id="standard-search" label="Nom de votre agence immobilière" type="search"
                                                        value={this.state.agencyName}
                                                        onChange={(e) => { 
                                                            this.setState({ agencyName: e.target.value, agencyNameError : e.target.value==="" });
                                                        }}
                                                   error={this.state.agencyNameError}
                                                   helperText={this.state.agencyNameError ? "Ce champs est obligatoire" : ""}

                                                   />
                                                   </div> 
                        <div className="field--container">
                        <TextField  variant="outlined" id="standard-search" label="Prénom" type="search"
                                                        value={this.state.firstName}
                                                        onChange={(e) => { 
                                                            this.setState({ firstName: e.target.value, firstNameError : e.target.value==="" });
                                                        }}
                                                   error={this.state.firstNameError}
                                                   FormHelperTextProps={{error : this.state.firstNameError}}
                                                   helperText={this.state.firstNameError ? "Ce champs est obligatoire" : ""}                                                   />
                                                   </div>

                                                   <div className="field--container">
                        <TextField  variant="outlined" id="standard-search" label="Nom" type="search"
                          value={this.state.lastName}
                          onChange={(e) => { 
                            this.setState({ lastName: e.target.value, lastNameError : e.target.value==="" });
                        }}
                     error={this.state.lastNameError}
                     helperText={this.state.lastNameError ? "Ce champs est obligatoire" : ""}                                                   
                     />
                        </div>
                        <div className="field--container">
                        <TextField  variant="outlined" id="standard-search" label="Adresse email" type="search"
                          value={this.state.email}
                          onChange={(e) => { 
                            this.setState({ email: e.target.value, emailError : e.target.value==="" });
                        }}
                     error={this.state.emailError}
                     helperText={this.state.emailError ? "Ce champs est obligatoire" : ""}                                                   
                        />
                        </div>
                        <div className="field--container">
                        <TextField  variant="outlined" id="standard-search" label="Téléphone" type="search"
                          value={this.state.phone}
                          onChange={(e) => { 
                            this.setState({ phone: e.target.value, phoneError : e.target.value==="" });                     }}
                     error={this.state.phoneError}
                     helperText={this.state.phoneError ? "Ce champs est obligatoire" : ""}                                                   
                     />
                     </div>
                     <div className="field--container">
                        <TextField  variant="outlined" id="standard-search" label="Ville" type="search"
                          value={this.state.city}
                          onChange={(e) => { 
                             this.setState({ city: e.target.value, cityError : e.target.value==="" });
                     }}
                     error={this.state.cityError}
                     helperText={this.state.cityError ? "Ce champs est obligatoire" : ""}                                                   
                     />
                    </div>
                    


                    </ThemeProvider>

                        </div>
                    </div>
                    <div className="button-form--container">
                        <div className="button-form-inner">
                        <button class="button button-primary btn--form-inscription" onClick = {() => {
                            this.validateFields()
                        }}>
                            {this.state.loadingInscription ? (
                                <CircularProgress size={20} />
                            ):(
                                "Valider"
                            )}
                            
                            </button> 

                        </div>
                    </div>
                    <div className="cgu-form--container">
                        <div className="cgu-form--inner">
                            <p className="cgu-form">
                            En cliquant sur "Valider", vous acceptez nos <Link to="/conditions-d-utilisation">conditions générales d’utilisation</Link> et notre <Link to="/conditions-d-utilisation">politique de confidentialité.</Link>Conformément à la loi 09-08, vous disposez d'un droit d'accès, de rectification, et d'opposition au traitement de vos données persionnelles. Vous pouvez exercer ce droit en nous adressant un courrier 46, Boulevard Zerktouni, Casablanca. Ce traitement à été autorisé par la CNDP au titre de l'autorisation N° D-460/2021
                            </p>
                        </div>
                    </div>
                </div>
                

            </div>
        )
    }
}

export default InscriptionForm
