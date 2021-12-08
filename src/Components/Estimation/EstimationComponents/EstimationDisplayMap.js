import React, { Component } from 'react'
import mapboxgl from 'mapbox-gl';
import { connect } from 'react-redux';
import "./EstimationDisplayMap.scss"
import {withRouter} from 'react-router-dom';

export class EstimationDisplayMap extends Component {
    mapInit() {

        mapboxgl.accessToken = this.props.config.mapboxglKey;
        let map = new mapboxgl.Map({
            container: document.getElementById('mapbox--container'),
            style: 'mapbox://styles/badrbelkeziz/ckk6r9vo20yzr17qbv2mf76b4',
            // style:'mapbox://styles/mapbox/navigation-preview-day-v4',
            center: [parseFloat(`${this.props.markers[0].split("lng : ")[1]}`),parseFloat(`${this.props.markers[0].split("lat : ")[1].split(" ")[0]}`)],
            pitch: 0,
            zoom: 12,
            interactive: false
        //  var marker = new mapboxgl.Marker()
        // .setLngLat([parseFloat(`${this.state.rapport.localisation.split("lng : ")[1]}`),parseFloat(`${this.state.rapport.localisation.split("lat : ")[1].split(" ")[0]}`)])
        // .addTo(window.map);
        })
        if(this.props.markers){
            this.props.markers.forEach((item)=>{
                if(parseFloat(`${item.split("lng : ")[1]}`) && parseFloat(`${item.split("lat : ")[1].split(" ")[0]}`)){
        var el = document.createElement('div');
        el.className = 'marker--estimation';
        new mapboxgl.Marker(el)
        .setLngLat([parseFloat(`${item.split("lng : ")[1]}`),parseFloat(`${item.split("lat : ")[1].split(" ")[0]}`)])
        .addTo(map);
                }
        // console.log(marker)
            })
        }
    }
        
      componentDidMount(){
this.mapInit()
      }
    render() {
        return (
            <div className="mapbox--container-estimation-display">
<div className="mapbox-map--container-estimation-display" id="mapbox--container"></div>
</div>
        )
    }
}
 
const mapStateToProps = (state) => {
    return {
        config: state.config,
    };
    };
    
    export default connect(mapStateToProps)(withRouter(EstimationDisplayMap));
