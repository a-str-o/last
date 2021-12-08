import React from 'react';
import { Link } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { connect } from "react-redux";
import './StepperTransactionType.scss';
import AppartIcon from '../../../assets/img/building.svg';

import ChangeAdresse from './ChangeAdresse';
import { toast } from "react-toastify";



const types = [
    {
        icon: 'fas fa-home',
        title:'Villa',
        id:1,
        image: 'HouseIcon'
    },
    {
        icon: 'fas fa-city',
        title:'Appartement',
        id:2,
        image: AppartIcon
    },
    {
        icon: 'fas fa-map-signs',
        title:'Terrain nu',
        id:3
    }
];

class StepperTransactionType extends React.Component {


    returnPreviousStep = () => {
        this.props.dispatch({ type: 'SET_TRANS_ACTIVE_STEP',data: 0 });
    }

    onHandleNextChange = () => {
        this.props.dispatch({ type: 'SET_TRANS_ACTIVE_STEP',data: 2 });
    }

    render() {
        return <div className="row justify-content">
            <div className="col-md-12 col-sm-12 col-lg-8">
                <div className="step second-step">
                    <div className="sectionTitle desktop">
                    <ChangeAdresse />
                        <h5>De quel type de bien s'agit-il ?</h5>
                    </div>
                    <Dialog
                    open={this.props.espacePro.active_house === 3}
                    onClose={() =>{ this.props.dispatch({ type: 'UPDATE_TRANS_ACTIVE_HOUSE', data: 2 }) }}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                        <DialogContent>
                            <DialogContentText id="alert-dialog-estimate">
                                <div className = "close" onClick = {() =>{ this.props.dispatch({ type: 'UPDATE_TRANS_ACTIVE_HOUSE', data: 2 }) }}> x </div>
                                <div  className="text-center">
                                    <h5>Transaction indisponible</h5>
                                    <p>L'ajout de cette transaction sera bientôt disponible sur agenz.ma</p>
                                    <Link to='/contact'>Contactez-nous</Link> pour ajouter cette transaction à votre portefeuille
                                </div>
                            </DialogContentText>
                        </DialogContent>
                    </Dialog>
                    <div className="col-sm-12 change-adresse-ipad" >
                        <ChangeAdresse />
                                </div>
                    <div className="row">
                    <div className="col-sm-12 col-md-4 change-adresse-mobile" >
                        <ChangeAdresse />
                                </div>
                          
                        {types.map((type, index) => {
                            return(
                                <div className="col-sm-12 col-md-4" key={index} >
                                    <div className={`estimation-type estimation-type-${type.id}`} onClick={() =>{
                                        if(this.props.espacePro.transaction.address===""){
                                            toast.error("Veuillez préciser l'adresse à afficher pour cette vente")
                                        
                                        }
                                        else{
                                         if (type.id === 1) {
                                            this.props.dispatch({ type: 'TRANSACTION_TYPE', data: 'villa' });
                                            this.onHandleNextChange()
                                         }else if(type.id === 2) {
                                            this.props.dispatch({ type: 'TRANSACTION_TYPE', data: 'appartement' });
                                            this.onHandleNextChange()
                                         }
                                         else {
                                            this.props.dispatch({ type: 'UPDATE_TRANS_ACTIVE_HOUSE', data: type.id }) }
                                         }
                                        }
                                        
                                        }>
                                        <div className={type.id === 1 || type.id === 2 ? "estimation-type-icon" : "estimation-type-icon2"}>
                                            {
                                                type.id === 1 ? (
                                                    <svg width="70px" height="70px" viewBox="0 0 56 56" version="1.1" xmlns="http://www.w3.org/2000/svg" class="radio-rect__icon path__stroke polyline__stroke"><g id="assets" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" opacity="1" stroke-linejoin="round"><g id="House" stroke-width="2" stroke="#393939"><g id="Page-1" transform="translate(8.000000, 13.000000)"><polyline id="Stroke-1" points="-7.27196081e-14 13 20 0 40 13"></polyline><path d="M6,9 L6,31 L16,31 L16,22 C16,21.447 16.448,21 17,21 L23,21 C23.553,21 24,21.447 24,22 L24,31 L34,31 L34,9" id="Stroke-3"></path></g></g></g></svg>
                                                ): type.id === 2 ? (
                                                    
                                                    <svg width="70px" height="70px" viewBox="0 0 56 56" version="1.1" xmlns="http://www.w3.org/2000/svg" class="radio-rect__icon path__stroke polyline__stroke"><g id="assets" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" opacity="1" stroke-linejoin="round"><g id="Appartment" stroke="#393939" stroke-width="2"><g id="Page-1" transform="translate(10.000000, 7.000000)"><path d="M4,41 L4,1 C4,0.448 4.448,0 5,0 L31,0 C31.553,0 32,0.448 32,1 L32,41 L21,41 L21,33 C21,32.447 20.553,32 20,32 L16,32 C15.448,32 15,32.447 15,33 L15,41 L4,41 Z" id="Stroke-1" stroke-linecap="round"></path><path d="M11,12 L11,9" id="Stroke-3" stroke-linecap="square"></path><path d="M18,12 L18,9" id="Stroke-5" stroke-linecap="square"></path><path d="M25,12 L25,9" id="Stroke-7" stroke-linecap="square"></path><path d="M11,23 L11,20" id="Stroke-9" stroke-linecap="square"></path><path d="M18,23 L18,20" id="Stroke-11" stroke-linecap="square"></path><path d="M25,23 L25,20" id="Stroke-13" stroke-linecap="square"></path><path d="M0,41 L36,41" id="Stroke-15" stroke-linecap="round"></path></g></g></g></svg>
                                                ): (
<svg width="70px" height="70px" viewBox="0 0 56 56" version="1.1" xmlns="http://www.w3.org/2000/svg" class="radio-rect__icon path__stroke polyline__stroke"><title>Terrain nu</title><g id="assets" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" opacity="1"  stroke-linejoin="round"><g id="Appartment" stroke="#2ea7f9" stroke-width="2"><g id="Page-1" transform="translate(10.000000, 1.000000)"><path d="M0,41 L0,1 L41,1 L41,41 L0,41" id="Stroke-1" stroke-linecap="round"></path></g></g></g></svg>                                                
                                                )
                                            }
                                            
                                        </div>
                                        <div className="estimation-type-title">{type.title}</div>
                                    </div>
                                </div>
                          
                          );
                        })}
                    </div>
                </div>
            </div>
            <div className ="second-button">
                <button className="button button-secondary secondaryCustom" type="button" onClick={this.returnPreviousStep}>Retour</button>

            </div>
            {/* <button className="button button-primary primaryyCustom" type="button" onClick={this.onHandleNextChange}>Valider</button> */}
        </div>
    }
}

const mapStateToProps = (state) => {
    const transaction = state.espacePro;
    return {
        espacePro: transaction
    };
};


export default connect(mapStateToProps)(StepperTransactionType);