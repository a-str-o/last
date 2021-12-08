import React, { Component } from 'react';
import RegisterComponent from '../../Components/RegisterComponent/RegisterComponent';
import ReactGA from 'react-ga'
class Register extends Component {
    componentDidMount(){
        ReactGA.pageview(this.props.location.pathname+ this.props.location.search);
        }

    render() {
        return (
            <div  className="page-wrapper">
                <RegisterComponent />
            </div>
        );
    }
}

export default Register;
