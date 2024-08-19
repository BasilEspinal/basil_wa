<template>
    <div>
        <div class="card">
            <div>
                <h1>{{ titlePage }}</h1>
            </div>
        </div>
        <div class="card">
            <div class="grid">
                <div class="col-xs-12 col-sm-6 col-md-4 mb-2 text-center mx-auto">
                    <!--Uncomment when table is done-->

                    <div class="col-xs-12 col-sm-6 col-md-4 mb-2 text-center mx-auto">
                        <Toolbar style="margin-bottom: 1rem">
                            <template #center>
                                 <Button v-if="ability.can('planeacion_diaria_crear')" :disabled="headerNames.length > 0" label="New" icon="pi pi-plus" class="p-button-success mb-2 mt-2" @click="openNew" size="large" />
                                <Divider v-if="ability.can('planeacion_diaria_crear')" layout="vertical" />
                                <Button
                                    v-if="ability.can('planeacion_diaria_editar')"
                                    :disabled="!(listRowSelect.length > 0 && listRowSelect.length < 2)"
                                    label="Edit"
                                    icon="pi pi-file-edit"
                                    class="p-button-help mb-2 mt-2"
                                    @click="openEdit"
                                    size="large"
                                />
                                <Divider v-if="ability.can('planeacion_diaria_editar')" layout="vertical" />
                                <Button
                                    v-if="ability.can('planeacion_diaria_crear')"
                                    :disabled="!(listRowSelect.length > 0 && listRowSelect.length < 2)"
                                    label="Clone"
                                    icon="pi pi-copy"
                                    class="p-button-secondary mb-2 mt-2"
                                    @click="openClone"
                                    size="large"
                                /> 
                                <Divider v-if="ability.can('planeacion_diaria_crear')" layout="vertical" />
                                <Button v-if="ability.can('planeacion_diaria_editar')" :disabled="headerNames.length > 0" label="Export" icon="pi pi-file-import" class="p-button-warning mb-2 mt-2" @click="openExport" size="large" />
                                <Divider v-if="ability.can('planeacion_diaria_editar')" layout="vertical" />
                                <Button v-if="ability.can('planeacion_diaria_eliminar')" :disabled="!listRowSelect.length > 0" label="Delete" icon="pi pi-trash" class="p-button-danger mb-2 mt-2" @click="openDelete" size="large" />
                                    

                                     <Divider v-if="ability.can('planeacion_diaria_editar')" layout="vertical" />


                            </template>
                        </Toolbar>
                    </div>
                </div>
            </div>


            
            
            <!-- <pre>{{crop_lots_codeV}}</pre>
        <pre>{{ otherTestValue }}</pre>
             -->

            <DataTable
                :value="dataFromComponent"
                dataKey="uuid"
                tableStyle="min-width: 75rem"
                showGridlines
                :loading="loading"
                scrollable
                scrollHeight="600px"
                resizableColumns
                columnResizeMode="expand"
                sortMode="multiple"
                :paginator="true"
                :rows="50"
                :rowsPerPageOptions="[5, 10, 20, 50]"
                :class="`p-datatable-${size.class}`"
                @row-select="onRowSelect(selectedRegisters)"
                @row-unselect="onRowSelect(selectedRegisters)"
                @select-all-change="onSelectAllChange"
                v-model:selection="selectedRegisters"
                filterDisplay="menu"
                v-model:filters="filters"
                :globalFilterFields="[
                    'name',
                    'company.name',
                    'farm.name',
                    'status.name',
                    'created_at',
                    'updated_at',
                    'transaction_date',
                    'tasks_of_type.name',
                    'crop_lots.code',
                    'product.name',
                    'product_type.name',
                    'packing_type.name',
                    'variant.name'
                ]"
                v-if="ability.can('planeacion_diaria_listado')"
            >
                <template #header>
                    <!--Uncomment when filters are done-->

                    <div class="grid">
                <div class="col-xs-12 col-sm-6 col-md-4 mb-2 text-center mx-auto">
            <div class="col-xs-12 col-sm-6 col-md-4 mb-2 text-center mx-auto">
                        <Toolbar style="margin-bottom: 1rem">
                            <template #center>
  

                                <Button 
    v-if="ability.can('planeacion_diaria_eliminar')" 
    :disabled="!listRowSelect.length > 0" 
    label="En progreso" 
    icon="pi pi-check" 
    class="mb-2 mt-2" 
    @click="openDelete" 
    size="large" 
    :style="{ backgroundColor: '#FFC300', borderColor: '#A93226', color: '#ffffff' }"
/>

<Divider v-if="ability.can('planeacion_diaria_editar')" layout="vertical" />
 
<Button 
    v-if="ability.can('planeacion_diaria_eliminar')" 
    :disabled="!listRowSelect.length > 0" 
    label="Liquidar" 
    icon="pi pi-check" 
    class="mb-2 mt-2" 
    @click="openDelete" 
    size="large" 
    :style="{ backgroundColor: '#A93226', borderColor: '#A93226', color: '#ffffff' }"
/>

<Divider v-if="ability.can('planeacion_diaria_editar')" layout="vertical" />
<Button 
    v-if="ability.can('planeacion_diaria_eliminar')" 
    :disabled="!listRowSelect.length > 0" 
    label="Cerrar" 
    icon="pi pi-check" 
    class="mb-2 mt-2" 
    @click="openClose" 
    size="large" 
    :style="{ backgroundColor: '#F39C12', borderColor: '#F39C12', color: '#ffffff' }"
/>







<Divider v-if="ability.can('planeacion_diaria_editar')" layout="vertical" />
<Button 
    v-if="ability.can('planeacion_diaria_eliminar')" 
    :disabled="!listRowSelect.length > 0" 
    label="Validar" 
    icon="pi pi-check" 
    class="mb-2 mt-2" 
    @click="openDelete" 
    size="large" 
    :style="{ backgroundColor: '#D7DBDD', borderColor: '#D7DBDD', color: '#000000' }"
/>

                            </template>
                        </Toolbar>
                    </div>

                </div>
            </div>

                    <Toolbar class="mb-2">
                        <template v-slot:start>
                            
                            <Button type="button" icon="pi pi-filter-slash" label="Limpiar" class="p-button-outlined" @click="clearFilter()" />
                        </template>
                        <template v-slot:end>
                            <span class="p-input-icon-left mr-2">
                                <i class="pi pi-search" />
                                <Dropdown v-model="filters['tasks_of_type.name'].constraints[0].value" :options="Tasks_of_type_filter" placeholder="Tasks of Type" class="w-full md:w-14rem" />
                            </span>
                            <span class="p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText v-model="filters['global'].value" placeholder="Buscar" style="width: 100%" />
                            </span>
                        </template>
                        <template v-slot:center>
                            <SelectButton v-model="size" :options="sizeOptions" optionLabel="label" dataKey="label"/> 
                        </template>
                    </Toolbar>
                </template>

                <template #empty> No customers found. </template>
                <template #loading> Loading customers data. Please wait. </template>
                <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
                <Column field="transaction_date" filterField="transaction_date" header="Transaction date" sortable :frozen="documentFrozen">
                    <template #header>
                        <ToggleButton v-model="documentFrozen" onIcon="pi pi-lock" offIcon="pi pi-lock-open" onLabel="" offLabel="" />
                        <div>&nbsp;</div>
                    </template>
                    <template #body="{ data }">
                        {{ data.transaction_date }}
                    </template>
                    <template #filter="{ filterModel }">
                        <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by " />
                    </template>
                </Column>
                <Column field="tasks_of_type_name" filterField="tasks_of_type.name" header="Tasks of Type" sortable :frozen="documentFrozen">
                    <template #header>
                        <ToggleButton v-model="documentFrozen" onIcon="pi pi-lock" offIcon="pi pi-lock-open" onLabel="" offLabel="" />
                        <div>&nbsp;</div>
                    </template>
                    <template #body="{ data }">
                        {{ data.tasks_of_type.name }}
                    </template>
                    <template #filter="{ filterModel }">
                        <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by " />
                    </template>
                </Column>





                <Column field="product_name" filterField="product.name" header="Product Name" sortable>
                    <template #body="{ data }">
                        {{ data.product.name }}
                    </template>
                    <template #filter="{ filterModel }">
                        <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by " />
                    </template>
                </Column>



                <Column field="product_type_name" filterField="product_type.name" header="Product Type Name" sortable>
                    <template #body="{ data }">
                        {{ data.product_type.name }}
                    </template>
                    <template #filter="{ filterModel }">
                        <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by " />
                    </template>
                </Column>

                <Column field="variant" filterField="variant.name" header="Variant Name" sortable>
                    <template #body="{ data }">
                        {{ data.variant.name }}
                    </template>
                    <template #filter="{ filterModel }">
                        <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by " />
                    </template>
                </Column>

                <Column field="packing_type_name" filterField="packing_type.name" header="packing Type Name" sortable>
                    <template #body="{ data }">
                        {{ data.packing_type.name }}
                    </template>
                    <template #filter="{ filterModel }">
                        <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by " />
                    </template>
                </Column>



                <Column field="vehicle" filterField="vehicle.name" header="Vehicle Name" sortable>
                    <template #body="{ data }">
                        {{ data.vehicle ? data.vehicle.vehicle_type : 'N/A' }}
                    </template>
                    <template #filter="{ filterModel }">
                        <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by Vehicle" />
                    </template>
                </Column>




                <Column field="customer_request.dispatch_number_lot" filterField="customer_request.dispatch_number_lot" header="Customer Request DNL" sortable>
                    <template #body="{ data }">
                        {{ data.customer_request.dispatch_number_lot }}
                    </template>
                    <template #filter="{ filterModel }">
                        <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by " />
                    </template>
                </Column>

                <!--Here add other columns-->

                <Column field="crop_lots_code" filterField="filtroCropLots" header="Crop Lots Code" sortable>
                    <template #body="{ data }">
                        <!-- {{ cropLotsToString(data.crop_lots) }} -->
                         {{ data.crop_lots ? data.crop_lots : 'N/A' }}
                    </template>
                    <template #filter="{ filterModel }">
                        <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by " />
                    </template>
                </Column>

                <Column field="farmName" filterField="farm.name" header="Farm Name" sortable>
                    <template #body="{ data }">
                        {{ data.farm.name }}
                    </template>
                    <template #filter="{ filterModel }">
                        <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by farm" />
                    </template>
                </Column>

                <Column field="companyName" filterField="company.name" header="Company Name" sortable>
                    <template #body="{ data }">
                        {{ data.company.name }}
                    </template>
                    <template #filter="{ filterModel }">
                        <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by farm" />
                    </template>
                </Column>

                <Column field="createdAt" filterField="created_at" header="Creation date" sortable>
                    <template #body="{ data }">
                        {{ data.created_at }}
                    </template>
                    <template #filter="{ filterModel }">
                        <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by creation date" />
                    </template>
                </Column>

                <Column field="updatedAt" filterField="updated_at" header="Modification date" sortable>
                    <template #body="{ data }">
                        {{ data.updated_at }}
                    </template>
                    <template #filter="{ filterModel }">
                        <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by modification date" />
                    </template>
                </Column>

                <Column field="status" filterField="status.name" header="Status" sortable>
                    <template #body="{ data }">
                        <Tag :value="data.status.name" :style="{ backgroundColor: data.status.color, color:'#FFFFFF'  }" />


                    </template>
                    <template #filter="{ filterModel }">
                        <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by status" />
                    </template>
                </Column>
            </DataTable>
            <Dialog v-model:visible="formDialogNew" modal :header="formDialogNewTitle" class="p-fluid text-center mx-auto">
                
                <div class="mb-3">
                    <div class="flex align-items-center">
                        <label for="username" class="font-semibold w-3">Transaction Date :</label>
                        <!-- <Calendar v-model="transaction_dateV" class="flex-auto" v-bind="transaction_dateVProps"/> -->
                        <Calendar dateFormat="dd/mm/yy" v-model="transaction_dateV" class="flex-auto" showIcon :showOnFocus="false" inputId="buttondisplay" placeholder="Select transaction date" />
                    </div>

                    <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['transaction_dateV'] }">
                        {{ errorsNew.transaction_dateV }}
                    </small>

                    <BackendErrors :name="errorResponseAPI?.errors?.transaction_date" />
                </div>

                <div class="mb-3">
                    <div class="flex align-items-center">
                        <label for="username" class="font-semibold w-3">Task of Type :</label>
                        <AutoComplete v-model="task_of_typeV" inputId="ac" class="flex-auto" :suggestions="tasks_of_type" @complete="searchTaskOfType" field="name" dropdown placeholder="Select Task of Type" />
                    </div>
                    <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['tasks_of_typeV'] }">
                        {{ errorsNew.task_of_typeV }}
                    </small>


                    <BackendErrors :name="errorResponseAPI?.errors?.tasks_of_type_uuid" />
                </div>

                <div class="mb-3">
                    <div class="flex align-items-center">
                        <label for="username" class="font-semibold w-3">Crop Lots Code :</label>
                        <MultiSelect v-model="crop_lots_codeV" display="chip" :options="CropLots" optionLabel="code" placeholder="Select Crop Lots" :maxSelectedLabels="100" class="flex-auto">
                            <template #footer>
                                <div class="py-2 px-4">
                                    <b>{{ crop_lots_codeV ? crop_lots_codeV.length : 0 }}</b> item{{ (crop_lots_codeV ? crop_lots_codeV.length : 0) > 1 ? 's' : '' }} selected.
                                </div>
                            </template>
                        </MultiSelect>
                        <!-- <AutoComplete v-model="crop_lots_codeV" class="flex-auto" inputId="ac" :suggestions="crop_lots" @complete="searchCropLots" field="code" dropdown /> -->
                    </div>
                    <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['crop_lots_codeV'] }">
                        {{ errorsNew.crop_lots_codeV }}
                    </small>


                    <BackendErrors :name="errorResponseAPI?.errors?.crop_lots" />
                </div>

                <div class="mb-3">
                    <div class="flex align-items-center">
                        <label for="productV" class="font-semibold w-3">Product :</label>
                        <AutoComplete v-model="productV" class="flex-auto" inputId="ac" :suggestions="products" @complete="searchProduct" field="name" dropdown />
                    </div>
                    <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['productV'] }">
                        {{ errorsNew.productV }}
                    </small>
                    <BackendErrors :name="errorResponseAPI?.errors?.product_uuid" />
                </div>

                <div class="mb-3">
                    <div class="flex align-items-center">
                        <label for="username" class="font-semibold w-3">Type of products:</label>
                        <AutoComplete v-model="product_typeV" class="flex-auto" inputId="ac" :suggestions="products_type" @complete="searchProductType" field="name" dropdown />
                    </div>
                    <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['product_typeV'] }">
                        {{ errorsNew.product_typeV }}
                    </small>
                    <small id="username-help" :class="{ 'p-invalid text-red-500': errorResponseAPI?.errors?.product_type_uuid }">
                        <div v-if="errorResponseAPI?.errors?.product_type_uuid">
                            <div v-for="(error, index) in errorResponseAPI.errors.product_type_uuid" :key="index">
                                {{ error }}
                            </div>
                        </div>
                    </small>
                    <BackendErrors :name="errorResponseAPI?.errors?.product_type_uuid" />
                </div>

                <div class="mb-3">
                    <div class="flex align-items-center">
                        <label for="username" class="font-semibold w-3">Packing types:</label>
                        <AutoComplete v-model="packing_typeV" class="flex-auto" inputId="ac" :suggestions="packings_type" @complete="searchPackingType" field="name" dropdown />
                    </div>
                    <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['packing_typeV'] }">
                        {{ errorsNew.packing_typeV }}
                    </small>
                    <small id="username-help" :class="{ 'p-invalid text-red-500': errorResponseAPI?.errors?.packing_type_uuid }">
                        <div v-if="errorResponseAPI?.errors?.packing_type_uuid">
                            <div v-for="(error, index) in errorResponseAPI.errors.packing_type_uuid" :key="index">
                                {{ error }}
                            </div>
                        </div>
                    </small>
                    <BackendErrors :name="errorResponseAPI?.errors?.packing_type_uuid" />
                </div>

                <div class="mb-3">
                    <div class="flex align-items-center">
                        <label for="username" class="font-semibold w-3">Vehicles:</label>
                        <AutoComplete v-model="vehiclesV" class="flex-auto" inputId="ac" :suggestions="vehicles" @complete="searchVehicles" field="name" dropdown />
                    </div>
                    <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['vehiclesV'] }">
                        {{ errorsNew.vehiclesV }}
                    </small>

                    <BackendErrors :name="errorResponseAPI?.errors?.vehicle_uuid" />
                    
                </div>

                <div class="mb-3">
                    <div class="flex align-items-center">
                        <label for="username" class="font-semibold w-3">Variants:</label>
                        <AutoComplete v-model="variantV" class="flex-auto" inputId="ac" :suggestions="variants" @complete="searchVariant" field="name" dropdown />
                    </div>
                    <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['variantV'] }">
                        {{ errorsNew.variantV }}
                    </small>

                    <BackendErrors :name="errorResponseAPI?.errors?.variant_uuid" />
                </div>

                <div class="mb-3">
                    <div class="flex align-items-center">
                        <label for="username" class="font-semibold w-3">Customer Request:</label>
                        <AutoComplete v-model="customer_requestV" class="flex-auto" inputId="ac" :suggestions="customer_request" @complete="searchCustomerRequest" field="name" dropdown />
                    </div>
                    <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['customer_requestV'] }">
                        {{ errorsNew.customer_requestV }}
                    </small>
                    <BackendErrors :name="errorResponseAPI?.errors?.customer_request_uuid" />
                </div>

                <div class="mb-3">
                    <div class="flex align-items-center">
                        <label for="username" class="font-semibold w-3">Farm :</label>
                        <AutoComplete v-model="farm" class="flex-auto" inputId="ac" :suggestions="farms" @complete="searchFarms" field="name" dropdown />
                    </div>
                    <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['farm'] }">
                        {{ errorsNew.farm }}
                    </small>
                    <BackendErrors :name="errorResponseAPI?.errors?.farm_uuid" />
                </div>
                
                <div class="mb-3">
                    <div class="flex align-items-center">
                        <label for="username" class="font-semibold w-3">Company:</label>
                        <AutoComplete v-model="company" class="flex-auto" inputId="ac" :suggestions="compa" @complete="searchCompannies" field="name" dropdown />
                    </div>
                    <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['company'] }">
                        {{ errorsNew.company }}
                    </small>

                    <small id="username-help" :class="{ 'p-invalid text-red-500': errorResponseAPI?.errors?.company_uuid }">
                        <div v-if="errorResponseAPI?.errors?.company_uuid">
                            <div v-for="(error, index) in errorResponseAPI.errors.company_uuid" :key="index">
                                {{ error }}
                            </div>
                        </div>
                    </small>
                    <BackendErrors :name="errorResponseAPI?.errors?.company_uuid" />
                </div>

                <div class="flex justify-content-end gap-2">
                    <Button type="button" label="Cancel" severity="secondary" @click="formDialogNew = false" />
                    <Button type="button" label="Save" @click="createRecord()" />
                </div>
            </Dialog>

            <Dialog v-model:visible="formDialogEdit" modal :header="formDialogEditTitle" class="p-fluid text-center mx-auto">
                <div class="mb-3">
                    <div class="flex align-items-center">
                        <label for="username" class="font-semibold w-3">Transaction Date :</label>
                        <!-- <Calendar v-model="transaction_dateV" class="flex-auto" v-bind="transaction_dateVProps"/> -->
                        <Calendar dateFormat="dd/mm/yy" v-model="transaction_dateV" class="flex-auto" showIcon :showOnFocus="false" inputId="buttondisplay" placeholder="Select transaction date" />
                    </div>

                    <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['transaction_dateV'] }">
                        {{ errorsNew.transaction_dateV }}
                    </small>

                    <BackendErrors :name="errorResponseAPI?.errors?.transaction_date" />
                </div>

                <div class="mb-3">
                    <div class="flex align-items-center">
                        <label for="username" class="font-semibold w-3">Task of Type :</label>
                        <AutoComplete v-model="task_of_typeV" inputId="ac" class="flex-auto" :suggestions="tasks_of_type" @complete="searchTaskOfType" field="name" dropdown placeholder="Select Task of Type" />
                    </div>
                    <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['tasks_of_typeV'] }">
                        {{ errorsNew.task_of_typeV }}
                    </small>


                    <BackendErrors :name="errorResponseAPI?.errors?.tasks_of_type_uuid" />
                </div>

                <div class="mb-3">
                    <div class="flex align-items-center">
                        <label for="username" class="font-semibold w-3">Crop Lots Code :</label>
                        <MultiSelect v-model="crop_lots_codeV" display="chip" :options="CropLots" optionLabel="code" placeholder="Select Crop Lots" :maxSelectedLabels="100" class="flex-auto">
                            <template #footer>
                                <div class="py-2 px-4">
                                    <b>{{ crop_lots_codeV ? crop_lots_codeV.length : 0 }}</b> item{{ (crop_lots_codeV ? crop_lots_codeV.length : 0) > 1 ? 's' : '' }} selected.
                                </div>
                            </template>
                        </MultiSelect>
                        <!-- <AutoComplete v-model="crop_lots_codeV" class="flex-auto" inputId="ac" :suggestions="crop_lots" @complete="searchCropLots" field="code" dropdown /> -->
                    </div>
                    <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['crop_lots_codeV'] }">
                        {{ errorsNew.crop_lots_codeV }}
                    </small>


                    <BackendErrors :name="errorResponseAPI?.errors?.crop_lots" />
                </div>

                <div class="mb-3">
                    <div class="flex align-items-center">
                        <label for="productV" class="font-semibold w-3">Product :</label>
                        <AutoComplete v-model="productV" class="flex-auto" inputId="ac" :suggestions="products" @complete="searchProduct" field="name" dropdown />
                    </div>
                    <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['productV'] }">
                        {{ errorsNew.productV }}
                    </small>
                    <BackendErrors :name="errorResponseAPI?.errors?.product_uuid" />
                </div>

                <div class="mb-3">
                    <div class="flex align-items-center">
                        <label for="username" class="font-semibold w-3">Type of products:</label>
                        <AutoComplete v-model="product_typeV" class="flex-auto" inputId="ac" :suggestions="products_type" @complete="searchProductType" field="name" dropdown />
                    </div>
                    <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['product_typeV'] }">
                        {{ errorsNew.product_typeV }}
                    </small>
                    <small id="username-help" :class="{ 'p-invalid text-red-500': errorResponseAPI?.errors?.product_type_uuid }">
                        <div v-if="errorResponseAPI?.errors?.product_type_uuid">
                            <div v-for="(error, index) in errorResponseAPI.errors.product_type_uuid" :key="index">
                                {{ error }}
                            </div>
                        </div>
                    </small>
                    <BackendErrors :name="errorResponseAPI?.errors?.product_type_uuid" />
                </div>

                <div class="mb-3">
                    <div class="flex align-items-center">
                        <label for="username" class="font-semibold w-3">Packing types:</label>
                        <AutoComplete v-model="packing_typeV" class="flex-auto" inputId="ac" :suggestions="packings_type" @complete="searchPackingType" field="name" dropdown />
                    </div>
                    <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['packing_typeV'] }">
                        {{ errorsNew.packing_typeV }}
                    </small>
                    <small id="username-help" :class="{ 'p-invalid text-red-500': errorResponseAPI?.errors?.packing_type_uuid }">
                        <div v-if="errorResponseAPI?.errors?.packing_type_uuid">
                            <div v-for="(error, index) in errorResponseAPI.errors.packing_type_uuid" :key="index">
                                {{ error }}
                            </div>
                        </div>
                    </small>
                    <BackendErrors :name="errorResponseAPI?.errors?.packing_type_uuid" />
                </div>

                <div class="mb-3">
                    <div class="flex align-items-center">
                        <label for="username" class="font-semibold w-3">Vehicles:</label>
                        <AutoComplete v-model="vehiclesV" class="flex-auto" inputId="ac" :suggestions="vehicles" @complete="searchVehicles" field="name" dropdown />
                    </div>
                    <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['vehiclesV'] }">
                        {{ errorsNew.vehiclesV }}
                    </small>

                    <BackendErrors :name="errorResponseAPI?.errors?.vehicle_uuid" />
                    
                </div>

                <div class="mb-3">
                    <div class="flex align-items-center">
                        <label for="username" class="font-semibold w-3">Variants:</label>
                        <AutoComplete v-model="variantV" class="flex-auto" inputId="ac" :suggestions="variants" @complete="searchVariant" field="name" dropdown />
                    </div>
                    <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['variantV'] }">
                        {{ errorsNew.variantV }}
                    </small>

                    <BackendErrors :name="errorResponseAPI?.errors?.variant_uuid" />
                </div>

                <div class="mb-3">
                    <div class="flex align-items-center">
                        <label for="username" class="font-semibold w-3">Customer Request:</label>
                        <AutoComplete v-model="customer_requestV" class="flex-auto" inputId="ac" :suggestions="customer_request" @complete="searchCustomerRequest" field="name" dropdown />
                    </div>
                    <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['customer_requestV'] }">
                        {{ errorsNew.customer_requestV }}
                    </small>
                    <BackendErrors :name="errorResponseAPI?.errors?.customer_request_uuid" />
                </div>

                <div class="mb-3">
                    <div class="flex align-items-center">
                        <label for="username" class="font-semibold w-3">Farm :</label>
                        <AutoComplete v-model="farm" class="flex-auto" inputId="ac" :suggestions="farms" @complete="searchFarms" field="name" dropdown />
                    </div>
                    <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['farm'] }">
                        {{ errorsNew.farm }}
                    </small>
                    <BackendErrors :name="errorResponseAPI?.errors?.farm_uuid" />
                </div>
                
                <div class="mb-3">
                    <div class="flex align-items-center">
                        <label for="username" class="font-semibold w-3">Company:</label>
                        <AutoComplete v-model="company" class="flex-auto" inputId="ac" :suggestions="compa" @complete="searchCompannies" field="name" dropdown />
                    </div>
                    <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['company'] }">
                        {{ errorsNew.company }}
                    </small>

                    <small id="username-help" :class="{ 'p-invalid text-red-500': errorResponseAPI?.errors?.company_uuid }">
                        <div v-if="errorResponseAPI?.errors?.company_uuid">
                            <div v-for="(error, index) in errorResponseAPI.errors.company_uuid" :key="index">
                                {{ error }}
                            </div>
                        </div>
                    </small>
                    <BackendErrors :name="errorResponseAPI?.errors?.company_uuid" />
                </div>

                <div class="flex justify-content-end gap-2">
                    <Button type="button" label="Cancel" severity="secondary" @click="formDialogEdit = false" />
                    <Button type="button" label="Save" @click="EditRecord()" />
                </div>
            </Dialog>

            <Dialog v-model:visible="formDialogClone" modal :header="formDialogCloneTitle" class="p-fluid text-center mx-auto">
                <div class="mb-3">
                    <div class="flex align-items-center">
                        <label for="username" class="font-semibold w-3">Transaction Date :</label>
                        <!-- <Calendar v-model="transaction_dateV" class="flex-auto" v-bind="transaction_dateVProps"/> -->
                        <Calendar dateFormat="dd/mm/yy" v-model="transaction_dateV" class="flex-auto" showIcon :showOnFocus="false" inputId="buttondisplay" placeholder="Select transaction date" />
                    </div>

                    <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['transaction_dateV'] }">
                        {{ errorsNew.transaction_dateV }}
                    </small>

                    <BackendErrors :name="errorResponseAPI?.errors?.transaction_date" />
                </div>

                <div class="mb-3">
                    <div class="flex align-items-center">
                        <label for="username" class="font-semibold w-3">Task of Type :</label>
                        <AutoComplete v-model="task_of_typeV" inputId="ac" class="flex-auto" :suggestions="tasks_of_type" @complete="searchTaskOfType" field="name" dropdown placeholder="Select Task of Type" />
                    </div>
                    <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['tasks_of_typeV'] }">
                        {{ errorsNew.task_of_typeV }}
                    </small>


                    <BackendErrors :name="errorResponseAPI?.errors?.tasks_of_type_uuid" />
                </div>

                <div class="mb-3">
                    <div class="flex align-items-center">
                        <label for="username" class="font-semibold w-3">Crop Lots Code :</label>
                        <MultiSelect v-model="crop_lots_codeV" display="chip" :options="CropLots" optionLabel="code" placeholder="Select Crop Lots" :maxSelectedLabels="100" class="flex-auto">
                            <template #footer>
                                <div class="py-2 px-4">
                                    <b>{{ crop_lots_codeV ? crop_lots_codeV.length : 0 }}</b> item{{ (crop_lots_codeV ? crop_lots_codeV.length : 0) > 1 ? 's' : '' }} selected.
                                </div>
                            </template>
                        </MultiSelect>
                        <!-- <AutoComplete v-model="crop_lots_codeV" class="flex-auto" inputId="ac" :suggestions="crop_lots" @complete="searchCropLots" field="code" dropdown /> -->
                    </div>
                    <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['crop_lots_codeV'] }">
                        {{ errorsNew.crop_lots_codeV }}
                    </small>


                    <BackendErrors :name="errorResponseAPI?.errors?.crop_lots" />
                </div>

                <div class="mb-3">
                    <div class="flex align-items-center">
                        <label for="productV" class="font-semibold w-3">Product :</label>
                        <AutoComplete v-model="productV" class="flex-auto" inputId="ac" :suggestions="products" @complete="searchProduct" field="name" dropdown />
                    </div>
                    <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['productV'] }">
                        {{ errorsNew.productV }}
                    </small>
                    <BackendErrors :name="errorResponseAPI?.errors?.product_uuid" />
                </div>

                <div class="mb-3">
                    <div class="flex align-items-center">
                        <label for="username" class="font-semibold w-3">Type of products:</label>
                        <AutoComplete v-model="product_typeV" class="flex-auto" inputId="ac" :suggestions="products_type" @complete="searchProductType" field="name" dropdown />
                    </div>
                    <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['product_typeV'] }">
                        {{ errorsNew.product_typeV }}
                    </small>
                    <small id="username-help" :class="{ 'p-invalid text-red-500': errorResponseAPI?.errors?.product_type_uuid }">
                        <div v-if="errorResponseAPI?.errors?.product_type_uuid">
                            <div v-for="(error, index) in errorResponseAPI.errors.product_type_uuid" :key="index">
                                {{ error }}
                            </div>
                        </div>
                    </small>
                    <BackendErrors :name="errorResponseAPI?.errors?.product_type_uuid" />
                </div>

                <div class="mb-3">
                    <div class="flex align-items-center">
                        <label for="username" class="font-semibold w-3">Packing types:</label>
                        <AutoComplete v-model="packing_typeV" class="flex-auto" inputId="ac" :suggestions="packings_type" @complete="searchPackingType" field="name" dropdown />
                    </div>
                    <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['packing_typeV'] }">
                        {{ errorsNew.packing_typeV }}
                    </small>
                    <small id="username-help" :class="{ 'p-invalid text-red-500': errorResponseAPI?.errors?.packing_type_uuid }">
                        <div v-if="errorResponseAPI?.errors?.packing_type_uuid">
                            <div v-for="(error, index) in errorResponseAPI.errors.packing_type_uuid" :key="index">
                                {{ error }}
                            </div>
                        </div>
                    </small>
                    <BackendErrors :name="errorResponseAPI?.errors?.packing_type_uuid" />
                </div>

                <div class="mb-3">
                    <div class="flex align-items-center">
                        <label for="username" class="font-semibold w-3">Vehicles:</label>
                        <AutoComplete v-model="vehiclesV" class="flex-auto" inputId="ac" :suggestions="vehicles" @complete="searchVehicles" field="name" dropdown />
                    </div>
                    <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['vehiclesV'] }">
                        {{ errorsNew.vehiclesV }}
                    </small>

                    <BackendErrors :name="errorResponseAPI?.errors?.vehicle_uuid" />
                    
                </div>

                <div class="mb-3">
                    <div class="flex align-items-center">
                        <label for="username" class="font-semibold w-3">Variants:</label>
                        <AutoComplete v-model="variantV" class="flex-auto" inputId="ac" :suggestions="variants" @complete="searchVariant" field="name" dropdown />
                    </div>
                    <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['variantV'] }">
                        {{ errorsNew.variantV }}
                    </small>

                    <BackendErrors :name="errorResponseAPI?.errors?.variant_uuid" />
                </div>

                <div class="mb-3">
                    <div class="flex align-items-center">
                        <label for="username" class="font-semibold w-3">Customer Request:</label>
                        <AutoComplete v-model="customer_requestV" class="flex-auto" inputId="ac" :suggestions="customer_request" @complete="searchCustomerRequest" field="name" dropdown />
                    </div>
                    <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['customer_requestV'] }">
                        {{ errorsNew.customer_requestV }}
                    </small>
                    <BackendErrors :name="errorResponseAPI?.errors?.customer_request_uuid" />
                </div>

                <div class="mb-3">
                    <div class="flex align-items-center">
                        <label for="username" class="font-semibold w-3">Farm :</label>
                        <AutoComplete v-model="farm" class="flex-auto" inputId="ac" :suggestions="farms" @complete="searchFarms" field="name" dropdown />
                    </div>
                    <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['farm'] }">
                        {{ errorsNew.farm }}
                    </small>
                    <BackendErrors :name="errorResponseAPI?.errors?.farm_uuid" />
                </div>
                
                <div class="mb-3">
                    <div class="flex align-items-center">
                        <label for="username" class="font-semibold w-3">Company:</label>
                        <AutoComplete v-model="company" class="flex-auto" inputId="ac" :suggestions="compa" @complete="searchCompannies" field="name" dropdown />
                    </div>
                    <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['company'] }">
                        {{ errorsNew.company }}
                    </small>

                    <small id="username-help" :class="{ 'p-invalid text-red-500': errorResponseAPI?.errors?.company_uuid }">
                        <div v-if="errorResponseAPI?.errors?.company_uuid">
                            <div v-for="(error, index) in errorResponseAPI.errors.company_uuid" :key="index">
                                {{ error }}
                            </div>
                        </div>
                    </small>
                    <BackendErrors :name="errorResponseAPI?.errors?.company_uuid" />
                </div>

                <div class="flex justify-content-end gap-2">
                    <Button type="button" label="Cancel" severity="secondary" @click="formDialogClone = false" />
                    <Button type="button" label="Save" @click="CloneRecord()" />
                </div>
            </Dialog>

            <Dialog v-model:visible="formDialogExport" :style="{ width: '290px' }" :header="formDialogExportTitle" :modal="true" class="p-fluid">
                <div class="mb-3">
                    <div class="flex align-items-center gap-3 mb-1">
                        <label for="username" class="font-semibold w-6rem">Filename:</label>
                        <InputText id="username" v-model="filename" class="flex-auto" autocomplete="off" v-bind="nameProps" :required="true" />
                    </div>
                </div>
                <div class="flex align-items-center gap-3">
                    <div class="align-items-center gap-3">
                        <label for="username" class="font-semibold">Format:</label>
                        <Dropdown v-model="format" :options="extenciones" optionLabel="name" :class="' w-full'" />
                    </div>
                    <div class="align-items-center gap-3">
                        <label for="username" class="font-semibold">Export:</label>
                        <Dropdown v-model="exportAll" :options="optionsEsport" optionLabel="name" :class="' w-full md:w-10rem'" />
                    </div>
                </div>

                <template #footer>
                    <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="formDialogExport = false" />
                    <Button label="Export" icon="pi pi-check" class="p-button-text" @click="ExportRecord" />
                </template>
            </Dialog>

            <Dialog v-model:visible="formDialogDelete" :style="{ width: '450px' }" :header="formDialogDeleteTitle" :modal="true">
                <label for="username" class="text-2xl font-medium w-6rem"> Are you sure you want to delete the selected ones? </label>
                <div class="card flex flex-wrap mt-2 gap-2">
                    <div v-for="item in listRowSelect" :key="item.id">
                        <Chip :label="item.name" removable @remove="remove(item)" icon="pi pi-ban" />
                    </div>
                </div>
                <div class="flex justify-content-end gap-2">
                    <Button type="button" label="Cancel" severity="secondary" @click="formDialogDelete = false" />
                    <Button type="button" label="Delete" @click="DeleteRecord" />
                </div>
            </Dialog>
            <Dialog v-model:visible="formDialogClose" :style="{ width: '450px' }" :header="formDialogCloseTitle" :modal="true">
                <label for="username" class="text-2xl font-medium w-6rem"> Are you sure you want to close the following? </label>
                <Summary :listRowSelect="listRowSelect" />
                <div class="flex justify-content-end gap-2">
                    
                    <Button type="button" label="Cancel" severity="secondary" @click="formDialogClose = false" />
                    <Button type="button" label="Save" @click="patchRecord" />
                </div>
            </Dialog>

            <Toast />
        </div>
    </div>
</template>

<!-- 
filterDisplay="menu"
v-model:filters="filters"
:globalFilterFields="['', 'company.name']"


const documentFrozen = ref(false); change name field 
<DataTable id="tblData"
     -->
<script setup>
import { ref, watch, provide, onBeforeMount, onMounted } from 'vue';
import useDataAPI from '@/composables/DataAPI/FetchDataAPI.js';
import { useToast } from 'primevue/usetoast';
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import useData from '@/composables/DataAPI/FetchDataAPICopy.js';
const { getRequest, postRequest, putRequest, deleteRequest,patchRequest, errorResponseAPI } = useData();
import { useRouter } from 'vue-router';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { z } from 'zod';
import ability from '@/service/ability.js';
import { AbilityBuilder } from '@casl/ability';
import BackendErrors from '@/views/Errors/BackendErrors.vue';
import Summary from './Summary.vue';

const prueba = ref({ revisar: 'revisar GET-POST-PUT-DELETE' });
const backendValidation = ref();
const backendValidationFlag = ref(false);
const namePage = ' Planner tasks ';
const titlePage = ' ' + namePage + ' information';
const dataFromComponent = ref();
const Farms = ref([]);
const farms = ref([]);
const Compan = ref([]);
const compa = ref([]);
const farmDefault = sessionStorage.getItem('accessSessionFarm');
const companyDefault = sessionStorage.getItem('accessSessionCompany');
const CropLots = ref([]);
const products = ref([]);
const Products = ref([]);
const products_type = ref([]);
const Products_type = ref([]);
const tasks_of_type = ref([]);
const Tasks_of_type = ref([]);
const Tasks_of_type_filter = ref([]);
const packings_type = ref([]);
const Packings_type = ref([]);
const variants = ref([]);
const Variants = ref([]);
const customer_request = ref([]);
const Customer_request = ref([]);
const vehicles = ref([])
const Vehicles = ref([])

const otherTestValue = ref();

const formDialogNewTitle = 'Create new ' + namePage;
const formDialogEditTitle = 'Edit ' + namePage;
const formDialogCloneTitle = 'Clone ' + namePage;
const formDialogExportTitle = 'Export ' + namePage;
const formDialogDeleteTitle = 'Delete ' + namePage;
const formDialogCloseTitle = 'Close ' + namePage;
const formDialogNew = ref(false);
const formDialogEdit = ref(false);
const formDialogClone = ref(false);
const formDialogExport = ref(false);
const formDialogDelete = ref(false);
const formDialogClose = ref(false);

const toast = useToast();
const filename = ref('table');
const isChanging = ref(false);
let endpoint = ref('/planner_tasks'); //replace endpoint with your endpoint

////////////
//Form here
////////////
const size = ref({ label: 'Normal', value: 'normal' });
const sizeOptions = ref([
    { label: 'Small', value: 'small', class: 'sm' },
    { label: 'Normal', value: 'normal' },
    { label: 'Large', value: 'large', class: 'lg' }
]);

onBeforeMount(() => {
    readAll();
    initFilters();
});
const listRowSelect = ref([]);
const loading = ref(false);
const onRowSelect = (data) => {
    listRowSelect.value = data;
    //assignValues(mode.value)
};

watch(listRowSelect, onRowSelect);

const onSelectAllChange = () => {
    onRowSelect();
};
const filters = ref();

const clearFilter = () => {
    initFilters();
};

const cropLotsToString = (value) => {
    return value
        .map((item) => item.code)
        .join(', ')
        .toString();
};

const initFilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        'crop_lots[0].code': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
        transaction_date: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'product.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'product_type.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'packing_type.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'vehicles.vehicle_type': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'variant.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'customer_request.dispatch_number_lot': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'tasks_of_type.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'status.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'farm.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'company.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        created_at: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        updated_at: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] }
    };
};

const documentFrozen = ref(false);
const readAll = async () => {
    loadingData();
    const respProducts = await getRequest('/products');
    if (!respProducts.ok) toast.add({ severity: 'error', detail: 'Error' + respProducts.error, life: 3000 });
    Products.value = respProducts.data.data.map((product) => ({ id: product.uuid, name: product.name }));
    console.log(products);

    const respProductsType = await getRequest('/product_types');
    if (!respProductsType.ok) toast.add({ severity: 'error', detail: 'Error' + respProductsType.error, life: 3000 });
    Products_type.value = respProductsType.data.data.map((product) => ({ id: product.uuid, name: product.name }));

    const respTasksOfType = await getRequest('/task_of_types');
    if (!respTasksOfType.ok) toast.add({ severity: 'error', detail: 'Error' + respTasksOfType.error, life: 3000 });
    Tasks_of_type.value = respTasksOfType.data.data.map((task) => ({ id: task.uuid, name: task.name }));
    Tasks_of_type_filter.value = respTasksOfType.data.data.map((task) =>  task.name );

    const respPackingsType = await getRequest('/packing_types');
    if (!respPackingsType.ok) toast.add({ severity: 'error', detail: 'Error' + respPackingsType.error, life: 3000 });
    Packings_type.value = respPackingsType.data.data.map((packing) => ({ id: packing.uuid, name: packing.name }));

    const respVariants = await getRequest('/variants');
    if (!respVariants.ok) toast.add({ severity: 'error', detail: 'Error' + respVariants.error, life: 3000 });
    Variants.value = respVariants.data.data.map((variant) => ({ id: variant.uuid, name: variant.name }));

    const respVehicles = await getRequest('/vehicles');
    if (!respVehicles.ok) toast.add({ severity: 'error', detail: 'Error' + respVehicles.error, life: 3000 });
    Vehicles.value = respVehicles.data.data.map((vehicle) => ({ id: vehicle.uuid, name: vehicle.vehicle_type }));

    const respCropLots = await getRequest('/crop_lots');
    if (!respCropLots.ok) {
        toast.add({ severity: 'error', detail: 'Error: ' + respCropLots.error, life: 3000 });
        console.log(respCropLots);
    } else {
        CropLots.value = respCropLots.data.data.map((crop) => ({
            code: crop.code
        }));
    }

    const respFarms = await getRequest('/farms');
    if (!respFarms.ok) toast.add({ severity: 'error', detail: 'Error' + respFarms.error, life: 3000 });
    Farms.value = respFarms.data.data.map((farm) => ({ id: farm.uuid, name: farm.name }));

    const respCompan = await getRequest('/companies');
    if (!respCompan.ok) toast.add({ severity: 'error', detail: 'Error' + respCompan.error, life: 3000 });
    Compan.value = respCompan.data.data.map((comp) => ({ id: comp.uuid, name: comp.name }));

    const respCustomerRequest = await getRequest('/customer_requests');
    if (!respCustomerRequest.ok) toast.add({ severity: 'error', detail: 'Error' + respCustomerRequest.error, life: 3000 });
    Customer_request.value = respCustomerRequest.data.data.map((customer) => ({ id: customer.uuid, name: customer.dispatch_number_lot }));
    console.log(Customer_request);
};

const filtroCropLots = ref('');
const loadingData = async () => {
    const response = await getRequest(endpoint.value);

    if (!response.ok) toast.add({ severity: 'error', detail: 'Error' + response.error, life: 3000 });
    dataFromComponent.value = response.data.data;
};

watch(
    () => dataFromComponent.value,
    (newValue, oldValue) => {}
);
watch(
    () => isChanging.value,
    (newValue, oldValue) => {
        readAll(endpoint.value);
        console.log(newValue);
        console.log(oldValue);
    }
);
const {
    handleSubmit: handleSubmitNew,
    errors: errorsNew,
    defineField,
    resetForm
} = useForm({
    initialValues: {
        tasks_of_typeV: { name: '', id: '' },
        crop_lots_codeV: [],
        productV: { name: '', id: '' },
        product_typeV: { name: '', id: '' },
        packing_typeV: { name: '', id: '' },
        vehiclesV: { name: '', id: '' },
        variantV: { name: '', id: '' },
        transaction_dateV: '',
        customer_requestV: { name: '', id: '' },
        farm: { name: '', id: '' },
        company: { name: '', id: '' }
    },
    validationSchema: toTypedSchema(
        z.object({
            // name: z.string().min(4),
            // codeV: z.string().min(4),
            transaction_dateV: z.date(),
            task_of_typeV: z
                .object({
                    name: z.string().min(4),
                    id: z.string().min(4)
                })
                .optional(),
            // crop_lots_codeV:z.array(z.object({
            //     code: z.string().min(2).optional(),

            // })),
            crop_lots_codeV: z
                .array(
                    z.object({
                        code: z.string().min(2).optional()
                    })
                )
                .min(1, { message: 'You should select at least one crop lot' }),

            productV: z.object({
                name: z.string().min(4),
                id: z.string().min(4)
            }),
            product_typeV: z.object({
                name: z.string().min(4),
                id: z.string().min(4)
            }),
            packing_typeV: z.object({
                name: z.string().min(4),
                id: z.string().min(4)
            }),
            vehiclesV: z.object({
                name: z.string().min(4),
                id: z.string().min(4)
            }),
            variantV: z.object({
                name: z.string().min(4),
                id: z.string().min(4)
            }),
            customer_requestV: z
                .object({
                    name: z.string().min(4).optional(),
                    id: z.string().min(4).optional()
                })
                .optional(),
            farm: z
                .object({
                    name: z.string().optional(),
                    id: z.string().optional()
                })
                .optional(),
            company: z
                .object({
                    name: z.string().optional(),
                    id: z.string().optional()
                })
                .optional()
        })
    )
});
const [name, nameProps] = defineField('name');
const [codeV, codeVProps] = defineField('codeV');
const [farm] = defineField('farm');
const [company] = defineField('company');
const [transaction_dateV, transaction_dateVProps] = defineField('transaction_dateV');
const [task_of_typeV] = defineField('task_of_typeV');
const [crop_lots_codeV] = defineField('crop_lots_codeV');
const [productV] = defineField('productV');
const [product_typeV] = defineField('product_typeV');
const [packing_typeV] = defineField('packing_typeV');
const [variantV] = defineField('variantV');
const[vehiclesV] = defineField('vehiclesV');
const [customer_requestV] = defineField('customer_requestV');

const extenciones = ref([{ name: 'CSV' }, { name: 'XLS' }]);
const optionsEsport = ref([{ name: 'ALL' }, { name: 'SELECTED' }]);
const format = ref({ name: 'CSV' });
const exportAll = ref({ name: 'ALL' });
const selectedRegisters = ref([]);
const RowSelect = (data) => {
    listRowSelect.value = data;
};
let headerNames = ref([]);
provide('isChanging', isChanging);
watch(listRowSelect, RowSelect);
let valor = ref();

const openNew = () => {
    resetForm();
    formDialogNew.value = true;
    console.log(CropLots.value);
};

watch(
    () => crop_lots_codeV.value,
    (newValue, oldValue) => {
        console.log(newValue);
    }
);
watch(
    () => CropLots.value,
    (newValue, oldValue) => {
        console.log(newValue);
    }
);

const varto = ref();

const openEdit = () => {
    resetForm();

    const {
        code,
        company: empresa,
        farm: farmParameter,
        name: nombre,
        tasks_of_type: task,
        variant: variant,
        packing_type: packing,
        product_type: productType,
        product: productX,
        transaction_date: date,
        crop_lots: crop_lots,
        customer_request: customer_request,
        vehicle: vehicle
    } = listRowSelect.value[0];
    console.log(listRowSelect.value[0]);
    transaction_dateV.value = new Date(date);
    task_of_typeV.value = { id: task.uuid, name: task.name };
    crop_lots_codeV.value = crop_lots;
    productV.value = { id: productX.uuid, name: productX.name };
    product_typeV.value = { id: productType.uuid, name: productType.name };
    packing_typeV.value = { id: packing.uuid, name: packing.name };
    vehiclesV.value = { id: vehicle.uuid, name: vehicle.vehicle_type };
    variantV.value = { id: variant.uuid, name: variant.name };
    customer_requestV.value = { id: customer_request.uuid, name: customer_request.dispatch_number_lot };
    company.value = { id: empresa.uuid, name: empresa.name };
    farm.value = { id: farmParameter.uuid, name: farmParameter.name };

    formDialogEdit.value = true;
};

const openClone = () => {
    resetForm();
    const {
        code,
        company: empresa,
        farm: farmParameter,
        name: nombre,
        tasks_of_type: task,
        variant: variant,
        packing_type: packing,
        product_type: productType,
        product: productX,
        transaction_date: date,
        crop_lots: crop_lots,
        customer_request: customer_request,
        vehicle: vehicle
    } = listRowSelect.value[0];

    transaction_dateV.value = new Date(date);
    task_of_typeV.value = { id: task.uuid, name: task.name };
    crop_lots_codeV.value = crop_lots;
    productV.value = { id: productX.uuid, name: productX.name };
    product_typeV.value = { id: productType.uuid, name: productType.name };
    packing_typeV.value = { id: packing.uuid, name: packing.name };
    vehiclesV.value = { id: vehicle.uuid, name: vehicle.vehicle_type };
    variantV.value = { id: variant.uuid, name: variant.name };
    customer_requestV.value = { id: customer_request.uuid, name: customer_request.dispatch_number_lot };
    company.value = { id: empresa.uuid, name: empresa.name };
    farm.value = { id: farmParameter.uuid, name: farmParameter.name };

    formDialogClone.value = true;
};

const openExport = () => {
    format.value = { name: 'CSV' };
    formDialogExport.value = true;
};

const openClose = () => {
  
    formDialogClose.value = true;
};
const openDelete = () => {
    formDialogDelete.value = true;
};

const createRecord = handleSubmitNew(async (values) => {
    const yyyy = values.transaction_dateV.getFullYear();
    const mm = String(values.transaction_dateV.getMonth() + 1).padStart(2, '0');
    const dd = String(values.transaction_dateV.getDate()).padStart(2, '0');

    // Formatear la fecha en formato YYYY-MM-DD
    const formattedDate = `${yyyy}-${mm}-${dd}`;
    console.log(formattedDate);
    const data = {
        tasks_of_type_uuid: values.task_of_typeV ? values.task_of_typeV.id : 'Prueba',

        crop_lots: values.crop_lots_codeV ? values.crop_lots_codeV : 'Prueba',
        transaction_date: formattedDate,
        product_uuid: values.productV ? values.productV.id : 'Prueba',
        product_type_uuid: values.product_typeV ? values.product_typeV.id : 'Prueba',
        packing_type_uuid: values.packing_typeV ? values.packing_typeV.id : 'Prueba',
        vehicle_uuid: values.vehiclesV ? values.vehiclesV.id : 'Prueba',
        variant_uuid: values.variantV ? values.variantV.id : 'Prueba',
        customer_request_uuid: values.customer_requestV ? values.customer_requestV.id : 'Prueba',
        company_uuid: values.company && values.company.id ? values.company.id : companyDefault,
        farm_uuid: values.farm && values.farm.id ? values.farm.id : farmDefault
    };
    console.log(data);

    valor.value = data;
    console.log(data);
    const restp = await postRequest(endpoint.value, data);

    toast.add({ severity: restp.ok ? 'success' : 'error', summary: 'Create', detail: restp.ok ? 'Creado' : restp.error, life: 3000 });
    loadingData();

    prueba.value = data;
    if (restp.ok) {
        listRowSelect.value = [];
        selectedRegisters.value = [];
        formDialogNew.value = false;
        errorResponseAPI.value = '';
        otherTestValue.value = data;
    } else {
        backendValidationFlag.value = true;
        backendValidation.value = restp;
        formDialogNew.value = true;
    }
});

const EditRecord = handleSubmitNew(async (values) => {
    const { uuid } = listRowSelect.value[0];
    const yyyy = values.transaction_dateV.getFullYear();
    const mm = String(values.transaction_dateV.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript son 0-indexados
    const dd = String(values.transaction_dateV.getDate()).padStart(2, '0');

    // Formatear la fecha en formato YYYY-MM-DD
    const formattedDate = `${yyyy}-${mm}-${dd}`;
    console.log(formattedDate);
    const data = {
        // code: values.codeV,
        // name: values.name,

        tasks_of_type_uuid: values.task_of_typeV ? values.task_of_typeV.id : 'Prueba',
        // crop_lots: {"id": 1, "code": "L-1"},
        crop_lots: values.crop_lots_codeV ? values.crop_lots_codeV : 'Prueba',
        transaction_date: formattedDate,
        product_uuid: values.productV ? values.productV.id : 'Prueba',
        product_type_uuid: values.product_typeV ? values.product_typeV.id : 'Prueba',
        packing_type_uuid: values.packing_typeV ? values.packing_typeV.id : 'Prueba',
        vehicle_uuid: values.vehiclesV ? values.vehiclesV.id : 'Prueba',
        variant_uuid: values.variantV ? values.variantV.id : 'Prueba',
        customer_request_uuid: values.customer_requestV ? values.customer_requestV.id : 'Prueba',
        company_uuid: values.company && values.company.id ? values.company.id : companyDefault,
        farm_uuid: values.farm && values.farm.id ? values.farm.id : farmDefault
    };

    const restp = await putRequest(endpoint.value, data, uuid);
    toast.add({ severity: restp.ok ? 'success' : 'error', summary: 'Edit', detail: restp.ok ? 'Editado' : restp.error, life: 3000 });
    console.log(JSON.stringify(data, null, 2));
    console.log(restp);
    loadingData();
    if (restp.ok) {
        listRowSelect.value = [];
        selectedRegisters.value = [];
        formDialogEdit.value = false;
        errorResponseAPI.value = '';
    } else {
        backendValidationFlag.value = true;
        backendValidation.value = restp;
        formDialogEdit.value = true;
        console.log(errorResponseAPI);
    }
});

const patchRecord = async (values) => {
    const { uuid } = listRowSelect.value[0];
    const data = {
        status_id: 10
    };
    const restp = await patchRequest(endpoint.value, data, uuid);
    toast.add({ severity: restp.ok ? 'success' : 'error', summary: 'Close', detail: restp.ok ? 'Closed' : restp.error, life: 3000 });
    loadingData();
    if (restp.ok) {
        
        formDialogClose.value = false;
        listRowSelect.value = [];
        selectedRegisters.value = [];
        errorResponseAPI.value = '';
    } else {
        backendValidationFlag.value = true;
        backendValidation.value = restp;
        formDialogEdit.value = true;
    }
};

const CloneRecord = handleSubmitNew(async (values) => {
    const yyyy = values.transaction_dateV.getFullYear();
    const mm = String(values.transaction_dateV.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript son 0-indexados
    const dd = String(values.transaction_dateV.getDate()).padStart(2, '0');

    // Formatear la fecha en formato YYYY-MM-DD
    const formattedDate = `${yyyy}-${mm}-${dd}`;
    console.log(formattedDate);
    const data = {
        // code: values.codeV,
        // name: values.name,

        tasks_of_type_uuid: values.task_of_typeV ? values.task_of_typeV.id : 'Prueba',
        // crop_lots: {"id": 1, "code": "L-1"},
        crop_lots: values.crop_lots_codeV ? values.crop_lots_codeV : 'Prueba',
        transaction_date: formattedDate,
        product_uuid: values.productV ? values.productV.id : 'Prueba',
        product_type_uuid: values.product_typeV ? values.product_typeV.id : 'Prueba',
        packing_type_uuid: values.packing_typeV ? values.packing_typeV.id : 'Prueba',
        vehicle_uuid: values.vehiclesV ? values.vehiclesV.id : 'Prueba',
        variant_uuid: values.variantV ? values.variantV.id : 'Prueba',
        customer_request_uuid: values.customer_requestV ? values.customer_requestV.id : 'Prueba',
        company_uuid: values.company && values.company.id ? values.company.id : companyDefault,
        farm_uuid: values.farm && values.farm.id ? values.farm.id : farmDefault
    };
    const restp = await postRequest(endpoint.value, data);
    toast.add({ severity: restp.ok ? 'success' : 'error', summary: 'Clone', detail: restp.ok ? 'Clonado' : restp.error, life: 3000 });
    loadingData();
    prueba.value = data;
    if (restp.ok) {
        listRowSelect.value = [];
        selectedRegisters.value = [];
        formDialogClone.value = false;
        errorResponseAPI.value = '';
    } else {
        backendValidationFlag.value = true;
        backendValidation.value = restp;
        formDialogClone.value = true;
    }
});

const ExportRecord = () => {
    const eventos = exportAll.value.name == 'ALL' ? dataFromComponent.value.map((data) => data) : listRowSelect.value.map((data) => data);
    formDialogExport.value = false;
    if (!eventos.length) return;
    if (format.value.name == 'CSV') formatCSV(eventos);
    else formatXLS(eventos);
};

const searchVehicles = (event) => {
    setTimeout(() => {
        if (!event.query.trim().length) {
            vehicles.value = [...Vehicles.value];
        } else {
            vehicles.value = Vehicles.value.filter((fram) => {
                return fram.name.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }
    }, 200);
};

const searchCompannies = (event) => {
    setTimeout(() => {
        if (!event.query.trim().length) {
            compa.value = [...Compan.value];
        } else {
            compa.value = Compan.value.filter((fram) => {
                return fram.name.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }
    }, 200);
};

const searchTaskOfType = (event) => {
    setTimeout(() => {
        if (!event.query.trim().length) {
            tasks_of_type.value = [...Tasks_of_type.value];
        } else {
            tasks_of_type.value = Tasks_of_type.value.filter((fram) => {
                return fram.name.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }
    }, 200);
};
// const searchCropLots = (event) => {
//     setTimeout(() => {
//         if (!event.query.trim().length) {
//             crop_lots.value = [...CropLots.value];
//         } else {
//             crop_lots.value = CropLots.value.filter((fram) => {
//                 return fram.code.toLowerCase().startsWith(event.query.toLowerCase());
//             });
//         }
//     }, 200);
// };
const searchProduct = (event) => {
    setTimeout(() => {
        if (!event.query.trim().length) {
            products.value = [...Products.value];
        } else {
            products.value = Products.value.filter((fram) => {
                return fram.name.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }
    }, 200);
};
const searchProductType = (event) => {
    setTimeout(() => {
        if (!event.query.trim().length) {
            products_type.value = [...Products_type.value];
        } else {
            products_type.value = Products_type.value.filter((fram) => {
                return fram.name.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }
    }, 200);
};

const searchPackingType = (event) => {
    setTimeout(() => {
        if (!event.query.trim().length) {
            packings_type.value = [...Packings_type.value];
        } else {
            packings_type.value = Packings_type.value.filter((fram) => {
                return fram.name.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }
    }, 200);
};

const searchVariant = (event) => {
    setTimeout(() => {
        if (!event.query.trim().length) {
            variants.value = [...Variants.value];
        } else {
            variants.value = Variants.value.filter((fram) => {
                return fram.name.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }
    }, 200);
};
const searchCustomerRequest = (event) => {
    setTimeout(() => {
        if (!event.query.trim().length) {
            customer_request.value = [...Customer_request.value];
        } else {
            customer_request.value = Customer_request.value.filter((fram) => {
                return fram.name.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }
    }, 200);
};
const searchFarms = (event) => {
    setTimeout(() => {
        if (!event.query.trim().length) {
            farms.value = [...Farms.value];
        } else {
            farms.value = Farms.value.filter((fram) => {
                return fram.name.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }
    }, 200);
};

function formatCSV(eventos) {
    const dataExport = [];
    dataExport.push(',' + Object.keys(eventos[0]) + '\n');
    dataExport.push(eventos.map((row) => Object.values(row) + '\n'));

    const blob = new Blob([dataExport.toString()], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename.value;
    link.click();
}

function formatXLS(eventos) {
    const data = eventos.map((row) => Object.values(row));
    const headers = Object.keys(eventos[0]);
    const prueba = [headers, ...data];
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(prueba, { headers });
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Reporte');
    const binaryData = XLSX.write(workbook, { type: 'array' });

    const file = new File([binaryData], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(file, filename.value + '.xlsx');
}

const DeleteRecord = async () => {
    formDialogDelete.value = false;

    try {
        const deletePromises = [];
        listRowSelect.value.forEach(async (item) => {
            const deletePromise = await deleteRequest(endpoint.value, item.uuid);
            deletePromises.push(deletePromise);
        });
        await Promise.all(deletePromises);
        loadingData();
        toast.add({ severity: 'success', summary: 'Deleted Record', detail: 'Deleted', life: 3000 });
    } catch (error) {
        console.error('Error deleting:', error);
        toast.add({ severity: 'error', summary: 'Error', detail: 'Error deleting', life: 3000 });
    } finally {
        listRowSelect.value = [];
    }
};

const remove = (aver) => {
    const index = listRowSelect.value.findIndex((x) => x.id === aver.id);
    if (index !== -1) {
        listRowSelect.value.splice(index, 1);
    }
};
</script>

<style lang="scss" scoped></style>
