
const cardReducer = (
  state = {
    polygones: [],
    meanCartier: [],
    zoom : 9,
    calledForZoom : false,
    lat : 33.572620386020816,
    lng : -7.628674597017321,
    displayPhone : false,
    moreInfo : false,
  }, action) => {
    switch (action.type) {
      case 'SET_POLYGONES':
        state = {...state, polygones: action.data};
        return state;
      case 'SET_MEAN_CARTIER':
        state = {...state, meanCartier: action.data};
        return state;
      case 'SET_ZOOM' : 
      state = {...state, zoom : action.data}
      return state;
      case 'SET_VIEWPORT_ON_ACTIVE_ZONE' : 
       state={...state, zoom : action.data.zoom, calledForZoom : true, lat : action.data.lat, lng : action.data.lng}
       return state;
       case 'SET_CALLED_FOR_ZOOM_FALSE' : 
        state={...state, calledForZoom : false}
        return state;
        case 'DISPLAY_PHONE' : 
        state={...state, displayPhone : action.data}
        return state;
        case 'OPEN_TRANSACTION_MODAL' : 
        state={...state, moreInfo : true}
        return state;
        case 'CLOSE_TRANSACTION_MODAL' : 
        state={...state, moreInfo : true}
        return state;
      default:
        return state;
    }
};

export default cardReducer;