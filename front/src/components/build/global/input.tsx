import clsx from "clsx";
// BUILDER
import Typo from "#components/build/global/typography";
// PLUGIN
import { Calendar } from 'react-date-range';
import { format } from 'date-fns';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
// REACT
import { useState, useRef, useEffect } from 'react';
// TYPAGE
import { input_type } from "#0_types/typages";
//
//
//
export default function Input({
    variant,
    size,
    element,
    type,
    icon,
    text,
    value,
    unitee,
    variable,
    multiples,
    identifiant,
    fonction,
    search,
    data,
    special,
}: input_type ) {
//
// VARIABLE
//
const [isInputFocused, setInputFocus] = useState(false);    
const [selectedDate, setSelectedDate] = useState("");
const regexDate = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
const calendarRef = useRef<HTMLDivElement | null>(null);
const sliderValueRef = useRef<HTMLDivElement>(null);
let variantStyles = "";
let sizeStyles = "";
  //
  //
  // SWITCH
  //
  //
  switch (variant) {
    case "t0":
      variantStyles = `type-input0-${element}`;
      break;
    case "t1":
      variantStyles = `type-input1-${element}`;
      break;
    case "t2":
      variantStyles = `type-input2-${element}`;
      break;
    case "t3":
      variantStyles = `type-input3-${element}`;
      break;
    case "t4":
      variantStyles = `type-input4-${element}`;
      break;
    case "t5":
      variantStyles = `type-input5-${element}`;
      break;
    case "t6":
      variantStyles = `type-input6-${element}`;
      break;
    case "t7":
      variantStyles = `type-input7-${element}`;
      break;
    case "t8":
      variantStyles = `type-input8-${element}`;
      break;
  }
  //
  //
  switch (size) {
    case "s0":
      sizeStyles = "size-input1";
      break;
    case "s1":
      sizeStyles = "size-input1";
      break;
    case "s2":
      sizeStyles = "size-input2";
      break;
    case "s3":
      sizeStyles = "size-input3";
      break;
    case "s4":
      sizeStyles = "size-input4";
      break;
    case "s5":
      sizeStyles = "size-input5";
      break;
    case "s6":
      sizeStyles = "size-input6";
      break;
    case "s7":
      sizeStyles = "size-input7";
      break;   
    case "s8":
      sizeStyles = "size-input8";
      break;    
  }
//
//
// FONCTION
//
//
// FOCUS INPUT
const handleBlur = () => {
  if (regexDate.test(selectedDate) === false){
    setSelectedDate("")
  }
};
//
// ANALYSE VALUE INPUT
const handleonChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
  const value = e.target.value;
  setSelectedDate(value)
  if (fonction && text) {
    if(unitee){
      const numbersOnly = value.replace(/[^\d.,]/g, '').replace(/,/g, ".");
      fonction(variable, numbersOnly);
    } else if (type === "file") {
      if(multiples){
        const media = e.target.files ? e.target.files : "";
          fonction(variable, media, multiples);
          setTimeout(()=>{
          (e.target as HTMLInputElement).value = "";
          }, 100)
      } else{
      const media = e.target.files ? e.target.files[0] : "";
      fonction(variable,  media); 
      (e.target as HTMLInputElement).value = "";
      }
      
     } else { 
      if(element === "range"){
        fonction(value)
        moveSpan(value);
      } else{
        fonction(variable, value);
      }
    } 
  }
}
//
// ANALYSE VALUE INPUT TEXTERA
const handleonChangeTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) =>{
  setSelectedDate(e.currentTarget.value)
  if (fonction) {
      fonction(variable, e.currentTarget.value);
  }
  if(special === "height_auto"){
  e.target.style.height = 'auto';
  e.target.style.height = `clamp(${e.target.scrollHeight / 2}px, calc((${e.target.scrollHeight} / 1600) * 100vw), ${e.target.scrollHeight}px)`;  
}
}
//
// FONCTION POUR FERME CALENDAR
const handleClickOutside = (e: MouseEvent) => {
  const targetNode = e.target as Node;
  if (calendarRef.current && !calendarRef.current.contains(targetNode)) {
    setInputFocus(false);
  }
};
useEffect(() => {
  document.addEventListener('mousedown', handleClickOutside); 
  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, []);
//
// FONCTION RECHERCHE
const handleonSearch = (e: React.ChangeEvent<HTMLInputElement>) =>{
  const value = e.target.value;
  if(search){
    if(data){
      search(data, value)
    } else{
      search(variable, value)
    } 
  }
}
//
// DEPLACEMENT DU SPAN SELON THUMB INPUT RANGE
const moveSpan = (value: string) => {
  if(sliderValueRef.current){
  const span = sliderValueRef.current.querySelector('span');
  if(span) span.style.left = (parseFloat(value)) + "%";
  
  }
};
//
//
// BUILDER
//
//
const inputText =(
  <>
 
            <div className={clsx(identifiant, variantStyles, sizeStyles)}>
            <small></small>
           <div className="inputBox">
            <input
              className="input_model" 
              type={type}
              onChange={handleonChange} 
              required={true}
              defaultValue={value ? value || "" : ""}
            />
             {icon && (<icon.icon />)}
            <span>{text}</span>
          </div>
          </div>

  </>
)
//
const inputDate =(
  <>
  
   <div className={clsx(identifiant, variantStyles, sizeStyles)}>
         <small></small>
          <div className={`inputBox ${isInputFocused ? "active" : ""}`}>
            <input
              className="input_model"
              type={type} 
              value={selectedDate ? selectedDate : value || "" } 
              onFocus={() => setInputFocus(true)} 
              onBlur={handleBlur}
              onChange={handleonChange} 
              required={true}
            />
            {icon && (<icon.icon />)}
            <span>{text}</span>  
          </div>
          <div className="calendar" ref={calendarRef}>   
            <Calendar
              className={isInputFocused ? "active" : ""}
              dateDisplayFormat="dd/MM/yyyy"
              onChange={(date) => { 
                setSelectedDate(format(date, 'dd/MM/yyyy'));
                if(fonction)
                fonction(text?.replace(/\s/g, '_').toLowerCase(), format(date, 'dd/MM/yyyy'));
                setInputFocus(false);
              }}
            />
          </div>
        </div>
  </>
)
//
const inputNumber =(
  <>
  {unitee && (
            <div className={clsx(identifiant, variantStyles, sizeStyles)}>
            <small></small>
          <div className="inputBox">
            <input
              className="input_model" 
              type={type}
              onChange={handleonChange} 
              required={true}
              defaultValue={value ? value + unitee || "" : ""}
            />
            {icon && (<icon.icon />)}
            <span>{text}</span>
          </div>
          </div>
)}
  </>
)
//
const inputImg =(
  <>
            <div className={clsx(identifiant)}>
            <small></small>
            <label 
            htmlFor={`file_${variable}`} 
            className={clsx(sizeStyles, `${variantStyles}`)} 
            >{text}</label>
            <input
            id={`file_${variable}`}
            className="file_global"
            type="file"
            name="file"
            accept=".jpg, .jpeg, .png, .dif"
            onChange={handleonChange}
            {...(multiples ? { multiple: true } : {})}
            />
            </div>
  </>
)
//
const inputSearch=(
    <> {special === "global" ? (
      <div className={clsx(identifiant, variantStyles)}>
      <small></small>     
      <div className="inputBox">
        <input
         className="input_model" 
          type={type}
          onChange={handleonSearch} 
          required={true}
          placeholder={text}
        />
        <div className="loupe">
        {icon && (<icon.icon />)}
        </div>
      </div>  
    </div> 
    ):(
         <div className={clsx(identifiant, variantStyles)}>
   <small></small>     
   <div className="inputBox">
     <input
      className="input_model" 
       type={type}
       onChange={handleonSearch} 
       required={true}
     />
     {icon && (<icon.icon />)}
     <span>{text}</span>
   </div>  
 </div> 
    )} 
 </> 
)
//
const inputTextera =(
  <>
            <div className={clsx(identifiant, variantStyles, sizeStyles)}>
            <small></small>
           <div className="inputBox">
            <textarea
              rows={1}
              className="input_model"
              onChange={handleonChangeTextarea} 
              required={true}
              defaultValue={value ? value || "" : ""}
            />
           {icon && ( <icon.icon /> )}
            <span>{text}</span>
          </div>
          </div>

  </>
)
//
const inputRange = (
  <>
  {value && (
  <div className={clsx(identifiant, variantStyles, sizeStyles)}>
                    <div className="slider_value" ref={sliderValueRef}>
                        <Typo
                        balise="span"
                        size="s5"
                        familly="f2"
                        weight="w4"
                        color="cw"
                        children={selectedDate ? `${selectedDate}%` : `${value}%`}
                        />
                    </div>

                    <div className="field">
                    <Typo
                        balise="span"
                        size="s3"
                        familly="f2"
                        weight="w4"
                        color="cb"
                        children="0%"
                        className="slider_start"
                        />
                    <input 
                    type="range" 
                    min="0" 
                    max="100"
                    defaultValue="100" 
                    step="10" 
                    onChange={handleonChange}
                    /> 
                    <Typo
                        balise="span"
                        size="s3"
                        familly="f2"
                        weight="w4"
                        color="cb"
                        children="100%"
                        className="slider_end"
                        />   
                    </div>
  
                </div>
                )}
  </>
)
//
//
const inputContent = (
  <>
    {element && (
      <>
        {element === "text" && inputText}
        {element === "date" && inputDate}
        {element === "number" && inputNumber}
        {element === "img" && inputImg}
        {element === "textarea" && inputTextera}
        {element === "range" && inputRange}
        {element === "search" && inputSearch}
      </>
    )}
  </>
);
//
//
// RETURN
//
//
    return inputContent;
}