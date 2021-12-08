import React from 'react';
import { connect } from "react-redux";
import './StepperEstimationYou.scss';
import SelectBox from './../../../Elements/select-box';


import {theme} from '../../../assets/theme'
import {ThemeProvider} from '@material-ui/core/styles';
import MuiPhoneNumber from "material-ui-phone-number";
import {withRouter} from 'react-router-dom'

class StepperEstimationYou extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categorie: this.props.estimateState.estimation.categorie ? this.props.estimateState.estimation.categorie : 'particulier',
            a_contacter: this.props.estimateState.estimation.a_contacter ? this.props.estimateState.estimation.a_contacter : 'Oui',
            activite: this.props.estimateState.estimation.activite ? this.props.estimateState.estimation.activite : '-',
            proprietaire: this.props.estimateState.estimation.proprietaire ? this.props.estimateState.estimation.proprietaire : 'Oui',
            projet_vente: this.props.estimateState.estimation.projet_vente ? this.props.estimateState.estimation.projet_vente : '-- Choisir --',
            raison_estimation: this.props.estimateState.estimation.raison_estimation ? this.props.estimateState.estimation.raison_estimation : '-- Choisir --',
            telephone: this.props.estimateState.estimation.telephone ? this.props.estimateState.estimation.telephone : '' 
        };
    }

    returnPreviousStep = () => {
        this.props.dispatch({ type: 'SAVE_USER_DETAILS', data: this.state});
        this.props.dispatch({ type: 'SET_ACTIVE_STEP', data: 4});
    }

    onHandleNextChange = () => {
        const error = this.validateDetails();
        if (error) {
            this.props.dispatch({type: 'FILL_FORM_ERROR'});
            return;
        }
        this.props.dispatch({ type: 'SAVE_USER_DETAILS', data: this.state});
        this.props.dispatch({ type: 'SET_ACTIVE_STEP', data: 6});
    }

    validateDetails() {
        var errorFound = false;
        if (this.state.categorie === 'professionel') {
            if (!this.state.activite || this.state.activite === '' || this.state.activite === '-') {
                errorFound = true;
            }
        } else {
            if (this.state.proprietaire === 'Oui') {
                if (this.state.projet_vente === null || this.state.projet_vente === '-' || this.state.projet_vente === '-- Choisir --' ||this.state.projet_vente === '') {
                    errorFound = true;
                } else {
                    if (this.state.projet_vente.indexOf('Oui') !== -1 && (this.state.telephone === null || this.state.telephone === '-' || this.state.telephone === '') && (this.state.a_contacter === 'Oui'|| this.state.a_contacter === "pas precise")) {
                    errorFound = true;
                    }
                }
            }
            else {
                if (this.state.raison_estimation === null || this.state.raison_estimation === '-' || this.state.raison_estimation === '-- Choisir --' || this.state.raison_estimation === '')  {
                    errorFound = true;
                } 
            }

    }
    return errorFound;

}

    componentDidMount() {
        this.props.history.replace({
            pathname : `/estimation/${this.props.estimateState.estimation.bien}/form`,
        search : this.props.history.location.search})        }
    componentDidUpdate() {
        // console.log("validate detila",this.validateDetails())
    }

    render() {
        let userphone;
        if (this.props.user){
            userphone = this.props.user.phone
        }
        else{
            userphone = ""
        }
        return (
            <div className="row justify-content">
                <div className="col-md-12 col-sm-12 col-lg-8">
                    <div className="sectionTitle desktop">
                        <h5>Le bien et vous</h5>
                    </div>
                    <div className="step fifth-step">
                        <div className="form-group row justify-content alignStuffCenter">

                            <div className="col-md-12 col-sm-12 head--choice--container">
                            <div className="choice">
                                <div
                                className={this.state.categorie === 'particulier' ? "choice-item worker-category owner active active--head-choice" : "choice-item worker-category owner inactive--head-choice"}
                                onClick={() =>{this.setState({categorie: 'particulier'})}}>
                                    Je suis un particulier
                                </div>
                                <div className={this.state.categorie === 'professionel' ? "choice-item worker-category particular active active--head-choice" : "choice-item worker-category particular inactive--head-choice"} onClick={() =>{this.setState({categorie : 'professionel'})}}>
                                    Je suis un professionnel
                                </div>
                            </div>
                        </div>
                    </div>
                    { this.state.categorie === 'particulier' ? (
                        <div className="form-group row justify-content alignStuffCenter">
                            <div className="col-md-3 col-sm-12 fifth-step-title">
                                <h6>Propriétaire</h6>
                            </div>
                                <div className="col-md-9 col-sm-12">
                                    <div className="choice">
                                        <div className={this.state.proprietaire === "Oui" ? "choice-item owner active" : "choice-item owner"} onClick={() =>{this.setState({proprietaire : "Oui"})}}>
                                            Oui
                                        </div>
                                        <div className={this.state.proprietaire === "Non" ? "choice-item particular active" : "choice-item particular"} onClick={() =>{this.setState({proprietaire : "Non"})}}>
                                            Non
                                        </div>
                                    </div>
                                </div>
                                {this.state.proprietaire === "Oui" ? (
                                <div className="col-12 mt-15">
                                    <h6 className ="fifth-step-title">Souhaitez-vous vendre votre bien?</h6>
                                    <SelectBox
                                        id="projet_vente"
                                        defaultValue={this.state.projet_vente}
                                        items={[
                                            { value: '-- Choisir --', id: '-- Choisir --' },
                                            { value: 'Oui dès que possible', id: 'Oui dès que possible' },
                                            { value: 'Oui d\'ici 3 mois', id: 'Oui d\'ici 3 mois' },
                                            { value: 'Oui dans plus de 3 mois', id: 'Oui dans plus de 3 mois' },
                                            { value: 'Mon bien est déjà en en vente', id: 'Mon bien est déjà en en vente' },
                                            { value: 'Non, je viens de le vendre', id: 'Non, je viens de le vendre' },
                                            { value: 'Non je n\'ai pas de projet', id: 'Non je n\'ai pas de projet' },
                                        ]}
                                        zIndex="3"
                                        onSelectChange={(item, id) => {
                                            this.setState({
                                                projet_vente: item.value
                                            });
                                        }}
                                    />
                                </div>
                                ) : ''
  
                            }
                           {this.state.proprietaire === "Non" ? 
                                 (<div className="col-12 mt-15">
                                <h6 className ="fifth-step-title">Pour quelle raison estimez-vous ce bien?</h6>
                                <SelectBox
                                    id="raison_estimation"
                                    defaultValue={this.state.raison_estimation}
                                    items={[
                                        { value: '-- Choisir --', id: '-- Choisir --' },
                                        { value: 'Je souhaite acheter', id: 'Je souhaite acheter' },
                                        { value: 'Je m\'informe', id: 'Je m\'informe' },
                                        { value: 'Je viens de vendre', id: 'Je viens de vendre' }
                                    ]}
                                    zIndex="3"
                                    onSelectChange={(item, id) => {
                                        this.setState({
                                            raison_estimation: item.value
                                        });
                                    }}
                                />
                            </div> ) : ''
    }
                                {(this.state.projet_vente === "Oui dès que possible" || this.state.projet_vente === "Oui d'ici 3 mois" || this.state.projet_vente === "Oui dans plus de 3 mois") && this.state.proprietaire === "Oui" ? (
                                <div className="col-12 mt-15">
                                    <div className="orm-group row justify-content alignStuffCenter">
                                        <div className="col-md-6 col-sm-12 fifth-step-title" >
                                            <h6>Souhaitez-vous être contacté par des professionnels pour affiner l'estimation de votre bien ?</h6>
                                        </div>
                                        <div className="col-md-6 col-sm-12">
                                            <div className="choice">
                                                <div className={this.state.a_contacter === "Oui" ? "choice-item owner active" : "choice-item owner"} onClick={() =>{this.setState({a_contacter : "Oui"})}}>
                                                    Oui
                                                </div>
                                                <div className={this.state.a_contacter === "Non" ? "choice-item particular active" : "choice-item particular"} onClick={() =>{this.setState({a_contacter : "Non"})}}>
                                                    Non
                                                </div>
                                            </div>
                                        </div>
                                       {this.state.a_contacter !== "Oui" ? ( <div className="phone-service-container">
                        <p className="phone-service-helper"><i class="fas fa-info-circle"></i> Ce service est gratuit et sans engagement</p>
                    </div>) : ('')}
                                    </div>
                                </div>
                                ) : '' }
                                {this.state.a_contacter === "Oui" && this.state.proprietaire === "Oui" && (this.state.projet_vente === "Oui dès que possible" || this.state.projet_vente === "Oui d'ici 3 mois" || this.state.projet_vente === "Oui dans plus de 3 mois") ? (
                                <div className="col-12 mt-15">
                                    {/* <h6 className = "fifth-step-title">Veuillez entrer votre numéro de téléphone</h6>
                                    <PhoneInput
                                        defaultCountry="MA"
                                        id="telephone"
                                        placeholder="Numéro de téléphone"
                                        value={this.state.telephone}
                                        onChange={(e) => {this.setState({telephone: e})}}/> */}
                                        <ThemeProvider theme={theme}>
                    <div className="col-md-12 col--number">
                                                          <MuiPhoneNumber
                                                          autoFormat={false}
                    name="phoneNumber"
                    label="Numéro de téléphone"
                    data-cy="user-phone"
                    id="telephone"
                    defaultCountry={"ma"}
                    value={userphone}
                    onChange={(e) => {this.setState({telephone: e})}}/>

                  </div>
                  </ThemeProvider>
                  <div className="phone-service-container">
                        <p className="phone-service-helper"><i class="fas fa-info-circle"></i> Ce service est gratuit et sans engagement</p>
                    </div>
                                </div>
                                ) : '' }
                              
             
                            </div>
                    ) : (
                        <div className="form-group row" style={{ marginTop: '15px' }}>
                            <div className="col-12">
                                <SelectBox
                                    id="activite"
                                    defaultValue={this.state.activite}
                                    items={[
                                        { value: '-', id: 'Votre activité' },
                                        { value: 'Agent Immobilier', id: 'Agent Immobilier' },
                                        { value: 'Notaire', id: 'Notaire' },
                                        { value: 'Promoteur / Constructeur', id: 'Promoteur / Constructeur' },
                                        { value: 'Gestionnaire de patrimoine', id: 'Gestionnaire de patrimoine' },
                                        { value: 'Syndic', id: 'Syndic' },
                                        { value: 'Expert', id: 'Expert Immobilier' },
                                        { value: 'Autre', id: 'Autre' },
                                    ]}
                                    zIndex="3"
                                    onSelectChange={(item, id) => {
                                        this.setState({
                                            activite: item.value
                                        });
                                    }}
                                />
                            </div>
                        </div>)}
                        <div className="buttonsHolder estimation--you-buttons">
                            <button className="button button-secondary secondaryCustom" type="button" onClick={this.returnPreviousStep}>Retour</button>
                            <button className="button button-primary primaryyCustom" type="button" onClick={this.onHandleNextChange}>Valider</button>
                        </div>
                    </div>
                </div>
                    <div className="fifth-button">
                        <button className="button button-secondary secondaryCustom" type="button" onClick={this.returnPreviousStep}>Retour</button>
                        <button className="button button-primary primaryyCustom" type="button" onClick={this.onHandleNextChange}>Valider</button>
                    </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const estimation = state.estimationState;
    const user = state.auth.user;
    return {
        estimateState: estimation,
        user : user
    };
};


export default connect(mapStateToProps)(withRouter(StepperEstimationYou));