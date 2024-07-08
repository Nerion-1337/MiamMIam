// API
import { signalement_setting } from "#6_api/fetch_signalement";
// BUILDER
import Button from "#components/build/global/button";
import Typo from "#components/build/global/typography";
import Input from "#components/build/global/input";
import Dropdown from "#components/build/global/dropdown";
import Img from "#components/build/global/img";
import Auth from "#components/build/auth";
//COMPONENTS
import { validIdentifiant, validPassword, validEmail, validFirstName, validLastName, validBirthdate, validHeight, validWeight, validFat, validTitreSignal, validContenuSignal} from "#components/valid_input";
import Modal_active from "#components/active_redux/modal_active";
import { handleChange } from "#components/formData";
// DATA
import { Input_setting, List_sexe, Input_setting_signalement } from "#1_data/links";
// REACT
import React from "react";
import { useState, useEffect } from "react";
//REDUX
import { store } from '#4_reducers/0_store'
import { getMy, putMy } from '#5_actions/5_user_action'
import { useSelector } from "react-redux";
// TYPAGE
import { payload_api, token_reducer } from "#0_types/typages";
//
//
//
//
//
export default function Setting(){
//
//
// VARIABLE
//
//
const [formData, setFormData] = useState<{ [key: string]: string }>({});
const [signalData, setSignalData] = useState<{ [key: string]: string }>({});
const user = useSelector((state:  payload_api) => state.userReducer);
const token = useSelector((state:  token_reducer) => state.tokenReducer);
//
//
// REQUETTE
//
//
useEffect(() => {
    if (token.token === true) {
      store.dispatch(getMy())
    }
  }, [token]);
//
//
// FUNCTION
//
//
// SAUVEGARDE DATA USER
const addDataSimply = (fieldName: string, newValue: string) => {
  handleChange(fieldName, newValue, setFormData)
}
//
// VALIDE ET ENVOIE AU BACK DATA USER
const handleSubmit = () =>{
  //
     const isIdentifiantValid = validIdentifiant("setting_identifiant");
     const isPasswordValid = formData.password ? validPassword("setting_mot_de_passe", "setting_confirmer_mot_de_passe") : true;
     const isEmailValid = validEmail("setting_email");
     const isFirstNameValid = validFirstName("setting_nom");
     const isLastNameValid = validLastName("setting_prénom");
     const isBirthdateValid = validBirthdate("setting_date_de_naissance");
     const isHeightValid = validHeight("setting_taille");
     const isWeightValid = validWeight("setting_poids");
     const isFatValid = validFat("setting_masse_grasse");
 //    
     if(
         isIdentifiantValid &&
         isPasswordValid &&
         isEmailValid &&
         isFirstNameValid &&
         isLastNameValid &&
         isBirthdateValid &&
         isHeightValid &&
         isWeightValid &&
         isFatValid
     ){   
 
      if(Object.keys(formData).length === 0){
        Modal_active({active: true, number: 5 });
      } else {
store.dispatch(putMy(formData))
         .then((isConfirmer:  boolean | void) => {
             if(isConfirmer === true){
                 Modal_active({active: true, number: 4 });
             } else {
              Modal_active({active: true, number: 5 });
             } 
         })
      }
     } 
 }    
//
// SAUVEGARDE DATA SIGNALEMENT
const addDataSimplySignal = (fieldName: string, newValue: string) => {
  handleChange(fieldName, newValue, setSignalData)
}
//
// VALIDE ET ENVOIE AU BACK SIGNALEMENT
const handleSubmitSelect = () =>{
 //
    const isTitreSignalValid = validTitreSignal("setting_signal_sujet");
    const isContenuSignalValid = validContenuSignal("setting_signal_contenu");
//    
    if(isTitreSignalValid && isContenuSignalValid){   

      if(Object.keys(signalData).length === 0){
        Modal_active({active: true, number: 5 });
      } else {
        signalement_setting(signalData)
         .then((isConfirmer:  boolean | void) => {
             if(isConfirmer === true){
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
const contentInput1 = Input_setting.slice(0, 6).map((input, index) =>(
    <Input
    variant="t2"
    element={input.element}
    type={input.type}
    icon={input.icon}
    text={input.text}
    value={input.value ? user[input.value] : ''}
    unitee={input.unitee}
    variable={input.variable}
    identifiant={`setting_${input.text.replace(/\s/g, '_').toLowerCase()}`}
    fonction={addDataSimply}
    key={index}
        />  
))
//
const contentInput2 = Input_setting.slice(6, 11).map((input, index) => (
    <React.Fragment key={index}>
      {input.type === "dropdown" ? (
        <Dropdown
          variant={input.variant}
          value={input.value ? user[input.value] : ''}
          icon={input.icon}
          text={input.text}
          variable={input.variable}
          list={List_sexe}
          fonction={addDataSimply}
          key={index}
        />
      ) : (
        <Input
          variant={input.variant}
          element={input.element}
          type={input.type}
          icon={input.icon}
          text={input.text}
          value={input.value ? user[input.value] : ''}
          unitee={input.unitee}
          variable={input.variable}
          identifiant={`setting_${input.text.replace(/\s/g, '_').toLowerCase()}`}
          fonction={addDataSimply}
          key={index}
        />
      )}
    </React.Fragment>
  ));
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
          identifiant={`setting_signal_${input.text.replace(/\s/g, '_').toLowerCase()}`}
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
      {!token.token ? (
<Auth/>
      ) : (
        <main className="main_setting">
         <section className="update_setting">
          <div className="img_setting">
            <Img
            src={String(user.photo_profil)} 
            sizeBloc="s7"
            sizeImg="s8"
            radius="r5"
            />
    <Input
    variant={Input_setting[11].variant}
    element={Input_setting[11].element}
    type={Input_setting[11].type}
    icon={Input_setting[11].icon}
    text={Input_setting[11].text}
    value={Input_setting[11].value ? user[Input_setting[11].value] : ''}
    unitee={Input_setting[11].unitee}
    variable={Input_setting[11].variable}
    identifiant={`setting_${Input_setting[11].text.replace(/\s/g, '_').toLowerCase()}`}
    fonction={addDataSimply}
        /> 
          </div>
          <Button
          variant="t6"
          fontSize="s2"
          children="enregistrer"
          fonction={handleSubmit}
          />
          <form className="bloc_form">
          <div className="input_setting_1">
        {contentInput1}    
          </div>
          <div className="input_setting_1">
        {contentInput2}
          </div>
          </form>
         </section>
         <section className="signalement_setting">
          <Typo
          balise="span"
          size="s7"
          color="cb"
          transform="maj"
          children="signalement"
          className="titre_signalement_setting"
          />
          {contentInputSignalement}
          <Button
          variant="t6"
          fontSize="s2"
          children="envoyer"
          fonction={handleSubmitSelect}
          />
         </section>
         
        </main>
        )}
        </>
    )
}