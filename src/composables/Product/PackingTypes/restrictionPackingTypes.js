import { ref } from 'vue';
export default function useRestrictionPackingTypes() {
    const conditionsPackingTypes = {
        slug: {
            label: 'Code Id',
            typeData: 'text',
            validation: 'capitalcase',
            typeDataForm: 'inputText',
            fieldName: 'code'
        },
        name: {
            label: 'Description',
            typeData: 'text',
            validation: 'uppercase',
            typeDataForm: 'inputText',
            fieldName: 'name'
        },
        weight_tare: {
            label: 'Tara',
            typeData: 'number',
            validation: 'uppercase',
            typeDataForm: 'InputNumber',
            fieldName: 'weight_tare'
        }
    };
    return { conditionsPackingTypes };
}
