
import axios from 'axios'

export const signIn = creds => {
    return async (dispatch, getState, { getFirebase }) => {
      dispatch({ type: "LOADER_TRUE" })
      //console.log("ok")
      axios.post('https://us-central1-agenz-website-prod.cloudfunctions.net/api/signIn',{creds: creds }).then(result => {
      //console.log(result)  
      const FBIdToken = `Bearer ${result.data.token}`
        localStorage.setItem('FBIdToken', `Bearer ${result.data.token}`)
        axios.defaults.headers.common['authorization']= FBIdToken
        if(result.data.data.isPro){
          dispatch({ type: 'SET_AUTHENTICATED_PRO' });
        }
    // update the user with the values of we got from Firebase
         dispatch({ type: 'SET_AUTHENTICATED' });
        dispatch({ type: 'UPDATE_USER', data: result.data.data });
        dispatch({ type: "SIGN_IN", data: result.data.data});
        dispatch({type: "LOADER_FALSE"});
})
.catch(err => {
  // console.log(err.response.data)
  let errMessage = null;
  if(err.response.data.message === "There is no user record corresponding to this identifier. The user may have been deleted."){
    errMessage = "Adresse mail introuvable"
  }else if (err.response.data.message === "The password is invalid or the user does not have a password."){
    errMessage = "Mot de passe invalide"
  }
  else if (err.response.data.code === "auth/invalid-email"){
    errMessage = "Vérifiez le format de l'adresse email"
  }
  else {
    errMessage = err.response.data.message
  }
  //console.log(err)
  dispatch({ type: "SIGN_IN_ERR", data: errMessage }, err);
  dispatch({ type: "LOADER_FALSE" });
});
    }
  }
export const raiseError = (message) => {
  return (dispatch) => {
      dispatch( { type : "SIGN_IN_ERROR", data : message})
      dispatch({ type: "LOADER_FALSE" });

  }
}
export const signOut = () => {

    return (dispatch, getState, { getFirebase }) => {
      getFirebase();
      localStorage.removeItem('FBIdToken');
      delete axios.defaults.headers.common['Authorization'];
      delete axios.defaults.headers.common['authorization'];

      dispatch({ type: "SIGN_OUT"})
      document.location.href = '/';
};
}
export const signUp = creds => {
    return (dispatch, getState, { getFirebase }) => {

      dispatch({ type: "LOADER_TRUE" })
      axios.post('https://us-central1-agenz-website-prod.cloudfunctions.net/api/signUp',{creds: creds }).then(result => {
        //console.log(result)  
        const FBIdToken = `Bearer ${result.data.token}`
          localStorage.setItem('FBIdToken', `Bearer ${result.data.token}`)
          axios.defaults.headers.common['authorization']= FBIdToken
          dispatch({ type: 'UPDATE_USER', data: {
            firstName: creds.firstname,
            lastName: creds.lastname,
            email:creds.email, 
            isPro: false,
            phone: creds.phone
        }});    
          dispatch({ type: "SIGN_IN_UP", data: 
        
          {
            firstName: creds.firstname,
            lastName: creds.lastname,
            email:creds.email, 
            isPro: false,
            phone: creds.phone
        }
        });
          dispatch({ type: 'SET_AUTHENTICATED' });
          dispatch({ type: "SIGN_UP" });
          dispatch({type: "LOADER_FALSE"});
      })
      .catch(err => {
        let errMessage = null;
        if(err.response.data.message === "The email address is already in use by another account."){
          errMessage = "Cette adresse email est déjà utilisée"
        }else if (err.response.data.code === "auth/weak-password"){
          errMessage = "Le mot de passe doit comporter au moins 6 caractères"
        }
        else if (err.response.data.code === "auth/invalid-email"){
          errMessage = "Vérifiez le format de l'adresse email"
        }
        else {
          errMessage = err.response.data.message
        }
        dispatch({ type: "SIGN_UP_ERR" , data: errMessage}, err);
        dispatch({
          type: "LOADER_FALSE"
        });
      });
    
    }
  }
export const passForgot = creds => {

  return (dispatch, getState, { getFirebase }) => {
    dispatch({
      type: "LOADER_TRUE"
    })
    axios.post('https://us-central1-agenz-website-prod.cloudfunctions.net/api/passForgot',{creds: creds }).then(result => {
      //console.log(result)
      dispatch({ type: "REQUEST_SENDED" });
      dispatch({ type: "LOADER_FALSE" });

  })
  .catch((err)  => {
    // //console.log(err)
    let errMessage = null;
    if(err.response.data.message === "There is no user record corresponding to this identifier. The user may have been deleted."){
      errMessage = "Cette adresse email n'existe pas dans notre système !"
    }
    dispatch({ type: "REQUEST_ERR" , data: errMessage}, err);
  })
};

}
export const updatePassword = creds => {

  return (dispatch, getState, { getFirebase }) => {
    getFirebase();
    axios.post('https://us-central1-agenz-website-prod.cloudfunctions.net/api/updatePassword',{creds: creds }).then(result => {
        dispatch({ type: "PASS_RESSET" });
      }).catch(err => {
        // //console.log(err)
        // let errMessage = null;
        // if (err.response.data.message === "Password should be at least 6 characters"){
        //   errMessage = "Votre nouveau mot de passe doit contenir au moins 6 caractères !"
        // }
        // if (err.response.data.message === "The password is invalid or the user does not have a password."){
        //   errMessage = "Mot de passe invalide"
        // }
      })
  };

}
