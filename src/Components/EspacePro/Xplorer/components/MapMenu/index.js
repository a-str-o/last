import React from 'react';
import { connect } from "react-redux";
import MapMenuFilterForm from './components/MapMenuFilterForm';
import MapMenuFilters from './components/MapMenuFilters';
import MapMenuResults from './components/MapMenuResults';
import MapMenuSearch from './components/MapMenuSearch';
import MapMenuTitle from './components/MapMenuTitle';
import './style.scss';

class MapMenu extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (

            <>
            
            <div className="map-menu" style={{transform: this.props.transactionCliked? "translateX(0px)" 
            :""}}>
                <MapMenuTitle title="Xplorer" />
                <MapMenuFilters />
                { this.props.activeFilter.id !== null && <MapMenuFilterForm /> }
                <MapMenuSearch />
                <MapMenuResults />

                
            </div>
            <div className="mobile-filter" style={{top: this.state.open? "30px" : "70px"}} 
            onClick={() => {
                
                this.props.dispatch({ type: 'SET_TRANSACTION_CLICKED', data: !this.props.transactionCliked});
            }
            }>
                    <i className="fas fa-filter" ></i>
            </div>
            </>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        activeFilter: state.espacePro.activeFilter,
        transactionCliked : state.espacePro.transactionCliked
    }
};  
export default connect(mapStateToProps)(MapMenu);