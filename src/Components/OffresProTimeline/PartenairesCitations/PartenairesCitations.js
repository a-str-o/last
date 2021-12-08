import React, { Component } from 'react'
import './PartenairesCitations.scss';
import Citations from './Citations'
import Grid from '@material-ui/core/Grid';

export class PartenairesCitations extends Component {
    render() {
        return (
            <div className="partenaires--container">
            <div className="partenaires--title">
                <h1 className="partenaires--title-inner">
                    Nos partenaires témoignent
                </h1>
            </div>
            <div className="citations--container">

            
<Grid container spacing={4}>
<Grid item xs={12} md={6}>
<Citations cit={"«En termes de visibilité, Agenz est le partenaire digital indispensable pour toucher les particuliers vendeurs. »"}
                title={"Meryam"}
                agence={"CityWalls"}
                city={"Casablanca"}
                />
</Grid>
<Grid item xs={12} md={6}>
<Citations cit={"« Une plateforme sérieuse, avec des acteurs sérieux, que ce soit les clients ou les agences immobilières partenaires»"}
                title={"Nabila"}
                agence={"Clavis Immobilier"}
                city={"Casablanca"}
                />
</Grid>
{/* 
<Grid item xs={12} md={4}>
<Citations cit={"« En termes de visibilité, Meilleurs Agents est le partenaire digital indispensable et sans équivalent pour toucher les particuliers vendeurs. »"}
                title={"Meryam"}
                agence={"CityWalls"}
                city={"Casablanca"}
                />
</Grid>
 */}
</Grid>
</div>


                
            </div>
        )
    }
}

export default PartenairesCitations
