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
                                <Button v-if="ability.can('solicitud_cliente_crear')" :disabled="headerNames.length > 0" label="New" icon="pi pi-plus" class="p-button-success mb-2 mt-2" @click="openNew" size="large" />
                                <Divider v-if="ability.can('solicitud_cliente_crear')" layout="vertical" />
                                <Button
                                    v-if="ability.can('solicitud_cliente_editar')"
                                    :disabled="!(listRowSelect.length > 0 && listRowSelect.length < 2)"
                                    label="Edit"
                                    icon="pi pi-file-edit"
                                    class="p-button-help mb-2 mt-2"
                                    @click="openEdit"
                                    size="large"
                                />
                                <Divider v-if="ability.can('solicitud_cliente_editar')" layout="vertical" />
                                <Button
                                    v-if="ability.can('solicitud_cliente_crear')"
                                    :disabled="!(listRowSelect.length > 0 && listRowSelect.length < 2)"
                                    label="Clone"
                                    icon="pi pi-copy"
                                    class="p-button-secondary mb-2 mt-2"
                                    @click="openClone"
                                    size="large"
                                />
                                <Divider v-if="ability.can('solicitud_cliente_editar')" layout="vertical" />
                                <Button v-if="ability.can('solicitud_cliente_editar')" :disabled="headerNames.length > 0" label="Export" icon="pi pi-file-import" class="p-button-warning mb-2 mt-2" @click="openExport" size="large" />
                                <Divider v-if="ability.can('solicitud_cliente_eliminar')" layout="vertical" />
                                <Button v-if="ability.can('solicitud_cliente_eliminar')" :disabled="!listRowSelect.length > 0" label="Delete" icon="pi pi-trash" class="p-button-danger mb-2 mt-2" @click="openDelete" size="large" />
                            </template>
                        </Toolbar>
                    </div>
                </div>
            </div>
            <!-- <pre>{{ dataResponseAPI }}</pre> -->
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
                :globalFilterFields="['name', 'company.name', 'farm.name', 'status.name', 'created_at', 'updated_at', 'dispatch_number_lot', 'order_number_customer', 'invoice_number_customer', 'delivery_datetime', 'packaging_presentation']"
                v-if="ability.can('solicitud_cliente_listado')"
            >
                <template #header>
                    <!--Uncomment when filters are done-->

                    <Toolbar class="mb-2">
                        <template v-slot:start>
                            <Button type="button" icon="pi pi-filter-slash" label="Limpiar" class="p-button-outlined mb-2" @click="clearFilter()" />
                        </template>
                        <template v-slot:end>
                            <span class="p-input-icon-left mb-2">
                                <i class="pi pi-search" />
                                <InputText v-model="filters['global'].value" placeholder="Buscar" style="width: 100%" />
                            </span>
                        </template>
                        <template v-slot:center>
                            <SelectButton v-model="size" :options="sizeOptions" optionLabel="label" dataKey="label"> </SelectButton>
                        </template>
                    </Toolbar>
                </template>

                <template #empty> No customers found. </template>
                <template #loading> Loading customers data. Please wait. </template>
                <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
                <Column field="dispatch_number_lot" filterField="dispatch_number_lot" header="Dispatch Num Lot" sortable :frozen="documentFrozen">
                    <!--Replace :frozen with the model-->
                    <template #header>
                        <ToggleButton v-model="documentFrozen" onIcon="pi pi-lock" offIcon="pi pi-lock-open" onLabel="" offLabel="" />
                        <div>&nbsp;</div>
                    </template>

                    <template #body="{ data }">
                        {{ data.dispatch_number_lot }}
                    </template>
                    <template #filter="{ filterModel }">
                        <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by " />
                    </template>
                </Column>

                <Column field="order_number_customer" filterField="order_number_customer" header="Order Number Customer" sortable>
                    <template #body="{ data }">
                        {{ data.order_number_customer }}
                    </template>
                    <template #filter="{ filterModel }">
                        <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by order Number Customer" />
                    </template>
                </Column>

                <Column field="invoice_number_customer" filterField="invoice_number_customer" header="Invoice Number Customer" sortable>
                    <template #body="{ data }">
                        {{ data.invoice_number_customer }}
                    </template>
                    <template #filter="{ filterModel }">
                        <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by Inovice Customer" />
                    </template>
                </Column>

                <Column field="customer_name" filterField="customer_name" header="Customer Name" sortable>
                    <template #body="{ data }">
                        {{ data.customer_name }}
                    </template>
                    <template #filter="{ filterModel }">
                        <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by Column" />
                    </template>
                </Column>

                <Column field="request_date" filterField="request_date" header="Request date" sortable>
                    <template #body="{ data }">
                        {{ data.request_date }}
                    </template>
                    <template #filter="{ filterModel }">
                        <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by column" />
                    </template>
                </Column>

                <Column field="delivery_datetime" filterField="delivery_datetime" dataType="date" header="Delivery Datetime" sortable>
                    <template #body="{ data }">
                        {{ data.delivery_datetime }}
                    </template>
                    <template #filter="{ filterModel }">
                        <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by Inovice Customer" />
                    </template>
                </Column>

                <Column field="packaging_presentation" filterField="packaging_presentation" header="Packaging Presentation" sortable>
                    <template #body="{ data }">
                        {{ data.packaging_presentation }}
                    </template>
                    <template #filter="{ filterModel }">
                        <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by Inovice Customer" />
                    </template>
                </Column>

                <Column field="outlet_temperature" filterField="outlet_temperature" header="Outlet Temperature" sortable>
                    <template #body="{ data }"> {{ data.outlet_temperature }} °C </template>
                    <template #filter="{ filterModel }">
                        <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by Column" />
                    </template>
                </Column>

                <Column field="request_qty" filterField="request_qty" header="Quantity requested" sortable>
                    <template #body="{ data }">
                        {{ data.request_qty }}
                    </template>
                    <template #filter="{ filterModel }">
                        <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by Column" />
                    </template>
                </Column>

                <Column field="packing_name_customer" filterField="packing_name_customer" header="Packing Name Customer" sortable>
                    <template #body="{ data }">
                        {{ data.packing_name_customer }}
                    </template>
                    <template #filter="{ filterModel }">
                        <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by Column" />
                    </template>
                </Column>

                <Column field="place_of_delivery" filterField="place_of_delivery" header="Place of delivery" sortable>
                    <template #body="{ data }">
                        {{ data.place_of_delivery }}
                    </template>
                    <template #filter="{ filterModel }">
                        <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by Column" />
                    </template>
                </Column>

                <Column field="employee_id.document" filterField="employee_id.document" header="Document Employee" sortable>
                    <template #body="{ data }">
                        {{ data.employee_id.document }}
                    </template>
                    <template #filter="{ filterModel }">
                        <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by Column" />
                    </template>
                </Column>

                <Column field="employee_id.name" filterField="employee_id.name" header="Name Employee" sortable>
                    <template #body="{ data }">
                        {{ data.employee_id.first_name + ' ' + data.employee_id.last_name }}
                    </template>
                    <template #filter="{ filterModel }">
                        <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by Column" />
                    </template>
                </Column>

                <Column field="unit_type_dispatch.name" filterField="unit_type_dispatch.name" header="Dispatch Unit Type" sortable>
                    <template #body="{ data }">
                        {{ data.unit_type_dispatch.name }}
                    </template>
                    <template #filter="{ filterModel }">
                        <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by Column" />
                    </template>
                </Column>

                <Column field="packing_type_dispatch.name" filterField="packing_type_dispatch.name" header="Packing Type Dispatch" sortable>
                    <template #body="{ data }">
                        {{ data.packing_type_dispatch.name }}
                    </template>
                    <template #filter="{ filterModel }">
                        <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by Column" />
                    </template>
                </Column>

                <Column field="packing_type.name" filterField="packing_type.name" header="Packing Type" sortable>
                    <template #body="{ data }">
                        {{ data.packing_type.name }}
                    </template>
                    <template #filter="{ filterModel }">
                        <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by Column" />
                    </template>
                </Column>

                <Column field="product.name" filterField="product.name" header="Product" sortable>
                    <template #body="{ data }">
                        {{ data.product.name }}
                    </template>
                    <template #filter="{ filterModel }">
                        <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by Column" />
                    </template>
                </Column>

                <Column field="product_type.name" filterField="product_type.name" header="Product Type" sortable>
                    <template #body="{ data }">
                        {{ data.product_type.name }}
                    </template>
                    <template #filter="{ filterModel }">
                        <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by Column" />
                    </template>
                </Column>

                <Column field="variant" filterField="variant" header="Variant" sortable>
                    <template #body="{ data }">
                        {{ data.variant && data.variant.name ? data.variant.name : 'N/A' }}
                    </template>
                    <template #filter="{ filterModel }">
                        <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by Column" />
                    </template>
                </Column>

                <!--Here add other columns-->

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
                        <Tag :value="data.status.name" :severity="'EFC88B'" />
                    </template>
                    <template #filter="{ filterModel }">
                        <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by status" />
                    </template>
                </Column>
            </DataTable>
            <Dialog v-model:visible="formDialogNew" modal :header="formDialogNewTitle" class="p-fluid text-center mx-auto">
                <!-- <pre>{{ prueba }}</pre> -->
                <!-- <pre>{{ prueba }}</pre>
                <pre>{{ errorsNew }}</pre> -->
                <Avatar icon="pi pi-user" class="mr-3" size="xlarge" shape="circle" />
                <span> Employee: {{ employeeNameDefault }} </span>
                <!-- <span> Credencial: {{ employeeUuidDefault }} </span> -->

                <Divider />

                <div class="flex mb-2 gap-2 justify-content-end">
                    <Button @click="active = 0" rounded label="1" class="w-2rem h-2rem p-0" :outlined="active !== 0" />
                    <Button @click="active = 1" rounded label="2" class="w-2rem h-2rem p-0" :outlined="active !== 1" />
                    <Button @click="active = 2" rounded label="3" class="w-2rem h-2rem p-0" :outlined="active !== 2" />
                </div>

                <TabView v-model:activeIndex="active">
                    <TabPanel header="Request">
                        <div class="grid">
                            <div class="mb-3 col-12 md:col-6 lg:col-3">
                                <div class="flex align-items-center gap-3 mb-1">
                                    <label for="order_number_customerV" class="font-semibold w-6rem">Order Number Customer</label>
                                    <InputText id="username" v-model="order_number_customerV" class="flex-auto" autocomplete="off" v-bind="order_number_customerVProps" />
                                </div>
                                <!-- <pre>{{order_number_customerV}}</pre> -->
                                <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['order_number_customerV'] }">
                                    {{ errorsNew.order_number_customerV }}
                                </small>

                                <BackendErrors :name="errorResponseAPI?.errors?.order_number_customer" />
                            </div>

                            <div class="mb-3 col-12 md:col-6 lg:col-3">
                                <div class="flex align-items-center gap-3 mb-1">
                                    <label for="invoice_number_customerV" class="font-semibold w-6rem">Invoice Number Customer</label>
                                    <InputText id="invoice_number_customerV" v-model="invoice_number_customerV" class="flex-auto" autocomplete="off" v-bind="invoice_number_customerVProps" />
                                </div>
                                <!-- <pre>{{invoice_number_customerV}}</pre> -->
                                <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['invoice_number_customerV'] }">
                                    {{ errorsNew.invoice_number_customerV }}
                                </small>

                                <BackendErrors :name="errorResponseAPI?.errors?.invoice_number_customer" />
                            </div>

                            <div class="mb-3 col-12 md:col-6 lg:col-3">
                                <div class="flex align-items-center gap-3 mb-1">
                                    <label for="customer_nameV" class="font-semibold w-6rem">Customer Name</label>
                                    <InputText id="customer_nameV" v-model="customer_nameV" class="flex-auto" autocomplete="off" v-bind="customer_nameVProps" />
                                </div>
                                <!-- <pre>{{customer_nameV}}</pre> -->
                                <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['customer_nameV'] }">
                                    {{ errorsNew.customer_nameV }}
                                </small>

                                <BackendErrors :name="errorResponseAPI?.errors?.customer_name" />
                            </div>

                            <div class="mb-3 col-12 md:col-6 lg:col-3">
                                <div class="flex align-items-center">
                                    <label for="request_dateV" class="font-semibold w-6rem">Request Date</label>
                                    <!-- <Calendar v-model="transaction_dateV" class="flex-auto" v-bind="transaction_dateVProps"/> -->
                                    <Calendar dateFormat="dd/mm/yy" v-model="request_dateV" class="flex-auto" showIcon :showOnFocus="false" inputId="buttondisplay" placeholder="Select request date" />
                                </div>
                                <!-- <pre>{{request_dateV}}</pre> -->

                                <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['request_dateV'] }">
                                    {{ errorsNew.request_dateV }}
                                </small>
                                <BackendErrors :name="errorResponseAPI?.errors?.request_date" />
                            </div>

                            <div class="mb-3 col-12 md:col-6 lg:col-3">
                                <div class="flex align-items-center">
                                    <label for="delivery_datetimeV" class="font-semibold w-6rem">Delivery Datetime :</label>
                                    <Calendar id="delivery_datetimeV-24h" v-model="delivery_datetimeV" showTime hourFormat="24" class="flex-auto" showIcon inputId="buttondisplay" />
                                </div>
                                <!-- <pre>{{delivery_datetimeV}}</pre> -->

                                <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['delivery_datetimeV'] }">
                                    {{ errorsNew.delivery_datetimeV }}
                                </small>
                                <BackendErrors :name="errorResponseAPI?.errors?.delivery_datetime" />
                            </div>

                            <div class="mb-3 col-12 md:col-6 lg:col-3">
                                <div class="flex align-items-center gap-3 mb-1">
                                    <label for="place_of_deliveryV" class="font-semibold w-6rem">Place of Delivery</label>
                                    <InputText id="place_of_deliveryV" v-model="place_of_deliveryV" class="flex-auto" autocomplete="off" v-bind="place_of_deliveryVProps" />
                                </div>
                                <!-- <pre>{{place_of_deliveryV}}</pre> -->
                                <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['place_of_deliveryV'] }">
                                    {{ errorsNew.place_of_deliveryV }}
                                </small>
                                <BackendErrors :name="errorResponseAPI?.errors?.place_of_delivery" />
                            </div>

                            <div class="mb-3 col-12 md:col-6 lg:col-3">
                                <div class="flex align-items-center gap-3 mb-1">
                                    <label for="dispatch_number_lotV" class="font-semibold w-6rem">Dispatch Number Lot</label>
                                    <InputText id="dispatch_number_lotV" v-model="dispatch_number_lotV" class="flex-auto" autocomplete="off" v-bind="dispatch_number_lotVProps" :frozen="documentFrozen" />
                                </div>
                                <!-- <pre>{{dispatch_number_lotV}}</pre> -->
                                <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['dispatch_number_lotV'] }">
                                    {{ errorsNew.dispatch_number_lotV }}
                                </small>
                                <BackendErrors :name="errorResponseAPI?.errors?.dispatch_number_lot" />
                            </div>
                            <div class="mb-3 col-12 md:col-6 lg:col-3">
                                <div class="flex align-items-center gap-3 mb-1">
                                    <label for="request_qty_V" class="font-semibold w-6rem">Request qty:</label>
                                    <InputNumber id="request_qty_V" v-model="request_qty_V" class="flex-auto" inputId="minmax" :min="0" :max="1000" />
                                </div>
                                <!-- <pre>{{request_qty_V}}</pre> -->
                                <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['request_qty_V'] }">
                                    {{ errorsNew.request_qty_V }}
                                </small>
                                <BackendErrors :name="errorResponseAPI?.errors?.request_qty" />
                            </div>

                            <div class="mb-3 col-12 md:col-6 lg:col-3">
                                <div class="flex align-items-center gap-3 mb-1">
                                    <label for="packing_name_customerV" class="font-semibold w-6rem">Packing Name Customer:</label>
                                    <InputText id="packing_name_customerV" v-model="packing_name_customerV" class="flex-auto" autocomplete="off" v-bind="packing_name_customerVProps" />
                                </div>
                                <!-- <pre>{{packing_name_customerV}}</pre> -->
                                <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['packing_name_customerV'] }">
                                    {{ errorsNew.packing_name_customerV }}
                                </small>
                                <BackendErrors :name="errorResponseAPI?.errors?.packing_name_customer" />
                            </div>

                            <div class="mb-3 col-12 md:col-6 lg:col-3">
                                <div class="flex align-items-center gap-3 mb-1">
                                    <label for="outlet_temperatureV" class="font-semibold w-6rem">Outlet temperature:</label>

                                    <InputNumber
                                        v-model="outlet_temperatureV"
                                        inputId="temperature"
                                        class="flex-auto"
                                        prefix="&uarr; "
                                        suffix="℃"
                                        :min="0"
                                        :max="40"
                                        :step="0.1"
                                        :decimal-separator="','"
                                        locale="en-US"
                                        :minFractionDigits="2"
                                        :maxFractionDigits="2"
                                    />
                                </div>
                                <!-- <pre>{{outlet_temperatureV}}</pre> -->
                                <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['outlet_temperatureV'] }">
                                    {{ errorsNew.outlet_temperatureV }}
                                </small>
                                <BackendErrors :name="errorResponseAPI?.errors?.outlet_temperature" />
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel header="Presentation">
                        <Divider />

                        <Card>
                            <template #header> </template>

                            <template #title>Presentation</template>

                            <template #content>
                                <div class="grid">
                                    <div class="mb-3 col-12 md:col-6 lg:col-3">
                                        <div class="flex align-items-center">
                                            <label for="packing_typeV" class="font-semibold w-6rem">Packing type:</label>
                                            <AutoComplete v-model="packing_typeV" class="flex-auto" inputId="ac" :suggestions="packingTypes" @complete="searchPackingType" field="name" dropdown />
                                        </div>
                                        <!-- <pre>{{packing_typeV}}</pre> -->
                                        <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['packing_typeV'] }">
                                            {{ errorsNew.packing_typeV }}
                                        </small>
                                        <BackendErrors :name="errorResponseAPI?.errors?.packing_type_uuid" />
                                    </div>

                                    <div class="mb-3 col-12 md:col-6 lg:col-3">
                                        <div class="flex align-items-center">
                                            <label for="productV" class="font-semibold w-6rem">Product:</label>
                                            <AutoComplete v-model="productV" class="flex-auto" inputId="ac" :suggestions="products" @complete="searchProduct" field="name" dropdown />
                                        </div>
                                        <!-- <pre>{{productV}}</pre> -->
                                        <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['productV'] }">
                                            {{ errorsNew.productV }}
                                        </small>
                                        <BackendErrors :name="errorResponseAPI?.errors?.product_uuid" />
                                    </div>

                                    <div class="mb-3 col-12 md:col-6 lg:col-3">
                                        <div class="flex align-items-center">
                                            <label for="variantV" class="font-semibold w-6rem">Variant:</label>
                                            <AutoComplete v-model="variantV" class="flex-auto" inputId="ac" :suggestions="variants" @complete="searchVariant" field="name" dropdown />
                                        </div>
                                        <!-- <pre>{{variantV}}</pre> -->
                                        <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['variantV'] }">
                                            {{ errorsNew.variantV }}
                                        </small>
                                        <BackendErrors :name="errorResponseAPI?.errors?.variant_uuid" />
                                    </div>

                                    <div class="mb-3 col-12 md:col-6 lg:col-3">
                                        <div class="flex align-items-center">
                                            <label for="product_typeV" class="font-semibold w-6rem">Product Type:</label>
                                            <AutoComplete v-model="product_typeV" class="flex-auto" inputId="ac" :suggestions="productsType" @complete="searchProductType" field="name" dropdown />
                                        </div>
                                        <!-- <pre>{{product_typeV}}</pre> -->
                                        <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['product_typeV'] }">
                                            {{ errorsNew.product_typeV }}
                                        </small>
                                        <BackendErrors :name="errorResponseAPI?.errors?.product_type_uuid" />
                                    </div>
                                </div>



                                <div class="grid">
                                    <div class="mb-3 col-12 md:col-6 lg:col-3">
                                        <div class="flex align-items-center">
                                            <label for="packing_qty_dispatchV" class="font-semibold w-6rem">Packing Quantity Dispatch:</label>
                                            <AutoComplete v-model="packing_qty_dispatchV" class="flex-auto" inputId="ac" :suggestions="packingsQtyDispatch" @complete="searchPackingQtyDispatch" field="name" dropdown />
                                        </div>
                                        <!-- <pre>{{packing_qty_dispatchV}}</pre> -->
                                        <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['packing_qty_dispatchV'] }">
                                            {{ errorsNew.packing_qty_dispatchV }}
                                        </small>
                                        <BackendErrors :name="errorResponseAPI?.errors?.packing_qty_dispatch" />
                                    </div>

                                    <div class="mb-3 col-12 md:col-6 lg:col-3">
                                        <div class="flex align-items-center">
                                            <label for="packing_type_dispatchV" class="font-semibold w-6rem">Packing Type Dispatch:</label>
                                            <AutoComplete v-model="packing_type_dispatchV" class="flex-auto" inputId="ac" :suggestions="packingsTypesDispatch" @complete="searchPackingTypeDispatch" field="name" dropdown />
                                        </div>
                                        <!-- <pre>{{packing_type_dispatchV}}</pre> -->
                                        <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['packing_type_dispatchV'] }">
                                            {{ errorsNew.packing_type_dispatchV }}
                                        </small>
                                        <BackendErrors :name="errorResponseAPI?.errors?.packing_type_dispatch_uuid" />
                                    </div>

                                    <div class="mb-3 col-12 md:col-6 lg:col-3">
                                        <div class="flex align-items-center">
                                            <label for="packing_dispatch_weightV" class="font-semibold w-6rem">Packing Dispatch Weight:</label>
                                            <AutoComplete v-model="packing_dispatch_weightV" class="flex-auto" inputId="ac" :suggestions="packingsWeightDispatch" @complete="searchPackingWeightDispatch" field="name" dropdown />
                                        </div>
                                        <!-- <pre>{{packing_dispatch_weightV}}</pre> -->
                                        <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['packing_dispatch_weightV'] }">
                                            {{ errorsNew.packing_dispatch_weightV }}
                                        </small>
                                        <BackendErrors :name="errorResponseAPI?.errors?.packing_dispatch_weight" />
                                    </div>

                                    <div class="mb-3 col-12 md:col-6 lg:col-3">
                                        <div class="flex align-items-center">
                                            <label for="username" class="font-semibold w-6rem">Unit type Dispatch:</label>
                                            <AutoComplete v-model="unit_type_dispatch_V" class="flex-auto" inputId="ac" :suggestions="unitsTypeDispatch" @complete="searchUnitsTypeDispatch" field="name" dropdown />
                                        </div>
                                        <!-- <pre>{{unit_type_dispatch_V}}</pre> -->
                                        <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['unit_type_dispatch_V'] }">
                                            {{ errorsNew.unit_type_dispatch_V }}
                                        </small>
                                        <BackendErrors :name="errorResponseAPI?.errors?.unit_type_dispatch_uuid" />
                                    </div>
                                </div>
                            </template>

                            <template #footer>
                                <Card>
                                    <template #title> {{ packing_qty_dispatchV.name }} X {{ packing_type_dispatchV.name }} X {{ packing_dispatch_weightV.name }} X {{ unit_type_dispatch_V.name }}</template>
                                    <template #content> </template>
                                </Card>
                            </template>
                        </Card>
                        

                        <Divider />

                        <div class="grid">
                                    <div class="mb-3 col-12 md:col-6 lg:col-6">
                                        <div class="flex align-items-center">
                                            <label for="farm" class="font-semibold w-6rem">Farm :</label>
                                            <AutoComplete v-model="farm" class="flex-auto" inputId="ac" :suggestions="farms" @complete="searchFarms" field="name" dropdown />
                                        </div>
                                        <!-- <pre>{{farm}}</pre> -->
                                        <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['farm'] }">
                                            {{ errorsNew.farm }}
                                        </small>
                                        <BackendErrors :name="errorResponseAPI?.errors?.farm_uuid" />
                                    </div>

                                    <div class="mb-3 col-12 md:col-6 lg:col-6">
                                        <div class="flex align-items-center">
                                            <label for="company" class="font-semibold w-6rem">Company:</label>
                                            <AutoComplete v-model="company" class="flex-auto" inputId="ac" :suggestions="compa" @complete="searchCompannies" field="name" dropdown />
                                        </div>
                                        <!-- <pre>{{company}}</pre> -->
                                        <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['company'] }">
                                            {{ errorsNew.company }}
                                        </small>
                                        <BackendErrors :name="errorResponseAPI?.errors?.company_uuid" />
                                    </div>
                                </div>
                    </TabPanel>
                    <TabPanel header="Summarize">
                        <Timeline :value="events" class="mb-3 col-12 md:col-12 lg:col-12">
                            <template #opposite="slotProps">
                                <small class="p-text-secondary">{{ slotProps.item.date }}</small>
                            </template>
                            <template #content="slotProps">
                                {{ slotProps.item.status }}
                            </template>
                        </Timeline>
                    </TabPanel>
                </TabView>

                <!-- <InputText type="text" v-model="value" /> -->

                <div class="flex justify-content-end gap-2">
                    <Button type="button" label="Cancel" severity="secondary" @click="formDialogNew = false" />
                    <Button type="button" label="Save" @click="createRecord()" />
                </div>
            </Dialog>

            <Dialog v-model:visible="formDialogEdit" modal :header="formDialogEditTitle" class="p-fluid text-center mx-auto">
                <!-- <pre>{{ prueba }}</pre> -->

                <Avatar icon="pi pi-user" class="mr-3" size="xlarge" shape="circle" />
                <span> Employee: {{ employeeNameDefault }} </span>

                <Divider />

                <div class="flex mb-2 gap-2 justify-content-end">
                    <Button @click="active = 0" rounded label="1" class="w-2rem h-2rem p-0" :outlined="active !== 0" />
                    <Button @click="active = 1" rounded label="2" class="w-2rem h-2rem p-0" :outlined="active !== 1" />
                    <Button @click="active = 2" rounded label="3" class="w-2rem h-2rem p-0" :outlined="active !== 2" />
                </div>

                <TabView v-model:activeIndex="active">
                    <TabPanel header="Request">
                        <div class="grid">
                            <div class="mb-3 col-12 md:col-6 lg:col-3">
                                <div class="flex align-items-center gap-3 mb-1">
                                    <label for="order_number_customerV" class="font-semibold w-6rem">Order Number Customer</label>
                                    <InputText id="username" v-model="order_number_customerV" class="flex-auto" autocomplete="off" v-bind="order_number_customerVProps" />
                                </div>
                                <!-- <pre>{{order_number_customerV}}</pre> -->
                                <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['order_number_customerV'] }">
                                    {{ errorsNew.order_number_customerV }}
                                </small>
                                <BackendErrors :name="errorResponseAPI?.errors?.order_number_customer" />
                            </div>

                            <div class="mb-3 col-12 md:col-6 lg:col-3">
                                <div class="flex align-items-center gap-3 mb-1">
                                    <label for="invoice_number_customerV" class="font-semibold w-6rem">Invoice Number Customer</label>
                                    <InputText id="invoice_number_customerV" v-model="invoice_number_customerV" class="flex-auto" autocomplete="off" v-bind="invoice_number_customerVProps" />
                                </div>
                                <!-- <pre>{{invoice_number_customerV}}</pre> -->
                                <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['invoice_number_customerV'] }">
                                    {{ errorsNew.invoice_number_customerV }}
                                </small>
                                <BackendErrors :name="errorResponseAPI?.errors?.invoice_number_customer" />
                            </div>

                            <div class="mb-3 col-12 md:col-6 lg:col-3">
                                <div class="flex align-items-center gap-3 mb-1">
                                    <label for="customer_nameV" class="font-semibold w-6rem">Customer Name</label>
                                    <InputText id="customer_nameV" v-model="customer_nameV" class="flex-auto" autocomplete="off" v-bind="customer_nameVProps" />
                                </div>
                                <!-- <pre>{{customer_nameV}}</pre> -->
                                <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['customer_nameV'] }">
                                    {{ errorsNew.customer_nameV }}
                                </small>
                                <BackendErrors :name="errorResponseAPI?.errors?.customer_name" />
                            </div>

                            <div class="mb-3 col-12 md:col-6 lg:col-3">
                                <div class="flex align-items-center">
                                    <label for="request_dateV" class="font-semibold w-6rem">Request Date</label>
                                    <!-- <Calendar v-model="transaction_dateV" class="flex-auto" v-bind="transaction_dateVProps"/> -->
                                    <Calendar dateFormat="dd/mm/yy" v-model="request_dateV" class="flex-auto" showIcon :showOnFocus="false" inputId="buttondisplay" placeholder="Select request date" />
                                </div>
                                <!-- <pre>{{request_dateV}}</pre> -->

                                <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['request_dateV'] }">
                                    {{ errorsNew.request_dateV }}
                                </small>
                                <BackendErrors :name="errorResponseAPI?.errors?.request_date" />
                            </div>

                            <div class="mb-3 col-12 md:col-6 lg:col-3">
                                <div class="flex align-items-center">
                                    <label for="delivery_datetimeV" class="font-semibold w-6rem">Delivery Datetime :</label>
                                    <Calendar id="delivery_datetimeV-24h" v-model="delivery_datetimeV" showTime hourFormat="24" class="flex-auto" showIcon inputId="buttondisplay" />
                                </div>
                                <!-- <pre>{{delivery_datetimeV}}</pre> -->

                                <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['delivery_datetimeV'] }">
                                    {{ errorsNew.delivery_datetimeV }}
                                </small>
                                <BackendErrors :name="errorResponseAPI?.errors?.delivery_datetime" />
                            </div>

                            <div class="mb-3 col-12 md:col-6 lg:col-3">
                                <div class="flex align-items-center gap-3 mb-1">
                                    <label for="place_of_deliveryV" class="font-semibold w-6rem">Place of Delivery</label>
                                    <InputText id="place_of_deliveryV" v-model="place_of_deliveryV" class="flex-auto" autocomplete="off" v-bind="place_of_deliveryVProps" />
                                </div>
                                <!-- <pre>{{place_of_deliveryV}}</pre> -->
                                <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['place_of_deliveryV'] }">
                                    {{ errorsNew.place_of_deliveryV }}
                                </small>
                                <BackendErrors :name="errorResponseAPI?.errors?.place_of_delivery" />
                            </div>

                            <div class="mb-3 col-12 md:col-6 lg:col-3">
                                <div class="flex align-items-center gap-3 mb-1">
                                    <label for="dispatch_number_lotV" class="font-semibold w-6rem">Dispatch Number Lot</label>
                                    <InputText id="dispatch_number_lotV" v-model="dispatch_number_lotV" class="flex-auto" autocomplete="off" v-bind="dispatch_number_lotVProps" :frozen="documentFrozen" />
                                </div>
                                <!-- <pre>{{dispatch_number_lotV}}</pre> -->
                                <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['dispatch_number_lotV'] }">
                                    {{ errorsNew.dispatch_number_lotV }}
                                </small>
                                <BackendErrors :name="errorResponseAPI?.errors?.dispatch_number_lot" />
                            </div>
                            <div class="mb-3 col-12 md:col-6 lg:col-3">
                                <div class="flex align-items-center gap-3 mb-1">
                                    <label for="request_qty_V" class="font-semibold w-6rem">Request qty:</label>
                                    <InputNumber id="request_qty_V" v-model="request_qty_V" class="flex-auto" inputId="minmax" :min="0" :max="1000" />
                                </div>
                                <!-- <pre>{{request_qty_V}}</pre> -->
                                <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['request_qty_V'] }">
                                    {{ errorsNew.request_qty_V }}
                                </small>
                                <BackendErrors :name="errorResponseAPI?.errors?.request_qty" />
                            </div>

                            <div class="mb-3 col-12 md:col-6 lg:col-3">
                                <div class="flex align-items-center gap-3 mb-1">
                                    <label for="packing_name_customerV" class="font-semibold w-6rem">Packing Name Customer:</label>
                                    <InputText id="packing_name_customerV" v-model="packing_name_customerV" class="flex-auto" autocomplete="off" v-bind="packing_name_customerVProps" />
                                </div>
                                <!-- <pre>{{packing_name_customerV}}</pre> -->
                                <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['packing_name_customerV'] }">
                                    {{ errorsNew.packing_name_customerV }}
                                </small>
                                <BackendErrors :name="errorResponseAPI?.errors?.packing_name_customer" />
                            </div>

                            <div class="mb-3 col-12 md:col-6 lg:col-3">
                                <div class="flex align-items-center gap-3 mb-1">
                                    <label for="outlet_temperatureV" class="font-semibold w-6rem">Outlet temperature:</label>

                                    <InputNumber
                                        v-model="outlet_temperatureV"
                                        inputId="temperature"
                                        class="flex-auto"
                                        prefix="&uarr; "
                                        suffix="℃"
                                        :min="0"
                                        :max="40"
                                        :step="0.1"
                                        :decimal-separator="','"
                                        locale="en-US"
                                        :minFractionDigits="2"
                                        :maxFractionDigits="2"
                                    />
                                </div>
                                <!-- <pre>{{outlet_temperatureV}}</pre> -->
                                <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['outlet_temperatureV'] }">
                                    {{ errorsNew.outlet_temperatureV }}
                                </small>
                                <BackendErrors :name="errorResponseAPI?.errors?.outlet_temperature" />
                            </div>


                        </div>
                    </TabPanel>
                    <TabPanel header="Presentation">
                        <Divider />

                        <Card>
                            <template #header> </template>

                            <template #title>Presentation</template>

                            <template #content>
                                <div class="grid">
                                    <div class="mb-3 col-12 md:col-6 lg:col-3">
                                        <div class="flex align-items-center">
                                            <label for="packing_typeV" class="font-semibold w-6rem">Packing type:</label>
                                            <AutoComplete v-model="packing_typeV" class="flex-auto" inputId="ac" :suggestions="packingTypes" @complete="searchPackingType" field="name" dropdown />
                                        </div>
                                        <!-- <pre>{{packing_typeV}}</pre> -->
                                        <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['packing_typeV'] }">
                                            {{ errorsNew.packing_typeV }}
                                        </small>
                                        <BackendErrors :name="errorResponseAPI?.errors?.packing_type_uuid" />
                                    </div>

                                    <div class="mb-3 col-12 md:col-6 lg:col-3">
                                        <div class="flex align-items-center">
                                            <label for="productV" class="font-semibold w-6rem">Product:</label>
                                            <AutoComplete v-model="productV" class="flex-auto" inputId="ac" :suggestions="products" @complete="searchProduct" field="name" dropdown />
                                        </div>
                                        <!-- <pre>{{productV}}</pre> -->
                                        <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['productV'] }">
                                            {{ errorsNew.productV }}
                                        </small>
                                        <BackendErrors :name="errorResponseAPI?.errors?.product_uuid" />
                                    </div>

                                    <div class="mb-3 col-12 md:col-6 lg:col-3">
                                        <div class="flex align-items-center">
                                            <label for="variantV" class="font-semibold w-6rem">Variant:</label>
                                            <AutoComplete v-model="variantV" class="flex-auto" inputId="ac" :suggestions="variants" @complete="searchVariant" field="name" dropdown />
                                        </div>
                                        <!-- <pre>{{variantV}}</pre> -->
                                        <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['variantV'] }">
                                            {{ errorsNew.variantV }}
                                        </small>
                                        <BackendErrors :name="errorResponseAPI?.errors?.variant_uuid" />
                                    </div>

                                    <div class="mb-3 col-12 md:col-6 lg:col-3">
                                        <div class="flex align-items-center">
                                            <label for="product_typeV" class="font-semibold w-6rem">Product Type:</label>
                                            <AutoComplete v-model="product_typeV" class="flex-auto" inputId="ac" :suggestions="productsType" @complete="searchProductType" field="name" dropdown />
                                        </div>
                                        <!-- <pre>{{product_typeV}}</pre> -->

                                        <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['product_typeV'] }">
                                            {{ errorsNew.product_typeV }}
                                        </small>
                                        <BackendErrors :name="errorResponseAPI?.errors?.product_type_uuid" />
                                    </div>
                                </div>



                                <div class="grid">
                                    <div class="mb-3 col-12 md:col-6 lg:col-3">
                                        <div class="flex align-items-center">
                                            <label for="packing_qty_dispatchV" class="font-semibold w-6rem">Packing Quantity Dispatch:</label>
                                            <AutoComplete v-model="packing_qty_dispatchV" class="flex-auto" inputId="ac" :suggestions="packingsQtyDispatch" @complete="searchPackingQtyDispatch" field="name" dropdown />
                                        </div>
                                        <!-- <pre>{{packing_qty_dispatchV}}</pre> -->
                                        <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['packing_qty_dispatchV'] }">
                                            {{ errorsNew.packing_qty_dispatchV }}
                                        </small>
                                        <BackendErrors :name="errorResponseAPI?.errors?.packing_qty_dispatch" />
                                    </div>

                                    <div class="mb-3 col-12 md:col-6 lg:col-3">
                                        <div class="flex align-items-center">
                                            <label for="packing_type_dispatchV" class="font-semibold w-6rem">Packing Type Dispatch:</label>
                                            <AutoComplete v-model="packing_type_dispatchV" class="flex-auto" inputId="ac" :suggestions="packingsTypesDispatch" @complete="searchPackingTypeDispatch" field="name" dropdown />
                                        </div>
                                        <!-- <pre>{{packing_type_dispatchV}}</pre> -->
                                        <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['packing_type_dispatchV'] }">
                                            {{ errorsNew.packing_type_dispatchV }}
                                        </small>
                                        <BackendErrors :name="errorResponseAPI?.errors?.packing_type_dispatch_uuid" />
                                    </div>

                                    <div class="mb-3 col-12 md:col-6 lg:col-3">
                                        <div class="flex align-items-center">
                                            <label for="packing_dispatch_weightV" class="font-semibold w-6rem">Packing Dispatch Weight:</label>
                                            <AutoComplete v-model="packing_dispatch_weightV" class="flex-auto" inputId="ac" :suggestions="packingsWeightDispatch" @complete="searchPackingWeightDispatch" field="name" dropdown />
                                        </div>
                                        <!-- <pre>{{packing_dispatch_weightV}}</pre> -->
                                        <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['packing_dispatch_weightV'] }">
                                            {{ errorsNew.packing_dispatch_weightV }}
                                        </small>
                                        <BackendErrors :name="errorResponseAPI?.errors?.packing_dispatch_weight" />
                                    </div>

                                    <div class="mb-3 col-12 md:col-6 lg:col-3">
                                        <div class="flex align-items-center">
                                            <label for="username" class="font-semibold w-6rem">Unit type Dispatch:</label>
                                            <AutoComplete v-model="unit_type_dispatch_V" class="flex-auto" inputId="ac" :suggestions="unitsTypeDispatch" @complete="searchUnitsTypeDispatch" field="name" dropdown />
                                        </div>
                                        <!-- <pre>{{unit_type_dispatch_V}}</pre> -->
                                        <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['unit_type_dispatch_V'] }">
                                            {{ errorsNew.unit_type_dispatch_V }}
                                        </small>
                                        <BackendErrors :name="errorResponseAPI?.errors?.unit_type_dispatch_uuid" />
                                    </div>
                                </div>
                            </template>

                            <template #footer>
                                <Card>
                                    <template #title> {{ packing_qty_dispatchV.name }} X {{ packing_type_dispatchV.name }} X {{ packing_dispatch_weightV.name }} X {{ unit_type_dispatch_V.name }}</template>
                                    <template #content> </template>
                                </Card>
                            </template>
                        </Card>

                        <Divider />

                        <div class="grid">
                                    <div class="mb-3 col-12 md:col-6 lg:col-6">
                                        <div class="flex align-items-center">
                                            <label for="farm" class="font-semibold w-6rem">Farm :</label>
                                            <AutoComplete v-model="farm" class="flex-auto" inputId="ac" :suggestions="farms" @complete="searchFarms" field="name" dropdown />
                                        </div>
                                        <!-- <pre>{{farm}}</pre> -->
                                        <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['farm'] }">
                                            {{ errorsNew.farm }}
                                        </small>
                                        <BackendErrors :name="errorResponseAPI?.errors?.farm_uuid" />
                                    </div>

                                    <div class="mb-3 col-12 md:col-6 lg:col-6">
                                        <div class="flex align-items-center">
                                            <label for="company" class="font-semibold w-6rem">Company:</label>
                                            <AutoComplete v-model="company" class="flex-auto" inputId="ac" :suggestions="compa" @complete="searchCompannies" field="name" dropdown />
                                        </div>
                                        <!-- <pre>{{company}}</pre> -->
                                        <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['company'] }">
                                            {{ errorsNew.company }}
                                        </small>
                                        <BackendErrors :name="errorResponseAPI?.errors?.company_uuid" />
                                    </div>
                                </div>
                    </TabPanel>
                    <TabPanel header="Summarize">
                        <Timeline :value="events" class="mb-3 col-12 md:col-12 lg:col-12">
                            <template #opposite="slotProps">
                                <small class="p-text-secondary">{{ slotProps.item.date }}</small>
                            </template>
                            <template #content="slotProps">
                                {{ slotProps.item.status }}
                            </template>
                        </Timeline>
                    </TabPanel>
                </TabView>

                <div class="flex justify-content-end gap-2">
                    <Button type="button" label="Cancel" severity="secondary" @click="formDialogEdit = false" />
                    <Button type="button" label="Save" @click="EditRecord()" />
                </div>
            </Dialog>

            <Dialog v-model:visible="formDialogClone" modal :header="formDialogCloneTitle" class="p-fluid text-center mx-auto">

                <Avatar icon="pi pi-user" class="mr-3" size="xlarge" shape="circle" />
                <span> Employee: {{ employeeNameDefault }} </span>

                <Divider />

                <div class="flex mb-2 gap-2 justify-content-end">
                    <Button @click="active = 0" rounded label="1" class="w-2rem h-2rem p-0" :outlined="active !== 0" />
                    <Button @click="active = 1" rounded label="2" class="w-2rem h-2rem p-0" :outlined="active !== 1" />
                    <Button @click="active = 2" rounded label="3" class="w-2rem h-2rem p-0" :outlined="active !== 2" />
                </div>

                <TabView v-model:activeIndex="active">
                    <TabPanel header="Request">
                        <div class="grid">
                            <div class="mb-3 col-12 md:col-6 lg:col-3">
                                <div class="flex align-items-center gap-3 mb-1">
                                    <label for="order_number_customerV" class="font-semibold w-6rem">Order Number Customer</label>
                                    <InputText id="username" v-model="order_number_customerV" class="flex-auto" autocomplete="off" v-bind="order_number_customerVProps" />
                                </div>
                                <!-- <pre>{{order_number_customerV}}</pre> -->
                                <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['order_number_customerV'] }">
                                    {{ errorsNew.order_number_customerV }}
                                </small>
                                <BackendErrors :name="errorResponseAPI?.errors?.order_number_customer" />
                            </div>

                            <div class="mb-3 col-12 md:col-6 lg:col-3">
                                <div class="flex align-items-center gap-3 mb-1">
                                    <label for="invoice_number_customerV" class="font-semibold w-6rem">Invoice Number Customer</label>
                                    <InputText id="invoice_number_customerV" v-model="invoice_number_customerV" class="flex-auto" autocomplete="off" v-bind="invoice_number_customerVProps" />
                                </div>
                                <!-- <pre>{{invoice_number_customerV}}</pre> -->
                                <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['invoice_number_customerV'] }">
                                    {{ errorsNew.invoice_number_customerV }}
                                </small>
                                <BackendErrors :name="errorResponseAPI?.errors?.invoice_number_customer" />
                            </div>

                            <div class="mb-3 col-12 md:col-6 lg:col-3">
                                <div class="flex align-items-center gap-3 mb-1">
                                    <label for="customer_nameV" class="font-semibold w-6rem">Customer Name</label>
                                    <InputText id="customer_nameV" v-model="customer_nameV" class="flex-auto" autocomplete="off" v-bind="customer_nameVProps" />
                                </div>
                                <!-- <pre>{{customer_nameV}}</pre> -->
                                <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['customer_nameV'] }">
                                    {{ errorsNew.customer_nameV }}
                                </small>
                                <BackendErrors :name="errorResponseAPI?.errors?.customer_name" />
                            </div>

                            <div class="mb-3 col-12 md:col-6 lg:col-3">
                                <div class="flex align-items-center">
                                    <label for="request_dateV" class="font-semibold w-6rem">Request Date</label>
                                    <!-- <Calendar v-model="transaction_dateV" class="flex-auto" v-bind="transaction_dateVProps"/> -->
                                    <Calendar dateFormat="dd/mm/yy" v-model="request_dateV" class="flex-auto" showIcon :showOnFocus="false" inputId="buttondisplay" placeholder="Select request date" />
                                </div>
                                <!-- <pre>{{request_dateV}}</pre> -->

                                <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['request_dateV'] }">
                                    {{ errorsNew.request_dateV }}
                                </small>
                                <BackendErrors :name="errorResponseAPI?.errors?.request_date" />
                            </div>

                            <div class="mb-3 col-12 md:col-6 lg:col-3">
                                <div class="flex align-items-center">
                                    <label for="delivery_datetimeV" class="font-semibold w-6rem">Delivery Datetime :</label>
                                    <Calendar id="delivery_datetimeV-24h" v-model="delivery_datetimeV" showTime hourFormat="24" class="flex-auto" showIcon inputId="buttondisplay" />
                                </div>
                                <!-- <pre>{{delivery_datetimeV}}</pre> -->

                                <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['delivery_datetimeV'] }">
                                    {{ errorsNew.delivery_datetimeV }}
                                </small>
                                <BackendErrors :name="errorResponseAPI?.errors?.delivery_datetime" />
                            </div>

                            <div class="mb-3 col-12 md:col-6 lg:col-3">
                                <div class="flex align-items-center gap-3 mb-1">
                                    <label for="place_of_deliveryV" class="font-semibold w-6rem">Place of Delivery</label>
                                    <InputText id="place_of_deliveryV" v-model="place_of_deliveryV" class="flex-auto" autocomplete="off" v-bind="place_of_deliveryVProps" />
                                </div>
                                <!-- <pre>{{place_of_deliveryV}}</pre> -->
                                <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['place_of_deliveryV'] }">
                                    {{ errorsNew.place_of_deliveryV }}
                                </small>
                                <BackendErrors :name="errorResponseAPI?.errors?.place_of_delivery" />
                            </div>

                            <div class="mb-3 col-12 md:col-6 lg:col-3">
                                <div class="flex align-items-center gap-3 mb-1">
                                    <label for="dispatch_number_lotV" class="font-semibold w-6rem">Dispatch Number Lot</label>
                                    <InputText id="dispatch_number_lotV" v-model="dispatch_number_lotV" class="flex-auto" autocomplete="off" v-bind="dispatch_number_lotVProps" :frozen="documentFrozen" />
                                </div>
                                <!-- <pre>{{dispatch_number_lotV}}</pre> -->
                                <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['dispatch_number_lotV'] }">
                                    {{ errorsNew.dispatch_number_lotV }}
                                </small>
                                <BackendErrors :name="errorResponseAPI?.errors?.dispatch_number_lot" />
                            </div>
                            <div class="mb-3 col-12 md:col-6 lg:col-3">
                                <div class="flex align-items-center gap-3 mb-1">
                                    <label for="request_qty_V" class="font-semibold w-6rem">Request qty:</label>
                                    <InputNumber id="request_qty_V" v-model="request_qty_V" class="flex-auto" inputId="minmax" :min="0" :max="1000" />
                                </div>
                                <!-- <pre>{{request_qty_V}}</pre> -->
                                <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['request_qty_V'] }">
                                    {{ errorsNew.request_qty_V }}
                                </small>
                                <BackendErrors :name="errorResponseAPI?.errors?.request_qty" />
                            </div>

                            <div class="mb-3 col-12 md:col-6 lg:col-3">
                                <div class="flex align-items-center gap-3 mb-1">
                                    <label for="packing_name_customerV" class="font-semibold w-6rem">Packing Name Customer:</label>
                                    <InputText id="packing_name_customerV" v-model="packing_name_customerV" class="flex-auto" autocomplete="off" v-bind="packing_name_customerVProps" />
                                </div>
                                <!-- <pre>{{packing_name_customerV}}</pre> -->
                                <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['packing_name_customerV'] }">
                                    {{ errorsNew.packing_name_customerV }}
                                </small>
                                <BackendErrors :name="errorResponseAPI?.errors?.packing_name_customer" />
                            </div>

                            <div class="mb-3 col-12 md:col-6 lg:col-3">
                                <div class="flex align-items-center gap-3 mb-1">
                                    <label for="outlet_temperatureV" class="font-semibold w-6rem">Outlet temperature:</label>

                                    <InputNumber
                                        v-model="outlet_temperatureV"
                                        inputId="temperature"
                                        class="flex-auto"
                                        prefix="&uarr; "
                                        suffix="℃"
                                        :min="0"
                                        :max="40"
                                        :step="0.1"
                                        :decimal-separator="','"
                                        locale="en-US"
                                        :minFractionDigits="2"
                                        :maxFractionDigits="2"
                                    />
                                </div>
                                <!-- <pre>{{outlet_temperatureV}}</pre> -->
                                <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['outlet_temperatureV'] }">
                                    {{ errorsNew.outlet_temperatureV }}
                                </small>
                                <BackendErrors :name="errorResponseAPI?.errors?.outlet_temperature" />
                            </div>

                            <!-- <div class="mb-3 col-12 md:col-6 lg:col-3">
                                <div class="flex align-items-center">
                                    <label for="productV" class="font-semibold w-6rem">Product:</label>
                                    <AutoComplete v-model="productV" class="flex-auto" inputId="ac"
                                        :suggestions="products" @complete="searchProduct" field="name" dropdown />
                                </div>
                                
                                <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['productV'] }">
                                    {{ errorsNew.productV }}
                                </small>
                            </div>

                            <div class="mb-3 col-12 md:col-6 lg:col-3">
                                <div class="flex align-items-center">
                                    <label for="product_typeV" class="font-semibold w-6rem">Product Type:</label>
                                    <AutoComplete v-model="product_typeV" class="flex-auto" inputId="ac"
                                        :suggestions="productsType" @complete="searchProductType" field="name"
                                        dropdown />
                                </div>
                                
                                <small id="username-help"
                                    :class="{ 'p-invalid text-red-700': errorsNew['product_typeV'] }">
                                    {{ errorsNew.product_typeV }}
                                </small>
                            </div> -->

                            <!-- <div class="mb-3 col-12 md:col-6 lg:col-3">
                                <div class="flex align-items-center">
                                    <label for="variantV" class="font-semibold w-6rem">Variant:</label>
                                    <AutoComplete v-model="variantV" class="flex-auto" inputId="ac"
                                        :suggestions="variants" @complete="searchVariant" field="name" dropdown />
                                </div>
                                
                                <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['variantV'] }">
                                    {{ errorsNew.variantV }}
                                </small>
                                <BackendErrors :name="errorResponseAPI?.errors?.variant_uuid" />
                            </div> -->

                            <!-- <div class="mb-3 col-12 md:col-6 lg:col-3">
                                <div class="flex align-items-center">
                                    <label for="packing_typeV" class="font-semibold w-6rem">Packing type:</label>
                                    <AutoComplete v-model="packing_typeV" class="flex-auto" inputId="ac"
                                        :suggestions="packingTypes" @complete="searchPackingType" field="name"
                                        dropdown />
                                </div>
                                
                                <small id="username-help"
                                    :class="{ 'p-invalid text-red-700': errorsNew['packing_typeV'] }">
                                    {{ errorsNew.packing_typeV }}
                                </small>
                            </div>

                            <div class="mb-3 col-12 md:col-6 lg:col-3">
                                <div class="flex align-items-center">
                                    <label for="farm" class="font-semibold w-6rem">Farm :</label>
                                    <AutoComplete v-model="farm" class="flex-auto" inputId="ac" :suggestions="farms"
                                        @complete="searchFarms" field="name" dropdown />
                                </div>
                                
                                <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['farm'] }">
                                    {{ errorsNew.farm }}
                                </small>
                            </div>

                            <div class="mb-3 col-12 md:col-6 lg:col-3">
                                <div class="flex align-items-center">
                                    <label for="company" class="font-semibold w-6rem">Company:</label>
                                    <AutoComplete v-model="company" class="flex-auto" inputId="ac" :suggestions="compa"
                                        @complete="searchCompannies" field="name" dropdown />
                                </div>
                                
                                <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['company'] }">
                                    {{ errorsNew.company }}
                                </small>
                            </div> -->
                        </div>
                    </TabPanel>
                    <TabPanel header="Presentation">
                        <Divider />

                        <Card>
                            <template #header> </template>

                            <template #title>Presentation</template>

                            <template #content>
                                <div class="grid">
                                    <div class="mb-3 col-12 md:col-6 lg:col-3">
                                        <div class="flex align-items-center">
                                            <label for="packing_typeV" class="font-semibold w-6rem">Packing type:</label>
                                            <AutoComplete v-model="packing_typeV" class="flex-auto" inputId="ac" :suggestions="packingTypes" @complete="searchPackingType" field="name" dropdown />
                                        </div>
                                        <!-- <pre>{{packing_typeV}}</pre> -->
                                        <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['packing_typeV'] }">
                                            {{ errorsNew.packing_typeV }}
                                        </small>
                                        <BackendErrors :name="errorResponseAPI?.errors?.packing_type_uuid" />
                                    </div>

                                    <div class="mb-3 col-12 md:col-6 lg:col-3">
                                        <div class="flex align-items-center">
                                            <label for="productV" class="font-semibold w-6rem">Product:</label>
                                            <AutoComplete v-model="productV" class="flex-auto" inputId="ac" :suggestions="products" @complete="searchProduct" field="name" dropdown />
                                        </div>
                                        <!-- <pre>{{productV}}</pre> -->
                                        <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['productV'] }">
                                            {{ errorsNew.productV }}
                                        </small>
                                        <BackendErrors :name="errorResponseAPI?.errors?.product_uuid" />
                                    </div>

                                    <div class="mb-3 col-12 md:col-6 lg:col-3">
                                        <div class="flex align-items-center">
                                            <label for="variantV" class="font-semibold w-6rem">Variant:</label>
                                            <AutoComplete v-model="variantV" class="flex-auto" inputId="ac" :suggestions="variants" @complete="searchVariant" field="name" dropdown />
                                        </div>

                                        <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['variantV'] }">
                                            {{ errorsNew.variantV }}
                                        </small>
                                        <BackendErrors :name="errorResponseAPI?.errors?.variant_uuid" />
                                    </div>

                                    <div class="mb-3 col-12 md:col-6 lg:col-3">
                                        <div class="flex align-items-center">
                                            <label for="product_typeV" class="font-semibold w-6rem">Product Type:</label>
                                            <AutoComplete v-model="product_typeV" class="flex-auto" inputId="ac" :suggestions="productsType" @complete="searchProductType" field="name" dropdown />
                                        </div>
                                        <!-- <pre>{{product_typeV}}</pre> -->
                                        <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['product_typeV'] }">
                                            {{ errorsNew.product_typeV }}
                                        </small>
                                        <BackendErrors :name="errorResponseAPI?.errors?.product_type_uuid" />
                                    </div>
                                </div>



                                <div class="grid">
                                    <div class="mb-3 col-12 md:col-6 lg:col-3">
                                        <div class="flex align-items-center">
                                            <label for="packing_qty_dispatchV" class="font-semibold w-6rem">Packing Quantity Dispatch:</label>
                                            <AutoComplete v-model="packing_qty_dispatchV" class="flex-auto" inputId="ac" :suggestions="packingsQtyDispatch" @complete="searchPackingQtyDispatch" field="name" dropdown />
                                        </div>
                                        <!-- <pre>{{packing_qty_dispatchV}}</pre> -->
                                        <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['packing_qty_dispatchV'] }">
                                            {{ errorsNew.packing_qty_dispatchV }}
                                        </small>
                                        <BackendErrors :name="errorResponseAPI?.errors?.packing_qty_dispatch" />
                                    </div>

                                    <div class="mb-3 col-12 md:col-6 lg:col-3">
                                        <div class="flex align-items-center">
                                            <label for="packing_type_dispatchV" class="font-semibold w-6rem">Packing Type Dispatch:</label>
                                            <AutoComplete v-model="packing_type_dispatchV" class="flex-auto" inputId="ac" :suggestions="packingsTypesDispatch" @complete="searchPackingTypeDispatch" field="name" dropdown />
                                        </div>
                                        <!-- <pre>{{packing_type_dispatchV}}</pre> -->
                                        <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['packing_type_dispatchV'] }">
                                            {{ errorsNew.packing_type_dispatchV }}
                                        </small>
                                        <BackendErrors :name="errorResponseAPI?.errors?.packing_type_dispatch_uuid" />
                                    </div>

                                    <div class="mb-3 col-12 md:col-6 lg:col-3">
                                        <div class="flex align-items-center">
                                            <label for="packing_dispatch_weightV" class="font-semibold w-6rem">Packing Dispatch Weight:</label>
                                            <AutoComplete v-model="packing_dispatch_weightV" class="flex-auto" inputId="ac" :suggestions="packingsWeightDispatch" @complete="searchPackingWeightDispatch" field="name" dropdown />
                                        </div>
                                        <!-- <pre>{{packing_dispatch_weightV}}</pre> -->
                                        <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['packing_dispatch_weightV'] }">
                                            {{ errorsNew.packing_dispatch_weightV }}
                                        </small>
                                        <BackendErrors :name="errorResponseAPI?.errors?.packing_dispatch_weight" />
                                    </div>

                                    <div class="mb-3 col-12 md:col-6 lg:col-3">
                                        <div class="flex align-items-center">
                                            <label for="username" class="font-semibold w-6rem">Unit type Dispatch:</label>
                                            <AutoComplete v-model="unit_type_dispatch_V" class="flex-auto" inputId="ac" :suggestions="unitsTypeDispatch" @complete="searchUnitsTypeDispatch" field="name" dropdown />
                                        </div>
                                        <!-- <pre>{{unit_type_dispatch_V}}</pre> -->
                                        <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['unit_type_dispatch_V'] }">
                                            {{ errorsNew.unit_type_dispatch_V }}
                                        </small>
                                        <BackendErrors :name="errorResponseAPI?.errors?.unit_type_dispatch_uuid" />
                                    </div>
                                </div>
                            </template>

                            <template #footer>
                                <Card>
                                    <template #title> {{ packing_qty_dispatchV.name }} X {{ packing_type_dispatchV.name }} X {{ packing_dispatch_weightV.name }} X {{ unit_type_dispatch_V.name }}</template>
                                    <template #content> </template>
                                </Card>
                            </template>
                        </Card>

                        <Divider />

                        <div class="grid">
                                    <div class="mb-3 col-12 md:col-6 lg:col-6">
                                        <div class="flex align-items-center">
                                            <label for="farm" class="font-semibold w-6rem">Farm :</label>
                                            <AutoComplete v-model="farm" class="flex-auto" inputId="ac" :suggestions="farms" @complete="searchFarms" field="name" dropdown />
                                        </div>
                                        <!-- <pre>{{farm}}</pre> -->
                                        <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['farm'] }">
                                            {{ errorsNew.farm }}
                                        </small>
                                        <BackendErrors :name="errorResponseAPI?.errors?.farm_uuid" />
                                    </div>

                                    <div class="mb-3 col-12 md:col-6 lg:col-6">
                                        <div class="flex align-items-center">
                                            <label for="company" class="font-semibold w-6rem">Company:</label>
                                            <AutoComplete v-model="company" class="flex-auto" inputId="ac" :suggestions="compa" @complete="searchCompannies" field="name" dropdown />
                                        </div>
                                        <!-- <pre>{{company}}</pre> -->
                                        <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['company'] }">
                                            {{ errorsNew.company }}
                                        </small>
                                        <BackendErrors :name="errorResponseAPI?.errors?.company_uuid" />
                                    </div>
                                </div>
                    </TabPanel>
                    <TabPanel header="Summarize">
                        <Timeline :value="events" class="mb-3 col-12 md:col-12 lg:col-12">
                            <template #opposite="slotProps">
                                <small class="p-text-secondary">{{ slotProps.item.date }}</small>
                            </template>
                            <template #content="slotProps">
                                {{ slotProps.item.status }}
                            </template>
                        </Timeline>
                    </TabPanel>
                </TabView>

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
import Divider from 'primevue/divider';
import useDataAPI from '@/composables/DataAPI/FetchDataAPI.js';
import { useToast } from 'primevue/usetoast';
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import useData from '@/composables/DataAPI/FetchDataAPICopy.js';
const { getRequest, postRequest, putRequest, deleteRequest, errorResponseAPI } = useData();
import BackendErrors from '@/views/Errors/BackendErrors.vue';
import { useRouter } from 'vue-router';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { z } from 'zod';
import ability from '@/service/ability.js';
import { AbilityBuilder } from '@casl/ability';
const prueba = ref({ revisar: 'revisar GET-POST-PUT-DELETE' });
const namePage = ' Customer Requests ';
const titlePage = ' ' + namePage + ' Information';
const dataFromComponent = ref();
const active = ref(0);

const products = ref([]);
const Products = ref([]);
const productsType = ref([]);
const ProductsType = ref([]);
const variants = ref([]);
const Variants = ref([]);
const packingTypes = ref([]);
const PackingTypes = ref([]);

const packingsQtyDispatch = ref([]);
const PackingsQtyDispatch = ref([]);
const packingsTypesDispatch = ref([]);
const PackingsTypesDispatch = ref([]);
const packingsWeightDispatch = ref([]);
const PackingsWeightDispatch = ref([]);
const unitsTypeDispatch = ref([]);
const UnitsTypeDispatch = ref([]);

const Farms = ref([]);
const farms = ref([]);
const Compan = ref([]);
const compa = ref([]);

const farmDefault = sessionStorage.getItem('accessSessionFarm');
const companyDefault = sessionStorage.getItem('accessSessionCompany');

const employeeNameDefault = ref('');

const employeeUuidDefault = ref('');

const formDialogNew = ref(false);
const formDialogNewTitle = 'Create new' + namePage;
const formDialogEditTitle = 'Edit' + namePage;
const formDialogCloneTitle = 'Clone' + namePage;
const formDialogExportTitle = 'Export' + namePage;
const formDialogDeleteTitle = 'Delete' + namePage;
const formDialogEdit = ref(false);
const formDialogClone = ref(false);
const formDialogExport = ref(false);
const formDialogDelete = ref(false);
const toast = useToast();
const filename = ref('table');
const isChanging = ref(false);
let endpoint = ref('/customer_requests'); //replace endpoint with your endpoint

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
    employeeNameDefault.value = sessionStorage.getItem('accessSessionEmployeeName');
    employeeUuidDefault.value = localStorage.getItem('accesSessionEmployeeUuid');

    console.log(employeeNameDefault.value);
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
const initFilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        dispatch_number_lot: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        order_number_customer: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        invoice_number_customer: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        customer_name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        request_qty: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        delivery_datetime: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
        request_date: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
        place_of_delivery: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        packing_name_customer: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        outlet_temperature: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'product.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'product_type.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'variant.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'packing_type.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'packing_qty_dispatch.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'packing_type_dispatch.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'packing_dispatch_weight.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'unit_type_dispatch.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'employee.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
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

    const respProductType = await getRequest('/product_types');
    if (!respProductType.ok) toast.add({ severity: 'error', detail: 'Error' + respProductType.error, life: 3000 });
    ProductsType.value = respProductType.data.data.map((productType) => ({ id: productType.uuid, name: productType.name }));
    console.log(productsType.value);

    const respProduct = await getRequest('/products');
    if (!respProduct.ok) toast.add({ severity: 'error', detail: 'Error' + respProduct.error, life: 3000 });
    Products.value = respProduct.data.data.map((product) => ({ id: product.uuid, name: product.name }));
    console.log(Products.value);

    const respVariant = await getRequest('/variants');
    if (!respVariant.ok) toast.add({ severity: 'error', detail: 'Error' + respVariant.error, life: 3000 });
    Variants.value = respVariant.data.data.map((variant) => ({ id: variant.uuid, name: variant.name }));
    console.log(Variants.value);

    const packingType = await getRequest('/packing_types');
    if (!packingType.ok) toast.add({ severity: 'error', detail: 'Error' + packingType.error, life: 3000 });
    PackingTypes.value = packingType.data.data.map((packing) => ({ id: packing.uuid, name: packing.name }));

    const respPackingQtyDispatch = await getRequest('/lists/packingQtyDispatch');
    if (!respPackingQtyDispatch.ok) toast.add({ severity: 'error', detail: 'Error' + respPackingQtyDispatch.error, life: 3000 });
    PackingsQtyDispatch.value = respPackingQtyDispatch.data.data.map((packingQtyDispatch) => ({ id: packingQtyDispatch.id, name: packingQtyDispatch.label }));

    const respPackingTypeDispatch = await getRequest('/packing_types');
    if (!respPackingTypeDispatch.ok) toast.add({ severity: 'error', detail: 'Error' + respPackingTypeDispatch.error, life: 3000 });
    // PackingsTypesDispatch.value = respPackingTypeDispatch.data.data.map((packingTypeDispatch) => ({ id: packingTypeDispatch.uuid, name: packingTypeDispatch.name }));
    PackingsTypesDispatch.value = respPackingTypeDispatch.data.data.map((packingTypeDispatch) => ({ id: packingTypeDispatch.uuid, name: packingTypeDispatch.name })).filter((packing) => packing.name === 'Bolsa');
    const respPackingWeightDispatch = await getRequest('/lists/packingWeightDispatch');
    if (!respPackingWeightDispatch.ok) toast.add({ severity: 'error', detail: 'Error' + respPackingWeightDispatch.error, life: 3000 });
    PackingsWeightDispatch.value = respPackingWeightDispatch.data.data.map((packingWeightDispatch) => ({ id: packingWeightDispatch.id, name: packingWeightDispatch.label }));

    const respUnitsTypeDispatch = await getRequest('/unit_types');
    if (!respUnitsTypeDispatch.ok) toast.add({ severity: 'error', detail: 'Error' + respUnitsTypeDispatch.error, life: 3000 });
    // UnitsTypeDispatch.value = respUnitsTypeDispatch.data.data.map((unitTypeDispatch) => ({ id: unitTypeDispatch.uuid, name: unitTypeDispatch.name }));
    UnitsTypeDispatch.value = respUnitsTypeDispatch.data.data.map((unitTypeDispatch) => ({ id: unitTypeDispatch.uuid, name: unitTypeDispatch.name })).filter((unit) => unit.name === 'Gramo');

    const respFarms = await getRequest('/farms');
    if (!respFarms.ok) toast.add({ severity: 'error', detail: 'Error' + respFarms.error, life: 3000 });
    Farms.value = respFarms.data.data.map((farm) => ({ id: farm.uuid, name: farm.name }));

    const respCompan = await getRequest('/companies');
    if (!respCompan.ok) toast.add({ severity: 'error', detail: 'Error' + respCompan.error, life: 3000 });
    Compan.value = respCompan.data.data.map((comp) => ({ id: comp.uuid, name: comp.name }));
};
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
        productV: { name: '', id: '' },
        product_typeV: { name: '', id: '' },
        variantV: { name: '', id: '' },
        packing_typeV: { name: '', id: '' },
        employeeV: { name: '', id: '' },
        packing_qty_dispatchV: { name: '', id: '' },
        packing_type_dispatchV: { name: '', id: '' },
        packing_dispatch_weightV: { name: '', id: '' },
        unit_type_dispatch_V: { name: '', id: '' },
        packing_name_customerV: 'CAJAS',
        outlet_temperatureV: 0
    },
    validationSchema: toTypedSchema(
        z.object({
            // name: z.string().min(4),
            order_number_customerV: z.string().min(4),
            invoice_number_customerV: z.string().min(4),
            customer_nameV: z.string().min(4),
            request_dateV: z.date(),
            delivery_datetimeV: z.date(),
            place_of_deliveryV: z.string().min(4),
            dispatch_number_lotV: z.string().min(4),
            request_qty_V: z.number().min(1).max(1000),
            packing_name_customerV: z.string().min(1),
            outlet_temperatureV: z.number().min(4),
            productV: z.object({
                name: z.string().min(4),
                id: z.string().min(4)
            }),
            product_typeV: z.object({
                name: z.string().min(4),
                id: z.string().min(4)
            }),
            variantV: z.object({
                name: z.string().min(4),
                id: z.string().min(4)
            }),

            packing_typeV: z.object({
                name: z.string().min(1),
                id: z.string().min(1)
            }),

            packing_qty_dispatchV: z.object({
                name: z.number().min(1),
                id: z.number().min(1)
            }),
            //Lista desplegable BOL etc
            packing_type_dispatchV: z.object({
                name: z.string().min(1),
                id: z.string().min(1)
            }),
            packing_dispatch_weightV: z.object({
                name: z.number().min(1),
                id: z.number().min(1)
            }),

            unit_type_dispatch_V: z.object({
                name: z.string().min(1),
                id: z.string().min(1)
            }),

            // employeeV: z.object({
            //     name: z.string().min(4),
            //     id: z.string().min(4)
            // }),
            farm: z
                .object({
                    name: z.string().min(4),
                    id: z.string().min(4)
                })
                .optional(),
            company: z
                .object({
                    name: z.string().min(4),
                    id: z.string().min(4)
                })
                .optional()
        })
    )
});
// const [name, nameProps] = defineField('name');

const [order_number_customerV, order_number_customerVProps] = defineField('order_number_customerV');
const [invoice_number_customerV, invoice_number_customerVProps] = defineField('invoice_number_customerV');
const [customer_nameV, customer_nameVProps] = defineField('customer_nameV');
const [request_dateV, request_dateVProps] = defineField('request_dateV');
const [delivery_datetimeV, delivery_datetimeVProps] = defineField('delivery_datetimeV');
const [place_of_deliveryV, place_of_deliveryVProps] = defineField('place_of_deliveryV');
const [dispatch_number_lotV, dispatch_number_lotVProps] = defineField('dispatch_number_lotV');
const [request_qty_V, request_qty_VProps] = defineField('request_qty_V');
const [packing_name_customerV, packing_name_customerVProps] = defineField('packing_name_customerV');
const [outlet_temperatureV, outlet_temperatureVProps] = defineField('outlet_temperatureV');
const [productV, productVProps] = defineField('productV');
const [product_typeV, product_typeVProps] = defineField('product_typeV');
const [variantV, variantVProps] = defineField('variantV');
const [packing_typeV, packing_typeVProps] = defineField('packing_typeV');
const [packing_qty_dispatchV, packing_qty_dispatchVProps] = defineField('packing_qty_dispatchV');
const [packing_type_dispatchV, packing_type_dispatchVProps] = defineField('packing_type_dispatchV');
const [packing_dispatch_weightV, packing_dispatch_weightProps] = defineField('packing_dispatch_weightV');
const [unit_type_dispatch_V, unit_type_dispatch_VProps] = defineField('unit_type_dispatch_V');
const [employeeV, employeeVProps] = defineField('employeeV');
const [farm] = defineField('farm');
const [company] = defineField('company');

const events = ref([
    // { status: 'Request date', date: '15/10/2020 10:30', icon: 'pi pi-shopping-cart', color: '#9C27B0' },
    { status: 'Request date', date: request_dateV, icon: 'pi pi-shopping-cart', color: '#9C27B0' },
    { status: 'Delivery datetime', date: delivery_datetimeV, icon: 'pi pi-cog', color: '#673AB7' },
    { status: 'Confirmation', date: '15/10/2020 16:15', icon: 'pi pi-shopping-cart', color: '#FF9800' },
    { status: 'Delivered', date: '16/10/2020 10:00', icon: 'pi pi-check', color: '#607D8B' }
]);

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

const openNew = () => {
    resetForm();
    formDialogNew.value = true;
};

const openEdit = () => {
    resetForm();

    const {
        dispatch_number_lot,
        company: empresa,
        farm: farmParameter,
        order_number_customer: order_number_customer,
        invoice_number_customer: invoice_number_customer,
        customer_name: customer_name,
        request_date: request_date,
        delivery_datetime: delivery_datetime,
        place_of_delivery: place_of_delivery,
        request_qty: request_qty,
        packing_name_customer: packing_name_customer,
        outlet_temperature: outlet_temperature,
        product: product,
        product_type: product_type,
        variant: variant,
        packing_type: packing_type,
        packing_qty_dispatch: packing_qty_dispatch,
        packing_type_dispatch: packing_type_dispatch,
        packing_dispatch_weight: packing_dispatch_weight,
        unit_type_dispatch: unit_type_dispatch
    } = listRowSelect.value[0];

    order_number_customerV.value = order_number_customer;
    invoice_number_customerV.value = invoice_number_customer;
    customer_nameV.value = customer_name;
    request_dateV.value = new Date(request_date);
    delivery_datetimeV.value = new Date(delivery_datetime);
    place_of_deliveryV.value = place_of_delivery;
    dispatch_number_lotV.value = dispatch_number_lot;
    request_qty_V.value = Number(request_qty);
    packing_name_customerV.value = packing_name_customer;
    outlet_temperatureV.value = Number(outlet_temperature);
    productV.value = { id: product.uuid, name: product.name };
    product_typeV.value = { id: product_type.uuid, name: product_type.name };
    variantV.value = { id: variant.uuid, name: variant.name };
    packing_typeV.value = { id: packing_type.uuid, name: packing_type.name };
    packing_qty_dispatchV.value = { id: packing_qty_dispatch, name: packing_qty_dispatch };
    packing_type_dispatchV.value = { id: packing_type_dispatch.uuid, name: packing_type_dispatch.name };
    packing_dispatch_weightV.value = { id: packing_dispatch_weight, name: packing_dispatch_weight };
    unit_type_dispatch_V.value = { id: unit_type_dispatch.uuid, name: unit_type_dispatch.name };

    // employeeV.value = { id: employee.uuid, name: employee.name };
    company.value = { id: empresa.uuid, name: empresa.name };
    farm.value = { id: farmParameter.uuid, name: farmParameter.name };

    formDialogEdit.value = true;
};

const openClone = () => {
    resetForm();
    const {
        dispatch_number_lot,
        company: empresa,
        farm: farmParameter,
        order_number_customer: order_number_customer,
        invoice_number_customer: invoice_number_customer,
        customer_name: customer_name,
        request_date: request_date,
        delivery_datetime: delivery_datetime,
        place_of_delivery: place_of_delivery,
        request_qty: request_qty,
        packing_name_customer: packing_name_customer,
        outlet_temperature: outlet_temperature,
        product: product,
        product_type: product_type,
        variant: variant,
        packing_type: packing_type,
        packing_qty_dispatch: packing_qty_dispatch,
        packing_type_dispatch: packing_type_dispatch,
        packing_dispatch_weight: packing_dispatch_weight,
        unit_type_dispatch: unit_type_dispatch
    } = listRowSelect.value[0];

    order_number_customerV.value = order_number_customer;
    invoice_number_customerV.value = invoice_number_customer;
    customer_nameV.value = customer_name;
    request_dateV.value = new Date(request_date);
    delivery_datetimeV.value = new Date(delivery_datetime);
    place_of_deliveryV.value = place_of_delivery;
    dispatch_number_lotV.value = dispatch_number_lot;
    request_qty_V.value = Number(request_qty);
    packing_name_customerV.value = packing_name_customer;
    outlet_temperatureV.value = Number(outlet_temperature);
    productV.value = { id: product.uuid, name: product.name };
    product_typeV.value = { id: product_type.uuid, name: product_type.name };
    variantV.value = { id: variant.uuid, name: variant.name };
    packing_typeV.value = { id: packing_type.uuid, name: packing_type.name };
    packing_qty_dispatchV.value = { id: packing_qty_dispatch, name: packing_qty_dispatch };
    packing_type_dispatchV.value = { id: packing_type_dispatch.uuid, name: packing_type_dispatch.name };
    packing_dispatch_weightV.value = { id: packing_dispatch_weight, name: packing_dispatch_weight };
    unit_type_dispatch_V.value = { id: unit_type_dispatch.uuid, name: unit_type_dispatch.name };
    // employeeV.value = { id: employee.uuid, name: employee.name };
    company.value = { id: empresa.uuid, name: empresa.name };
    farm.value = { id: farmParameter.uuid, name: farmParameter.name };
    formDialogClone.value = true;
};

const openExport = () => {
    format.value = { name: 'CSV' };
    formDialogExport.value = true;
};

const openDelete = () => {
    formDialogDelete.value = true;
};

function formatTransactionDateTime(date) {
    // Asegurarse de que el año, mes y día tienen el formato correcto
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript son 0-indexados
    const dd = String(date.getDate()).padStart(2, '0');

    // Asegurarse de que las horas, minutos y segundos tienen el formato correcto
    const hh = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    const ss = String(date.getSeconds()).padStart(2, '0');

    // Formatear la fecha en formato YYYY-MM-DD
    const formattedDate = `${yyyy}-${mm}-${dd}`;

    // Formatear la hora en formato HH:MM:SS
    const formattedTime = `${hh}:${min}:${ss}`;

    // Combinar fecha y hora en formato YYYY-MM-DD HH:MM:SS
    const formattedDateTime = `${formattedDate} ${formattedTime}`;
    return { formattedDateTime: formattedDateTime, formattedDate: formattedDate, formattedTime: formattedTime };
}

const createRecord = handleSubmitNew(async (values) => {
    const data = {
        order_number_customer: values.order_number_customerV,
        invoice_number_customer: values.invoice_number_customerV,
        customer_name: values.customer_nameV,
        request_date: formatTransactionDateTime(values.request_dateV).formattedDate,
        delivery_datetime: formatTransactionDateTime(values.delivery_datetimeV).formattedDateTime,
        place_of_delivery: values.place_of_deliveryV,
        dispatch_number_lot: values.dispatch_number_lotV,
        request_qty: values.request_qty_V,
        packing_name_customer: values.packing_name_customerV,
        outlet_temperature: parseFloat(values.outlet_temperatureV).toFixed(2),
        product_uuid: values.productV ? values.productV.id : '',
        product_type_uuid: values.product_typeV ? values.product_typeV.id : '',
        variant_uuid: values.variantV ? values.variantV.id : '',
        packing_type_uuid: values.packing_typeV ? values.packing_typeV.id : '',

        packing_qty_dispatch: values.packing_qty_dispatchV ? values.packing_qty_dispatchV.id : '',
        packing_type_dispatch_uuid: values.packing_type_dispatchV ? values.packing_type_dispatchV.id : '',
        // packing_type_dispatch_uuid: "8b57a8ef-c0c7-4bee-8e75-6db8ffe44b48",
        packing_dispatch_weight: values.packing_dispatch_weightV ? values.packing_dispatch_weightV.id : '',
        unit_type_dispatch_uuid: values.unit_type_dispatch_V ? values.unit_type_dispatch_V.id : '',
        // unit_type_dispatch_uuid: "0d8695c0-0d1b-4827-ab53-d18ed2d7d2ca",
        company_uuid: values.company ? values.company.id : companyDefault,
        farm_uuid: values.farm ? values.farm.id : farmDefault,
        employee_uuid: values.employeeV ? values.employeeV.id : employeeUuidDefault.value
    };
    prueba.value = data;
    const restp = await postRequest(endpoint.value, data);

    toast.add({ severity: restp.ok ? 'success' : 'error', summary: 'Create', detail: restp.ok ? 'Creado' : restp.error, life: 3000 });
    loadingData();

    if (restp.ok) {
        formDialogNew.value = false;
        console.log('data', data);
    }
});

const EditRecord = handleSubmitNew(async (values) => {
    const { uuid } = listRowSelect.value[0];
    const data = {
        order_number_customer: values.order_number_customerV,
        invoice_number_customer: values.invoice_number_customerV,
        customer_name: values.customer_nameV,
        request_date: formatTransactionDateTime(values.request_dateV).formattedDate,
        delivery_datetime: formatTransactionDateTime(values.delivery_datetimeV).formattedDateTime,
        place_of_delivery: values.place_of_deliveryV,
        dispatch_number_lot: values.dispatch_number_lotV,
        request_qty: values.request_qty_V,
        packing_name_customer: values.packing_name_customerV,
        outlet_temperature: parseFloat(values.outlet_temperatureV).toFixed(2),
        product_uuid: values.productV ? values.productV.id : '',
        product_type_uuid: values.product_typeV ? values.product_typeV.id : '',
        variant_uuid: values.variantV ? values.variantV.id : '',
        packing_type_uuid: values.packing_typeV ? values.packing_typeV.id : '',

        packing_qty_dispatch: values.packing_qty_dispatchV ? values.packing_qty_dispatchV.id : '',
        packing_type_dispatch_uuid: values.packing_type_dispatchV ? values.packing_type_dispatchV.id : '',
        // packing_type_dispatch_uuid: "8b57a8ef-c0c7-4bee-8e75-6db8ffe44b48",
        packing_dispatch_weight: values.packing_dispatch_weightV ? values.packing_dispatch_weightV.id : '',
        unit_type_dispatch_uuid: values.unit_type_dispatch_V ? values.unit_type_dispatch_V.id : '',
        // unit_type_dispatch_uuid: "0d8695c0-0d1b-4827-ab53-d18ed2d7d2ca",
        company_uuid: values.company ? values.company.id : companyDefault,
        farm_uuid: values.farm ? values.farm.id : farmDefault,
        employee_uuid: values.employeeV ? values.employeeV.id : employeeUuidDefault.value
    };

    const restp = await putRequest(endpoint.value, data, uuid);
    toast.add({ severity: restp.ok ? 'success' : 'error', summary: 'Edit', detail: restp.ok ? 'Editado' : restp.error, life: 3000 });
    loadingData();

    prueba.value = data;
    if (restp.ok) {
        formDialogEdit.value = false;
        listRowSelect.value = [];
        selectedRegisters.value = [];
    }
});

const CloneRecord = handleSubmitNew(async (values) => {
    const data = {
        order_number_customer: values.order_number_customerV,
        invoice_number_customer: values.invoice_number_customerV,
        customer_name: values.customer_nameV,
        request_date: formatTransactionDateTime(values.request_dateV).formattedDate,
        delivery_datetime: formatTransactionDateTime(values.delivery_datetimeV).formattedDateTime,
        place_of_delivery: values.place_of_deliveryV,
        dispatch_number_lot: values.dispatch_number_lotV,
        request_qty: values.request_qty_V,
        packing_name_customer: values.packing_name_customerV,
        outlet_temperature: parseFloat(values.outlet_temperatureV).toFixed(2),
        product_uuid: values.productV ? values.productV.id : '',
        product_type_uuid: values.product_typeV ? values.product_typeV.id : '',
        variant_uuid: values.variantV ? values.variantV.id : '',
        packing_type_uuid: values.packing_typeV ? values.packing_typeV.id : '',

        packing_qty_dispatch: values.packing_qty_dispatchV ? values.packing_qty_dispatchV.id : '',
        packing_type_dispatch_uuid: values.packing_type_dispatchV ? values.packing_type_dispatchV.id : '',
        // packing_type_dispatch_uuid: "8b57a8ef-c0c7-4bee-8e75-6db8ffe44b48",
        packing_dispatch_weight: values.packing_dispatch_weightV ? values.packing_dispatch_weightV.id : '',
        unit_type_dispatch_uuid: values.unit_type_dispatch_V ? values.unit_type_dispatch_V.id : '',
        // unit_type_dispatch_uuid: "0d8695c0-0d1b-4827-ab53-d18ed2d7d2ca",
        company_uuid: values.company ? values.company.id : companyDefault,
        farm_uuid: values.farm ? values.farm.id : farmDefault,
        employee_uuid: values.employeeV ? values.employeeV.id : employeeUuidDefault.value
    };
    console.log('DATA: ', data);
    const restp = await postRequest(endpoint.value, data);
    toast.add({ severity: restp.ok ? 'success' : 'error', summary: 'Clone', detail: restp.ok ? 'Clonado' : restp.error, life: 3000 });
    loadingData();

    prueba.value = data;
    if (restp.ok) {
        formDialogClone.value = false;
        listRowSelect.value = [];
        selectedRegisters.value = [];
    }
});

const searchCompannies = (event) => {
    setTimeout(() => {
        if (!event.query.trim().length) {
            compa.value = [...Compan.value];
        } else {
            compa.value = Compan.value.filter((value) => {
                return value.name.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }
    }, 200);
};

const searchFarms = (event) => {
    setTimeout(() => {
        if (!event.query.trim().length) {
            farms.value = [...Farms.value];
        } else {
            farms.value = Farms.value.filter((value) => {
                return value.name.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }
    }, 200);
};

const searchProduct = (event) => {
    setTimeout(() => {
        if (!event.query.trim().length) {
            products.value = [...Products.value];
        } else {
            products.value = Products.value.filter((value) => {
                return value.name.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }
    }, 200);
};
const searchProductType = (event) => {
    setTimeout(() => {
        if (!event.query.trim().length) {
            productsType.value = [...ProductsType.value];
        } else {
            productsType.value = ProductsType.value.filter((value) => {
                return value.name.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }
    }, 200);
};

const searchVariant = (event) => {
    setTimeout(() => {
        if (!event.query.trim().length) {
            variants.value = [...Variants.value];
        } else {
            variants.value = Variants.value.filter((value) => {
                return value.name.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }
    }, 200);
};

const searchPackingType = (event) => {
    setTimeout(() => {
        if (!event.query.trim().length) {
            packingTypes.value = [...PackingTypes.value];
        } else {
            packingTypes.value = PackingTypes.value.filter((value) => {
                return value.name.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }
    }, 200);
};
const searchPackingQtyDispatch = (event) => {
    setTimeout(() => {
        if (!event.query.trim().length) {
            packingsQtyDispatch.value = [...PackingsQtyDispatch.value];
        } else {
            packingsQtyDispatch.value = PackingsQtyDispatch.value.filter((value) => {
                return value.name.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }
    }, 200);
};

const searchPackingTypeDispatch = (event) => {
    setTimeout(() => {
        if (!event.query.trim().length) {
            packingsTypesDispatch.value = [...PackingsTypesDispatch.value];
        } else {
            packingsTypesDispatch.value = PackingsTypesDispatch.value.filter((value) => {
                return value.name.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }
    }, 200);
};
const searchPackingWeightDispatch = (event) => {
    setTimeout(() => {
        if (!event.query.trim().length) {
            packingsWeightDispatch.value = [...PackingsWeightDispatch.value];
        } else {
            packingsWeightDispatch.value = PackingsWeightDispatch.value.filter((value) => {
                return value.name.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }
    }, 200);
};

const searchUnitsTypeDispatch = (event) => {
    setTimeout(() => {
        if (!event.query.trim().length) {
            unitsTypeDispatch.value = [...UnitsTypeDispatch.value];
        } else {
            unitsTypeDispatch.value = UnitsTypeDispatch.value.filter((value) => {
                return value.name.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }
    }, 200);
};

const ExportRecord = () => {
    const eventos = exportAll.value.name == 'ALL' ? dataFromComponent.value.map((data) => data) : listRowSelect.value.map((data) => data);
    formDialogExport.value = false;
    if (!eventos.length) return;
    if (format.value.name == 'CSV') formatCSV(eventos);
    else formatXLS(eventos);
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
