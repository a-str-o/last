import React, { Component } from 'react'
import './Visibilite.scss'
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import Phone from "../../../../assets/icons/phone.png"
import User from "../../../../assets/icons/user.png"
import Spinner from "react-bootstrap/Spinner";

export class Visibilite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showContacts : this.props.showContacts,
            showVitrineViews : this.props.showVitrineViews
        };
    }

    handleClickDetail(){
        this.props.dispatch({ type: 'RESET_ESTIMATION_FILTER'});
        this.props.dispatch({ type: 'SET_ESTIMATION_FILTER', data: false })
        this.props.dispatch({ type: 'SET_PRO_ACCOUNT_ACTIVE_MENU', data: "statistiques" })
    }
    render() {
        return (
            <div className="visibilite--container">
                <div className="header--container">
                    <p className="header-text">
                    
                    Consultations de vos coordonnées de contact                    </p>
                </div>
                <Grid container spaciing={0}>
                    <Grid item md={6} xs={12}>
                        <div className="item--header-container">
                        {/* <i class="fas fa-phone eye--stats"></i> */}
                        <img src={Phone} alt={"phone icon"} /><span className="view--count">{this.props.showContacts ? 
                        (this.props.countPhone+this.props.countMail) : (
                            <Spinner animation="border" variant="primary" size="sm"/>
                        )}</span>
                        </div>
                        <div className="item--text-container">
                            <p className="item--text">personnes ont consulté vos coordonéees mail et téléphone</p>
                        </div>
                        <div className="item--button-container">
                        {this.props.displayButtons ? (
                            <button onClick={()=> this.handleClickDetail()}className="button   button--secondary btn--visibilite">
                                Voir le détail
                            </button>
                        ) : ("")}
                        </div>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        
                            <div className="item--header-container">
                            {/* <i class="fas fa-at mail-stat"></i> */}
                            <img src={User} alt={"user icon"} /> <span className="view--count">{this.props.showVitrineViews ? 
                            (this.props.vitrineViews) : (
                                <Spinner animation="border" variant="primary" size="sm"/>
                            )}</span>
                            </div>
                            <div className="item--text-container">
                            <p className="item--text">personnes ont consulté votre vitrine lors des 30 derniers jours</p>
                            </div>
                            <div className="item--button-container">
                                {this.props.displayButtons ? (
                            <button onClick={()=> this.handleClickDetail()} className="button   button--secondary btn--visibilite">
                            Voir le détail
                            </button>
                            ) : ("")}
                            </div>
                    </Grid>
                </Grid>

                
            </div>
        )
    }
}

const mapStateToProps = (state) => {

    return {

    }
  }; 
  
  export default connect(mapStateToProps)(Visibilite)