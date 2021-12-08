import React from 'react';
import { connect } from "react-redux";
import './style.scss';

class ProFilterOperators extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activeOperator: null
        };
    }

    componentDidUpdate(prevProps) {
        if ( this.props.activeFilter.id === 'm2' ) {
            if ( prevProps.xplorerFilters.transactionProperties.m2.operator !==  this.props.xplorerFilters.transactionProperties.m2.operator ) {
                this.setState({
                    activeOperator: this.props.xplorerFilters.transactionProperties.m2.operator
                })   
            }
        }
        if ( this.props.activeFilter.id === 'price' ) {
            if ( prevProps.xplorerFilters.transactionProperties.price.operator !==  this.props.xplorerFilters.transactionProperties.price.operator ) {
                this.setState({
                    activeOperator: this.props.xplorerFilters.transactionProperties.price.operator
                })
            }   
        }
        if ( this.props.activeFilter.id === 'date' ) {
            if ( prevProps.xplorerFilters.transactionProperties.date.operator !==  this.props.xplorerFilters.transactionProperties.date.operator ) {
                this.setState({
                    activeOperator: this.props.xplorerFilters.transactionProperties.date.operator
                })
            }
        }
    }

    render() {
        return (
            <div className="map-menu-filters--operators">
                <div
                    className={ this.state.activeOperator === '<=' ? 'map-menu-filters--operator active-operator' : 'map-menu-filters--operator'}
                    onClick={() => this.props.click('<=')}>
                    Plus petit que
                </div>
                <div
                    className={ this.state.activeOperator === '>=' ? 'map-menu-filters--operator active-operator' : 'map-menu-filters--operator'}
                    onClick={() => this.props.click('>=')}>
                    Plus grand que
                </div>
                <div 
                    className={ this.state.activeOperator === '==' ? 'map-menu-filters--operator active-operator' : 'map-menu-filters--operator'}
                    onClick={() => this.props.click('==')}>
                    Égal à
                </div>
                <div
                    className={ this.state.activeOperator === '<>' ? 'map-menu-filters--operator active-operator' : 'map-menu-filters--operator'}
                    onClick={() => this.props.click('<>')}>
                    Entre
                </div>
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        activeFilter: state.espacePro.activeFilter,
        xplorerFilters: state.espacePro.xplorerFilters
    }
};  
export default connect(mapStateToProps)(ProFilterOperators);