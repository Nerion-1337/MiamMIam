// ACTION
import { get_element } from "#actions/element_recipe_action";
// API
import { post_recipe } from "#api/post_recipe";
// BUILDER
import Button from "#components/build/global/button";
import Typo from "#components/build/global/typography";
import Input from "#components/build/global/input";
import Dropdown from "#components/build/global/dropdown";
import Auth from "#components/build/auth";
import Add_ingredient from "#components/modal_element_recipe/add_ingredient"
import Add_ustensil from "#components/modal_element_recipe/add_ustensil"
//COMPONENTS
import { validTitreAdd, validDescriptionAdd, validContenuAdd} from "#components/valid_input";
import Modal_active from "#components/active_redux/modal_active";
import Button_active from "#components/active_redux/button_active";
import { handleChange, handleChangeArray} from "#components/formData";
// DATA
import { Input_add_recipe, List_icon, Dropdown_add_recipe } from "#data/links";
// REACT
import React from "react";
import { useState, useEffect, } from "react";
//REDUX
import { store } from '#/reducers/store'
import { useSelector } from "react-redux";
// TYPAGE
import { token_reducer, api, object_button_reducer, button_reducer, element_recipe_reducer } from "#types/typages";
//
//
//
//
//
export default function Add_recipe(){
//
//
// VARIABLE
//
//
const [formData, setFormData] = useState<{ [key: string]: string }>({});
const [formDataArray, setFormDataArray] = useState<{ [key: string]: api[] }>({});
const [count, setCount] = useState(2);
const [components, setComponents] = useState<React.ReactNode[]>([]);
const [tagsComponents, setTagsComponents] = useState<React.ReactNode[]>([]);
const [ingredient, setIngredient] = useState<api[]>();
const [repas, setRepas] = useState<api[]>();
const [ustensil, setUstensil] = useState<api[]>();
const table = useSelector((state:  button_reducer) => state.buttonReducer);
const token = useSelector((state:  token_reducer) => state.tokenReducer);
const element_Recipe = useSelector((state: element_recipe_reducer) => state.elementRecipeReducer);
let modal_active: object_button_reducer | null = null;
//
//
// REDUX
//
//
useEffect(() => {
  store.dispatch(get_element("ingredient"))
  store.dispatch(get_element("repas"))
  store.dispatch(get_element("ustensil"))
}, [token]);
//
//
// FUNCTION
//
//
// CHARGER DATA STORE POUR DROPDOWN  
useEffect(() => {
  if (element_Recipe.ingredient) {
      setIngredient(element_Recipe.ingredient)
      setRepas(element_Recipe.repas)
      setUstensil(element_Recipe.ustensil)
  }
}, [element_Recipe]);
//
// BOUCLE OUVERTURE MODAL ADD INGREDIENT
for (const item of table) {
      if (item.value === true) {
          modal_active = item;
      }
}
//
// AJOUTER DATA SIMPLE
const addDataSimply = (fieldName: string, newValue: string) => {
  handleChange(fieldName, newValue, setFormData)
}
//
// AJOUTER DATA AVEC TAGS SIMPLE & QUANTITE
const addDataMultiple = (fieldName: string, newValue: string, number: boolean) => {
  handleChangeArray(fieldName, newValue, number, setFormDataArray, setTagsComponents, tagsComponents)
}
//
// LIST D'ETAPE RECETTE
const addInputComponent = () => {
  const newComponent = (
    <Input
      variant={Input_add_recipe[2].variant}
      size={Input_add_recipe[2].size}
      element={Input_add_recipe[2].element}
      type={Input_add_recipe[2].type}
      icon={Input_add_recipe[2].icon}
      text={`Étape ${count}`}
      unitee={Input_add_recipe[2].unitee}
      variable={`${Input_add_recipe[2].variable}_${count}`}
      identifiant={`add_recipe_${Input_add_recipe[2].text.replace(/\s/g, '_').toLowerCase()}_preparation_${count}`}
      fonction={addDataSimply}
      key={components.length}
    />
  );

  setComponents([...components, newComponent]);
  setCount(count + 1);
}
//
// VALIDATION ET ENVOIE DATA AU BACK
  const handleSubmit = () =>{

    const isvalidTitreAdd = validTitreAdd(`add_recipe_${Input_add_recipe[0].text.replace(/\s/g, '_').toLowerCase()}`);
    const isvalidDescriptionAdd = validDescriptionAdd(`add_recipe_${Input_add_recipe[1].text.replace(/\s/g, '_').toLowerCase()}`);
    const isvalidContenuAdd = [];
    for (const key in formData) {
      if (Object.prototype.hasOwnProperty.call(formData, key) && key.startsWith('etape_preparation')) {
        isvalidContenuAdd.push({[key]: validContenuAdd(`add_recipe_${key}`)});
      }
    }
    const hasInvalidContenu = isvalidContenuAdd.some(item => Object.values(item)[0] === false);

    if(isvalidTitreAdd && 
       isvalidDescriptionAdd &&
       !hasInvalidContenu
        ){ 
          post_recipe(formData, formDataArray)
        .then((isConfirmer:  boolean | void) => {
            if(isConfirmer === true){       
                Modal_active({active: true, number: 1, text: "La recette a bien était ajouté." });
            }
        })
    }
}
//
//
// BUILDER
//
//
const contentInput = Input_add_recipe.slice(0, 6).map((input, index) =>(
  <Input
  variant={input.variant}
  size={input.size}
  element={input.element}
  type={input.type}
  icon={input.icon}
  text={input.text == "Etape" ? `${input.text} 1` : input.text}
  unitee={input.unitee}
  variable={index === 2 ?`${input.variable}_1` : input.variable}
  identifiant={input.text == "Etape" ? `add_recipe_${input.text.replace(/\s/g, '_').toLowerCase()}_preparation_1` : `add_recipe_${input.text.replace(/\s/g, '_').toLowerCase()}`}
  fonction={addDataSimply}
  multiples={input.multiples}
  key={index}
      />  
))
//
const contentDropdown = Dropdown_add_recipe.slice(0, 6).map((item, index) =>(
  <React.Fragment key={index}>
  {index === 0 ? (
  <Dropdown
  variant={item.variant}
  value={item.value}
  icon={item.icon}
  text={item.text}
  variable={item.variable}
  list={item.list}
  fonction={addDataSimply}
  search={item.search}
/>
  ):(
    <Dropdown
    variant={item.variant}
    value={item.value}
    icon={item.icon}
    text={item.text}
    variable={item.variable}
    list={index === 1 ? ingredient :
          index === 2 ? repas :
          index === 3 ? ustensil : 
          item.list}
    fonction={addDataMultiple}
    search={item.search}
    number={item.number}
  />
  )}
  </React.Fragment>
))
//
// AFFICHE MODAL ADD_INGREDIENT OU ADD_USTENSIL
const contentModal = (
  <>
  {modal_active && modal_active.name === "add_ingredient" &&  modal_active.value === true ? (
<Add_ingredient/>
  ):(
<>
{modal_active && modal_active.name === "add_ustensil" &&  modal_active.value === true && (
  <Add_ustensil/>
)}
</>
  )}
  </>
)
//
const content_add_recipe =(
  <>
  {token.token ? (
    <>
    {ingredient && repas && ustensil && (
        <>
        
        {contentModal}
        <main className="main_add_recipe">   
<section>
  {contentInput.slice(0, 3)}
  {components}
  <Button
  variant="t7"
  fontSize="s2"
  icon={List_icon.all[5].icon}
  children="ajouter une étape"
  fonction={addInputComponent}
  />
{contentDropdown[0]}
<Typo
size="s4"
color="c3"
transform="maj"
children="Les quantités des ingrédients doivent être exprimés en gramme."
/>
<div className="dropdown_recette">
{contentDropdown[1]}
<Button
    variant="t8"
    fontSize="s2"
    children="Nouveau ingredient"
    fonction={() => Button_active({data: "add_ingredient",  value:true})}
/>
 {contentDropdown.slice(2, 6)}
<Button
    variant="t8"
    fontSize="s2"
    children="Nouveau ustensil"
    fonction={() => Button_active({data: "add_ustensil",  value:true})}
    />
</div>
  <div className="list_tags">
    {tagsComponents}
  </div>
  <div className="add_img">
  {contentInput.slice(3, 5)}
  </div>
  <Button
    variant="t6"
    fontSize="s2"
    children="enregistrer"
    fonction={handleSubmit}
    data_function={"macro_micro"}
    />
</section>    
        </main>
        </>
        )}
        </>
      ) : (
        <Auth/>
        )}
  </>
)
//
// 
// RETURN
//
//    
    return(
        <>
{content_add_recipe}
        </>
    )
}