import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import MuiPhoneNumber from "material-ui-phone-number";
import Grid from '@material-ui/core/Grid';
import { CSSTransition } from 'react-transition-group';
import AgenceComponentInCard from '../AgenceComponent/AgenceComponentInCard';
import RoomIcon from '@material-ui/icons/Room';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import BuildIcon from '@material-ui/icons/Build';
import AddToQueueIcon from '@material-ui/icons/AddToQueue';
import { withStyles, createStyles } from '@material-ui/styles';
import Axios from "axios"
import { connect } from "react-redux";
import logo_agenz_white from '../../assets/img/logo_agenz_white.jpeg'
import CardComponentCarouselInCard from './components/CardComponentCarouselInCard';
import { ThemeProvider } from '@material-ui/core/styles';
import {theme} from '../../assets/theme'
import {withRouter} from 'react-router-dom';
import { toast } from "react-toastify";




import './ObtenirLePrix.scss'
const styles = theme => createStyles({ // change to this
    paperWidthSm:     {
        maxWidth : '90vw',
        width: '90vw',
    height: '90vh',
    backgroundColor: '#f2f3f4'
},
root : {
    marginTop : '0px !important',
    marginBottom : '0px !important'
}
});
export class ObtenirLePrix extends Component {
    constructor(props) {
        super(props);
        this.state = {
            moreInfo : false,
            name : null,
            email : null,
            nameError : null, 
            emailError : null,
            phoneError : null,
            phone : null, 
            message : "Bonjour, j'ai un projet de vente et je souhaite prendre rendez-vous pour faire estimer mon bien. Merci.",
            loadingPopup : true,
            transactionId : this.props.transactionId,
            images : this.props.images,
            agenceTransaction : this.props.agenceTransaction,
            selectedAddress : this.props.selectedAddress,
            consistance : this.props.consistance,
            dateTransactions : this.props.dateTransactions,
            construction : this.props.construction,

        }
    }
    isEmail(email) {
        let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    registerContact() {
        
        // validate fields are filled
        var error = [false, false, false];
        if (this.state.name === null || this.state.name==="") {
            error[0] = true;
        }
        if (this.state.email === null || !this.isEmail(this.state.email) || this.state.email === "") {
            error[1] = true;
        }
        if (this.state.phone === null || this.state.phone==="") {
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

        // build object
        const data = {
            name: this.state.name,
            phone: this.state.phone,
            email: this.state.email,
            message: `${this.state.message}`,
            date: new Date().toISOString(),
            job: null,
            user_id: null,
            type : "Transaction",
            transaction : this.state.transactionId,
            address : this.props.selectedAddress,
            contributeur : this.props.agenceTransaction.nameEntreprise,
            contributeurId : this.props.agenceTransaction.responsable,
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

    
    componentDidMount = () => {
        if(this.props.callForData){
            Axios.post('https://us-central1-agenz-website-prod.cloudfunctions.net/api/getTransaction',{ transactionId: this.props.match.params.address }).then(result => {
            this.setState({
                transactionId : result.data.transactionId,
                images : JSON.stringify(result.data.images),
                agenceTransaction : result.data.agence,
                selectedAddress : result.data.address,
                consistance : result.data.consistance,
                dateTransactions : result.data.dateTransactions,
                construction : result.data.anneeconstruction,
            })
        })
        .catch( (err) =>{
            toast.error("Impossible de récupérer les données de cette vente")
            this.setState({moreInfo : false})
        })
        }
    }
    render() {
        const { classes } = this.props;

        return (
            <>
                                <div className="details-bien-container-image">
                                        { this.state.images && this.state.images!=="null"  ? (
                                            <CardComponentCarouselInCard images={
                                                JSON.parse(this.state.images)
                                            } />
                                        ) : (
                                            <CardComponentCarouselInCard images={
                                                [logo_agenz_white,logo_agenz_white,logo_agenz_white]
                                            } />
                                        )}
                                    </div>
        
                            <div  className="text-center text-center--pricing">
                                     <Grid container spacing={1}>
        <Grid item xs={12}>
        <div className="details-bien-container">
        <Grid container spacing={1}>
                              <Grid classes={{root: classes.root }}item md={6} lg={4} s={12}>
                                    <div className="pricing--card--details">
                                        
                                            
                                                <p className="details-bien details-bien-title">
                                                {this.state.consistance} 
                                                </p>
                                                <p className="details-bien details--address">
                                                {!this.state.selectedAddress || this.state.selectedAddress==="" || this.state.selectedAddress===-1 ? ("") : (
                                                    <>
                                                <RoomIcon/>{this.state.selectedAddress}
                                                </>)}
                                                    </p>
                                                <p className="details-bien"><MonetizationOnIcon/>Vendu en {this.state.dateTransactions}</p>

                                                <p className="details-bien">
                                                {
                                                        !this.state.construction || this.state.construction==="" || this.state.construction===-1 ? ("") : (
                                                            <>
                                                   <BuildIcon/> Date de construction :&nbsp;
                                                    {
                                                        this.state.construction === 0 ? 'Moins de 5 ans' : 
                                                        this.state.construction === 1 ? 'Entre 10 et 20 ans' :
                                                        this.state.construction === 3 ? 'Moins de 10 ans' :
                                                        this.state.construction === 2 ? 'Plus de 20 ans' :
                                                        this.state.construction === 4 ? 'Construction neuve' :
                                                        this.state.construction === -1 ? 'Non renseignée' :
                                                        this.state.construction === "" ? 'Non renseignée' :
                                                        this.state.construction
                                                    }
                                                    </>
                                                        )
                                                }
                                                </p>
                                                <p className="details-bien">
                                                    { this.state.agenceTransaction ? (
                                                        <span>
                                                          <AddToQueueIcon/> 
                                                          <a class="agence--added" href={`https://agenz.ma/agence-immobiliere/casablanca/${this.state.agenceTransaction.nameEntreprise.replace(/\./g, '-').replace(/ /g, '-').replace(/é/g, 'e').replace(/ô/g, 'o')}/a/${this.state.agenceTransaction.responsable}`} target="_blank" rel="noreferrer" > Ajouté par{" "}{ this.state.agenceTransaction.nameEntreprise } </a>

                                                        </span>
                                                    ) : ''}
                                                </p>
                                            
                                        
                                    </div>
                                    </Grid>
                                    { this.state.agenceTransaction ? (
        <Grid item md={6} lg={4} s={12}>
                <div className="card--agence-details">
            <AgenceComponentInCard selectedAddress = {this.state.selectedAddress} agence={this.state.agenceTransaction} transaction={this.state.transactionId} />
            </div>
            </Grid>) : ''}
            <Grid item md={12} lg={4} s={12}>
                <div className="rdv--container">
        <p className="details-bien details-bien-title" >Faites estimer votre bien</p>
        { this.state.agenceTransaction ? (
<p className="details-bien-sbutitle">En complément, obtenez les prix des biens similaires au vôtre, récemment vendus par <a href={`https://www.agenz.ma/agence-immobiliere/casablanca/${this.state.agenceTransaction.nameEntreprise.replace(/\./g, '-').replace(/ /g, '-').replace(/é/g, 'e').replace(/ô/g, 'o')}/a/${this.state.agenceTransaction.reponsable}`} target="_blank" rel="noreferrer" >{this.state.agenceTransaction.nameEntreprise}</a> </p> ) : ("")}
        <Grid container spacing={3}>
            <ThemeProvider theme={theme}>
                                    

                                        <Grid item md={12} xs={12}>
                                        <div className="message--field">
                                    <TextField size="small" id="name" label="Nom et Prénom" type="search" variant="outlined"
                                                                            value={this.state.name}
                                                                            onChange={(e) => {this.setState({...this.state, name: e.target.value})}}
                                                                            />

                                        <CSSTransition in={this.state.nameError !== null} timeout={300} classNames="errorPriceMap">
                                            <span class="errorPriceMap">{this.state.nameError}</span>
                                        </CSSTransition>
                                    </div>
                                    <div className="message--field">
                                    <TextField size="small" id="name" label="Email" type="mail" variant="outlined"
                                                                            value={this.state.email}
                                                                            onChange={(e) => {this.setState({...this.state, email: e.target.value.trim()})}}
                                                                            />

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
                    variant="outlined"
                    onChange={(e) => {this.setState({...this.state, phone: e})}}
                   />

                                        <CSSTransition in={this.state.phoneError} timeout={300} classNames="errorPriceMap">
                                                <span class="errorPriceMap">{this.state.phoneError}</span>
                                        </CSSTransition>
                                    </div>
                                    </Grid>
                                    <Grid item md={12} xs={12}>
                                        <div className="message--field">
                                    <TextField multiline size="small" id="message" label="Message" type="search"  value={this.state.message} variant="outlined"
                      onChange={(e) => {this.setState({...this.state, message: e.target.value})}}
 
                                        />
                                        </div>
                                    </Grid>
                                <button className="button button-primary btn--message"  onClick={() => {
                                    this.registerContact();
                                }}>
                                    Envoyer
                                </button>
                                
                            </ThemeProvider>
        </Grid>
        </div>
       </Grid>
            </Grid>
                                </div>
                                
        </Grid>
        </Grid>

        </div>
                    
            </>
        )
    }
}
const mapStateToProps = (state) => {
    return {

    };
};
export default connect(mapStateToProps)(withStyles(styles)(withRouter(ObtenirLePrix)));

