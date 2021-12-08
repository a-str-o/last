import React, { Component } from 'react';
import './AgenceComponent.scss';
import Axios from 'axios'
import { toast } from "react-toastify";
import Grid from '@material-ui/core/Grid';
import AgenceDescriptionComponent from './AgenceDescriptionComponent'
import AgenceContact from './AgenceContact';
import AgenceMap from './AgenceMap';
import { css } from "@emotion/core";
import {Helmet} from 'react-helmet'
import TransactionCard from '../EspacePro/Transactions/components/TransactionCard'


import BeatLoader from "react-spinners/BeatLoader";
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
class AgenceComponent extends Component {
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
            horaires : "",
            cover_image : "",
            
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
            transactions : [],
            transactionLoading : true,
            typeEntreprise : "",
            localisation : ""
        }
    }



    getAgence () {
        return new Promise((resolve,reject)=> {
        const uid = window.location.href.replace(window.location.origin + '/agence-immobiliere-casablanca/', '').split('/a/')[1].split('?')[0];
        Axios.post('https://us-central1-agenz-website-prod.cloudfunctions.net/api/getAgence',{ user_id: uid }).then(result => {
                if(result.data.user_image){
                    this.setState({
                        image: result.data.user_image
                    })
                }
                if(result.data.cover_image){
                    this.setState({
                        cover_image: result.data.cover_image
                    })
                }else {
                    
                    this.setState({cover_image: "https://firebasestorage.googleapis.com/v0/b/agenz-website-prod.appspot.com/o/images%2F164.png?alt=media&token=285266b5-6f35-42ae-928e-d439bd3bb976"})
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
                if(result.data.localisation){
                    this.setState({
                        localisation: result.data.localisation
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
                if(result.data.transactions){
                    this.setState({
                        transactions: result.data.transactions
                    })
                }
                if(result.data.horaires){
                    this.setState({
                        horaires: result.data.horaires
                    })
                }
                if(result.data.typeEntreprise){
                    this.setState({
                        typeEntreprise: result.data.typeEntreprise
                    })
                }
                resolve(result.data)
                })
        .catch((error) =>{
            toast.error("Impossible de récupérer les données de l'Agence")
            console.log("Error getting documents: ", error);
            reject(error)
        });
    })

        
    }

    async getEstimations(uid) {
    
        Axios.post('https://us-central1-agenz-website-prod.cloudfunctions.net/api/countEstimations',{ user_id: uid }).then(result => {
            // console.log(result.data)
        this.setState({nombreEstimation: result.data})
    })
    .catch(err => {
        console.log(err)
    })
}

    async getTransactions(uid) {
        Axios.post('https://us-central1-agenz-website-prod.cloudfunctions.net/api/countTransactions',{ user_id: uid }).then(result => { 
        this.setState({nombreTransaction: result.data.nombre, transactions : result.data.vente, transactionLoading : false})
    }).catch(err => {
        toast.error("Impossible de récupérer les transactions récentes. Veuillez réessayer plus tard")
        this.setState({transactionLoading : false})

    })
    }

    componentDidMount() {
        this.getAgence().then(async (result) => {
            const uid = window.location.href.replace(window.location.origin + '/agence-immobiliere-casablanca/', '').split('/a/')[1].split('?')[0];
            this.setState({agenceId : uid})
            await this.getEstimations(uid);
            await this.getTransactions(uid);
            this.setState({loading : false})
        })
        .catch(err=>{
            console.log(err)
            toast.error("Impossible de récupérer les donnée de l'entreprise. Veuillez actualiser la page ou réessayer plus tard")
            // this.props.history.push("/")
        })
    }
    render() {
       
        return (
            <>
            <Helmet> 
            <title>{this.state.nameEntreprise}</title>
            <meta name="description" content={`Les meilleurs agences immobilières pour vendre ou acheter un bien immobilier en toute confiance sont sur agenz.ma ${this.state.descriptionActivite}`} />
 </Helmet>  
            <>
            {this.state.loading ? (
                <div className="agence--loader">
        <BeatLoader color='#2ea7f9' loading={true} css={override} size={15} />
        </div>) : (
            <>
            <div className = "agencePage">
            <div className="agencePage--container">
            <Grid container md={12} spacing={1}>
                <Grid item md={12} s={12}>
                {this.state.image ? (
                                        <div className = "agence--image-conver">
                                <div 
                                    className = "agence-cover-image"
                                    style={{backgroundImage: "url("+this.state.cover_image+")"}}>
                                </div>      
                                                                      </div>
                                    ) : ''
                                }
                                
                </Grid>
                <Grid item md={8} s={12}>
                    <AgenceDescriptionComponent responsable={this.state.agenceId} phone={this.state.phoneEntreprise} typeEntreprise={this.state.typeEntreprise} horaires={this.state.horaires} name={this.state.nameEntreprise} adresse={this.state.addressEntreprise} transactions={this.state.nombreTransaction} email={this.state.emailEntreprise} description={this.state.descriptionActivite} image={this.state.image} />
                </Grid>
                <Grid item md={4} s={12}>
                    <AgenceContact nameEntreprise={this.state.nameEntreprise} contributeur={this.state.emailEntreprise} id={this.state.agenceId}/>
                </Grid>
                <Grid item md={8} s={12}>
                    {this.state.transactionLoading ? (
                                        <div className="agence--loader">
                                        <BeatLoader color='#2ea7f9' loading={true} css={override} size={15} />
                                        </div>
                    ) : (
                        <>
                    <AgenceMap displayMapLink={false} nameEntreprise={this.state.nameEntreprise} typeEntreprise={this.props.typeEntreprise} transactions={this.state.transactions} locaAgence={this.state.localisation} />
                    <TransactionCard 
                    responsable={this.state.agenceId}
                    phoneEntreprise={this.state.phoneEntreprise} 
                    nameEntreprise={this.state.nameEntreprise}
                    emailEntreprise={this.state.emailEntreprise} 
                    user_image={this.state.image}
                    descriptionActivite={this.state.descriptionActivite}
                    detailLinks={false} 
                    transaction={this.state.transactions}
                    venduLabel={true}
                    popupLink={true} />
                    </>
                    )}

                </Grid>

            </Grid>
            </div>


        </div>
       </>
        )}
        </>
           </>
        );
    }
}

export default AgenceComponent;
