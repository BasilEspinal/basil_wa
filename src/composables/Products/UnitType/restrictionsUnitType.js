import { ref } from 'vue';
export default function useRestrictionUnitTypes() {
    const conditionsUnitType = [
        { label: "name", typeData: "text" },
        { label: "code", typeData: "number" }
      ];
    return{conditionsUnitType}
}