// ACTION
import { like_comment } from "#5_actions/11_comment_action";
import { get_verify_l_comment } from '#5_actions/7_like_follow_action'
import { post_consumption } from '#5_actions/9_consumption_action'
// BUILDER
import Typo from "#components/build/global/typography";
import Img from "#components/build/global/img";
import Dropdown from "#components/build/global/dropdown";
// COMPONENTS
import Button_active from "#components/active_redux/button_active";
// DATA
import { List_icon, Route_Client, Dropdown_option_comment } from "#1_data/links";
// REACT
import { useState, useEffect } from "react";
//REDUX
import { store } from '#4_reducers/0_store'
import { useSelector } from "react-redux";
// TYPAGE
import { comment, token_reducer, like_follow_reducer } from "#0_types/typages"
//
//
//
//
//
export default function Comment({ 
    comment,
    page 
}: comment){
//
//
// VARIABLE
//
//
const token = useSelector((state:  token_reducer) => state.tokenReducer);
const follow_like = useSelector((state:  like_follow_reducer) => state.LikeFollowReducer);
const [likeRecipe, setLikeRecipe] = useState<boolean>();
const [animHover, setAnimHover] = useState<{ [key: string]: boolean }>({});      
//
//
// REQUETE
//
//
useEffect(() => {
    if( follow_like.comment && comment){
      const like = follow_like.comment.some((item) => item.likes === comment.id)
      setLikeRecipe(like)
      setAnimHover({"like":like})
      }
  }, [follow_like, page]);  
//
//
// FUNCTION
//
//
const like_follow = (data: string) =>{
  
    const formData = {[data]: comment.id.toString()}
    store.dispatch(like_comment(formData))
    setTimeout(()=>{
      store.dispatch(get_verify_l_comment())
      }, 100)
  
  }
//
//
const option_recipe = (fieldName: string, newValue: string) =>{
    //
    const condition = Dropdown_option_comment[0].list ? Dropdown_option_comment[0].list : ""
    //
    if (Array.isArray(condition) && condition.length > 0 && typeof condition[0] === 'object' && 'name' in condition[0]) {
    //
    if(newValue === condition[0].name){
      Button_active({data: newValue, value: true, number: typeof comment.id === "number" ? comment.id : 0, section: "comment"})
    
    } else if (newValue === condition[1].name){
    store.dispatch(post_consumption(typeof comment.id === "number" ? comment.id : 0 , 100))
    
    }
    //
    }
    //
    }
//
// MODIFIE LE HOVER ICON
const handleMouse = (data_mouse: string, mouse_type: string): void => {
    setAnimHover(prevState => {
      if(data_mouse === "date"){
        return { ...prevState, [data_mouse]: mouse_type === "enter" ? true : false };
      } else if ((likeRecipe && data_mouse === "like")) {
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
const comment_visitor = (
    <div className="back_comment">
<Typo
balise="span"
color="c2"
size="s5"
familly="f2"
weight="w1"
LR="right"
className={`${likeRecipe && "active"} heart`}
icon={ List_icon.all[9].icon }
children={`${typeof comment.like_total === "number" ? comment.like_total : "" }`}
/>  
</div> 
)
//
const comment_user = (
    <div className="back_comment">
    <div className="ellipsis"></div>
<Dropdown
variant={Dropdown_option_comment[0].variant}
value={Dropdown_option_comment[0].value}
icon={Dropdown_option_comment[0].icon}
variable={Dropdown_option_comment[0].variable}
list={Dropdown_option_comment[0].list}
fonction={option_recipe}
search={Dropdown_option_comment[0].search}
filter={Dropdown_option_comment[0].filter}
modale={Dropdown_option_comment[0].modale}
/>
<Typo
balise="span"
color="c2"
size="s5"
familly="f2"
weight="w1"
LR="right"
className={`heart`}
icon={ likeRecipe ? 
  (!animHover.like ? List_icon.all[10].icon : List_icon.all[9].icon) : 
  (animHover.like ? List_icon.all[9].icon : List_icon.all[10].icon)}
children={`${typeof comment.like_total === "number" ? comment.like_total : "" }`}
fonction={like_follow}
data_function="like_total"
handleMouse={handleMouse}
data_mouse={"like"}
/>
</div>
)
//
const content_comment = (
    <article className="comment">                
    <div className="profil_img_comment">
    <Img
            sizeBloc="s6"
            sizeImg="s6"
            radius="r5"
            src={typeof comment.photo_profil === "string" ? comment.photo_profil : "" }
            href={`${Route_Client[6].url_id}${comment.user_id}`}
            />
    </div>
    <div className="header_comment">
        <div className="name_creator_comment"> 
         <Typo
            className="span"
            color="cb"
            size="s5"
            familly="f1"
            weight="w7"
            transform="cap"
            children={typeof comment.pseudo === "string" ? comment.pseudo : "" }
            href={`${Route_Client[6].url_id}${comment.user_id}`}
            />
            </div>
         <Typo
            balise="span"
            color="cb"
            size="s5"
            familly="f1"
            weight="w5"
            children={typeof comment.date_ajout === "string" && typeof comment.full_date === "string"  ? 
            (!animHover.date ? comment.date_ajout : comment.full_date) : "" }
            handleMouse={handleMouse}
            data_mouse={"date"}
            className="date_ajout_comment"
            />
         </div>

            <div className="body_comment">
            <Typo
balise="p"
color="cb"
size="s6"
familly="f1"
weight="w6"
children={typeof comment.contenu === "string" ? comment.contenu : "" }
/>
            </div>

            {token.token && comment_user}
            {!token.token && comment_visitor}

    </article>
)
//
//
// RETURN
//
//
return content_comment;
}