//REACT
import { useRef, useEffect } from "react";
// DATA
import { List_icon } from "#data/links";
// BUILDER
import Button from "#components/build/global/button";
import Typo from "#components/build/global/typography";
// REDUX
import { useSelector } from "react-redux";
//COMPONENTS
import Button_active from "#components/active_redux/button_active";
import Accueil_ins_con from "#components/navigation/connexion/accueil_ins_con";
import Connexion from "#components/navigation/connexion/connexion";
import Inscription from "#components/navigation/connexion/inscription";
import Nav_user from "./nav_user";
// TYPAGE
import { button_reducer, object_button_reducer, token_reducer} from "#types/typages";
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
    }
}
//
function close_aside(data:string){
  Button_active({data: data, value: false});
}
//
//
// BUILD
//
//
const connexionContent = (
  <>
      {type_connexion && type_connexion.name === "connexion" ? (
        <Connexion />
      ) : type_connexion && type_connexion.name === "inscription" ? (
        <Inscription />
      ) : (
        <Accueil_ins_con />
      )}
  </>
);
//
const asideContent =(
  <>
      <section className="header_aside">
        <Button
         variant="t1"
         size="s3"
         fontSize="s5"
         icon={List_icon.all[2].icon}
         className="close_aside"
         fonction={close_aside}
         data_function={type_aside ? type_aside.name : ""}
        />
         <Typo
    balise="h3"
    size="s7"
    color="cw"
    transform="maj"
    className="logo"
    children={type_connexion ? type_connexion.name : "navigation"}
    />
    </section>
  </>
)
//
const mainContent =(
  <>
  {  type_connexion && type_connexion.name === "navigation" || token.token ? (
     <Nav_user/>
  ):(
    connexionContent
  )}
  </>
)
//
//
// RETURN
//
//    
    return(
<aside className={`aside_principal ${type_aside ? type_aside.name : ""}`} ref={aside_principal}>
    <div className="content_aside">
  {asideContent}
  <div className="body_aside">
  {mainContent}
  </div>
    </div>
</aside>
    )
}