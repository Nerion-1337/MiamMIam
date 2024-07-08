// ACTION
import { get_all_conversation } from "#5_actions/14_conversation_action"
// BUILDER
import Button from "#components/build/global/button";
//COMPONENTS
import Dropdown from "#components/build/global/dropdown";
import All_conversation from "#components/tchat/all_conversation";
import Add_conversation from "#components/tchat/add_conversation"
import Conversation from "#components/tchat/conversation"
// DATA
import { Route_Client, Dropdown_option_type_tchat } from "#1_data/links";
// REACT
import React from "react";
import { useState, useEffect } from "react";
// REDUX
import { store } from '#4_reducers/0_store'
import { useSelector } from "react-redux";
// TYPAGE
import { navUser, button_reducer, object_button_reducer, conversation_reducer} from "#0_types/typages";
import Button_active from "#components/active_redux/button_active";
//
//
//
//
//
export default function Nav_tchat({
    data,
    token,
    variable
}: navUser){
//
//
// VARIABLE
//
//    
const table = useSelector((state:  button_reducer) => state.buttonReducer);
const allConversation = useSelector((state:  conversation_reducer) => state.conversationReducer);
//
const [formData, setFormData] = useState<{ [key: string]: string }>({option: "tout"});  
//
let modal_active: object_button_reducer | null = null;
//
//
// REQUETTE
//
//  
// POUR LES FILTRES RECETTE
useEffect(() => {
    if(formData){
      store.dispatch(get_all_conversation(formData));
      Button_active({data: "option_conversation", value: true, section: formData.option })  
    }  
  }, [formData]);
//
//
//
// FUNCTION
//
//
//
//
// BOUCLE OUVERTURE MODAL ADD INGREDIENT & USTENSIL
for (const item of table) {
    if(item.name === "add_conversation" || item.name === "conversation_open"){
    if (item.value === true) {
        modal_active = item;
    }}
}
// MODIFIE LES RECETTES AFFICHER
const optionTchat = (fieldName: string, newValue: string) => {
    setFormData({[fieldName]: newValue})
} 
//
//
// BUILDER
//
//
//
const all_conversation = allConversation.map((item, index) =>(
    <React.Fragment key={index}>
        {item.contenu != null && (item.option_conversation === formData.option || formData.option === "tout") && item.classification === "valide"  && (
        <All_conversation conversation={item} token={token} />
        )}
    </React.Fragment>
))
//
const home_conversation = (
<>
<div className="option_tchat">
<Dropdown
    variant={Dropdown_option_type_tchat[0].variant}
    value={Dropdown_option_type_tchat[0].value}
    icon={Dropdown_option_type_tchat[0].icon}
    variable={Dropdown_option_type_tchat[0].variable}
    list={Dropdown_option_type_tchat[0].list}
    fonction={optionTchat}
    search={Dropdown_option_type_tchat[0].search}
    filter={Dropdown_option_type_tchat[0].filter}
    modale={Dropdown_option_type_tchat[0].modale}
    />
</div>
<div className="body_conversation">

{all_conversation}

</div>
</>
)
//
const content = (
    <>
    <div className="content_aside">
  {variable}
  <div className="body_aside">

{modal_active && modal_active.name === "add_conversation" &&  modal_active.value === true && (
<Add_conversation/>)}
{modal_active && modal_active.name === "conversation_open" &&  modal_active.value === true && (
<Conversation/>)}
{!modal_active &&
(home_conversation)}
  </div>
    </div>
    </>
)


//
// 
// RETURN
//
//   
    return content  
}