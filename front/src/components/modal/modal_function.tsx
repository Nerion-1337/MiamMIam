// TYPAGE
// import { modal, modal_reducer, modal_action } from "#types/typages";
// // DATA
// import { Modals } from "#data/links";
// // REDUX
// import { useSelector } from "react-redux";
//COMPONENTS
import Modal_active from "#components/active_redux/modal_active";
// REQUEST
import { renvoie_email, reset_password_email } from "#/api/fetch_register_login"
//
//
// VARIABLE
//
//

//
//
// FUNCTION
//
//
export function Close_modal(number: number){ 
    Modal_active({active: false, number: number,});
  }
//
//
export function Renvoie_email_modal(email: string){
  renvoie_email(email);
  Modal_active({active: true, number: 1,});
}
//
//
export function Reset_password_email_modal(data : string){
  const email = document.querySelector(`.${data}`)?.querySelector("input")
  if(email)
  reset_password_email(email.value)
  .then((isConfirmer: boolean) => {
    if(isConfirmer === true){
    Modal_active({active: false, number: 2,});
    }
})
  
}