import React from 'react';
import FilterItemOption from './FilterItemOptions';
import './style.scss';
import { CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';

class RightPannelTitle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            option : null,
            placeholder : null,
        }
    }

    render() {
        return (
            <div className="right-pannel-title">
                <div className="title--container">
                <h5>{this.props.title}</h5>
                </div>
                {this.props.title === 'Dossiers de villas' || this.props.title === 'Dossiers d\'appartements' || this.props.title === 'Estimation de terrains nus' || this.props.title === 'Mes transactions' ?
                 (

                    <div className = "filterOptions">
                        <div className = 'filterItems'>
                            {this.props.filterValue || this.props.filterVilleValue ? (
                                <div className = "filterItem reset" onClick = {() => {
                                        this.props.dispatch({ type: 'RESET_ESTIMATION_FILTER'});
                                    }}>
                                Réinitialiser
                                </div>
                            ) : ''

                            }
                            
                            {this.props.filter ? (
                                <div className = "filterItem cancel" onClick = {() => {
                                    this.props.dispatch({ type: 'SET_ESTIMATION_FILTER', data: false })
                                    }}>
                                <i class="fa fa-times" aria-hidden="true"></i>
                                </div>
                            ) : ''

                            }
                            
                            <div className = "filterItem filterItem-1" onClick = {() => {
                                if(this.props.temporaryPriceValues) {

                                    this.props.dispatch({ type: 'SET_ESTIMATIONS_FILTER_OPTIONS_SELECTED', data: 'price' })
                                    this.props.dispatch({ type: 'SET_ESTIMATION_FILTER', data: true })
                                    this.props.dispatch({ type: 'SET_ESTIMATIONS_FILTER_OPTIONS_OPERATOR', data: this.props.temporaryPriceValues.Priceoperator });
                                }else {
                                    this.props.dispatch({ type: 'SET_ESTIMATIONS_FILTER_OPTIONS_VALUE', data: null });
                                    this.props.dispatch({ type: 'SET_ESTIMATIONS_FILTER_OPTIONS_OPERATOR', data: 0 });
                                    this.props.dispatch({ type: 'SET_ESTIMATIONS_FILTER_OPTIONS_SELECTED', data: 'price' })
                                    
                                }

                                if(!this.props.filterOption.includes('price')) {
                                    this.props.dispatch({ type: 'SET_ESTIMATIONS_FILTER_OPTIONS', data: 'price' });
                                }

                                if(this.props.filterOptionSelected === 'price') {
                                    this.props.dispatch({ type: 'SET_ESTIMATION_FILTER', data: true })
                                }else {
                                    this.props.dispatch({ type: 'SET_ESTIMATION_FILTER', data: true })
                                }
                                }}>
                                
                                {this.props.temporaryPriceValues && this.props.temporaryPriceValues.Priceoption === 'price' && this.props.temporaryPriceValues.Priceoperator === 1 && this.props.temporaryPriceValues.Pricevalue? 
                                (<div className = 'optionSelected'>Prix est inférieur à <span>
                                    {new Intl.NumberFormat()
                                    .format(this.props.temporaryPriceValues.Pricevalue)
                                    .replaceAll(',', ' ')
                                    }</span> <span><i className = "fa fa-edit"></i></span> </div>):
                                this.props.temporaryPriceValues && this.props.temporaryPriceValues.Priceoption === 'price' && this.props.temporaryPriceValues.Priceoperator === 2 && this.props.temporaryPriceValues.Pricevalue? 
                                (<div className = 'optionSelected'>Prix est supérieur à <span>{new Intl.NumberFormat()
                                    .format(this.props.temporaryPriceValues.Pricevalue)
                                    .replaceAll(',', ' ')
                                    }</span> <span><i className = "fa fa-edit"></i></span> </div>):
                                this.props.temporaryPriceValues && this.props.temporaryPriceValues.Priceoption === 'price' && this.props.temporaryPriceValues.Priceoperator === 3 && this.props.temporaryPriceValues.Pricevalue? 
                                (<div className = 'optionSelected'>Prix est égal à <span>{new Intl.NumberFormat()
                                    .format(this.props.temporaryPriceValues.Pricevalue)
                                    .replaceAll(',', ' ')
                                    }</span> <span><i className = "fa fa-edit"></i></span> </div>):
                                this.props.temporaryPriceValues && this.props.temporaryPriceValues.Priceoption === 'price' && this.props.temporaryPriceValues.Priceoperator === 4 && this.props.temporaryPriceValues.PricesmallValue && this.props.temporaryPriceValues.PricegreatValue? 
                                (<div className = 'optionSelected'>Prix est entre <span>{this.props.temporaryPriceValues.PricesmallValue} et {this.props.temporaryPriceValues.PricegreatValue}</span> <span><i className = "fa fa-edit"></i></span> </div>):
                                 'Prix'}
                                
                            </div>
                            <div className = "filterItem filterItem-2" onClick = {() => {
                                
                                if(this.props.temporaryRoomValues) {
                                    this.props.dispatch({ type: 'SET_ESTIMATIONS_FILTER_OPTIONS_SELECTED', data: 'room' })
                                    this.props.dispatch({ type: 'SET_ESTIMATION_FILTER', data: true })
                                    this.props.dispatch({ type: 'SET_ESTIMATIONS_FILTER_OPTIONS_OPERATOR', data: this.props.temporaryRoomValues.Roomoperator });
                                }else {
                                    this.props.dispatch({ type: 'SET_ESTIMATIONS_FILTER_OPTIONS_VALUE', data: null });
                                    this.props.dispatch({ type: 'SET_ESTIMATIONS_FILTER_OPTIONS_OPERATOR', data: 0 });
                                    this.props.dispatch({ type: 'SET_ESTIMATIONS_FILTER_OPTIONS_SELECTED', data: 'room' })
                                    this.props.dispatch({ type: 'SET_ESTIMATION_FILTER', data: true })
                                }

                                if(!this.props.filterOption.includes('room')) {
                                    this.props.dispatch({ type: 'SET_ESTIMATIONS_FILTER_OPTIONS', data: 'room' });
                                }
                                }}>
                                    

                                {this.props.temporaryRoomValues && this.props.temporaryRoomValues.Roomoption === 'room' && this.props.temporaryRoomValues.Roomoperator === 1 && this.props.temporaryRoomValues.Roomvalue? 
                                (<div className = 'optionSelected'>Nombre de chambre est inférieur à <span>{this.props.temporaryRoomValues.Roomvalue}</span> <span><i className = "fa fa-edit"></i></span> </div>):
                                this.props.temporaryRoomValues && this.props.temporaryRoomValues.Roomoption === 'room' && this.props.temporaryRoomValues.Roomoperator === 2 && this.props.temporaryRoomValues.Roomvalue? 
                                (<div className = 'optionSelected'>Nombre de chambre est supérieur à <span>{this.props.temporaryRoomValues.Roomvalue}</span> <span><i className = "fa fa-edit"></i></span> </div>):
                                this.props.temporaryRoomValues && this.props.temporaryRoomValues.Roomoption === 'room' && this.props.temporaryRoomValues.Roomoperator === 3 && this.props.temporaryRoomValues.Roomvalue? 
                                (<div className = 'optionSelected'>Nombre de chambre est égal à <span>{this.props.temporaryRoomValues.Roomvalue}</span> <span><i className = "fa fa-edit"></i></span> </div>):
                                this.props.temporaryRoomValues && this.props.temporaryRoomValues.Roomoption === 'room' && this.props.temporaryRoomValues.Roomoperator === 4 && this.props.temporaryRoomValues.Roomvalue? 
                                (<div className = 'optionSelected'>Nombre de chambre est entre <span>{this.props.RoomsmallValue} et {this.props.RoomgreatValue}</span> <span><i className = "fa fa-edit"></i></span> </div>):
                                 'Nombre de chambres'}
                                
                            </div>
                            <div className = "filterItem filterItem-3" onClick = {() => {

                                if(this.props.temporarySurfaceValues ) {
                                    this.props.dispatch({ type: 'SET_ESTIMATIONS_FILTER_OPTIONS_SELECTED', data: 'surface' })
                                    this.props.dispatch({ type: 'SET_ESTIMATION_FILTER', data: true })
                                    this.props.dispatch({ type: 'SET_ESTIMATIONS_FILTER_OPTIONS_OPERATOR', data: this.props.temporarySurfaceValues.Surfaceoperator });
                                }else {
                                    this.props.dispatch({ type: 'SET_ESTIMATIONS_FILTER_OPTIONS_VALUE', data: null });
                                    this.props.dispatch({ type: 'SET_ESTIMATIONS_FILTER_OPTIONS_SELECTED', data: 'surface' })
                                    this.props.dispatch({ type: 'SET_ESTIMATION_FILTER', data: true })
                                }

                                if(!this.props.filterOption.includes('surface')) {
                                    this.props.dispatch({ type: 'SET_ESTIMATIONS_FILTER_OPTIONS', data: 'surface' });
                                }
                                
                                }}>

                                {this.props.temporarySurfaceValues && this.props.temporarySurfaceValues.Surfaceoption === 'surface' && this.props.temporarySurfaceValues.Surfaceoperator === 1 && this.props.temporarySurfaceValues.Surfacevalue? 
                                (<div className = 'optionSelected'>Surface est inférieur à <span>{this.props.temporarySurfaceValues.Surfacevalue}</span> <span><i className = "fa fa-edit"></i></span> </div>):
                                this.props.temporarySurfaceValues && this.props.temporarySurfaceValues.Surfaceoption === 'surface' && this.props.temporarySurfaceValues.Surfaceoperator === 2 && this.props.temporarySurfaceValues.Surfacevalue? 
                                (<div className = 'optionSelected'>Surface est supérieur à <span>{this.props.temporarySurfaceValues.Surfacevalue}</span> <span><i className = "fa fa-edit"></i></span> </div>):
                                this.props.temporarySurfaceValues && this.props.temporarySurfaceValues.Surfaceoption === 'surface' && this.props.temporarySurfaceValues.Surfaceoperator === 3 && this.props.temporarySurfaceValues.Surfacevalue? 
                                (<div className = 'optionSelected'>Surface est égal à <span>{this.props.temporarySurfaceValues.Surfacevalue}</span> <span><i className = "fa fa-edit"></i></span> </div>):
                                this.props.temporarySurfaceValues && this.props.temporarySurfaceValues.Surfaceoption === 'surface' && this.props.temporarySurfaceValues.Surfaceoperator === 4 && this.props.temporarySurfaceValues.Surfacevalue? 
                                (<div className = 'optionSelected'>Surface est entre <span>{this.props.SurfacesmallValue} et {this.props.SurfacegreatValue}</span> <span><i className = "fa fa-edit"></i></span> </div>):
                                 'Surface'}
                            </div>
                            
                            <div className = "filterItem filterItem-4" onClick = {() => {
                                this.props.dispatch({ type: 'SET_ESTIMATIONS_FILTER_OPTIONS_SELECTED', data: 'city' })
                                this.props.dispatch({ type: 'SET_ESTIMATION_FILTER', data: true })
                                if(!this.props.filterOption.includes('city')) {
                                    this.props.dispatch({ type: 'SET_ESTIMATIONS_FILTER_OPTIONS', data: 'city' });
                                }
                                ;}}>

                                {this.props.temporaryCityValues && this.props.temporaryCityValues.Cityoption === 'city' && this.props.temporaryCityValues.Cityvalue? 
                                (<div className = 'optionSelected'>Ville selectionnée : <span>{this.props.temporaryCityValues.Cityvalue}</span> <span><i className = "fa fa-edit"></i></span> </div>):
                                 'Ville'}
                                
                            </div>
                        </div>
                        <CSSTransition appear={true} unmountOnExit in={this.props.filter} timeout={300} classNames="FilterEstmationAnimations">
                            <FilterItemOption title = {this.props.title} option = {this.state.option} placeholder = {this.state.placeholder}/>
                        </CSSTransition>
                    </div>
                 ) : ('')
                    
                }
                
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const filter = state.espacePro.estimationFilter;

    // console.log(state)
    return {
        filter: filter,
        filterOption: state.espacePro.filterEstimation.option,
        filterOptionSelected: state.espacePro.filterEstimation.optionSelected,
        filterOperatorSelected: state.espacePro.filterEstimation.operatorSelected,
        filterValue: state.espacePro.filterEstimation.filterValue,
        filterVilleValue: state.espacePro.filterEstimation.filterVilleValue,
        user: state.firebase.auth,
        temporaryPriceValues : state.espacePro.filterEstimation.temporaryPriceValues,
        temporaryRoomValues : state.espacePro.filterEstimation.temporaryRoomValues,
        temporarySurfaceValues : state.espacePro.filterEstimation.temporarySurfaceValues,
        temporaryCityValues : state.espacePro.filterEstimation.temporaryCityValues,
    }
  }; 
  export default connect(mapStateToProps)(RightPannelTitle);
