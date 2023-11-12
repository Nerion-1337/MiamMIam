import { combineReducers } from "redux";
import userReducer from "./user_reducer";
import buttonReducer from "./button_reducer";
import modalReducer from "./modal_reducer";

export default combineReducers({
    userReducer,
    buttonReducer,
    modalReducer,
});