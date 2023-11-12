import { NavLink } from "react-router-dom";
import { Typelinks } from "#data/links";
// TYPAGE
import { navlink } from "#types/typages";
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
  let urlStyles = "";
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
  const handleClick = () => {
    if (fonction) fonction();
  };
  //
  //
  return (
    <>
      {type === Typelinks.INTERN && (
        <NavLink
          to={href}
          className={({ isActive, isPending }) =>
            `${className} ${isPending ? "pending" : isActive ? active : ""}`
          }
          onClick={handleClick}
        >
          {children}
        </NavLink>
      )}

      {type === Typelinks.EXTERN && (
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
      )}
    </>
  );
}