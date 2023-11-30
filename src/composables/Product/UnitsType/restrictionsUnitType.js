import { ref } from 'vue';
export default function useRestrictionUnitTypes() {
    const conditionsUnitType = [
        { label: "name", typeData: "text",validation:"uppercase",typeDataForm:"inputText", fieldName: "Name" },
        { label: "code", typeData: "text",validation:"capitalcase",typeDataForm:"inputText", fieldName: "Code" }
      ];
    return{conditionsUnitType}
}