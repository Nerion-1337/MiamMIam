import { combineReducers } from "redux";
import userReducer from "./5_user_reducer";
import buttonReducer from "./3_button_reducer";
import modalReducer from "./4_modal_reducer";
import tokenReducer from "./2_token_reducer";
import elementRecipeReducer from "./8_recipe_element_reducer";
import allRecipeReducer from "./6_all_recipe_reducer";
import LikeFollowReducer from "./7_like_follow_reducer";
import consumptionReducer from "./9_consumption_reducer";
import cookingProcessReducer from "./10_cooking_process_reducer";
import commentReducer from "./11_comment_reducer";
import allUserReducer from "./12_all_user_reducer";
import messageReducer from "./13_messages_reducer";
import conversationReducer from "./14_conversation_reducer";

export default combineReducers({
    userReducer,
    buttonReducer,
    modalReducer,
    tokenReducer,
    elementRecipeReducer,
    allRecipeReducer,
    LikeFollowReducer,
    consumptionReducer,
    cookingProcessReducer,
    commentReducer,
    allUserReducer,
    messageReducer,
    conversationReducer,
});