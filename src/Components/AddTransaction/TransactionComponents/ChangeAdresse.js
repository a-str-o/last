import React, { Component } from 'react'
import { connect } from "react-redux";
import { theme } from '../../../assets/theme'
import {  ThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import EditLocationIcon from '@material-ui/icons/EditLocation';
import './ChangeAdresse.scss'
class ChangeAdresse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error : this.props.espacePro.transaction.address===""
        }
    }
    handleChangeAdresse=  (e) => {
        this.setState({error : e.target.value===""})
        this.props.dispatch({type : "SET_CORRECT_ADDRESS", data : e.target.value})
        };
    render() {
        return (
            <div className="change-adresse--container">
                <div className="change-adresse-field--container">
                <EditLocationIcon /> 
                <ThemeProvider theme={theme}>
                           <TextField
                           multiline
id="standard-helperText"
label={`${this.state.error ? "Entrez" : "Corrigez"} l'adresse`}
defaultValue={this.props.espacePro.transaction.address}
helperText="Elle apparaîtra sur la carte des prix et dans votre vitrine"
onChange={this.handleChangeAdresse}
error={this.state.error}

/>
</ThemeProvider>
</div>              
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
    estimationStatePro: state.estimationStatePro,
    espacePro : state.espacePro

    };
    };
    
    export default connect(mapStateToProps)(ChangeAdresse);