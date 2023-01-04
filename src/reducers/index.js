import changeTotal from "./changeTotal";
import changeSearch from "./changeSearch";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    changeTotal , 
    changeSearch
})

export default rootReducer;