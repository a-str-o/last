import React from 'react';
import './OffresProTimeline.scss';


import firebase from '../../Config/FirebaseConfig';
import { connect } from "react-redux";
import Grid from '@material-ui/core/Grid';

import estimation from './agence-demo-agenz.png';


import offres_pro_background from './agence-immobiliere-agenz.png';
import PartenairesCitations from "./PartenairesCitations/PartenairesCitations"
import Caddre from './box/box'
import OffresProInscription from './OffresProInscription'

import YouTube from 'react-youtube';
import VideoDescriptionBloc from './VideoDescriptionBloc'
import PackProExpert from '../../assets/img/PackExpert.png'
class  OffresProTimeline extends React.Component {

    constructor (props){
        super(props);

        this.state = {
            open: false,
            name : "",
            email : "",
            number : "",
            activite : "",
        };
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        });
    };

    validateDetails () {
        var errorFound = false;

        if (
            this.state.name === "" ||
            this.state.email === "" ||
            this.state.activite === "" ||
            this.state.number === ""
        ) {
            this.props.dispatch({type: 'CONTACT_FIELDS_REQUIRED_ERROR'});

            errorFound = true;
        }

        return errorFound;
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        
        const error = this.validateDetails();
        if (error) {
            
            return;
        }


        const db = firebase.firestore();
        //Add estimation to firestore
        db.collection("agenzpro")
        .add({
            email: this.state.email,
            job : this.state.activite,
            name : this.state.name,
            phone : this.state.number,
            date : new Date().toISOString()
        })
        .then(()=>{
            this.props.dispatch({type: 'PRO_REGISTERING_SUCCESS'});
           this.closeModal();
        }).catch((err) =>{
            console.log(err)
            this.props.dispatch({type: 'PRO_REGISTERING_ERROR'});
        })
    };

    closeModal = () => {
        this.setState({open: !this.state.open})
    }

    render () {
        const opts = {
            height: '390',
            width: '640',
            playerVars: {
              autoplay: 0,
            },
          };
        return (
          <div className="offres-pro-timeline-conatiner contai">
              <div className="header--background--container">
                <div className="header-background" style={{backgroundImage : `linear-gradient(rgb(0 0 0 / 30%), rgb(0 0 0 / 30%)), url(${offres_pro_background})`}}>
                <div className="header--row">
                <div className="header--title-container">
                    <div className="header--title-inner">
                        <h1 className="header--title">La meilleure solution de prospection pour votre agence</h1>
                    </div>
                </div>
                </div>
                </div>
                </div>
                <OffresProInscription />
                <div className="op-title-container">
                    <div className="op-title--iner">
                        <h1 className="op-title-text">
                            Une solution à chaque étape, jusqu'au mandat 
                        </h1>
                    </div>
                </div>
                <div className="boxes--container">
                    <Grid container spacing={10}>
                        <Grid item xs={12}>
                        <Grid container spacing={4}>
                        <Grid item xs={12} md={6}>
                        <Caddre title={"Packs Pro Essentiel"} description={"L'outil indispensable pour la visibilité de votre agence"} knowmorelink={"/packs-pro-essentiel"} img_src={estimation} img_alt={"Gagnez en mandat agence immobilière"}/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                    <Caddre title={"Packs Pro Expert"} description={"Gagnez du temps et des mandats de ventes"} knowmorelink={"/packs-pro-expert"} img_src={PackProExpert} img_alt={"Gagnez en mandat agence immobilière"}/>
                    </Grid>

                        </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <div className="title-op--container">
                                <div className="title-op--inner">
                                    <h2 className="title-op">Recevez des rendez-vous d'évaluations avec des vendeurs qualifiés</h2>
                                </div>
                            </div>
                        </Grid>
 
                        <Grid item xs={12}>
                        <Grid container spacing={4}>

                    <Grid item xs={12} md={6}>
                        <VideoDescriptionBloc />
                    </Grid>           
                    <Grid item xs={12} md={6}>
                        <div className="offre-pro-video--container">
                        <YouTube videoId="N7VZEOLlF_Q" opts={opts} onReady={this._onReady} />
                        </div>
                    </Grid> 
                    </Grid>
                    </Grid>
      
                    </Grid>
                    </div>

                
                <div>   
                </div>
                <PartenairesCitations />
       </div>
        );
    }
    
}

const mapStateToProps = (state) => {
    const uid = state.auth.uid;
    return {
      uid: uid
    };
};

export default connect(mapStateToProps)(OffresProTimeline);
