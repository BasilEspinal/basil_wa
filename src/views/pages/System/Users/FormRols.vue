<script setup>
import { ref, onMounted } from 'vue';
import { useToast } from 'primevue/usetoast';
import useData from '@/composables/DataAPI/FetchDataAPICopy.js';
const { getRequest, putRequest } = useData();

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

const props = defineProps({
    data: { type: Object }
});

onMounted(async () => {
    
    const respRoles = await getRequest('/roles');
    if (!respRoles.ok) toast.add({ severity: 'error', detail: 'Error' + respRoles.error, life: 3000 });
    const rolsList = respRoles.data.data.map((role) => ({ id: role.id, name: role.name })) ?? [];
    console.log(rolsList)
    
    picklistValue.value = [rolsList, props.data.roles];
    
    const respFarms = await getRequest('/farms');
    if (!respFarms.ok) toast.add({ severity: 'error', detail: 'Error' + respFarms.error, life: 3000 });
    Farms.value = respFarms.data.data.map((farm) => ({ id: farm.uuid, name: farm.name }));
    [farm.value] = respFarms.data.data.filter((farm) => farm.name === props.data.farm.name).map((farm) => ({ id: farm.uuid, name: farm.name}));

    const respEmployes = await getRequest('/employees');
    if (!respEmployes.ok) toast.add({ severity: 'error', detail: 'Error' + respEmployes.error, life: 3000 });
    Employees.value = respEmployes.data.data.map((emplo) => ({ id: emplo.uuid, name: emplo.first_name + ' ' + emplo.last_name }));


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
    const dataJson = {
        name: props.data.name,
        // email: picklistValue.value[1].length + props.data.email,
        email: props.data.email,
        farm_uuid: farm.value.id || '8ef93a7b-31bf-4233-af80-481020e9cf97',
        employee_uuid: employe.value.id || '',
        roles: picklistValue.value[1].map((rol) => ({ id: rol.id }))
    };
    const restp = await putRequest(endpoint.value, dataJson, props.data.id);
    toast.add({ severity: restp.ok ? 'success' : 'error', summary: 'Edit', detail: restp.ok ? 'Editado' : restp.error, life: 3000 });
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
                <label class="font-medium">
                Employee Name: 
                <b>
                    {{ props.data.employee.id
                        ? props.data.employee.full_name
                        : 'NULL' 
                    }}
                </b>
                </label>
                <Divider layout="vertical" />
                
            </template>
            <template #end>
                <AutoComplete v-model="farm" inputId="ac" :suggestions="farms" placeholder="Finca" @complete="searchFarms" field="name" dropdown />
                <Divider layout="vertical" />
                <AutoComplete v-model="employe" inputId="ac" :suggestions="employes" placeholder="Employees" @complete="searchEmployees" field="name" dropdown />
                <Button label="Save" icon="pi pi-save" class="p-button-success ml-3" @click="saveRoles" />
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
