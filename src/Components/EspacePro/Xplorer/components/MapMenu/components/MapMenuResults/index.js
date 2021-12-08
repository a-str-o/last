import React from 'react';
import { connect } from "react-redux";
import './style.scss';
import placeholderPicture from './../../../../../../../assets/img/placeholder_image_long.png'

class MapMenuResults extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidUpdate(prevProps) {
        const prevFilters = prevProps.filters;
        const filters = this.props.filters;
        const tempTransactions = JSON.parse(JSON.stringify(this.props.filterTransactions)); // deep copy
        let filteredTransactions = tempTransactions.filter(trans => !trans.isDeleted);

        // check filter on price
        if (prevFilters.transactionProperties.price !== filters.transactionProperties.price) {
            switch (filters.transactionProperties.price.operator) {
                case '>=':
                    filteredTransactions = JSON.parse(JSON.stringify(
                        tempTransactions.filter(transaction => +transaction.prix >= +filters.transactionProperties.price.value[0])
                    ));
                    
                    if(filteredTransactions.length !== 0) {
                        this.props.dispatch({ type: 'SET_FILTER_TRANSACTIONS', data: filteredTransactions});
                    }else {
                        filteredTransactions = JSON.parse(JSON.stringify(
                            this.props.filterTransactions.filter(transaction => +transaction.prix >= +filters.transactionProperties.price.value[0])
                        ));
                        this.props.dispatch({ type: 'SET_FILTER_TRANSACTIONS', data: filteredTransactions});
                    }
                    break;
                case '<=':
                    filteredTransactions = JSON.parse(JSON.stringify(
                        tempTransactions.filter(transaction => +transaction.prix <= +filters.transactionProperties.price.value[0])
                    ));
                    if(filteredTransactions.length !== 0) {
                        this.props.dispatch({ type: 'SET_FILTER_TRANSACTIONS', data: filteredTransactions});
                    }else {
                        filteredTransactions = JSON.parse(JSON.stringify(
                            this.props.filterTransactions.filter(transaction => +transaction.prix <= +filters.transactionProperties.price.value[0])
                        ));
                        this.props.dispatch({ type: 'SET_FILTER_TRANSACTIONS', data: filteredTransactions});
                    }
                    break;
                case '==':
                        filteredTransactions = JSON.parse(JSON.stringify(
                            tempTransactions.filter(transaction => +transaction.prix === +filters.transactionProperties.price.value[0])
                        ));
                        if(filteredTransactions.length !== 0) {
                            this.props.dispatch({ type: 'SET_FILTER_TRANSACTIONS', data: filteredTransactions});
                        }else {
                            filteredTransactions = JSON.parse(JSON.stringify(
                                this.props.filterTransactions.filter(transaction => +transaction.prix === +filters.transactionProperties.price.value[0])
                            ));
                            this.props.dispatch({ type: 'SET_FILTER_TRANSACTIONS', data: filteredTransactions});
                        }
                        break;
                case '<>':
                    filteredTransactions = JSON.parse(JSON.stringify(tempTransactions.filter(transaction => {
                        return +transaction.prix >= +filters.transactionProperties.price.value[0] &&
                        +transaction.prix <= +filters.transactionProperties.price.value[1]
                    })));
                    if(filteredTransactions.length !== 0) {
                        this.props.dispatch({ type: 'SET_FILTER_TRANSACTIONS', data: filteredTransactions});
                    }else {
                        filteredTransactions = JSON.parse(JSON.stringify(
                            this.props.filterTransactions.filter(transaction => {
                                return +transaction.prix >= +filters.transactionProperties.price.value[0] &&
                                +transaction.prix <= +filters.transactionProperties.price.value[1]
                            })
                        ));
                        this.props.dispatch({ type: 'SET_FILTER_TRANSACTIONS', data: filteredTransactions});
                    }
                    break;
                default:
                    filteredTransactions = this.props.filterTransactions.filter(trans => !trans.isDeleted);
                    this.props.dispatch({ type: 'SET_FILTER_TRANSACTIONS', data: filteredTransactions});
                    break;
            }
            
        }

        // check filter on surface
        if (prevFilters.transactionProperties.m2 !== filters.transactionProperties.m2) {
            switch (filters.transactionProperties.m2.operator) {
                case '>=':
                    filteredTransactions = JSON.parse(JSON.stringify(
                        filteredTransactions.filter(transaction => +transaction.surface >= +filters.transactionProperties.m2.value[0])
                    ));
                    if(filteredTransactions.length !== 0) {
                        this.props.dispatch({ type: 'SET_FILTER_TRANSACTIONS', data: filteredTransactions});
                    }else {
                        filteredTransactions = JSON.parse(JSON.stringify(
                            this.props.filterTransactions.filter(transaction => +transaction.prix === +filters.transactionProperties.price.value[0])
                        ));
                        this.props.dispatch({ type: 'SET_FILTER_TRANSACTIONS', data: filteredTransactions});
                    }
                    break;
                case '<=':
                    filteredTransactions = JSON.parse(JSON.stringify(
                        filteredTransactions.filter(transaction => +transaction.surface <= +filters.transactionProperties.m2.value[0])
                    ));
                    if(filteredTransactions.length !== 0) {
                            this.props.dispatch({ type: 'SET_FILTER_TRANSACTIONS', data: filteredTransactions});
                        }else {
                            filteredTransactions = JSON.parse(JSON.stringify(
                                this.props.filterTransactions.filter(transaction => +transaction.surface <= +filters.transactionProperties.m2.value[0])
                            ));
                            this.props.dispatch({ type: 'SET_FILTER_TRANSACTIONS', data: filteredTransactions});
                        }
                    break;
                case '==':
                        filteredTransactions = JSON.parse(JSON.stringify(
                            filteredTransactions.filter(transaction => +transaction.surface ===+filters.transactionProperties.m2.value[0])
                        ));
                        if(filteredTransactions.length !== 0) {
                            this.props.dispatch({ type: 'SET_FILTER_TRANSACTIONS', data: filteredTransactions});
                        }else {
                            filteredTransactions = JSON.parse(JSON.stringify(
                                this.props.filterTransactions.filter(transaction => +transaction.surface === +filters.transactionProperties.m2.value[0])
                            ));
                            this.props.dispatch({ type: 'SET_FILTER_TRANSACTIONS', data: filteredTransactions});
                        }
                        break;
                case '<>':
                    filteredTransactions = JSON.parse(JSON.stringify(filteredTransactions.filter(transaction => {
                        return +transaction.surface >= +filters.transactionProperties.m2.value[0] &&
                        +transaction.surface <= +filters.transactionProperties.m2.value[1]
                    })));
                    if(filteredTransactions.length !== 0) {
                        this.props.dispatch({ type: 'SET_FILTER_TRANSACTIONS', data: filteredTransactions});
                    }else {
                        filteredTransactions = JSON.parse(JSON.stringify(
                            this.props.filterTransactions.filter(transaction => {
                                return +transaction.surface >= +filters.transactionProperties.m2.value[0] &&
                                +transaction.surface <= +filters.transactionProperties.m2.value[1]
                            })
                        ));
                        this.props.dispatch({ type: 'SET_FILTER_TRANSACTIONS', data: filteredTransactions});
                    }
                    break;
                default:
                    filteredTransactions = this.props.filterTransactions.filter(trans => !trans.isDeleted);
                    this.props.dispatch({ type: 'SET_FILTER_TRANSACTIONS', data: filteredTransactions});
                    break;
            }
        }
    }

    focusOnLatLng(coordinates) {
        this.props.dispatch({ type: 'SET_TRANSACTION_CLICKED', data: false});
        var remplaceSomeCharsInmarkersData = coordinates.replace('lat : ', '').replace('lng : ', '').replace('}', '');     
        var splitransC = remplaceSomeCharsInmarkersData.split(' ');
        var lat = splitransC[0];
        var lng = splitransC[1];
        this.props.dispatch({ type: 'SET_URL_VIEWPORT', data: {latitude: lat , longitude: lng}});
    }

    render() {
        return (
            <div className="map-menu-results">
                {this.props.transactions && this.props.transactions.map((transaction) =>
                    <div className='map-menu-results--ind' 
                    style = {{cursor: 'pointer'}}
                    onClick = {() => {this.focusOnLatLng (transaction.coordinates)}}>
                        <div
                            className='map-menu-results--pictures'
                            style={{
                                backgroundImage: (transaction.images && transaction.images.length > 0) ? `url(${transaction.images[0]})` : `url(${placeholderPicture})`
                            }}>
                        </div>
                        <div className='map-menu-results--details'>
                            <div className='map-menu-results--address'>
                                <i class="fas fa-map-marker-alt"></i>
                                { transaction.address }
                            </div>
                            <div className='map-menu-results--consistance'>
                                <i class="fas fa-info-circle"></i>
                                { transaction.consistance }
                            </div>
                            {/* <div className='map-menu-results--price'>
                                <i class="fas fa-money-bill-wave"></i>
                                { new Intl.NumberFormat(
                                    'ma',
                                    {
                                        style: 'currency',
                                        currency: 'MAD',
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 0
                                    })
                                    .format(transaction.prix)
                                    .replaceAll(',', ' ') }
                            </div> */}
                            <div className='map-menu-results--surface'>
                                <i class="fas fa-ruler-combined"></i>
                                { transaction.surface } m<sup>2</sup>
                            </div>
                            <div className='map-menu-results--date'>
                                <i class="fas fa-calendar-alt"></i>
                                { transaction.dateTransactions }
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        transactions: state.espacePro.transactions,
        filters: state.espacePro.xplorerFilters,
        filterTransactions: state.espacePro.filterTransactions,
        user: state.firebase.auth
    }
};  
export default connect(mapStateToProps)(MapMenuResults);