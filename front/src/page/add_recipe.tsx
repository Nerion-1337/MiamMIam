// ACTION
import { get_element } from "#5_actions/8_element_recipe_action";
import { get_all_recipe } from "#5_actions/6_all_recipe_action";
import { cooking_process_recipe } from "#5_actions/10_user_cooking_process";
// API
import { post_recipe } from "#6_api/post_recipe";
// BUILDER
import Button from "#components/build/global/button";
import Typo from "#components/build/global/typography";
import Input from "#components/build/global/input";
import Dropdown from "#components/build/global/dropdown";
import Auth from "#components/build/auth";
import Add_ingredient from "#components/modal/add_ingredient"
import Add_ustensil from "#components/modal/add_ustensil"
//COMPONENTS
import { validTitreAdd, validDescriptionAdd, validContenuAdd} from "#components/valid_input";
import Modal_active from "#components/active_redux/modal_active";
import Button_active from "#components/active_redux/button_active";
import { handleChange, handleChangeArray, removeField, handleChangeArrayImg} from "#components/formData";
// DATA
import { Input_add_recipe, List_icon, Dropdown_add_recipe } from "#1_data/links";
// REACT
import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect, } from "react";
//REDUX
import { store } from '#4_reducers/0_store'
import { useSelector } from "react-redux";
// TYPAGE
import { token_reducer, api, object_button_reducer, button_reducer, element_recipe_reducer, api_all_recipe, cooking_process_reducer, apiMedia } from "#0_types/typages";
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
const { id } = useParams();
//
const table = useSelector((state:  button_reducer) => state.buttonReducer);
const token = useSelector((state:  token_reducer) => state.tokenReducer);
const element_Recipe = useSelector((state: element_recipe_reducer) => state.elementRecipeReducer);
const all_recipe = useSelector((state: {allRecipeReducer: api_all_recipe[]} ) => state.allRecipeReducer);
const cooking_process = useSelector((state:  cooking_process_reducer) => state.cookingProcessReducer);
//
const callRecipe = ({recipe:[{"name": `${id}`}]});
const limitOffset = {"quantite_max": "30", "quantite_min": "0"};
//
const [formData, setFormData] = useState<{ [key: string]: string }>({});
const [formDataArray, setFormDataArray] = useState<{ [key: string]: api[] }>({});
const [formDataMedia, setFormDataMedia] = useState<{ [key: string]: apiMedia[] }>({});
const [count, setCount] = useState<number>(2);
const [components, setComponents] = useState<React.ReactNode[]>([]);
const [tagsComponents, setTagsComponents] = useState<React.ReactNode[]>([]);
const [ingredient, setIngredient] = useState<api[]>();
const [repas, setRepas] = useState<api[]>();
const [ustensil, setUstensil] = useState<api[]>();
//
let modal_active: object_button_reducer | null = null;
//
const icon = List_icon.all[2].icon;
//
//
// REQUETTE
//
//
useEffect(() => {
  store.dispatch(get_element("ingredient"))
  store.dispatch(get_element("repas"))
  store.dispatch(get_element("ustensil"))
}, [token]);
//
useEffect(() => {
  if(id && id != "new"){
      if(all_recipe.length < 1){
  store.dispatch(get_all_recipe(16, callRecipe, limitOffset))
      };
  store.dispatch(cooking_process_recipe(id));
  }  
}, [id]);
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
// CHARGER DONNEE EDIT RECETTE
useEffect(() => {
  if(id != "new" && 
  cooking_process.length > 0 && 
  all_recipe.length > 0 && 
  Array.isArray(all_recipe[1].ingredient) && 
  Array.isArray(all_recipe[1].ustensil) && 
  Array.isArray(all_recipe[1].repas) &&
  Array.isArray(all_recipe[1].img_media)){
//    
    cooking_process.map((item, index) =>{
      {index > 0 &&
      addInputComponent(item.contenu, (index + 1));
      addDataSimply(`${Input_add_recipe[2].variable}_${(index + 1)}`, item.contenu)
      setCount(index +2)
      }
    })
//
    all_recipe[1].ingredient.map((item, index) =>{
      if(typeof item === "object"){
      handleChangeArray({
        fieldName: "ingredient", 
        newValue: `${item.name}`, 
        number: true,
        setFormDataArray: setFormDataArray,
        setTagsComponents: setTagsComponents,
        tagsComponents: tagsComponents, 
        quantite: `${item.quantite}`})
    }
    })
//
    all_recipe[1].ustensil.map((item, index) =>{
  if(typeof item === "object"){
  handleChangeArray({
    fieldName: "ustensil", 
    newValue: `${item.name}`, 
    number: true,
    setFormDataArray: setFormDataArray,
    setTagsComponents: setTagsComponents,
    tagsComponents: tagsComponents, 
    quantite: `${item.quantite}`})
}
    })
//
    all_recipe[1].repas.map((item, index) =>{
  handleChangeArray({
    fieldName: "repas", 
    newValue: `${item}`, 
    number: false,
    setFormDataArray: setFormDataArray,
    setTagsComponents: setTagsComponents,
    tagsComponents: tagsComponents})
    })
//
all_recipe[1].img_media.map((item, index) =>{
  // handleChangeArrayImg({
  //   fieldName: "recette_presentation", 
  //   newValue: item,
  //   setFormDataArray: setFormDataMedia, 
  //   setTagsComponents: setTagsComponents, 
  //   tagsComponents: tagsComponents,
  //   multiples: true,
  // })
  console.log(item)
    })
  }  
}, [cooking_process, all_recipe]);
//
// BOUCLE OUVERTURE MODAL ADD INGREDIENT & USTENSIL
for (const item of table) {
      if (item.value === true) {
          modal_active = item;
      }
}
//
// AJOUTER DATA SIMPLE
const addDataSimply = (fieldName: string, newValue: string) => {
//
  handleChange(fieldName, newValue, setFormData)
//  
  setComponents((prevTags) => {
    return prevTags.map((tagComponents: any) => {
      const variable = tagComponents.props?.children[0].props.variable;
      if (variable === fieldName) {
        // Trouvé le composant à mettre à jour
        const clonedChild = React.cloneElement(tagComponents.props.children[0], {
          value: newValue,
        });
        // Retournez le composant mis à jour
        return React.cloneElement(tagComponents, {
          children: [clonedChild, tagComponents.props.children[1]],
        });
      }
      return tagComponents;
    });
  });
}
//
// AJOUTER DATA AVEC TAGS SIMPLE & QUANTITE
const addDataMultiple = (fieldName: string, newValue: string, number: boolean) => {
  handleChangeArray({
    fieldName: fieldName, 
    newValue: newValue, 
    number: number, 
    setFormDataArray: setFormDataArray, 
    setTagsComponents: setTagsComponents, 
    tagsComponents: tagsComponents})
}
//
// AJOUTER DATA MEDIA AVEC TAGS
const addDataImg = (fieldName: string, newValue: Blob| MediaSource, multiples: boolean) => {
//  
handleChangeArrayImg({
    fieldName: fieldName, 
    newValue: newValue,
    setFormDataArray: setFormDataMedia, 
    setTagsComponents: setTagsComponents, 
    tagsComponents: tagsComponents,
    multiples: multiples,
  })
}
//
// SUPPRIMER ETAPE RECETTE
const removeInputComponent = (typeToRemove: string) => {
//
  setComponents((prevTags) => {
    const updatedTags = prevTags.filter((tagComponents: any) => {
      const tagType = tagComponents.props?.id;
      return tagType !== typeToRemove;
    });
// PERMET DE RECUPERE LE DERNIER ELEMENT AVEC DU CONTENU
 let lastVariableNoNull = "";
//
    const updatedComponents = updatedTags.map((tagComponents: any, index: number) => {
      const tagType = tagComponents.props.id;
      const matchType = tagType?.match(/^etape_(\d+)$/);
       
//      
      if (matchType) {
        const indexType = parseInt(matchType[1]);
        if (indexType > parseInt(typeToRemove.split('_')[1])) {          
          const newIndexType = indexType - 1;
          const currentVariable = `etape_preparation_${indexType}`;
          const newVariable =`etape_preparation_${newIndexType}`;
          const value = tagComponents.props.children[0].props.value;         
//
          const clonedChild = React.cloneElement(tagComponents.props.children[0], {
            text: `Étape ${newIndexType}`,
            variable: newVariable,
          });
//          
          const clonedClose = React.cloneElement(tagComponents.props.children[1], {
            onClick: () => removeInputComponent(`etape_${newIndexType}`),
          });
//
//
if(value === undefined){
  removeField(currentVariable, setFormData)
} else {
  handleChange(newVariable, value, setFormData)
  lastVariableNoNull = currentVariable;
}         
//
//          
          return React.cloneElement(tagComponents, {
            key: `${newIndexType}`,
            id: `etape_${newIndexType}`,
            children: [clonedChild,clonedClose],
          });
        }
      }
      return tagComponents;
    });
//   
    removeField(lastVariableNoNull, setFormData)   
    setCount(updatedComponents.length +2)
    console.log(updatedComponents)
    return updatedComponents;
// 
  });
//
}
//
// LIST D'ETAPE RECETTE
const addInputComponent = (value?: string, number?: number) => {
  const newComponent = (
    <article key={number ? `Components_${number}` : count} id={`etape_${number ? number : count}`} className={`new_etape`}>
    <Input
      variant={Input_add_recipe[2].variant}
      size={Input_add_recipe[2].size}
      element={Input_add_recipe[2].element}
      value={value ? value : ""}
      type={Input_add_recipe[2].type}
      icon={Input_add_recipe[2].icon}
      text={`Étape ${number ? number : count}`}
      unitee={Input_add_recipe[2].unitee}
      variable={`${Input_add_recipe[2].variable}_${number ? number : count}`}
      identifiant={`add_recipe_${Input_add_recipe[2].text.replace(/\s/g, '_').toLowerCase()}_preparation_${number ? number : count}`}
      fonction={addDataSimply}
      key={components.length}
    />
<button className="close_etape" onClick={() => removeInputComponent(`etape_${number ? number : count}`)}>
    <icon.icon />
</button>
</article>
  );
  setComponents(prevComponents => [...prevComponents, newComponent]);
  setCount(components.length +3);
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

const test = () =>{
  console.log(tagsComponents)
  console.log(formDataArray)
  console.log(formDataMedia)
  

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
  value={
    index === 0 && id != "new" && all_recipe.length > 0 ? `${all_recipe[1].name}` :
    index === 1 && id != "new"&& all_recipe.length > 0 ? `${all_recipe[1].description}` :
    index === 2 && id != "new" && cooking_process.length > 0 ? `${cooking_process[0].contenu}` : ""}
  type={input.type}
  icon={input.icon}
  text={input.text == "Etape" ? `${input.text} 1` : input.text}
  unitee={input.unitee}
  variable={index === 2 ?`${input.variable}_1` : input.variable}
  identifiant={input.text == "Etape" ? `add_recipe_${input.text.replace(/\s/g, '_').toLowerCase()}_preparation_1` : `add_recipe_${input.text.replace(/\s/g, '_').toLowerCase()}`}
  fonction={ index === 3 || index === 4 ? addDataImg : addDataSimply}
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
  value={id != "new" && all_recipe.length > 1 ? `${all_recipe[1].duree_recette}` : item.value}
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
    placeholder={item.placeholder}
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
  {token.token && components ? (
    <>
    {ingredient && repas && ustensil && (
        <>
            <Typo
  balise="h1"
  size="s8"
  color="cb"
  familly="f1"
  weight="w7"
  transform="maj"
  className="title_page"
  children="nouvelle recette"
  />
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
    children={typeof id === "number" ? "modifier" : "enregistrer"}
    fonction={test}
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
    return content_add_recipe;
}