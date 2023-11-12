import clsx from "clsx";
// BUILDER
import Navlinks from "#components/build/global/navlink";
// TYPAGE
import { img } from "#types/typages";
//
//
//
export default function Img({
sizeBloc,
sizeImg,    
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
let sizeBlocStyle = "";
let sizeImgStyle = "";  
//
// 
    switch (sizeBloc) {
        case "s0":
          sizeBlocStyle = "size-img0";
          break;
        case "s1":
          sizeBlocStyle = "size-img1";
          break;
        case "s2":
          sizeBlocStyle = "size-img2";
          break;
        case "s3":
          sizeBlocStyle = "size-img3";
          break;
        case "s4":
          sizeBlocStyle = "size-img4";
          break;
        case "s5":
          sizeBlocStyle = "size-img5";
          break;
        case "s6":
          sizeBlocStyle = "size-img6";
          break;
        case "s7":
          sizeBlocStyle = "size-img7";
          break;
        case "s8":
          sizeBlocStyle = "size-img8";
          break;
        case "s9":
          sizeBlocStyle = "size-img9";
          break;
        case "s10":
          sizeBlocStyle = "size-img10";
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
  //
  const handleClick = () => {
    if (fonction) fonction();
  };
  //
  //
  const imgContent =(
    <>
        <figure 
        className={clsx(sizeBloc, className)}
        onClick={handleClick}
        >
            <img className={clsx(classImg, sizeImgStyle)} src={src} alt={alt}/>
        </figure>
    </>
  )      
    return(
<>
    {href ? (
        <Navlinks 
      href={href} 
      type={type} 
      active={active} 
      special={special} 
      useRef={useRef}
      data-text={datatext}
      fonction={fonction}
      className={classLink}
      >
        {imgContent}
        </Navlinks>
    ) : (
        imgContent
    )}
</>
    );
}