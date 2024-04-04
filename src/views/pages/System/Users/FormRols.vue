<script setup>
import { ref, onMounted } from 'vue';
import { useToast } from 'primevue/usetoast';
import useDataAPI from '@/composables/DataAPI/FetchDataAPI.js';
import PickList from './PickList.vue';

let endpoint = ref('/users');
const toast = useToast();
const employe = ref([]);
const rolesList = ref([]);
const Employees = ref([]);
const employes = ref([]);
const emit = defineEmits([]);
const { dataResponseAPI, getAllResponseAPI, putResponseAPI } = useDataAPI();

onMounted(async () => {
    await getAllResponseAPI('/employees');
    Employees.value = dataResponseAPI.value.data.map(emplo => ({ id: emplo.uuid, name: emplo.first_name + ' ' + emplo.last_name }));
});

const props = defineProps({
    roles: {
        type: Object
    },
    data: {
        type: Object
    }
});

const search = (event) => {
    setTimeout(() => {
        if (!event.query.trim().length) {
            employes.value = [...Employees.value];
        } else {
            employes.value = Employees.value.filter((country) => {
                return country.name.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }
    }, 200);
};

const saveRoles = async () => {
    const dataJson = ({
        name: props.data.name,
        email: props.data.email,
        "farm_id": 1,
        "employee_id": employe.value.id || 1,
        roles: rolesList.value.map(rol => ({ id: rol.id }))
    });
    const restp = await putResponseAPI(dataJson, endpoint.value, props.data.id);
    toast.add({ severity: restp.ok ? 'success' : 'error', summary: 'Update User ' + props.data.name, detail: restp.ok ? "Acualizado" : "Error", life: 3000 });
    emit('update', { update: true });
};

function updateRoles(data) {
    const { list } = data;
    rolesList.value = list;
}

</script>
<template>
    <div class="p-3">
        <Toolbar>
            <template #start>
                <label class="font-medium">Orders for <b>{{ props.data.name }}</b></label>
                <Divider layout="vertical" />
                <label class="font-medium">Name: <b>{{ props.data.name }}</b></label>
                <Divider layout="vertical" />
                <label class="font-medium">Perteneciente a finca: <b>{{ props.data.farm.name }}</b></label>
            </template>

            <template #end>
                <AutoComplete v-model="employe" inputId="ac" :suggestions="employes" placeholder="Employees"
                    @complete="search" field="name" dropdown />
                <Button label="Save" icon="pi pi-save" class="p-button-success ml-3" @click="saveRoles">
                </Button>
            </template>
        </Toolbar>
        <div class="field mt-4">
            <PickList :dataListA="props.roles" :dataListB="data.roles" :id="data.id" @SelectDataListB="updateRoles" />
        </div>
    </div>
</template>