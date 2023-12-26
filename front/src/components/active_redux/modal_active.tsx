// DATA
import { Modals } from "#data/links";
// TYPAGE
import { modal } from "#types/typages";
// REDUX
import { store } from "#/reducers/store";
import { postModal, updateModalValue } from '#/actions/modal_action'
//
//
//
export default function Modal_active({
    number,
    active,
    text,
}: modal){
//
//
// VARIABLE
//
//
const state = store.getState();
const table_modal = state.modalReducer;
//
//
// FUNCTION
//
//
const resultat = table_modal.filter((object) => {
    for (const prop in object) {
        if (prop in object && object[prop as keyof typeof object]) {
            const propValue = object[prop as keyof typeof object];
            if (propValue && propValue.toString().includes(Modals[number].name)) {
                return object as modal;
            }
        }
    }
    return false;
});
//
//
if(resultat.length === 0){
    store.dispatch(postModal({name: Modals[number].name, active: true, number: number, text: text}))
} else {
    store.dispatch(updateModalValue({name: Modals[number].name, active: active, number: number, text: text}))
}
}