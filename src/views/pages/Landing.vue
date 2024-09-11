<script setup>
import { useLayout } from '@/layout/composables/layout';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

const { layoutConfig, changeThemeSettings } = useLayout();
const router = useRouter();

const smoothScroll = (id) => {
    document.querySelector(id).scrollIntoView({
        behavior: 'smooth'
    });
};

const toggleValue = ref(layoutConfig.darkTheme.value);
const logoUrl = computed(() => {
    return `layout/images/${toggleValue.value ? 'logo-white' : 'logo-dark'}.png`;
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

const route = () => {
    console.log('token', sessionStorage.getItem('accessSessionToken'));
    if (!sessionStorage.getItem('accessSessionToken')) {
        router.push('/auth/login');
    } else {
        router.push('/applayout');
    }
};
</script>

<template>
    <div class="surface-0 flex justify-content-center" style="background: linear-gradient(180deg, var(--paleta-400) 5%, var(--paleta-100) 15%)">
        <div id="home" class="landing-wrapper overflow-hidden mr-4 ml-4">
            <div class="py-4 px-4 mx-0 md:mx-6 lg:mx-8 lg:px-8 flex align-items-center justify-content-between relative lg:static mb-3">
                <a class="flex align-items-center" href="#">
                    <img :src="logoUrl" height="70" class="mr-0 lg:mr-2" />
                    <span class="text-900 font-medium font-bold text-3xl line-height-3 mr-8">AGRO-ONLINE</span>
                </a>
                <a class="cursor-pointer block lg:hidden text-700 p-ripple" v-ripple v-styleclass="{ selector: '@next', enterClass: 'hidden', leaveToClass: 'hidden', hideOnOutsideClick: true }">
                    <i class="pi pi-bars text-4xl"></i>
                </a>
                <div class="align-items-center md:justify-content-end flex-grow-1 justify-content-between hidden lg:flex absolute lg:static w-full left-0 px-6 lg:px-0 z-2" style="top: 100px">
                    <ul class="list-none p-0 m-0 flex lg:align-items-center select-none lg:flex-row cursor-pointer">
                        <li>
                            <Button label="Login" class="p-button-text p-button-rounded border-none font-light text-green-800 line-height-4" @click="route"></Button>
                        </li>
                        <!--
                        <li>
                            <Button label="Register" class="p-button-rounded border-none ml-4 font-light text-white line-height-4 bg-green-700"></Button>
                        </li>
                        -->
                        <li>
                            
                            <!-- <Button @click="onChangeTheme(!toggleValue)" v-model="toggleValue" icon="pi pi-cog" outlined rounded class="button-icon ml-3 mr-2 mr-1" style="width: 3.5rem; height: 3.5rem" /> -->
                            
                        </li>
                    </ul>
                </div>
            </div>

            <div
                id="hero"
                class="grid mt-8 mr-5 md:pb-8"
                style="background: linear-gradient(0deg, var(--paleta-300), rgba(255, 255, 255, 0.2)), radial-gradient(77.36% 256.97% at 77.36% 57.52%, var(--paleta-100) 0%, var(--paleta-200) 100%); clip-path: ellipse(150% 87% at 93% 13%)"
            >
                <div class="flex-column col-12 lg:col-7 md:mx-6 md:mt-4">
                    <h2 class="text-7xl font-bold text-gray-900">AgroOnline</h2>
                    <p class="font-normal text-2xl line-height-3 md:mt-3 text-gray-700">
                        Basil, scientifically known as Ocimum basilicum, is a fragrant herb often used in various culinary and medicinal applications. It's an integral part of Mediterranean cuisine, known for its distinctive aroma and flavor. Beyond
                        its culinary uses, basil possesses several properties that make it a remarkable plant.
                    </p>
                </div>
                <div class="flex justify-content-end sm:flex-order-2 lg:col-4">
                    <img src="/demo/images/landing/screen-basil.png" alt="Hero Image" class="w-10" />
                </div>
            </div>

            <div class="py-4 px-4 mx-0 mt-8 lg:mx-8">
                <div class="grid justify-content-between">
                    <div class="col-12 md:col-2" style="margin-top: -1.5rem">
                        <a @click="smoothScroll('#home')" class="flex flex-wrap align-items-center justify-content-center md:justify-content-start md:mb-0 mb-3 cursor-pointer">
                            <img :src="logoUrl" alt="footer sections" width="50" height="50" class="mr-0 lg:mr-2" />
                            <h4 class="font-medium text-3xl text-900">AGRO-ONLINE</h4>
                        </a>
                    </div>

                    <div class="col-12 md:col-10 lg:col-7">
                        <div class="grid text-center md:text-left">
                            <div class="col-12 md:col-3">
                                <h4 class="font-medium text-2xl line-height-3 mb-3 text-900">Company</h4>
                                <a class="line-height-3 text-xl block cursor-pointer mb-2 text-700">About Us</a>
                                <a class="line-height-3 text-xl block cursor-pointer mb-2 text-700">News</a>
                                <a class="line-height-3 text-xl block cursor-pointer mb-2 text-700">Investor Relations</a>
                                <a class="line-height-3 text-xl block cursor-pointer mb-2 text-700">Careers</a>
                                <a class="line-height-3 text-xl block cursor-pointer text-700">Media Kit</a>
                            </div>

                            <div class="col-12 md:col-3 mt-4 md:mt-0">
                                <h4 class="font-medium text-2xl line-height-3 mb-3 text-900">Resources</h4>
                                <a class="line-height-3 text-xl block cursor-pointer mb-2 text-700">Get Started</a>
                                <a class="line-height-3 text-xl block cursor-pointer mb-2 text-700">Learn</a>
                                <a class="line-height-3 text-xl block cursor-pointer text-700">Case Studies</a>
                            </div>

                            <div class="col-12 md:col-3 mt-4 md:mt-0">
                                <h4 class="font-medium text-2xl line-height-3 mb-3 text-900">Community</h4>
                                <a class="line-height-3 text-xl block cursor-pointer mb-2 text-700">Discord</a>
                                <a class="line-height-3 text-xl block cursor-pointer mb-2 text-700">Events<img src="/demo/images/landing/new-badge.svg" class="ml-2" /></a>
                                <a class="line-height-3 text-xl block cursor-pointer mb-2 text-700">FAQ</a>
                                <a class="line-height-3 text-xl block cursor-pointer text-700">Blog</a>
                            </div>

                            <div class="col-12 md:col-3 mt-4 md:mt-0">
                                <h4 class="font-medium text-2xl line-height-3 mb-3 text-900">Legal</h4>
                                <a class="line-height-3 text-xl block cursor-pointer mb-2 text-700">Brand Policy</a>
                                <a class="line-height-3 text-xl block cursor-pointer mb-2 text-700">Privacy Policy</a>
                                <a class="line-height-3 text-xl block cursor-pointer text-700">Terms of Service</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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