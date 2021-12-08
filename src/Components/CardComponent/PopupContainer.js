import React, { Component } from 'react'
import './PopupContainer.scss'
import logo_agenz_white from '../../assets/img/logo_agenz_white.jpeg'
import CarouselInPopup from './components/CarouselInPopup';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

import { withStyles, createStyles } from '@material-ui/styles';
import Axios from "axios"
import { connect } from "react-redux";
import { css } from "@emotion/core";
import ObtenirLePrix from "./ObtenirLePrix"
import {withRouter} from 'react-router-dom';



import BeatLoader from "react-spinners/BeatLoader";
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;





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

export class PopupContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            moreInfo : this.props.moreInfo,
            name : null,
            email : null,
            nameError : null, 
            emailError : null,
            phoneError : null,
            phone : null, 
            message : "Bonjour, j'ai un projet de vente et je souhaite prendre rendez-vous pour faire estimer mon bien. Merci.",
            loadingPopup : true,
        }
    }
    isEmail(email) {
        let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    registerContact() {
        
        // validate fields are filled
        var error = [false, false, false];
        if (this.state.name === null) {
            error[0] = true;
        }
        if (this.state.email === null || !this.isEmail(this.state.email)) {
            error[1] = true;
        }
        if (this.state.phone === null) {
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
            transaction : this.state.selectedId,
            address : this.props.selectedAddress,
            contributeur : this.props.agenceTransaction.nameEntreprise,
            contributeurId : this.props.agenceTransaction.responsable,
            display : true
        }
        
        // write to firebase
        Axios.post('https://us-central1-agenz-website-prod.cloudfunctions.net/api/addContact',{ data: data }).then(result => {
            this.props.dispatch({type: 'DETAILS_SEND_SUCCESS'});
            this.closeModal();
        }).catch((e) => {
        // //console.log(e)
            this.props.dispatch({type: 'DETAILS_SEND_FAILURE'});
            this.closeModal();
        });
    }
    
    closeModal = () => {
        this.props.history.push('/prix-immobilier')
        this.setState({
            ...this.state,
            moreInfo: false,
            selectedId: null,
            selectedTransaction: null,
            agenceTransaction: null
        })
    }

    openModal(id){
        if (document.fullscreenElement) {
            document.exitFullscreen();
        }
        this.setState({
            ...this.state,
            moreInfo: true,
            selectedId: id,
            selectedTransaction: this.props.transactions.filter(el => el.transactionId === id)[0],
            agenceTransaction: this.props.agences.filter(agence => agence.responsable === this.props.transactions.filter(el => el.transactionId === id)[0].contributeurId)[0]
        })
    }
    componentDidMount(){
        setTimeout(() => {
            this.setState({loadingPopup : false})
        },500)
    }
    render() {
        const { classes } = this.props;
        
        return (
       <>
           {this.state.loadingPopup ? (
               <div className="beat--loader">
                       <BeatLoader color='#2ea7f9' loading={true} css={override} size={10} />
                       </div>

               ):
               (
                <div className="popup--container-inside">

                <>
 
<div className="images--container">
                { this.props.images && this.props.images!=="null" && this.props.images!=="[]" ?  (
                    <div className="carousel--container">
                                           <CarouselInPopup images={
                                                JSON.parse(this.props.images)
                                            } />
                                              <div className="sold--container">
                                                <p className="sold--text" onClick={()=> {this.setState({moreInfo : true})}}>VENDU</p>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="carousel--container">
                                            <CarouselInPopup images={
                                                [logo_agenz_white,logo_agenz_white,logo_agenz_white]
                                            } />
                                            <div className="sold--container">
                                                <p className="sold--text">Vendu</p>
                                                </div>
                                            </div>
                )}
                </div>
                <div className="info--container">
                <div className="info--display" id="popup-transactions" >
                                    <p class="consistance"> {this.props.consistance} </p>
                                    <div className="polygone-price">
                                        </div>
                                        <div>
                                        <a class="agence--added" href={`https://agenz.ma/agence-immobiliere/casablanca/${this.props.agenceTransaction.nameEntreprise.replace(/\./g, '-').replace(/ /g, '-').replace(/é/g, 'e').replace(/ô/g, 'o')}/a/${this.props.agenceTransaction.reponsable}`} target="_blank" rel="noreferrer" > Ajouté par {this.props.agenceTransaction.nameEntreprise} </a>
                                        </div>
                                        <div >
                                        <p class="date--vente">Vendu en {this.props.dateTransactions} </p>
                                        </div>
                                        <div id="pro-button-activate">
                                        <span onClick={()=> {this.setState({moreInfo : true})}} class="get--price">Obtenir le prix </span>
                                        </div>
                                    </div>
                </div>


                </>
                </div>
               )
           }
                

            <Dialog
                open={this.state.moreInfo}
                disableBackdropClick={false}
                onClose={this.closeModal}
                classes={{paperWidthSm: classes.paperWidthSm }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                    <DialogContent>
                        <ObtenirLePrix 
                        images={this.props.images} consistance={this.props.consistance}
                        selectedAddress={this.props.selectedAddress}
                        dateTransactions={this.props.dateTransactions}      
                        construction={this.props.construction}
                        agenceTransaction={this.props.agenceTransaction}
                        transactionId={this.props.transactionId}/>
  
                    </DialogContent>
                </Dialog>
     
       </>
       )
    }
}
const mapStateToProps = (state) => {
    return {
        moreInfo : state.card.moreInfo
    };
};
export default connect(mapStateToProps)(withStyles(styles)(withRouter(PopupContainer)));
