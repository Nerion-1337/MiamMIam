// TYPAGE
import { modal } from "#types/typages";
// DATA
import { List_icon, Modals } from "#data/links";
// COMPENENT
import { Close_modal } from "#components/modal/modal_function";
// BUILDER
import Typo from "./typography";
import Button from "./button";
//
//
//
//
//
export default function Modal({
number,
active,
text,  
}: modal){
//
//
// VARIABLE
//
//
let variantStyles = "";
const icon = List_icon.all[2].icon;
//
//
// SWITCH
//
//
switch (Modals[number].type) {
    case "t0":
      variantStyles = "type-modal0";
      break;
    case "t1":
      variantStyles = "type-modal1";
      break;
    case "t2":
      variantStyles = "type-modal2";
      break;
    case "t3":
      variantStyles = "type-modal3";
      break;
    case "t4":
      variantStyles = "type-modal4";
      break;
  }
//
//
// BUILDER
//
//
const Modal_simple = (
  <>
   <Typo
        balise="span"
        size="s6"
        color="cw"
        transform="maj"
        children={text}
        />         
        <Button 
        variant="t1"
        size="s5"
        fontSize="s4"
        children="ok"
        fonction={Close_modal}
        data_function={number}
             /> 
  </>
)
//
const Modal_specifique = (
  <>
  {Modals[number].children}
  </>
)
//
const content_Modal = (
  <>
  {text ? (
    Modal_simple
  ) : (
    Modal_specifique
  )}
  </>
)
//
//
// RETURN
//
//  
    return(
        <section className={`modal ${variantStyles} ${active ? "active" : ""}`}>
          <div className="close" onClick={() => Close_modal(number)}><icon.icon /></div>
            <article>
              {content_Modal}
            </article>
        </section>
    )
}