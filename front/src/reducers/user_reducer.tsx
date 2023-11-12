// TYPAGE
import { get_user } from "#types/typages";
// ACTION
import { GET_USER, RESET_USER } from "#/actions/user_action";
//
// VARIABLE
//
const initialState = {};
//
//
export default function userReducer(state = initialState, action: {type: string; payload: get_user}){
    switch (action.type) {
        case GET_USER:
            return action.payload;
        case RESET_USER:
            return initialState;    
        default:
            return state; 
    }
}