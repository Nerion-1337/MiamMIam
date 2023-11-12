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
    type,
    icon,
    text,
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
    fonction(text.replace(/\s/g, '_').toLowerCase(), e.target.value);
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
// BUILDER
//
const contentInput = (
  <>
    {icon && (
      (text && (text === "Date of Birth" || text === "Start Date") ? (
        <>
        <div className={`inputBoxGlobal ${identifiant}`}>
         <small></small>
          <div className={`inputBox ${isInputFocused ? "active" : ""}`}>
            <input
              type={type} 
              value={selectedDate} 
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
        </>
      ) : (
        <>
          {fonction ? (
            <div className={`inputBoxGlobal ${identifiant}`}>
              <small></small>
            <div className="inputBox">
              <input 
                type={type}
                onChange={handleonChange} 
                required={true}
              />
              <icon.icon />
              <span>{text}</span>
            </div>
            </div>
          ) : (
          <div className={`inputBoxGlobal ${identifiant}`}>
            <small></small>     
            <div className="inputBox">
              <input 
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
      ))
    )}
  </>
);
//
//
//
    return (
contentInput
    );
}