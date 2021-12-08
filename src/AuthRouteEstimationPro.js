import React from 'react'
import {Route, Redirect} from 'react-router-dom'

import { connect } from 'react-redux';
const AuthRouteEstimationPro = ({ component : Component, authenticated, ...rest }) => (
    
    <Route 
    {...rest}
    render={(props)=> authenticated === true ?    <Component {...props}/> : <Redirect to="/estimation"/>}
/>
)
const mapStateToProps = (state) => ({
    authenticated : state.auth.authenticated
});

export default connect(mapStateToProps)(AuthRouteEstimationPro);
