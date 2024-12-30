<script setup>
import { ref, onMounted, onBeforeMount,computed} from 'vue';
import { useI18n } from 'vue-i18n';
import { useAppMovilService } from '../../../service/appMovil/appMovilService_V3';
import { useToast } from 'primevue/usetoast';
import userTab from './userTab.vue';
import sendingTab from './sendingTab.vue';
import ErrorAppMovil from './ErrorAppMovil.vue';
import { useLayout } from '@/layout/composables/layout';

const id_employee = ref(null);
const props = defineProps({
    dataUsers: { type: Array },
    Lote: { type: Array },
    data: { type: Object }
});

const toast = useToast();
const { t } = useI18n();
const {  getTipoActividad } = useAppMovilService();
const tipoActividad = ref(null);

onMounted(async () => {
    TipoActividad();
});

const TipoActividad = async () => {
    const response = await getTipoActividad();
    if (!response.ok) toast.add({ severity: 'error', detail: 'Error' + response.error, life: 3000 });
    tipoActividad.value = response?.data;
};

const onTabChange = async (id, event) => {
    if (event.index === 1) {
        id_employee.value = id;
    }
};

function handleUserClick(slotProps) {
    // console.log('User clicked:', slotProps);
    onTabChange(slotProps, { index: 1 }); 
}

const emit = defineEmits(['update-grandparent-data']);

const refreshSendingTabData = () => {
    emit('update-grandparent-data'); // Emit event to grandparent
    console.log('Data updated');
};
const logoUrl = computed(() => {
    return `layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.png`;
});
const { layoutConfig } = useLayout();
</script>

<template>
    <div>
        <Toast />
        
        <Accordion v-if="dataUsers.length">
            <AccordionTab v-for="slotProps in dataUsers" :key="slotProps.id" >
                <template #header >
                    <span class="flex align-items-center gap-2 w-full" @click="handleUserClick(slotProps.id)">
                        <Avatar style="min-width: 2rem" image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" />
                        
                        <h3>
                            <span class="responsive-text font-bold white-space-nowrap overflow-hidden w-full">{{ slotProps.first_name }}</span>
                        </h3>
                    </span>
                </template>
                <TabView @tab-change="onTabChange(slotProps.id, $event)">
                    <TabPanel :header="t('appmovil.trabajos')">
                        <userTab :slotProps="slotProps" :idUs="slotProps.id" :tipoActividad="tipoActividad" :Lote="Lote" :data="data" 
                        @update-grandparent-data="refreshSendingTabData"/>
                    </TabPanel>
                    <TabPanel :header="t('appmovil.detalles')">
                        
                        <sendingTab :data="data" :Lote="Lote" :dataUsers="dataUsers" :id="id_employee" />
                    </TabPanel>
                </TabView>
            </AccordionTab>
        </Accordion>
        <div v-else>

            <ErrorAppMovil :title="t('appmovil.noemployeesAvailable')" description="Requested resource is not available" :logo-url="logoUrl" />
            
        </div>
    </div>
</template>

<style lang="scss" scoped>

</style>
