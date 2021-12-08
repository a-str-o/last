import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import building from '../../assets/img/building.svg'
import house from '../../assets/img/house.svg'
import { connect } from "react-redux";

export class PriceInfoComponent extends Component {
    render() {
        return (
        
            <div className="pricing-area-house-container">
      <Grid container spacing={2}>
      {this.props.priceDetails.prix!=="" && this.props.priceDetails.prix!=="0" && this.props.priceDetails.prix!==0 ? (

        <Grid item xs={ this.props.priceDetails.prixVilla!=="" && this.props.priceDetails.prixVilla!=="0" && this.props.priceDetails.prixVilla!==0 ? 6 : 12} lg={6}>
          <div className="price--building-container price-left">
              <div className="price-icon-container">
              <img src={building} alt="Prix de l'immobilier à Casablanca"/><br></br>
          <p className="building-type">Appartement</p>
          </div>
          <div className="price-data-container">
              <p className="price-title">Prix au m² moyen</p>
              <p className="price-data">{new Intl.NumberFormat('fr-FR', { style: 'decimal', maximumFractionDigits : 0 }).format(this.props.priceDetails.prix)} MAD</p>
              {/* <p className="indice-confiance">Indice de confiance 4/5</p> */}
          </div>
          </div>
        </Grid>
      ) : ("") }
        {this.props.priceDetails.prixVilla!=="" && this.props.priceDetails.prixVilla!=="0" && this.props.priceDetails.prixVilla!== 0 ? (
        <Grid item xs={6} lg={6}>
        <div className="price--building-container price-right">
              <div className="price-icon-container">
          <img src={house} alt="Prix de l'immobilier à Casablanca"/><br></br>
          <p className="building-type">Villa</p>
          </div>
          <div className="price-data-container">
              <p className="price-title">Prix au m² moyen</p>
              <p className="price-data">{new Intl.NumberFormat('fr-FR', { style: 'decimal', maximumFractionDigits : 0 }).format(this.props.priceDetails.prixVilla)} MAD</p>
          </div>
          </div>
          
        </Grid>
        ) : ("")
    }
        </Grid>
                </div>
        )
    }
}

const mapStateToProps = (state) => {

    return {
      priceDetails: state.priceDetails,

    };
};

export default connect(mapStateToProps)(PriceInfoComponent);