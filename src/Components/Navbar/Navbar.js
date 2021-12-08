import React from 'react';
import { withRouter } from "react-router";
import logo from '../../assets/img/agenz-logo.png';
import logo_pro from '../../assets/img/LOGO pro.png';

import { Link } from 'react-router-dom';
import './Navbar.scss';
import { signOut } from "../../Actions/AuthActions";
import { connect } from "react-redux";


class  Navbar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open : false,
            openMenu: false,
            openMenuId: false,
            openModal: false,
            location: this.props.location,
            menus: [
                {
                    title: 'Accueil',
                    path: '/',
                    icon: 'fa-home',
                    id: 0
                },
                {
                    title: 'Carte des prix',
                    path: '/prix-immobilier',
                    icon: 'fa-map-marker-alt',
                    id: 1
                },
                {
                    title: 'Estimer un bien',
                    path: '/estimation',
                    icon: 'fa-chart-line',
                    id: 2
                },
                {
                    title: 'Blog',
                    path: '/publication',
                    icon: 'fa-newspaper',
                    id: 2
                },
                {
                    title: 'Contact',
                    path: '/contact',
                    icon: 'fa-envelope-open-text',
                    id: 3
                }
            ],
            menusItems: [
                {
                    title: 'Villas',
                    icon: 'fa fa-home',
                    id: 0
                },
                {
                    title: 'Terrains nus',
                    icon: 'fas fa-industry',
                    id: 1
                },
                {
                    title: 'Appartements',
                    icon: 'fas fa-building',
                    id: 2
                },
                {
                    title: 'Mes parametres',
                    icon: 'fas fa-cog',
                    id: 3
                },
                {
                    title: 'Nouvelle estimation',
                    icon: 'fas fa-hospital-user',
                    id: 4
                } 
            ],
            userMenuActive: false,
            user :{isPro : false}
        }
    }

    changeActiveMenu(id) {
        this.props.activateMenu(id);
        this.setState({openMenu: false})
    }

    componentDidUpdate() {
        if(this.props.location !== this.state.location) {
            this.setState({location: this.props.location});
        }
    }

    render() {
        const {location: {pathname}} = this.props;
        
      
        return (
            <div className="navbar-holder">
                <nav>
                    <div className="desktop-navigation">
                    { pathname.startsWith('/Offres-pro') ? (
                        <div className="logo-brand">
                            <Link to="/"> <img src={logo_pro} className="logo-image_pro" alt="Agenz logo" /> </Link>
                        </div>
                    ) :
                    this.props.authenticated ?
                    ( this.props.authenticatedPro ? (
                        <div className="logo-brand">
                        <Link to="/"> <img src={logo_pro} className="logo-image_pro" alt="Agenz logo" /> </Link>
                    </div>
                    ) : (
                        <div className="logo-brand">
                        <Link to="/"> <img src={logo} className="logo-image" alt="Agenz logo" /> </Link>
                    </div>
                    )) : (
                        <div className="logo-brand">
                        <Link to="/"> <img src={logo} className="logo-image" alt="Agenz logo" /> </Link>
                    </div>
                    )
                }
                        <div className="main-nav-items">
                            <ul className="nav-links">
                                {this.state.menus.map((menu, index) => {
                                    return(
                                        <Link to={menu.title === "Estimer un bien" ? (
                                            this.props.authenticatedPro ? (
                                                "/estimationPro"
                                            ) : (menu.path)
                                        ) : (menu.path)}>
                                            <li key={index} className={this.state.location.pathname === menu.path? "active" : ""}
                                            onClick={() => this.setState({...this.state, open: !this.state.open})}>
                                                {menu.title === "Estimer un bien" ? (
                                                    this.props.authenticatedPro ? (
                                                        "Créer un dossier"
                                                    ) : (menu.title)
                                                ) : (menu.title)}
                                            </li>
                                        </Link>
                                    );
                                }) }
                            </ul>
                        </div>
                        {/* <div className="user-nav-items">
                            { this.props.user === null && (
                                <ul className="nav-links">
                                    <Link to='/login-pro-space'>
                                        <li className="pro-button"
                                        onClick={() => this.setState({...this.state, open: !this.state.open})}>
                                        Espace Pro
                                        </li>
                                    </Link>
                                    <Link to='/login'>
                                        <li
                                        onClick={() => this.setState({...this.state, open: !this.state.open})}>
                                        Login
                                        </li>
                                    </Link>
                                </ul>
                            ) }
                            { this.props.user !== null && (
                                <ul className="nav-links">
                                    <li className="user-connected-dropdown" onClick={(e) => {
                                        e.stopPropagation();
                                        this.setState({
                                            ...this.state,
                                            userMenuActive: !this.state.userMenuActive
                                        })
                                    }}>
                                        { this.props.user.firstName }&nbsp;
                                        { this.props.user.lastName }&nbsp;&nbsp;
                                        { this.state.userMenuActive ? <i class="fas fa-chevron-up"></i> : <i class="fas fa-chevron-down"></i> }
                                        <div className={this.state.userMenuActive ? 'user-connected-dropdown--container user-connected-dropdown--open' : 'user-connected-dropdown--container'}>
                                            { !this.props.user.isPro ? (

                                                <div className="user-connected-dropdown--myspace">
                                                    <Link to="/account"
                                                    onClick={() => this.setState({...this.state, open: !this.state.open})}
                                                    >
                                                        <i class="fas fa-user"></i>
                                                        Mon espace
                                                    </Link>
                                                </div>
                                            ) : (
                                                <div className="user-connected-dropdown--prospace">
                                                    <Link to="/pro-space"
                                                    onClick={() => this.setState({...this.state, open: !this.state.open})}>
                                                        <i class="fas fa-user-tie"></i>
                                                        Espace pro
                                                    </Link>
                                                </div>
                                            ) }
                                            <div className="user-connected-dropdown--logout" onClick={this.props.signOut}>
                                                <i class="fas fa-power-off"></i>
                                                Déconnexion
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            ) }
                        </div>
                     */}
                    



                     <div className="user-nav-items">
                            { !this.props.authenticated ? (
                                <ul className="nav-links">
                                    <Link to='/Offres-pro'>
                                        <li className="pro-button">
                                        Nos offres pro
                                        </li>
                                    </Link>
                                    <Link to='/login'>
                                        <li>
                                        Connexion
                                        </li>
                                    </Link>
                                </ul>
                            )  : 
                            this.props.authenticated ? (
                                <ul className="nav-links">

                                        {/* { this.props.user.firstName }&nbsp;
                                        { this.props.user.lastName }&nbsp;&nbsp; */}
                                        {/* { this.state.userMenuActive ? <i class="fas fa-chevron-up"></i> : <i class="fas fa-chevron-down"></i> } */}
                                            { !this.props.authenticatedPro ? (
                                                <>
                                                    <Link className="myspace-link" to="/account">
                                                        <li>
                                                        <i class="fas fa-user"></i>
                                                        Mon espace
                                                        </li>
                                                    </Link>
                                                    <Link to="/Offres-pro">
                                                       <li className="pro-button">
                                                        Nos offres pro
                                                        </li>
                                                    </Link>
                                                    </>
                                            ) : (
                                                this.props.location.pathname==="/pro-space" ? (""):(

                                                      <Link to="/pro-space">
                                                      <li className="pro-button">
                                                       Espace pro
                                                       </li>
                                                   </Link>
                                                )

                                            )}
                                            
                                                    
                                
                                                
                                             
                                            <li>
                                            <div className="user-connected--logout" onClick={this.props.signOut}>

                                                <i style={{color:'#bf360c'}} class="fas fa-power-off"></i>
                                                

                                            </div>
                                            </li>

                                </ul>
                            ) : (
                                <ul className="nav-links">
                                <Link to='/Offres-pro'>
                                    <li className="pro-button">
                                    Nos offres pro
                                    </li>
                                </Link>
                                <Link to='/login'>
                                    <li>
                                    Connexion
                                    </li>
                                </Link>
                            </ul>
                            ) }
                        </div>








                        </div>

                    <div className="small-screen-navigation">
                        <div className="logo-brand">
                            <Link to="/"> <img src={logo} className="logo-image" alt="Agenz logo" /> </Link>
                        </div>
                        <div className="drawer-menu-mobile" style={{transform: this.state.open? "translateX(0px)" : ""}}>
                            <div className="logo-brand-drawer">
                                <Link to="/"> <img src={logo} className="logo-image" alt="Agenz logo" /> </Link>
                            </div>
                            <div className="main-nav-items">
                                <ul className="nav-links">
                                    {this.state.menus.map((menu, index) => {
                                        return(
                                            <Link to={menu.path}>
                                                <li key={index} className={this.state.location.pathname === menu.path? "active" : ""}
                                                onClick={() => this.setState({...this.state, open: !this.state.open})}>
                                                <i className={ "fas " + menu.icon }></i>
                                                {menu.title === "Estimer un bien" ? (
                                                    this.props.authenticatedPro ? (
                                                        "Créer un dossier"
                                                    ) : (menu.title)
                                                ) : (menu.title)}
                                                </li>
                                            </Link>
                                        );
                                    }) }
                                </ul>
                            </div>
                            <div className="user-nav-items">
                                { !this.props.authenticated ? (
                                    <ul className="nav-links">
                                         <Link to='/Offres-pro' onClick={() => this.setState({...this.state, open: !this.state.open})}>
                                            <li>
                                                <i class="fas fa-user-tie"></i>
                                                Nos offres pro
                                            </li>
                                        </Link>
                                        <Link to='/login'
                                         onClick={() => this.setState({...this.state, open: !this.state.open})}>
                                            <li>
                                            <i className="fas fa-user-alt"></i>
                                            Se connecter
                                            </li>
                                        </Link>
                                    </ul>
                                ) : 
                                    <ul className="nav-links">
                                        { !this.props.authenticatedPro ? (
                                            <>
                                            <Link to="/account">
                                                <li
                                                onClick={() => this.setState({...this.state, open: !this.state.open})}>
                                                    <i class="fas fa-user"></i>
                                                    Mon espace
                                                </li>
                                            </Link>
                                            <Link to='/Offres-pro' onClick={() => this.setState({...this.state, open: !this.state.open})}>
                                            <li>
                                            <i class="fas fa-user-tie"></i>
                                            Nos offres pro
                                            </li>
                                        </Link>
                                        </>
                                        ) : (
                                            this.props.location.pathname==="/pro-space" ? (""):(

                                            <Link to="/pro-space">
                                                <li
                                                onClick={() => this.setState({...this.state, open: !this.state.open})}>
                                                    <i class="fas fa-user-tie"></i>
                                                    Espace pro
                                                </li>
                                            </Link>
                                            )
                                        ) }
                                        <Link to="/"
                                        onClick={() => this.setState({...this.state, open: !this.state.open})}>
                                            <li onClick={this.props.signOut}>
                                                <i class="fas fa-power-off"></i>
                                                Déconnexion
                                            </li>
                                        </Link>
                                    </ul>
                                }
                            </div>
                        </div>
            
                        <span className="mobile-burger" onClick={() => this.setState({...this.state, open: !this.state.open})}>
                            <i className={!this.state.open? "fas fa-bars" : "fas fa-times"} ></i>
                        </span>
                    </div>
                </nav>
            </div>
        );

        // if (this.state.location.pathname === "/account") {
        
        //     if(!this.props.uid) return <Redirect to="/login"/>
        //     return (
        //         <div className="navbar-holder account-menu">
        //             <nav>
        //                 <div className="logo-brand">
        //                     <Link to="/"> <img src={logo} className="logo-image" alt="Agenz logo" /></Link>
        //                 </div>
        //                 <div className="drawer-menu" style={{transform: this.state.openMenu ? 'translateX(0px)' : ''}}>
        //                     <div className="logo-brand-drawer">
        //                         <Link to="/"> <img src={logo} className="logo-image" alt="Agenz logo" /> </Link>
        //                     </div>
        //                     <ul className="nav-links">
        //                     {this.state.menus.map((menu, index) => {
        //                                 return(
        //                                     <Link to={menu.path}>
        //                                         <li key={index} className={this.state.location.pathname === menu.path ? "active" : ""}
        //                                         onClick={() => this.setState({...this.state, open: !this.state.open})}>
        //                                         <i className={ "fas " + menu.icon }></i>
        //                                         {menu.title}
        //                                         </li>
        //                                     </Link>
        //                                 );
        //                     }) }
        //                     <Link to='/account'>
        //                         <li
        //                         className={this.state.location.pathname === "/account" ? "active" : ""}
        //                         onClick={() => this.setState({...this.state, open: !this.state.open})}
        //                         >
        //                         <i className="fas fa-user-alt"></i>
        //                         Mon espace
        //                         </li>
        //                     </Link>
        //                     </ul>
        //                     <div className="logout-button">
        //                         <button className="btn-danger" onClick={this.props.signOut}>Déconnextion</button>
        //                     </div>
        //                 </div>
                        
        //                 <div className="drawer-menu-mobile" style={{transform: this.state.openMenu ? 'translateX(0px)' : ''}}>
        //                     <div className="logo-brand-drawer">
        //                         <Link to="/"> <img src={logo} className="logo-image" alt="Agenz logo" /> </Link>
        //                     </div>
        //                     <ul className="nav-links">
        //                         {this.state.menusItems.map((menusItem, indexx) => {
        //                             if( menusItem.id === 4) {
        //                                 return(
        //                                     <Link to={"/estimation"}>
        //                                         <li
        //                                         key={indexx}
        //                                         className={this.props.activeMenu === menusItem.id ? "active" : ""}
        //                                         onClick={() => {this.changeActiveMenu(0)}}>
        //                                         <i className={ menusItem.icon }></i>
        //                                         {menusItem.title}
        //                                         </li>
        //                                     </Link>
        //                                 );
        //                             } else {
        //                                 return(
        //                                     <div className="nav-div">
        //                                         <li
        //                                         key={indexx}
        //                                         className={this.props.activeMenu === menusItem.id ? "active" : ""}
        //                                         onClick={() => {
        //                                             this.changeActiveMenu(menusItem.id)
        //                                             }}>
        //                                         <i className={ menusItem.icon }></i>
        //                                         {menusItem.title}
        //                                         </li>
        //                                     </div>
        //                                 );
        //                             }
        //                         })}
        //                     </ul>
        //                     <div className="logout-button">
        //                         <button className="btn-danger" onClick={this.props.signOut}>Déconnextion</button>
        //                     </div>
        //                 </div>
        //                 <span
        //                 className="mobile-burger" 
        //                 onClick={() => this.setState({openMenu: !this.state.openMenu})}>
        //                     <i className={!this.state.openMenu ? "fas fa-bars" : "fas fa-times"} ></i>
        //                 </span>
        //             </nav>
        //         </div>
        //     );
        // } else {
        //     if (this.props.user) {
        //         return (
        //             <div className="navbar-holder">
        //                 <nav>
        //                     <div className="logo-brand">
        //                         <Link to="/"> <img src={logo} className="logo-image" alt="Agenz logo" /> </Link>
        //                     </div>
                            
        
        //                     <div className="drawer-menu-mobile" style={{transform: this.state.open ? "translateX(0px)" : ""}}>
        
        //                         <div className="logo-brand-drawer">
        //                             <Link to="/"> <img src={logo} className="logo-image" alt="Agenz logo" /> </Link>
        //                         </div>
        
        //                         <ul className="nav-links">
        //                             {this.state.menus.map((menu, index) => {
        //                                 return(
        //                                     <Link to={menu.path}>
        //                                         <li key={index} className={this.state.location.pathname === menu.path ? "active" : ""}
        //                                         onClick={() => this.setState({...this.state, open: !this.state.open})}>
        //                                         <i className={ "fas " + menu.icon }></i>
        //                                         {menu.title}
        //                                         </li>
        //                                     </Link>
        //                                 );
        //                             }) }
        //                             { this.props.user && this.props.user.isPro && (
        //                                 <Link to='/pro-space'>
        //                                     <li
        //                                     className={this.state.location.pathname === "/pro-space" ? "active" : ""}
        //                                     onClick={() => this.setState({...this.state, open: !this.state.open})}
        //                                     >
        //                                     <i className="fas fa-user-alt"></i>
        //                                     Espace Pro
        //                                     </li>
        //                                 </Link>
        //                             )}
        //                             { this.props.user && !this.props.user.isPro && (
        //                                 <Link to='/account'>
        //                                     <li
        //                                     onClick={() => this.setState({...this.state, open: !this.state.open})}
        //                                     >
        //                                     <i className="fas fa-user-alt"></i>
        //                                     Mon espace
        //                                     </li>
        //                                 </Link>
        //                             )}
        //                         </ul>
        
        //                         <div className="logout-button">
        //                             <button className="btn-danger" onClick={this.props.signOut}>Déconnexion</button>
        //                         </div>
        //                     </div>
        
        //                     <span className="mobile-burger" onClick={() => this.setState({...this.state, open: !this.state.open})}>
        //                         <i className={!this.state.open? "fas fa-bars" : "fas fa-times"} ></i>
        //                     </span>
        //                 </nav>
        //             </div>
        //         );
            // }
        }
    }


const mapStateToProps = (state) => {
    const uid = state.auth.uid;
    const estimationState = state.estimationState;
    const activeMenu = state.estimationState.accountActiveMenu;
    return {
        uid: uid,
        authenticated : state.auth.authenticated,
        estimationState: estimationState,
        activeMenu: activeMenu,
        user: state.auth.user,
        authenticatedPro : state.auth.authenticatedPro
    };
};
const mapDistpatchToProps = (dispatch) => {
    return {
        signOut: () => {
            dispatch({ type: 'LOADER_TRUE' })
            dispatch(signOut());
        },
        activateMenu: (id) => dispatch({ type: 'SET_ACCOUNT_ACTIVE_MENU', data: id})
    };
};
export default connect(mapStateToProps, mapDistpatchToProps) (withRouter(Navbar));
