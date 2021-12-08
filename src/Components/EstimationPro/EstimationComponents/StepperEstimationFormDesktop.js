import React from 'react';
import { connect } from "react-redux";
import { CSSTransition } from 'react-transition-group';
import './StepperEstimationForm.scss';
import SelectBox from '../../../Elements/select-box';
import { animateScroll } from "react-scroll";

class EstimationStepperFormDesktop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            surfacehabitable: this.props.estimationStatePro.estimation.surfacehabitable,
            typologie: this.props.estimationStatePro.estimation.typologie,
            orientation: this.props.estimationStatePro.estimation.orientation,
            sdb: this.props.estimationStatePro.estimation.sdb,
            rejardinError: false,
            redejardin: this.props.estimationStatePro.estimation.redejardin,
            etage: this.props.estimationStatePro.estimation.etage,
            orientationError: false,
            surfaceHabitableError: false,
            surfaceTerrainError: false,
            surfaceConstruiteError: false,
            sdbError: false,
            typologierror: false,
            surfaceterrain: this.props.estimationStatePro.estimation.surfaceterrain,
            surfaceconstruite: this.props.estimationStatePro.estimation.surfaceconstruite
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
        this.props.dispatch({ type: 'PRO_REGISTER_FORM_VALUE', data: this.state});
        this.props.dispatch({ type: 'PRO_SET_ACTIVE_STEP', data: 1});
    }

    onHandleNextChange = () => {
        const error = this.checkValueErrors();
        if (error) { return; }
        this.props.dispatch({ type: 'PRO_REGISTER_FORM_VALUE', data: this.state });
        this.props.dispatch({ type: 'PRO_SET_ACTIVE_STEP', data: 3 });
    }

    handleSurfaceChange = (e) => {
        if ( e.target.value === 0 || !e.target.value || e.target.value<=0 ) {
            // ////console.log(this.state.surfacehabitable)
          this.setState({
              surfaceHabitableError: true,
              surfacehabitable : e.target.value
          });
        }
        else {
          this.setState({
              surfaceHabitableError: false,
              surfacehabitable : e.target.value
          });
        }
    }

    checkValueErrors() {
        this.setState({
            surfaceHabitableError: false,
            surfaceTerrainError: false,
            surfaceConstruiteError: false,
            constructionError : false,
            sdbError: false,
            typologierror: false
        });

        let listError = {
            caughtError: false,
            caughtError2: false,
            caughtError3: false,
            caughtError4: false,
            caughtError5: false,
            caughtError6: false,
        }
        if ( this.props.estimationStatePro.estimation.bien === 'appartement' ) {
          if ( this.state.surfacehabitable === 0 || !this.state.surfacehabitable || this.state.surfacehabitable<=0 ) {
              // ////console.log(this.state.surfacehabitable)
            this.setState({
                surfaceHabitableError: true
            });
            listError.caughtError = true;
          }
        }
    

        if ( this.props.estimationStatePro.estimation.bien === 'villa' ) {
          if (this.state.surfaceterrain === 0 || !this.state.surfaceterrain) {
              this.setState({
                  surfaceTerrainError: true
              });
              listError.caughtError2 = true;    
          }
          if (this.state.surfaceconstruite === 0 || !this.state.surfaceconstruite) {
              this.setState({
                  surfaceConstruiteError: true
              });
              listError.caughtError3 = true;    
          }
        }

        if (listError.caughtError || 
            listError.caughtError2 || 
            listError.caughtError3 ||
            listError.caughtError4
            ) {
 
            return true;

        } else {

            return false;
        }
    }
    scrollToBottom = () => {
        setTimeout( () => {
        animateScroll.scrollToBottom({
            containerId: "third-step"
          });
        },200)
        }
      

    render() {
        return (
            <div className="row justify-content">
                <div className="left-side-map">
                    <div className="sectionTitle desktop">
                        <h5>Informations principales du bien</h5>
                    </div>
                    <div className="step third-step" style={{
                      overflow: 'scroll',
                      height: 'calc(100% - 80px)'
                    }}
                    id="third-step">
                        {
                            this.props.estimationStatePro.estimation.bien === 'appartement' ? 
                            (
                              <>
                                <div className="form-group row">
                                  <div className="col-12 form-field-margin">
                                      <div className="row">
                                          <div className="col-12">
                                              <div className="row">
                                                  <div className="col-12">
                                                      <label className="form-title">Surface habitable</label>
                                                  </div>
                                                  <div className="col-12">
                                                      <input 
                                                      className="input-form form-control no-border"
                                                      type="number"
                                                      id="surfacehabitable"
                                                      min={0}
                                                      placeholder="Surface habitable en m²"
                                                      value={this.state.surfacehabitable}
                                                      onChange={this.handleSurfaceChange}
                                                      />
                                                      <CSSTransition appear={true} unmountOnExit in={this.state.surfaceHabitableError} timeout={300} classNames="errorField">
                                                          <span className="error-message2">Entrez la surface habitable s'il vous plaît. Exemple : 70</span>
                                                      </CSSTransition>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-12 form-field-margin">
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="row">
                                                    <div className="col-12">
                                                        <label className="form-title">Nombre de chambres</label>
                                                    </div>
                                                    <div className="col-12">
                                                    <div className="input-group">
                                                        <input type="number" min = "0" value = {this.state.typologie}  className="quantity-field"
                                                        onChange={(e) => this.setState({...this.state, typologie: +e.target.value})}
                                                        />
                                                        <input type="button" value="-" className="button-minus" onClick={() =>{
                                                          if (this.state.typologie === 0) {
                                                            return;
                                                          } else {
                                                            this.setState({typologie : +this.state.typologie - 1})
                                                          }
                                                        }}/>
                                                        
                                                        <input type="button" value="+" className="button-plus" onClick={() =>{this.setState({typologie : +this.state.typologie + 1})}}/>
                                                    </div>
                                                        <CSSTransition appear={true} unmountOnExit in={this.state.typologierror} timeout={300} classNames="errorField">
                                                            <span className="error-message">Veuilez selectionner le nombre de chambre</span>
                                                        </CSSTransition>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group row">
                                  <div className="col-12 form-field-margin">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="row">
                                                <div className="col-12">
                                                    <label className="form-title"><span>Nombre de salles de bains</span></label>
                                                </div>
                                                <div className="col-12">
                                                    <div className="input-group">
                                                    <input type="number" min = "0" value = {this.state.sdb}  className="quantity-field"
                                                        onChange={(e) => this.setState({...this.state, sdb: +e.target.value})}
                                                        />
                                                        <input type="button" value="-" className="button-minus" onClick={() =>{
                                                          if (this.state.sdb === 0) {
                                                            return;
                                                          } else {
                                                            this.setState({sdb : +this.state.sdb - 1})
                                                          }
                                                        }}/>
                                                        
                                                        <input type="button" value="+" className="button-plus" onClick={() =>{this.setState({sdb : +this.state.sdb + 1})}}/>
                                                    </div>
                                                    
                                                    <CSSTransition appear={true} unmountOnExit in={this.state.sdbError} timeout={300} classNames="errorField">
                                                        <span className="error-message">Veuilez selectionner le nombre de salle de bains</span>
                                                    </CSSTransition>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="form-group row">
                                  <div className="col-12 form-field-margin">
                                      <div className="row">
                                          <div className="col-12">
                                              <div className = "row">
                                                  <div className="col-12">
                                                      <label className="form-title"><span>Étage du bien</span></label>
                                                  </div>
                                                  <div className="col-12">

                                                      <div className="input-group">
                                                          
                                                          <input 
                                                              type="number"
                                                              min = "0"
                                                              value = {this.state.etage}
                                                              className="quantity-field"
                                                              onChange={
                                                                  (e) => this.setState({...this.state, etage: +e.target.value})
                                                              }/>
                                                          <input
                                                              type="button"
                                                              value="-"
                                                              className="button-minus"
                                                              onClick={() =>{
                                                                if (this.state.etage === 0) {
                                                                  return;
                                                                } else {
                                                                  this.setState({etage : +this.state.etage - 1})
                                                                }
                                                              }}/>
                                                          
                                                          <input
                                                              type="button"
                                                              value="+"
                                                              className="button-plus"
                                                              onClick={() =>{
                                                                  this.setState({etage : +this.state.etage + 1});
                                                              }}/>
                                                      </div>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                  </div>

                                  {
                                    this.state.etage === 0 && (
                                      <div className="col-sm-12 form-field-margin">
                                          <div className="row">
                                              <div className="col-12">
                                                  <div className="row">
                                                      <div className="col-12">
                                                          <label className="form-title">Ré de jardin</label>
                                                      </div>
                                                      <div className="col-12">
                                                      <SelectBox
                                                          id="redejardin"
                                                          defaultValue={this.state.redejardin}
                                                          items={[
                                                              { value: 'non', id: 'Non' },
                                                              { value: 'ouicollectif', id: 'Oui collectif' },
                                                          ]}
                                                          zIndex="3"
                                                          onSelectChange={this.handleDropdownChange}
                                                      />
                                                      </div>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                    )
                                  }
                              </div>
                                <div className="form-group row">
                                    <div className="col-12 form-field-margin">
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="row">
                                                    <div className="col-12">
                                                    <label className="form-title">Orientation</label>
                                                    </div>
                                                    <div className="col-12" onClick={this.scrollToBottom}>
                                                        <SelectBox
                                                            id="orientation"
                                                            defaultValue={this.state.orientation}
                                                            items={[
                                                                { value: 'Je ne sais pas', id: 'Je ne sais pas' },
                                                                { value: 'sud', id: 'Sud' },
                                                                { value: 'nord', id: 'Nord' },
                                                                { value: 'est', id: 'Est' },
                                                                { value: 'ouest', id: 'Ouest' },
                                                                { value: 'sudouest', id: 'Sud Ouest' },
                                                                { value: 'double', id: 'Double' },
                                                            ]}
                                                            zIndex="2"
                                                            onSelectChange={this.handleDropdownChange}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ width : '100%'}} ref={this.messagesEndRef}></div>

                                </div>
                              </>
                            ): this.props.estimationStatePro.estimation.bien === 'villa' ? (
                                <>
                                <div className="form-group row">
                                    <div className="col-12 form-field-margin">
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="row">
                                                    <div className="col-12">
                                                        <label className="form-title">Nombre de chambres</label>
                                                    </div>
                                                    <div className="col-12">
                                                    <div className="input-group">
                                                        <input type="number" min = "0" value = {this.state.typologie}  className="quantity-field"
                                                        onChange={(e) => this.setState({...this.state, typologie: +e.target.value})}
                                                        />
                                                        <input type="button" value="-" className="button-minus" onClick={() =>{
                                                          if (this.state.typologie === 0) {
                                                            return;
                                                          } else {
                                                            this.setState({typologie : +this.state.typologie - 1})
                                                          }
                                                        }}/>
                                                        
                                                        <input type="button" value="+" className="button-plus" onClick={() =>{this.setState({typologie : +this.state.typologie + 1})}}/>
                                                    </div>
                                                        <CSSTransition appear={true} unmountOnExit in={this.state.typologierror} timeout={300} classNames="errorField">
                                                            <span className="error-message">Veuilez selectionner le nombre de chambre</span>
                                                        </CSSTransition>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group row">
                                  <div className="col-12 form-field-margin">
                                      <div className="row">
                                          <div className="col-12">
                                              <div className="row">
                                                  <div className="col-12">
                                                      <label className="form-title">Surface du terrain en m²</label>
                                                  </div>
                                                  <div className="col-12">
                                                      <input 
                                                      className="input-form form-control no-border"
                                                      type="number"
                                                      id="surfaceterrain"
                                                      placeholder="Surface du terrain en m²"
                                                      value={this.state.surfaceterrain}
                                                      onChange={this.handleChange}
                                                      />
                                                      <CSSTransition appear={true} unmountOnExit in={this.state.surfaceTerrainError} timeout={300} classNames="errorField">
                                                          <span className="error-message2">Entrez la surface du terrain s'il vous plaît. Exemple : 600</span>
                                                      </CSSTransition>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-12 form-field-margin">
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="row">
                                                    <div className="col-12">
                                                        <label className="form-title">Surface du construite en m²</label>
                                                    </div>
                                                    <div className="col-12">
                                                        <input 
                                                        className="input-form form-control no-border"
                                                        type="number"
                                                        id="surfaceconstruite"
                                                        placeholder="Surface construite en m²"
                                                        value={this.state.surfaceconstruite}
                                                        onChange={this.handleChange}
                                                        />
                                                        <CSSTransition appear={true} unmountOnExit in={this.state.surfaceConstruiteError} timeout={300} classNames="errorField">
                                                            <span className="error-message2">Entrez la surface construite s'il vous plaît. Exemple : 600</span>
                                                        </CSSTransition>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </>
                            ): ''
                        }
                    </div>
                </div>
                <div className="right-side-map" style={{
                    backgroundColor: '#162b69',
                    padding: '20px',
                }}>
                  {
                    this.props.estimationStatePro.estimation.bien === 'appartement' ? 
                    (
                      <>
                        <div className="information-field">
                          <h3><i class="fas fa-ruler-combined"></i> Surface habitable</h3>
                          <p>
                              Il s’agit de la surface intérieure du bien, à ne pas confondre avec la surface titrée. 
                              Les surfaces des terrasses, balcons, caves et les parkings sont à exclure pour l’instant, nous en tiendrons compte plus tard.
                          </p>
                        </div>
                        <div className="information-field">
                            <h3><i class="fas fa-bed"></i> Nombre de chambres</h3>
                            <p>
                                Pièces d’au moins 9 m<sup>2</sup> avec un éclairage naturel. 
                                Sont à exclure du nombre de chambres : l’espace salon, les salles de bains, dressings, cuisine et la pièce de service attenante à la cuisine.
                            </p>
                        </div>
                        <div className="information-field">
                            <h3><i class="fas fa-bath"></i> Nombre de salles de bains</h3>
                            <p>
                                Salle d’eau avec au moins une douche et/ou une baignoire, hors WC séparé.
                            </p>
                        </div>
                      </>
                    ) : this.props.estimationStatePro.estimation.bien === 'villa' ? (
                      <>
                        <div className="information-field">
                            <h3><i class="fas fa-bed"></i> Nombre de chambres</h3>
                            <p>
                                Pièces d’au moins 9 m<sup>2</sup> avec un éclairage naturel. 
                                Sont à exclure du nombre de chambres : l’espace salon, les salles de bains, dressings, cuisine et la pièce de service attenante à la cuisine.
                            </p>
                        </div>
                        {/* <div className="information-field">
                            <h3><i class="fas fa-landmark"></i> Surface du terrain</h3>
                            <p>
                              Pour deux biens similaires, l’agencement et la luminosité font souvent la différence et les acheteurs potentiels sont de plus en plus regardants sur ces points. La visite du bien par un expert de l’immobilier qui connait les attentes du marché peut aider à confirmer votre note et notre estimation.
                            </p>
                        </div> */}
                        {/* <div className="information-field">
                            <h3><i class="fas fa-tools"></i> Surface construite</h3>
                            <p>
                              Pour deux biens similaires, l’agencement et la luminosité font souvent la différence et les acheteurs potentiels sont de plus en plus regardants sur ces points. La visite du bien par un expert de l’immobilier qui connait les attentes du marché peut aider à confirmer votre note et notre estimation.
                            </p>
                        </div> */}
                      </>
                    ) : ''
                  }
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
    const estimation = state.estimationStatePro;
    return {
      uid: uid,
      loader: loader,
      estimationStatePro: estimation
    };
};

export default connect(mapStateToProps)(EstimationStepperFormDesktop);