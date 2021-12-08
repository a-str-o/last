import  React, { Component } from 'react'
import './VideoDescriptionBloc.scss'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import InscriptionForm from "./InscriptionForm"

export class VideoDescriptionBloc extends Component {
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
            <div className="video-description--container">
                <div className="video-description--inner">
                    {/* <div className="video-description-title-container">
                        <h2 className="video-description-title">Avec l’offre Expérience Vendeurs vous :</h2>
                    </div> */}

                    <div className="video-description-content-container">
                    <div className="video-description-content-inner">
                        <div className="content--item-container">
                            <h3 className="content-item-title">Gagnez en visibilité</h3>
                            <p className="content-titem-text">auprès des 15 000 nouveaux utilisateurs par mois sur notre site.</p>
                        </div>
                        <div className="content--item-container">
                            <h3 className="content-item-title">Soyez les premiers sur les opportunités
</h3>
                            <p className="content-titem-text">grâce aux projets immobiliers détectés tous les jours sur la plateforme

</p>
                        </div>
                        <div className="content--item-container">
                            <h3 className="content-item-title">Gagnez en efficacité
</h3>
                            <p className="content-titem-text">en utilisant nos outils de prospection inédits </p>
                        </div>
                    </div>
                    </div>
                    <div className="button-video--container">
                        <div className="button-video--inner">
                        <button class="button button-primary btn--inscription-video" 
                                                    onClick = {() => {
                                                        this.setState({inscriptionForm: true})
                                                    }}
                                    > Créer ma vitrine gratuite </button>                        </div>
                    </div>
                </div>
                
            </div>
            </>
        )
    }
}

export default VideoDescriptionBloc
