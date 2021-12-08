import React from 'react';
import { connect } from "react-redux";
import ProFilterFormInput from '../../../../../../../Elements/ProFilterFormInuput';
import ProFilterOperators from '../../../../../../../Elements/ProFilterOperators';
import './style.scss';

class MapMenuFilterForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ...props,
            metric: {
                value: [],
                id: null
            }
        };
    }

    handleFilterSelection(choice, filter) {
        console.log(choice, filter)
        if(filter.id === 'transactions') {
            this.filterTransaction(choice.id)
        }else {
            this.filterBien(choice.id)
        }
        
        this.props.dispatch({
            type: 'SET_CHOSEN_FILTER',
            data: {
                choice: choice,
                filter: filter
            }
        })
    }

    handleMetricSelection(choice, filter) {
        
        this.props.dispatch({
            type: 'SET_CHOSEN_FILTER',
            data: {
                choice: choice,
                filter: filter
            }
        })
    }


    filterTransaction (id) {
        switch (id) {
            case 'mine':
                const filteredTransactions = JSON.parse(JSON.stringify(
                    this.props.transactions.filter(transaction => transaction.contributeur ===this.props.user.email)
                ));

                if(filteredTransactions.length !== 0) {
                    this.props.dispatch({ type: 'SET_FILTER_TRANSACTIONS', data: filteredTransactions});
                }else {
                    const filteredTransactions = JSON.parse(JSON.stringify(
                        this.props.filterTransactions.filter(transaction => transaction.contributeur === this.props.user.email)
                    ));
                    this.props.dispatch({ type: 'SET_FILTER_TRANSACTIONS', data: filteredTransactions});
                }
                break;
            case 'others':
                const filteredOtherTransactions = JSON.parse(JSON.stringify(
                    this.props.transactions.filter(transaction => transaction.contributeur !== this.props.user.email)
                ));
                if(filteredOtherTransactions.length !== 0) {
                    this.props.dispatch({ type: 'SET_FILTER_TRANSACTIONS', data: filteredOtherTransactions});
                }else {
                    const filteredOtherTransactions = JSON.parse(JSON.stringify(
                        this.props.filterTransactions.filter(transaction => transaction.contributeur !== this.props.user.email)
                    ));
                    this.props.dispatch({ type: 'SET_FILTER_TRANSACTIONS', data: filteredOtherTransactions});
                }
                break;
            case 'all':
                    this.props.dispatch({ type: 'SET_FILTER_TRANSACTIONS', data: this.props.filterTransactions});
                    break;
            default:
                this.props.dispatch({ type: 'SET_FILTER_TRANSACTIONS', data: this.props.filterTransactions});
                break;
        }
    }

    filterBien (id) {
        switch (id) {
            case 'appartments':
                const filterAppartement = JSON.parse(JSON.stringify(
                    this.props.transactions.filter(transaction => transaction.bien === 'appartement')
                ));

                if(filterAppartement.length !== 0) {
                    this.props.dispatch({ type: 'SET_FILTER_TRANSACTIONS', data: filterAppartement});
                }else {
                    const filterAppartement = JSON.parse(JSON.stringify(
                        this.props.filterTransactions.filter(transaction => transaction.bien === 'appartement')
                    ));
                    this.props.dispatch({ type: 'SET_FILTER_TRANSACTIONS', data: filterAppartement});
                }

                
                break;
            case 'fields':
                const filterFields = JSON.parse(JSON.stringify(
                    this.props.transactions.filter(transaction => transaction.bien === 'terrainu')
                ));
                
                if(filterFields.length !== 0) {
                    this.props.dispatch({ type: 'SET_FILTER_TRANSACTIONS', data: filterFields});
                }else {
                    const filterFields = JSON.parse(JSON.stringify(
                        this.props.filterTransactions.filter(transaction => transaction.bien === 'terrainu')
                    ));
                    this.props.dispatch({ type: 'SET_FILTER_TRANSACTIONS', data: filterFields});
                }
                break;
            case 'villas':
                const filterVillas = JSON.parse(JSON.stringify(
                    this.props.transactions.filter(transaction => transaction.bien === 'villa')
                ));
                
                if(filterVillas.length !== 0) {
                    this.props.dispatch({ type: 'SET_FILTER_TRANSACTIONS', data: filterVillas});
                }else {
                    const filterVillas = JSON.parse(JSON.stringify(
                        this.props.filterTransactions.filter(transaction => transaction.bien === 'villa')
                    ));
                    this.props.dispatch({ type: 'SET_FILTER_TRANSACTIONS', data: filterVillas});
                }
                break;
            default:
                this.props.dispatch({ type: 'SET_FILTER_TRANSACTIONS', data: this.props.filterTransactions});
                break;
        }
    }
    render() {
        return (
            <div className="map-menu-filters--filterFormBox">
                { this.props.activeFilter.id !== null && (
                    <div className="map-menu-filters--filter-options">
                        { this.props.activeFilter.type === 'multipleChoice' ? (
                            <div>
                                {this.props.activeFilter.data.map(choice =>
                                    <div
                                        className="map-menu-filters--filter-options-transactions"
                                        onClick={() => {this.handleFilterSelection(choice, this.props.activeFilter)}}>
                                        {choice.display}
                                    </div>
                                )}
                            </div>
                        ) : this.props.activeFilter.type === 'metric' ? (
                            <div
                            className="map-menu-filters--filter-options-metrics">
                                <ProFilterOperators
                                    choice={
                                        this.props.activeFilter.id === 'm2' ? this.props.xplorerFilters.transactionProperties.m2.operator :
                                        this.props.activeFilter.id === 'price' ? this.props.xplorerFilters.transactionProperties.price.operator :
                                        this.props.activeFilter.id === 'date' ? this.props.xplorerFilters.transactionProperties.date.operator :
                                        ''
                                    }
                                    click={(e) => {
                                        this.setState({
                                            ...this.state,
                                            metric: {
                                                ...this.state.metric,
                                                id: e
                                            }
                                        })
                                        this.props.dispatch({ type: 'UPDATE_OPERATOR', data: e })
                                    }}/>
                                <div className="map-menu-filters--form">
                                    { this.state.metric.id !== null && (
                                        <ProFilterFormInput
                                            operator={
                                                this.props.activeFilter.id === 'm2' ? this.props.xplorerFilters.transactionProperties.m2.operator :
                                                this.props.activeFilter.id === 'price' ? this.props.xplorerFilters.transactionProperties.price.operator :
                                                this.props.activeFilter.id === 'date' ? this.props.xplorerFilters.transactionProperties.date.operator :
                                                ''
                                            }
                                            type={this.props.activeFilter.id}
                                            selection={(e) => {this.handleMetricSelection(e, this.props.activeFilter)}}/>
                                    )}
                                </div>
                            </div>
                        ) : ''}
                    </div>
                ) }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        activeFilter: state.espacePro.activeFilter,
        xplorerFilters: state.espacePro.xplorerFilters,
        filterTransactions: state.espacePro.filterTransactions,
        transactions: state.espacePro.transactions,
        user: state.firebase.auth
    }
};  
export default connect(mapStateToProps)(MapMenuFilterForm);