import { ref, computed, watch } from 'vue';
import { useToast } from 'primevue/usetoast';
import useData from '@/service/FetchData/FetchDataAPI.js';
const { getRequest, errorResponseAPI } = useData();

export function useActions(endpoint) {
    
    const titleDialog = ref('Action');
    const messageDialog = ref('');
    const status_id_Action = ref();
    const flagDialog = ref(false);
    const itemsActions = ref([]);

    const getItems = async (id) => {
        try {
            const finalId = id !== undefined ? id : 0; // Use `1` as the default ID if `id` is undefined

            const response = await getRequest(`${endpoint}/${finalId}`);
            
            itemsActions.value = [];

            // Check if response data is valid and contains the expected data structure
            if (response && response.data && Array.isArray(response.data.data) && response.data.data.length > 0) {
                // Sort the data array by priority before processing
                const sortedData = response.data.data.sort((a, b) => a.priority - b.priority);

                // Populate itemsActions with sorted data
                sortedData.forEach((element) => {
                    if (element.flow_status === true) {
                        const name = element.workflow_status.name.toLowerCase();
                        let icon = 'pi pi-refresh';
                        let severity = 'secondary';

                        if (name.includes('approve') || name.includes('done') || name.includes('finish') || name.includes('complet')) {
                            icon = 'pi pi-check-circle';
                            severity = 'success';
                        } else if (name.includes('cancel') || name.includes('reject') || name.includes('deny') || name.includes('delete')) {
                            icon = 'pi pi-times-circle';
                            severity = 'danger';
                        } else if (name.includes('process') || name.includes('running') || name.includes('start')) {
                            icon = 'pi pi-play-circle';
                            severity = 'info';
                        } else if (name.includes('warn') || name.includes('review') || name.includes('check')) {
                            icon = 'pi pi-exclamation-circle';
                            severity = 'warning';
                        }

                        itemsActions.value.push({
                            label: element.workflow_status.name,
                            icon: icon,
                            severity: severity,
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
            
            return response.data;
        } catch (error) {
            errorResponseAPI(error);
        }
    };

    // const getItems = async (id) => {
    //     try {
    //         let response;

    //         // Choose the right endpoint
    //         if (id === "non-flow") {
    //             response = await getRequest(`${endpoint}/`);
    //             
    //         } else {
    //             const finalId = id !== undefined ? id : 1;
    //             response = await getRequest(`${endpoint}/${finalId}`);
    //         }

    //         itemsActions.value = [];

    //         if (response && response.data && Array.isArray(response.data)) {
    //             if (id === "non-flow") {
    //                 // Handle non-flow data
    //                 response.data.forEach(element => {
    //                     
    //                     itemsActions.value.push({
    //                         label: element.name,
    //                         icon: 'pi pi-check',
    //                         style: { backgroundColor: element.color },
    //                         command: () => {
    //                             titleDialog.value = `${element.name} Action`;
    //                             messageDialog.value = `Are you sure you want to mark this action as ${element.name}?`;
    //                             status_id_Action.value = element.id;
    //                             flagDialog.value = true;
    //                         }
    //                     });
    //                 });
    //             } else {
    //                 // Handle flow data
    //                 const sortedData = response.data.data.sort((a, b) => a.priority - b.priority);
    //                 sortedData.forEach(element => {
    //                     if (element.flow_status === true) {
    //                         itemsActions.value.push({
    //                             label: element.workflow_status.name,
    //                             icon: 'pi pi-refresh',
    //                             command: () => {
    //                                 titleDialog.value = `${element.workflow_status.description} Action`;
    //                                 messageDialog.value = `Are you sure you want to mark this action as ${element.workflow_status.name}?`;
    //                                 status_id_Action.value = element.flow_statuses_id;
    //                                 flagDialog.value = true;
    //                             }
    //                         });
    //                     }
    //                 });
    //             }
    //         }

    //         
    //         return response.data;
    //     } catch (error) {
    //         errorResponseAPI(error);
    //     }
    // };

    const save = () => { };

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
