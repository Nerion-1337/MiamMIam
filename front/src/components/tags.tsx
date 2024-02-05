// BUILDER
import Tag from "#components/build/global/tag";
// COMPONENTS
import {removeFromFormDataArray} from "#components/formData"
// REACT
import { Dispatch, SetStateAction } from 'react';
// TYPAGE
import { api } from "#types/typages";

//
//
//
//
//
// SUPPRIME TAG
export const removeTagComponent = (
    valueToRemove: string, 
    typeToRemove: string,
    setTagsComponents: Dispatch<SetStateAction< React.ReactNode[] >>
    ) => {
    setTagsComponents((prevTags) => {
      const updatedTags = prevTags.filter((tagComponent: any) => {
        const tagValue = tagComponent.props?.value;
        const tagType = tagComponent.props?.type;
        return tagValue !== valueToRemove || tagType !== typeToRemove;
      });
      return updatedTags;
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
// LIST DE TAGS
export const addTagComponent = (
    value: string, 
    type: string, 
    number: boolean,
    setTagsComponents: Dispatch<SetStateAction< React.ReactNode[] >>,
    tagsComponents: React.ReactNode[],
    setFormDataArray: Dispatch<SetStateAction<{ [key: string]: api[] }>>, 
    ) => {
    const newTagComponent = (
      <Tag
        value={value}
        type={type}
        number={number}
        fonction={addQuantityToElement}
        close={removeFromFormDataArray}
        formData={setFormDataArray}
        tagComponent={setTagsComponents}
        key={tagsComponents.length}
      />
    );
    setTagsComponents([...tagsComponents, newTagComponent]);
  }