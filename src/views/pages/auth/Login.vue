
<script setup>
// This is the Login Page withut any fixed about layout
import { useLayout } from '@/layout/composables/layout';
import { computed, ref, inject,provide, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import Toast from 'primevue/toast';
import useDataAPI from '@/composables/DataAPI/FetchDataAPI.js';



import { ABILITY_TOKEN } from '@casl/vue';
import { useAbility } from '@casl/vue';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';

import { defineAbility } from '@casl/ability';
import elementosVista from '@/service/permissionsMenuTmp.js';




const { getAllResponseAPI, getAllResponsePermissionsAPI, getAllResponseListAPI, totalRecordsResponseAPI, currentPageResponseAPI, linksResponseAPI, postResponseAPI, putResponseAPI, deleteResponseAPI, errorResponseAPI, dataResponseAPI, dataResponseListAPI, statusCode } =
    useDataAPI();
const { layoutConfig } = useLayout();
const toast = useToast();
const count = ref(0);



// define abilities
// const ability = defineAbility((can, cannot) => {
//   can('read', 'Post');
//   cannot('read', 'Post', { private: true });
// });
// const actions = ['listar_empleado', 'ver_empleado', 'eliminar_empleado'];

// const ability = defineAbility((can, cannot) => actions.forEach(action => can(action)));

// // Verificar cada acción por separado
// console.log(ability.can('listar_empleado')); // true
// console.log(ability.can('ver_empleado')); // true
// console.log(ability.can('eliminar_empleado')); // true

import { createMongoAbility } from '@casl/ability';
import { AbilityBuilder } from '@casl/ability';
import { provideAbility } from '@casl/vue';

const { can, cannot, build } = new AbilityBuilder();

// const ability = defineAbility((can, cannot) => {
//   can('manage', 'all');
//   cannot('delete', 'User');
// });
// provideAbility(ability)


// const ability = createMongoAbility();
import ability from '@/service/ability.js';



// const updateAbility = (token) => {
//   const bearer = 'Bearer ' + token; 

// fetch('http://164.90.146.196:81/api/v1/abilities', {
//     headers: {
//         Authorization: bearer,
//         accept: 'application/json'
//     }
// })
//     .then((response) => response.json())
//     .then((permissions) => {
//         const { can, rules } = new AbilityBuilder();

//         can(permissions);
//         console.log(permissions)
//         ability.update(rules);
//         console.log(ability.can('rol_crear'))
        
//     });
// };

// initPermissions();
const { values,errors, defineField } = useForm({
  validationSchema: toTypedSchema(
    z.object({
      email: z.string().min(3).email(),
      password: z.string().min(6),
    }),
  ),
});
const [email, emailAttrs] = defineField('email');
const [password, passwordAttrs] = defineField('password');
const router = useRouter();

const logoUrl = computed(() => {
  return `layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.png`;
});


const onSubmit = () => {

  fetchInfoPostLogin();
  
};

const fetchInfoPostLogin = async (data) => {
  try {
    
    await postResponseAPI({ email: email.value, password: password.value }, '/login');
    //await postResponseAPI({ email: "admin@admin.com", password: "password" }, '/login');
    
    
    let response = dataResponseAPI.value;

    if (response['error']) throw response.error;
    if (!response['user']) throw response.error;

    const token = response.token;
    const user = response.user.name;

    sessionStorage.setItem('accessSessionToken', token);
    sessionStorage.setItem('accessSessionUser', user);
    localStorage.setItem('accesSessionTokens', token);
    
    // updateAbility(token);
    
    await getAllResponsePermissionsAPI("/abilities");
    toast.add({ severity: 'success', detail: 'Success', content: 'Successful Login', id: count.value++ });
    router.push('/applayout');
  } catch (error) {
    toast.add({ severity: 'error', detail: 'Error Response', content: error, id: count.value++ });
    console.error('Error:', error);
  }
};

onMounted(()=>{
  
})




</script>

<template>
  
    
    <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden" style="background: linear-gradient(180deg, var(--paleta-400) 5%, var(--paleta-100) 15%)">
        

        <div class="flex flex-column align-items-center justify-content-center" @keyup.enter="onSubmit">
            <router-link to="/" class="align-items-center mb-5">
                <img :src="logoUrl" alt="Sakai logo" class="w-6rem flex-shrink-0" />
                <span class="text-700 font-bold">AGRO-ONLINE</span>
            </router-link>
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(160deg, var(--primary-color) 10%, var(--paleta-100) 60%, var(--primary-color) 100%)">
                <div class="w-full py-7 px-3 sm:px-6" style="border-radius: 153px; background-color: var(--paleta-100)">
                    <div class="text-center mb-5">
                        <div class="text-900 text-4xl font-bold mb-3">Welcome!</div>
                        <span class="text-600 font-medium">Sign in to continue</span>
                    </div>
                    <Toast />

                        <transition-group name="p-message" tag="div" class="w-full">
                            <Message v-for="msg of message" :severity="msg.severity" :key="msg.content" :sticky="false" :life="msg.life">{{ msg.content }}</Message>
                        </transition-group>
                        <div>
                          <form >
                            <label for="email1" class="block text-900 text-xl font-medium mb-2"> Email </label>
                            <InputText
                                id="email1"
                                type="text"
                                placeholder="Email address"
                                style="width: 100%; padding: 1rem;"
                                v-model="email"
                            />
                                                        
                            <label for="email1" class="block text-l mb-2" :class="{ 'text-red-700': errors.email }">
                                {{ errors.email}}
                            </label>

                            <label for="password1" class="block text-900 font-medium text-xl mb-2">Password</label>
                            <Password
                                id="password1"
                                v-model="password"
                                placeholder="Password"
                                :feedback="false"
                                :toggleMask="true"
                                inputClass="w-full"
                                :inputStyle="{ padding: '1rem' }"
                                style="width: 100%; padding: 0rem; color: rgb(0, 0, 0)"
                            ></Password>
                            <label for="password1" class="block text-l mb-2" :class="{ 'text-red-700': errors.password }">
                                {{ errors.password}}
                            </label>
                            <div class="flex align-items-center justify-content-between mb-5 gap-5">
                                <div class="flex align-items-center">
                                    <Checkbox v-model="checked" id="rememberme1" binary class="mr-2"></Checkbox>
                                    <label for="rememberme1">Remember me</label>
                                </div>
                                <a class="font-medium no-underline ml-2 text-right cursor-pointer" style="color: var(--primary-color)">Forgot password?</a>
                            </div>

                            <Button label="Sign In" class="w-full p-3 text-xl" @click="onSubmit"></Button>
                          </form>
                        </div>
                    

                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.pi-eye {
    transform: scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform: scale(1.6);
    margin-right: 1rem;
}
</style>
