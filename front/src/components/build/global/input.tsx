import clsx from "clsx";
// REACT
import { useState, useRef, useEffect } from 'react';
// PLUGIN
import { Calendar } from 'react-date-range';
import { format } from 'date-fns';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
// TYPAGE
import { input_type } from "#types/typages";
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
}: input_type ) {
//
// VARIABLE
//
const [isInputFocused, setInputFocus] = useState(false);    
const [selectedDate, setSelectedDate] = useState("");
const regexDate = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
const calendarRef = useRef<HTMLDivElement | null>(null);
let variantStyles = "";
let sizeStyles = "";
  //
  //
  // SWITCH
  //
  //
  switch (variant) {
    case "t0":
      variantStyles = "type-input0";
      break;
    case "t1":
      variantStyles = "type-input1";
      break;
    case "t2":
      variantStyles = "type-input2";
      break;
    case "t3":
      variantStyles = "type-input3";
      break;
    case "t4":
      variantStyles = "type-input4";
      break;
    case "t5":
      variantStyles = "type-input5";
      break;
    case "t6":
      variantStyles = "type-input6";
      break;
    case "t7":
      variantStyles = "type-input7";
      break;
    case "t8":
      variantStyles = "type-input8";
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
// FONCTION FOCUS INPUT
//
const handleBlur = () => {
  if (regexDate.test(selectedDate) === false){
    setSelectedDate("")
  }
};
//
// FONCTION ANALYSE VALUE INPUT
//
const handleonChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
  setSelectedDate(e.target.value)
  if (fonction && text) {
    if(unitee){
      const numbersOnly = e.target.value.replace(/[^\d.,]/g, '').replace(/,/g, ".");

      fonction(variable, numbersOnly);
    } else if (type === "file") {
      if(multiples){
        const media = e.target.files ? e.target.files : "";
          fonction(variable, media);
      } else{
      const media = e.target.files ? e.target.files[0] : "";
      fonction(variable,  media);   
      }
      
     } else { 
      fonction(variable, e.target.value); 
    }
    
  }
}
//
// FONCTION ANALYSE VALUE INPUT
//
const handleonChangeTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) =>{
  setSelectedDate(e.currentTarget.value)
  if (fonction && text) {
      fonction(variable, e.currentTarget.value);
  }
}
//
// FONCTION POUR FERME CALENDAR
//
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
//
const handleonSearch = (e: React.ChangeEvent<HTMLInputElement>) =>{
  const value = e.target.value;
  if(search){
   search(data, value) 
  }
}
//
//
// BUILDER
//
//
const inputText =(
  <>
  {icon && (
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
            <icon.icon />
            <span>{text}</span>
          </div>
          </div>
)}
  </>
)
//
const inputDate =(
  <>
  {icon && (
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
            <icon.icon />
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
)}
  </>
)
//
const inputNumber =(
  <>
  {icon && unitee && (
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
            <icon.icon />
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
            className={clsx(sizeStyles, `${variantStyles}_label_file`)} 
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
  <>
  {icon && (
   <div className={clsx(identifiant, variantStyles)}>
   <small></small>     
   <div className="inputBox">
     <input
      className="input_model" 
       type={type}
       onChange={handleonSearch} 
       required={true}
     />
     <icon.icon />
     <span>{text}</span>
   </div>  
 </div>  
)}
  </>
)
//
const inputTextera =(
  <>
  {icon && (
            <div className={clsx(identifiant, variantStyles, sizeStyles)}>
            <small></small>
           <div className="inputBox">
            <textarea
              className="input_model"
              onChange={handleonChangeTextarea} 
              required={true}
              defaultValue={value ? value || "" : ""}
            />
            <icon.icon />
            <span>{text}</span>
          </div>
          </div>
)}
  </>
)
//
//
const inputContent = (
  <>
  {element && (element === "text") ? (
   inputText
  ) : (
 <>{(element === "date") ? (
      inputDate
    ) : (
      <> {(element === "number") ? (
        inputNumber
      ) : (
      <>{(element === "img") ? (
       inputImg
      ) : (
        <>{(element === "textarea") ? (
          inputTextera
          ) : (
        inputSearch
         )}</>
        )}</>  
      )}</>
    )}</>
  )}
  </>
)
//
//
// RETURN
//
//
    return (
      inputContent
    );
}