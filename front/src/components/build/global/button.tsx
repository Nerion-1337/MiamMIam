import clsx from "clsx";
// BUILDER
import Spinner from "#components/build/global/spinner";
import Navlinks from "#components/build/global/navlink";
// SPINNER
import { ImSpinner9 } from "react-icons/im";
// TYPAGE
import { button } from "#0_types/typages";
//
//
//
//
//
export default function Button({  
  variant,
  size,
  fontSize,
  icon,
  disabled,
  loading,
  item_i,
  className,
  children,
  children_actif,
  active_child,
  fonction = () => {
    console.log();
  },
  data_function,
  href,
  active_href,
  type,
  special,
  useRef,
  input,
  value_input,
}: button) {
//
//
// VARIABLE
//
//
  let variantStyles = "";
  let sizeStyles = "";
  let fontSizeStyles = "";
//
//
// SWITCH
//
//
  switch (variant) {
    case "icon":
      variantStyles = "type-btn-icon";
      break; 
    case "t1":
      variantStyles = "type-btn1";
      break;
    case "t2":
      variantStyles = "type-btn2";
      break;
    case "t3":
      variantStyles = "type-btn3";
      break;
    case "t4":
      variantStyles = "type-btn4";
      break;
      case "t5":
        variantStyles = "type-btn5";
        break;
      case "t6":
        variantStyles = "type-btn6";
        break;
      case "t7":
        variantStyles = "type-btn7";
        break;
      case "t8":
        variantStyles = "type-btn8";
        break;
      case "t9":
        variantStyles = "type-btn9";
        break;
      case "t10":
        variantStyles = "type-btn10";
        break;        
  }
  //
  switch (size) {
    case "s0":
      sizeStyles = "size-btn1";
      break;
    case "s1":
      sizeStyles = "size-btn1";
      break;
    case "s2":
      sizeStyles = "size-btn2";
      break;
    case "s3":
      sizeStyles = "size-btn3";
      break;
    case "s4":
      sizeStyles = "size-btn4";
      break;
    case "s5":
      sizeStyles = "size-btn5";
      break;
  }
  //
  switch (fontSize) {
    case "s0":
      fontSizeStyles = "size-t1";
      break;
    case "s1":
      fontSizeStyles = "size-t1";
      break;
    case "s2":
      fontSizeStyles = "size-t2";
      break;
    case "s3":
      fontSizeStyles = "size-t3";
      break;
    case "s4":
      fontSizeStyles = "size-t4";
      break;
    case "s5":
      fontSizeStyles = "size-t5";
      break;
    case "s6":
      fontSizeStyles = "size-t6";
      break;
    case "s7":
      fontSizeStyles = "size-t7";
      break;
    case "s8":
      fontSizeStyles = "size-t8";
      break;
  }
//
//
// FUNCTION
//
//
  const handleClick = () => {
    if (fonction) fonction(data_function);
  };
//
//
// BUILDER
//
//
  const content_children = (<>{active_child ? children_actif : children}</>)
  //
  const buttonContent = (
    <>
    {loading && <Spinner variant="t1" size="s1" icon={{ icon: ImSpinner9 }} />}

    {icon && !children && <icon.icon />}

    {icon && children &&  <><icon.icon className="icon_left"/> {
                            content_children} 
                            <icon.icon className="icon_right"/></>
    }

    {item_i && children  && <><i className="i_left"/> 
                              <span>{content_children}</span>
                              <i className="i_right"/></>
    }

    {!loading && !icon && !item_i && children && content_children}
    </>
  );
  //
  const buttonElement = (
    <>
    {input ? (
      <div
      className={clsx(variantStyles, sizeStyles, fontSizeStyles, className)}
      >
      <input
      type="submit"
      value={value_input}
      className={fontSizeStyles}
      onClick={handleClick}
      disabled={disabled}
      ref={useRef}
    /> 
    </div>
    ):(
      <button
      type="button"
      className={clsx(variantStyles, sizeStyles, fontSizeStyles, className,`${active_child ? "active" : ""}`)}
      onClick={handleClick}
      disabled={disabled}
      ref={useRef}
    >
      {buttonContent}
    </button>   
    )}

    </>
  );
  //
  //
  if (href) {
    return (
      <Navlinks href={href} type={type} active={active_href} special={special}>
        {buttonElement}
      </Navlinks>
    );
  } 
//
//
// RETURN
//
//
  return buttonElement;
}
