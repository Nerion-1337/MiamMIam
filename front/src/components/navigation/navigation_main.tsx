// ACTION
import { get_all_conversation } from "#5_actions/14_conversation_action"
// BUILDER
import Button from "#components/build/global/button";
import Typo from "#components/build/global/typography";
//COMPONENTS
import Button_active from "#components/active_redux/button_active";
import Nav_user from "./nav_user";
import Nav_tchat from "./nav_tchat";
// DATA
import { List_icon } from "#1_data/links";
//REACT
import { useRef, useEffect } from "react";
// REDUX
import { store } from '#4_reducers/0_store'
import { useSelector } from "react-redux";
// TYPAGE
import { button_reducer, object_button_reducer, token_reducer} from "#0_types/typages";
//
//
//
//
//
export default function Navigation(){
//
//
// VARIABLE
//
//
const aside_principal = useRef<HTMLDivElement>(null);
const table = useSelector((state:  button_reducer) => state.buttonReducer);
const cookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith(`token_miam_miam=`))
const token_cookie = cookie ? cookie.split('=')[1] : null;
const token = useSelector((state:  token_reducer) => state.tokenReducer);
let type_aside: object_button_reducer | null = null;
let type_connexion: object_button_reducer | null = null;
let type_tchat: object_button_reducer | null = null;
let button_option_conversation: object_button_reducer | null = null;
//
//
// FONCTION
//
//
// REPOSITIONNE LA BARRE DE NAVIGATION SI L'ECRAN EXCEDE 1600PX
useEffect(() => {
  const aside = aside_principal.current;
//
  const handleResize = () => {
    if (aside) {
      const windowWidth = window.innerWidth;
      if (windowWidth > 1600) {
        const translateXValue = (windowWidth - 1600) / -2;
        aside.style.transform = `translateX(${translateXValue}px)`;
      } else {
        aside.style.transform = 'none';
      }
    }
  };
//
  window.addEventListener('resize', handleResize);
  handleResize();
//
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);
//
// STOKAGE COOKIE LOCALSTORAGE
//
if(token_cookie) localStorage.setItem("token_miam_miam", token_cookie)
//
//
for (const item of table) {
    if (item.name === 'navigation_open' || item.name === 'tchat_open') {
        if (item.value === true) {
            type_aside = item;
        }
    } else if(item.name === 'connexion' || item.name === 'inscription' || item.name === 'navigation'){
      if (item.value === true) {
        type_connexion = item;
    }
    }else if(item.name === 'add_conversation' || item.name === "conversation_open"){
      if (item.value === true) {
        type_tchat = item;
    }
    }else if(item.name === 'option_conversation'){
      if (item.section) {
        button_option_conversation = item;
    }
    }
}
//
function close_aside(data:string){
  Button_active({data: data, value: false});
}
//
function back_tchat(data:string){
  Button_active({data: data, value: false});
  if(type_tchat && type_tchat.name === "conversation_open" && button_option_conversation && button_option_conversation.section){
    store.dispatch(get_all_conversation({option: button_option_conversation.section}));
  }

}
//
//
// BUILD
//
//
const asideNavContent =(
  <>
      <div className="header_aside">
        <Button
         variant="t1"
         size="s3"
         fontSize="s5"
         icon={List_icon.all[2].icon}
         className="close_aside"
         fonction={close_aside}
         data_function={type_aside ? type_aside.name : ""}
        />
        {type_tchat && type_aside && type_aside.name === "tchat_open" &&
        <Button
         variant="t1"
         size="s3"
         fontSize="s5"
         icon={List_icon.all[16].icon}
         className="back_tchat"
         fonction={back_tchat}
         data_function={type_tchat ? type_tchat.name : ""}
        />
        }

         <Typo
    balise="h3"
    size="s7"
    color="cw"
    transform="maj"
    weight="w1"
    familly="f2"
    className="logo"
    children={type_connexion ? type_connexion.name : 
    (type_aside && type_aside.name === "navigation_open" ? "navigation" : "messagerie" )}
    />

    {!type_tchat && type_aside && type_aside.name === "tchat_open" &&   
    <Button
     variant="t2"
     fontSize="s2"
     children="nouveau"
     active_href="active"
     className="btn_new_tchat"
     icon={List_icon.all[15].icon}
     fonction={() => Button_active({data: "add_conversation",  value:true})}
    />}
    </div>
  </>
)
//
const content = (
  
<aside className={`aside_principal ${type_aside ? type_aside.name : ""}`} ref={aside_principal}>

{type_aside && type_aside.name === "navigation_open" && 
<Nav_user 
data={type_connexion && type_connexion.name ? type_connexion.name : ""} 
token={token}
variable={asideNavContent}
/>}

{type_aside && type_aside.name === "tchat_open" && 
<Nav_tchat 
data={type_connexion && type_connexion.name ? type_connexion.name : ""} 
token={token}
variable={asideNavContent}
/>}

</aside>
)
//
//
// RETURN
//
//    
    return content
}