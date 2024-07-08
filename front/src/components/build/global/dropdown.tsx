// KEY
import { v4 as uuidv4 } from "uuid";
// REACT
import { useState, useEffect, useRef } from 'react';
// TYPAGE
import { dropdown_type, dropdown_data } from "#0_types/typages";
//
//
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
    filter,
    modale,
    placeholder,
}: dropdown_type) {
//
//
// VARIABLE
//
//
const [isOpen, setIsOpen] = useState(false); 
const [selectedOption, setSelectedOption] = useState("");
const [inputType, setInputType] = useState('button');
const [isList, setIsList] = useState(list);
const [isAscending, setIsAscending] = useState(true); 
const dropdownRef = useRef<HTMLDivElement>(null);
const variantStyles = `type-dropdown${variant && variant.split("t")[1]}`; 
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
const handleOptionSelect = (option: {[key: string]: string}) => {
  setSelectedOption(option.name);
  setIsAscending(!isAscending)
  if(!fonction) return
  if(show === true){
    fonction(option.back ? option.back : option.name) 
  } else if(filter){
    fonction(variable, option.back)
    fonction("ordre", `${isAscending}`) 
  } else{
    fonction(variable, option.back ? option.back : option.name)
  }
  setIsOpen(false);
};
//
// OUVRE DROPDOWN INPUT
const toggleDropdownInput = () => {
  setIsOpen(true);
  setInputType('text');
};
//
// FERMETURE DROPDOWN INPUT
useEffect(() => {
  const handleClickOutside = (e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setIsOpen(false);
      setInputType('button');
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
  if(!fonction) return
  if(show === true){
    fonction(option)
  } else{
    fonction(variable, option, number)
  }
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
      value={selectedOption}
      >
    {selectedOption ? `${selectedOption}${filter ? (isAscending ? " ↓" : " ↑") : ""}` : value}
    <icon.icon className="icon_button"/>
      </button>
      {isOpen && (
        <ul className="dropdownMenu">
              {
               list.map((option: dropdown_data, index) => (
  <li key={uuidv4()} onClick={() => handleOptionSelect(option)}>
  {option.name} 
  {option.abreviation ? `(${option.abreviation})` : ""} 
  {option.marque ? `(${option.marque})` : ""} 
  {filter ? (isAscending ? " ↓" : " ↑") : ""}
  </li>         
             ))}
        </ul>
      )}
          <span>{text}</span>
          <icon.icon className="icon_mobile"/>
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
        placeholder={placeholder ? placeholder : ""}
        defaultValue={value ? (isOpen ? "" : value ): (isOpen ? "" : text )}
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
const dropdownModals = (
  <>
  {icon && list && (  
    <div className={variantStyles} >
      <small></small>
      <div className={`dropdownBox ${isOpen ? "active" : ""}`}>
      <button 
      onClick={toggleDropdown}
      onBlur={handleBlur}
      className={`buttonBox ${isOpen ? "active" : ""}`}
      >
      <icon.icon className="icon_left"/> {text} <icon.icon className="icon_right"/>
      </button>
      <div className={`dropdownBoxMenu ${isOpen ? "active" : ""}`}>
      <ul className="dropdownMenu">
              {
               list.map((option: dropdown_data, index) => (
  <li key={index} onClick={() => handleOptionSelect(option)}>
  {option.name}
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
  {search && dorpdownSearch}
  {modale && dropdownModals}
  {!modale && !search && dorpdown}
  </>
)
//
//
// RETURN
//
//
return contentDorpdown;
}  