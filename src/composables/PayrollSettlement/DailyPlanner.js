import { ref, computed, watch } from 'vue';
import { useToast } from 'primevue/usetoast';
import useData from '@/service/FetchData/FetchDataAPI.js';
const { getRequest, errorResponseAPI } = useData();

export function useMenuItems() {
    const titleDialog = ref('Settlement');
    const messageDialog = ref('');
    const status_idSettlement = ref();
    const flagDialog = ref(false);
    const items = ref([]);
    const getItems = async (id) => {
        try {
            const response = await getRequest(`/processflow/PlannerTask/${id}`);
            items.value = [];
            // Check if response data is valid and contains the expected data structure
            if (response && response.data && Array.isArray(response.data.data) && response.data.data.length > 0) {
                response.data.data.forEach((element) => {
                    if (element.flow_status === true) {
                        console.log(element);
                        items.value.push({
                            label: element.workflow_status.name,
                            icon: 'pi pi-refresh',
                            command: () => {
                                titleDialog.value = `${element.workflow_status.description} Settlement`;
                                messageDialog.value = `Are you sure you want to mark this settlement as ${element.workflow_status.name}?`;
                                status_idSettlement.value = element.flow_statuses_id;
                                flagDialog.value = true;
                            }
                        });
                    }
                    console.log('Entro');
                });
            } else {
                console.log('No data returned from API');
            }
            console.log(items.value);

            return response.data;
        } catch (error) {
            errorResponseAPI(error);
        }
    };

    const save = () => {};

    return {
        items,
        save,
        getItems,
        flagDialog,
        titleDialog,
        messageDialog,
        status_idSettlement
    };
}
