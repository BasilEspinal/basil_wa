import {
    ref
  } from 'vue';
  export default function useRestrictionProductsTypes() {
  
    const conditionsProductsTypes = {
      slug: {
        label: "Code Id",
        typeData: "text",
        validation: "capitalcase",
        typeDataForm: "inputText",
        fieldName: "code",
      },
      name: {
        label: "Description",
        typeData: "text",
        validation: "uppercase",
        typeDataForm: "inputText",
        fieldName: "name",
      },
     
    }
    return { conditionsProductsTypes };
  };
  
  
  