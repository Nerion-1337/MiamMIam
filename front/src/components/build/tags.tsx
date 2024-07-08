// BUILDER
import Tag from "#components/build/global/tag";
// COMPONENTS
import {removeFromFormDataArray} from "#components/formData"
// REACT
import { Dispatch, SetStateAction } from 'react';
// TYPAGE
import { api, addTags } from "#0_types/typages";
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
        return tagValue !== valueToRemove || tagType !== typeToRemove 
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
    setFormDataArray: Dispatch<SetStateAction<{ [key: string]: api[] }>>,
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
// CREATION DE TAGS
export const addTagComponent = ({
    value, 
    type, 
    number,
    setTagsComponents,
    tagsComponents,
    setFormDataArray,
    setFormDataMedia,
    variant,
    quantite,
    img, 
    }: addTags) => {
    const newTagComponent = (
      <Tag
        value={value}
        type={type}
        number={number}
        quantite={quantite}
        fonction={addQuantityToElement}
        close={removeFromFormDataArray}
        formData={setFormDataMedia ? setFormDataMedia : setFormDataArray}
        tagComponent={setTagsComponents}
        key={value}
        variant={variant ? variant : "1"}
        img={img}
      />
    );
    setTagsComponents(prevTagsComponents => [...prevTagsComponents, newTagComponent]);
  }