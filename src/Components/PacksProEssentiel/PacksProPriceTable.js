import React, { Component } from 'react'
import './PacksProPriceTable.scss';
import Grid from '@material-ui/core/Grid';



import PartenairesCitations from "../OffresProTimeline/PartenairesCitations/PartenairesCitations"
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import InscriptionForm from "../OffresProTimeline/InscriptionForm"
import YouTube from 'react-youtube';
import VideoDescriptionBloc from '../OffresProTimeline/VideoDescriptionBloc'

export class PacksProPriceTable extends Component {
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
        const opts = {
            height: '390',
            width: '640',
            playerVars: {
              autoplay: 0,
            },
          };
        return (
            <div className="grid--pack-pro--container">
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
                <Grid container spacing={10}>
                    <Grid item xs={12}>
                        <Grid container spacing={8} justify={"center"}>
                            <Grid item xs={12} md={8}>
                                <div className="tables tables--grid">
                                    <div className="pircing-heading">
                                        <h2 className="pricing_title">Pack Pro Essentiel</h2>
                                    </div>
                                    <div className="pircing-top">
                                        <span className="pircing-price">
                                            <span className="pircing-sum">Boostez votre visibilité et votre réputation digitale</span></span>
                                    </div>
                                    <div className="pircing-content">
                                                                             
                                         <ul className="pricing">
                                            <li className="price-list--title"><span>Visibilité :</span>
                                            </li>
                                            <li className="pricing-available">
                                                <span>Vitrine digitale de l'agence sur le site</span>
                                                </li>
                                            <li className="pricing-available"><span>Référencement moteur de recherche</span>
                                            </li>
                                            <li className="pricing-available"><span>Demandes de rappels des particuliers vendeurs</span>
                                            </li>
                                            <li className="price-list--title"><span>Recommandation :</span>
                                            </li>
                                            <li className="pricing-available">
                                                <span>Recommandations sur la page <strong>carte des prix</strong></span>
                                            </li>
                                            <li className="pricing-available">
                                                <span>Recommandations<strong> en fin d'estimation</strong></span>
                                            </li>
                                                <li className="pricing-available">
                                                    <span>Jusqu'à<strong> 10 biens vendus sur la carte des prix</strong></span>
                                                </li>
                                                <li className="price-list--title">
                                                    <span>Rapport d'évaluations instantanés d'un bien:</span>
                                                </li>
                                                <li className="pricing-available">
                                                    <span>Estimation du <strong>prix et loyer</strong></span>
                                                    </li>
                                                <li className="pricing-available"><span><strong>Service</strong> à proximité</span>
                                                </li>
                                                <li className="pricing-available"><span><strong>Ventes et annonces similaires</strong> à proximité</span>
                                                </li>
                                                <li className="pricing-available"><span>Exports PDF</span></li>
                                                    <li className="pricing-available"><span>Jusqu'à <strong>5 Rapports par mois</strong></span></li>

                                        
                                        </ul>
                                        <div className="button-info-pro--container">
                                            <button className="button button-primary btn--inscription" onClick={()=> this.setState({inscriptionForm : true})}>Demander plus d'informations</button>
                                        </div> 
                                    </div>
                                </div>
                            </Grid>
                        
                        </Grid>


                            </Grid>
                            <Grid item xs={12} md={6}>
<VideoDescriptionBloc />
</Grid>           
<Grid item xs={12} md={6}>
<div className="offre-pro-video--container">
<YouTube videoId="N7VZEOLlF_Q" opts={opts} onReady={this._onReady} />
</div>
</Grid> 
                                </Grid>


                             <PartenairesCitations />


            </div>
        )
    }
}

export default PacksProPriceTable
