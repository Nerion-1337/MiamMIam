// ACTION
import { post_ustensil } from "#5_actions/8_element_recipe_action";
// BUILDER
import Button from "#components/build/global/button";
import Typo from "#components/build/global/typography";
import Input from "#components/build/global/input";
//COMPONENTS
import { validTitreAdd, validContenuAdd } from "#components/valid_input";
import Modal_active from "#components/active_redux/modal_active";
import Button_active from "#components/active_redux/button_active";
import { handleChange } from "#components/formData";
// DATA
import { Input_add_ustensil, List_icon, Regex } from "#1_data/links";
// REACT
import { useState } from "react";
//REDUX
import { store } from '#4_reducers/0_store'
// TYPAGE
import { api } from "#0_types/typages";
//
//
//
//
//
export default function Add_ingredient(){
//
//
// VARIABLE
//
//
const [formData, setFormData] = useState<api>({});
const icon = List_icon.all[2].icon;
//
//
// FUNCTION
//
//
// AJOUTER DATA SIMPLE
const addDataSimply = (fieldName: string, newValue: string) => {
    handleChange(fieldName, newValue, setFormData)
  }
//
// VALIDATION ET ENVOIE DATA AU BACK
const handleSubmit = () =>{

    const isvalidTitreAdd = validTitreAdd("add_ustensil_nom_de_l_ustensil")
    const isvalidDescriptionAdd = validContenuAdd("add_ustensil_description")


    if(isvalidTitreAdd && 
        isvalidDescriptionAdd
        ){ 
        store.dispatch(post_ustensil(formData))
        .then((isConfirmer:  boolean | void) => {
            if(isConfirmer === true){
                Modal_active({active: true, number: 1, text: "L'ustensil a bien était ajouté." });
                Button_active({data: "add_ustensil",  value:false})
            }
        })
    }
}
//
//
// BUILDER
//
//
const contentInput = Input_add_ustensil.slice(0, 10).map((input, index) =>(
    <Input
    variant={input.variant}
    size={input.size}
    element={input.element}
    type={input.type}
    icon={input.icon}
    text={input.text}
    unitee={input.unitee}
    variable={input.variable}
    identifiant={`add_ustensil_${input.text.replace(Regex[16].value, '_').toLowerCase()}`}
    fonction={addDataSimply}
    key={index}
        />  
  )) 
//
//
// RETURN
//
//
    return(
        <>
        
<section className="add_ingredient">
    <div className="modal_add_ingredient">

<Typo
balise="span"
size="s8"
color="cb"
familly="f1"
weight="w7"
transform="maj" 
children="nouveau ustensil"
/>

<div className="close" onClick={() => Button_active({data: "add_ustensil",  value:false})}>
    <icon.icon />
</div>

        <div className="bloc_input_first">
{contentInput.slice(0,2)}
        </div>

{contentInput.slice(2,3)}

  {contentInput.slice(3,4)}
    <Button
    variant="t6"
    fontSize="s2"
    children="enregistrer"
    fonction={handleSubmit}
    data_function={"macro_micro"}
    />
    </div>
</section>
</>
    )
}