// TYPAGE
import { modal_action } from "#0_types/typages";
// ACTION
import { POST_MODAL, UPDATE_MODAL_VALUE } from "#5_actions/4_modal_action";
//
// VARIABLE
//
const initialState: modal_action[] = [];
//
//
export default function modalReducer(state = initialState, action: { type:"POST_MODAL" | "UPDATE_MODAL_VALUE" ; payload: modal_action ; }){
    switch (action.type) {
        case POST_MODAL:
            return [...state, action.payload];
        case UPDATE_MODAL_VALUE:
            return state.map((item) =>
            item.name === action.payload.name ? { ...item, active: action.payload.active } : item
          );  
        default:
            return state; 
    }
}