// REACT
import { useState } from 'react';
// KEY
import { v4 as uuidv4 } from "uuid";
// TYPAGE
import { dropdown_type, dropdown } from "#types/typages";
//
//
//
export default function Dropdown({
    variant,
    text,
    icon,
    list,
    value,
    variable,
    fonction,
    show,
}: dropdown_type) {
//
//
// VARIABLE
//
//
const [isOpen, setIsOpen] = useState(false); 
const [selectedOption, setSelectedOption] = useState("");
let variantStyles = ""; 
  //
  //
  // SWITCH
  //
  //
  switch (variant) {
    case "t0":
      variantStyles = "type-dropdown0";
      break;
    case "t1":
      variantStyles = "type-dropdown1";
      break;
    case "t2":
      variantStyles = "type-dropdown2";
      break;
    case "t3":
      variantStyles = "type-dropdown3";
      break;
    case "t4":
      variantStyles = "type-dropdown4";
      break;
    case "t5":
      variantStyles = "type-dropdown5";
      break;
    case "t6":
      variantStyles = "type-dropdown6";
      break;
    case "t7":
      variantStyles = "type-dropdown7";
      break;
    case "t8":
      variantStyles = "type-dropdown8";
      break;
  }
//
// FERME/OUVRE MODAL
const toggleDropdown = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  e.preventDefault();
  setIsOpen(!isOpen);
};
const handleBlur = () => {
    setTimeout(() =>{
        setIsOpen(false)
    }, 100)
  };
//
// SELECTION OPTION
const handleOptionSelect = (option: string) => {
  setSelectedOption(option);
  if(!fonction || !text) return
  if(show == true){
    fonction(option) 
  } else{
    fonction(variable, option) 
  }
  setIsOpen(false);
};
//
//
// BUILDER
//
//
const contentDorpdown = (
  <>
  {icon && list && (  
    <div className={variantStyles} >
      <button 
      onClick={toggleDropdown}
      className={`inputBox ${isOpen || selectedOption || value ? "active" : ""}`}
      onBlur={handleBlur}
      children={selectedOption ? selectedOption : value}
      value={selectedOption}
      />
      {isOpen && (
        <ul className="dropdownMenu">
              {
               list.map((option: dropdown) => (
  <li key={uuidv4()} onClick={() => handleOptionSelect(option.name)}>
  {option.name}
  </li>         
             ))}
        </ul>
      )}
          <span>{text}</span>
          <icon.icon />
    </div>
    
    )}
    </>
)
//
//
//
//
//
return (
  contentDorpdown
);
}