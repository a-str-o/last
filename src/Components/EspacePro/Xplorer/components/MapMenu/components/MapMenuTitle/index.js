import React from 'react';
import './style.scss';

class MapMenuTitle extends React.Component {
    constructor(props) {
        super(props);
        this.state = { ...props };
    }
    render() {
        return (
            <div className="map-menu-title">
                <h5>
                    { this.state.title }
                </h5>
            </div>
        );
    }
}

export default MapMenuTitle;