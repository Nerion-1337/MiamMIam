// TYPAGE
import { object_button_reducer } from "#types/typages";
// ACTION
import { POST_BUTTON, UPDATE_BUTTON_VALUE } from "#/actions/button_action";
//
// VARIABLE
//
const initialState: object_button_reducer[] = [];
//
//
export default function buttonReducer(state = initialState, action: { type: string; payload: object_button_reducer; }){
    switch (action.type) {
        case POST_BUTTON:
            return [...state, action.payload];
        case UPDATE_BUTTON_VALUE:
            return state.map((item) =>
            item.name === action.payload.name ? { ...item, value: action.payload.value } : item
          );  
        default:
            return state; 
    }
}