import React from 'react';
import { connect } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import RightPannelTitle from '../../../Elements/RightPannelTitle';
import TransactionCard from './components/TransactionCard/index';
import SumUpCardHead from './components/SumUpCardHead' 
class Transactions extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ...props,
            displayTransactions: this.props.transactions,
            gettingTransactions: false
        }
    }


    componentDidMount() {
    }

    render() {
        return (
            <div className="estimations-display--container">
                <RightPannelTitle title="Mes biens vendus" />
                    <SumUpCardHead transactions={this.props.myTransactions} nameEntreprise={this.props.user.agence.nameEntreprise} typeEntreprise={this.props.user.agence.nameEntreprise}  locaAgence={this.props.user.agence.localisation} legende={"Biens vendus"} />       

                        <div className="estimations-display--container-cards">
                            { this.props.myTransactions ? (
                                <TransactionCard detailLinks={true} transaction={this.props.myTransactions} />
                            ) : ''}
                        </div>
                        
                {this.state.gettingTransactions === true && (
                    <Spinner
                        animation="border"
                        variant="default"
                        size="lg"/>
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        myTransactions: state.espacePro.transactionsUser,
        user: state.auth
    }
};  
export default connect(mapStateToProps)(Transactions);
