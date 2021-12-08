import React, { Component } from 'react'
import './DemandeRappel.scss'
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import contactForm from "../../../../assets/icons/contactForm.png"
import Spinner from "react-bootstrap/Spinner";


export class DemandeRappel extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    handleClickDetail(){
        this.props.dispatch({ type: 'RESET_ESTIMATION_FILTER'});
        this.props.dispatch({ type: 'SET_ESTIMATION_FILTER', data: false })
        this.props.dispatch({ type: 'SET_PRO_ACCOUNT_ACTIVE_MENU', data: "demandes" })
    }
    render() {
        return (
            <div className="visibilite--container">
                <div className="header--container">
                    <p className="header-text">
                    
                    Formulaire de contact              </p>
                </div>
                <Grid container spaciing={0}>
                    <Grid item md={6} xs={12}>
                        <div className="item--header-container">
                        
                        {/* <i class="fas fa-file-signature contact-icon"></i> */}
                        <img src={contactForm} alt={"contact icon"} />
                        <span className="view--count">{this.props.showContactsMessages ? (
                            this.props.countFormsTransaction) : 
                            (
                                <Spinner animation="border" variant="primary" size="sm"/>

                            )}</span>
                        </div>
                        <div className="item--text-container">
                            <p className="item--text">personnes ont rempli le formulaire à partir d'une consultation de transaction</p>
                        </div>
                        <div className="item--button-container">
                        {this.props.displayButtons ? (

                            <button onClick={()=> this.handleClickDetail()} className="button   button--secondary btn--visibilite">
                                Voir le détail
                            </button>
                        ) : ( "")}
                        </div>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        
                            <div className="item--header-container">
                            
                            {/* <i class="fas fa-file-signature contact-icon"></i> */}
                            <img src={contactForm} alt={"contact icon"} /><span className="view--count">{this.props.showContactsMessages ? 
                            (this.props.countFormsVitrine) : 
                            (
                                <Spinner animation="border" variant="primary" size="sm"/>

                            )}</span>
                            </div>
                            <div className="item--text-container">
                            <p className="item--text">personnes ont repli le formulaire à partir de votre vitrine</p>
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
  
  export default connect(mapStateToProps)(DemandeRappel)
