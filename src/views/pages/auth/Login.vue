<script>
import { useLayout } from '@/layout/composables/layout';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import LoginService from '@/service/LoginService';
import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength, maxLength } from '@vuelidate/validators';

const { layoutConfig } = useLayout();
const loginService = new LoginService();
const count = ref(0);


export default {
    setup() {
        return { v$: useVuelidate() };
    },

    data() {
        return {
            form: {
                email: '',
                password: ''
            },
            logoUrl: computed(() => {
                return `layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.png`;
            }),
            checked: false,
            message: [],
            router: useRouter()
        };
    },

    validations() {
        return {
            form: {
                email: {
                    required,
                    email
                },
                password: {
                    required,
                    min: minLength(6),
                    max: maxLength(16)
                }
            }
        };
    },

    methods: {
        onSubmit() {
            if (this.v$.form.email.$invalid) {
                this.message.push({ severity: 'error', detail: 'Error E-Mail', content: 'E-Mail Invalid', id: count.value++, life: 3000 });
            }

            if (this.v$.form.password.$invalid) {
                this.message.push({ severity: 'error', detail: 'Error Password', content: 'Password Invalid', id: count.value++ });
            }

            if (this.v$.form.$invalid) return;

            this.fetchInfoPostLogin(this.form);
        },
        async fetchInfoPostLogin(data) {
            try {
                let response = await loginService.login(data);

                const token = response.token;
                sessionStorage.setItem('JWT', token);
                this.message.push({ severity: 'success', detail: 'Success', content: 'Successful Login', id: count.value++ });

                this.router.push('/layout');
            } catch (error) {
                this.message.push({ severity: 'error', detail: 'Error Response', content: error, id: count.value++ });
                console.error('Error:', error);
            }
        }
    }
};
</script>

<template>
    <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden" style="background: linear-gradient(180deg, var(--paleta-400) 5%, var(--paleta-100) 15%)">
        <div class="flex flex-column align-items-center justify-content-center">
            <router-link to="/" class="align-items-center mb-5">
                <img :src="logoUrl" alt="Sakai logo" class="w-6rem flex-shrink-0" />
                <span class="text-700 font-bold">AGRO-ONLINE</span>
            </router-link>
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(160deg, var(--primary-color) 10%, var(--paleta-100) 60%, var(--primary-color) 100%)">
                <div class="w-full py-8 px-6 sm:px-8" style="border-radius: 53px; background-color: var(--paleta-100)">
                    <div class="text-center mb-5">
                        <div class="text-900 text-4xl font-bold mb-3">Welcome!</div>
                        <span class="text-600 font-medium">Sign in to continue</span>
                    </div>

                    <div>
                        <label for="email1" class="block text-900 text-xl font-medium mb-2"> Email </label>
                        <InputText
                            id="email1"
                            type="text"
                            placeholder="Email address"
                            :class="{
                                'p-invalid w-full md:w-30rem mb-5': v$.form.email.$invalid,
                                'w-full md:w-30rem mb-5': !v$.form.email.$invalid
                            }"
                            style="padding: 1rem"
                            v-model="v$.form.email.$model"
                        />

                        <label for="password1" class="block text-900 font-medium text-xl mb-2">Password</label>
                        <Password
                            id="password1"
                            v-model="v$.form.password.$model"
                            placeholder="Password"
                            :feedback="false"
                            :toggleMask="true"
                            :class="{
                                'p-invalid w-full mb-3': v$.form.password.$invalid,
                                'w-full mb-3': !v$.form.password.$invalid
                            }"
                            inputClass="w-full"
                            :inputStyle="{ padding: '1rem' }"
                            style="color: rgb(0, 0, 0)"
                        ></Password>

                        <div class="flex align-items-center justify-content-between mb-5 gap-5">
                            <div class="flex align-items-center">
                                <Checkbox v-model="checked" id="rememberme1" binary class="mr-2"></Checkbox>
                                <label for="rememberme1">Remember me</label>
                            </div>
                            <a class="font-medium no-underline ml-2 text-right cursor-pointer" style="color: var(--primary-color)">Forgot password?</a>
                        </div>
                        <Button label="Sign In" class="w-full p-3 text-xl" @click="onSubmit"></Button>
                    </div>
                </div>
            </div>
            <transition-group name="p-message" tag="div" class="w-full">
                <Message v-for="msg of message" :severity="msg.severity" :key="msg.content" :sticky= false :life="msg.life">{{ msg.content }}</Message>
            </transition-group>
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
