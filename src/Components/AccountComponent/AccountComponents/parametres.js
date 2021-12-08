import React, { Component } from 'react';
import '../AccountComponent.scss';
import { connect } from "react-redux";
import InitialImage from '../../../assets/img/profil-pic.png';
import { toast } from "react-toastify";
import { updatePassword } from "../../../Actions/AuthActions";
import 'react-phone-number-input/style.css'
import {ThemeProvider} from '@material-ui/core/styles';
import {theme} from '../../../assets/theme' 

import MuiPhoneNumber from "material-ui-phone-number";
import TextField from '@material-ui/core/TextField';
import SelectBox from './../../../Elements/select-box';
import Axios from 'axios'
import utm from 'url-utm-params'

class Parametres extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categorie: 'particulier',
            activite: "-",
            firstName: "",
            lastName: "",
            phone: "",
            email: "",
            country: "",
            city: "",
            address: "",
            postalcode: "",
            image: "",
            progress: 0,
            curentPassword: "",
            newPassword: ""
            
        };
        // this.onImageChange = this.onImageChange.bind(this);
    }


    validateDetails() {
        var errorFound = false;
        if (this.state.categorie === 'professionel') {
            
            if (!this.state.activite || this.state.activite === '' || this.state.activite === '-') {
                errorFound = true;
            }
        } else {
            if(
                this.state.lastName === "" ||
                this.state.firstName === "" ||
                this.state.phone === "" ||
                this.state.email === "" ||
                // this.state.country === "" ||
                this.state.city === "" ||
                // this.state.postalcode === "" ||
                this.state.address === ""

            ){
                errorFound = true;
            }
        }

        return errorFound;
    }

    validatePass() {
        var errorFound = false;
        if(
            this.state.curentPassword === "" ||
            this.state.newPassword === ""

        ){
            errorFound = true;
        }

        return errorFound;
    }

 

    getUsser (){
        // const dbStore = firebase.firestore();
        // var userRef = dbStore.collection("users")
        // var query = userRef.doc(this.props.uid);

        // query
        // .get()
        // .then((querySnapshot) =>{
        Axios.get('https://us-central1-agenz-website-prod.cloudfunctions.net/api/getUser').then(result => {
            //console.log("user", result.data)
            // //console.log(querySnapshot.data())

            if(result.data.categorie){
                this.setState({
                    categorie: result.data.categorie
                })
            }

            if(result.data.activite){
                this.setState({
                    activite: result.data.activite
                })
            }

            if(result.data.firstName){
                this.setState({
                    firstName: result.data.firstName,
                })
            }

            if(result.data.lastName){
                this.setState({
                    lastName: result.data.lastName
                })
            }

            if(result.data.phone){
                this.setState({
                    phone: result.data.phone
                })
            }

            if(result.data.email){
                this.setState({
                    email: result.data.email
                })
            }

            if(result.data.country){
                this.setState({
                    country: result.data.country
                })
            }

            if(result.data.city){
                this.setState({
                    city: result.data.city
                })
            }

            if(result.data.postalcode){
                this.setState({
                    postalcode: result.data.postalcode
                })
            }

            if(result.data.address){
                this.setState({
                    address: result.data.address
                })
            }

            if(result.data.user_image){
                this.setState({
                    image: result.data.user_image
                })
            }else {
                
                this.setState({image: InitialImage})
            }
            
            
        })
        .catch((error) =>{
            // //console.log("Error getting documents: ", error);
        });
        
        
    }

    handleSubmit = (e) =>{
        e.preventDefault();

        const error = this.validateDetails();

        if (error) {
            toast.error("Veuillez remplir toutes les informations necessaires");
            return;
        }
        // const dbStore = firebase.firestore();
        // var userRef = dbStore.collection("users")
        // var query = userRef.doc(this.props.uid);

        var data = {}
        data.lastName = this.state.lastName;
        data.firstName = this.state.firstName;
        data.phone = this.state.phone;
        data.email = this.state.email;
        // data.country = this.state.country;
        data.city = this.state.city;
        // data.postalcode = this.state.postalcode;
        data.address = this.state.address;
        data.categorie = this.state.categorie;
        data.activite = this.state.activite;
        // query
        // .get()
        // .then((querySnapshot) =>{
        Axios.post('https://us-central1-agenz-website-prod.cloudfunctions.net/api/updateUser',{data : data}).then(result => {

 
            // query.update(data)
            toast.success("La mise à jour a bien été effectuée !");
            
            this.getUsser();
        })
        .catch((error) =>{
            // //console.log("Error getting documents: ", error);
        });

    }

    handleSubmitPassword = (e) =>{
        e.preventDefault();

        const error = this.validatePass();

        if (error) {
            toast.error("Veuillez indiquer votre mot de passe actuel ainsi que le nouveau mot de passe");
            return;
        }
        this.props.updatePassword(this.state);

    }
    uploadImage = () => {
    var element = document.getElementById('im');

    element.click();
    }

    componentDidMount () {

        this.getUsser()
    }
    render () {

        return (
            <div className="parametres menuHolders">
                        <ThemeProvider theme={theme}>                
                <div className="row d-flex justify-content-center">
                    <div className="col-md-12 col-sm-12">
                        <div className="account-form">
                            <div  className="text-center">
                                                                
                                <h6>Modifier votre profil</h6>

                                <form onSubmit={this.handleSubmit}>
                                <input type="hidden" name="utm_source" value={utm.utm(window.location.href).utm_source}></input>
   	<input type="hidden" name="utm_medium" value={utm.utm(window.location.href).utm_medium}></input>
   	<input type="hidden" name="utm_campaign" value={utm.utm(window.location.href).utm_campaign}></input>
   	<input type="hidden" name="utm_content" value={utm.utm(window.location.href).utm_content}></input>
	<input type="hidden" name="utm_term" value={utm.utm(window.location.href).uutm_term}></input>
                                    <div className="form-group row">
                                        <div className="col-md-12 col-xl-6 col-sm-12">
                                            {/* <input 
                                            className="form-control" 
                                            type="text"  
                                            placeholder="Nom"
                                            value={this.state.lastName}
                                            onChange={(e) => { 
                                                    this.setState({ lastName: e.target.value });
                                            }}
                                            /> */}
<TextField size="small" id="lastname" label="Nom" type="search"  value={this.state.lastName}                                   onChange={(e) => { 
                                                    this.setState({ lastName: e.target.value });
                                            }}/>
                                        </div>
                                        <div className="col-md-12 col-xl-6 col-sm-12">
                                            {/* <input 
                                            className="form-control" 
                                            type="text"  
                                            placeholder="Prénom"
                                            value={this.state.firstName}
                                            onChange={(e) => { 
                                                    this.setState({ firstName: e.target.value });
                                            }}
                                            /> */}

<TextField size="small" id="firstName" label="Prénom" type="search"       value={this.state.firstName}                                      onChange={(e) => { 
                                                    this.setState({ firstName: e.target.value });
                                            }} />

                                        </div>
                                    </div>
                                    
                                    <div className="form-group row">
                                        <div className="col-md-12 col-xl-6 col-sm-12">
                                        <MuiPhoneNumber
                    name="phoneNumber"
                    label='Numéro de téléphone'
                    id="telephone"
                    data-cy="user-phone"
                    defaultCountry={"ma"}
                    value={this.state.phone}
                    onChange={(e) => {this.setState({phone: e})}}/>                                            
                                            {/* <PhoneInput
                                            defaultCountry="MA"
                                            id="phone" 
                                            placeholder="Numéro de téléphone"
                                            value={this.state.phone}
                                            onChange={(e) => {this.setState({phone: e})}}/> */}
                                            
                                        </div>

                                        <div className="col-md-12 col-xl-6 col-sm-12">
                                            <input 
                                            readOnly
                                            className="form-control" 
                                            type="text"  
                                            placeholder="E-mail"
                                            id="firstName"
                                            value={this.state.email}
                                            onChange={(e) => { 
                                                    this.setState({ email: e.target.value });
                                            }}
                                            />
                                        </div>
                                    </div>


                                  <div className="form-group row">
                                        <div className="col-md-12 col-xl-6 col-sm-12">
                                            {/* <input 
                                            className="form-control" 
                                            type="text"  
                                            placeholder="Ville"
                                            value={this.state.city}
                                            onChange={(e) => { 
                                                    this.setState({ city: e.target.value });
                                            }}
                                            /> */}
<TextField size="small" id="lastname" label="Ville" type="search"   value={this.state.city}                                           onChange={(e) => { 
                                                    this.setState({ city: e.target.value });
                                            }}/>
                                        </div>

                                        <div className="col-md-12 col-xl-6 col-sm-12">
                                            {/* <input 
                                            className="form-control" 
                                            type="text"  
                                            placeholder="Adresse"
                                            id="firstName"
                                            value={this.state.address}
                                            onChange={(e) => { 
                                                    this.setState({ address: e.target.value });
                                            }}
                                            /> */}
<TextField size="small" id="lastname" label="Adresse" type="search"     value={this.state.address} onChange={(e) => { 
                                                    this.setState({ address: e.target.value });
                                            }}/>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        {/* <div className="col-md-4 col-sm-12">
                                            <input 
                                            className="form-control" 
                                            type="text"  
                                            placeholder="code postal"
                                            value={this.state.postalcode}
                                            onChange={(e) => { 
                                                    this.setState({ postalcode: e.target.value });
                                            }}
                                            />
                                        </div> */}

                                    </div>

                                    <div className="form-group row  alignStuffCenter">
                                        <div className="col-md-12 col-sm-12">
                                            <div className="choice">
                                                <div
                                                className={this.state.categorie === 'particulier' ? "choice-item owner active" : "choice-item owner"}
                                                onClick={() =>{this.setState({categorie: 'particulier'})}}>
                                                    Particulier
                                                </div>
                                                <div className={this.state.categorie === 'professionel' ? "choice-item particular active" : "choice-item particular"} onClick={() =>{this.setState({categorie : 'professionel'})}}>
                                                    Professionnel
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    

                                    { this.state.categorie === 'particulier' ? '' : (
                                    <div className="form-group row">
                                        <div className="col-12">
                                            {/* <select className="input-form form-control select-full-width"
                                                id="activite"
                                                defaultValue={this.props.estimateState.estimation.activite}
                                                value={this.state.activite}
                                                onChange={(e) => { 
                                                    this.setState({ activite: e.target.value });
                                                }}
                                                >
                                                <option value="">Votre activité :</option>
                                                <option value="Agent Immobilier">Agent Immobilier</option>
                                                <option value="Notaire">Notaire</option>
                                                <option value="Promoteur / Constructeur">Promoteur / Constructeur</option>
                                                <option value="Gestionnaire de patrimoine">Gestionnaire de patrimoine</option>
                                                <option value="Syndic">Syndic</option>
                                                <option value="Expert">Expert Immobilier</option>
                                                <option value="Autre">Autre</option>
                                            </select> */}
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
                                    onSelectChange={(item, id) => {
                                        this.setState({
                                            activite: item.value
                                        });
                                    }}
                                />
                                        </div>
                                    </div>)}

                                    
                                    <div style={{textAlign: "center", marginTop: "10px"}} className="first-submit-button">
                                        <button className="button button-primary primaryyCustom" type="submit">Enregistrer</button>
                                    </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>

                    <div className="col-md-12 col-xl-6">
                        <div className="account-form">
                            <div  className="text-center">
                                                                
                                <h6>Modifier votre mot de passe</h6>

                                <form onSubmit={this.handleSubmitPassword}>
                                <input type="hidden" name="utm_medium" value={utm.utm(window.location.href).utm_medium}></input>
   	<input type="hidden" name="utm_campaign" value={utm.utm(window.location.href).utm_campaign}></input>
   	<input type="hidden" name="utm_content" value={utm.utm(window.location.href).utm_content}></input>
	<input type="hidden" name="utm_term" value={utm.utm(window.location.href).utm_term}></input>
                                    <div className="form-group row">
                                        <div className="col-12">
                                            <input 
                                            className="form-control" 
                                            type="password"  
                                            placeholder="Mot de passe actuel"
                                            id="curentPassword"
                                            onChange={(e) => { 
                                                this.setState({ curentPassword: e.target.value });
                                            }}  
                                            />
                                        </div>

                                    </div>
                                    <div className="form-group row">
                                    <div className="col-12">
                                            <input 
                                            className="form-control" 
                                            type="password"  
                                            placeholder="Nouveau mot de passe"
                                            id="newPassword"
                                            onChange={(e) => { 
                                                this.setState({ newPassword: e.target.value });
                                        }}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group row first-submit-button last-line">
                                        <div className="col-12">
                                            <button type="submit" className="button button-primary">
                                                Enregistrer
                                            </button>
                                        </div>

                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
</ThemeProvider>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const uid = state.auth.uid;
    const email = state.auth.email;
    const estimation = state.userEstimation;
    const estimationState = state.estimationState;
    const user = state.auth.user

    // //console.log(state)
    return {
      user : user,
      uid: uid,
      email: email,
      estimation:estimation,
      estimateState: estimationState
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updatePassword: (creds) => dispatch(updatePassword(creds))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Parametres);