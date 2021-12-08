
import { toast } from "react-toastify";
import axios from 'axios';

const generateID = () => {
  let length = 3,
  charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
  retVal = "";
  for (let i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal + new Date().getTime();
}
const estimation = {
      localisation: "", // Sans consequence pour l'API lat : 33.58745398732572 lng : -7.627325140465932
      bien: "appartement",
      adresse: "", // Sans consequence pour l'API
      zone: "",
      typologie: 1, // Nombre entier (le nombre de chambre)
      surfacehabitable: null, // Nombre entier (int)
      surfacebalcon: 0, // Nombre entier (int)
      surfacecave: 0, // Nombre entier (int)
      etagesimmeuble: 0, // doit etre une int ou float 
      etage: 1, // 0 pour l'instant (on demandait le nombre d'etage dans l'immeuble avant mais c'est plus le cas)
      sdb: 1, // Nombre entier (Nombre de salles de bains)
      orientation: "Je ne sais pas", // "Je ne sais pas", "est", "nord", "ouest", "sud", "sudouest", "double"
      finition: "correct", // "travauxaprevoir", "correct", "refaitaneuf"
      agencement: 1, // 1 , 2 , 3 , ou 4
      luminosite: 1, // 1 , 2 , 3 , ou 4
      cave: 0, // 0 si pas de cave, 1 si il y a une cave
      parking: 0, // 0 si pas de parking, 1 si il y a un parking
      placesparking: 1, // Nombre entier (nombre de places de parking)
      duplex: 0, // 0 ou 1 (pour "oui" ou "non")
      cheminee: 0, // 0 ou 1 (pour "oui" ou "non")
      concierge: 0, // 0 ou 1 (pour "oui" ou "non")
      calme: 0, // 0 ou 1 (pour "oui" ou "non")
      chambreservice: 0, // 0 ou 1 (pour "oui" ou "non")
      cuisinefermee: 0, // 0 ou 1 (pour "oui" ou "non")
      climatisation: 0, // 0 ou 1 (pour "oui" ou "non")
      vueexceptionnelle: 0, // 0 ou 1 (pour "oui" ou "non")
      renovee: 0, // (Pas d'importance, c'est un ancien critere)
      redejardin: "non", // "non", "ouicollectif"
      construction: -1, // -1 : Pour "Je ne sais pas", 0 : Pour "Moins de 5 ans", 1 : Pour "Entre 10 et 20 ans", 2 : Pour "Plus de 20 ans", 3 : Pour "Moins de 10 ans", 4 : Pour Construction neuve
      ascenseur: 0, // 0 ou 1 (pour "oui" ou "non")
      categorie: "particulier", // Sans consequence pour l'API
      activite: "-", // Sans consequence pour l'API
      proprietaire: "", // Sans consequence pour l'API
      projet_vente: "", // Sans consequence pour l'API
      moyens: "pas_precise", // Sans consequence pour l'API
      a_contacter: "pas precise", // Sans consequence pour l'API
      telephone: "", // Sans consequence pour l'API
      balcon: 0, // 0 ou 1 (pour "oui" ou "non")
      surfaceparking: 0, // Nombre entier
      supprimeLe: null,
      raison_estimation: "",


      //Villa
      surfaceterrain: null, // Nombre entier
      surfaceconstruite: null, // Nombre entier
      murmitoyen: 0, // Nombre entier
      typevilla: "villajumelee", // "villajumelee", "villaenbande"
      garage: 0, // Nombre entier
      piscine: 0, // Nombre entier
      chaufeausolaire: 0, // Nombre entier
      typechauffage: -1, // -1 : Pour "Je ne sais pas", 0 : Pour "Electrique", 1 : Pour "Chaudière centrale au fuel", 2 : Pour "Chaudière centrale au gaz", 3 : Pour "Pompe à chaleur"
      etatgeneral: "correct", // "travauxaprevoir", "correct", "etatneuf"
      anneeconstruction: -1, // -1 : Pour "Je ne sais pas", 0 : Pour "Neuve", 1 : Pour "Entre 1 et 5 ans", 2 : Pour "Entre 5 et 10 ans", 3 : Pour "Plus de 10 ans", 4 : Pour "Pls de 20 ans"
}

const estimationReducer = (
  state = {
    estimation: {
      bien: "appartement",
      localisation: "", // Sans consequence pour l'API lat : 33.58745398732572 lng : -7.627325140465932
      adresse: "", // Sans consequence pour l'API
      zone: "",
      typologie: 1, // Nombre entier (le nombre de chambre)
      surfacehabitable: null, // Nombre entier (int)
      surfacebalcon: 0, // Nombre entier (int)
      surfacecave: 0, // Nombre entier (int)
      etagesimmeuble: 0, // doit etre une int ou float 
      etage: 1, // 0 pour l'instant (on demandait le nombre d'etage dans l'immeuble avant mais c'est plus le cas)
      sdb: 1, // Nombre entier (Nombre de salles de bains)
      orientation: "Je ne sais pas", // "Je ne sais pas", "est", "nord", "ouest", "sud", "sudouest", "double"
      finition: "correct", // "travauxaprevoir", "correct", "refaitaneuf"
      agencement: 1, // 1 , 2 , 3 , ou 4
      luminosite: 1, // 1 , 2 , 3 , ou 4
      cave: 0, // 0 si pas de cave, 1 si il y a une cave
      parking: 0, // 0 si pas de parking, 1 si il y a un parking
      placesparking: 1, // Nombre entier (nombre de places de parking)
      duplex: 0, // 0 ou 1 (pour "oui" ou "non")
      concierge: 0,// 0 ou 1 (pour "oui" ou "non")
      cheminee: 0, // 0 ou 1 (pour "oui" ou "non")
      calme: 0, // 0 ou 1 (pour "oui" ou "non")
      chambreservice: 0, // 0 ou 1 (pour "oui" ou "non")
      cuisinefermee: 0, // 0 ou 1 (pour "oui" ou "non")
      climatisation: 0, // 0 ou 1 (pour "oui" ou "non")
      vueexceptionnelle: 0, // 0 ou 1 (pour "oui" ou "non")
      renovee: 0, // (Pas d'importance, c'est un ancien critere)
      redejardin: "non", // "non", "ouicollectif"
      construction: -1, // -1 : Pour "Je ne sais pas", 0 : Pour "Moins de 5 ans", 1 : Pour "Entre 10 et 20 ans", 2 : Pour "Plus de 20 ans", 3 : Pour "Moins de 10 ans", 4 : Pour Construction neuve
      ascenseur: 0, // 0 ou 1 (pour "oui" ou "non")
      categorie: "particulier", // Sans consequence pour l'API
      activite: "-", // Sans consequence pour l'API
      proprietaire: "", // Sans consequence pour l'API
      projet_vente: "", // Sans consequence pour l'API
      moyens: "pas_precise", // Sans consequence pour l'API
      a_contacter: "pas precise", // Sans consequence pour l'API
      telephone: "", // Sans consequence pour l'API
      balcon: 0, // 0 ou 1 (pour "oui" ou "non")
      surfaceparking: 0, // Nombre entier
      raison_estimation: "",


      //Villa
      surfaceterrain: null, // Nombre entier
      surfaceconstruite: null, // Nombre entier
      murmitoyen: 0, // Nombre entier
      typevilla: "villajumelee", // "villajumelee", "villaenbande"
      garage: 0, // Nombre entier
      piscine: 0, // Nombre entier
      chaufeausolaire: 0, // Nombre entier
      typechauffage: -1, // -1 : Pour "Je ne sais pas", 0 : Pour "Electrique", 1 : Pour "Chaudière centrale au fuel", 2 : Pour "Chaudière centrale au gaz", 3 : Pour "Pompe à chaleur"
      etatgeneral: "correct", // "travauxaprevoir", "correct", "etatneuf"
      anneeconstruction: -1, // -1 : Pour "Je ne sais pas", 0 : Pour "Neuve", 1 : Pour "Entre 1 et 5 ans", 2 : Pour "Entre 5 et 10 ans", 3 : Pour "Plus de 10 ans", 4 : Pour "Pls de 20 ans"
    },
    marker: {
      latitude: null,
      longitude: null,
    },
    steps : ['Adresse', 'Type', 'Informations', 'Caractéristiques', 'Le bien et vous'],
    activeStep: 0,
    openLoginModal :false,
    openEstimateModal: false,
    openLocationErrorModal: false,
    openPhoneModal: false,
    openAvisModal: false,
    openConfirmationModal: false,
    isLoaded: false,
    pointExist: false,
    positionSelected: false,
    surfaceHaitableError:false,
    orientationError:false,
    finitionError:false,
    constructionError:false,
    rejardinError:false,
    surfaceCaveError:false,
    surfaceBalconError:false,
    surfaceParkingError:false,
    paceParkingError: false,
    surfaceTerrainError: false,
    surfaceConstruiteError: false,
    is_cave: false,
    is_balcon: false,
    is_parking: false,
    active_house : 2,
    active_categorie : 1,
    button_type : 'button',
    user: {isPro : false},
    viewport: {
      latitude:33.5661958,
      longitude:-7.6502371,
      zoom: 11
    },
    initialViewport: {
      latitude:33.5661958,
      longitude:-7.6502371,
      zoom: 11
    },
    urlViewport: {
      latitude: null,
      longitude: null,
      zoom: 13
    },
    interactionState: {},
    settings: {
        dragPan: true,
        dragRotate: true,
        scrollZoom: true,
        touchZoom: true,
        touchRotate: true,
        keyboard: true,
        doubleClickZoom: true,
        minZoom: 0,
        maxZoom: 20,
        minPitch: 0,
        maxPitch: 85
    },
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    estimationId: '',
    estimationError: '',
    lastTransaction: null,
    accountActiveMenu: 0,
    currentAdress: ''
  }, 
  action) => {
    switch (action.type) {
      case 'REINIT_ESTIMATION_FLOW': {
        state = {
          ...state,
          estimation: estimation,
          activeStep: 0,
          estimationId: '',
          estimationError: '',
          viewport: {
            latitude:33.5661958,
            longitude:-7.6502371,
            zoom: 11
          },
          initialViewport: {
            latitude:33.5661958,
            longitude:-7.6502371,
            zoom: 11
          },
          marker: {
            latitude: null,
            longitude: null,
          },
        }

        return state;
      }
      case 'SET_CURRENT_ADDRESS': {
        state = {...state, currentAdress: action.data.address,
          estimation: {
            ...state.estimation,
            adresse: action.data.address,
            ville: action.data.ville
          }
        };
        return state;
      }

      case 'SET_ACCOUNT_ACTIVE_MENU': {
        state = {...state, accountActiveMenu: action.data};
        return state;
      }

      case 'SET_LAST_TRANSACTION': {
        state = {...state, lastTransaction: action.data};
        return state;
      }
      case 'UPDATE_LOCATION_ERROR_MODAL': {
        state = {...state, openLocationErrorModal: action.data};
        return state;
      }
      case 'UPDATE_PHONE_MODAL': {
        state = {...state, openPhoneModal: action.data};
        return state;
      }

      case 'ADD_AVIS_MODAL': {
        state = {...state, openAvisModal: action.data};
        return state;
      }
      case 'CLOSE_AVIS_MODAL': {
        state = {...state, openAvisModal: false};
        return state;
      }

      case "ADD_ESTIMATION_ERR": {
        toast.error("L'enregistrement a rencontré une erreur");
        return state;
      }

      case "ADD_ESTIMATION": {
        toast.success("Retrouvez l'estimation dans votre espace personnel");
        return state;
      }
      case "ADD_PRE_ESTIMATION_FIREBASE": {
        state = {...state}
        //console.log(action.data)
        //console.log(state)
        // const estimation = action.data;
        let estimationId = generateID();
        //console.log(estimationId)
        axios.post('https://us-central1-agenz-website-prod.cloudfunctions.net/api/addEstimation',{estimation: {...action.data, inscription : "Non"}, estimationId : estimationId }).then(result => {
        // axios.post('https://us-central1-agenz-website-prod.cloudfunctions.net/api/addEstimation',{estimation: action.data, estimationId : estimationId }).then(result => {

        // db.collection('estimations').add(estimation).then(res => {
        // db.collection('estimations').doc(res.id).update({ estimationId: estimationId });
          toast.success("Le calcul de votre estimation est terminé. Retrouvez le résultat à tout instant dans votre espace personnel");

        }).catch(err => {
        
          toast.error('L\'enregistrement de votre estimation a rencontré une erreur');
          return state;
        });
        state = {...state, estimationId: estimationId};
        return state;
      }    
      case "ADD_ESTIMATION_FIREBASE": {
        state = {...state}
        
        let estimationId;
        if(state.estimationId!==''){
          estimationId = state.estimationId
        }
        else{
        estimationId = generateID();
        }
        
        axios.post('https://us-central1-agenz-website-prod.cloudfunctions.net/api/updateEstimationUser',{estimation: {...action.data, inscription : "Oui"}, estimationId : estimationId }).then(result => {

        // axios.post('https://us-central1-agenz-website-prod.cloudfunctions.net/api/updateEstimationUser',{estimation: action.data, estimationId : estimationId }).then(result => {


        // db.collection('estimations').add(estimation).then(res => {
          // db.collection('estimations').doc(res.id).update({ estimationId: estimationId });
          toast.success("Retrouvez l'estimation dans votre espace personnel");

        }).catch(err => {
          toast.error('L\'enregistrement de votre estimation a rencontré une erreur');
          return state;
        });

        // send estimation confirmation email
        // const sendResult = firebase.functions().httpsCallable('sendResult');
        
        let estimationPriceRound = Math.round(state.estimation.estimation.toFixed() / 1000) * 1000
        

        const estimationPrice = new Intl.NumberFormat(
          'ma',
          {
              style: 'currency',
              currency: 'MAD',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0 
          })
          .format(estimationPriceRound)
          .replace(/,/g, ' ')
          const estimationHigh = new Intl.NumberFormat(
          'ma',
          {
              style: 'currency',
              currency: 'MAD',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0 
          })
          .format(Math.round(( state.estimation.estimation.toFixed() * (1 + (state.estimation.variateur / 100))) / 1000) * 1000)
          .replace(/,/g, ' ')
          const estimationLow = new Intl.NumberFormat(
          'ma',
          {
              style: 'currency',
              currency: 'MAD',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0 
          })
          .format(Math.round(( state.estimation.estimation.toFixed() *  (1 - (state.estimation.variateur / 100))) / 1000 ) * 1000)
          .replace(/,/g, ' ')
          const body = {
          email: action.data.email ? action.data.email : action.data.user.email ,
          name: action.data.user.firstName ? action.data.user.firstName : action.data.email,
          surname: action.data.user.lastName ? action.data.user.lastName : action.data.user.email,
          estimation: estimationPrice,
          estimationHigh,
          estimationLow,
          address: state.estimation.adresse
        }
        //console.log(body)
        delete axios.defaults.headers.common["Authorization"]
        axios.post('https://us-central1-agenz-website-prod.cloudfunctions.net/api/sendResults',body).then(res => {
          //console.log("resultat" , res);
        axios.defaults.headers.common["Authorization"]=localStorage.getItem("FBIdToken")

        }).catch(err => { 
          
        });
        
        state = {...state, estimationId: estimationId};
        return state;
      }

      case "FILL_FORM_ERROR": {
        toast.error("Veuillez remplir toutes les informations necessaires"); 
        return state;
      }
      case 'UPDATE_FIREBASE_USER': {
        //console.log(action.data)
        state = {
          ...state, user: action.data
        }
        //console.log(state)
        return state;
      }
      case "CUSTOM_ERROR_MESSAGE": {
        //console.log(action.data)
        if(action.data.message==="The email address is already in use by another account."){
          toast.error("Cette adresse mail est déjà utilisée");
        }
        else if(action.data.code==="auth/weak-password"){

        toast.error("Le mot de passe doit contenir au moins 6 caractères");
        }
        else if(action.data.code==="auth/invalid-email"){

          toast.error("L'adresse e-mail renseignée est incorrecte");
          }
          else if(action.data.code==="auth/user-not-found"){

            toast.error("Cette adresse e-mail n'est associée à aucun compte");
            }
            else if(action.data.code==="auth/wrong-password"){

              toast.error("Mot de passe invalide");
              }
          else {
            
            toast.error(action.data.data);
            }
        return state;
      }
      case 'SET_MARKER_LOCATION': {
        state = {...state, marker: { latitude: action.data.latitude, longitude: action.data.longitude, zoom:13}};
        return state;
      }

      case 'SET_URL_VIEWPORT': {
        state = {...state, urlViewport: { latitude: action.data.latitude, longitude: action.data.longitude, calledForZoom: true}};
        return state;
      }

      case 'RESET_SEARCH_BAR_MAP': {
        state = { ...state,
          urlViewport: {
            latitude: null,
            longitude: null,
            calledForZoom: false
          },
        }
        return state;
      }
      case 'CONTACT_FIELDS_REQUIRED_ERROR': {
        console.log("euhh")
        toast.error("Veuillez remplir tous les champs !");
        return state;
      }

      case 'CONTACT_SEND_ERROR': {
        toast.error("L'enregistrement a rencontré une erreur !");
        return state;
      }

      case 'CONTACT_SEND_SUCCESS': {
        toast.success("Votre message a bien été reçu !");
        return state;
      }

      case 'PRO_REGISTERING_ERROR': {
        toast.error("L'enregistrement a rencontré une erreur !");
        return state;
      }

      case 'PRO_REGISTERING_SUCCESS': {
        toast.success("Nous avons bien reçu votre demande d'enregistrement à agenz PRO, un agent vous recontactera dans les plus brefs délais");
        return state;
      }

      case 'DETAILS_SEND_SUCCESS': {
        toast.success("Votre demande a bien été reçue, nous vous recontacterons au plus vite");
        return state;
      }

      case 'DETAILS_SEND_FAILURE': {
        toast.error("L'envoi de votre demande à échouer, veuillez réessayer plus tard");
        return state;
      }

      case 'ADD_AVIS_ERROR': {
        toast.error("L'enregistrement a rencontré une erreur");
        return state;
      }
      case 'ADD_FILL_AVIS_ERROR': {
        toast.error("Veuillez remplir tous les champs pour valider votre avis");
        return state;
      }

      case 'ADD_AVIS_SUCCESS': {
        toast.success("Votre avis a bien été enregistré");
        return state;
      }

      case 'UPDATE_ESTIMATION_ERROR': {
        toast.error("La mise à jour a rencontré une erreur");
        return state;
      }

      case 'UPDATE_ESTIMATION_SUCCESS': {
        toast.success("Votre estimation est à jour !");
        return state;
      }

      case 'ADD_TEL_ERROR': {
        toast.error("L'enregistrement a rencontré une erreur");
        return state;
      }

      case 'ADD_TEL_SUCCESS': {
        toast.success("Merci, vous serez recontacté dans les plus brefs délais");
        return state;
      }

      case 'ADD_MY_ESTIMATION_ERROR': {
        toast.error("L'enregistrement a échoué, veuillez réessayer plus tard");
        return state;
      }

      case 'ADD_MY_ESTIMATION_SUCCESS': {
        toast.success("Votre estimation a bien été enregistrée");
        return state;
      }

      case 'SET_ESTIMATION_ID': {
        state = {...state, estimationId: action.data};
        return state;
      }

      case 'SET_TELEPHONE': {
        state = {...state, estimation:{...state.estimation,telephone:action.data}};
        return state;
      }

      case 'SET_MY_ESTIMATION': {
        state = {...state, estimation:{...state.estimation, estimation:action.data}};
        return state;
      }

      case 'REAL_PRICE_BY_USER': {
        state = {...state, estimation: { ...state.estimation, estimationByUser: action.data }};
        return state;
      }

      case 'UPDATE_ZONE': {        
        state = {...state, estimation: {
          ...state.estimation,
          zone: action.data
        }};
        return state;
      }
      case 'UPDATE_CONFIRMATION_MODAL': {
        state = {...state, openConfirmationModal: action.data};
        return state;
      }
      case 'UPDATE_VIEW_PORT': {
        state = {...state, viewport: action.data};
        return state;
      }
      case 'UPDATE_POINTEXIST': {
        state = {...state, pointExist: action.data};
        return state;
      }
      case 'UPDATE_POSITIONSELECTED': {
        state = {...state, positionSelected: action.data};
        return state;
      }
      case 'CONFIRM_ADDRESS_SELECTION': {
        state = {...state, activeStep: 1};
        state = {...state, openConfirmationModal: false};
        return state;
      }
      case 'SET_ACTIVE_STEP': {
        state = {...state, activeStep: action.data};
        return state;
      }
      case 'WRITE_CHARACTERISTICS': {
        state = {...state, estimation: {
          ...state.estimation,
          cave: action.data.cave,
          cheminee: action.data.cheminee,
          balcon: action.data.balcon,
          surfacecave: parseInt(action.data.surfacecave),
          surfacebalcon: parseInt(action.data.surfacebalcon),
          calme: action.data.calme,
          parking: action.data.parking,
          placesparking: parseInt(action.data.placesparking),
          chambreservice: action.data.chambreservice,
          climatisation: action.data.climatisation,
          ascenseur: action.data.ascenseur,
          vueexceptionnelle: action.data.vueexceptionnelle,
          duplex: action.data.duplex,
          concierge: action.data.concierge,

          //Villa

          murmitoyen: action.data.murmitoyen,
          typevilla: action.data.typevilla,
          garage: action.data.garage,
          piscine: action.data.piscine,
          chaufeausolaire: action.data.chaufeausolaire,
          typechauffage: action.data.typechauffage,
          etatgeneral: action.data.etatgeneral,
          anneeconstruction: action.data.anneeconstruction
        }};
        return state;
      }
      case 'UPDATE_ACTIVE_HOUSE': {
        state = {...state, active_house: action.data};
        return state;
      }
      case 'UPDATE_LOCALIZATION': {
        state = {...state, pointExist: action.data.pointExist, pointCovered : action.data.pointCovered};
        state = {...state, estimation: {
          ...state.estimation,
          localisation: action.data.localisation
        }};
        return state;
      }
      case 'UPDATE_POINT_COVERED': {
        state = {...state, pointExist: action.data.pointExist, pointCovered : action.data.pointCovered};
        return state;
      }
      case 'ERASE_POINT_COVERED': {
        state = {...state, pointExist: action.data.pointExist, pointCovered : action.data.pointCovered};
        return state;
      }
      case 'ESTIMATION_TYPE': {
        state = {...state, estimation: {
          ...state.estimation,
          bien: action.data
        }};
        return state;
      }
      case 'REGISTER_FORM_VALUE': {
        state = {...state, estimation: {
          ...state.estimation,
          sdb: action.data.sdb,
          surfacehabitable: parseInt(action.data.surfacehabitable),
          typologie: action.data.typologie,
          orientation: action.data.orientation,
          redejardin: action.data.redejardin,
          etage: parseInt(action.data.etage),
          surfaceterrain: parseInt(action.data.surfaceterrain),
          surfaceconstruite: parseInt(action.data.surfaceconstruite)
        }};
        return state;
      }
      case 'REGISTER_ADDITIONAL_VALUE': {
        state = {
          ...state,
          estimation: {
            ...state.estimation,
            agencement: action.data.agencement,
            luminosite: action.data.luminosite,
            construction: action.data.construction,
            finition: action.data.finition,
          }
        };
        return state;
      }
      case 'SAVE_USER_DETAILS': {
        state = {...state, estimation: {
          ...state.estimation,
          categorie: action.data.categorie,
          activite: action.data.activite,
          proprietaire: action.data.proprietaire,
          projet_vente: action.data.projet_vente,
          a_contacter: action.data.a_contacter,
          raison_estimation: action.data.raison_estimation,
          telephone: action.data.telephone
        }};
        return state;
      }
      case 'ESTIMATION_RECUE': {
        state = {
          ...state, estimation: {
            ...state.estimation,
            estimation: action.data.estimation,
            precision: action.data.indice_de_confiance,
            variateur: action.data.incertitude_prix,
            date: new Date().toISOString(),
          }
        }
        return state;
      }

      case 'ESTIMATION_ERROR': {
        state = {...state, estimationError: action.data};
        return state;
      }
      default:
        return state;
    }
};

export default estimationReducer;