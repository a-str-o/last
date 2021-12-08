import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import "./agenceMap.scss"
import MapComponent from './MapComponent'
import Loader from 'react-loaders'

class AgenceMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        }
    }


    componentDidMount() {
        let markers=[]
        this.props.transactions.forEach((item)=>{
            // console.log("ok")
            // console.log(item)
            markers.push(item.localisation)
        })
        // console.log(markers)
        this.setState({markers : markers, loading : false})
    }
    render() {
       
        return (<>
        {this.state.loading ? (
        <Loader type="ball-grid-pulse" />
        ) : (
                        <Grid container spacing={1}> 
                    <Grid item md={12} s={12}>
            <p className="agence-map-title">{!this.props.legende ? `Les ventes ${this.props.typeEntreprie === "" ? 'renseignées' : 'récentes'}`: ""}</p>
            <div className="legend-container">
                <div className="ventes-legende-container">
            <div className="marker-sale-legend" ></div>
            <div className="vente-legend">
                <span className="vente-legende-text">{!this.props.legende ? (`Ventes ${this.props.typeEntreprie === "" ? 'renseignées' : 'récentes'}`) : this.props.legende} </span>
            </div>
            </div>
                            <div className="agence-legende-container">
            <div className="marker-vitrine-agence"></div>
            <div className="agence-legend">
                <span className="agence-legende-text">{this.props.nameEntreprise} </span>
            </div>
            </div>
            </div>
            <MapComponent displayMapLink={this.props.displayMapLink} locaAgence={this.props.locaAgence} viewport={{latitude : 33.57604334428835, longitude : -7.645979605103669, zoom : 8}} markers={this.state.markers} classMarker = {"markerpoint"}/>

</Grid>
<Grid item md={2} s={12}>
    </Grid>
</Grid>
        )}
        </>)
                    }
                }
export default AgenceMap;
