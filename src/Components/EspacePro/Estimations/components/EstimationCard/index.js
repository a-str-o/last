import React from 'react';
import './style.scss';
import {withStyles} from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import EstimationCardDetails from '../EstimationCardDetails/';
import { CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ApartmentIcon from '@material-ui/icons/Apartment';
import {GMAPS_API_KEY} from '../../../../../Config/GMapsConfig'
import Spinner from "react-bootstrap/Spinner";
import { toast } from "react-toastify";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import SquareFootIcon from '@material-ui/icons/SquareFoot';
// import ReactMapGL, {Marker, FlyToInterpolator} from 'react-map-gl'
import mapboxgl from 'mapbox-gl';
import filledNotStar from './../../../../../assets/img/filledNotStar.png';
import filledStar from './../../../../../assets/img/filledStar.png';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import DescriptionIcon from '@material-ui/icons/Description';
import { Link } from 'react-router-dom';
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import InfoIcon from '@material-ui/icons/Info';
import Popover from "react-bootstrap/Popover";
import PopoverTitle from "react-bootstrap/PopoverTitle";
import PopoverContent from "react-bootstrap/PopoverContent";
import NumberFormat from 'react-number-format';
import EstimationMap from './EstimationMap';
import Axios from 'axios'
import Pagination from "../../../../../Pages/RapportEstimation/Pagination"


const MAPBOX_TOKEN ="pk.eyJ1IjoiYmFkcmJlbGtleml6IiwiYSI6ImNraDduNjN2bDA2MGszMG5zZHRqNm5zMzIifQ.oITjlONmSiUQsFKrZfFd3w";



export class EstimationCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      expanded : false,
      setExpanded : false,
      loading : false,
      action :'',
      loaded : false,
      shareLink : '',
      allTransactions: this.props.estimation, 
      currentTransactions: [], 
      currentPage: null, 
      totalPages: null 
    }
  }

    openModal = (details) => {
        //console.log(details)
        this.props.dispatch({ type: 'ESTIMATION_DETAILS', data: true })
        this.props.dispatch({ type: 'SET_ESTIMATION_DETAILS', data: details })
        this.props.dispatch({ type: 'SET_ESTIMATION_FILTER', data: false });
        setTimeout(() => {
          //console.log(this.props.espacePro.showEstimationDetails)
        }, 2000);
      }

StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#102665",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);


handleExpandClick = () => {
  this.setState({expanded : !this.state.expanded})
};
async getEstimations() {
  let estimations = [];
  let estimationsDispatchDatas = [];
  // const db = firebase.firestore();
  // const estimationsDocsUid = await db.collection('estimations').where('user_id', '==', this.props.user.uid).get();
  // const estimationsDocsEmail = await db.collection('estimations').where('user_id', '==', this.props.email).get();
  Axios.get('https://us-central1-agenz-website-prod.cloudfunctions.net/api/estimationsUser').then(result => {
  estimations = result.data
  estimations.forEach(est => {
      if(!est.isDeleted) {
          estimationsDispatchDatas.push(est)
      }
  })
  this.props.dispatch({ type: 'SET_ESTIMATIONS', data: estimationsDispatchDatas });

}).catch(err=>{
  this.props.dispatch({ type: 'LOADER_FALSE' });
  this.setState({loading : false})
  toast.error("Votre session à expirée")
  localStorage.removeItem('FBIdToken');
  this.props.history.push("/");})

}

deleteEstimation (data){
  // const db = firebase.firestore();
  //Update estimation to firestore

  // var estimationRef = db.collection("estimations");

  // var query = estimationRef.where("estimationId", "==", data.estimationId);
  this.setState({loading : true, action: 'delete'})
  // query
  // .get()
  // .then((querySnapshot) =>{

  //   querySnapshot.forEach((doc) =>{
  //     const today = new Date();
  //     const day = today.getDate();
  //     const month = today.getMonth() + 1;
  //     const year = today.getFullYear();

  //     let date = day + '/' + month + '/' + year;
  //     doc.ref.update({
  //         isDeleted : true,
  //         supprimeLe: date
  //     })

  // });
    Axios.post('https://us-central1-agenz-website-prod.cloudfunctions.net/api/deleteEstimation',{ estimationId: data.estimationId}).then(() => {
      toast.success("Estimation supprimée !");
      this.getEstimations();
      this.setState({loading : false, action: null})
      this.closeDetails()
  })
  .catch((error) =>{
      //console.log(error)
      this.setState({loading : false, action: null})
  });
}
loadMapScript = () =>{
  if(this.props.espacePro.mapLoaded){
    return;
  }
  else
{
  alert("map not loaded")
    //console.log("load map script")

      //console.log("loading script")
      const script = document.createElement("script");
  
      // script.src ='https://api.mapbox.com/mapbox-gl-js/v2.1.1/mapbox-gl.js'
      script.src =`https://maps.googleapis.com/maps/api/js?key=${GMAPS_API_KEY}`
  
      document.body.appendChild(script);
      this.props.dispatch({type : "SET_MAP_LOADED"})
}

}


      initMapBox (){
        //console.log("init")
        mapboxgl.accessToken = MAPBOX_TOKEN;
        // const folderData = this.props.estimation
        // folderData.map((item) => {
        //   let id = item.estimationId
  
        //   let latitude = parseFloat(`${item.localisation.split("lat : ")[1].split(" ")[0]}`)
        //   let longitude = parseFloat(`${item.localisation.split("lng : ")[1]}`)

                    
        // });
        }
    waitForGlobal = (key) => {

          if (window[key]) {
          } else {
            setTimeout(function() {
              this.waitForGlobal(key);
            }, 100);
          }
        }
        
         
      componentDidMount(){
        this.getEstimations()
      }
 



      onPageChanged = data => {
        const { allTransactions } = this.state;
        const { currentPage, totalPages, pageLimit } = data;
    
        const offset = (currentPage - 1) * pageLimit;
        const currentTransactions = allTransactions.slice(offset, offset + pageLimit);
    
        this.setState({ currentPage, currentTransactions, totalPages });
      }

      render() {
        const { allTransactions} = this.state;
        const totalTransactions = allTransactions.length;

        const popoverReport = (
          <Popover id="popover-contained">
              <PopoverTitle as="h3">Rapport indisponible</PopoverTitle>
              <PopoverContent>
                  Vous avez fait cette estimation sans créer de dossier, par exemple en la réalisant avant de vous connecter à votre espace pro. Vous pouvez supprimer cette estimation et créer un dossier pour ce bien si vous le souhaitez
              </PopoverContent>
          </Popover>
      );

        return (

            <div className = "container">
    <Grid container spacing={2}>
    {this.state.currentTransactions.map((row) => (
      row.estimation ? (
      <div className="container--content">
      <Grid key ={row.estimationId} item xs = {12}>
      <Card>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" >
            <ApartmentIcon/>
          </Avatar>
        }

        title={ row.adresse}
        subheader= { row.date.slice(8, 10) + '/' + row.date.slice(5, 7) + '/' + row.date.slice(0, 4) }
      />
          <Grid container spacing={2}>
      <Grid xs={12} md={6}>
<EstimationMap viewport={{latitude : parseFloat(`${row.localisation.split("lat : ")[1].split(" ")[0]}`), longitude : parseFloat(`${row.localisation.split("lng : ")[1]}`), zoom : 14}} classMarker = {"markerpoint"}/>

      <div id={`container--${row.estimationId}`} className="container--map"></div>
      </Grid>
      <Grid xs={12} md={6}>
      <CardContent>
          <List component="nav" aria-label="main mailbox folders">
        <ListItem>
          <ListItemIcon>
            <LocalOfferIcon />
          </ListItemIcon>
          <ListItemText>Prix estimé : <NumberFormat displayType={'text'} value={Math.round(row.estimation.toFixed() / 1000) * 1000} thousandSeparator={" "}/>   MAD</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <SquareFootIcon />
          </ListItemIcon>
          <ListItemText> Surface : {row.surfacehabitable} m<sup>2</sup></ListItemText>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <DescriptionIcon />
          </ListItemIcon>
          <ListItemText> {row.rapport_pdf ? (<Link to={`rapport-estimation/${row.rapport_pdf}`}>Rapport d'estimation</Link>)
          : (<>
            <p className="unavailable--report">Rapport indisponible{" "}{" "}
            <OverlayTrigger trigger="hover" placement="top" overlay={popoverReport}>
            <span className="info-icon"><InfoIcon/></span>
        </OverlayTrigger>
            </p>

        </>
          )}
          </ListItemText>
        </ListItem>
       
        </List>
      </CardContent>
      </Grid>
      </Grid>
      <CardActions disableSpacing>
        {/* <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton> */}
        {/* <IconButton aria-label="share">
          <ShareIcon onClick={this.shareLink(row.estimationId)} />
        </IconButton> */}
        <IconButton>
                                                <button 
                                                    onClick={() => this.deleteEstimation(row)}
                                                    type="button" 
                                                    className="button button-danger">
                                                        {this.state.loading && this.state.action === 'delete' ? ( <Spinner animation="border" className = "text-white" size="sm"/>): <DeleteForeverIcon/>}
                                                        </button>

        </IconButton>
        
        <IconButton
          onClick={this.handleExpandClick}
          aria-expanded={this.state.expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
        <CardContent>
        <div className = "row">
                                                <div className = "col-md-6">
                                                    {row.address ? 
                                                    (<p className="details-bien"> <span className ="details-bien-title">Adresse :</span> {row.address}</p>)
                                                    : '' }

                                                    {row.agencement ? 
                                                    (<p className="details-bien"> <span className ="details-bien-title">Agencement : </span> 
                                                    {row.agencement === 1 ?
                                                    (
                                                        <div className="">
                                                            <img src={filledStar} alt=''></img>
                                                            <img src={filledNotStar} alt=''></img>
                                                            <img src={filledNotStar} alt=''></img>
                                                            <img src={filledNotStar} alt=''></img>
                                                        </div>
                                                    ): 
                                                    row.agencement === 2 ?
                                                        (
                                                            <div className="">
                                                                <img src={filledStar} alt=''></img>
                                                                <img src={filledStar} alt=''></img>
                                                                <img src={filledNotStar} alt=''></img>
                                                                <img src={filledNotStar} alt=''></img>
                                                            </div>
                                                        ):
                                                        row.agencement === 3 ?
                                                        (
                                                            <div className="">
                                                                <img src={filledStar} alt=''></img>
                                                                <img src={filledStar} alt=''></img>
                                                                <img src={filledStar} alt=''></img>
                                                                <img src={filledNotStar} alt=''></img>
                                                            </div>
                                                        ):
                                                        row.agencement === 4 ?
                                                        (
                                                            <div className="">
                                                                <img src={filledStar} alt=''></img>
                                                                <img src={filledStar} alt=''></img>
                                                                <img src={filledStar} alt=''></img>
                                                                <img src={filledStar} alt=''></img>
                                                            </div>
                                                        ): ''}
                                                    </p>)
                                                    : '' }
                                                    {row.ascenseur !== undefined? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Ascenceur : </span> {row.ascenseur === 1 ? 'Oui' : 'Non'}</p>)
                                                    : '' }
                                                    {row.balcon !== undefined ? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Balcon : </span> {row.balcon === 1 ? 'Oui' : 'Non'}</p>)
                                                    : '' }
                                                    {row.calme !== undefined? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Calme : </span> {row.calme === 1 ? 'Oui' : 'Non'}</p>)
                                                    : '' }
                                                    {row.cave !== undefined? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Cave : </span> {row.cave === 1 ? 'Oui' : 'Non'}</p>)
                                                    : '' }

                                                    {row.chambreservice !== undefined? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Chambre de service : </span> {row.chambreservice === 1 ? 'Oui' : 'Non'}</p>)
                                                    : '' }
                                                    {row.cheminee !== undefined? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Cheminée : </span> {row.cheminee === 1 ? 'Oui' : 'Non'}</p>)
                                                    : '' }
                                                    {row.concierge !== undefined? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Résidence fermée : </span> {row.concierge === 1 ? 'Oui' : 'Non'}</p>)
                                                    : '' }
                                                    {row.construction ? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Construction : </span> {
                                                        row.construction === -1 ?
                                                        ('Inconnue') :
                                                        row.construction === 0 ?
                                                        ('Moins de 5 ans'):
                                                        row.construction === 1 ?
                                                        ('Entre 10 et 20 ans'):
                                                        row.construction === 2 ?
                                                        ('Plus de 20 ans'):
                                                        row.construction === 3 ?
                                                        ('Moins de 10 ans'):
                                                        ('Construction neuve')
                                                        }</p>)
                                                    : '' }
                                                    {row.dateTransactions ? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Date de la transaction : </span> {row.dateTransactions}</p>)
                                                    : '' }
                                                    {row.duplex !== undefined? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Duplex : </span> {row.duplex === 1 ? 'Oui' : 'Non'}</p>)
                                                    : '' }
                                                    {row.etage !== undefined? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Etage : </span>{ row.etage}</p>)
                                                    : '' }
                                                    {row.etagesimmeuble !== undefined? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Etage immeuble : </span> {row.etagesimmeuble === 1 ? 'Oui' : 'Non'}</p>)
                                                    : '' }
                                                    {row.finition ? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Finition : </span> 
                                                    {row.finition === 'correct' ? ('Correct') :
                                                    row.finition === 'travauxaprevoir' ? ('Travaux à prévoir') :
                                                    row.finition === 'refaitaneuf' ? ('Refait à neuf') : ''
                                                    }</p>)
                                                    : '' }
                                                </div>

                                                <div className = "col-md-6">
                                                    
                                                    {row.luminosite ? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Luminosité : </span> 
                                                    {row.luminosite === 1 ?
                                                    (
                                                        <div className="">
                                                            <img src={filledStar} alt=''></img>
                                                            <img src={filledNotStar} alt=''></img>
                                                            <img src={filledNotStar} alt=''></img>
                                                            <img src={filledNotStar} alt=''></img>
                                                        </div>
                                                    ): 
                                                    row.luminosite === 2 ?
                                                        (
                                                            <div className="">
                                                                <img src={filledStar} alt=''></img>
                                                                <img src={filledStar} alt=''></img>
                                                                <img src={filledNotStar} alt=''></img>
                                                                <img src={filledNotStar} alt=''></img>
                                                            </div>
                                                        ):
                                                        row.luminosite === 3 ?
                                                        (
                                                            <div className="">
                                                                <img src={filledStar} alt=''></img>
                                                                <img src={filledStar} alt=''></img>
                                                                <img src={filledStar} alt=''></img>
                                                                <img src={filledNotStar} alt=''></img>
                                                            </div>
                                                        ):
                                                        row.luminosite === 4 ?
                                                        (
                                                            <div className="">
                                                                <img src={filledStar} alt=''></img>
                                                                <img src={filledStar} alt=''></img>
                                                                <img src={filledStar} alt=''></img>
                                                                <img src={filledStar} alt=''></img>
                                                            </div>
                                                        ): ''
                                                    }</p>)
                                                    : '' }
                                                    {row.orientation ? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Orientation : </span> {row.orientation}</p>)
                                                    : '' }
                                                    {row.parking !== undefined? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Parking : </span> {row.parking === 1 ? 'Oui' : 'Non'}</p>)
                                                    : '' }
                                                    {row.placesparking !== undefined ? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Place de parking : </span> {row.placesparking}</p>)
                                                    : '' }
                                                    {row.prix ? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Prix : </span> 
                                                    { new Intl.NumberFormat(
                                                        'ma',
                                                        {
                                                            style: 'currency',
                                                            currency: 'MAD',
                                                            minimumFractionDigits: 0,
                                                            maximumFractionDigits: 0
                                                        })
                                                        .format(row.prix)
                                                        .replaceAll(',', ' ') } </p>)
                                                    : '' }
                                                    {row.redejardin !== undefined? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Rez de jardin : </span> {row.redejardin === 'non' ? 'Non' : 'Oui collectif'}</p>)
                                                    : '' }
                                                    {row.residencefermee !== undefined? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Residence fermée : </span> {row.residencefermee === 1 ? 'Oui' : 'Non'}</p>)
                                                    : '' }
                                                    {row.sdb !== undefined? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Salles de bain : </span> {row.sdb}</p>)
                                                    : '' }
                                                    {row.surfacebalcon !== undefined? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Surface du balcon : </span> {row.surfacebalcon}</p>)
                                                    : '' }
                                                    {row.surfacecave !== undefined? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Surface de la cave : </span> {row.surfacecave} m²</p>)
                                                    : '' }
                                                    {row.surfacehabitable !== undefined? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Surface habitable : </span> {row.surfacehabitable} m²</p>)
                                                    : '' }
                                                    {row.surfaceparking ? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Surface du parking : </span> {row.surfaceparking} m²</p>)
                                                    : '' }
                                                    {row.typologie ? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Nombre de chambres : </span> {row.typologie}</p>)
                                                    : '' }
                                                    {row.vueexceptionnelle !== undefined? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Sans vis-à-vis : </span> {row.vueexceptionnelle === 1 ? 'Oui' : 'Non'}</p>)
                                                    : '' }
                                                </div>
                                            </div>
                                       
        </CardContent>
      </Collapse>
    </Card>

      </Grid>
      </div>
      ):("")
    ))
}
      </Grid>
      <div className="d-flex flex-row py-4 align-items-center pagination--container">
              <Pagination totalRecords={totalTransactions}  pageNeighbours={1} onPageChanged={this.onPageChanged} pageLimit={3} />
</div>

                <CSSTransition appear={true} unmountOnExit in={this.props.espacePro.showEstimationDetails} timeout={300} classNames="PopUpEstimationAnimation2">
                      <EstimationCardDetails />
                  </CSSTransition>
            
            </div>
 
        )
    }
}            

const mapStateToProps = (state) => {
  const estimation = state.espacePro;
  const uid = state.auth.uid;
const email = state.auth.email;
  return {
    uid: uid,
    email: email,
      config: state.config,
      priceDetails: state.priceDetails,
      espacePro: estimation,
      searchedAddress: state.estimationState.urlViewport,
      user: state.auth
  }
}; 

export default connect(mapStateToProps)(EstimationCard)