import React from 'react';
import { connect } from "react-redux";
import './style.scss';
import Badge from '@material-ui/core/Badge';

import { Link } from 'react-router-dom';
import axios from 'axios'
import { CSSTransition } from 'react-transition-group';
class LeftMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            displayDossiers : false,
            displayVitrine : false,
            displayAgence : false,
            displayTools : false,
            activeMenu: 'villas',
            menus: [
                {
                    id: 'villas',
                    display: 'Villas',
                    icon: 'fa fa-home'
                },
                {
                    id: 'appartements',
                    display: 'Appartements',
                    icon: 'fas fa-building'
                },
                {
                    id: 'terrainsnus',
                    display: 'Terrains Nus',
                    icon: 'far fa-square'
                },
                {
                    id: 'transactions',
                    display: 'Mes Transactions',
                    icon: 'fas fa-search-dollar'
                },
                {
                    id: 'addtransactions',
                    display: 'Ajouter une transaction',
                    icon: 'fas fa-search-plus'
                },
                {
                    id: 'xplorer',
                    display: 'Xplorer',
                    icon: 'fas fa-layer-group'
                },
                {
                    id: 'params',
                    display: 'Mes Paramètres',
                    icon: 'fas fa-cog'
                },
                {
                    id: 'vitrine',
                    display: 'Ma vitrine',
                    icon: 'fas fa-bullhorn'
                },
                {
                    id: 'instructions',
                    display: 'Aide',
                    icon: 'fas fa-bullhorn'
                },
                {
                    id: 'tableau',
                    display: 'Tableau de bord',
                    icon: 'fas fa-store-alt'
                },
                {
                    id: 'statistiques',
                    display: 'Statistiques de visibilité',
                    icon: 'fas fa-store-alt'
                },
                {
                    id: 'demandes',
                    display: 'Demandes de rdv',
                    icon: 'fas fa-store-alt'
                },
            ],
            notifications : 0
        }

        // refs
        this.menuRef = React.createRef();
        this.menuRefBurger = React.createRef();
        this.menuItemRef = React.createRef();
        this.menuSubtitleRefDoss = React.createRef();
        this.menuSubtitleRefTools = React.createRef();
        this.menuSubtitleRefAgence = React.createRef();
        this.menuSubtitleRefVis = React.createRef();
        this.userContainerRef = React.createRef();

    }
    displayDossiers(){
        if(!this.state.displayDossiers){
            this.setState({displayVitrine : false, displayAgence : false, displayTools : false})
        }
        this.setState({displayDossiers : !this.state.displayDossiers})

    }
    displayAgence(){
        if(!this.state.displayAgence){
            this.setState({displayVitrine : false, displayDossiers : false, displayTools : false})
        }
        this.setState({displayAgence : !this.state.displayAgence})

    }
    displayTools(){
        if(!this.state.displayTools){
            this.setState({displayVitrine : false, displayDossiers : false, displayAgence : false})
        }
        this.setState({displayTools : !this.state.displayTools})

    }
    displayVitrine(){
        if(!this.state.displayVitrine){
            this.setState({displayDossiers : false, displayAgence : false, displayTools : false})
        }
        this.setState({displayVitrine : !this.state.displayVitrine})

    }

    toggleMenu() {
        const menu = this.menuRef.current;
        const menuBurger = this.menuRefBurger.current;
        const menuItem = this.menuItemRef.current;
        const menuSubtitleDoss = this.menuSubtitleRefDoss.current;
        const menuSubtitleTools = this.menuSubtitleRefTools.current;
        const menuSubtitleAgence = this.menuSubtitleRefAgence.current;
        const menuSubtitleVis = this.menuSubtitleRefVis.current;
        const userContainer = this.userContainerRef.current;

        if (menu.classList.contains('activeMenuPro')) {
            menu.classList.remove('activeMenuPro');
        } else {
            menu.classList.add('activeMenuPro'); 
        }
        if (menuItem.classList.contains('activeMenuItemPro')) {
            menuItem.classList.remove('activeMenuItemPro');
        } else {
            menuItem.classList.add('activeMenuItemPro');
        }
        if (menuSubtitleDoss.classList.contains('menu--subtitle-active')) {
            menuSubtitleDoss.classList.remove('menu--subtitle-active');
        } else {
            menuSubtitleDoss.classList.add('menu--subtitle-active');
        }
        if (menuSubtitleTools.classList.contains('menu--subtitle-active')) {
            menuSubtitleTools.classList.remove('menu--subtitle-active');
        } else {
            menuSubtitleTools.classList.add('menu--subtitle-active');
        }
        if (menuSubtitleAgence.classList.contains('menu--subtitle-active')) {
            menuSubtitleAgence.classList.remove('menu--subtitle-active');
        } else {
            menuSubtitleAgence.classList.add('menu--subtitle-active');
        }
        if (menuSubtitleVis.classList.contains('menu--subtitle-active')) {
            menuSubtitleVis.classList.remove('menu--subtitle-active');
        } else {
            menuSubtitleVis.classList.add('menu--subtitle-active');
        }
        if (userContainer.classList.contains('user-container-display')) {
            userContainer.classList.remove('user-container-display');
        } else {
            userContainer.classList.add('user-container-display');
        }
        if (menuBurger.classList.contains('menu-burger-active')) {
            menuBurger.classList.remove('menu-burger-active');
        } else {
            menuBurger.classList.add('menu-burger-active');
        }
    }
    getNotifications(){
        axios.post('https://us-central1-agenz-website-prod.cloudfunctions.net/api/leadsNotification', {id : this.props.user.uid}).then( (res) => {
        this.setState({notifications : res.data.notifications})
        this.props.dispatch({type :'PRO_SET_NOTIFICATIONS', data : res.data.notifications})
    })
    .catch(err => {
        this.setState({notifications : 0})
    })
    }
    getVisibilite(){
        if(!this.props.visibilite.checked){ 
        axios.get("https://us-central1-agenz-website-prod.cloudfunctions.net/api/getContactPhoneMail").then (res => {
            
            this.props.dispatch({type : "SET_CONTACT_PHONE", data : res.data.filter(el => {return el.type==="Phone"})})
            this.props.dispatch({type : "SET_CONTACT_MAIL", data : res.data.filter(el => {return el.type==="Mail"})})
            this.setState({showContacts : true})
            
        })
        .catch(err => {
            console.log(err) 
            this.setState({showContacts : true})
        })
        axios.get("https://us-central1-agenz-website-prod.cloudfunctions.net/api/getContactMessages").then (res => {
            
            this.props.dispatch({type : "SET_CONTACT_MESSAGE", data : res.data})          
            this.setState({showContactsMessages : true})  
        })
        .catch(err => {
            console.log(err)
            this.setState({showContactsMessages : true})  

        })
        axios.post("https://us-central1-agenz-website-prod.cloudfunctions.net/api/vitrineViews",{
            url  : `/agence-immobiliere/casablanca/${this.props.agence.nameEntreprise ? this.props.agence.nameEntreprise.replace(/\./g, '-').replace(/ /g, '-').replace(/é/g, 'e').replace(/ô/g, 'o'):"agenz"}/a/${this.props.uid}`
        }).then (res => {
            
            this.props.dispatch({type : "SET_VITRINE_VIEWS", data : res.data.views})    
            this.setState({showVitrineViews : true})          
        })
        .catch(err => {
            console.log(err)
            this.setState({showVitrineViews : true})
        })
        this.props.dispatch({type : "SET_VISIBILITE_CHECKED"})

    }
    else {
        this.setState({showVitrineViews : true, showContactsMessages : true, showContacts : true})

    }

    }

    componentDidMount() {
        this.setState({activeMenu: this.props.activeMenu})
        this.getNotifications()
        this.getVisibilite()
    }

    render() {
        return (<>
            <div className = "accountMenuIcon" 
            onClick={() => {this.toggleMenu()}}
            >
                <i class="fab fa-elementor"></i>
            </div> 
<div className="account-left-side account-left-side--pro activeMenuPro" ref={this.menuRef}>
                <div className="account-left-side--toggleMenu" >
                    <i className="far fa-eye"></i>
                </div>

                <span ref={this.menuRefBurger} onClick={() => {this.toggleMenu()}} class="mobile-burger-toggle-menu"><i class="fas fa-times"></i>
                <i class="fas fa-arrow-right"></i></span>
                <div className="menu-items menu-items--pro" ref={this.menuItemRef}>
                    {this.props.uid !=="JzYHZWrhIxX1Edr4LJenGbrNwmC3" ? (
                        <>
                      <div className="menu--subtitle-div menu--subtitle-active" onClick={()=>this.displayAgence()}  ref={this.menuSubtitleRefAgence}>
                      <Badge badgeContent={Math.max(this.props.visibilite.contactMessage.filter(el => {return el.display===true}).length-this.props.visibilite.hiddenMessage,0)} color="primary">  <i class="fas fa-home"></i>    </Badge>                              

                                  <span className={!this.state.displayAgence ? "menu--subtitle" : "menu--subtitle subtitle-active"}>Mon Agence</span>{!this.state.displayAgence ? (<><i class="fas fa-chevron-down"></i>
</>) : (<><i class="fas fa-chevron-up"></i></>)    }                           </div>
                                <CSSTransition  unmountOnExit in={this.state.displayAgence} timeout={300} classNames="dropDown">
                                    <div>
                                <div 
                                    key={11}
                                    className={this.props.activeMenu === "tableau" ? "menu-item active" : "menu-item"} 
                                    onClick={() =>{ 
                                        this.setState({activeMenu: "tableau"}) 
                                        this.props.dispatch({ type: 'RESET_ESTIMATION_FILTER'});
                                        this.props.dispatch({ type: 'SET_ESTIMATION_FILTER', data: false })
                                        this.props.dispatch({ type: 'SET_PRO_ACCOUNT_ACTIVE_MENU', data: "tableau" })
                                    }}>
                                    <span className="subitem-span">
          {/* <HomeIcon/> */}
          {/* <i class="fas fa-clipboard-list"></i> */}
    </span>
                                    <span className="subitem-title">Tableau de bord</span>
                               
                                </div>
                                <div 
                                    key={12}
                                    className={this.props.activeMenu === "statistiques" ? "menu-item active" : "menu-item"} 
                                    onClick={() =>{ 
                                        this.setState({activeMenu: "statistiques"}) 
                                        this.props.dispatch({ type: 'RESET_ESTIMATION_FILTER'});
                                        this.props.dispatch({ type: 'SET_ESTIMATION_FILTER', data: false })
                                        this.props.dispatch({ type: 'SET_PRO_ACCOUNT_ACTIVE_MENU', data: "statistiques" })
                                    }}>
                                    <span className="subitem-span">
          {/* <ApartmentIcon/> */}
          {/* <i class="far fa-eye"></i> */}
    </span>
                                    <span className="subitem-title">Statistiques de visibilité</span>
                               
                                </div>
                              

                                <div 
                                    key={6}
                                    className={this.props.activeMenu === "demandes" ? "menu-item active menu-item-demande" : "menu-item menu-item-demande"} 
                                    onClick={() =>{ 
                                        this.setState({activeMenu: "demandes"}) 
                                        this.props.dispatch({ type: 'RESET_ESTIMATION_FILTER'});
                                        this.props.dispatch({ type: 'SET_ESTIMATION_FILTER', data: false })
                                        this.props.dispatch({ type: 'SET_PRO_ACCOUNT_ACTIVE_MENU', data: "demandes" })
                                    }}>
                                    <span className="subitem-span">
          {/* <ExploreOutlinedIcon/> */}
          {/* <i class="fas fa-file-signature"></i> */}

    </span>
                                    <span className="subitem-title">Demande de contact</span>
                                    <Badge badgeContent={Math.max(this.props.visibilite.contactMessage.filter(el => {return el.display===true}).length-this.props.visibilite.hiddenMessage,0)} color="primary">    </Badge>                              

                               
                                </div>
                                </div>
                           </CSSTransition>

                          
                                <div className="menu--subtitle-div menu--subtitle-active" onClick={() => this.displayVitrine()} ref={this.menuSubtitleRefVis}>
                                <i class="fas fa-store-alt"></i>    <span className= {!this.state.displayVitrine ? "menu--subtitle" : "menu--subtitle subtitle-active"}>Ma vitrine</span>{!this.state.displayVitrine ? (<><i class="fas fa-chevron-down"></i>
</>) : (<><i class="fas fa-chevron-up"></i></>)    }      
                                </div>
                                <CSSTransition  unmountOnExit in={this.state.displayVitrine} timeout={300} classNames="dropDown">
<div>
                                <div 
                                    key={4}
                                    className={this.props.activeMenu === "transactions" ? "menu-item active" : "menu-item"} 
                                    onClick={() =>{ 
                                        this.setState({activeMenu: "transactions"}) 
                                        this.props.dispatch({ type: 'RESET_ESTIMATION_FILTER'});
                                        this.props.dispatch({ type: 'SET_ESTIMATION_FILTER', data: false })
                                        this.props.dispatch({ type: 'SET_PRO_ACCOUNT_ACTIVE_MENU', data: "transactions" })
                                    }}>
                                    <span className="subitem-span">
          {/* <FlagOutlinedIcon/> */}
                                    {/* <i class="far fa-flag"></i> */}
    </span>
                                    <span className="subitem-title">Mes biens vendus</span>                               
                                </div>

                                <div 
                                    key={5}
                                    className={this.props.activeMenu === "addtransactions" ? "menu-item active" : "menu-item"} 
                                    onClick={() =>{ 
                                        this.setState({activeMenu: "addtransactions"}) 
                                        this.props.dispatch({ type: 'RESET_ESTIMATION_FILTER'});
                                        this.props.dispatch({ type: 'SET_ESTIMATION_FILTER', data: false })
                                        this.props.dispatch({ type: 'SET_PRO_ACCOUNT_ACTIVE_MENU', data: "addtransactions" })
                                    }}>
                                    <span className="subitem-span">
          {/* <AddCircleOutlineOutlinedIcon/> */}
          {/* <i class="fas fa-plus-circle"></i> */}
    </span>
                                    <span className="subitem-title">Ajouter une vente</span>
                               
                                </div>
                              
                                <div 
                                    key={8}
                                    className={this.props.activeMenu === "vitrine" ? "menu-item active" : "menu-item"} 
                                    onClick={() =>{ 
                                        this.setState({activeMenu: "vitrine"}) 
                                        this.props.dispatch({ type: 'RESET_ESTIMATION_FILTER'});
                                        this.props.dispatch({ type: 'SET_ESTIMATION_FILTER', data: false })
                                        this.props.dispatch({ type: 'SET_PRO_ACCOUNT_ACTIVE_MENU', data: "vitrine" })
                                    }}>
                                    <span className="subitem-span">
          {/* <SettingsOutlinedIcon/> */}
          {/* <i class="fas fa-bullhorn"></i> */}
    </span>
                                    <span className="subitem-title">Ma vitrine</span>
                               
                                </div>
                                </div>
                 </CSSTransition>

                 <div className="menu--subtitle-div menu--subtitle-active" onClick={()=>this.displayTools()}  ref={this.menuSubtitleRefTools}>
                 <Badge badgeContent={Math.max(this.props.notifications,0)} color="primary"><i class="fas fa-tools"></i> </Badge>                           
 <span className={!this.state.displayTools ? "menu--subtitle" : "menu--subtitle subtitle-active"}>Mes outils</span> {!this.state.displayTools ? (<><i class="fas fa-chevron-down"></i>
</>) : (<><i class="fas fa-chevron-up"></i></>)    }                           </div>
                                <CSSTransition  unmountOnExit in={this.state.displayTools} timeout={300} classNames="dropDown">
                                    <div>
                                    <div 
                                    key={0}
                                    className={this.props.activeMenu === "dossiers" ? "menu-item active" : "menu-item"} 
                                    onClick={() =>{ 
                                        this.setState({activeMenu: "dossiers"}) 
                                        this.props.dispatch({ type: 'RESET_ESTIMATION_FILTER'});
                                        this.props.dispatch({ type: 'SET_ESTIMATION_FILTER', data: false })
                                        this.props.dispatch({ type: 'SET_PRO_ACCOUNT_ACTIVE_MENU', data: "dossiers" })
                                    }}>
                                    <span className="subitem-span">
       
      </span>
                                    <span className="subitem-title">Projets détectés
                                    <Badge badgeContent={Math.max(this.props.notifications,0)} color="primary"> 
      </Badge>
                                    </span>
                                </div>
                  
                              
                                <div 
                                    key={6}
                                    className={this.props.activeMenu === "xplorer" ? "menu-item active" : "menu-item"} 
                                    onClick={() =>{ 
                                        this.setState({activeMenu: "xplorer"}) 
                                        this.props.dispatch({ type: 'RESET_ESTIMATION_FILTER'});
                                        this.props.dispatch({ type: 'SET_ESTIMATION_FILTER', data: false })
                                        this.props.dispatch({ type: 'SET_PRO_ACCOUNT_ACTIVE_MENU', data: "xplorer" })
                                    }}>
                                    <span className="subitem-span">
          {/* <ExploreOutlinedIcon/> */}
          {/* <i class="far fa-compass"></i> */}

    </span>
                                    <span className="subitem-title">Carte de prospection</span>
                               
                                </div>
                           
                           
                  
                                </div>
                           </CSSTransition>
                    
                 <div className="menu--subtitle-div menu--subtitle-active" onClick={()=>this.displayDossiers()}  ref={this.menuSubtitleRefDoss}>
                 <i class="fas fa-file-invoice"></i>  <span className={!this.state.displayDossiers ? "menu--subtitle" : "menu--subtitle subtitle-active"}>Rapports d'évaluations</span>{!this.state.displayDossiers ? (<><i class="fas fa-chevron-down"></i>
</>) : (<><i class="fas fa-chevron-up"></i></>)    }                           </div>
                                <CSSTransition  unmountOnExit in={this.state.displayDossiers} timeout={300} classNames="dropDown">
                                    <div>
                                <div 
                                    key={1}
                                    className={this.props.activeMenu === "villas" ? "menu-item active" : "menu-item"} 
                                    onClick={() =>{ 
                                        this.setState({activeMenu: "villas"}) 
                                        this.props.dispatch({ type: 'RESET_ESTIMATION_FILTER'});
                                        this.props.dispatch({ type: 'SET_ESTIMATION_FILTER', data: false })
                                        this.props.dispatch({ type: 'SET_PRO_ACCOUNT_ACTIVE_MENU', data: "villas" })
                                    }}>
                                    <span className="subitem-span">
          {/* <HomeIcon/> */}
          {/* <i class="fas fa-home"></i> */}
    </span>
                                    <span className="subitem-title">Mes rapports</span>
                                    {/* <span>&nbsp;({this.props.estimations.filter(est => est.bien === 'villa').length})</span> */}
                                        <span>&nbsp;({this.props.estimations.length})</span>
                               
                                </div>
                                {/* <div 
                                    key={2}
                                    className={this.props.activeMenu === "appartements" ? "menu-item active" : "menu-item"} 
                                    onClick={() =>{ 
                                        this.setState({activeMenu: "appartements"}) 
                                        this.props.dispatch({ type: 'RESET_ESTIMATION_FILTER'});
                                        this.props.dispatch({ type: 'SET_ESTIMATION_FILTER', data: false })
                                        this.props.dispatch({ type: 'SET_PRO_ACCOUNT_ACTIVE_MENU', data: "appartements" })
                                    }}>
                                    <span className="subitem-span">
          {/* <ApartmentIcon/> */}
          {/* <i class="far fa-building"></i> 
    </span>
                                    <span className="subitem-title">Appartements</span>
                                        <span>&nbsp;({this.props.estimations.filter(est => est.bien === 'appartement').length})</span>
                               
                                </div>
                               */}
                                <div 
                                    key={4}
                                    className={this.props.activeMenu === "appartements" ? "menu-item" : "menu-item"} 
                                >
                                    <span className="subitem-span">
                                    {/* <CreateNewFolderIcon /> */}
                                    {/* <i class="fas fa-folder-plus"></i> */}
    </span>
    <Link to="/estimationPro">

                                    <span className="subitem-title">Nouveau rapport</span>
                                    </Link>
                                </div>
                                </div>
                           </CSSTransition>
                          
                  </>  ) : (<>
                    <div className="menu--subtitle-div menu--subtitle-active" onClick={()=>this.displayDossiers()}  ref={this.menuSubtitleRefDoss}>
                 <i class="fas fa-file-invoice"></i>  <span className={!this.state.displayDossiers ? "menu--subtitle" : "menu--subtitle subtitle-active"}>Rapports d'évaluations</span>{!this.state.displayDossiers ? (<><i class="fas fa-chevron-down"></i>
</>) : (<><i class="fas fa-chevron-up"></i></>)    }                           </div>
                                <CSSTransition  unmountOnExit in={this.state.displayDossiers} timeout={300} classNames="dropDown">
                                    <div>
                                <div 
                                    key={1}
                                    className={this.props.activeMenu === "villas" ? "menu-item active" : "menu-item"} 
                                    onClick={() =>{ 
                                        this.setState({activeMenu: "villas"}) 
                                        this.props.dispatch({ type: 'RESET_ESTIMATION_FILTER'});
                                        this.props.dispatch({ type: 'SET_ESTIMATION_FILTER', data: false })
                                        this.props.dispatch({ type: 'SET_PRO_ACCOUNT_ACTIVE_MENU', data: "villas" })
                                    }}>
                                    <span className="subitem-span">
          {/* <HomeIcon/> */}
          {/* <i class="fas fa-home"></i> */}
    </span>
                                    <span className="subitem-title">Mes rapports</span>
                                    {/* <span>&nbsp;({this.props.estimations.filter(est => est.bien === 'villa').length})</span> */}
                                        <span>&nbsp;({this.props.estimations.length})</span>
                               
                                </div>
                                {/* <div 
                                    key={2}
                                    className={this.props.activeMenu === "appartements" ? "menu-item active" : "menu-item"} 
                                    onClick={() =>{ 
                                        this.setState({activeMenu: "appartements"}) 
                                        this.props.dispatch({ type: 'RESET_ESTIMATION_FILTER'});
                                        this.props.dispatch({ type: 'SET_ESTIMATION_FILTER', data: false })
                                        this.props.dispatch({ type: 'SET_PRO_ACCOUNT_ACTIVE_MENU', data: "appartements" })
                                    }}>
                                    <span className="subitem-span">
          {/* <ApartmentIcon/> */}
          {/* <i class="far fa-building"></i> 
    </span>
                                    <span className="subitem-title">Appartements</span>
                                        <span>&nbsp;({this.props.estimations.filter(est => est.bien === 'appartement').length})</span>
                               
                                </div>
                               */}
                                <div 
                                    key={4}
                                    className={this.props.activeMenu === "appartements" ? "menu-item" : "menu-item"} 
                                >
                                    <span className="subitem-span">
                                    {/* <CreateNewFolderIcon /> */}
                                    {/* <i class="fas fa-folder-plus"></i> */}
    </span>
    <Link to="/estimationPro">

                                    <span className="subitem-title">Nouveau rapport</span>
                                    </Link>
                                </div>
                                </div>
                           </CSSTransition>
                          
                  
                  </>)}
                           </div>

                 <div className="menu-user-container" ref={this.userContainerRef}>
                 {this.props.uid !=="JzYHZWrhIxX1Edr4LJenGbrNwmC3" ? (

                <>
                 <div 
                                    key={7}
                                    className={this.props.activeMenu === "params" ? "menu-item active" : "menu-item"} 
                                    onClick={() =>{ 
                                        this.setState({activeMenu: "params"}) 
                                        this.props.dispatch({ type: 'RESET_ESTIMATION_FILTER'});
                                        this.props.dispatch({ type: 'SET_ESTIMATION_FILTER', data: false })
                                        this.props.dispatch({ type: 'SET_PRO_ACCOUNT_ACTIVE_MENU', data: "params" })
                                    }}>
                                    <span>
          {/* <SettingsOutlinedIcon/> */}
          {/* <i class="fas fa-users-cog"></i> */}
          <i class="fas fa-user-cog"></i> 
    </span>
     <span className="aide">Paramètres</span>
                               
                                </div>
                              
                              
                 <div 
                                    key={9}
                                    className={this.props.activeMenu === "aide" ? "menu-item active aide-container" : "menu-item aide-container"} 
                                    onClick={() =>{ 
                                        this.setState({activeMenu: "aide"}) 
                                        this.props.dispatch({ type: 'RESET_ESTIMATION_FILTER'});
                                        this.props.dispatch({ type: 'SET_ESTIMATION_FILTER', data: false })
                                        this.props.dispatch({ type: 'SET_PRO_ACCOUNT_ACTIVE_MENU', data: "aide" })
                                    }}>
                                        <span>
<i class="far fa-question-circle icon--help"></i>
</span>
                                    <span className="aide">Aide</span>
                               
                                </div>
                      </>          ) : ('')
                     }
                     {this.props.agence.user_image && this.props.agence.user_image!=="" ? (
                        <>
                        <div className="user_img_container">
                        <img className="user__image"src={this.props.agence.user_image} alt="Agence immobilière à Casablanca"></img>
                        </div>
                        <div className="user-container">
                        <p className="announce-name">Connecté en tant que <br></br> <span className="agence--name-menu">{this.props.agence.nameEntreprise ? (this.props.agence.nameEntreprise) : ("")}</span></p>
                            </div>
                     </>
                     ) : (<p className="announce-name">Connecté en tant que <br></br> <span className="agence--name-menu">{this.props.agence.nameEntreprise ? (this.props.agence.nameEntreprise) : ("")}</span></p>)}
                        
                    </div>
                           
                        
            </div>
       </>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        estimations: state.espacePro.estimations,
        activeMenu: state.espacePro.activeMenu,
        notifications: state.espacePro.notifications,
        user: state.auth,
        agence : state.auth.agence,
        uid: state.auth.uid,
        visibilite: state.espacePro.visibilite,

    }
};  
export default connect(mapStateToProps)(LeftMenu);