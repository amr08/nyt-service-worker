import {combineReducers} from "redux";
import articles from "./articles";
import {userSwUpdateSelection, swUpdateAvail} from "./serviceWorkerStatus";

const rootReducer = combineReducers({
  articles,
  swUpdateAvail,
  userSwUpdateSelection
});

export default rootReducer;