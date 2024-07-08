// TYPAGE
import { button_active } from "#0_types/typages";
// REDUX
import { store } from "#4_reducers/0_store";
import { postButton, updateButtonValue } from '#5_actions/3_button_action'
//
//
//
export default function Button_active({
    data,
    value,
    number,
    section,
}: button_active){
//
//
// VARIABLE
//
//
const state = store.getState();
const table_button = state.buttonReducer;
//
//
// FUNCTION
//
//
const resultat = table_button.filter(object =>{
    for (const prop in object) {
        const propValue = object[prop as keyof typeof object];
        if (propValue && propValue.toString().includes(data)) {
            return object; 
        }
    }
    return false;
})
//
if(resultat.length === 0){
    store.dispatch(postButton({name: data, value: true, number: number, section: section}))
} else {
    store.dispatch(updateButtonValue({name: data, value: value, number: number, section: section}))
}

}