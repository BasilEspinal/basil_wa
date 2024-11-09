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
//
// Estoy utilizando otro servicio para el CRUD
import StackErrors from '@/service/StackErrors.js';
const stack = new StackErrors();
const errorSummary = ref(false);
const summary = ref();
////////////////////////////////////////////////////////////
const { t } = useI18n();
const toast = useToast();
const { worksDay } = UseAppMovil();
const { layoutConfig } = useLayout();

const { HOLIDAY, initData, TASK_OF_TYPE, getUsers, getDataTasksplanner,getInfoEmployees } = useAppMovilService();

const titulo = ref('');
const users = ref(null);
const filterUsers = ref(null);
const dataApp = ref(null);
const holiday = ref('Normal');
const lotes = ref(null);
const search = ref(null);
const userEmployee = ref(localStorage.getItem('accesSessionEmployeeUuid'));
const loading = ref(true); // Initially set to true

const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};
const totalTaskQtyTask = ref(0);
const totalTaskTotal = ref(0);
const totalTaskQtyHoraExtra = ref(0);
const totalHoraExtraTotal = ref(0);
const totalTaskQtyLabor = ref(0);
const totalLaborTotal = ref(0);
const totalTaskQtyJournal = ref(0);
const totalJournalTotal = ref(0);

const getDataEmployeesInfo = async () => {
    const response = await getInfoEmployees(dataApp.value.id, dataApp.value.tasks_of_type.id);

    if (!response.ok) {
        toast.add({ severity: 'error', detail: 'Error' + response.error, life: 3000 });
        errorSummary.value = true;
    }
    summary.value = response.data.data;

    totalTaskQtyTask.value = computed(() => {
        let total = 0;
        for (let item of summary.value) {
            total += parseFloat(item.task_qty_task) || 0;
        }
        return total;
    });

    totalTaskTotal.value = computed(() => {
        let total = 0;
        for (let item of summary.value) {
            total += parseFloat(item.total_task) || 0;
        }
        return total;
    });

    totalTaskQtyHoraExtra.value = computed(() => {
        let total = 0;
        for (let item of summary.value) {
            total += parseFloat(item.task_qty_hora_extra) || 0;
        }
        return total;
    });

    totalHoraExtraTotal.value = computed(() => {
        let total = 0;
        for (let item of summary.value) {
            total += parseFloat(item.total_hora_extra) || 0;
        }
        return total;
    });

    totalTaskQtyLabor.value = computed(() => {
        let total = 0;
        for (let item of summary.value) {
            total += parseFloat(item.task_qty_labor) || 0;
        }
        return total;
    });

    totalLaborTotal.value = computed(() => {
        let total = 0;
        for (let item of summary.value) {
            total += parseFloat(item.total_labor) || 0;
        }
        return total;
    });

    totalTaskQtyJournal.value = computed(() => {
        let total = 0;
        for (let item of summary.value) {
            total += parseFloat(item.task_qty_journal) || 0;
        }
        return total;
    });

    totalJournalTotal.value = computed(() => {
        let total = 0;
        for (let item of summary.value) {
            total += parseFloat(item.total_journal) || 0;
        }

        return total;
    });
};

onBeforeMount(async () => {
    loading.value = true; // Set loading to true when data fetching starts
    await initData();
    getUser();
    await getData();

    // console.log("initData",initData)
    // console.log("TASK_OF_TYPE",TASK_OF_TYPE)
    // console.log("HOLIDAY",HOLIDAY)
    // console.log("TASK_OF_TYPE",TASK_OF_TYPE)
    // console.log("getUsers",getUsers)
    // console.log("getDataTasksplanner",getDataTasksplanner)

    holiday.value = HOLIDAY;
    titulo.value = t('appmovil.titulo') + ' ' + (TASK_OF_TYPE?.name ? TASK_OF_TYPE.name : 'XXXXXXXXXXXXXX');
    loading.value = false; // Set loading to false when data fetching is complete
    //////////////////////////
    //Sebastian
    getDataEmployeesInfo();
    ////////////////////////
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

    if (!response.ok || !response.data || response.data.length === 0) {
        // Handle error if response is not OK or if data is empty
        const errorMessage = response.error ? `Error: ${response.error}` : 'No data received';
        toast.add({ severity: 'error', detail: errorMessage, life: 3000 });

        // Push the failed response to the stack for later processing
        stack.push({ response: response, category: 'Data task planner', description: 'No data available' });

        // Return false to indicate failure
        return false;
    } else {
        // If valid, handle the data as usual
        dataApp.value = response.data;
        return true;
    }
};

watch(dataApp, () => {
    lotes.value = dataApp.value?.crop_lots;
});

watch(search, () => {
    searchUsers();
});

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

const onTabChange = async (event) => {
    if (event.index === 1) {
        await getDataEmployeesInfo();
    }
};
</script>

<template>
    <h2>{{ titulo }}</h2>

    <div v-if="loading" class="flex align-items-center justify-content-center" style="height: 100vh">
        <ProgressSpinner />
    </div>

    <div v-else-if="dataApp" class="card maxHeightY">
        <div v-if="!dataApp.crop_lots">
            <ErrorAppMovil :title="t('appmovil.nolotes')" :description="t('appmovil.infonolotes')" :logo-url="logoUrl" />
        </div>

        <div v-else-if="userEmployee">
            <div class="flex">
                <div class="w-full"></div>
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
            <TabView @tab-change="onTabChange($event)">
                <TabPanel v-if="ability.can('appmovil_users')">
                    <template #header>
                        <div class="flex align-items-center gap-2">
                            <i class="pi pi-user" style="font-size: 1rem" shape="circle" />
                            <span class="font-bold white-space-nowrap">{{ t('appmovil.users') }}</span>
                        </div>
                    </template>
                    <ScrollPanel class="maxHeightC">
                        <div v-if="filterUsers">
                            <UserAppMovil :dataUsers="filterUsers" :Lote="lotes" :data="dataApp" />
                        </div>
                        <div v-else>
                            <ErrorAppMovil :title="t('appmovil.usersAvailable')" description="Requested resource is not available" :logo-url="logoUrl" />
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
                        <!-- <DataTable :value="worksDay">


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
                    </DataTable> -->
                        <div v-if="!errorSummary">
                            <DataTable :value="summary" tableStyle="min-width: 50rem">
                                <ColumnGroup type="header">
                                    <Row>
                                        <Column header="Employees" :rowspan="3" />
                                        <Column header="Type price task" :rowspan="3" />
                                        <Column header="Type Day Tarif" :rowspan="3" />

                                        <Column header="Cortar" :colspan="4" />
                                    </Row>
                                    <Row>
                                        <Column header="Task" :colspan="2" />
                                        <!-- <Column header="Labor" :colspan="2" />
                <Column header="Journal" :colspan="2" /> -->
                                        <Column header="Hora Extra" :colspan="2" />
                                    </Row>
                                    <Row>
                                        <Column header="Quantity" sortable field="task_qty_task" />
                                        <Column header="Total" sortable field="total_task" />

                                        <!-- <Column header="Quantity" sortable field="task_qty_labor"/>
                <Column header="Total" sortable field="total_labor"/>

                <Column header="Quantity" sortable field="task_qty_journal"/>
                <Column header="Total" sortable field="total_journal"/> -->

                                        <Column header="Type price task" :rowspan="3" />
                                        <Column header="Type Day Tarif" :rowspan="3" />

                                        <Column header="Quantity" sortable field="task_qty_hora_extra" />
                                        <Column header="Total" sortable field="total_hora_extra" />
                                    </Row>
                                </ColumnGroup>
                                <Column field="employee.full_name" />
                                <Column field="type_price_task" />
                                <Column field="type_day_tarif" />

                                <Column field="task_qty_task">
                                    <template #body="slotProps">
                                        {{ slotProps.data.task_qty_task }}
                                    </template>
                                </Column>

                                <Column field="total_task">
                                    <template #body="slotProps">
                                        {{ formatCurrency(slotProps.data.total_task) }}
                                    </template>
                                </Column>
                                <!-- 
        <Column field="task_qty_labor">
            <template #body="slotProps">
                {{slotProps.data.task_qty_labor}}
            </template>
        </Column>

        <Column field="total_labor">
            <template #body="slotProps">
                {{formatCurrency(slotProps.data.total_labor)}}
            </template>
        </Column>

        <Column field="task_qty_journal">
            <template #body="slotProps">
                {{slotProps.data.task_qty_journal}}
            </template>
        </Column>

        <Column field="total_journal">
            <template #body="slotProps">
                {{formatCurrency(slotProps.data.total_journal)}}
            </template>
        </Column>

         
-->
                                <Column field="price_task" />
                                <Column field="price_hora_extra" />
                                <Column field="task_qty_hora_extra">
                                    <template #body="slotProps">
                                        {{ slotProps.data.task_qty_hora_extra ? slotProps.data.task_qty_hora_extra : 'Null' }}
                                    </template>
                                </Column>

                                <Column field="total_hora_extra">
                                    <template #body="slotProps">
                                        {{ slotProps.data.total_hora_extra ? formatCurrency(slotProps.data.total_hora_extra) : 'Null' }}
                                    </template>
                                </Column>

                                <ColumnGroup type="footer">
                                    <Row>
                                        <Column footer="Totals:" :colspan="3" footerStyle="text-align:right" />
                                        <Column :footer="totalTaskQtyTask" />
                                        <Column :footer="totalTaskTotal" />
                                        <!-- <Column :footer="totalTaskQtyLabor" />
                <Column :footer="totalLaborTotal" />
                <Column :footer="totalTaskQtyJournal" />
                <Column :footer="totalJournalTotal" /> -->
                                        <Column footerStyle="text-align:right" />
                                        <Column footerStyle="text-align:right" />
                                        <Column :footer="totalTaskQtyHoraExtra" />

                                        <Column :footer="totalHoraExtraTotal" />
                                    </Row>
                                </ColumnGroup>
                            </DataTable>
                        </div>
                        <div v-else>
                            <ErrorAppMovil :title="t('appmovil.nodataplanner')" :description="t('appmovil.infonodataplanner')" :logo-url="logoUrl" />
                        </div>
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
                        <ShippingDelivered :data="dataApp" :batchs="lotes" />
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
                        <DeliveringDelivered :data="dataApp" :batchs="lotes" />
                    </ScrollPanel>
                </TabPanel>
            </TabView>
        </div>
        <div v-else>
            <ErrorAppMovil :title="t('appmovil.noemployeeAssigned')" :description="t('appmovil.infonoemployeeAssigned')" :logo-url="logoUrl" />
        </div>
    </div>

    <div v-else>
        <ErrorAppMovil :title="t('appmovil.nodataplanner') + ' ' + TASK_OF_TYPE?.name" :description="t('appmovil.infonodataplanner')" :logo-url="logoUrl" />
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
