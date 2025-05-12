export default function useRestrictionVarieties() {
    const conditionsVarieties = {
        name: {
            label: 'Description',
            typeData: 'text',
            validation: 'uppercase',
            typeDataForm: 'InputText',
            fieldName: 'name'
        },
        code: {
            label: 'Code Id',
            typeData: 'text',
            validation: 'capitalcase',
            typeDataForm: 'InputText',
            fieldName: 'code'
        }
    };
    return {
        conditionsVarieties
    };
}
