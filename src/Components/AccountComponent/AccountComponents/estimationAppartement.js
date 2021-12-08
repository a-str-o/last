import React, { Component } from 'react';
import '../AccountComponent.scss';


import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import InfoIcon from '@material-ui/icons/Info';
import Popover from "react-bootstrap/Popover";
import PopoverTitle from "react-bootstrap/PopoverTitle";
import PopoverContent from "react-bootstrap/PopoverContent";
import { ThemeProvider } from '@material-ui/core/styles';

import moment from 'moment'
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import filledNotStar from './../../../assets/img/filledNotStar.png';
import filledStar from './../../../assets/img/filledStar.png';

import Spinner from "react-bootstrap/Spinner";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import { theme } from '../../../assets/theme'
import { Link } from 'react-router-dom';

import Axios from 'axios';
import CountUp from 'react-countup';
import MuiPhoneNumber from "material-ui-phone-number";

class EstimationAppartement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            estimations: [],
            telephone: '',
            activeEstimation: null,
            action: '',
            estimationId: undefined,
            shareLink: null,
            estimationToShare: null,
            copied: false

        }
    }

    componentDidMount() {
        this.setState({
            estimations: this.props.estimation.userEstimations.filter(est => est.bien === 'appartement')
        })

    }


    handleChange = (e) => {

        this.setState({
            telephone: e,
        });
    };
    shareEstimation(id) {
        this.setState({ loading: true, action: "share" })

        // const db = firebase.firestore();
        //Update estimation to firestore
        // var estimationRef = db.collection("estimations");

        Axios.post('https://us-central1-agenz-website-prod.cloudfunctions.net/api/shareEstimation', { id: id }).then(result => {
            // Axios.post('https://us-central1-agenz-website-prod.cloudfunctions.net/api/shareEstimation',{ id: id }).then(result => {

            //     var query = estimationRef.where("estimationId", "==", id);
            // this.setState({loading : true, action: 'share'})
            // query
            // .limit(1).get()
            // .then((querySnapshot) =>{

            //     querySnapshot.forEach((doc) =>{
            // console.log(result.data)

            // console.log(doc.id, id)
            // Axios.post('https://us-central1-agenz-website-prod.cloudfunctions.net/api/createJWTAccessToken',{ estimationId: result.id }).then(result => {
            // const createAccessToken = firebase.functions().httpsCallable('createJWTAccessToken');
            // createAccessToken({ estimationId: doc.id })
            // .then((result) => {

            // doc.ref.update({
            //     shareLink : result.data.result
            // })

            const link = window.location.origin + "/estimations?token=" + result.data.result;
            const linkEncode = encodeURI(link);
            this.setState({ shareLink: linkEncode })
            this.setState({ estimationToShare: id })
            this.setState({ loading: false, action: null })

        })
            .catch(err => {
                this.setState({ loading: false, action: null })
                // console.log(err)
                toast.error("Quelque chose s'est mal passé, veuillez réessayer")


            })


    }

    validateDetails() {
        var errorFound = false;

        if (
            this.state.telephone === ""
        ) {
            this.props.dispatch({ type: 'CONTACT_FIELDS_REQUIRED_ERROR' });

            errorFound = true;
        }

        return errorFound;
    }
    setNewEstimation(data, index) {
        // Axios.post('https://us-central1-agenz-website-prod.cloudfunctions.net/api/shareEstimation',{ id: id }).then(result => {

        // const db = firebase.firestore();
        //Update estimation to firestore

        // var estimationRef = db.collection("estimations"); 

        this.setState({ activeEstimation: index, action: 'maj' })
        delete Axios.defaults.headers.common["Authorization"]
        delete Axios.defaults.headers.common["authorization"]
        Axios.post('https://cli482fnl7.execute-api.eu-west-3.amazonaws.com/default/lambdassh', JSON.stringify(data))
            .then(res => {
                Axios.defaults.headers.common["Authorization"] = localStorage.getItem("FBIdToken")
                this.setState({ activeEstimation: null });
                //post to updateEstimation (data,res)
                //   var query = estimationRef.where("estimationId", "==", data.estimationId);

                //     query
                //     .get()
                //     .then((querySnapshot) =>{
                Axios.post('https://us-central1-agenz-website-prod.cloudfunctions.net/api/setNewEstimation', { estimationID: data.estimationId, res: res }).then(result => {

                    this.props.dispatch({ type: 'UPDATE_ESTIMATION_SUCCESS' });
                    this.setState({ activeEstimation: null })

                    // querySnapshot.forEach((doc) => {
                    //     doc.ref.update({
                    //         estimation: res.data.estimation, 
                    //         precision: res.data.indice_de_confiance, 
                    //         variateur: res.data.incertitude_prix
                    //     })

                    // });


                })

                    .catch((error) => {
                        this.props.dispatch({ type: 'UPDATE_ESTIMATION_ERROR' });
                    });

            }).catch((err) => {
                this.setState({ activeEstimation: null })
                this.props.dispatch({ type: 'UPDATE_ESTIMATION_ERROR' });
            })
            ;
    }


    updateTelephone = () => {
        const error = this.validateDetails();
        if (error) {
            return;
        }
        Axios.post('https://us-central1-agenz-website-prod.cloudfunctions.net/api/updatePhone', { estimationID: this.state.estimationId, telephone: this.state.telephone }).then(result => {
            this.props.dispatch({ type: 'ADD_TEL_SUCCESS' });
            this.props.dispatch({ type: 'UPDATE_PHONE_MODAL', data: false });
        }).catch((error) => {
            this.props.dispatch({ type: 'ADD_TEL_ERROR' });
            this.props.dispatch({ type: 'UPDATE_PHONE_MODAL', data: false });
        });
    }
    //         const db = firebase.firestore();
    //         //Update estimation to firestore

    //         var estimationRef = db.collection("estimations"); 

    //         var query = estimationRef.where("estimationId", "==", this.state.estimationId);
    //         //post to updatePhone
    //             query
    //             .get()
    //             .then((querySnapshot) =>{

    //                 this.props.dispatch({type: 'ADD_TEL_SUCCESS'});

    //                 this.props.dispatch({ type: 'UPDATE_PHONE_MODAL', data: false});

    //                 querySnapshot.forEach((doc) => {
    //                     doc.ref.update({
    //                         telephone: this.state.telephone
    //                     })

    //                 });


    //             })
    //             .catch((error) =>{
    //                 this.props.dispatch({type: 'ADD_TEL_ERROR'});
    //                 this.props.dispatch({ type: 'UPDATE_PHONE_MODAL', data: false});
    //             });
    //     }

    meRappeler = (id) => {
        this.setState({ estimationId: id });
        this.props.dispatch({ type: 'UPDATE_PHONE_MODAL', data: true });
    }

    handleClosePModal = () => {
        this.props.dispatch({ type: 'UPDATE_PHONE_MODAL', data: false });
    }
    handleClose = () => {
        this.setState({ open: false })
    }


    deleteEstimation(data, index) {
        // const db = firebase.firestore();
        //Update estimation to firestore

        // var estimationRef = db.collection("estimations");

        this.setState({ activeEstimation: index, action: 'delete' });

        // var query = estimationRef.where("estimationId", "==", data.estimationId);

        // query
        // .get()
        // .then((querySnapshot) =>{
        Axios.post('https://us-central1-agenz-website-prod.cloudfunctions.net/api/deleteEstimation', { estimationID: this.state.estimationId }).then(result => {


            this.setState({ activeEstimation: null })

            this.props.dispatch({ type: 'UPDATE_ESTIMATION_SUCCESS' });

            // querySnapshot.forEach((doc) =>{
            //     const today = new Date();
            //     const day = today.getDate();
            //     const month = today.getMonth() + 1;
            //     const year = today.getFullYear();

            //     let date = day + '/' + month + '/' + year;
            //     doc.ref.update({
            //         isDeleted : true,
            //         supprimeLe: date
            //     })

            // });


        }).then(() => {
            let newData = this.props.estimation.userEstimations.filter(estim => estim.estimationId !== data.estimationId)
            this.props.dispatch({ type: 'SET_USER_ESTIMATION', data: newData });
        })
            .catch((error) => {
                this.setState({ activeEstimation: null })

                this.props.dispatch({ type: 'UPDATE_ESTIMATION_ERROR' });
            });
    }


    render() {

        const popover = (
            <Popover id="popover-contained">
                <PopoverTitle as="h3">Indice de confiance</PopoverTitle>

                <PopoverContent>
                    Représente le niveau de confiance attribué à l'estimation réalisée. Celui-ci varie en fonction du nombres de données que nous possédons sur une zone determinée.
                </PopoverContent>

            </Popover>
        );
        return (
            <div className="menuHolders">
                <Dialog
                    open={this.props.estimationState.openPhoneModal}
                    onClose={this.handleClosePModal}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogContent>
                        <DialogContentText id="alert-dialog-localisation-error">
                            <div className="close" onClick={this.handleClosePModal}> x </div>
                            <div className="text-center">
                                <div className="form-group">
                                    {/* <input 
                                                    className="input-form form-control"
                                                    id="telephone"
                                                    placeholder="Téléphone"
                                                    onChange={this.handleChange}
                                                    /> */}
                                    <ThemeProvider theme={theme}>
                                        <MuiPhoneNumber
                                            name="phoneNumber"
                                            id="telephone"
                                            label="Numéro de téléphone"
                                            data-cy="user-phone"
                                            defaultCountry={"ma"}
                                            value={this.state.number}
                                            onChange={this.handleChange} />
                                    </ThemeProvider>
                                </div>
                                <div className="form-group">
                                    <br></br>
                                    <button className="button button-primary" type="button" onClick={this.updateTelephone}> <i class="fa fa-paper-plane-o"></i>Me faire rappeler</button>
                                </div>
                            </div>
                        </DialogContentText>
                    </DialogContent>
                </Dialog>

                {this.props.estimation.userEstimations.filter(est => est.bien === 'appartement').map((estimation, index) => {
                    let eId = estimation.estimationId
                    let surface_ponderee;
                    if (estimation.parking) {
                        surface_ponderee = estimation.surfacehabitable + (estimation.surfacecave + estimation.surfacebalcon + estimation.placesparking * 12) / 2
                    } else {
                        surface_ponderee = estimation.surfacehabitable + (estimation.surfacecave + estimation.surfacebalcon) / 2
                    }
                    return (
                        <div key={index} className="estimation-items">

                            <div className="row">
                                <div className="col-md-9">
                                    <h5>{estimation.adresse}</h5>
                                    <div className="justify-content">
                                        <div className="realisation-date">
                                            Réalisé le {moment(estimation.date).format('L')}
                                        </div>

                                        <div className="results-caracterictics">
                                            <span><i className="fas fa-bed"></i> {estimation.typologie}</span>
                                            <span><i className="fas fa-caret-left"></i>          {surface_ponderee} m²</span>
                                            <span><i className="fas fa-bath"></i> {estimation.sdb}</span>
                                        </div>
                                    </div>

                                    <div className="justify-content">
                                        <div className="realisation-date">
                                            Indice de confiance
                                            <OverlayTrigger trigger="hover" placement="top" overlay={popover}>
                                                <span className="info-icon info-icon-results-card"><InfoIcon /></span>
                                            </OverlayTrigger>
                                        </div>

                                        <div className="results-caracterictics starsPrecision">
                                            {estimation.precision === 0 ? (
                                                <div className="starsShow">
                                                    <img src={filledNotStar} alt=''></img>
                                                    <img src={filledNotStar} alt=''></img>
                                                    <img src={filledNotStar} alt=''></img>
                                                    <img src={filledNotStar} alt=''></img>
                                                    <img src={filledNotStar} alt=''></img>
                                                </div>
                                            ) : estimation.precision === 1 ? (
                                                <div className="starsShow">
                                                    <img src={filledStar} alt=''></img>
                                                    <img src={filledNotStar} alt=''></img>
                                                    <img src={filledNotStar} alt=''></img>
                                                    <img src={filledNotStar} alt=''></img>
                                                    <img src={filledNotStar} alt=''></img>
                                                </div>
                                            ) : estimation.precision === 2 ? (
                                                <div className="starsShow">
                                                    <img src={filledStar} alt=''></img>
                                                    <img src={filledStar} alt=''></img>
                                                    <img src={filledNotStar} alt=''></img>
                                                    <img src={filledNotStar} alt=''></img>
                                                    <img src={filledNotStar} alt=''></img>
                                                </div>
                                            ) : estimation.precision === 3 ? (
                                                <div className="starsShow">
                                                    <img src={filledStar} alt=''></img>
                                                    <img src={filledStar} alt=''></img>
                                                    <img src={filledStar} alt=''></img>
                                                    <img src={filledNotStar} alt=''></img>
                                                    <img src={filledNotStar} alt=''></img>
                                                </div>
                                            ) : estimation.precision === 4 ? (
                                                <div className="starsShow">
                                                    <img src={filledStar} alt=''></img>
                                                    <img src={filledStar} alt=''></img>
                                                    <img src={filledStar} alt=''></img>
                                                    <img src={filledStar} alt=''></img>
                                                    <img src={filledNotStar} alt=''></img>
                                                </div>
                                            ) : (
                                                                    <div className="starsShow">
                                                                        <img src={filledStar} alt=''></img>
                                                                        <img src={filledStar} alt=''></img>
                                                                        <img src={filledStar} alt=''></img>
                                                                        <img src={filledStar} alt=''></img>
                                                                        <img src={filledStar} alt=''></img>
                                                                    </div>
                                                                )}
                                        </div>
                                    </div>

                                    <div className="justify-content priceBarPricesHighPrice priceBarPricesHighPrice-myspace">

                                        <div className="priceBarPricesHighTitle">
                                            Prix haut
                                        </div>


                                        <div className="priceBarPricesHighPrice">
                                            <CountUp duration={3}
                                                separator=" "
                                                decimal="," end={Math.round(estimation.estimation.toFixed() * (1 + (estimation.variateur / 100)))} />  MAD

                                        </div>
                                    </div>
                                    <div className="justify-content priceBarPricesLowPrice">

                                        <div className="priceBarPricesLowTitle">
                                            Prix bas
                                        </div>

                                        <div className="priceBarPricesLowPrice">
                                            <CountUp duration={1}
                                                separator=" "
                                                decimal="," end={Math.round(estimation.estimation.toFixed() * (1 - (estimation.variateur / 100)))} />  MAD
                                        </div>
                                    </div>



                                    <div className="justify-content estimatedPrice">

                                        <h3 >Prix estimé</h3>
                                        <h3>
                                            <CountUp duration={1}
                                                separator=" "
                                                decimal="," end={Math.round(estimation.estimation.toFixed())} />  MAD

                                            </h3>
                                    </div>

                                    <div className="justify-content-mt">
                                        <p>Prix / m<sup>2</sup></p>
                                        <p className="estimatedPriceM2">
                                            <CountUp duration={1}
                                                separator=" "
                                                decimal="," end={Math.round(estimation.estimation.toFixed() / surface_ponderee)} />  MAD / m<sup>2</sup>
                                        </p>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    {/* <button type="button" className="button button-primary" onClick={() => this.setNewEstimation(estimation, index)}>
                                        
                                        {this.state.activeEstimation === index && this.state.action==='maj'?
                                        (<Spinner animation="border" variant="default" size="sm"/>): (<><img src={majIcon} alt="" /> Mettre à jour </>)
                                        }
                                    </button> */}

                                    <button type="button" className="button button-primary" onClick={() => this.meRappeler(estimation.estimationId)}>
                                        <i className="fa fa-phone"></i> Rappelez moi

                                    </button>

                                    <div className="form-group">


                                        {this.state.loading && this.state.action === 'share' ? (
                                            <button
                                                onClick={() => this.shareEstimation(eId)}
                                                type="button"
                                                className="button button-primary"> <Spinner animation="border" className="text-white" size="sm" /> </button>) :
                                            (this.state.shareLink ?


                                                (this.state.estimationToShare === eId ? (


                                                    <div className='col-md-12'>
                                                        <div className='socials-medias share-estimation-container'>
                                                            <div className='facebook'><a href={`https://www.facebook.com/sharer/sharer.php?u=${this.state.shareLink || window.location.origin + '/estimations?token=' + this.state.shareLink}`}><i className='fab fa-facebook-square'></i></a></div>
                                                            <div className='facebook messenger-share'><a href={`https://www.facebook.com/dialog/send?app_id=664750221058963&amp;link=${this.state.shareLink || window.location.origin + '/estimations?token=' + this.state.shareLink}&amp;redirect_uri=${this.state.shareLink || window.location.origin + '/estimations?token=' + this.state.shareLink}&`}><i class="fab fa-facebook-messenger"></i></a></div>
                                                            <div className='whatsapp'><a href={`whatsapp://send?text=${this.state.shareLink || window.location.origin + '/estimations?token=' + this.state.shareLink}`}><i className='fab fa-whatsapp-square'></i></a></div>
                                                            <div className='twitter'><a href={`https://twitter.com/intent/tweet?url=${this.state.shareLink || window.location.origin + '/estimations?token=' + this.state.shareLink}&text=https://www.facebook.com/sharer/sharer.php?u=${this.state.shareLink || window.location.origin + '/estimations?token=' + this.state.shareLink}`}><i className='fab fa-twitter-square'></i></a></div>
                                                            <div className='linked'><a href={`https://www.linkedin.com/shareArticle?mini=true&url=${this.state.shareLink || window.location.origin + '/estimations?token=' + this.state.shareLink}&title=&summary=&source=`}><i className='fab fa-linkedin'></i></a></div>
                                                        </div>

                                                    </div>
                                                ) :
                                                    <button
                                                        onClick={() => this.shareEstimation(eId)}
                                                        type="button"
                                                        className="button button-primary">

                                                        Partager </button>
                                                ) : <button
                                                    onClick={() => this.shareEstimation(eId)}
                                                    type="button"
                                                    className="button button-primary">Partager </button>
                                            )

                                        }
                                        {this.state.shareLink ?


                                            (this.state.estimationToShare === eId ? (
                                                <>
                                                    <div className="shareLink">

                                                        <CopyToClipboard text={this.state.shareLink || window.location.origin + '/estimations?token=' + this.state.shareLink}
                                                            onCopy={() => this.setState({ copied: true, open: true })}>
                                                            <span className="copy button button-primary">Ou copiez le lien</span>
                                                        </CopyToClipboard>
                                                        <div className="copy-link">
                                                            {this.state.shareLink || window.location.origin + '/estimations?token=' + this.state.shareLink}
                                                        </div>



                                                        <Snackbar
                                                            autoHideDuration={6000}
                                                            open={this.state.open}
                                                            onClose={this.handleClose}
                                                            TransitionComponent="TransitionUp"
                                                            message="Copié !"
                                                            action={<IconButton size="small" aria-label="close" color="inherit" onClick={this.handleClose}>
                                                                <CloseIcon fontSize="small" />
                                                            </IconButton>}
                                                        />
                                                    </div>

                                                </>
                                            ) : ('')
                                            )
                                            : ('')
                                        }

                                    </div>
                                    {/* <button type="button" className="button button-danger" onClick={() => this.deleteEstimation(estimation, index)}>
                                        <span> <img src={deleteIcon} alt="" /> </span> <span>Supprimer</span>
                                        {this.state.activeEstimation === index && this.state.action==='delete'?
                                        (<Spinner animation="border" variant="default" size="sm"/>): ''
                                        }
                                    </button> */}

                                </div>
                            </div>

                        </div>
                    );
                })}{this.props.estimation.userEstimations.filter(est => est.bien === 'appartement').length === 0 ? (
                    <div className="noestimationholder">
                        <h4>Vous n'avez estimé aucun appartement</h4>
                        <p>Commencez une nouvelle estimation sur notre <Link to="/estimation">page d'estimation gratuite</Link></p>
                    </div>
                ) : ''}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const uid = state.auth.uid;
    const email = state.auth.email;
    const estimation = state.userEstimation;
    const estimationState = state.estimationState;

    return {
        uid: uid,
        email: email,
        estimation: estimation,
        estimationState: estimationState
    };
};

export default connect(mapStateToProps)(EstimationAppartement);