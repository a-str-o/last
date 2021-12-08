import React, { Component, Suspense, lazy } from 'react';
import axios from 'axios'
import './placesComponent.scss';
import { Link } from 'react-router-dom';
import Loading from '../../Loading'
import Grid from '@material-ui/core/Grid';
function retry(fn, retriesLeft = 10, interval = 1000) {
    return new Promise((resolve, reject) => {
      fn()
        .then(resolve)
        .catch((error) => {
          setTimeout(() => {
            if (retriesLeft === 1) {
              // reject('maximum retries exceeded');
              reject(error);
              return;
            }
  
            // Passing on "reject" is the important part
            retry(fn, retriesLeft - 1, interval).then(resolve, reject);
          }, interval);
        });
    });
  }
  
const ListingAgencies =lazy(() => retry(()=> import ('../PricingRightSide/ListingAgencies')));
const PlacesMap =lazy(() => retry(()=> import ('./PlacesMap')));


class PlacesComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            title : "",
            address : "",
            phone : "",
            office : "",
            website : ""
        }
    }


    getplaces () {
        const uid = window.location.href.replace(window.location.origin + '/places/', '').split('?')[0];
        axios.post('https://us-central1-agenz-website-prod.cloudfunctions.net/api/places', {id : uid}).then(result => {
            // console.log(result.data)
            this.setState(result.data)
            this.setState({loading : false})

    })
    .catch(err => console.log(err))

    }

    componentDidMount() {
        this.getplaces()
    }
    render() {
        // let desc = `${this.state.title} - ${this.state.address} - ${this.state.type} à Casablanca.  Référencé sur agenz.ma - Retrouvez les lieux d'intérêts prêt de chez vous qui donne de la valeur a votre bien immobilier à Casablanca sur agenz.ma`
        // const uid = window.location.href.replace(window.location.origin + '/placess/', '');
        return (
            
            <div className = "agencePage">
                                                        
                <div className = "container">
                    <div className = "">
                        <div className = "row">

                                {this.state.loading ? (
                                                                <div className ="col-md-12 col-sm-12">
                                
                                                                <div className = "placeContainer">
                                    <div className="vitrine--loader">
                                    <h1 className="places--title">Les commerces et entreprises à Casablanca sur agenz.ma</h1>
                                    <Loading />
                                    </div>
                                </div></div>
                                ): (<>
                                
                                
  <Grid container spacing={1}>
        <Grid item xs={12}>
            <Grid container spacing={0}>
            <Grid item xs={12} md={6}>
                <Grid container spacing={0}>
          <Grid item xs={12} >
            <div className = "placeProfile">
                                    <div className = "placeInformationsDetails">
                                        <h1 className="places--title">{this.state.title} </h1>
                                        <p className="details-bien"> <span className ="details-bien-title">Nom de l'établissement : {" "}</span>{this.state.title}</p>
                                        <p className="details-bien"> <span className ="details-bien-title">Adresse de l'établissement : {" "}</span>{this.state.address}</p>
                                        <p className="details-bien"> <span className ="details-bien-title">Téléphone : </span>{this.state.phone}</p>
                                        <p className="details-bien"> <span className ="details-bien-title">Bureau : </span>{this.state.office==="Unknown" ? "Inconnu" : this.state.office}</p>
                                        <p className="details-bien"> <span className ="details-bien-title">Site web : </span>{this.state.website}</p>
                                    </div>

                                    </div>
                                    </Grid>
                                    <Grid item xs={12} >
                                    <div className="button-container">
                                    <Link to="/prix-immobilier"><button className="btn btn-primary to-price-btn">Prix immobiliers à Casablanca</button></Link>
                                    </div>
                                    <Suspense fallback={<Loading />}>

                                    <PlacesMap viewport={{latitude :this.state.lat, longitude : this.state.lng, zoom : 14}} classMarker = {"markerpoint"}/>
                                    </Suspense>
                                    <div className="places-button">
                                    <Link to="/estimation"><button className="button button-primary to-price-btn"> Estimez un bien proche de cet établissement</button></Link>

                                    </div>

                                    </Grid>
                                    </Grid>

            </Grid>
            <Grid item xs={12} md={6}>
            <div className="places-agencies-container">
            <Suspense fallback={<Loading />}>

                                            <ListingAgencies />
            </Suspense>
                                            </div>
                
            
                              
            </Grid>
            </Grid>
        </Grid>
     

  </Grid>

                                    </>)}      
                       
                            
                         
                        </div>
                    </div>
                </div>

            </div>
           
        );
    }
}

export default PlacesComponent;
