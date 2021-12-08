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
                                        <h2 className="pricing_title">Pack Pro Expert</h2>
                                    </div>
                                    <div className="pircing-top">
                                        <span className="pircing-price">
                                            <span className="pircing-sum">Boostez votre visibilité et votre réputation digitale</span></span>
                                    </div>
                                    <div className="pircing-content">
                                        <div className="offres-subtitle--container">
                                        <h3 className="offres-subtitle">Demandes de RDV avec des particuliers vendeurs</h3>                    
                                        </div>
                                            
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
                                                    <span>Tous vos<strong> biens vendus sur la carte des prix</strong></span>
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
                    <Grid item xs={12}>
                         
                         <div className="block">
                <h2 className="text-block">
                    <span className="font" >Les atouts de cette offre et de nos packs</span>
                </h2>
            </div>
                             <div className="block">
                <h2 className="text-block">
                    <b className="font" > Reçevez des projets de vente qualifiés et de qualité, identifiés avant votre concurrence</b>
                </h2>
            </div>

                    </Grid>

                        <Grid item xs={12} md={6}>
                        <VideoDescriptionBloc />
                    </Grid>           
                    <Grid item xs={12} md={6}>
                        <div className="offre-pro-video--container">
                        <YouTube videoId="N7VZEOLlF_Q" opts={opts} onReady={this._onReady} />
                        </div>
                    </Grid> 
                    {/* <Grid item xs={12}>
                        <Grid container spacing={6}>
                            <Grid item xs={12} md={4}>
                            <div className="colume--block">
                    <div className="image_sticky">
                        <span className="image_wrap">
                            <img
                                loading="lazy"
                                src={visibilite}
                                alt="" title="experience_vendeur_visibilite"
                                height="auto" width="auto" className="wp-image-4239" />
                        </span>
                    </div>
                    <div className="pb_text--banner-subtitle--bg_layout">
                        <div className="pb_text_inner">
                            <p >
                                <span >Une audience cumulée de 22 millions de visiteurs uniques chaque mois</span>
                            </p>
                        </div>
                    </div>
                </div>
               
                                
                            </Grid>
                            <Grid item xs={12} md={4}>
                            <div className="colume--block">
                    <div className="image_sticky">
                        <span className="image_wrap">
                            <img
                                loading="lazy"
                                src={vendeurs}
                                alt="" title="experience_vendeur_vendeurs"
                                height="auto" width="auto" className="wp-image-4240" />
                        </span>
                    </div>
                    <div className="pb_module">
                        <div className="pb_text_inner" >
                            <p >
                                <span >Plus de 630 000 vendeurs identifiés chaque mois</span>
                            </p>
                        </div>
                    </div>
                </div>
               
                                
                            </Grid>
                            <Grid item xs={12} md={4}>
                            <div className="colume--block">
                    <div className="image_sticky">
                        <span className="image_wrap">
                            <img
                                loading="lazy"
                                src={biens}
                                alt="" title="experience_vendeur_biens"
                                height="auto" width="auto" className="wp-image-4241" />
                        </span>
                    </div>
                    <div className="pb_module">
                        <div className="pb_text_inner">
                            <p>
                                <span >3 vendeurs sur 4 estiment leur bien sur l’une de nos plateformes</span>
                            </p>
                        </div>
                    </div>
                </div>
            
                                
                            </Grid>
                        </Grid>

                    </Grid>
 */}
 <PartenairesCitations />
                </Grid>
            </div>
        )
    }
}

export default PacksProPriceTable
