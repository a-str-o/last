import React, { Component } from 'react'
import './VitrinePhoto.scss'
import { connect } from "react-redux";
import firebase from '../../../Config/FirebaseConfig';
import { toast } from "react-toastify";
import Axios from 'axios'
import Grid from '@material-ui/core/Grid';

export class VitrinePhoto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categorie: 'particulier',
            activite: "-",
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
            cover_image : "",
            progressCover: 0,
            progressLogo : 0,
            curentPassword: "",
            newPassword: "",
            
            descriptionActivite: "",
            emailEntreprise: "",
            countryEntreprise: "",
            cityEntreprise: "",
            addressEntreprise: "",
            postalcodeEntreprise: "",
            phoneEntreprise: "",
            nameEntreprise: "",
            horaires : "",
            loading : true,
            typeEntreprise : ""
            
        };
        this.onImageChange = this.onImageChange.bind(this);
        this.onImageChangeCover = this.onImageChangeCover.bind(this);
        
    }

    // getCompany (){
    //     // const dbStore = firebase.firestore();
    //     // const agenceRef = dbStore.collection("agences");
    //     // const query = agenceRef.where("responsable", "==", this.props.uid)

    //     // query
    //     // .get()
    //     // .then((querySnapshot) =>{
    //         Axios.post('https://us-central1-agenz-website-prod.cloudfunctions.net/api/getAgence',{user_id : this.props.uid}).then(result => {

    //         //    console.log(result.data)
    //             if(result.data.user_image){
    //                 this.setState({
    //                     image: result.data.user_image
    //                 })
    //             }else {
                    
    //                 this.setState({image: "https://firebasestorage.googleapis.com/v0/b/agenz-website-prod.appspot.com/o/images%2F164.png?alt=media&token=285266b5-6f35-42ae-928e-d439bd3bb976"})
    //             }
    //             if(result.data.cover_image){
    //                 this.setState({
    //                     cover_image: result.data.cover_image
    //                 })
    //             }else {
                    
    //                 this.setState({cover_image: "https://firebasestorage.googleapis.com/v0/b/agenz-website-prod.appspot.com/o/images%2F164.png?alt=media&token=285266b5-6f35-42ae-928e-d439bd3bb976"})
    //             }

    //             if(result.data.addressEntreprise){
    //                 this.setState({
    //                     addressEntreprise: result.data.addressEntreprise
    //                 })
    //             }

    //             if(result.data.emailEntreprise){
    //                 this.setState({
    //                     emailEntreprise: result.data.emailEntreprise
    //                 })
    //             }

    //             if(result.data.phoneEntreprise){
    //                 this.setState({
    //                     phoneEntreprise: result.data.phoneEntreprise
    //                 })
    //             }

    //             if(result.data.countryEntreprise){
    //                 this.setState({
    //                     countryEntreprise: result.data.countryEntreprise
    //                 })
    //             }

    //             if(result.data.cityEntreprise){
    //                 this.setState({
    //                     cityEntreprise: result.data.cityEntreprise
    //                 })
    //             }

    //             if(result.data.descriptionActivite){
    //                 this.setState({
    //                     descriptionActivite: result.data.descriptionActivite
    //                 })
    //             }
                

    //             if(result.data.nameEntreprise){
    //                 this.setState({
    //                     nameEntreprise: result.data.nameEntreprise
    //                 })
    //             }

    //             if(result.data.postalcodeEntreprise){
    //                 this.setState({
    //                     postalcodeEntreprise: result.data.postalcodeEntreprise
    //                 })
    //             }
    //             if(result.data.horaires){
    //                 this.setState({
    //                     horaires: result.data.horaires
    //                 })
    //             }

    //             if(result.data.typeEntreprise){
    //                 this.setState({
    //                     typeEntreprise: result.data.typeEntreprise
    //                 })
    //             }
    //             this.setState({loading : false})

    //     })
    //     .catch((error) =>{
    //         this.setState({loading : false})

    //         //console.log("Error getting documents: ", error);
    //     });
        
        
    // }

    onImageChange = event => {
        const db = firebase.storage();

       

        if (event.target.files && event.target.files[0]) {
          let img = event.target.files[0];
          var fileExtension = '.' + img.name.split('.').pop();
          var newName = "profil_" + this.props.uid +`${Date.now()}` + fileExtension;
          const uploadTask = db.ref(`images/${newName}`).put(img);

          uploadTask.on(
            "state_changed",
            snapshot => {
              const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              );

              this.setState({
                  progressLogo: progress
              })
            },
            error => {
                toast.error("Impossible d'enregistrer la photo, veuillez réessayer plus tard")
            },
            () => {
                db
                .ref("images")
                .child(newName)
                .getDownloadURL()
                .then(url => {
                    const dbStore = firebase.firestore();
                    const agenceRef = dbStore.collection("agences");
                    const query = agenceRef.where("responsable", "==", this.props.uid)

                    var data = {}
                    query
                    .get()
                    .then((querySnapshot) =>{

                        if(querySnapshot.docs.length === 0) {
                            agenceRef.add({
                                responsable: this.props.uid,
                                date: new Date().toISOString(),
                                user_image : url,
                            }).catch(error => {
                                //console.log(error)
                            })
                        }else {
                            data.user_image = url;
                            data.responsable = this.props.uid;
                            querySnapshot.forEach((doc) => {
                            doc.ref.update({user_image: url})
                            .then(()=> {
                                this.getCompany()
                        }
                        )
                        .catch((error) =>{
                            toast.error("Impossible de mettre à jour la photo de profil, veuillez réessayer plus tard")
                        });
 
                            })
                            
                            
                            
                        }
                        
                        
                        // this.getCompany()

                        this.setState({
                            progressLogo: 0
                        })
                        toast.success("Photo de profil enregistrée avec succès")
                    })
                    .catch((error) =>{
                        toast.error("Impossible d'enregistrer la photo de profil, veuillez réessayer plus tard")
                    });
                    
            
                });
            }
          );
        }
 
    }

    onImageChangeCover = event => {
        const db = firebase.storage();

       

        if (event.target.files && event.target.files[0]) {
          let img = event.target.files[0];
          var fileExtension = '.' + img.name.split('.').pop();
          var newName = "cover_" + this.props.uid +`${Date.now()}` + fileExtension;
          const uploadTask = db.ref(`images/${newName}`).put(img);

          uploadTask.on(
            "state_changed",
            snapshot => {
              const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              );

              this.setState({
                  progressCover: progress
              })
            },
            error => {
                toast.error("Impossible d'enregistrer la photo de couverture, veuillez réessayer plus tard")
            },
            () => {
                db
                .ref("images")
                .child(newName)
                .getDownloadURL()
                .then(url => {
                    const dbStore = firebase.firestore();
                    const agenceRef = dbStore.collection("agences");
                    const query = agenceRef.where("responsable", "==", this.props.uid)

                    var data = {}
                    query
                    .get()
                    .then((querySnapshot) =>{

                        if(querySnapshot.docs.length === 0) {
                            agenceRef.add({
                                responsable: this.props.uid,
                                date: new Date().toISOString(),
                                cover_image : url,
                            }).catch(error => {
                                //console.log(error)
                            })
                        }else {
                            data.cover_image = url;
                            data.responsable = this.props.uid;
                            querySnapshot.forEach((doc) => {
                                doc.ref.update({cover_image: url})
                                .then(()=>{
                                    this.getCompany()
    
                                }).catch(err => {
                                    console.log(err)
                                    toast.error("Impossible de mettre à jour la photo de couverture, veuillez réessayer plus tard")
                                })
                            })
                           
                           
                            
                        }
                        
                        

                        this.setState({
                            progressCover: 0
                        })
                        toast.success("Photo de couverture enregistrée avec succès")
                    })
                    .catch((error) =>{
                        console.og(error)
                        toast.error("Impossible d'enregistrer la photo de couverture, veuillez réessayer plus tard")
                    });
                    
            
                });
            }
          );
        }
    }

    getCompany (){
        // const dbStore = firebase.firestore();
        // const agenceRef = dbStore.collection("agences");
        // const query = agenceRef.where("responsable", "==", this.props.uid)

        // query
        // .get()
        // .then((querySnapshot) =>{
            Axios.post('https://us-central1-agenz-website-prod.cloudfunctions.net/api/getAgence',{user_id : this.props.uid}).then(result => {

            //    console.log(result.data)
                if(result.data.user_image){
                    this.setState({
                        image: result.data.user_image
                    })
                }else {
                    
                    this.setState({image: "https://firebasestorage.googleapis.com/v0/b/agenz-website-prod.appspot.com/o/images%2F164.png?alt=media&token=285266b5-6f35-42ae-928e-d439bd3bb976"})
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
                this.setState({loading : false})

        })
        .catch((error) =>{
            this.setState({loading : false})

            //console.log("Error getting documents: ", error);
        });
        
        
    }
    uploadImage = () => {
        var element = document.getElementById('im');
    
        element.click();
        }
        uploadImageCover = () => {
            var element = document.getElementById('imCover');
        
            element.click();
            }
            componentDidMount(){
                this.getCompany()
            }

    render() {
        return (
            <div className="account-form">
            <div  className="text-center photo-form">
            <div className="entete--container">
            <div className="header--container">
                <p className="header-text">Photos d'en-tête</p>
            </div>
            <div className="component-text">
            <p className="corpus-text">La photo de votre vitrine est un reflet de votre professionnalisme. Personnalisez-la le plus rapidement possible avec une photo de votre agence (vitrine ou intérieur).</p>
            </div>
            <div className="astuce--container">
                <p className="astuce-text"><span className="astuce-title">Astuce : </span>Pour un rendu optimal, prenez une photo de votre agence avec votre smartphone en position horizontale. La dimension idéale de la photo est de 1136 pixels de largeur et 350 pixels de hauteur.</p>
            </div>
            </div>

                
<Grid container spacing={1}>
<Grid item md={10} s={12}>
                <div className="form-group row">

                <div className="col-12 justify-content photo-couverture--container">
                    <div 
                        onClick = {this.uploadImageCover}
                        className = "display-cover-image"
                    >
                        {this.state.cover_image ? (
                            <img className="coverImage" src={this.state.cover_image} alt="Agence Immobilière casablanca"></img>
                        ): (
                                <div className="empty-image-container">
                            <button className="button button--secondary btn--visibilite">Ajouter une image </button>
                                </div>
                        )
                        }
                    </div>
                    <div className = "input-file">
                        <input type="file" name="myImage" accept="image/*" onChange={this.onImageChangeCover} id="imCover" />
                        <label for="im"><i className ="fas fa-"></i></label>
                    </div>
                    <div className="photo-subtitle--container">
                        <p className="photo-subtitle">
                            Ajoutez une photo de couverture pour l'agence
                        </p>
                    </div>
                </div>

                </div>

                    <div className="form-group row">
                        {
                            this.state.progressCover > 0 ? (
                                <div className="col-12">
                                    <progress value={this.state.progressCover} max= "100" /> 
                                </div>
                            ): ''
                        }
                        

                    </div>


</Grid>
<Grid item md={2} s={12}>
                <div className="form-group row">

                <div className="col-12 justify-content photo-couverture--container">
                    <div 
                        onClick = {this.uploadImage}
                        className = "display-profile-image"
                        style={{backgroundImage: "url("+this.state.image+")"}}
                    >
                    </div>
                    <div className = "input-file">
                        <input type="file" name="myImage" accept="image/*" onChange={this.onImageChange} id="im" />
                        <label for="im"><i className ="fas fa-"></i></label>
                    </div>
                </div>

                <div className="photo-subtitle--container">
                        <p className="photo-subtitle">
                            Ajoutez une photo de profil de l'agence
                        </p>
                    </div>

                </div>

                    <div className="form-group row">
                        {
                            this.state.progressLogo > 0 ? (
                                <div className="col-12">
                                    <progress value={this.state.progressLogo} max= "100" /> 
                                </div>
                            ): ''
                        }
                        

                    </div>

            
</Grid>
</Grid>
{/* <div className="vitrine--link-container">
    <a className="vitrine--link button button-primary primaryyCustom" href={`https://www.agenz.ma/agence-immobiliere/casablanca/${this.props.agence.nameEntreprise ? this.props.agence.nameEntreprise.replace(/\./g, '-').replace(/ /g, '-').replace(/é/g, 'e').replace(/ô/g, 'o'):"agenz"}/a/${this.props.uid}`} target="_blank">Voir ma vitrine</a>
</div>   */}
            
            </div>
        </div>

        )
    }
}
const mapStateToProps = (state) => {
    const uid = state.auth.uid;
    const email = state.auth.email;
    const estimation = state.userEstimation;
    const estimationState = state.estimationState;

    //console.log(state)
    return {
      uid: uid,
      email: email,
      estimation:estimation,
      estimateState: estimationState,
      agence : state.auth.agence
    };
};

export default connect(mapStateToProps)(VitrinePhoto);

