// DATA
import { Typelinks } from "#1_data/links";
// REACT
import { NavLink } from "react-router-dom";
// TYPAGE
import { navlink } from "#0_types/typages";
//
//
//
//
//
export default function Navlinks({
  href,
  children,
  active,
  type = "intern",
  special,
  className,
  useRef,
  datatext,
  fonction = () => {
    console.log();
  },
}: navlink) {
//
//
// VARIABLE
//
//
  let urlStyles = "";
//
//
// SWITCH
//
//
  switch (special) {
    case "tel":
      urlStyles = "tel:+33" + href?.slice(-9);
      break;
    case "mail":
      urlStyles = `mailto:${href}`;
      break;
  }
//
//
// FONCTION
//
//
  const handleClick = () => {
    if (fonction) fonction();
  };
//
//
// BUILDER
//
//
const link_interne = (
  <NavLink
  to={href}
  className={({ isActive, isPending }) =>
    `${className ? className : ""} ${isPending ? "pending" : isActive ? active : ""}`
  }
  onClick={handleClick}
>
  {children}
</NavLink>
)
//
const link_externe = (
  <>
{ special ? ( 
          <a href={urlStyles} className={className} target="_blank" onClick={handleClick}>
        {children}
      </a>
      ) : (  
        <a href={href} className={className} target="_blank" onClick={handleClick}>
          {children}
        </a> 
        )}
  </>
)
//
const content_link = (
  <>
  {type === Typelinks.INTERN && link_interne}
  {type === Typelinks.EXTERN && link_externe}
  </>
)
//
//
// RETURN
//
//
  return content_link;
}