const configReducer = (state = {
    priceColors: ['#27B7CE', '#1DC592', '#2BD03F', '#C5E263', '#F7E977', '#FDBD65', '#F9824A', '#EC372B', '#C0241D', '#7C000B'],
    mapboxglKey: 'pk.eyJ1IjoiYmFkcmJlbGtleml6IiwiYSI6ImNraDduNjN2bDA2MGszMG5zZHRqNm5zMzIifQ.oITjlONmSiUQsFKrZfFd3w',
    activeMenu: 0
}, action) => {
    switch (action.type) {
      case "CHANGE_MENU_ACCOUNT":
        console.log(action.data);
        state = { ...state, activeMenu: action.data }
        return state;
      default:
        return state; 
    }
  };
  
  export default configReducer;