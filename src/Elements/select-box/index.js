import React from 'react';
import './style.scss';

class SelectBox extends React.Component {
    
   
    state = {
        ...this.props,
        showItems: false,
        selectedItem: this.props.defaultValue ? this.props.items.filter(item => item.value === this.props.defaultValue)[0] : this.props.items[0]
        // selectedItem: this.props.items.filter(item => item.value === this.props.defaultValue)[0]
    };

    dropDown = () => {
        this.setState(prevState => ({
            showItems: !prevState.showItems,
        }))
    }

    selectItem = (item) => {
        this.setState({
            selectedItem: item,
            showItems: false,
        });
        this.props.onSelectChange(item, this.state.id);
    }

    render () {
        return <div className="select-box--component"
        style={{
            display: 'block',
            'text-align': 'left'
        }}>
            <div
            className="select-box--box"
            style={{
                'z-index': this.state.zIndex
            }}>
                <div
                className="select-box--container"
                onClick={this.dropDown}>
                    <div
                    className="select-box--selected-item">
                        {this.state.selectedItem !== null ? this.state.selectedItem.id : this.state.defaultValue}
                    </div>
                    <div
                    className="select-box--arrow">
                        <span
                        className={`${this.state.showItems ? 'select-box--arrow-up' : 'select-box--arrow-down'}`}>
                        </span>
                    </div>
                    <div
                    style={{display: this.state.showItems ? 'block' : 'none'}}
                    className="select-box--items">
                        {
                            this.state.items.map(item => <div
                                key={ item.id }
                                onClick={(e) => {
                                    e.stopPropagation();
                                    this.selectItem(item)
                                }}
                                className={this.state.selectedItem === item ? 'selected' : ''}>
                                { item.id }
                            </div>)
                        }
                    </div>
                </div>
            </div>
        </div>
    }
}

export default SelectBox;