<script setup>
import { ref, onMounted, watch } from 'vue';
import { useToast } from 'primevue/usetoast';
import useDataAPI from '@/composables/DataAPI/FetchDataAPI.js';
import useData from '@/composables/DataAPI/FetchDataAPICopy.js';

let endpoint = ref('/roles');
const { getRequest } = useData();
const toast = useToast();
const picklistValue = ref([[], []]);
const emit = defineEmits([]);
const { putResponseAPI } = useDataAPI();
const search = ref(null);
const filterPermiss = ref(null);
const isLoaded = ref(false);
const props = defineProps({
    data: { type: Object }
});

onMounted(async () => {
    searchPermisRol();
    
});

watch(search, () => {
    searchPermis();
});

async function searchPermisRol() {
    const restp = await getRequest(`/permissions/without-roles/${props.data.id}`);
    toast.add({ severity: restp.ok ? 'success' : 'error', summary: 'Permissions were load', detail: restp.ok ? 'Permissions were load' : restp.error, life: 3000 });
    const listaDeObjetos = [];
    if (restp.ok) {
        for (const clave in restp.data) {
            listaDeObjetos.push({ id: clave, name: restp.data[clave] });
        }
    }
    picklistValue.value = [listaDeObjetos, props.data.permissions];
    filterPermiss.value = [listaDeObjetos, props.data.permissions];
}

function searchPermis() {
    if (search.value) {
        filterPermiss.value[0] = picklistValue.value[0].filter((perm) => perm.name.toLowerCase().includes(search.value.toLowerCase()));
    } else {
        filterPermiss.value[0] = picklistValue.value[0];
    }
}

watch(filterPermiss, () => {

        savePermiss();


});
const savePermiss = async () => {
    const dataJson = {
        name: props.data.name,
        // aqui habia picklistValue.value[1] pero no se que es
        permissions: filterPermiss.value[1].map((item) => ({ id: item.id }))
    };
    const restp = await putResponseAPI(dataJson, endpoint.value, props.data.id);
    console.log('picklistValue', picklistValue.value[1]);
    console.log('dataJson', dataJson);
    console.log('restp', restp);
    toast.add({ severity: restp.ok ? 'success' : 'error', summary: 'Update User ' + props.data.name, detail: restp.ok ? 'Acualizado' : 'Error: ', life: 3000 });
    emit('update', { update: true });
};
</script>
<template>
    <div class="p-3">
        <Toolbar>
            <template #start>
                <label class="font-medium"
                    >Orders for <b>{{ props.data.name }}</b></label
                >
                <Divider layout="vertical" />
                <label class="font-medium"
                    >Name: <b>{{ props.data.name }}</b></label
                >
                <Divider layout="vertical" />
                <label class="font-medium"
                    >ID: <b>{{ props.data.id }}</b></label
                >
            </template>
            <template #end>
                <Button label="Save" icon="pi pi-save" class="p-button-success ml-3" @click="savePermiss" />
            </template>
        </Toolbar>
        <div class="field mt-4">
            <PickList v-model="filterPermiss" listStyle="height:250px" dataKey="id">
                <template #sourceheader>
                    <div class="flex gap-2">
                        <div class="w-full justify-content-center">From</div>
                        <div class="p-inputgroup">
                            <InputText id="search" v-model="search" placeholder="Filter" size="small" />
                            <Button class="p-inputgroup-addon" @click="searchPermis" label="Filter" size="small" />
                        </div>
                    </div>
                </template>
                <template #targetheader> To </template>
                <template #item="slotProps">
                    <div>{{ slotProps.item.name }}</div>
                </template>
            </PickList>
        </div>
    </div>
</template>
