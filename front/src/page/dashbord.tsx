// ACTION
import { get_all_recipe } from "#5_actions/6_all_recipe_action";
import { get_element } from "#5_actions/8_element_recipe_action";
import { getMy, putMy } from '#5_actions/5_user_action';
import { get_verify_l_f } from '#5_actions/7_like_follow_action'
import { get_consumption } from '#5_actions/9_consumption_action'
// BUILDER
import Typo from "#components/build/global/typography";
import Input from "#components/build/global/input";
import Dropdown from "#components/build/global/dropdown";
import Recipe from "#components/build/recipe_box";
import Button from "#components/build/global/button";
import Auth from "#components/build/auth";
import Calorie_list from "#components/build/calorie_list";
import Paginates from "#components/build/paginate";
//COMPONENTS
import { handleChangeArray, handleChange, handleChangePage } from "#components/formData";
import { Round_2 } from "#components/round";
// DATA
import { Input_Research, Dropdown_research_profile, List_calorie, List_nutriScore, List_trier, typo_calorie, Dropdown_option_dashbord, List_icon, Route_Client, button_objectif, Links_Server, List_macro_objectif } from "#1_data/links";
// REACT
import { useState, useEffect  } from "react";
import React from "react";
//REDUX
import { store } from '#4_reducers/0_store'
import { useSelector } from "react-redux";
// TYPAGE
import { api_all_recipe, element_recipe_reducer, api, payload_api, token_reducer, consumption_reducer } from "#0_types/typages";
//
//
//
//
//
export default function Dashbord(){
//
//
// VARIABLE
//
//
const token = useSelector((state: token_reducer) => state.tokenReducer);   
const all_recipe = useSelector((state: {allRecipeReducer: api_all_recipe[]} ) => state.allRecipeReducer);
const element_Recipe = useSelector((state: element_recipe_reducer) => state.elementRecipeReducer);
const user = useSelector((state:  payload_api) => state.userReducer);
const consumption = useSelector((state:  consumption_reducer) => state.consumptionReducer);
// 
const [formData, setFormData] = useState<{ [key: string]: string }>({});
const [formDataArray, setFormDataArray] = useState<{ [key: string]: api[] }>({});
//    
const [tagsComponents, setTagsComponents] = useState<React.ReactNode[]>([]);
const [repas, setRepas] = useState<api[]>();
const [addRecipe, setAddRecipe] = useState<boolean>(true);
//
const [besoins_calorie_user, setBesoins_calorie_user] = useState<number>();
const [besoinsCalorie, setBesoinsCalorie] = useState<{ [key: string]: number }>({});
const [consumptionUser, setConsumptionUser] = useState<{ [key: string]: number }>({});
const [newObjectif, setNewObjectif] = useState<string>();
const [CalculeObjectif, setCalculeObjectif] = useState<number>();
const [tempoObjectif, setTempoObjectif] = useState<number>(1);
//
const variantKey = Dropdown_option_dashbord[0].variable ? Dropdown_option_dashbord[0].variable : "";
const nameValue = Dropdown_option_dashbord[0].list ? Dropdown_option_dashbord[0].list[0].back : "";
//
const numberOfElements = all_recipe.length > 0 && typeof all_recipe[0].total_recipe === "number" ? all_recipe[0].total_recipe : 1;
//
//
// REQUETTE
//
//
useEffect(() => {
  if(!element_Recipe.repas){
   store.dispatch(get_element("repas"));
  }  
  }, []);
//
useEffect(() => {
    if(token.token === true){
    setFormData({[variantKey]: nameValue, "quantite_max": "30", "quantite_min": "0"});
    store.dispatch(get_verify_l_f());
    if(!user.objectif){
     store.dispatch(getMy()); 
    }
    store.dispatch(get_consumption("holyday"))
  }  

  }, [token]);
//
// POUR LES FILTRES RECETTE
useEffect(() => {
    if(token.id && formData.quantite_max ){
      store.dispatch(get_all_recipe(22, formDataArray, formData));  
    }  
  }, [formDataArray, formData]);
//
//
// FUNCTION
//
//
useEffect(() => {
    if (element_Recipe) {
        setRepas(element_Recipe.repas)
    }
  }, [element_Recipe]);
//
// PUSH DANS UN USESTATE L'OBJECTIF USER DE REDUX
useEffect(() => {
  if(user.objectif){
    setNewObjectif(`${user.objectif}`)    
}  
}, [user.objectif]);    
//
// PERMET SI OBJECTIF CHANGER D'ACTUALISER UN PARAM DE BesoinsCalorie
useEffect(() =>{
  if(newObjectif){
    setCalculeObjectif(newObjectif === "PERTE" ? 0 : newObjectif === "MAINTIENT" ? 1 : newObjectif === "PRISE" ? 2 : 0)
  }
}, [newObjectif])
//
// DEFINI BESOINS CALORIQUE RECUPERE DANS REDUX
useEffect(() => {
    if(user.besoins_calorie){
      setBesoins_calorie_user(typeof user.besoins_calorie === 'number' ? user.besoins_calorie : 0)
  }  
  }, [user.besoins_calorie]);
//
// ACTUALISE LES OBJECTIFS CALORIQUE USER
useEffect(() =>{
  if(besoins_calorie_user && CalculeObjectif !== null && CalculeObjectif !== undefined){  
    setBesoinsCalorie({
      "calorie": Round_2(besoins_calorie_user * List_macro_objectif[CalculeObjectif].calorie * tempoObjectif),
      "proteine": Round_2(besoins_calorie_user * List_macro_objectif[CalculeObjectif].proteine * tempoObjectif),
      "glucide": Round_2(besoins_calorie_user * List_macro_objectif[CalculeObjectif].glucide * tempoObjectif),
      "lipide": Round_2(besoins_calorie_user * List_macro_objectif[CalculeObjectif].lipide * tempoObjectif),
    })
  }
}, [CalculeObjectif, tempoObjectif])
//
// ACTUALISE LES OBJECTIFS CALORIQUE USER
useEffect(() =>{
  if(consumption.calorie){  
    setConsumptionUser({
      "calorie": consumption.calorie,
      "proteine": consumption.proteine,
      "glucide": consumption.glucide,
      "lipide": consumption.lipide,
    })
  } else {
    setConsumptionUser({
      "calorie": 0,
      "proteine": 0,
      "glucide": 0,
      "lipide": 0,
    })
  }
}, [consumption])
//
// MODIFIE LES RECETTES AFFICHER
const optionRecipe = (fieldName: string, newValue: string) => {
      addDataSimply(fieldName, newValue)
      setAddRecipe(newValue === "my_recipe" ? true : false)
}
//
// AJOUTER DATA SIMPLE
const addDataSimply = (fieldName: string, newValue: string) => {
      handleChange(fieldName, newValue, setFormData)
}
//
// AJOUTER DATA AVEC TAGS SIMPLE & QUANTITE
const addDataMultiple = (fieldName: string, newValue: string, number: boolean) => {
      handleChangeArray({
        fieldName, 
        newValue, 
        number, 
        setFormDataArray, 
        setTagsComponents, 
        tagsComponents
        })
}
//
// AJOUTER PAGINATE AUX DATA
const addDataMultiplePage = (fieldNameFirst: string, newValueFirst: string, fieldNameLast: string, newValueLast: string) => {
  handleChangePage(fieldNameFirst, newValueFirst, fieldNameLast, newValueLast, setFormData)
}  
//
// MODIFIE TIME DE L'OBJECTIF
const optionObjectif = (fieldName: string, newValue: string) => {
  setTempoObjectif(newValue === "day" ? 1 : newValue === "week" ? 7 : newValue === "month" ? 30 : 1)
}
//
// CHANGE L'OBJECTIF 
const changeObjectif = (data: string) => {
  store.dispatch(putMy({[Links_Server[0].objectif]: data}))
}
//
// CHANGE LA REALISATION
const changeConsumption = (fieldName: string, newValue: string) => {
  store.dispatch(get_consumption(newValue))
}
//
//
// BUILDER
//
//
// BOUCLE DORPDOWN DE FILTRE RECIPE
const contentDropdown = Dropdown_research_profile.slice(0, 5).map((item, index) =>(
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
      placeholder={item.placeholder}
      icon={item.icon}
      text={item.text}
      variable={item.variable}
      list={index === 1 ? List_nutriScore:
            index === 3 ? List_calorie :
            index === 4 ? repas :
            item.list}
      fonction={addDataMultiple}
      search={item.search}
    />
    )}
    </React.Fragment>
  ))
// BOUCLE CARTE RECETTE
const all_recipe_box = all_recipe.slice(0, 30).map((item, index) => (
    <React.Fragment key={index}>
      {index > 0 && (
        <Recipe recipe={item} />
      )}
      </React.Fragment>
  ))
// BUTTON CHANGEMENT OBJECTIF
const contentButton = button_objectif.slice(0, 5).map((item, index) =>(
  <React.Fragment key={index}>
<Button
     variant={item.variant}
     fontSize={item.fontSize}
     children={item.children}
     children_actif={item.children_actif}
     active_child={index === 0 && newObjectif === "PERTE" ? true:
                   index === 1 && newObjectif === "MAINTIENT" ? true:
                   index === 2 && newObjectif === "PRISE" ? true:
                   false}
     fonction={changeObjectif}
     data_function={index === 0 ? "PERTE" :
                    index === 1 ? "MAINTIENT" :
                    index === 2 ? "PRISE":
                    "MAINTIENT"}
    />
  </React.Fragment>
))
// FILTRE ET BARRE RECHERCHE
const research_dashbord = (
    <>
    {all_recipe[0] && repas && (   
    <>
    <div className="split_dashbord">
    <div className="slide"/>    
    <Dropdown
    variant={Dropdown_option_dashbord[0].variant}
    value={Dropdown_option_dashbord[0].value}
    icon={Dropdown_option_dashbord[0].icon}
    variable={Dropdown_option_dashbord[0].variable}
    list={Dropdown_option_dashbord[0].list}
    fonction={optionRecipe}
    search={Dropdown_option_dashbord[0].search}
    filter={Dropdown_option_dashbord[0].filter}
    modale={Dropdown_option_dashbord[0].modale}
    />
         
    <div className="slide"/>        
    </div>
      <section className="research_dashbord">
      <Input
        variant={Input_Research[0].variant}
        variable={Input_Research[0].variable}
        icon={Input_Research[0].icon}
        text={Input_Research[0].text}
        special={Input_Research[0].special}
        element={Input_Research[0].element}
        search={addDataSimply}
        />
        <div className="list_filter_dashbord">
          <div className="filter">
        {contentDropdown}
         </div>
         <Typo
              balise="span"
              size="s5"
              className="logo"
              children={`Résultat: ${all_recipe[0].total_recipe} recettes`}
              weight="w1"
              familly="f2"
              color="cb"
         />
         </div>
      </section>
      <section className="tag_dashbord">
        {tagsComponents}
        </section>
    </>
    )}
</>
)
// BOUTTON AJOUTER UNE RECETTE
const contentAddRecipe = (
  <>
    <Button
  variant="t9"
  fontSize="s2"
  icon={List_icon.all[5].icon}
  className="button_add_recipe"
  href={`${Route_Client[7].url_id}`}
  >
  <Typo
  balise="span"
  size="s5"
  children="ajouter"
  />
    <Typo
  balise="span"
  size="s5"
  children=" une recette"
  />
  </Button>
  </>
)
//
const contentPercentage = typo_calorie.slice(0, 5).map((item, index) =>(
  <React.Fragment key={index}>
        <Typo
    balise= "span"
    size= "s5"
    familly= "f2"
    weight= "w5"
    color= "cb"
    children={index === 0 ? `${Round_2(consumptionUser.calorie / besoinsCalorie.calorie * 100)}%`:
              index === 1 ? `${Round_2(consumptionUser.proteine / besoinsCalorie.proteine * 100)}%`:
              index === 2 ? `${Round_2(consumptionUser.glucide / besoinsCalorie.glucide * 100)}%`:
              index === 3 ? `${Round_2(consumptionUser.lipide / besoinsCalorie.lipide * 100)}%`:
              index
    }
    className="value"
    />
  </React.Fragment>
))
//
const header = (
  <>
  { user.besoins_calorie && besoinsCalorie && consumptionUser &&(  
  <section className="needs_calorie">
  <div className="split_calorie">
  <Dropdown
    variant={Dropdown_option_dashbord[1].variant}
    value={Dropdown_option_dashbord[1].value}
    icon={Dropdown_option_dashbord[1].icon}
    variable={Dropdown_option_dashbord[1].variable}
    list={Dropdown_option_dashbord[1].list}
    fonction={optionObjectif}
    search={Dropdown_option_dashbord[1].search}
    filter={Dropdown_option_dashbord[1].filter}
    modale={Dropdown_option_dashbord[1].modale}
  />
      <Dropdown
    variant={Dropdown_option_dashbord[2].variant}
    value={Dropdown_option_dashbord[2].value}
    icon={Dropdown_option_dashbord[2].icon}
    variable={Dropdown_option_dashbord[2].variable}
    list={Dropdown_option_dashbord[2].list}
    fonction={changeConsumption}
    search={Dropdown_option_dashbord[2].search}
    filter={Dropdown_option_dashbord[2].filter}
    modale={Dropdown_option_dashbord[2].modale}
  />
  </div>
  <div className="need_calorie_user">
<Calorie_list 
data={besoinsCalorie}
/>

<div className="pourcentage">
{contentPercentage}
</div>

<Calorie_list 
data={consumptionUser}
/>
<div className="button_objectif">
{contentButton}
</div>
  </div>
  </section>
  )}
  </>
)
//
const content_all_recipe = (
<section className="all_recipe">
{addRecipe ? (
  <>
  {contentAddRecipe}
  {all_recipe_box}
  </>
): (
  all_recipe_box
)}
</section> 
)
//
const content = (
    <main className="main_dashbord">
    {token.token ? (
        <>
    {header}
    {research_dashbord}
    {content_all_recipe}
    
    <Paginates
        data={numberOfElements}
        requette={addDataMultiplePage}
        showEntrie={30}  
        />
    </>
    ) : (
    <Auth/>       
    )}

    </main>
)
//
//
// RETURN
//
//      
    return content
}