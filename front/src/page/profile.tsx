// ACTION
import { get_all_recipe } from "#5_actions/6_all_recipe_action";
import { get_element } from "#5_actions/8_element_recipe_action";
import { getUser } from '#5_actions/5_user_action';
import { follow_user } from "#5_actions/5_user_action";
import { get_verify_f_user, get_verify_l_f } from '#5_actions/7_like_follow_action'
// BUILDER
import Typo from "#components/build/global/typography";
import Input from "#components/build/global/input";
import Dropdown from "#components/build/global/dropdown";
import Recipe from "#components/build/recipe_box";
import Img from "#components/build/global/img";
import Button from "#components/build/global/button";
import  Paginates  from "#components/build/paginate";
//COMPONENTS
import { handleChangeArray, handleChange, handleChangePage } from "#components/formData";
import Button_active from "#components/active_redux/button_active";
// DATA
import { Input_Research, Dropdown_research_profile, List_calorie, List_nutriScore, List_trier, Dropdown_option_profile } from "#1_data/links";
// REACT
import { useParams } from "react-router-dom";
import { useState, useEffect  } from "react";
import React from "react";
//REDUX
import { store } from '#4_reducers/0_store'
import { useSelector } from "react-redux";
// TYPAGE
import { api_all_recipe, element_recipe_reducer, api, payload_api, token_reducer, like_follow_reducer, button_reducer, object_button_reducer } from "#0_types/typages";
//
//
//
//
//
export default function Profile(){
//
//
// VARIABLE
//
//
const { id } = useParams();
//
const token = useSelector((state: token_reducer) => state.tokenReducer);     
const user = useSelector((state:  payload_api) => state.userReducer);
const follow_like = useSelector((state:  like_follow_reducer) => state.LikeFollowReducer);
const all_recipe = useSelector((state: {allRecipeReducer: api_all_recipe[]} ) => state.allRecipeReducer);
const element_Recipe = useSelector((state: element_recipe_reducer) => state.elementRecipeReducer);
const table = useSelector((state:  button_reducer) => state.buttonReducer);
// 
const [formData, setFormData] = useState<{ [key: string]: string }>({"quantite_max": "30", "quantite_min": "0"});
const [formDataArray, setFormDataArray] = useState<{ [key: string]: api[] }>({user:[{"name": `${id}`}]});
//    
const [tagsComponents, setTagsComponents] = useState<React.ReactNode[]>([]);
const [repas, setRepas] = useState<api[]>();
const [followUser, setFollowUser] = useState<boolean>();
//
const numberOfElements = all_recipe.length > 0 && typeof all_recipe[0].total_recipe === "number" ? all_recipe[0].total_recipe : 1;
//
let modal_active: object_button_reducer | null = null; 
//
//
// REQUETTE
//
//
useEffect(() => {
    store.dispatch(get_element("repas"));
  }, []);
//
useEffect(() => {
    if (element_Recipe) {
        setRepas(element_Recipe.repas)
    }
  }, [element_Recipe]);
//
useEffect(() => {
    if(id){
      store.dispatch(get_all_recipe(16, formDataArray, formData));  
    }  
  }, [formDataArray, formData]);
//
useEffect(() => {
    if(id){
        store.dispatch(getUser(id)); 
        store.dispatch(get_verify_f_user())
        store.dispatch(get_verify_l_f());
      }
  }, [id]);
//
useEffect(() => {
  if(id && follow_like.user){
    setFollowUser(follow_like.user.some((item) => parseInt(item.follow) === parseInt(id)))
    }
}, [follow_like]);  
//
//
// FUNCTION
//
//
//
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
// AJOUTER OU ENLEVE FOLLOW USER
const like_follow = () =>{
    if(id){
      store.dispatch(follow_user(id))
      setTimeout(()=>{
      store.dispatch(get_verify_f_user())
      }, 100)
    }  
  }
//
//
const option_profile = (fieldName: string, newValue: string) =>{
  Button_active({data: newValue, value: true, number: parseFloat(id ? id : "0"), section: "user"})
  }  
//
//
// BUILDER
//
//
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
//
const all_recipe_box = all_recipe.slice(0, 30).map((item, index) => (
    <React.Fragment key={index}>
      {index > 0 && (
        <Recipe recipe={item} />
      )}
      </React.Fragment>
  ))
//
const Dropdown_user = (
  <>
  {token.token ? (
<>
<div className="option_profile">
    <Dropdown
    variant={Dropdown_option_profile[0].variant}
    value={Dropdown_option_profile[0].value}
    icon={Dropdown_option_profile[0].icon}
    variable={Dropdown_option_profile[0].variable}
    list={Dropdown_option_profile[0].list}
    fonction={option_profile}
    search={Dropdown_option_profile[0].search}
    filter={Dropdown_option_profile[0].filter}
    modale={Dropdown_option_profile[0].modale}
  />
</div>
</>
):(
<>
</>
)}
  </>
)
//
const button_profile = (
    <>
    {token.token ? (
  <>
        <Button
         variant="t2"
         fontSize="s2"
         children="suivre"
         fonction={like_follow}
         children_actif="désabonné"
         active_child={followUser ? followUser : false}
        />
        <Typo
         balise="span"
         size="s7"
         className="follower_total"
         transform="maj"
         children={`${user.follower_total}`}
         weight="w1"
         familly="f2"
         color="cb"
         />
        <Button
         variant="t2"
         fontSize="s2"
         children="contacter"
        />
  </>
):(
  <>
        <Typo
         balise="span"
         size="s7"
         className="follower_total"
         transform="maj"
         children={`${user.follower_total}`}
         weight="w1"
         familly="f2"
         color="cb"
         />
  </>
)}
    </>
)
//
const header_profile = (
    <>  
<section className="hearder_profile">

    <div className="img_profile">
    <Img
  sizeBloc="s8"
  sizeImg="s8"
  radius="r5"
 src={typeof user.photo_profil === "string" ? user.photo_profil : "" } 
  />
    {Dropdown_user}
    </div>

    <div className="button_profile">
    {button_profile}
    </div>

</section>
    </>
)
//
const research_profile = (
    <>
    {all_recipe[0] && repas && (   
    <>
    <div className="split_profile">
    <div className="slide"/>    
    <Typo
      balise="span"
      size="s7"
      className="split_title"
      transform="maj"
      children={`recettes`}
      weight="w1"
      familly="f2"
      color="cb"
         />
    <div className="slide"/>        
    </div>
      <section className="research_profile">
      <Input
        variant={Input_Research[0].variant}
        variable={Input_Research[0].variable}
        icon={Input_Research[0].icon}
        text={Input_Research[0].text}
        special={Input_Research[0].special}
        element={Input_Research[0].element}
        search={addDataSimply}
        />
        <div className="list_filter_profile">
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
      <section className="tag_profile">
        {tagsComponents}
        </section>
    </>
    )}
</>
)
//
const content_all_recipe = (
  <section className="all_recipe">
  {all_recipe_box}
  </section>
)
//
const content = (
    <>
    <Typo
  balise="h1"
  size="s8"
  color="cb"
  familly="f1"
  weight="w7"
  transform="maj"
  className="title_page"
  children={user.pseudo}
  />
<main className="main_profile">
    {header_profile}
    {research_profile}
    {content_all_recipe}
    
    <Paginates
  data={numberOfElements}
  requette={addDataMultiplePage}
  showEntrie={30}  
  />
</main>
    </>
)
//
//
// RETURN
//
//    
    return content;
}