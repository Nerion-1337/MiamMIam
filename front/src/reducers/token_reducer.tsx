// TYPAGE
import { token_valide } from "#types/typages";
// ACTION
import { GET_TOKEN } from "#/actions/token_action";
//
// VARIABLE
//
const initialState: token_valide = {};
//
//
export default function tokenReducer(state = initialState, action: {type: string; payload: token_valide}){
    switch (action.type) {
        case GET_TOKEN:
            return action.payload;   
        default:
            return state; 
    }
}