import React, { Component } from 'react';
import LoginComponent from '../../Components/LoginComponent/LoginComponent';
import ReactGA from 'react-ga'
import './Login.scss'
class Login extends Component {
    componentDidMount(){
        ReactGA.pageview(this.props.location.pathname+ this.props.location.search);
        }

    render() {
        return (
            <div className="page-wrapper">
                <LoginComponent />
            </div>
        );
    }
}

export default Login;
