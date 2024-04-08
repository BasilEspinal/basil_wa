import {
  ref
} from 'vue';
export default function useRestrictionProducts() {

  const conditionsProducts = {
    slug: {
      label: "Código Producto",
      typeData: "text",
      validation: "capitalcase",
      typeDataForm: "inputText",
      fieldName: "slug",
      
      
      
    },
    name: {
      label: "name",
      typeData: "text",
      validation: "uppercase",
      typeDataForm: "inputText",
      fieldName: "name",
    },
    short_name: {
      label: "short_name",
      typeData: "text",
      validation: "capitalcase",
      typeDataForm: "inputText",
      fieldName: "short_name",
    },
    cultivated: {
      label: "cultivated",
      typeData: "boolean",
      validation: "capitalcase",
      typeDataForm: "InputSwitch",
      fieldName: "cultivated",
      
    },
  }
  return { conditionsProducts };
};


