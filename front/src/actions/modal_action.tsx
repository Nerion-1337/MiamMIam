// TYPAGE
import { modal_action } from "#types/typages";
//
//
//
export const POST_MODAL = "POST_MODAL";
//
//
//
export const postModal = ({name, active, number, text}: modal_action) => ({
    type: POST_MODAL, 
    payload: {
        name: name,
        active: active,
        number: number,
        text: text,    
    }            
});
//
//
//
export const UPDATE_MODAL_VALUE = "UPDATE_MODAL_VALUE";
//
//
//
export const updateModalValue = ({name, active, number, text}: modal_action) => ({
    type: UPDATE_MODAL_VALUE, 
    payload: {name, active, number, text}            
});
//
//
//