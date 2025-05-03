import { ref, computed, watch } from 'vue';
import { useToast } from 'primevue/usetoast';
import useData from '@/composables/DataAPI/FetchDataAPICopy.js';
const { getRequest, errorResponseAPI } = useData();

export function useActions(endpoint) {
    
    console.log(endpoint);
    const titleDialog = ref('Action');
    const messageDialog = ref('');
    const status_id_Action = ref();
    const flagDialog = ref(false);
    const itemsActions = ref([]);
    
    const getItems = async (id) => {

        try {
            const finalId = id !== undefined ? id : 1; // Use `1` as the default ID if `id` is undefined
            
    
            const response = await getRequest(`${endpoint}/${finalId}`);
            
            itemsActions.value = [];
            
            // Check if response data is valid and contains the expected data structure
            if (response && response.data && Array.isArray(response.data.data) && response.data.data.length > 0) {
                // Sort the data array by priority before processing
                const sortedData = response.data.data.sort((a, b) => a.priority - b.priority);
                
                // Populate itemsActions with sorted data
                sortedData.forEach(element => {
                    if (element.flow_status === true) {
                    itemsActions.value.push({
                        label: element.workflow_status.name,
                        icon: 'pi pi-refresh',
                        command: () => {
                            titleDialog.value = `${element.workflow_status.description} Action`;
                            messageDialog.value = `Are you sure you want to mark this action as ${element.workflow_status.name}?`;
                            status_id_Action.value = element.flow_statuses_id;
                            flagDialog.value = true; 

                            
                        }
                    });
                }
                });
            } else {
                
            }
            console.log(itemsActions.value);
            return response.data;
        } catch (error) {
            errorResponseAPI(error);
        }
    };
    
    
    

    const save = () => {};

    return {
        itemsActions,
        save,
        getItems,
        flagDialog,
        titleDialog,
        messageDialog,
        status_id_Action
    };
}