// ACTION
import { get_all_recipe } from "#actions/all_recipe_action";
import { get_element } from "#actions/element_recipe_action";
// BUILDER
import Typo from "#components/build/global/typography";
import Input from "#components/build/global/input";
import Dropdown from "#components/build/global/dropdown";
import Recipe from "#components/build/recipe_box";
//COMPONENTS
import { handleChangeArray, handleChange } from "#components/formData";
// DATA
import { Input_Research, Dropdown_research, List_calorie, List_nutriScore, List_trier } from "#data/links";
// REACT
import { useState, useEffect } from "react";
import React from "react";
//REDUX
import { store } from '#/reducers/store'
import { useSelector } from "react-redux";
// TYPAGE
import { api_all_recipe, element_recipe_reducer, api } from "#types/typages";
//
//
//
//
//
export default function Home() {
//
//
// VARIANT
//
//
const all_recipe = useSelector((state: {allRecipeReducer: api_all_recipe[]} ) => state.allRecipeReducer);
const [formData, setFormData] = useState<{ [key: string]: string }>({});
const [formDataArray, setFormDataArray] = useState<{ [key: string]: api[] }>({page:[{"quantite_max": "10", "quantite_min": "0"}]});
const [tagsComponents, setTagsComponents] = useState<React.ReactNode[]>([]);
const element_Recipe = useSelector((state: element_recipe_reducer) => state.elementRecipeReducer);
const [repas, setRepas] = useState<api[]>();
const [pseudo, setPseudo] = useState<api[]>();
const [page, setPage] = useState(1);
const [ShowEntries, setShowEntries] = useState(10);
const numberOfElements = all_recipe.length > 0 ? all_recipe[0].total_recipe : 0;
let numberPaginate = Math.ceil(typeof numberOfElements === "number" ? numberOfElements : 0  / ShowEntries);
const ShowEntriesMIN =  Math.ceil((page - 1) * ShowEntries);
const ShowEntriesMAX =  Math.ceil(page * ShowEntries);
//
//
// REQUETTE
//
//
useEffect(() => {
  store.dispatch(get_element("repas"));
  store.dispatch(get_element("pseudo"));
}, []);
//
useEffect(() => {
  store.dispatch(get_all_recipe(formDataArray, formData));
}, [formDataArray, formData]);
//
//
// FUNCTION
//
//
// CHARGER DATA STORE POUR DROPDOWN  
useEffect(() => {
  if (element_Recipe) {
      setRepas(element_Recipe.repas)
      setPseudo(element_Recipe.pseudo)
  }
}, [element_Recipe]);
//
// AJOUTER DATA SIMPLE
const addDataSimply = (fieldName: string, newValue: string) => {
  handleChange(fieldName, newValue, setFormData)
}
//
// AJOUTER DATA AVEC TAGS SIMPLE & QUANTITE
const addDataMultiple = (fieldName: string, newValue: string, number: boolean) => {
  handleChangeArray(
    fieldName, 
    newValue, 
    number, 
    setFormDataArray, 
    setTagsComponents, 
    tagsComponents
    )
}
//
//
// BUILDER
//
//
const contentDropdown = Dropdown_research.slice(0, 10).map((item, index) =>(
  <React.Fragment key={index}>
  {index === 0 ? (
  <Dropdown
  variant={item.variant}
  value={item.value}
  icon={item.icon}
  variable={item.variable}
  list={List_trier}
  fonction={addDataSimply}
  search={item.search}
  filter={true}
/>
  ):(
    <Dropdown
    variant={item.variant}
    value={item.value}
    icon={item.icon}
    text={item.text}
    variable={item.variable}
    list={index === 1 ? List_nutriScore:
          index === 3 ? List_calorie :
          index === 4 ? repas :
          index === 5 ? pseudo :
          item.list}
    fonction={addDataMultiple}
    search={item.search}
  />
  )}
  </React.Fragment>
))
//
//
const header_home = (
  <>
  {all_recipe[0] && repas && pseudo && (
    <>
        <div className="baniere_home"></div>
        
        <section className="title">
        <Typo 
          balise="h2"
          size="s10"
          transform="maj"
          className="logo"
          children="CUISINE UN PLAT QUI TE PLAIT"
          weight="w1"
          familly="f2"
          color="c2"
        />
        <Typo 
          balise="h2"
          size="s10"
          transform="maj"
          className="logo"
          children="SAVOUREUX ET ADAPTÉ A TES OBJECTIFS"
          weight="w1"
          familly="f2"
          color="c2"
        />
        </section>
        
        <section className="search">
        <Input
        variant={Input_Research[0].variant}
        variable={Input_Research[0].variable}
        icon={Input_Research[0].icon}
        text={Input_Research[0].text}
        special={Input_Research[0].special}
        search={addDataSimply}

        />
        </section>
        
        <section className="list_filter_home">
          <div className="filter">
        {contentDropdown}
         </div>
         <Typo
              balise="span"
              size="s5"
              transform="maj"
              className="logo"
              children={`Résultat: ${all_recipe[0].total_recipe} recettes`}
              weight="w1"
              familly="f2"
              color="c2"
         />
        </section>
        
        <section className="tag_home">
        {tagsComponents}
        </section>
</>
)}
  </>
)
//
// TOUTE LES RECETTES
const content_all_recipe = all_recipe.slice(0, 10).map((item, index) => (
  <React.Fragment key={index}>
    {index === 1 && (
      <Recipe recipe={item} />
    )}
    </React.Fragment>
))
//
//
const content = (
  <>
  {header_home}
  {content_all_recipe}
  </>
)
//
//
// RETURN
//
//
    return (
      <main className="main_home">
      {content}
    </main>
    );
}
