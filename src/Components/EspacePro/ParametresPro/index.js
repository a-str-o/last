import React, { Component } from 'react';
import { connect } from "react-redux";
import InitialImage from '../../../assets/img/profil-pic.png';
import firebase from '../../../Config/FirebaseConfig';
import './style.scss';
import { updatePassword } from "../../../Actions/AuthActions";
import { toast } from "react-toastify";
import {ThemeProvider} from '@material-ui/core/styles';
import MuiPhoneNumber from "material-ui-phone-number";
import TextField from '@material-ui/core/TextField';
import {theme} from '../../../assets/theme'
import Axios from 'axios'
import utm from 'url-utm-params'

class ParametresPro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categorie: 'particulier',
            activite: "-",
            firstName: "",
            lastName: "",
            phone: "",
            fonction: "",
            email: "",
            country: "",
            city: "",
            address: "",
            postalcode: "",
            image: "",
            progress: 0,
            curentPassword: "",
            newPassword: "",
            
            descriptionActivite: "",
            emailEntreprise: "",
            countryEntreprise: "",
            cityEntreprise: "",
            addressEntreprise: "",
            postalcodeEntreprise: "",
            phoneEntreprise: "",
            nameEntreprise: "",
            
        };
        this.onImageChange = this.onImageChange.bind(this);
        this.handleSubmitEntreprise = this.handleSubmitEntreprise.bind(this)
    }


    validateDetails() {
        var errorFound = false;
        if(
            this.state.lastName === "" ||
            this.state.firstName === "" ||
            this.state.phone === "" ||
            this.state.fonction === "" ||
            this.state.email === "" ||
            this.state.city === "" ||
            this.state.address === ""

        ){
            errorFound = true;
        }

        return errorFound;
    }


    validateDetails2() {
        var errorFound = false;
        if(
            this.state.nameEntreprise === "" ||
            this.state.emailEntreprise === "" ||
            this.state.phoneEntreprise === "" ||
            this.state.descriptionActivite === "" ||
            this.state.cityEntreprise === "" ||
            this.state.addressEntreprise === ""

        ){
            errorFound = true;
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

    onImageChange = event => {
        const db = firebase.storage();
        // const dbStore = firebase.firestore();

       

        if (event.target.files && event.target.files[0]) {
          let img = event.target.files[0];
          var fileExtension = '.' + img.name.split('.').pop();
          var newName = this.props.uid + fileExtension;
          const uploadTask = db.ref(`images/${newName}`).put(img);

          uploadTask.on(
            "state_changed",
            snapshot => {
              const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              );

              this.setState({
                  progress: progress
              })
            },
            error => {
              //////console.log(error);
            },
            () => {
                db
                .ref("images")
                .child(newName)
                .getDownloadURL()
                .then(url => {
                    const dbStore = firebase.firestore();
                    const agenceRef = dbStore.collection("agences");
                    const query = agenceRef.where("responsable", "==", this.props.uid)

                    var data = {}
                    query
                    .get()
                    .then((querySnapshot) =>{

                        if(querySnapshot.docs.length === 0) {
                            agenceRef.add({
                                responsable: this.props.uid,
                                date: new Date().toISOString(),
                                user_image : url,
                            }).catch(error => {
                                //////console.log(error)
                            })
                        }else {
                            data.user_image = url;
                            data.responsable = this.props.uid;
                            querySnapshot.forEach((doc) => {
                                doc.ref.update({user_image: url})
                            });
                            
                        }
                        
                        
                        this.getCompany()

                        this.setState({
                            progress: 0
                        })
                    })
                    .catch((error) =>{
                        //////console.log("Error getting documents: ", error);
                    });
                    
            
                });
            }
          );
        }
    }


    getUsser (){
        // const dbStore = firebase.firestore();
        // var userRef = dbStore.collection("users")
        // var query = userRef.doc(this.props.uid);

        // query
        // .get()
        // .then((querySnapshot) =>{
        Axios.get('https://us-central1-agenz-website-prod.cloudfunctions.net/api/getUser').then(result => {
            //////console.log("user", result.data)
            // //////console.log(querySnapshot.data())
            if(result.data.phone){
                this.setState({
                    fonction: result.data.fonction
                })
            }
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
            // //////console.log("Error getting documents: ", error);
        });
        
        
    }


    getCompany (){
        // const dbStore = firebase.firestore();
        // const agenceRef = dbStore.collection("agences");
        // const query = agenceRef.where("responsable", "==", this.props.uid)

        // query
        // .get()
        // .then((querySnapshot) =>{
            Axios.post('https://us-central1-agenz-website-prod.cloudfunctions.net/api/getAgence',{user_id : this.props.uid}).then(result => {

               //////console.log(result.data)
                if(result.data.user_image){
                    this.setState({
                        image: result.data.user_image
                    })
                }else {
                    
                    this.setState({image: InitialImage})
                }

                if(result.data.addressEntreprise){
                    this.setState({
                        addressEntreprise: result.data.addressEntreprise
                    })
                }

                if(result.data.emailEntreprise){
                    this.setState({
                        emailEntreprise: result.data.emailEntreprise
                    })
                }

                if(result.data.phoneEntreprise){
                    this.setState({
                        phoneEntreprise: result.data.phoneEntreprise
                    })
                }

                if(result.data.countryEntreprise){
                    this.setState({
                        countryEntreprise: result.data.countryEntreprise
                    })
                }

                if(result.data.cityEntreprise){
                    this.setState({
                        cityEntreprise: result.data.cityEntreprise
                    })
                }

                if(result.data.descriptionActivite){
                    this.setState({
                        descriptionActivite: result.data.descriptionActivite
                    })
                }
                

                if(result.data.nameEntreprise){
                    this.setState({
                        nameEntreprise: result.data.nameEntreprise
                    })
                }

                if(result.data.postalcodeEntreprise){
                    this.setState({
                        postalcodeEntreprise: result.data.postalcodeEntreprise
                    })
                }
        })
        .catch((error) =>{
            //////console.log("Error getting documents: ", error);
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
        data.fonction = this.state.fonction;
        data.email = this.state.email;
        data.country = this.state.country;
        data.city = this.state.city;
        data.postalcode = this.state.postalcode;
        data.address = this.state.address;
        data.categorie="professionel";
        data.activite = "Agent Immobilier";
        // query
        // .get()
        // .then((querySnapshot) =>{
        Axios.post('https://us-central1-agenz-website-prod.cloudfunctions.net/api/updateUser',{data : data}).then(result => {

 
            // query.update(data)
            toast.success("La mise à jour a bien été effectuée !");
            
            this.getUsser();
        })
        .catch((error) =>{
            // //////console.log("Error getting documents: ", error);
        });

    }

    handleSubmitEntreprise = (e) =>{
        e.preventDefault();
        
        const error = this.validateDetails2();

        if (error) {
            toast.error("Veuillez remplir toutes les informations necessaires");
            return;
        }
        // const dbStore = firebase.firestore();
        // const agenceRef = dbStore.collection("agences");
        // const query = agenceRef.where("responsable", "==", this.props.uid)

        var data = {
        responsable : this.props.uid,
        date:new Date().toISOString(),
        emailEntreprise : this.state.emailEntreprise,
        phoneEntreprise : this.state.phoneEntreprise,
        countryEntreprise : this.state.countryEntreprise,
        cityEntreprise : this.state.cityEntreprise,
        postalcodeEntreprise : this.state.postalcodeEntreprise,
        addressEntreprise : this.state.addressEntreprise,
        nameEntreprise : this.state.nameEntreprise,
        descriptionActivite : this.state.descriptionActivite
        }
        // query
        // .get()
        // .then((querySnapshot) =>{
            // if(querySnapshot.docs.length === 0) {
            //     agenceRef.add({
            //         responsable: this.props.uid,
            //         date: new Date().toISOString(),
            //         emailEntreprise : this.state.emailEntreprise,
            //         phoneEntreprise : this.state.phoneEntreprise,
            //         countryEntreprise : this.state.countryEntreprise,
            //         cityEntreprise : this.state.cityEntreprise,
            //         postalcodeEntreprise : this.state.postalcodeEntreprise,
            //         addressEntreprise : this.state.addressEntreprise,
            //         nameEntreprise : this.state.nameEntreprise,
            //         descriptionActivite : this.state.descriptionActivite,
            //     }).then(res => {
            //         toast.success("La mise à jour a bien été effectuée !");
            //         this.getCompany();
            //     }).catch(error => {
            //         //////console.log(error)
            //     })
            // }else {
                
            //     data.emailEntreprise = this.state.emailEntreprise;
            //     data.phoneEntreprise = this.state.phoneEntreprise;
            //     data.countryEntreprise = this.state.countryEntreprise;
            //     data.cityEntreprise = this.state.cityEntreprise;
            //     data.postalcodeEntreprise = this.state.postalcodeEntreprise;
            //     data.addressEntreprise = this.state.addressEntreprise;
            //     data.nameEntreprise = this.state.nameEntreprise;
            //     data.descriptionActivite = this.state.descriptionActivite;
            //     data.responsable = this.props.uid;
            //     querySnapshot.forEach((doc) => {
            //         doc.ref.update(data)

            //     });
            Axios.post('https://us-central1-agenz-website-prod.cloudfunctions.net/api/updateEntreprise',{data : data}).then(result => {
                toast.success("La mise à jour a bien été effectuée !");
                this.getCompany();
            })
        .catch((error) =>{
            //////console.log("Error getting documents: ", error);
        });

    }


    // insertAgence () {
    //     const dbStore = firebase.firestore();
    //     const agenceRef = dbStore.collection("agences");
    //     const query = agenceRef.where("responsable", "==", this.props.uid)

    //     query
    //     .get()
    //     .then((querySnapshot) => {
    //         if(querySnapshot.docs.length === 0) {
    //             agenceRef.add({
    //                 responsable: this.props.uid,
    //                 date: new Date().toISOString()
    //             }).then(res => {
    //                 //////console.log(res || 'ok')
    //             }).catch(error => {
    //                 //////console.log(error)
    //             })
    //         }else {
    //             //////console.log('Nope !')
    //         }
    //         //////console.log()
            
    //     })
    // }

    handleSubmitPassword = (e) =>{
        e.preventDefault();

        const error = this.validatePass();

        if (error) {
            this.props.dispatch({type: 'FILL_FORM_ERROR'});
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
        this.getCompany()
    }
    render () {

        return (
            <div className="parametres menuHolders">
            <ThemeProvider theme={theme}>
                <div className="row d-flex justify-content-center">
                    <div className="col-md-8">
                        <div className="account-form">
                            <div  className="text-center">
                                                                
                                <h6>Vos informations</h6>

                                <form onSubmit={this.handleSubmit}>
                                <input type="hidden" name="utm_source" value={utm.utm(window.location.href).utm_source}></input>
   	<input type="hidden" name="utm_medium" value={utm.utm(window.location.href).utm_medium}></input>
   	<input type="hidden" name="utm_campaign" value={utm.utm(window.location.href).utm_campaign}></input>
   	<input type="hidden" name="utm_content" value={utm.utm(window.location.href).utm_content}></input>
	<input type="hidden" name="utm_term" value={utm.utm(window.location.href).uutm_term}></input>
                                    <div className="form-group row">
                                        <div className="col-md-6 col-sm-12">
                                            {/* <input 
                                            className="form-control" 
                                            type="text"  
                                            placeholder="Nom"
                                            value={this.state.lastName}
                                            onChange={(e) => { 
                                                    this.setState({ lastName: e.target.value });
                                            }}
                                            /> */}
                                                          <TextField size="small" id="lasName" label="Nom" type="search"  value={this.state.lastName}
                                            onChange={(e) => { 
                                                this.setState({ lastName: e.target.value });
                                        }}
                                                />       
                                        </div>
                                        <div className="col-md-6 col-sm-12">
                                            {/* <input 
                                            className="form-control" 
                                            type="text"  
                                            placeholder="Prénom"
                                            value={this.state.firstName}
                                            onChange={(e) => { 
                                                    this.setState({ firstName: e.target.value });
                                            }}
                                            /> */}
                                                          <TextField size="small" id="firstName" label="Prénom" type="search"  value={this.state.firstName}
                           onChange={(e) => { 
                            this.setState({ firstName: e.target.value });
                    }}
                                                />                                             
                                        </div>
                                    </div>
                                    
                                    <div className="form-group row">
                                        <div className="col-md-6 col-sm-12">

                                            {/* <PhoneInput
                                            defaultCountry="MA"
                                            id="phone" 
                                            placeholder="Numéro de téléphone"
                                            value={this.state.phone}
                                            onChange={(e) => {this.setState({phone: e})}}/> */}

<MuiPhoneNumber
                    name="phoneNumber"
                    label='Numéro de téléphone'
                    id="phoneEntreprise"
                    data-cy="user-phone"
                    defaultCountry={"ma"}
                    value={this.state.phone}
                    onChange={(e) => {this.setState({phone: e})}} />
                                        </div>

                                        <div className="col-md-6 col-sm-12">
                                            {/* <input 
                                            className="form-control" 
                                            type="text"  
                                            placeholder="Votre fonction au sein de l'entreprise"
                                            id="fonction"
                                            value={this.state.fonction}
                                            onChange={(e) => { 
                                                    this.setState({ fonction: e.target.value });
                                            }}
                                            /> */}
                                                          <TextField size="small" id="fonction" label="Votre fonction au sein de l'entreprise" type="search"  value={this.state.fonction}
                                onChange={(e) => { 
                                    this.setState({ fonction: e.target.value });
                            }}
                                                /> 
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                       

                                        <div className="col-md-8 col-sm-12 ">
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
                                                          <TextField size="small" id="adresse" label="Adresse" type="search"  value={this.state.address}
                                       onChange={(e) => { 
                                        this.setState({ address: e.target.value });
                                }}
                                                /> 
                                        </div>



                                    <div className="col-md-4 col-sm-12">
                                            {/* <input 
                                            className="form-control" 
                                            type="text"  
                                            placeholder="Ville"
                                            value={this.state.city}
                                            onChange={(e) => { 
                                                    this.setState({ city: e.target.value });
                                            }}
                                            /> */}
                              <TextField size="small" id="city" label="Ville" type="search"  value={this.state.city}
                                                  onChange={(e) => { 
                                                    this.setState({ city: e.target.value });
                                            }}                                   
                                                /> 
                                    
                                        </div>
                                        
                                    </div>

                                    

                                    
                                    <div style={{textAlign: "center"}} className="first-submit-button">
                                        <button className="button button-primary primaryyCustom" type="submit">Enregistrer</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>



                    <div className="col-md-8 col-sm-12">
        
                        <div className="account-form">
                            <div  className="text-center">
                                                                
                                <h6>Modifier votre mot de passe</h6>

                                <form onSubmit={this.handleSubmitPassword}>
                                <input type="hidden" name="utm_source" value={utm.utm(window.location.href).utm_source}></input>
   	<input type="hidden" name="utm_medium" value={utm.utm(window.location.href).utm_medium}></input>
   	<input type="hidden" name="utm_campaign" value={utm.utm(window.location.href).utm_campaign}></input>
   	<input type="hidden" name="utm_content" value={utm.utm(window.location.href).utm_content}></input>
	<input type="hidden" name="utm_term" value={utm.utm(window.location.href).uutm_term}></input>
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

    //////console.log(state)
    return {
      uid: uid,
      email: email,
      estimation:estimation,
      estimateState: estimationState
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updatePassword: (creds) => dispatch(updatePassword(creds)),
        dispatch
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ParametresPro);