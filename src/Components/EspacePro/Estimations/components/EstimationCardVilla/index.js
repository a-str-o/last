import React from 'react';
import './style.scss';
import { withStyles} from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import EstimationCardDetails from '../EstimationCardDetails/';
import { CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';

import Spinner from "react-bootstrap/Spinner";
import { toast } from "react-toastify";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

// import ReactMapGL, {Marker, FlyToInterpolator} from 'react-map-gl'
import mapboxgl from 'mapbox-gl';

import { Link } from 'react-router-dom';
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import InfoIcon from '@material-ui/icons/Info';
import Popover from "react-bootstrap/Popover";
import PopoverTitle from "react-bootstrap/PopoverTitle";
import PopoverContent from "react-bootstrap/PopoverContent";
import NumberFormat from 'react-number-format';
import Axios from 'axios'
import Pagination from "../../../../../Pages/RapportEstimation/Pagination"
import CarouselInPopup from '../../../../CardComponent/components/CarouselInPopup';
import logo_agenz_white from '../../../../../assets/img/logo_agenz_white.jpeg'


const MAPBOX_TOKEN ="pk.eyJ1IjoiYmFkcmJlbGtleml6IiwiYSI6ImNraDduNjN2bDA2MGszMG5zZHRqNm5zMzIifQ.oITjlONmSiUQsFKrZfFd3w";


// const useStyles = makeStyles({
//     table: {
//       minWidth: 650,
//     },
//     tableRow: {
//       hover: {
//           "&$hover:hover": {
//               backgroundColor: '#49bb7b',
//           },
//       },
//   },
//   root: {
//     maxWidth: 345,
//   },
//   media: {
//     height: 0,
//     paddingTop: '56.25%', // 16:9
//   },
//   expand: {
//     transform: 'rotate(0deg)',
//     marginLeft: 'auto',
//     transition: theme.transitions.create('transform', {
//       duration: theme.transitions.duration.shortest,
//     }),
//   },
//   expandOpen: {
//     transform: 'rotate(180deg)',
//   }
// });


export class EstimationCardVilla extends React.Component {

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

handleExpandClick(key){
  this.setState({expanded : key +1})
  }
  handleExpandClose(){
    this.setState({expanded : false})
    }

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

   initMap (){
      //console.log("init")
      const folderData = this.props.estimation
      folderData.map((item) => {
        // let id = item.estimationId

        let latitude = parseFloat(`${item.localisation.split("lat : ")[1].split(" ")[0]}`)
        let longitude = parseFloat(`${item.localisation.split("lng : ")[1]}`)
        //console.log(latitude)
        //console.log(longitude)

      let options = {
          center: { lat: latitude, lng: longitude },
          // pov: { heading: 165, pitch: 0 },
          zoom: 15,
          pov: { heading: 165, pitch: 0 },
          disableDefaultUI : true
                    }
      //console.log(options)
      //console.log(item.estimationId)
      const displayMap = new window.google.maps.Map(document.getElementById(`${item.estimationId}`), options);
      //console.log(displayMap)
      new window.google.maps.Marker({
          position: { lat: latitude, lng: longitude },
          map : displayMap
                     });
      this.setState({...this.state, id : true})
      return ("")
      });
      }
      initMapBox (){
        //console.log("init")
        mapboxgl.accessToken = MAPBOX_TOKEN;
        const folderData = this.props.estimation
        folderData.map((item) => {
          // let id = item.estimationId
  
          let latitude = parseFloat(`${item.localisation.split("lat : ")[1].split(" ")[0]}`)
          let longitude = parseFloat(`${item.localisation.split("lng : ")[1]}`)
          //console.log(latitude)
          //console.log(longitude)
  
        // let options = {
        //     center: { lat: latitude, lng: longitude },
        //     // pov: { heading: 165, pitch: 0 },
        //     zoom: 15,
        //     pov: { heading: 165, pitch: 0 },
        //     disableDefaultUI : true
        //               }
        //console.log(options)
        //console.log(item.estimationId)
        // const displayMap = new window.google.maps.Map(document.getElementById(`${item.estimationId}`), options);
        new mapboxgl.Map({
          container: document.getElementById(`${item.estimationId}`),
          style: 'mapbox://styles/mapbox/streets-v9',
          center: [longitude, latitude],
          zoom : 10
        });
        return ("")        
        });
        }
    waitForGlobal = (key) => {

          if (window[key]) {
          } else {
            setTimeout(function() {
              this.waitForGlobal(key);
            }, 100);
          }
        }


        formatDate(dateEstimation){
          let date = new Date(dateEstimation);   
   return (date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear())

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
    {this.state.currentTransactions.map((row,key) => {
      let surfaceeffective = 0
      if (row.bien==="villa"){
        surfaceeffective = row.surfaceterrain
      }
      else {
        if(row.parking) {
          surfaceeffective= row.surfacehabitable + (row.surfacecave+row.surfacebalcon+row.placesparking*12)/2
      }
      else {
          surfaceeffective= row.surfacehabitable + (row.surfacecave+row.surfacebalcon)/2 
      } 
     }
     let pricemetter = row.estimation/surfaceeffective
      return (
      
      <div className="container--content">
      <Grid key ={row.estimationId} item xs = {12}>
      <Card>
      {/* <CardHeader
        avatar={
          <Avatar aria-label="recipe" >
            <HomeIcon/>
          </Avatar>
        } 

        title={ row.adresse}
        subheader= { row.date.slice(8, 10) + '/' + row.date.slice(5, 7) + '/' + row.date.slice(0, 4) }
      /> */}
          <Grid container spacing={2}>
      <Grid xs={12} md={4}>
      <CarouselInPopup images={row.images && row.images.length>0 ? (row.images) : ([logo_agenz_white,logo_agenz_white,logo_agenz_white])}/>
      {/* <EstimationMap viewport={{latitude : parseFloat(`${row.localisation.split("lat : ")[1].split(" ")[0]}`), longitude :parseFloat(`${row.localisation.split("lng : ")[1]}`) , zoom : 14}} classMarker = {"markerpoint"} /> */}
      </Grid>

 
      <Grid xs={12} md={8}>
      {/* <CardContent>
      
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
          <ListItemText> Surface du terrain: {row.surfaceterrain} m<sup>2</sup></ListItemText>
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
      </CardContent> */}
       <div className="content--container">
                     <div className="content--header">
                       <p className="header-text">{row.adresse}</p>
                       <p className="header-date">{this.formatDate(row.date)}</p>
                     </div>
                     <div className="content--details">
                       <p className="detail--text"><span className="bien">{row.bien==="villa" ? "Villa" : (row.bien==="appartement" ? "Appartement" : "Terrain nu") }</span>  - <span className="surface">{row.bien==="villa" ? `${row.surfaceterrain} m² de terrain` : (row.bien==="appartement" ? `${surfaceeffective} m²` : `${row.surfaceterrain} m² de terrain`) } </span></p>
                       </div>
                       <div className="content--etage">
                       <p className="etage--text">{row.bien==="villa" ?
                       (<span className="etage-empty"></span>) :
                        ((row.etage && row.etage!=="") ?
                         (<span className="etage">
                            {row.etage ===0 ? ("Rez-de-chaussée") 
                            :
                             (row.etage ===1 ?
                                 ("1er étage") :
                                  (`${row.etage}ème étage`))} </span>) : (<span className="etage-empty"></span>))}
                                  </p>
                       </div>
                      <div className="content--bottom">
                        <div className="content-price content-price-estimation">
                        {this.props.detailLinks ? (
                          <>
                        <p className="price"><NumberFormat displayType={'text'} decimalScale={0} value={row.estimation} thousandSeparator={" "}/> MAD </p><span className="price-separator">{" "}</span><p className="price-m2"><NumberFormat decimalScale={0} displayType={'text'} value={pricemetter} thousandSeparator={" "}/> MAD/m²</p>
                        </>
                        ):("")}
                        </div>
                        <div className="content-detail-link-rapport">
                      {row.rapport_pdf ? (<Link to={`rapport-estimation/${row.rapport_pdf}`}>Rapport d'estimation</Link>)
          : (<>
            <p className="unavailable--report">Rapport indisponible{" "}{" "}
            <OverlayTrigger trigger="hover" placement="top" overlay={popoverReport}>
            <span className="info-icon"><InfoIcon/></span>
        </OverlayTrigger>
            </p> 

        </>
          )}

                      </div>
                      </div>
                      <div className="content--bottom-actions">
                        <div className="content-delete">
                        <IconButton>
                                                <button 
                                                    onClick={() => this.deleteEstimation(row)}
                                                    type="button" 
                                                    className="button button-danger">
                                                        {this.state.loading && this.state.action === 'delete' ? ( <Spinner animation="border" className = "text-white" size="sm"/>): <DeleteForeverIcon/>}
                                                        </button>

        </IconButton> 
        </div>
                   
        <div className="content-detail-link">
                        {this.props.detailLinks ? (
                                this.state.expanded===key+1 ?(
                                <i class="fas fa-chevron-up chevron-dropdown-estimation" onClick={this.handleExpandClose()}></i>) 
                                :
                                 (<i class="fas fa-chevron-down chevron-dropdown-estimation" onClick={() => this.handleExpandClick(key)}></i>)
                                 ):
                                 ("")}


                      </div>
                   
                      </div>
                   
                   </div>
                  


      </Grid>
      </Grid>
      {/* <CardActions disableSpacing>

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
   */}
      <Collapse in={this.state.expanded===key +1 } timeout="auto" unmountOnExit>
     
      {row.bien==="villa" ? (
        <CardContent>
        <div className = "row">
                                                <div className = "col-md-6">
                                                    {row.address ? 
                                                    (<p className="details-bien"> <span className ="details-bien-title">Adresse :</span> {row.address}</p>)
                                                    : '' }

     
                                                    {row.calme !== undefined? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Calme : </span> {row.calme === 1 ? 'Oui' : 'Non'}</p>)
                                                    : '' }
                                                    {row.cheminee !== undefined? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Cheminée : </span> {row.cheminee === 1 ? 'Oui' : 'Non'}</p>)
                                                    : '' }
                                                    {row.anneeconstruction ? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Construction : </span> {
                                                        row.anneeconstruction === -1 ?
                                                        ('Je ne sais pas') :
                                                        row.anneeconstruction === 0 ?
                                                        ('Moins de 5 ans'):
                                                        row.anneeconstruction === 1 ?
                                                        ('Entre 10 et 20 ans'):
                                                        row.anneeconstruction === 2 ?
                                                        ('Plus de 20 ans'):
                                                        row.anneeconstruction === 3 ?
                                                        ('Moins de 10 ans'):
                                                        ('Construction neuve')
                                                        }</p>)
                                                    : '' }
                                                    {row.dateTransactions ? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Date de la transaction : </span> {row.dateTransactions}</p>)
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
                                                    
                                                    {row.garage !== undefined? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Garage : </span> {row.garage === 1 ? 'Oui' : 'Non'}</p>)
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
                                                    {row.surfaceterrain !== undefined? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Surface du terrain : </span> {row.surfaceterrain} m²</p>)
                                                    : '' }
                                                    {row.surfaceconstruite ? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Surface construite : </span> {row.surfaceconstruite} m²</p>)
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
     ) : (
<CardContent>
<div className = "row">
                                                <div className = "col-md-6">
                                                    {row.address ? 
                                                    (<p className="details-bien"> <span className ="details-bien-title">Adresse :</span> {row.address}</p>)
                                                    : '' }

                                                    {row.agencement ? 
                                                    (<p className="details-bien"> <span className ="details-bien-title">Agencement : {row.agencement}/4</span> 
                                                    
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
                                                    (<p className="details-bien"><span className ="details-bien-title"> Concierge : </span> {row.concierge === 1 ? 'Oui' : 'Non'}</p>)
                                                    : '' }
                                                    {row.construction ? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Construction : </span> {
                                                        row.construction === -1 ?
                                                        ('Je ne sais pas') :
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

                                                    {row.duplex !== undefined? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Duplex : </span> {row.duplex === 1 ? 'Oui' : 'Non'}</p>)
                                                    : '' }
                                                    {row.etage !== undefined? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Etage : </span>{ row.etage === 1 ? 'Oui' : 'Non'}</p>)
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
                                                    (<p className="details-bien"><span className ="details-bien-title"> Luminosité : {row.luminosite}/4 </span> 
                                                    </p>)
                                                    : '' }
                                                    {row.orientation ? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Orientation : </span> {row.orientation==="sudouest" ? "Sud Ouest" : row.orientation}</p>)
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
                                                    {row.renovee !== undefined? 
                                                    (<p className="details-bien"><span className ="details-bien-title"> Rénovée : </span> {row.renovee === 1 ? 'Oui' : 'Non'}</p>)
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
     )
    }
      </Collapse>
    </Card>

      </Grid>
      </div>
      )
    }
    )
}
      </Grid>
                  
      <div className="d-flex flex-row py-4 align-items-center pagination--container">
              <Pagination totalRecords={totalTransactions} pageNeighbours={1} onPageChanged={this.onPageChanged} pageLimit={3} />
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

export default connect(mapStateToProps)(EstimationCardVilla)