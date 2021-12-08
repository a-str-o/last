import React, { Component } from 'react';
import ContactSide from '../../Components/ContactSide/ContactSide';
import Footer from '../../Components/Footer/Footer';
import PageHero from '../../Components/Heros/PageHero';
import ReactGA from "react-ga"
import {Helmet} from 'react-helmet';
import {withRouter} from 'react-router-dom'
class Contact extends Component {
    componentDidMount(){
        ReactGA.pageview(this.props.location.pathname+ this.props.location.search);
    
        }



    render() {
        return (
            <>

        <Helmet>
    <title>Contact - Agenz</title>
    </Helmet>
                <PageHero h3={'Contactez-nous'} p={'Nous vous répondrons dans les plus bref délais'} className={'contact'} />
                <div className="container main-container">
                    <div className="row justify-content">
                        <div className="col-sm-12">
                            <ContactSide />
                        </div>
                    
                    </div>
                </div>
                <Footer />
                </>
        );
    }
}

export default withRouter(Contact);
