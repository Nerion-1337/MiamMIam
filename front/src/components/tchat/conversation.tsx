// ACTION
import { get_message, send_message } from "#5_actions/13_messages_action";
// BUILDER
import Button from "#components/build/global/button";
import Input from "#components/build/global/input";
import { Message_user, Message_invite} from "#components/build/message"
//COMPONENTS
import { handleChange} from "#components/formData"
import { removeTagComponent} from "#components/build/tags"
// DATA
import { List_icon, Links_Server, Input_add_message } from "#1_data/links";
// REACT
import React from "react";
import { useState, useEffect, useRef } from "react";
//REDUX
import { store } from '#4_reducers/0_store'
import { useSelector } from "react-redux";
// TYPAGE
import { message_reducer, token_reducer, button_reducer } from "#0_types/typages";
//
//
//
//
//
export default function Conversation(){
//
//
// VARIABLE
//
//
const token = useSelector((state: token_reducer) => state.tokenReducer); 
const message = useSelector((state: message_reducer) => state.messageReducer);
const button_redux = useSelector((state:  button_reducer) => state.buttonReducer);
//
const [formData, setFormData] = useState<{ [key: string]: string }>({});
const [id_conversation, setId_conversation] = useState<number>()
//
const contenuRef = useRef<HTMLDivElement>(null);
//
//
// REQUETTE
//
//
useEffect(() => {
        for (const item of button_redux) { 
       if(item.name === "conversation_open" && item.number){
       setId_conversation(item.number);
       store.dispatch(get_message(item.number)); 
       }     
    
        }
  }, [button_redux]);
//
//
// FUNCTION
//
//
useEffect(() => {
  if (contenuRef.current) {
    contenuRef.current.scrollTop = contenuRef.current.scrollHeight;
  }
}, [message]);
// VALIDATION ET ENVOIE DATA AU BACK
const handleSubmit = () =>{
   store.dispatch(send_message(formData)); 
}
//
// AJOUTER DATA SIMPLE
const addDataSimply = (fieldName: string, newValue: string) => {
    handleChange(fieldName, newValue, setFormData)
//    
if(!formData[Links_Server[9].conversation_id]){
    handleChange(Links_Server[9].conversation_id, `${id_conversation}`, setFormData)
    }  
  }     
//
//
// BUILDER
//
//
// AFFICHE ALL MESSAGE SELON POSTEUR
const all_mess = message.map((item, index) =>(
    <React.Fragment key={index}>
    {item.user_id === token.id && (
      <Message_user message={item} />
    )}
    {item.user_id != token.id && (
      <Message_invite message={item} />
    )}
    </React.Fragment>
))
//
// PERMET DE POSTULER DES COMMENTAIRES
const post_message = (
    <>
    <form onSubmit={handleSubmit} className="send_sms">
<Button
variant="icon"
fontSize="s6"
icon={List_icon.all[13].icon}

/>
<Button
variant="icon"
fontSize="s6"
icon={List_icon.all[14].icon}

/>
<Input
  variant={Input_add_message[0].variant}
  element={Input_add_message[0].element}
  type={Input_add_message[0].type}
  text={Input_add_message[0].text}
  unitee={Input_add_message[0].unitee}
  variable={Input_add_message[0].variable}
  special={Input_add_message[0].special}
  fonction={addDataSimply}
  identifiant="add_comment"
      />
      <Button
variant="t1"
size="s3"
fontSize="s4"
icon={List_icon.all[12].icon}
fonction={handleSubmit}
/>
</form>
    </>
) 
//
const body = (
    <section className="conversation_user">
<div className="contenu" ref={contenuRef}>
      {all_mess}
</div>
    {post_message}
    </section>
)
//
const content = (
    <>
    {id_conversation && body}
    </>
) 
//
//
// RETURN
//
//
return content
}