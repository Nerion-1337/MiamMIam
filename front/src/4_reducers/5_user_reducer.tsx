// ACTION
import { GET_USER, PUT_USER, RESET_USER, POST_FOLLOW_USER } from "#5_actions/5_user_action";
// TYPAGE
import { api, api_all_recipe } from "#0_types/typages";
//
// VARIABLE
//
const initialState: api = {};
//
//
//
export default function userReducer(state = initialState, action: {type: string; payload: api}){
    switch (action.type) {
        case GET_USER:
            return { ...state, ...action.payload };
        case PUT_USER: {
                const updatedPayload: Record<string, string> = { ...state };
                Object.keys(action.payload).forEach(key => {
                    updatedPayload[key] = action.payload[key];
                });
            return updatedPayload;
            }
            case POST_FOLLOW_USER: {

                const { data } = action.payload;
                  return {
                     ...state,
                     follower_total: (state.follower_total) + (data)
                 };                    
                  
            }
        case RESET_USER:
            return initialState;    
        default:
            return state; 
    }
}