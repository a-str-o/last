import React from 'react';
import './style.scss';
import { connect } from 'react-redux';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import filledNotStar from './../../../../../assets/img/filledNotStar.png';
import filledStar from './../../../../../assets/img/filledStar.png';
import CountUp from 'react-countup';

import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import PopoverTitle from "react-bootstrap/PopoverTitle";
import PopoverContent from "react-bootstrap/PopoverContent";
import InfoIcon from '@material-ui/icons/Info';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import Spinner from "react-bootstrap/Spinner";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import MuiPhoneNumber from "material-ui-phone-number";
import { toast } from "react-toastify";

class EstimationCardDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categorie: null,
            activite: null,
            firstName: null,
            lastName: null,
            phone: null,
            fonction: null,
            email: null,
            country: null,
            city: null,
            address: null,
            postalcode: null,
            image: null,
            curentPassword: null,
            newPassword: null,
            
            descriptionActivite: null,
            emailEntreprise: null,
            countryEntreprise: null,
            cityEntreprise: null,
            addressEntreprise: null,
            postalcodeEntreprise: null,
            phoneEntreprise: null,
            nameEntreprise: null,
            informationsFounded : true,
            shareLink : null,
            copied: false,
            open: false,
            loading: false,
            openPhoneModal: false,
            telephone: '',
            estimationId: undefined,
            action :null
        }
    }

    closeDetails  = () => {
        this.props.dispatch({type : 'ESTIMATION_DETAILS', data: false})
        this.props.dispatch({type : 'SET_ESTIMATION_DETAILS', data: {}})
    }


    // shareEstimation (id){
    //     const db = firebase.firestore();
    //     //Update estimation to firestore
    //     var estimationRef = db.collection("estimations");

    //     var query = estimationRef.where("estimationId", "==", id);
    //     this.setState({loading : true, action: 'share'})
    //     query
    //     .limit(1).get()
    //     .then((querySnapshot) =>{

    //         querySnapshot.forEach((doc) =>{
                
    //             console.log(doc.id, id)
    //             axios.post('https://us-central1-agenz-website-prod.cloudfunctions.net/api/createJWTAccessToken',{ estimationId: doc.id }).then(result => {
    //             // const createAccessToken = firebase.functions().httpsCallable('createJWTAccessToken');
    //             // createAccessToken({ estimationId: doc.id })
    //             // .then((result) => {

    //                 doc.ref.update({
    //                     shareLink : result.data.result
    //                 })

    //                 const link = window.location.origin + "/estimations?token=" + result.data.result;
    //                 const linkEncode = encodeURI(link);
    //                 this.setState({shareLink : linkEncode})
    //             }).then(() => {
    //                 this.setState({loading : false, action: null})
    //             })
    //             .catch(err => {
    //                 this.setState({loading : false, action: null})
    //                 console.log(err)
    //                 toast.error("Quelque chose s'est mal passé, veuillez réessayer")
                    

    //             })

    //         });

            
    //     })
    //     .catch((error) =>{
    //         console.log(error)
    //         toast.error("Erreur");
    //     });

        
    // }

    // setNewEstimation (data){
    //     const db = firebase.firestore();
    //     //Update estimation to firestore

    //     var estimationRef = db.collection("estimations"); 
    //     this.setState({loading : true, action: 'maj'})
    //     Axios.post('https://cli482fnl7.execute-api.eu-west-3.amazonaws.com/default/lambdassh', JSON.stringify(data))
    //     .then(res => {

    //       this.setState({activeEstimation: null});

    //       var query = estimationRef.where("estimationId", "==", data.estimationId);

    //         query
    //         .get()
    //         .then((querySnapshot) =>{

    //             this.setState({activeEstimation: null})

    //             querySnapshot.forEach((doc) => {
    //                 doc.ref.update({
    //                     estimation: res.data.estimation, 
    //                     precision: res.data.indice_de_confiance, 
    //                     variateur: res.data.incertitude_prix
    //                 })

    //             });

                
    //         }).then(() => {
    //             toast.success("Estimation mise à jour !");
    //             this.getEstimations();
    //             this.setState({loading : false, action: null})
    //         })
            
    //         .catch((error) =>{
    //             console.log(error)
    //             this.setState({loading : false, action: null})
    //         });

    //     }).catch((error) =>{
    //         console.log(error)
    //         this.setState({loading : false, action: null})
    //     })
    //     ;
    // }


    // updateTelephone = () =>{
    //     const error = this.validateDetails();
    //     if (error) {
            
    //         return;
    //     }
    //     const db = firebase.firestore();
    //     //Update estimation to firestore

    //     var estimationRef = db.collection("estimations"); 
    //     this.setState({loading : true, action: 'majphone'})
    //     var query = estimationRef.where("estimationId", "==", this.state.estimationId);

    //         query
    //         .get()
    //         .then((querySnapshot) =>{

    //             this.handleClosePModal();

    //             querySnapshot.forEach((doc) => {
    //                 doc.ref.update({
    //                     telephone: this.state.telephone
    //                 })

    //             });
                
               
    //         }).then(() => {
    //             toast.success("Estimation supprimée !");
    //             this.getEstimations();
    //             this.setState({loading : false, action: null})
    //         })
    //         .catch((error) =>{
    //             console.log(error)
    //             this.setState({loading : false, action: null})
    //         });
    // }


    // deleteEstimation (data){
    //     const db = firebase.firestore();
    //     //Update estimation to firestore

    //     var estimationRef = db.collection("estimations");

    //     var query = estimationRef.where("estimationId", "==", data.estimationId);
    //     this.setState({loading : true, action: 'delete'})
    //     query
    //     .get()
    //     .then((querySnapshot) =>{

    //         querySnapshot.forEach((doc) =>{
    //             const today = new Date();
    //             const day = today.getDate();
    //             const month = today.getMonth() + 1;
    //             const year = today.getFullYear();

    //             let date = day + '/' + month + '/' + year;
    //             doc.ref.update({
    //                 isDeleted : true,
    //                 supprimeLe: date
    //             })

    //         });

            
    //     }).then(() => {
    //         toast.success("Estimation supprimée !");
    //         this.getEstimations();
    //         this.setState({loading : false, action: null})
    //         this.closeDetails()
    //     })
    //     .catch((error) =>{
    //         console.log(error)
    //         this.setState({loading : false, action: null})
    //     });
    // }

    meRappeler = (id) => {
        this.setState({estimationId: id, openPhoneModal: true});
    }

    handleClosePModal = () => {
        this.setState({openPhoneModal: false});
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        });
    };


    validateDetails () {
        var errorFound = false;

        if (
            this.state.telephone === ""
        ) {
            toast.error("Veuillez remplir tous les champs !");

            errorFound = true;
        }

        return errorFound;
    }


    TransitionUp() {
        return <Slide direction="up" />;
    }

    handleClose = () => {
        this.setState({open : false})
    };
    
    async getEstimations() {
        // const estimations = [];
        // const estimationsDispatchDatas = [];
        // const db = firebase.firestore();
        // const estimationsDocsUid = await db.collection('estimations').where('user_id', '==', this.props.user.uid).get();
        // const estimationsDocsEmail = await db.collection('estimations').where('user_id', '==', this.props.user.email).get();
        // estimationsDocsUid.forEach(estimationsDoc => {
        //     estimations.push(estimationsDoc.data());
        // });
        // estimationsDocsEmail.forEach(estimationsDoc => {
        //     estimations.push(estimationsDoc.data());
        // });

        // estimations.forEach(est => {
        //     if(!est.isDeleted) {
        //         estimationsDispatchDatas.push(est)
        //     }
        // })

        // this.props.dispatch({ type: 'SET_ESTIMATIONS', data: estimationsDispatchDatas });
    }

   
    render() {
        const popover = (
            <Popover id="popover-contained">
                <PopoverTitle as="h3">Évaluation de votre estimation</PopoverTitle>
                <PopoverContent>
                    Représente le niveau de confiance attribué à l'estimation réalisée. Celui-ci varie en fonction du nombres de données que nous possédons sur une zone determinée.
                </PopoverContent>
            </Popover>
        );

        return (
            <div className = "EstimationCardDetails">
                <Dialog
                    open={this.state.openPhoneModal}
                    onClose={this.handleClosePModal}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogContent>
                        <DialogContentText id="alert-dialog-localisation-error">
                        <div className = "close" onClick={this.handleClosePModal}> x </div>
                            <div  className="text-center">
                                <div className="form-group form-group--phone">
                                    {/* <input 
                                        className="input-form form-control"
                                        id="telephone"
                                        placeholder="Téléphone"
                                        onChange={this.handleChange}
                                        /> */}
                                                          <MuiPhoneNumber
                    name="phoneNumber"
                    id="telephone"
                    label="Numéro de téléphone"
                    data-cy="user-phone"
                    defaultCountry={"ma"}
                    value={this.state.number}
                    onChange={this.handleChange}/>
                                </div>
                                <div className="form-group">
                                    <button className="button button-primary" type="button" onClick={this.updateTelephone}> <i class="fa fa-paper-plane-o"></i>Me faire rappeler</button>
                                </div>
                            </div>
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
                <div className = "container">
                        <div>
                            <div className = "row">
                                <div className = "col-md-12">
                                <div className ="results-top"> 
                                    <div className={this.props.espacePro.EstimationDetails.bien !== 'terrain' && this.props.espacePro.EstimationDetails.bien !== undefined? "results-icon" : "results-icon2"} >  
                                    {this.props.espacePro.EstimationDetails.bien === 'appartement' ? 
                                    (<svg width="100px" height="100px" viewBox="0 0 56 56" version="1.1" xmlns="http://www.w3.org/2000/svg" class="radio-rect__icon path__stroke polyline__stroke"><g id="assets" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" opacity="1" stroke-linejoin="round"><g id="Appartment" stroke="#393939" stroke-width="2"><g id="Page-1" transform="translate(10.000000, 7.000000)"><path d="M4,41 L4,1 C4,0.448 4.448,0 5,0 L31,0 C31.553,0 32,0.448 32,1 L32,41 L21,41 L21,33 C21,32.447 20.553,32 20,32 L16,32 C15.448,32 15,32.447 15,33 L15,41 L4,41 Z" id="Stroke-1" stroke-linecap="round"></path><path d="M11,12 L11,9" id="Stroke-3" stroke-linecap="square"></path><path d="M18,12 L18,9" id="Stroke-5" stroke-linecap="square"></path><path d="M25,12 L25,9" id="Stroke-7" stroke-linecap="square"></path><path d="M11,23 L11,20" id="Stroke-9" stroke-linecap="square"></path><path d="M18,23 L18,20" id="Stroke-11" stroke-linecap="square"></path><path d="M25,23 L25,20" id="Stroke-13" stroke-linecap="square"></path><path d="M0,41 L36,41" id="Stroke-15" stroke-linecap="round"></path></g></g></g></svg>)
                                    : 
                                    this.props.espacePro.EstimationDetails.bien === 'villa' ?
                                    ( <svg width="70px" height="70px" viewBox="0 0 56 56" version="1.1" xmlns="http://www.w3.org/2000/svg" class="radio-rect__icon path__stroke polyline__stroke"><g id="assets" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" opacity="1" stroke-linejoin="round"><g id="House" stroke-width="2" stroke="#393939"><g id="Page-1" transform="translate(8.000000, 13.000000)"><polyline id="Stroke-1" points="-7.27196081e-14 13 20 0 40 13"></polyline><path d="M6,9 L6,31 L16,31 L16,22 C16,21.447 16.448,21 17,21 L23,21 C23.553,21 24,21.447 24,22 L24,31 L34,31 L34,9" id="Stroke-3"></path></g></g></g></svg>)
                                    :
                                    ( <svg width="70px" height="70px" viewBox="0 0 56 56" version="1.1" xmlns="http://www.w3.org/2000/svg" class="radio-rect__icon path__fill__checked"><g id="assets" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" opacity="1"><g id="Loft" fill="#393939"><g id="Page-1" transform="translate(3.000000, 10.000000)"><path d="M12,27.0009 L24,27.0009 L24,21.0009 L12,21.0009 L12,27.0009 Z M25,19.0009 L11,19.0009 C10.448,19.0009 10,19.4489 10,20.0009 L10,28.0009 C10,28.5539 10.448,29.0009 11,29.0009 L25,29.0009 C25.552,29.0009 26,28.5539 26,28.0009 L26,20.0009 C26,19.4489 25.552,19.0009 25,19.0009 L25,19.0009 Z" id="Fill-1"></path><path d="M40,33.0009 L40,20.0009 C40,19.4489 39.553,19.0009 39,19.0009 L31,19.0009 C30.447,19.0009 30,19.4489 30,20.0009 L30,33.0009 L6,33.0009 L6,15.7819 L44,6.2819 L44,33.0009 L40,33.0009 Z M32,33.0009 L38,33.0009 L38,21.0009 L32,21.0009 L32,33.0009 Z M49,33.0009 L46,33.0009 L46,5.0009 C46,4.6929 45.858,4.4019 45.615,4.2129 C45.372,4.0229 45.056,3.9559 44.758,4.0309 L4.757,14.0309 C4.312,14.1419 4,14.5419 4,15.0009 L4,33.0009 L1,33.0009 C0.448,33.0009 0,33.4479 0,34.0009 C0,34.5539 0.448,35.0009 1,35.0009 L5,35.0009 L31,35.0009 L39,35.0009 L45,35.0009 L49,35.0009 C49.553,35.0009 50,34.5539 50,34.0009 C50,33.4479 49.553,33.0009 49,33.0009 L49,33.0009 Z" id="Fill-3"></path><path d="M4.999,12.0009 C5.08,12.0009 5.161,11.9919 5.243,11.9709 L45.242,1.9709 C45.778,1.8369 46.104,1.2939 45.97,0.7579 C45.836,0.2229 45.293,-0.1051 44.758,0.0309 L4.757,10.0309 C4.222,10.1649 3.896,10.7079 4.03,11.2439 C4.144,11.6979 4.551,12.0009 4.999,12.0009" id="Fill-4"></path></g></g></g></svg>)
                                    } 
                                    
                                    </div>
                                    <div className ="results-infos">
                                        <div>
                                            <p>Votre {this.props.espacePro.EstimationDetails.bien === 'appartement' ? 'appartement' :
                                            this.props.espacePro.EstimationDetails.bien === 'villa' ? 'villa' : 'terrain nu'
                                            } proche de</p>
                                            <h3>{this.props.espacePro.EstimationDetails.adresse}</h3>
                                        </div>
                                        {/* <div className="results-caracterictics">
                                            <span><i className="fas fa-bed"></i> {this.props.espacePro.EstimationDetails.typologie}</span>
                                            <span><i className="fas fa-caret-left"></i> {this.props.espacePro.EstimationDetails.surfacehabitable} m²</span>
                                            <span><i className="fas fa-bath"></i> {this.props.espacePro.EstimationDetails.sdb}</span>
                                        </div> */}
                                    </div>
                                </div>
                                <div className = "results-middle">
                                    <div className="results-caracterictics starsPrecision">
                                    
                                    {this.props.espacePro.EstimationDetails.precision === 0 ? (
                                        <div className="starsShow">
                                                <OverlayTrigger trigger="hover" placement="right" overlay={popover}>
                                                <span className="info-icon-display"><InfoIcon/></span>
                                            </OverlayTrigger>
                                            <img src={filledNotStar} alt=''></img>
                                            <img src={filledNotStar} alt=''></img>
                                            <img src={filledNotStar} alt=''></img>
                                            <img src={filledNotStar} alt=''></img>
                                            <img src={filledNotStar} alt=''></img>
                                        </div>
                                    ) : this.props.espacePro.EstimationDetails.precision === 1 ? (
                                        <div className="starsShow">
                                                <OverlayTrigger trigger="hover" placement="right" overlay={popover}>
                                                <span className="info-icon-display"><InfoIcon/></span>
                                            </OverlayTrigger>
                                            <img src={filledStar} alt=''></img>
                                            <img src={filledNotStar} alt=''></img>
                                            <img src={filledNotStar} alt=''></img>
                                            <img src={filledNotStar} alt=''></img>
                                            <img src={filledNotStar} alt=''></img>
                                        </div>
                                    ) : this.props.espacePro.EstimationDetails.precision === 2 ? (
                                        <div className="starsShow">
                                                <OverlayTrigger trigger="hover" placement="right" overlay={popover}>
                                                <span className="info-icon-display"><InfoIcon/></span>
                                            </OverlayTrigger>
                                            <img src={filledStar} alt=''></img>
                                            <img src={filledStar} alt=''></img>
                                            <img src={filledNotStar} alt=''></img>
                                            <img src={filledNotStar} alt=''></img>
                                            <img src={filledNotStar} alt=''></img>
                                        </div>
                                    ): this.props.espacePro.EstimationDetails.precision === 3 ? (
                                        <div className="starsShow">
                                                <OverlayTrigger trigger="hover" placement="right" overlay={popover}>
                                                <span className="info-icon-display"><InfoIcon/></span>
                                            </OverlayTrigger>
                                            <img src={filledStar} alt=''></img>
                                            <img src={filledStar} alt=''></img>
                                            <img src={filledStar} alt=''></img>
                                            <img src={filledNotStar} alt=''></img>
                                            <img src={filledNotStar} alt=''></img>
                                        </div>
                                    ): this.props.espacePro.EstimationDetails.precision === 4 ? (
                                        <div className="starsShow">
                                                <OverlayTrigger trigger="hover" placement="right" overlay={popover}>
                                                <span className="info-icon-display"><InfoIcon/></span>
                                            </OverlayTrigger>
                                            <img src={filledStar} alt=''></img>
                                            <img src={filledStar} alt=''></img>
                                            <img src={filledStar} alt=''></img>
                                            <img src={filledStar} alt=''></img>
                                            <img src={filledNotStar} alt=''></img>
                                        </div>
                                    ): (
                                        <div className="starsShow">
                                                <OverlayTrigger trigger="hover" placement="right" overlay={popover}>
                                                <span className="info-icon-display"><InfoIcon/></span>
                                            </OverlayTrigger>
                                            <img src={filledStar} alt=''></img>
                                            <img src={filledStar} alt=''></img>
                                            <img src={filledStar} alt=''></img>
                                            <img src={filledStar} alt=''></img>
                                            <img src={filledStar} alt=''></img>
                                        </div>
                                    )}
                                </div>
                                <div className="results-estimate-price">
                                    <p className="estimatedPrice">Prix estimé</p>
                                    <h3>
                                        { this.props.espacePro.EstimationDetails.estimation ? 
                                        (
                                            <>
                                            <CountUp duration={1}
                                                separator=" "
                                                decimal=","
                                                end={Math.round(this.props.espacePro.EstimationDetails.estimation.toFixed() / 1000) * 1000} />  MAD
                                                </>
                                        )
                                        : ('')

                                        }
                                         
                                    </h3> 
                                    <p className="estimatedPriceM2">
                                    { this.props.espacePro.EstimationDetails.estimation ? 
                                        (
                                            <>
                                        <CountUp duration={1}
                                            separator=" "
                                            decimal="," end={
                                                Math.round(
                                                    this.props.espacePro.EstimationDetails.estimation.toFixed() /
                                                    this.props.espacePro.EstimationDetails.surfacehabitable
                                                )
                                            }/>
                                        MAD / m2
                                        </>
                                        )
                                        : ('')

                                        }
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
                                            { this.props.espacePro.EstimationDetails.estimation ? 
                                        (
                                            <>
                                            <CountUp duration={1}
                                                    separator=" "
                                                    decimal="," end={
                                            Math.round(
                                                    (this.props.espacePro.EstimationDetails.estimation.toFixed() * 
                                                    (1 - (this.props.espacePro.EstimationDetails.variateur / 100))) /
                                                    1000
                                                ) * 1000
                                            } /> MAD
                                            </>
                                        )
                                        : ('')

                                        }
                                            </div>
                                        </div>
                                        <div className="priceBarPricesHigh">
                                            <div className="priceBarPricesHighTitle">
                                                Prix élevé
                                            </div>
                                            <div className="priceBarPricesHighPrice">
                                            { this.props.espacePro.EstimationDetails.estimation ? 
                                        (
                                            <>
                                            <CountUp duration={1}
                                                    separator=" "
                                                    decimal="," end={
                                                    Math.round(
                                                        (this.props.espacePro.EstimationDetails.estimation.toFixed() *
                                                        (1 + (this.props.espacePro.EstimationDetails.variateur / 100))) /
                                                        1000
                                                    ) * 1000
                                                } /> MAD
                                                </>
                                        )
                                        : ('')

                                        }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="priceBarBar"></div>
                                </div>

                
                                    <hr></hr> 
                                    <div className = "estimationActions">
                                            <h5>Actions</h5>

                                            {this.state.shareLink || this.props.espacePro.EstimationDetails.shareLink ? 
                                                (
                                                    <>
                                                    <p>Cliquez sur <span>Copier</span> pour copier le lien de partage</p>
                                                    <div className = "shareLink">
                                                        <div className = "copy-link">
                                                            {this.state.shareLink || window.location.origin + '/estimations?token=' + this.props.espacePro.EstimationDetails.shareLink}
                                                        </div>
                                                        <CopyToClipboard text={this.state.shareLink || window.location.origin + '/estimations?token=' + this.props.espacePro.EstimationDetails.shareLink}
                                                            onCopy={() => this.setState({copied: true, open: true}) }>
                                                            <span className = "copy">Copier</span>
                                                        </CopyToClipboard>
                                                            
                                                        
                                                    
                                                        <Snackbar
                                                        open={this.state.open}
                                                        onClose={this.handleClose}
                                                        TransitionComponent="TransitionUp"
                                                        message="Copié !"
                                                        />
                                                    </div>
                                                    
                                                    </>
                                                )
                                                : ('')
                                                }
                                            <div className = "row">
                                                {/* <div className = "col-md-4">
                                                    <button 
                                                    onClick={() => this.setNewEstimation(this.props.espacePro.EstimationDetails)}
                                                    type="button" 
                                                    className="button button-primaire">
                                                    {this.state.loading && this.state.action === 'maj' ? ( <Spinner animation="border" className = "text-white" size="sm"/>): 'Mettre à jour'}</button>
                                                </div> */}

                                                {/* <div className = "col-md-3">
                                                <button 
                                                    onClick={() => this.meRappeler(this.props.espacePro.EstimationDetails.estimationId)}
                                                    type="button" 
                                                    className="button button-primaire">
                                                        {this.state.loading && this.state.action === 'majphone' ? ( <Spinner animation="border" className = "text-white" size="sm"/>): 'Rappelez moi'}
                                                        </button>
                                                </div> */}

                                                <div className = "col-md-4">
                                                <button 
                                                    onClick={() => this.shareEstimation(this.props.espacePro.EstimationDetails.estimationId)}
                                                    type="button" 
                                                    className="button button-share">
                                                        
                                                       {this.state.loading && this.state.action === 'share' ? ( <Spinner animation="border" className = "text-white" size="sm"/>): 'Partager'

                                                       }
                                                        </button> 
                                                </div>

                                                <div className = "col-md-4">
                                                <button 
                                                    onClick={() => this.deleteEstimation(this.props.espacePro.EstimationDetails)}
                                                    type="button" 
                                                    className="button button-danger">
                                                        {this.state.loading && this.state.action === 'delete' ? ( <Spinner animation="border" className = "text-white" size="sm"/>): 'Supprimer'}
                                                        </button>
                                                </div>
                                            </div>
                                            
                                            
                                    </div>
                                   
                                    <hr></hr>

                                    <div className = "estimationCaracteristics">
                                        <h5>Caractéristiques</h5>
                                        {this.props.espacePro.EstimationDetails.bien && this.props.espacePro.EstimationDetails.bien === 'appartement' ?  
                                        (
                                            <div className = "row">
                                                <div className = "col-md-6">
                                                    {this.props.espacePro.EstimationDetails.address ? 
                                                    (<p className="details-bien"> <span className ="details-bien-title">Adresse :</span> {this.props.espacePro.EstimationDetails.address}</p>)
                                                    : '' }

                                                    {this.props.espacePro.EstimationDetails.agencement ? 
                                                    (<p className="details-bien"> <span className ="details-bien-title">Agencement : </span> 
                                                    {this.props.espacePro.EstimationDetails.agencement === 1 ?
                                                    (
                                                        <div className="">
                                                            <img src={filledStar} alt=''></img>
                                                            <img src={filledNotStar} alt=''></img>
                                                            <img src={filledNotStar} alt=''></img>
                                                            <img src={filledNotStar} alt=''></img>
                                                        </div>
                                                    ): 
                                                    this.props.espacePro.EstimationDetails.agencement === 2 ?
                                                        (
                                                            <div className="">
                                                                <img src={filledStar} alt=''></img>
                                                                <img src={filledStar} alt=''></img>
                                                                <img src={filledNotStar} alt=''></img>
                                                                <img src={filledNotStar} alt=''></img>
                                                            </div>
                                                        ):
                                                        this.props.espacePro.EstimationDetails.agencement === 3 ?
                                                        (
                                                            <div className="">
                                                                <img src={filledStar} alt=''></img>
                                                                <img src={filledStar} alt=''></img>
                                                                <img src={filledStar} alt=''></img>
                                                                <img src={filledNotStar} alt=''></img>
                                                            </div>
                                                        ):
                                                        this.props.espacePro.EstimationDetails.agencement === 4 ?
                                                        (
                                                            <div className="">
                                                                <img src={filledStar} alt=''></img>
                                                                <img src={filledStar} alt=''></img>
                                                                <img src={filledStar} alt=''></img>
                                                                <img src={filledStar} alt=''></img>
                                                            </div>
                                                        ): ''}
                                                    </p>)
                                                    : '' }
                                                    {this.props.espacePro.EstimationDetails.ascenseur !== undefined? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Ascenceur : </span> {this.props.espacePro.EstimationDetails.ascenseur === 1 ? 'Oui' : 'Non'}</p>)
                                                    : '' }
                                                    {this.props.espacePro.EstimationDetails.balcon !== undefined ? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Balcon : </span> {this.props.espacePro.EstimationDetails.balcon === 1 ? 'Oui' : 'Non'}</p>)
                                                    : '' }
                                                    {this.props.espacePro.EstimationDetails.calme !== undefined? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Calme : </span> {this.props.espacePro.EstimationDetails.calme === 1 ? 'Oui' : 'Non'}</p>)
                                                    : '' }
                                                    {this.props.espacePro.EstimationDetails.cave !== undefined? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Cave : </span> {this.props.espacePro.EstimationDetails.cave === 1 ? 'Oui' : 'Non'}</p>)
                                                    : '' }

                                                    {this.props.espacePro.EstimationDetails.chambreservice !== undefined? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Chambre de service : </span> {this.props.espacePro.EstimationDetails.chambreservice === 1 ? 'Oui' : 'Non'}</p>)
                                                    : '' }
                                                    {this.props.espacePro.EstimationDetails.cheminee !== undefined? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Cheminée : </span> {this.props.espacePro.EstimationDetails.cheminee === 1 ? 'Oui' : 'Non'}</p>)
                                                    : '' }
                                                    {this.props.espacePro.EstimationDetails.concierge !== undefined? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Concierge : </span> {this.props.espacePro.EstimationDetails.concierge === 1 ? 'Oui' : 'Non'}</p>)
                                                    : '' }
                                                    {this.props.espacePro.EstimationDetails.construction ? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Construction : </span> {
                                                        this.props.espacePro.EstimationDetails.construction === -1 ?
                                                        ('Je ne sais pas') :
                                                        this.props.espacePro.EstimationDetails.construction === 0 ?
                                                        ('Moins de 5 ans'):
                                                        this.props.espacePro.EstimationDetails.construction === 1 ?
                                                        ('Entre 10 et 20 ans'):
                                                        this.props.espacePro.EstimationDetails.construction === 2 ?
                                                        ('Plus de 20 ans'):
                                                        this.props.espacePro.EstimationDetails.construction === 3 ?
                                                        ('Moins de 10 ans'):
                                                        ('Construction neuve')
                                                        }</p>)
                                                    : '' }
                                                    {this.props.espacePro.EstimationDetails.dateTransactions ? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Date de la transaction : </span> {this.props.espacePro.EstimationDetails.dateTransactions}</p>)
                                                    : '' }
                                                    {this.props.espacePro.EstimationDetails.duplex !== undefined? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Duplex : </span> {this.props.espacePro.EstimationDetails.duplex === 1 ? 'Oui' : 'Non'}</p>)
                                                    : '' }
                                                    {this.props.espacePro.EstimationDetails.etage !== undefined? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Etage : </span>{ this.props.espacePro.EstimationDetails.etage === 1 ? 'Oui' : 'Non'}</p>)
                                                    : '' }
                                                    {this.props.espacePro.EstimationDetails.etagesimmeuble !== undefined? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Etage immeuble : </span> {this.props.espacePro.EstimationDetails.etagesimmeuble === 1 ? 'Oui' : 'Non'}</p>)
                                                    : '' }
                                                    {this.props.espacePro.EstimationDetails.finition ? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Finition : </span> 
                                                    {this.props.espacePro.EstimationDetails.finition === 'correct' ? ('Correct') :
                                                    this.props.espacePro.EstimationDetails.finition === 'travauxaprevoir' ? ('Travaux à prévoir') :
                                                    this.props.espacePro.EstimationDetails.finition === 'refaitaneuf' ? ('Refait à neuf') : ''
                                                    }</p>)
                                                    : '' }
                                                </div>

                                                <div className = "col-md-6">
                                                    
                                                    {this.props.espacePro.EstimationDetails.luminosite ? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Luminosité : </span> 
                                                    {this.props.espacePro.EstimationDetails.luminosite === 1 ?
                                                    (
                                                        <div className="">
                                                            <img src={filledStar} alt=''></img>
                                                            <img src={filledNotStar} alt=''></img>
                                                            <img src={filledNotStar} alt=''></img>
                                                            <img src={filledNotStar} alt=''></img>
                                                        </div>
                                                    ): 
                                                    this.props.espacePro.EstimationDetails.luminosite === 2 ?
                                                        (
                                                            <div className="">
                                                                <img src={filledStar} alt=''></img>
                                                                <img src={filledStar} alt=''></img>
                                                                <img src={filledNotStar} alt=''></img>
                                                                <img src={filledNotStar} alt=''></img>
                                                            </div>
                                                        ):
                                                        this.props.espacePro.EstimationDetails.luminosite === 3 ?
                                                        (
                                                            <div className="">
                                                                <img src={filledStar} alt=''></img>
                                                                <img src={filledStar} alt=''></img>
                                                                <img src={filledStar} alt=''></img>
                                                                <img src={filledNotStar} alt=''></img>
                                                            </div>
                                                        ):
                                                        this.props.espacePro.EstimationDetails.luminosite === 4 ?
                                                        (
                                                            <div className="">
                                                                <img src={filledStar} alt=''></img>
                                                                <img src={filledStar} alt=''></img>
                                                                <img src={filledStar} alt=''></img>
                                                                <img src={filledStar} alt=''></img>
                                                            </div>
                                                        ): ''
                                                    }</p>)
                                                    : '' }
                                                    {this.props.espacePro.EstimationDetails.orientation ? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Orientation : </span> {this.props.espacePro.EstimationDetails.orientation}</p>)
                                                    : '' }
                                                    {this.props.espacePro.EstimationDetails.parking !== undefined? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Parking : </span> {this.props.espacePro.EstimationDetails.parking === 1 ? 'Oui' : 'Non'}</p>)
                                                    : '' }
                                                    {this.props.espacePro.EstimationDetails.placesparking !== undefined ? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Place de parking : </span> {this.props.espacePro.EstimationDetails.placesparking}</p>)
                                                    : '' }
                                                    {this.props.espacePro.EstimationDetails.prix ? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Prix : </span> 
                                                    { new Intl.NumberFormat(
                                                        'ma',
                                                        {
                                                            style: 'currency',
                                                            currency: 'MAD',
                                                            minimumFractionDigits: 0,
                                                            maximumFractionDigits: 0
                                                        })
                                                        .format(this.props.espacePro.EstimationDetails.prix)
                                                        .replaceAll(',', ' ') } </p>)
                                                    : '' }
                                                    {this.props.espacePro.EstimationDetails.redejardin !== undefined? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Rez de jardin : </span> {this.props.espacePro.EstimationDetails.redejardin === 'non' ? 'Non' : 'Oui collectif'}</p>)
                                                    : '' }
                                                    {this.props.espacePro.EstimationDetails.renovee !== undefined? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Rénovée : </span> {this.props.espacePro.EstimationDetails.renovee === 1 ? 'Oui' : 'Non'}</p>)
                                                    : '' }
                                                    {this.props.espacePro.EstimationDetails.residencefermee !== undefined? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Residence fermée : </span> {this.props.espacePro.EstimationDetails.residencefermee === 1 ? 'Oui' : 'Non'}</p>)
                                                    : '' }
                                                    {this.props.espacePro.EstimationDetails.sdb !== undefined? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Salles de bain : </span> {this.props.espacePro.EstimationDetails.sdb}</p>)
                                                    : '' }
                                                    {this.props.espacePro.EstimationDetails.surfacebalcon !== undefined? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Surface du balcon : </span> {this.props.espacePro.EstimationDetails.surfacebalcon}</p>)
                                                    : '' }
                                                    {this.props.espacePro.EstimationDetails.surfacecave !== undefined? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Surface de la cave : </span> {this.props.espacePro.EstimationDetails.surfacecave} m²</p>)
                                                    : '' }
                                                    {this.props.espacePro.EstimationDetails.surfacehabitable !== undefined? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Surface habitable : </span> {this.props.espacePro.EstimationDetails.surfacehabitable} m²</p>)
                                                    : '' }
                                                    {this.props.espacePro.EstimationDetails.surfaceparking ? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Surface du parking : </span> {this.props.espacePro.EstimationDetails.surfaceparking} m²</p>)
                                                    : '' }
                                                    {this.props.espacePro.EstimationDetails.typologie ? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Nombre de chambres : </span> {this.props.espacePro.EstimationDetails.typologie}</p>)
                                                    : '' }
                                                    {this.props.espacePro.EstimationDetails.vueexceptionnelle !== undefined? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Vue exceptionnelle : </span> {this.props.espacePro.EstimationDetails.vueexceptionnelle === 1 ? 'Oui' : 'Non'}</p>)
                                                    : '' }
                                                </div>
                                            </div>
                                        ) 
                                        : this.props.espacePro.EstimationDetails.bien && this.props.espacePro.EstimationDetails.bien === 'villa' ? 
                                        (
                                            <div className = "row">
                                            <div className = "col-md-6">
                                                {this.props.espacePro.EstimationDetails.address ? 
                                                (<p className="details-bien"><span className ="details-bien-title"> Adresse : </span> {this.props.espacePro.EstimationDetails.address}</p>)
                                                : '' }
                                                {this.props.espacePro.EstimationDetails.anneeconstruction ? 
                                                (<p className="details-bien"><span className ="details-bien-title"> Année de construction : </span> 
                                                {this.props.espacePro.EstimationDetails.anneeconstruction === -1 ?
                                                ('Je ne sais pas') :
                                                this.props.espacePro.EstimationDetails.anneeconstruction === 0 ?
                                                ('Neuve') :
                                                this.props.espacePro.EstimationDetails.anneeconstruction === 1 ?
                                                ('Entre 1 et 5 ans') :
                                                this.props.espacePro.EstimationDetails.anneeconstruction === 2 ?
                                                ('Entre 5 et 10 ans') :
                                                this.props.espacePro.EstimationDetails.anneeconstruction === 3 ?
                                                ('Plus de 10 ans') : 
                                                ('Plus de 20 ans')
                                                }</p>)
                                                : '' }
                                                {this.props.espacePro.EstimationDetails.calme !== undefined? 
                                                (<p className="details-bien"><span className ="details-bien-title"> Calme : </span> {this.props.espacePro.EstimationDetails.calme === 1 ? 'Oui' : 'Non'}</p>)
                                                : '' }
                                                {this.props.espacePro.EstimationDetails.chaufeausolaire !== undefined? 
                                                (<p className="details-bien"><span className ="details-bien-title"> Chauffe eau solaire : </span> {this.props.espacePro.EstimationDetails.chaufeausolaire === 1 ? 'Oui' : 'Non'}</p>)
                                                : '' }
                                                {this.props.espacePro.EstimationDetails.cheminee !== undefined? 
                                                (<p className="details-bien"><span className ="details-bien-title"> Cheminée : </span> {this.props.espacePro.EstimationDetails.cheminee === 1 ? 'Oui' : 'Non'}</p>)
                                                : '' }
                                                {this.props.espacePro.EstimationDetails.dateTransactions ? 
                                                (<p className="details-bien"><span className ="details-bien-title"> Date de la transaction : </span> {this.props.espacePro.EstimationDetails.dateTransactions}</p>)
                                                : '' }
                                                {this.props.espacePro.EstimationDetails.etatgeneral ? 
                                                (<p className="details-bien"><span className ="details-bien-title"> Etat géneral : </span> 
                                                {this.props.espacePro.EstimationDetails.etatgeneral === 'travauxaprevoir' ?
                                                ('Travaux à prévoir') : 
                                                this.props.espacePro.EstimationDetails.etatgeneral === 'correct' ?
                                                ('Correct') :
                                                ('Etat neuf') 
                                                }</p>)
                                                : '' }
                                                {this.props.espacePro.EstimationDetails.garage !== undefined? 
                                                (<p className="details-bien"><span className ="details-bien-title"> Garage : </span> {this.props.espacePro.EstimationDetails.garage === 1 ? 'Oui' : 'Non'}</p>)
                                                : '' }
                                                {this.props.espacePro.EstimationDetails.murmitoyen !== undefined? 
                                                (<p className="details-bien"><span className ="details-bien-title"> Mur moyen : </span> {this.props.espacePro.EstimationDetails.murmitoyen === 1 ? 'Oui' : 'Non'}</p>)
                                                : '' }
                                            </div>

                                            <div className = "col-md-6">
                                                
                                            
                                                {this.props.espacePro.EstimationDetails.piscine !== undefined? 
                                                (<p className="details-bien"><span className ="details-bien-title"> Piscine : </span> {this.props.espacePro.EstimationDetails.piscine === 1 ? 'Oui' : 'Non'}</p>)
                                                : '' }
                                                {this.props.espacePro.EstimationDetails.prix ? 
                                                (<p className="details-bien"><span className ="details-bien-title"> Prix : </span>
                                                { new Intl.NumberFormat(
                                                        'ma',
                                                        {
                                                            style: 'currency',
                                                            currency: 'MAD',
                                                            minimumFractionDigits: 0,
                                                            maximumFractionDigits: 0
                                                        })
                                                        .format(this.props.espacePro.EstimationDetails.prix)
                                                        .replaceAll(',', ' ') } 
                                                </p>)
                                                : '' }
                                                
                                                {this.props.espacePro.EstimationDetails.sdb !== undefined? 
                                                (<p className="details-bien"><span className ="details-bien-title"> Salles de bain : </span> {this.props.espacePro.EstimationDetails.sdb}</p>)
                                                : '' }
                                                {this.props.espacePro.EstimationDetails.surfaceconstruite !== undefined? 
                                                (<p className="details-bien"><span className ="details-bien-title"> Surface construite : </span> {this.props.espacePro.EstimationDetails.surfaceconstruite} m²</p>)
                                                : '' }
                                                {this.props.espacePro.EstimationDetails.surfaceterrain !== undefined? 
                                                (<p className="details-bien"><span className ="details-bien-title"> Surface du terrain : </span> {this.props.espacePro.EstimationDetails.surfaceterrain} m²</p>)
                                                : '' }
                                                {this.props.espacePro.EstimationDetails.typechauffage ? 
                                                (<p className="details-bien"><span className ="details-bien-title"> Type de chauffage : </span> 
                                                {this.props.espacePro.EstimationDetails.typechauffage === -1 ?
                                                ('Je ne sais pas') :
                                                this.props.espacePro.EstimationDetails.typechauffage === 0 ?
                                                ('Electrique') :
                                                this.props.espacePro.EstimationDetails.typechauffage === 1 ?
                                                ('Chaudière centrale au fuel') :
                                                this.props.espacePro.EstimationDetails.typechauffage ===   2 ?
                                                ('Chaudière centrale au gaz') : ('Pompe à chaleur')

                                                }</p>)
                                                : '' }
                                                {this.props.espacePro.EstimationDetails.typevilla ? 
                                                (<p className="details-bien"><span className ="details-bien-title"> Type de villa : </span> 
                                                {this.props.espacePro.EstimationDetails.typevilla === 'villajumelee' ?
                                                ('Villa jumelée') : ('Villa en bande')
                                                }</p>)
                                                : '' }
                                                {this.props.espacePro.EstimationDetails.typologie ? 
                                                (<p className="details-bien"><span className ="details-bien-title"> Nombre de chambres : </span> {this.props.espacePro.EstimationDetails.typologie}</p>)
                                                : '' }
                                                {this.props.espacePro.EstimationDetails.vueexceptionnelle ? 
                                                (<p className="details-bien"><span className ="details-bien-title"> Vue exceptionnelle : </span> {this.props.espacePro.EstimationDetails.vueexceptionnelle === 1 ? 'Oui' : 'Non'}</p>)
                                                : '' }
                                            </div>
                                        </div>
                                        ) 
                                        : (
                                            <div className = "row">

                                                <div className = "col-md-6">
                                                {this.props.espacePro.EstimationDetails.address ? 
                                                (<p className="details-bien"><span className ="details-bien-title"> Adresse : </span> {this.props.espacePro.EstimationDetails.address}</p>)
                                                : '' }
                                                {this.props.espacePro.EstimationDetails.construction ? 
                                                (<p className="details-bien"><span className ="details-bien-title"> Année de construction : </span> {this.props.espacePro.EstimationDetails.construction}</p>)
                                                : '' }
                                                {this.props.espacePro.EstimationDetails.dateTransactions ? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Date de la transaction : </span> {this.props.espacePro.EstimationDetails.dateTransactions}</p>)
                                                : '' }
                                                {this.props.espacePro.EstimationDetails.etage !== undefined? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Etage : </span> {this.props.espacePro.EstimationDetails.etage}</p>)
                                                : '' }
                                                
                                                </div>

                                                <div className = "col-md-6">
                                                {this.props.espacePro.EstimationDetails.prix !== undefined? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Prix : </span> 
                                                    { new Intl.NumberFormat(
                                                        'ma',
                                                        {
                                                            style: 'currency',
                                                            currency: 'MAD',
                                                            minimumFractionDigits: 0,
                                                            maximumFractionDigits: 0
                                                        })
                                                        .format(this.props.espacePro.EstimationDetails.prix)
                                                        .replaceAll(',', ' ') }
                                                    </p>
                                                    )
                                                : '' }
                                                {this.props.espacePro.EstimationDetails.surface !== undefined? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Suface : </span> {this.props.espacePro.EstimationDetails.surface} m²</p>)
                                                : '' }

                                                {this.props.espacePro.EstimationDetails.surfaceParking !== undefined? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Suface de parking : </span> {this.props.espacePro.EstimationDetails.surfaceParking} m²</p>)
                                                : '' }

                                                {this.props.espacePro.EstimationDetails.surfaceTerrasse !== undefined? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Suface de de la terrasse : </span> {this.props.espacePro.EstimationDetails.surfaceTerrasse} m²</p>)
                                                : '' }
                                                </div>
                                            </div>
                                        )
                                        }
                    
                
                                    </div>
                                    
                                    <div className= "closeDetails" onClick = {() => {this.closeDetails()}}>
                                        <span> <i className = "fas fa-times-circle"></i> </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        );
    }
}



const mapStateToProps = (state) => {
    const uid = state.auth.uid;
    const email = state.auth.email;
    const transaction = state.espacePro;
    console.log(transaction)
    return {
      uid: uid,
      email: email,
      espacePro: transaction,
      user: state.auth
    };
};  
export default connect(mapStateToProps)(EstimationCardDetails);