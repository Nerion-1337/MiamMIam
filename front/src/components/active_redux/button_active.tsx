// TYPAGE
import { button_active } from "#types/typages";
// REDUX
import { store } from "#/reducers/store";
import { postButton, updateButtonValue } from '#/actions/button_action'
//
//
//
export default function Button_active({
    data,
    value,
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
        if (object[prop as keyof typeof object] && object[prop as keyof typeof object].toString().includes(data)) {
            return object; 
        }
    }
    return false;
})
//
if(resultat.length === 0){
    store.dispatch(postButton({name: data, value: true,}))
} else {
    store.dispatch(updateButtonValue({name: data, value: value,}))
}

}