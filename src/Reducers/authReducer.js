import { toast } from "react-toastify";
import axios from 'axios'

const authReducer = (state = {
  user: {
    email : null
  },
  loadedSite: false,
  authenticated : false,
  authenticatedPro : false,
  uid : "",
  agence : {
    nameEntreprie : null
  }
}, action) => {
  switch (action.type) {
    case 'MAIN_LOADER':
      state = { ...state, loadedSite: action.data }
      return state;
    case 'UPDATE_USER':
      // console.log("updated", action.data)
      state = { ...state, user: action.data }
      return state;
    case "SIGN_IN":
      // toast(`${action.data.firstName}, agenz est heureux de vous revoir!`);
      state = { ...state, authenticated : true }
      toast("agenz est heureux de vous revoir !");
      return state;
      case "SIGN_IN_UP":
      // toast(`${action.data.firstName}, agenz est heureux de vous revoir!`);
      state = { ...state, authenticated : true }
      return state;
    case "SIGN_IN_ERR":
      toast.error(action.data);
      return state;
    case "SIGN_UP":
      state = { ...state, authenticated : true }
      toast("Bienvenue chez agenz !");
      return state;
      case "SET_AUTHENTICATED":
        state = { ...state, authenticated : true }
        return state;
        case "SET_AUTHENTICATED_PRO":
          state = { ...state, authenticatedPro : true }
          return state;
          case "SET_UID":
            state = { ...state, uid : action.data }
            return state;
          case "SET_EMAIL":
           state = { ...state, email : action.data }
          return state;
          case "SET_USER":
            state = { ...state, user : action.data }
           return state;
           case "SET_AGENCE":
            state = { ...state, agence : action.data }
           return state;
    case "SIGN_OUT":
      document.location.href = '/';
      localStorage.removeItem('FBIdToken');
      delete axios.defaults.headers.common['authorization'];
      delete axios.defaults.headers.common['Authorization'];

        state = { ...state, authenticated : false, authenticatedPro : false }
        return state;
    case "SIGN_UP_ERR":
      toast.error(action.data);
      return state;
    case "REQUEST_SENDED":
      toast.success("Un lien de recupération vous a été envoyé sur votre adresse mail");
    return state;
    case "REQUEST_ERR":
      toast.error(action.data);
      return state;
    case "PASS_RESSET":
      toast.success("Votre mot de passe a été modifié avec succès");
      return state;
    case "PHONE_NUMBER_ERROR":
      state = { ...state, phoneError: true }
      return state;
    default:
      return state; 
  }
};

export default authReducer;