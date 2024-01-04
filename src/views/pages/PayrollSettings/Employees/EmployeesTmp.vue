<template>
        <DataTable
            responsiveLayout="scroll"
            v-model:selection="selectedRegisters"
            @row-select="onRowSelect(selectedRegisters)"
            @row-unselect="onRowSelect(selectedRegisters)"
            v-model:filters="filters"
            :filters="filters"
            :class="`p-datatable-${size.class}`"
            :value="dataResponseAPI.data"
            showGridlines
            :globalFilterFields="['workCenter.name', 'last_name', 'company.name']"
            :rows="20"
            tableStyle="min-width: 75rem"
            dataKey="uuid"
            ref="dt"
            :paginator="true"
            :loading="loading"
            :rowsPerPageOptions="[5, 10, 20, 50]"
            filterDisplay="menu"
            @select-all-change="onSelectAllChange"
            scrollable
            scrollHeight="600px"
            resizableColumns
            columnResizeMode="expand"
            sortMode="multiple"
            
        >
            <template #header>
                <div class="flex justify-content-between flex-column sm:flex-row">
                    <Button type="button" icon="pi pi-filter-slash" label="Limpiar" class="p-button-outlined mb-2" @click="clearFilter()" />
                    <span class="p-input-icon-left mb-2">
                        <i class="pi pi-search" />
                        <InputText v-model="filters['global'].value" placeholder="Buscar" style="width: 100%" />
                    </span>
                </div>
            </template>

            <template #empty> No customers found. </template>
            <template #loading> Loading customers data. Please wait. </template>

            <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>

            <!-- <Column field="document" header="Document" style="min-width: 2rem"> -->
            <!-- Line above uses a set min width as minimum, if that is does not placed is automatically -->

            <Column v-if="column?.some((obj) => obj.field === 'document')" field="document" header=" Document" sortable :frozen="documentFrozen">
                <template #header>
                    <ToggleButton v-model="documentFrozen" onIcon="pi pi-lock" offIcon="pi pi-lock-open" onLabel="" offLabel="" />
                    <div>&nbsp;</div>
                </template>

                <template #body="{ data }">
                    {{ data.document }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by country" />
                </template>
            </Column>

            <Column v-if="column?.some((obj) => obj.field === 'document_type')" header="Type of Document" sortable>
                <template #body="{ data }">
                    {{ data.document_type }}
                </template>

                <template #filter="{ filterModel }">
                    <InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Search by name" />
                </template>
            </Column>

            <Column v-if="column?.some((obj) => obj.field === 'first_name')" field="first_name" header="Name" sortable>
                <template #body="{ data }">
                    {{ data.first_name }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by country" />
                </template>
            </Column>
            <!-- v-if="column?.some((obj) => obj.field === 'last_name')" -->
            <Column field="last_name" header="Last Name" sortable>
                <template #body="{ data }">
                    {{ data.last_name }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by country" />
                </template>
            </Column>
            <!-- v-if="column?.some((obj) => obj.field === 'gender_id')" -->
            <Column field="gender" header="Gender" sortable>
                <template #body="{ data }">
                    {{ data.gender_id }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by country" />
                </template>
            </Column>



            <template #footer> Currently this page has got {{ dataResponseAPI.data ? dataResponseAPI.data.length : 0 }} registers. // In total there are {{ totalRecordsResponseAPI ? totalRecordsResponseAPI : 0 }} registers. </template>
        </DataTable>
    

</template>
<script setup>

</script>