import React from 'react';
import { connect } from "react-redux";
import EstimationCardVilla from './components/EstimationCardVilla';
import NoEstimations from './components/NoEstimations';
import Spinner from "react-bootstrap/Spinner";
import './style.scss';
import RightPannelTitle from '../../../Elements/RightPannelTitle';
import SumUpCardHead from '../Transactions/components/SumUpCardHead'


class Estimations extends React.Component {

    constructor(props) {
        super(props); 
        this.state = {
            displayEstimations: null,
            gettingEstimations: true
        }
    }

    getEstimationsDisplay() {
        // const type = this.props.activeMenu === 'villas' ? 'villa' :
        //     this.props.activeMenu === 'appartements' ? 'appartement' :
        //     'terrain';
            // //console.log(this.props.estimations)
        // //console.log(type, this.props.estimations.filter(estimation => estimation.bien === type).length);
        const estimations = this.props.estimations.sort((a, b) => {
            // //console.log(a)
            // //console.log(b)
             return(b.date.localeCompare(a.date))
            });
        this.setState({
            ...this.state,
            displayEstimations: estimations,
            gettingEstimations: false
        });
    }

    componentDidMount() {
        if (this.props.estimations) {
            this.getEstimationsDisplay();   
        }
    }
    componentDidUpdate() {
        // const type = this.props.activeMenu === 'villas' ? 'villa' :
        //     this.props.activeMenu === 'appartements' ? 'appartement' :
        //     'terrain';
        const estimations = this.props.estimations.sort((a, b) => b.date.localeCompare(a.date));
        if (this.props.estimations && (estimations.length !== this.state.displayEstimations.length)) {
            this.getEstimationsDisplay();
        }
    }

    render() {
        return (
            <div className="estimations-display--container ">
                <RightPannelTitle title={this.props.activeMenu === 'villas' ? 'Rapports d\'évaluations' :
                    this.props.activeMenu === 'appartements' ? 'Rapports d\'évaluations' :
                    'Rapports d\'évaluations'} />
                {this.state.gettingEstimations === false ? (
                    <>{ this.state.displayEstimations.length>0  && (
                 <>
                  <SumUpCardHead transactions={this.props.estimations} nameEntreprise={this.props.user.agence.nameEntreprise} typeEntreprise={this.props.user.agence.nameEntreprise}  locaAgence={this.props.user.agence.localisation} legende={"Estimations récentes"} />       
                       
                        <div className="estimations-display--container-cards estimations-display--container-estimations">
                            {this.props.activeMenu === 'villas' ?(
                                <EstimationCardVilla estimation={this.props.estimations.sort((a, b) => b.date.localeCompare(a.date))} menu ={this.props.activeMenu} detailLinks={true} />
                            )
                            :this.props.activeMenu === 'appartements' ? (
                             
                                // <EstimationCard estimation={this.props.estimations.filter(estimation => estimation.bien === 'appartement').sort((a, b) => b.date.localeCompare(a.date))} menu ={this.props.activeMenu} />
                                <EstimationCardVilla estimation={this.props.estimations.sort((a, b) => b.date.localeCompare(a.date))} menu ={this.props.activeMenu} detailLinks={true} />

                                )
                            : (
                            // <EstimationCard estimation={this.props.estimations.filter(estimation => estimation.bien === 'terrain').sort((a, b) => b.date.localeCompare(a.date))} menu ={this.props.activeMenu} />
                            <EstimationCardVilla estimation={this.props.estimations.sort((a, b) => b.date.localeCompare(a.date))} menu ={this.props.activeMenu} detailLinks={true} />

                            )
                                
                            }
                            
                            
                        </div>
                </>
                )
                       }

                        { (this.state.displayEstimations === null || this.state.displayEstimations.length === 0) && (
                            <NoEstimations type={this.props.activeMenu}/>
                        )}
                    </>
                ) : ("")}
                {this.state.gettingEstimations === true && (
                    <Spinner
                        animation="border"
                        variant="default"
                        size="lg"/>
                )}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        estimations: state.espacePro.estimations,
        activeMenu: state.espacePro.activeMenu,
        user: state.auth
    }
};  
export default connect(mapStateToProps)(Estimations);
