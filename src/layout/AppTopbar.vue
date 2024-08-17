<script setup>
import { ref, computed, onMounted, onBeforeUnmount, onBeforeMount, watch } from 'vue';
import { useLayout } from '@/layout/composables/layout';
import { useRouter } from 'vue-router';
import useDataAPI from '@/composables/DataAPI/FetchDataAPI.js';

import OverlayPanel from 'primevue/overlaypanel';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();
const countries = ref([
    { name: 'ES', code: 'ES', id: 'es' },
    { name: 'EN', code: 'US', id: 'en' }
]);

const selectedCountry = ref();

import ability from '@/service/ability.js';
const userDefault = ref('')
const emailDefault = ref('')
const props = defineProps({
  userStoraged: {
    type: Object,
    required: true,
  },
  nameStoraged: {
    type: String,
    required: true,
  },
  emailStoraged: {
    type: String,
    required: true,
  },
});


const { getAllResponsePermissionsAPI, dataResponsePermissionsAPI } = useDataAPI();
const lengthPermissions = ref(0);
onMounted(async () => {
    await getAllResponsePermissionsAPI('/abilities');
    lengthPermissions.value = dataResponsePermissionsAPI.value.length;
    [selectedCountry.value] = countries.value.filter((lng) => lng.id === locale.value);
});
const { handleSubmit, errors, defineField } = useForm({
    validationSchema: toTypedSchema(
        z.object({
            name: z.string().min(6),
            email: z.string().email(),
            password: z.string().min(8),
            confirmation: z
                .string()
                .min(8)
                .refine((value) => password.value === value, { message: 'Different Passwords' })
        })
    )
});

watch(selectedCountry, () => {
    if (locale.value != selectedCountry.value.id) locale.value = selectedCountry.value.id ?? 'en';
});

const {
    handleSubmit: submitEdit,
    errors: errorEdit,
    defineField: defineEdit,
    resetForm
} = useForm({
    validationSchema: toTypedSchema(
        z.object({
            nameEdit: z.string().min(6),
            emailEdit: z.string().email(),
            passwordEdit: z
                .string()
                .refine((value) => !value.length || value.length >= 8, { message: 'String must contain at least 8 character(s)' })
                .optional()
        })
    )
});

const [nameEdit, nameEditProps] = defineEdit('nameEdit');
const [emailEdit, emailEditProps] = defineEdit('emailEdit');
const [passwordEdit, passwordEditProps] = defineEdit('passwordEdit');
const [name, nameProps] = defineField('name');
const [email, emailProps] = defineField('email');
const [password, passwordProps] = defineField('password');
const [confirmation, confirmProps] = defineField('confirmation');
const { layoutConfig, onMenuToggle, changeThemeSettings } = useLayout();
const { getAllResponseAPI, totalRecordsResponseAPI, currentPageResponseAPI, linksResponseAPI, postResponseAPI, putResponseAPI, deleteResponseAPI, errorResponseAPI, dataResponseAPI } = useDataAPI();
const outsideClickListener = ref(null);
const topbarMenuActive = ref(false);
const dataUser = ref('');
const router = useRouter();
const toggleValue = ref(layoutConfig.darkTheme.value);
const farmDefault = sessionStorage.getItem('accessSessionFarm');



const logout = async () => {
    await postResponseAPI({}, '/logout');
};

const checkStorageAndInitialize = async (key, callback, retries = 10, delay = 500) => {
    let value = sessionStorage.getItem(key);
    if (value) {
        callback(value);
    } else if (retries > 0) {
        setTimeout(() => checkStorageAndInitialize(key, callback, retries - 1, delay), delay);
    } else {
        console.log(`No hay ${key}`);
    }
};

const initializeValues = async () => {
    checkStorageAndInitialize('accessSessionUser', (value) => { dataUser.value = value; });
    checkStorageAndInitialize('accessSessionEmployeeName', (value) => { nameEdit.value = value; });
    checkStorageAndInitialize('accessSessionEmail', (value) => { emailEdit.value = value; });

    // If you need to log the values only after they are set
    await new Promise((resolve) => setTimeout(resolve, 5000)); // Adjust the timeout as needed

    console.log(dataUser.value);
    console.log(nameEdit.value);
    console.log(emailEdit.value);
};


onBeforeMount(async () => {
    await initializeValues();
});
onMounted(async () => {
    bindOutsideClickListener();
});

onBeforeUnmount(() => {
    unbindOutsideClickListener();
});

const logoUrl = computed(() => {
    return `layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.png`;
});

const onTopBarMenuButton = () => {
    topbarMenuActive.value = !topbarMenuActive.value;
};
const onSettingsClick = () => {
    topbarMenuActive.value = false;
    router.push('/documentation');
};
const topbarMenuClasses = computed(() => {
    return {
        'layout-topbar-menu-mobile-active': topbarMenuActive.value
    };
});

const onChangeTheme = (mode) => {
    toggleValue.value = mode;
    const theme = mode ? 'lara-dark-teal' : 'lara-light-teal';
    const elementId = 'theme-css';
    const linkElement = document.getElementById(elementId);
    const cloneLinkElement = linkElement.cloneNode(true);
    const newThemeUrl = linkElement.getAttribute('href').replace(layoutConfig.theme.value, theme);
    cloneLinkElement.setAttribute('id', elementId + '-clone');
    cloneLinkElement.setAttribute('href', newThemeUrl);
    cloneLinkElement.addEventListener('load', () => {
        linkElement.remove();
        cloneLinkElement.setAttribute('id', elementId);
        changeThemeSettings(theme, mode);
    });
    linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);
};

const bindOutsideClickListener = () => {
    if (!outsideClickListener.value) {
        outsideClickListener.value = (event) => {
            if (isOutsideClicked(event)) {
                topbarMenuActive.value = false;
            }
        };
        document.addEventListener('click', outsideClickListener.value);
    }
};
const unbindOutsideClickListener = () => {
    if (outsideClickListener.value) {
        document.removeEventListener('click', outsideClickListener);
        outsideClickListener.value = null;
    }
};
const isOutsideClicked = (event) => {
    if (!topbarMenuActive.value) return;

    const sidebarEl = document.querySelector('.layout-topbar-menu');
    const topbarEl = document.querySelector('.layout-topbar-menu-button');

    return !(sidebarEl.isSameNode(event.target) || sidebarEl.contains(event.target) || topbarEl.isSameNode(event.target) || topbarEl.contains(event.target));
};

const Exit = () => {
    localStorage.clear();
    sessionStorage.clear();
    logout();
    router.push('/#');
};

const editUser = submitEdit(async (values) => {
    // const { farm, roles, id } = selectedRegisters.value[0];
    const data = {
        name: values.nameEdit,
        email: values.emailEdit,
        farm_uuid: values.farm ? values.farm.uuid : farmDefault,
        roles: roles.map((rol) => ({ id: rol.id }))
    };
    if (values.passwordEdit) {
        data.password = values.passwordEdit;
    }
    const restp = await putRequest(endpoint.value, data, id);

    toast.add({ severity: restp.ok ? 'success' : 'error', summary: 'Edit', detail: restp.ok ? 'Editado' : restp.error, life: 3000 });
});

const members = ref([
    { name: 'Amy Elsner', image: 'amyelsner.png', email: 'amy@email.com', role: 'Owner' },
    { name: 'Bernardo Dominic', image: 'bernardodominic.png', email: 'bernardo@email.com', role: 'Editor' },
    { name: 'Ioni Bowcher', image: 'ionibowcher.png', email: 'ioni@email.com', role: 'Viewer' }
]);
const op = ref();
const op2 = ref();
const toggleOverlayPanel1 = (event) => {
    op.value.toggle(event);
};
const toggleOverlayPanel2 = (event) => {
    op2.value.toggle(event);
};
</script>

<template>
    <div class="layout-topbar">
        <router-link to="/" class="layout-topbar-logo">
            <img :src="logoUrl" alt="logo" />
            <span>AgroOnline</span>
        </router-link>

        <button v-if="!(ability.can('agro_tv_menu') && lengthPermissions == 1)" class="p-link layout-menu-button layout-topbar-button" @click="onMenuToggle()">
            <i v-if="!(ability.can('agro_tv_menu') && lengthPermissions == 1)" class="pi pi-bars"></i>
        </button>

        <button class="p-link layout-topbar-menu-button layout-topbar-button" @click="onTopBarMenuButton()">
            <i class="pi pi-ellipsis-v"></i>
        </button>

        <div class="layout-topbar-menu" :class="topbarMenuClasses">
            <div class="flex flex-wrap align-items-center justify-content-center md:justify-content-start">
                <Button @click="toggleOverlayPanel1" icon="pi pi-user" severity="success" text rounded aria-label="User" />
                <p>{{ dataUser }}</p>
            </div>

            <OverlayPanel ref="op" :dismissable="true">
                <span class="font-medium text-900 block mb-2">Edit user</span>

                <div class="mb-3">
                    <div class="flex align-items-center gap-3 mb-1">
                        <label for="username" class="font-semibold w-6rem">Name</label>
                        <InputText id="username" v-model="nameEdit" class="flex-auto" :disabled="true" autocomplete="off" v-bind="nameEditProps" />
                    </div>
                    <small id="username-help" :class="{ 'p-invalid text-red-700': errorEdit['nameEdit'] }">
                        {{ errorEdit.nameEdit }}
                    </small>
                </div>
                <div class="mb-3">
                    <div class="flex align-items-center gap-3 mb-1">
                        <label for="email" class="font-semibold w-6rem">Email</label>
                        <InputText id="email" v-model="emailEdit" class="flex-auto" autocomplete="off" v-bind="emailEditProps" />
                    </div>
                    <small id="username-help" :class="{ 'p-invalid text-red-700': errorEdit['emailEdit'] }">
                        {{ errorEdit.emailEdit }}
                    </small>
                </div>
                <div class="mb-3" v-if="ability.can('editar_contrasena')">
                    <div class="flex align-items-center gap-3 mb-1">
                        <label for="passwordEdit" class="font-semibold w-6rem">Password </label>
                        <Password id="id" v-model="passwordEdit" :feedback="false" :toggleMask="true" v-bind="passwordEditProps" />
                    </div>
                    <small id="username-help" :class="{ 'p-invalid text-red-700': errorEdit['passwordEdit'] }">
                        {{ errorEdit.passwordEdit }}
                    </small>
                </div>
                <div class="flex justify-content-end gap-2">
                    <Button type="button" label="Cancel" severity="secondary" @click="DialogEdit = false" />
                    <Button type="button" label="Save" @click="editUser()" />
                </div>
            </OverlayPanel>

            <Button @click="onChangeTheme(!toggleValue)" v-model="toggleValue" rounded outlined class="p-link layout-topbar-button">
                <i :class="{ 'pi pi-moon': !toggleValue, 'pi pi-sun': toggleValue }"></i>
            </Button>

            <Button @click="toggleOverlayPanel2" rounded outlined class="p-link layout-topbar-button">
                <i :class="{ 'pi pi-globe': !toggleValue, 'pi pi-sun': toggleValue }"></i>
            </Button>

            <OverlayPanel ref="op2" :dismissable="true">
                <span class="font-medium text-900 block mb-2">Change language</span>

                <Dropdown v-model="selectedCountry" :options="countries" optionLabel="name" placeholder="Change language" class="w-full">
                    <template #value="slotProps">
                        <div v-if="slotProps.value" class="flex align-items-center">
                            <img :alt="slotProps.value.label" src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png" :class="`mr-2 flag flag-${slotProps.value.code.toLowerCase()}`" style="width: 18px" />
                            <div>{{ slotProps.value.name }}</div>
                        </div>
                        <span v-else>
                            {{ slotProps.placeholder }}
                        </span>
                    </template>
                    <template #option="slotProps">
                        <div class="flex align-items-center">
                            <img :alt="slotProps.option.label" src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png" :class="`mr-2 flag flag-${slotProps.option.code.toLowerCase()}`" style="width: 18px" />
                            <div>{{ slotProps.option.name }}</div>
                        </div>
                    </template>
                </Dropdown>
            </OverlayPanel>

            <Button @click="Exit()" rounded outlined class="p-link layout-topbar-button">
                <i class="pi pi-sign-out"></i>
            </Button>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
