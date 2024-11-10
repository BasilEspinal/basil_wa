<script setup>
import { ref, onMounted, onBeforeMount} from 'vue';
import { useI18n } from 'vue-i18n';
import { useAppMovilService } from '../../../service/appMovil/appMovilService';
import { useToast } from 'primevue/usetoast';
import userTab from './userTab.vue';
import sendingTab from './sendingTab.vue';

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
</script>

<template>
    <div>
        <Toast />
        <Accordion>
            <AccordionTab v-for="slotProps in dataUsers" :key="slotProps.id">
                <template #header>
                    <span class="flex align-items-center gap-2 w-full">
                        <Avatar style="min-width: 2rem" image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" />
                        <h3>
                            <span class="responsive-text font-bold white-space-nowrap overflow-hidden w-full">{{ slotProps.first_name }}</span>
                        </h3>
                    </span>
                </template>
                <TabView @tab-change="onTabChange(slotProps.id, $event)">
                    <TabPanel :header="t('appmovil.trabajos')">
                        <userTab :slotProps="slotProps" :idUs="slotProps.id" :tipoActividad="tipoActividad" :Lote="Lote" :data="data" />
                    </TabPanel>
                    <TabPanel :header="t('appmovil.detalles')">
                        <sendingTab :data="data" :Lote="Lote" :dataUsers="dataUsers" :id="id_employee" />
                    </TabPanel>
                </TabView>
            </AccordionTab>
        </Accordion>
    </div>
</template>

<style lang="scss" scoped>

</style>
