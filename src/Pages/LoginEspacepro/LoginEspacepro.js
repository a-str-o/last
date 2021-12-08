import React, { Component } from 'react';
import LoginEpaceproComponent from '../../Components/LoginEpaceproComponent/LoginEpaceproComponent';
import ReactGA from 'react-ga'
class LoginEspacepro extends Component {
    componentDidMount(){
        ReactGA.pageview(this.props.location.pathname+ this.props.location.search);
        }

    render() {
        return (
            <div>
                <LoginEpaceproComponent />
            </div>
        );
    }
}

export default LoginEspacepro;
