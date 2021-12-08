import React from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import './TransactionStepperHeader.scss';
import { connect } from "react-redux";

import HeaderTransactionDesktopPro from '../../../Elements/header-transaction-desktop-pro/index';

class TransactionStepperHeader extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            stepHeader : [
                {
                    id:0,
                    h3: 'Etape 1',
                    p: 'Adresse du bien'
                },
                {
                    id:1,
                    h3: 'Etape 2',
                    p: 'Type de bien'
                },
                {
                    id:2,
                    h3: 'Etape 3',
                    p: 'Information sur le bien'
                },
                {
                    id:3,
                    h3: 'Etape 4',
                    p: 'Caractéristiques du bien'
                }
                ,
                {
                    id:4,
                    h3: 'Etape 5',
                    p: 'La transaction'
                },
                {
                    id: 5,
                    h3: 'Etape 6',
                    p: 'Aucune etape'
                }
                
                
            ]
        }
    }
 
    render() {
        return <div>
            <HeaderTransactionDesktopPro
                className="desktop"
                header={this.state.stepHeader.filter(head => head.id === this.props.espacePro.activeStep)[0]}
                espacePro={this.props.espacePro}
                step={this.props.espacePro.activeStep}/>
            {
                this.state.stepHeader.map((header, index) =>(
                    <div key = {index}>
                    {
                        this.props.espacePro.activeStep === header.id ? 
                        (
                            <div>
                                <div className="estimation-top-side mobile" >
                                    <h3>{header.h3}</h3>
                                    <p>{header.p}</p>
                                    {this.props.espacePro.activeStep !== 0 ? (
                                        <h5>{this.props.espacePro.currentAdress}</h5>
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
                <Stepper activeStep={this.props.espacePro.activeStep} alternativeLabel  >
                    {this.props.espacePro.steps.map((label, index) => (
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
    const transaction = state.espacePro;
    // // console.log(transaction)
    return {
      espacePro: transaction
      
    };
};

export default connect(mapStateToProps)(TransactionStepperHeader);
