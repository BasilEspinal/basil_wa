
<template>
    <div class="grid p-fluid">
   
        <div class="col-12">
            <div class="card">
                <Toast />
                <form @submit.prevent="saveProducts" method="POST">
                    
                    <div class="mb-3">
                        <label for="document" class="form-label">Dcoument </label>
                        <input type="text" v-model="form.document" class="form-control" />
                        <div v-if="errors && errors.document">
                            <span class="text-danger">{{ errors.document[0] }}</span>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="last_name" class="form-label">Nombres </label>
                        <input type="text" v-model="form.last_name" class="form-control" />

                        <div v-if="errors && errors.last_name">
                            <span class="text-danger">{{ errors.last_name[0] }}</span>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="first_name" class="form-label">Apellido </label>
                        <input type="text" v-model="form.first_name" class="form-control" />
                        <div v-if="errors && errors.first_name">
                            <span class="text-danger">{{ errors.first_name[0] }}</span>
                        </div>
                    </div>
                    
                    <button type="submit" class="btn btn-primary">Guardar</button>
                </form>
            </div>
        </div>
    </div>
</template>



<script>
import { reactive, onMounted } from "vue";
import UseEmployees from '@/composables/Employees';
export default {
    name: 'AgroOnlineVueCreate',
    setup() {
        const {errors,postEmployee } = UseEmployees();
        const form = reactive({
            document: '79137943',
            last_name: 'Yepes',
            first_name: 'Molina',
        });
        const saveProducts = async () => {
            await postEmployee({ ...form})
        }
        return {
            form,
            errors,
            saveProducts,
        }
    },

};
</script>

<style lang="scss" scoped>
</style>