// TYPAGE
import { button_action } from "#0_types/typages";
//
//
//
export const POST_BUTTON = "POST_BUTTON";
//
//
//
export const postButton = ({name, value, number, section}: button_action) => ({
    type: POST_BUTTON, 
    payload: {
        name: name,
        value: value,
        number: number,
        section: section,

    }            
});
//
//
//
export const UPDATE_BUTTON_VALUE = "UPDATE_BUTTON_VALUE";
//
//
//
export const updateButtonValue = ({name, value, number, section}: button_action) => ({
    type: UPDATE_BUTTON_VALUE, 
    payload: {
        name, 
        value,
        number,
        section,
    }            
});
//
//
//