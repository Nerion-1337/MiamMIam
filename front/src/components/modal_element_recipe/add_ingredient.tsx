import React from "react";
// DATA
import { Input_add_ingredient, List_icon, Dropdown_add_ingredient, Regex } from "#data/links";
// BUILDER
import Button from "#components/build/global/button";
import Typo from "#components/build/global/typography";
import Input from "#components/build/global/input";
import Dropdown from "#components/build/global/dropdown";
import Tag from "#components/build/global/tag";
// REACT
import { useState, useEffect } from "react";
//COMPONENTS
import { validTitreAdd, validContenuAdd, validInputAdd } from "#components/valid_input";
import Modal_active from "#components/active_redux/modal_active";
import Button_active from "#components/active_redux/button_active";
//REDUX
import { store } from '#/reducers/store'
import { useSelector } from "react-redux";
// ACTION
import { get_element, post_ingredient } from "#actions/element_recipe_action";
// TYPAGE
import { api, element_recipe_reducer, api_element_recipe } from "#types/typages";
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
const [formDataArray, setFormDataArray] = useState<api_element_recipe>({});
const [tagsComponents, setTagsComponents] = useState<React.ReactNode[]>([]);
const [type, setType] = useState<api[]>();
const [macro_micro, setMacro_micro] = useState<api[]>();
const [micro, setMicro] = useState<api[]>();
const icon = List_icon.all[2].icon;
const element_Recipe = useSelector((state: element_recipe_reducer) => state.elementRecipeReducer);
//
//
// REDUX
//
//
useEffect(() => {
    store.dispatch(get_element("type"))
    store.dispatch(get_element("macro_micro"))
  }, []);
//
//
// FUNCTION
//
//
// CHARGER DATA STORE POUR DROPDOWN  
useEffect(() => {
    if (element_Recipe.macro_micro && element_Recipe.type) {
        const filteredData = element_Recipe.macro_micro.filter(item => item.type === 'vitamine' || item.type === 'mineraux');
        const filteredData2 = element_Recipe.macro_micro.filter(item => item.type === "micro");
        setType(element_Recipe.type)
        setMacro_micro(filteredData)
        setMicro(filteredData2)
    }
}, [element_Recipe]);
//
// STOCK DONNEES INPUT
const handleChange = (fieldName: string, newValue: string) => {
    setFormData((prevState) => {
        return { ...prevState, [fieldName]: newValue };
      });
  };
//
// AJOUTE ELEMENT CONTENU DANS formDataArray
  const handleChangeArray = (fieldName: string, newValue: string, number: boolean) => {
    setFormDataArray((prevState) => {
      const keyExists = Object.keys(prevState).includes(fieldName);
  
      if (keyExists) {
        const isValuePresent = prevState[fieldName].some((item) => item.name === newValue);
  
        if (!isValuePresent) {
          const newItem: api = { name: newValue };
          const updatedField = {
            ...prevState,
            [fieldName]: [...prevState[fieldName], newItem],
          };
          addTagComponent(newValue, fieldName, number);
          return updatedField;
        }
      } else {
        addTagComponent(newValue, fieldName, number);
        return {
          ...prevState,
          [fieldName]: [{ name: newValue }],
        };
      }
      return prevState;
    });
  };
  //
  // SUPPRIME ELEMENT CONTENU DANS formDataArray
  const removeFromFormDataArray = (fieldName: string, elementToRemove: string) => {
    setFormDataArray((prevState) => {
      const fieldData = prevState[fieldName];
      if (fieldData) { 
        const updatedField = {
          ...prevState,
          [fieldName]: fieldData.filter((element) => element.name !== elementToRemove),
        };
        removeTagComponent(elementToRemove, fieldName)
        return updatedField;
      }
      return prevState;
    });
  };
  //
  // SUPPRIME TAG
  const removeTagComponent = (valueToRemove: string, typeToRemove: string) => {
    setTagsComponents((prevTags) => {
      const updatedTags = prevTags.filter((tagComponent: any) => {
        const tagValue = tagComponent.props?.value;
        const tagType = tagComponent.props?.type;
        return tagValue !== valueToRemove || tagType !== typeToRemove;
      });
      return updatedTags;
    });
  };
  //
  // AJOUTE LA VALEUR QUANTITE
  const addQuantityToElement = (fieldName: string, elementName: string, quantity: string) => {
    setFormDataArray((prevState) => {
      const fieldData = prevState[fieldName];
      if (fieldData) {
        const updatedField = fieldData.map((element) => {
          if (element.name === elementName) {
            return {
              ...element,
              quantite: quantity,
            };
          }
          return element;
        });
  
        return {
          ...prevState,
          [fieldName]: updatedField,
        };
      }
      return prevState; // Renvoyer l'état actuel si le champ n'est pas trouvé
    });
  };
  //
  // LIST DE TAGS
  const addTagComponent = (value: string, type: string, number: boolean) => {
    const newTagComponent = (
      <Tag
        value={value}
        type={type}
        number={number}
        fonction={addQuantityToElement}
        close={removeFromFormDataArray}
        key={tagsComponents.length}
      />
    );
    setTagsComponents([...tagsComponents, newTagComponent]);
  }
  //
  // VALIDATION ET ENVOIE DATA AU BACK
const handleSubmit = () =>{

    const isvalidTitreAdd = validTitreAdd("add_ingredient_nom_de_l_ingredient")
    const isvalidDescriptionAdd = validContenuAdd("add_ingredient_description")
    const isvalidCalorie = validInputAdd("add_ingredient_calorie")
    const isvalidProteine = validInputAdd("add_ingredient_proteine")
    const isvalidGlucide = validInputAdd("add_ingredient_glucide")
    const isvalidLipide = validInputAdd("add_ingredient_lipide")

    if(isvalidTitreAdd && 
        isvalidDescriptionAdd && 
        isvalidCalorie &&
        isvalidProteine &&
        isvalidGlucide &&
        isvalidLipide
        ){ 
        store.dispatch(post_ingredient(formData, formDataArray))
        .then((isConfirmer:  boolean | void) => {
            if(isConfirmer === true){
              Modal_active({active: true, number: 1, text: "L'ingredient a bien était ajouté." });
              Button_active({data: "add_ingredient",  value: false})
            }
        })
    }
}
//
//
// BUILDER
//
//
const contentInput = Input_add_ingredient.slice(0, 10).map((input, index) =>(
    <Input
    variant={input.variant}
    size={input.size}
    element={input.element}
    type={input.type}
    icon={input.icon}
    text={input.text}
    unitee={input.unitee}
    variable={input.variable}
    identifiant={`add_ingredient_${input.text.replace(Regex[16].value, '_').toLowerCase()}`}
    fonction={handleChange}
    key={index}
        />  
  ))
//
const contentDropdown = Dropdown_add_ingredient.slice(0, 6).map((item, index) =>(
    <React.Fragment key={index}>
       {index === 0 ? ( 
      <Dropdown
      variant={item.variant}
      value={item.value}
      icon={item.icon}
      text={item.text}
      variable={item.variable}
      list={type}
      fonction={handleChangeArray}
      search={item.search}
      number={item.number}
      key={index}
    />
    ):(
        <>
        {index === 1 ? (

        <Dropdown
        variant={item.variant}
        value={item.value}
        icon={item.icon}
        text={item.text}
        variable={item.variable}
        list={macro_micro}
        fonction={handleChangeArray}
        search={item.search}
        number={item.number}
        key={index}
      />

        ):(
        <Dropdown
        variant={item.variant}
        value={item.value}
        icon={item.icon}
        text={item.text}
        variable={item.variable}
        list={micro}
        fonction={handleChangeArray}
        search={item.search}
        number={item.number}
        key={index}
      />     
        )}
</>
      )}  
   </React.Fragment>
  ))  
//
//
// RETURN
//
//
    return(
        <>
        {type && macro_micro && micro && (
<section className="add_ingredient">
    <div className="modal_add_ingredient">

<Typo
balise="span"
size="s8"
color="cb"
transform="maj" 
children="nouveau ingredient"
/>

<div className="close" onClick={() => Button_active({data: "add_ingredient",  value:false})}>
    <icon.icon />
</div>

        <div className="bloc_input_first">
{contentInput.slice(0,2)}
        </div>

{contentInput.slice(2,3)}

<ul className="bloc_ul_first">
    Pour 100g:
    <li>Calorie exprimé en <span>kcal</span></li>
    <li>Proteine/Glucide/Lipide exprimé en <span>gramme</span></li>
    <li>VItamine & Minéraux en <span>micro-gramme</span> (mg)</li>
</ul>

<div className="bloc_input_second">
{contentInput.slice(3,7)}
</div>

<div className="bloc_dropdown_first">
{contentDropdown.slice(0,3)}
        </div>

<div className="list_tags">
    {tagsComponents}
  </div>

  {contentInput.slice(7,8)}
    <Button
    variant="t6"
    fontSize="s2"
    children="enregistrer"
    fonction={handleSubmit}
    data_function={"macro_micro"}
    />
    </div>
</section>
)}
</>
    )
}