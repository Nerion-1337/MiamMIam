// BUILDER
import Typo from "#components/build/global/typography";
// DATA
import { typo_calorie } from "#1_data/links";
// REACT
import React from "react";
// TYPAGE
import { api_number } from "#0_types/typages";
//
//
//
//
//
export default function Calorie_list({data}: {data: api_number}){
//
//
// BUILDER
//
// 
const contentDropdown = typo_calorie.slice(0, 5).map((item, index) =>(
    <React.Fragment key={index}>
    <div className="bloc_macro">
    <Typo
    size="s6"
    icon={item.icon}
    LR={item.LR}
    color="c2"
    className="icon_calo_list"
    />    
    <Typo
    balise={item.balise}
    size={item.size}
    familly={item.familly}
    weight={item.weight}
    transform={item.transform}
    color={item.color}
    children={item.children}
    className="title_calo_list"
    />
    <Typo
    balise= "span"
    size= "s5"
    familly= "f1"
    weight= "w6"
    color= "cb"
    children={index === 0 ? data.calorie:
        index === 1 ? `${data.proteine}g`:
        index === 2 ? `${data.glucide}g`:
        index === 3 ? `${data.lipide}g`:
        index
    }
    className="value_calo_list"
    />

    </div>
    </React.Fragment>
  ))
//
//
// RETURN
//
//  
return(
    <>
<article className="bloc_calorie_list">
{contentDropdown}
</article>
    </>
)
}