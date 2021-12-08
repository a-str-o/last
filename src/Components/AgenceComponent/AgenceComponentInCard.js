import React, { Component } from 'react';


import './AgenceComponent.scss';
import Grid from '@material-ui/core/Grid';
import Axios from 'axios'
import {connect} from "react-redux";
import './AgenceComponentInCard.scss' 

class AgenceComponentInCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            estimation : {},
            firstName: "",
            lastName: "",
            phone: "",
            fonction: "",
            email: "",
            country: "",
            city: "",
            address: "",
            postalcode: "",
            image: "",
            
            descriptionActivite: "",
            emailEntreprise: "",
            countryEntreprise: "",
            cityEntreprise: "",
            addressEntreprise: "",
            postalcodeEntreprise: "",
            phoneEntreprise: "",
            nameEntreprise: "",
            nombreEstimation : 0,
            nombreTransaction: 0,
            displayPhone : false,
            displayMail : false
        }
    }

    getAgence () {
        const uid = window.location.href.replace(window.location.origin + '/agences/', '');

        Axios.post('https://us-central1-agenz-website-prod.cloudfunctions.net/api/getAgence',{ user_id: uid }).then(result => {
                if(result.data.user_image){
                    this.setState({
                        image: result.data.user_image
                    })
                }

                if(result.data.addressEntreprise){
                    this.setState({
                        addressEntreprise: result.data.addressEntreprise
                    })
                }

                if(result.data.emailEntreprise){
                    this.setState({
                        emailEntreprise: result.data.emailEntreprise
                    })
                }

                if(result.data.phoneEntreprise){
                    this.setState({
                        phoneEntreprise: result.data.phoneEntreprise
                    })
                }

                if(result.data.countryEntreprise){
                    this.setState({
                        countryEntreprise: result.data.countryEntreprise
                    })
                }

                if(result.data.cityEntreprise){
                    this.setState({
                        cityEntreprise: result.data.cityEntreprise
                    })
                }

                if(result.data.descriptionActivite){
                    this.setState({
                        descriptionActivite: result.data.descriptionActivite
                    })
                }
                

                if(result.data.nameEntreprise){
                    this.setState({
                        nameEntreprise: result.data.nameEntreprise
                    })
                }

                if(result.data.postalcodeEntreprise){
                    this.setState({
                        postalcodeEntreprise: result.data.postalcodeEntreprise
                    })
                }
                })
        .catch((error) =>{
            console.log("Error getting documents: ", error);
        });
        
    }
   askPhone(){
       this.setState({displayPhone : true})
    //    Axios.post('https://us-central1-agenz-website-prod.cloudfunctions.net/api/addContactPhone',{ user_id: this.props.uid, location : "Carte", transaction : this.props.transaction, agence : this.props.nameEntreprise})
       Axios.post('https://us-central1-agenz-website-prod.cloudfunctions.net/api/addContactPhoneMail',{ user_id: this.props.uid, location : "Carte", transaction : this.props.transaction, address : this.props.selectedAddress, agence : this.props.agence.nameEntreprise, responsable : this.props.agence.responsable,type : "Phone", date : new Date().toISOString()})
   }
   askMail(){
    this.setState({displayMail : true})
    Axios.post('https://us-central1-agenz-website-prod.cloudfunctions.net/api/addContactPhoneMail',{ user_id: this.props.uid, location : "Carte", transaction : this.props.transaction, address : this.props.selectedAddress, agence : this.props.agence.nameEntreprise, responsable : this.props.agence.responsable, type : "Mail", date : new Date().toISOString()})

}
    componentDidMount() {

    }
    render() {
       
        return (
            <div className = "agencePage">
                <div className = "container">
                        <div className = "row">
                            <div className ="">
                                
                                <div className = "agenceContainer">
                                    <div className = "agenceProfile">
                                        {this.props.agence.user_image ? (
                                            <div className = "agenceImage" style={{backgroundImage: "url("+this.props.agence.user_image+")"}} ></div>
                                        ) : ''
                                    }
                                    

                                    
                                    <div className = "agenceInformationsDetails">
                                        <Grid container spacing={3}>
                                                <>
                              <Grid item md={12} lg={12} xs={12}>
                              <p className={!this.state.displayMail ?  "ask--contact ask--mail" : "ask--contact"} onClick={()=> {this.askMail()}}> <i class="fas fa-at"></i>{" "}{this.state.displayMail ? this.props.agence.emailEntreprise : "Afficher l'adresse mail"}</p>

                                </Grid>
                                <Grid item md={12} lg={12} xs={12}>

                                <p className={!this.state.displayPhone ? "ask--contact ask--phone" : "ask--contact"} onClick={()=> {this.askPhone()}}><i class="fas fa-phone-alt"></i>{" "}{this.state.displayPhone ? this.props.agence.phoneEntreprise : (    "Afficher le téléphone")}</p>

                                </Grid>
                                        
       </> </Grid>
                                        <div className = "description">

                                            <p>
                                                {this.props.agence.descriptionActivite}
                                            </p>
                                        </div>


                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>

            </div>
           
        );
    }
}
const mapStateToProps = (state) => {
    return {
        uid : state.auth.uid
    };
};
export default connect(mapStateToProps)(AgenceComponentInCard);

