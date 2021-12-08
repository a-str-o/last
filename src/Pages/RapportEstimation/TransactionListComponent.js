
import React, { Component } from 'react';
import { connect } from "react-redux";


// https://gitlab.com/catamphetamine/react-phone-number-input
import 'react-phone-number-input/style.css'


import './Rapport.scss';


import moment from 'moment';
import TransactionComponent from "./TransactionComponent"
import Pagination from "./Pagination"

moment.locale("fr")
class TransactionListComponent extends Component {
constructor(props) {
super(props);
this.state = { allTransactions: this.props.transactions, 
    currentTransactions: [], 
    currentPage: null, 
    totalPages: null }
}
onPageChanged = data => {
    const { allTransactions } = this.state;
    const { currentPage, totalPages, pageLimit } = data;

    const offset = (currentPage - 1) * pageLimit;
    const currentTransactions = allTransactions.slice(offset, offset + pageLimit);

    this.setState({ currentPage, currentTransactions, totalPages });
  }

render(){
    const { allTransactions} = this.state;
    const totalTransactions = allTransactions.length;
    return (
<>
{this.state.currentTransactions.map((row, index) => (
    <>
<TransactionComponent construction = {row.construction} address={row.address} transactionId = {row.transactionId} consistance={row.consistance} prix={row.prix} images={row.images} dateTransactions={row.dateTransactions} surface={row.surface} />
</>
))
}
<div className="d-flex flex-row py-4 align-items-center pagination--container">
              <Pagination totalRecords={totalTransactions} pageNeighbours={1} onPageChanged={this.onPageChanged} pageLimit={3} />
</div>
</>
    )
}
}
const mapStateToProps = (state) => {
    return {
        config: state.config,
    };
    };
    
    export default connect(mapStateToProps)(TransactionListComponent);
    
