import React, { Component } from 'react'
import biens from './img/experience_vendeur_biens.jpg';
import vendeurs from './img/experience_vendeur_vendeurs.jpg';
import visibilite from './img/experience_vendeur_visibilite.jpg';
import face from './img/face.jpg';


export class PacksProTable extends Component {
    render() {
        return (
           
            <div className="pricing-table">
            <div className="table-row">

                <div className="tables">
                    <div className="pircing-heading">
                        <h2 className="pricing_title">Pack Pro Essentiel</h2>
                    </div>
                    <div className="pircing-top">
                        <span className="pircing-price">
                            <span className="pircing-sum">Boostez votre réputation digitale</span></span>
                    </div>
                    <div className="pircing-content">
                        <button className="button-wrapper">Demander plus d'informations</button>
                        <ul className="pricing">
                            <li><span>Visibilité :</span></li>
                            <li className="pricing-available">
                                <span>Une Vitrine digitale <strong>sur nos 3 sites</strong></span></li>
                            <li className="pricing-available">
                                <span>Avis Clients</span></li>
                            <li className="pricing-available">
                                <span>Biens vendus</span> </li>
                            <li>
                                <span>Recommandation :</span></li>
                            <li className="pricing-available">
                                <span>Recommandations sur les pages clés <strong>de nos 3 sites</strong></span></li>
                            <li className="pricing-available"><span>Référencement sur les moteurs de recherche</span></li>
                            <li><span>Accompagnement et formations :</span></li>
                            <li className="pricing-available"><span>Formations en ligne</span></li>
                            <li className="pricing-available"><span>Rencontres en région</span></li>
                            <li className="pricing-available"><span>Conseiller dédié</span></li>
                            <li><span>Annonces :</span></li>
                            <li className="pricing-available"><span>Illimitées sur le site Meilleurs Agents</span></li></ul>
                    </div>
                </div>
                <div className="tables">
                    <div className="pircing-heading">
                        <h2 className="pricing_title">Pack Pro Expert</h2>
                    </div>
                    <div className="pircing-top">
                        <span className="pircing-price">
                            <span className="pircing-sum">Affirmez votre expertise aux yeux des vendeurs</span></span>
                    </div>
                    <div className="pircing-content">
                        <button className="button-wrapper">Demander plus d'informations</button>
                        <ul className="pricing">
                            <li><span>Visibilité :</span></li>
                            <li className="pricing-available">
                                <span>Vitrine digitale <strong>sur nos 3 sites</strong></span>
                            </li>
                            <li className="pricing-available"><span>Avis Clients</span></li>
                            <li className="pricing-available"><span>Biens vendus</span></li>
                            <li><span>Recommandation :</span></li>
                            <li className="pricing-available">
                                <span>Recommandations sur les pages clés <strong>de nos 3 sites</strong></span></li>
                            <li className="pricing-available">
                                <span>Référencement sur les moteurs de recherche</span></li>
                            <li><span>Accompagnement et formations :</span></li>
                            <li className="pricing-available">
                                <span>Formations en ligne</span></li>
                            <li className="pricing-available">
                                <span>Rencontres en région</span></li>
                            <li className="pricing-available">
                                <span>Conseiller dédié</span></li><li><span>Annonces :</span></li>
                            <li className="pricing-available">
                                <span>Illimitées sur le site Meilleurs Agents</span></li>
                            <li><span><a href="https://pro.meilleursagents.com/inventory/" target="_blank" rel="noopener noreferrer">Inventory :</a></span></li>
                            <li className="pricing-available">
                                <span>Base de biens vendus la plus exhaustive, qualitative et à jour du marché</span></li>
                            <li className="pricing-available">
                                <span>Exports PDF des biens vendus comparables</span></li>
                        </ul>
                    </div>
                </div>
                <div className="tables">
                    <div className="pircing-heading">
                        <h2 className="pricing_title">Pack Pro Élite</h2>
                    </div>
                    <div className="pircing-top">
                        <span className="pircing-price">
                            <span className="pircing-sum">Devenez le meilleur de votre secteur</span></span>
                    </div>
                    <div className="pircing-content">
                        <button className="button-wrapper">Demander plus d'informations</button>
                        <ul className="pricing">
                            <li><span>Visibilité :</span></li>
                            <li className="pricing-available">
                                <span>Vitrine digitale <strong>sur nos 3 sites</strong></span></li>
                            <li className="pricing-available"><span>Avis clients</span></li>
                            <li className="pricing-available"><span>Biens vendus</span></li>
                            <li><span>Recommandation :</span></li>
                            <li className="pricing-available">
                                <span>Recommandations sur les pages clés <strong>de nos 3 sites</strong></span></li>
                            <li className="pricing-available">
                                <span>Référencement sur les moteurs de recherche</span></li>
                            <li><span>Accompagnement et formations :</span></li>
                            <li className="pricing-available">
                                <span>Formations en ligne</span></li>
                            <li className="pricing-available"><span>Rencontres en région</span></li>
                            <li className="pricing-available"><span>Conseiller dédié</span></li><li>
                                <span>Annonces :</span></li>
                            <li className="pricing-available">
                                <span>Illimitées sur le site Meilleurs Agents</span></li>
                            <li><span><a href="https://pro.meilleursagents.com/inventory/" target="_blank" rel="noopener noreferrer">Inventory : </a></span></li>
                            <li className="pricing-available">
                                <span>Base de biens vendus la plus exhaustive, qualitative et à jour du marché</span></li>
                            <li className="pricing-available">
                                <span>Exports PDF des biens vendus comparables</span></li>
                            <li><span><a href="https://pro.meilleursagents.com/carte-de-prospection/" target="_blank" rel="noopener noreferrer">Carte de Prospection : </a></span></li>
                            <li className="pricing-available">
                                <span>Visualisation de zones avec des estimations vendeurs</span></li>
                        </ul>
                    </div>
                </div>
           
            </div>
         
            <div className="block">
                <h2 className="text-block">
                    <span className="font" >Les atouts de cette offre et de nos packs</span>
                </h2>
            </div>
            <div className="block">
                <h2 className="text-block">
                    <b className="font" >Vous êtes visibles sur les 3 sites de référence de l’immobilier*</b>
                </h2>
            </div>


            <div className="row">
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
            
            </div>


            <div className="text_inner">
                <p className="center">
                    <span>*Acteurs 100% digitaux. Source : Cospirit, Etude B2C, Novembre 2020.</span>
                </p>
            </div>



            <div className="section">
                <div className="section_row--green-banner">
                    <div className="section_column--section_passthrough">
                        <div className="section_module--pb_text--text_align">
                            <div className="text_inner">
                                <h2>
                                    <strong>
                                        <span >Booster votre visibilité avec la vitrine digitale</span>
                                    </strong>
                                </h2>
                            </div>
                        </div>
                        <div className="button_module">
                            <a
                                id="visibiliteLireArticle"
                                className="pb_button"
                                href="https://pro.meilleursagents.com/articles/booster-votre-visibilite-avec-la-vitrine-digitale/"
                                target="_blank"
                                rel="noreferrer">Lire l'article
                    </a>
                        </div>
                    </div>
              
                    <div className="section_column--section_passthrough--last-child">
                        <div className="section_module--pb_image">
                            <span className="image_wrap">
                                <img
                                    loading="lazy"
                                    src={face}
                                    alt="" title="" height="auto" width="100%"
                                    className="wp-image-4242" />
                            </span>
                        </div>
                    </div>
              
                </div>
            </div>



        </div>

        )
    }
}

export default PacksProTable
