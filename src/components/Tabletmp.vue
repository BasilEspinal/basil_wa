<script>
import { ref, onMounted, onBeforeMount, defineProps, watch, inject } from 'vue';
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import TableService from '@/service/TableService';
import useRestrictionUnitTypes from '@/composables/Product/UnitsType/restrictionsUnitType.js';
import { useToast } from 'primevue/usetoast';

export default {
  props: {
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
    dataGot: {
      type: Object
    }
  },
  setup(props) {

    return {};
  }
};
</script>

<template>
    <div class="col-12 md:col-12">
        <div class="card">
            <h4 v-text="title"></h4>
            <div class="card">
                <h5>¿Cuales columnas quieres ver?</h5>
                <h1>{{ title }}</h1>
                <h2>{{ dataGot }}</h2>
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
