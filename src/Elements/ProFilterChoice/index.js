import React from 'react';
import './style.scss';

class ProFilterChoice extends React.Component {
    render() {
        return (
            <div
                className="map-menu-filters--transactions-filter"
                onClick={() => this.props.choiceMade()}>
                { this.props.selected }
            </div>
        );
    }
}

export default ProFilterChoice;