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


const documentFrozen = ref(false); change name field 
<DataTable id="tblData"
     -->
<template>
    <div>
        <div class="card">
            <div>
                <h1 v-if="!ability.can('menux', 'comercialx')">{{ $t('menu.shipping.shippingProcess') }}</h1>
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
