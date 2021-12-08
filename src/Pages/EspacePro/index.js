import React from 'react';
import { connect } from "react-redux";
import RightPannel from '../../Components/EspacePro/RightPannel';
import LeftMenu from './../../Components/EspacePro/LeftMenu/index';
import './style.scss';
import Loading from '../../Loading'
import {withRouter} from 'react-router-dom';
import {Helmet} from 'react-helmet'
import axios from 'axios';
import { toast } from "react-toastify";
import ReactGA from 'react-ga'

class EspacePro extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            loading : true
        };
    }
    getAgence(){
        axios.post('https://us-central1-agenz-website-prod.cloudfunctions.net/api/getAgence',{user_id : this.props.uid}).then(result => {
            // console.log(result.data)
            this.props.dispatch({type : "SET_AGENCE", data : result.data})
    })
    .catch(err => {
        console.log(err)
    })
    }
    componentDidMount() {
        this.getAgence()
        ReactGA.pageview(this.props.location.pathname+ this.props.location.search)
        // console.log(this.props.estimations)
        if(this.props.estimations) {
        if (this.props.estimations===null) {
            // this.props.dispatch({ type: 'LOADER_TRUE' });
              this.getEstimations();
    }
    else {
        this.setState({loading : false})
        this.props.dispatch({ type: 'LOADER_FALSE' });
    }
}
else {

      this.getEstimations();

  }
  if(this.props.transactionsUser) {
    if (this.props.transactionsUser===null) {
        // this.props.dispatch({ type: 'LOADER_TRUE' });

          this.getTransactions();
}
else {
    this.setState({loading : false})
    this.props.dispatch({ type: 'LOADER_FALSE' });
}
}
else {

  this.getTransactions();

}
}
    componentDidUpdate(prevProps){
        if(prevProps.history !== this.props.history){
            ReactGA.pageview(this.props.location.pathname+ this.props.location.search);
        }
      }


    getEstimations() {
        axios.get('https://us-central1-agenz-website-prod.cloudfunctions.net/api/estimationsUser').then(result => {
        this.props.dispatch({ type: 'SET_ESTIMATIONS', data: result.data });
            this.props.dispatch({ type: 'LOADER_FALSE' });
            this.setState({loading : false})
        })
        .catch(err => {
            this.props.dispatch({ type: 'LOADER_FALSE' });
            this.setState({loading : false})
            toast.error("Votre session à expirée")
            localStorage.removeItem('FBIdToken');
            this.props.history.push("/");
        })
    }
    
    getTransactions() {
        axios.get('https://us-central1-agenz-website-prod.cloudfunctions.net/api/transactionsUser').then(result => {
        this.props.dispatch({ type: 'SET_TRANSACTIONS_USER', data: result.data });
            // this.props.dispatch({ type: 'LOADER_FALSE' });
            // this.setState({loading : false})
        })
        .catch(err => {
            console.log(err)
            // this.props.dispatch({ type: 'LOADER_FALSE' });
            // this.setState({loading : false})
            // this.props.history.push("/");

        })
    }

    render() {
            return (
                <>

        <Helmet>
    <title>agenz -  Espace pro</title>
    <meta
      name="description"
      content="agenz - Toutes les informations et outils dont vous avez besoin pour maîtriser le marché de l\'immobilier"
    />
    <meta property="og:url"                content='https://www.agenz.ma/pro-space'/>
    <meta property="og:type"               content="article" />
    <meta property="og:title"       content='Espace pro agenz.ma'/>
    <meta property="og:description" content="Toutes les informations et outils dont vous avez besoin pour maîtriser le marché de l\'immobilier"/>
    </Helmet>
            {this.state.loading && <Loading />} 
                    {/* // <Loader type="ball-grid-pulse" />} */}
                    {!this.state.loading && (
                        <div className="pro--space-container">
                            <LeftMenu />
                            <RightPannel />
                        </div>
                    )}
                </>
            )
        } 
    
    }
const mapStateToProps = (state) => {
    return {
        agence : state.auth.agence,
        user: state.auth.user,
        uid : state.auth.uid,
        loadState: state.loading,
        estimations: state.espacePro.estimations,
        transactionsUser : state.espacePro.transactionsUser,
    }
};  
export default connect(mapStateToProps)(withRouter(EspacePro));