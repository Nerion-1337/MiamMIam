// BUILDER
import Typo from "#components/build/global/typography";
import Img from "#components/build/global/img";
// DATA
import { Route_Client } from "#1_data/links";
// REACT
import { useState } from "react";
// TYPAGE
import { message } from "#0_types/typages"
//
//
// MESSAGE POSTER PAR UTILISATEUR
//
//
export function Message_user({
    message
}: message){
//
//
// VARIABLE
//
//
const [animHover, setAnimHover] = useState<{ [key: string]: boolean }>({}); 
//
//
// FUNCTION
//
//
//
// MODIFIE LE HOVER ICON
const handleMouse = (data_mouse: string, mouse_type: string): void => {
    setAnimHover(prevState => {
      if(data_mouse === "date"){
        return { ...prevState, [data_mouse]: mouse_type === "enter" ? true : false };
      } else {
        return { ...prevState, [data_mouse]: mouse_type === "enter" ? true : false };
      }
    });
  }; 
//
//
// BUILDER
//
//
 const body = (
        <>
    <div className="message_user">

    <Typo
        balise="span"
        color="cw"
        size="s5"
        familly="f1"
        weight="w5"
        children={typeof message.date_ajout === "string" && typeof message.full_date === "string"  ? 
        (!animHover.date ? message.date_ajout : message.full_date) : "" }
        handleMouse={handleMouse}
        data_mouse={"date"}
        className="date_ajout_comment"
    />   

<div className="contenu_message">
     <Typo
        balise="p"
        color="cb"
        size="s6"
        familly="f1"
        weight="w6"
        children={typeof message.contenu === "string" ? message.contenu : "" }
    />
</div>     

    </div>
    </>
)
//
const content = (
    <>
    {body}
    </>
)
//
//
// RETURN
//
//
return content;
}
//
//
// MESSAGE POSTER PAR INTERLOCUTEUR
//
//
export function Message_invite({
    message
}: message){
//
//
// VARIABLE
//
//
const [animHover, setAnimHover] = useState<{ [key: string]: boolean }>({}); 
//
//
// FUNCTION
//
//
//
// MODIFIE LE HOVER ICON
const handleMouse = (data_mouse: string, mouse_type: string): void => {
    setAnimHover(prevState => {
      if(data_mouse === "date"){
        return { ...prevState, [data_mouse]: mouse_type === "enter" ? true : false };
      } else {
        return { ...prevState, [data_mouse]: mouse_type === "enter" ? true : false };
      }
    });
  }; 
//
//
// BUILDER
//
//
 const body = (
     <>
    <div className="message_invite">
      <div className="profil_invite">
      <Typo
        balise="span"
        color="cw"
        size="s6"
        familly="f1"
        weight="w6"
        children={typeof message.pseudo === "string" ? message.pseudo : "" }
     />
     <Img
        sizeBloc="s4"
        sizeImg="s4"
        radius="r5"
        src={typeof message.photo_profil === "string" ? message.photo_profil : "" }
        href={`${Route_Client[6].url_id}${message.user_id}`}
    />
</div>
<div className="contenu_message">
     <Typo
        balise="p"
        color="cb"
        size="s6"
        familly="f1"
        weight="w6"
        children={typeof message.contenu === "string" ? message.contenu : "" }
    />
</div>

    <Typo
        balise="span"
        color="cw"
        size="s5"
        familly="f1"
        weight="w5"
        children={typeof message.date_ajout === "string" && typeof message.full_date === "string"  ? 
        (!animHover.date ? message.date_ajout : message.full_date) : "" }
        handleMouse={handleMouse}
        data_mouse={"date"}
        className="date_ajout_comment"
    />           

    </div>
    </>
)
//
const content = (
    <>
    {body}
    </>
)
//
//
// RETURN
//
//
return content;
}