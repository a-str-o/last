import React, { Component } from "react";
import './LoginComponent.scss';
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




class LoginComponent extends Component{

    constructor(props) {
        super(props);
        this.state = {
            passForgot: false,
            email: "",
            password: "",
            emailError : false,
            passwordError : false,
            emailFormatError : false,
            unknownUser : false,
            incorrectPassword : false,
            loadingLogin : false,
            passreset : false,
            passresetError : false, 
            passresetMessage : ""
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
    validateLoginFields(){
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
            this.state.password === "") {
            this.setState({ passwordError: true })
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
            if(res.data().isPro){
                this.props.dispatch({ type: 'SET_AUTHENTICATED_PRO' });
              }
          // update the user with the values of we got from Firebase
               this.props.dispatch({ type: 'SET_AUTHENTICATED' });
              this.props.dispatch({ type: 'UPDATE_USER', data: res.data() });
              this.props.dispatch({ type: "SIGN_IN", data: res.data()});
              this.props.dispatch({type: "LOADER_FALSE"});
            resolve(res.data())
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
            this.getUserDetails(decodedToken.user_id).then((userData) =>{
                this.setState({loadingLogin : false})
                if(userData.isPro){
                    this.props.history.push("/pro-space")
                }
                else{
                    this.props.history.push("/account")
                }
                
                resolve()
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
        let error = this.validateLoginFields();
        if(!error){
            this.setState({loadingLogin : false})
            this.login().then(()=>{
            })
        }
        else{
            this.setState({loadingLogin : false})
        }
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
                    <p className="welcome-text">{!this.state.passForgot ? ("Entrez dans votre espace client et gérez vos dossiers") : ("Entrez votre email et recevez un email de reinitialisation de votre mot de passe.")}</p>
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
                                    <TextField variant="outlined" size="small" id="email" label="Adresse email" type="email"
                                        value={this.state.email}
                                        onChange={(e) => { this.setState({ ...this.state, email: e.target.value, emailError: e.target.value==="", emailFormatError: !this.isEmail(e.target.value) }) }}
                                        error={this.state.emailError || this.state.emailFormatError}
                                helperText = {this.state.emailError ? ("Champs requis") : (this.state.emailFormatError ? ("Format incorrect") : "")}
                            
                                    />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <TextField variant="outlined" size="small" id="password" label="Mot de passe" type="password"
                                        value={this.state.password}
                                        onChange={(e) => { this.setState({ ...this.state, password: e.target.value, passwordError: e.target.value==="" }) }}
                                        error={this.state.passwordError}
                                helperText = {this.state.passwordError ? ("Champs requis") : ""}
                            
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
                                    <div className="login-button--container">
                                        <button className="btn btn-primary login-button" onClick={this.signIn}>{this.state.loadingLogin ?(<CircularProgress size={20} />) : "Se connecter"}</button>
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
                                                                                <div className="pass-forgot" >
                                                                                    <p className="link-login-style" onClick={this.setPassForgot}>Mot de passe oublie?</p>
                                                                                </div>
                                                                                <div className="pass-forgot" >
                                                <p className="to-new-account"> Vous n'avez pas encore de compte ? <Link to = "/register"> Créer votre compte </Link> </p>
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

export default connect(mapStateToProps)(withRouter(LoginComponent));