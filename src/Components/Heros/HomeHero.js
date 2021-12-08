import React from 'react';
import './Heros.scss';

import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import casablanca2_bbedca23_unysoj_c_scale_w_360 from '../../assets/img/casablanca/casablanca2_bbedca23_unysoj_c_scale_w_360.jpg';
import casablanca2_bbedca23_unysoj_c_scale_w_592 from '../../assets/img/casablanca/casablanca2_bbedca23_unysoj_c_scale_w_592.jpg';
import casablanca2_bbedca23_unysoj_c_scale_w_762 from '../../assets/img/casablanca/casablanca2_bbedca23_unysoj_c_scale_w_762.jpg';
import casablanca2_bbedca23_unysoj_c_scale_w_887 from '../../assets/img/casablanca/casablanca2_bbedca23_unysoj_c_scale_w_887.jpg';
import casablanca2_bbedca23_unysoj_c_scale_w_1088 from '../../assets/img/casablanca/casablanca2_bbedca23_unysoj_c_scale_w_1088.jpg';
import casablanca2_bbedca23_unysoj_c_scale_w_1220 from '../../assets/img/casablanca/casablanca2_bbedca23_unysoj_c_scale_w_1220.jpg';
import casablanca2_bbedca23_unysoj_c_scale_w_1272 from '../../assets/img/casablanca/casablanca2_bbedca23_unysoj_c_scale_w_1272.jpg';
import casablanca2_bbedca23_unysoj_c_scale_w_1290 from '../../assets/img/casablanca/casablanca2_bbedca23_unysoj_c_scale_w_1290.jpg';

import utm from 'url-utm-params'



class HomeHero extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            address : '',
            coordinates: {
                lat: null,
                lng: null
            },
            ville : '',
            redirect: null
        }
    }


    render () {
        if(this.state.redirect) return <Redirect to="/estimation"/>
        return (
            
            <div className="Home-hero-section">
                {/* <div className="video-container">
                    <video autoPlay={true} loop={true} playsInline={true} muted={true} style={{'width': '100%','margin-top': '-15vh'}}>
                        <source src={video}></source>
                    </video>
                </div> */}
                    <div className="video-container">
                    <img
                    className="home_background"

srcSet={`
${casablanca2_bbedca23_unysoj_c_scale_w_360} 360w,
${casablanca2_bbedca23_unysoj_c_scale_w_592} 592w,
${casablanca2_bbedca23_unysoj_c_scale_w_762} 762w,
${casablanca2_bbedca23_unysoj_c_scale_w_887} 887w,
${casablanca2_bbedca23_unysoj_c_scale_w_1088} 1088w,
${casablanca2_bbedca23_unysoj_c_scale_w_1220} 1220w,
${casablanca2_bbedca23_unysoj_c_scale_w_1272} 1272w,
${casablanca2_bbedca23_unysoj_c_scale_w_1290} 1290w`
            }
            sizes="100vw"

src={`${casablanca2_bbedca23_unysoj_c_scale_w_1290}`}
alt="Prix de l'immobilier à Casablanca"/>
                         {/* <img className="home_background" src={home_background_small} srcSet={`${home_background} 3x, ${home_background_medium} 2x`} /> */}

                </div>
                <section id="home-hero">

                    <div className="Home-hero-input-search">
                    <div className="hero">
                        <h1>Estimez un bien immobilier en toute confiance</h1>
                    </div>
                    <div className="Home-hero-input-search-container"> 
                    <form style={{display : 'flex', width: '100%',justifyContent: 'center'}}>
                    <input type="hidden" name="utm_source" value={utm.utm(window.location.href).utm_source}></input>
   	<input type="hidden" name="utm_medium" value={utm.utm(window.location.href).utm_medium}></input>
   	<input type="hidden" name="utm_campaign" value={utm.utm(window.location.href).utm_campaign}></input>
   	<input type="hidden" name="utm_content" value={utm.utm(window.location.href).utm_content}></input>
	<input type="hidden" name="utm_term" value={utm.utm(window.location.href).uutm_term}></input>
                    <Link to="/estimation">
                                    <button className="button button-primary" >
                                        Commencer l'estimation
                                    </button>
                                    </Link>
                                    </form>
                        {/* <form style={{display : 'flex', width: '100%',justifyContent: 'center'}}>
                            <div> 
                             <PlacesAutocomplete
                                    value={this.state.address}
                                    onChange={(e) => {this.setState({address: e})}}
                                    onSelect={this.handleSelect}
                                    searchOptions={{
                                        componentRestrictions : {
                                            country : ["MA"]
                                        }
                                    }}
                                >
                                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                <div className="home-form-input-holder" style={{display : "inline-grid"}}>
                                <input className="input-form input-form-search" type="text"  {...getInputProps({placeholder: "Entrez l’adresse du bien"})} />


                                <div className="">
    
                                {loading ? <div className="search-results-home-items">Recherche en cours...</div> : null}
    
                                {suggestions.map(suggestion => {
                                    const style = {
                                    backgroundColor: suggestion.active ? "#ddd" : "transparent"
                                    };
    
                                    return (
                                    <div className="search-results-home-items"> 
                                        <div  {...getSuggestionItemProps(suggestion, { style })}>
                                            {suggestion.description}
                                        </div>
                                    </div>
                                    
                                    );
                                })}
                                </div>
                                </div>

                                )}
                            </PlacesAutocomplete>

                            </div>
                          
                            {this.state.coordinates.lng !==null && this.state.coordinates.lat !==null ? (
                                    <button className="button button-primary btn-searchbar" type = "button"  onClick={() => {
                                        this.setState({redirect:true})
                                        this.props.dispatch({ type: 'SET_URL_VIEWPORT', data: {latitude :this.state.coordinates.lat , longitude: this.state.coordinates.lng}});   
                                    }}>
                                        Estimer
                                    </button>
                                ):(
                                    <Link to="/">
                                    <button className="button button-primary btn-searchbar" >
                                        Estimer
                                    </button>
                                    </Link>
                                )
                            }
                        </form> 
                     */}
                    </div>
                </div>
                </section>
    

            </div>
        );
    }
    
}
const mapStateToProps = (state) => {
    const estimation = state.estimationState;
    return {
      estimationState: estimation
    };
};

export default connect(mapStateToProps)(HomeHero);
