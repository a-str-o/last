import React from 'react';
import NoAccess from './components/NoAccess'
import './style.scss';
// import { connect } from "react-redux";
// import MapExplorer from './components/MapExplorer';
// import MapMenu from './components/MapMenu';

// import axios from 'axios'

// import { css } from "@emotion/core";
// import BeatLoader from "react-spinners/BeatLoader";

// const override = css`
//   display: block;
//   margin: 0 auto;
//   border-color: red;
// `;

class Xplorer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading : true
        }
    }
    // transactionsPro() {
    //     if(this.props.transactionsPro){
    //       if(this.props.transactionsPro.length>0){
    //       this.setState({loading : false})
    //       }
    //       else {
    //         let transactions = [];
    //         axios.get('https://us-central1-agenz-website-prod.cloudfunctions.net/api/transactions').then(result => {
    //         result.data.forEach(trans => {
    //           transactions.push(trans)
    //         })
    //         //console.log(transactions)
    //         this.props.dispatch({ type: 'SET_TRANSACTIONS_PRO', data: transactions });
    //         this.setState({loading : false})
    //       })
    //       .catch(err => {
    //         //console.log(err)
    //       })
  
    //       }
    //     }
    //     else {
    //       let transactions = [];
    //       axios.get('https://us-central1-agenz-website-prod.cloudfunctions.net/api/transactionsPro').then(result => {
    //       result.data.forEach(trans => {
    //         transactions.push(trans)
    //       })
    //       this.props.dispatch({ type: 'SET_TRANSACTIONS_PRO', data: transactions });
    //       this.setState({loading : false, transactionsPro : transactions})
    //     })
    //     .catch(err => {
    //       //console.log(err)
    //     })
    //     }
    //     }
componentDidMount(){
    // const db = firebase.firestore();
    // const auth = firebase.auth();
    // this.transactionsPro() 
}
    render() {
        return (
            <div className="xplorer-container">
                {/* <MapMenu />
                {this.state.loading ? (
                    <BeatLoader color='#2ea7f9' loading={true} css={override} size={15} />

                          ) :
                          
                          (
                <MapExplorer transactionsPro={this.props.transactionsPro} />
                          )
    } */}
    <NoAccess />
            </div>
        )
    }
}

// const mapStateToProps = (state) => {
//     return {
//         transactionsPro : state.espacePro.transactions
//     }
// };  
export default Xplorer;