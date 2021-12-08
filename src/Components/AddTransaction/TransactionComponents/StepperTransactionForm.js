import React from 'react';
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import InfoIcon from '@material-ui/icons/Info';
import Popover from "react-bootstrap/Popover";
import PopoverTitle from "react-bootstrap/PopoverTitle";
import PopoverContent from "react-bootstrap/PopoverContent";
import { connect } from "react-redux";
import { CSSTransition } from 'react-transition-group';
import './StepperTransactionForm.scss';
import SelectBox from '../../../Elements/select-box';


class TransactionStepperForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            surfacehabitable: this.props.espacePro.transaction.surfacehabitable,
            typologie: this.props.espacePro.transaction.typologie,
            orientation: this.props.espacePro.transaction.orientation,
            sdb: this.props.espacePro.transaction.sdb,
            agencement: parseInt(this.props.espacePro.transaction.agencement),
            luminosite: parseInt(this.props.espacePro.transaction.luminosite),
            rejardinError: false,
            redejardin: this.props.espacePro.transaction.redejardin,
            etage: this.props.espacePro.transaction.etage,
            construction: this.props.espacePro.transaction.construction? this.props.espacePro.transaction.construction : -1,
            constructionError: false,
            finitionError: false,
            finition: this.props.espacePro.transaction.finition,
            orientationError: false,
            surfaceHabitableError: false,
            surfaceTerrainError: false,
            surfaceConstruiteError: false,
            sdbError: false,
            typologierror: false,

            //

            surface: this.props.espacePro.transaction.surface,
            surfaceterrain: this.props.espacePro.transaction.surfaceterrain,
            surfaceconstruite: this.props.espacePro.transaction.surfaceconstruite
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
        this.props.dispatch({ type: 'REGISTER_TRANS_FORM_VALUE', data: this.state});
        this.props.dispatch({ type: 'SET_TRANS_ACTIVE_STEP', data: 1});
    }
    onHandleNextChange = () => {
        const error = this.checkValueErrors();
        if (error) {
            return;
        }

        if(this.props.espacePro.transaction.bien === 'appartement') {
            this.setState ({
                surfaceconstruite: 0,
                surfaceterrain: 0,
                surface: this.state.surfacehabitable,
            })
        }else if(this.props.espacePro.transaction.bien === 'villa'){
            this.setState ({
                surfacehabitable: 0,
                surface: this.state.surfaceconstruite
            })
        }
        
        setTimeout(() => {
            this.props.dispatch({ type: 'REGISTER_TRANS_FORM_VALUE', data: this.state});
        }, 1000);
        
        this.props.dispatch({ type: 'SET_TRANS_ACTIVE_STEP', data: 3});
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
        if (this.props.espacePro.transaction.bien === 'appartement' && (this.state.surfacehabitable === 0 || !this.state.surfacehabitable)) {
            this.setState({
                surfaceHabitableError: true
            });
            listError.caughtError = true;    
        }

        if (this.props.espacePro.transaction.bien === 'villa' && (this.state.surfaceterrain === 0 || !this.state.surfaceterrain)) {
            this.setState({
                surfaceTerrainError: true
            });
            listError.caughtError2 = true;    
        }

        if (this.props.espacePro.transaction.bien === 'villa' && (this.state.surfaceconstruite === 0 || !this.state.surfaceconstruite)) {
            this.setState({
                surfaceConstruiteError: true
            });
            listError.caughtError3 = true;    
        }

        

        if (listError.caughtError || 
            listError.caughtError2 || 
            listError.caughtError3 ||
            listError.caughtError4
            ) {
 
            return true;

        }else {

            return false;
        }
    }

    componentDidMount() {}

    render() {
        const popover = (
            <Popover id="popover-contained">
                <PopoverTitle as="h3">Surface habitable</PopoverTitle>
                <PopoverContent>
                    Surface habitable : Il s’agit de la surface intérieure du bien, à ne pas confondre avec la surface titrée. 
                    Les surfaces des terrasses, balcons, caves et les parkings sont à exclure pour l’instant, nous en tiendrons compte plus tard.
                </PopoverContent>
            </Popover>
        );
        const popover2 = (
            <Popover id="popover-contained">
                <PopoverTitle as="h3">Chambres</PopoverTitle>
                <PopoverContent>
                    Chambres : Pièces d’au moins 9 m2 avec un éclairage naturel. 
                    Sont à exclure du nombre de chambres : l’espace salon, les salles de bains, dressings, cuisine et la pièce de service attenante à la cuisine.
                </PopoverContent>
            </Popover>
        );
        const popover3 = (
            <Popover id="popover-contained">
                <PopoverTitle as="h3">Salles de bains</PopoverTitle>
                <PopoverContent>
                    Salles de bains : Salle d’eau avec au moins une douche et/ou une baignoire, hors WC séparé.
                </PopoverContent>
            </Popover>
        );

        //Villa

        const popover6 = (
            <Popover id="popover-contained">
                <PopoverTitle as="h3">Surface du terrain</PopoverTitle>
                <PopoverContent>
                    Pour deux biens similaires, l’agencement et la luminosité font souvent la différence et les acheteurs potentiels sont de plus en plus regardants sur ces points. La visite du bien par un expert de l’immobilier qui connait les attentes du marché peut aider à confirmer votre note et notre estimation.
                </PopoverContent>
            </Popover>  
        );
        const popover7 = (
            <Popover id="popover-contained">
                <PopoverTitle as="h3">Surface construite</PopoverTitle>
                <PopoverContent>
                    Pour deux biens similaires, l’agencement et la luminosité font souvent la différence et les acheteurs potentiels sont de plus en plus regardants sur ces points. La visite du bien par un expert de l’immobilier qui connait les attentes du marché peut aider à confirmer votre note et notre estimation.
                </PopoverContent>
            </Popover>
        );

        return (
            <div className="row justify-content">
                <div className="col-md-12 col-sm-12 col-lg-12">
                    <div className="sectionTitle desktop">
                        <h5>Informations principales du bien</h5>
                    </div>
                    <div className="step third-step">
                            <div className="form-group row">
                                
                                {
                                    this.props.espacePro.transaction.bien === 'appartement' ? 
                                    (
                                        <div className="col-md-6 col-sm-12">
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <label className="form-title">Surface habitable en m²</label>
                                                            <OverlayTrigger trigger="hover" placement="top" overlay={popover}>
                                                                <span className="info-icon"><InfoIcon/></span>
                                                            </OverlayTrigger>
                                                        </div>
                                                        <div className="col-12">
                                                            <input 
                                                            className="input-form form-control no-border"
                                                            type="number"
                                                            id="surfacehabitable"
                                                            placeholder="Surface habitable en m²"
                                                            value={this.state.surfacehabitable}
                                                            onChange={this.handleChange}
                                                            />
                                                            <CSSTransition appear={true} unmountOnExit in={this.state.surfaceHabitableError} timeout={300} classNames="errorField">
                                                                <span className="error-message2">Entrez la surface habitable s'il vous plaît. Exemple : 70</span>
                                                            </CSSTransition>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ): this.props.espacePro.transaction.bien === 'villa' ? (
                                        <>
                                        <div className="col-md-6 col-sm-12">
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <label className="form-title">Surface du terrain en m²</label>
                                                            <OverlayTrigger trigger="hover" placement="top" overlay={popover6}>
                                                                <span className="info-icon"><InfoIcon/></span>
                                                            </OverlayTrigger>
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
                                                                <span className="error-message2">Entrez la surface du terrain s'il vous plaît. Exemple : 70</span>
                                                            </CSSTransition>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-6 col-sm-12">
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <label className="form-title">Surface du construite en m²</label>
                                                            <OverlayTrigger trigger="hover" placement="top" overlay={popover7}>
                                                                <span className="info-icon"><InfoIcon/></span>
                                                            </OverlayTrigger>
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
                                                                <span className="error-message2">Entrez la surface construite s'il vous plaît. Exemple : 70</span>
                                                            </CSSTransition>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        </>
                                    ): ''
                                }
                                 
                                {
                                    this.props.espacePro.transaction.bien === 'appartement' ? 
                                    (
                                        <div className="col-md-6 col-sm-12">
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <label className="form-title">Chambres</label>
                                                            <OverlayTrigger trigger="hover" placement="top" overlay={popover2}>
                                                                <span className="info-icon"><InfoIcon/></span>
                                                            </OverlayTrigger>
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
                                    ) : ''
                                }
                            </div>
        
                            <div className="form-group row">
                                {
                                    this.props.espacePro.transaction.bien === 'appartement' ? 
                                    (
                                        <div className="col-md-6 col-sm-12">
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="row">
                                                        <div className="col-12">
                                                        <label className="form-title">Orientation</label>
                                                        </div>
                                                        <div className="col-12">
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
                                                                zIndex="3"
                                                                onSelectChange={this.handleDropdownChange}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : ''
                                }
                                {
                                    this.props.espacePro.transaction.bien === 'villa' ? 
                                    (
                                        <div className="col-md-6 col-sm-12">
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <label className="form-title">Chambres</label>
                                                            <OverlayTrigger trigger="hover" placement="top" overlay={popover2}>
                                                                <span className="info-icon"><InfoIcon/></span>
                                                            </OverlayTrigger>
                                                        </div>
                                                        <div className="col-12">
                                                        <div className="input-group">
                                                            <input type="number" min = "0" value = {this.state.typologie}  className="quantity-field"
                                                            onChange={(e) => this.setState({...this.state, typologie: +e.target.value})}
                                                            />
                                                            <input type="button" value="-" className="button-minus" 
                                                            onClick={() =>{
                                                                if (this.state.typologie === 0) {
                                                                  return;
                                                                } else {
                                                                  this.setState({typologie : +this.state.typologie - 1})
                                                                }
                                                              }}
                                                              />
                                                            
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
                                    ) : ''
                                }
                                <div className="col-md-6 col-sm-12">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="row">
                                                <div className="col-12">
                                                    <label className="form-title"><span>Salles de bains</span></label>
                                                    <OverlayTrigger trigger="hover" placement="top" overlay={popover3}>
                                                        <span className="info-icon"><InfoIcon/></span>
                                                    </OverlayTrigger>
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

                            {
                                this.props.espacePro.transaction.bien === 'appartement' ? 
                                (

                                    <>
                                    <div className="form-group row">
                                
                                        <div className="col-md-6 col-sm-12">
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <label className="form-title">Construction</label>
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
                                                                    { value: 2, id: 'Plus de 20 ans' },
                                                                ]}
                                                                zIndex="2"
                                                                onSelectChange={this.handleDropdownChange}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-sm-12">
                                            <CSSTransition appear={true} unmountOnExit in={this.state.construction !== 4} timeout={300} classNames="errorField">
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="row">
                                                            <div className="col-12">
                                                                <label className="form-title">Finition</label>
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

                                    <div className="form-group row">
                                        <div className="col-md-6 col-sm-12">
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className = "row">
                                                        <div className="col-12">
                                                            <label className="form-title"><span>Étage</span></label>
                                                        </div>
                                                        <div className="col-12">

                                                            <div className="input-group">
                                                                
                                                                <input 
                                                                    type="number"
                                                                    min = {0}
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

                                        <div className="col-md-6 col-sm-12">
                                            <CSSTransition appear={true} unmountOnExit in={this.state.etage === 0 } timeout={300} classNames="errorField">
                                            
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
                                                                zIndex="1"
                                                                onSelectChange={this.handleDropdownChange}
                                                            />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CSSTransition>
                                        </div>

                                        
                                    </div>
{/* 
                                    <div className="form-group row">
                                        <div className="col-md-6 col-sm-12">
                                            <div className="row">
                                                <div className="col-12">
                                                   
                                                    <div className="row slider">
                                            <div className="col-12">
                                                <label className="form-title">Notez la qualité des prestations</label>
                                            </div>
                                            <div className="col-12">
                                                <StarPicker 
                                                                                                            onChange={(newValue) => {
                                                                                                                this.setState({ agencement: newValue });
                                                                                                            }}
                                                value={this.state.agencement} numberStars={4} size={25}/>
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
                                        <div className="col-md-6 col-sm-12">
                                            <div className="row ">
                                                <div className="col-12">
                                                    <div className="row slider">
                                                        <div className="col-12">
                                                            <label className="form-title">Notez la luminosité</label>
                                                            <OverlayTrigger trigger="hover" placement="top" overlay={popover5}>
                                                                <span className="info-icon"><InfoIcon/></span>
                                                            </OverlayTrigger>
                                                        </div>

                                                        <div className="col-12">
                                                <StarPicker     onChange={(Value) => {
                                                                    this.setState({ luminosite: Value });
                                                                }}    
                                                                value={this.state.luminosite} numberStars={4} size={25}/>
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
                                    */}
                                    </>

                                ) : ''
                            }
                                                       
    
                    </div>
                </div>
                <div className ="third-button third-button-transaction">
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
    const transaction = state.espacePro;
    return {
      uid: uid,
      loader: loader,
      espacePro: transaction
    };
};

export default connect(mapStateToProps)(TransactionStepperForm);