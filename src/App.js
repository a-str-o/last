import React, { Suspense, lazy }from 'react';
import './App.scss';
import firebase from './Config/FirebaseConfig';
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
// import Polygone_Raw from './assets/polygonezone-text-casablanca.json'
// import MeanQuartier from './assets/meanCartier-casablanca.json'

import jwtDecode from 'jwt-decode';
import axios from 'axios'
import { toast } from "react-toastify";
import Loading from './Loading'

import ReactGA from "react-ga";
import CookieConsent from "react-cookie-consent";

function retry(fn, retriesLeft = 10, interval = 1000) {
  return new Promise((resolve, reject) => {
    fn()
      .then(resolve)
      .catch((error) => {
        setTimeout(() => {
          if (retriesLeft === 1) {
            // reject('maximum retries exceeded');
            reject(error);
            return;
          }

          // Passing on "reject" is the important part
          retry(fn, retriesLeft - 1, interval).then(resolve, reject);
        }, interval);
      });
  });
}

const Navbar =lazy(() => retry(()=> import ('./Components/Navbar/Navbar')));
const AuthRoute =lazy(() => retry(()=> import ('./AuthRoute')));
const AuthRoutePro =lazy(() => retry(()=> import ('./AuthRoutePro')));
const AuthRouteEstimationPro =lazy(() => retry(()=> import ('./AuthRouteEstimationPro')));
const Home =lazy(() => retry(()=> import ('./Pages/Home/Home')));
const Pricing =lazy(() => retry(()=> import ('./Pages/Pricing/Pricing')));
const Estimation =lazy(() => retry(()=> import ('./Pages/Estimation/Estimation')));
const EstimationPro =lazy(() => retry(()=> import ('./Pages/EstimationPro/EstimationPro')));
const Contact =lazy(() => retry(()=> import ('./Pages/Contact/Contact')));
const Login =lazy(() => retry(()=> import ('./Pages/Login/Login')));
const Register =lazy(() => retry(()=> import ('./Pages/Register/Register')));
const Account =lazy(() => retry(()=> import ('./Pages/Account/Account')));
const Publication =lazy(() => retry(()=> import ('./Pages/Publication/Publication')));
const EspacePro =lazy(() => retry(()=> import ('./Pages/EspacePro')));
const LoginEspacepro =lazy(() => retry(()=> import ('./Pages/LoginEspacepro/LoginEspacepro')));
const PublicEstimations =lazy(() => retry(()=> import ('./Pages/Estimations/Estimations')));
const Agence =lazy(() => retry(()=> import ('./Pages/Agence/Agence')));
const OffresPro =lazy(() => retry(()=> import ('./Pages/Offres-pro/OffresPro')));
const NotFound =lazy(() => retry(()=> import ('./Pages/NotFound/NotFound')));
const Cgu =lazy(() => retry(()=> import ('./Pages/Cgu/Cgu')));
const Places =lazy(() => retry(()=> import ('./Pages/Places/Places')));
const Rapport =lazy(() => retry(()=> import ('./Pages/RapportEstimation/Rapport')));
const PacksProEssentiel =lazy(() => retry(()=> import ('./Pages/PackProEssentiel/PackProEssentiel')));
const PacksProExpert =lazy(() => retry(()=> import ('./Pages/PackProExpert/PackProExpert')));
ReactGA.initialize("UA-177420042-1");




class App extends React.Component {
  
addHours = (h) => {
  return Date.now()+h*60*60*1000
}
is_authenticated = () => {
let authenticated = false;
const token = localStorage.FBIdToken;

// const token = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjNkOWNmYWE4OGVmMDViNDI0YmU2MjA1ZjQ2YjE4OGQ3MzI1N2JjNDIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYWdlbnotd2Vic2l0ZS1wcm9kIiwiYXVkIjoiYWdlbnotd2Vic2l0ZS1wcm9kIiwiYXV0aF90aW1lIjoxNjIyMTEyNDAyLCJ1c2VyX2lkIjoiNzE0RVV4TU55bGVRY0RRbXQ5T09GYUlsZDNvMSIsInN1YiI6IjcxNEVVeE1OeWxlUWNEUW10OU9PRmFJbGQzbzEiLCJpYXQiOjE2MjIxMTI0MDIsImV4cCI6MTYyMjExNjAwMiwiZW1haWwiOiJhYmVsLnNvdWxheW1hbmlAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImFiZWwuc291bGF5bWFuaUBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.GbCiDRPh5CIJqpteQUOdMZvLP3QuM7lITh82AnahBbvIU6_s2gEi-SHRPQRQvWNOCtYG2jgbfWE7zOrD2uL9r1-R8SA0R_3TDHzkmTYj-Y9_RrLsntTlxuwHb3o55TLqscrZpYmkwY-8Y5zWdNZ6I7qh7FI84XgyUPmPr-p4lXsuWL5m1IE5zVl3ZmKfc6AIlyOOBCYUzMMNNGT8oR8u-XmZE8DgKAk_euy_MrK5IuCYeM8x-9vOPLoR_pqoxzpF1aL7sOzR4csdCuudfVSYC6graniLUw03A2PbNP6ZcQGQPvkD-9ofROg3esdiJ5O7WAWrL7mTMrc8dc_JZzF7pA"
if(token){
  const decodedToken = jwtDecode(token);
  if(decodedToken.exp*1000 < this.addHours(-1)){
    this.props.dispatch({type : "SIGN_OUT"})
    toast.error("Votre session a expiré. Veuillez vous reconnecter");

    return(authenticated)
  }

  else {
    axios.defaults.headers.common['Authorization'] = token
    this.props.dispatch({ type: 'SET_UID', data : decodedToken.user_id});
    this.props.dispatch({ type: 'SET_EMAIL', data : decodedToken.email});
    this.props.dispatch({ type: 'SET_AUTHENTICATED'});
    if(!this.props.user){
      this.getUser(decodedToken.user_id).then((result)=>{
        this.props.dispatch({ type: 'UPDATE_USER', data: result });
        return(true)
      })
    }
    else if(!this.props.user.email){
      this.getUser(decodedToken.user_id).then((result)=>{
        // console.log(result)
        this.props.dispatch({ type: 'UPDATE_USER', data: result });
        return(true)

      })
    }
    else{
      return (true)
    }

}
}
// else {console.log("no token")}

}

is_authenticated_Pro = () => {
  const token = localStorage.FBIdToken;
  if(token){
  axios.post('https://us-central1-agenz-website-prod.cloudfunctions.net/api/isPro', {token : token}).then(result => {
    // console.log(result)
    if(result.data.succes){
    this.props.dispatch({ type: 'SET_AUTHENTICATED_PRO'});
    }
  })
  }
}

  authSubscription(auth, db) {
    auth.onAuthStateChanged( async user => {
      if (user) {
        // get the user information
        const user = await db.collection('users').doc(this.props.uid).get();
        this.props.dispatch({ type: 'UPDATE_USER', data: user.data() });
      } else {
        this.props.dispatch({ type: 'UPDATE_USER', data: null });
      }
    });
  }
  async getUser (id){
    return new Promise((resolve,reject)=> {
    const dbStore = firebase.firestore();
    var userRef = dbStore.collection("users")
    var query = userRef.doc(id);
    query.get().then((querySnapshot)=>{
    resolve(querySnapshot.data())
})
.catch(err=>{
    reject(err)
})
})
}

 
  agencesSubscription(db) {
    db.collection('agences').onSnapshot(snapshot => {
      const agences = [];
      snapshot.docs.forEach(doc => {
        agences.push(doc.data());
      });
      this.props.dispatch({ type: 'SET_AGENCES', data: agences });
    });
  }

  async getArticles(db) {
    const articlesSnapshot = await db.collection('articles').get();
    const articles = [];
    articlesSnapshot.docs.forEach(doc => articles.push(doc.data()));
    this.props.dispatch({ type: 'SET_PUBLICATIONS', data: articles });
  }

  async componentDidMount() {  

    // Create `axios` instance with pre-configured `axios-cache-adapter` attached to it

    
    await this.is_authenticated() 
    await this.is_authenticated_Pro()


    const db = firebase.firestore();

    // we will subscribe to the user authentication state in order to react to
    // it when a change happens
    // this.authSubscription(auth, db);

    // here we are going to subscribe to several data collections
    // in order to see their update live in the app
    // transactions
    // this.transactionSubscription(db);

    // agences
    this.agencesSubscription(db);

    // we will also simply extract one time some data that we do not need to see
    // updated live as it doesn't change too often, and certainly not during a user session
    // polygones
    //this.getpolygones(db);

    // mean neighborhood
    // this.getMeanCartier(db); 
    
    // this function will toggle the loader

    // articles
    this.getArticles(db);
    this.props.dispatch({ type: 'LOADER_FALSE' });


  }

  componentDidUpdate(prevProps){
    if(prevProps.history !== this.props.history){
              ReactGA.pageview(this.props.location.pathname+ this.props.location.search);
    }
  }

  render (){
    
    return (  
      <>
        {/* {this.props.loadState.loading && <Loader type="ball-grid-pulse" />}
        {!this.props.loadState.loading && ( */}
          <Router>
            <ToastContainer />
            
            <Suspense fallback={<Loading />}>
            <Navbar />
            <Switch>
              <Route  exact path='/' component={Home} />
              <Route  exact path='/index.html' component={Home} />
              <Route  path='/pricing' >
              <Redirect to="/prix-immobilier" /></Route>

              <Route  exact path='/prix-immobilier'>
                <Pricing/>
                </Route>
                <Route path='/prix-immobilier/:city/:quartier/:address'>
                <Pricing/>
                </Route>
                <Route  path='/prix-immobilier/:city/:quartier'>
                <Pricing/>
                </Route>
                <Route  path='/prix-immobilier/:city'>
                <Pricing/>
                </Route>
              
              <Route  path='/prix-immobilier/vente-recente/:address/:id'>
              <Pricing moreInfo={true} />
              </Route>
              <Route  path='/estimation' component={Estimation}/>
              <AuthRouteEstimationPro  path='/estimationPro' component={EstimationPro} authenticated={this.props.authenticatedPro} />
              <Route  path='/map.html' component={Estimation} />
              <Route  path='/contact'  component={Contact} />
              <Route  path='/login'  component={Login} />
              <Route  path='/login-pro-space'  component={LoginEspacepro} />
              <AuthRoute  path='/register'  component={Register} authenticated={this.is_authenticated() } />
              <Route  path='/account' component={Account} />
              <Route  path='/publication/:uid'  component={Publication} />
             
              <Route  path='/publication'> <Redirect to="/publication/outil-vente-immobilier" /> </Route>

              <Route  path='/impact-etat-appartement-prix.html'><Redirect to="/publication/faut-il-renover-avant-de-vendre" /> </Route>
              <Route  path='/chute-des-prix-apres-le-deconfinement.html'><Redirect to="/publication/evolution-du-marche-immobilier-pendant-le-confinement" /> </Route>
              <Route  path='/pourquoi-la-pratique-du-noir-disparaitra-en-2021.html'><Redirect to="/publication/Vendre-son-appartement-au-Maroc-decouvrez-pourquoi-la-pratique-du-noir-disparaitra-en-2021" /> </Route>

              <AuthRoutePro  path='/pro-space'  component={EspacePro} authenticated={this.props.authenticatedPro} />
            
              <Route  path='/Offres-pro'  component={OffresPro} />
              <Route  path='/rapport-estimation/:id'  component={Rapport} />
              <Route  path='/espace-pro.html'  component={OffresPro} />
              <Route  path='/conditions-d-utilisation'  component={Cgu} />

              <Route  path='/estimations'  component={PublicEstimations}/>
              <Route  path='/agence-immobiliere/casablanca/:uid'  component={Agence}/>
              <Route  path='/places/:uid'  component={Places}/>
              
              <Route path='/packs-pro-essentiel'  component={PacksProEssentiel} />
              <Route path='/packs-pro-expert'  component={PacksProExpert} />
              
              
              <Route component={NotFound} />
              
              </Switch>
            </Suspense>
          </Router>
          <CookieConsent debug={false}  location="bottom"
  buttonText="J'accepte"
  cookieName="cookie-consent"
  style={{ background: "#2B373B" }}
  buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
  expires={100} > En continuant la navigation sur le site, vous acceptez l'utilisation de cookies pour améliorer l'experience utilisateur. Accédez aux <a href="/conditions-d-utilisation" taget="__blank" rel="noreferrer" className="cookie-link">Conditions générales d'utilisations</a> pour en savoir plus ou envoyez un email à contact@agenz.ma.</CookieConsent>

        {/* )} */}
      
      </>
    )
  }
  
} 

const mapStateToProps = (state) => {
  const uid = state.auth.uid;
  const email = state.auth.email;
  const estimation = state.estimationState;
  const authenticatedPro = state.auth.authenticatedPro

  return {
    uid: uid,
    email: email,
    estimationState: estimation,
    user: state.auth.user,
    loadState: state.loading,
    authenticatedPro : authenticatedPro
  };
};

export default connect(mapStateToProps)(App);
