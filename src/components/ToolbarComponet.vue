<script setup>

const props = defineProps({
    rowSelect: {
        type: Array,
        default: () => []
    }
});
</script>

<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <h5>Toolbar</h5>
                <Toolbar>
                    <template v-slot:start>
                        <Button label="New" icon="pi pi-plus" class="mr-2" />
                        
                        <i class="pi pi-bars p-toolbar-separator mr-2"></i>
                        
                        <Button label="Edit" icon="pi pi-file-edit" class="p-button-success mr-2" />
                        <Button label="Clone" icon="pi pi-copy" class="p-button-secondary mr-2" />
                        <Button label="Export"  icon="pi pi-file-import" class="p-button-warning mr-2" />
                        <Button label="Delete" icon="pi pi-trash" class="p-button-danger mr-2" />
                    </template>
                </Toolbar>
            </div>
        </div>
    </div>
</template>

<style></style>
