<script setup>
import { useLayout } from '@/layout/composables/layout';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

import { useI18n } from 'vue-i18n';
const { locale } = useI18n(); // ✅ AQUÍ sí se puede usar

const { layoutConfig, changeThemeSettings } = useLayout();
const router = useRouter();

const smoothScroll = (id) => {
    document.querySelector(id).scrollIntoView({
        behavior: 'smooth'
    });
};

const toggleValue = ref(layoutConfig.darkTheme.value);
const logoUrl = computed(() => {
    const lightLogo = import.meta.env.VITE_APP_LOGO_LIGHT || 'layout/images/logo-dark.png';
    const darkLogo = import.meta.env.VITE_APP_LOGO_DARK || 'layout/images/logo-white.png';
    // Check toggle value or layout config matching logic
    return toggleValue.value ? darkLogo : lightLogo;
});

const appName = import.meta.env.VITE_APP_NAME || 'AGRO-ONLINE';

const onChangeTheme = (mode) => {
    toggleValue.value = mode;
    const theme = mode 
        ? (import.meta.env.VITE_APP_THEME_DARK || 'lara-dark-teal') 
        : (import.meta.env.VITE_APP_THEME_LIGHT || 'lara-light-teal');
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

const route = () => {
    
    if (!sessionStorage.getItem('accessSessionToken')) {
        router.push('/auth/login');
    } else {
        router.push('/applayout');
    }
};
</script>

<template>
    <div class="surface-0 flex justify-content-center" style="background: linear-gradient(180deg, var(--surface-card) 5%, var(--surface-ground) 15%)">
        <div id="home" class="landing-wrapper overflow-hidden mr-4 ml-4">
            <div class="py-4 px-4 mx-0 md:mx-6 lg:mx-8 lg:px-8 flex align-items-center justify-content-between relative lg:static mb-3">
                <a class="flex align-items-center" href="#">
                    <img :src="logoUrl" height="70" class="mr-0 lg:mr-2" />
                    <span class="text-900 font-medium font-bold text-3xl line-height-3 mr-8">{{ appName }}</span>
                </a>
                <a class="cursor-pointer block lg:hidden text-700 p-ripple" v-ripple v-styleclass="{ selector: '@next', enterClass: 'hidden', leaveToClass: 'hidden', hideOnOutsideClick: true }">
                    <i class="pi pi-bars text-4xl"></i>
                </a>
                <div class="align-items-center md:justify-content-end flex-grow-1 justify-content-between hidden lg:flex absolute lg:static w-full left-0 px-6 lg:px-0 z-2" style="top: 100px">
                    <ul class="list-none p-0 m-0 flex lg:align-items-center select-none lg:flex-row cursor-pointer">
                        <li>
                            <Button label="Login" class="p-button-text p-button-rounded border-none font-light line-height-4" style="color: var(--primary-color)" @click="route"></Button>
                        </li>
                        <li>
                            <!-- <Button @click="onChangeTheme(!toggleValue)" v-model="toggleValue" icon="pi pi-cog" outlined rounded class="button-icon ml-3 mr-2 mr-1" style="width: 3.5rem; height: 3.5rem" /> -->
                        </li>
                    </ul>
                </div>
            </div>

            <div
                id="hero"
                class="grid mt-8 mr-5 md:pb-8"
                style="background: linear-gradient(0deg, var(--surface-card), rgba(255, 255, 255, 0.2)), radial-gradient(77.36% 256.97% at 77.36% 57.52%, var(--primary-color) 0%, var(--surface-ground) 100%); clip-path: ellipse(150% 87% at 93% 13%)"
            >
                <div class="flex-column col-12 lg:col-7 md:mx-6 md:mt-4">
                    <h2 class="text-7xl font-bold text-900">{{ appName }}</h2>
                    <p class="font-normal text-2xl line-height-3 md:mt-3 text-700">
                        Basil, scientifically known as Ocimum basilicum, is a fragrant herb often used in various culinary and medicinal applications. It's an integral part of Mediterranean cuisine, known for its distinctive aroma and flavor. Beyond
                        its culinary uses, basil possesses several properties that make it a remarkable plant.
                    </p>
                </div>
                <div class="flex justify-content-end sm:flex-order-2 lg:col-4">
                    <img src="/demo/images/landing/screen-basil.png" alt="Hero Image" class="w-10" />
                </div>
            </div>

            <!-- Footer removed as per user request -->
        </div>
    </div>
</template>

<!-- <style scoped>
#hero {
    background: linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), radial-gradient(77.36% 256.97% at 77.36% 57.52%, #eeefaf 0%, #c3e3fa 100%);
    height: 700px;
    overflow: hidden;
}

@media screen and (min-width: 768px) {
    #hero {
        -webkit-clip-path: ellipse(150% 87% at 93% 13%);
        clip-path: ellipse(150% 87% at 93% 13%);
        height: 530px;
    }
}

@media screen and (min-width: 1300px) {
    #hero > img {
        position: absolute;
    }

    #hero > div > p {
        max-width: 450px;
    }
}

@media screen and (max-width: 1300px) {
    #hero {
        height: 600px;
    }

    #hero > img {
        position: static;
        transform: scale(1);
        margin-left: auto;
    }

    #hero > div {
        width: 100%;
    }

    #hero > div > p {
        width: 100%;
        max-width: 100%;
    }
}
</style> -->
<style lang="scss" scoped></style>
