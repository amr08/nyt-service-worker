
export const userSwUpdateSelection = (state=null, action) => {
  switch(action.type) {
    case "USER_APPROVED_UPDATE":
      return action.status;
    default: 
      return state
  }
};

export const swUpdateAvail = (state=null, action) => {
  switch(action.type) {
    case "SW_UPDATE_AVAILABLE":
      return action.update;
    default: 
      return state
  }
};

