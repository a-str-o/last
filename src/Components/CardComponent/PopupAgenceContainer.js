import React, { Component } from 'react'
import './PopupContainer.scss'

import logo_agenz_white from '../../assets/img/logo_agenz_white.jpeg'

import { withStyles, createStyles } from '@material-ui/styles';
import "./PopupContainer.scss"





const styles = theme => createStyles({ // change to this
    paperWidthSm:     {
        maxWidth : '90vw',
        width: '90vw',
    height: '90vh',
    backgroundColor: '#f2f3f4'
},
root : {
    marginTop : '0px !important',
    marginBottom : '0px !important'
}
});

export class PopupAgenceContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            moreInfo : false,
            name : null,
            email : null,
            nameError : null, 
            emailError : null,
            phoneError : null,
            phone : null, 
            message : "Bonjour, j'ai un projet de vente et je souhaite prendre rendez-vous pour faire estimer mon bien. Merci.",

        }
    }

    
    

    
    render() {
        
        return (
       <>
       <div className="popup--container">
                <div className="images--container">
                <div className="image-agence-container">
                { this.props.user_image && this.props.images!=="null" ?  (
                                           
                                               <img className="agence--user-image" src={this.props.user_image} alt="agence immobilière Casablanca"/>
                ) :
                (                              <img className="agence--user-image"  src={logo_agenz_white} alt="agence immobilière Casablanca"/>)
    }
                                           </div>
     
                
                </div>
                <div className="info--container">
                <div className="info--display" id="popup-transactions" >
                                    <p class="consistance"> {this.props.nameEntreprise} </p>
                                    <div className="polygone-price">
                                        </div>
                                        <div>
                                        <a class="agence--added" href={`https://agenz.ma/agence-immobiliere/casablanca/${this.props.nameEntreprise.replace(/\./g, '-').replace(/ /g, '-').replace(/é/g, 'e').replace(/ô/g, 'o')}/a/${this.props.contributeurId}`} target="_blank" rel="noreferrer" > Voir la vitrine </a>
                                        </div>
                                        <div >
                                        <p class="date--vente">{this.props.countTransactions} ventes ajoutées </p>
                                        </div>
                                    </div>
                </div>


                
            </div>
       
       </>
       )
    }
}

export default withStyles(styles)(PopupAgenceContainer)
