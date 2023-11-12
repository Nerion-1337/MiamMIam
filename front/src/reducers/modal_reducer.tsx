// TYPAGE
import { object_modal_reducer } from "#types/typages";
// ACTION
import { POST_MODAL, UPDATE_MODAL_VALUE } from "#/actions/modal_action";
//
// VARIABLE
//
const initialState: object_modal_reducer[] = [];
//
//
export default function modalReducer(state = initialState, action: { type:"POST_MODAL" | "UPDATE_MODAL_VALUE" ; payload: object_modal_reducer ; }){
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