// TYPAGE
import { modal } from "#types/typages";
// DATA
import { List_icon, Modals } from "#data/links";
// COMPENENT
import { Close_modal } from "#components/modal/modal_function";
//
//
//
//
//
export default function Modal({
number,
active,  
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
//
//
//

//
//
// RETURN
//
//  
    return(
        <section className={`modal ${variantStyles} ${active ? "active" : ""}`}>
          <div className="close" onClick={() => Close_modal(number)}><icon.icon /></div>
            <article>
              {Modals[number].children}
            </article>
        </section>
    )
}