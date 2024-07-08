// ACTION
import { GET_COOKING_PROCESS } from "#5_actions/10_user_cooking_process";
// TYPAGE
import { api } from "#0_types/typages";
//
// VARIABLE
//
const initialState: api[] = [];
//
//
//
export default function cookingProcessReducer(state = initialState, action: {type: string; payload: api[]}){
    switch (action.type) {
        case GET_COOKING_PROCESS:
            return [ ...action.payload ];  
        default:
            return state; 
    }
}