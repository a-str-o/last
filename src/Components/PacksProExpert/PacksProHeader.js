import pack_pro_background from './img/hero.png';



import React, { Component } from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import InscriptionForm from "../OffresProTimeline/InscriptionForm"


export class PacksProHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inscriptionForm : false,
            agencyName : ""
        }
    }
    handleClose= () =>{
        this.setState({inscriptionForm : false})
    }
    render() {
        return (
            <>
                               <Dialog
                                open={this.state.inscriptionForm}
                                onClose={this.handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                                maxWidth={'xl'}>
                                <DialogContent>
            <InscriptionForm agencyName={this.state.agencyName}/>
                                </DialogContent>
                        </Dialog>
      
            <div className="header--background--container">
            <div className="header-background-expert" style={{ backgroundImage: `url(${pack_pro_background})` }}>
                <div className="row">
                    <div className="block--right">
                        <span   className="header-img--container">
                            {/* <img
                            src={chateau} alt="Logo"
                            loading="lazy"
                            title="Nouveaux_packs_V1"
                            height="auto" width="auto"
                            className="wp-image" /> */}
                        </span>
                    </div>
                    <div className="block--left--inner-text--text-align">
                        <h1>
                            <strong>Le Pack Pro Expert</strong></h1>
                        <h3 >
                            <span className="text">Gagnez du temps et des mandats</span>
                        </h3>
                        <button className="button button-primary btn--inscription" onClick={()=> this.setState({inscriptionForm : true})}>Demander une Démo</button>
                    </div>
                </div>
            </div>

        </div>
        </>
    
        )
    }
}

export default PacksProHeader
