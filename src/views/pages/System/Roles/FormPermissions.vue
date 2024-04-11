<script setup>
import { ref, onMounted } from 'vue';
import { useToast } from 'primevue/usetoast';
import useDataAPI from '@/composables/DataAPI/FetchDataAPI.js';

let endpoint = ref('/roles');
const toast = useToast();
const picklistValue = ref(null);
const emit = defineEmits([]);
const { putResponseAPI } = useDataAPI();

const props = defineProps({
    data: { type: Object },
    permiss: { type: Object }
});

onMounted(async () => {
    picklistValue.value = [props.permiss, props.data.permissions];
});

const savePermiss = async () => {
    const dataJson = ({
        name: props.data.name,
        permissions: picklistValue.value[1].map(item => ({ id: item.id }))
    });
    console.log('data', dataJson);
    const restp = await putResponseAPI(dataJson, endpoint.value, props.data.id);
    console.log('data', restp);
    toast.add({ severity: restp.ok ? 'success' : 'error', summary: 'Update User ' + props.data.name, detail: restp.ok ? "Acualizado" : "Error: ", life: 3000 });
    emit('update', { update: true });
};

</script>
<template>
    <div class="p-3">
        <Toolbar>
            <template #start>
                <label class="font-medium">Orders for <b>{{ props.data.name }}</b></label>
                <Divider layout="vertical" />
                <label class="font-medium">Name: <b>{{ props.data.name }}</b></label>
                <Divider layout="vertical" /> 
                <label class="font-medium">ID: <b>{{ props.data.id }}</b></label>
            </template>
            <template #end>
                <Button label="Save" icon="pi pi-save" class="p-button-success ml-3" @click="savePermiss" />
            </template>
        </Toolbar>
        <div class="field mt-4">
            <PickList v-model="picklistValue" listStyle="height:250px" dataKey="id">
                <template #sourceheader> From </template>
                <template #targetheader> To </template>
                <template #item="slotProps">
                    <div>{{ slotProps.item.name }}</div>
                </template>
            </PickList>
        </div>
    </div>
</template>