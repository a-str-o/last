import React, { Component } from 'react';
import EstimationStepper from '../../Components/Estimation/EstimationStepper';
import {Helmet} from 'react-helmet';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import ReactGA from "react-ga"
class Estimation extends Component {
    componentDidMount(){
        ReactGA.pageview(this.props.location.pathname+ this.props.location.search);
        }
        componentDidUpdate(prevProps){
            if(prevProps.location !== this.props.location){
                ReactGA.pageview(this.props.location.pathname+ this.props.location.search);
          }
        }
    
    render() {
        if(this.props.authenticatedPro ) {
            return <Redirect to="/estimationPro"/>
        }else {
        return (
            <div className="container main-container">
                        <Helmet>
    <title>Estimation en ligne gratuite de biens immobiliers - agenz</title>
    </Helmet>
                <div className="row justify-content">
                    <div className="col-md-12 col-sm-12">
                        <EstimationStepper lat={this.props.match.params.latitude} long={this.props.match.params.longitude} />
                    </div>
                </div>
            </div>
        );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        authenticated : state.auth.authenticated,
        authenticatedPro : state.auth.authenticatedPro
    };
};
export default connect(mapStateToProps)(Estimation);