import React, { Component } from 'react';
import { connect } from "react-redux";
import InitialImage from '../../../assets/img/profil-pic.png';
import firebase from '../../../Config/FirebaseConfig';
import './style.scss';
import { updatePassword } from "../../../Actions/AuthActions";
import { toast } from "react-toastify";
import { ThemeProvider } from '@material-ui/core/styles';
import MuiPhoneNumber from "material-ui-phone-number";
import TextField from '@material-ui/core/TextField';
import {theme} from '../../../assets/theme'
import Axios from 'axios'
import BeatLoader from "react-spinners/BeatLoader";

import { css } from "@emotion/core";
import utm from 'url-utm-params'

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class FillVitrine extends Component {
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
            cover_image : "",
            progressCover: 0,
            progressLogo : 0,
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
            horaires : "",
            loading : true,
            typeEntreprise : ""
            
        };
        this.onImageChange = this.onImageChange.bind(this);
        this.onImageChangeCover = this.onImageChangeCover.bind(this);
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
            this.state.addressEntreprise === ""||
            this.state.horaires === ""

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

       

        if (event.target.files && event.target.files[0]) {
          let img = event.target.files[0];
          var fileExtension = '.' + img.name.split('.').pop();
          var newName = "profil_" + this.props.uid +`${Date.now()}` + fileExtension;
          const uploadTask = db.ref(`images/${newName}`).put(img);

          uploadTask.on(
            "state_changed",
            snapshot => {
              const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              );

              this.setState({
                  progressLogo: progress
              })
            },
            error => {
                toast.error("Impossible d'enregistrer la photo, veuillez réessayer plus tard")
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
                                //console.log(error)
                            })
                        }else {
                            data.user_image = url;
                            data.responsable = this.props.uid;
                            querySnapshot.forEach((doc) => {
                            doc.ref.update({user_image: url})
                            .then(()=> {
                                this.getCompany()
                        }
                        )
                        .catch((error) =>{
                            toast.error("Impossible de mettre à jour la photo de profil, veuillez réessayer plus tard")
                        });
 
                            })
                            
                            
                            
                        }
                        
                        
                        // this.getCompany()

                        this.setState({
                            progressLogo: 0
                        })
                        toast.success("Photo de profil enregistrée avec succès")
                    })
                    .catch((error) =>{
                        toast.error("Impossible d'enregistrer la photo de profil, veuillez réessayer plus tard")
                    });
                    
            
                });
            }
          );
        }
 
    }

    onImageChangeCover = event => {
        const db = firebase.storage();

       

        if (event.target.files && event.target.files[0]) {
          let img = event.target.files[0];
          var fileExtension = '.' + img.name.split('.').pop();
          var newName = "cover_" + this.props.uid +`${Date.now()}` + fileExtension;
          const uploadTask = db.ref(`images/${newName}`).put(img);

          uploadTask.on(
            "state_changed",
            snapshot => {
              const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              );

              this.setState({
                  progressCover: progress
              })
            },
            error => {
                toast.error("Impossible d'enregistrer la photo de couverture, veuillez réessayer plus tard")
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
                                cover_image : url,
                            }).catch(error => {
                                //console.log(error)
                            })
                        }else {
                            data.cover_image = url;
                            data.responsable = this.props.uid;
                            querySnapshot.forEach((doc) => {
                                doc.ref.update({cover_image: url})
                                .then(()=>{
                                    this.getCompany()
    
                                }).catch(err => {
                                    console.log(err)
                                    toast.error("Impossible de mettre à jour la photo de couverture, veuillez réessayer plus tard")
                                })
                            })
                           
                           
                            
                        }
                        
                        

                        this.setState({
                            progressCover: 0
                        })
                        toast.success("Photo de couverture enregistrée avec succès")
                    })
                    .catch((error) =>{
                        console.og(error)
                        toast.error("Impossible d'enregistrer la photo de couverture, veuillez réessayer plus tard")
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
            //console.log("user", result.data)
            // //console.log(querySnapshot.data())
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
            this.setState({loading : false})
            
            
        })
        .catch((error) =>{
            this.setState({loading : false})
            toast.error("Impossible de récupérer les informations de l'agence")
            // //console.log("Error getting documents: ", error);
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

            //    console.log(result.data)
                if(result.data.user_image){
                    this.setState({
                        image: result.data.user_image
                    })
                }else {
                    
                    this.setState({image: "https://firebasestorage.googleapis.com/v0/b/agenz-website-prod.appspot.com/o/images%2F164.png?alt=media&token=285266b5-6f35-42ae-928e-d439bd3bb976"})
                }
                if(result.data.cover_image){
                    this.setState({
                        cover_image: result.data.cover_image
                    })
                }else {
                    
                    this.setState({cover_image: "https://firebasestorage.googleapis.com/v0/b/agenz-website-prod.appspot.com/o/images%2F164.png?alt=media&token=285266b5-6f35-42ae-928e-d439bd3bb976"})
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
                if(result.data.horaires){
                    this.setState({
                        horaires: result.data.horaires
                    })
                }

                if(result.data.typeEntreprise){
                    this.setState({
                        typeEntreprise: result.data.typeEntreprise
                    })
                }
                this.setState({loading : false})

        })
        .catch((error) =>{
            this.setState({loading : false})

            //console.log("Error getting documents: ", error);
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
        descriptionActivite : this.state.descriptionActivite,
        horaires : this.state.horaires
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
            //         //console.log(error)
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
            //console.log("Error getting documents: ", error);
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
    //                 //console.log(res || 'ok')
    //             }).catch(error => {
    //                 //console.log(error)
    //             })
    //         }else {
    //             //console.log('Nope !')
    //         }
    //         //console.log()
            
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
    uploadImageCover = () => {
        var element = document.getElementById('imCover');
    
        element.click();
        }

    componentDidMount () {

        // this.getUsser()
        this.getCompany()
    }
    render () {

        return (
            <>
            {this.state.loading ? (
                <div className="vitrine--loader">
                    <BeatLoader color='#2ea7f9' loading={true} css={override} size={15} />
                </div>
                ) : (
            <div className="parametres">
            <ThemeProvider theme={theme}>
                <div className="row d-flex justify-content-center">

                    <div className="col-md-12">
                        <div className="account-form">
                            <div className="entete--container">
            <div className="header--container">
                <p className="header-text">Présentation de vos services</p>
            </div>
            <div className="component-text">
            <p className="corpus-text">Votre vitrine présente votre savoir-faire auprès de l'ensemble des visiteurs du site Agenz, acheteurs et vendeurs. Complétez un maximum d'informations mettez vos biens vendus en avant pour mettre en valeur votre expertise.</p>
            </div>
            </div>
                                <form onSubmit={this.handleSubmitEntreprise}>
                                <input type="hidden" name="utm_source" value={utm.utm(window.location.href).utm_source}></input>
   	<input type="hidden" name="utm_medium" value={utm.utm(window.location.href).utm_medium}></input>
   	<input type="hidden" name="utm_campaign" value={utm.utm(window.location.href).utm_campaign}></input>
   	<input type="hidden" name="utm_content" value={utm.utm(window.location.href).utm_content}></input>
	<input type="hidden" name="utm_term" value={utm.utm(window.location.href).uutm_term}></input>

                                <div className="form-group row">
                                        <div className="col-12">
                                            {/* <input 
                                            className="form-control" 
                                            type="text"  
                                            placeholder="Nom de l'entreprise"
                                            value={this.state.nameEntreprise}
                                            onChange={(e) => { 
                                                    this.setState({ nameEntreprise: e.target.value });
                                            }} 
                                            />
                                            */}
                                                                                        <TextField variant="outlined" size="small" id="nameEntreprise" label="Nom de l'entreprise" type="search"  value={this.state.nameEntreprise}
                                                onChange={(e) => { 
                                                    this.setState({ nameEntreprise: e.target.value });
                                            }}  
                                                />  
                                        </div>
                                    </div>
                                <div className="form-group row">
                                        <div className="col-md-6 col-sm-12">
                                            {/* <input 
                                            className="form-control" 
                                            type="email"  
                                            placeholder="E-mail de l'entreprise"
                                            value={this.state.emailEntreprise}
                                            onChange={(e) => { 
                                                    this.setState({ emailEntreprise: e.target.value });
                                            }}
                                            /> */}
                                            <TextField variant="outlined" size="small" id="email" label="Adesse e-mail" type="search"  value={this.state.emailEntreprise}
                                            onChange={(e) => { 
                                                this.setState({ emailEntreprise: e.target.value });}}   
                                                />                                  
                                        </div>
                                        <div className="col-md-6 col-sm-12">

                                            {/* <PhoneInput
                                            defaultCountry="MA"
                                            id="phoneEntreprise" 
                                            placeholder="Numéro de téléphone de l'entreprise"
                                            value={this.state.phoneEntreprise}
                                            onChange={(e) => {this.setState({phoneEntreprise: e})}}/>
                                         */}
                                        <MuiPhoneNumber
                    name="phoneNumber"
                    label='Numéro de téléphone'
                    id="phoneEntreprise"
                    data-cy="user-phone"
                    defaultCountry={"ma"}
                    value={this.state.phoneEntreprise}
                    onChange={(e) => {this.setState({phoneEntreprise: e})}} />
                                        </div>
                                    </div>
                                    
                                    

                                    <div className="form-group row">
                                        <div className="col">
                                            {/* <textarea 
                                            class="form-control" 
                                            placeholder ="Description de l'activité"
                                            id="descriptionActivite"
                                            value={this.state.descriptionActivite}
                                            onChange={(e) => { 
                                                    this.setState({ descriptionActivite: e.target.value });
                                            }}
                                            ></textarea> */}


<TextField  variant="outlined" multiline size="small" id="descriptionActivite" label="Description de l'activité" type="search"  value={this.state.descriptionActivite}
                                            onChange={(e) => { 
                                                this.setState({ descriptionActivite: e.target.value });
                                        }}
                                        />
                                          
                                        </div>
                                     </div>

                                     <div className="form-group row">
                                        

                                        <div className="col-md-8 col-sm-12">
                                            {/* <input 
                                            className="form-control" 
                                            type="text"  
                                            placeholder="Adresse"
                                            id="firstName"
                                            value={this.state.addressEntreprise}
                                            onChange={(e) => { 
                                                    this.setState({ addressEntreprise: e.target.value });
                                            }}
                                            /> */}

<TextField variant="outlined" size="small" id="addressEntreprise" label="Adresse" type="search"  value={this.state.addressEntreprise}
                                            onChange={(e) => { 
                                                this.setState({ addressEntreprise: e.target.value });
                                        }}
                                                />  
                                        </div>

                                
                               

                                        <div className="col-md-4 col-sm-12">
                                            {/* <input 
                                            className="form-control" 
                                            type="text"  
                                            placeholder="Ville"
                                            value={this.state.cityEntreprise}
                                            onChange={(e) => { 
                                                    this.setState({ cityEntreprise: e.target.value });
                                            }}
                                            /> */}
                                <TextField variant="outlined" size="small" id="cityEntreprise" label="Ville" type="search"  value={this.state.cityEntreprise}
                                            onChange={(e) => { 
                                                this.setState({ cityEntreprise: e.target.value });
                                        }}
                                                /> 
                                        </div>

                                  
                                    </div>

                                    
                                    <div className="form-group row">
                                        <div className="col">


<TextField variant="outlined" size="small" id="horaires" label="Horaires d'ouverture" type="search"  value={this.state.horaires}
                                            onChange={(e) => { 
                                                this.setState({ horaires: e.target.value });
                                        }}
                                        />
                                          
                                        </div>
                                     </div>

                                    
                                    <div style={{textAlign: "center"}} className="first-submit-button">
                                        <button className="button button-primary primaryyCustom" type="submit">Enregistrer</button>
                                        <a className="vitrine--link button button-primary primaryyCustom" href={`https://www.agenz.ma/agence-immobiliere/casablanca/${this.props.agence.nameEntreprise ? this.props.agence.nameEntreprise.replace(/\./g, '-').replace(/ /g, '-').replace(/é/g, 'e').replace(/ô/g, 'o'):"agenz"}/a/${this.props.uid}`} target="_blank" rel="noreferrer">Voir ma vitrine</a>
                                    </div>

                                </form>
                        </div>
                        
                    </div>

 
                    <div className="col-md-8 col-sm-12">
                        
<div className="vitrine--link-container">

                </div>  
                            
              
                    </div>
   
                </div>
            </ThemeProvider>                
            </div>
                )}
                </>
            );
    }
}

const mapStateToProps = (state) => {
    const uid = state.auth.uid;
    const email = state.auth.email;
    const estimation = state.userEstimation;
    const estimationState = state.estimationState;

    //console.log(state)
    return {
      uid: uid,
      email: email,
      estimation:estimation,
      estimateState: estimationState,
      agence : state.auth.agence
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updatePassword: (creds) => dispatch(updatePassword(creds)),
        dispatch
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(FillVitrine);