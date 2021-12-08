import React, { Component } from 'react';
import './AgenceComponent.scss';
import Grid from '@material-ui/core/Grid';
import NumberDisplay from './NumberDiplay'
import './AgenceDescriptionComponent.scss'
import * as Scroll from 'react-scroll';
import Axios from "axios";
import { connect } from "react-redux";

class AgenceDescriptionComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayPhone : false,
            displayMail : false

    }
}
askPhone(){
    this.setState({displayPhone : true})
 //    Axios.post('https://us-central1-agenz-website-prod.cloudfunctions.net/api/addContactPhone',{ user_id: this.props.uid, location : "Carte", transaction : this.props.transaction, agence : this.props.nameEntreprise})
    Axios.post('https://us-central1-agenz-website-prod.cloudfunctions.net/api/addContactPhoneMail',{ user_id: this.props.user.uid, location : "Vitrine", transaction : "", agence : this.props.name, responsable : this.props.responsable, type : "Phone", date : new Date().toISOString()})
}
askMail(){
 this.setState({displayMail : true})
 Axios.post('https://us-central1-agenz-website-prod.cloudfunctions.net/api/addContactPhoneMail',{ user_id: this.props.user.uid, location : "Vitrine", transaction : "", agence : this.props.name, responsable : this.props.responsable, type : "Mail", date : new Date().toISOString()})
}
    scrollTo(){
        Scroll.animateScroll.scrollToBottom()
    }

    componentDidMount() {

    }
    render() {
       
        return (
                <Grid container spacing={1}> 
                    <Grid item md={10} s={12}>
                    <h1 className="agence--name">{this.props.name}</h1>
                    <h2 className="firm--type">{this.props.typeEntreprie !=="" ? this.props.typeEntreprise : 'Agence Immobilière'}</h2>
                    <span className="vente-scroll-link" onClick={()=>{this.scrollTo()}}><NumberDisplay number={this.props.transactions} /> <span>ventes {this.props.typeEntreprie !== "" ? 'récentes' : 'renseignées'}</span></span>
                    <hr></hr>
                    <div className="firm-business-details">
                    <p className="firm--addresse"> <i class="fas fa-map-marker-alt"></i>{" "}{this.props.adresse}</p>
                    <p className={!this.state.displayPhone ?  "firm--phone ask--contact ask--phone" : "ask--contact"} onClick={()=> {this.askPhone()}}> <i class="fas fa-phone-alt"></i>{" "}{this.state.displayPhone ? this.props.phone : "Afficher le téléphone"}</p>
                    <p className={!this.state.displayMail ?  "firm--email ask--contact ask--mail" : "ask--contact"} onClick={()=> {this.askMail()}}> <i class="fas fa-at"></i>{" "}{this.state.displayMail ? this.props.email : "Afficher l'adresse mail"}</p>
                    <p className="firm--hours"><i class="far fa-clock"></i> {" "}{this.props.horaires !== "" && this.props.horaires? this.props.horaires : 'Non renseignées'}</p>
                    </div>
                    <div className="firm-description--container">
                        <p className="firm-description">
{this.props.description}                        </p>
                    </div>
                    </Grid>
                    <Grid item md={2} s={12}>
                        <img className="logo--agence" src={this.props.image} alt="agence immobilière à Casablanca" />
                    </Grid>
                </Grid>
        )

}
}
const mapStateToProps = (state) => {
    return {
        user : state.auth,
        authenticated : state.auth.authenticated
    };
};
export default connect(mapStateToProps)(AgenceDescriptionComponent);
