<script setup>
import { ref, computed, onMounted, onUnmounted, watch, onBeforeMount } from 'vue';
import UseAppMovil from '@/composables/AppMovil/UseAppMovil.js';
import { useToast } from 'primevue/usetoast';
import UserAppMovil from './Shared/UserAppMovil.vue';
import { useI18n } from 'vue-i18n';
import { useLayout } from '@/layout/composables/layout';
import { useAppMovilService } from '@/service/appMovil/appMovilService.js';
import ShippingDelivered from './Logistics/ShippingDelivered.vue';
import DeliveringDelivered from './Logistics/DeliveringDelivered.vue';
import ErrorAppMovil from './Shared/ErrorAppMovil.vue';
import ability from '@/service/ability.js';
import { watchEffect } from 'vue';


const errorSummary = ref(false);
const summary = ref();
const plannerErrorMessage = ref('');
////////////////////////////////////////////////////////////
const { t } = useI18n();
const toast = useToast();
const { layoutConfig } = useLayout();


const { refreshSessionState, HOLIDAY, initData, TASK_OF_TYPE, fetchWorkCenter, getUsers, getDataTasksplanner, getInfoEmployees } = useAppMovilService();

const configChecklist = computed(() => [
    { label: t('appmovil.checklist.workCenter'), ok: !!fetchWorkCenter.value },
    { label: t('appmovil.checklist.company'), ok: !!sessionStorage.getItem('accessSessionCompanyId') },
    { label: t('appmovil.checklist.farm'), ok: !!sessionStorage.getItem('accessSessionFarmId') }
]);

const titulo = ref('');

const users = ref(null);
const filterUsers = ref(null);
const dataApp = ref(null);
const holiday = ref('Normal');
const lotes = ref(null);
const search = ref(null);
const userEmployee = ref(localStorage.getItem('accesSessionEmployeeUuid'));

const loading = ref(true); // Initially set to true

const compareStoredDate = () => {
    // Get the stored date from sessionStorage
    const storedDateStr = sessionStorage.getItem('accessSessionDate');

    // Check if the date exists
    if (!storedDateStr) {
        console.log('No date found in sessionStorage.');
        return { condition: false, message: 'No date found in sessionStorage.', dateStored: storedDateStr };
    }

    // Convert stored date string to a Date object
    const storedDate = new Date(storedDateStr);

    // Get the current date (only YYYY-MM-DD)
    const today = new Date();
    const currentDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    // Compare the dates
    if (storedDate.getTime() === currentDate.getTime()) {
        console.log('The stored date is today.');
        return { condition: true, message: 'The stored date is today.', dateStored: storedDateStr };
    } else if (storedDate.getTime() < currentDate.getTime()) {
        console.log('The stored date is in the past.');
        return { condition: false, message: 'The stored date is in the past.', dateStored: storedDateStr, dateGet: currentDate };
    } else {
        console.log('The stored date is in the future.');
        return { condition: false, message: 'The stored date is in the future.', dateStored: storedDateStr };
    }
};

// Example usage

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
    if (!dataApp.value || !dataApp.value.tasks_of_type) {
        console.warn('No se puede ejecutar getDataEmployeesInfo porque dataApp o tasks_of_type es null');
        return;
    }

    const response = await getInfoEmployees(dataApp.value.id, dataApp.value.tasks_of_type.id);

    if (!response.ok) {
        toast.add({ severity: 'error', detail: t('appmovil.toasts.error') + ' ' + response.error, life: 3000 });
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
    functionsData();
    //titulo.value = `Título: ${TASK_OF_TYPE.name || 'Sin nombre'}`;
});
onUnmounted(() => {
    // Reinitialize useAppMovilService() to get fresh data

    titulo.value = '';
    users.value = null;
    filterUsers.value = null;
    dataApp.value = null;
    holiday.value = 'Normal';
    lotes.value = null;
    search.value = null;
    errorSummary.value = false;
    summary.value = null;

    totalTaskQtyTask.value = 0;
    totalTaskTotal.value = 0;
    totalTaskQtyHoraExtra.value = 0;
    totalHoraExtraTotal.value = 0;
    totalTaskQtyLabor.value = 0;
    totalLaborTotal.value = 0;
    totalTaskQtyJournal.value = 0;
    totalJournalTotal.value = 0;
});
watch(TASK_OF_TYPE, (newVal) => {
  if (newVal && newVal.name) {
    titulo.value = t('appmovil.titulo') + ' ' + newVal.name;
  }
  
});

watchEffect(() => {
  if (fetchWorkCenter.value?.taskoftype?.name) {
    titulo.value = t('appmovil.titulo') + ' ' + fetchWorkCenter.value.taskoftype.name;
  }
});

const functionsData = async () => {
    loading.value = true;

    // ✅ Inicializa los datos de sesión
//    await refreshSessionState(); // <--- LLAMAR ESTO ANTES DE initData()


    await initData(); // this refreshes session and loads planner/holiday/type

    

    const response = await getDataTasksplanner();
    if (!response.ok) {
        // Only toast if it's a real API error, otherwise we show the friendly ErrorAppMovil
        if (!response.error.includes('No hay planeación')) {
            toast.add({ severity: 'error', detail: response.error, life: 3000 });
        }
        plannerErrorMessage.value = response.error;
        loading.value = false;
        return;
    }
    plannerErrorMessage.value = '';
    
    console.log('response,',response);

    dataApp.value = response.data;
    lotes.value = dataApp.value?.crop_lots;
    console.log('dataApp.value', dataApp.value);

    await getUser();
    //titulo.value = t('appmovil.titulo') + ' ' + (TASK_OF_TYPE?.name || 'Sin nombre');

    await getDataEmployeesInfo(); // optional if not on summary tab
    loading.value = false;

    console.log('TASK_OF_TYPE:', TASK_OF_TYPE?.id);
    console.log('fetchWorkCenter:', fetchWorkCenter.value);
    console.log('fetchFarmId:', sessionStorage.getItem('accessSessionFarmId'));
    console.log('fetchCompanyId:', sessionStorage.getItem('accessSessionCompanyId'));

    ////////////////////////
};

const logoUrl = computed(() => {
    return `layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.png`;
});

const getUser = async () => {
    const response = await getUsers();
    if (!response.ok) toast.add({ severity: 'error', detail: t('appmovil.toasts.error') + ' ' + response.error, life: 3000 });
    users.value = response.data.ok ?? response.data.data;
    filterUsers.value = response.data.ok ?? response.data.data;
};

const getData = async () => {
    const response = await getDataTasksplanner();

    console.log('response', response);

    if (!response.ok || !response.data || response.data.length === 0) {
        // Handle error if response is not OK or if data is empty
        const errorMessage = response.error ? `Error: ${response.error}` : 'No data received';
        toast.add({ severity: 'error', detail: errorMessage, life: 3000 });

        return false;
    } else {
        // If valid, handle the data as usual
        dataApp.value = response.data;
        console.log('dataApp', dataApp.value);
        return true;
    }
};

watch(dataApp, () => {
    lotes.value = dataApp.value?.crop_lots;
});

watch(search, () => {
    searchUsers();
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

// Function to fetch and update data
const updateData = async () => {
    // const updatedData = await getData(); // Fetch new data from API
    // data.value = updatedData; // Update the reactive data ref
    functionsData();
};

</script>

<template>
    <!-- <pre>{{ compareStoredDate() }}</pre> -->
    <h1 v-if="fetchWorkCenter?.name ">{{ t('appmovil.employeeBelongsTo') }}</h1>
    <h2 v-if="fetchWorkCenter?.name ">{{ titulo}} {{ t('appmovil.department') }} {{ fetchWorkCenter?.name || t('appmovil.loading') }}</h2>

    <h3 v-if="!fetchWorkCenter?.name ">
        
        <ErrorAppMovil :title="t('appmovil.noEmployeeDepartment')" :logo-url="logoUrl" :checklist="configChecklist" />
    </h3>

    <div v-if="loading" class="flex align-items-center justify-content-center" style="height: 100vh">
        <ProgressSpinner />
    </div>
    

    <div v-else-if="dataApp && fetchWorkCenter?.name" class="card maxHeightY">
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
                            <UserAppMovil :dataUsers="filterUsers" :Lote="lotes" :data="dataApp" @update-grandparent-data="updateData" />
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

                                        <!-- <Column header="Cortar" :colspan="4" /> -->
                                    </Row>
                                    <Row>
                                        <Column header="Task" :colspan="2" />
                                        <!-- <Column header="Labor" :colspan="2" />
                <Column header="Journal" :colspan="2" /> -->
                                        <Column header="Hora Extra" :colspan="2" />
                                        <Column header="" :colspan="2" />
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
                        <ShippingDelivered :data="dataApp" :batchs="lotes" @update-grandparent-data="updateData" />
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
                        <DeliveringDelivered :data="dataApp" :batchs="lotes" @update-grandparent-data="updateData" />
                    </ScrollPanel>
                </TabPanel>
            </TabView>
        </div>
        <div v-else>
            <ErrorAppMovil :title="t('appmovil.noemployeeAssigned')" :description="t('appmovil.infonoemployeeAssigned')" :logo-url="logoUrl" />
        </div>
    </div>

    <div v-else>
        <ErrorAppMovil :title="plannerErrorMessage || (t('appmovil.nodataplanner') + ' ' + TASK_OF_TYPE?.name)" :description="t('appmovil.infonodataplanner')" :logo-url="logoUrl" :checklist="configChecklist" v-if="fetchWorkCenter?.name"/>
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
