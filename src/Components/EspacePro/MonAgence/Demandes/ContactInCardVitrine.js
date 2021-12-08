import React, { Component } from 'react'
import './ContactInCard.scss'
import { connect } from 'react-redux';
import Axios from 'axios'
import { toast } from "react-toastify";

export class ContactInCardVitrine extends Component {
    constructor() {
        super();
          this.state = {
          isFlipped: false,
          dropDown : false,
          hide : [],
          displayPhone : [],
          displayMail : []
          
        };
    }
    askPhone(agence_id,message_id){
        if(this.state.displayPhone.includes(message_id)){
            return;
        }
        else{
        Axios.post("https://us-central1-agenz-website-prod.cloudfunctions.net/api/agenceAskedPhone",{agence_id : agence_id, message_id : message_id})

        this.setState({displayPhone : [...this.state.displayPhone, message_id]})
        }
    }
    askMail(agence_id, message_id){
        if(this.state.displayMail.includes(message_id)){
            return;
        }
        else{
            Axios.post("https://us-central1-agenz-website-prod.cloudfunctions.net/api/agenceAskedMail",{agence_id : agence_id, message_id : message_id})
        this.setState({displayMail : [...this.state.displayMail, message_id]})
        }
    }
    getVisibilite(){
        if(!this.props.visibilite.checked){
        Axios.get("https://us-central1-agenz-website-prod.cloudfunctions.net/api/getContactPhoneMail").then (res => {
            
            this.props.dispatch({type : "SET_CONTACT_PHONE", data : res.data.filter(el => {return el.type==="Phone"})})
            this.props.dispatch({type : "SET_CONTACT_MAIL", data : res.data.filter(el => {return el.type==="Mail"})})
            
        })
        .catch(err => {
            console.log(err)
        })
        Axios.get("https://us-central1-agenz-website-prod.cloudfunctions.net/api/getContactMessages").then (res => {
            
            this.props.dispatch({type : "SET_CONTACT_MESSAGE", data : res.data})            
        })
        .catch(err => {
            console.log(err)
        })
        this.props.dispatch({type : "SET_VISIBILITE_CHECKED"})

    }

    }
    formatDate(isoDate){
       let date = new Date(isoDate);
        let year = date.getFullYear();
        let month = date.getMonth()+1;
        let dt = date.getDate();

        if (dt < 10) {
        dt = '0' + dt;
        }
        if (month < 10) {
        month = '0' + month;
        }

        return(dt+'/'+month+'/'+year);
    }
    deleteMessage(id){
        Axios.post("https://us-central1-agenz-website-prod.cloudfunctions.net/api/deleteContactMessage", {id : id}).then (res => {
            this.setState({hide : [...this.state.hide, id]})
            this.props.dispatch({type : "HIDE_ONE_MESSAGE"})
            toast.success("Message supprimé")
    })
    .catch(err=>{
        toast.error("Impossible de supprimer le message")
    })
}


    componentDidMount(){
        this.getVisibilite()
    }
    render() {
        return (
            <div className="contacts--container">
                {this.props.visibilite.contactMessage.filter(el => {return el.type==="Vitrine"}).map(message => {
                       if (message.display === false || this.state.hide.includes(message.id) ){
                        return ''
                    }
                    return (
                        <>
                
                <div className="contact--header">
                    <p className="header-text">{message.name} vous a contacté via votre vitrine</p>
                    <p className="message--date">{this.formatDate(message.date)}</p>
                </div>
                <div className="contact--message">
                    <p className="message-text">{message.message}</p>
                </div>
                <div className="contact--details">
                <p className={this.state.displayPhone.includes(message.id) ? "contact-phone" : "contact-phone contact-link"} onClick={()=> this.askPhone(message.contributeurId,message.id)}> {this.state.displayPhone.includes(message.id) ? message.phone : 'Afficher le téléphone'}</p>
                    <p className={this.state.displayMail.includes(message.id) ? "contact-mail" : "contact-mail contact-link"} onClick={()=> this.askMail(message.contributeurId,message.id)}> {this.state.displayMail.includes(message.id) ? message.email : 'Afficher l\'email'}</p>
                </div>
                <div className="contact--actions">
                <button className="button button-primary button--secondary btn--contactInCard" onClick={()=> this.deleteMessage(message.id)}>
                                Supprimer
                            </button>                </div>
                            </>
                    )
                            })}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        visibilite: state.espacePro.visibilite,
        
    }
  }; 
  
export default connect(mapStateToProps)(ContactInCardVitrine)
