import React, { Component } from 'react'
import mapboxgl from 'mapbox-gl';
import { connect } from 'react-redux';
import './mapComponent.scss'


export class MapComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewport: {}

        }
    }
    mapInit() {

        mapboxgl.accessToken = this.props.config.mapboxglKey;
        let map = new mapboxgl.Map({
            container: document.getElementById('mapbox--container'),
            style: 'mapbox://styles/badrbelkeziz/ckk6r9vo20yzr17qbv2mf76b4',
            // style:'mapbox://styles/mapbox/navigation-preview-day-v4',
            center: [this.props.viewport.longitude, this.props.viewport.latitude],
            pitch: 0,
            zoom: 10,
            interactive: false
            //     var marker = new mapboxgl.Marker()
            // .setLngLat([parseFloat(`${this.state.rapport.localisation.split("lng : ")[1]}`),parseFloat(`${this.state.rapport.localisation.split("lat : ")[1].split(" ")[0]}`)])
            // .addTo(window.map);
        })
        if (this.props.markers) {
            this.props.markers.forEach((item) => {
                if (parseFloat(`${item.split("lng : ")[1]}`) && parseFloat(`${item.split("lat : ")[1].split(" ")[0]}`)) {
                    var el = document.createElement('div');
                    el.className = 'marker--sale';
        new mapboxgl.Marker(el)
        .setLngLat([parseFloat(`${item.split("lng : ")[1]}`), parseFloat(`${item.split("lat : ")[1].split(" ")[0]}`)])
                        .addTo(map);
                }
                // console.log(marker)
            })
        }
        if (this.props.locaAgence) {
            if (this.props.locaAgence !== "") {
                var el = document.createElement('div');
                el.className = 'marker-vitrine-agence';
                // var marker = 
                new mapboxgl.Marker(el).setLngLat([parseFloat(`${this.props.locaAgence.split("lng : ")[1]}`), parseFloat(`${this.props.locaAgence.split("lat : ")[1].split(" ")[0]}`)])
                    .addTo(map);
            }
        }
    }

    componentDidMount() {
        this.mapInit()
    }
    render() {
        return (
            <div className="mapbox--container-agences">
                <div className="mapbox-map--container" id="mapbox--container"></div>
                {this.props.displayMapLink ? (
                    <div class="link-pricing--container" ><a href="https://www.agenz.ma/prix-immobilier" class="button button-primary btn--pricing">Voir plus de ventes</a></div>

                ) : ("")}
            </div>
        )
    }
}



const mapStateToProps = (state) => {
    return {
        config: state.config,
    };
};

export default connect(mapStateToProps)(MapComponent);