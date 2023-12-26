// TYPAGE
import { api } from "#types/typages";
// ACTION
import { GET_USER, PUT_USER, RESET_USER } from "#/actions/user_action";
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
        case RESET_USER:
            return initialState;    
        default:
            return state; 
    }
}