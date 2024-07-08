//BUILDER
import Img from "#components/build/global/img";
// DATA
import { List_icon } from "#1_data/links";
// TYPAGE
import { tag } from "#0_types/typages";

export default function Tag({
    variant,
    value,
    type,
    fonction,
    quantite,
    close,
    number,
    formData,
    tagComponent,
    img,
}: tag){
//
//
// VARIABLE
//
//
const icon = List_icon.all[2].icon;
//
//
// FUNCTION
//
//
const closeTag = () => {
     if(close) close(type, value, formData, tagComponent)   
}
//
//
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(fonction) fonction(type, value, e.target.value.replace(/,/g, "."), formData)
}
//
//
// BUILDER
//
//
const tagBasic = (
    <article className={`tag_component_${variant} ${type}`}>
    <button onClick={closeTag}><icon.icon /></button>
     <span>{value}</span>
 </article>
    )
//
const tagInput = (
    <article className={`tag_component_${variant} ${type} ${value}`}>
    <button onClick={closeTag}><icon.icon /></button>
     <span className="spanNumber">{value}</span>
     <div className="tag_input">
     <span>Quantité</span>
     <input
     type="number"
     onChange={handleChange}
     value={quantite}
     />    
     </div>
 </article>
   )
//       
const tagImg = (
    <article className={`tag_component_${variant} ${type}`}>
    <button onClick={closeTag}><icon.icon /></button>
    <Img
  sizeBloc="s1"
  sizeImg="s1"
  radius="r5"
  src={`${img}`} 
  />
 </article>
    )  
//
const tagContent = (
<>
{number && tagInput}
{img && tagImg}
{!number && !img && tagBasic} 
</>
)
//
//
// RETURN
//
// 
    return(
        tagContent
    )
}