

const demoReducer = (
    state = {
        open: false,
    },
    action) => {
      switch (action.type) {
        case 'UPDATE_DEMO_DIALOG':
          state = {
            open: true
          };
          console.log(state)
          return state;
      default :
      return state;
    }
};
  
export default demoReducer;