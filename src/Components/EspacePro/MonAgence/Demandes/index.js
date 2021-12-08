import React, { Component } from 'react'
import "./Demandes.scss"
import DemandeRappel from '../Tableau/DemandeRappel'
import DetailsDemandes from "./DetailsDemandes"
import { connect } from 'react-redux';
import Axios from 'axios'

export class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
          visibilite : {}
        }
        
    }
    getVisibilite(){
        if(!this.props.visibilite.checked){
        Axios.get("https://us-central1-agenz-website-prod.cloudfunctions.net/api/getContactPhoneMail").then (res => {
            
            this.props.dispatch({type : "SET_CONTACT_PHONE", data : res.data.filter(el => {return el.type==="Phone"})})
            this.props.dispatch({type : "SET_CONTACT_MAIL", data : res.data.filter(el => {return el.type==="Mail"})})
            this.setState({showContacts : true})

            
        })
        .catch(err => {
            console.log(err)
            this.setState({showContacts : true})

        })
        Axios.get("https://us-central1-agenz-website-prod.cloudfunctions.net/api/getContactMessages").then (res => {
            
            this.props.dispatch({type : "SET_CONTACT_MESSAGE", data : res.data})     
            this.setState({showContactsMessages : true})  
       
        })
        .catch(err => {
            console.log(err)
            this.setState({showContactsMessages : true})  

        })
        Axios.post("https://us-central1-agenz-website-prod.cloudfunctions.net/api/vitrineViews",{
            url  : `/agence-immobiliere/casablanca/${this.props.agence.nameEntreprise ? this.props.agence.nameEntreprise.replace(/\./g, '-').replace(/ /g, '-').replace(/é/g, 'e').replace(/ô/g, 'o'):"agenz"}/a/${this.props.uid}`
        }).then (res => {
            
            this.props.dispatch({type : "SET_VITRINE_VIEWS", data : res.data.views})     
            this.setState({showVitrineViews : true})          
       
        })
        .catch(err => {
            console.log(err)
            this.setState({showVitrineViews : true})          

        })
        this.props.dispatch({type : "SET_VISIBILITE_CHECKED"})

    }
    else {
        this.setState({showVitrineViews : true, showContactsMessages : true, showContacts : true})

    }

    }
    componentDidMount(){
        this.getVisibilite()
    }
    render() {
        return (
            <div className="estimations-display--container">
                                            <div className="right-pannel-title">
                                            <div className="title--container">
                    <h5 className="agence--title">Vos demandes de contact</h5>
                    </div>
                </div>
                <DemandeRappel showContactsMessages={this.state.showContactsMessages} displayButtons={false} countFormsTransaction={this.props.visibilite.contactMessage.filter(el => {return el.type==="Transaction"}).length} countFormsVitrine={this.props.visibilite.contactMessage.filter(el => {return el.type==="Vitrine"}).length}/>
                <DetailsDemandes countFormsTransaction={this.props.visibilite.contactMessage.filter(el => {return el.type==="Transaction"}).length} countFormsVitrine={this.props.visibilite.contactMessage.filter(el => {return el.type==="Vitrine"}).length}/>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        agence : state.auth.agence,
        uid: state.auth.uid,
        visibilite: state.espacePro.visibilite,
        
    }
  }; 
  
  export default connect(mapStateToProps)(index)
