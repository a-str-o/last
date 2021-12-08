import React from 'react';
import { connect } from "react-redux";
import './StepperTransactionYou.scss';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import firebase from './../../../Config/FirebaseConfig';
import { toast } from "react-toastify";
import NumberFormat from 'react-number-format';
import TextField from '@material-ui/core/TextField';
import { theme } from '../../../assets/theme'
import { ThemeProvider } from '@material-ui/core/styles';
import ImageUpload from './ImageUpload'
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

class StepperTransactionYou extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            prix: this.props.espacePro.transaction.prix,
            dateTransactions: this.props.espacePro.transaction.dateTransactions,
            consistance: this.props.espacePro.transaction.consistance,
            contributeur: this.props.espacePro.transaction.contributeur,
            dateTransactionAdded: '',
            openModal: false,
            images: []
        };
    }

    uploadImage = () => {
        var element = document.getElementById('im2');

        element.click();
    }

    returnPreviousStep = () => {
        this.props.dispatch({ type: 'SAVE_TRANS_USER_DETAILS', data: this.state });
        this.props.dispatch({ type: 'SET_TRANS_ACTIVE_STEP', data: 3 });
    }

    handleCloseLocationErrorModal = () => {
        this.setState({ openModal: false })
        this.props.dispatch({ type: 'REINIT_TRANS_FLOW' });
        this.props.dispatch({ type: 'SET_PRO_ACCOUNT_ACTIVE_MENU', data: 'transactions' })
    };

    onHandleNextChange = () => {
        const error = this.validateDetails();
        if (error) {
            this.props.dispatch({ type: 'FILL_TRANS_FORM_ERROR' });
            return;
        }
        const transaction = this.createTransaction(this.props.uid);
        // console.log(transaction)
        this.props.dispatch({ type: 'ADD_TRANS_FIREBASE', data: transaction });
        this.setState({ openModal: true })
    }

    onImagesChange = event => {
        const db = firebase.storage();
        let newName = null
        if (this.state.images.length < 5) {
            if ((event.target.files.length + this.state.images.length) <= 5) {
                for (let i = 0; i < event.target.files.length; i++) {
                    let img = event.target.files[i];
                    var fileExtension = '.' + img.name.split('.').pop();
                    newName = new Date().getTime() + fileExtension;
                    const uploadTask = db.ref(`images_transaction/${newName}`).put(img);

                    uploadTask.on(
                        "state_changed",
                        snapshot => { },
                        error => {
                            // console.log(error);
                        },
                        // eslint-disable-next-line
                        () => {
                            db
                                .ref("images_transaction")
                                .child(newName)
                                .getDownloadURL()
                                .then(url => {
                                    // console.log(url)
                                    this.state.images.push(url);
                                    this.setState({ images: this.state.images })

                                });
                        }
                    );

                }

                // console.log(this.state.images)

            } else {
                toast.error("Vous ne pouvez pas ajouter plus de 5 photos");
            }


        } else {
            toast.error("Vous ne pouvez pas ajouter plus de 5 photos");
        }

    }
    createConsistance() {
        let consist = ''
        if (this.props.espacePro.transaction.bien === "appartement") {
            if (this.props.espacePro.transaction.typologie === 1) {
                consist = 'Appartement 1 chambre'
            }
            else if (this.props.espacePro.transaction.typologie === 0) {
                consist = 'Appartement studio'
            }
            else {
                consist = `Appartement ${this.props.espacePro.transaction.typologie} chambres`
            }


        }
        else if (this.props.espacePro.transaction.bien === "villa") {

            if (this.props.espacePro.transaction.typologie === 1) {
                consist = 'Villa 1 chambre'
            }
            else {
                consist = `Villa ${this.props.espacePro.transaction.typologie} chambres`
            }
        }
        else {
            consist = "Terrain nu"
        }
        return consist


    }
    createTransaction() {
        // console.log(this.state.dateTransactions);
        const dateTransactions = this.getTransactionDate(this.state.dateTransactions);
        const today = new Date();
        const day = today.getDate();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        const dateTransactionAdded = day + '/' + month + '/' + year
        let consist = this.createConsistance()
        let surfaceeffective = 1;
        if (this.props.espacePro.transaction.bien === "appartement") {
            if (this.props.espacePro.transaction.parking) {
                surfaceeffective = this.props.espacePro.transaction.surfacehabitable + (this.props.espacePro.transaction.surfacecave + this.props.espacePro.transaction.surfacebalcon + this.props.espacePro.transaction.placesparking * 12) / 2
            }
            else {
                surfaceeffective = this.props.espacePro.transaction.surfacehabitable + (this.props.espacePro.transaction.surfacecave + this.props.espacePro.transaction.surfacebalcon) / 2
            }
        }
        else if (this.props.espacePro.transaction.bien === "villa") {
            surfaceeffective = this.props.espacePro.transaction.surfaceterrain
        }
        else {
            surfaceeffective = this.props.espacePro.transaction.surfaceterrain
        }
        return {
            ...this.props.espacePro.transaction,
            dateTransactions: dateTransactions,
            dateTransactionAdded: dateTransactionAdded,
            contributeur: this.props.email,
            contributeurId: this.props.uid,
            prix: this.state.prix,
            consistance: consist,
            images: this.props.estimationStatePro.images,
            surfaceeffective: surfaceeffective
        };
    }

    validateDetails() {
        var errorFound = false;
        if (this.state.dateTransactions === null || this.state.dateTransactions === '-' || this.state.dateTransactions === '' ||
            this.state.prix === null || this.state.prix === '-' || this.state.prix === ''
        ) {
            errorFound = true;
        }

        return errorFound;
    }

    getTransactionDate(date) {
        const Month = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
        const parsedate = new Date(date);
        const month = Month[parsedate.getMonth()];
        const year = parsedate.getFullYear();
        return month + ' ' + year
    }

    removeImage = (image) => {
        for (let [index, v] of this.state.images.entries()) {
            if (v === image) {

                this.state.images.splice(index, 1);


            }
        }
        this.setState({ images: this.state.images })
    }

    render() {
        return (

            <div className="row justify-content">
                <Dialog
                    open={this.state.openModal}
                    onClose={this.handleCloseLocationErrorModal}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogContent>
                        <DialogContentText id="alert-dialog-localisation-error">
                            <div className="text-center">
                                <h5>Ajout de la vente récente en cours ...</h5>
                                <p>Retrouvez cette vente récente ainsi que le prix actualisé par agenz sur la rubrique « Mes biens vendus » </p>
                                <button className="button button-primary" onClick={this.handleCloseLocationErrorModal}>
                                    Ok
                                </button>


                            </div>
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
                <ThemeProvider theme={theme}>
                    <div className="col-md-12 col-sm-12 col-lg-12">
                        <div className="sectionTitle desktop">
                            <h5>Informations sur la transaction</h5>
                            <p className="information--disclaimer">Ces informations sont utilisées uniquement pour améliorer votre visibilité ainsi que votre outil d'estimation</p>
                        </div>

                        <div className="step fifth-step">
                            <div className="form-group row justify-content alignStuffCenter">
                                <div className="col-md-12 col-sm-12 fifth-step-title fifth-step-date">
                                    {/* <input 
                                className="form-control no-border"
                                type="date"
                                id="dateTransactions"
                                placeholder="Date de la vente"
                                value={this.state.dateTransactions}
                                onChange={(e) => {this.setState({dateTransactions: e.target.value})}}
                                /> */}
                                    <TextField
                                        id="date"
                                        label="Date de la vente"
                                        type="date"
                                        defaultValue="16-03-2020"
                                        value={this.state.dateTransactions}
                                        onChange={(e) => { this.setState({ dateTransactions: e.target.value }) }}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </div>
                                <br></br>
                                <div className="col-md-12 col-sm-12 fifth-step-title fifth-step-price">
                                    {/* <input 
                                className="form-control no-border"
                                type="number"
                                min="0"
                                id="prix"
                                placeholder="Prix net vendeur"
                                value={this.state.prix}
                                onChange={(e) => {this.setState({prix: e.target.value})}}
                                /> */}
                                    <TextField InputProps={{
                                        inputComponent: NumberFormatCustom,
                                    }} error={this.state.prix_force_error} min="0" id="outlined-basic" label="Prix net vendeur" variant="outlined" onChange={(e) => { this.setState({ prix: e.target.value }) }} />

                                </div>
                            </div>
                            {/* <div className="form-group row justify-content alignStuffCenter">
                            <div className="col-md-12 col-sm-12 fifth-step-title">
                                <label for ="consistance">Description </label>
                                <textarea 
                                className="form-control no-border"
                                id="consistance"
                                placeholder="Ex : Appartement 2 chambres"
                                value={this.state.consistance}
                                onChange={(e) => {this.setState({consistance: e.target.value})}}
                                >
                                </textarea>
                            </div>
                        </div> */}

                            <div className="form-group row justify-content  transaction--pictures-container">
                                {/* <div className="col-md-12 col-sm-12 fifth-step-title">
                            <button 
                            className="button button-secondary secondaryCustom" 
                            type="button" 
                            onClick = {this.uploadImage}
                            className = "display-transation-image"
                            >Ajouter des photos</button>
                            </div> */}

                                {/* {this.state.images.length <=5 ? (
                                <div className = "input-file" >
                                    <input type="file"  name="myImage" accept="image/*" onChange={this.onImagesChange} id="im2" />
                                    <label for="im2"><i className ="fas fa-"></i></label>
                                </div>
                            ) : ''

                            }

                            <div class=" images-area">
                                {this.state.images.map((image, indexxx) => {
                                    return (
                                        <div class="transaction-images" style={{backgroundImage: "url("+image+")"}}>
                                            <div class="image-remove"  title="Retirer l'image" onClick = {() => {this.removeImage(image)}}> x </div>
                                        </div>
                                    );
                                })

                                }
                                
                            </div>
                             */}
                            </div>

                            <ImageUpload folder={"images_transaction"} />
                            {this.props.estimationStatePro.images.length > 0 ? (
                                <div className="alert--photo-container">
                                    <p className="alert--photo">
                                        Attention : vous avez déjà téléchargé ces images {this.props.estimationStatePro.images.map((item, index) => { return (<a href={item} target="_blank" rel="noreferrer">Photo {index + 1}, </a>) })} pour cette transaction. Un nouveau téléchargement écrasera ces images.
                            </p>
                                </div>) : (
                                    <div className="alert--photo-container">
                                    </div>
                                )}
                            <div className="buttonsHolder buttonsHolder-transaction">
                                <button className="button button-secondary secondaryCustom" type="button" onClick={this.returnPreviousStep}>Retour</button>
                                {!this.props.estimationStatePro.images_added ? (

                                    this.props.estimationStatePro.images_ready ? (<button className="button button-primary primaryyCustom " type="button" onClick={this.onHandleNextChange}>Valider</button>
                                    ) : (
                                            <button className="button button-primary primaryyCustom primaryyCustom-photo" type="button" disabled>Vous devez ajouter des photos avant de valider</button>
                                        ))


                                    : (
                                        this.props.estimationStatePro.images_ready && this.props.estimationStatePro.images.length > 0 ? (<button className="button button-primary primaryyCustom " type="button" onClick={this.onHandleNextChange}>Valider</button>
                                        ) : (

                                                <button className="button button-primary primaryyCustom primaryyCustom-photo" type="button" disabled>Vous devez ajouter des photos avant de valider</button>
                                            ))
                                }
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

    const transaction = state.espacePro;
    return {
        espacePro: transaction,
        email: email,
        uid: uid,
        estimationStatePro: state.estimationStatePro
    };
};


export default connect(mapStateToProps)(StepperTransactionYou);