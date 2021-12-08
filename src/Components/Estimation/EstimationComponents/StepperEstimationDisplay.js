
import React, { Component } from 'react';
import { connect } from "react-redux";

import * as Scroll from 'react-scroll';

import filledNotStar from './../../../assets/img/filledNotStar.png';
import filledStar from './../../../assets/img/filledStar.png';
import errorImage from '../../../assets/img/error_img.png';
import { CSSTransition } from 'react-transition-group';
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';



import dataBlue from '../../../assets/icons/data_blue.png';
import houseBlue from '../../../assets/icons/house_blue.png';
import successBlue from '../../../assets/icons/success_blue.png';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import firebase from './../../../Config/FirebaseConfig';
import Axios from 'axios';
import Spinner from "react-bootstrap/Spinner";
import CountUp from 'react-countup';
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import InfoIcon from '@material-ui/icons/Info';
import Popover from "react-bootstrap/Popover";
import PopoverTitle from "react-bootstrap/PopoverTitle";
import PopoverContent from "react-bootstrap/PopoverContent";
import StepperEstimationDisplayRightText from './StepperEstimationDisplayRightText'
import { toast } from "react-toastify";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Snackbar from '@material-ui/core/Snackbar';

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';




import SelectBox from './../../../Elements/select-box/index'
import './StepperEstimationDisplay.scss';

import {theme} from '../../../assets/theme'
import {ThemeProvider} from '@material-ui/core/styles';
import MuiPhoneNumber from "material-ui-phone-number";
import TextField from '@material-ui/core/TextField';
import {GMAPS_API_KEY} from '../../../Config/GMapsConfig'
import jwtDecode from 'jwt-decode';
import ListingAgencies from '../../PricingRightSide/ListingAgencies'
import EstimationDisplayMap from "./EstimationDisplayMap"
import {withRouter} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import NumberFormat from 'react-number-format';

function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            thousandSeparator={" "}
            isNumericString
            suffix=" MAD"
        />
    );
}


class StepperEstimationDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            loginShow: false,
            formattedAddress: '',
            avis: 'Correcte',
            telephone: '',
            estimationId: undefined,
            show: true,
            showError : true,
            loader: false,
            openPriceModal: false,
            EstimationPrice: 0,
            EstimationPriceText: '',
            estimationByUser: null,
            estimationError : false,
            shareLink : null,
            copied: false,
            errorMail : false,
            errorPassword : false,
            errorName : false,
            errorSurname : false,
            errorPhone : false,
            consent : false,
            consentError : false,
            loadingLogin : false,
            estimationAvisError : false
        }
    }

    getEstimations() {
        const db = firebase.firestore();
        const estimationDatas = [];
        const estimationDispatchDatas = [];
        let estimationRef = db.collection("estimations");
        let query = estimationRef.where("user_id", "in", [this.props.email,this.props.uid]);
        query
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => estimationDatas.push({ ...doc.data()}));
            estimationDatas.forEach((est) =>{
                if(!est.isDeleted) {
                    if(!est.adresse){
                        if(est.localisation){
                            // const replace = est.localisation.replace('lat : ', '').replace('lng : ', '');
                            // const loc = replace.split(' ');
        
                            //     const lat = loc[0];
                            //     const lng = loc[1];
                            //     const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GMAPS_API_KEY}`;

                                // Axios.get(url).then(res => {
                                //     if (res.data.results.length > 0) {
                                //         let results = res.data.results[0].formatted_address
                                //         estimationDispatchDatas.push({...est, adresse: results})
                                //     }
                                // });
                                estimationDispatchDatas.push({...est, adresse: est.localisation})

                        }                    
                    }else {
                        estimationDispatchDatas.push(est)
                    }
                }
            })
            this.props.dispatch({ type: 'SET_USER_ESTIMATION', data: estimationDispatchDatas});
        })
        .catch((error) =>{
            this.setState({estimationError : true})
            // //////console.log("Error getting documents: ", error);
        });
    }

   async getEstimations2(id) {
        return new Promise((resolve,reject)=> {
        const db = firebase.firestore();
        const estimationDatasFetch = [];
        const estimationDatas = [];

        var estimationRef = db.collection("estimations");
        var query = estimationRef.where("user_id", "==", id);
        query.get().then((querySnapshot)=>{
        querySnapshot.forEach((doc) => estimationDatasFetch.push({ ...doc.data()}));
        estimationDatasFetch.forEach(est => {
            if(!est.isDeleted) {
                estimationDatas.push(est)
            }
        })
        this.props.dispatch({ type: 'SET_USER_ESTIMATION', data: estimationDatas});
        resolve(true)})
        .catch(err => {
            
            reject(err)
        })
      })
    }

    async getUser (id){
        return new Promise((resolve,reject)=> {
        const dbStore = firebase.firestore();
        var userRef = dbStore.collection("users")
        var query = userRef.doc(id);
        query.get().then((querySnapshot)=>{
        if(
            !querySnapshot.data().isPro &&
            this.props.estimation.userEstimations.length >= 10
        ){
            this.setState({show: false})
            
            this.props.history.replace({
                pathname : `/estimation/resultat/signup`,
            search : this.props.history.location.search})    

        } 
        this.setState({loader: false})
        resolve(true)
    })
    .catch(err=>{
        
        reject(err)
    })
    })
}

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        });
    };

    addAvis = () =>{
        const error = this.validateAvisFields() ;
        if (error) {
            this.props.dispatch({type: 'ADD_FILL_AVIS_ERROR'});
            return;
        }

        const db = firebase.firestore();
        db.collection("avis")
        .add({
            avis:this.state.avis,
            user_id: this.props.uid,
            estimationId:this.props.estimationState.estimationId,
            estimationByUser: this.state.EstimationPrice,
            estimationTextByUser: this.state.EstimationPriceText,
            estimation: this.props.estimationState.estimation.estimation,
            bien : this.props.estimationState.estimation.bien,
            zone : this.props.estimationState.estimation.zone,
            date: new Date().toISOString(),
        })
        .then(() => {
            this.props.dispatch({type: 'ADD_AVIS_SUCCESS'});
            // this.props.dispatch({ type: 'ADD_AVIS_MODAL', data: false});
        }).catch((err) =>{
            this.props.dispatch({type: 'ADD_AVIS_ERROR'});
        })
    }

    updateTelephone = () => {
        this.props.dispatch({ type: 'SET_TELEPHONE', data: this.state.telephone});
        const db = firebase.firestore();
        var estimationRef = db.collection("estimations");
        var query = estimationRef.where("estimationId", "==", this.props.estimationState.estimationId);
        query
        .get()
        .then((querySnapshot) =>{
            this.props.dispatch({type: 'ADD_TEL_SUCCESS'});
            this.props.dispatch({ type: 'UPDATE_PHONE_MODAL', data: false});
            querySnapshot.forEach((doc) => {
                doc.ref.update({
                    telephone: this.state.telephone
                });
            });
        })
        .catch((error) =>{
            this.props.dispatch({type: 'ADD_TEL_ERROR'});
            this.props.dispatch({ type: 'UPDATE_PHONE_MODAL', data: false});
            // //////console.log("Error getting documents: ", error);
        });

        
    }

    updateEstimation = () => {
        const db = firebase.firestore();
        var estimationRef = db.collection("estimations");
        var query = estimationRef.where("estimationId", "==", this.props.estimationState.estimationId);
        query
        .get()
        .then((querySnapshot) =>{
            this.props.dispatch({type: 'ADD_MY_ESTIMATION_SUCCESS'});
            querySnapshot.docs[0].ref.update({
                estimation: this.props.estimationState.estimation.estimation
            });
        })
        .catch(() =>{
            this.props.dispatch({type: 'ADD_MY_ESTIMATION_ERROR'});
        });
    }

    add_tel_succes = () => {
        this.props.dispatch({type: 'ADD_TEL_SUCCESS'});
    }
    meRappeler = () => {
        // if(this.props.estimationState.estimation.telephone){
        //     this.props.dispatch({type: 'ADD_TEL_SUCCESS'});
        // }else{
            this.props.dispatch({ type: 'UPDATE_PHONE_MODAL', data: true});
        // }
    }

    openAvisMobile = () => {
        // //////console.log("ok")
        // let error = false;
        // if(this.state.avis!=="Correcte"){
        // if (this.state.EstimationPrice === undefined) {
        //     let error = true;
        // } else {
        //     if (
        //         !this.state.EstimationPriceText
        //     ) {
        //         let error = true;            
        //     }
        // }
        // }
        // if (error) {
        //     this.props.dispatch({type: 'ADD_AVIS_ERROR'});
        //     return;
        // }
        this.props.dispatch({ type: 'ADD_AVIS_MODAL', data: true});
    }

    handleClickOpenLoginModal = () => {
        if(this.state.loginShow){
        this.setState({loginShow : false})

        this.props.history.replace({
            pathname : `/estimation/resultat/signup`,
        search : this.props.history.location.search})    
        }
        else{

            this.props.history.replace({
                pathname : `/estimation/resultat/signin`,
            search : this.props.history.location.search})    
            this.setState({ loginShow: true });
        }
        
    };
    validateAvisFields() {
        let error = false;
        if(this.state.avis!=="Correcte"){
        if (this.state.EstimationPrice === undefined) {
            error = true;
        } else {
            if (
                !this.state.EstimationPriceText
            ) {
                error = true;            
            }
        }
    }
        return error;
    }
    validateRegistartionFields() {
        let error = false;
        if (this.state.registration === undefined) {
            error = true;
        } else {
            if (
                !this.state.registration.email){
                    this.setState({errorMail :true})
                    error=true
                }
            else {
                this.setState({errorMail :false})
            }
            if(!this.state.registration.password){

                this.setState({errorPassword :true})
                    error=true
            }
            else {
                this.setState({errorPassword :false})
            }
            if(!this.state.registration.name){
                this.setState({errorName :true})
                    error=true

            }
            else {
                this.setState({errorName :false})
                
            }
            if(!this.state.registration.surname){
                this.setState({errorSurname :true})
                    error=true

            }
            else {
                this.setState({errorSurname :false})
                
            }
            if(!this.state.registration.phone && this.state.telephone===""){
                this.setState({errorPhone :true})
                    error=true

            }
            else {
                this.setState({errorPhone :false})
            }
        }
            
            
                // //////console.log(this.state.registration.email)
                    // //////console.log(this.state.registration.password)
                    // //////console.log(this.state.registration.name)
                    // //////console.log(this.state.registration.surname)
                    // //////console.log(this.state.registration.phone)
                    // //////console.log(this.state.telephone)

                
            
        return error;
    }

    validateLoginFields() {
        let error = false;
        if (this.state.login === undefined) {
            error = true;
        } else {
            if (!this.state.login.email || !this.state.login.password) {
                error = true;
            }
        }
        return error;
    }

    getAddress() {
        
        const loc = this.props.estimationState.estimation.localisation;
        const lat = loc.substr(5, loc.indexOf(' lng') - 4).trim();
        const lng = loc.substr(lat.length + 13);
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyB2buNZK5FTqWGtiu_OKz74KTI_Iu2aD74`;
        if(this.props.estimationState.estimation.adresse && this.props.estimationState.estimation.adresse!=="" ){
            this.setState({
                formattedAddress: this.props.estimationState.estimation.adresse
            });
        }
        else {
        delete Axios.defaults.headers.common["Authorization"] 
        delete Axios.defaults.headers.common["authorization"];

        Axios.get(url).then(res => {
        Axios.defaults.headers.common["Authorization"]=localStorage.getItem("FBIdToken")
            //console.log(res)
            let data;
            if (res.data.results.length > 0) {
            //     if(res.data.results[0].address_components[1].types[0]=="locality"){
            //     data = {
            //         address : res.data.results[0].formatted_address,
            //         ville: res.data.resultgclouds[0].address_components[1].long_name
            //     }
            //     // ////console.log("1")
            // }
            // else if(res.data.results[0].address_components[2].types[0]=="locality"){

            //     data = {
            //         address : res.data.results[0].formatted_address,
            //         ville: res.data.results[0].address_components[2].long_name
            //     }
            //     // ////console.log("2")
            // }
            // else if(res.data.results[0].address_components[3].types[0]=="locality"){
            //     data = {
            //         address : res.data.results[0].formatted_address,
            //         ville: res.data.results[0].address_components[3].long_name
            //     }
            //     // ////console.log("3")
            // }
            // else{
            //     data = {
            //         address : res.data.results[0].formatted_address,
            //         ville: res.data.results[0].address_components[4].long_name
            //     }
            //     // ////console.log("4")
            // }
            console.log(res.data.results[0].address_components)
            res.data.results[0].address_components.forEach(component => {
                if (component.types.includes('locality')) {
                 data = {
                     address : res.data.results[0].formatted_address,
                     ville: component.long_name
                }
                this.props.estimationState.currentAdress = data.address;
                // ////console.log(this.props.estimationState)
                console.log(data)
                    this.setState({ville : data.ville})
                    this.props.dispatch({ type: 'SET_CURRENT_ADDRESS', data: data});
                    this.setState({
                        address: res.data.results[0].formatted_address
                    });
                }
            });

            }
    
            if (res.data.results.length > 0) {
                this.setState({
                    formattedAddress: res.data.results[0].formatted_address
                });
            }
        })
        .catch(err => {
            //console.log(err)
            this.props.dispatch({type: 'CUSTOM_ERROR_MESSAGE', data: err.message});
        });
        }
        

    }
    handleClose = (evetn, reason) => {
        if (reason === 'clickaway') {
            return;
          }
        this.setState({open : false})
    }

    handleClosePModal = () => {
        this.props.dispatch({ type: 'UPDATE_PHONE_MODAL', data: false});
    };
    handleCloseAvisModal = () => {
        this.props.dispatch({ type: 'UPDATE_PHONE_MODAL', data: false});
    };

    closePriceModal = ()  => {
        this.setState({openPriceModal: !this.state.openPriceModal})
    };

    createEstimation(uid) {
        if(this.props.user){
        return {
            ...this.props.estimationState.estimation,
            telephone : this.props.user.phone,
            email : this.props.user.email,
            lastName : this.props.user.lastName,
            firstName : this.props.user.firstName,
            date : new Date(),
            user_id: uid,
            supprimeLe: null,
            user : this.props.user
        };
    }
    else {     
        return {
        ...this.props.estimationState.estimation,
        telephone : this.state.registration.phone,
        email : this.state.registration.email,
        lastName : this.state.registration.surname,
        firstName : this.state.registration.name,
        date : new Date(),
        user_id: uid,
        supprimeLe: null,
        user : {email : this.state.registration.email,
            telephone : this.state.registration.phone,
            lastName : this.state.registration.surname,
            firstName : this.state.registration.name }

    };

    }
        
    }

    signUp() {
        let userId;
        let result;
        const error = this.validateRegistartionFields();
        if (error) {
            this.props.dispatch({type: 'FILL_FORM_ERROR'});
            //////console.log("fill form error")
            return;
        }
        if (!this.state.consent) {
this.setState({consentError : true})            //////console.log("fill form error")
            return;
        }
        let phone = this.state.registration.phone;
        if(phone===""){
            phone=this.state.telephone
        }
     
        
        const auth = firebase.auth();
        const firestore = firebase.firestore();
        //console.log(this.state.registration.email)
        auth.createUserWithEmailAndPassword(this.state.registration.email, this.state.registration.password).then(res => {
            result = res
            userId = res.user.uid;
            return res.user.getIdToken();
        })

        .then((token) => {
            // //////console.log(token)
            const FBIdToken = `Bearer ${token}`
            localStorage.setItem('FBIdToken', `Bearer ${token}`)
            Axios.defaults.headers.common['Authorization']= FBIdToken
            firestore.collection('users').doc(userId).set({
                lastName: this.state.registration.surname,
                firstName: this.state.registration.name,
                email: this.state.registration.email, 
                isPro: false,
                phone: phone

          })  
          // //////console.log("userId",userId)       
           result.user.updateProfile({displayName: `${this.state.registration.name} ${this.state.registration.surname}`}).then(() => {
                this.props.dispatch({type: 'UPDATE_FIREBASE_USER', data: {
                    uid: result.user.uid,
                    displayName: result.user.displayName,
                    email: result.user.email,
                    phone : phone
                }});
                this.props.dispatch({ type: 'UPDATE_USER', data: {
                    lastName: this.state.registration.surname,
                    firstName: this.state.registration.name,
                    email: this.state.registration.email.trim(), 
                    isPro: false,
                    phone: phone
                }});    
            })
            .then(()=>{
            //////console.log(result.user)
            // const estimation = this.createEstimation(result.user.uid)
            // //////console.log("estimation", estimation);
            this.props.dispatch({type: 'ADD_ESTIMATION_FIREBASE', data: this.createEstimation(result.user.uid)});
            this.props.dispatch({ type: 'SET_ACTIVE_STEP', data: 7});


            this.props.history.replace({
                pathname : `/estimation/resultat`,
            search : this.props.history.location.search})    
            Scroll.animateScroll.scrollToTop()
            })
        }).catch(err => {
            //console.log(err)
            this.props.dispatch({type: 'CUSTOM_ERROR_MESSAGE', data: err});
            // //////console.log(err);
        });
    }

    async signIn() {
    
        const error = this.validateLoginFields();
        this.setState({loader: true})
        if (error) {
            this.props.dispatch({type: 'FILL_FORM_ERROR'});
            this.setState({loader: false})
            return;
        }
        // const auth = firebase.auth();
        // auth.signInWithEmailAndPassword(this.state.login.email, this.state.login.password)
        return new Promise((resolve,reject)=> {
        Axios.post('https://us-central1-agenz-website-prod.cloudfunctions.net/api/signIn',{creds: 
    {
        email : this.state.login.email.trim(), 
        password : this.state.login.password
    } })
    .then(result => {
            // //console.log(result)  
            const FBIdToken = `Bearer ${result.data.token}`
            localStorage.setItem('FBIdToken', `Bearer ${result.data.token}`)
            Axios.defaults.headers.common['authorization']= FBIdToken
            if(result.data.data.isPro){
                this.props.dispatch({ type: 'SET_AUTHENTICATED_PRO' });
              }
          // update the user with the values of we got from Firebase
            this.props.dispatch({ type: 'SET_AUTHENTICATED' });
            this.props.dispatch({ type: 'UPDATE_USER', data: result.data.data });
            this.props.dispatch({ type: "SIGN_IN", data: result.data.data});
            this.props.dispatch({type: "LOADER_FALSE"});
            resolve(result)
            })
            .catch(err => {
                //console.log(err)
              let errMessage = null;
              if(err.response.data.message === "There is no user record corresponding to this identifier. The user may have been deleted."){
                errMessage = "Adresse mail introuvable"
              }else if (err.response.data.message === "The password is invalid or the user does not have a password."){
                errMessage = "Mot de passe invalide"
              }        else if (err.response.data.code === "auth/invalid-email"){
                errMessage = "Vérifiez le format de l'adresse email"
              }
              else {
                errMessage = err.response.data.message
              }
              this.setState({loader: false})
              this.props.dispatch({type: 'CUSTOM_ERROR_MESSAGE', data: err});
              ////console.log(err)
              this.props.dispatch({ type: "SIGN_IN_ERR", data: errMessage }, err);
              this.props.dispatch({ type: "LOADER_FALSE" });
              reject(err)
            });
        })
    }
    // login(){
    //     this.signIn().then(async (result)=>{
        
        
    //     const decodedToken = jwtDecode(result.data.token);
    //     await this.getEstimations2(decodedToken.user_id)
    //     await this.getUser(decodedToken.user_id)
        
    //     if(this.props.uid && this.state.show) {  
    //         this.props.history.replace("/estimation/resultat")
        
    //         const estimation = this.createEstimation(this.props.uid);
    //         this.props.dispatch({type: 'ADD_ESTIMATION_FIREBASE', data: this.createEstimation(this.props.uid)});
    //         this.setState({loader: false})
    //         Scroll.animateScroll.scrollToTop()
    //     }
    // })
    // .catch(err => {
        
    //     this.props.dispatch({ type: "LOADER_FALSE" });
    //     this.setState({loader: false})
    //     toast.error("Impossible d'enregistrer l'estimation sur votre espace. Veuillez réessayer")
    // })

    // }

    getUserDetails(userId){
        return new Promise((resolve,reject)=> {

        const firestore = firebase.firestore()
        firestore.collection('users').doc(userId).get().then((res) => {
            console.log(res.data())
            this.props.dispatch({
                type : "SET_LOGGED_IN_USER",
                data : {
                    ...res.data(),
                    activeStep : 0
                }
            })
            if(res.data().isPro){
                this.props.dispatch({ type: 'SET_AUTHENTICATED_PRO' });
              }
          // update the user with the values of we got from Firebase
               this.props.dispatch({ type: 'SET_AUTHENTICATED' });
              this.props.dispatch({ type: 'UPDATE_USER', data: res.data() });
              this.props.dispatch({ type: "SIGN_IN", data: res.data()});
              this.props.dispatch({type: "LOADER_FALSE"});
              
            resolve()
        })
        .catch(err => {
            console.log(err)
            console.log(err.response)
            reject()
        })
    })
    }
    async login(){   
        this.setState({loadingLogin : true})
        return new Promise((resolve,reject)=> {
        const auth = firebase.auth();
        auth.signInWithEmailAndPassword(this.state.login.email,this.state.login.password)
        .then((userCredential) => {
          var user = userCredential.user;
          console.log(user)
          user.getIdToken().then(async (token)=>{
            const decodedToken = jwtDecode(token);
            await this.getEstimations2(decodedToken.user_id)
            await this.getUser(decodedToken.user_id)
    
            if(this.props.uid && this.state.show) {  
                

            this.props.history.replace({
                pathname : `/estimation/resultat`,
            search : this.props.history.location.search})    
            
                // const estimation = this.createEstimation(this.props.uid);
                this.props.dispatch({type: 'ADD_ESTIMATION_FIREBASE', data: this.createEstimation(this.props.uid)});
                this.setState({loader: false})
                Scroll.animateScroll.scrollToTop()
            }
            console.log(decodedToken)
            const FBIdToken = `Bearer ${token}`
            localStorage.setItem('FBIdToken', `Bearer ${token}`)
            Axios.defaults.headers.common['Authorization']= FBIdToken
            this.getUserDetails(decodedToken.user_id).then(() =>{
                this.setState({loadingLogin : false})

            this.props.history.replace({
                pathname : `/estimation/resultat/`,
            search : this.props.history.location.search})    
            
                // const estimation = this.createEstimation(this.props.uid);
                this.props.dispatch({type: 'ADD_ESTIMATION_FIREBASE', data: this.createEstimation(this.props.uid)});
                this.setState({loader: false})
                Scroll.animateScroll.scrollToTop()
            })

          })
        })
        .catch((error) => {
        //   var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorMessage)
          this.setState({loadingLogin : false})
          if(errorMessage === "There is no user record corresponding to this identifier. The user may have been deleted."){
              this.setState({unknownUser : true})
          }
          if(errorMessage === "The password is invalid or the user does not have a password."){
            this.setState({incorrectPassword : true})
        }
          
        })
    })

    }


    closeModal = () => {
        this.setState({open: !this.state.open})
    }

    closeAvisModal = () => {
        this.props.dispatch({type: 'CLOSE_AVIS_MODAL'});
    }

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

    setPro = () => {
        
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
            this.props.dispatch({type: 'PRO_REGISTERING_SUCCESS'});
            this.closeModal();
            
            const dbStore = firebase.firestore();
            var userRef = dbStore.collection("users")
            var query = userRef.doc(this.props.uid);

            query
            .get()
            .then((querySnapshot) =>{

                query.update({
                    isPro: true
                })

                this.setState({
                    show: true
                })

            this.props.history.replace({
                pathname : `/estimation/resultat`,
            search : this.props.history.location.search})    


            }).then(res => {
                this.checkUser();
            })
        }).catch((err) =>{
            this.props.dispatch({type: 'PRO_REGISTERING_ERROR'});
        })
    };

    checkUser() {
        const dbStore = firebase.firestore();
        var userRef = dbStore.collection("users")
        var query = userRef.doc(this.props.uid);

        query
        .get()
        .then((querySnapshot) => {

            if(querySnapshot.data().isPro){
                this.setState({show: true});

            this.props.history.replace({
                pathname : `/estimation/resultat`,
            search : this.props.history.location.search})    


            }
        })
        .catch((error) => {
        });
    }
    formatDate(dateEstimation){
        let date = new Date(dateEstimation);   
 return (date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear())

      }

    registerToDoIst(){
        delete Axios.defaults.headers.common["Authorization"]
        delete Axios.defaults.headers.common["authorization"]
        Axios.defaults.headers.common["Authorization"]="Bearer a127a2fcc93a619cef69c547b710a03fa6fa2d30"
        let content = `Estimation d'un ${this.props.estimationState.estimation.bien} ${this.props.estimationState.estimation.adresse}, faite le ${this.formatDate(this.props.estimationState.estimation.date)} A contacter : ${this.props.estimationState.estimation.a_contacter}\n
        Prix estimé : ${new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'MAD'}).format(this.props.estimationState.estimation.estimation)}, id : ${this.props.estimationState.estimationId}`

        Axios.post(
            'https://api.todoist.com/rest/v1/tasks',
            {content : content , project_id : 2243781388,
            assignee : 28628629 }
        ).then(res => {
            this.setState({donnees_zone : false})
            delete Axios.defaults.headers.common["Authorization"]
            delete Axios.defaults.headers.common["authorization"]
            Axios.defaults.headers.common["Authorization"]=localStorage.getItem("FBIdToken")
        })
        .catch(err => {
            delete Axios.defaults.headers.common["Authorization"]
            delete Axios.defaults.headers.common["authorization"]
            Axios.defaults.headers.common["Authorization"]=localStorage.getItem("FBIdToken")
            

        })

    }

    componentDidMount() {
        
        if(this.props.estimationState.estimation.telephone ){
            this.setState({telephone : this.props.estimationState.estimation.telephone})
        }
        this.setState({ registration: { ...this.state.registration, phone: this.state.telephone}})
        this.getAddress();
        const user = firebase.auth().currentUser;
        
        if (user) {
            this.props.dispatch({type: 'UPDATE_FIREBASE_USER', data: {
                uid: user.uid,
                displayName: user.displayName,
                email: user.email,
            }});

        }
        
        this.setState({estimationId: this.generateID()})

        if(this.props.uid) {

            // const estimation = this.createEstimation(this.props.uid);

            // if(this.props.estimationState.estimation.bien !== 'villa') {
                this.props.dispatch({type: 'ADD_ESTIMATION_FIREBASE', data: this.createEstimation(this.props.uid)});
            // }
        
        }
        if(this.props.authenticated){

            this.props.history.replace({
                pathname : `/estimation/resultat`,
            search : this.props.history.location.search})    
        }
        else{

            this.props.history.replace({
                pathname : `/estimation/resultat/signup`,
            search : this.props.history.location.search})    
        }

        // //////console.log(this.props)
        
    }
    shareEstimation (id){
        const db = firebase.firestore();
        //Update estimation to firestore
        var estimationRef = db.collection("estimations");

        var query = estimationRef.where("estimationId", "==", id);
        this.setState({loading : true, action: 'share'})
        query
        .limit(1).get()
        .then((querySnapshot) =>{

            querySnapshot.forEach((doc) =>{
                
                // //////console.log(doc.id, id)
                Axios.post('https://us-central1-agenz-website-prod.cloudfunctions.net/api/createJWTAccessToken',{ estimationId: doc.id }).then(result => {
                // const createAccessToken = firebase.functions().httpsCallable('createJWTAccessToken');
                // createAccessToken({ estimationId: doc.id })
                // .then((result) => {

                    doc.ref.update({
                        shareLink : result.data.result
                    })

                    const link = window.location.origin + "/estimations?token=" + result.data.result;
                    const linkEncode = encodeURI(link);
                    this.setState({shareLink : linkEncode})
                }).then(() => {
                    this.setState({loading : false, action: null})
                })
                .catch(err => {
                    this.setState({loading : false, action: null})
                    // //////console.log(err)
                    toast.error("Quelque chose s'est mal passé, veuillez réessayer")
                    

                })

            });

            
        })
        .catch((error) =>{
            // //////console.log(error)
            toast.error("Erreur");
        });

        
    }

    componentWillUnmount() {
        // reinit the estimation object and all variables related to it
        this.props.dispatch({ type: 'REINIT_ESTIMATION_FLOW' });
        if(this.props.uid){
        this.getEstimations()}
        
    }
    handleCheckConsent(){

        if (this.state.consent){
            this.setState({consentError : true})
        }
        else{
            this.setState({consentError : false})
        }
        
        this.setState({ consent: !this.state.consent })

        
    }

    generateID(){
        let length = 3,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
        for (let i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        return retVal + new Date().getTime();
    }

    render() {
        let surfaceeffective = 1;
        if (this.props.estimationState.estimation.bien === "appartement"){
        if(this.props.estimationState.estimation.parking) {
            surfaceeffective= this.props.estimationState.estimation.surfacehabitable + (this.props.estimationState.estimation.surfacecave+this.props.estimationState.estimation.surfacebalcon+this.props.estimationState.estimation.placesparking*12)/2
        }
        else {
            surfaceeffective= this.props.estimationState.estimation.surfacehabitable + (this.props.estimationState.estimation.surfacecave+this.props.estimationState.estimation.surfacebalcon)/2 
        } 
    }
    else {
        surfaceeffective = this.props.estimationState.estimation.surfaceterrain
    }
        
        const popover = (
            <Popover id="popover-contained">
                <PopoverTitle as="h3">Évaluation de votre estimation</PopoverTitle>
                <PopoverContent>
                    Représente le niveau de confiance attribué à l'estimation réalisée. Celui-ci varie en fonction du nombres de données que nous possédons sur une zone determinée.
                </PopoverContent>
            </Popover>
        );
        const popover_surface = (
            <Popover id="popover-contained">
                <PopoverTitle as="h3">Surface utile</PopoverTitle>
                <PopoverContent>
                    La surface utile prend en compte la surface habitable ainsi que les surfaces annexes pondérées
                </PopoverContent>
            </Popover>
        );
        return (
            <>
            <ThemeProvider theme={theme}>
            <Dialog
                open={this.props.estimationState.openAvisModal}
                onClose= {this.closeAvisModal}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogContent>
                    <DialogContentText>

                                                        <h3 className="avis--title-mobile">L’estimation me semble</h3>
                                                        <div className="form-group form-group--mobile" style={{marginBottom: '15px'}}>
                                                            <SelectBox
                                                                id="avis"
                                                                defaultValue={this.state.avis}
                                                                items={[
                                                                    { value: 'Correcte', id: 'Correcte' },
                                                                    { value: 'Basse', id: 'Basse' },
                                                                    { value: 'Haute', id: 'Haute' },
                                                                ]}
                                                                zIndex="3"
                                                                onSelectChange={(item, id) => {
                                                                    this.setState({
                                                                        avis: item.value
                                                                    });
                                                                }}
                                                            />
                                                        </div>

                                                            { this.state.avis !== "Correcte" ?
                                                            (<>
                                                                <div className="form-group form-group--avis-mobile">
                                                                 
                                                                                                            <TextField InputProps={{
                                        inputComponent: NumberFormatCustom,
                                    }} error={this.state.estimationAvisError} min="0" id="outlined-basic" label="Estimation" variant="outlined" onChange={(e) => {this.setState({ ...this.state, EstimationPrice: e.target.value, estimationAvisError: e.target.value==="" })}} 
                                    helperText = {this.state.estimationAvisError ? ("Champs requis") : ""}
                                    />
                                                         

                                                                </div>
                                                                <div className="form-group form-group--avis-mobile">
                                                                <TextField type="search" error={this.state.EstimationPriceTextError} min="0" id="outlined-basic" label="Pour quelles raisons ?" variant="outlined" onChange={(e) => {this.setState({ ...this.state, EstimationPriceText: e.target.value, EstimationPriceTextError: e.target.value==="" })}} 
                                    helperText = {this.state.EstimationPriceTextError ? ("Champs requis") : ""}
                                    />
                                                            </div>
                                                            </>
                                                            ): ''
                                                            }
                                                        <div className="form-group form-group--avis-mobile">
                                                            <button
                                                            className="button button-primary"
                                                            type="button"
                                                            onClick={this.addAvis}>
                                                                <i class="fa fa-paper-plane-o"></i>
                                                                Envoyer mon avis
                                                            </button>
                                                        </div>

                    </DialogContentText>
                </DialogContent>
            </Dialog>
            
          {/*
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
                            <form onSubmit={this.handleSubmit}>
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
                                            onChange={(e) => {
                                                this.setState({
                                                    number: e,
                                                });
                                            }}/>
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
                                    <button type="button" className="button button-primary" onClick = {() => {this.setPro()}}>
                                        Confirmer
                                    </button>
                                </div>

                            </form>
                            
                        </div>
                    </DialogContentText>
                </DialogContent>
            </Dialog> */}
            {
                this.state.loader ? (
                    <div className="loader">
                        <Spinner animation="border" variant="primary" size="lg"/>
                        <div className="estimation-top-side">
                            <h1 className="loader-h1">Chargement...</h1>
                        </div>
                    </div>
                ) : (
            <div>
            <Dialog
            open={this.props.estimationState.openPhoneModal}
            onClose={this.handleClosePModal}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
                <DialogContent>
                    <DialogContentText id="alert-dialog-localisation-error">
                        <div  className="text-center text-center--telephone">
                            <div className="form-group form-group-valid-mobil" style={{
                                    marginBottom: '15px',
                                    marginTop: '15px'
                            }}>
                        <MuiPhoneNumber
                        error={this.state.errorPhone}
                    name="phoneNumber"
                    label={this.props.estimationState.estimation.telephone ? 'Confirmez votre numéro de téléphone' : 'Numéro de téléphone'}
                    id="telephone"
                    data-cy="user-phone"
                    defaultCountry={"ma"}
                    value={this.props.estimationState.estimation.telephone ? this.props.estimationState.estimation.telephone : ''}
                    onChange={(e) => {this.setState({telephone: e})}}/>
                                {/* <PhoneInput
                                    defaultCountry="MA"
                                    id="telephone"
                                    placeholder="Numéro de téléphone"
                                    value={this.props.estimationState.estimation.telephone ? this.props.estimationState.estimation.telephone : ''}
                                    onChange={(e) => {this.setState({telephone: e})}}/> */}
                            </div>


                            <div className="form-group form-group--tel">
                                <button className="button button-primary" type="button" onClick={this.updateTelephone}> <i class="fa fa-paper-plane-o"></i>Valider</button>
                            </div>
                        </div>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
            {
                this.state.show ? ( 
                    <>
                        {this.props.authenticated ? (
                        <div>
                            <div className="show-results">
                                <div>
                                    <div className="results-top-side">
                                        <div className ="results-top"> 
                                            <div className={this.props.estimationState.estimation.bien !== 'terrain' ? "results-icon" : "results-icon2"} >  
                                            {this.props.estimationState.estimation.bien === 'appartement' ? 
                                            (<svg width="100px" height="100px" viewBox="0 0 56 56" version="1.1" xmlns="http://www.w3.org/2000/svg" class="radio-rect__icon path__stroke polyline__stroke"><g id="assets" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" opacity="1" stroke-linejoin="round"><g id="Appartment" stroke="#393939" stroke-width="2"><g id="Page-1" transform="translate(10.000000, 7.000000)"><path d="M4,41 L4,1 C4,0.448 4.448,0 5,0 L31,0 C31.553,0 32,0.448 32,1 L32,41 L21,41 L21,33 C21,32.447 20.553,32 20,32 L16,32 C15.448,32 15,32.447 15,33 L15,41 L4,41 Z" id="Stroke-1" stroke-linecap="round"></path><path d="M11,12 L11,9" id="Stroke-3" stroke-linecap="square"></path><path d="M18,12 L18,9" id="Stroke-5" stroke-linecap="square"></path><path d="M25,12 L25,9" id="Stroke-7" stroke-linecap="square"></path><path d="M11,23 L11,20" id="Stroke-9" stroke-linecap="square"></path><path d="M18,23 L18,20" id="Stroke-11" stroke-linecap="square"></path><path d="M25,23 L25,20" id="Stroke-13" stroke-linecap="square"></path><path d="M0,41 L36,41" id="Stroke-15" stroke-linecap="round"></path></g></g></g></svg>)
                                             : 
                                             ( <svg width="70px" height="70px" viewBox="0 0 56 56" version="1.1" xmlns="http://www.w3.org/2000/svg" class="radio-rect__icon path__stroke polyline__stroke"><g id="assets" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" opacity="1" stroke-linejoin="round"><g id="House" stroke-width="2" stroke="#393939"><g id="Page-1" transform="translate(8.000000, 13.000000)"><polyline id="Stroke-1" points="-7.27196081e-14 13 20 0 40 13"></polyline><path d="M6,9 L6,31 L16,31 L16,22 C16,21.447 16.448,21 17,21 L23,21 C23.553,21 24,21.447 24,22 L24,31 L34,31 L34,9" id="Stroke-3"></path></g></g></g></svg>)
                                             } 
                                            
                                            </div>
                                            <div className ="results-infos">
                                                <div>
                                                    <p>Votre {this.props.estimationState.estimation.bien === 'appartement' ? 'appartement' : 'villa'} proche de</p>
                                                    <h3>{this.state.formattedAddress}</h3>
                                                </div>
                                                <div className="results-caracterictics results-caracterictics--surface">
                                                <span><i className="fas fa-bed"></i> {this.props.estimationState.estimation.typologie}</span>

                                                <span className="info-icon-display">
                                                    <OverlayTrigger trigger="hover" placement="right" overlay={popover_surface}>
        
                                                    <span class="surface--info"><i className="fas fa-ruler-combined"></i>
                                                    {this.props.estimationState.estimation.bien === 'appartement' ? surfaceeffective : this.props.estimationState.estimation.surfaceterrain}
                                                    m²
                                                    </span>
                                                        
                                                    </OverlayTrigger>
                                                    </span>
                                                  {this.props.estimationState.estimation.bien=== 'appartement' ? (
                                                    <span><i className="fas fa-bath"></i> {this.props.estimationState.estimation.sdb}</span>
                                                  ) : ("") }
                                                    </div>
                                                <EstimationDisplayMap viewport={{latitude : 33.57604334428835, longitude : -7.645979605103669, zoom : 8}} markers={[this.props.estimationState.estimation.localisation]} />

                                            </div>
                                        </div>
                                        <div className = "results-middle">
                                            <div className="results-caracterictics starsPrecision">
                                            
                                            {this.props.estimationState.estimation.precision === 0 ? (
                                                <div className="starsShow">
                                                        <OverlayTrigger trigger="hover" placement="right" overlay={popover}>
                                                        <span className="info-icon-display"><InfoIcon/></span>
                                                    </OverlayTrigger>
                                                    <img src={filledNotStar} alt='star'></img>
                                                    <img src={filledNotStar} alt='star'></img>
                                                    <img src={filledNotStar} alt='star'></img>
                                                    <img src={filledNotStar} alt='star'></img>
                                                    <img src={filledNotStar} alt='star'></img>
                                                </div>
                                            ) : this.props.estimationState.estimation.precision === 1 ? (
                                                <div className="starsShow">
                                                        <OverlayTrigger trigger="hover" placement="right" overlay={popover}>
                                                        <span className="info-icon-display"><InfoIcon/></span>
                                                    </OverlayTrigger>
                                                    <img src={filledStar} alt='star'></img>
                                                    <img src={filledNotStar} alt='star'></img>
                                                    <img src={filledNotStar} alt='star'></img>
                                                    <img src={filledNotStar} alt='star'></img>
                                                    <img src={filledNotStar} alt='star'></img>
                                                </div>
                                            ) : this.props.estimationState.estimation.precision === 2 ? (
                                                <div className="starsShow">
                                                        <OverlayTrigger trigger="hover" placement="right" overlay={popover}>
                                                        <span className="info-icon-display"><InfoIcon/></span>
                                                    </OverlayTrigger>
                                                    <img src={filledStar} alt='star'></img>
                                                    <img src={filledStar} alt='star'></img>
                                                    <img src={filledNotStar} alt='star'></img>
                                                    <img src={filledNotStar} alt='star'></img>
                                                    <img src={filledNotStar} alt='star'></img>
                                                </div>
                                            ): this.props.estimationState.estimation.precision === 3 ? (
                                                <div className="starsShow">
                                                        <OverlayTrigger trigger="hover" placement="right" overlay={popover}>
                                                        <span className="info-icon-display"><InfoIcon/></span>
                                                    </OverlayTrigger>
                                                    <img src={filledStar} alt='star'></img>
                                                    <img src={filledStar} alt='star'></img>
                                                    <img src={filledStar} alt='star'></img>
                                                    <img src={filledNotStar} alt='star'></img>
                                                    <img src={filledNotStar} alt='star'></img>
                                                </div>
                                            ): this.props.estimationState.estimation.precision === 4 ? (
                                                <div className="starsShow">
                                                        <OverlayTrigger trigger="hover" placement="right" overlay={popover}>
                                                        <span className="info-icon-display"><InfoIcon/></span>
                                                    </OverlayTrigger>
                                                    <img src={filledStar} alt='star'></img>
                                                    <img src={filledStar} alt='star'></img>
                                                    <img src={filledStar} alt='star'></img>
                                                    <img src={filledStar} alt='star'></img>
                                                    <img src={filledNotStar} alt='star'></img>
                                                </div>
                                            ): (
                                                <div className="starsShow">
                                                        <OverlayTrigger trigger="hover" placement="right" overlay={popover}>
                                                        <span className="info-icon-display"><InfoIcon/></span>
                                                    </OverlayTrigger>
                                                    <img src={filledStar} alt='star'></img>
                                                    <img src={filledStar} alt='star'></img>
                                                    <img src={filledStar} alt='star'></img>
                                                    <img src={filledStar} alt='star'></img>
                                                    <img src={filledStar} alt='star'></img>
                                                </div>
                                            )}
                                        </div>
                                        <div className="results-estimate-price">
                                            <p className="estimatedPrice">Prix estimé</p>
                                            <h3>
                                                    {
                                                    !this.props.estimationState.estimation.estimationByUser ?
                                                    (
                                                    
                                                        <CountUp duration={1}
                                                        separator=" "
                                                        decimal=","
                                                        end={Math.round(this.props.estimationState.estimation.estimation.toFixed() / 1000) * 1000} /> 
                                                    
                                                    )
                                                    :
                                                    (
                                                        <CountUp duration={1}
                                                        separator=" "
                                                        decimal=","
                                                        end={Math.round(this.props.estimationState.estimation.estimationByUser.toFixed())} /> 
                                                    )
                                                    
                                                    } MAD
                                                </h3> 
                                            <p className="estimatedPriceM2">
                                                <CountUp duration={1}
                                                    separator=" "
                                                    decimal="," end={
                                                        Math.round(
                                                            this.props.estimationState.estimation.estimation.toFixed() / surfaceeffective ) }/>
                                                {" "}MAD / m2
                                            </p>
                                        </div>
                                        </div>
                                        <div className="priceBarContainer">
                                            <div className="priceBarPrices">
                                                <div className="priceBarPricesLow">
                                                    <div className="priceBarPricesLowTitle">
                                                        Prix bas
                                                    </div>
                                                    <div className="priceBarPricesLowPrice">
                                                    <CountUp duration={1}
                                                            separator=" "
                                                            decimal="," end={
                                                    Math.round(
                                                            (this.props.estimationState.estimation.estimation.toFixed() * 
                                                            (1 - (this.props.estimationState.estimation.variateur / 100))) /
                                                            1000
                                                        ) * 1000
                                                    } /> MAD
                                                    </div>
                                                </div>
                                                <div className="priceBarPricesHigh">
                                                    <div className="priceBarPricesHighTitle">
                                                        Prix haut
                                                    </div>
                                                    <div className="priceBarPricesHighPrice">
                                                    <CountUp duration={1}
                                                            separator=" "
                                                            decimal="," end={
                                                            Math.round(
                                                                (this.props.estimationState.estimation.estimation.toFixed() *
                                                                (1 + (this.props.estimationState.estimation.variateur / 100))) /
                                                                1000
                                                            ) * 1000
                                                        } /> MAD
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="priceBarBar"></div>
                                        </div>

                                        <div className="avisContainer big-screen">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="estimationAvis">
                                                        <h3>L’estimation me semble</h3>
                                                        <div className="form-group" style={{marginBottom: '15px'}}>
                                                            <SelectBox
                                                                id="avis"
                                                                defaultValue={this.state.avis}
                                                                items={[
                                                                    { value: 'Correcte', id: 'Correcte' },
                                                                    { value: 'Basse', id: 'Basse' },
                                                                    { value: 'Haute', id: 'Haute' },
                                                                ]}
                                                                zIndex="3"
                                                                onSelectChange={(item, id) => {
                                                                    this.setState({
                                                                        avis: item.value
                                                                    });
                                                                }}
                                                            />
                                                        </div>

                                                            { this.state.avis !== "Correcte" ?
                                                            (<>
                                                                <div className="form-group">
                                                                <TextField InputProps={{
                                        inputComponent: NumberFormatCustom,
                                    }} error={this.state.estimationAvisError} min="0" id="outlined-basic" label="Estimation" variant="outlined" onChange={(e) => {this.setState({ ...this.state, EstimationPrice: e.target.value, estimationAvisError: e.target.value==="" })}} 
                                    helperText = {this.state.estimationAvisError ? ("Champs requis") : ""}
                                    />
                                                         
                                                                </div>
                                                                <div className="form-group">
                                                                <TextField type="search" error={this.state.EstimationPriceTextError} min="0" id="outlined-basic" label="Pour quelles raisons ?" variant="outlined" onChange={(e) => {this.setState({ ...this.state, EstimationPriceText: e.target.value, EstimationPriceTextError: e.target.value==="" })}} 
                                    helperText = {this.state.EstimationPriceTextError ? ("Champs requis") : ""}
                                    />
                                                         
                                                            </div>
                                                            </>
                                                            ): ''
                                                            }
                                                        <div className="form-group">
                                                            <button
                                                            className="button button-primary"
                                                            type="button"
                                                            onClick={this.addAvis}>
                                                                <i class="fa fa-paper-plane-o"></i>
                                                                Envoyer mon avis
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="serviceAccompagnement">
                                                        <h3>Des questions sur votre projet </h3>
                                                        <p>Bénéficiez de l'accompagnement d'un professionnel recommandé par agenz pour ses performances commerciales</p>
                                                        <div className="form-group">
                                                            <button
                                                            className="button button-primary"
                                                            type="button"
                                                            onClick={this.meRappeler}>
                                                                <i
                                                                class="fa fa-phone"
                                                                style={{
                                                                    'margin-right': '14px'
                                                                }}></i>
                                                                Me faire rappeler
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-12" style={{marginTop : '20px'}}>
                                                    <div className="serviceAccompagnement">
                                                        <h3>Partagez l'estimation </h3>
                                                        <p>Informez vos clients, partenaires ou votre entourage de la valeur estimée de votre bien</p>
                                                        {/* {this.state.shareLink || this.state.shareLink ?  */}

                                                        <div className="form-group">
                                                        {/* <button 
                                                    onClick={() => this.shareEstimation(this.props.estimationState.estimationId)}
                                                    type="button" 
                                                    className="button button-primary">
                                                        
                                                       {this.state.loading && this.state.action === 'share' ? ( <Spinner animation="border" className = "text-white" size="sm"/>): 'Partager'

                                                       }
                                                        </button>  */}


                                                        {this.state.loading && this.state.action === 'share' ? ( 
               <button 
               onClick={() => this.shareEstimation(this.props.estimationState.estimationId)}
               type="button" 
               className="button button-primary"> <Spinner animation="border" className = "text-white" size="sm"/> </button>): 
                                          (this.state.shareLink  ? (
                                

                                          
       
       
       <div className='col-md-12'>
       <div className='socials-medias share-estimation-container'>
           <div className='facebook'><a href={`https://www.facebook.com/sharer/sharer.php?u=${this.state.shareLink || window.location.origin + '/estimations?token=' + this.state.shareLink}`}><i className='fab fa-facebook-square'></i></a></div>
           <div className='facebook messenger-share'><a href={`https://www.facebook.com/dialog/send?app_id=664750221058963&amp;link=${this.state.shareLink || window.location.origin + '/estimations?token=' + this.state.shareLink}&amp;redirect_uri=${this.state.shareLink || window.location.origin + '/estimations?token=' + this.state.shareLink}&`}><i class="fab fa-facebook-messenger"></i></a></div>
           <div className='whatsapp'><a href={`whatsapp://send?text=${this.state.shareLink || window.location.origin + '/estimations?token=' + this.state.shareLink}`}><i className='fab fa-whatsapp-square'></i></a></div>
           <div className='twitter'><a href={`https://twitter.com/intent/tweet?url=${this.state.shareLink || window.location.origin + '/estimations?token=' + this.state.shareLink}&text=https://www.facebook.com/sharer/sharer.php?u=${this.state.shareLink || window.location.origin + '/estimations?token=' + this.state.shareLink}`}><i className='fab fa-twitter-square'></i></a></div>
           <div className='linked'><a href={`https://www.linkedin.com/shareArticle?mini=true&url=${this.state.shareLink || window.location.origin + '/estimations?token=' + this.state.shareLink}&title=&summary=&source=`}><i className='fab fa-linkedin'></i></a></div>
       </div>

   </div>
                                        
                                            ) :         <button 
                                            onClick={() => this.shareEstimation(this.props.estimationState.estimationId)}
                                            type="button" 
                                            className="button button-primary">Partager </button>
                                          )

       }

                                                        {this.state.shareLink  ? 

(
    <>
    <p>Ou cliquez sur <span>Copier</span> pour copier le lien de partage</p>
    <div className = "shareLink">
        <div className = "copy-link">
            {this.state.shareLink || window.location.origin + '/estimations?token=' + this.state.shareLink}
        </div>
        <CopyToClipboard text={this.state.shareLink || window.location.origin + '/estimations?token=' + this.state.shareLink}
            onCopy={() => this.setState({copied: true, open: true}) }>
            <span className = "copy button button-primary">Copier</span>
        </CopyToClipboard>
            
        
    
        <Snackbar
                autoHideDuration={6000}
        open={this.state.open}
        onClose={this.handleClose}
        TransitionComponent="TransitionUp"
        message="Copié !"
        action ={   <IconButton size="small" aria-label="close" color="inherit" onClick={this.handleClose}>
        <CloseIcon fontSize="small" />
      </IconButton>}
        />
    </div>
    
    </>
)
: ('')
}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-12" style={{marginTop : '20px'}}>
<ListingAgencies />
                                                    </div>

                                            </div>
                                        </div>

                                        <div className="avisContainer small-screen">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <h3>Des questions sur votre projet </h3>
                                                        <p>Bénéficiez gratuitement du service d'accompagnement d'agenz en cliquant sur "me faire rappeler"</p>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-12">
                                                    <h3>Partagez l'estimation </h3>
                                                        <p>Informez vos clients, partenaires ou votre entourage de la valeur estimée de votre bien</p>
                                                        {/* {this.state.shareLink || this.state.shareLink ?  */}

                                                        <div className="form-group">
                                                        {this.state.loading && this.state.action === 'share' ? ( 
               <button 
               onClick={() => this.shareEstimation(this.props.estimationState.estimationId)}
               type="button" 
               className="button button-primary"> <Spinner animation="border" className = "text-white" size="sm"/> </button>): 
                                          (this.state.shareLink  ? (
                                

                                          
       
       
       <div className='col-md-12'>
       <div className='socials-medias share-estimation-container'>
           <div className='facebook'><a href={`https://www.facebook.com/sharer/sharer.php?u=${this.state.shareLink || window.location.origin + '/estimations?token=' + this.state.shareLink}`}><i className='fab fa-facebook-square'></i></a></div>
           <div className='facebook messenger-share'><a href={`https://www.facebook.com/dialog/send?app_id=664750221058963&amp;link=${this.state.shareLink || window.location.origin + '/estimations?token=' + this.state.shareLink}&amp;redirect_uri=${this.state.shareLink || window.location.origin + '/estimations?token=' + this.state.shareLink}&`}><i class="fab fa-facebook-messenger"></i></a></div>
           <div className='whatsapp'><a href={`whatsapp://send?text=${this.state.shareLink || window.location.origin + '/estimations?token=' + this.state.shareLink}`}><i className='fab fa-whatsapp-square'></i></a></div>
           <div className='twitter'><a href={`https://twitter.com/intent/tweet?url=${this.state.shareLink || window.location.origin + '/estimations?token=' + this.state.shareLink}&text=https://www.facebook.com/sharer/sharer.php?u=${this.state.shareLink || window.location.origin + '/estimations?token=' + this.state.shareLink}`}><i className='fab fa-twitter-square'></i></a></div>
           <div className='linked'><a href={`https://www.linkedin.com/shareArticle?mini=true&url=${this.state.shareLink || window.location.origin + '/estimations?token=' + this.state.shareLink}&title=&summary=&source=`}><i className='fab fa-linkedin'></i></a></div>
       </div>

   </div>
                                        
                                            ) :         <button 
                                            onClick={() => this.shareEstimation(this.props.estimationState.estimationId)}
                                            type="button" 
                                            className="button button-primary">Partager </button>
                                          )

       }

                                                        {this.state.shareLink  ? 

(
    <>
    <p>Ou cliquez sur <span>Copier</span> pour copier le lien de partage</p>
    <div className = "shareLink">
        <div className = "copy-link">
            {this.state.shareLink || window.location.origin + '/estimations?token=' + this.state.shareLink}
        </div>
        <CopyToClipboard text={this.state.shareLink || window.location.origin + '/estimations?token=' + this.state.shareLink}
            onCopy={() => this.setState({copied: true, open: true}) }>
            <span className = "copy button button-primary">Copier</span>
        </CopyToClipboard>
            
        
    
        <Snackbar
                autoHideDuration={6000}
        open={this.state.open}
        onClose={this.handleClose}
        TransitionComponent="TransitionUp"
        message="Copié !"
        action ={   <IconButton size="small" aria-label="close" color="inherit" onClick={this.handleClose}>
        <CloseIcon fontSize="small" />
      </IconButton>}
        />
    </div>
    
    </>
)
: ('')
}
                                                        </div>
                                                    </div>
                                                </div>
                                        </div>
                                    </div>
                                </div>
                                <div className ="display-button small-screen">
                                    <button
                                    className="button button-secondary secondaryCustom bouton-avis-mobile"
                                    type="button"
                                    onClick={this.openAvisMobile}>
                                        <i class="fa fa-paper-plane-o"></i>
                                        Envoyer mon avis
                                    </button>
                                    <button
                                    className="button button-primary primaryyCustom"
                                    type="button"
                                    onClick={this.meRappeler}>
                                        <i class="fa fa-phone"></i>
                                        Me faire rappeler
                                    </button>
                                </div>
                            </div>
                            <div className="information-results">
                                <div>
                                    <h5>Comment est calculée votre estimation ?</h5>
                                </div>
                                <div className="explanations-display">
                                    <div className="explanations-display--icon">
                                        <img src={dataBlue} alt="Estimation de bien immobilier en ligne" className="desktop"></img>
                                        <img src={dataBlue} alt="Estimation de bien immobilier en ligne" className="ipad"></img>
                                        <img src={dataBlue} alt="Estimation de bien immobilier en ligne" className="mobile"></img>
                                    </div>
                                    <div className="explanations-display--title">
                                        Quelques milliers de données analysées
                                    </div>
                                    <div className="explanations-display--text">
                                        Nos bases de données sont mises à jour régulièrement, et sont constituées de milliers de transactions fournies par nos partenaires, mais également d'information socio-démographiques de secteur influençant le marché local. L'équipe d'Agenz s'efforce quotidiennement d'enrichir ses bases de données et de développer de nouveaux outils pour apporter toujours plus de transparence sur le marché
                                    </div>
                                </div>
                                <div className="explanations-display">
                                    <div className="explanations-display--icon">
                                        <img src={houseBlue} alt="Estimation de bien immobilier en ligne"  className="desktop"></img>
                                        <img src={houseBlue} alt="Estimation de bien immobilier en ligne"  className="ipad"></img>
                                        <img src={houseBlue} alt="Estimation de bien immobilier en ligne"  className="mobile"></img>
                                    </div>
                                    <div className="explanations-display--title">
                                        Notre algorithme estime votre bien
                                    </div>
                                    <div className="explanations-display--text">
                                        Grâce à des algorithmes de Machine Learning, AgenZ calcule un prix au m<sup>2</sup> correspondant à la localisation et à la consistance du bien immobilier qui vous intéresse. Ce prix au m<sup>2</sup> est affiné suivant les caractéristiques du bien renseigné dans le formulaire. Cette première estimation servira à vous donner une vision précise des prix pratiqués dans votre secteur, pour vous aider à établir un budget cohérent et réussir votre projet immobilier dans un délai raisonnable
                                    </div>
                                </div>
                                <div className="explanations-display">
                                    <div className="explanations-display--icon">
                                        <img src={successBlue} alt="Estimation de bien immobilier en ligne" className="desktop"></img>
                                        <img src={successBlue} alt="Estimation de bien immobilier en ligne"  className="ipad"></img>
                                        <img src={successBlue} alt="Estimation de bien immobilier en ligne"  className="mobile"></img>
                                    </div>
                                    <div className="explanations-display--title">
                                        Réussir votre estimation
                                    </div>
                                    <div className="explanations-display--text">
                                    Notre estimation en ligne ne peut se substituer à la visite d'un expert de l'immobilier, qui tiendra compte de critères ne pouvant être intégrés dans nos modèles (potentiel de développement de la zone, diagnostiques techniques du bien,...). Nous avons pour cela noué des partenariats avec les professionnels les plus performants et les plus fiables du marché pour faire de votre projet une réussite
                                    </div>
                                </div>
                            </div>
                            <div className="listing-result-small">
                            <ListingAgencies />
                            </div>

                        </div>
                        ) : (
                            <div>
                        <div className="row  left-side-map">
                            <div className="col-sm-12">
                                <div  className="results-ready">
                                    {/* <div className="results-ready-icon">
                                        <img src={handEstimation} alt=""></img>
                                    </div> */}
                                    <div>
                                        <h3>Votre estimation est prête !</h3>
                                        <p>
                                        La création de votre compte est nécessaire pour consulter votre estimation. 
                                        Vous pourrez également y suivre l'évolution du prix des biens estimés.
                                        </p>
                                    </div>
                                    {this.state.loginShow === false ? (
                                        <div>
                                            <div className="row">
                                                <div className="col-12">
                                                <TextField variant="outlined" error={this.state.errorSurname} size="small" id="lastname" label="Nom" type="search" onChange={(e) => {this.setState({ registration: { ...this.state.registration, surname: e.target.value} })}}
 />
                                                </div>
                                                <div className="col-12">
                                                    {/* <input 
                                                    className="form-control" 
                                                    type="text"  
                                                    placeholder="Prénom"
                                                    id="firstname"
                                                    onChange={(e) => {this.setState({ registration: { ...this.state.registration, name: e.target.value} })}}
                                                    /> */}
   <TextField variant="outlined" error={this.state.errorName} size="small" id="firstname" label="Prénom" type="search" onChange={(e) => {this.setState({ registration: { ...this.state.registration, name: e.target.value} })}}
 />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                            <div
                                            className="col-12"
                                            style={{
                                                'margin-bottom': '10px'
                                            }}>
                                                {/* <PhoneInput
                                                    defaultCountry="MA"
                                                    id="telephone"
                                                    placeholder="Numéro de téléphone"
                                                    value={this.state.telephone}
                                                    onChange={(e) => {this.setState({registration: { ...this.state.registration, phone: e}})}}/> */}

                    <div className="col  col--number--estimation-display">
                                                          <MuiPhoneNumber
                                                          error={this.state.errorPhone}
                    name="phoneNumber"
                    label="Numéro de téléphone"
                    id="telephone"
                    data-cy="user-phone"
                    defaultCountry={"ma"}
                    value={this.props.estimationState.estimation.telephone === '0' ? '' : this.props.estimationState.estimation.telephone}
                    onChange={(e) => {this.setState({registration: { ...this.state.registration, phone: e}})}}/>
                  </div>
                                            </div>
                                                <div className="col-12">
                                                    {/* <input 
                                                    className="form-control" 
                                                    type="email"  
                                                    placeholder="Email*"
                                                    id="email"
                                                    onChange={(e) => {this.setState({ registration: { ...this.state.registration, email: e.target.value} })}}
                                                    /> */}  
                                                     <TextField variant="outlined" error={this.state.errorMail} size="small" id="email" label="Adresse mail" type="search" onChange={(e) => {this.setState({ registration: { ...this.state.registration, email: e.target.value.trim()} })}}
 />
                                                </div>
                                                <div className="col-12 col-12--password">
                                                    {/* <input 
                                                    className="form-control" 
                                                    type="password"  
                                                    placeholder="Mot de passe*"
                                                    id="password"
                                                    onChange={(e) => {this.setState({ registration: { ...this.state.registration, password: e.target.value} })}}
                                                    /> */}
                                                       <TextField variant="outlined" error={this.state.errorPassword} size="small" id="password" label="Mot de passe" type="password" onChange={(e) => {this.setState({ registration: { ...this.state.registration, password: e.target.value} })}}
 />
                                                </div>
                                                <Grid container spacing={1}>
                                                    <Grid item xs={12}>
                                                    <div className="checkbox-item-container">
                                            <div className="checkbox-item--inner">
                                                <div className="checkbox-input-container">
                                                    <Checkbox
                                                    size='small'
                                                        checked={this.state.consent}
                                                        onChange={(e) => {
                                                            this.handleCheckConsent()
                                                        }}
                                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                                    /> </div>
                                                <div className="checkbox-label-container">
                                                    <span className="checkbox-laber">En cliquant sur "Voir mon estimation", j'accepte la <Link to="/conditions-d-utilisation">politique de confidentialité</Link> et les <Link to="/conditions-d-utilisation">Conditions générales d'utilisation</Link></span><br />
                                                    <span className="checkbox-label cndp-disclaimer">Conformément à la loi 09-08, vous disposez d'un droit d'accès, de rectification, et d'opposition au traitement de vos données persionnelles. Vous pouvez exercer ce droit en nous adressant un courrier 46, Boulevard Zerktouni, Casablanca. Ce traitement à été autorisé par la CNDP au titre de l'autorisation N° D-460/2021</span>

                                                </div>
                                            </div>
                                        </div>
                                        <CSSTransition appear={true} unmountOnExit in={this.state.consentError} timeout={300} classNames="StepperRegister">
                            <div className="error-message-container error-signup-consent">
                                <p className="error-message">Veuillez accepter les CGU</p>
                            </div>
                        </CSSTransition>
                                                    </Grid>
                                                </Grid>
                                              
                                            </div>

                                            <div className="form-group text-center form-group--button">
                                                <button type="button" className="button button-primary btn--estimation" onClick={() => {this.signUp()}}>
                                                    Voir mon estimation
                                                </button>
                                                <div className="account-yet" onClick={this.handleClickOpenLoginModal}>
                                                    <span>J’ai déjà un compte</span>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                    <div className="text-center">
                                        <div className="form-group row form--login-estimation">
                                            <div className="col-12">
                                                {/* <input 
                                                className="form-control" 
                                                type="email"  
                                                placeholder="Email"
                                                id="email"
                                                onChange={(e) => {this.setState({ login: { ...this.state.login, email: e.target.value} })}}
                                                /> */}
     <TextField variant="outlined" error={this.state.errorMail} size="small" id="email" label="Email"  onChange={(e) => {this.setState({ login: { ...this.state.login, email: e.target.value.trim()} })}}/>
                                            </div>
                                            <div className="col-12">
                                                {/* <input 
                                                className="form-control" 
                                                type="password"  
                                                placeholder="Mot de passe"
                                                id="password"
                                                onChange={(e) => {this.setState({ login: { ...this.state.login, password: e.target.value} })}}
                                                /> */}
     <TextField variant="outlined" error={this.state.errorPassword} size="small" id="password" label="Mot de passe" type="password" onChange={(e) => {this.setState({ login: { ...this.state.login, password: e.target.value} })}}/>

                                            </div>
                                        </div>
                         
                                        <div className="form-group text-center form--btn">
                                        <CSSTransition appear={true} unmountOnExit in={this.state.incorrectPassword} timeout={300} classNames="StepperRegister">
                            <div className="error-message-container error-signup-consent">
                                <p className="error-message">Mot de passe incorrect</p>
                            </div>
                        </CSSTransition>
                        <CSSTransition appear={true} unmountOnExit in={this.state.unknownUser} timeout={300} classNames="StepperRegister">
                            <div className="error-message-container error-signup-consent">
                                <p className="error-message">Adresse mail introuvable</p>
                            </div>
                        </CSSTransition>
                                            <button className="button button-primary" type="button" onClick={() =>{this.login()}}>
                                                {this.state.loadingLogin ?(<CircularProgress size={20} />) : ('Confirmer')}
                                            </button>
                                            <div className="account-yet" onClick={this.handleClickOpenLoginModal}>
                                                <span>Créer un compte</span>
                                            </div>
                                        </div>
                                    </div>

                        )}
                                </div> 
                            </div>
                        </div>
                        <div className="row right-side-map">
                        <StepperEstimationDisplayRightText />
                                                </div>
                        </div>
                        )}
                    </>

                ) : (
                <div className = "no-access">
                    <div className = "no-access-icone"> 
                        <img src = {errorImage} alt="Estimation de bien immobilier en ligne"  />
                    </div>

                    <div className = "no-access-title"> 
                        Limite d'estimation atteinte
                    </div>

                    <div className = "no-access-message"> 
                        <p>Vous avez effectué vos dix estimations gratuites. </p>
                        <p> Pour obtenir plus d'estimation, veuillez vous inscrire à Agenz Pro</p>    
                    </div>

                    <div className = "no-access-button">
                        <button className = "button button-primary"  type ="button"  onClick={() =>{ 
                            this.setState({open: true})
                        }}>Passez à Agenz Pro</button>
                    </div>
                </div>
               
               )
            }
            
            </div>
                )
            }
            </ThemeProvider>
           </>
        );
    }
}

const mapStateToProps = (state) => {
    const uid = state.auth.uid;
    const email = state.auth.email;
    const loader = state.loading.loading;
    const estimation = state.estimationState;
    const UserEstimation = state.userEstimation;
    const user = state.auth.user
    return {
      email: email,
      uid: uid,
      loader: loader,
      estimationState: estimation,
      estimation:UserEstimation, 
      user : user,
      authenticated : state.auth.authenticated
    };
};

export default connect(mapStateToProps)(withRouter(StepperEstimationDisplay));