// REACT
import { useState, useEffect, useRef } from 'react';
// TYPAGE
import { dropdown_type, dropdown_data } from "#types/typages";
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
    search,
    number,
}: dropdown_type) {
//
//
// VARIABLE
//
//
const [isOpen, setIsOpen] = useState(false); 
const [selectedOption, setSelectedOption] = useState("");
const [inputType, setInputType] = useState('button');
const [inputValue, setInputValue] = useState(text);
const [isList, setIsList] = useState(list); 
const dropdownRef = useRef<HTMLDivElement>(null);
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
//
// FUNCTION
//
//

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
  if(!fonction) return
  if(show == true){
    fonction(option) 
  } else{
    fonction(variable, option) 
  }
  setIsOpen(false);
};
//
// OUVRE DROPDOWN INPUT
const toggleDropdownInput = () => {
  setIsOpen(true);
  setInputType('text');
  setInputValue("");
};
//
// FERMETURE DROPDOWN INPUT
useEffect(() => {
  const handleClickOutside = (e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setIsOpen(false);
      setInputType('button');
      setInputValue(text);
      setIsList(list)
    }
  };
  document.addEventListener('mousedown', handleClickOutside);
  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
});
//
// SEARCH
const searche = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (list) {
    const resultat = list.filter((object: dropdown_data) => {
      for (const prop in object) {
        if (object[prop] && object[prop].toString().toLowerCase().includes(e.target.value)) {
          return true;
        }
      }
      return false;
    });
    setIsList(resultat);
  }
};
//
// ENVVOIE OPTION
const sendOption = (option: string) =>{
  if(fonction) fonction(variable, option, number)
}
//
//
// BUILDER
//
//
const dorpdown = (
  <>
  {icon && list && (  
    <div className={variantStyles} >
      <small></small>
      <div className={`dropdownBox ${isOpen ? "active" : ""}`}>
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
               list.map((option: dropdown_data, index) => (
  <li key={index} onClick={() => handleOptionSelect(option.name)}>
  {option.name} {option.abreviation ? `(${option.abreviation})` : ""} {option.marque ? `(${option.marque})` : ""}
  </li>         
             ))}
        </ul>
      )}
          <span>{text}</span>
          <icon.icon />
          </div>
    </div>
    
    )}
    </>
)
//
const dorpdownSearch = (
  <>
  {icon && isList && (  
    <div className={`${variantStyles}`}>
      <small></small>
    <div className='boxGlobal'>
      <div className='mirror_dropdown'>{text}</div>
      <div className={`dropdownBox ${isOpen ? "active" : ""}`}
     onFocus={toggleDropdownInput}
     ref={dropdownRef}  
      >
      <div className='inputBox'>
      <input
        className="input_model" 
        type={inputType}
        onChange={searche} 
       placeholder={value ? String(value) || "" : ""}
        defaultValue={inputValue}
        required={true}
      />
      <icon.icon />
         </div>
        <ul className="dropdownMenu">
              {
               isList.map((option: dropdown_data, index) => (
  <li key={index} onClick={() => sendOption(option.name)}>
  {option.name} {option.abreviation ? `(${option.abreviation})` : ""} {option.marque ? `(${option.marque})` : ""}
  </li>         
             ))}
        </ul>        
        </div>
      </div>
    </div>
    )}
    </>
)
//
const contentDorpdown = (
  <>
  {search ? (
    dorpdownSearch
  ) : (
    dorpdown
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