// TYPAGE
import { button_action } from "#types/typages";
//
//
//
export const POST_BUTTON = "POST_BUTTON";
//
//
//
export const postButton = ({name, value,}: button_action) => ({
    type: POST_BUTTON, 
    payload: {
        name: name,
        value: value,

    }            
});
//
//
//
export const UPDATE_BUTTON_VALUE = "UPDATE_BUTTON_VALUE";
//
//
//
export const updateButtonValue = ({name, value,}: button_action) => ({
    type: UPDATE_BUTTON_VALUE, 
    payload: {name, value,}            
});
//
//
//