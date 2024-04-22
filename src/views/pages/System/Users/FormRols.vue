<script setup>
import { ref, onMounted } from 'vue';
import { useToast } from 'primevue/usetoast';
import useDataAPI from '@/composables/DataAPI/FetchDataAPI.js';

let endpoint = ref('/users');
const toast = useToast();
const employe = ref([]);
const Employees = ref([]);
const employes = ref([]);
const Farms = ref([]);
const farms = ref([]);
const farm = ref('');
const picklistValue = ref(null);
const emit = defineEmits([]);
const { dataResponseAPI, getAllResponseAPI, putResponseAPI } = useDataAPI();

const props = defineProps({
    data: { type: Object }
});

onMounted(async () => {
    farm.value = props.data.farm.name;
    await getAllResponseAPI('/roles');
    const rolsList = dataResponseAPI.value.data.map(role => (
        {
            id: role.id,
            name: role.name
        }
    )) ?? [];
    picklistValue.value = [rolsList, props.data.roles];
    await getAllResponseAPI('/employees');
    Employees.value = dataResponseAPI.value.data.map(emplo => ({ id: emplo.uuid, name: emplo.first_name + ' ' + emplo.last_name }));
    await getAllResponseAPI('/farms');
    Farms.value = dataResponseAPI.value.data.map(farm => ({ id: farm.uuid, name: farm.name }));
});

const searchEmployees = (event) => {
    setTimeout(() => {
        if (!event.query.trim().length) {
            employes.value = [...Employees.value];
        } else {
            employes.value = Employees.value.filter((employ) => {
                return employ.name.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }
    }, 200);
};

const searchFarms = (event) => {
    setTimeout(() => {
        if (!event.query.trim().length) {
            farms.value = [...Farms.value];
        } else {
            farms.value = Farms.value.filter((fram) => {
                return fram.name.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }
    }, 200);
};

const saveRoles = async () => {
    const dataJson = ({
        name: props.data.name,
        email: picklistValue.value[1].length + props.data.email,
        "farm_uuid": farm.value.id || '8ef93a7b-31bf-4233-af80-481020e9cf97',
        "employee_uuid": employe.value.id || '',
        roles: picklistValue.value[1].map(rol => ({ id: rol.id }))
    });
    console.log('DATA', dataJson);
    const restp = await putResponseAPI(dataJson, endpoint.value, props.data.id);
    console.log(restp)
    toast.add({ severity: restp.ok ? 'success' : 'error', summary: 'Update User ' + props.data.name, detail: restp.ok ? "Acualizado" : "Error: "+ restp.message, life: 3000 });
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
            </template>
            <template #end>
                <AutoComplete v-model="farm" inputId="ac" :suggestions="farms" placeholder="Finca" @complete="searchFarms" field="name" dropdown />
                <Divider layout="vertical" />
                <AutoComplete v-model="employe" inputId="ac" :suggestions="employes" placeholder="Employees" @complete="searchEmployees" field="name" dropdown />
                <Button label="Save" icon="pi pi-save" class="p-button-success ml-3" @click="saveRoles"/>
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