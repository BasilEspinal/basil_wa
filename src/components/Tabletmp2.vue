<script setup>
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import TableService from '@/service/TableService';
import { onMounted, ref, toRefs, onBeforeMount, defineEmits, watch, inject } from 'vue';
import useRestrictionUnitTypes from '@/composables/Product/UnitsType/restrictionsUnitType.js'
import { useToast } from 'primevue/usetoast';


/**
 * The `const props = defineProps({ ... })` statement is defining the props for the Table component.
 * @param pathApi the path to the API
 * @param title main component title
 * @param jsonDataPath the path to the JSON data
 */
const props = defineProps({
    pathApi: {
        type: String,
        default: ''
    },
    title: {
        type: String,
        default: 'Tabla de registro de corte'
    },
    jsonDataPath: {
        type: String,
        default: 'data'
    },
    dataMod: {
        type: String
    },
    
        dataGot:{
            type: Object
        }
    
});



</script>
<template>
    <div class="col-12 md:col-12">
        <div class="card">
            <h4 v-text="title"></h4>
            <div class="card">
                <h5>¿Cuales columnas quieres ver?</h5>
                <h1>{{ props.title }}</h1>
                <h2>{{ props.dataGot }}</h2>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
::v-deep(.p-datatable-frozen-tbody) {
    font-weight: bold;
}

::v-deep(.p-datatable-scrollable .p-frozen-column) {
    font-weight: bold;
}
</style>