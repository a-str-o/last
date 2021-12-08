import React from 'react';
import { connect } from "react-redux";
import './style.scss';

class MapMenuSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchInput : null
        }
    }
    handleChange = (e) => {
        console.log(e.target.value)
        if(e.target.value && e.target.value !== '') {
            
            const transactions = this.props.filterTransactions.filter(trans => (trans.address).toLowerCase().match(e.target.value.toLowerCase()));
            this.props.dispatch({ type: 'SET_FILTER_TRANSACTIONS', data: transactions });
        }else if(e.target.value === '') {
            this.props.dispatch({ type: 'SET_FILTER_TRANSACTIONS', data: this.props.filterTransactions});
        }
        
    };

    render() {
        return (
            <div className="map-menu-search">
                <input
                id = "searchInput"
                onChange={(e) => this.handleChange(e)}
                placeholder="Entrez l'adresse d'un bien"/>
                    
            </div>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        transactions: state.espacePro.transactions,
        filterTransactions: state.espacePro.filterTransactions,
    }
};  
export default connect(mapStateToProps)(MapMenuSearch);