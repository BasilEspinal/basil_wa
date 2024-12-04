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
            
            const response = await getRequest(`${endpoint}`);
            console.log(response);
            itemsActions.value = [];
            // Check if response data is valid and contains the expected data structure
            if (response && response.data && Array.isArray(response.data.data) && response.data.data.length > 0) {
                response.data.data.forEach(element => {
                    
                    //if (element.flow_status === !true) {
                        
                        itemsActions.value.push({
                            label: element.name,
                            icon: 'pi pi-refresh',
                            command: () => {
                                titleDialog.value = `${element.description} Action`;
                                messageDialog.value = `Are you sure you want to mark this action as ${element.name}?`;
                                status_id_Action.value = element.id;
                                flagDialog.value = true; 
                            }
                        });
                    //}
                    
                });
            } else {
                
                console.log('No data returned from API');
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