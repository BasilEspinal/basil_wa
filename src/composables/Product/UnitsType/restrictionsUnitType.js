
export default function useRestrictionUnitTypes() {
  const conditionsUnitType = {
    name: { label: "name", typeData: "text", validation: "uppercase", typeDataForm: "inputText", fieldName: "Name" },
    code: { label: "code", typeData: "text", validation: "capitalcase", typeDataForm: "inputText", fieldName: "Code" }
  };

  return { conditionsUnitType };
}