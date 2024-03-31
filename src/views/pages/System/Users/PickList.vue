<script setup>
import { ref, onMounted, watch } from 'vue';

const emit = defineEmits([]);
const picklistValue = ref([[], []]);

onMounted(() => {
    console.log('le llega', props.dataListA, '++', props.dataListB, '++', props.id);
    picklistValue.value = [props.dataListA, props.dataListB];
});

const props = defineProps({
    id: {
        type: Number
    },
    dataListA: {
        type: Array
    },
    dataListB: {
        type: Array
    }
});

const newDataRols = () =>{
    console.log('CAMBIAAAA', picklistValue.value[1]);
    emit('SelectDataListB', { list: picklistValue.value[1], id: props.id });
};

</script>
<template>
    <div>
        <PickList v-model="picklistValue" listStyle="height:250px" dataKey="code" @selection-change="newDataRols">
            <template #sourceheader> From </template>
            <template #targetheader> To </template>
            <template #item="slotProps">
                <div>{{ slotProps.item.name }}</div>
            </template>
        </PickList>
    </div>
</template>