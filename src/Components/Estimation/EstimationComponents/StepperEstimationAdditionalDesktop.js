import React from 'react';
import { connect } from "react-redux";
import { CSSTransition } from 'react-transition-group';
import './StepperEstimationForm.scss';

import SelectBox from './../../../Elements/select-box';
import StarPicker from 'react-star-picker';
import { withRouter } from 'react-router-dom';
class StepperEstimationAdditionalDesktop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            agencement: parseInt(this.props.estimationState.estimation.agencement),
            luminosite: parseInt(this.props.estimationState.estimation.luminosite),
            construction: this.props.estimationState.estimation.construction,
            constructionError: false,
            finitionError: false,
            finition: this.props.estimationState.estimation.finition,
        };
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        });
    };

    handleDropdownChange = (item, id) => {
        this.setState({
            [id]: item.value,
        });
    }

    returnPreviousStep = () => {
        this.props.dispatch({ type: 'REGISTER_ADDITIONAL_VALUE', data: this.state});
        this.props.dispatch({ type: 'SET_ACTIVE_STEP', data: 3});
    }

    onHandleNextChange = () => {
        const error = this.checkValueErrors();
        if (error) {
            return;
        }
        this.props.dispatch({ type: 'REGISTER_ADDITIONAL_VALUE', data: this.state });    
        this.props.dispatch({ type: 'SET_ACTIVE_STEP', data: 5 });
    }

    changeAgencement = (value) =>  {
        this.setState({
            ...this.state,
            agencement: value
        });
    }
    changeLuminosity = (value) =>  {
        this.setState({
            ...this.state,
            luminosite: value
        });
    }

    checkValueErrors() {
        this.setState({ constructionError : false });
        let listError = { caughtError4: false }
        // if ( !this.state.construction ) {
        //     this.setState({ constructionError: true });
        //     listError.caughtError4 = true;
        // }
        return listError.caughtError4 ? true : false;
    }
    componentDidMount(){
        
        this.props.history.replace({
            pathname : `/estimation/${this.props.estimationState.estimation.bien}/complement`,
        search : this.props.history.location.search})  
    }

    render() {
        return (
            <div className="row justify-content">
                <div className="left-side-map">
                    <div className="sectionTitle desktop">
                        <h5>Informations complémentaires</h5>
                    </div>
                    <div className="step third-step">
                        <div className="form-group row">
                            <div className="col-12 form-field-margin">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="row">
                                            <div className="col-12">
                                                <label className="form-title">Année de construction du bien</label>
                                            </div>
                                            <div className="col-12">
                                                <SelectBox
                                                    id="construction"
                                                    defaultValue={this.state.construction}
                                                    items={[
                                                        { value: -1, id: 'Je ne sais pas' },
                                                        { value: 4, id: 'Construction neuve' },
                                                        { value: 0, id: 'Moins de 5 ans' },
                                                        { value: 3, id: 'Moins de 10 ans' },
                                                        { value: 1, id: 'Entre 10 et 20 ans' },
                                                        { value: 2, id: 'Plus de 20 ans' }
                                                    ]}
                                                    zIndex="3"
                                                    onSelectChange={this.handleDropdownChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 form-field-margin">
                                <CSSTransition appear={true} unmountOnExit in={this.state.construction !== 4} timeout={300} classNames="errorField">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="row">
                                                <div className="col-12">
                                                    <label className="form-title">État du bien</label>
                                                </div>
                                                <div className="col-12">
                                                    <SelectBox
                                                        id="finition"
                                                        defaultValue={this.state.finition}
                                                        items={[
                                                            { value: 'travauxaprevoir', id: 'Travaux à prévoir' },
                                                            { value: 'correct', id: 'Correct' },
                                                            { value: 'refaitaneuf', id: 'Refait à neuf' },
                                                        ]}
                                                        zIndex="2"
                                                        onSelectChange={this.handleDropdownChange}
                                                    />
                                                    {this.state.finitionError?(<span className="error-message">Indiquez la finition.</span>):''}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CSSTransition>
                                
                            </div>
                        </div>
                        {this.props.estimationState.estimation.bien ==="appartement" ? (

                        <div className="form-group row">
                            <div className="col-12 form-field-margin">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="row slider">
                                            <div className="col-12">
                                                <label className="form-title">Notez la qualité des prestations</label>
                                            </div>
                                            <div className="col-12">
                                                <StarPicker onChange={this.changeAgencement} value={this.state.agencement} numberStars={4} size={25}/>
                                                {
                                                    this.state.agencement === 1 ? (
                                                        <div className="star-rating">Simple, entrée de gamme</div>
                                                    ) : this.state.agencement === 2 ? (
                                                        <div className="star-rating">Normal, milieu de gamme</div>
                                                    ) : this.state.agencement === 3 ? (
                                                        <div className="star-rating">Qualitatif, matériaux haut de gamme</div>
                                                    ) : (
                                                        <div className="star-rating">Luxe, matériaux d’exception</div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 form-field-margin">
                                <div className="row ">
                                    <div className="col-12">
                                        <div className="row slider">
                                            <div className="col-12">
                                                <label className="form-title">Notez la luminosité du bien</label>
                                            </div>
                                            <div className="col-12">
                                                <StarPicker onChange={this.changeLuminosity} value={this.state.luminosite} numberStars={4} size={25}/>
                                                {
                                                    this.state.luminosite === 1 ? (
                                                        <div className="star-rating">Faiblement ensoleillé</div>
                                                    ) : this.state.luminosite === 2 ? (
                                                        <div className="star-rating">Ensoleillé</div>
                                                    ) : this.state.luminosite === 3 ? (
                                                        <div className="star-rating">Très ensoleillé</div>
                                                    ) : (
                                                        <div className="star-rating">Très ensoleillé toute la journée</div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> 
                        ) : ('') }
                    </div>
                </div>
                <div className="right-side-map" style={{
                    backgroundColor: '#162b69',
                    padding: '20px'
                }}>
                                            {this.props.estimationState.estimation.bien ==="appartement" ? (

                    <div className="information-field">
                        <h3><i class="fas fa-border-none"></i> Notez la qualité des prestations</h3>
                        <p>
                            Pour deux biens similaires, l’agencement et la luminosité font souvent la différence et les acheteurs potentiels sont de plus en plus regardants sur ces points. La visite du bien par un expert de l’immobilier qui connait les attentes du marché peut aider à confirmer votre note et notre estimation.
                        </p>
                    </div>
                                            ) : ('') }
                    {/* <div className="information-field">
                        <h3><i class="fas fa-lightbulb"></i> Notez la luminosité du bien</h3>
                        <p>
                            Pour deux biens similaires, l’agencement et la luminosité font souvent la différence et les acheteurs potentiels sont de plus en plus regardants sur ces points. La visite du bien par un expert de l’immobilier qui connait les attentes du marché peut aider à confirmer votre note et notre estimation.
                        </p>
                    </div> */}
                </div>
                <div className ="third-button">
                    <button className="button button-secondary secondaryCustom" type="button" onClick={this.returnPreviousStep}>Retour</button>
                    <button className="button button-primary primaryyCustom" type="button" onClick={this.onHandleNextChange}>Valider</button>
                </div>
                
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const uid = state.auth.uid;
    const loader = state.loading.loading;
    const estimation = state.estimationState;
    return {
      uid: uid,
      loader: loader,
      estimationState: estimation
    };
};

export default connect(mapStateToProps)(withRouter(StepperEstimationAdditionalDesktop));