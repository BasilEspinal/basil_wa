import { ref, computed } from 'vue';
import { useToast } from 'primevue/usetoast';

export function useMenuItems() {
    const toast = useToast();
    const currentState = ref('');  // Track the current state
    const titleDialog = ref('Settlement');
    const messageDialog = ref('');
    const status_idSettlement = ref();
    const flagProgress = ref(false);
    const flagClose = ref(false);
    const flagValidate = ref(false);
    const flagLiquidate = ref(false);

    // Computed properties to determine if buttons should be enabled
    const canProgress = computed(() => currentState.value === '');
    const canClose = computed(() => currentState.value === 'IN_PROGRESS');
    const canValidate = computed(() => currentState.value === 'CLOSED');
    const canLiquidate = computed(() => currentState.value === 'VALIDATED');

    const items = ref([
        {
            label: 'In progress',
            icon: 'pi pi-refresh',
            command: () => {
                if (!canProgress.value) return;
                titleDialog.value = 'In Progress Settlement';
                messageDialog.value = 'Are you sure you want to mark this settlement as In Progress?';
                currentState.value = 'IN_PROGRESS';  // Update the current state
                flagClose.value = false;
                flagLiquidate.value = false;
                flagValidate.value = false;
                flagProgress.value = true;
                status_idSettlement.value = 9;
                toast.add({ severity: 'success', summary: 'Updated', detail: 'Settlement marked as In Progress', life: 3000 });
            },
            disabled: computed(() => !canProgress.value)  // Disable if not allowed
        },
        {
            label: 'Close',
            icon: 'pi pi-times',
            command: () => {
                if (!canClose.value) return;
                titleDialog.value = 'Close Settlement';
                messageDialog.value = 'Are you sure you want to close this settlement?';
                currentState.value = 'CLOSED';  // Update the current state
                flagLiquidate.value = false;
                flagValidate.value = false;
                flagProgress.value = false;
                flagClose.value = true;
                status_idSettlement.value = 10;
                toast.add({ severity: 'warn', summary: 'Closed', detail: 'Settlement CLOSED', life: 3000 });
            },
            disabled: computed(() => !canClose.value)  // Disable if not allowed
        },
        {
            label: 'Validate',
            icon: 'pi pi-check',
            command: () => {
                if (!canValidate.value) return;
                titleDialog.value = 'Validate Settlement';
                messageDialog.value = 'Are you sure you want to validate this settlement?';
                currentState.value = 'VALIDATED';  // Update the current state
                flagLiquidate.value = false;
                flagProgress.value = false;
                flagClose.value = false;
                flagValidate.value = true;
                status_idSettlement.value = 11;
                toast.add({ severity: 'success', summary: 'VALIDATED', detail: 'Settlement VALIDATED', life: 3000 });
            },
            disabled: computed(() => !canValidate.value)  // Disable if not allowed
        },
        { 
            label: 'Liquidate',
            icon: 'pi pi-send',
            command: () => {
                if (!canLiquidate.value) return;
                titleDialog.value = 'Liquidate Settlement';
                messageDialog.value = 'Are you sure you want to liquidate this settlement?';
                currentState.value = 'LIQUIDATED';  // Update the current state
                flagProgress.value = false;
                flagClose.value = false;
                flagValidate.value = false;
                flagLiquidate.value = true;
                status_idSettlement.value = 12;
                toast.add({ severity: 'success', summary: 'LIQUIDATED', detail: 'Settlement LIQUIDATED', life: 3000 });
            },
            disabled: computed(() => !canLiquidate.value)  // Disable if not allowed
        }
    ]);

    const save = () => {
        toast.add({ severity: 'success', summary: 'Success', detail: 'Data Saved', life: 3000 });
    };

    return {
        items,
        save,
        flagProgress,
        flagClose,
        flagValidate,
        flagLiquidate,
        titleDialog,
        messageDialog,
        currentState,
        status_idSettlement
    };
}
