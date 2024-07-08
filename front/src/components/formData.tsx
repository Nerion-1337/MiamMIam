// COMPONENTS
import { removeTagComponent, addTagComponent} from "#components/build/tags"
// REACT
import { Dispatch, SetStateAction } from 'react';
// TYPAGE
import {apiMedia,  api, ChangeArray, ChangeArrayImg } from "#0_types/typages";
//
//
//
//
//
// AJOUTE ELEMENT CONTENU DANS formData
export const handleChange = (
    fieldName: string, 
    newValue: string, 
    setFormData: Dispatch<SetStateAction<{ [key: string]: string }>>,
    imgTags?: boolean,
    setTagsComponents?: Dispatch<SetStateAction< React.ReactNode[] >>,
    tagsComponents?: React.ReactNode[], 
  ) => {
    setFormData((prevState: {[key: string]: string }) => {
      return { ...prevState, [fieldName]: newValue };
    });
  };  
//
//
export const removeField = (
    fieldName: string,
    setFormData: Dispatch<SetStateAction<{ [key: string]: string }>>
  ) => {
    setFormData((prevState: { [key: string]: string }) => {
      const updatedFormData = { ...prevState };
      delete updatedFormData[fieldName];
      return updatedFormData;
    });
  };  
//
// AJOUTE LA VALEUR QUANTITE
export const addQuantityToElement = (
    fieldName: string, 
    elementName: string, 
    quantity: string,
    setFormDataArray: Dispatch<SetStateAction<{ [key: string]: api[] }>>
    ) => {
    setFormDataArray((prevState) => {
      const fieldData = prevState[fieldName];
      if (fieldData) {
        const updatedField = fieldData.map((element) => {
          if (element.name === elementName) {
            return {
              ...element,
              quantite: quantity,
            };
          }
          return element;
        });
  
        return {
          ...prevState,
          [fieldName]: updatedField,
        };
      }
      return prevState; // Renvoyer l'état actuel si le champ n'est pas trouvé
    });
  };  
//
// AJOUTE ELEMENT CONTENU DANS formDataArray
export const handleChangeArray = ({
    fieldName, 
    newValue,
    number,
    setFormDataArray,
    setTagsComponents,
    tagsComponents,
    variant, 
    otherValue,
    quantite, 
    }: ChangeArray) => {
        setFormDataArray((prevState: {[key: string]: api[] }) => {
      const keyExists = Object.keys(prevState).includes(fieldName);
  
      if (keyExists) {
        const isValuePresent = prevState[fieldName].some((item) => item.name === newValue);

        if (!isValuePresent) {
      
          const newItem: api = { name: newValue, ...(otherValue ? { value: otherValue } : {}), ...(quantite ? { quantite: quantite } : {}) };
          const updatedField = {
            ...prevState,
            [fieldName]: [...prevState[fieldName], newItem],
          };
          if(setTagsComponents && tagsComponents)
          addTagComponent({
            value: newValue, 
            type: fieldName, 
            number: number, 
            setTagsComponents: setTagsComponents, 
            tagsComponents: tagsComponents, 
            setFormDataArray: setFormDataArray,
            variant: variant,
            quantite: quantite
            });
          return updatedField;
        }
      } else {
        if(setTagsComponents && tagsComponents)
        addTagComponent({
          value: newValue, 
          type: fieldName, 
          number: number, 
          setTagsComponents: setTagsComponents, 
          tagsComponents: tagsComponents, 
          setFormDataArray: setFormDataArray,
          variant: variant,
          quantite: quantite
          });
        return {
          ...prevState,
          [fieldName]: [{ name: newValue, ...(otherValue ? { value: otherValue } : {}), ...(quantite ? { quantite: quantite } : {}) }],
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
          [fieldName]: fieldData.filter((element) => {
            if ((element.name as any).constructor === File) {
              return (element.name as any).name !== elementToRemove;
            }          
            return element.name !== elementToRemove
        }),
        };
        removeTagComponent(elementToRemove, fieldName, setTagsComponents)
        return updatedField;
      }
      return prevState;
    });
  };
//
// AJOUTE 
export const handleChangePage = (
  fieldNameFirst: string,
  newValueFirst: string, 
  fieldNameLast: string,  
  newValueLast: string, 
  setFormData: Dispatch<SetStateAction<{ [key: string]: string }>> 
  ) => {
  setFormData((prevState: {[key: string]: string }) => {
      return { ...prevState, [fieldNameFirst]: newValueFirst, [fieldNameLast]: newValueLast };
    });
};
//
// AJOUTE IMAGE CONTENU DANS formDataArray
export const handleChangeArrayImg = ({
  fieldName, 
  newValue,
  setFormDataArray,
  setTagsComponents,
  tagsComponents,
  multiples, 
  }: ChangeArrayImg) => {
//   
setFormDataArray((prevState: { [key: string]: apiMedia[] }) => {
//
  const fieldData = prevState[fieldName];
//
    if(newValue instanceof FileList){
//      
      const updatedFiles = Array.from(newValue).map((file: File) => {
//
      const imageUrl = URL.createObjectURL(file);
      const nameImg = file instanceof File ? file.name : ""
      const updatedField = fieldData && fieldData.some((item: any) => item.name.name === nameImg);
//
  if(updatedField) return null ;
//
 if(setTagsComponents && tagsComponents)
        addTagComponent({
          value: file instanceof File ? file.name : "",
          type: fieldName, 
          setTagsComponents: setTagsComponents, 
          tagsComponents: tagsComponents, 
          setFormDataMedia: setFormDataArray,
          img: imageUrl,
          });
//
      return { name: file};
//          
    });
//
const validFiles = updatedFiles.filter((file) => file !== null) as apiMedia[];
const concatenatedFiles = fieldData ? [...fieldData, ...validFiles] : validFiles;
//
    return {
      ...prevState,
      [fieldName]: concatenatedFiles,
    };
//   
    } else {
//        
    const imageUrl = URL.createObjectURL(newValue); 
    const nameImg = newValue instanceof File ? newValue.name : ""
//    
    if (fieldData) { 
//  
    const updatedField = fieldData.some((item: any) => item.name.name === nameImg);
//
    if(updatedField) return prevState;
    if(fieldData.length > 0 ) return prevState;
//
    if(setTagsComponents && tagsComponents)
    addTagComponent({
      value: newValue instanceof File ? newValue.name : "",
      type: fieldName, 
      setTagsComponents: setTagsComponents, 
      tagsComponents: tagsComponents, 
      setFormDataMedia: setFormDataArray,
      img: imageUrl,
      });
    return {
      ...prevState,
      [fieldName]: [{ name: newValue}],
    };
    } else {
      if(setTagsComponents && tagsComponents)
      addTagComponent({
        value: newValue instanceof File ? newValue.name : "",
        type: fieldName, 
        setTagsComponents: setTagsComponents, 
        tagsComponents: tagsComponents, 
        setFormDataMedia: setFormDataArray,
        img: imageUrl,
        });
      return {
        ...prevState,
        [fieldName]: [{ name: newValue}],
      };
    }
    }
   });
};  