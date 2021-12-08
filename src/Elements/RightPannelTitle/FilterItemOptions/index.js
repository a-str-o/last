import React from 'react';
import './style.scss';
import { connect } from 'react-redux';

class FilterItemOption extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props,
            type: 0,
            value: this.props.filterOptionSelected === 'price' && this.props.temporaryPriceValues? this.props.temporaryPriceValues.Pricevalue : this.props.filterOptionSelected === 'room' && this.props.temporaryRoomValues? this.props.temporaryRoomValues.Roomvalue : this.props.filterOptionSelected === 'surface' && this.props.temporarySurfaceValues ? this.props.temporarySurfaceValues.Surfacevalue : null,
            smallValue: this.props.filterOptionSelected === 'price' && this.props.temporaryPriceValues? this.props.temporaryPriceValues.PricesmallValue : this.props.filterOptionSelected === 'room' && this.props.temporaryRoomValues? this.props.temporaryRoomValues.RoomsmallValue : this.props.filterOptionSelected === 'surface' && this.props.temporarySurfaceValues ? this.props.temporarySurfaceValues.SurfacesmallValue : null,
            greatValue: this.props.filterOptionSelected === 'price' && this.props.temporaryPriceValues? this.props.temporaryPriceValues.PricegreatValue : this.props.filterOptionSelected === 'room' && this.props.temporaryRoomValues? this.props.temporaryRoomValues.RoomgreatValue : this.props.filterOptionSelected === 'surface' && this.props.temporarySurfaceValues ? this.props.temporarySurfaceValues.SurfacegreatValue : null,
            villeValue: this.props.temporaryCityValues ? this.props.temporaryCityValues.Cityvalue : null,
            villes: []
        }
    }

    async getCities() {
        if(this.props.title !== 'Mes transactions') {
            if(this.props.filterOption.length === 0) {
                const villes = [...new Set(this.props.retrieveEstimations.map(estimations => estimations.ville))];
                if(this.props.filterVilleValue) {
                    this.setState({villes : villes, villeValue : this.props.filterVilleValue})
                }else {
                    this.setState({villes : villes, villeValue : villes[0]})
                }
            }else {
                const villes = [...new Set(this.props.estimations.map(estimations => estimations.ville))];
                if(this.props.filterVilleValue) {
                    this.setState({villes : villes, villeValue : this.props.filterVilleValue})
                }else {
                    this.setState({villes : villes, villeValue : villes[0]})
                }
            }
        }else {
            if(this.props.filterOption.length === 0) {
                const villes = [...new Set(this.props.retrieveTransactions.map(transaction => transaction.ville))];
                if(this.props.filterVilleValue) {
                    this.setState({villes : villes, villeValue : this.props.filterVilleValue})
                }else {
                    this.setState({villes : villes, villeValue : villes[0]})
                }
            }else {
                const villes = [...new Set(this.props.myTransactions.map(myTransactions => myTransactions.ville))];
                if(this.props.filterVilleValue) {
                    this.setState({villes : villes, villeValue : this.props.filterVilleValue})
                }else {
                    this.setState({villes : villes, villeValue : villes[0]})
                }
            }
        }
        
        
    }

    async filter() {
        if(this.props.title !== 'Mes transactions') {
            if(this.props.filterOptionSelected === 'price')
            this.filterPrice();
            else if (this.props.filterOptionSelected === 'room')
                this.filterRoom()
            else if (this.props.filterOptionSelected === 'surface')
                this.filterSurface()
            else
                this.filterVille()
        }else {
            // console.log(1)
            if(this.props.filterOptionSelected === 'price')
            this.filterPriceTransaction();
            else if (this.props.filterOptionSelected === 'room')
                this.filterRoomTransaction()
            else if (this.props.filterOptionSelected === 'surface')
                this.filterSurfaceTransaction()
            else
                this.filterVilleTransaction()
        }
        
    }

    filterPrice () {

        if ( this.props.filterOperatorSelected === 1 ) {
            if(this.props.filterOption.length === 0) {
                const estimations = this.props.retrieveEstimations.filter(est => (Math.round(est.estimation/ 1000) * 1000) < this.state.value)
                this.props.dispatch({ type: 'SET_FILTERED_ESTIMATIONS', data: estimations });
            }else {
                const estimations = this.props.estimations.filter(est => (Math.round(est.estimation/ 1000) * 1000) < this.state.value)
                if(estimations.length !== 0)
                this.props.dispatch({ type: 'SET_FILTERED_ESTIMATIONS', data: estimations });
                else {
                    const estimations = this.props.retrieveEstimations.filter(est => (Math.round(est.estimation/ 1000) * 1000) < this.state.value)
                    this.props.dispatch({ type: 'SET_FILTERED_ESTIMATIONS', data: estimations });
                }
                
            }
            
            this.props.dispatch({ type: 'SET_ESTIMATION_FILTER', data: false });

            this.props.dispatch({ type: 'SET_ESTIMATIONS_FILTER_OPTIONS_VALUE', data: this.state.value });

        } else if ( this.props.filterOperatorSelected === 2 ) {
            if(this.props.filterOption.length === 0) {
                const estimations = this.props.retrieveEstimations.filter(est => (Math.round(est.estimation/ 1000) * 1000) > this.state.value)
                this.props.dispatch({ type: 'SET_FILTERED_ESTIMATIONS', data: estimations });
            }else {
                const estimations = this.props.estimations.filter(est => (Math.round(est.estimation/ 1000) * 1000) > this.state.value)
                if(estimations.length !== 0)
                this.props.dispatch({ type: 'SET_FILTERED_ESTIMATIONS', data: estimations });
                else {
                    const estimations = this.props.retrieveEstimations.filter(est => (Math.round(est.estimation/ 1000) * 1000) > this.state.value)
                    this.props.dispatch({ type: 'SET_FILTERED_ESTIMATIONS', data: estimations });
                }
            }

            
            this.props.dispatch({ type: 'SET_ESTIMATION_FILTER', data: false });
            this.props.dispatch({ type: 'SET_ESTIMATIONS_FILTER_OPTIONS_VALUE', data: this.state.value });
        } else if ( this.props.filterOperatorSelected === 3 ) {
            if(this.props.filterOption.length === 0) {
                const estimations = this.props.retrieveEstimations.filter(est => ((Math.round(est.estimation/ 1000) * 1000) === this.state.value))
                this.props.dispatch({ type: 'SET_FILTERED_ESTIMATIONS', data: estimations });
            }else {
                const estimations = this.props.estimations.filter(est => ((Math.round(est.estimation/ 1000) * 1000) === this.state.value))
                if(estimations.length !== 0)
                 this.props.dispatch({ type: 'SET_FILTERED_ESTIMATIONS', data: estimations });
                else {
                    const estimations = this.props.retrieveEstimations.filter(est => ((Math.round(est.estimation/ 1000) * 1000) === this.state.value))
                    this.props.dispatch({ type: 'SET_FILTERED_ESTIMATIONS', data: estimations });
                }
            }
            
            
            this.props.dispatch({ type: 'SET_ESTIMATION_FILTER', data: false });
            this.props.dispatch({ type: 'SET_ESTIMATIONS_FILTER_OPTIONS_VALUE', data: this.state.value });
        } else {
            if(this.props.filterOption.length === 0) {
                const estimations = this.props.retrieveEstimations.filter(est => ((Math.round(est.estimation/ 1000) * 1000) >= this.state.smallValue && (Math.round(est.estimation/ 1000) * 1000) <= this.state.greatValue))
                this.props.dispatch({ type: 'SET_FILTERED_ESTIMATIONS', data: estimations });
            }else {
                const estimations = this.props.estimations.filter(est => ((Math.round(est.estimation/ 1000) * 1000) >= this.state.smallValue && (Math.round(est.estimation/ 1000) * 1000) <= this.state.greatValue))
                if(estimations.length !== 0)
                this.props.dispatch({ type: 'SET_FILTERED_ESTIMATIONS', data: estimations });
                else {
                    const estimations = this.props.retrieveEstimations.filter(est => ((Math.round(est.estimation/ 1000) * 1000) >= this.state.smallValue && (Math.round(est.estimation/ 1000) * 1000) <= this.state.greatValue))
                    this.props.dispatch({ type: 'SET_FILTERED_ESTIMATIONS', data: estimations });
                }
            }
            
            this.props.dispatch({ type: 'SET_ESTIMATION_FILTER', data: false });
            
            const data = {
                smalVallue: this.state.smallValue,
                greatValue: this.state.greatValue
            }
            this.props.dispatch({ type: 'SET_ESTIMATIONS_FILTER_OPTIONS_INTERVAL_VALUE', data: data });
            this.props.dispatch({ type: 'SET_ESTIMATIONS_FILTER_OPTIONS_VALUE', data: this.state.smallValue + ' et ' + this.state.greatValue });
        }

        this.props.dispatch({ type: 'SET_ESTIMATIONS_FILTER_TEMPORARY_VALUES_PRICE', data: {
            option: 'price',
            operator: this.props.filterOperatorSelected,
            value : this.state.value,
            smallValue: this.state.smallValue,
            greatValue: this.state.greatValue,
        } });
    }

    filterRoom () {
        if(this.props.filterOperatorSelected === 1) {
            if(this.props.filterOption.length === 0) {
                const estimations = this.props.retrieveEstimations.filter(est => Number(est.typologie) < this.state.value)
                this.props.dispatch({ type: 'SET_FILTERED_ESTIMATIONS', data: estimations });
            }else {
                const estimations = this.props.estimations.filter(est => Number(est.typologie) < this.state.value)
                if(estimations.length !== 0)
                this.props.dispatch({ type: 'SET_FILTERED_ESTIMATIONS', data: estimations });
                else {
                    const estimations = this.props.retrieveEstimations.filter(est => Number(est.typologie) < this.state.value)
                    this.props.dispatch({ type: 'SET_FILTERED_ESTIMATIONS', data: estimations });
                }
            }
            
            this.props.dispatch({ type: 'SET_ESTIMATION_FILTER', data: false });
            this.props.dispatch({ type: 'SET_ESTIMATIONS_FILTER_OPTIONS_VALUE', data: this.state.value });
        }else if(this.props.filterOperatorSelected === 2) {
            
            if(this.props.filterOption.length === 0) {
                const estimations = this.props.retrieveEstimations.filter(est => Number(est.typologie) > this.state.value)
                this.props.dispatch({ type: 'SET_FILTERED_ESTIMATIONS', data: estimations });
            }else {
                const estimations = this.props.estimations.filter(est => Number(est.typologie) > this.state.value)
                if(estimations.length !== 0)
                this.props.dispatch({ type: 'SET_FILTERED_ESTIMATIONS', data: estimations });
                else {
                    const estimations = this.props.retrieveEstimations.filter(est => Number(est.typologie) > this.state.value)
                    this.props.dispatch({ type: 'SET_FILTERED_ESTIMATIONS', data: estimations });
                }
            }

            this.props.dispatch({ type: 'SET_ESTIMATION_FILTER', data: false });
            this.props.dispatch({ type: 'SET_ESTIMATIONS_FILTER_OPTIONS_VALUE', data: this.state.value });
        }else if(this.props.filterOperatorSelected === 3) {
            if(this.props.filterOption.length === 0) {
                const estimations = this.props.retrieveEstimations.filter(est => Number(est.typologie) === this.state.value)
                this.props.dispatch({ type: 'SET_FILTERED_ESTIMATIONS', data: estimations });
            }else {
                const estimations = this.props.estimations.filter(est => Number(est.typologie) === this.state.value)
                if(estimations.length !== 0)
                this.props.dispatch({ type: 'SET_FILTERED_ESTIMATIONS', data: estimations });
                else {
                    const estimations = this.props.retrieveEstimations.filter(est => Number(est.typologie) === this.state.value)
                    this.props.dispatch({ type: 'SET_FILTERED_ESTIMATIONS', data: estimations });
                }
            }

            this.props.dispatch({ type: 'SET_ESTIMATION_FILTER', data: false });
            this.props.dispatch({ type: 'SET_ESTIMATIONS_FILTER_OPTIONS_VALUE', data: this.state.value });
        }else{
           
            
            if(this.props.filterOption.length === 0) {
                const estimations = this.props.retrieveEstimations.filter(est => ((Number(est.typologie) >= this.state.smallValue) && (Number(est.typologie) <= this.state.greatValue)))
                this.props.dispatch({ type: 'SET_FILTERED_ESTIMATIONS', data: estimations });
            }else {
                const estimations = this.props.estimations.filter(est => ((Number(est.typologie) >= this.state.smallValue) && (Number(est.typologie) <= this.state.greatValue)))
                if(estimations.length !== 0)
                this.props.dispatch({ type: 'SET_FILTERED_ESTIMATIONS', data: estimations });
                else {
                    const estimations = this.props.retrieveEstimations.filter(est => ((Number(est.typologie) >= this.state.smallValue) && (Number(est.typologie) <= this.state.greatValue)))
                    this.props.dispatch({ type: 'SET_FILTERED_ESTIMATIONS', data: estimations });
                }
            }
            this.props.dispatch({ type: 'SET_ESTIMATION_FILTER', data: false });
            
            this.props.dispatch({ type: 'SET_ESTIMATIONS_FILTER_OPTIONS_VALUE', data: this.state.smallValue + ' et ' + this.state.greatValue });
        }

        this.props.dispatch({ type: 'SET_ESTIMATIONS_FILTER_TEMPORARY_VALUES_ROOM', data: {
            option: 'room',
            operator: this.props.filterOperatorSelected,
            value : this.state.value,
            smallValue: this.state.smallValue,
            greatValue: this.state.greatValue,
        } });
    }

    filterSurface () {
        if(this.props.filterOperatorSelected === 1) {
            if(this.props.filterOption.length === 0) {
                const estimations = this.props.retrieveEstimations.filter(est => Number(est.surfacehabitable) < this.state.value)
                this.props.dispatch({ type: 'SET_FILTERED_ESTIMATIONS', data: estimations });
            }else {
                const estimations = this.props.estimations.filter(est => Number(est.surfacehabitable) < this.state.value)
                if(estimations.length !== 0)
                this.props.dispatch({ type: 'SET_FILTERED_ESTIMATIONS', data: estimations });
                else {
                    const estimations = this.props.retrieveEstimations.filter(est => Number(est.surfacehabitable) < this.state.value)
                    this.props.dispatch({ type: 'SET_FILTERED_ESTIMATIONS', data: estimations });
                }
            }
            this.props.dispatch({ type: 'SET_ESTIMATION_FILTER', data: false });
            this.props.dispatch({ type: 'SET_ESTIMATIONS_FILTER_OPTIONS_VALUE', data: this.state.value });
        }else if(this.props.filterOperatorSelected === 2) {
            if(this.props.filterOption.length === 0) {
                const estimations = this.props.retrieveEstimations.filter(est => Number(est.surfacehabitable) > this.state.value)
                this.props.dispatch({ type: 'SET_FILTERED_ESTIMATIONS', data: estimations });
            }else {
                const estimations = this.props.estimations.filter(est => Number(est.surfacehabitable) > this.state.value)
                if(estimations.length !== 0)
                this.props.dispatch({ type: 'SET_FILTERED_ESTIMATIONS', data: estimations });
                else {
                    const estimations = this.props.retrieveEstimations.filter(est => Number(est.surfacehabitable) > this.state.value)
                    this.props.dispatch({ type: 'SET_FILTERED_ESTIMATIONS', data: estimations });
                }
            }
            this.props.dispatch({ type: 'SET_ESTIMATION_FILTER', data: false });
            this.props.dispatch({ type: 'SET_ESTIMATIONS_FILTER_OPTIONS_VALUE', data: this.state.value });
        }else if(this.props.filterOperatorSelected === 3) {
            if(this.props.filterOption.length === 0) {
                const estimations = this.props.retrieveEstimations.filter(est => Number(est.surfacehabitable) === this.state.value)
                this.props.dispatch({ type: 'SET_FILTERED_ESTIMATIONS', data: estimations });
            }else {
                const estimations = this.props.estimations.filter(est => Number(est.surfacehabitable) === this.state.value)
                if(estimations.length !== 0)
                this.props.dispatch({ type: 'SET_FILTERED_ESTIMATIONS', data: estimations });
                else {
                    const estimations = this.props.retrieveEstimations.filter(est => Number(est.surfacehabitable) === this.state.value)
                    this.props.dispatch({ type: 'SET_FILTERED_ESTIMATIONS', data: estimations });
                }
            }
            this.props.dispatch({ type: 'SET_ESTIMATION_FILTER', data: false });
            this.props.dispatch({ type: 'SET_ESTIMATIONS_FILTER_OPTIONS_VALUE', data: this.state.value });
        }else{
            if(this.props.filterOption.length === 0) {
                const estimations = this.props.retrieveEstimations.filter(est => ((Number(est.surfacehabitable) >= this.state.smallValue) && (Number(est.surfacehabitable) <= this.state.greatValue)))
                this.props.dispatch({ type: 'SET_FILTERED_ESTIMATIONS', data: estimations });
            }else {
                const estimations = this.props.estimations.filter(est => ((Number(est.surfacehabitable) >= this.state.smallValue) && (Number(est.surfacehabitable) <= this.state.greatValue)))
                if(estimations.length !== 0)
                this.props.dispatch({ type: 'SET_FILTERED_ESTIMATIONS', data: estimations });
                else {
                    const estimations = this.props.retrieveEstimations.filter(est => ((Number(est.surfacehabitable) >= this.state.smallValue) && (Number(est.surfacehabitable) <= this.state.greatValue)))
                    this.props.dispatch({ type: 'SET_FILTERED_ESTIMATIONS', data: estimations });
                }
            }
            this.props.dispatch({ type: 'SET_ESTIMATION_FILTER', data: false });
            
            this.props.dispatch({ type: 'SET_ESTIMATIONS_FILTER_OPTIONS_VALUE', data: this.state.smallValue + ' et ' + this.state.greatValue });
        }

        this.props.dispatch({ type: 'SET_ESTIMATIONS_FILTER_TEMPORARY_VALUES_SURFACE', data: {
            option: 'surface',
            operator: this.props.filterOperatorSelected,
            value : this.state.value,
            smallValue: this.state.smallValue,
            greatValue: this.state.greatValue,
        } });
    }

    filterVille () {
        
        
        if(this.props.filterOption.length === 0) {
            const estimations = this.props.retrieveEstimations.filter(est => est.ville === this.state.villeValue)
            this.props.dispatch({ type: 'SET_FILTERED_ESTIMATIONS', data: estimations });
        }else {
            const estimations = this.props.estimations.filter(est => est.ville === this.state.villeValue)
            if(estimations.length !== 0)
            this.props.dispatch({ type: 'SET_FILTERED_ESTIMATIONS', data: estimations });
            else {
                const estimations = this.props.retrieveEstimations.filter(est => est.ville === this.state.villeValue)
                this.props.dispatch({ type: 'SET_FILTERED_ESTIMATIONS', data: estimations });
            }
        }
        this.props.dispatch({ type: 'SET_ESTIMATION_FILTER', data: false });
        this.props.dispatch({ type: 'SET_ESTIMATIONS_FILTER_OPTIONS_Ville_VALUE', data: this.state.villeValue });
        this.props.dispatch({ type: 'SET_ESTIMATIONS_FILTER_TEMPORARY_VALUES_CITY', data: {
            option: 'city',
            value : this.state.villeValue,
        } });
    }


    filterPriceTransaction () {

        if ( this.props.filterOperatorSelected === 1 ) {
            if(this.props.filterOption.length === 0) {
                const myTransactions = this.props.retrieveTransactions.filter(trans => (Math.round(trans.prix/ 1000) * 1000) < this.state.value)
                this.props.dispatch({ type: 'SET_FILTERED_TRANSACTIONS', data: myTransactions });
            }else {
                const myTransactions = this.props.myTransactions.filter(trans => (Math.round(trans.prix/ 1000) * 1000) < this.state.value)
                if(myTransactions.length !== 0)
                this.props.dispatch({ type: 'SET_FILTERED_TRANSACTIONS', data: myTransactions });
                else {
                    const myTransactions = this.props.retrieveTransactions.filter(trans => (Math.round(trans.prix/ 1000) * 1000) < this.state.value)
                    this.props.dispatch({ type: 'SET_FILTERED_TRANSACTIONS', data: myTransactions });
                }
                
            }
            
            this.props.dispatch({ type: 'SET_ESTIMATION_FILTER', data: false });

            this.props.dispatch({ type: 'SET_ESTIMATIONS_FILTER_OPTIONS_VALUE', data: this.state.value });

        } else if ( this.props.filterOperatorSelected === 2 ) {
            if(this.props.filterOption.length === 0) {
                const myTransactions = this.props.retrieveTransactions.filter(trans => (Math.round(trans.prix/ 1000) * 1000) > this.state.value)
                this.props.dispatch({ type: 'SET_FILTERED_TRANSACTIONS', data: myTransactions });
            }else {
                const myTransactions = this.props.myTransactions.filter(trans => (Math.round(trans.prix/ 1000) * 1000) > this.state.value)
                if(myTransactions.length !== 0)
                this.props.dispatch({ type: 'SET_FILTERED_TRANSACTIONS', data: myTransactions });
                else {
                    const myTransactions = this.props.retrieveTransactions.filter(trans => (Math.round(trans.prix/ 1000) * 1000) > this.state.value)
                    this.props.dispatch({ type: 'SET_FILTERED_TRANSACTIONS', data: myTransactions });
                }
            }

            
            this.props.dispatch({ type: 'SET_ESTIMATION_FILTER', data: false });
            this.props.dispatch({ type: 'SET_ESTIMATIONS_FILTER_OPTIONS_VALUE', data: this.state.value });
        } else if ( this.props.filterOperatorSelected === 3 ) {
            if(this.props.filterOption.length === 0) {
                const myTransactions = this.props.retrieveTransactions.filter(trans => ((Math.round(trans.prix/ 1000) * 1000) === this.state.value))
                this.props.dispatch({ type: 'SET_FILTERED_TRANSACTIONS', data: myTransactions });
            }else {
                const myTransactions = this.props.myTransactions.filter(trans => ((Math.round(trans.prix/ 1000) * 1000) === this.state.value))
                if(myTransactions.length !== 0)
                 this.props.dispatch({ type: 'SET_FILTERED_TRANSACTIONS', data: myTransactions });
                else {
                    const myTransactions = this.props.retrieveTransactions.filter(trans => ((Math.round(trans.prix/ 1000) * 1000) === this.state.value))
                    this.props.dispatch({ type: 'SET_FILTERED_TRANSACTIONS', data: myTransactions });
                }
            }
            
            
            this.props.dispatch({ type: 'SET_ESTIMATION_FILTER', data: false });
            this.props.dispatch({ type: 'SET_ESTIMATIONS_FILTER_OPTIONS_VALUE', data: this.state.value });
        } else {
            if(this.props.filterOption.length === 0) {
                const myTransactions = this.props.retrieveTransactions.filter(trans => ((Math.round(trans.prix/ 1000) * 1000) >= this.state.smallValue && (Math.round(trans.prix/ 1000) * 1000) <= this.state.greatValue))
                this.props.dispatch({ type: 'SET_FILTERED_TRANSACTIONS', data: myTransactions });
            }else {
                const myTransactions = this.props.myTransactions.filter(trans => ((Math.round(trans.prix/ 1000) * 1000) >= this.state.smallValue && (Math.round(trans.prix/ 1000) * 1000) <= this.state.greatValue))
                if(myTransactions.length !== 0)
                this.props.dispatch({ type: 'SET_FILTERED_TRANSACTIONS', data: myTransactions });
                else {
                    const myTransactions = this.props.retrieveTransactions.filter(trans => ((Math.round(trans.prix/ 1000) * 1000) >= this.state.smallValue && (Math.round(trans.prix/ 1000) * 1000) <= this.state.greatValue))
                    this.props.dispatch({ type: 'SET_FILTERED_TRANSACTIONS', data: myTransactions });
                }
            }
            
            this.props.dispatch({ type: 'SET_ESTIMATION_FILTER', data: false });
            
            const data = {
                smalVallue: this.state.smallValue,
                greatValue: this.state.greatValue
            }
            this.props.dispatch({ type: 'SET_ESTIMATIONS_FILTER_OPTIONS_INTERVAL_VALUE', data: data });
            this.props.dispatch({ type: 'SET_ESTIMATIONS_FILTER_OPTIONS_VALUE', data: this.state.smallValue + ' et ' + this.state.greatValue });
        }

        this.props.dispatch({ type: 'SET_ESTIMATIONS_FILTER_TEMPORARY_VALUES_PRICE', data: {
            option: 'price',
            operator: this.props.filterOperatorSelected,
            value : this.state.value,
            smallValue: this.state.smallValue,
            greatValue: this.state.greatValue,
        } });
    }

    filterRoomTransaction () {
        if(this.props.filterOperatorSelected === 1) {
            if(this.props.filterOption.length === 0) {
                const myTransactions = this.props.retrieveTransactions.filter(trans => Number(trans.typologie) < this.state.value)
                this.props.dispatch({ type: 'SET_FILTERED_TRANSACTIONS', data: myTransactions });
            }else {
                const myTransactions = this.props.myTransactions.filter(trans => Number(trans.typologie) < this.state.value)
                if(myTransactions.length !== 0)
                this.props.dispatch({ type: 'SET_FILTERED_TRANSACTIONS', data: myTransactions });
                else {
                    const myTransactions = this.props.retrieveTransactions.filter(trans => Number(trans.typologie) < this.state.value)
                    this.props.dispatch({ type: 'SET_FILTERED_TRANSACTIONS', data: myTransactions });
                }
            }
            
            this.props.dispatch({ type: 'SET_ESTIMATION_FILTER', data: false });
            this.props.dispatch({ type: 'SET_ESTIMATIONS_FILTER_OPTIONS_VALUE', data: this.state.value });
        }else if(this.props.filterOperatorSelected === 2) {
            
            if(this.props.filterOption.length === 0) {
                const myTransactions = this.props.retrieveTransactions.filter(trans => Number(trans.typologie) > this.state.value)
                this.props.dispatch({ type: 'SET_FILTERED_TRANSACTIONS', data: myTransactions });
            }else {
                const myTransactions = this.props.myTransactions.filter(trans => Number(trans.typologie) > this.state.value)
                if(myTransactions.length !== 0)
                this.props.dispatch({ type: 'SET_FILTERED_TRANSACTIONS', data: myTransactions });
                else {
                    const myTransactions = this.props.retrieveTransactions.filter(trans => Number(trans.typologie) > this.state.value)
                    this.props.dispatch({ type: 'SET_FILTERED_TRANSACTIONS', data: myTransactions });
                }
            }

            this.props.dispatch({ type: 'SET_ESTIMATION_FILTER', data: false });
            this.props.dispatch({ type: 'SET_ESTIMATIONS_FILTER_OPTIONS_VALUE', data: this.state.value });
        }else if(this.props.filterOperatorSelected === 3) {
            if(this.props.filterOption.length === 0) {
                const myTransactions = this.props.retrieveTransactions.filter(trans => Number(trans.typologie) === this.state.value)
                this.props.dispatch({ type: 'SET_FILTERED_TRANSACTIONS', data: myTransactions });
            }else {
                const myTransactions = this.props.myTransactions.filter(trans => Number(trans.typologie) === this.state.value)
                if(myTransactions.length !== 0)
                this.props.dispatch({ type: 'SET_FILTERED_TRANSACTIONS', data: myTransactions });
                else {
                    const myTransactions = this.props.retrieveTransactions.filter(trans => Number(trans.typologie) === this.state.value)
                    this.props.dispatch({ type: 'SET_FILTERED_TRANSACTIONS', data: myTransactions });
                }
            }

            this.props.dispatch({ type: 'SET_ESTIMATION_FILTER', data: false });
            this.props.dispatch({ type: 'SET_ESTIMATIONS_FILTER_OPTIONS_VALUE', data: this.state.value });
        }else{
           
            
            if(this.props.filterOption.length === 0) {
                const myTransactions = this.props.retrieveTransactions.filter(trans => ((Number(trans.typologie) >= this.state.smallValue) && (Number(trans.typologie) <= this.state.greatValue)))
                this.props.dispatch({ type: 'SET_FILTERED_TRANSACTIONS', data: myTransactions });
            }else {
                const myTransactions = this.props.myTransactions.filter(trans => ((Number(trans.typologie) >= this.state.smallValue) && (Number(trans.typologie) <= this.state.greatValue)))
                if(myTransactions.length !== 0)
                this.props.dispatch({ type: 'SET_FILTERED_TRANSACTIONS', data: myTransactions });
                else {
                    const myTransactions = this.props.retrieveTransactions.filter(trans => ((Number(trans.typologie) >= this.state.smallValue) && (Number(trans.typologie) <= this.state.greatValue)))
                    this.props.dispatch({ type: 'SET_FILTERED_TRANSACTIONS', data: myTransactions });
                }
            }
            this.props.dispatch({ type: 'SET_ESTIMATION_FILTER', data: false });
            
            this.props.dispatch({ type: 'SET_ESTIMATIONS_FILTER_OPTIONS_VALUE', data: this.state.smallValue + ' et ' + this.state.greatValue });
        }

        this.props.dispatch({ type: 'SET_ESTIMATIONS_FILTER_TEMPORARY_VALUES_ROOM', data: {
            option: 'room',
            operator: this.props.filterOperatorSelected,
            value : this.state.value,
            smallValue: this.state.smallValue,
            greatValue: this.state.greatValue,
        } });
    }

    filterSurfaceTransaction () {
        if(this.props.filterOperatorSelected === 1) {
            if(this.props.filterOption.length === 0) {
                const myTransactions = this.props.retrieveTransactions.filter(trans => Number(trans.surface) < this.state.value)
                this.props.dispatch({ type: 'SET_FILTERED_TRANSACTIONS', data: myTransactions });
            }else {
                const myTransactions = this.props.myTransactions.filter(trans => Number(trans.surface) < this.state.value)
                if(myTransactions.length !== 0)
                this.props.dispatch({ type: 'SET_FILTERED_TRANSACTIONS', data: myTransactions });
                else {
                    const myTransactions = this.props.retrieveTransactions.filter(trans => Number(trans.surface) < this.state.value)
                    this.props.dispatch({ type: 'SET_FILTERED_TRANSACTIONS', data: myTransactions });
                }
            }
            this.props.dispatch({ type: 'SET_ESTIMATION_FILTER', data: false });
            this.props.dispatch({ type: 'SET_ESTIMATIONS_FILTER_OPTIONS_VALUE', data: this.state.value });
        }else if(this.props.filterOperatorSelected === 2) {
            if(this.props.filterOption.length === 0) {
                const myTransactions = this.props.retrieveTransactions.filter(trans => Number(trans.surface) > this.state.value)
                this.props.dispatch({ type: 'SET_FILTERED_TRANSACTIONS', data: myTransactions });
            }else {
                const myTransactions = this.props.myTransactions.filter(trans => Number(trans.surface) > this.state.value)
                if(myTransactions.length !== 0)
                this.props.dispatch({ type: 'SET_FILTERED_TRANSACTIONS', data: myTransactions });
                else {
                    const myTransactions = this.props.retrieveTransactions.filter(trans => Number(trans.surface) > this.state.value)
                    this.props.dispatch({ type: 'SET_FILTERED_TRANSACTIONS', data: myTransactions });
                }
            }
            this.props.dispatch({ type: 'SET_ESTIMATION_FILTER', data: false });
            this.props.dispatch({ type: 'SET_ESTIMATIONS_FILTER_OPTIONS_VALUE', data: this.state.value });
        }else if(this.props.filterOperatorSelected === 3) {
            if(this.props.filterOption.length === 0) {
                const myTransactions = this.props.retrieveTransactions.filter(trans => Number(trans.surface) === this.state.value)
                this.props.dispatch({ type: 'SET_FILTERED_TRANSACTIONS', data: myTransactions });
            }else {
                const myTransactions = this.props.myTransactions.filter(trans => Number(trans.surface) === this.state.value)
                if(myTransactions.length !== 0)
                this.props.dispatch({ type: 'SET_FILTERED_TRANSACTIONS', data: myTransactions });
                else {
                    const myTransactions = this.props.retrieveTransactions.filter(trans => Number(trans.surface) === this.state.value)
                    this.props.dispatch({ type: 'SET_FILTERED_TRANSACTIONS', data: myTransactions });
                }
            }
            this.props.dispatch({ type: 'SET_ESTIMATION_FILTER', data: false });
            this.props.dispatch({ type: 'SET_ESTIMATIONS_FILTER_OPTIONS_VALUE', data: this.state.value });
        }else{
            if(this.props.filterOption.length === 0) {
                const myTransactions = this.props.retrieveTransactions.filter(trans => ((Number(trans.surface) >= this.state.smallValue) && (Number(trans.surface) <= this.state.greatValue)))
                this.props.dispatch({ type: 'SET_FILTERED_TRANSACTIONS', data: myTransactions });
            }else {
                const myTransactions = this.props.myTransactions.filter(trans => ((Number(trans.surface) >= this.state.smallValue) && (Number(trans.surface) <= this.state.greatValue)))
                if(myTransactions.length !== 0)
                this.props.dispatch({ type: 'SET_FILTERED_TRANSACTIONS', data: myTransactions });
                else {
                    const myTransactions = this.props.retrieveTransactions.filter(trans => ((Number(trans.surface) >= this.state.smallValue) && (Number(trans.surface) <= this.state.greatValue)))
                    this.props.dispatch({ type: 'SET_FILTERED_TRANSACTIONS', data: myTransactions });
                }
            }
            this.props.dispatch({ type: 'SET_ESTIMATION_FILTER', data: false });
            
            this.props.dispatch({ type: 'SET_ESTIMATIONS_FILTER_OPTIONS_VALUE', data: this.state.smallValue + ' et ' + this.state.greatValue });
        }

        this.props.dispatch({ type: 'SET_ESTIMATIONS_FILTER_TEMPORARY_VALUES_SURFACE', data: {
            option: 'surface',
            operator: this.props.filterOperatorSelected,
            value : this.state.value,
            smallValue: this.state.smallValue,
            greatValue: this.state.greatValue,
        } });
    }

    filterVilleTransaction () {
        
        
        if(this.props.filterOption.length === 0) {
            const myTransactions = this.props.retrieveTransactions.filter(trans => trans.ville === this.state.villeValue)
            this.props.dispatch({ type: 'SET_FILTERED_TRANSACTIONS', data: myTransactions });
        }else {
            const myTransactions = this.props.myTransactions.filter(trans => trans.ville === this.state.villeValue)
            if(myTransactions.length !== 0)
            this.props.dispatch({ type: 'SET_FILTERED_TRANSACTIONS', data: myTransactions });
            else {
                const myTransactions = this.props.retrieveTransactions.filter(trans => trans.ville === this.state.villeValue)
                this.props.dispatch({ type: 'SET_FILTERED_TRANSACTIONS', data: myTransactions });
            }
        }
        this.props.dispatch({ type: 'SET_ESTIMATION_FILTER', data: false });
        this.props.dispatch({ type: 'SET_ESTIMATIONS_FILTER_OPTIONS_Ville_VALUE', data: this.state.villeValue });
        this.props.dispatch({ type: 'SET_ESTIMATIONS_FILTER_TEMPORARY_VALUES_CITY', data: {
            option: 'city',
            value : this.state.villeValue,
        } });
    }

    componentDidMount () {
        this.getCities()
    }
    componentDidUpdate (prevProps) {
        // console.log(prevProps)
        if(prevProps.filterOptionSelected !== this.props.filterOptionSelected) {
            const value = this.props.filterOptionSelected === 'price' && this.props.temporaryPriceValues? this.props.temporaryPriceValues.Pricevalue : this.props.filterOptionSelected === 'room' && this.props.temporaryRoomValues? this.props.temporaryRoomValues.Roomvalue : this.props.filterOptionSelected === 'surface' && this.props.temporarySurfaceValues ? this.props.temporarySurfaceValues.Surfacevalue : null ;
            const smallValue =  this.props.filterOptionSelected === 'price' && this.props.temporaryPriceValues? this.props.temporaryPriceValues.PricesmallValue : this.props.filterOptionSelected === 'room' && this.props.temporaryRoomValues? this.props.temporaryRoomValues.RoomsmallValue : this.props.filterOptionSelected === 'surface' && this.props.temporarySurfaceValues ? this.props.temporarySurfaceValues.SurfacesmallValue : null ;
            const greatValue = this.props.filterOptionSelected === 'price' && this.props.temporaryPriceValues? this.props.temporaryPriceValues.PricegreatValue : this.props.filterOptionSelected === 'room' && this.props.temporaryRoomValues? this.props.temporaryRoomValues.RoomgreatValue : this.props.filterOptionSelected === 'surface' && this.props.temporarySurfaceValues ? this.props.temporarySurfaceValues.SurfacegreatValue : null ;
            const villeValue = this.props.temporaryCityValues ? this.props.temporaryCityValues.Cityvalue : null ;

            this.setState({
                value : value,
                smallValue : smallValue,
                greatValue : greatValue,
                villeValue : villeValue
            })
        }
        
    }
    
    render() {
        return (
            <div className="filterItemOptions">
                {this.props.filter && this.props.filterOptionSelected !== 'city' ? (
                    <div className = "option">
                        <div className = 'optionItem' onClick = {() => {
                            if(this.props.filterValue) {
                                this.props.dispatch({ type: 'SET_ESTIMATIONS_FILTER_OPTIONS_VALUE', data: this.state.value });
                            }
                            this.props.dispatch({ type: 'SET_ESTIMATIONS_FILTER_OPTIONS_OPERATOR', data: 1 });
                            }}>
                            Inférieur à {this.props.filterOperatorSelected === 1? (
                                <>
                                    <input type = "number" min = "0" 
                                        id = 'value'
                                        value = {this.state.value}
                                        placeholder = {this.props.filterOptionSelected === 'price' ?
                                        'Inférieur à 10 000 MAD' : this.props.filterOptionSelected === 'room' ?
                                        'Inférieur à 2 chambres' : 'Inférieur à 100 m²'
                                        } 
                                        onChange={(e) => { 
                                            this.setState({ value: e.target.value });
                                        }}/> 
                                    <button 
                                        className = "button button-search" 
                                        onClick = {() => {this.filter()}}>
                                        Ok
                                    </button>
                                </>
                            ) : ''}
                        </div>
                        <div className = 'optionItem' onClick = {() => {
                            if(this.props.filterValue) {
                                this.props.dispatch({ type: 'SET_ESTIMATIONS_FILTER_OPTIONS_VALUE', data: null });
                            }
                            this.props.dispatch({ type: 'SET_ESTIMATIONS_FILTER_OPTIONS_OPERATOR', data: 2 });}}>
                            Supérieur à {this.props.filterOperatorSelected === 2? (
                                <>
                                    <input type = "number" min = "0" 
                                        id = 'value'
                                        value = {this.state.value}
                                        placeholder = {this.props.filterOptionSelected === 'price' ?
                                        'Supérieur à 10 000 MAD' : this.props.filterOptionSelected === 'room' ?
                                        'Supérieur à 2 chambres' : 'Supérieur à 100 m²'
                                        } 
                                        onChange={(e) => { 
                                            this.setState({ value: e.target.value });
                                        }}/> 
                                    <button
                                        className = "button button-search" 
                                        onClick = {() => {this.filter()}}>
                                        Ok
                                    </button>
                                </>
                            ) : ''}
                        </div>
                        <div className = 'optionItem' onClick = {() => {
                            if(this.props.filterValue) {
                                this.props.dispatch({ type: 'SET_ESTIMATIONS_FILTER_OPTIONS_VALUE', data: this.state.value });
                            }
                            this.props.dispatch({ type: 'SET_ESTIMATIONS_FILTER_OPTIONS_OPERATOR', data: 3 });}}>
                            Egal à {this.props.filterOperatorSelected === 3? (
                                <>
                                    <input type = "number" min = "0" 
                                        id = 'value'
                                        value = {this.state.value}
                                        placeholder = {this.props.filterOptionSelected === 'price' ?
                                        'Egal à 10 000 MAD' : this.props.filterOptionSelected === 'room' ?
                                        'Egal à 2 chambres' : 'Egal à 100 m²'
                                        } 
                                        onChange={(e) => { 
                                            this.setState({ value: e.target.value });
                                        }}/> 
                                    <button
                                        className = "button button-search" 
                                        onClick = {() => {this.filter()}}>
                                        Ok
                                    </button>
                                </>
                            ) : ''}
                        </div>
                        <div className = 'optionItem' onClick = {() => {
                            if(this.props.filterValue) {
                                this.props.dispatch({ type: 'SET_ESTIMATIONS_FILTER_OPTIONS_INTERVAL_VALUE', data: {smalVallue: null, greatValue: null} });
                            }
                            this.props.dispatch({ type: 'SET_ESTIMATIONS_FILTER_OPTIONS_OPERATOR', data: 4 });}}>
                            Entre {this.props.filterOperatorSelected === 4? (
                                <>
                                    <input type = "number" min = "0" 
                                        id = 'smallValue'
                                        value = {this.state.smallValue}
                                        placeholder = {this.props.filterOptionSelected === 'price' ?
                                        'Entre 1 MAD' : this.props.filterOptionSelected === 'room' ?
                                        'Entre 1 chambre' : 'Entre 100 m²'
                                        }  
                                        onChange={(e) => { 
                                            this.setState({ smallValue: e.target.value });
                                        }}/>
                                    Et 
                                    <input type = "number" min = "0" 
                                        id = 'greatValue'
                                        value = {this.state.greatValue}
                                        placeholder = {this.props.filterOptionSelected === 'price' ?
                                        'Entre 10 000 MAD' : this.props.filterOptionSelected === 'room' ?
                                        'Entre 2 chambres' : 'Entre 300 m²'
                                        }  
                                        onChange={(e) => { 
                                            this.setState({ greatValue: e.target.value });
                                        }}/> 
                                    <button
                                        className = "button button-search" 
                                        onClick = {() => {this.filter()}}>
                                        Ok
                                    </button>
                                </> 
                            ) : ''} 
                        </div>
                    </div>
                ): this.props.filter && this.props.filterOptionSelected === 'city' ? (
                    <div className = "option">
                        <div className = 'optionItem'>
                            <select 
                                className = "form-control"
                                id = 'villeValue'
                                value = {this.state.villeValue}
                                onChange={(e) => { 
                                    this.setState({ villeValue: e.target.value });
                                }}>
                                {
                                    this.state.villes.map((ville, index) => {
                                        return (
                                        <option value = {ville}>
                                            {ville}
                                        </option>)
                                    })
                                }
                            </select>

                            <button
                                className = "button button-search" 
                                onClick = {() => {this.filter()}}>
                                Ok
                            </button>
                        </div>
                    </div>
                ) : '' }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    // console.log(state.espacePro.filterEstimation.optionSelected)
    return {
        estimations: state.espacePro.estimations,
        retrieveEstimations: state.espacePro.retrieveEstimations,
        myTransactions: state.espacePro.myTransactions,
        retrieveTransactions: state.espacePro.retrieveTransactions,
        filter: state.espacePro.estimationFilter,
        filterOption: state.espacePro.filterEstimation.option,
        filterOptionSelected: state.espacePro.filterEstimation.optionSelected,
        filterOperatorSelected: state.espacePro.filterEstimation.operatorSelected,
        filterValue: state.espacePro.filterEstimation.filterValue,
        filterSmallValue :state.espacePro.filterEstimation.filterSmallValue,
        filterGreateValue :state.espacePro.filterEstimation.filterGreateValue,
        filterVilleValue: state.espacePro.filterEstimation.filterVilleValue,
        user: state.firebase.auth,
        temporaryPriceValues : state.espacePro.filterEstimation.temporaryPriceValues,
        temporaryRoomValues : state.espacePro.filterEstimation.temporaryRoomValues,
        temporarySurfaceValues : state.espacePro.filterEstimation.temporarySurfaceValues,
        temporaryCityValues : state.espacePro.filterEstimation.temporaryCityValues,
    }
  }; 
  export default connect(mapStateToProps)(FilterItemOption);
