import React from 'react';
import Axios from 'axios';
import { connect } from "react-redux";
import { CSSTransition } from 'react-transition-group';
import EstimationTerrainNus from './AccountComponents/estimationTerrainNus';
import EstimationAppartement from './AccountComponents/estimationAppartement';
import EstimationVilla from './AccountComponents/estimationVilla';
import Parametres from './AccountComponents/parametres';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import './AccountComponent.scss';



const menusItems = [
    {
        title: 'Villas',
        icon: 'fa fa-home',
        id: 2
    },
    // {
    //     title: 'Terrains nus',
    //     icon: 'far fa-square',
    //     id: 1
    // },
    {
        title: 'Appartements',
        icon: 'fas fa-building',
        id: 0
    },
    {
        title: 'Mes paramètres',
        icon: 'fas fa-cog',
        id: 3
    },
    {
        title: 'Nouvelle estimation',
        icon: 'fas fa-hospital-user',
        id: 4
    }
    
] ;

class AccountComponent extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            activeMenu : '2',
            formattedAddress: '',
            open: false
        }
    }

    getEstimations() {
        let estimationDatas = [];
        if(this.props.email && this.props.uid) {
       

        
        Axios.get('https://us-central1-agenz-website-prod.cloudfunctions.net/api/estimationsUser').then(result => {
        estimationDatas = result.data
        this.props.dispatch({ type: 'SET_USER_ESTIMATION', data: estimationDatas}); 
        })
        .catch((error) =>{
            this.props.dispatch({ type: 'LOADER_FALSE' });
            this.setState({loading : false})
            toast.error("Votre session à expirée")
            localStorage.removeItem('FBIdToken');
            this.props.history.push("/");
        });

    }

    else {
        toast.error("Impossible de récupérer vos estimations");
        // this.props.dispatch({type : "SIGN_OUT"});
        // <Redirect to="/"/>
    }
    }

    componentDidMount = () => {
        this.getEstimations()
        // this.setState({activeMenu: this.props.activeMenu})

    }

    setOpen = () => { 
        // //console.log("ok")
        this.setState({open: !this.state.open}) }

    render () {
        return (
            <div className="account">
                <div className={this.state.activeMenu !== 4 ? "account-left-side": 'menu-disappear'} style={{transform: this.state.open?
                        "translateX(0px)" : ""}}>
                    <div className="menu-items">
                        {menusItems.map((menusItem, indexx) => {
                            if( menusItem.id === 4) {
                                return(
                                    <Link to={"/estimation"}>

                                        <div  key={indexx} className="menu-item" >
                                            <span> <i className={menusItem.icon}></i> </span>
                                            <span>{menusItem.title}</span>
                                        </div>
                                    </Link>
                                );
                            }else {
                                return(
                                    <>
                                    {
                                        
                                       <div  key={indexx} className={this.state.activeMenu === menusItem.id ? "menu-item active active-account" : "menu-item"}
                                        onClick={() =>{ 
                                            // //console.log("click")
                                           this.setState({activeMenu: menusItem.id}) 
                                           this.setOpen();
                                           this.props.dispatch({type: 'SET_ACCOUNT_ACTIVE_MENU', data: menusItem.id})
                                           }}>
                                            <span> <i className={menusItem.icon}></i> </span>
                                            <span>{menusItem.title}</span>
                                        </div>
                                    }
                                    
                                    </>
                                    
                                );
                            }
                            
                        }) }
                        
    
                    </div>
                    
                </div>
                <div className = "accountMenuIcon" 
                onClick = {() => {
                    this.setState({open: !this.state.open})
                }}
                >
                    <i class="fab fa-elementor"></i>
                </div>

                 <div className={this.props.activeMenu !== 4 ? "account-right-side ": 'full-page'}>
                 <div className="account--welcome">Bonjour  {this.props.user ? this.props.user.firstName : ""}, </div>

                 <CSSTransition appear={true} unmountOnExit in={this.props.activeMenu === 0} timeout={300} classNames="menuTransition">
                        <EstimationAppartement />
                    </CSSTransition>
                  
                    <CSSTransition appear={true} unmountOnExit in={this.props.activeMenu === 2} timeout={300} classNames="menuTransition">
                        <EstimationVilla />
                    </CSSTransition>



                    <CSSTransition appear={true} unmountOnExit in={this.props.activeMenu === 1} timeout={300} classNames="menuTransition">
                        <EstimationTerrainNus />
                    </CSSTransition>

                    <CSSTransition appear={true} unmountOnExit in={this.props.activeMenu === 3} timeout={300} classNames="menuTransition">
                        <Parametres />
                    </CSSTransition>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    const uid = state.auth.uid;
    const email = state.auth.email;
    const estimation = state.userEstimation;
    return {
    user : state.auth.user,
      uid: uid,
      email: email,
      estimation: estimation,
      activeMenu: state.estimationState.accountActiveMenu
    };
};
export default connect(mapStateToProps)(AccountComponent);