
import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import './imageUpload.scss'
import Grid from '@material-ui/core/Grid';
import firebase from './../../../Config/FirebaseConfig';
import { connect } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import { toast } from "react-toastify";
import CheckIcon from '@material-ui/icons/Check';
const generateID = () => {
  let length = 3,
  charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
  retVal = "";
  for (let i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal + new Date().getTime();
}


class ImageUpload extends Component {
  constructor() {
    super();

    this.state = {
      files: [],
      uploading : false,
      remaining : -1,
      photosValidees : false
    };
  }

  onDrop = (files) => {
    let stateFiles = files.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file),
            key : generateID()
          }));
          let currentState = this.state.files
      this.setState({files : stateFiles.concat(currentState)})
      this.props.dispatch({type : "PRO_SET_IMAGES_ADDED"})

      
    };
    validateImages= () =>{
        const db = firebase.storage();
        if(this.state.files.length < 6) {
            if( this.state.files.length <= 5) {
                this.setState({remaining : this.state.files.length})
                this.setState({photosValidees : true})
                let images = []
                for(let i=0; i<this.state.files.length; i++){
                    let img = this.state.files[i];
                    var fileExtension = '.' + img.name.split('.').pop();
                    var newName = new Date().getTime()+`-${i}-` + fileExtension;
                    //console.log(newName)
                    db.ref(`${this.props.folder}/${newName}`).put(img)
                    .then(data=>{
                        data.ref.getDownloadURL()
                            .then(url => {
                                ////console.log(url)
                                images.push(url)
                                this.props.dispatch({type : "PRO_SET_IMAGES", data : images})
                                this.setState({remaining : this.state.remaining-1})
                                if(this.state.remaining === 0){
                                  this.props.dispatch({type : "PRO_SET_IMAGES_READY"})
                                }
                        
                            })
                        .catch(err => {
                            ////console.log(err)
                        })
                    })
                    .catch(err => {
                        ////console.log(err)
                    })

                    
                   
                }
                

    }
}
else {
  toast.error("Vous ne pouvez pas ajouter plus de 5 photos")

}
}
deleteImage(keyItem){
  let keepFiles = this.state.files.filter(function(item){
    return (item.key !== keyItem)
  })
  this.setState({files : keepFiles})
}

  render() {
    // const files = this.state.files.map(file => (
    //   <li key={file.name}>
    //     {file.name} - {file.size} bytes
    //   </li>
    // ));
    // const thumb = {
    //     display: 'inline-flex',
    //     borderRadius: 2,
    //     border: '1px solid #eaeaea',
    //     marginBottom: 8,
    //     marginRight: 8,
    //     width: 100,
    //     height: 100,
    //     padding: 4,
    //     boxSizing: 'border-box'
    //   };
      
    //   const thumbInner = {
    //     display: 'flex',
    //     minWidth: 0,
    //     overflow: 'hidden'
    //   };
      
      const img = {
        display: 'block',
        width: 'auto',
        height: '100%'
      };


      const thumbsContainer = {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 16
      };


      

    return (
      <Dropzone onDrop={this.onDrop}>
        {({getRootProps, getInputProps}) => (
          <section className="container">
{!this.state.photosValidees ? ( <div className="drag--container" {...getRootProps({className: 'dropzone'})}>
              <input {...getInputProps()} />
              <p className="drag--text">Déposez vos photos ici, ou cliquez pour en ajouter</p>
            </div> ) : ("") }
      <aside style={thumbsContainer}>
        <Grid container spacing={2}>
          
      {this.state.files.map(file => (
        <Grid item xs={12}>
        <div className="image--container" key={file.name}>
          <div className="image--wrapper">
           {!this.state.photosValidees ? ( <span className="image--delete" onClick={() =>  {
                let keepFiles = this.state.files.filter(function(item){
                  return (item.key !== file.key)
                })
                this.setState({files : keepFiles})
                if(keepFiles.length===0){
                  this.props.dispatch({type :"PRO_SET_NO_IMAGES_ADDED"})
                }
            }}>&times;</span>
           ) : ("") }
            <img
            className="report--image"
              src={file.preview}
               alt="Rapport d'estimation immmobilière à Casablanca édité par agenz"
            />
          </div>
        </div> 
        </Grid>
      ))
  }   
  </Grid> 
        
        </aside>
        {this.state.files.length > 0 ?(
        this.state.remaining >0  ? (
        <button className="button button-primary" onClick={this.validateImages}>
            <Spinner animation="border" variant="default" size="sm"/>
        </button>
        )
         : this.state.remaining===-1 ? (
            <button className="button button-primary" onClick={this.validateImages}>
            Valider les photos
        </button>
         ) : (
            <button className="button button-primary button--disabled" disabled>
           <CheckIcon /> Photos ajoutée
        </button>

         )
        ) : ('')
        }

          </section>
        )}
      </Dropzone>
    );
  }
}
const mapStateToProps = (state) => {
    return {
        estimationStatePro : state.estimationStatePro
    };
};
export default connect(mapStateToProps)(ImageUpload);