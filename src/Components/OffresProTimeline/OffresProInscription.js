import React, { Component } from 'react'
import './OffresProInscription.scss'
import TextField from '@material-ui/core/TextField';
import {theme} from '../../assets/theme'
import {ThemeProvider} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import InscriptionForm from "./InscriptionForm"


export class OffresProInscription extends Component {
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
      
            <div class="inscription--container">




                <div class="inscription--container-inner">
                    <div class="inscription--inner">


                        <div class="inscription--title-container">


                            <div class="inscription--title-iner">
                                <h5 className="inscription-title-text" >Créez la vitrine de votre agence</h5></div>
                        </div> 
                        <div class="inscription--form-container">


                            <div class="inscription-form--iner">
                                <div class="inscription-banner-form">
                                <ThemeProvider theme={theme}>

                                <TextField  variant="outlined" id="standard-search" label="Nom de votre agence immobilière" type="search"
                                value={this.state.agencyName}
                                 onChange={(e) => { 
                                    this.setState({ agencyName: e.target.value });
                            }}
                            />
                                   </ThemeProvider>
                                    <button class="button button-primary btn--inscription" 
                                                    onClick = {() => {
                                                        this.setState({inscriptionForm: true})
                                                    }}
                                    > Créer ma vitrine gratuite </button>
                    </div>
                            </div>
                        </div>


                    </div>
                    </div>


                </div>
        </>
        )
    }
}

export default OffresProInscription
