// ACTION
import { GET_ALL_USER } from "#5_actions/12_all_user_action";
// TYPAGE
import { api_all_recipe } from "#0_types/typages";
//
// VARIABLE
//
const initialState: api_all_recipe[] = [];
//
//
//
export default function allUserReducer(state = initialState, action: {type: string; payload: { data: api_all_recipe[] }}){
    switch (action.type) {
        case GET_ALL_USER:{
            const { data } = action.payload;
            return data;
        }     
        default:
            return state; 
    }
}