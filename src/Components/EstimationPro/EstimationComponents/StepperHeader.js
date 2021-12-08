import React from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import './StepperHeader.scss';
import { connect } from "react-redux";
import HeaderEstimationDesktopPro from '../../../Elements/header-desktop-pro/index';

class StepperHeader extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            stepHeader : [
                {
                    id:0,
                    h3: 'Étape 1',
                    p: 'Adresse du bien'
                },
                {
                    id:1,
                    h3: 'Étape 2',
                    p: 'Type de bien'
                },
                {
                    id:2,
                    h3: 'Étape 3',
                    p: 'Informations principales sur le bien'
                },
                {
                    id:3,
                    h3: 'Étape 4',
                    p: 'Caractéristiques du bien'
                }
                ,
                {
                    id:4,
                    h3: 'Étape 5',
                    p: 'Informations complémentaires sur le bien'
                },
                {
                    id: 5,
                    h3: 'Étape 6',
                    p: 'Nous calculons votre estimation'
                }
                ,                {
                    id: 6,
                    h3: 'Étape 7',
                    p: 'Découvrez votre estimation'
                }, {
                id: 7,
                h3: 'Étape 8',
                p: 'Aucune étape'
            }
                
            ]
        }
    }
 
    render() {
        return <div>
            <HeaderEstimationDesktopPro
                className="desktop"
                header={this.state.stepHeader.filter(head => head.id === this.props.estimationStatePro.activeStep)[0]}
                estimationStatePro={this.props.estimationStatePro}
                step={this.props.estimationStatePro.activeStep}/>
            {
                this.state.stepHeader.map((header, index) =>(
                    <div key = {index}>
                    {
                        this.props.estimationStatePro.activeStep === header.id ? 
                        (
                            <div>
                                <div className="estimation-top-side mobile" >
                                    {/* <h3>{header.h3}</h3> */}
                                    <p>{header.p}</p>
                                    {this.props.estimationStatePro.activeStep !== 0 ? (
                                        <h5 className="header--adress">Pour votre bien proche de {this.props.estimationStatePro.currentAdress}</h5>
                                    ): ''}
                                </div>
                            </div>
                        ) : ''
                    }
                    </div>
                ))
            }

            {/* the steaper only appears on tablets and small desktop browsers */}
            <span className ="stepper-header ipad">
                <Stepper activeStep={this.props.estimationStatePro.activeStep} alternativeLabel  >
                    {this.props.estimationStatePro.steps.map((label, index) => (
                    <Step key={index} className={'EstimationStepper-stepper-5'}>
                        <StepLabel
                        StepIconProps={{
                            classes: {
                                active: 'EstimationStepper-icon-6',
                                completed: 'EstimationStepper-icon-6'
                            }
                        }}
                        >{label}</StepLabel>
                    </Step>
                    ))}
                </Stepper>
            </span>
        </div>
    }

}

const mapStateToProps = (state) => {
    const estimation = state.estimationStatePro;
    return {
      estimationStatePro: estimation
    };
};

export default connect(mapStateToProps)(StepperHeader);
