
export default function useRestrictionUnitTypes() {
  const conditionsUnitType = {
    name: { 
      label: "Descripcion",
      typeData: "text", 
      validation: "uppercase", 
      typeDataForm: "InputText", 
      fieldName: "name" 
    
    },
    code: { 
    label: "Código", 
    typeData: "text", 
    validation: "capitalcase", 
    typeDataForm: "InputText", 
    fieldName: "code" 
  
  },
    created_at: { 
    label: "Fecha de creación", 
    typeData: "text", 
    validation: "capitalcase", 
    typeDataForm: "Calendar", 
    fieldName: "created_at" },
    
  };

  return { conditionsUnitType };
}