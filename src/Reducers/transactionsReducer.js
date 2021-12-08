const transactionReducer = (
  state = {
    transactions: [],
    transactionsPro : []
  },
  action) => {
    switch (action.type) {
      case 'SET_TRANSACTIONS':
        state = {
          ...state,
          transactions: action.data
        };
        return state;

          default : 
          return state;
    }
  }

  export default transactionReducer;