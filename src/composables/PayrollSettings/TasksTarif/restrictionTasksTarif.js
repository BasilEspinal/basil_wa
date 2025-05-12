import { ref } from 'vue';
export default function useRestrictionTasksTarifs() {
    const conditionsTasksTarifs = {
        type_date: {
            label: 'Tarif Type',
            typeData: 'text',
            validation: 'capitalcase',
            typeDataForm: 'inputText',
            fieldName: 'type_date'
        },
        type_price: {
            label: 'Price Type',
            typeData: 'text',
            validation: 'uppercase',
            typeDataForm: 'inputText',
            fieldName: 'type_price'
        },
        price_tarif: {
            label: 'Price',
            typeData: 'number',
            validation: 'uppercase',
            typeDataForm: 'inputText',
            fieldName: 'price_tarif'
        },
        tasks_of_type_id: {
            label: 'task type',
            typeData: 'number',
            validation: 'uppercase',
            typeDataForm: 'inputText',
            fieldName: 'tasks_of_type_id'
        },
        packing_type_id: {
            label: 'Packing Type',
            typeData: 'number',
            validation: 'uppercase',
            typeDataForm: 'inputText',
            fieldName: 'packing_type_id'
        }
    };
    return { conditionsTasksTarifs };
}
