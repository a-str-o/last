import React, { Component, Suspense, lazy } from 'react';

import {Helmet} from 'react-helmet'
import { connect } from "react-redux";
import Loading from '../../Loading'
import './pricing.scss';
import ReactGA from 'react-ga'
import {withRouter} from 'react-router-dom'

function retry(fn, retriesLeft = 10, interval = 1000) {
  return new Promise((resolve, reject) => {
    fn()
      .then(resolve)
      .catch((error) => {
        setTimeout(() => {
          if (retriesLeft === 1) {
            // reject('maximum retries exceeded');
            reject(error);
            return;
          }

          // Passing on "reject" is the important part
          retry(fn, retriesLeft - 1, interval).then(resolve, reject);
        }, interval);
      });
  });
}

const PricingTopSide =lazy(() => retry(()=> import ('../../Components/PricingTopSide/PricingTopSide')));
const PricingRightSide =lazy(() => retry(()=> import ('../../Components/PricingRightSide/PricingRightSide')));



class Pricing extends Component {


  constructor(props) {
    super(props);
    this.state = {
        loading : false
    }
}

   
    handleResize(){
      console.log(window.innerWidth)
      
    }
    componentDidMount() {

        ReactGA.pageview(this.props.location.pathname+ this.props.location.search);

        window.scrollTo(0, 0);
    }
    render() {


        return (
<>
        <Helmet>
    <title>Carte des prix de l'immobilier - agenz </title>
    </Helmet>
                {/* <PageHero h3={h3} p={p} className={className} /> */}
                <div className="container main-container container--pricing">
                    <div className="row justify-content">
                    <div className="col-md-6 col-sm-12 pricing-top-side pricing-right-side">
                          {this.state.loading ? (
                            <div className="vitrine--loader">
                    {/* <BeatLoader color='#2ea7f9' loading={true} css={override} size={15} /> */}
                    <Loading />
                    </div>

                          ) :
                          
                          ( 
                            <Suspense fallback={<></>}>
                            <PricingRightSide /> 
                            </Suspense>
                            )
                          }
                        </div>
                        <div className="col-md-6 col-sm-12 pricing-top-side">
                          {this.state.loading ? (
                                                        <div className="vitrine--loader">
                    {/* <BeatLoader color='#2ea7f9' loading={true} css={override} size={15} /> */}
                    <Loading />
                    
                    </div>

                          ) :
                          
                          ( 
                            <Suspense fallback={<></>}>
                            <PricingTopSide moreInfo={this.props.moreInfo} /> 
                            </Suspense>)
                          }
                        </div>
                        
                        
                        <div className="col-sm-12 no-mobile">
                            {/* <LastNews /> */}
                        </div>
                    </div>
                </div>
                {/* <span className="no-mobile">
                    <Footer />
                </span> */}
</>
                );
    }
}

const mapStateToProps = (state) => {
    const uid = state.auth.uid;
    const email = state.auth.email;
    const estimation = state.estimationState;
    return {
      uid: uid,
      email: email,
      estimationState: estimation,
      user: state.auth.user,
      loadState: state.loading,
      transactions : state.transactions
    };
  };
  
  export default connect(mapStateToProps)(withRouter(Pricing));
  
