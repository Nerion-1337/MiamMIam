import clsx from "clsx";
// ICONS
import { ImSpinner9 } from "react-icons/im";
// BUILDER
import Spinner from "#components/build/global/spinner";
import Navlinks from "#components/build/global/navlink";
// TYPAGE
import { button } from "#types/typages";
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
  fonction = () => {
    console.log();
  },
  data_function,
  href,
  active,
  type,
  special,
  useRef,
  input,
  value_input,
}: button) {
  //
  //
  // VARIANT
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
  }
  //
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
  const buttonContent = (
    <>
      {loading ? (
        <Spinner variant="t1" size="s1" icon={{ icon: ImSpinner9 }} />
      ) : (
        <>
          {icon && !children ? (
            <icon.icon />
          ) : (
            <>
              {icon && children ? (
                <>
                  <icon.icon className="icon_left"/> {children} <icon.icon className="icon_right"/>
                </>
              ) : (
                <>
                  {item_i && children ? (
                    <>
                      <i className="i_left"/> <span>{children}</span><i className="i_right"/>
                    </>
                  ) : (
                    <>{children}</>
                  )}
                </>
              )}
            </>
          )}
        </>
      )}
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
      className={clsx(variantStyles, sizeStyles, fontSizeStyles, className)}
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
      <Navlinks href={href} type={type} active={active} special={special}>
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
