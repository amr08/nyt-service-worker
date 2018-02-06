//Just one for now
const reducer = (state= [], action) => {
  switch(action.type) {
    case "RECEIVED_ARTICLES":
      return action.articles;
    default: 
    return state
  }
};

export default reducer;