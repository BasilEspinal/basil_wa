<template>
    <div class="card">
        
        <div class="p-fluid formgrid grid">
                        <div class="field col-12 md:col-6">
                            <h4>Trabajo diario de: {{ areawork }}</h4>
                            
                        </div>
                        <div class="field col-12 md:col-6">
                            <h4> Empleado: 
                                <span v-if="selectedEmployee && selectedEmployee.name">
                                    {{ selectedEmployee.name }}
                                </span> 
                                <span v-else>
                                    No selected employee
                                </span>
                            </h4>
                            
                        </div>
        </div>
    
            <TabView class="tabview-custom">
                <TabPanel>
                    <template #header>
                        <div class="flex align-items-center gap-2">
    
                            <!-- Empleado avatar-->
                            <i class="pi pi-user" style="font-size: 2.0rem"></i> 
                            <!-- <span class="font-bold white-space-nowrap">Empleados</span> -->
                            
                        </div>
                    </template>
                    <div class="card flex justify-content-center">
                        <Listbox v-model="selectedEmployee" :options="availableAreaEmployees" optionLabel="name" filter class="w-full sm:w-64 md:w-96 lg:w-128 xl:w-1/2 2xl:w-2/3" listStyle="max-height:250px">
        <template #option="slotProps">
            <div class="flex align-items-center">
                <img :alt="slotProps.option.name" src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png" :class="`flag flag-${slotProps.option.code.toLowerCase()} mr-2`" style="width: 18px" />
                <div>{{ slotProps.option.name }}</div>
            </div>
        </template>
    </Listbox>
    
                    </div>
                </TabPanel>
                <TabPanel>
                    <template #header>
                        <div class="flex align-items-center gap-2">
                            <!-- Trabajo avatar -->
                            <i class="pi pi-wrench" style="font-size: 2.0rem"></i> 
                            
                            <span class="font-bold white-space-nowrap">Trabajo</span>
                        </div>
                    </template>
                    
                    <div class="col-12">
                        
                    <div class="card">
                        <!-- <p>Empleado : {{ data_planner.name_employee }}</p> -->
                        
                        <div class="p-fluid formgrid grid">
                             <div class="field col-12 md:col-6">
                                 <label for="tasktype">Tipo Actividad</label>
                                    <Dropdown  v-model="select_tasks_type" :options="task_type" filter optionLabel="name" placeholder="Select Task"   class="w-full md:w-20rem" />
                            </div>
                            <div class="field col-12 md:col-6">
                                 <label for="cropslots">Lote</label>
                                    <Dropdown  v-model="selected_crops_lots" :options="crops_lots" filter optionLabel="name" placeholder="Select Lots"   class="w-full md:w-20rem" />
                            </div>
                            <div  v-if="select_tasks_type.name !== 'Task'" class="field col-12 md:col-6">
                                 <label for="dones_work">Labor</label>
                                    <Dropdown  v-model="selected_dones_work" :options="dones_work" filter optionLabel="name" placeholder="Select Labor"   class="w-full md:w-20rem" />
                            </div>
                            <div class="field col-12 md:col-6">
                                <label for="quanty">Quanty</label>
                                <InputNumber v-model="quanty" inputId="minmax" :min="1" :max="5" />
                            </div>
                            
                            
                            <div class="field col-12 md:col-6">
                                <label for="weightunit">Peso Aproximado</label>
                                <p>
    
                                    <label for="weightunit">4.0 Kg</label>
                                </p>
                            </div>
                            <div class="field col-12 md:col-3">
                                <label for="priceunit">Precio Unitario</label>
                                <p>
                                    <label for="peso">{{ priceunit }}</label>
                                </p>
                            </div>
                            <div class="field col-12 md:col-3">
                                <label for="priceunit">Precio Total</label>
                                <p>
                                    <label for="peso">{{ quanty*priceunit }}</label>
                                </p>
                            </div>
                            <div class="field col-12">
                                <label for="notas">Notas</label>
                                <Textarea id="address" rows="2" />
                            </div>
                        </div>
                        
                        <div class="field col-12">
                                
                            <Button label="Enviar" icon="pi pi-check" />
                            </div>
                    </div>
                </div>
    
                </TabPanel>
                <TabPanel>
                    <template #header>
                        <div class="flex align-items-center gap-2">
                            <!-- Detalles avatar -->
                            <i class="pi pi-info-circle" style="font-size: 2.0rem"></i> 
                            <!-- <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/onyamalimba.png" shape="circle" /> -->
                            <span class="font-bold white-space-nowrap">Detalles</span>
                        </div>
                    </template>
                    
                    <div>
                    <h4>Supervisor : {{ data_planner.nameSupervisor }}</h4>
                    <div class="p-fluid formgrid grid">
                        <div class="field col-12 md:col-6">
                            <pre>Lote Despacho : {{ data_planner.lot_dispatch }}</pre>
                        </div>
                        <div class="field col-12 md:col-6">
                            <pre>Fecha Planeada :{{ data_planner.planner_date }}</pre>
                        </div>
                        <div class="field col-12 md:col-6">
                            <pre>Producto:{{ data_planner.product_type }}</pre>
                        </div>
                        <div class="field col-12 md:col-6">
                            <pre>Variedad : {{ data_planner.product_variant }}</pre>
                        </div>
                        <div class="field col-12 md:col-6">
                            <pre>Empaque:{{ data_planner.packing_type }}</pre>
                        </div>
                        <div class="field col-12 md:col-6">
                            <pre>Dia laboral : {{ data_planner.day_type }}</pre>
                        </div>
    
                    </div>
    
                
                
    
                
                </div>
                </TabPanel>
                <TabPanel>
                    <template #header>
                        <div class="flex align-items-center gap-2">
                            <!-- Resumen avatar-->
                            <i class="pi pi-bars" style="font-size: 2.0rem"></i> 
                            <!-- <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/ionibowcher.png" shape="circle" /> -->
                            <span class="font-bold white-space-nowrap">Resumen</span>
                            <Badge value="2" />
                        </div>
                    </template>
    
                    
                    <DataTable :value="worksDay" tableStyle="min-width: 50rem">
            <ColumnGroup type="header">
                <Row>
                    <Column header="Empleado" :rowspan="3" />
                    
                </Row>
                <Row>
                    
                    <Column header="Trabajos" :colspan="2" />
                </Row>
                <Row>
                    
                    <Column header="Cantidad" sortable field="lastYearProfit"/>
                    <Column header="Precio" sortable field="thisYearProfit"/>
                </Row>
            </ColumnGroup>
            <Column field="employee" />
    
            <Column field="quantity">
                <template #body="slotProps">
                    {{formatCurrency(slotProps.data.quantity)}}
                </template>
            </Column>
            <Column field="totalPrice">
                <template #body="slotProps">
                    {{formatCurrency(slotProps.data.totalPrice)}}
                </template>
            </Column>
            
            <ColumnGroup type="footer">
                <Row>
                    <Column footer="Totals:" :colspan="1" footerStyle="text-align:left"/>
                    <Column :footer="quantities" />
                    <Column :footer="totalPrices" />
                </Row>
            </ColumnGroup>
        </DataTable>

                </TabPanel>
            </TabView>
        </div>
    
    
    </template>
    
    <script setup>
    import { ref, computed,watch, provide, onBeforeMount, onMounted } from 'vue';
    import useDataAPI from '@/composables/DataAPI/FetchDataAPI.js';
    import { FilterMatchMode, FilterOperator } from 'primevue/api';
    ///Demo  App Movil
    
    const selectedCountry = ref();
    const countries = ref([
        { name: 'Australia', code: 'AU' },
        { name: 'Brazil', code: 'BR' },
        { name: 'China', code: 'CN' },
        { name: 'Egypt', code: 'EG' },
        { name: 'France', code: 'FR' },
        { name: 'Germany', code: 'DE' },
        { name: 'India', code: 'IN' },
        { name: 'Japan', code: 'JP' },
        { name: 'Spain', code: 'ES' },
        { name: 'United States', code: 'US' }
    ]);
    
    
    const selectedEmployee = ref();
    const availableAreaEmployees = ref([
        { name: 'Employee 1', code: 'AU', id:1 },
        { name: 'Employee 2', code: 'BR', id:2 },
        { name: 'Employee 3', code: 'CN', id:3 },
        { name: 'Employee 4', code: 'EG', id:4 },
        { name: 'Employee 5', code: 'FR', id:5 },
        { name: 'Employee 6', code: 'DE', id:6 },
        { name: 'Employee 7', code: 'IN', id:7 },
        { name: 'Employee 8', code: 'JP', id:8 },
        { name: 'Employee 9', code: 'ES', id:9 },
        { name: 'Employee 10', code: 'US', id:10 }
        
        
    ]);
    
    const sales = ref([
        {product: 'Bamboo Watch', lastYearSale: 51, thisYearSale: 40, lastYearProfit: 54406, thisYearProfit: 43342},
        {product: 'Black Watch', lastYearSale: 83, thisYearSale: 9, lastYearProfit: 423132, thisYearProfit: 312122},
        {product: 'Blue Band', lastYearSale: 38, thisYearSale: 5, lastYearProfit: 12321, thisYearProfit: 8500},
        {product: 'Blue T-Shirt', lastYearSale: 49, thisYearSale: 22, lastYearProfit: 745232, thisYearProfit: 65323},
        {product: 'Brown Purse', lastYearSale: 17, thisYearSale: 79, lastYearProfit: 643242, thisYearProfit: 500332},
        {product: 'Chakra Bracelet', lastYearSale: 52, thisYearSale:  65, lastYearProfit: 421132, thisYearProfit: 150005},
        {product: 'Galaxy Earrings', lastYearSale: 82, thisYearSale: 12, lastYearProfit: 131211, thisYearProfit: 100214},
        {product: 'Game Controller', lastYearSale: 44, thisYearSale: 45, lastYearProfit: 66442, thisYearProfit: 53322},
        {product: 'Gaming Set', lastYearSale: 90, thisYearSale: 56, lastYearProfit: 765442, thisYearProfit: 296232},
        {product: 'Gold Phone Case', lastYearSale: 75, thisYearSale: 54, lastYearProfit: 21212, thisYearProfit: 12533}
    ]);
    
    const worksDay = ref([
    {employee: 'Empleado 1', quantity: 54406, totalPrice: 43342},
    {employee: 'Empleado 1', quantity: 54406, totalPrice: 43342},
    {employee: 'Empleado 1', quantity: 54406, totalPrice: 43342},
    ])
    
    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
    };
    
    const lastYearTotal = computed(() => {
        let total = 0;
        for(let sale of sales.value) {
            total += sale.lastYearProfit;
        }
    
        return formatCurrency(total);
    });
    
    const quantities = computed(() => {
        let total = 0;
        for(let workDay of worksDay.value) {
            total += workDay.quantity;
        }
    
        return total;
    });
    const thisYearTotal = computed(() => {
        let total = 0;
        for(let sale of sales.value) {
            total += sale.thisYearProfit;
        }
    
        return formatCurrency(total);
    });
    
    const totalPrices = computed(() => {
        let total = 0;
        for(let workDay of worksDay.value) {
            total += workDay.totalPrice;
        }
    
        return formatCurrency(total);
    });
    
    
    
    
    const data_planner = ref({
    document: 'XXXXXX',
        planner_date: '2024-01-13',
        product_type: 'Albaca',
        product_variant: 'Nufar',
        packing_type: 'Icopor',
        lot_dispatch: '20822-5589',
        name_employee: 'Nombre del empleado',
        nameSupervisor: 'Nombre Supervisor',
        areawork: 'Corta',
        day_type: 'Festivo',
        day_price: 1500.00,
        total_packing: 500
    });
    
    const quanty = ref();
    const pricetotal = ref();
    const priceunit=ref(1850)
    const selected_crops_lots = ref();
    const crops_lots = [
        { name: 'L1', code: 'L1' },
        { name: 'L2', code: 'L2' },
        { name: 'L3', code: 'L3' }
    ];
    
    const select_tasks_type = ref(
        { name: '', code: '' },
    );
    
    const task_type = [
        { name: 'Task', code: 'Task' },
        { name: 'HoraExtra', code: 'HoraExtra' },
        { name: 'Labor Contratista', code: 'Labor' }
    ];
    
    const select_dones_work = ref();
    const dones_work = [
        { name: 'ASEO', code: 'A01' },
        { name: 'CANASTILLA', code: 'A02' },
        { name: 'DESEMSEMILLADA', code: 'A03' },
        { name: 'DESHIERBA', code: 'A04' }
    ];
    
    
    const areawork = ref('Corta');
    
    const onSelectAllChangeItems = (event) => {
        selectedItems.value = event.checked ? items.value.map((item) => item.value) : [];
        selectAll.value = event.checked;
    };
    const onChange = (event) => {
        selectAll.value = event.value.length === items.value.length;
    };
    
    const selectedItems = ref();
    const selectAll = ref(false);
    const items = ref(Array.from({ length: 100000 }, (_, i) => ({ label: `Item #${i}`, value: i })));
    
    //////
    const { getAllResponseAPI, getAllResponseListAPI, totalRecordsResponseAPI, currentPageResponseAPI, linksResponseAPI, postResponseAPI, putResponseAPI, deleteResponseAPI, errorResponseAPI, dataResponseAPI, dataResponseListAPI, statusCode } =
        useDataAPI();
    
    let endpoint = ref('/planner_tasks'); //replace endpoint with your endpoint
    const loading = ref(false);
    
    const size = ref({ label: 'Normal', value: 'normal' });
    const sizeOptions = ref([
        { label: 'Small', value: 'small', class: 'sm' },
        { label: 'Normal', value: 'normal' },
        { label: 'Large', value: 'large', class: 'lg' }
    ]);
    
    onMounted(async () => {
        await loadLazyData();
    });
    
    const filters = ref();
    onBeforeMount(() => {
        initFilters();
    });
    
    const clearFilter = () => {
        initFilters();
    };
    const initFilters = () => {
        filters.value = {
            global: { value: null, matchMode: FilterMatchMode.CONTAINS }
            //xxxx: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            // 'status.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            // 'farm.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            // created_at: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            // updated_at: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        };
    };
    
    const loadLazyData = async (event) => {
        //lazyParams.value = { ...lazyParams.value, first: event?.first || first.value };
    
        await getAllResponseAPI(endpoint.value);
        loading.value = false;
        data_planner.product_type.value=dataResponseAPI.data[0].product.name
    };
    
    const listRowSelect = ref([]);
    const selectedRegisters = ref([]);
    const onRowSelect = (data) => {
        listRowSelect.value = data;
        //assignValues(mode.value)
    };
    //Cut and paste this at the end
    watch(listRowSelect, onRowSelect);
    const onSelectAllChange = () => {
        onRowSelect();
    };
    
    const mode = ref();
    const formDialog = ref(false);
    const deleteDialog = ref(false);
    const headerDialog = ref('');
    const hideDialog = () => {
        formDialog.value = false;
        deleteDialog.value = false;
        recordsDelete.value = [];
        resetValues();
    };
    const resetValues = () => {};
    const assignValues = (modex) => {
        if (modex === 'EDIT') {
        }
        if (modex === 'CLONE') {
        }
    };
    const openNew = () => {
        mode.value = 'NEW';
        resetValues();
        formDialog.value = true;
        headerDialog.value = 'New xxxxxxx record';
    };
    const openEdit = () => {
        mode.value = 'EDIT';
        formDialog.value = true;
        headerDialog.value = 'Edit a xxxxx record';
        assignValues(mode.value);
    };
    const openClone = () => {
        mode.value = 'CLONE';
        headerDialog.value = 'Clone a xxxx record';
        formDialog.value = true;
        assignValues(mode.value);
    };
    let recordsDelete = ref([]);
    const openDelete = () => {
        mode.value = 'DELETE';
        headerDialog.value = 'Delete a xxxxx record';
        resetValues();
        deleteDialog.value = true;
    };
    const openExport = () => {
        mode.value = 'EXPORT';
        headerDialog.value = 'Export a xxxxx record';
        resetValues();
        formDialog.value = true;
    };
    </script>
    
    <style lang="scss" scoped>
    </style>