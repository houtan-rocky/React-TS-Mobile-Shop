import { combineReducers } from "redux";
import darkModeReducer from "./darkModeReducer";

export default combineReducers({
    darkMode: darkModeReducer,
});
