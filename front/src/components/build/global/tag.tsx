// DATA
import { List_icon } from "#data/links";
// TYPAGE
import { tag } from "#types/typages";

export default function Tag({
    value,
    type,
    fonction,
    close,
    number,
    formData,
    tagComponent,
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
    <article className={`tag_component ${type}`}>
    <button onClick={closeTag}><icon.icon /></button>
     <span>{value}</span>
 </article>
    )
//
const tagInput = (
    <article className={`tag_component ${type}`}>
    <button onClick={closeTag}><icon.icon /></button>
     <span className="spanNumber">{value}</span>
     <div className="tag_input">
     <span>Quantité</span>
     <input
     type="number"
     onChange={handleChange}
     />    
     </div>
 </article>
   )    
//
const tagContent = (
<>
{number ? (
   tagInput
):(
   tagBasic
)}
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