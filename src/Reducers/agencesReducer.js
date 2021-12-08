const agencesReducer = (
  state = {
    agences: []
  },
  action) => {
    switch (action.type) {
      case 'SET_AGENCES':
        state = {
          ...state,
          agences: action.data
        };
        return state;
        default :
        return state;
      }
  }

  export default agencesReducer;