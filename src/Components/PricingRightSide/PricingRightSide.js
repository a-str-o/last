import React, { Suspense, lazy} from 'react'

import './PricingRightSide.scss';


import { connect } from "react-redux";
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
  
const ListingAgencies =lazy(() => retry(()=> import ('./ListingAgencies')));
const AveragePriceArea =lazy(() => retry(()=> import ('./AveragePriceArea')));


class  PricingRightSide extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                address : '',
                coordinates: {
                    lat: null,
                    lng: null
                },
            }
        }



        componentDidMount = () => {
  
        };

        render () {
            return (
                <div className="pricing-top-side pricing-top-left">
                <div className="row">
                    <div className="col-md-12">
                    <Suspense fallback={<></>}>
                        <AveragePriceArea />
                    </Suspense>
                        
                    <Suspense fallback={<></>}> 
                        <ListingAgencies />
                    </Suspense>

                    </div>
                    
                    <div className="col-md-12 no-mobile">
                    </div>
                </div>

            </div>
        );
    }
  }

  const mapStateToProps = (state) => {
    const estimation = state.estimationState;
    const transactions = state.transactions
    return {
      estimationState: estimation,
      transactions : transactions,
      priceDetails: state.priceDetails,

    };
};

export default connect(mapStateToProps)(PricingRightSide);
