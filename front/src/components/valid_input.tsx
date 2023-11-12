// DATA
import { Regex } from "#data/links";
// REACT
import React from 'react';
import { createRoot } from 'react-dom/client';
//
//
//
export function setErreur(input: string, message: React.ReactNode) {
  const formInput = document.querySelector(`.${input}`);
  if (formInput) {
    const small = formInput.querySelector("small");
    if (small) {
      const root = createRoot(small);
      root.render(<>{message}</>);
      formInput.classList.add("error_input");
    }
  }
}
 //
 //
 export function setValid(input: string) {
    const formInput = document.querySelector(`.${input}`);
    if(formInput){
     const small = formInput.querySelector("small");
  
     if (small)
    small.innerText = "";
    formInput.classList.remove("error_input"); 
    }
    
  }
//
//
// REGISTER
//
//
export function validIdentifiant(data: string) {
  const Input = document.querySelector(`.${data}`)?.querySelector("input");
  if(Input){
  const value = Input.value.trim();
  
    if (value === "") {
      setErreur(data, "Veuillez renseigner un identifiant.");
      return false;
    } else if (Regex[6].value.test(value) === false) {
      setErreur(data, "Veuillez entrer au minimum 2 lettres.");
      return false;
    } else if (Regex[0].value.test(value) === false) {
      setErreur(data, "Veuillez entrer un identifiant valide.");
      return false;
    } else if (Regex[4].value.test(value) === true) {
      setErreur(data, "Veuillez entrer un prénom valide.");
      return false;
    } else {
      setValid(data);
      return true;
    }
  }
  }
//
//  
  export function validPassword(data_first: string, data_last: string) {
    const Input_first = document.querySelector(`.${data_first}`)?.querySelector("input");
    const Input_last = document.querySelector(`.${data_last}`)?.querySelector("input");

    if(Input_first && Input_last){
    const value_first = Input_first.value.trim();
    const value_last = Input_last.value.trim();
  
    if (Regex[5].value.test(value_first) === false) {
      setValid(data_last);
      setErreur(data_first, "Veuillez entrer entre 10 et 40 caractères.");
      return false;
    } else if (Regex[10].value.test(value_first) === false) {
      setValid(data_last);
      setErreur(data_first, "Le mdp doit contenir 2 lettre, 2 chiffres et 1 majuscule.");
      return false;
    } else if (value_first !== value_last) {
      setValid(data_first);
      setErreur(data_last, "La confirmation n'est pas identique.");
      return false;
    } else {
      setValid(data_first);
      setValid(data_last);
      return true;
    }
  }
  }
//
//  
  export function validEmail(data: string) {
    const Input = document.querySelector(`.${data}`)?.querySelector("input");
    if(Input){
    const value = Input.value.trim();
  
    if (value === "") {
      setErreur(data, "Veuillez renseigner un email.");
      return false;
    } else if (Regex[1].value.test(value) === false) {
      setErreur(data, "Veuillez verifier votre nom d'utilisateur.");
      return false;
    } else if (Regex[2].value.test(value) === false) {
      setErreur(data, "N'oublier pas le @.");
      return false;
    } else if (Regex[3].value.test(value) === false) {
      setErreur(data, "Veuillez vérifier le nom de domaine.");
      return false;
    } else {
      setValid(data);
      return true;
    }
  }
  }
 //
 //
export function validCGV(data: boolean) {
    if (data === true) {
      setValid("input_inscription_cvg");
      return true;
    } else {
      setErreur("input_inscription_cvg", "Veuillez accepter les CGV.");
      return false;
    }
  }
 //
 //
  
  
