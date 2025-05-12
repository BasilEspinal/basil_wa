import { ref } from 'vue';
export default function useEmployeesParameters() {
    const conditionalColumns = {
        columns: ['document', 'first_name', 'last_name', , 'gender_id', 'email', 'document_type', 'bank_account_number']
    };
    return { conditionalColumns };
}
