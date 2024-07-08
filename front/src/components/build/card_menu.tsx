
// BUILDER
import Typo from "#components/build/global/typography";
import Dropdown from "#components/build/global/dropdown";
import Button from "#components/build/global/button";
import Calorie_list from "#components/build/calorie_list";
// REACT
import { useState, useEffect  } from "react";
import React from "react";
// TYPAGE
import { cardMenu } from "#0_types/typages";
//
//
//
//
//
export default function Card_menu({
    children,
    variant,
    button,
}: cardMenu){
//
//
// VARIABLE
//
//
const [activeRepartition, setActiveRepartition] = useState(false)
let variantStyles = "";
//
//
// SWITCH
//
//
switch (variant) {
    case "t1":
      variantStyles = "card_menu_height_1";
      break;
    case "t2":
      variantStyles = "card_menu_height_2";
      break;
    case "t3":
      variantStyles = "card_menu_height_3";
      break;
    case "t4":
      variantStyles = "card_menu_height_4";
      break;
      case "t5":
        variantStyles = "card_menu_height_5";
        break;
      case "t6":
        variantStyles = "card_menu_height_6";
        break;
      case "t7":
        variantStyles = "card_menu_height_7";
        break;
      case "t8":
        variantStyles = "card_menu_height_8";
        break;
      case "t9":
        variantStyles = "card_menu_height_9";
        break;
      case "t10":
        variantStyles = "card_menu_height_10";
        break;        
  }
//
//
// BUILDER
//
//
const content = (
    <>
    <article className={`card_menu ${activeRepartition ? "active" : "" }`}>
            
            <Button
            variant="t6"
            fontSize="s2"
            children={button}
            fonction={setActiveRepartition}
            data_function={!activeRepartition}
            className="button_open"
            />
 
<div className={`bloc_global ${variantStyles} ${activeRepartition ? "active" : "" }`}>

 <div className="bloc_scroll">
    {children}
</div>
     </div>
     </article>
    </>
)

//
//
// RETURN
//
//
    return content
}