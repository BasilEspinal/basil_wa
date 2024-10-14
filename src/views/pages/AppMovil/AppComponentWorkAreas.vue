<script setup>
import { ref, computed, onMounted, watch, onBeforeMount } from 'vue';
import UseAppMovil from '@/composables/AppMovil/UseAppMovil.js';
import { useToast } from 'primevue/usetoast';
import UserAppMovil from './UserAppMovil.vue';
import { useI18n } from 'vue-i18n';
import { useLayout } from '@/layout/composables/layout';
import { useAppMovilService } from '../../../service/appMovil/appMovilService';
import ShippingDelivered from './ShippingDelivered.vue';
import DeliveringDelivered from './DeliveringDelivered.vue';
import ErrorAppMovil from './ErrorAppMovil.vue';
import ability from '@/service/ability.js';
const { t } = useI18n();
const toast = useToast();
const { worksDay } = UseAppMovil();
const { layoutConfig } = useLayout();

const { HOLIDAY, initData, TASK_OF_TYPE, getUsers, getDataTasksplanner } = useAppMovilService();

const titulo = ref('');
const totalPrices = ref(null);
const users = ref(null);
const filterUsers = ref(null);
const data = ref(null);
const holiday = ref('Normal');
const lotes = ref(null);
const search = ref(null);
const userEmployee = ref(localStorage.getItem('accesSessionEmployeeUuid'));

onBeforeMount(async () => {
    await initData();
    getUser();
    getData();
    holiday.value = HOLIDAY;
    titulo.value = t('appmovil.titulo') + ' ' + (TASK_OF_TYPE?.name ? TASK_OF_TYPE.name : 'XXXXXXXXXXXXXX');
    
    
    

});


const logoUrl = computed(() => {
    return `layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.png`;
});

const getUser = async () => {
    const response = await getUsers();
    if (!response.ok) toast.add({ severity: 'error', detail: 'Error' + response.error, life: 3000 });
    users.value = response.data.ok ?? response.data.data;
    filterUsers.value = response.data.ok ?? response.data.data;
};

const getData = async () => {
    const response = await getDataTasksplanner();
    if (!response.ok) toast.add({ severity: 'error', detail: 'Error' + response.error, life: 3000 });
    data.value = response.data;
    console.log(data.value?data.value:'Anything')
    
};

watch(data, () => {
    
    lotes.value = data.value?.crop_lots;
});


watch(search, () => {
    searchUsers();
});

const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};

const quantities = computed(() => {
    let total = 0;
    for (let workDay of worksDay.value) {
        total += workDay.quantity;
    }
    return total;
});

function searchUsers() {
    if (search.value) {
        filterUsers.value = users.value.filter((user) => user.first_name.toLowerCase().includes(search.value.toLowerCase()));
    } else {
        filterUsers.value = users.value;
    }
}
</script>

<template>
    <h2>{{ titulo }}</h2>
    
    <div v-if="data" class="card maxHeightY">

        <div v-if="userEmployee">
        <div class="flex">
            <div class="w-full">
                
            </div>
            <div>
                <div class="p-inputgroup">
                    <span class="p-float-label">
                        <InputText id="search" v-model="search" />
                        <label class="font-bold">{{ t('appmovil.users') }}</label>
                    </span>
                    <Button class="p-inputgroup-addon" @click="searchUsers" label="Search" />
                </div>
            </div>
        </div>
        <TabView class="tabview-custom">
            <TabPanel v-if="ability.can('appmovil_users')">
                <template #header>
                    <div class="flex align-items-center gap-2">
                        <i class="pi pi-user" style="font-size: 1rem" shape="circle" />
                        <span class="font-bold white-space-nowrap">{{ t('appmovil.users') }}</span>
                    </div>
                </template>
                <ScrollPanel class="maxHeightC">
                    <div v-if="filterUsers">
                        <UserAppMovil :dataUsers="filterUsers" :Lote="lotes" :data="data" />
                    </div>
                    <div v-else>
                        <ErrorAppMovil :title="t('appmovil.usersAvailable')" description="Requested resource is not available" :logo-url="logoUrl"/>

                    </div>
                </ScrollPanel>
            </TabPanel>
            <TabPanel v-if="ability.can('appmovil_summary')">
                <template #header>
                    <div class="flex align-items-center gap-2">
                        <i class="pi pi-bars" style="font-size: 1rem" shape="circle" />
                        <span class="font-bold white-space-nowrap">{{ t('appmovil.resumen') }}</span>
                    </div>
                </template>
                <ScrollPanel class="maxHeightC">
                    <DataTable :value="worksDay">
                        <ColumnGroup type="header">
                            <Row>
                                <Column :header="t('appmovil.empleado')" :rowspan="3" />
                            </Row>
                            <Row>
                                <Column :header="t('appmovil.trabajos')" :colspan="2" />
                            </Row>
                            <Row>
                                <Column :header="t('appmovil.cantidad')" sortable field="lastYearProfit" />
                                <Column :header="t('appmovil.precio')" sortable field="thisYearProfit" />
                            </Row>
                        </ColumnGroup>
                        <Column field="employee" />
                        <Column field="quantity">
                            <template #body="slotProps">
                                {{ formatCurrency(slotProps.data.quantity) }}
                            </template>
                        </Column>
                        <Column field="totalPrice">
                            <template #body="slotProps">
                                {{ formatCurrency(slotProps.data.totalPrice) }}
                            </template>
                        </Column>
                        <ColumnGroup type="footer">
                            <Row>
                                <Column :footer="t('appmovil.total') + ' :'" :colspan="1" footerStyle="text-align:left" />
                                <Column :footer="quantities" />
                                <Column :footer="totalPrices" />
                            </Row>
                        </ColumnGroup>
                    </DataTable>
                </ScrollPanel>
            </TabPanel>


            
            <TabPanel v-if="ability.can('appmovil_shipping_delivered')">
                <template #header>
                    <div class="flex align-items-center gap-2">
                        <i class="pi pi-cart-plus" style="font-size: 1rem" shape="circle" />
                        <span class="font-bold white-space-nowrap">{{ t('appmovil.envios') }}</span>

                    </div>
                    
                </template>
                <ScrollPanel class="maxHeightC">
                    <ShippingDelivered :data="data" :batchs="lotes" />
                </ScrollPanel>                    
            </TabPanel>

            <TabPanel v-if="ability.can('appmovil_delivering_delivered')">
                <template #header>
                    <div class="flex align-items-center gap-2">
                        <i class="pi pi-cart-plus" style="font-size: 1rem" shape="circle" />
                        <span class="font-bold white-space-nowrap">{{ t('appmovil.received') }}</span>
                    </div>
                </template>
                <ScrollPanel class="maxHeightC">

                    <DeliveringDelivered :data="data" :batchs="lotes" />
                </ScrollPanel>
            </TabPanel>
        </TabView>
        <Toast />
    </div>
    <div v-else >
        <ErrorAppMovil :title="t('appmovil.noemployeeAssigned')" :description="t('appmovil.infonoemployeeAssigned')" :logo-url="logoUrl"/>
        </div>
    </div>
    <div v-else >
    <ErrorAppMovil :title="t('appmovil.nodataplanner')" :description="t('appmovil.infonodataplanner')" :logo-url="logoUrl"/>
    
    </div>
</template>

<style lang="scss" scoped>
.maxHeightY {
    height: calc(100vh - 13rem);
}

.maxHeightC {
    height: calc(100vh - 28rem);
}
</style>
