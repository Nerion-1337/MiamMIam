// ACTION
import { POST_BUTTON, UPDATE_BUTTON_VALUE } from "#5_actions/3_button_action";
// TYPAGE
import { object_button_reducer } from "#0_types/typages";
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
            item.name === action.payload.name ? { ...item, value: action.payload.value, number:  action.payload.number, section: action.payload.section} : item
          );  
        default:
            return state; 
    }
}