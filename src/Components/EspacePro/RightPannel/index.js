import React from 'react';
import { connect } from "react-redux";
import Xplorer from './../Xplorer';
import { CSSTransition } from 'react-transition-group';
import './style.scss';
import Estimations from '../Estimations';
import Transactions from '../Transactions';
import ParametresPro from '../ParametresPro';
import Vitrine from '../Vitrine';

import TransactionStepper from '../../AddTransaction/TransationStepper';
import Dossiers from '../Dossiers';
import Aide from '../Aide';
import Tableau from '../MonAgence/Tableau'
import Statistiques from '../MonAgence/Statistiques'
import Demandes from '../MonAgence/Demandes'

class RightPannel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="rightPannelPro">
                                <CSSTransition
                    appear={true}
                    unmountOnExit
                    in={this.props.activeMenu === 'aide'}
                    timeout={200}
                    classNames="menuProTransition">
                    <Aide />
                </CSSTransition>
                                <CSSTransition
                    appear={true}
                    unmountOnExit
                    in={this.props.activeMenu === 'dossiers'}
                    timeout={200}
                    classNames="menuProTransition">
                    <Dossiers detailLinks={true} />
                </CSSTransition>
                <CSSTransition
                    appear={true}
                    unmountOnExit
                    in={this.props.activeMenu === 'xplorer'}
                    timeout={200}
                    classNames="menuProTransition">
                    <Xplorer />
                </CSSTransition>
                <CSSTransition
                    appear={true}
                    unmountOnExit
                    in={this.props.activeMenu === 'villas'}
                    timeout={200}
                    classNames="menuProTransition">
                    <Estimations />
                </CSSTransition>
                <CSSTransition
                    appear={true}
                    unmountOnExit
                    in={this.props.activeMenu === 'appartements'}
                    timeout={200}
                    classNames="menuProTransition">
                    <Estimations />
                </CSSTransition>
                <CSSTransition                    appear={true}
                    unmountOnExit
                    in={this.props.activeMenu === 'terrainsnus'}
                    timeout={200}
                    classNames="menuProTransition">
                    <Estimations />
                </CSSTransition>
                <CSSTransition
                    appear={true}
                    unmountOnExit
                    in={this.props.activeMenu === 'transactions'}
                    timeout={200}
                    classNames="menuProTransition">
                    <Transactions />
                </CSSTransition>
                <CSSTransition
                    appear={true}
                    unmountOnExit
                    in={this.props.activeMenu === 'params'}
                    timeout={200}
                    classNames="menuProTransition">
                    <ParametresPro />
                </CSSTransition>
                <CSSTransition
                    appear={true}
                    unmountOnExit
                    in={this.props.activeMenu === 'addtransactions'}
                    timeout={200}
                    classNames="menuProTransition">
                    <TransactionStepper />
                </CSSTransition>
                <CSSTransition
                    appear={true}
                    unmountOnExit
                    in={this.props.activeMenu === 'vitrine'}
                    timeout={200}
                    classNames="menuProTransition">
                    <Vitrine />
                </CSSTransition>
                <CSSTransition
                    appear={true}
                    unmountOnExit
                    in={this.props.activeMenu === 'tableau'}
                    timeout={200}
                    classNames="menuProTransition">
                    <Tableau />
                </CSSTransition>
                <CSSTransition
                    appear={true}
                    unmountOnExit
                    in={this.props.activeMenu === 'statistiques'}
                    timeout={200}
                    classNames="menuProTransition">
                    <Statistiques />
                </CSSTransition>
                <CSSTransition
                    appear={true}
                    unmountOnExit
                    in={this.props.activeMenu === 'demandes'}
                    timeout={200}
                    classNames="menuProTransition">
                    <Demandes />
                </CSSTransition>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        activeMenu: state.espacePro.activeMenu
    }
};  
export default connect(mapStateToProps)(RightPannel);