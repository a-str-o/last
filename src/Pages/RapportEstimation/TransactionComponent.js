
import React, { Component } from 'react';
import { connect } from "react-redux";


import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

// https://gitlab.com/catamphetamine/react-phone-number-input
import 'react-phone-number-input/style.css'


import './Rapport.scss';

import moment from 'moment';
import NumberFormat from 'react-number-format';

import 'moment/locale/fr';
import CarouselTransaction from "../../Components/EstimationPro/EstimationComponents/CarouselTransaction"


moment.locale("fr")



class TransactionComponent extends Component {
constructor(props) {
super(props);
this.state = {
}
}
formatConstruction(construction){
    if (parseInt(construction) <= 5){
        if (parseInt(construction)===-1){
            return ""
        }
        else if (parseInt(construction)===0){
            return "Entre 1 et 5 ans"
        }

        else if (parseInt(construction)===0){
            return "Entre 1 et 5 ans"
        }

        else if (parseInt(construction)===1){
            return "Entre 11 et 20 ans"
        }

        else if (parseInt(construction)===2){
            return "Il y a plus de 20 ans"
        }

        else if (parseInt(construction)===3){
            return "Entre 5 et 10 ans"
        }

        else if (parseInt(construction)===4){
            return "Neuve"
        }
    }
    else{
        return construction;
    }

}

render(){
    return (
<>
<Grid item xs={12}>
<div className="transac-content">

<Card variant="outlined">
<CardContent>
<div className="annonce-content">
<p className="desc--annonce">Vente d'un(e) {this.props.consistance} d'une surface de {this.props.surface} m<sup>2</sup></p>
<p className="prix--annonce">Prix : <NumberFormat displayType={'text'} value={Math.round(this.props.prix)} thousandSeparator={" "}/> MAD </p>
<p className="prix--annonce prix-m2"> <NumberFormat displayType={'text'} value={Math.round(this.props.prix/this.props.surface)} thousandSeparator={" "}/>  MAD/m² </p>
{this.formatConstruction(this.props.construction) !=="" ? (
<p className="date--annonce">Construction : {this.formatConstruction(this.props.construction)}  </p> )
 : (<></>)}
<p className="date--annonce">Date de la transaction : {this.props.dateTransactions} </p>    
{ this.props.images && this.props.images.length > 0 ? (
                                            <CarouselTransaction images={
                                                this.props.images
                                            } />
                                        ) : (""
                                        )}  
<p className="source--annonce">Source : <a href={`https://www.agenz.ma/prix-immobilier/vente-recente/${this.props.address==="" ? ("Casablanca") :( `${this.props.address.replace(/ /g, '-').replace(/'/g, '-').replace(/é/g, 'e').replace(/ô/g, 'o').replace(/,/g, '')}`)}/${this.props.transactionId}`} target="_blank" rel="noreferrer">{`https://www.agenz.ma/prix-immobilier/vente-recente/${this.props.address==="" ? ("Casablanca") :( `${this.props.address.replace(/ /g, '-').replace(/'/g, '-').replace(/é/g, 'e').replace(/ô/g, 'o').replace(/,/g, '')}`)}/${this.props.transactionId}`} </a></p>                      
</div>
</CardContent>

</Card>
</div>

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
    
    export default connect(mapStateToProps)(TransactionComponent);
    
