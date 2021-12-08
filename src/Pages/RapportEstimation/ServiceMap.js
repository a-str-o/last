import React, { Component } from 'react'
import ReactMapGL, {Marker} from 'react-map-gl'
import './ServiceMap.scss'
const MAPBOX_TOKEN ="pk.eyJ1IjoiYmFkcmJlbGtleml6IiwiYSI6ImNraDduNjN2bDA2MGszMG5zZHRqNm5zMzIifQ.oITjlONmSiUQsFKrZfFd3w";
export class ServiceMap extends Component {
    constructor(props) {
    super(props);
    this.state = {
        viewport : this.props.viewport
    }
}
    render() {
        return (
            <div className="mapbox--container-places">
            <ReactMapGL
                  ref={this.myMap}
                  {
                    ...this.state.viewport
                  }
                  onViewportChange={(viewport) => this.setState({viewport})}
                  width="width: 100vw"
                  height="500px"
                  className="react-map-gl-custom"
                  mapStyle="mapbox://styles/badrbelkeziz/ckk6r9vo20yzr17qbv2mf76b4"
                  mapboxApiAccessToken={MAPBOX_TOKEN} 
                  >
                          
                        
                {this.props.list_ecoles.map((item, index)=>{
                    return (
                        <Marker 
                          
                        longitude={item.location.lng}
                        latitude={item.location.lat}>
                            <div className={`markerpoint--ecole ecole-${index}`}>
                                <span className="marker--data">{index+1}</span>
                            </div>
                        </Marker>
                    )
                })}
                 {this.props.list_restaurants.map((item, index)=>{
                    return (
                        <Marker 
                          
                        longitude={item.location.lng}
                        latitude={item.location.lat}>
                            <div className={`markerpoint--restaurant restaurant-${index}`}>
                            <span className="marker--data">{index+1}</span>
                            </div>
                        </Marker>
                    )
                })}
                 {this.props.list_pharmacies.map((item, index)=>{
                    return (
                        <Marker 
                          
                        longitude={item.location.lng}
                        latitude={item.location.lat}>
                            <div className={`markerpoint--pharmacie pharmacie-${index}`}>
                            <span className="marker--data">{index+1}</span>
                            </div>
                        </Marker>
                    )
                })}
                 {this.props.list_supermarches.map((item, index)=>{
                    return (
                        <Marker 
                          
                        longitude={item.location.lng}
                        latitude={item.location.lat}>
                            <div className={`markerpoint--supermarche supermarche-${index}`}>
                            <span className="marker--data">{index+1}</span>
                            </div>
                        </Marker>
                    )
                })}
                                    <Marker 
                          
                          longitude={this.props.viewport.longitude}
                          latitude={this.props.viewport.latitude}>
                        <div className="markerpoint"></div>
                          </Marker>
                  </ReactMapGL>
      
  </div>
        )
    }
}

export default ServiceMap
