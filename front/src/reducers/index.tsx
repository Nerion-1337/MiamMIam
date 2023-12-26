import { combineReducers } from "redux";
import userReducer from "./user_reducer";
import buttonReducer from "./button_reducer";
import modalReducer from "./modal_reducer";
import tokenReducer from "./token_reducer";
import elementRecipeReducer from "./recipe_element_reducer";

export default combineReducers({
    userReducer,
    buttonReducer,
    modalReducer,
    tokenReducer,
    elementRecipeReducer,
});