//COMPONENTS
import { setErreur, setValid } from "#components/valid_input";
import Modal_active from "#components/active_redux/modal_active";
// DATA
import { Route_Server, Input_setting_signalement } from "#1_data/links";
// TYPAGE
import { api } from "#0_types/typages";
//
//
// SETTING
//
//
export function signalement_setting(formData: api, id?: number, type?: string){
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
//
formDatas.append("type_id", `${id}`);
formDatas.append("type", `${type}`);

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