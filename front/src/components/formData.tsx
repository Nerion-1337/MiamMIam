// COMPONENTS
import { removeTagComponent, addTagComponent} from "#components/tags"
// REACT
import { Dispatch, SetStateAction } from 'react';
// TYPAGE
import {  api } from "#types/typages";
//
//
//
//
//
// AJOUTE ELEMENT CONTENU DANS formData
export const handleChange = (
    fieldName: string, 
    newValue: string, 
    setFormData: Dispatch<SetStateAction<{ [key: string]: string }>> 
    ) => {
    setFormData((prevState: {[key: string]: string }) => {
        return { ...prevState, [fieldName]: newValue };
      });
  };
//
// AJOUTE ELEMENT CONTENU DANS formDataArray
export const handleChangeArray = (
    fieldName: string, 
    newValue: string, 
    number: boolean,
    setFormDataArray: Dispatch<SetStateAction<{ [key: string]: api[] }>>,
    setTagsComponents: Dispatch<SetStateAction< React.ReactNode[] >>,
    tagsComponents: React.ReactNode[] 
    ) => {
        setFormDataArray((prevState: {[key: string]: api[] }) => {
      const keyExists = Object.keys(prevState).includes(fieldName);
  
      if (keyExists) {
        const isValuePresent = prevState[fieldName].some((item) => item.name === newValue);
  
        if (!isValuePresent) {
          const newItem: api = { name: newValue };
          const updatedField = {
            ...prevState,
            [fieldName]: [...prevState[fieldName], newItem],
          };
          addTagComponent(
            newValue, 
            fieldName, 
            number, 
            setTagsComponents, 
            tagsComponents, 
            setFormDataArray
            );
          return updatedField;
        }
      } else {
        addTagComponent(
          newValue, 
          fieldName, 
          number, 
          setTagsComponents, 
          tagsComponents, 
          setFormDataArray
          );
        return {
          ...prevState,
          [fieldName]: [{ name: newValue }],
        };
      }
      return prevState; // Renvoyer l'état actuel si l'élément est déjà présent
    });
  };
//
// SUPPRIME ELEMENT CONTENU DANS formDataArray
export const removeFromFormDataArray = (
    fieldName: string, 
    elementToRemove: string,
    setFormDataArray: Dispatch<SetStateAction<{ [key: string]: api[] }>>,
    setTagsComponents: Dispatch<SetStateAction< React.ReactNode[] >>
    ) => {
    setFormDataArray((prevState) => {
      const fieldData = prevState[fieldName];
      if (fieldData) { 
        const updatedField = {
          ...prevState,
          [fieldName]: fieldData.filter((element) => element.name !== elementToRemove),
        };
        removeTagComponent(elementToRemove, fieldName, setTagsComponents)
        return updatedField;
      }
      return prevState;
    });
  };  