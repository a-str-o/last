import React from 'react';
import { connect } from "react-redux";
import './PriceBarComponent.scss';

class PriceBarComponent extends React.Component {


    render() {
        return (
            <div className="color-display-container">
                <div className="color-display-legend"><div> 
                    Prix au m<sup>2</sup>
                    </div>
                </div>
                {/* {this.props.zoom<10 ? (
                    <>
                                    <div className="price-holder">
                                    &lt; 5000 MAD
                                    </div>
                    <div className="color-display-holder">
                            <div className="color-display" style={{backgroundColor: "#ff0900", width : '50%'}}>
                                <div className="tooltip-prices">
                                    <div className="color-display-price">
                                            <span>
                                            &lt; 5000 MAD
                                            </span>
                                         
                                    </div>
                                </div>
                            </div>
                            <div className="color-display" style={{backgroundColor: "#760404", width : '50%'}}>
                                <div className="tooltip-prices">
                                    <div className="color-display-price">
                                            <span>
                                            &lt; 10000 MAD
                                            </span>
                                         
                                    </div>
                                </div>
                            </div>
                </div>
                <div className="price-holder">
                &gt; 10000 MAD
                </div>
                </>
                ) */}
                 {this.props.zoom<11 ? (
                     <>
                                        <div className="price-holder">
                                    &lt; 5000 MAD
                                    </div>
                  
                    <div className="color-display-holder">
                    <div className="color-display" style={{backgroundColor: "#028855", width : '10%'}}>
                        <div className="tooltip-prices">
                            <div className="color-display-price">
                                    <span>
                                    &lt; 5000 MAD
                                    </span>
                                 
                            </div>
                        </div>
                    </div>
                    <div className="color-display" style={{backgroundColor: "#14bc01", width : '10%'}}>
                        <div className="tooltip-prices">
                            <div className="color-display-price">
                                    <span>
                                    5000 à 6000 MAD
                                    </span>
                                 
                            </div>
                        </div>
                    </div>
                    <div className="color-display" style={{backgroundColor: "#76e302", width : '10%'}}>
                        <div className="tooltip-prices">
                            <div className="color-display-price">
                                    <span>
                                    6000 à 7300 MAD
                                    </span>
                                 
                            </div>
                        </div>
                    </div>
                    <div className="color-display" style={{backgroundColor: "#abe302", width : '10%'}}>
                        <div className="tooltip-prices">
                            <div className="color-display-price">
                                    <span>
                                    7300 à 8100 MAD
                                    </span>
                                 
                            </div>
                        </div>
                    </div>
                    <div className="color-display" style={{backgroundColor: "#deff05", width : '10%'}}>
                        <div className="tooltip-prices">
                            <div className="color-display-price">
                                    <span>
                                    8100 à 9000 MAD
                                    </span>
                                 
                            </div>
                        </div>
                    </div>
                    <div className="color-display" style={{backgroundColor: "#fff832", width : '10%'}}>
                        <div className="tooltip-prices">
                            <div className="color-display-price">
                                    <span>
                                    9000 à 10500 MAD
                                    </span>
                                 
                            </div>
                        </div>
                    </div>
                    <div className="color-display" style={{backgroundColor: "#ffe82f", width : '10%'}}>
                        <div className="tooltip-prices">
                            <div className="color-display-price">
                                    <span>
                                    10500 à 12000 MAD
                                    </span>
                                 
                            </div>
                        </div>
                    </div>
                    <div className="color-display" style={{backgroundColor: "#ffd502", width : '10%'}}>
                        <div className="tooltip-prices">
                            <div className="color-display-price">
                                    <span>
                                    12000 à 13500 MAD
                                    </span>
                                 
                            </div>
                        </div>
                    </div>
                    <div className="color-display" style={{backgroundColor: "#ffa51f", width : '10%'}}>
                        <div className="tooltip-prices">
                            <div className="color-display-price">
                                    <span>
                                    13500 à 15000 MAD
                                    </span>
                                 
                            </div>
                        </div>
                    </div>
                    <div className="color-display" style={{backgroundColor: "#ff7a14", width : '10%'}}>
                        <div className="tooltip-prices">
                            <div className="color-display-price">
                                    <span>
                                    15000 à 18000 MAD
                                    </span>
                                 
                            </div>
                        </div>
                    </div>
                    <div className="color-display" style={{backgroundColor: "#ff0900", width : '10%'}}>
                        <div className="tooltip-prices">
                            <div className="color-display-price">
                                    <span>
                                    &gt; 18000 MAD
                                    </span>
                                 
                            </div>
                        </div>
                    </div>
        </div>
        <div className="price-holder">
                &gt; 18000 MAD
                </div>
                </>
                 ) : this.props.zoom<12 ? (
                     <>
                                                             <div className="price-holder">
                                    &lt; 5000 MAD
                                    </div>
                  
                    <div className="color-display-holder">
                            <div className="color-display" style={{backgroundColor: "#76e302", width : '12.5%'}}>
                                <div className="tooltip-prices">
                                    <div className="color-display-price">
                                            <span>
                                            5000 à 6000 MAD
                                            </span>
                                         
                                    </div>
                                </div>
                            </div>
                            <div className="color-display" style={{backgroundColor: "#deff05", width : '12.5%'}}>
                                <div className="tooltip-prices">
                                    <div className="color-display-price">
                                            <span>
                                            6000 à 7000 MAD
                                            </span>
                                         
                                    </div>
                                </div>
                            </div>
                            <div className="color-display" style={{backgroundColor: "#fff833", width : '12.5%'}}>
                                <div className="tooltip-prices">
                                    <div className="color-display-price">
                                            <span>
                                            7000 à 8000 MAD
                                            </span>
                                         
                                    </div>
                                </div>
                            </div>
                            <div className="color-display" style={{backgroundColor: "#ffd500", width : '12.5%'}}>
                                <div className="tooltip-prices">
                                    <div className="color-display-price">
                                            <span>
                                            8000 à 9500 MAD
                                            </span>
                                         
                                    </div>
                                </div>
                            </div>
                            <div className="color-display" style={{backgroundColor: "#ffa51f", width : '12.5%'}}>
                                <div className="tooltip-prices">
                                    <div className="color-display-price">
                                            <span>
                                            9500 à 10000 MAD
                                            </span>
                                         
                                    </div>
                                </div>
                            </div>
                            <div className="color-display" style={{backgroundColor: "#ff7a14", width : '12.5%'}}>
                                <div className="tooltip-prices">
                                    <div className="color-display-price">
                                            <span>
                                            10000 à 11000 MAD
                                            </span>
                                         
                                    </div>
                                </div>
                            </div>
                            <div className="color-display" style={{backgroundColor: "#ff0900", width : '12.5%'}}>
                                <div className="tooltip-prices">
                                    <div className="color-display-price">
                                            <span>
                                            11000 à 13000 MAD
                                            </span>
                                         
                                    </div>
                                </div>
                            </div>
                            <div className="color-display" style={{backgroundColor: "#760404", width : '12.5%'}}>
                                <div className="tooltip-prices">
                                    <div className="color-display-price">
                                            <span>
                                            &gt; 15000 MAD

                                            </span>
                                         
                                    </div>
                                </div>
                            </div>

                </div>
                <div className="price-holder">
                &gt; 15000 MAD
                </div>
                </>
                )
                 :  (
                     <>
                                                             <div className="price-holder">
                                    &lt; 5090 MAD
                                    </div>
                                      <div className="color-display-holder">
                    <div className="color-display" style={{backgroundColor: "#028855", width : '8,33333333'}}>
                        <div className="tooltip-prices">
                            <div className="color-display-price">
                                    <span>
                                    &lt; 5090 MAD
                                    </span>
                                 
                            </div>
                        </div>
                    </div>
                    <div className="color-display" style={{backgroundColor: "#14bc01", width : '8,33333333'}}>
                        <div className="tooltip-prices">
                            <div className="color-display-price">
                                    <span>
                                    5090 à 6000 MAD
                                    </span>
                                 
                            </div>
                        </div>
                    </div>
                    <div className="color-display" style={{backgroundColor: "#76e302", width : '8,33333333'}}>
                        <div className="tooltip-prices">
                            <div className="color-display-price">
                                    <span>
                                    6000 à 7300 MAD
                                    </span>
                                 
                            </div>
                        </div>
                    </div>
                    <div className="color-display" style={{backgroundColor: "#abe302", width : '8,33333333'}}>
                        <div className="tooltip-prices">
                            <div className="color-display-price">
                                    <span>
                                    7300 à 8100 MAD
                                    </span>
                                 
                            </div>
                        </div>
                    </div>
                    <div className="color-display" style={{backgroundColor: "#deff05", width : '8,33333333'}}>
                        <div className="tooltip-prices">
                            <div className="color-display-price">
                                    <span>
                                    8100 à 9000 MAD
                                    </span>
                                 
                            </div>
                        </div>
                    </div>
                    <div className="color-display" style={{backgroundColor: "#fff832", width : '8,33333333'}}>
                        <div className="tooltip-prices">
                            <div className="color-display-price">
                                    <span>
                                    9000 à 10500 MAD
                                    </span>
                                 
                            </div>
                        </div>
                    </div>
                    <div className="color-display" style={{backgroundColor: "#ffe82f", width : '8,33333333'}}>
                        <div className="tooltip-prices">
                            <div className="color-display-price">
                                    <span>
                                    10500 à 12000 MAD
                                    </span>
                                 
                            </div>
                        </div>
                    </div>
                    <div className="color-display" style={{backgroundColor: "#ffd502", width : '8,33333333'}}>
                        <div className="tooltip-prices">
                            <div className="color-display-price">
                                    <span>
                                    12000 à 13500 MAD
                                    </span>
                                 
                            </div>
                        </div>
                    </div>
                    <div className="color-display" style={{backgroundColor: "#ffa517", width : '8,33333333'}}>
                        <div className="tooltip-prices">
                            <div className="color-display-price">
                                    <span>
                                    13500 à 15000 MAD
                                    </span>
                                 
                            </div>
                        </div>
                    </div>
                    <div className="color-display" style={{backgroundColor: "#ff7a14", width : '8,33333333'}}>
                        <div className="tooltip-prices">
                            <div className="color-display-price">
                                    <span>
                                    15000 à 18000
                                    </span>
                                 
                            </div>
                        </div>
                    </div>
                    <div className="color-display" style={{backgroundColor: "#ff0900", width : '8,33333333'}}>
                        <div className="tooltip-prices">
                            <div className="color-display-price">
                                    <span>
                                    180000 à 20000
                                    </span>
                                 
                            </div>
                        </div>
                    </div>
                    <div className="color-display" style={{backgroundColor: "#760404", width : '8,33333333'}}>
                        <div className="tooltip-prices">
                            <div className="color-display-price">
                                    <span>
                                    &gt; 20000 MAD
                                    </span>
                                 
                            </div>
                        </div>
                    </div>
                    </div>
                    <div className="price-holder">
                &gt; 20000 MAD
                </div>
                </>
                 ) }

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
      priceDetails: state.priceDetails,
      config: state.config
    };
};

export default connect(mapStateToProps)(PriceBarComponent);