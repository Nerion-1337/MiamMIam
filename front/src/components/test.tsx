//
// AJOUTE ELEMENT CONTENU DANS formData
const handleChange = (fieldName: string, newValue: string) => {
    setFormData((prevState) => {
        return { ...prevState, [fieldName]: newValue };
      });
  };
  //
  // AJOUTE ELEMENT CONTENU DANS formDataArray
  const handleChangeArray = (fieldName: string, newValue: string, number: boolean) => {
    setFormDataArray((prevState) => {
      const keyExists = Object.keys(prevState).includes(fieldName);
  
      if (keyExists) {
        const isValuePresent = prevState[fieldName].some((item) => item.name === newValue);
  
        if (!isValuePresent) {
          const newItem: api = { name: newValue };
          const updatedField = {
            ...prevState,
            [fieldName]: [...prevState[fieldName], newItem],
          };
          addTagComponent(newValue, fieldName, number);
          return updatedField;
        }
      } else {
        addTagComponent(newValue, fieldName, number);
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
  const removeFromFormDataArray = (fieldName: string, elementToRemove: string) => {
    setFormDataArray((prevState) => {
      const fieldData = prevState[fieldName];
      if (fieldData) { 
        const updatedField = {
          ...prevState,
          [fieldName]: fieldData.filter((element) => element.name !== elementToRemove),
        };
        removeTagComponent(elementToRemove, fieldName)
        return updatedField;
      }
      return prevState;
    });
  };
  //
  // SUPPRIME TAG
  const removeTagComponent = (valueToRemove: string, typeToRemove: string) => {
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
  const addQuantityToElement = (fieldName: string, elementName: string, quantity: string) => {
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
  const addTagComponent = (value: string, type: string, number: boolean) => {
    const newTagComponent = (
      <Tag
        value={value}
        type={type}
        number={number}
        fonction={addQuantityToElement}
        close={removeFromFormDataArray}
        key={tagsComponents.length}
      />
    );
    setTagsComponents([...tagsComponents, newTagComponent]);
  }