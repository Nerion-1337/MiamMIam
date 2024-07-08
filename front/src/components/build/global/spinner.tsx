import clsx from "clsx";
// TYPAGE
import { spinner } from "#0_types/typages";
//
//
//
//
//
export default function Spinner({
  variant, 
  size, 
  icon, 
  children,
}: spinner) {
//
//
// VARIABLE
//
//
  let variantStyles = "";
  let sizeStyles = "";
//
//
// SWITCH
//
//
  switch (variant) {
    case "t1":
      variantStyles = "spinner-1";
      break;
    case "t2":
      variantStyles = "spinner-2";
      break;
    case "t3":
      variantStyles = "spinner-3";
      break;
    case "t4":
      variantStyles = "spinner-4";
      break;
  }
  //
  switch (size) {
    case "s0":
      sizeStyles = "size-spinner1";
      break;
    case "s1":
      sizeStyles = "size-spinner1";
      break;
    case "s2":
      sizeStyles = "size-spinner2";
      break;
    case "s3":
      sizeStyles = "size-spinner3";
      break;
    case "s4":
      sizeStyles = "size-spinner4";
      break;
    case "s5":
      sizeStyles = "size-spinner5";
      break;
  }
//
//
// BUILDER
//
//
const type_spiner = (
  <>
  {icon && !children &&  <icon.icon />}

  {icon && children &&  <><icon.icon className="left"/> {children}<icon.icon className="right"/></>}

  {!icon && children}
  </>
)
//
const content_spiner = (
  <>
  <div role="spinner" className={clsx(variantStyles, sizeStyles)}>
  {type_spiner}
  </div>
  </>
)
//
//
// RETURN
//
//
  return content_spiner;
}
