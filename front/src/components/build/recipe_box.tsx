// ACTION
import { like_follow_recipe } from "#actions/all_recipe_action";
// BUILDER
import Typo from "#components/build/global/typography";
import Img from "#components/build/global/img";
import Navlinks from "./global/navlink";
// DATA
import { List_icon } from "#data/links";
//REDUX
import { store } from '#/reducers/store'
import { useSelector } from "react-redux";
// TYPAGE
import { recipeBox, token_reducer } from "#types/typages"
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
//
//
// FUNCTION
//
//
const like_follow = (data: string) =>{
  const formData = {[data]: recipe.id as number}
  store.dispatch(like_follow_recipe(formData))
}
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
href={`recipe/${recipe.id}`}
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
href={`recipe/${recipe.id}`}
/>
<Typo
balise="span"
color="c2"
className="ellipsis"
icon={List_icon.all[6].icon}
/>
 
<div className="social">
<Typo
balise="span"
color="c2"
size="s3"
familly="f2"
weight="w1"
LR="right"
className="stars"
icon={List_icon.all[8].icon}
children="ADD"
fonction={like_follow}
data_function="follower_total"
/>
<Typo
balise="span"
color="c2"
size="s3"
familly="f2"
weight="w1"
LR="right"
className="heart"
icon={List_icon.all[9].icon}
children={`${typeof recipe.like_total === "number" ? recipe.like_total : "" }`}
fonction={like_follow}
data_function="like_total"
/>
 </div>
</div>
  </>
)
//
const contentRecipe = (<>
    <article className="recipe_box">

<Navlinks 
href={`profile/${recipe.user_id}`}
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
{typeof recipe.calorie === "number" ? recipe.calorie : "" } cal
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
      className="test"
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
  children="C - B9 - K"
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
return(
    <>
    {contentRecipe}
    </>
)
}