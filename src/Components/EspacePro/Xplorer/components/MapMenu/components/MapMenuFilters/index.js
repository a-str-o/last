import React from 'react';
import { connect } from "react-redux";
import ProFilterChoice from '../../../../../../../Elements/ProFilterChoice';
import './style.scss';

class MapMenuFilters extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ...props,
            transactionTypes: [
                { id: 'all', display: 'Toutes les transactions' },
                { id: 'mine', display: 'Mes transactions' },
                { id: 'others', display: 'Autres transactions' }
            ],
            transactionBien: [
                { id: 'all', display: 'Tout type de bien' },
                { id: 'villas', display: 'Villas' },
                { id: 'appartments', display: 'Appartements' },
                { id: 'fields', display: 'Terrains nus' }
            ],

        }
    }

    handleChoice = (activeFilter) => {
        console.log(activeFilter)
        this.props.dispatch({
            type: 'SET_ACTIVE_FILTER',
            data: activeFilter
        })
    }

    render() {
        return (
            <div className="map-menu-filters">
                <div>Montrer les</div>
                <div className="map-menu-filters--booleans">
                    <div
                        className={
                            this.props.xplorerFilters.priceZones ?
                            'map-menu-filters--booleans-ind active' :
                            'map-menu-filters--booleans-ind'}
                        onClick={() => {
                            this.props.dispatch({ type: 'SET_FILTERS', data: {
                                ...this.props.xplorerFilters,
                                priceZones: !this.props.xplorerFilters.priceZones
                            } });
                        }}>
                        Zone des prix
                    </div>
                    <div
                        className={
                            this.props.xplorerFilters.interestPoints ?
                            'map-menu-filters--booleans-ind active' :
                            'map-menu-filters--booleans-ind'}
                        onClick={() => {
                            this.props.dispatch({ type: 'SET_FILTERS', data: {
                                ...this.props.xplorerFilters,
                                interestPoints: !this.props.xplorerFilters.interestPoints
                            } });
                        }}>
                        Points d'intérêts
                    </div>
                    <div
                        className={
                            this.props.xplorerFilters.transactions ?
                            'map-menu-filters--booleans-ind active' :
                            'map-menu-filters--booleans-ind'}
                        onClick={() => {
                            this.props.dispatch({ type: 'SET_FILTERS', data: {
                                ...this.props.xplorerFilters,
                                transactions: !this.props.xplorerFilters.transactions
                            } });
                        }}>
                        Transactions
                    </div>
                </div>
                <div style={{
                    marginTop: '10px',
                    display: 'flex',
                    alignItems: 'center'
                    }}>
                    Filtres
                    <div className="filtres-init-command" onClick={
                        () => {
                            this.props.dispatch({ type: 'RESET_FILTERS' });
                            this.props.dispatch({ type: 'SET_FILTER_TRANSACTIONS', data: this.props.filterTransactions});
                        }
                    }>
                        Réinitialiser
                    </div>
                </div>
                <div className="map-menu-filters--transactions">
                    <ProFilterChoice
                        selected={ this.state.transactionTypes.filter(
                            type => type.id === this.props.xplorerFilters.transactionType
                        )[0].display}
                        choiceMade={() => {
                            let activeFilter = {
                                type: 'multipleChoice',
                                id: 'transactions',
                                data: this.state.transactionTypes
                            }
                            if (this.props.activeFilter.id === 'transactions') {
                                activeFilter = {
                                    type: null,
                                    id: null,
                                    data: null
                                }
                            }
                            this.handleChoice(activeFilter);
                        }}
                    />
                    <ProFilterChoice
                        selected={ this.state.transactionBien.filter(
                            type => type.id === this.props.xplorerFilters.transactionProperties.type
                        )[0].display}
                        choiceMade={() => {
                            let activeFilter = {
                                type: 'multipleChoice',
                                id: 'bien',
                                data: this.state.transactionBien
                            }
                            if (this.props.activeFilter.id === 'bien') {
                                activeFilter = {
                                    type: null,
                                    id: null,
                                    data: null
                                }
                            }
                            this.handleChoice(activeFilter);
                        }}
                    />
                    <ProFilterChoice
                        selected={ this.props.xplorerFilters.transactionProperties.price.display }
                        choiceMade={() => {
                            let activeFilter = {
                                type: 'metric',
                                id: 'price',
                                data: null
                            }
                            if (this.props.activeFilter.id === 'price') {
                                activeFilter = {
                                    type: null,
                                    id: null,
                                    data: null
                                }
                            }
                            this.handleChoice(activeFilter);
                        }}
                    />
                    <ProFilterChoice
                        selected={ this.props.xplorerFilters.transactionProperties.m2.display }
                        choiceMade={() => {
                            let activeFilter = {
                                type: 'metric',
                                id: 'm2',
                                data: null
                            }
                            if (this.props.activeFilter.id === 'm2') {
                                activeFilter = {
                                    type: null,
                                    id: null,
                                    data: null
                                }
                            }
                            this.handleChoice(activeFilter);
                        }}
                    />
                </div>
            </div>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        xplorerFilters: state.espacePro.xplorerFilters,
        activeFilter: state.espacePro.activeFilter,
        filterTransactions: state.espacePro.filterTransactions,
    }
};  
export default connect(mapStateToProps)(MapMenuFilters);