// TYPAGE
import { token_valide } from "#0_types/typages";
// ACTION
import { GET_TOKEN } from "#5_actions/2_token_action";
//
// VARIABLE
//
const initialState: token_valide = {
    token: false,
    id: ""
};
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