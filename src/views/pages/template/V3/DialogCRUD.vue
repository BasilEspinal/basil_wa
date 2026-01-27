<script setup>
import { reactive } from 'vue';
import FrontEndErrors from './FrontEndErrors.vue';
import BackendErrors from './BackendErrors.vue';
import { Button } from 'primevue/button';
import { InputNumber } from 'primevue/inputnumber';
import { Textarea } from 'primevue/textarea';

// Form configuration
const formConfig = reactive([
    {
        type: 'InputNumber',
        label: 'Quantity Requested',
        model: 'confirmed_qty_V',
        props: {
            min: 0,
            max: 1000,
            showButtons: true,
            buttonLayout: 'horizontal'
        }
    },
    {
        type: 'Textarea',
        label: 'Notes',
        model: 'notes',
        props: {
            rows: 5,
            cols: 30
        }
    }
]);

// Form data that holds values for the form fields
const formData = reactive({
    confirmed_qty_V: null,
    notes: ''
});

// Placeholder for error handling
const errorsNew = reactive({});
const errorResponseAPI = reactive({});

// Method to handle form submission
function actionRecordManager() {
    
    // Handle your API call or other form actions here
}
</script>

<template>
    <div class="grid">
        <div v-for="(field, index) in formConfig" :key="index" class="mb-3 col-12 md:col-12 lg:col-12">
            <div class="flex align-items-center">
                <!-- Dynamic label -->
                <label :for="field.model" class="font-semibold w-6rem">{{ field.label }}</label>

                <!-- Dynamic component generation -->
                <component :is="field.type" v-model="formData[field.model]" v-bind="field.props" class="flex-auto"></component>

                <!-- Frontend and Backend Error Handling -->
                <FrontEndErrors :errorsNew="errorsNew" :name="field.model" />
                <BackendErrors :name="errorResponseAPI?.errors?.[field.model]" />
            </div>
        </div>
    </div>
    <div>
        <div class="flex justify-content-end gap-2 flex-auto">
            <Button class="flex-auto" type="button" label="Cancel" severity="secondary" @click="formDialog = false" />
            <Button class="flex-auto" type="button" label="Save" @click="actionRecordManager" />
        </div>
    </div>
</template>
