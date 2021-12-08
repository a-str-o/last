import React, { Component } from 'react'
import ReactMapGL, {Marker} from 'react-map-gl'
import './PlacesMap.scss'

const MAPBOX_TOKEN ="pk.eyJ1IjoiYmFkcmJlbGtleml6IiwiYSI6ImNraDduNjN2bDA2MGszMG5zZHRqNm5zMzIifQ.oITjlONmSiUQsFKrZfFd3w";
export class PlacesMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewport : {
                longitude : parseFloat(this.props.viewport.longitude),
                latitude : parseFloat(this.props.viewport.latitude),
                zoom : 14
            }

        }
    }
        render() {
        return (
            <div className="mapbox--container-estimations">
            <ReactMapGL
                  ref={this.myMap}
                  {
                    ...this.state.viewport
                  }
                  onViewportChange={(viewport) => this.setState({viewport})}
                  width="width: 100vw"
                  height="500px"
                  className="react-map-gl-custom"
                  mapStyle="mapbox://styles/badrbelkeziz/cklp41snu5xna17qn57uky0kg"
                  mapboxApiAccessToken={MAPBOX_TOKEN} 
                  >
                          <Marker 
                          longitude={parseFloat(this.props.viewport.longitude)}
                          latitude={parseFloat(this.props.viewport.latitude)}>
                              <div className="markerpoint"></div>
                          </Marker>
                  </ReactMapGL>
      
  </div>
        )
    }
}

export default PlacesMap
