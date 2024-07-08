// ACTION
import { get_all_user } from "#5_actions/12_all_user_action";
//API
import { new_conversation } from "#6_api/fetch_add_conversation"
// BUILDER
import Button from "#components/build/global/button";
import Typo from "#components/build/global/typography";
import Input from "#components/build/global/input";
import Dropdown from "#components/build/global/dropdown";
import Img from "#components/build/global/img";
//COMPONENTS
import { validTitreAdd, validContenuAdd, validInputAdd } from "#components/valid_input";
import Modal_active from "#components/active_redux/modal_active";
import Button_active from "#components/active_redux/button_active";
import { handleChange, handleChangeArray, removeFromFormDataArray} from "#components/formData"
import { removeTagComponent} from "#components/build/tags"
// DATA
import { Input_add_conversation, List_icon, Dropdown_add_ingredient, Regex, Route_Client, Input_Research_all_user } from "#1_data/links";
// REACT
import React from "react";
import { useState, useEffect } from "react";
//REDUX
import { store } from '#4_reducers/0_store'
import { useSelector } from "react-redux";
// TYPAGE
import { api, element_recipe_reducer, all_user_reducer, token_reducer, dropdown_data } from "#0_types/typages";
//
//
//
//
//
export default function Add_conversation(){
//
//
// VARIABLE
//
//
const token = useSelector((state: token_reducer) => state.tokenReducer); 
const all_user = useSelector((state: all_user_reducer) => state.allUserReducer);
//
const [formDataArray, setFormDataArray] = useState<{ [key: string]: api[] }>({});
const [tagsComponents, setTagsComponents] = useState<React.ReactNode[]>([]);
//
const [isList, setIsList] = useState<api[]>(all_user);
const [checkboxStates, setCheckboxStates] = useState<{[key: string]: boolean}>({});
//
//
// REQUETTE
//
//
useEffect(() => {
    if(token.token){
    store.dispatch(get_all_user());
    }  
  }, [token.token]);
//
//
// FUNCTION
//
//
// CHARGER DATA STORE POUR DROPDOWN  
useEffect(() => {
    if (all_user) {
        setIsList(all_user)
    }
}, [all_user])
//
// ACTUALISER CHECKBOX  
useEffect(() => {
    if (formDataArray.user) {
        setCheckboxStates(prevState => {
          const newCheckboxStates = {...prevState};
    
          // Parcourir les clés de checkboxStates
          Object.keys(newCheckboxStates).forEach(key => {
            // Vérifier si la clé n'est pas présente dans formDataArray.user
            if (!formDataArray.user.some(user => user.name === key)) {
              // Modifier la valeur de la clé en false
              newCheckboxStates[key] = false;
            }
          });
    
          return newCheckboxStates;
        });
      }
}, [formDataArray.user])      
//
// VALIDATION ET ENVOIE DATA AU BACK
const handleSubmit = () =>{
    new_conversation(formDataArray)
}
//
// SEARCH
const searche = (variable: string, research: string) => {
    if (all_user) {
      const resultat = all_user.filter((object: dropdown_data) => {
        for (const prop in object) {
          if (object[prop] && object[prop].toString().toLowerCase().includes(research)) {
            return true;
          }
        }
        return false;
      });
      setIsList(resultat);
    }
  };
//
// ENVVOIE OPTION
const sendOption = (option: api) =>{
//    
setCheckboxStates(prevState =>{
    const newCheckboxStates = {...prevState}
    if (newCheckboxStates[option.pseudo]) {
        // Si la clé existe, inverser la valeur de la case à cocher
        newCheckboxStates[option.pseudo] = !newCheckboxStates[option.pseudo];
      } else {
        // Si la clé n'existe pas, ajouter la clé avec la valeur true
        newCheckboxStates[option.pseudo] = true;
      }
      return newCheckboxStates; // Retourner le nouvel objet d'état mis à jour
    });
//    
    if (formDataArray.user && formDataArray.user.length > 0) {
        // Vérifier si option.pseudo est présent dans formDataArray.user
        const isPseudoPresent = formDataArray.user.some(element => element.name === option.pseudo);
        
        if (isPseudoPresent) {
            removeFromFormDataArray("user", option.pseudo, setFormDataArray, setTagsComponents);
        } else {
            handleChangeArray({
              fieldName: "user", 
              newValue: option.pseudo, 
              number: false, 
              setFormDataArray: setFormDataArray, 
              setTagsComponents: setTagsComponents, 
              tagsComponents: tagsComponents, 
              variant: "2", 
              otherValue: option.id});
        }
    } else {
        // Si formDataArray.user est vide, appliquer handleChangeArray
        handleChangeArray({
          fieldName: "user", 
          newValue: option.pseudo, 
          number: false, 
          setFormDataArray: setFormDataArray, 
          setTagsComponents: setTagsComponents, 
          tagsComponents: tagsComponents, 
          variant: "2", 
          otherValue: option.id});
    }
}  

//
//
// BUILDER
//
//
const body = (
    <>
            <div className="add_conversation">
    <Button
    variant="t5"
    fontSize="s2"
    children={formDataArray.user && formDataArray.user.length > 1 ? "Créer une discussion de groupe" : "Créer une discussion"}
    fonction={handleSubmit}
    data_function={"macro_micro"}
    className={formDataArray.user && formDataArray.user.length > 0 ? "active" : ""}
    />
        <div className="choose_user">
        <Input
        variant={Input_Research_all_user[0].variant}
        variable={Input_Research_all_user[0].variable}
        icon={Input_Research_all_user[0].icon}
        text={Input_Research_all_user[0].text}
        special={Input_Research_all_user[0].special}
        element={Input_Research_all_user[0].element}
        search={searche}
        />
</div>
<div className="list_tags">
    {tagsComponents}
  </div>
  <ul className="list_user">
              {
               isList.map((option: dropdown_data, index) => (
  <li key={index}>

<div className="user">
      <Img
            sizeBloc="s6"
            sizeImg="s6"
            radius="r5"
            src={typeof option.photo_profil === "string" ? option.photo_profil : "" }
            href={`${Route_Client[6].url_id}${option.id}`}
            />

            <span onClick={() => sendOption(option)}>{option.pseudo}</span>
</div>

<div className="checkbox">
            <input 
            type="checkbox" 
            id={option.pseudo}
            className="input_checkbox"
            checked={checkboxStates && checkboxStates[option.pseudo] ? checkboxStates[option.pseudo] : false}
            required={true}
            onChange={() => sendOption(option)}
            />
            <label className="label_cgv" htmlFor={option.pseudo}>
            <div/>
            </label>
            </div>
  </li>
             ))}
        </ul>

        </div>
    </>
)
//
const content = (
    <>
    {all_user.length > 0 && body}
    </>
) 
//
//
// RETURN
//
//
    return content
}