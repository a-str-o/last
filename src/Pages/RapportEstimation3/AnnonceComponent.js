
import React, { Component } from 'react';
import { connect } from "react-redux";

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';


import './Rapport.scss';

import moment from 'moment';
import NumberFormat from 'react-number-format';

import 'moment/locale/fr';


moment.locale("fr")



class AnnonceComponent extends Component {
constructor(props) {
super(props);
this.state = {
}
}

render(){
    return (
<>
<Grid item xs={12}>
<Card variant="outlined">
<CardContent>
<div className="annonce-content">
<p className="desc--annonce">{this.props.indice} - Annonce pour {this.props.bien==="appartement" ? 'un appartement' : 'une villa'} de {this.props.chambres} chambre pour une surface de {this.props.surface} m<sup>2</sup></p>
<p className="prix--annonce"> <NumberFormat displayType={'text'} value={Math.round(this.props.prix)} thousandSeparator={" "}/>  MAD </p>
<p className="prix--annonce prix-m2"> <NumberFormat displayType={'text'} value={Math.round(this.props.prix/this.props.surface)} thousandSeparator={" "}/>  MAD/m² </p>
{this.props.etage ? (this.props.etage ==="" ? ('') : (<p className="date--annonce"><span className="etage--display">{this.formatEtageAnnonce(this.props.etage)}</span></p>)) : ("")}
<p className="date--annonce">Quartier <span className="quartier--display">{this.props.quartier}</span></p>       
<p className="date--annonce">Mise en ligne {moment(this.props.date_annonce,"YYYY-MM-DD").fromNow()}</p>       
<p className="source--annonce">Source : <a href={this.props.source} target="_blank" rel="noreferrer">{this.props.source}</a></p>                      

</div>
</CardContent>

</Card>

</Grid>

</>
    )
}
}
const mapStateToProps = (state) => {
    return {
        config: state.config,
    };
    };
    
    export default connect(mapStateToProps)(AnnonceComponent);
    
