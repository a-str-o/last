import React, { Component } from 'react';
import Footer from '../../Components/Footer/Footer';

import OffresProTimeline from '../../Components/OffresProTimeline/OffresProTimeline';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import SelectBox from '../../Elements/select-box/index';
import firebase from '../../Config/FirebaseConfig';
import './style.scss';
import logo_pro from '../../assets/img/Logo_hd_PRO.png';

import {theme} from '../../assets/theme'
import {ThemeProvider} from '@material-ui/core/styles';
import MuiPhoneNumber from "material-ui-phone-number";
import {Helmet} from 'react-helmet'
import ReactGA from 'react-ga'
import utm from 'url-utm-params'

class OffresPro extends Component {
    
        


    constructor (props){
        super(props);

        this.state = {
            open: false,
            name : "",
            email : "",
            number : "",
            activite : "-",
        };
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        });
    };

    handleChangeNumber = (e) => {
        this.setState({
            number: e,
        });
    }

    validateDetails () {
        console.log("3")
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
    
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        
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
        }).catch((err) =>{
            console.log(err)
            this.props.dispatch({type: 'PRO_REGISTERING_ERROR'});
        })
    };

    closeModal = () => {
        this.setState({open: !this.state.open})
    }

    componentDidMount() {
        ReactGA.pageview(this.props.location.pathname+ this.props.location.search);
         window.scrollTo(0, 0);
        // this.props.dispatch({ type: 'LOADER_FALSE' });

    }
    render() {
        return (
<>                                            <Helmet> 
            <title>agenz - Solutions pour les professionnels</title>
            <meta
      name="description"
      content="Accélérez et optimisez votre activité grâce a nos solutions dédiées aux professionnels de l'immobilier. Demandez une démo pour découvrir nos solutions d'étude de marché et d'estimation de biens immobiliers."
    />
            <meta property="og:url"                content="https://www.agenz.ma/Offres-pro"/>
<meta property="og:type"               content="article" />
<meta property="og:title"       content= "agenz - Solutions pour les professionnels" />
<meta property="og:description" content= "Accélérez et optimisez votre activité grâce a nos solutions dédiées aux professionnels de l'immobilier. Demandez une démo pour découvrir nos solutions d'étude de marché et d'estimation de biens immobiliers "/>
<meta property="og:image"              content="https://firebasestorage.googleapis.com/v0/b/website-estimation-immobiliere.appspot.com/o/Image%20EDM.png?alt=media" />    
        </Helmet> 
                <Dialog
                    open={this.state.open}
                    onClose= {this.closeModal}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogContent>
                        <DialogContentText id="alert-dialog-localisation-error">
                            <div  className="text-center">
                                <div className = "login-title">
                                <div className = "login-title">
                              <img src={logo_pro} className="logo-image_pro" alt="Agenz logo" />
                                </div>
                                                                </div>
                                
                                <p>Entrez vos information pour découvrir nos solutions</p>
                                <form className="form--pro" onSubmit={this.handleSubmit}>
                                <input type="hidden" name="utm_source" value={utm.utm(window.location.href).utm_source}></input>
   	<input type="hidden" name="utm_medium" value={utm.utm(window.location.href).utm_medium}></input>
   	<input type="hidden" name="utm_campaign" value={utm.utm(window.location.href).utm_campaign}></input>
   	<input type="hidden" name="utm_content" value={utm.utm(window.location.href).utm_content}></input>
	<input type="hidden" name="utm_term" value={utm.utm(window.location.href).uutm_term}></input>
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
                                        {/* <div className="col">
                                            <PhoneInput
                                                defaultCountry="MA"
                                                placeholder="Numéro de téléphone"
                                                value={this.state.number}
                                                onChange={this.handleChangeNumber}/>
                                        </div> */}
                    <ThemeProvider theme={theme}>
                    <div className="col col--number">
                                                          <MuiPhoneNumber
                    name="phoneNumber"
                    label="Numéro de téléphone"
                    data-cy="user-phone"
                    defaultCountry={"ma"}
                    value={this.state.number}
                    onChange={this.handleChangeNumber}/>
                  </div>
                  </ThemeProvider>
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
                    </DialogContent>
                </Dialog>
                <OffresProTimeline />
  {/* <LastNews /> */}

                {/* <div className="jumbotron no-margin-jumbo">
                    <div className="container">
                        <div className="row feature-3">
        
                            <div className="col-md-6 column-center-vertical">
                                <div className="feature-3-text">
                                <div className = "login-title">
                              <img src={logo_pro} className="logo-image_pro" alt="Agenz logo" />
                                </div>                                    <p style={{marginBottom: '15px'}}>
                                        Découvrez nos solutions pro d’estimations, d’étude de marché et de conseil qui couvrent l’ensemble de la chaîne de valeurs de l’immobilier.<br></br>
                                        Accélerez votre activité ou offrez une expérience digitale unique pour vos clients avec agenz PRO
                                    </p>
                                    <div className="time-line-section-button text-left">
                                        <button className="button button-primary" onClick={() =>{ this.setState({open: true})}}>
                                            Demander une démo
                                        </button>
                                    </div>
                                    
                                </div>
                            </div>
        
                            <div className="col-md-6">
                                <div className="feature-3-image"></div>
                            </div>
                        </div>
                    </div>
                </div> */}
                <Footer />
            </>
        );
    }
}


export default OffresPro;
