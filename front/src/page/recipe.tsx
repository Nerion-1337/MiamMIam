// ACTION
import { like_follow_recipe } from "#5_actions/6_all_recipe_action";
import { get_all_recipe } from "#5_actions/6_all_recipe_action";
import { cooking_process_recipe } from "#5_actions/10_user_cooking_process";
import { get_verify_l_f } from '#5_actions/7_like_follow_action'
import { post_consumption } from '#5_actions/9_consumption_action'
import { getMy } from '#5_actions/5_user_action';
import { get_comment_recipe, send_comment } from '#5_actions/11_comment_action';
import { get_verify_l_comment } from '#5_actions/7_like_follow_action'
// BUILDER
import Typo from "#components/build/global/typography";
import Input from "#components/build/global/input";
import Dropdown from "#components/build/global/dropdown";
import Img from "#components/build/global/img";
import Button from "#components/build/global/button";
import Calorie_list from "#components/build/calorie_list";
import Card_menu from "#components/build/card_menu";
import Comment from "#components/build/comment";
//COMPONENTS
import { validCommentAdd} from "#components/valid_input";
import { handleChange } from "#components/formData";
import Button_active from "#components/active_redux/button_active";
import Carousel from "#components/build/carousel";
import { Round_2 } from "#components/round";
import { Sort_crescent } from "#components/sort";
// DATA
import { Input_range_recipe, List_icon, Dropdown_option_card_recipe, List_macro_objectif, Dropdown_option_recipe, Input_recipe_add_comment, Links_Server } from "#1_data/links";
// REACT
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import React from "react";
//REDUX
import { store } from '#4_reducers/0_store'
import { useSelector } from "react-redux";
// TYPAGE
import { api_all_recipe, api, like_follow_reducer, cooking_process_reducer, payload_api, token_reducer, api_number, comment_recipe_reducer } from "#0_types/typages";
//
//
//
//
//
export default function Recipe(){
//
//
// VARIABLE
//
//
const { id } = useParams();
const token = useSelector((state: token_reducer) => state.tokenReducer);  
//
const all_recipe = useSelector((state: {allRecipeReducer: api_all_recipe[]} ) => state.allRecipeReducer);
const follow_like = useSelector((state:  like_follow_reducer) => state.LikeFollowReducer);
const cooking_process = useSelector((state:  cooking_process_reducer) => state.cookingProcessReducer);
const comment_recipe = useSelector((state: comment_recipe_reducer) => state.commentReducer);
const user = useSelector((state: payload_api) => state.userReducer);   
//
const [formDataArray, setFormDataArray] = useState<{ [key: string]: api[] }>({recipe:[{"name": `${id}`}]});
const limitOffset = {"quantite_max": "30", "quantite_min": "0"};
//
const [formData, setFormData] = useState<{ [key: string]: string }>({});    
//
const [recipe, setRecipe] = useState<api_all_recipe>({});
const [followRecipe, setFollowRecipe] = useState<boolean>();
const [likeRecipe, setLikeRecipe] = useState<boolean>();
const [animHover, setAnimHover] = useState<{ [key: string]: boolean }>({}); 
//
const [besoins_calorie_user, setBesoins_calorie_user] = useState<number>();
const [besoinsCalorie, setBesoinsCalorie] = useState<{ [key: string]: number }>({});
const [newObjectif, setNewObjectif] = useState<string>();
const [CalculeObjectif, setCalculeObjectif] = useState<number>();
const [tempoObjectif, setTempoObjectif] = useState<number>(1);
//
const [recipeQuantite, setRecipeQuantite] = useState<number>();
const [recipeOptionCal, setRecipeOptionCal] = useState<string>("total recette");
const [recipeCalorie, setRecipeCalorie] = useState<{ [key: string]: number }>({});
//
const [dataIngredient, setDataIngredient] = useState<api[]>([]);
const [dataUstensil, setDataUstensil] = useState<api[]>([]);
const [dataMicro, setDataMicro] = useState<api_number[]>([]);
//
const [portionComsuption, setPortionComsuption] = useState<string>("100");
//
const [ShowEntries, setShowEntries] = useState(5);
const [page, setPage] = useState(`1`);
let numberOfElements = comment_recipe.length;
let numberPaginate = Math.ceil(numberOfElements / ShowEntries);
const ShowEntriesMIN =  Math.ceil((parseInt(page) - 1) * ShowEntries);
const ShowEntriesMAX =  Math.ceil(parseInt(page) * ShowEntries);
//
//
// REQUETTE
//
//
useEffect(() => {
    if(id){
        if(all_recipe.length < 1){
    store.dispatch(get_all_recipe(16, formDataArray, limitOffset))
        };
    store.dispatch(cooking_process_recipe(id));
    store.dispatch(get_comment_recipe(id));
    }  
  }, [id]);
//
useEffect(() => {
    if(token.token){
        if(!user.objectif){
            store.dispatch(getMy());
            store.dispatch(get_verify_l_f());
            store.dispatch(get_verify_l_comment()); 
           }
    }  
  }, [token]);
//
useEffect(() => {
    if( follow_like.recipe && recipe.id){
        const follow = follow_like.recipe.some((item) => item.follow === recipe.id);
        const like = follow_like.recipe.some((item) => item.likes === recipe.id);
      setFollowRecipe(follow)
      setLikeRecipe(like)
      setAnimHover({"like":like, "follow":follow})
 
      }
  }, [follow_like, recipe]); 
//
//
// FUNCTION
//
//
useEffect(() => {
    if(all_recipe){
        for (const item of all_recipe) {
            if (`${item.id}` === id) {
                setRecipe(item)
            }
        }  
    }  
  }, [all_recipe]);
//
// CALCULE LE POIDS TOTAL DE LA RECETTE + ALL MICRO / INGREDIENT / USTENSIL
useEffect(() => {
    if(recipe.ingredient){
//     
    const data = recipe.ingredient as api[];
//
//
        setDataIngredient(Sort_crescent(data))
        setDataUstensil(Sort_crescent(recipe.ustensil as api[]))
//
//        
        let totalQuantite = 0;
        let totalMicro: api_number[] = []
//        
        data.map((item)=>{
//     
       totalQuantite += Number(item.quantite);
//
        Object.entries(item).forEach(([key, value]) => {
            if ( key != "name" && key != "quantite" && key != "calorie" && key != "proteine" && key != "glucide" && key != "lipide" && key != "type") {
                const existingIndex = totalMicro.findIndex(microItem => microItem[key] !== undefined);
                if (existingIndex !== -1) {
                    totalMicro[existingIndex][key] += parseFloat(value) * parseFloat(item.quantite) / 100;
                } else {
                    const newItem = { [key]: parseFloat(value) * parseFloat(item.quantite) / 100 };
                    totalMicro.push(newItem);
                }
            }
        });

        })

        setRecipeQuantite(totalQuantite);
        setDataMicro(Sort_crescent(totalMicro))
    }  
  }, [recipe]); 
//
// DEFINI CALORIE 100G RECIPE
useEffect(() => {
    if(recipe.calorie && recipeQuantite && recipeOptionCal === "pour 100g"){
        setRecipeCalorie({
            "calorie": typeof recipe.calorie === "number" ? Round_2(recipe.calorie / recipeQuantite * 100) : 0,
            "proteine": typeof recipe.proteine === "number" ? Round_2(recipe.proteine / recipeQuantite * 100) : 0,
            "glucide": typeof recipe.glucide === "number" ? Round_2(recipe.glucide / recipeQuantite * 100) : 0,
            "lipide": typeof recipe.lipide === "number" ? Round_2(recipe.lipide / recipeQuantite * 100) : 0,
          })
    } else if(recipe.calorie){
        setRecipeCalorie({
            "calorie": typeof recipe.calorie === "number" ? Round_2(recipe.calorie * parseInt(portionComsuption) / 100) : 0,
            "proteine": typeof recipe.proteine === "number" ? Round_2(recipe.proteine * parseInt(portionComsuption) / 100) : 0,
            "glucide": typeof recipe.glucide === "number" ? Round_2(recipe.glucide * parseInt(portionComsuption) / 100) : 0,
            "lipide": typeof recipe.lipide === "number" ? Round_2(recipe.lipide * parseInt(portionComsuption) / 100) : 0,
          })
    }  
  }, [recipe, recipeQuantite, recipeOptionCal, portionComsuption]);
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
// REFRESH PAGE COMMENT
useEffect(()=>{
    numberOfElements = comment_recipe.length
    numberPaginate = Math.ceil(numberOfElements / ShowEntries)
    setPage(`${numberPaginate}`)
    }, [comment_recipe]);  
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
// ACTION DELENCHE DANS SELON OPTION ELLIPSIS
const option_recipe = (fieldName: string, newValue: string) =>{
    //
    const condition = Dropdown_option_card_recipe[0].list ? Dropdown_option_card_recipe[0].list : ""
    //
    if (Array.isArray(condition) && condition.length > 0 && typeof condition[0] === 'object' && 'name' in condition[0]) {
    //
    if(newValue === condition[0].name){
        Button_active({data: newValue, value: true, number: parseFloat(id ? id : "0"), section: "recipe"})
    
    } else if (newValue === condition[1].name){
    store.dispatch(post_consumption(typeof recipe.id === "number" ? recipe.id : 0 , 100))
    }
    //
    }
    //
    }
//
// MODIFIE RETOUR MACRO RECIPE
const option_calorie = (fieldName: string, newValue: string)=>{
    setRecipeOptionCal(newValue)
}
//
// MODIFIE TIME DE L'OBJECTIF
const optionObjectif = (fieldName: string, newValue: string) => {
    setTempoObjectif(newValue === "day" ? 1 : newValue === "week" ? 7 : newValue === "month" ? 30 : 1)
  }      
//
// AJOUTER LA RECETTE A CONSOMMER
const comsuption  = () => {
 store.dispatch(post_consumption(typeof recipe.id === "number" ? recipe.id : 0 , parseInt(portionComsuption)))
}
//
// ANIMATION HOVER SUR ICON
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
// AJOUTER DATA SIMPLE
const addDataSimply = (fieldName: string, newValue: string) => {
    handleChange(fieldName, newValue, setFormData)
//    
if(!formData[Links_Server[10].element_id_table] && !formData[Links_Server[10].element_type_table]){
    handleChange(Links_Server[10].element_id_table, `${id}`, setFormData)
    handleChange(Links_Server[10].element_type_table, `recipe`, setFormData)
    }  
  }  
//
// POST LE COMMENTAIRE
const handleSubmit = () =>{
//
const isValideComment = validCommentAdd(`add_comment`)
//
if(isValideComment){
    store.dispatch(send_comment(formData))
}  
  }   
//
// CHANGE PAGE
const nextPage = () =>{
    if(parseInt(page) < numberPaginate){
      setPage(`${parseInt(page) + 1}`)
    }
    }
//
const previousPage = () =>{
      if(parseInt(page) > 1){
        setPage(`${parseInt(page) - 1}`)
      }
    }   
//
//
// BUILDER
//
//
//
// BOUCLE POUR GENERER ETAPE RECETTE
const cooking_process_content = cooking_process.map((item, index) => (
    <React.Fragment key={index}>
    <Typo
    balise="li"
    color="c2"
    size="s6"
    familly="f1"
    weight="w7"
    transform="maj"
    className="cooking"
    children={`étape ${item.num_etape}`}
    />
    <Typo
    balise="p"
    color="cb"
    size="s6"
    familly="f1"
    weight="w6"
    children={item.contenu}
    />
    </React.Fragment>
))
//
// BOUCLE AFFICHER COMMENTAIRE
const content_all_comment = comment_recipe.slice(ShowEntriesMIN, ShowEntriesMAX).map((item, index) => (
    <React.Fragment key={index}>
        <Comment comment={item} page={page}/>
      </React.Fragment>
  ))
//
// BOUCLE POUR RECUPERE ALL INGREDIENT DE LA RECETTE
const all_ingredients = dataIngredient.map((item, index) =>(
<React.Fragment key={index}>
<div className="line_data">
<Typo
    balise="span"
    size="s5"
    familly="f1"
    weight="w4"
    transform="cap"
    color="c3"
    children={`${item.name}:`}
    className="title_list"
    />
        <Typo
    balise= "span"
    size= "s5"
    familly= "f1"
    weight= "w6"
    color= "cb"
    children={`${Round_2(parseFloat(item.quantite) * parseFloat(portionComsuption) / 100)}g`}
    className="value_list"
    />
</div>
</React.Fragment>
))
// BOUCLE POUR RECUPERE ALL USTENSIL DE LA RECETTE
const all_ulstensils = dataUstensil.map((item, index) =>(
    <React.Fragment key={index}>
    <div className="line_data">
    <Typo
        balise="span"
        size="s5"
        familly="f1"
        weight="w4"
        transform="cap"
        color="c3"
        children={`${item.name}:`}
        className="title_list"
        />
            <Typo
        balise= "span"
        size= "s5"
        familly= "f1"
        weight= "w6"
        color= "cb"
        children={`${item.quantite}u`}
        className="value_list"
        />
    </div>
    </React.Fragment>
    ))
// BOUCLE POUR RECUPERE ALL MICRONUTRIMENT DE LA RECETTE
const all_micros = dataMicro.map((item, index) =>(
    <React.Fragment key={index}>
        {Object.keys(item)[0] === "sucre_rapide" || 
        Object.keys(item)[0] === "eau" || 
        Object.keys(item)[0] === "acides_gras_satures"||
        Object.keys(item)[0] === "acides_gras_monosatures" ||
        Object.keys(item)[0] === "acides_gras_polyinsatures" ? 
        (
            <div className="line_data">
            <Typo
                balise="span"
                size="s5"
                familly="f1"
                weight="w4"
                transform="cap"
                color="c3"
                children={`${Object.keys(item)[0].replace(/_/g, ' ')}:`}
                className="title_list"
                />
                    <Typo
                balise= "span"
                size= "s5"
                familly= "f1"
                weight= "w6"
                color= "cb"
                children={`${Round_2(Object.values(item)[0] * parseInt(portionComsuption) / 100 )}g`}
                className="value_list"
                />
            </div>

        ): (
            <div className="line_data">
            <Typo
                balise="span"
                size="s5"
                familly="f1"
                weight="w4"
                transform="cap"
                color="c3"
                children={`${Object.keys(item)[0].replace(/_/g, ' ')}:`}
                className="title_list"
                />
                    <Typo
                balise= "span"
                size= "s5"
                familly= "f1"
                weight= "w6"
                color= "cb"
                children={`${Round_2(Object.values(item)[0]  * parseInt(portionComsuption) / 100)}mg`}
                className="value_list"
                />
            </div>
        )
        }
    </React.Fragment>
    ))    
//
//
const card_menu_user = (
    <>
    {user.besoins_calorie ? (
<Card_menu 
    variant="t2" 
    button="repartition"    
    >
     <div className="bloc_repartition">
  <Dropdown
    variant={Dropdown_option_recipe[0].variant}
    value={Dropdown_option_recipe[0].value}
    icon={Dropdown_option_recipe[0].icon}
    variable={Dropdown_option_recipe[0].variable}
    list={Dropdown_option_recipe[0].list}
    fonction={option_calorie}
    search={Dropdown_option_recipe[0].search}
    filter={Dropdown_option_recipe[0].filter}
    modale={Dropdown_option_recipe[0].modale}
  />

     <Calorie_list 
      data={recipeCalorie}
      />
</div>
      
<div className="bloc_repartition">
  <Dropdown
    variant={Dropdown_option_recipe[1].variant}
    value={Dropdown_option_recipe[1].value}
    icon={Dropdown_option_recipe[1].icon}
    variable={Dropdown_option_recipe[1].variable}
    list={Dropdown_option_recipe[1].list}
    fonction={optionObjectif}
    search={Dropdown_option_recipe[1].search}
    filter={Dropdown_option_recipe[1].filter}
    modale={Dropdown_option_recipe[1].modale}
  />
  
     <Calorie_list 
      data={besoinsCalorie}
      />
</div>
</Card_menu>
    ):(
<Card_menu 
variant="t1" 
button="repartition"  
>
     <div className="bloc_repartition">
  <Dropdown
    variant={Dropdown_option_recipe[0].variant}
    value={Dropdown_option_recipe[0].value}
    icon={Dropdown_option_recipe[0].icon}
    variable={Dropdown_option_recipe[0].variable}
    list={Dropdown_option_recipe[0].list}
    fonction={option_calorie}
    search={Dropdown_option_recipe[0].search}
    filter={Dropdown_option_recipe[0].filter}
    modale={Dropdown_option_recipe[0].modale}
  />

     <Calorie_list 
      data={recipeCalorie}
      />
</div>
</Card_menu>
    )}
    </>
)
//
const card_menu_ingredient = (
    <>
        {dataIngredient.length > 10 ? (     
       <Card_menu 
    variant="t2" 
    button="ingrédients"    
    >
        <div className="bloc_data">
{all_ingredients}
</div>
    </Card_menu>
    ):(
        <Card_menu 
        variant="t1" 
        button="ingrédients"    
        >
            <div className="bloc_data">
    {all_ingredients}
    </div>
        </Card_menu>

    )}
    </>
)
//
const card_menu_ustensil = (
    <>
    {dataUstensil.length > 10 ? (     
       <Card_menu 
    variant="t2" 
    button="ustensils"    
    >
        <div className="bloc_data">
{all_ulstensils}
</div>
    </Card_menu>
    ):(
        <Card_menu 
        variant="t1" 
        button="ustensils"    
        >
            <div className="bloc_data">
    {all_ulstensils}
    </div>
        </Card_menu>

    )}   
    </>
)
//
const card_menu_micro = (
    <>
    {dataMicro.length > 10 ? (     
       <Card_menu 
    variant="t2" 
    button="micro-nutriment"    
    >
        <div className="bloc_data">
{all_micros}
</div>
    </Card_menu>
    ):(
        <Card_menu 
        variant="t1" 
        button="micro-nutriment"    
        >
            <div className="bloc_data">
    {all_micros}
    </div>
        </Card_menu>

    )}   
    </>
)
//
const box_carousel = (
    <>
    {recipe.img_media && (recipe.img_media as string[]).length > 0 && (
        <>
            <div className="box_carousel">
    <div className="split_recipe">
    <div className="slide"/> 
    <Typo
    balise="span"
    size="s7"
    familly="f2"
    weight="w4"
    color="cb"
    transform="maj"
    children="media" 
    />
    <div className="slide"/>
    </div> 
<Carousel
  img={recipe.img_media as string[]}
/>
    </div>
        </>
    )}
    </>
)
//
// ALL PAGE
const Paginate = [];
for (let i = 1; i <= numberPaginate; i++) {
  Paginate.push({ name: `${i}`});
}
//
// ELEMENT NAVIGATION DE COMMENTAIRE
const navigation_comment = (
    <>
    {numberPaginate > 1 && (
        <div className="navigation_pagination">
    <Button
    variant="t2"
    fontSize="s2"
    item_i={true}
    children="retour"
    fonction={previousPage}
    />
    <div>
<Dropdown
    variant="t12"
    placeholder="Rechercher"
    value={`${page}/${numberPaginate}`}
    text={`${page}/${numberPaginate}`}
    icon={Dropdown_option_recipe[0].icon}
    variable={Dropdown_option_recipe[0].variable}
    list={Paginate}
    fonction={setPage}
    search={true}
    filter={Dropdown_option_recipe[0].filter}
    modale={Dropdown_option_recipe[0].modale}
    show={true}
  />
  </div>
    <Button
    variant="t2"
    fontSize="s2"
    item_i={true}
    children="suivant"
    fonction={nextPage}
    />    
        </div>
    )}
    </>
) 
//
// PERMET DE POSTULER DES COMMENTAIRES
const post_comment = (
    <>
    <form onSubmit={handleSubmit}>
<Button
variant="icon"
fontSize="s6"
icon={List_icon.all[13].icon}

/>
<Button
variant="icon"
fontSize="s6"
icon={List_icon.all[14].icon}

/>
<Input
  variant={Input_recipe_add_comment[0].variant}
  element={Input_recipe_add_comment[0].element}
  type={Input_recipe_add_comment[0].type}
  text={Input_recipe_add_comment[0].text}
  unitee={Input_recipe_add_comment[0].unitee}
  variable={Input_recipe_add_comment[0].variable}
  special={Input_recipe_add_comment[0].special}
  fonction={addDataSimply}
  identifiant="add_comment"
      />
      <Button
variant="t1"
size="s3"
fontSize="s4"
icon={List_icon.all[12].icon}
fonction={handleSubmit}
/>
</form>
    </>
)  
//
//
const header_recipe_visitor = (
    <>
    {recipe && (
        <>
        <div className="baniere_recipe" style={{backgroundImage: `url(${recipe.img_presentation})`}} />

<div className="title_header_recipe">
<Typo 
          balise="h2"
          size="s10"
          transform="maj"
          className="logo"
          children={`${typeof recipe.name === "string" ? recipe.name : "" }`}
          weight="w1"
          familly="f2"
          color="c2"
        />
</div>

 <div className="button">      
    <div className="social">
<Typo
balise="span"
color="c2"
size="s8"
familly="f2"
weight="w1"
LR="right"
className={`heart`}
icon={ List_icon.all[9].icon }
children={`${typeof recipe.like_total === "number" ? recipe.like_total : "" }`}
fonction={like_follow}
data_function="like_total"
handleMouse={handleMouse}
data_mouse={"like"}
/>
    </div>

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

  <div className="nutri_score">
<Typo
  balise="span"
  color="cb"
  size="s8"
  transform="maj"
  familly="f3"
  weight="w5"
  children={typeof recipe.nutri_score === "string" ? recipe.nutri_score : "" }
  />
</div>
 </div>
 </>
    )}
    
    </>
)
//
const header_recipe_user = (
    <>
    {recipe && (
        <>
        <div className="baniere_recipe" style={{backgroundImage: `url(${recipe.img_presentation})`}} />

<div className="title_header_recipe">
<Typo 
          balise="h2"
          size="s10"
          transform="maj"
          className="logo"
          children={`${typeof recipe.name === "string" ? recipe.name : "" }`}
          weight="w1"
          familly="f2"
          color="c2"
        />
</div>

 <div className="button">      
    <div className="social">
<Typo
balise="span"
color="c2"
size="s9"
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
size="s8"
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

  <div className="nutri_score">
<Typo
  balise="span"
  color="cb"
  size="s8"
  transform="maj"
  familly="f3"
  weight="w5"
  children={typeof recipe.nutri_score === "string" ? recipe.nutri_score : "" }
  />
</div>
 </div>
 </>
    )}
    
    </>
)
//
//
const body_recipe_top =(
    <>
    {recipe && (
        <>
        <section className="top_body_recipe">

        <div className="top_cooking_process">
            <div className="title_time">
                <Typo
                className="span"
                color="cb"
                size="s7"
                familly="f2"
                weight="w5"
                transform="cap"
                children="préparation"
                />
            <div className="time">
                <Typo
                balise="p"
                color="cb"
                size="s5"
                familly="f1"
                weight="w5"
                children={typeof recipe.duree_recette === "string" ? recipe.duree_recette : "" }
                />
            </div>
            </div>

            <div className="creator">
             <Typo
                className="span"
                color="cb"
                size="s6"
                familly="f1"
                weight="w7"
                transform="cap"
                children={typeof recipe.pseudo === "string" ? recipe.pseudo : "" }
                />
                <Img
                sizeBloc="s6"
                sizeImg="s6"
                radius="r5"
                src={typeof recipe.photo_profil === "string" ? recipe.photo_profil : "" } 
                />
             </div>
        </div>

            <div className="consumption">

            <Input
        variant={Input_range_recipe[0].variant}
        variable={Input_range_recipe[0].variable}
        value={Input_range_recipe[0].value}
        icon={Input_range_recipe[0].icon}
        text={Input_range_recipe[0].text}
        special={Input_range_recipe[0].special}
        element={Input_range_recipe[0].element}
        fonction={setPortionComsuption}
        />

<Button
variant="t2"
fontSize="s2"
children="consommer"
fonction={comsuption}
/>

            </div>

        </section>
    </>
    )}
    </>
)
//
//
const body_recipe_left =(
    <>
    {recipe && (
        <>
    <section className="left_body_recipe">

        <ul className="body_cooking_process">
            {cooking_process_content}

        </ul>

        {box_carousel}

    <div className="box_comment">
    <div className="split_recipe">
    <div className="slide"/> 
    <Typo
    balise="span"
    size="s7"
    familly="f2"
    weight="w4"
    color="cb"
    transform="maj"
    children="commentaire" 
    />
    <div className="slide"/>
    </div>

    <div className="list_comment">
    {navigation_comment}
    
{content_all_comment}

{navigation_comment}
    </div>

{token.token && post_comment}
    </div>

    </section>


    </>
    )}
    </>
)
//
//
const body_recipe_right =(
    <>
    {recipe && (
        <>
    <section className="right_body_recipe">
       {card_menu_user}

       {card_menu_ingredient}

       {card_menu_ustensil}

       {card_menu_micro}
     
    </section>
    </>
    )}
    </>
)
//
//    
const content = (
<main className="main_recipe">
{token.token ? (
  <>
  {header_recipe_user}
  </>
):(
  <>
  {header_recipe_visitor}
  </>
)}
{body_recipe_top}
<div className="body_recipe">
{body_recipe_left}
{body_recipe_right}
</div>
</main>
)
//
//
// RETURN
//
//
return content
}