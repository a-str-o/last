import React, { Component } from 'react';
import '../AccountComponent.scss';
import moment from 'moment'
import { connect } from "react-redux";
import filledNotStar from './../../../assets/img/filledNotStar.png';
import filledStar from './../../../assets/img/filledStar.png';

import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Axios from 'axios'
import Spinner from "react-bootstrap/Spinner";
import NumberFormat from 'react-number-format';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import MuiPhoneNumber from "material-ui-phone-number";

import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from '../../../assets/theme'


class EstimationVilla extends Component {

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
            console.log(result.data)

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
    meRappeler = (id) => {
        this.setState({ estimationId: id });
        this.props.dispatch({ type: 'UPDATE_PHONE_MODAL', data: true });
    }
    setNewEstimation(data, index) {
        // Axios.post('https://us-central1-agenz-website-prod.cloudfunctions.net/api/shareEstimation',{ id: id }).then(result => {

        // const db = firebase.firestore();
        //Update estimation to firestore

        // var estimationRef = db.collection("estimations"); 

        this.setState({ activeEstimation: index, action: 'maj' })
        delete Axios.defaults.headers.common["Authorization"]
        delete Axios.defaults.headers.common["authorization"]
        Axios.post('https://cli482fnl7.execute-api.eu-west-3.amazonaws.com/default/lambdassh_villa', JSON.stringify(data))
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
    handleClose = () => {
        this.setState({ open: false })
    }
    handleClosePModal = () => {
        this.props.dispatch({ type: 'UPDATE_PHONE_MODAL', data: false });
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
    componentDidMount() {
        this.setState({
            estimations: this.props.estimation.userEstimations.filter(est => est.bien === 'villa')
        })
    }

    render() {
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

                {this.state.estimations.map((estimation, index) => {
                    let eId = estimation.estimationId
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
                                            <span><i className="fas fa-caret-left"></i> {estimation.surfaceterrain} m²</span>
                                            <span><i className="fas fa-bath"></i> {estimation.sdb}</span>
                                        </div>
                                    </div>

                                    <div className="justify-content">
                                        <div className="realisation-date">
                                            Indice de confiance
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

                                    <div className="justify-content priceBarPricesHighPrice">

                                        <div className="priceBarPricesHighTitle">
                                            Prix haut
                                        </div>


                                        <div className="priceBarPricesHighPrice">
                                            <NumberFormat displayType={'text'} value={Math.round(estimation.estimation.toFixed() * (1 + (estimation.variateur / 100)))} thousandSeparator={" "} />

                                            {" "}MAD
                                        </div>
                                    </div>
                                    <div className="justify-content priceBarPricesLowPrice">

                                        <div className="priceBarPricesLowTitle">
                                            Prix bas
                                        </div>

                                        <div className="priceBarPricesLowPrice">
                                            <NumberFormat displayType={'text'} value={Math.round(estimation.estimation.toFixed() * (1 - (estimation.variateur / 100)))} thousandSeparator={" "} />

                                            {" "}MAD
                                        </div>
                                    </div>



                                    <div className="justify-content estimatedPrice">

                                        <h3 >Prix estimé</h3>
                                        <h3 className="prix--acount-display">
                                            <NumberFormat displayType={'text'} value={Math.round(estimation.estimation)} thousandSeparator={" "} />
                                            {" "}MAD</h3>
                                    </div>

                                    <div className="justify-content-mt">
                                        <p>Prix / m2</p>
                                        <p className="estimatedPriceM2 prix--acount-display-m2">
                                            <NumberFormat displayType={'text'} value={Math.round(estimation.estimation.toFixed() / estimation.surfaceterrain)} thousandSeparator={" "} />

                                            {" "}MAD / m2</p>
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
                                    {/* 
                                    <button type="button" className="button button-primaire">
                                    <span> <img src={evolutionIcon} alt="" /> </span> <span>Evolution du prix</span>
                                    </button> */}

                                    {/* <button type="button" className="button button-primaire">
                                    <span> <img src={buildingIcon} alt="" /> </span> <span>Modifier le bien</span>
                                    </button> */}

                                    {/* <button type="button" className="button button-danger">
                                    <span> <img src={deleteIcon} alt="" /> </span> <span>Supprimer le bien</span>
                                    </button> */}
                                </div>
                            </div>

                        </div>
                    );
                })}
                {this.state.estimations.length === 0 ? (
                    <div className="noestimationholder">
                        <h4>Vous n'avez estimé aucune villa</h4>
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

export default connect(mapStateToProps)(EstimationVilla);