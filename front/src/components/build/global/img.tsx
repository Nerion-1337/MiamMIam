import clsx from "clsx";
// BUILDER
import Navlinks from "#components/build/global/navlink";
// TYPAGE
import { img } from "#0_types/typages";
//
//
//
export default function Img({
sizeBloc,
sizeImg,  
radius,  
src,
alt,
className,
classImg,
classLink,
href,
active,
type,
special,
useRef,
datatext,
fonction = () => {
  console.log();
},
}: img){
 //
 //
 // VARIABLE
 //
 //   
let sizeBlocStyle = "";
let sizeImgStyle = "";
let radiusImgStyle = "";  
//
//
// SWITCH
//
//
  switch (sizeBloc) {
        case "s0":
          sizeBlocStyle = "size-bloc-img0";
          break;
        case "s1":
          sizeBlocStyle = "size-bloc-img1";
          break;
        case "s2":
          sizeBlocStyle = "size-bloc-img2";
          break;
        case "s3":
          sizeBlocStyle = "size-bloc-img3";
          break;
        case "s4":
          sizeBlocStyle = "size-bloc-img4";
          break;
        case "s5":
          sizeBlocStyle = "size-bloc-img5";
          break;
        case "s6":
          sizeBlocStyle = "size-bloc-img6";
          break;
        case "s7":
          sizeBlocStyle = "size-bloc-img7";
          break;
        case "s8":
          sizeBlocStyle = "size-bloc-img8";
          break;
        case "s9":
          sizeBlocStyle = "size-bloc-img9";
          break;
        case "s10":
          sizeBlocStyle = "size-bloc-img10";
          break;
  }
  //
  switch (sizeImg) {
    case "s0":
      sizeImgStyle = "size-img0";
      break;
    case "s1":
      sizeImgStyle = "size-img1";
      break;
    case "s2":
      sizeImgStyle = "size-img2";
      break;
    case "s3":
      sizeImgStyle = "size-img3";
      break;
    case "s4":
      sizeImgStyle = "size-img4";
      break;
    case "s5":
      sizeImgStyle = "size-img5";
      break;
    case "s6":
      sizeImgStyle = "size-img6";
      break;
    case "s7":
      sizeImgStyle = "size-img7";
      break;
    case "s8":
      sizeImgStyle = "size-img8";
      break;
    case "s9":
      sizeImgStyle = "size-img9";
      break;
    case "s10":
      sizeImgStyle = "size-img10";
      break;
  }
    //
  switch (radius) {
      case "r0":
        radiusImgStyle = "radius-img0";
        break;
      case "r1":
        radiusImgStyle = "radius-img1";
        break;
      case "r2":
        radiusImgStyle = "radius-img2";
        break;
      case "r3":
        radiusImgStyle = "radius-img3";
        break;
      case "r4":
        radiusImgStyle = "radius-img4";
        break;
      case "r5":
        radiusImgStyle = "radius-img5";
        break;
      case "s6":
        radiusImgStyle = "radius-img6";
        break;
      case "s7":
        radiusImgStyle = "radius-img7";
        break;
      case "s8":
        radiusImgStyle = "radius-img8";
        break;
      case "s9":
        radiusImgStyle = "radius-img9";
        break;
      case "s10":
        radiusImgStyle = "radius-img10";
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
  const imgElement = (
    <>
        <figure 
        className={clsx(sizeBlocStyle,radiusImgStyle, className)}
        onClick={handleClick}
        >
            <img className={clsx(classImg, sizeImgStyle)} src={src} alt={alt}/>
        </figure>
    </>
  )
 //
 const imgLink = (
  <>
          <Navlinks 
      href={href ? href : ""} 
      type={type} 
      active={active} 
      special={special} 
      useRef={useRef}
      data-text={datatext}
      fonction={fonction}
      className={classLink}
      >
        {imgElement}
        </Navlinks>
  </>
 )
//
const imgContent = (
  <>
  {href && imgLink}
  {!href && imgElement}
  </>
)        
    return imgContent;
}