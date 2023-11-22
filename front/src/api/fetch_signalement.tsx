// DATA
import { Route_Server, Links_Server, Input_setting_signalement, Route_Assets } from "#data/links";
// BUILDER
import Typo from "#components/build/global/typography";
//COMPONENTS
import { setErreur, setValid } from "#components/valid_input";
import { Renvoie_email_modal } from "#components/modal/modal_function";
import Modal_active from "#components/active_redux/modal_active";
// TYPAGE
import { api } from "#types/typages";
//
//
// SETTING
//
//
export function signalement_setting(formData: api){
//
// VARIABLE
//
const formDatas = new FormData();
//
// BOUCLE
//
Object.keys(formData).forEach(key => {
//
// CAS IMAGE  
  if(key === "signalement"){
  for (let i = 0; i < formData[Input_setting_signalement[2].variable].length; i++) {
    formDatas.append('signalement', formData[Input_setting_signalement[2].variable][i]);
    }
//    
// TOUTE LES AUTRES DONNÉES    
  } else {
    formDatas.append(key, formData[key]);
  }
});
//console.log([...formDatas.entries()]);
    return fetch(`${Route_Server[0].url}${Route_Server[10].url}`, {
         method: "POST",
         headers: {
            Authorization: `${localStorage.getItem("token_miam_miam")}`,
         },
         body: formDatas,
       })
         .then((res) => res.json())
         .then((res) => {       
          if(res === true){
           setValid("setting_signal_selectionner_des_images") 
           return true
          } else if(res.error_img) {
            setErreur("setting_signal_selectionner_des_images", res.error_img)
            return false
          } else if(res.error_report_length) {
            Modal_active({active: true, number: 7 });
          } else {
            return false
          } 
         })
         .catch((err) => {
           console.log(err);
           return false
         });
 }