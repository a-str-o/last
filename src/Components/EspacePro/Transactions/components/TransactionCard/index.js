import React from 'react';
import { connect } from 'react-redux';
import './style.scss';
import {withStyles, createStyles} from '@material-ui/core/styles';


import TransactionCardDetails from '../TransactionCardDetails/';
import { CSSTransition } from 'react-transition-group';

import Card from '@material-ui/core/Card';



import NumberFormat from 'react-number-format';
import Grid from '@material-ui/core/Grid';
import Pagination from "../../../../../Pages/RapportEstimation/Pagination"
import CarouselInPopup from '../../../../CardComponent/components/CarouselInPopup';
import logo_agenz_white from '../../../../../assets/img/logo_agenz_white.jpeg'
import ObtenirLePrix from "../../../../CardComponent/ObtenirLePrix"
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import "../../../../CardComponent/ObtenirLePrix.scss"
import "../../../../CardComponent/PopupContainer.scss"
import "../../../../CardComponent/CardComponent.scss"


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





class TransactionCard extends React.Component {

  constructor(props) {
      super(props); 
      this.state = {
          displayEstimations: null,
          gettingEstimations: true,
          allTransactions: this.props.transaction, 
          currentTransactions: [], 
          currentPage: null, 
          totalPages: null,
          moreInfo : false,
          selectedAgence : {nameEntreprise : this.props.nameEntreprise,
          responsable : this.props.responsable,
           user_image : this.props.user_image,
           emailEntreprise : this.props.emailEntreprise,
         phoneEntreprise : this.props.phoneEntreprise,
         descriptionActivite : this.props.descriptionActivite
          },
          selectedAddress : "",
          selectedImages : null,
          selectedConsistance : "",
          selectedConstruction : -1 ,
          selectedDateTransactions : "",
          selectedTransactionId : "" 
      }
  }

    // const classes = useStyles();

    openModal = (details) => {
      this.props.dispatch({type : 'TRANSACTION_DETAILS', data: true})
      this.props.dispatch({type : 'SET_TRANSACTION_DETAILS', data: details})
    }
    onPageChanged = data => {
      const { allTransactions } = this.state;
      const { currentPage, totalPages, pageLimit } = data;
  
      const offset = (currentPage - 1) * pageLimit;
      const currentTransactions = allTransactions.slice(offset, offset + pageLimit);
  
      this.setState({ currentPage, currentTransactions, totalPages });
    }
    formatEtage(etage){
      if(etage===0 || etage==="0"){
        return "Ré-de-chaussée"
      }
      if(etage===1 || etage==="1"){
        return "1er étage"
      }
      if(parseInt(etage)>1){
        
        return `${parseInt(etage)}ème étage`
      }
      return( `${etage} étage`)

    }
    closeModal = () => {
      this.setState({
          ...this.state,
          moreInfo: false,
          selectedId: null,
          selectedTransaction: null,
          agenceTransaction: null
      })
  }
  openPopup(row){
    this.setState({moreInfo : true,
      selectedAddress : row.address,
      selectedImages : JSON.stringify(row.images),
      selectedConsistance : row.consistance,
      selectedConstruction : -1 ,
      selectedDateTransactions : row.dateTransactions,
      selectedTransactionId : row.transactionId
  })
}
closeModal = () => {
  this.setState({
    moreInfo : false,
    selectedAddress : "",
    selectedImages : "",
    selectedConsistance : "",
    selectedConstruction : -1 ,
    selectedDateTransactions : "",
    selectedTransactionId : ""
  })
}



    render() {
      const { allTransactions} = this.state;
      const totalTransactions = allTransactions.length;
      const { classes } = this.props;

    return (

      <>
                <Dialog
                open={this.state.moreInfo}
                disableBackdropClick={false}
                onClose={this.closeModal}
                classes={{paperWidthSm: classes.paperWidthSm }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                    <DialogContent>
                        <ObtenirLePrix 
                        images={this.state.selectedImages} 
                        consistance={this.state.selectedConsistance}
                        selectedAddress={this.state.selectedAddress}
                        dateTransactions={this.state.selectedDateTransactions}
                        construction={this.state.selectedConstruction}
                        agenceTransaction={this.state.selectedAgence}
                        transactionId={this.state.selectedTransactionId}/>
  
                    </DialogContent>
                </Dialog>
        <div className = "container">
          <CSSTransition appear={true} unmountOnExit in={this.props.espacePro.showTransactionDetails} timeout={300} classNames="PopUpTransactionAnimation2">
                <TransactionCardDetails />
            </CSSTransition>
        </div>
        <div className = "container transaction-container">
                 <Grid container spacing={2}>
                 {this.state.currentTransactions.map((row) => (
                   <div className="container--content">
                   <Grid key ={row.transactionId} item xs = {12}>
                   <Card>
                   {/* {row.bien ==="appartement" ? (
                   <CardHeader
                     avatar={
                       <Avatar aria-label="recipe" >
                         <ApartmentIcon/>
                       </Avatar>
                     }
             
                     title={ row.address}
                     subheader= {row.dateTransactions}                   />
                   ) : (
                    <CardHeader
                    avatar={
                      <Avatar aria-label="recipe" >
                        <HomeIcon/>
                      </Avatar>
                    }
            
                    title={row.adresse} 
                    subheader= {row.dateTransactions}
                  />

                   )} */}
                       <Grid container spacing={2}>
                   <Grid xs={12} md={4}>
             {/* <EstimationMap viewport={{latitude : parseFloat(`${row.localisation.split("lat : ")[1].split(" ")[0]}`), longitude : parseFloat(`${row.localisation.split("lng : ")[1]}`), zoom : 14}} classMarker = {"markerpoint"}/> */}
              <CarouselInPopup images={row.images && row.images.length>0 ? (row.images) : ([logo_agenz_white,logo_agenz_white,logo_agenz_white])} venduLabel={this.props.venduLabel} />
                   </Grid>

                   <Grid xs={12} md={8}>
                   <div className="content--container">
                     <div className="content--header">
                       <p className="header-text">{row.address}</p>
                       <p className="header-date">Vendu en {row.dateTransactions}</p>
                     </div>
                     <div className="content--details">
                       <p className="detail--text"><span className="bien">{row.consistance}</span>  - <span className="surface">{row.surfaceeffective} m²</span></p>
                       </div>
                       <div className="content--etage">
                       <p className="etage--text">{row.etage && row.etage!=="" ? (<span className="etage">{this.formatEtage(row.etage)} </span>) : (<span className="etage-empty"></span>)}</p>
                       </div>
                       {this.props.popupLink ? (
                          <p className="details--link-price" onClick= {() => {this.openPopup(row)}}>Obtenir le prix</p>
                      ) : ("")
                      }
                      {this.props.detailLinks ? (
                      <div className="content--bottom">
                        <div className="content-price">
                        {this.props.detailLinks ? (
                          <>
                        <p className="price"><NumberFormat displayType={'text'} decimalScale={0} value={row.prix} thousandSeparator={" "}/> MAD </p><span className="price-separator">{" "}</span><p className="price-m2"><NumberFormat decimalScale={0} displayType={'text'} value={row.prix/row.surfaceeffective} thousandSeparator={" "}/> MAD/m²</p>
                        </>
                        ):("")}
                        </div>
                      <div className="content-detail-link">
                        {this.props.detailLinks ? (
                      <p className="details--link" onClick= {() => {this.openModal(row)}}>Plus de détails</p>
                      ) : ("")}
  

                      </div>

                      </div>
                      ) : ("")}
                   </div>
                  
                   {/* <CardContent>
                       <List component="nav" aria-label="main mailbox folders">
                     <ListItem>
                       <ListItemIcon>
                         <LocalOfferIcon />
                       </ListItemIcon>
                       <ListItemText>Prix de vente : <NumberFormat displayType={'text'} value={row.prix} thousandSeparator={" "}/>   MAD</ListItemText>
                     </ListItem>
                     <ListItem>
                       <ListItemIcon>
                         <SquareFootIcon />
                       </ListItemIcon>
                       <ListItemText> Surface : {row.surface} m<sup>2</sup></ListItemText>
                     </ListItem>
                     <ListItem>
          <ListItemIcon>
            <EventIcon />
          </ListItemIcon>
          <ListItemText> 
          <ListItemText> Date de la vente : {row.dateTransactions}</ListItemText>
          </ListItemText>
        </ListItem>
                    
                     </List>

                   </CardContent> */}
               
                   </Grid>
                   
                   </Grid>
                   {/* <CardActions disableSpacing>
                     
                   <IconButton
                          onClick= {() => {this.openModal(row)}}
        >
          <VisibilityIcon />
        </IconButton>
                   </CardActions> */}
              
                 </Card>
             
                   </Grid>
                   </div>
                 ))
             }
                   </Grid>
                   <div className="d-flex flex-row py-4 align-items-center pagination--container">
              <Pagination totalRecords={totalTransactions} pageNeighbours={1} onPageChanged={this.onPageChanged} pageLimit={3} />
</div>


                         
                         </div>
                </>
              
     
     );
}
}

const mapStateToProps = (state) => {
  const transaction = state.espacePro;
  return {
      config: state.config,
      priceDetails: state.priceDetails,
      espacePro: transaction,
      searchedAddress: state.estimationState.urlViewport
  }
}; 

export default connect(mapStateToProps)(withStyles(styles)(TransactionCard));
