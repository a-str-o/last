import React, { Component } from 'react'
import { CircularProgressbar,buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import './PlaceRating.scss'
export class PlaceRating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurantImg : ""

}
  }
    hsl_col_perc(c) {
        return 'hsl('+20*c+', 85%, 55%)';
      }
componentDidMount(){
  var svg = document.querySelector('.svg--restaurants');
  var s = new XMLSerializer().serializeToString(svg)
  var encodedData = "data:image/svg+xml;base64,"+window.btoa(s);
  // console.log(encodedData)
  var img_rest = document.querySelector('#image--restaurants');
  img_rest.src=encodedData
  var svg = document.querySelector('.svg--ecoles');
  var s = new XMLSerializer().serializeToString(svg)
  var encodedData = "data:image/svg+xml;base64,"+window.btoa(s);
  // console.log(encodedData)
  var img_ecoles = document.querySelector('#image--ecoles');
  img_ecoles.src=encodedData
  var svg = document.querySelector('.svg--pharmacies');
  var s = new XMLSerializer().serializeToString(svg)
  var encodedData = "data:image/svg+xml;base64,"+window.btoa(s);
  // console.log(encodedData)
  var img_pharmacies = document.querySelector('#image--pharmacies');
  img_pharmacies.src=encodedData
  var svg = document.querySelector('.svg--supermarches');
  var s = new XMLSerializer().serializeToString(svg)
  var encodedData = "data:image/svg+xml;base64,"+window.btoa(s);
  // console.log(encodedData)
  var img_supermarches = document.querySelector('#image--supermarches');
  img_supermarches.src=encodedData

}
      render() {
        return (<>
<img className="image--restaurants" id="image--restaurants"></img>
<img className="image--ecoles" id="image--ecoles"></img>
<img className="image--pharmacies" id="image--pharmacies"></img>
<img className="image--supermarches" id="image--supermarches"></img>

<div className="rating--places-container" id="rating--places-container">

  <div className="rating--container">
      <div className="rating-title--container">
        <p className="rating--title">Restauration</p>
      </div>
<CircularProgressbar
  className="svg--restaurants"
  value={20*parseFloat(this.props.note_restaurants)}
  text={`${parseFloat(this.props.note_restaurants)}`}
  circleRatio={0.75}
  styles={buildStyles({
    rotation: 1 / 2 + 1 / 8,
    strokeLinecap: "butt",
    trailColor: "#eee",
    pathColor: this.hsl_col_perc(parseFloat(this.props.note_restaurants))

  })}
/>
</div>

<div className="rating-places--container" id="rating-restaurants">
  {this.props.list_restaurants.map((item,index)=>{
    return(
      
      <div key={index} className="place--container">
        <div className="sub--container">

        <div className={`markerpoint--restaurant restaurant-${index}`}>
                            <span className="marker--data">{index+1}</span>
                            </div>
                            <div className="first-row-container">
    <p className="item--name">{item.name.split('Casablanca')[0].split('،')[0]}</p>
    <p className="item--address">{item.address.split(', Casablanca')[0].split('،')[0]}</p>
    </div>
    </div>
    <p className="item--distance">{item.distance}m</p>
    </div>
    )
  })}
</div>
<div className="rating--container">

<div className="rating-title--container">
        <p className="rating--title">Pharmacies</p>
      </div>
<CircularProgressbar
  className="svg--pharmacies"

  value={20*parseFloat(this.props.note_pharmacies)}
  text={`${parseFloat(this.props.note_pharmacies)}`}
  circleRatio={0.75}
  styles={buildStyles({
    rotation: 1 / 2 + 1 / 8,
    strokeLinecap: "butt",
    trailColor: "#eee",
    pathColor: this.hsl_col_perc(parseFloat(this.props.note_pharmacies))
  })}
/>
</div>
<div className="rating-places--container" id="rating-pharmacies">
{this.props.list_pharmacies.map((item,index)=>{
    return(
<div key={index} className="place--container">
<div className="sub--container">

<div className={`markerpoint--pharmacie pharmacie-${index}`}>
                            <span className="marker--data">{index+1}</span>
                            </div>
                            <div className="first-row-container">

    <p className="item--name">{item.name.split('Casablanca')[0].split('،')[0]}</p>
    <p className="item--address">{item.address.split(', Casablanca')[0].split('،')[0]}</p>
    </div>
  </div>
    <p className="item--distance">{item.distance}m</p>
    </div>
    )
  })}
</div>
<div className="rating--container">

<div className="rating-title--container">
        <p className="rating--title">Supermarches</p>
      </div>
<CircularProgressbar
  className="svg--supermarches"

  value={20*parseFloat(this.props.note_supermarches)}
  text={`${parseFloat(this.props.note_supermarches)}`}
  circleRatio={0.75}
  styles={buildStyles({
    rotation: 1 / 2 + 1 / 8,
    strokeLinecap: "butt",
    trailColor: "#eee",
    pathColor: this.hsl_col_perc(parseFloat(this.props.note_supermarches))

  })}
/>
</div>
<div className="rating-places--container" id="rating-supermarches">
{this.props.list_supermarches.map((item,index)=>{
    return(
      <div key={index} className="place--container">
    <div className="sub--container">
    <div className={`markerpoint--supermarche supermarche-${index}`}>
                            <span className="marker--data">{index+1}</span>
                            </div>
                            <div className="first-row-container">

    <p className="item--name">{item.name.split('Casablanca')[0].split('،')[0]}</p>
    <p className="item--address">{item.address.split(', Casablanca')[0].split('،')[0]}</p>
    </div>
    </div>
    <p className="item--distance">{item.distance}m</p>
    </div>
    )
  })}
</div>
<div className="rating--container">

<div className="rating-title--container">
        <p className="rating--title">Éducation</p>
      </div>

<CircularProgressbar
  className="svg--ecoles"

  value={20*parseFloat(this.props.note_ecoles)}
  text={`${parseFloat(this.props.note_ecoles)}`}
  circleRatio={0.75}
  styles={buildStyles({
    rotation: 1 / 2 + 1 / 8,
    strokeLinecap: "butt",
    trailColor: "#eee",
    pathColor: this.hsl_col_perc(parseFloat(this.props.note_ecoles))

  })}
/>
</div>
<div className="rating-places--container" id="rating-ecoles">
{this.props.list_ecoles.map((item,index)=>{
    return(
      <div key={index} className="place--container">
<div className="sub--container">
<div className={`markerpoint--ecole ecole-${index}`}>
                                <span className="marker--data">{index+1}</span>
                            </div>
                            <div className="first-row-container">

    <p className="item--name">{item.name.split('Casablanca')[0].split('،')[0]}</p>
    <p className="item--address">{item.address.split(', Casablanca')[0].split('،')[0]}</p>
    </div>
  </div>
    <p className="item--distance">{item.distance}m</p>
    </div>
    )
  })}
</div>
</div>
</>
        )
    }
}

export default PlaceRating
