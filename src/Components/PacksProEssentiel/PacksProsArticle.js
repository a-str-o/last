import React, { Component } from 'react'
import "./PacksProComponent"
import Grid from '@material-ui/core/Grid';
import face from './img/face.jpg';


export class PacksProsArticle extends Component {
    
    render() {
        return (
            <div className="packs-pro-article--container">
                <Grid container spacing={8}>
                    <Grid item xs={12} md={6}>

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
              

                    </Grid>

                    <Grid item xs={12} md={6}>
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
              
                    
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default PacksProsArticle
