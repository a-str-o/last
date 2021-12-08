import React from 'react';
import './style.scss';

class ProFilterFormInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ...props,
            value: ['', '']
        }
    }

    handleChange = (e, id) => {
        if (id === 'from') {
            const currentValue = this.state.value;
            currentValue[0] = e.target.value;
            this.setState({
                ...this.state,
                value: currentValue
            });
        } else if (id === 'to') {
            const currentValue = this.state.value;
            currentValue[1] = e.target.value;
            this.setState({
                ...this.state,
                value: currentValue
            });
        }
    }

    render() {
        return (
            <div className="pro-filter-form-input--container">
                {this.props.operator === '<>' ? (
                    <div className="pro-filter-form-input--form">
                        <input
                            type="number"
                            placeholder="De"
                            onChange={(e) => {
                                this.handleChange(e, 'from')
                            }}/>
                        <input
                            type="number"
                            placeholder="A"
                            onChange={(e) => {
                                this.handleChange(e, 'to')
                            }}/>
                        {this.state.value[1] !== '' ? (
                            <button onClick={() => {this.props.selection({
                                value: this.state.value,
                                id: this.props.operator
                            })}}>
                                <i class="fas fa-check"></i>
                            </button>
                        ) : ''}
                    </div>
                ) : (
                    <div className="pro-filter-form-input--form">
                        <input
                            type="number"
                            placeholder={
                                this.props.type === 'm2' ? 'm2' :
                                this.props.type === 'price' ? 'Prix' :
                                this.props.type === 'date' ? 'Date' : ''
                            }
                            onChange={(e) => {
                                this.handleChange(e, 'from')
                            }}/>
                            
                        {this.state.value[0] !== '' ? (
                            <button onClick={() => {this.props.selection({
                                value: this.state.value,
                                id: this.props.operator
                            })}}>
                                <i class="fas fa-check"></i>
                            </button>
                        ) : ''}
                    </div>
                )}
            </div>
        );
    }
}

export default ProFilterFormInput;