import clsx from "clsx";
import { CopyToClipboard } from "react-copy-to-clipboard";
// BUILD
import Spinner from "#components/build/global/spinner";
import Navlinks from "#components/build/global/navlink";
// ICONS
import { ImSpinner9 } from "react-icons/im";
// TYPAGE
import { typo } from "#types/typages";
//
//
//
//
//
export default function Typo({  
  size,
  balise: Balise = "div",
  color,
  transform,
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
  copy,
  useRef,
  datatext,
  icon,
  item_i,
  loading,
}: typo) {
  //
  //
  // VARIABLE
  //
  //
  let sizeStyles = "";
  let colorStyles = "";
  let transformStyles = "";
  //
  //
  // SWITCH
  //
  //
  switch (size) {
    case "s0":
      sizeStyles = "size-typo0";
      break;
    case "s1":
      sizeStyles = "size-typo1";
      break;
    case "s2":
      sizeStyles = "size-typo2";
      break;
    case "s3":
      sizeStyles = "size-typo3";
      break;
    case "s4":
      sizeStyles = "size-typo4";
      break;
    case "s5":
      sizeStyles = "size-typo5";
      break;
    case "s6":
      sizeStyles = "size-typo6";
      break;
    case "s7":
      sizeStyles = "size-typo7";
      break;
    case "s8":
      sizeStyles = "size-typo8";
      break;
    case "s9":
      sizeStyles = "size-typo9";
      break;
    case "s10":
      sizeStyles = "size-typo10";
      break;
  }
  //
  //
  switch (color) {
    case "cb":
      colorStyles = "cb";
      break;
    case "cw":
      colorStyles = "cw";
      break;
    case "c1":
      colorStyles = "c1";
      break;
    case "c2":
      colorStyles = "c2";
      break;
    case "c3":
      colorStyles = "c3";
      break;
    case "c4":
      colorStyles = "c4";
      break;
    case "c5":
      colorStyles = "c5";
      break;
    case "c6":
      colorStyles = "c6";
      break;
    case "c7":
      colorStyles = "c7";
      break;
    case "c8":
      colorStyles = "c8";
      break;
    case "c9":
      colorStyles = "c9";
      break;
    case "c10":
      colorStyles = "c10";
      break;
  }
  //
  //
  switch (transform) {
    case "maj":
      transformStyles = "maj";
      break;
    case "min":
      transformStyles = "min";
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
  const typoContent = (
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
                  <icon.icon /> {children}
                </>
              ) : (
                <>
                  {item_i && children ? (
                    <>
                      <i /> <span>{children}</span>
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
  const typoElement = (
    <Balise
      className={clsx(sizeStyles, colorStyles, transformStyles, className)}
      onClick={handleClick}
      ref={useRef}
      data-text={datatext}
    >
      {typoContent}
    </Balise>
  );
  //
  //
  if (href) {
    return (
      <Navlinks 
      href={href} 
      type={type} 
      active={active} 
      special={special} 
      className={clsx(sizeStyles, colorStyles, transformStyles, className)}
      useRef={useRef}
      data-text={datatext}
      fonction={fonction}
      >
        {typoContent}
      </Navlinks>
    );
  } else if (copy) {
    return (
    <CopyToClipboard text={copy}>
      {typoElement}
      </CopyToClipboard>
      )
  }
  //
  //
  // RETURN
  //
  //
  return typoElement;
}


