const priceDetailsReducer = (state = {
    lowest: 0,
    highest: 0,
    distance: 0,
    activeZone : "",
    prix : "0",
    commune : "Casablanca",
    prixVilla : "0"
}, action) => {
    switch (action.type) {
      case "WRITE_DETAILS":
        state = {
            ...state,
            lowest: action.data.lowest,
            highest: action.data.highest,
            distance: action.data.distance,
        }
        return state;
      case "SET_ACTIVE_ZONE" : 
      state = {
        ...state,
        activeZone : action.data.id,
        prix : action.data.prix,
        commune : state.commune,
      }
      return state;
      case "SET_ACTIVE_ZONE_VILLA" : 
      state = {
        ...state,
        activeZone : action.data.id,
        prixVilla : action.data.prix,
        commune : state.commune,
      }
      return state;
      case "SET_ACTIVE_COMMUNE" : 
      state = {
        ...state,
        commune : action.data.commune,
        prix : action.data.prix,
        prixVilla : action.data.prixVilla
      }
      return state;
      default:
        return state;
    }
};

export default priceDetailsReducer;