<script setup>
import ability from '@/service/ability.js';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import Recevings from './Recevings.vue';
import Shipping from './Shipping.vue';
import Discrepancies from './Discrepancies.vue';
const tabs = ref([
    { title: 'Shippings', content: 'Shippings Content', value: '0' },
    { title: 'Receivings 2', content: 'Recevings Content', value: '1' },
    { title: 'Differences', content: 'Difference Content', value: '2' }
]);

const { t } = useI18n();
</script>

<!-- 
filterDisplay="menu"
v-model:filters="filters"
:globalFilterFields="['', 'company.name']"


const documentFrozen = ref(true); change name field 
<DataTable id="tblData"
     -->
<template>
    <div>
        <div class="card mb-4 bg-primary-reverse border-round-xl shadow-2">
            <div class="flex align-items-center justify-content-between p-3">
                <div class="flex align-items-center gap-3">
                    <div class="bg-primary-50 p-3 border-round-circle">
                        <i class="pi pi-directions text-primary text-3xl"></i>
                    </div>
                    <div>
                        <h1 class="m-0 text-3xl font-bold tracking-tight">Proceso de Despacho</h1>
                        <p class="m-0 text-600 font-medium mt-1">Gestión integral de envíos, recepciones y conciliación de diferencias</p>
                    </div>
                </div>
            </div>
        </div>

        <div>
            <div class="card">
                <TabView>
                    <TabPanel :header="$t('menu.shipping.tabs.shipping')">
                        <Shipping />
                    </TabPanel>
                    <TabPanel :header="$t('menu.shipping.tabs.received')">
                        <Recevings />
                    </TabPanel>

                    <TabPanel :header="$t('menu.shipping.tabs.discrepancies')">
                        <Discrepancies />
                    </TabPanel>
                </TabView>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
