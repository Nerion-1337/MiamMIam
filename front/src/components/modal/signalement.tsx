// API
import { signalement_setting } from "#6_api/fetch_signalement";
// BUILDER
import Button from "#components/build/global/button";
import Typo from "#components/build/global/typography";
import Input from "#components/build/global/input";
//COMPONENTS
import { validTitreSignal, validContenuSignal} from "#components/valid_input";
import Modal_active from "#components/active_redux/modal_active";
import { handleChange} from "#components/formData";
import Button_active from "#components/active_redux/button_active";
// DATA
import { Input_setting_signalement, List_icon } from "#1_data/links";
// REACT
import { useState } from "react";
// REDUX
import { useSelector } from "react-redux";
// TYPAGE
import { button_reducer, object_button_reducer } from "#0_types/typages";
//
//
//
//
//
export default function Signalement(){
//
//
// VARIABLE
//
//
const button = useSelector((state:  button_reducer) => state.buttonReducer);
//
let signalement_active: object_button_reducer | null = null; 
//
const [signalData, setSignalData] = useState<{ [key: string]: string }>({});
//
const icon = List_icon.all[2].icon;
//
//
// FUNCTION
//
//
//
// BOUCLE POUR ALL MODAL
for (const item of button) {
  if (item.value === true && item.name === "signalement") {
    signalement_active = item;
      break;
  }
}
// SAUVEGARDE DATA SIGNALEMENT
const addDataSimplySignal = (fieldName: string, newValue: string) => {
  handleChange(fieldName, newValue, setSignalData)
}
//
// VALIDE ET ENVOIE AU BACK SIGNALEMENT
const handleSubmitSelect = () =>{
 //
    const isTitreSignalValid = validTitreSignal("report_modal_sujet");
    const isContenuSignalValid = validContenuSignal("report_modal_contenu");
//    
    if(isTitreSignalValid && isContenuSignalValid){   

      if(Object.keys(signalData).length === 0){
        Modal_active({active: true, number: 5 });
      } else {
        signalement_setting(signalData, signalement_active?.number, signalement_active?.section)
         .then((isConfirmer:  boolean | void) => {
             if(isConfirmer === true){
              Button_active({data: "signalement",  value:false})
              Modal_active({active: true, number: 6 });
             }
         })
      }
     } 
 }  
//
//
// BUILDER
//
//
const contentInputSignalement = Input_setting_signalement.map((input, index) =>(
  <Input
  variant={input.variant}
  size={input.size}
  element={input.element}
  type={input.type}
  icon={input.icon}
  text={input.text}
  unitee={input.unitee}
  variable={input.variable}
  multiples={input.multiples}
  identifiant={`report_modal_${input.text.replace(/\s/g, '_').toLowerCase()}`}
  fonction={addDataSimplySignal}
  key={index}
/>
))  
//
//
// RETURN
//
//
    return(
        <>
          <section className="signalement_modal">
            <div className="main_signalement">
          <Typo
          balise="span"
          size="s7"
          color="cb"
          familly="f1"
          weight="w7"
          transform="maj"
          children="signalement"
          className="titre_signalement_modal"
          />
          <div className="close" onClick={() => Button_active({data: "signalement",  value:false})}>
          <icon.icon />
          </div>
          {contentInputSignalement}
          <Button
          variant="t6"
          fontSize="s2"
          children="envoyer"
          fonction={handleSubmitSelect}
          />
          </div>
         </section>
</>
    )
}