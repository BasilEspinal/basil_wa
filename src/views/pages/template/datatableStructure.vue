<template>
  <!-- <pre>{{ dataResponseAPI }}</pre> -->
  <DataTable
        :value="dataResponseAPI.data"
        dataKey="uuid"
        tableStyle="min-width: 75rem"
        showGridlines
        
        scrollable
        scrollHeight="600px"
        resizableColumns
        columnResizeMode="expand"
        sortMode="multiple"
        :paginator="true"
        :rows="50"
        :rowsPerPageOptions="[5, 10, 20, 50]"
         
        >
        <template #header>

        </template>

        <template #empty> No customers found. </template>
        <template #loading> Loading customers data. Please wait. </template>
        <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>


        </DataTable> 
</template>

<script>
export default {

}
</script>

<style>

</style>
