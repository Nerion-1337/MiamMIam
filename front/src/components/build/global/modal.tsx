// BUILDER
import Typo from "./typography";
import Button from "./button";
// COMPENENT
import { Close_modal } from "#components/modal/modal_function";
// DATA
import { List_icon, Modals } from "#1_data/links";
// TYPAGE
import { modal } from "#0_types/typages";
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
const type_Modal = (
  <>
  {text && Modal_simple}
  {!text && Modal_specifique}
  </>
)
//
const content_modal = (
  <>
          <section className={`modal ${variantStyles} ${active ? "active" : ""}`}>
          <div className="close" onClick={() => Close_modal(number)}><icon.icon /></div>
            <article>
              {type_Modal}
            </article>
        </section>
  </>
)
//
//
// RETURN
//
//  
    return content_modal;
}