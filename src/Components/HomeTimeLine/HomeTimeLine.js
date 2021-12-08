import React from 'react';
import './HomeTimeLine.scss';
import { Link } from 'react-router-dom';
import firebase from '../../Config/FirebaseConfig';
import { connect } from "react-redux";
import Presse from "./Presse"


import Typography from '@material-ui/core/Typography';
import {ThemeProvider} from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Box from "@material-ui/core/Box";

import {theme} from '../../assets/theme'
// import couple_ordinateur from '../../assets/img/Image EDM.png';
// import estimation_img from '../../assets/img/estimation_new.png'


import carte_prix_xixi32_c_scale_w_310 from '../../assets/img/Carte_Prix/carte_prix_xixi32_c_scale_w_310.png'
import carte_prix_xixi32_c_scale_w_638 from '../../assets/img/Carte_Prix/carte_prix_xixi32_c_scale_w_638.png'
import carte_prix_xixi32_c_scale_w_783 from '../../assets/img/Carte_Prix/carte_prix_xixi32_c_scale_w_783.png'



import estimation_new_hc1oax_c_scale_w_350 from '../../assets/img/estimation_new/estimation_new_hc1oax_c_scale_w_350.png'
import estimation_new_hc1oax_c_scale_w_910 from '../../assets/img/estimation_new/estimation_new_hc1oax_c_scale_w_910.png'
import estimation_new_hc1oax_c_scale_w_1480 from '../../assets/img/estimation_new/estimation_new_hc1oax_c_scale_w_1480.png'
// import carte_prix from '../../assets/img/carte-prix.png'


import choisir_agences_immobilieres_min_y3ewm6_c_scale_w_200 from '../../assets/img/choisir-agence/choisir-agences-immobilieres-min_y3ewm6_c_scale,w_200.png'
import choisir_agences_immobilieres_min_y3ewm6_c_scale_w_971 from  '../../assets/img/choisir-agence/choisir-agences-immobilieres-min_y3ewm6_c_scale,w_971.png'
import choisir_agences_immobilieres_min_y3ewm6_c_scale_w_1400 from '../../assets/img/choisir-agence/choisir-agences-immobilieres-min_y3ewm6_c_scale,w_1400.png'


class  HomeTimeLine extends React.Component {

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
        // //console.log(this.state);
        
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
            // console.log(err)
            this.props.dispatch({type: 'PRO_REGISTERING_ERROR'});
        })
    };

    closeModal = () => {
        this.setState({open: !this.state.open})
    }

    render () {

        return (

        

<ThemeProvider theme={theme}>
    <div className="home--timeline">
     <Grid container spacing={8} justify="center" className="gridOffresPro">

                                <Grid item md={6} s={12} >
                                    <div className="home--text-container-left"> 
                                <h3>Estimer un bien</h3> 
                                <Typography variant="body1"> Estimez le prix actuel d'un bien immobilier à partir de ses caractéristiques et du marché local, en moins de deux minutes
                                 </Typography>
                                 <div className="time-line-section-button text-left">
                                    <Link to='/estimation'>
                                    <button className="button button-primary button--secondary">
                                        Estimer
                                    </button>
                                    </Link>
                                </div>
                                </div>
</Grid>

<Grid item md={6} s={12}>
                            <div className="img--frame">
                        {/* <img src={estimation_img} alt="Estimation et prix de l'immobilier à Casablanca" className="img--offres-pro"/> */}
                        <img
className="img--offres-pro"
sizes="(max-width: 400px) 400px,
(max-width: 760px) 1000px, 1480px"
srcSet={`
${estimation_new_hc1oax_c_scale_w_350} 350w,
${estimation_new_hc1oax_c_scale_w_910} 910w,
${estimation_new_hc1oax_c_scale_w_1480} 1480w`}
src={estimation_new_hc1oax_c_scale_w_1480}
alt="Estimation et prix de l'immobilier à Casablanca"></img>
                        </div>


</Grid>
<Box clone order={{ md: 4 }}>

<Grid item md={6} s={12} >
<div className="home--text-container-right">

                                <h3>Choisir une agence immobilière</h3> 
                                <Typography variant="body1">Choisissez votre agence immobilière, parmis les plus performantes et les plus professionnelles, pour vous accompagner efficacement et en toute transparence dans votre projet.
                                 </Typography>
                                 <div className="time-line-section-button text-left">

                                 <Link to='/prix-immobilier'>
                                    <button className="button button-primary button--secondary">
                                        Trouver votre agence
                                    </button>
                                    </Link>
                                    </div>
</div>
</Grid>
</Box>
<Box clone order={{ md: 3 }}>

<Grid item md={6} s={12}>
                            <div className="img--frame">
                        {/* <img src={couple_ordinateur} alt="Estimation et prix de l'immobilier à Casablanca" className="img--offres-pro"/> */}

                        <img
                        className="img--offres-pro"
sizes="(max-width: 1290px) 100vw, 1290px"
srcset={`
${choisir_agences_immobilieres_min_y3ewm6_c_scale_w_200} 310w,
${choisir_agences_immobilieres_min_y3ewm6_c_scale_w_971} 638w,
${choisir_agences_immobilieres_min_y3ewm6_c_scale_w_1400} 783w`}
src={choisir_agences_immobilieres_min_y3ewm6_c_scale_w_200}
alt="Choisir une agence immobilière"></img>
                        </div>


</Grid>      
</Box>


<Box clone order={{ md: 5 }}>

<Grid item md={6} s={12} >
<div className="home--text-container-left">

                                <h3>
Prix de l’immobilier</h3> 
                                <Typography variant="body1">Retrouvez les prix de l’immobilier de votre quartier sur notre carte dynamique des prix, enrichie et mise à jour quotidiennement
                                 </Typography>
                                 <div className="time-line-section-button text-left">
                                    <Link to='/prix-immobilier'>
                                    <button className="button button-primary button--secondary">
                                        Carte des prix
                                    </button>
                                    </Link>
                                </div>
</div>
                               
</Grid>
</Box>
<Box clone order={{ md: 6 }}>

<Grid item md={6} s={12}>
                            <div className="img--frame">
                        {/* <img src={carte_prix} alt="carte-prix" className="img--offres-pro"/> */}
                        <img
                        className="img--offres-pro"
sizes="(max-width: 783px) 100vw, 783px"
srcset={`
${carte_prix_xixi32_c_scale_w_310} 310w,
${carte_prix_xixi32_c_scale_w_638} 638w,
${carte_prix_xixi32_c_scale_w_783} 783w`}
src={carte_prix_xixi32_c_scale_w_783}
alt="Prix de l'immobilier à Casablanca"></img>
                        </div>

                     
</Grid>
</Box>

                </Grid>
                <Presse />
                </div>
        </ThemeProvider>
        );
    }
    
}

const mapStateToProps = (state) => {
    const uid = state.auth.uid;
    return {
      uid: uid
    };
};

export default connect(mapStateToProps)(HomeTimeLine);
