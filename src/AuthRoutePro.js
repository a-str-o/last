import React from 'react'
import {Route, Redirect} from 'react-router-dom'

import { connect } from 'react-redux';
const AuthRoutePro = ({ component : Component, authenticated, ...rest }) => (
    
    <Route 
    {...rest}
    render={(props)=> authenticated === true ?    <Component {...props}/> : <Redirect to={"/login"}/>}
/>
)
const mapStateToProps = (state) => ({
    authenticated : state.auth.authenticated
});

export default connect(mapStateToProps)(AuthRoutePro);
