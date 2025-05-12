<script setup>
// This is the Login Page withut any fixed about layout

import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import Toast from 'primevue/toast';
import { useLayout } from '@/layout/composables/layout';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';
import { AbilityBuilder } from '@casl/ability';
import useData from '@/service/FetchData/FetchDataAPI.js';
import { useAbilityStore } from '@/stores/abilities';
import ability from '@/service/ability.js';
import { useI18n } from 'vue-i18n';
import { ensureTokenStored } from '@/utils/tokenUtils';
import { useAppMovilService } from '@/service/appMovil/appMovilService_V3';
const { refreshSessionState } = useAppMovilService();

const { layoutConfig } = useLayout();
const abilityStore = useAbilityStore();
const toast = useToast();
const { t } = useI18n();
const { getRequest, postRequest, putRequest, deleteRequest, errorResponseAPI } = useData();
let endpoint = ref('/login');
const token = ref('');
const count = ref(0);
//const { values, errors, defineField } = useForm({initialValues: { email: 'admin@agroonline.com', password: '!password!' },
const { values, errors, defineField } = useForm({
    initialValues: { email: 'admin@agroonline.com', password: '' },

    validationSchema: toTypedSchema(
        z.object({
            email: z.string().min(3).email(),
            password: z.string().min(6)
        })
    )
});

const logoUrl = computed(() => {
    return `layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.png`;
});

const fetchInfoPostLogin = async (data) => {
    try {
        let response = await postRequest(endpoint.value, { email: email.value, password: password.value });
        response = response.data.data;
        console.log(response);
        if (response['error']) throw response.error;
        if (!response['user']) throw response.error;

        token.value = response.token;

        const user = response.user.name;
        sessionStorage.setItem('accessSessionToken', token.value);
        sessionStorage.setItem('accessSessionUser', user);

        localStorage.setItem('accesSessionUsers', user);
        localStorage.setItem('accessSessionToken', token.value);
        await refreshSessionState(); // ✅ RELOAD reactivity
        await ensureTokenStored();

        if (!token.value) {
            console.error('No token found in sessionStorage');
        } else {
            await abilityStore.fetchAbilities();
            const abilities = abilityStore.getAbilities;
            const { can, cannot, rules } = new AbilityBuilder();
            abilities.forEach(({ action, subject }) => {
                can(action, subject);
            });
            ability.update(rules);
        }

        toast.add({ severity: 'success', detail: 'Success', content: 'Successful Login', id: count.value++ });
        router.push('/applayout');

        return true;
    } catch (error) {
        toast.add({ severity: 'error', detail: 'Error Response', content: error, id: count.value++ });
        console.error('Error:', error);
        return false;
    }
};

const onSubmit = async () => {
    await fetchInfoPostLogin();
};

const [email, emailAttrs] = defineField('email');
const [password, passwordAttrs] = defineField('password');
const router = useRouter();
</script>

<template>
    <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden" style="background: linear-gradient(180deg, var(--paleta-400) 5%, var(--paleta-100) 15%)">
        <div class="flex flex-column align-items-center justify-content-center" @keyup.enter="onSubmit">
            <FloatingConfigurator />
            <router-link to="/" class="align-items-center mb-5">
                <img :src="logoUrl" alt="Sakai logo" class="w-6rem flex-shrink-0" />
                <span class="text-700 font-bold">AGRO-ONLINE</span>
            </router-link>
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(160deg, var(--primary-color) 10%, var(--paleta-100) 60%, var(--primary-color) 100%)">
                <div class="w-full py-7 px-3 sm:px-6" style="border-radius: 153px; background-color: var(--paleta-100)">
                    <div class="text-center mb-5">
                        <div class="text-900 text-4xl font-bold mb-3">Welcome!</div>
                        <span class="text-600 font-medium">Sign in to continue</span>
                        <span class="text-600 font-medium">The Digital Countryside </span>
                    </div>
                    <Toast />

                    <transition-group name="p-message" tag="div" class="w-full">
                        <Message v-for="msg of message" :severity="msg.severity" :key="msg.content" :sticky="false" :life="msg.life">{{ msg.content }}</Message>
                    </transition-group>
                    <div>
                        <form>
                            <label for="email1" class="block text-900 text-xl font-medium mb-2"> Email </label>
                            <InputText id="email1" type="text" placeholder="Email address" style="width: 100%; padding: 1rem" v-model="email" />

                            <label for="email1" class="block text-l mb-2" :class="{ 'text-red-700': errors.email }">
                                {{ errors.email }}
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
                                {{ errors.password }}
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
