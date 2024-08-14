import { ref, reactive, toRefs, computed } from 'vue';

export default function UseAppMovil() {
    const areawork = ref('Corta');
    const plannertask = ref();
    const workcenters = ref();
    const tasktarifs = ref();

    const availableAreaEmployees = ref([
        { name: 'Employee 1', code: 'AU', id: 1 },
        { name: 'Employee 22', code: 'BR', id: 2 },
        { name: 'Employee 3', code: 'CN', id: 3 },
        { name: 'Employee 4', code: 'EG', id: 4 },
        { name: 'Employee 5', code: 'FR', id: 5 },
        { name: 'Employee 6', code: 'DE', id: 6 },
        { name: 'Employee 7', code: 'IN', id: 7 },
        { name: 'Employee 8', code: 'JP', id: 8 },
        { name: 'Employee 9', code: 'ES', id: 9 },
        { name: 'Employee 10', code: 'US', id: 10 }
    ]);

    const worksDay = ref([
        { id: 1, employee: 'Empleado 1', quantity: 38560, totalPrice: 4842, nota: 'pruebas con notas.' },
        { id: 2, employee: 'Empleado 2', quantity: 54406, totalPrice: 5642, nota: 'pruebas con notas v2.' },
        { id: 3, employee: 'Empleado 3', quantity: 64406, totalPrice: 8542, nota: 'pruebas con notas v3.' }
    ]);

    const task_type = [
        { name: 'Task', code: 'Task' },
        { name: 'HoraExtra', code: 'HoraExtra' },
        { name: 'Labor Contratista', code: 'Labor' }
    ];

    const crops_lots = [
        { name: 'L1', code: 'L1' },
        { name: 'L2', code: 'L2' },
        { name: 'L3', code: 'L3' }
    ];

    const dones_work = [
        { name: 'ASEO', code: 'A01' },
        { name: 'CANASTILLA', code: 'A02' },
        { name: 'DESEMSEMILLADA', code: 'A03' },
        { name: 'DESHIERBA', code: 'A04' }
    ];

    const size = ref({ label: 'Normal', value: 'normal' });
    const sizeOptions = ref([
        { label: 'Small', value: 'small', class: 'sm' },
        { label: 'Normal', value: 'normal' },
        { label: 'Large', value: 'large', class: 'lg' }
    ]);

    const data_planner = ref({
        areawork: 'Corta',
        planner_date: '30/05/2024',
        document: 'XXXXXX',
        product_type: 'Albaca',
        product_variant: 'Nufar',
        packing_type: 'Icopor',
        lot_dispatch: '20822-5589',
        day_type: 'Festivo',
        name_employee: 'Nombre del empleado',
        nameSupervisor: 'Nombre Supervisor',
        day_price: 1500.0,
        total_packing: 500
    });

    const priceunit = ref(1950);

    async function getPlannerTask(endPoint) {
        isLoading.value = true;
        try {
            const response = await axios.get(`/api/products/${productId}`);
        } catch (e) {
            error.value = e;
        } finally {
            isLoading.value = false;
        }
    }
    async function getEmployeesWorkCenter(endPoint) {
        isLoading.value = true;
        try {
            const response = await axios.get(`/api/products/${productId}`);
        } catch (e) {
            error.value = e;
        } finally {
            isLoading.value = false;
        }
    }

    return {
        availableAreaEmployees,
        worksDay,
        task_type,
        crops_lots,
        dones_work,
        size,
        sizeOptions,
        data_planner,
        areawork,
        priceunit,
        plannertask,
        tasktarifs
    };
}
