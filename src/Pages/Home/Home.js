import React, { Suspense, lazy, Component }from 'react';
import { connect } from "react-redux";
import './Home.scss';
import logo_pro from '../../assets/img/Logo_hd_PRO.png';
import { Link } from 'react-router-dom';
import {Helmet} from 'react-helmet'
import Loading from "../../Loading"
import ReactGA from 'react-ga'
const HomeHero =lazy(()=> import ('../../Components/Heros/HomeHero'));
const HomeTimeLine =lazy(()=> import ('../../Components/HomeTimeLine/HomeTimeLine'));
const Footer =lazy(()=> import ('../../Components/Footer/Footer'));

class Home extends Component {
    componentDidMount(){
        ReactGA.pageview(this.props.location.pathname+ this.props.location.search);
        }

    render() {

        return (
            <>
                            <Helmet> 
            <title>Estimation immobilière en ligne et gratuite - agenz</title>

        </Helmet>  
        <Suspense >
                <HomeHero />
                </Suspense>
                <Suspense >

                            <HomeTimeLine />
                            </Suspense>
                <div className="jumbotron no-margin-jumbo">
                    <div className="container">
                        <div className="row feature-3">
        
                            <div className="col-md-6 column-center-vertical">
                                <div className="feature-3-text">
                                    {/* <h3>Agenz pro</h3> */}
                                    <img src={logo_pro} alt="Spécialiste du prix de l'immobilier à Casablanca" className="logo--pro-demo" />
                                    <p style={{marginBottom: '15px'}}>
                                        Découvrez nos solutions pro d’estimations, d’étude de marché et de conseil qui couvrent l’ensemble de la chaîne de valeurs de l’immobilier.<br></br>
                                        Accélerez votre activité ou offrez une expérience digitale unique pour vos clients avec agenz PRO
                                    </p>
                                    <div className="time-line-section-button text-left">
                                        <Link to="/Offres-pro">
                                        <button className="button button-primary button--secondary">
                                        {/* // onClick={() =>{ this.setState({open: true})}} */}
                                            Nos offres PRO
                                        </button>
                                        </Link>
                                    </div>
                                    
                                </div>
                            </div>
        
                            <div className="col-md-6">
                                <div className="feature-3-image"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <Suspense fallback={<Loading />}>

                <Footer />
</Suspense>        
            </>
        );
    }
}


const mapStateToProps = (state) => {
    const uid = state.firebase.auth.uid;
    return {
      uid: uid
    };
};

export default connect(mapStateToProps)(Home);
