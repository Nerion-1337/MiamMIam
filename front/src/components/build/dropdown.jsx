import { useState } from 'react';
// KEY
import { v4 as uuidv4 } from "uuid";
//
//
//
export default function Dropdown({
    text,
    icon,
    list,
    fonction,
    show,
}) {
//
//
// VARIABLE
const [isOpen, setIsOpen] = useState(false); 
const [selectedOption, setSelectedOption] = useState(''); 
//
// FERME/OUVRE MODAL
const toggleDropdown = (e) => {
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
const handleOptionSelect = (option) => {
  setSelectedOption(option);
  if(show == true){
    fonction(option.name) 
  } else{
    fonction(text.replace(/\s/g, '_').toLowerCase(), option) 
  }
   
  setIsOpen(false);
};
//
//
//
return (
  <div className="dorpdownBox" >
    <button 
    onClick={toggleDropdown}
    className={`inputBox ${isOpen || selectedOption ? "active" : ""}`}
    onBlur={handleBlur}
    children={selectedOption.name || ""}
    value={selectedOption.abbreviation}
    />
    {isOpen && (
      <ul className="dropdownMenu">
            {
             list.map((option) => (
<li key={uuidv4()} onClick={() => handleOptionSelect(option)}>
{option.name}
</li>         
           ))}
      </ul>
    )}
        <span>{text}</span>
        <icon.icon />
  </div>
);
}