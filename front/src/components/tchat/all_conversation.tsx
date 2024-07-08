// ACTION
import { post_option_conversation, post_hidden_conversation } from "#5_actions/14_conversation_action"
// BUILDER
import Typo from "#components/build/global/typography";
import Img from "#components/build/global/img";
import Dropdown from "#components/build/global/dropdown";
// COMPONENTS
import Button_active from "#components/active_redux/button_active";
// DATA
import { Route_Client, Dropdown_option_comment } from "#1_data/links";
// REACT
import React from "react";
import { useState, useEffect } from "react";
//REDUX
import { store } from '#4_reducers/0_store'
import { useSelector } from "react-redux";
// TYPAGE
import { conversation, button_reducer, object_button_reducer } from "#0_types/typages"
//
//
//
//
//
export default function All_conversation({
    conversation,
    token,
}: conversation){
//
//
// VARIABLE
//
//
const button_actif = useSelector((state:  button_reducer) => state.buttonReducer);
//
const [pseudo, setPseudo] = useState<React.ReactNode>();
//
let button_option_conversation: object_button_reducer | null = null;
//
const list = [
    {
      name: "bloquer",
    },
    {
      name: conversation.option_conversation === "invitation" ? "principal" : "invitation",
    },
    {
        name: "signalement",
    },
]
//
//
// FUNCTION
//
//
//
//
for (const item of button_actif) {
    if(item.name === "option_conversation"){
    if (item.section) {
        button_option_conversation = item;
    }}
}
// ADAPTE PSEUDO SI GROUPE
useEffect(() => {
if(Array.isArray(conversation.pseudo)){
    
    const abbreviatedPseudos = conversation.pseudo.map((pseudo) => {
        if(typeof pseudo === "string") return pseudo.substring(0, 3);
    });
    
    const combinedAbbreviatedPseudos = abbreviatedPseudos.join(", ");  
    setPseudo(combinedAbbreviatedPseudos)
} else {
    setPseudo(conversation.pseudo)
}
}, [conversation.pseudo]);
//
// OPTION DE CONVERSATION
const option_conversation = (fieldName: string, newValue: string) =>{
//
    if(newValue === "signalement"){
    Button_active({data: newValue, value: true, number: typeof conversation.id === "number" ? conversation.id : 0, section: "conversation"})
//    
    } else if (newValue === "invitation" || newValue === "principal" ){
//        
    store.dispatch(post_option_conversation(newValue, typeof conversation.id === "number" ? conversation.id : 0))
//    
    } else if(newValue === "bloquer"){
//
    store.dispatch(post_hidden_conversation(typeof conversation.id === "number" ? conversation.id : 0))
    }
//    
}
//
// OUVRIR TCHAT
const open_tchat = (number: number) =>{
    Button_active({data: "conversation_open", value: true, number: number});
}   
//
//
// BUILDER
//
//
// CONTENU DU DERNIERS MESSAGE AVEC NOM DERNIERS POSTER SI GROUPE OU USER
const contenu = (
    <>
             <Typo
            balise="span"
            color="c2"
            size="s6"
            familly="f1"
            weight="w5"
            transform="cap"
            children={conversation.auteur_id === token.id  ? 
                "vous: " :  conversation.auteur === conversation.pseudo ? 
                "" : `${conversation.auteur}`}
            />
            {conversation.contenu}
    </>
)
//
//
const conversation_build = (
    <>
        <article className="conversation">                
    <div className="profil_img_conversation">
    <Img
            sizeBloc="s6"
            sizeImg="s6"
            radius="r5"
            src={typeof conversation.photo_profil === "string" ? conversation.photo_profil : "" }
            href={conversation.groupe ? "" : `${Route_Client[6].url_id}${conversation.user_id}`}
            />
            {/* <div className="new_message">
            <Typo
            balise="span"
            color="cb"
            size="s2"
            familly="f1"
            weight="w7"
            transform="cap"
            children="3"
            />
            </div> */}
    </div>
    <div className="header_conversation">
    <div className="name_creator_conversation"> 
         <Typo
            balise="span"
            color="cb"
            size="s5"
            familly="f1"
            weight="w7"
            transform="cap"
            children={typeof pseudo === "string" ? pseudo : "" }
            href={conversation.groupe ? "" : `${Route_Client[6].url_id}${conversation.user_id}`}
            />
            </div>
            <Dropdown
variant={Dropdown_option_comment[0].variant}
value={Dropdown_option_comment[0].value}
icon={Dropdown_option_comment[0].icon}
variable={Dropdown_option_comment[0].variable}
list={list}
fonction={option_conversation}
search={Dropdown_option_comment[0].search}
filter={Dropdown_option_comment[0].filter}
modale={Dropdown_option_comment[0].modale}
/>
         </div>

            <div className="body_conversation">

            <Typo
balise="p"
color="cw"
size="s6"
familly="f1"
weight="w5"
children={contenu}
fonction={open_tchat}
data_function={conversation.id}
/>
            </div>
</article>
    </>
)
//
const content = (
    <>
    {conversation_build}
    </>
)
//
//
// RETURN
//
//
return content
}