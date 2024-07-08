// ACTION
import { like_follow_recipe } from "#5_actions/6_all_recipe_action";
import { get_verify_l_f } from '#5_actions/7_like_follow_action'
import { post_consumption } from '#5_actions/9_consumption_action'
// BUILDER
import Typo from "#components/build/global/typography";
import Img from "#components/build/global/img";
import Navlinks from "./global/navlink";
import Dropdown from "#components/build/global/dropdown";
// COMPONENTS
import Button_active from "#components/active_redux/button_active";
import { Round, Round_2 } from "#components/round";
// DATA
import { List_icon, Route_Client, Dropdown_option_card_recipe } from "#1_data/links";
// REACT
import { useState, useEffect } from "react";
//REDUX
import { store } from '#4_reducers/0_store'
import { useSelector } from "react-redux";
// TYPAGE
import { recipeBox, token_reducer, like_follow_reducer } from "#0_types/typages"
//
//
//
//
//
export default function Recipe_Box({ 
    recipe 
}: recipeBox) {
//
//
// VARIABLE
//
//
const token = useSelector((state:  token_reducer) => state.tokenReducer);
const follow_like = useSelector((state:  like_follow_reducer) => state.LikeFollowReducer);
//
const [followRecipe, setFollowRecipe] = useState<boolean>();
const [likeRecipe, setLikeRecipe] = useState<boolean>();
const [animHover, setAnimHover] = useState<{ [key: string]: boolean }>({});     
//
//
// REQUETE
//
//
useEffect(() => {
  if( follow_like.recipe && recipe){
    const follow = follow_like.recipe.some((item) => item.follow === recipe.id);
    const like = follow_like.recipe.some((item) => item.likes === recipe.id);
  setFollowRecipe(follow)
  setLikeRecipe(like)
  setAnimHover({"like":like, "follow":follow})
    }
}, [follow_like]);  
//
//
// FUNCTION
//
//
const like_follow = (data: string) =>{
  const formData = {[data]: recipe.id as number}
  store.dispatch(like_follow_recipe(formData))
  setTimeout(()=>{
    store.dispatch(get_verify_l_f())
    }, 100)

}
//
//
const option_recipe = (fieldName: string, newValue: string) =>{
//
const condition = Dropdown_option_card_recipe[0].list ? Dropdown_option_card_recipe[0].list : ""
//
if (Array.isArray(condition) && condition.length > 0 && typeof condition[0] === 'object' && 'name' in condition[0]) {
//
if(newValue === condition[0].name){
  Button_active({data: newValue, value: true, number: typeof recipe.id === "number" ? recipe.id : 0, section: "recipe"})

} else if (newValue === condition[1].name){
store.dispatch(post_consumption(typeof recipe.id === "number" ? recipe.id : 0 , 100))

}
//
}
//
}
//
// MODIFIE LE HOVER ICON
const handleMouse = (data_mouse: string, mouse_type: string): void => {
  setAnimHover(prevState => {
    if ((likeRecipe && data_mouse === "like") || (followRecipe && data_mouse === "follow")) {
      return { ...prevState, [data_mouse]: mouse_type === "enter" ? false : true };
    } else {
      return { ...prevState, [data_mouse]: mouse_type === "enter" ? true : false };
    }
  });
};
//
//
// BUILDER
//
//
const recipe_visitor = (
    <>
<div className="button">
<Typo
balise="span"
color="c2"
size="s3"
familly="f2"
weight="w1"
LR="left"
className="decouvrir"
icon={List_icon.all[7].icon}
children="Découvrir"
href={`${Route_Client[8].url_id}${recipe.id}`}
/>
 
<div className="social">
<Typo
balise="span"
color="c2"
size="s3"
familly="f2"
weight="w1"
LR="right"
className="heart_visitor"
icon={List_icon.all[9].icon}
children={`${typeof recipe.like_total === "number" ? recipe.like_total : "" }`}
/>
 </div>
</div>
    </>
)
//
const recipe_user = (
  <>
<div className="button">
<Typo
balise="span"
color="c2"
size="s3"
familly="f2"
weight="w1"
LR="left"
className="decouvrir"
icon={List_icon.all[7].icon}
children="Découvrir"
href={`${Route_Client[8].url_id}${recipe.id}`}
/>
<div className="ellipsis">
<Dropdown
    variant={Dropdown_option_card_recipe[0].variant}
    value={Dropdown_option_card_recipe[0].value}
    icon={Dropdown_option_card_recipe[0].icon}
    variable={Dropdown_option_card_recipe[0].variable}
    list={Dropdown_option_card_recipe[0].list}
    fonction={option_recipe}
    search={Dropdown_option_card_recipe[0].search}
    filter={Dropdown_option_card_recipe[0].filter}
    modale={Dropdown_option_card_recipe[0].modale}
  />
 </div>
<div className="social">
<Typo
balise="span"
color="c2"
size="s3"
familly="f2"
weight="w1"
LR="right"
className={`stars`}
icon={ followRecipe ? 
  (!animHover.follow ? List_icon.all[11].icon : List_icon.all[8].icon) : 
  (animHover.follow ? List_icon.all[8].icon : List_icon.all[11].icon)}
children="ADD"
fonction={like_follow}
data_function="follower_total"
handleMouse={handleMouse}
data_mouse={"follow"}
/>
<Typo
balise="span"
color="c2"
size="s3"
familly="f2"
weight="w1"
LR="right"
className={`heart`}
icon={ likeRecipe ? 
  (!animHover.like ? List_icon.all[10].icon : List_icon.all[9].icon) : 
  (animHover.like ? List_icon.all[9].icon : List_icon.all[10].icon)}
children={`${typeof recipe.like_total === "number" ? recipe.like_total : "" }`}
fonction={like_follow}
data_function="like_total"
handleMouse={handleMouse}
data_mouse={"like"}
/>
 </div>
</div>
  </>
)
//
const contentRecipe = (<>
    <article className="recipe_box">

<Navlinks 
href={`${Route_Client[6].url_id}${recipe.user_id}`}
className="user_profil">
  <Img
  sizeBloc="s1"
  sizeImg="s1"
  radius="r5"
 src={typeof recipe.photo_profil === "string" ? recipe.photo_profil : "" } 
  />
  <Typo
  balise="figcaption"
  color="cb"
  size="s2"
  children={typeof recipe.pseudo === "string" ? recipe.pseudo : "" }
  />
</Navlinks>


<div className="calorie">
{typeof recipe.calorie === "number" ? Round(recipe.calorie) : "" } cal
</div>

<Img
classImg="img_presentation"
src={typeof recipe.img_presentation === "string" ? recipe.img_presentation : "" }  
/>

<div className="contenu">

<div className="title_contenu">
<Typo
  balise="h3"
  color="cb"
  size="s4"
  familly="f2"
  weight="w5"
  children={typeof recipe.name === "string" ? recipe.name : "" }
  />
</div>

<div className="nutri_score">
<Typo
  balise="span"
  color="cb"
  size="s4"
  transform="maj"
  familly="f3"
  weight="w5"
  children={typeof recipe.nutri_score === "string" ? recipe.nutri_score : "" }
  />
</div>

<div className="description">
<Typo
  balise="span"
  color="c3"
  size="s2"
  transform="maj"
  familly="f1"
  weight="w7"
  children="description"
  />
  <Typo
  balise="p"
  color="cb"
  size="s3"
  familly="f1"
  weight="w5"
  className="test"
  children={typeof recipe.description === "string" ? recipe.description : "" }
  />
  </div>

  <div className="time_bloc">
    <div className="time">
    <Typo
      balise="p"
      color="cb"
      size="s2"
      familly="f1"
      weight="w5"
      children={typeof recipe.duree_recette === "string" ? recipe.duree_recette : "" }
    />
    </div>
  </div>

  <Typo
  balise="span"
  color="c3"
  size="s2"
  transform="maj"
  familly="f1"
  weight="w7"
  children="répartition"
  />
<div className="macro">
<div className="bloc_mac_mic">
<Typo
  balise="span"
  color="cb"
  size="s3"
  familly="f1"
  weight="w6"
  children="Protéine"
  />
    <Typo
  balise="span"
  color="c3"
  size="s3"
  familly="f1"
  weight="w4"
  children={`${typeof recipe.proteine === "number" ? recipe.proteine : "" }g`}
  /> 
</div>
<div className="bloc_mac_mic"> 
<Typo
  balise="span"
  color="cb"
  size="s3"
  familly="f1"
  weight="w6"
  children="Glucide"
  />
    <Typo
  balise="span"
  color="c3"
  size="s3"
  familly="f1"
  weight="w4"
  children={`${typeof recipe.glucide === "number" ? recipe.glucide : "" }g`}
  /> 
</div>
<div className="bloc_mac_mic"> 
<Typo
  balise="span"
  color="cb"
  size="s3"
  familly="f1"
  weight="w6"
  children="Lipide"
  />
    <Typo
  balise="span"
  color="c3"
  size="s3"
  familly="f1"
  weight="w4"
  children={`${typeof recipe.lipide === "number" ? recipe.lipide : "" }g`}
  /> 
</div>
</div>
<div className="micro">  
<div className="bloc_mac_mic"> 
<Typo
  balise="span"
  color="cb"
  size="s3"
  familly="f1"
  weight="w6"
  children="Vitamine & Minéraux"
  />
  <Typo
  balise="span"
  color="c3"
  size="s3"
  familly="f1"
  weight="w4"
  className="micro_essential"
  children={`${typeof recipe.micro_essential === "string" ? recipe.micro_essential : ""}`}
  /> 
</div>
</div>
{token.token ? (
  <>
  {recipe_user}
  </>
):(
  <>
  {recipe_visitor}
  </>
)}
</div>
</article>
</>)
//
//
// RETURN
//
//
return contentRecipe;
}