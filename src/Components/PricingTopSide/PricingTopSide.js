import React, { Suspense, lazy }from 'react';

import './PricingTopSide.scss';
import { connect } from "react-redux";
import firebase from '../../Config/FirebaseConfig';


import {withRouter} from 'react-router-dom';


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

const CardComponent =lazy(() => retry(()=> import ('./../CardComponent/CardComponent')));
const AveragePriceArea =lazy(() => retry(()=> import ('../PricingRightSide/AveragePriceArea')));
const ListingAgencies =lazy(() => retry(()=> import ('../PricingRightSide/ListingAgencies')));
const PriceTable =lazy(() => retry(()=> import ('../CardComponent/PriceTable')));


class  PricingTopSide extends React.Component {
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

        getLastTransaction () {
            const db = firebase.firestore();
            var estimationRef = db.collection("transactions");
            var query = estimationRef.orderBy("dateTransactionAdded", "desc").limit(1);
            query
            .get()
            .then((querySnapshot) =>{
                querySnapshot.forEach((doc) => {
                    // const date = new Date(doc.data().dateTransactionAdded);

                    this.props.dispatch({ type: 'SET_LAST_TRANSACTION', data: doc.data().dateTransactionAdded})

                    // this.props.dispatch({ type: 'SET_LAST_TRANSACTION', data: day + '-' + month + '-' + year})
                });
            })

        }

        componentDidMount = () => {
            this.getLastTransaction()
            if(window.innerWidth > 765){
                this.props.dispatch({type : "DISPLAY_PHONE" , data : true})
            }
        }

  
        render () {
            return (
                <div className={this.props.displayPhone ?  "pricing-top-side pricing-top-right" : "pricing-top-side pricing-top-right top-right-overflow"}>
                <div className="row">
                    <div className="col-md-12">

                        {/* autocomplete */}
                        {this.props.displayPhone ? 
                        (
                             
                        <div className="pricing-top-side-card">
                            <Suspense fallback={<></>}>
                        <CardComponent  moreInfo={this.props.moreInfo} />
                            </Suspense>
                    </div>
                        ) : (<>
                            <div className="map--title-container">                                
                            <Suspense fallback={<></>}>
                                <AveragePriceArea cardButton = {true}/>
                            </Suspense>
                            </div> 
                                                    <div className="pricing-top-side-card">

            <div className={!this.props.displayPhone ? "table-inactive" : "right-table-container"}>

<Suspense fallback={<></>}>
            <PriceTable />
            </Suspense>
            <Suspense fallback={<></>}>
            <ListingAgencies />
            </Suspense>
            </div>
            <div className={this.props.displayPhone ? "table-inactive" : "right-table-container"}>
            <button className="button button-primary button--secondary map-switch-desktop" onClick={() => {
                                    this.props.dispatch({type : "DISPLAY_PHONE" , data : true})
                                }}>
                                Voir la carte
                </button>
            </div>
            </div></>
                        )
                        }
                        
                     
                        
        

                    </div>
                    
                    {/* <div className="col-md-12 no-mobile">
                        <div className = "last-update">
                          <span className = "check"> <i className = "fas fa-check-circle "></i> </span>   Dernière mise à jour le : {this.props.estimationState.lastTransaction}
                        </div>
                    </div> */}
                    {/* <div className="col-md-6 no-mobile">
                    
                        <div className="estimate-price">
                            <h5>Le prix exact ?</h5>
                            <p>Estimez votre bien avec notre algorithme innédit au Maroc et totalement gratuit !</p>
                            <div className="estimate-price-button">
                            <Link to='/estimation'>
                                <button className="button button-primary">
                                    J’estime mon bien
                                </button>
                            </Link>
                            </div>
                        </div>
                    </div> */}
                    {/* <div className="col-md-6 no-mobile">

                        <div className="technology">
                            <h5>Technologie de pointe</h5>
                            <p>Nos estimations prennent en compte etc. et utilise l’intelligence artificielle pour 
                                estimer de facon claire et precise le prix de votre bien.
                            </p>


                            <p>Plus de description et d’arguments de tech de pointe.</p>
                            
                        </div>
                    </div> */}
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
      displayPhone : state.card.displayPhone

    };
};

export default connect(mapStateToProps)(withRouter(PricingTopSide));