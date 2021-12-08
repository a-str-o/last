const loadReducer = (state = {
  loading: true
}, action) => {
  switch (action.type) {
    case "LOADER_TRUE":
      return {
        ...state,
        loading: true,
      };
    case "LOADER_FALSE":
        return {
            ...state,
            loading: false,
          };
    default:
      return state; 
  }
};

export default loadReducer;