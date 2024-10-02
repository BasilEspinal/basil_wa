<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import UseAppMovil from '@/composables/AppMovil/UseAppMovil.js';
import { useToast } from 'primevue/usetoast';
import UserAppMovil from './UserAppMovil.vue';
import { useI18n } from 'vue-i18n';
import useData from '@/composables/DataAPI/FetchDataAPICopy.js';
import { useLayout } from '@/layout/composables/layout';
import ShippingDelivered from './ShippingDelivered.vue';
import DeliveringDelivered from './DeliveringDelivered.vue';
const { t } = useI18n();
const toast = useToast();
const { getRequest, postRequest, putRequest, deleteRequest } = useData();
const { worksDay } = UseAppMovil();
const { layoutConfig } = useLayout();

const workCenterData = ref(null);
const titulo = ref('');
const totalPrices = ref(null);
const CopanyId = ref(null);
const FarmId = ref(null);
const users = ref(null);
const filterUsers = ref(null);
const data = ref(null);
const holiday = ref('Normal');
const Tarif = ref(null);
const lotes = ref(null);
const search = ref(null);

onMounted(async () => {
    workCenterData.value = JSON.parse(sessionStorage.getItem('accessSessionWorkCenter'));
    CopanyId.value = sessionStorage.getItem('accessSessionCompanyId');
    FarmId.value = sessionStorage.getItem('accessSessionFarmId');
    getData();
    getUsers();
    getHoliday();


    
});



const logoUrl = computed(() => {
    return `layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.png`;
});

const getUsers = async () => {
    const response = await getRequest(`/appmovil/employees?filter[work_center_id]=${workCenterData.value.id}`);
    if (!response.ok) toast.add({ severity: 'error', detail: 'Error' + response.error, life: 3000 });
    users.value = response.data.data ?? null;
    filterUsers.value = response.data.data ?? [];
};

const getData = async () => {
    const response = await getRequest(`/appmovil/tasksplanner?filter[tasks_of_type_id]=${workCenterData.value.taskoftype_id.id}&filter[company_id]=${CopanyId.value}&filter[farm_id]=${FarmId.value}`);
    if (!response.ok) toast.add({ severity: 'error', detail: 'Error' + response.error, life: 3000 });
    data.value = response.data.data[0];
};

const getHoliday = async () => {
    // const response = await getRequest(`/appmovil/calendars?filter[company_id]=${CopanyId.value}&filter[farm_id]=${FarmId.value}`);
    const response = await getRequest(`/appmovil/calendars?filter[company_id]=${CopanyId.value}`);
    if (!response.ok) toast.add({ severity: 'error', detail: 'Error' + response.error, life: 3000 });
    console.log(response.data.data);
    holiday.value = response.data.data.length === 0 ? 'Normal' : 'Festivo';
    console.log(holiday.value);
};

const getTarifa = async () => {
    const { packing_type } = data.value;
    const response = await getRequest(`/appmovil/taskstarif?filter[tasks_of_type_id]=${workCenterData.value.taskoftype_id.id}&filter[packing_type_id]=${packing_type.id}`);
    if (!response.ok) toast.add({ severity: 'error', detail: 'Error' + response.error, life: 3000 });
    Tarif.value = response.data;
};

watch(data, () => {
    titulo.value = workCenterData.value.taskoftype_id.name;
    if (data.value) {
        getTarifa();
        lotes.value = data.value.crop_lots;
    }
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
    <div class="card maxHeightY">
        <div class="flex">
            <div class="w-full">
                <h2>{{ t('appmovil.titulo') }} {{ titulo }}</h2>
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
            <TabPanel>
                <template #header>
                    <div class="flex align-items-center gap-2">
                        <i class="pi pi-user" style="font-size: 1rem" shape="circle" />
                        <span class="font-bold white-space-nowrap">{{ t('appmovil.users') }}</span>
                    </div>
                </template>
                <ScrollPanel class="maxHeightC">
                    <div v-if="filterUsers">
                        <UserAppMovil :dataUsers="filterUsers" :Lote="lotes" :Taridf="Tarif" :diaFestivo="holiday" :data="data" />
                    </div>
                    <div v-else>
                        <div class="flex flex-column align-items-center justify-content-center m-4">
                            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, rgba(255, 30, 60, 0.4) 10%, rgba(33, 150, 243, 0) 40%, rgba(255, 30, 60, 0.4) 80%)">
                                <div class="w-full surface-card py-5 px-5 sm:px-8 flex flex-column align-items-center" style="border-radius: 53px">
                                    <div class="grid flex flex-column align-items-center">
                                        <img :src="logoUrl" alt="logo" class="mb-2 w-4rem flex-shrink-0" />
                                        <h1 class="text-900 font-bold text-3xl mb-1">{{ t('appmovil.usersAvailable') }}</h1>
                                        <img src="/demo/images/error/asset-error.svg" alt="Error" class="mb-4" width="50%" />
                                        <span class="text-700 mb-4">Requested resource is not available.</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ScrollPanel>
            </TabPanel>
            <TabPanel>
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
            <TabPanel>
                <template #header>
                    <div class="flex align-items-center gap-2">
                        <i class="pi pi-cart-plus" style="font-size: 1rem" shape="circle" />
                        <span class="font-bold white-space-nowrap">{{ t('appmovil.envios') }}</span>

                    </div>
                    
                </template>
                <ScrollPanel class="maxHeightC">
                    <ShippingDelivered :data="{name:'Sebastian' }" :batchs="lotes" />
                </ScrollPanel>                    
            </TabPanel>

            <TabPanel>
                <template #header>
                    <div class="flex align-items-center gap-2">
                        <i class="pi pi-cart-plus" style="font-size: 1rem" shape="circle" />
                        <span class="font-bold white-space-nowrap">{{ t('appmovil.received') }}</span>
                    </div>
                </template>
                <ScrollPanel class="maxHeightC">

                    <DeliveringDelivered :data="{name:'Sebastian' }" :batchs="lotes" />
                </ScrollPanel>
            </TabPanel>
        </TabView>
        <Toast />
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
