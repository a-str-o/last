import React, { Component } from "react";
import './RegisterComponent.scss';

import { Link } from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import { theme } from '../../assets/theme'
import { ThemeProvider } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';


import { connect } from "react-redux";
import { withRouter,Redirect } from "react-router-dom";
import image_immeuble from '../../assets/img/immeuble_maroc.png'
import firebase from '../../Config/FirebaseConfig';
import { CSSTransition } from 'react-transition-group';
import CircularProgress from '@material-ui/core/CircularProgress';
import Axios from 'axios';
import jwtDecode from 'jwt-decode';
import MuiPhoneNumber from "material-ui-phone-number";
import Checkbox from '@material-ui/core/Checkbox';




class RegisterComponent extends Component{

    constructor(props) {
        super(props);
        this.state = {
            passForgot: false,
            email: "",
            password: "",
            emailError : false,
            emailExistError : false,
            passwordError : false,
            emailFormatError : false,
            unknownUser : false,
            incorrectPassword : false,
            loadingLogin : false,
            passreset : false,
            passresetError : false, 
            passresetMessage : "",
            lastname : "", 
            firstname : "", 
            phone : "+212",
            phoneError : false,
            consent : false
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
    isEmail(email) {
        let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    validateRegisterFields(){
        let error = false
        if (
            this.state.email === "") {
            this.setState({ emailError: true })
            error = true
        }
        if (
            !this.isEmail(this.state.email)){
                this.setState({ emailFormatError: true })
                error = true

            }
        
        if (
            this.state.password === "" || this.state.password.length <6) {
            this.setState({ passwordError: true })
            error = true
        }
        if (
            this.state.firstname === "") {
            this.setState({ firstnameError: true })
            error = true
        }
        if (
            this.state.lastname === "") {
            this.setState({ lastnameError: true })
            error = true
        }
        if (
            this.state.phone.length < 10) {
            this.setState({ phoneError: true })
            error = true
        }
        if (
            !this.state.consent) {
            this.setState({ consentError: true })
            error = true
        }
        return (error)
    }

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
            resolve()
        })
        .catch(err => {
            console.log(err)
            console.log(err.response)
            reject()
        })
    })
    }
    login(){   
        return new Promise((resolve,reject)=> {
        const auth = firebase.auth();
        auth.signInWithEmailAndPassword(this.state.email,this.state.password)
        .then((userCredential) => {
          var user = userCredential.user;
          console.log(user)
          user.getIdToken().then((token)=>{
            const decodedToken = jwtDecode(token);
            console.log(decodedToken)
            const FBIdToken = `Bearer ${token}`
            localStorage.setItem('FBIdToken', `Bearer ${token}`)
            Axios.defaults.headers.common['Authorization']= FBIdToken
            this.getUserDetails(decodedToken.user_id).then(() =>{
                this.setState({loadingLogin : false})
                this.props.history.push("/account")
            })

          })
        })
        .catch((error) => {
          
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
    passForgot = () =>{
        Axios.post('https://us-central1-agenz-website-prod.cloudfunctions.net/api/passForgot',{creds: {passForgot : true, email : this.state.email} }).then(result => {
            //console.log(result)
            this.setState({passreset : true})
      
        })
        .catch((err)  => {
          // //console.log(err)
          let errMessage = "Une erreur à eu lieu, veuillez réessayer";
          if(err.response.data.message === "There is no user record corresponding to this identifier. The user may have been deleted."){
            errMessage = "Cette adresse email n'existe pas !"
          }
this.setState({passreset : true, passresetError : true, passresetMessage : errMessage})
        })
    }
    signIn = () => {
        this.setState({unknownUser : false, incorrectPassword : false, loadingLogin : true})
        let error = this.validateRegisterFields();
        if(!error){
            this.setState({loadingLogin : true})
            this.login().then(()=>{
                this.props.history.push("/account")
            })
        }
    }

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
    handleCheckConsent(){

        if (this.state.consent){
            this.setState({consentError : true})
        }
        else{
            this.setState({consentError : false})
        }
        
        this.setState({ consent: !this.state.consent })

        
    }
    Register = () => {
        let creds = {
            email : this.state.email,
firstname : this.state.firstname,
lastname : this.state.lastname,
password : this.state.password,
phone : this.state.phone
        }
        this.setState({unknownUser : false, incorrectPassword : false, loadingLogin : true})
        let error = this.validateRegisterFields();
        if(!error){
            this.setState({loadingLogin : true})
            this.signup(creds).then((ret)=>{
                const FBIdToken = `Bearer ${ret.token}`
                localStorage.setItem('FBIdToken', `Bearer ${ret.token}`)
                Axios.defaults.headers.common['authorization']= FBIdToken
                this.props.dispatch({ type: 'UPDATE_USER', data: {
                  firstName: creds.firstname,
                  lastName: creds.lastname,
                  email:creds.email, 
                  isPro: false,
                  phone: creds.phone
              }});    
                this.props.dispatch({ type: "SIGN_IN_UP", data: 
              
                {
                  firstName: creds.firstname,
                  lastName: creds.lastname,
                  email:creds.email, 
                  isPro: false,
                  phone: creds.phone
              }
              });
                this.props.dispatch({ type: 'SET_AUTHENTICATED' });
                this.props.dispatch({ type: "SIGN_UP" });
                this.props.dispatch({type: "LOADER_FALSE"});
                this.props.history.push("/account")
            })
        }
        else {
            this.setState({unknownUser : false, incorrectPassword : false, loadingLogin : false})
        }
    }
    signup(creds){

        return new Promise( (resolve,reject) =>{
            let ret = {}
            firebase.auth().createUserWithEmailAndPassword(creds.email, creds.password)
            .then (userRes => {
                let userId = userRes.user.uid;
                userRes.user.getIdToken()
             .then((token) => {
                ret.token = token
        
             })
             .catch(err=>{
                console.log(err)
                this.setState({loadingLogin : false, emailError : true})
                if(err.response.code === "auth/email-already-in-use"){
                    this.setState({emailExistError : true})
                }

                reject(err)
                })
             firebase.firestore().collection('users').doc(userId).set({
                firstName: creds.firstname,
                lastName: creds.lastname,
                email:creds.email, 
                isPro: false,
                phone: creds.phone
            })
            .then((result) => {
                firebase.firestore().collection('users').doc(userId).get()
                .then(user=> {
                    console.log(user)
                    ret.data = user.data()
                    console.log(ret)
                    this.setState({loadingLogin : false})
                    resolve(ret)
                }).catch(err=>{
                    console.log(err)
                    this.setState({loadingLogin : false})
                    reject(err)

        
                })
            })
            .catch(err=>{
                console.log(err)
                if(err.code === "auth/email-already-in-use"){
                    this.setState({emailExistError : true})
                }
                this.setState({loadingLogin : false})
                reject(err)
            })
            
        }).catch(err=>{
            console.log(err)
            if(err.code === "auth/email-already-in-use"){
                this.setState({emailExistError : true})
            }
            this.setState({loadingLogin : false})
            reject(err)
        })
        })
    }

    

    componentDidMount = () => { window.scrollTo(0, 0); }
    
    render() {
        if( this.props.authenticated ) {
            return <Redirect to="/account"/>
        } else {
            return (
        <div className="login-page--container">          
        <Grid container spacing={0}>
            <Grid item xs={12} md={6}>
                <div className="login-left-container">
                    <div className="login-left-inner-container">
            <div className="welcome-title--container">
                <div className="welcome-title-inner">
                    <h1 className="welcome-title">Bienvenue ! </h1>
                </div>
            </div>
            <div className="welcome-text-container">
                <div className="welcome-text-inner">
                    <p className="welcome-text">{!this.state.passForgot ? ("Inscrivez-vous pour accéder à toutes les fonctionnalités d'agenz") : ("Entrez votre email et recevez un email de reinitialisation de votre mot de passe.")}</p>
                </div>
            </div>
                    <div className="login-form">
                        <div  className="text-center">
                                {
                                    !this.state.passForgot ? (
                                        <>
     
                                            
                                            <ThemeProvider theme={theme}>
                            <Grid container spacing={6}>
                            <Grid item xs={12} md={12}>
                                    <TextField variant="outlined" size="small" id="lastname" label="Nom" type="search"
                                        value={this.state.lastname}
                                        onChange={(e) => { this.setState({ ...this.state, lastname: e.target.value, lastnameError: e.target.value===""})}}
                                        error={this.state.lastnameError || this.state.lastnameFormatError}
                                helperText = {this.state.lastnameError ? ("Champs requis") : (this.state.lastnameFormatError ? ("Format incorrect") : "")}
                            
                                    />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <TextField variant="outlined" size="small" id="firstname" label="Prénom" type="search"
                                        value={this.state.firstname}
                                        onChange={(e) => { this.setState({ ...this.state, firstname: e.target.value, firstnameError: e.target.value==="" }) }}
                                        error={this.state.firstnameError}
                                helperText = {this.state.firstnameError ? ("Champs requis") : (this.state.firstnameFormatError ? ("Format incorrect") : "")}
                            
                                    />
                                </Grid>
                                <Grid item xs={12} md={12}>

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
                                            <CSSTransition appear={true} unmountOnExit in={this.state.phoneError} timeout={300} classNames="StepperRegister">
                            <div className="error-message-container">
                                <p className="error-message">Mot de passe incorrect</p>
                            </div>
                        </CSSTransition>
                                                    </Grid>

                                <Grid item xs={12} md={12}>
                                    <TextField variant="outlined" size="small" id="email" label="Adresse email" type="email"
                                        value={this.state.email}
                                        onChange={(e) => { this.setState({ ...this.state, email: e.target.value, emailError: e.target.value==="", emailExistError : false, emailFormatError: !this.isEmail(e.target.value) }) }}
                                        error={this.state.emailError || this.state.emailFormatError || this.state.emailExistError }
                                helperText = {this.state.emailError ? ("Champs requis") : (this.state.emailFormatError ? ("Format incorrect") : "")}
                            
                                    />
                                </Grid>
                                <CSSTransition appear={true} unmountOnExit in={this.state.emailExistError} timeout={300} classNames="StepperRegister">
                            <div className="error-message-container">
                                <p className="error-message">Cette adresse email est déjà utilisé</p>
                            </div>

                        </CSSTransition>
                                <Grid item xs={12} md={12}>
                                    <TextField variant="outlined" size="small" id="password" label="Mot de passe" type="password"
                                        value={this.state.password}
                                        onChange={(e) => { this.setState({ ...this.state, password: e.target.value, passwordError: e.target.value==="" }) }}
                                        error={this.state.passwordError}
                                helperText = {this.state.passwordError ? ("Champs requis, au moins 6 caractères") : ""}
                            
                                    />
                                </Grid>
                        <CSSTransition appear={true} unmountOnExit in={this.state.unknownUser} timeout={300} classNames="StepperRegister">
                            <div className="error-message-container">
                                <p className="error-message">Aucun compte ne correspond à cette adresse email</p>
                            </div>

                        </CSSTransition>
                        <CSSTransition appear={true} unmountOnExit in={this.state.incorrectPassword} timeout={300} classNames="StepperRegister">
                            <div className="error-message-container">
                                <p className="error-message">Mot de passe incorrect</p>
                            </div>
                        </CSSTransition>
                        <Grid item xs={12}>
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
                                                    <span className="checkbox-laber">En cliquant sur 'S'inscrire', j'accepte la <Link to="/conditions-d-utilisation">politique de confidentialité</Link> et les <Link to="/conditions-d-utilisation">Conditions générales d'utilisation</Link></span><br/>                                         
                                                    <span className="checkbox-label cndp-disclaimer">Conformément à la loi 09-08, vous disposez d'un droit d'accès, de rectification, et d'opposition au traitement de vos données persionnelles. Vous pouvez exercer ce droit en nous adressant un courrier 46, Boulevard Zerktouni, Casablanca. Ce traitement à été autorisé par la CNDP au titre de l'autorisation N° D-460/2021</span>

                                                </div>
                                            </div>
                                        </div>
                                        <CSSTransition appear={true} unmountOnExit in={this.state.consentError} timeout={300} classNames="StepperRegister">
                            <div className="error-message-container">
                                <p className="error-message">Veuillez accepeter les CGU</p>
                            </div>
                        </CSSTransition>
                                    </Grid>
                        </Grid>
                                <Grid item xs={12}>
                                    <div className="login-button--container">
                                        <button className="btn btn-primary login-button" onClick={this.Register}>{this.state.loadingLogin ?(<CircularProgress size={20} />) : "S'inscrire"}</button>
                                    </div>
                                </Grid>
                                </Grid>    
                                </ThemeProvider>
                                       
                                        </>
                                    ) : (
                                        <>
                                        <ThemeProvider theme={theme}>
                                            <Grid container spacing={6}>
                                                             <Grid item xs={12} md={12}>
                                    <TextField variant="outlined" size="small" id="email" label="Adresse email" type="email"
                                        value={this.state.email}
                                        onChange={(e) => { this.setState({ ...this.state, email: e.target.value }) }}
                                        error={this.state.emailError}
                                helperText = {this.state.emailError ? ("Champs requis") : ""}
                            
                                    />
                                                            <CSSTransition appear={true} unmountOnExit in={this.state.passreset} timeout={300} classNames="StepperRegister">
                            <div className="error-message-container">
                                {this.state.passresetError ? (<p className="error-message">{this.state.passresetMessage}</p>) : (<p className="sucess-message">Un lien de réinitialisation vous a été envoyé</p>)}
                            </div>
                        </CSSTransition>
                                </Grid>
                              <Grid item xs={12}>
                                    <div className="login-button--container">
                                        <button className="btn btn-primary login-button" onClick={this.passForgot}>Réinitialiser</button>
                                    </div>
                                </Grid>
                                </Grid>
                                </ThemeProvider>
                                            
    
                                       
                                        </>
                                    )
                                }
                        </div>
                        { !this.state.passForgot ? (
                                                                                <div className="justify-content login--bottom-links">
                                                                                {/* <div className="have-not-account" >
                                                                                    Pas encore de compte?  <Link to='/register'>Créer</Link>
                                                                                </div> */}
                                                                                {/* <div className="pass-forgot" >
                                                                                    <a  onClick={this.setPassForgot}>Mot de passe oublie?</a>
                                                                                </div> */}
                                                                                <div className="pass-forgot" >
                                                <p className="to-new-account"> Vous avez déjà un compte ? <Link to = "/login"> Connectez-vous </Link> </p>
                                                </div>
                                                                            </div>
                        ) :
                        (
                            <div> </div>
                        )

                        }
                    </div>
                    </div>
                    </div>
            </Grid>          
            <Grid item xs={12} md={6}>
                <div className="login-right-side-container" style={{background : `url(${image_immeuble})` }}>
                </div>
            </Grid>
                    </Grid>
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

export default connect(mapStateToProps)(withRouter(RegisterComponent));