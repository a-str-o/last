import React, { Component } from 'react'
import ReactMapGL, {Marker} from 'react-map-gl'
import { connect } from 'react-redux';
import './style.scss'


const MAPBOX_TOKEN ="pk.eyJ1IjoiYmFkcmJlbGtleml6IiwiYSI6ImNraDduNjN2bDA2MGszMG5zZHRqNm5zMzIifQ.oITjlONmSiUQsFKrZfFd3w";
export class EstimationMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewport : {}

        }
      }
    render() {
        return (
            <div className="mapbox--container-estimations">
                      <ReactMapGL
                            ref={this.myMap}
                            {
                              ...this.props.viewport
                            }
                            width="width: 100vw"
                            height="500px"
                            className="react-map-gl-custom"
                            mapStyle="mapbox://styles/badrbelkeziz/ckk6r9vo20yzr17qbv2mf76b4"
                            mapboxApiAccessToken={MAPBOX_TOKEN} 
                            >
                                    <Marker 
                                    longitude={this.props.viewport.longitude}
                                    latitude={this.props.viewport.latitude}>
                                        <div className={this.props.classMarker}></div>
                                    </Marker>
                            </ReactMapGL>
                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        config: state.config,
    }
  }; 
  
  export default connect(mapStateToProps)(EstimationMap)
